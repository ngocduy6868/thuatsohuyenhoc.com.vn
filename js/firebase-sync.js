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
  const scheduledPushMap = {};

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

      let successCount = 0;
      let hasData = false;

      // Thử dùng Batch trước để tối ưu tốc độ
      try {
        const batch = database.batch();
        SYNC_KEYS.forEach(key => {
          const val = localStorage.getItem(key) || "[]";
          const docRef = database.collection("articles_sync").doc(key);
          batch.set(docRef, {
            data: val,
            updatedAt: Date.now()
          });
          hasData = true;
        });
        if (hasData) {
          await batch.commit();
          console.log("☁️ ĐÃ ĐỒNG BỘ TOÀN BỘ BÀI VIẾT LÊN CLOUD THÀNH CÔNG (BATCH)!");
          return true;
        }
      } catch(batchErr) {
        console.warn("Batch commit gặp trục trặc, tự động chuyển sang đẩy từng chuyên mục:", batchErr);
      }

      // Fallback: Đẩy từng document độc lập nếu Batch quá tải
      for (const key of SYNC_KEYS) {
        const val = localStorage.getItem(key) || "[]";
        try {
          await database.collection("articles_sync").doc(key).set({
            data: val,
            updatedAt: Date.now()
          });
          successCount++;
        } catch(docErr) {
          console.warn("Lỗi đẩy key:", key, docErr);
        }
      }

      if (successCount > 0) {
        console.log("☁️ ĐÃ ĐỒNG BỘ THÀNH CÔNG " + successCount + " CHUYÊN MỤC LÊN CLOUD!");
        return true;
      }
      return false;
    } catch(err) {
      console.error("Lỗi pushAllToCloud:", err);
      return false;
    }
  }

  // Xóa sạch các bài viết đã bị ẩn/xóa khỏi tất cả các kho lưu trữ chuyên mục
  function purgeHiddenPostsFromAllStorages(hiddenArray) {
    if (!Array.isArray(hiddenArray) || hiddenArray.length === 0) return;
    const hSet = new Set(hiddenArray);
    const catKeys = [
      "BAI_VIET_CHUYEN_MUC_CUSTOM",
      "XEMNGAY_BAI_VIET_CUSTOM",
      "TUVI_BAI_VIET_CUSTOM",
      "XEMTUOI_BAI_VIET_CUSTOM",
      "TAMLINH_BAI_VIET_CUSTOM",
      "PHONGTHUY_BAI_VIET_CUSTOM",
      "KIENTHUC_BAI_VIET_CUSTOM",
      "TUONGSO_BAI_VIET_CUSTOM"
    ];
    catKeys.forEach(ck => {
      try {
        const raw = localStorage.getItem(ck);
        if (!raw) return;
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          const filtered = list.filter(p => p && p.id && !hSet.has(p.id));
          if (filtered.length !== list.length) {
            localStorage.setItem(ck, JSON.stringify(filtered));
          }
        }
      } catch(e) {}
    });
  }

  // HÀM HỢP NHẤT THÔNG MINH (SMART MERGE): Giữ nguyên 100% bài có updatedAt mới hơn
  function smartMergeCategoryData(key, cloudRaw, isFromCloud) {
    if (!cloudRaw) return false;
    const localVal = localStorage.getItem(key);
    if (!localVal) {
      localStorage.setItem(key, cloudRaw);
      return true;
    }

    if (key === "BAI_VIET_HIDDEN_IDS") {
      try {
        const cloudH = JSON.parse(cloudRaw || "[]");
        if (Array.isArray(cloudH)) {
          const localH = JSON.parse(localVal || "[]");
          const unionH = Array.from(new Set([...cloudH, ...localH]));
          ["BAI_VIET_HIDDEN_IDS", "XEMNGAY_HIDDEN_IDS", "XEMTUOI_HIDDEN_IDS", "TUVI_HIDDEN_IDS", "TAMLINH_HIDDEN_IDS", "PHONGTHUY_HIDDEN_IDS", "KIENTHUC_HIDDEN_IDS", "TUONGSO_HIDDEN_IDS"].forEach(hk => {
            try {
              let hList = JSON.parse(localStorage.getItem(hk) || "[]");
              let uList = Array.from(new Set([...hList, ...unionH]));
              localStorage.setItem(hk, JSON.stringify(uList));
            } catch(e) {}
          });
          purgeHiddenPostsFromAllStorages(unionH);
          if (JSON.stringify(unionH) !== JSON.stringify(localH)) {
            return true;
          }
        }
      } catch(e) {}
      return false;
    }

    try {
      const localArr = JSON.parse(localVal);
      let cloudArr = JSON.parse(cloudRaw);
      if (!Array.isArray(cloudArr) || cloudArr.length === 0) return false;
      if (!Array.isArray(localArr) || localArr.length === 0) {
        localStorage.setItem(key, cloudRaw);
        return true;
      }

      // Danh sách các ID bài viết đã bị người dùng xóa
      const hiddenSet = new Set();
      ["BAI_VIET_HIDDEN_IDS", "XEMNGAY_HIDDEN_IDS", "XEMTUOI_HIDDEN_IDS", "TUVI_HIDDEN_IDS", "TAMLINH_HIDDEN_IDS", "PHONGTHUY_HIDDEN_IDS", "KIENTHUC_HIDDEN_IDS", "TUONGSO_HIDDEN_IDS"].forEach(hk => {
        try {
          const arr = JSON.parse(localStorage.getItem(hk) || "[]");
          if (Array.isArray(arr)) arr.forEach(id => hiddenSet.add(id));
        } catch(e) {}
      });
      [
        "tuvi-post-ban-ve-sao-khong-kiep-mvary3y7",
        "bai-kham-thien-thien-tuong",
        "sao-that-sat-trong-tu-vi-dau-so",
        "sao-pha-quan-trong-tu-vi-dau-so",
        "sao-tham-lang-trong-tu-vi-dau-so",
        "bai-viet-moi-cua-ban",
        "post-trach-nhat-la-gi-nguyen-tac-chon-ng-mulpzbi0"
      ].forEach(id => hiddenSet.add(id));

      // Đối với kho Chuyên mục tổng hợp: bỏ qua các bài đã thuộc kho chuyên mục cụ thể
      if (key === "BAI_VIET_CHUYEN_MUC_CUSTOM") {
        const specificKeys = [
          "XEMNGAY_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM", "TUVI_BAI_VIET_CUSTOM",
          "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM",
          "TUONGSO_BAI_VIET_CUSTOM"
        ];
        const specificIds = new Set();
        specificKeys.forEach(sk => {
          try {
            const arr = JSON.parse(localStorage.getItem(sk) || "[]");
            if (Array.isArray(arr)) arr.forEach(item => { if (item && item.id) specificIds.add(item.id); });
          } catch(e) {}
        });
        cloudArr = cloudArr.filter(cp => cp && cp.id && !specificIds.has(cp.id));
      }

      const localMap = {};
      localArr.forEach(p => { if (p && p.id) localMap[p.id] = p; });

      // Lọc sạch các bài đã bị xóa khỏi mergedArr
      const mergedArr = localArr.filter(p => p && p.id && !hiddenSet.has(p.id));
      let hasChange = (mergedArr.length !== localArr.length);
      let hasLocalNewer = false;
      const nowMax = Date.now() + 60000;

      // Kiểm tra nếu local có bài mới tạo mà Cloud chưa có
      const cloudMap = {};
      cloudArr.forEach(p => { if (p && p.id) cloudMap[p.id] = p; });
      localArr.forEach(lp => {
        if (lp && lp.id && !hiddenSet.has(lp.id) && !cloudMap[lp.id]) {
          hasLocalNewer = true;
        }
      });

      cloudArr.forEach(cp => {
        if (!cp || !cp.id || hiddenSet.has(cp.id)) return;
        const lp = localMap[cp.id];
        if (!lp) {
          // Bài mới từ Cloud chưa có trong máy -> Thêm vào
          mergedArr.push(cp);
          hasChange = true;
        } else {
          // Cả 2 đều có: CHỈ CẬP NHẬT nếu Cloud có updatedAt MỚI HƠN bản trong máy
          let cUp = Number(cp.updatedAt) || 0;
          let lUp = Number(lp.updatedAt) || 0;
          if (cUp > nowMax) cUp = 0;
          if (lUp > nowMax) lUp = 0;

          if (cUp > lUp) {
            const idx = mergedArr.findIndex(x => x && x.id === cp.id);
            if (idx !== -1) {
              mergedArr[idx] = cp;
              hasChange = true;
            }
          } else if (lUp > cUp) {
            hasLocalNewer = true;
          }
        }
      });

      if (hasChange) {
        try {
          localStorage.setItem(key, JSON.stringify(mergedArr));
        } catch(errSet) {
          console.warn("Bộ nhớ localStorage đã đầy khi lưu " + key + ":", errSet);
        }
      }

      // Nếu bản nội bộ trong máy mới hơn Cloud và KHÔNG PHẢI đang nhận sự kiện từ Cloud -> Đẩy lên Cloud (Debounce an toàn)
      if (hasLocalNewer && !isFromCloud) {
        if (!scheduledPushMap[key]) {
          scheduledPushMap[key] = setTimeout(() => {
            delete scheduledPushMap[key];
            pushCategoryToCloud(key, localStorage.getItem(key));
          }, 3500);
        }
      }

      return hasChange;
    } catch(e) {
      console.warn("Lỗi smartMergeCategoryData:", e);
    }
    return false;
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
          if (smartMergeCategoryData(key, cloudDoc.data, true)) {
            hasChanges = true;
          }
        }
      });

      if (hasChanges || forceRefresh) {
        console.log("☁️ Dữ liệu từ Firebase Cloud đã được cập nhật thông minh vào máy!");
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
              if (smartMergeCategoryData(key, cloudDoc.data, true)) {
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

  let refreshTimer = null;
  function triggerUIRefresh() {
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
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
    }, 350);
  }

  // Export ra toàn cầu
  window.FirebaseSync = {
    init: initFirebase,
    pushCategory: pushCategoryToCloud,
    pushAll: pushAllToCloud,
    pullAll: pullFromCloud,
    listen: listenToCloudChanges,
    purgeHiddenPosts: purgeHiddenPostsFromAllStorages
  };

  // Tự động khởi chạy ngay khi tải trang
  document.addEventListener("DOMContentLoaded", function() {
    try {
      const hList = JSON.parse(localStorage.getItem("BAI_VIET_HIDDEN_IDS") || "[]");
      purgeHiddenPostsFromAllStorages(hList);
    } catch(e) {}
    setTimeout(async () => {
      await pullFromCloud();
      listenToCloudChanges();
    }, 800);
  });
})();
