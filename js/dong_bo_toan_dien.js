/**
 * BỘ ĐỒNG BỘ TOÀN DIỆN VÀ TỰ ĐỘNG CHỮA LÀNH ĐA NỀN TẢNG
 * Hỗ trợ chạy trên: Cốc Cốc, Chrome, Safari, Edge, Trình duyệt Điện thoại (iOS / Android)
 * Mục tiêu: Đảm bảo 100% tất cả thiết bị và ứng dụng luôn hiển thị đồng bộ, chuẩn đẹp,
 * không bị lỗi dính chữ, không bị lệch ngày, và không bị lưu cache cũ.
 */
(function() {
  'use strict';

  var BAN_CAP_NHAT_ID = "20261017_FINAL_MASTER_V3";

  // Hàm tự động chuẩn hóa bài viết
  function chuanHoaBaiViet(post, masterFallback) {
    if (!post || typeof post !== 'object') return post;

    // 1. Sửa lỗi chính tả
    ['tieuDe', 'chuyenMuc', 'tomTat', 'noiDung'].forEach(function(field) {
      if (typeof post[field] === 'string' && post[field].indexOf("Đấu Năm") !== -1) {
        post[field] = post[field].replace(/Đấu Năm/g, "Đầu Năm");
      }
    });

    // 2. Kiểm tra nếu là bài Tử Vi 2026 nhưng bị ngày cũ 29/08/2026 hoặc bị dính chữ
    if (post.id === 'tuvi-12-con-giap-dau-nam') {
      var isOldCorrupted = (
        post.ngayDang === '29/08/2026' ||
        !post.tieuDe ||
        (post.noiDung && post.noiDung.indexOf("Khái Niệm Xem Tử Vi Đầu Năm Xem tử vi") !== -1)
      );

      if (isOldCorrupted && masterFallback) {
        post.tieuDe = masterFallback.tieuDe || "TỬ VI 2026";
        post.chuyenMuc = masterFallback.chuyenMuc || "Tử Vi 2026";
        post.tacGia = masterFallback.tacGia || "Thầy Duy Tâm Phúc";
        post.ngayDang = masterFallback.ngayDang || "15/09/2026";
        post.hinhAnh = masterFallback.hinhAnh || "Ảnh Bài Viết Khung 16-9/Tử Vi 2026.png";
        post.tomTat = masterFallback.tomTat || post.tomTat;
        post.noiDung = masterFallback.noiDung || post.noiDung;
        post.updatedAt = masterFallback.updatedAt || 1792220000000;
      }
    }

    // 3. Kiểm tra nếu là bài Xông Đất bị dính chữ
    if (post.id === 'xong-dat-dau-nam-dai-cat') {
      var isXongDatCorrupted = (
        !post.tieuDe ||
        (post.noiDung && post.noiDung.indexOf("Khái Niệm Xông Đất Đầu Năm Xông đất") !== -1)
      );

      if (isXongDatCorrupted && masterFallback) {
        post.tieuDe = masterFallback.tieuDe || "XÔNG ĐẤT ĐẦU NĂM";
        post.chuyenMuc = masterFallback.chuyenMuc || "Xông Đất Đầu Năm 2026";
        post.tacGia = masterFallback.tacGia || "Thầy Duy Tâm Phúc";
        post.ngayDang = masterFallback.ngayDang || "15/09/2026";
        post.hinhAnh = masterFallback.hinhAnh || "Ảnh Bài Viết Khung 16-9/Xông Đất Đầu Năm 2026.png";
        post.tomTat = masterFallback.tomTat || post.tomTat;
        post.noiDung = masterFallback.noiDung || post.noiDung;
        post.updatedAt = masterFallback.updatedAt || 1792220000000;
      }
    }

    // 4. Kiểm tra các bài chuyên mục khác nếu bị dính chữ (h3 strong không có p)
    var otherIds = ["tuvi-ngay-12-con-giap", "tuvi-tuan-chuyen-bien-tai-loc", "tuvi-thang-nguyet-lenh", "tuvi-van-han-dai-van-tieu-han"];
    if (otherIds.indexOf(post.id) !== -1 && masterFallback) {
      if (post.noiDung && post.noiDung.indexOf("PHẦN ") !== -1 && post.noiDung.indexOf("<strong") !== -1 && masterFallback.noiDung) {
        post.noiDung = masterFallback.noiDung;
        post.updatedAt = masterFallback.updatedAt || 1792220000000;
      }
    }

    return post;
  }

  // Khởi chạy tiến trình đồng bộ toàn diện trên trình duyệt
  function thucHienDongBoToanDien() {
    try {
      var master = window.DEFAULT_RECOVERED_ARTICLES_FALLBACK || window.ORIGINAL_RECOVERED_ARTICLES_BACKUP;
      if (!master) return;

      // Tạo từ điển tra cứu nhanh bài viết từ tệp gốc
      var masterMap = {};
      Object.keys(master).forEach(function(key) {
        if (Array.isArray(master[key])) {
          master[key].forEach(function(p) {
            if (p && p.id) masterMap[p.id] = p;
          });
        }
      });

      var storageKeys = [
        "TUVI_BAI_VIET_CUSTOM",
        "BAI_VIET_CHUYEN_MUC",
        "XEMNGAY_BAI_VIET_CUSTOM",
        "XEMTUOI_BAI_VIET_CUSTOM",
        "TAMLINH_LENGHI_DATA"
      ];

      var coThayDoi = false;

      storageKeys.forEach(function(k) {
        try {
          var raw = localStorage.getItem(k);
          if (!raw) {
            // Nếu trình duyệt chưa có dữ liệu (như trên điện thoại hoặc Chrome mới mở), nạp trọn vẹn từ master
            if (master[k] && Array.isArray(master[k])) {
              localStorage.setItem(k, JSON.stringify(master[k]));
              coThayDoi = true;
            }
            return;
          }

          var list = JSON.parse(raw);
          if (!Array.isArray(list)) return;

          var listChanged = false;
          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (!item || !item.id) continue;

            var masterItem = masterMap[item.id];
            var beforeStr = JSON.stringify(item);
            list[i] = chuanHoaBaiViet(item, masterItem);
            var afterStr = JSON.stringify(list[i]);

            if (beforeStr !== afterStr) {
              listChanged = true;
            }
          }

          if (listChanged) {
            localStorage.setItem(k, JSON.stringify(list));
            coThayDoi = true;
          }
        } catch (eStorage) {
          console.warn("Lỗi kiểm tra storage key:", k, eStorage);
        }
      });

      // Đánh dấu phiên bản đồng bộ thành công trên máy này
      localStorage.setItem("DONG_BO_VERSION", BAN_CAP_NHAT_ID);

      if (coThayDoi) {
        console.log("✅ Đã hoàn tất đồng bộ toàn diện: Tất cả bài viết đã được làm sạch và chuẩn hóa!");
        if (typeof window.syncChuyenMuc === 'function') {
          setTimeout(window.syncChuyenMuc, 30);
        }
        if (typeof window.renderChuyenMucTab === 'function') {
          setTimeout(window.renderChuyenMucTab, 50);
        }
      }
    } catch(errAll) {
      console.warn("Lỗi đồng bộ toàn diện:", errAll);
    }
  }

  // Tự động chạy ngay lập tức khi file script được tải
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", thucHienDongBoToanDien);
  } else {
    thucHienDongBoToanDien();
  }

  // Cung cấp hàm công khai cho trang viet-bai.html gọi khi cần
  window.kichHoatDongBoToanDien = thucHienDongBoToanDien;
})();
