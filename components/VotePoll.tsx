"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase-config";

const GROUPS = [
  { id: "g1", label: "กลุ่ม 1", color: "var(--red)" },
  { id: "g2", label: "กลุ่ม 2", color: "var(--yellow)" },
  { id: "g3", label: "กลุ่ม 3", color: "var(--ink)" },
] as const;
type GroupId = (typeof GROUPS)[number]["id"];

const COOLDOWN_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const TH_OFFSET_MS = 7 * 60 * 60 * 1000; // เวลาไทย UTC+7

/** เลขวันตามเวลาไทย (ต้องตรงกับสูตรในไฟล์ database.rules.json) */
const dayIndex = (ms: number) => Math.floor((ms + TH_OFFSET_MS) / DAY_MS);

type Status = "loading" | "ready" | "voting" | "error" | "unconfigured";
type Db = typeof import("firebase/database");

function fmt(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}
function fmtHMS(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function VotePoll() {
  const [counts, setCounts] = useState<Record<GroupId, number>>({ g1: 0, g2: 0, g3: 0 });
  const [status, setStatus] = useState<Status>(isFirebaseConfigured ? "loading" : "unconfigured");
  const [message, setMessage] = useState("");
  const [lastVote, setLastVote] = useState<number | null>(null);
  const [serverOffset, setServerOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [uid, setUid] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const fb = useRef<{ db: Db; database: ReturnType<Db["getDatabase"]> } | null>(null);

  const serverNow = now + serverOffset;
  const today = dayIndex(serverNow);
  const msToMidnight = (today + 1) * DAY_MS - TH_OFFSET_MS - serverNow;

  // เริ่ม Firebase + ล็อกอินนิรนาม (ครั้งเดียว)
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    let cancelled = false;
    const unsubs: (() => void)[] = [];
    (async () => {
      const [{ initializeApp, getApps }, { getAuth, signInAnonymously, onAuthStateChanged }, db] =
        await Promise.all([import("firebase/app"), import("firebase/auth"), import("firebase/database")]);
      const app = getApps()[0] ?? initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const database = db.getDatabase(app);
      fb.current = { db, database };
      unsubs.push(
        db.onValue(db.ref(database, ".info/serverTimeOffset"), (snap) => setServerOffset(Number(snap.val()) || 0))
      );
      unsubs.push(
        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            signInAnonymously(auth).catch(() => {
              setStatus("error");
              setMessage("เริ่มระบบโหวตไม่ได้ (ยังไม่ได้เปิด Anonymous sign-in)");
            });
            return;
          }
          const snap = await db.get(db.ref(database, `poll/voters/${user.uid}`)).catch(() => null);
          if (cancelled) return;
          setLastVote(snap?.exists() ? Number(snap.val()) : null);
          setUid(user.uid);
        })
      );
      if (!cancelled) setReady(true);
    })().catch(() => {
      setStatus("error");
      setMessage("โหลดระบบโหวตไม่สำเร็จ");
    });
    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, []);

  // ติดตามคะแนนของ "วันนี้" — พอข้ามเที่ยงคืน today เปลี่ยน แล้วสลับไปวันใหม่เอง
  useEffect(() => {
    if (!ready || !fb.current) return;
    const { db, database } = fb.current;
    const timeout = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
      setMessage("เชื่อมต่อระบบโหวตไม่ได้ ลองรีเฟรชหน้าอีกครั้ง");
    }, 10000);
    const unsub = db.onValue(
      db.ref(database, `poll/days/${today}/counts`),
      (snap) => {
        const v = snap.val() || {};
        setCounts({ g1: v.g1 || 0, g2: v.g2 || 0, g3: v.g3 || 0 });
        clearTimeout(timeout);
        setStatus((s) => (s === "loading" || s === "error" ? "ready" : s));
      },
      () => {
        clearTimeout(timeout);
        setStatus("error");
        setMessage("อ่านคะแนนไม่ได้");
      }
    );
    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, [ready, today]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const total = counts.g1 + counts.g2 + counts.g3;
  const leader = useMemo(() => {
    if (!total) return null;
    const max = Math.max(counts.g1, counts.g2, counts.g3);
    const top = GROUPS.filter((g) => counts[g.id] === max);
    return top.length === 1 ? top[0].id : null;
  }, [counts, total]);

  const remaining = lastVote ? lastVote + COOLDOWN_MS - serverNow : 0;
  const canVote = status === "ready" && !!uid && remaining <= 0;

  async function vote(g: GroupId) {
    if (!canVote || !fb.current || !uid) return;
    const { db, database } = fb.current;
    setStatus("voting");
    setMessage("");
    try {
      await db.update(db.ref(database), {
        [`poll/voters/${uid}`]: db.serverTimestamp(),
        [`poll/days/${dayIndex(Date.now() + serverOffset)}/counts/${g}`]: db.increment(1),
      });
      const after = await db.get(db.ref(database, `poll/voters/${uid}`));
      setLastVote(Number(after.val()));
      setMessage(`ขอบคุณที่โหวตให้ ${GROUPS.find((x) => x.id === g)!.label}!`);
    } catch {
      setMessage("โหวตไม่สำเร็จ อาจยังไม่ครบ 1 ชั่วโมงจากครั้งก่อน");
    } finally {
      setStatus("ready");
    }
  }

  return (
    <div className="poll">
      <div className="poll__live">
        <span className={`poll__dot ${status === "ready" || status === "voting" ? "is-on" : ""}`} />
        {status === "unconfigured"
          ? "ระบบโหวตยังไม่เปิดใช้งาน"
          : status === "loading"
            ? "กำลังเชื่อมต่อ..."
            : status === "error"
              ? "ออฟไลน์"
              : "LIVE · คะแนนวันนี้"}
        <span className="poll__total">รวม {total.toLocaleString("th-TH")} โหวต</span>
      </div>

      <div className="poll__groups">
        {GROUPS.map((g) => {
          const pct = total ? Math.round((counts[g.id] / total) * 100) : 0;
          return (
            <div key={g.id} className={`poll__row ${leader === g.id ? "is-leader" : ""}`}>
              <div className="poll__head">
                <span className="poll__name">
                  {g.label}
                  {leader === g.id && <span className="poll__crown">นำอยู่</span>}
                </span>
                <span className="poll__num">
                  <b>{counts[g.id].toLocaleString("th-TH")}</b> โหวต · {pct}%
                </span>
              </div>
              <div className="poll__track">
                <div className="poll__fill" style={{ width: `${pct}%`, background: g.color }} />
              </div>
              <button className="btn btn--yellow poll__btn" disabled={!canVote} onClick={() => vote(g.id)}>
                โหวต{g.label}
              </button>
            </div>
          );
        })}
      </div>

      <p className="poll__note" aria-live="polite">
        {message ||
          (remaining > 0
            ? `คุณโหวตแล้ว โหวตได้อีกครั้งใน ${fmt(remaining)} นาที`
            : status === "unconfigured"
              ? "ผู้ดูแลกำลังตั้งค่าระบบโหวต"
              : "โหวตได้ 1 ครั้งต่อชั่วโมง ไม่ต้องล็อกอิน")}
      </p>
      {status !== "unconfigured" && (
        <p className="poll__reset">
          🕛 คะแนนรีเซ็ตทุกวันเวลาเที่ยงคืน · เริ่มนับใหม่ในอีก <b>{fmtHMS(msToMidnight)}</b>
        </p>
      )}
    </div>
  );
}
