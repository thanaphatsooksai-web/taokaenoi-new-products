import Image from "next/image";
import ProductShowcase from "@/components/ProductShowcase";
import Reveal from "@/components/Reveal";
import VotePoll from "@/components/VotePoll";
import toppingOriginal from "@/assets/topping-45-original.webp";
import roastedTomyum from "@/assets/roasted-20-tomyum.webp";
import cookingChallenge from "@/assets/cooking-challenge.webp";
import mascot from "@/assets/taokaenoi-mascot.webp";
import thankYouPerson from "@/assets/thank-you-person.webp";
import { pairings, partners, priceLadder, stores } from "@/lib/products";

const marqueeItems = [
  "NEW SIZE",
  "สาหร่ายอบ 20 กรัม",
  "สาหร่ายโรยข้าว 45 กรัม",
  "รสต้มยำ",
  "บางกรอบกว่าเดิม",
  "ลดโซเดียม",
  "#เติมรส",
];

const highlights = [
  { k: "บาง", title: "บางกรอบกว่าเดิม", text: "แผ่นบางลง กรอบขึ้น ทานกับอาหารได้ลงตัว ไม่แย่งซีน" },
  { k: "Na", title: "ลดโซเดียม", text: "ลดเค็มลง ให้ทานได้ทุกวัน ใส่ใจสุขภาพแบบไม่ต้องฝืน" },
  { k: "ต้มยำ", title: "รสต้มยำไทยแท้", text: "รสใหม่ที่ยังไม่มีในขนาดนี้ จัดจ้านแบบไทย ๆ" },
  { k: "คุ้ม", title: "คุ้มกว่าต่อกรัม", text: "ซองใหญ่ขึ้น ราคาต่อกรัมถูกลง โรยข้าว 45 ก. เพียง 2.11 บาท/กรัม" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const maxPerGram = 5;
  return (
    <>
      <Reveal />

      {/* ---------- NAV ---------- */}
      <header className="nav">
        <div className="container nav__inner">
          <a href="#top" className="logo" aria-label="เถ้าแก่น้อย หน้าแรก">
            <span className="logo__mark">
              <Image src={mascot} alt="" className="logo__img" />
            </span>
            <span className="logo__text">
              เถ้าแก่น้อย
            </span>
          </a>
          <nav className="nav__links" aria-label="เมนูหลัก">
            <a href="#products">สินค้าใหม่</a>
            <a href="#pairing">เติมรสทุกมื้อ</a>
            <a href="#video">ดูคลิป</a>
            <a href="#value">ความคุ้ม</a>
            <a href="#challenge">ร่วมสนุก</a>
            <a href="#vote">โหวต</a>
            <a href="#partners">พาร์ทเนอร์</a>
          </nav>
          <a href="#where" className="btn btn--yellow btn--sm">
            ซื้อเลย
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <div className="hero__bg" aria-hidden>
            <span className="hero__sun" />
            <span className="flake f1" />
            <span className="flake f2" />
            <span className="flake f3" />
            <span className="flake f4" />
          </div>
          <div className="container hero__inner">
            <div className="hero__copy">
              <span className="pill pill--yellow">✦ สินค้าใหม่ 4 รายการ</span>
              <h1 className="hero__title">
                <span className="hero__title-sm">สาหร่ายเถ้าแก่น้อย</span>
                เติมรส
                <br />
                <span className="hero__title-yellow">ให้ทุกมื้อ</span>
              </h1>
              <p className="hero__lead">
                สาหร่ายอบ <b>20 กรัม</b> และสาหร่ายโรยข้าว <b>45 กรัม</b> ขนาดใหม่ บางกรอบกว่าเดิม
                ลดโซเดียม มาพร้อมรสดั้งเดิมและ <b>รสต้มยำ</b> ที่ทำให้ข้าวจานธรรมดาไม่ธรรมดาอีกต่อไป
              </p>
              <div className="hero__cta">
                <a href="#products" className="btn btn--yellow">
                  ดูสินค้าใหม่ →
                </a>
                <a href="#challenge" className="btn btn--ghost">
                  ร่วม Cooking Challenge
                </a>
              </div>
              <ul className="hero__facts">
                <li>
                  <strong>57.-</strong>
                  <span>สาหร่ายอบ 20 ก.</span>
                </li>
                <li>
                  <strong>95.-</strong>
                  <span>โรยข้าว 45 ก.</span>
                </li>
                <li>
                  <strong>2</strong>
                  <span>รสชาติ</span>
                </li>
              </ul>
            </div>

            <div className="hero__packs">
              <div className="hero__plate" aria-hidden />
              <Image
                src={toppingOriginal}
                alt="สาหร่ายโรยข้าว 45 กรัม รสดั้งเดิม"
                className="hero__pack hero__pack--back"
                priority
              />
              <Image
                src={roastedTomyum}
                alt="สาหร่ายอบ 20 กรัม รสต้มยำ"
                className="hero__pack hero__pack--front"
                priority
              />
              <span className="burst">
                NEW
                <br />
                SIZE!
              </span>
            </div>
          </div>
          <svg className="hero__wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden>
            <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,90 L0,90 Z" />
          </svg>
        </section>

        {/* ---------- MARQUEE ---------- */}
        <div className="marquee" aria-hidden>
          <div className="marquee__track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
              <span key={i}>
                {t} <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        {/* ---------- PRODUCTS ---------- */}
        <section id="products" className="section">
          <div className="container">
            <div className="section__head reveal">
              <span className="pill pill--red">New Product SKU</span>
              <h2>
                ขนาดใหม่ <span className="text-red">ใหญ่ขึ้น คุ้มขึ้น</span> อร่อยขึ้น
              </h2>
              <p className="muted">เลือกสินค้าและรสชาติ เพื่อดูรายละเอียด</p>
            </div>
            <div className="reveal">
              <ProductShowcase />
            </div>
          </div>
        </section>

        {/* ---------- HIGHLIGHTS ---------- */}
        <section className="section section--cream">
          <div className="container">
            <div className="section__head reveal">
              <span className="pill pill--red">ทำไมต้องลอง</span>
              <h2>
                พัฒนาใหม่ <span className="text-red">เพื่อมื้ออาหาร</span> ของคุณ
              </h2>
            </div>
            <div className="grid-4">
              {highlights.map((h, i) => (
                <article key={h.title} className="feature reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="feature__icon">{h.k}</span>
                  <h3>{h.title}</h3>
                  <p className="muted">{h.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PAIRING ---------- */}
        <section id="pairing" className="section section--red">
          <div className="container">
            <div className="section__head reveal">
              <span className="pill pill--yellow">แนวคิด “เติมรส”</span>
              <h2>
                ไม่ใช่แค่ขนม <span className="text-yellow">แต่คือเพื่อนคู่มื้อ</span>
              </h2>
              <p>เปลี่ยนเมนูประจำวันให้อร่อยขึ้น ด้วยสาหร่ายแค่ซองเดียว</p>
            </div>
            <div className="grid-3">
              {pairings.map((p, i) => (
                <article key={p.title} className="pair reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="pair__icon" aria-hidden>
                    {p.icon}
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- VIDEO ---------- */}
        <section id="video" className="section section--cream">
          <div className="container video">
            <div className="section__head reveal">
              <span className="pill pill--red">▶ ดูคลิป</span>
              <h2>
                เชฟเถ้าแก่น้อย <span className="text-red">ชวนเติมรส</span>
              </h2>
              <p className="muted">คิมบับ สปาเกตตี้ เทมปุระ ทำง่าย อร่อยขึ้น ด้วยสาหร่ายซองเดียว</p>
            </div>
            <div className="video__frame reveal">
              <span className="video__sticker" aria-hidden>
                เติมรส!
              </span>
              <video
                className="video__player"
                controls
                playsInline
                preload="metadata"
                poster={`${basePath}/video/taokaenoi-cooking-poster.webp`}
                width={744}
                height={540}
              >
                <source src={`${basePath}/video/taokaenoi-cooking.mp4`} type="video/mp4" />
                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
              </video>
            </div>
          </div>
        </section>

        {/* ---------- VALUE ---------- */}
        <section id="value" className="section">
          <div className="container value">
            <div className="value__copy reveal">
              <span className="pill pill--red">บันไดราคา</span>
              <h2>
                ซองใหญ่ขึ้น <span className="text-red nowrap">ถูกลงต่อกรัม</span>
              </h2>
              <p className="muted">
                ยิ่งซองใหญ่ ยิ่งคุ้ม — สาหร่ายโรยข้าว 45 กรัม ราคาเพียง 95 บาท ไม่ถึงร้อย
                และเป็นราคาต่อกรัมที่คุ้มที่สุดในไลน์
              </p>
              <div className="value__big">
                <div>
                  <strong>2.11</strong>
                  <span>บาท/กรัม · โรยข้าว 45 ก.</span>
                </div>
                <div>
                  <strong>2.85</strong>
                  <span>บาท/กรัม · สาหร่ายอบ 20 ก.</span>
                </div>
              </div>
            </div>
            <div className="ladder reveal">
              {priceLadder.map((group) => (
                <div key={group.line} className="ladder__group">
                  <h3>{group.line}</h3>
                  {group.steps.map((s) => (
                    <div key={s.size} className={`bar ${s.isNew ? "bar--new" : ""}`}>
                      <div className="bar__label">
                        <b>{s.size}</b> <span>{s.label}</span>
                      </div>
                      <div className="bar__track">
                        <div className="bar__fill" style={{ width: `${(s.perGram / maxPerGram) * 100}%` }}>
                          {s.perGram.toFixed(2)} ฿/ก.
                        </div>
                      </div>
                      <div className="bar__price">{s.price}.-</div>
                    </div>
                  ))}
                </div>
              ))}
              <p className="tiny muted">* ราคาแนะนำต่อซอง แท่งสั้น = คุ้มกว่า</p>
            </div>
          </div>
        </section>

        {/* ---------- CHALLENGE ---------- */}
        <section id="challenge" className="section section--yellow">
          <div className="container challenge">
            <div className="challenge__media reveal">
              <Image
                src={cookingChallenge}
                alt="ตัวอย่างโพสต์ Cooking Challenge เมนูไข่ม้วนสาหร่ายอบ"
                className="challenge__img"
              />
            </div>
            <div className="challenge__copy reveal">
              <span className="pill pill--red">Cooking Challenge</span>
              <h2>
                จาก “เห็น” <br />
                สู่ <span className="text-red">“ลงมือเติมรส”</span>
              </h2>
              <p>สร้างเมนูของคุณเองด้วยสาหร่ายอบหรือสาหร่ายโรยข้าวเถ้าแก่น้อย แล้วแชร์ให้โลกรู้</p>
              <ol className="steps">
                <li>
                  <b>สร้างเมนู</b>
                  <span>ใช้สาหร่ายอบหรือสาหร่ายโรยข้าวกับอาหารจานโปรด</span>
                </li>
                <li>
                  <b>โพสต์ผลงาน</b>
                  <span>ภาพหรือคลิป ตั้งค่าสาธารณะ พร้อมแฮชแท็กแคมเปญ</span>
                </li>
                <li>
                  <b>รางวัลจากพาร์ทเนอร์</b>
                  <span>ผู้ชนะรับของรางวัลจากน้ำมะพร้าว IF บีทาเก้น และจาลดอย ตามกติกา</span>
                </li>
              </ol>
              <div className="tags">
                <span>#เติมรส</span>
                <span>#เถ้าแก่น้อย</span>
                <span>#CookingChallenge</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- VOTE ---------- */}
        <section id="vote" className="section section--red">
          <div className="container">
            <div className="section__head reveal">
              <span className="pill pill--yellow">โหวตเลย</span>
              <h2>
                เชียร์กลุ่มที่ใช่ <span className="text-yellow">โหวตได้ทุกชั่วโมง</span>
              </h2>
              <p>กดโหวตได้เลยไม่ต้องล็อกอิน คะแนนอัปเดตสดบนทุกเครื่อง</p>
            </div>
            <div className="reveal">
              <VotePoll />
            </div>
          </div>
        </section>

        {/* ---------- PARTNERS ---------- */}
        <section id="partners" className="section section--cream">
          <div className="container">
            <div className="section__head reveal">
              <span className="pill pill--red">Our Partners</span>
              <h2>
                พาร์ทเนอร์ <span className="text-red">ของเรา</span>
              </h2>
              <p className="muted">ร่วมกัน “เติมรส” ให้ทุกมื้อของคนไทย</p>
            </div>
            <ul className="partners">
              {partners.map((p, i) => (
                <li key={p.name} className="partner reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="partner__logo">
                    <Image
                      src={p.logo}
                      alt={`โลโก้ ${p.nameEn}`}
                      style={{ height: p.logoH, width: "auto", borderRadius: "rounded" in p ? 20 : 0 }}
                    />
                  </span>
                  <span className="partner__name">{p.name}</span>
                  {p.nameEn && <span className="partner__en">{p.nameEn}</span>}
                  <span className="partner__tag">#เติมรส</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- WHERE ---------- */}
        <section id="where" className="section">
          <div className="container where reveal">
            <span className="pill pill--red">หาซื้อได้ที่</span>
            <h2>
              พบกันได้ <span className="text-red">ทุกที่ใกล้คุณ</span>
            </h2>
            <p className="muted">ร้านสะดวกซื้อ ซูเปอร์มาร์เก็ต และร้านค้าทางการบนแพลตฟอร์มออนไลน์</p>
            <ul className="stores">
              {stores.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- THANK YOU ---------- */}
        <section id="thanks" className="cta thanks">
          <div className="container thanks__inner">
            <div className="thanks__media reveal">
              <span className="thanks__plate" aria-hidden />
              <Image src={thankYouPerson} alt="ตัวแทนทีมผู้จัดทำ" className="thanks__person" />
              <span className="thanks__bubble">ขอบคุณครับ 🙏</span>
              <span className="thanks__mascot" aria-hidden>
                <Image src={mascot} alt="" />
              </span>
            </div>
            <div className="thanks__copy reveal">
              <span className="pill pill--yellow">Thank you</span>
              <h2>
                ขอบคุณที่แวะมา
                <br />
                <span className="text-yellow">เติมรส</span> กับอาร์ท
              </h2>
              <p>
                ขอบคุณทุกคนที่เข้ามาชม ร่วมโหวต และร่วมสนุกกับแคมเปญ “เติมรส” ของเถ้าแก่น้อย
                แล้วพบกับสาหร่ายอบ 20 ก. และสาหร่ายโรยข้าว 45 ก. ได้เร็ว ๆ นี้
              </p>
              <div className="hero__cta">
                <a href="#products" className="btn btn--yellow">
                  เลือกรสที่ใช่ →
                </a>
                <a href="#vote" className="btn btn--ghost">
                  ไปโหวต
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="logo logo--light">
            <span className="logo__mark">
              <Image src={mascot} alt="" className="logo__img" />
            </span>
            <span className="logo__text">
              เถ้าแก่น้อย<small>เติมรส ให้ทุกมื้อ</small>
            </span>
          </div>
          <p className="tiny">
            เว็บไซต์ต้นแบบประกอบรายงานแผนการตลาดผลิตภัณฑ์สาหร่ายเถ้าแก่น้อย ปี 2570 จัดทำเพื่อการศึกษา
            ไม่ใช่เว็บไซต์ทางการของบริษัท ราคาและรายละเอียดสินค้าเป็นข้อเสนอในแผน
          </p>
        </div>
      </footer>
    </>
  );
}
