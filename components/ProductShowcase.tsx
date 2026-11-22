"use client";

import Image from "next/image";
import { useState } from "react";
import { productLines, type Flavor } from "@/lib/products";

export default function ProductShowcase() {
  const [lineId, setLineId] = useState<"roasted" | "topping">("roasted");
  const [flavor, setFlavor] = useState<Flavor>("tomyum");

  const line = productLines.find((l) => l.id === lineId)!;
  const v = line.variants[flavor];

  return (
    <div className={`showcase showcase--${flavor}`}>
      <div className="showcase__tabs" role="tablist" aria-label="เลือกสินค้า">
        {productLines.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={l.id === lineId}
            className={`tab ${l.id === lineId ? "is-active" : ""}`}
            onClick={() => setLineId(l.id)}
          >
            <span className="tab__size">{l.size}g</span>
            <span className="tab__name">{l.category}</span>
          </button>
        ))}
      </div>

      <div className="showcase__body">
        <div className="showcase__visual">
          <div className="showcase__blob" aria-hidden />
          <div className="showcase__ring" aria-hidden />
          <Image
            key={v.image.src}
            src={v.image}
            alt={`เถ้าแก่น้อย ${line.category} ${line.size} กรัม ${v.nameTh}`}
            className="showcase__pack"
            priority
          />
          <div className="sticker sticker--price">
            <small>ราคาแนะนำ</small>
            <strong>{line.price}</strong>
            <small>บาท</small>
          </div>
        </div>

        <div className="showcase__info">
          <p className="eyebrow">{line.categoryEn}</p>
          <h3 className="showcase__title">
            {line.category} <span className="hl">{line.size} กรัม</span>
          </h3>

          <div className="flavor-switch" role="radiogroup" aria-label="เลือกรสชาติ">
            {(["original", "tomyum"] as Flavor[]).map((f) => (
              <button
                key={f}
                role="radio"
                aria-checked={flavor === f}
                className={`flavor flavor--${f} ${flavor === f ? "is-active" : ""}`}
                onClick={() => setFlavor(f)}
              >
                <span className="flavor__dot" />
                {line.variants[f].nameTh}
                <small>{line.variants[f].nameEn}</small>
              </button>
            ))}
          </div>

          <p className="showcase__tagline">“{v.tagline}”</p>
          <p className="muted">{line.description}</p>

          <ul className="checklist">
            {v.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="showcase__stats">
            <div>
              <strong>{line.pricePerGram.toFixed(2)}</strong>
              <span>บาท / กรัม</span>
            </div>
            <div>
              <strong>{line.size}g</strong>
              <span>{line.sizeLabel}</span>
            </div>
            <div>
              <strong>ลด</strong>
              <span>โซเดียม</span>
            </div>
          </div>

          <details className="compare">
            <summary>เทียบความคุ้มกับสินค้าขนาดใกล้กันในตลาด</summary>
            <table>
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                  <th>บาท/กรัม</th>
                </tr>
              </thead>
              <tbody>
                <tr className="is-us">
                  <td>
                    เถ้าแก่น้อย {line.size} ก.
                  </td>
                  <td>{line.price}</td>
                  <td>{line.pricePerGram.toFixed(2)}</td>
                </tr>
                {line.compare.map((c) => (
                  <tr key={c.brand}>
                    <td>
                      {c.brand} {c.size}
                    </td>
                    <td>{c.price}</td>
                    <td>{c.perGram.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </div>
    </div>
  );
}
