/**
 * ==============================================================================
 * MODULE ĐỒNG BỘ ĐÁM MÂY TỰ ĐỘNG FIREBASE CLOUD FIRESTORE
 * WEBSITE: THUẬT SỐ HUYỀN HỌC (thuatsohuyenhoc.com.vn)
 * ==============================================================================
 * Tự động đồng bộ bài viết 2 chiều giữa viet-bai.html và index.html
 * trên mọi thiết bị (Điện thoại iPhone/Android, PC Chrome, Firefox, Cốc Cốc, Safari...)
 * Tuân thủ 100% nguyên tắc bảo toàn dữ liệu & fallback tại chỗ (Dual-Layer).
 */

(function() {
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAlCw3G_1CMtr--Spxv-9ig3Hb6RHcKZ6o",
    authDomain: "thuatsohuyenhoc.firebaseapp.com",
    projectId: "thuatsohuyenhoc",
    storageBucket: "thuatsohuyenhoc.firebasestorage.app",
    messagingSenderId: "329001135651",
    appId: "1:329001135651:web:ee4a98b39e7283d0f34b96",
    measurementId: "G-EKKXRN1DLL"
  };

  const SYNC_KEYS = [
    "BAI_VIET_CHUYEN_MUC_CUSTOM",
    "XEMNGAY_BAI_VIET_CUSTOM",
    "TUVI_BAI_VIET_CUSTOM",
    "XEMTUOI_BAI_VIET_CUSTOM",
    "TAMLINH_BAI_VIET_CUSTOM",
    "PHONGTHUY_BAI_VIET_CUSTOM",
    "KIENTHUC_BAI_VIET_CUSTOM",
    "TUONGSO_BAI_VIET_CUSTOM",
    "BAI_VIET_HIDDEN_IDS"
  ];

  let db = null;
  let isInitialized = false;

  // Tự động nạp Firebase SDK nếu trang chưa có
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.getAttribute("data-loaded") === "true") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", reject);
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => {
        s.setAttribute("data-loaded", "true");
        resolve();
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function initFirebase() {
    if (isInitialized && db) return db;
    try {
      if (typeof window.firebase === "undefined") {
        await loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js");
      } else if (typeof window.firebase.firestore === "undefined") {
        await loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js");
      }

      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(FIREBASE_CONFIG);
      }
      db = window.firebase.firestore();
      isInitialized = true;
      console.log("☁️ Firebase Cloud Firestore đã khởi tạo thành công!");
      return db;
    } catch (e) {
      console.warn("⚠️ Không thể tải Firebase Cloud:", e);
      return null;
    }
  }

  // Đẩy 1 kho chuyên mục lên Firebase Cloud
  async function pushCategoryToCloud(key, rawJson) {
    try {
      const database = await initFirebase();
      if (!database) return false;
      const payload = {
        data: rawJson || "[]",
        updatedAt: Date.now()
      };
      await database.collection("articles_sync").doc(key).set(payload);
      console.log("☁️ Đã đồng bộ lên Firebase Cloud:", key);
      return true;
    } catch(err) {
      console.error("Lỗi pushCategoryToCloud:", key, err);
      return false;
    }
  }

  // Đẩy TOÀN BỘ bài viết và danh sách ẩn lên Firebase Cloud
  async function pushAllToCloud() {
    try {
      const database = await initFirebase();
      if (!database) return false;

      const batch = database.batch();
      let hasData = false;

      SYNC_KEYS.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) {
          const docRef = database.collection("articles_sync").doc(key);
          batch.set(docRef, {
            data: val,
            updatedAt: Date.now()
          });
          hasData = true;
        }
      });

      if (hasData) {
        await batch.commit();
        console.log("☁️ ĐÃ ĐỒNG BỘ TOÀN BỘ BÀI VIẾT LÊN CLOUD!");
        return true;
      }
      return false;
    } catch(err) {
      console.error("Lỗi pushAllToCloud:", err);
      return false;
    }
  }

  // Tải dữ liệu mới nhất từ Firebase Cloud về máy
  async function pullFromCloud(forceRefresh) {
    try {
      const database = await initFirebase();
      if (!database) return false;

      const snapshot = await database.collection("articles_sync").get();
      if (snapshot.empty) {
        console.log("☁️ Firebase Cloud chưa có bài viết. Sẽ tự động tải bài gốc lên đám mây...");
        await pushAllToCloud();
        return false;
      }

      let hasChanges = false;

      snapshot.forEach(doc => {
        const key = doc.id;
        const cloudDoc = doc.data();
        if (cloudDoc && cloudDoc.data) {
          const localVal = localStorage.getItem(key);
          // Nếu cục bộ chưa có hoặc dữ liệu khác nhau, nạp bản Cloud
          if (!localVal || localVal !== cloudDoc.data) {
            localStorage.setItem(key, cloudDoc.data);
            hasChanges = true;
          }
        }
      });

      if (hasChanges || forceRefresh) {
        console.log("☁️ Dữ liệu từ Firebase Cloud đã được cập nhật vào máy!");
        triggerUIRefresh();
        return true;
      }
      return false;
    } catch(err) {
      console.warn("Lỗi pullFromCloud:", err);
      return false;
    }
  }

  // Lắng nghe thay đổi theo thời gian thực (Real-time Listener)
  async function listenToCloudChanges() {
    try {
      const database = await initFirebase();
      if (!database) return;

      database.collection("articles_sync").onSnapshot(snapshot => {
        let changed = false;
        snapshot.docChanges().forEach(change => {
          if (change.type === "added" || change.type === "modified") {
            const key = change.doc.id;
            const cloudDoc = change.doc.data();
            if (cloudDoc && cloudDoc.data) {
              const localVal = localStorage.getItem(key);
              if (localVal !== cloudDoc.data) {
                localStorage.setItem(key, cloudDoc.data);
                changed = true;
              }
            }
          }
        });
        if (changed) {
          console.log("⚡ Nhận bản tin cập nhật tức thì từ Firebase Cloud!");
          triggerUIRefresh();
        }
      }, err => {
        console.warn("Lỗi onSnapshot Firebase:", err);
      });
    } catch(err) {
      console.warn("Lỗi listenToCloudChanges:", err);
    }
  }

  function triggerUIRefresh() {
    // 1. Nếu đang ở trang soạn thảo viet-bai.html
    if (typeof window.renderExistingPosts === "function") {
      try { window.renderExistingPosts(); } catch(e) {}
    }
    if (typeof window.updateStorageMonitorUI === "function") {
      try { window.updateStorageMonitorUI(); } catch(e) {}
    }

    // 2. Nếu đang ở trang chủ index.html
    if (typeof window.syncChuyenMuc === "function") {
      try { window.syncChuyenMuc(); } catch(e) {}
    }
    if (typeof window.renderChuyenMucTab === "function") {
      try { window.renderChuyenMucTab(); } catch(e) {}
    }
    if (typeof window.canChinhChanBaiViet === "function") {
      try { setTimeout(window.canChinhChanBaiViet, 100); } catch(e) {}
    }

    // 3. Phát CustomEvent cho toàn bộ hệ thống
    try {
      window.dispatchEvent(new CustomEvent("firebasePostsSynced", { detail: { time: Date.now() } }));
    } catch(e) {}
  }

  // Export ra toàn cầu
  window.FirebaseSync = {
    init: initFirebase,
    pushCategory: pushCategoryToCloud,
    pushAll: pushAllToCloud,
    pullAll: pullFromCloud,
    listen: listenToCloudChanges
  };

  // Tự động khởi chạy ngay khi tải trang
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(async () => {
      await pullFromCloud();
      listenToCloudChanges();
    }, 800);
  });
})();
