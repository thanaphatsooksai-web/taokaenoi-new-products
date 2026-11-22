// ค่า config ของเว็บแอป Firebase (คัดลอกจาก Project settings → Your apps → Web app)
// ค่าเหล่านี้เปิดเผยในหน้าเว็บได้ตามปกติ ความปลอดภัยคุมด้วยไฟล์ database.rules.json
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL);
