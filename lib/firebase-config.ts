// ค่า config ของเว็บแอป Firebase (คัดลอกจาก Project settings → Your apps → Web app)
// ค่าเหล่านี้เปิดเผยในหน้าเว็บได้ตามปกติ ความปลอดภัยคุมด้วยไฟล์ database.rules.json
export const firebaseConfig = {
  apiKey: "AIzaSyCbzWW-_OJ7QrXrFTZAkqmM6sP2CKoZkHw",
  authDomain: "taokaenoi-vote.firebaseapp.com",
  databaseURL: "https://taokaenoi-vote-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "taokaenoi-vote",
  storageBucket: "taokaenoi-vote.firebasestorage.app",
  messagingSenderId: "319865665488",
  appId: "1:319865665488:web:78aebaf96bb0894b3d6bd5",
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL);
