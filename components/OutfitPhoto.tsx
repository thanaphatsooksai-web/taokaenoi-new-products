"use client";

import Image from "next/image";
import { useState } from "react";
import whiteShirt from "@/assets/thank-you-person.webp";
import blackShirt from "@/assets/thank-you-person-black.webp";
import blackShirtMic from "@/assets/thank-you-person-mic.webp";

const OUTFITS = [
  { id: "white", label: "ดั้งเดิม", desc: "เชิ้ตขาว", swatch: "#f4f2fb", image: whiteShirt },
  { id: "black", label: "เข้มข้น", desc: "เชิ้ตดำ", swatch: "#141414", image: blackShirt },
  { id: "mic", label: "เข้มข้นอย่างลึกซึ้ง", desc: "เชิ้ตดำถือไมค์", swatch: "#141414", image: blackShirtMic },
] as const;
type OutfitId = (typeof OUTFITS)[number]["id"];

/** รูปอาร์ทในส่วนขอบคุณ พร้อมปุ่มสลับชุด */
export default function OutfitPhoto() {
  const [outfit, setOutfit] = useState<OutfitId>("white");

  return (
    <>
      <div className="outfit" role="radiogroup" aria-label="เปลี่ยนชุด">
        <span className="outfit__label">เปลี่ยนชุด</span>
        {OUTFITS.map((o) => (
          <button
            key={o.id}
            role="radio"
            aria-checked={outfit === o.id}
            className={`outfit__btn ${outfit === o.id ? "is-active" : ""}`}
            onClick={() => setOutfit(o.id)}
            title={o.desc}
          >
            <span className="outfit__swatch" style={{ background: o.swatch }} />
            {o.label}
          </button>
        ))}
      </div>
      <div className="outfit__stage">
        {OUTFITS.map((o) => (
          <Image
            key={o.id}
            src={o.image}
            alt={o.id === outfit ? `อาร์ท ชุด${o.label} (${o.desc})` : ""}
            aria-hidden={o.id !== outfit}
            className={`thanks__person outfit__img ${o.id === outfit ? "is-shown" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
