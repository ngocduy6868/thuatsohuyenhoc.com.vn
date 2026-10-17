/**
 * BỘ ĐIỀU PHỐI ĐỒNG BỘ ĐẦU NÃO GITHUB (GITHUB SYNC ENGINE)
 * Cho phép trang viết bài viet-bai.html giao tiếp và đẩy trực tiếp bài viết lên GitHub Repository
 * Tác giả: Thuật Số Huyền Học
 */
(function() {
  'use strict';

  var GITHUB_OWNER = "ngocduy6868";
  var GITHUB_REPO = "thuatsohuyenhoc.com.vn";
  var GITHUB_BRANCH = "main";
  var STORAGE_TOKEN_KEY = "GITHUB_SYNC_TOKEN_SECURE";

  // Hàm chuyển chuỗi UTF-8 sang Base64 chuẩn
  function utf8ToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }

  // Thu thập dữ liệu bài viết mới nhất từ LocalStorage của máy
  function thuThapDuLieuBaiViet() {
    var keys = [
      "TUVI_BAI_VIET_CUSTOM",
      "BAI_VIET_CHUYEN_MUC_CUSTOM",
      "BAI_VIET_CHUYEN_MUC",
      "XEMNGAY_BAI_VIET_CUSTOM",
      "XEMTUOI_BAI_VIET_CUSTOM",
      "TAMLINH_BAI_VIET_CUSTOM",
      "PHONGTHUY_BAI_VIET_CUSTOM",
      "KIENTHUC_BAI_VIET_CUSTOM",
      "TUONGSO_BAI_VIET_CUSTOM",
      "TAMLINH_LENGHI_DATA"
    ];

    var outObj = {};
    keys.forEach(function(k) {
      try {
        var raw = localStorage.getItem(k);
        if (raw) {
          outObj[k] = JSON.parse(raw);
        }
      } catch(e) {}
    });

    return outObj;
  }

  // Tạo giao diện Modal nếu chưa có
  function taoGiaoDienModal() {
    if (document.getElementById("modal-github-sync")) return;

    var modalHtml = `
    <div id="modal-github-sync" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 999999; justify-content: center; align-items: center; padding: 15px; font-family: 'Inter', system-ui, sans-serif;">
      <div style="background: #FFFFFF; border: 2px solid #DFBA73; border-radius: 12px; width: 100%; max-width: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); overflow: hidden; animation: fadeInModal 0.25s ease;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7A1414, #4A0E0E); color: #FFE6AA; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #DFBA73;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">🚀</span>
            <div>
              <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #FFE6AA; letter-spacing: 0.5px;">XUẤT BẢN THẲNG LÊN GITHUB & PHÁT SÓNG TOÀN CẦU</h3>
              <div style="font-size: 11.5px; color: #EBD3AB; margin-top: 2px;">Kho trung tâm: <strong>${GITHUB_OWNER}/${GITHUB_REPO}</strong> (Nhánh: <strong>${GITHUB_BRANCH}</strong>)</div>
            </div>
          </div>
          <button type="button" onclick="dongModalXuatBanGitHub()" style="background: transparent; border: none; color: #FFE6AA; font-size: 22px; cursor: pointer; line-height: 1;" title="Đóng">✖</button>
        </div>

        <!-- Body -->
        <div style="padding: 20px 24px; max-height: 75vh; overflow-y: auto; color: #2C241E;">
          
          <!-- Hộp cấu hình Token -->
          <div style="background: #FAF7F2; border: 1.5px solid #DFBA73; border-radius: 8px; padding: 14px 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="font-size: 13px; font-weight: 800; color: #7A1414;">🔑 Chìa Khóa Bảo Mật (GitHub Personal Access Token):</label>
              <a href="https://github.com/settings/tokens/new?scopes=repo&description=ThuatSoHuyenHoc_WebSync" target="_blank" style="font-size: 12px; color: #0D5CB6; text-decoration: underline; font-weight: 700;">+ Tạo Token trên GitHub</a>
            </div>
            
            <div style="display: flex; gap: 8px;">
              <input id="github-token-input" type="password" placeholder="Dán mã ghp_... vào đây (chỉ cần nhập 1 lần)" style="flex: 1; padding: 8px 12px; border: 1px solid #DFBA73; border-radius: 5px; font-family: monospace; font-size: 13px; color: #2C241E; background: #FFF;">
              <button type="button" onclick="toggleTokenVisibility()" style="background: #FFF; border: 1px solid #DFBA73; border-radius: 5px; padding: 0 10px; cursor: pointer;" title="Ẩn/Hiện mã token">👁️</button>
              <button type="button" onclick="luuTokenGitHub()" style="background: #7A1414; color: #FFE6AA; border: 1px solid #DFBA73; border-radius: 5px; padding: 0 14px; font-weight: 700; font-size: 12.5px; cursor: pointer;">Lưu</button>
            </div>
            <div id="token-status-msg" style="font-size: 11.5px; color: #666; margin-top: 6px;">
              <em>Chìa khóa này được lưu an toàn riêng trong bộ nhớ máy của bạn, giúp trình duyệt tự động đẩy bài lên GitHub.</em>
            </div>
          </div>

          <!-- Nhật ký tiến trình xuất bản -->
          <div id="github-sync-logs" style="background: #1E1E1E; color: #A9DC76; border-radius: 8px; padding: 12px 14px; font-family: 'Consolas', monospace; font-size: 12.5px; line-height: 1.6; min-height: 100px; max-height: 180px; overflow-y: auto; margin-bottom: 16px; border: 1px solid #444;">
            <div style="color: #FFE6AA;">> Sẵn sàng xuất bản bài viết lên đầu não GitHub...</div>
          </div>

          <!-- Thông tin giải thích -->
          <div style="font-size: 12.5px; color: #554433; line-height: 1.6; background: #FFF9E6; border-left: 4px solid #DFBA73; padding: 10px 14px; border-radius: 4px; margin-bottom: 18px;">
            💡 <strong>Cơ chế hoạt động 2 tay:</strong> Khi bấm nút bên dưới, toàn bộ bài viết mới trên máy bạn sẽ được truyền thẳng lên <strong>GitHub</strong>. GitHub sẽ tự động phân phối ngay lập tức tới <strong>Điện thoại</strong> và toàn bộ các trình duyệt truy cập web!
          </div>

          <!-- Nút hành động chính -->
          <div style="display: flex; gap: 10px; justify-content: flex-end; align-items: center; border-top: 1px solid #EADBCC; padding-top: 14px;">
            <button type="button" onclick="dongModalXuatBanGitHub()" style="background: #FAF3E8; border: 1px solid #DFBA73; color: #7A1414; padding: 8px 18px; border-radius: 6px; font-weight: 700; font-size: 13px; cursor: pointer;">
              Đóng Lại
            </button>
            <button id="btn-start-github-push" type="button" onclick="thucHienXuatBanGitHub()" style="background: linear-gradient(135deg, #7A1414, #B81414); color: #FFF; border: 1.5px solid #DFBA73; padding: 9px 22px; border-radius: 6px; font-weight: 800; font-size: 13.5px; cursor: pointer; box-shadow: 0 3px 8px rgba(122,20,20,0.3); display: flex; align-items: center; gap: 8px;">
              <span>🚀</span> BẮT ĐẦU XUẤT BẢN LÊN GITHUB
            </button>
          </div>

        </div>
      </div>
    </div>
    <style>
      @keyframes fadeInModal {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    </style>
    `;

    var divWrap = document.createElement("div");
    divWrap.innerHTML = modalHtml;
    document.body.appendChild(divWrap.firstElementChild);

    // Nạp token đã lưu nếu có
    var savedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (savedToken) {
      var inp = document.getElementById("github-token-input");
      if (inp) inp.value = savedToken;
      var statusMsg = document.getElementById("token-status-msg");
      if (statusMsg) statusMsg.innerHTML = '<span style="color: #2e7d32; font-weight: 700;">✓ Đã sẵn sàng kết nối với GitHub (' + savedToken.substring(0, 7) + '...)</span>';
    }
  }

  // Mở modal
  window.moModalXuatBanGitHub = function() {
    taoGiaoDienModal();
    var m = document.getElementById("modal-github-sync");
    if (m) {
      m.style.display = "flex";
      var savedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (savedToken) {
        var inp = document.getElementById("github-token-input");
        if (inp) inp.value = savedToken;
      }
    }
  };

  // Đóng modal
  window.dongModalXuatBanGitHub = function() {
    var m = document.getElementById("modal-github-sync");
    if (m) m.style.display = "none";
  };

  // Ẩn / Hiện Token
  window.toggleTokenVisibility = function() {
    var inp = document.getElementById("github-token-input");
    if (inp) {
      inp.type = inp.type === "password" ? "text" : "password";
    }
  };

  // Lưu Token vào LocalStorage
  window.luuTokenGitHub = function() {
    var inp = document.getElementById("github-token-input");
    if (!inp) return;
    var val = inp.value.trim();
    if (!val) {
      alert("Vui lòng dán mã GitHub Personal Access Token!");
      return;
    }
    localStorage.setItem(STORAGE_TOKEN_KEY, val);
    var statusMsg = document.getElementById("token-status-msg");
    if (statusMsg) {
      statusMsg.innerHTML = '<span style="color: #2e7d32; font-weight: 700;">✓ Đã lưu chìa khóa Token thành công!</span>';
    }
    alert("Đã lưu chìa khóa GitHub Token an toàn trên máy tính của bạn!");
  };

  // Hàm ghi nhật ký ra màn hình
  function ghiLog(msg, color) {
    var box = document.getElementById("github-sync-logs");
    if (!box) return;
    var line = document.createElement("div");
    if (color) line.style.color = color;
    line.textContent = "> " + msg;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  // Tiến trình xuất bản bài viết lên GitHub API
  window.thucHienXuatBanGitHub = async function() {
    var token = (localStorage.getItem(STORAGE_TOKEN_KEY) || "").trim();
    var inp = document.getElementById("github-token-input");
    if (inp && inp.value.trim()) {
      token = inp.value.trim();
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    }

    if (!token) {
      alert("Bạn chưa nhập mã GitHub Personal Access Token!\nHãy bấm link 'Tạo Token trên GitHub' ở phía trên để lấy mã dán vào.");
      if (inp) inp.focus();
      return;
    }

    var btn = document.getElementById("btn-start-github-push");
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = "0.6";
      btn.innerHTML = '<span>⏳</span> ĐANG XUẤT BẢN...';
    }

    var logBox = document.getElementById("github-sync-logs");
    if (logBox) logBox.innerHTML = "";

    try {
      ghiLog("Khởi động tiến trình đồng bộ đầu não GitHub...", "#FFE6AA");

      // 1. Thu thập dữ liệu
      ghiLog("Đang đóng gói danh mục toàn bộ bài viết mới nhất...", "#A9DC76");
      var dataObj = thuThapDuLieuBaiViet();
      var jsonStr = JSON.stringify(dataObj, null, 2);
      var jsFileContent = "/** KHO DỮ LIỆU BÀI VIẾT VẬT LÝ CHUẨN TỰ ĐỘNG ĐỒNG BỘ */\nwindow.ORIGINAL_RECOVERED_ARTICLES_BACKUP = " + jsonStr + ";\n";

      // 2. Cập nhật tệp js/original_recovered_articles_backup.json
      ghiLog("Đang kết nối GitHub API để lấy thông tin tệp sao lưu...", "#A9DC76");
      await dayFileLenGitHub("js/original_recovered_articles_backup.json", jsonStr, token, "Cập nhật dữ liệu sao lưu bài viết từ Web Composer");

      // 3. Cập nhật tệp js/bai_viet_luu_tru_chuan.js
      ghiLog("Đang đẩy bản mã nguồn bài viết chuẩn lên GitHub...", "#A9DC76");
      await dayFileLenGitHub("js/bai_viet_luu_tru_chuan.js", jsFileContent, token, "Đồng bộ bài viết chuẩn vật lý từ Web Composer");

      ghiLog("🎉 XUẤT BẢN THÀNH CÔNG 100% LÊN GITHUB!", "#00E676");
      ghiLog("Toàn bộ các trình duyệt và điện thoại sẽ tự động nhận bản mới trong giây lát!", "#FFE6AA");
      alert("🎉 XUẤT BẢN THÀNH CÔNG LÊN GITHUB!\n\nBài viết của bạn đã được đưa lên Trung tâm Đầu não GitHub và đang tự động phát sóng tới Điện thoại cùng toàn bộ người đọc!");

    } catch (err) {
      console.error("Lỗi xuất bản GitHub:", err);
      ghiLog("❌ LỖI XUẤT BẢN: " + (err.message || err), "#FF5252");
      alert("Lỗi khi kết nối GitHub: " + (err.message || err) + "\n\nVui lòng kiểm tra lại mã Token của bạn xem đã tích chọn quyền 'repo' chưa.");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = '<span>🚀</span> BẮT ĐẦU XUẤT BẢN LÊN GITHUB';
      }
    }
  };

  // Hàm gọi GitHub REST API để cập nhật 1 tệp trên repository
  async function dayFileLenGitHub(filePath, fileContent, token, commitMsg) {
    var apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;

    // Lấy SHA hiện tại của tệp trên GitHub
    var sha = null;
    try {
      var getRes = await fetch(apiUrl, {
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/vnd.github+json"
        }
      });
      if (getRes.ok) {
        var fileMeta = await getRes.json();
        sha = fileMeta.sha;
      }
    } catch(eGet) {}

    // Gửi PUT request để tạo commit mới
    var putUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    var base64Data = utf8ToBase64(fileContent);

    var bodyPayload = {
      message: commitMsg + " (" + new Date().toLocaleString("vi-VN") + ")",
      content: base64Data,
      branch: GITHUB_BRANCH
    };
    if (sha) {
      bodyPayload.sha = sha;
    }

    var putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyPayload)
    });

    if (!putRes.ok) {
      var errData = await putRes.json().catch(function() { return {}; });
      throw new Error(errData.message || ("Mã lỗi HTTP " + putRes.status));
    }

    return await putRes.json();
  }

  // Khởi tạo nút trên giao diện sau khi DOM sẵn sàng
  function khoiTaoNutTrenGiaoDien() {
    // Tự động gắn modal sẵn
    taoGiaoDienModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", khoiTaoNutTrenGiaoDien);
  } else {
    khoiTaoNutTrenGiaoDien();
  }
})();
