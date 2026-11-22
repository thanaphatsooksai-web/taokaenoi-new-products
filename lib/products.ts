import type { StaticImageData } from "next/image";
import roastedOriginal from "@/assets/roasted-20-original.webp";
import roastedTomyum from "@/assets/roasted-20-tomyum.webp";
import toppingOriginal from "@/assets/topping-45-original.webp";
import toppingTomyum from "@/assets/topping-45-tomyum.webp";
import logoIf from "@/assets/partner-if.png";
import logoBetagen from "@/assets/partner-betagen.png";
import logoJoylada from "@/assets/partner-joylada.png";

// ข้อมูลสินค้าใหม่ อ้างอิงจากรายงานแผนการตลาดเถ้าแก่น้อย ปี 2570 (หัวข้อ 4.1.7.3 และ 4.2)

export type Flavor = "original" | "tomyum";

export type Variant = {
  flavor: Flavor;
  nameTh: string;
  nameEn: string;
  image: StaticImageData;
  tagline: string;
  points: string[];
};

export type ProductLine = {
  id: "roasted" | "topping";
  category: string;
  categoryEn: string;
  size: number;
  price: number;
  pricePerGram: number;
  sizeLabel: string;
  description: string;
  compare: { brand: string; size: string; price: number; perGram: number; index: number }[];
  variants: Record<Flavor, Variant>;
};

export const productLines: ProductLine[] = [
  {
    id: "roasted",
    category: "สาหร่ายอบกรอบ",
    categoryEn: "Roasted Seaweed · Big Sheet",
    size: 20,
    price: 57,
    pricePerGram: 2.85,
    sizeLabel: "ขนาดคู่มื้ออาหาร",
    description:
      "แผ่นใหญ่ บางกรอบกว่าเดิม ลดโซเดียม ห่อข้าวได้ เคียงกับข้าวก็อร่อย ทานเล่นเพลิน ๆ ก็ได้",
    compare: [
      { brand: "แบรนด์ A แผ่นใหญ่", size: "20 ก.", price: 57, perGram: 2.85, index: 100 },
      { brand: "แบรนด์ B แผ่นใหญ่", size: "16 ก.", price: 59, perGram: 3.69, index: 77 },
    ],
    variants: {
      original: {
        flavor: "original",
        nameTh: "รสดั้งเดิม",
        nameEn: "Original Flavor",
        image: roastedOriginal,
        tagline: "รสสาหร่ายต้นตำรับ ที่คุ้นลิ้น",
        points: ["ขนาดใหญ่ขึ้น 20 กรัม", "รสสาหร่ายต้นตำรับ", "ทานเล่น หรือทานร่วมกับมื้ออาหาร"],
      },
      tomyum: {
        flavor: "tomyum",
        nameTh: "รสต้มยำ",
        nameEn: "Tom Yum Flavor",
        image: roastedTomyum,
        tagline: "ต้มยำจัดจ้าน สไตล์ไทยแท้",
        points: ["รสต้มยำจัดจ้านสไตล์ไทย", "หอม อร่อย กรอบบาง", "เข้าได้กับหลากหลายโอกาส"],
      },
    },
  },
  {
    id: "topping",
    category: "สาหร่ายโรยข้าว",
    categoryEn: "Seaweed Rice Topping",
    size: 45,
    price: 95,
    pricePerGram: 2.11,
    sizeLabel: "ขนาดครอบครัว · ถุงซิปล็อก",
    description:
      "ถุงซิปล็อกขนาดครอบครัว 45 กรัม เปิด-ปิดได้ เก็บความกรอบ โรยได้หลายมื้อ คุ้มที่สุดต่อกรัม",
    compare: [
      { brand: "แบรนด์ C", size: "40 ก.", price: 86, perGram: 2.15, index: 98 },
      { brand: "แบรนด์ B", size: "50 ก.", price: 129, perGram: 2.58, index: 82 },
    ],
    variants: {
      original: {
        flavor: "original",
        nameTh: "รสดั้งเดิม",
        nameEn: "Original Flavor",
        image: toppingOriginal,
        tagline: "ต่อยอดจากรสชาติหลักของแบรนด์",
        points: ["ขนาดใหญ่ขึ้น 45 กรัม", "เหมาะโรยข้าวและทานร่วมกับมื้ออาหาร", "ต่อยอดจากรสชาติหลักของแบรนด์"],
      },
      tomyum: {
        flavor: "tomyum",
        nameTh: "รสต้มยำ",
        nameEn: "Tom Yum Flavor",
        image: toppingTomyum,
        tagline: "รสแรกในตลาดสาหร่ายโรยข้าว",
        points: ["ความต่างด้วยรสชาติไทย", "แบ่งทานได้หลายครั้ง", "ทางเลือกใหม่ในตลาด"],
      },
    },
  },
];

export const priceLadder = [
  {
    line: "สาหร่ายอบ",
    steps: [
      { size: "4 ก.", label: "ทดลอง", price: 20, perGram: 5.0 },
      { size: "12 ก.", label: "ซองหลัก", price: 39, perGram: 3.25 },
      { size: "20 ก.", label: "ใหม่", price: 57, perGram: 2.85, isNew: true },
    ],
  },
  {
    line: "สาหร่ายโรยข้าว",
    steps: [
      { size: "8 ก.", label: "ทดลอง", price: 20, perGram: 2.5 },
      { size: "16 ก.", label: "ซองหลัก", price: 35, perGram: 2.19 },
      { size: "45 ก.", label: "ใหม่ · ซิปล็อก", price: 95, perGram: 2.11, isNew: true },
    ],
  },
];

export const pairings = [
  { icon: "🍚", title: "ข้าวสวยร้อน ๆ", text: "โรยข้าว 45 ก. ลงบนข้าว จบในซองเดียว" },
  { icon: "🍜", title: "บะหมี่ & ราเมง", text: "เติมสาหร่ายอบ เพิ่มความหอมให้น้ำซุป" },
  { icon: "🍱", title: "ข้าวกล่องมื้อเที่ยง", text: "ซองเดียวพกไปออฟฟิศ อร่อยกว่าเดิม" },
  { icon: "🦐", title: "กุ้งดอง แซลมอนดอง", text: "ห่อด้วยสาหร่ายแผ่นใหญ่ เข้ากันสุด ๆ" },
  { icon: "🍲", title: "ซุป & ต้มยำ", text: "รสต้มยำ เติมความจัดจ้านอีกระดับ" },
  { icon: "🍳", title: "ไข่ม้วน & ข้าวผัด", text: "ผสมลงในเมนูง่าย ๆ ที่ทำเองที่บ้าน" },
];

export const stores = [
  "7-Eleven",
  "Lotus's",
  "Big C",
  "Tops",
  "Makro",
  "Gourmet Market",
  "CJ More",
  "เถ้าแก่น้อยแลนด์",
  "Shopee",
  "Lazada",
  "TikTok Shop",
];

export const partners = [
  { name: "น้ำมะพร้าว IF", nameEn: "IF Coconut Water", logo: logoIf, logoH: 72 },
  { name: "บีทาเก้น", nameEn: "Betagen", logo: logoBetagen, logoH: 46 },
  { name: "จอยลดา", nameEn: "Joylada", logo: logoJoylada, logoH: 84, rounded: true },
];
