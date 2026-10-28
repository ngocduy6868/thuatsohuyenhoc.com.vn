/**
 * THUẬT SỐ HUYỀN HỌC - Main JavaScript Application
 * Xử lý các tương tác Lập lá số Tử Vi, Bói dịch Kinh Dịch, Phong thủy Bát Trạch,
 * Xem ngày Hoàng Đạo, Giỏ hàng, Modal và Responsive Menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDateDropdowns();
  initTuViForm();
  initKinhDichModal();
  initPhongThuyModal();
  initHoangDaoModal();
  initHeroOrderModal();
  initCart();
  initSearch();
  initToast();
  initStarArticles();
});

// Toast notification helper
function showToast(message, type = 'success') {
  const toast = document.getElementById('global-toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3200);
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }
}

// Thiên Can & Địa Chi Calculations
const THIEN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const NGU_HANH = ['Kim', 'Thủy', 'Hỏa', 'Thổ', 'Mộc'];

function getCanChiYear(year) {
  const canIndex = (year + 6) % 10;
  const chiIndex = (year + 8) % 12;
  return `${THIEN_CAN[canIndex]} ${DIA_CHI[chiIndex]}`;
}

function getNguHanhMenh(year) {
  const canVal = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][(year + 6) % 10];
  const chiVal = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2][(year + 8) % 12];
  let sum = canVal + chiVal;
  if (sum > 5) sum -= 5;
  const menhMap = {
    1: 'Hải Trung Kim (Vàng trong biển)',
    2: 'Đại Khê Thủy (Nước khe lớn)',
    3: 'Tích Lịch Hỏa (Lửa sấm sét)',
    4: 'Lộ Bàng Thổ (Đất ven đường)',
    5: 'Bình Địa Mộc (Gỗ đồng bằng)'
  };
  return menhMap[sum] || 'Sa Trung Kim';
}

// Populate Day/Month/Year/Hour Dropdowns in Tử Vi Form
function initDateDropdowns() {
  const daySelect = document.getElementById('tuvi-day');
  const monthSelect = document.getElementById('tuvi-month');
  const yearSelect = document.getElementById('tuvi-year');
  const hourSelect = document.getElementById('tuvi-hour');

  if (daySelect && daySelect.options.length === 0) {
    for (let i = 1; i <= 31; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i < 10 ? '0' + i : i;
      if (i === 8) opt.selected = true;
      daySelect.appendChild(opt);
    }
  }

  if (monthSelect && monthSelect.options.length === 0) {
    for (let i = 1; i <= 12; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = 'Tháng ' + (i < 10 ? '0' + i : i);
      if (i === 8) opt.selected = true;
      monthSelect.appendChild(opt);
    }
  }

  // Tùy biến hiển thị danh sách năm: Nếu là Âm lịch hiển thị rõ Can Chi (ví dụ: 1993 (Quý Dậu))
  window.updateTuViYearOptions = function (isLunar) {
    if (!yearSelect) return;
    const currentVal = parseInt(yearSelect.value, 10) || 2008;
    yearSelect.innerHTML = '';
    const currentYear = 2026;
    for (let y = currentYear; y >= 1940; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      const canChi = getCanChiYear(y);
      if (isLunar) {
        opt.textContent = `${y} (${canChi})`;
      } else {
        opt.textContent = y;
      }
      if (y === currentVal) opt.selected = true;
      yearSelect.appendChild(opt);
    }
  };

  const initialCalendarType = document.querySelector('input[name="calendar-type"]:checked')?.value || 'Dương lịch';
  window.updateTuViYearOptions(initialCalendarType === 'Âm lịch');

  if (hourSelect && hourSelect.options.length === 0) {
    const canhhours = [
      { val: 'Giờ Tý (23h - 01h)', name: 'Tý (23h - 01h)' },
      { val: 'Giờ Sửu (01h - 03h)', name: 'Sửu (01h - 03h)' },
      { val: 'Giờ Dần (03h - 05h)', name: 'Dần (03h - 05h)' },
      { val: 'Giờ Mão (05h - 07h)', name: 'Mão (05h - 07h)' },
      { val: 'Giờ Thìn (07h - 09h)', name: 'Thìn (07h - 09h)', default: true },
      { val: 'Giờ Tị (09h - 11h)', name: 'Tỵ (09h - 11h)' },
      { val: 'Giờ Ngọ (11h - 13h)', name: 'Ngọ (11h - 13h)' },
      { val: 'Giờ Mùi (13h - 15h)', name: 'Mùi (13h - 15h)' },
      { val: 'Giờ Thân (15h - 17h)', name: 'Thân (15h - 17h)' },
      { val: 'Giờ Dậu (17h - 19h)', name: 'Dậu (17h - 19h)' },
      { val: 'Giờ Tuất (19h - 21h)', name: 'Tuất (19h - 21h)' },
      { val: 'Giờ Hợi (21h - 23h)', name: 'Hợi (21h - 23h)' }
    ];
    canhhours.forEach(h => {
      const opt = document.createElement('option');
      opt.value = h.val;
      opt.textContent = h.name;
      if (h.val.includes('09h - 11h')) opt.selected = true;
      hourSelect.appendChild(opt);
    });
  }

  const viewYearSelect = document.getElementById('tuvi-view-year');
  if (viewYearSelect && viewYearSelect.options.length === 0) {
    for (let y = 2035; y >= 2020; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      const cc = getCanChiYear(y);
      opt.textContent = `${y} (${cc})`;
      if (y === 2026) opt.selected = true;
      viewYearSelect.appendChild(opt);
    }
  }

  // Cập nhật thông tin xem trước Ngày & Năm Can Chi theo thời gian thực
  window.updateTuViDatePreview = function () {
    const hintEl = document.getElementById('tuvi-date-hint-text');
    if (!hintEl) return;
    const isLunar = document.querySelector('input[name="calendar-type"]:checked')?.value === 'Âm lịch';
    const d = parseInt(daySelect?.value || '8', 10);
    const m = parseInt(monthSelect?.value || '8', 10);
    const y = parseInt(yearSelect?.value || '2008', 10);
    const hText = hourSelect?.options[hourSelect.selectedIndex]?.text || 'Tỵ (09h - 11h)';
    const canChi = getCanChiYear(y);

    if (isLunar) {
      hintEl.innerHTML = `<span class="inline-flex items-center gap-1 font-semibold text-[#8B1E1E]"><i class="fa-regular fa-moon text-[11px]"></i> Âm lịch: Ngày ${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m} năm <strong>${canChi}</strong> (${y}) - Giờ ${hText}</span>`;
    } else {
      let lunStr = '';
      if (typeof window !== 'undefined' && window.LICH_VAN_NIEN_ENGINE && window.LICH_VAN_NIEN_ENGINE.convertSolar2Lunar) {
        const lun = window.LICH_VAN_NIEN_ENGINE.convertSolar2Lunar(d, m, y, 7.0);
        lunStr = ` • <span class="text-[#8B1E1E] font-semibold">ÂL: ${lun.day < 10 ? '0' + lun.day : lun.day}/${lun.month < 10 ? '0' + lun.month : lun.month}/${canChi}</span>`;
      }
      hintEl.innerHTML = `<span class="inline-flex items-center gap-1 text-stone-600"><i class="fa-regular fa-sun text-[11px] text-amber-600"></i> Dương lịch: ${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y} (${canChi})${lunStr} - Giờ ${hText}</span>`;
    }
  };

  // Lắng nghe sự kiện chuyển đổi Dương lịch / Âm lịch
  document.querySelectorAll('input[name="calendar-type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const isLunar = e.target.value === 'Âm lịch';
      window.updateTuViYearOptions(isLunar);
      window.updateTuViDatePreview();
    });
  });

  // Lắng nghe sự kiện thay đổi ngày/tháng/năm/giờ
  [daySelect, monthSelect, yearSelect, hourSelect].forEach(sel => {
    sel?.addEventListener('change', () => {
      window.updateTuViDatePreview();
    });
  });

  // Khởi tạo preview ban đầu
  window.updateTuViDatePreview();
}

// 1. Lập Lá Số Tử Vi Form & Modal
function initTuViForm() {
  const form = document.getElementById('tuvi-quick-form');
  const modal = document.getElementById('tuvi-modal');
  const closeModalBtn = document.getElementById('close-tuvi-modal');
  const downloadBtn = document.getElementById('download-tuvi-image-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('tuvi-name')?.value.trim() || 'Thân Chủ Tín Tâm';
      const day = document.getElementById('tuvi-day')?.value || '8';
      const month = document.getElementById('tuvi-month')?.value || '8';
      const year = parseInt(document.getElementById('tuvi-year')?.value || '2008', 10);
      const hour = document.getElementById('tuvi-hour')?.value || 'Giờ Thìn (07h - 09h)';
      const viewYear = parseInt(document.getElementById('tuvi-view-year')?.value || '2026', 10);
      const gender = document.querySelector('input[name="tuvi-gender"]:checked')?.value || 'Nam';
      const calendarType = document.querySelector('input[name="calendar-type"]:checked')?.value || 'Dương lịch';

      const canChi = getCanChiYear(year);
      const viewCanChi = getCanChiYear(viewYear);
      const nguHanh = getNguHanhMenh(year);

      // Populate legacy modal elements safely if present
      const setSafeText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setSafeText('res-tuvi-name', name);
      setSafeText('res-tuvi-dob', `${day}/${month}/${year} (${calendarType}) - ${hour}`);
      setSafeText('res-tuvi-gender', gender);
      setSafeText('res-tuvi-canchi', canChi);
      setSafeText('res-tuvi-menh', nguHanh);
      setSafeText('res-tuvi-cuc', 'Thủy Nhị Cục (Thân cư Thê)');

      // Mở modal TRƯỚC khi vẽ: html2canvas không kết xuất được phần tử đang display:none
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }

      // Render 12 Palaces dynamically with TuViEngine
      render12Palaces({ name, day, month, year, hour, gender, calendarType, viewYear });
      showToast(`Đã an sao lập lá số Tử Vi (${calendarType}) thành công!`);
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // Handle Download Lá Số as high-resolution PNG image
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const boardElement = document.querySelector('.tuvi-board') || document.getElementById('tuvi-12-palaces');
      if (!boardElement) return;

      showToast('Đang kết xuất hình ảnh Lá Số Tử Vi...');

      if (window.html2canvas) {
        html2canvas(boardElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#EDECE6',
          logging: false
        }).then(canvas => {
          const nameInput = document.getElementById('tuvi-name')?.value.trim() || 'Than_Chu';
          const cleanName = nameInput.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_');
          const link = document.createElement('a');
          link.download = `La_So_Tu_Vi_${cleanName}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          showToast('Đã tải thành công ảnh lá số về máy!');
        }).catch(err => {
          console.error('Lỗi khi xuất ảnh lá số:', err);
          window.print();
        });
      } else {
        window.print();
      }
    });
  }
}

// Render Đồ Bản Lá Số Tử Vi Chuẩn 4x4 Tự Động Hóa Toàn Diện
function render12Palaces(userData) {
  if (typeof window.invalidateTuViImageCache === 'function') {
    window.invalidateTuViImageCache();
  }
  const container = document.getElementById('tuvi-12-palaces');
  if (!container) return;

  if (typeof TuViEngine === 'undefined') {
    console.error('TuViEngine chưa được tải!');
    return;
  }

  // Gọi động cơ Tử Vi tính toán toàn bộ 12 cung và Thiên Bàn
  const laSo = TuViEngine.lapLaSo(userData);
  const { thienBan, palaces, tuanPositions, trietPositions, input } = laSo;
  window.currentTuViPositions = { tuan: tuanPositions, triet: trietPositions };

  // Chuẩn hóa hiển thị giờ sinh và danh xưng cung Thân / Cục theo chuẩn mẫu
  const formatDisplayHour = (str) => {
    if (!str) return '10 giờ 30 phút';
    if (str.includes('Giờ Tỵ') || str.includes('09h - 11h')) return '10 giờ 30 phút';
    const m = str.match(/(\d{1,2})h\s*-\s*(\d{1,2})h/i);
    if (m) {
      const h = parseInt(m[1], 10);
      return `${String(h + 1).padStart(2, '0')} giờ 30 phút`;
    }
    const mTime = str.match(/(\d{1,2})[h:](\d{1,2})/i);
    if (mTime) return `${mTime[1].padStart(2, '0')} giờ ${mTime[2].padStart(2, '0')} phút`;
    return str;
  };
  const displayHour = formatDisplayHour(thienBan.hourText);

  const displayCuc = thienBan.cucName 
    ? (thienBan.cucName.charAt(0).toUpperCase() + thienBan.cucName.slice(1).toLowerCase())
    : '';

  const displayThanCu = thienBan.thanCu
    ? thienBan.thanCu.replace(/tài bạch/i, 'Tài Bạch')
                     .replace(/quan lộc/i, 'Quan Lộc')
                     .replace(/phúc đức/i, 'Phúc Đức')
                     .replace(/điền trạch/i, 'Điền Trạch')
                     .replace(/thiên di/i, 'Thiên Di')
                     .replace(/tử tức/i, 'Tử Tức')
                     .replace(/huynh đệ/i, 'Huynh Đệ')
                     .replace(/phụ mẫu/i, 'Phụ Mẫu')
                     .replace(/nô bộc/i, 'Nô Bộc')
                     .replace(/tật ách/i, 'Tật Ách')
    : '';

  const displayBirthCanChi = (thienBan.birthCanChi || '').replace(/Tý/g, 'Tí');
  const displayCanChiMonth = (thienBan.canChiMonth || '').replace(/Tý/g, 'Tí');
  const displayCanChiDay = (thienBan.canChiDay || '').replace(/Tý/g, 'Tí');
  const displayCanChiHour = (thienBan.canChiHour || '').replace(/Tý/g, 'Tí');
  const displayViewCanChi = (thienBan.viewCanChi || '').replace(/Tý/g, 'Tí');

  // Hàm render từng ô cung trên Địa Bàn
  function renderPalaceCell(cell, colStart, rowStart) {
    const { chiIdx, chiName, canChiShort, palaceName, isThan, daiHanAge, stars, trangSinh, tieuHanChi, hanThang } = cell;

    // Màu Can-Chi góc trên bên trái: Chuẩn 100% theo Chi của cung (như lá số mẫu Image 1)
    // Dần(2), Mão(3): Mộc #1E7B34 | Tỵ(5), Ngọ(6): Hỏa #D81E05 | Thân(8), Dậu(9): Kim #777777
    // Hợi(11), Tý(0): Thủy #1A1A1A | Thìn(4), Tuất(10), Sửu(1), Mùi(7): Thổ #D98A2C
    const canChiColors = {
      2: '#1E7B34', 3: '#1E7B34', // Dần, Mão (Mộc)
      5: '#D81E05', 6: '#D81E05', // Tỵ, Ngọ (Hỏa)
      8: '#777777', 9: '#777777', // Thân, Dậu (Kim)
      11: '#1A1A1A', 0: '#1A1A1A', // Hợi, Tý (Thủy)
      4: '#D98A2C', 10: '#D98A2C', 1: '#D98A2C', 7: '#D98A2C' // Thìn, Tuất, Sửu, Mùi (Thổ)
    };
    const canChiColor = canChiColors[chiIdx] || '#1A1A1A';
    const cleanCanChiShort = (canChiShort || '').replace(/Tý/g, 'Tí');
    const cleanTieuHanChi = (tieuHanChi || chiName || '').replace(/Tý/g, 'Tí');

    // Tên cung: Luôn in đậm màu đen #000000 chuẩn như lá số mẫu (kể cả MỆNH và THÊ<THÂN>, TÀI<THÂN>)
    let displayPalaceName = palaceName;
    if (isThan) {
      if (palaceName === 'TÀI BẠCH') displayPalaceName = 'TÀI&lt;THÂN&gt;';
      else if (palaceName === 'PHU THÊ') displayPalaceName = 'THÊ&lt;THÂN&gt;';
      else if (palaceName === 'QUAN LỘC') displayPalaceName = 'QUAN&lt;THÂN&gt;';
      else if (palaceName === 'PHÚC ĐỨC') displayPalaceName = 'PHÚC&lt;THÂN&gt;';
      else if (palaceName === 'THIÊN DI') displayPalaceName = 'DI&lt;THÂN&gt;';
      else if (palaceName === 'MỆNH') displayPalaceName = 'MỆNH&lt;THÂN&gt;';
      else displayPalaceName = `${palaceName}&lt;THÂN&gt;`;
    }

    // Không render "Tuần" và "Triệt" như một sao thông thường trong nội dung ô cung
    const isTuanOrTrietStar = (s) => {
      if (!s || !s.name) return false;
      const n = s.name.trim().toLowerCase();
      return n === 'tu\u1EA7n' || n === 'tri\u1EC7t' || 
             n === 'tu\u1EA7n kh\u00F4ng' || n === 'tri\u1EC7t kh\u00F4ng' ||
             n.startsWith('tu\u1EA7n') || n.startsWith('tri\u1EC7t') ||
             n === 'tuan' || n === 'triet';
    };

    // 14 Chính tinh (hiển thị căn giữa ở trên, cỡ chữ to in đậm)
    const chinhTinhHtml = (stars.chinhTinh || [])
      .filter(s => !isTuanOrTrietStar(s))
      .map(s => {
        return `<div class="star-main-bold star-${s.element} whitespace-nowrap">${s.name}${s.status}</div>`;
      }).join('');

    // Phụ tinh cột trái (Cát tinh)
    const phuGoodHtml = (stars.phuTinhGood || [])
      .filter(s => !isTuanOrTrietStar(s))
      .map(s => {
        const starName = s.name === 'Bác Sĩ' ? 'Bác Sỹ' : s.name;
        return `<div class="tuvi-phu-star star-${s.element} ${s.status ? 'font-semibold' : ''} whitespace-nowrap">${starName}${s.status || ''}</div>`;
      }).join('');

    // Phụ tinh cột phải (Sát tinh / Hung tinh / Bại tinh)
    const phuBadHtml = (stars.phuTinhBad || [])
      .filter(s => !isTuanOrTrietStar(s))
      .map(s => {
        const starName = s.name === 'Bác Sĩ' ? 'Bác Sỹ' : s.name;
        return `<div class="tuvi-phu-star star-${s.element} ${s.status ? 'font-semibold' : ''} whitespace-nowrap">${starName}${s.status || ''}</div>`;
      }).join('');

    // Khoảng cách đệm an toàn tránh nhãn Tuần/Triệt chạm vào chữ ở các cung ranh giới
    const hasBadgeAtNgoMui = (Array.isArray(tuanPositions) && tuanPositions.includes(6) && tuanPositions.includes(7)) ||
                             (Array.isArray(trietPositions) && trietPositions.includes(6) && trietPositions.includes(7));
    const hasBadgeAtSuuTy = (Array.isArray(tuanPositions) && tuanPositions.includes(0) && tuanPositions.includes(1)) ||
                            (Array.isArray(trietPositions) && trietPositions.includes(0) && trietPositions.includes(1));

    let headerLeftCornerStyle = '';
    let headerRightCornerStyle = '';
    let footerLeftCornerStyle = '';
    let footerRightCornerStyle = '';
    if (hasBadgeAtNgoMui) {
      if (chiIdx === 6) footerRightCornerStyle = 'padding-right: 20px;'; // Cung Ngọ: tránh góc phải dưới
      else if (chiIdx === 7) footerLeftCornerStyle = 'padding-left: 20px;';  // Cung Mùi: tránh góc trái dưới
    }
    if (hasBadgeAtSuuTy) {
      if (chiIdx === 1) headerRightCornerStyle = 'padding-right: 20px;'; // Cung Sửu: tránh góc phải trên
    }

    return `
      <div class="tuvi-cell col-start-${colStart} row-start-${rowStart} relative">
        <div class="relative flex items-center justify-between font-sans pb-0.5" style="line-height: 1;">
          <span class="tuvi-canchi font-bold z-10" style="color: ${canChiColor}; font-size: 13px; ${headerLeftCornerStyle}">${cleanCanChiShort}</span>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none" style="text-align: center;">
            <span class="font-bold text-[#000000] text-[0.94rem] tracking-wide inline-block uppercase font-sans text-center">${displayPalaceName}</span>
          </div>
          <span class="text-[#000000] font-bold text-[14px] z-10 font-sans" style="${headerRightCornerStyle}">${daiHanAge}</span>
        </div>

        <div class="text-center py-0.5 min-h-[28px] flex flex-col items-center justify-center w-full">
          ${chinhTinhHtml}
        </div>

        <div class="grid grid-cols-2 gap-1 py-0.5 leading-[1.2] flex-1">
          <div class="tuvi-phu-list text-left pl-0.5">
            ${phuGoodHtml}
          </div>
          <div class="tuvi-phu-list text-left pl-0.5">
            ${phuBadHtml}
          </div>
        </div>

        <div class="grid grid-cols-[1fr_auto_1fr] items-baseline text-[12.5px] text-[#000000] font-sans pt-1">
          <span class="text-left whitespace-nowrap pl-0.5" style="${footerLeftCornerStyle}">${cleanTieuHanChi}</span>
          <strong class="text-center text-[#000000] font-bold whitespace-nowrap px-1">${trangSinh}</strong>
          <span class="text-right whitespace-nowrap pr-0.5" style="${footerRightCornerStyle}">Tháng ${hanThang !== undefined ? hanThang : (chiIdx + 1)}</span>
        </div>
      </div>
    `;
  }

  // Hàm tính tọa độ tâm ranh giới (vách ngăn) giữa 2 Chi liền kề trên bàn cờ Tử Vi 4x4
  // Tuần Không & Triệt Không chỉ có thể xuất hiện tại 6 cặp ranh giới chuẩn xác theo cổ truyền
  function getBoundaryCoords(chi1, chi2) {
    const pair = [Math.min(chi1, chi2), Math.max(chi1, chi2)];
    // Tý (0), Sửu (1), Dần (2), Mão (3), Thìn (4), Tỵ (5),
    // Ngọ (6), Mùi (7), Thân (8), Dậu (9), Tuất (10), Hợi (11)
    if (pair[0] === 0 && pair[1] === 1) return { left: '50%', top: '75%' };     // Sửu - Tý (ranh giới đứng giữa Cột 2 & Cột 3, giáp đáy Thiên Bàn)
    if (pair[0] === 2 && pair[1] === 3) return { left: '12.5%', top: '75%' };   // Dần - Mão (ranh giới ngang giữa Hàng 3 & Hàng 4, Cột 1)
    if (pair[0] === 4 && pair[1] === 5) return { left: '12.5%', top: '25%' };   // Thìn - Tỵ (ranh giới ngang giữa Hàng 1 & Hàng 2, Cột 1)
    if (pair[0] === 6 && pair[1] === 7) return { left: '50%', top: '25%' };     // Ngọ - Mùi (ranh giới đứng giữa Cột 2 & Cột 3, giáp đỉnh Thiên Bàn)
    if (pair[0] === 8 && pair[1] === 9) return { left: '87.5%', top: '25%' };   // Thân - Dậu (ranh giới ngang giữa Hàng 1 & Hàng 2, Cột 4)
    if (pair[0] === 10 && pair[1] === 11) return { left: '87.5%', top: '75%' }; // Tuất - Hợi (ranh giới ngang giữa Hàng 3 & Hàng 4, Cột 4)
    return null;
  }
  window.getTuViBoundaryCoords = getBoundaryCoords;

  // Tạo HTML nhãn ranh giới: Khối chữ nhật đen chữ trắng chuẩn lá số mẫu
  let boundaryBadgesHtml = '';

  const isSameBoundary = Array.isArray(tuanPositions) && Array.isArray(trietPositions) &&
    tuanPositions.length >= 2 && trietPositions.length >= 2 &&
    Math.min(tuanPositions[0], tuanPositions[1]) === Math.min(trietPositions[0], trietPositions[1]) &&
    Math.max(tuanPositions[0], tuanPositions[1]) === Math.max(trietPositions[0], trietPositions[1]);

  if (isSameBoundary) {
    const coords = getBoundaryCoords(tuanPositions[0], tuanPositions[1]);
    if (coords) {
      boundaryBadgesHtml += `
        <div class="tuvi-boundary-badge tuvi-badge-tuan" style="left: calc(${coords.left} - 28px); top: ${coords.top};"><span class="tuvi-badge-label">Tu\u1EA7n</span></div>
        <div class="tuvi-boundary-badge tuvi-badge-triet" style="left: calc(${coords.left} + 28px); top: ${coords.top};"><span class="tuvi-badge-label">Tri\u1EC7t</span></div>
      `;
    }
  } else {
    if (Array.isArray(tuanPositions) && tuanPositions.length >= 2) {
      const coordsTuan = getBoundaryCoords(tuanPositions[0], tuanPositions[1]);
      if (coordsTuan) {
        boundaryBadgesHtml += `
          <div class="tuvi-boundary-badge tuvi-badge-tuan" style="left: ${coordsTuan.left}; top: ${coordsTuan.top};"><span class="tuvi-badge-label">Tu\u1EA7n</span></div>
        `;
      }
    }

    if (Array.isArray(trietPositions) && trietPositions.length >= 2) {
      const coordsTriet = getBoundaryCoords(trietPositions[0], trietPositions[1]);
      if (coordsTriet) {
        boundaryBadgesHtml += `
          <div class="tuvi-boundary-badge tuvi-badge-triet" style="left: ${coordsTriet.left}; top: ${coordsTriet.top};"><span class="tuvi-badge-label">Tri\u1EC7t</span></div>
        `;
      }
    }
  }

  // Tính tọa độ Tam Hợp Cung Mệnh trên viền Thiên Bàn
  const thienBanBorderCoords = {
    0: { x: 75, y: 100 },  // Tý (đáy Thiên Bàn, cột 3)
    1: { x: 25, y: 100 },  // Sửu (đáy Thiên Bàn, cột 2)
    2: { x: 0, y: 100 },   // Dần (góc dưới bên trái)
    3: { x: 0, y: 75 },    // Mão (vách trái Thiên Bàn, hàng 3)
    4: { x: 0, y: 25 },    // Thìn (vách trái Thiên Bàn, hàng 2)
    5: { x: 0, y: 0 },     // Tỵ (góc trên bên trái)
    6: { x: 25, y: 0 },    // Ngọ (đỉnh Thiên Bàn, cột 2)
    7: { x: 75, y: 0 },    // Mùi (đỉnh Thiên Bàn, cột 3)
    8: { x: 100, y: 0 },   // Thân (góc trên bên phải)
    9: { x: 100, y: 25 },  // Dậu (vách phải Thiên Bàn, hàng 2)
    10: { x: 100, y: 75 }, // Tuất (vách phải Thiên Bàn, hàng 3)
    11: { x: 100, y: 100 } // Hợi (góc dưới bên phải)
  };

  const pMenh = Object.values(palaces).find(p => p.palaceName === 'MỆNH')?.chiIdx ?? 3;
  const pQuan = (pMenh + 4) % 12;
  const pTai = (pMenh + 8) % 12;
  const pt1 = thienBanBorderCoords[pMenh] || { x: 0, y: 75 };
  const pt2 = thienBanBorderCoords[pQuan] || { x: 75, y: 0 };
  const pt3 = thienBanBorderCoords[pTai] || { x: 100, y: 100 };
  const tamHopPoints = `${pt1.x},${pt1.y} ${pt2.x},${pt2.y} ${pt3.x},${pt3.y}`;

  container.innerHTML = `
    <div id="tuvi-board-wrapper" class="w-full flex justify-center overflow-x-auto py-1">
      <div class="tuvi-board relative">
        <!-- ================= ROW 1 ================= -->
        <!-- 1. CUNG TỴ (col 1, row 1) -->
        ${renderPalaceCell(palaces[5], 1, 1)}

        <!-- 2. CUNG NGỌ (col 2, row 1) -->
        ${renderPalaceCell(palaces[6], 2, 1)}

        <!-- 3. CUNG MÙI (col 3, row 1) -->
        ${renderPalaceCell(palaces[7], 3, 1)}

        <!-- 4. CUNG THÂN (col 4, row 1) -->
        ${renderPalaceCell(palaces[8], 4, 1)}

        <!-- ================= ROW 2 ================= -->
        <!-- 5. CUNG THÌN (col 1, row 2) -->
        ${renderPalaceCell(palaces[4], 1, 2)}

        <!-- ================= CENTER THIÊN BÀN (2x2) ================= -->
        <div class="tuvi-thienban col-start-2 col-span-2 row-start-2 row-span-2">
          
          <!-- Đường Kẻ Tam Hợp Mệnh - Tài - Quan Chuẩn Xác Theo Ảnh Mẫu -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="${tamHopPoints}" fill="none" stroke="#777777" stroke-width="0.32" stroke-linejoin="round" />
          </svg>
          
          <!-- Background Watermark: Logo Bát Quái chìm vàng ánh kim theo ảnh mẫu -->
          <div class="tb-watermark-bg">
            <img src="assets/logo_batquai.png" alt="Bát Quái" onerror="this.src='tải xuống.jpeg'" />
          </div>

          <!-- Header -->
          <div class="relative z-10 flex flex-col items-center w-full">
            <div class="tb-site-name">DIỄN ĐÀN TỬ VI VIỆT NAM</div>
            <div class="tb-site-url">http://www.tuvivietnam.vn</div>
            <div class="tb-divider">
              <span class="tb-divider-line"></span>
              <span class="tb-divider-diamond">◆</span>
              <span class="tb-divider-line"></span>
            </div>
            <h2 class="tb-main-title">LÁ SỐ TỬ VI</h2>
          </div>

          <!-- Bảng thông tin trung tâm -->
          <div class="tb-info-table">
            <div class="tb-row">
              <span class="tb-lbl">Họ tên:</span>
              <span class="tb-val-single">${thienBan.name}</span>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Năm:</span>
              <div class="tb-val">
                <span>${thienBan.solYear}</span>
                <span style="padding-right: 20px;">${displayBirthCanChi}</span>
              </div>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Tháng:</span>
              <div class="tb-val">
                <span>${String(thienBan.solMonth).padStart(2, '0')} (${thienBan.lunMonth})</span>
                <span style="padding-right: 20px;">${displayCanChiMonth}</span>
              </div>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Ngày:</span>
              <div class="tb-val">
                <span>${String(thienBan.solDay).padStart(2, '0')} (${thienBan.lunDay})</span>
                <span style="padding-right: 20px;">${displayCanChiDay}</span>
              </div>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Giờ:</span>
              <div class="tb-val">
                <span>${displayHour}</span>
                <span style="padding-right: 20px;">${displayCanChiHour}</span>
              </div>
            </div>

            <div class="tb-info-spacer"></div>

            <div class="tb-row">
              <span class="tb-lbl">Năm xem:</span>
              <div class="tb-val">
                <span>${thienBan.viewYear}</span>
                <span style="padding-right: 20px;">${displayViewCanChi}</span>
              </div>
            </div>
            <div class="tb-row">
              <span class="tb-lbl"></span>
              <div class="tb-val-single">${thienBan.currentAge} tuổi</div>
            </div>

            <div class="tb-info-spacer"></div>

            <div class="tb-row">
              <span class="tb-lbl">Âm Dương:</span>
              <span class="tb-val-single">${thienBan.amDuongNamNu}</span>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Mệnh:</span>
              <span class="tb-val-single">${thienBan.napAmMenh}</span>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Cục:</span>
              <span class="tb-val-single">${displayCuc}</span>
            </div>

            <div class="tb-info-spacer"></div>

            <div class="tb-row">
              <span class="tb-lbl">Chủ Mệnh:</span>
              <span class="tb-val-single">${thienBan.chuMenh}</span>
            </div>
            <div class="tb-row">
              <span class="tb-lbl">Chủ Thân:</span>
              <span class="tb-val-single">${thienBan.chuThan}</span>
            </div>

            <div class="tb-info-spacer"></div>

            <div class="tb-val-extra">
              <div>${thienBan.amDuongLy}</div>
              <div>${thienBan.cucMenhRelation}</div>
              <div>${displayThanCu}</div>
            </div>
          </div>

          <!-- Thư pháp 紫微越南 & Con Dấu Triện đỏ ở góc dưới phải Thiên Bàn -->
          <div class="tb-bottom-stamp">
            <div class="tb-calligraphy">
              <span>紫</span>
              <span>微</span>
              <span>越</span>
              <span>南</span>
            </div>
            <img src="assets/an_trien.png" alt="Ấn Triện" class="tb-seal-img" onerror="this.src='tải xuống (1).jpeg'" />
          </div>
        </div>

        <!-- 6. CUNG DẬU (col 4, row 2) -->
        ${renderPalaceCell(palaces[9], 4, 2)}

        <!-- ================= ROW 3 ================= -->
        <!-- 7. CUNG MÃO (col 1, row 3) -->
        ${renderPalaceCell(palaces[3], 1, 3)}

        <!-- 8. CUNG TUẤT (col 4, row 3) -->
        ${renderPalaceCell(palaces[10], 4, 3)}

        <!-- ================= ROW 4 ================= -->
        <!-- 9. CUNG DẦN (col 1, row 4) -->
        ${renderPalaceCell(palaces[2], 1, 4)}

        <!-- 10. CUNG SỬU (col 2, row 4) -->
        ${renderPalaceCell(palaces[1], 2, 4)}

        <!-- 11. CUNG TÝ (col 3, row 4) -->
        ${renderPalaceCell(palaces[0], 3, 4)}

        <!-- 12. CUNG HỢI (col 4, row 4) -->
        ${renderPalaceCell(palaces[11], 4, 4)}

        ${boundaryBadgesHtml}
      </div>
    </div>
  `;


}

// =========================================================================
// 2. TƯỚNG SỐ & 64 QUẺ KINH DỊCH CONTROLLER
// =========================================================================

function initKinhDichModal() {
  const modal = document.getElementById('kinhdich-modal');
  const closeBtn = document.getElementById('close-kinhdich-modal');
  const triggerBtn = document.getElementById('btn-kinhdich-trigger');
  const quickTuongHocBtn = document.getElementById('btn-quick-tuonghoc');
  const quick64QueBtn = document.getElementById('btn-quick-64que');

  // Tab switcher buttons & contents
  const tabBtnTuongHoc = document.getElementById('tab-btn-tuonghoc');
  const tabBtnKinhDich = document.getElementById('tab-btn-kinhdich');
  const tabContentTuongHoc = document.getElementById('tab-content-tuonghoc');
  const tabContentKinhDich = document.getElementById('tab-content-kinhdich');

  // Subtabs in Kinh Dịch

  // =========================================================================
  // SUBTABS KINH DỊCH: 3 PHƯƠNG PHÁP LẬP QUẺ & BẢNG XUẤT QUẺ
  // =========================================================================
  const subtabMaiHoaBtn = document.getElementById('subtab-maihoa-btn');
  const subtabLucHaoBtn = document.getElementById('subtab-luchao-btn');
  const subtabNgauNhienBtn = document.getElementById('subtab-ngaunhien-btn');
  const subtabDongXuBtn = document.getElementById('subtab-dongxu-btn');
  const subtabXuatQueBtn = document.getElementById('subtab-xuatque-btn');
  const subtabTraCuuBtn = document.getElementById('subtab-tracuu-btn');

  const viewMaiHoa = document.getElementById('view-mai-hoa');
  const viewLucHao = document.getElementById('view-luc-hao');
  const viewNgauNhien = document.getElementById('view-ngau-nhien');
  const viewDongXu = document.getElementById('view-dong-xu');
  const viewXuatQue = document.getElementById('view-xuat-que');
  const viewTraCuu64 = document.getElementById('view-tra-cuu-64');
  const resultBox = document.getElementById('kinhdich-result');
  const emptyStateBox = document.getElementById('kinhdich-empty-state');

  // Tra cứu 64 quẻ elements
  const searchQueInput = document.getElementById('search-que-input');
  const filterQueGroup = document.getElementById('filter-que-group');
  const grid64Que = document.getElementById('grid-64-que');
  const queDetailView = document.getElementById('que-detail-view');
  const queDetailCard = document.getElementById('que-detail-card');
  const btnBackTo64List = document.getElementById('btn-back-to-64-list');

  // Tướng học elements
  const tuongHocGrid = document.getElementById('tuonghoc-articles-grid');
  const tuongHocReader = document.getElementById('tuonghoc-article-reader');
  const tuongHocDetail = document.getElementById('tuonghoc-article-detail');
  const tuongHocListView = document.getElementById('tuonghoc-article-list-view');
  const btnBackToTuongHocList = document.getElementById('btn-back-to-tuonghoc-list');

  if (!modal) return;

  // Chuyển tab chính (Kinh Dịch vs Tướng Học)
  function switchMainTab(tab) {
    if (tab === 'tuonghoc') {
      tabContentTuongHoc?.classList.remove('hidden');
      tabContentKinhDich?.classList.add('hidden');

      tabBtnTuongHoc?.classList.add('border-[#8B1E1E]', 'text-[#8B1E1E]', 'bg-[#FAF7F2]');
      tabBtnTuongHoc?.classList.remove('border-transparent', 'text-stone-600');

      tabBtnKinhDich?.classList.remove('border-[#8B1E1E]', 'text-[#8B1E1E]', 'bg-[#FAF7F2]');
      tabBtnKinhDich?.classList.add('border-transparent', 'text-stone-600');
    } else {
      tabContentTuongHoc?.classList.add('hidden');
      tabContentKinhDich?.classList.remove('hidden');

      tabBtnKinhDich?.classList.add('border-[#8B1E1E]', 'text-[#8B1E1E]', 'bg-[#FAF7F2]');
      tabBtnKinhDich?.classList.remove('border-transparent', 'text-stone-600');

      tabBtnTuongHoc?.classList.remove('border-[#8B1E1E]', 'text-[#8B1E1E]', 'bg-[#FAF7F2]');
      tabBtnTuongHoc?.classList.add('border-transparent', 'text-stone-600');
    }
  }

  // Chuyển đổi linh hoạt giữa các subtabs của Kinh Dịch
  function switchKinhDichSubTab(subtab) {
    const allViews = [viewMaiHoa, viewLucHao, viewNgauNhien, viewDongXu, viewXuatQue, viewTraCuu64];
    const allBtns = [
      { id: 'maihoa', btn: subtabMaiHoaBtn },
      { id: 'luchao', btn: subtabLucHaoBtn },
      { id: 'ngaunhien', btn: subtabNgauNhienBtn },
      { id: 'dongxu', btn: subtabDongXuBtn },
      { id: 'xuatque', btn: subtabXuatQueBtn },
      { id: 'tracuu', btn: subtabTraCuuBtn }
    ];

    allViews.forEach(v => v?.classList.add('hidden'));

    allBtns.forEach(item => {
      if (item.btn) {
        if (item.id === subtab) {
          item.btn.className = 'px-3 py-1.5 rounded-lg bg-[#8B1E1E] text-white font-serif font-bold text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer';
        } else {
          item.btn.className = 'px-3 py-1.5 rounded-lg border border-[#C5A059] bg-white text-stone-700 hover:text-[#8B1E1E] hover:bg-[#FAF7F2] font-serif font-bold text-xs transition flex items-center gap-1.5 cursor-pointer';
        }
      }
    });

    if (subtab === 'luchao') {
      viewLucHao?.classList.remove('hidden');
      updateLucHaoCanChiLive();
    } else if (subtab === 'ngaunhien') {
      viewNgauNhien?.classList.remove('hidden');
    } else if (subtab === 'dongxu') {
      viewDongXu?.classList.remove('hidden');
    } else if (subtab === 'xuatque') {
      viewXuatQue?.classList.remove('hidden');
      if (currentDichQuaiData) {
        emptyStateBox?.classList.add('hidden');
        resultBox?.classList.remove('hidden');
      } else {
        emptyStateBox?.classList.remove('hidden');
        resultBox?.classList.add('hidden');
      }
      setTimeout(() => {
        if (typeof window.applyFitOnePage === 'function') {
          window.applyFitOnePage(true);
        }
      }, 60);
    } else if (subtab === 'tracuu') {
      viewTraCuu64?.classList.remove('hidden');
      render64QueGrid();
    } else { // 'maihoa' (mặc định)
      viewMaiHoa?.classList.remove('hidden');
    }
  }
  window.switchKinhDichSubTab = switchKinhDichSubTab;

  subtabMaiHoaBtn?.addEventListener('click', () => switchKinhDichSubTab('maihoa'));
  subtabLucHaoBtn?.addEventListener('click', () => switchKinhDichSubTab('luchao'));
  subtabNgauNhienBtn?.addEventListener('click', () => switchKinhDichSubTab('ngaunhien'));
  subtabDongXuBtn?.addEventListener('click', () => switchKinhDichSubTab('dongxu'));
  subtabXuatQueBtn?.addEventListener('click', () => switchKinhDichSubTab('xuatque'));
  subtabTraCuuBtn?.addEventListener('click', () => switchKinhDichSubTab('tracuu'));


  const openModalWithTab = (tab, subtab = 'maihoa') => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    switchMainTab(tab);
    if (tab === 'kinhdich') {
      switchKinhDichSubTab(subtab);
    }
  };

  triggerBtn?.addEventListener('click', () => openModalWithTab('kinhdich', 'maihoa'));
  quickTuongHocBtn?.addEventListener('click', () => openModalWithTab('tuonghoc'));
  quick64QueBtn?.addEventListener('click', () => openModalWithTab('kinhdich', 'tracuu'));

  document.querySelectorAll('a[href="#kinh-dich-section"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('tướng') || text.includes('diện tướng') || text.includes('sắc tướng')) {
        e.preventDefault();
        openModalWithTab('tuonghoc');
      } else if (text.includes('tra cứu') || text.includes('64 quẻ')) {
        e.preventDefault();
        openModalWithTab('kinhdich', 'tracuu');
      } else if (text.includes('lục hào') || text.includes('đồng xu')) {
        e.preventDefault();
        openModalWithTab('kinhdich', 'dongxu');
      } else {
        e.preventDefault();
        openModalWithTab('kinhdich', 'maihoa');
      }
    });
  });

  tabBtnTuongHoc?.addEventListener('click', () => switchMainTab('tuonghoc'));
  tabBtnKinhDich?.addEventListener('click', () => switchMainTab('kinhdich'));

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  // Gợi ý câu hỏi nhanh (Quick questions)
  document.querySelectorAll('.quick-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const forTab = btn.getAttribute('data-for');
      const text = btn.getAttribute('data-text');
      if (forTab === 'maihoa') {
        const input = document.getElementById('maihoa-question-input');
        if (input) input.value = text;
      } else if (forTab === 'luchao') {
        const input = document.getElementById('luchao-question-input');
        if (input) input.value = text;
      } else if (forTab === 'dongxu') {
        const input = document.getElementById('dongxu-question-input');
        if (input) input.value = text;
      }
      showToast(`Đã chọn: ${text}`);
    });
  });

  // -------------------------------------------------------------
  // 1. TƯƠNG TÁC LẬP QUẺ MAI HOA DỊCH SỐ
  // -------------------------------------------------------------
  const maiHoaTimeBox = document.getElementById('maihoa-time-box');
  const maiHoaNumberBox = document.getElementById('maihoa-number-box');
  const maiHoaClockEl = document.getElementById('maihoa-live-clock');
  const maiHoaCanChiEl = document.getElementById('maihoa-live-canchi');

  function updateMaiHoaClock() {
    const now = new Date();
    const d = now.getDate();
    const m = now.getMonth() + 1;
    const y = now.getFullYear();
    const h = now.getHours();
    const min = now.getMinutes();
    const s = now.getSeconds();

    if (maiHoaClockEl) {
      maiHoaClockEl.textContent = `${h < 10 ? '0' + h : h}:${min < 10 ? '0' + min : min}:${s < 10 ? '0' + s : s} - ${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
    }

    if (maiHoaCanChiEl && window.DICH_QUAI_ENGINE) {
      const info = window.DICH_QUAI_ENGINE.getCanChiThoiDiem(now);
      maiHoaCanChiEl.textContent = `Giờ ${info.canGio} ${info.chiGio}, Ngày ${info.canNgay} ${info.chiNgay}, Tháng ${info.canThang} ${info.chiThang}, Năm ${info.canNam} ${info.chiNam} (Âm lịch: ${info.amLichNgay}/${info.amLichThang})`;
    }
  }

  setInterval(updateMaiHoaClock, 1000);
  updateMaiHoaClock();

  document.querySelectorAll('input[name="maihoa-mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'number') {
        maiHoaTimeBox?.classList.add('hidden');
        maiHoaNumberBox?.classList.remove('hidden');
      } else {
        maiHoaTimeBox?.classList.remove('hidden');
        maiHoaNumberBox?.classList.add('hidden');
      }
    });
  });

  document.getElementById('btn-random-maihoa-numbers')?.addEventListener('click', () => {
    const n1 = document.getElementById('maihoa-num-1');
    const n2 = document.getElementById('maihoa-num-2');
    const n3 = document.getElementById('maihoa-num-3');
    if (n1) n1.value = Math.floor(Math.random() * 8) + 1;
    if (n2) n2.value = Math.floor(Math.random() * 8) + 1;
    if (n3) n3.value = Math.floor(Math.random() * 6) + 1;
  });

  const btnExecuteMaiHoa = document.getElementById('btn-execute-maihoa');
  btnExecuteMaiHoa?.addEventListener('click', () => {
    if (!window.DICH_QUAI_ENGINE) {
      showToast('Engine Dịch Quái đang tải, vui lòng thử lại sau giây lát!');
      return;
    }

    const question = document.getElementById('maihoa-question-input')?.value.trim() || 'Xem vận mệnh tổng quan & việc dự định';
    const mode = document.querySelector('input[name="maihoa-mode"]:checked')?.value || 'time';

    let options = {};
    if (mode === 'number') {
      const n1 = parseInt(document.getElementById('maihoa-num-1')?.value, 10) || Math.floor(Math.random() * 8) + 1;
      const n2 = parseInt(document.getElementById('maihoa-num-2')?.value, 10) || Math.floor(Math.random() * 8) + 1;
      const n3 = parseInt(document.getElementById('maihoa-num-3')?.value, 10) || Math.floor(Math.random() * 6) + 1;
      options.customNumbers = [n1, n2, n3];
    } else {
      options.date = new Date();
    }

    const res = window.DICH_QUAI_ENGINE.lapQueMaiHoa(question, options);
    renderTrangDichQuaiFull(res);
    switchKinhDichSubTab('xuatque');
    showToast(`Đã lập thành công quẻ Mai Hoa: ${res.queChu.name}!`);
  });

  // -------------------------------------------------------------
  // 2. TƯƠNG TÁC LẬP QUẺ LỤC HÀO (LỤC HÀO DỰ TRẮC)
  // -------------------------------------------------------------
  const luchaoThuongSelect = document.getElementById('luchao-thuong-select');
  const luchaoHaSelect = document.getElementById('luchao-ha-select');
  const luchao64Select = document.getElementById('luchao-64-select');
  const luchaoPreviewName = document.getElementById('luchao-preview-name');
  const luchaoPreviewCung = document.getElementById('luchao-preview-cung');
  const luchaoPreviewThoan = document.getElementById('luchao-preview-thoan');
  const luchaoCanChiLive = document.getElementById('luchao-canchi-live');

  function updateLucHaoCanChiLive() {
    if (!luchaoCanChiLive || !window.DICH_QUAI_ENGINE) return;
    const now = new Date();
    const info = window.DICH_QUAI_ENGINE.getCanChiThoiDiem(now);
    const tuanKhong = window.DICH_QUAI_ENGINE.buildDichQuaiFullResult({
      method: 'test', question: '', timeStr: '', canChi: info, thuongId: 1, haId: 1, dongList: []
    }).tuanKhong;
    luchaoCanChiLive.textContent = `Giờ ${info.canGio} ${info.chiGio} • Ngày ${info.canNgay} ${info.chiNgay} • Tháng ${info.canThang} ${info.chiThang} • Năm ${info.canNam} ${info.chiNam} (Tuần Không: ${tuanKhong.join(', ')})`;
  }

  // Khởi tạo danh sách 64 quẻ vào dropdown Lục Hào
  function initLucHaoDropdowns() {
    if (!luchao64Select || !window.DICH_QUAI_ENGINE || !window.DICH_QUAI_ENGINE.QUE_KEP_INFO) return;
    luchao64Select.innerHTML = '';
    const keys = Object.keys(window.DICH_QUAI_ENGINE.QUE_KEP_INFO);
    keys.forEach(k => {
      const q = window.DICH_QUAI_ENGINE.QUE_KEP_INFO[k];
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = `${q.name} (${q.cung} - ${q.cungHanh}${q.note ? ' • ' + q.note : ''})`;
      if (k === '3_1') opt.selected = true;
      luchao64Select.appendChild(opt);
    });
    updateLucHaoPreview();
  }

  function updateLucHaoPreview() {
    const t = luchaoThuongSelect ? luchaoThuongSelect.value : '3';
    const h = luchaoHaSelect ? luchaoHaSelect.value : '1';
    const key = `${t}_${h}`;

    if (window.DICH_QUAI_ENGINE && window.DICH_QUAI_ENGINE.QUE_KEP_INFO) {
      const q = window.DICH_QUAI_ENGINE.QUE_KEP_INFO[key];
      if (q) {
        if (luchaoPreviewName) luchaoPreviewName.textContent = q.name;
        if (luchaoPreviewCung) luchaoPreviewCung.textContent = `(Cung ${q.cung} - Hành ${q.cungHanh}${q.note ? ' • ' + q.note : ''})`;
        if (luchaoPreviewThoan) luchaoPreviewThoan.textContent = q.shortThoan || 'THÔNG THUẬN CÁT TƯỜNG';
      }
    }
  }

  luchaoThuongSelect?.addEventListener('change', () => {
    const key = `${luchaoThuongSelect.value}_${luchaoHaSelect.value}`;
    if (luchao64Select) luchao64Select.value = key;
    updateLucHaoPreview();
  });

  luchaoHaSelect?.addEventListener('change', () => {
    const key = `${luchaoThuongSelect.value}_${luchaoHaSelect.value}`;
    if (luchao64Select) luchao64Select.value = key;
    updateLucHaoPreview();
  });

  luchao64Select?.addEventListener('change', () => {
    const parts = luchao64Select.value.split('_');
    if (parts.length === 2) {
      if (luchaoThuongSelect) luchaoThuongSelect.value = parts[0];
      if (luchaoHaSelect) luchaoHaSelect.value = parts[1];
      updateLucHaoPreview();
    }
  });

  // Nút chọn nhanh hào động
  document.getElementById('btn-luchao-dong-none')?.addEventListener('click', () => {
    document.querySelectorAll('.luchao-dong-cb').forEach(cb => { cb.checked = false; });
  });

  document.getElementById('btn-luchao-dong-1')?.addEventListener('click', () => {
    document.querySelectorAll('.luchao-dong-cb').forEach(cb => { cb.checked = (cb.value === '1'); });
  });

  document.getElementById('btn-luchao-dong-rand')?.addEventListener('click', () => {
    const r1 = Math.floor(Math.random() * 6) + 1;
    const r2 = Math.random() < 0.4 ? (Math.floor(Math.random() * 6) + 1) : null;
    document.querySelectorAll('.luchao-dong-cb').forEach(cb => {
      const v = parseInt(cb.value, 10);
      cb.checked = (v === r1 || v === r2);
    });
  });

  // Thực thi lập quẻ Lục Hào
  const btnExecuteLucHao = document.getElementById('btn-execute-luchao');
  btnExecuteLucHao?.addEventListener('click', () => {
    if (!window.DICH_QUAI_ENGINE) {
      showToast('Engine Dịch Quái đang tải, vui lòng thử lại sau giây lát!');
      return;
    }

    const question = document.getElementById('luchao-question-input')?.value.trim() || 'Xem việc đại sự khởi đầu & hợp tác kinh doanh';
    const thuongId = parseInt(luchaoThuongSelect?.value, 10) || 3;
    const haId = parseInt(luchaoHaSelect?.value, 10) || 1;

    const dongList = [];
    document.querySelectorAll('.luchao-dong-cb:checked').forEach(cb => {
      const v = parseInt(cb.value, 10);
      if (v >= 1 && v <= 6) dongList.push(v);
    });

    const res = window.DICH_QUAI_ENGINE.lapQueLucHao(question, {
      thuongId,
      haId,
      dongList,
      date: new Date()
    });

    renderTrangDichQuaiFull(res);
    switchKinhDichSubTab('xuatque');
    showToast(`Đã lập thành công quẻ Lục Hào: ${res.queChu.name}!`);
  });

  setTimeout(initLucHaoDropdowns, 200);

  // -------------------------------------------------------------
  // 3. TƯƠNG TÁC GIEO QUẺ ĐỒNG XU (3 ĐỒNG TIỀN CỔ)
  // -------------------------------------------------------------
  let currentDongXuStep = 0; // 0: chưa gieo, 1..6: đã gieo hào
  let dongXuTosses = [];

  const btnTossStep = document.getElementById('btn-toss-coin-step');
  const btnTossAuto = document.getElementById('btn-toss-coins-auto');
  const btnResetCoins = document.getElementById('btn-reset-coins');
  const btnTossText = document.getElementById('btn-toss-text');
  const dongxuStepBadge = document.getElementById('dongxu-step-badge');
  const dongxuStepInstruction = document.getElementById('dongxu-step-instruction');
  const coin1 = document.getElementById('coin-1');
  const coin2 = document.getElementById('coin-2');
  const coin3 = document.getElementById('coin-3');

  const haoNames = ['Hào 1 (Sơ)', 'Hào 2 (Nhị)', 'Hào 3 (Tam)', 'Hào 4 (Tứ)', 'Hào 5 (Ngũ)', 'Hào 6 (Thượng)'];

  function resetDongXuState() {
    currentDongXuStep = 0;
    dongXuTosses = [];
    if (btnTossText) btnTossText.textContent = 'Gieo Hào 1';
    if (btnTossStep) btnTossStep.disabled = false;
    if (dongxuStepBadge) {
      dongxuStepBadge.textContent = 'Chuẩn bị: Gieo Hào 1 (Sơ Hào)';
      dongxuStepBadge.className = 'px-2.5 py-0.5 rounded-full bg-red-100 text-[#8B1E1E] font-bold text-[11px]';
    }
    if (dongxuStepInstruction) {
      dongxuStepInstruction.textContent = 'Tĩnh tâm, tập trung ý niệm rồi bấm nút bên dưới để gieo 3 đồng tiền cổ.';
    }

    document.querySelectorAll('#dongxu-ladder .ladder-row').forEach(row => {
      const h = parseInt(row.getAttribute('data-hao'), 10);
      const visual = row.querySelector('.ladder-visual');
      const status = row.querySelector('.ladder-status');

      if (h === 1) {
        row.className = 'ladder-row flex items-center justify-between p-1.5 rounded-lg border-2 border-[#8B1E1E] bg-red-50/50 text-xs';
        if (visual) visual.innerHTML = '<span class="text-[#8B1E1E] font-bold text-xs animate-pulse">Đang chờ gieo</span>';
        if (status) { status.textContent = 'Sơ Hào'; status.className = 'ladder-status text-[10.5px] font-bold text-[#8B1E1E] w-24 text-right'; }
      } else {
        row.className = 'ladder-row flex items-center justify-between p-1.5 rounded-lg border border-dashed border-stone-300 text-xs';
        if (visual) visual.innerHTML = '<span class="text-stone-300 font-mono text-xs">Chưa gieo</span>';
        if (status) { status.textContent = 'Chờ...'; status.className = 'ladder-status text-[10.5px] text-stone-400 w-24 text-right'; }
      }
    });
  }

  function tossSingleStep(callback) {
    if (currentDongXuStep >= 6) return;

    if (btnTossStep) btnTossStep.disabled = true;

    // Hiệu ứng quay 3 đồng xu
    [coin1, coin2, coin3].forEach(c => {
      if (c) {
        c.style.transform = `rotateY(${720 + Math.floor(Math.random() * 360)}deg) scale(1.1)`;
      }
    });

    setTimeout(() => {
      // 3 đồng xu: mỗi đồng có xác suất 50/50 Ngửa (2) hoặc Sấp (3)
      const c1Val = Math.random() < 0.5 ? 2 : 3;
      const c2Val = Math.random() < 0.5 ? 2 : 3;
      const c3Val = Math.random() < 0.5 ? 2 : 3;
      const tossSum = c1Val + c2Val + c3Val; // 6, 7, 8, 9

      const coins = [
        { el: coin1, val: c1Val },
        { el: coin2, val: c2Val },
        { el: coin3, val: c3Val }
      ];

      coins.forEach(item => {
        if (item.el) {
          item.el.style.transform = 'rotateY(0deg) scale(1)';
          const textEl = item.el.querySelector('.coin-text');
          if (item.val === 2) {
            if (textEl) textEl.textContent = 'NGỬA';
            item.el.className = 'w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#E6C34E] via-[#C5A059] to-[#8C6D23] border-2 border-[#5c4006] shadow-md flex items-center justify-center relative transition-transform duration-500';
          } else {
            if (textEl) textEl.textContent = 'SẤP';
            item.el.className = 'w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#68481A] via-[#8C6D23] to-[#453010] border-2 border-[#302108] shadow-md flex items-center justify-center relative transition-transform duration-500';
          }
        }
      });

      currentDongXuStep++;
      dongXuTosses.push(tossSum);

      // Cập nhật dòng trên thang 6 hào
      const row = document.querySelector(`#dongxu-ladder .ladder-row[data-hao="${currentDongXuStep}"]`);
      if (row) {
        const visual = row.querySelector('.ladder-visual');
        const status = row.querySelector('.ladder-status');

        let visualHtml = '';
        let statusText = '';
        let statusColor = '';

        if (tossSum === 9) { // Lão Dương (Dương Động biến Âm)
          visualHtml = '<span class="inline-block w-24 h-2.5 bg-[#D81E05] rounded-xs shadow-2xs relative"><span class="absolute -right-5 -top-1 text-[11px] text-[#D81E05] font-bold">O Đ</span></span>';
          statusText = 'Lão Dương (9 Động)';
          statusColor = 'text-[#D81E05] font-bold';
        } else if (tossSum === 6) { // Lão Âm (Âm Động biến Dương)
          visualHtml = '<span class="inline-flex w-24 justify-between items-center relative"><span class="inline-block w-11 h-2.5 bg-[#D81E05] rounded-xs"></span><span class="inline-block w-11 h-2.5 bg-[#D81E05] rounded-xs"></span><span class="absolute -right-5 -top-1 text-[11px] text-[#D81E05] font-bold">X Đ</span></span>';
          statusText = 'Lão Âm (6 Động)';
          statusColor = 'text-[#D81E05] font-bold';
        } else if (tossSum === 7) { // Thiếu Dương (Dương Tĩnh)
          visualHtml = '<span class="inline-block w-24 h-2.5 bg-[#1A3DB5] rounded-xs shadow-2xs"></span>';
          statusText = 'Thiếu Dương (7)';
          statusColor = 'text-[#1A3DB5] font-semibold';
        } else { // 8: Thiếu Âm (Âm Tĩnh)
          visualHtml = '<span class="inline-flex w-24 justify-between items-center"><span class="inline-block w-11 h-2.5 bg-[#1A3DB5] rounded-xs"></span><span class="inline-block w-11 h-2.5 bg-[#1A3DB5] rounded-xs"></span></span>';
          statusText = 'Thiếu Âm (8)';
          statusColor = 'text-stone-700 font-semibold';
        }

        row.className = `ladder-row flex items-center justify-between p-1.5 rounded-lg border border-stone-300 text-xs ${tossSum === 9 || tossSum === 6 ? 'bg-red-50/70' : 'bg-[#FAF7F2]'}`;
        if (visual) visual.innerHTML = visualHtml;
        if (status) { status.textContent = statusText; status.className = `ladder-status text-[10.5px] w-28 text-right ${statusColor}`; }
      }

      // Kích hoạt dòng hào kế tiếp
      if (currentDongXuStep < 6) {
        const nextHao = currentDongXuStep + 1;
        const nextRow = document.querySelector(`#dongxu-ladder .ladder-row[data-hao="${nextHao}"]`);
        if (nextRow) {
          nextRow.className = 'ladder-row flex items-center justify-between p-1.5 rounded-lg border-2 border-[#8B1E1E] bg-red-50/50 text-xs';
          const nextVis = nextRow.querySelector('.ladder-visual');
          if (nextVis) nextVis.innerHTML = '<span class="text-[#8B1E1E] font-bold text-xs animate-pulse">Đang chờ gieo</span>';
        }

        if (btnTossText) btnTossText.textContent = `Gieo ${haoNames[currentDongXuStep]}`;
        if (dongxuStepBadge) {
          dongxuStepBadge.textContent = `Đã gieo ${currentDongXuStep}/6 hào: Chuẩn bị gieo ${haoNames[currentDongXuStep]}`;
        }
        if (btnTossStep) btnTossStep.disabled = false;
        if (callback) callback();
      } else {
        // Đã hoàn tất 6 lần gieo
        if (btnTossText) btnTossText.textContent = 'Hoàn tất 6 Hào!';
        if (dongxuStepBadge) {
          dongxuStepBadge.textContent = 'Hoàn tất 6 lần gieo! Đang kết xuất Quẻ Dịch...';
          dongxuStepBadge.className = 'px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[11px]';
        }
        if (btnTossStep) btnTossStep.disabled = true;

        setTimeout(() => {
          const question = document.getElementById('dongxu-question-input')?.value.trim() || 'Xem việc khởi sự bằng 3 đồng tiền cổ';
          const res = window.DICH_QUAI_ENGINE.lapQueDongXu(question, dongXuTosses, { date: new Date() });
          renderTrangDichQuaiFull(res);
          switchKinhDichSubTab('xuatque');
          showToast(`Gieo quẻ hoàn tất! Đã xuất Quẻ: ${res.queChu.name}!`);
          if (callback) callback();
        }, 600);
      }

    }, 500);
  }

  btnTossStep?.addEventListener('click', () => tossSingleStep());

  btnTossAuto?.addEventListener('click', () => {
    resetDongXuState();
    function runAutoStep(step) {
      if (step < 6) {
        tossSingleStep(() => {
          setTimeout(() => runAutoStep(step + 1), 250);
        });
      }
    }
    runAutoStep(0);
  });

  btnResetCoins?.addEventListener('click', () => resetDongXuState());

  // =============================================================
  // 4. BẢNG XUẤT QUẺ DỊCH (TRANG DỊCH QUÁI) & CO VÀO 1 TRANG
  // =============================================================
  let isFitOnePageEnabled = true;

  function updateSubtab5NameApp(methodName) {
    const labelEl = document.getElementById('subtab-xuatque-label') || document.getElementById('kd-subtab-5-label');
    const text = methodName ? methodName : '(Xuất Quẻ ...)';
    if (labelEl) {
      labelEl.textContent = text.startsWith('5.') ? text : `5. ${text}`;
    }
  }
  window.updateSubtab5NameApp = updateSubtab5NameApp;

  window.toggleFitOnePage = function(forceState) {
    if (typeof forceState === 'boolean') {
      isFitOnePageEnabled = forceState;
    } else {
      isFitOnePageEnabled = !isFitOnePageEnabled;
    }
    window.applyFitOnePage(isFitOnePageEnabled);
  };

  window.applyFitOnePage = function(enable) {
    isFitOnePageEnabled = (typeof enable === 'boolean') ? enable : isFitOnePageEnabled;
    const fitWrapper = document.getElementById('dq-fit-wrapper');
    const captureEl = document.getElementById('trang-dich-quai-capture');
    const btnToggle = document.getElementById('btn-toggle-fit-page');
    const statusTag = document.getElementById('fit-status-indicator');

    if (!fitWrapper) return;

    if (isFitOnePageEnabled) {
      fitWrapper.classList.add('fit-active');
      if (btnToggle) {
        btnToggle.classList.add('active');
      }
      if (statusTag) {
        statusTag.textContent = 'ĐANG BẬT';
        statusTag.className = 'fit-status-tag on';
      }

      const boardEl = captureEl || fitWrapper.firstElementChild || fitWrapper;
      const parentContainer = fitWrapper.parentElement;
      const availWidth = parentContainer ? parentContainer.clientWidth : window.innerWidth;
      const availHeight = Math.max(520, window.innerHeight - 170);
      const boardWidth = 980;
      const boardHeight = boardEl.scrollHeight || 840;

      const scaleX = (availWidth - 16) / boardWidth;
      const scaleY = availHeight / boardHeight;
      const scale = Math.min(scaleX, scaleY, 1.0);

      fitWrapper.style.transform = `scale(${scale.toFixed(3)})`;
      fitWrapper.style.transformOrigin = 'top center';
      fitWrapper.style.width = `${boardWidth}px`;
      fitWrapper.style.margin = '0 auto';

      const scaledHeight = boardHeight * scale;
      if (parentContainer) {
        parentContainer.style.height = `${scaledHeight + 20}px`;
        parentContainer.style.overflow = 'hidden';
      }
    } else {
      fitWrapper.classList.remove('fit-active');
      fitWrapper.style.transform = 'none';
      fitWrapper.style.width = '100%';
      fitWrapper.style.margin = '0';
      if (btnToggle) {
        btnToggle.classList.remove('active');
      }
      if (statusTag) {
        statusTag.textContent = 'TẮT';
        statusTag.className = 'fit-status-tag off';
      }
      const parentContainer = fitWrapper.parentElement;
      if (parentContainer) {
        parentContainer.style.height = 'auto';
        parentContainer.style.overflow = 'visible';
      }
    }
  };

  window.addEventListener('resize', function() {
    if (isFitOnePageEnabled) {
      window.applyFitOnePage(true);
    }
  });

  window.printTrangDichQuai = function() {
    window.print();
  };

  window.toggleToanManHinh = function() {
    const target = document.getElementById('kinhdich-result') || document.getElementById('view-xuat-que') || document.getElementById('kinhdich-modal');
    if (!target) return;
    if (!document.fullscreenElement) {
      if (target.requestFullscreen) {
        target.requestFullscreen().catch(err => alert(`Toàn màn hình: ${err.message}`));
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  window.taiAnhBangXuatQue = function() {
    const target = document.getElementById('trang-dich-quai-capture') || document.getElementById('kinhdich-result');
    if (!target) {
      alert('Không tìm thấy bảng xuất quẻ để tải ảnh!');
      return;
    }
    if (typeof html2canvas === 'undefined') {
      window.print();
      return;
    }
    html2canvas(target, { scale: 2, useCORS: true, backgroundColor: '#FAF7F2' }).then(canvas => {
      const link = document.createElement('a');
      link.download = `Bang_Xuat_Que_Kinh_Dich_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      console.error(err);
      window.print();
    });
  };

  function renderTrangDichQuaiFull(data) {
    currentDichQuaiData = data;
    if (!resultBox) return;

    // 1. Cập nhật tên Subtab 5 động
    if (data && data.methodName) {
      updateSubtab5NameApp(data.methodName);
    }

    emptyStateBox?.classList.add('hidden');
    resultBox.classList.remove('hidden');

    // 2. Render trực tiếp HTML Đồ Bản Dịch Quái chuẩn
    const htmlContent = window.DICH_QUAI_ENGINE.renderTrangDichQuaiHtml(data);
    resultBox.innerHTML = `
      <div id="dq-fit-wrapper" class="dq-fit-wrapper fit-active">
        ${htmlContent}
      </div>
    `;

    // 3. Chuyển sang Subtab 5
    switchKinhDichSubTab('xuatque');

    // 4. Áp dụng Co Bảng vào 1 trang không cần kéo thanh cuộn
    setTimeout(() => {
      window.applyFitOnePage(true);
    }, 120);

    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Khởi tạo các sự kiện Lập Quẻ Lục Hào, Ngẫu Nhiên, Đồng Xu
  const btnExecNgauNhien = document.getElementById('btn-execute-ngaunhien');
  btnExecNgauNhien?.addEventListener('click', () => {
    if (!window.DICH_QUAI_ENGINE) return;
    const qInput = document.getElementById('maihoa-question-input');
    const question = qInput?.value?.trim() || 'Chiêm bốc việc đại sự ngẫu nhiên khởi tâm';
    const dungThanSelect = document.getElementById('luchao-dungthan-select');
    const dungThan = parseInt(dungThanSelect?.value || '5', 10) || 5;
    const cachTinhRadio = document.querySelector('input[name="app-kd-cach-tinhtoan"]:checked');
    const cachTinh = parseInt(cachTinhRadio?.value || '1', 10) || 1;

    const res = window.DICH_QUAI_ENGINE.lapQueNgauNhien(question, {
      dungThan: dungThan,
      cachTinhToan: cachTinh,
      date: new Date()
    });
    renderTrangDichQuaiFull(res);
    showToast(`Đã xuất quẻ: ${res.queChu?.name || ''}!`);
  });

  const btnExecDongXuCustom = document.getElementById('btn-execute-dongxu');
  btnExecDongXuCustom?.addEventListener('click', () => {
    if (!window.DICH_QUAI_ENGINE) return;
    while (dongXuTosses.length < 6) {
      const h = dongXuTosses.length + 1;
      const c1 = Math.random() < 0.5 ? 0 : 1;
      const c2 = Math.random() < 0.5 ? 0 : 1;
      const c3 = Math.random() < 0.5 ? 0 : 1;
      const sum = c1 + c2 + c3;
      let score = 7;
      if (sum === 3) score = 9;
      else if (sum === 0) score = 6;
      else if (sum === 1) score = 7;
      else score = 8;
      dongXuTosses.push({ haoNum: h, score: score, c1, c2, c3 });
    }
    const qInput = document.getElementById('dongxu-question-input') || document.getElementById('maihoa-question-input');
    const question = qInput?.value?.trim() || 'Xem việc bằng 3 đồng tiền cổ';
    const res = window.DICH_QUAI_ENGINE.lapQueDongXu(question, dongXuTosses, { date: new Date() });
    renderTrangDichQuaiFull(res);
    showToast(`Đã xuất quẻ: ${res.queChu?.name || ''}!`);
  });


  // Sao chép bức ảnh vào Clipboard
  window.copyTrangDichQuaiImage = async function () {
    if (!currentDichQuaiImgUrl) {
      showToast('Chưa có hình ảnh quẻ để sao chép!');
      return;
    }
    try {
      const res = await fetch(currentDichQuaiImgUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showToast('Đã sao chép bức ảnh quẻ Dịch vào bộ nhớ tạm (Clipboard)!');
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      showToast('Nhấp chuột phải vào ảnh và chọn "Sao chép hình ảnh vào bộ nhớ"');
    }
  };

  // Phóng to xem ảnh
  window.openImageZoomModal = function () {
    if (!currentDichQuaiImgUrl) return;
    const zoomModal = document.getElementById('modal-image-zoom');
    const zoomImg = document.getElementById('modal-zoom-img');
    if (zoomModal && zoomImg) {
      zoomImg.classList.remove('zoom-tuvi-full');
      zoomImg.parentElement?.classList.remove('items-start');
      zoomImg.src = currentDichQuaiImgUrl;
      zoomModal.classList.remove('hidden');
      zoomModal.classList.add('flex');
    }
  };

  // Xem luận giải chi tiết
  window.viewChiTietQueHienTai = function () {
    if (!currentDichQuaiData) return;
    const modalReader = document.getElementById('modal-que-detail-reader');
    const body = document.getElementById('que-detail-modal-body');
    if (!modalReader || !body) return;

    const queName = currentDichQuaiData.queChu.name;
    const que = hexagrams.find(q => q.name.includes(queName) || queName.includes(q.name.replace('Quẻ ', ''))) || hexagrams[0];

    body.innerHTML = `
      <div class="border-b border-[#E5DAC6] pb-3 mb-3 flex items-center justify-between">
        <div>
          <span class="text-[10.5px] px-2 py-0.5 rounded bg-red-100 text-[#8B1E1E] font-bold uppercase">
            ${que.number ? `Quẻ Số ${que.number}` : 'Chính Quái'} • Cung ${que.group || currentDichQuaiData.queChu.cung}
          </span>
          <h3 class="font-serif font-bold text-lg sm:text-xl text-[#8B1E1E] mt-1">${que.name}</h3>
          <p class="text-xs text-stone-500">Thượng quái: <strong>${que.upper}</strong> • Hạ quái: <strong>${que.lower}</strong></p>
        </div>
        <div class="text-4xl text-[#8B1E1E] font-serif p-2 rounded-lg bg-[#FAF7F2] border border-[#E5DAC6]">${que.symbol}</div>
      </div>

      <div class="space-y-3 leading-relaxed">
        <div class="bg-[#FAF7F2] border-l-4 border-[#8B1E1E] p-3 rounded-r">
          <strong class="text-[#8B1E1E] block text-xs mb-0.5">Tượng Quẻ & Ý Nghĩa:</strong>
          <p class="italic text-stone-700 text-xs sm:text-sm">"${que.meaning}"</p>
        </div>

        ${que.thoanTu ? `
          <div class="p-3 bg-white rounded-lg border border-[#E5DAC6]">
            <strong class="text-[#8B1E1E] block text-xs mb-1">Thoán Từ Cổ Nhân:</strong>
            <p class="text-stone-700 italic text-xs leading-relaxed">"${que.thoanTu}"</p>
          </div>
        ` : ''}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 bg-white rounded-lg border border-[#E5DAC6]">
            <strong class="text-[#8B1E1E] block mb-1">💼 Công Danh & Sự Nghiệp:</strong>
            <p class="text-stone-600 leading-relaxed">${que.aspects?.career || 'Nên thuận theo thời thế, bền chí ắt thành.'}</p>
          </div>
          <div class="p-2.5 bg-white rounded-lg border border-[#E5DAC6]">
            <strong class="text-amber-800 block mb-1">💰 Tài Lộc & Đầu Tư:</strong>
            <p class="text-stone-600 leading-relaxed">${que.aspects?.wealth || 'Tài chính ổn định, chi tiêu minh bạch.'}</p>
          </div>
          <div class="p-2.5 bg-white rounded-lg border border-[#E5DAC6]">
            <strong class="text-rose-800 block mb-1">❤️ Tình Duyên & Gia Đạo:</strong>
            <p class="text-stone-600 leading-relaxed">${que.aspects?.love || 'Hòa khí sinh tài, thấu hiểu bao dung.'}</p>
          </div>
          <div class="p-2.5 bg-white rounded-lg border border-[#E5DAC6]">
            <strong class="text-emerald-800 block mb-1">🌿 Sức Khỏe & Thân Tâm:</strong>
            <p class="text-stone-600 leading-relaxed">${que.aspects?.health || 'Tâm an thân lạc, giữ gìn ẩm thực điều độ.'}</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-[#F4ECE1] text-xs">
          <strong class="text-[#8B1E1E] block mb-0.5">Lời Khuyên Hành Động:</strong>
          <p class="text-stone-800 leading-relaxed">${que.advice}</p>
        </div>
      </div>
    `;

    modalReader.classList.remove('hidden');
    modalReader.classList.add('flex');
  };

  window.resetGieoQue = function () {
    resultBox?.classList.add('hidden');
    const modalContent = modal?.querySelector('.overflow-y-auto');
    if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.getElementById('close-que-detail-modal')?.addEventListener('click', () => {
    const modalReader = document.getElementById('modal-que-detail-reader');
    modalReader?.classList.add('hidden');
    modalReader?.classList.remove('flex');
  });

  // =============================================================
  // 4. MENU CHUỘT PHẢI THUẦN VIỆT 100% (VIETNAMESE CONTEXT MENU)
  // =============================================================
  const vietnameseContextMenu = document.getElementById('vietnamese-context-menu');
  let selectedTextForContext = '';

  // Quản lý bộ nhớ đệm hình ảnh và chế độ phóng to
  let cachedTuViDataUrl = null;
  let cachedTuViBlob = null;
  let currentZoomType = 'dich'; // 'dich' | 'tuvi'

  window.invalidateTuViImageCache = function () {
    cachedTuViDataUrl = null;
    cachedTuViBlob = null;
  };

      // Ve de truc tiep khoi hop den va chu Tuan/Triet len Canvas dam bao 100% nam tron ven trong o den
  function drawTuViBadgesOnCanvas(canvas, positions) {
    if (!canvas || !positions) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = canvas.width / 800;
    const badgeW = Math.round(42 * 1.2 * scale);
    const badgeH = Math.round(20 * 1.2 * scale);
    const radius = Math.round(2 * 1.2 * scale);
    const fontSize = Math.round(11 * 1.2 * scale);

    const isSamePosition = Array.isArray(positions.tuan) && Array.isArray(positions.triet) &&
      positions.tuan.length >= 2 && positions.triet.length >= 2 &&
      Math.min(positions.tuan[0], positions.tuan[1]) === Math.min(positions.triet[0], positions.triet[1]) &&
      Math.max(positions.tuan[0], positions.tuan[1]) === Math.max(positions.triet[0], positions.triet[1]);

    function drawBadge(posPair, text, offsetDir = 0) {
      if (!Array.isArray(posPair) || posPair.length < 2) return;
      const coords = typeof window.getTuViBoundaryCoords === 'function' 
        ? window.getTuViBoundaryCoords(posPair[0], posPair[1])
        : null;
      if (!coords) return;

      let topPercent = 0;
      let topPxOffset = 0;
      if (typeof coords.top === 'string') {
        const match = coords.top.match(/calc\s*\(\s*([\d.]+)%\s*([+-])\s*([\d.]+)px\s*\)/);
        if (match) {
          topPercent = parseFloat(match[1]);
          topPxOffset = (match[2] === '-' ? -1 : 1) * parseFloat(match[3]) * scale;
        } else {
          topPercent = parseFloat(coords.top) || 0;
        }
      } else {
        topPercent = Number(coords.top) || 0;
      }

      let cx = (parseFloat(coords.left) / 100) * canvas.width;
      let cy = (topPercent / 100) * canvas.height + topPxOffset;

      if (offsetDir !== 0) {
        cx += offsetDir * (badgeW / 2 + Math.round(2 * scale));
      }

      const rx = Math.round(cx - badgeW / 2);
      const ry = Math.round(cy - badgeH / 2);

      // 1. Ve khoi den chu nhat
      ctx.save();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rx, ry, badgeW, badgeH, radius);
      } else {
        ctx.rect(rx, ry, badgeW, badgeH);
      }
      ctx.fill();
      ctx.restore();

      // 2. Ve chu trang can giua hoan toan ben trong khoi den
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, cx, cy);
      ctx.restore();
    }

    if (isSamePosition) {
      drawBadge(positions.tuan, 'Tu\u1EA7n', -1);
      drawBadge(positions.triet, 'Tri\u1EC7t', 1);
    } else {
      if (positions.tuan) drawBadge(positions.tuan, 'Tu\u1EA7n');
      if (positions.triet) drawBadge(positions.triet, 'Tri\u1EC7t');
    }
  }

  // Ảnh được lưu luôn vào bộ nhớ đệm để nút Phóng to / Tải ảnh / Sao chép dùng lại, không vẽ lại lần hai.
  window.renderTuViBoardToImage = async function () {
    const view = document.getElementById('tuvi-image-view');
    const staging = document.getElementById('tuvi-render-staging');
    const board = staging && staging.querySelector('.tuvi-board');
    if (!view || !staging || !board) return;

    // Dự phòng: không kết xuất được thì hiện thẳng bản tương tác thay vì bỏ trống
    const fallbackToLiveBoard = (note) => {
      staging.removeAttribute('aria-hidden');
      staging.id = 'tuvi-live-board';
      view.innerHTML = note
        ? `<p class="mb-2 text-[11px] text-amber-700">${note}</p>`
        : '';
      view.appendChild(staging);
    };

    if (typeof html2canvas !== 'function') {
      fallbackToLiveBoard('Chưa tải được thư viện kết xuất ảnh — đang hiển thị bản tương tác.');
      return;
    }

    try {
      // Chờ font web nạp xong và trình duyệt dựng xong layout, tránh ảnh lệch chữ
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const canvas = await html2canvas(board, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#EDECE6',
        logging: false,
        width: board.offsetWidth,
        height: board.offsetHeight,
        windowWidth: 1400
      });

      // Vẽ đè trực tiếp ô đen và chữ Tuần/Triệt lên Canvas đảm bảo 100% nằm trọn vẹn trong ô đen
      if (typeof drawTuViBadgesOnCanvas === 'function') {
        drawTuViBadgesOnCanvas(canvas, window.currentTuViPositions);
      }

      cachedTuViDataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => { cachedTuViBlob = blob; }, 'image/png');

      // Lưu blob và dataURL phục vụ tải/sao chép/phóng to, TUYỆT ĐỐI không ghi đè view.innerHTML
      // Giữ nguyên bản Live Board (#tuvi-live-board) phẳng chuẩn, không bao giờ bị nhảy ảnh hay cắt xén
    } catch (err) {
      console.error('Lỗi kết xuất ảnh lá số:', err);
      fallbackToLiveBoard('Không kết xuất được ảnh — đang hiển thị bản tương tác.');
    }
  };

  // Helper kết xuất hình ảnh Lá Số Tử Vi sang Blob & DataURL
  async function getTuViImageBlob() {
    if (cachedTuViBlob && cachedTuViDataUrl) {
      return cachedTuViBlob;
    }
    const boardElement = document.querySelector('.tuvi-board') || document.getElementById('tuvi-12-palaces');
    if (!boardElement) {
      showToast('Không tìm thấy bản đồ Lá Số Tử Vi!');
      return null;
    }
    if (typeof html2canvas !== 'function') {
      showToast('Thư viện kết xuất ảnh chưa sẵn sàng!');
      return null;
    }

    try {
      const canvas = await html2canvas(boardElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#EDECE6',
        logging: false
      });

      // Vẽ đè trực tiếp ô đen và chữ Tuần/Triệt lên Canvas khi xuất ảnh tải về
      if (typeof drawTuViBadgesOnCanvas === 'function') {
        drawTuViBadgesOnCanvas(canvas, window.currentTuViPositions);
      }

      cachedTuViDataUrl = canvas.toDataURL('image/png');

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          cachedTuViBlob = blob;
          resolve(blob);
        }, 'image/png');
      });
    } catch (err) {
      console.error('Lỗi khi kết xuất ảnh lá số:', err);
      showToast('Không thể kết xuất ảnh Lá Số Tử Vi!');
      return null;
    }
  }

  // 1. Sao chép hình ảnh Lá Số Tử Vi vào Clipboard
  window.copyTuViImage = async function () {
    showToast('Đang kết xuất và sao chép hình ảnh Lá Số...');
    try {
      const blob = await getTuViImageBlob();
      if (!blob) return;

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('Đã sao chép hình ảnh Lá Số Tử Vi vào bộ nhớ tạm (Clipboard)!');
      } else {
        showToast('Trình duyệt không hỗ trợ Clipboard API trực tiếp. Đang tải ảnh về máy...');
        window.downloadTuViImageDirect();
      }
    } catch (err) {
      console.warn('Lỗi ghi clipboard:', err);
      showToast('Đang tải ảnh lá số về máy...');
      window.downloadTuViImageDirect();
    }
  };

  // 2. Phóng to toàn màn hình Lá Số Tử Vi
  window.openTuViImageZoomModal = async function () {
    const zoomModal = document.getElementById('modal-image-zoom');
    const zoomImg = document.getElementById('modal-zoom-img');
    const zoomTitle = document.getElementById('modal-zoom-title');
    if (!zoomModal || !zoomImg) return;

    showToast('Đang mở xem phóng to Lá Số Tử Vi...');

    let imgUrl = cachedTuViDataUrl;
    if (!imgUrl) {
      const blob = await getTuViImageBlob();
      if (blob) {
        imgUrl = cachedTuViDataUrl || URL.createObjectURL(blob);
      }
    }

    if (imgUrl) {
      currentZoomType = 'tuvi';
      zoomImg.src = imgUrl;
      // Lá số khổ dọc: hiện đúng 1:1 với bản dựng cho chữ nét, cuộn dọc để đọc
      zoomImg.classList.add('zoom-tuvi-full');
      zoomImg.parentElement?.classList.add('items-start');
      if (zoomTitle) zoomTitle.textContent = 'Bản Đồ Lá Số Tử Vi (Phóng To Toàn Màn Hình)';
      zoomModal.classList.remove('hidden');
      zoomModal.classList.add('flex');
    }
  };

  // 3. Mở ảnh Lá Số Tử Vi trong thẻ mới
  window.openTuViImageInNewTab = async function () {
    showToast('Đang chuẩn bị mở ảnh trong thẻ mới...');
    let imgUrl = cachedTuViDataUrl;
    if (!imgUrl) {
      const blob = await getTuViImageBlob();
      if (blob) {
        imgUrl = cachedTuViDataUrl || URL.createObjectURL(blob);
      }
    }

    if (!imgUrl) return;

    const nameInput = document.getElementById('tuvi-name')?.value.trim() || 'Thân Chủ Tín Tâm';
    const win = window.open();
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html lang="vi">
          <head>
            <meta charset="UTF-8">
            <title>Lá Số Tử Vi - ${nameInput}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { box-sizing: border-box; }
              body { 
                margin: 0; 
                background: #1f1a17; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 20px; 
                font-family: system-ui, -apple-system, sans-serif;
              }
              img { 
                max-width: 100%; 
                max-height: 95vh; 
                height: auto;
                object-fit: contain; 
                box-shadow: 0 20px 45px rgba(0,0,0,0.7); 
                border-radius: 8px; 
                background: #F4F4EC; 
              }
            </style>
          </head>
          <body>
            <img src="${imgUrl}" alt="Bản đồ Lá Số Tử Vi" />
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  // Tải trực tiếp ảnh Lá Số Tử Vi
  window.downloadTuViImageDirect = function () {
    if (cachedTuViDataUrl) {
      const nameInput = document.getElementById('tuvi-name')?.value.trim() || 'Than_Chu';
      const cleanName = nameInput.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_');
      const link = document.createElement('a');
      link.download = `La_So_Tu_Vi_${cleanName}.png`;
      link.href = cachedTuViDataUrl;
      link.click();
      showToast('Đã tải thành công ảnh lá số về máy!');
      return;
    }
    const btn = document.getElementById('download-tuvi-image-btn');
    if (btn) btn.click();
  };

  // Xử lý nút tải ảnh trong modal phóng to
  window.downloadCurrentZoomImage = function () {
    if (currentZoomType === 'tuvi') {
      window.downloadTuViImageDirect();
    } else {
      downloadTrangDichQuai();
    }
  };

  // Bắt sự kiện nhấp chuột phải
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (!vietnameseContextMenu) return;

    const ctxGroupTuVi = document.getElementById('ctx-group-tuvi');
    const ctxGroupDefault = document.getElementById('ctx-group-default');
    const ctxTitleText = document.getElementById('ctx-title-text');
    const ctxBadgeText = document.getElementById('ctx-badge-text');

    // Xác định ngữ cảnh: người dùng có đang xem Lá Số Tử Vi hay không
    const tuviModal = document.getElementById('tuvi-modal');
    const isTuViModalOpen = tuviModal && !tuviModal.classList.contains('hidden');
    const isClickInsideTuVi = !!e.target.closest('#tuvi-modal') || 
                              !!e.target.closest('.tuvi-board') || 
                              !!e.target.closest('#tuvi-12-palaces');
    const isTuViContext = isClickInsideTuVi || (isTuViModalOpen && !e.target.closest('#kinhdich-modal'));

    if (isTuViContext) {
      // ĐÂY LÀ LÁ SỐ TỬ VI: CHỈ HIỂN THỊ DUY NHẤT 3 MỤC:
      // 1. Lưu hình ảnh
      // 2. Sao chép hình ảnh
      // 3. Phóng to màn hình
      // 4. Mở ảnh trong thẻ mới
      // TUYỆT ĐỐI KHÔNG CÓ CÁC MỤC QUẺ DỊCH VÀ CÁC MỤC KHÁC
      if (ctxGroupTuVi) ctxGroupTuVi.classList.remove('hidden');
      if (ctxGroupDefault) ctxGroupDefault.classList.add('hidden');
      if (ctxTitleText) ctxTitleText.textContent = 'Lá Số Tử Vi';
      if (ctxBadgeText) ctxBadgeText.textContent = 'Tiện Ích';

      let x = e.clientX;
      let y = e.clientY;
      const menuWidth = 260;
      const menuHeight = 185; // Menu gọn gàng cho đúng 4 mục lá số

      if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 12;
      }
      if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 12;
      }

      vietnameseContextMenu.style.left = `${Math.max(10, x)}px`;
      vietnameseContextMenu.style.top = `${Math.max(10, y)}px`;
      vietnameseContextMenu.classList.remove('hidden');
      return;
    }

    // NGƯỢC LẠI: NGỮ CẢNH KINH DỊCH HOẶC TRANG CHỦ
    if (ctxGroupTuVi) ctxGroupTuVi.classList.add('hidden');
    if (ctxGroupDefault) ctxGroupDefault.classList.remove('hidden');
    if (ctxTitleText) ctxTitleText.textContent = 'Thực Đơn Chuột Phải';
    if (ctxBadgeText) ctxBadgeText.textContent = '100% Tiếng Việt';

    // Kiểm tra xem người dùng có đang bôi đen chữ không
    selectedTextForContext = window.getSelection() ? window.getSelection().toString().trim() : '';
    const btnCopyText = document.getElementById('ctx-copy-text');
    if (btnCopyText) {
      if (selectedTextForContext.length > 0) {
        btnCopyText.classList.remove('hidden');
      } else {
        btnCopyText.classList.add('hidden');
      }
    }

    // Ẩn nhóm ảnh quẻ nếu không có quẻ được lập
    const ctxSubgroupDich = document.getElementById('ctx-subgroup-dich-img');
    const kinhDichModal = document.getElementById('kinhdich-modal');
    const isKinhDichOpen = kinhDichModal && !kinhdichModal.classList.contains('hidden');
    if (ctxSubgroupDich) {
      if (!isKinhDichOpen && !currentDichQuaiImgUrl) {
        ctxSubgroupDich.classList.add('hidden');
      } else {
        ctxSubgroupDich.classList.remove('hidden');
      }
    }

    let x = e.clientX;
    let y = e.clientY;
    const menuWidth = 280;
    const menuHeight = 420;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 12;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 12;
    }

    vietnameseContextMenu.style.left = `${Math.max(10, x)}px`;
    vietnameseContextMenu.style.top = `${Math.max(10, y)}px`;
    vietnameseContextMenu.classList.remove('hidden');
  });

  // Đóng menu chuột phải khi click chuột trái, cuộn hoặc bấm Esc
  window.addEventListener('click', (e) => {
    if (vietnameseContextMenu && !vietnameseContextMenu.contains(e.target)) {
      vietnameseContextMenu.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && vietnameseContextMenu) {
      vietnameseContextMenu.classList.add('hidden');
    }
  });

  window.addEventListener('scroll', () => {
    if (vietnameseContextMenu && !vietnameseContextMenu.classList.contains('hidden')) {
      vietnameseContextMenu.classList.add('hidden');
    }
  }, true);

  // Mở bức ảnh quẻ trong tab mới (cho Kinh Dịch)
  window.openImageInNewTab = function () {
    if (!currentDichQuaiImgUrl) {
      showToast('Vui lòng lập quẻ Dịch để có ảnh mở trong thẻ mới!');
      return;
    }
    const win = window.open();
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html lang="vi">
          <head>
            <meta charset="UTF-8">
            <title>Bản Đồ Quẻ Dịch - ${currentDichQuaiData?.queChu?.name || 'Trang Dịch Quái'}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; background: #2A2421; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; box-sizing: border-box; }
              img { max-width: 100%; max-height: 95vh; object-contain: contain; box-shadow: 0 15px 35px rgba(0,0,0,0.6); border-radius: 10px; background: #fff; }
            </style>
          </head>
          <body>
            <img src="${currentDichQuaiImgUrl}" alt="Bản đồ quẻ Dịch" />
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  // Gắn sự kiện các nút trong menu chuột phải tiếng Việt CHO LÁ SỐ TỬ VI
  document.getElementById('ctx-tuvi-save-img')?.addEventListener('click', async () => {
    vietnameseContextMenu?.classList.add('hidden');
    showToast('Đang lưu hình ảnh Lá Số Tử Vi...');
    if (!cachedTuViDataUrl) {
      await getTuViImageBlob();
    }
    window.downloadTuViImageDirect();
  });

  document.getElementById('ctx-tuvi-copy-img')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    copyTuViImage();
  });

  document.getElementById('ctx-tuvi-zoom-img')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    openTuViImageZoomModal();
  });

  document.getElementById('ctx-tuvi-open-tab')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    openTuViImageInNewTab();
  });

  // Gắn sự kiện các nút trong menu chuột phải tiếng Việt CHO KINH DỊCH & CHUNG
  document.getElementById('ctx-copy-text')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    if (selectedTextForContext) {
      navigator.clipboard.writeText(selectedTextForContext);
      showToast('Đã sao chép đoạn chữ đã chọn!');
    }
  });

  document.getElementById('ctx-save-img')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    downloadTrangDichQuai();
  });

  document.getElementById('ctx-copy-img')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    copyTrangDichQuaiImage();
  });

  document.getElementById('ctx-zoom-img')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    if (!currentDichQuaiImgUrl) {
      showToast('Chưa có ảnh quẻ Dịch. Vui lòng lập quẻ trước!');
      return;
    }
    openImageZoomModal();
  });

  document.getElementById('ctx-open-tab')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    openImageInNewTab();
  });

  document.getElementById('ctx-view-explanation')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    if (!currentDichQuaiData) {
      showToast('Chưa có quẻ nào được lập. Hãy gieo quẻ trước!');
      return;
    }
    viewChiTietQueHienTai();
  });

  document.getElementById('ctx-print')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    window.print();
  });

  document.getElementById('ctx-new-maihoa')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    if (modal?.classList.contains('hidden')) {
      document.getElementById('card-kinhdich')?.click();
    }
    switchKinhDichSubTab('maihoa');
    const modalContent = modal?.querySelector('.overflow-y-auto');
    if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Đã mở giao diện Lập quẻ Mai Hoa Dịch Số');
  });

  document.getElementById('ctx-new-luchao')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    if (modal?.classList.contains('hidden')) {
      document.getElementById('card-kinhdich')?.click();
    }
    switchKinhDichSubTab('luchao');
    const modalContent = modal?.querySelector('.overflow-y-auto');
    if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Đã mở giao diện Gieo quẻ Lục Hào');
  });

  document.getElementById('ctx-open-hoangdao')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    if (typeof window.openHoangDaoModal === 'function') {
      window.openHoangDaoModal();
    } else {
      document.getElementById('btn-hoangdao-trigger')?.click();
    }
  });

  document.getElementById('ctx-back')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    window.history.back();
  });

  document.getElementById('ctx-refresh')?.addEventListener('click', () => {
    vietnameseContextMenu?.classList.add('hidden');
    location.reload();
  });

  // -------------------------------------------------------------
  // TRA CỨU 64 QUẺ DỊCH
  // -------------------------------------------------------------
  let currentFilterGroup = 'all';
  let currentSearchQuery = '';

  function render64QueGrid() {
    if (!grid64Que) return;

    const filtered = hexagrams.filter(q => {
      const matchGroup = (currentFilterGroup === 'all') || (q.group === currentFilterGroup);
      const qText = `${q.number} ${q.name} ${q.meaning} ${q.upper} ${q.lower}`.toLowerCase();
      const matchSearch = !currentSearchQuery || qText.includes(currentSearchQuery.toLowerCase());
      return matchGroup && matchSearch;
    });

    if (filtered.length === 0) {
      grid64Que.innerHTML = `
        <div class="col-span-full text-center py-8 text-stone-400 text-xs">
          Không tìm thấy quẻ dịch nào phù hợp với từ khóa "${currentSearchQuery}".
        </div>
      `;
      return;
    }

    grid64Que.innerHTML = filtered.map(q => {
      const natureBadge = q.nature?.includes('Đại Cát') 
        ? 'bg-emerald-100 text-emerald-800' 
        : (q.nature?.includes('Cát') ? 'bg-green-100 text-green-800' 
        : (q.nature?.includes('Hung') ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'));

      return `
        <div 
          class="p-2.5 bg-white rounded-lg border border-[#E5DAC6] hover:border-[#8B1E1E] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between text-left group"
          onclick="view64QueDetail(${q.number})"
        >
          <div>
            <div class="flex items-center justify-between text-[10px] mb-1">
              <span class="font-mono font-bold text-[#8B1E1E]">#${q.number < 10 ? '0' + q.number : q.number}</span>
              <span class="text-base text-[#8B1E1E] leading-none">${q.symbol}</span>
            </div>
            <h6 class="font-serif font-bold text-xs text-stone-900 group-hover:text-[#8B1E1E] transition-colors line-clamp-1 mb-1">
              ${q.name}
            </h6>
            <p class="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">
              ${q.meaning}
            </p>
          </div>
          <div class="mt-2 pt-1.5 border-t border-[#F5EEDF] flex items-center justify-between text-[9.5px]">
            <span class="px-1.5 py-0.5 rounded ${natureBadge} font-semibold">${q.nature}</span>
            <span class="text-stone-400 group-hover:text-[#8B1E1E] font-medium">Chi tiết →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Global function to view 64 que detail
  window.view64QueDetail = function(queNumber) {
    const que = hexagrams.find(q => q.number === queNumber);
    if (!que || !queDetailCard || !queDetailView || !grid64Que) return;

    queDetailCard.innerHTML = `
      <div class="flex items-center justify-between border-b border-[#E5DAC6] pb-3 mb-3">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-[#8B1E1E] uppercase">
              Quẻ Số ${que.number}
            </span>
            <span class="text-[10.5px] px-2 py-0.5 rounded ${que.nature?.includes('Cát') ? 'bg-emerald-100 text-emerald-800' : (que.nature?.includes('Hung') ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')} font-bold">
              ${que.nature}
            </span>
            <span class="text-[10px] text-stone-500 font-medium">Cung ${que.group}</span>
          </div>
          <h4 class="font-serif font-bold text-lg sm:text-xl text-[#8B1E1E]">${que.name}</h4>
          <p class="text-xs text-stone-500">Thượng quái: <strong>${que.upper}</strong> • Hạ quái: <strong>${que.lower}</strong></p>
        </div>
        <div class="text-4xl text-[#8B1E1E] font-serif p-2 rounded-lg bg-[#FAF7F2] border border-[#E5DAC6]">${que.symbol}</div>
      </div>

      <div class="space-y-3">
        <p class="text-stone-700 italic text-xs sm:text-sm leading-relaxed border-l-3 border-[#8B1E1E] pl-3 py-1 bg-[#FAF7F2] rounded-r">
          "${que.meaning}"
        </p>

        <div class="bg-[#FAF8F3] p-3 rounded-lg border border-[#E5DAC6] text-xs">
          <strong class="text-[#8B1E1E] block mb-1">Thoán Từ Cổ Truyền:</strong>
          <p class="text-stone-700 italic leading-relaxed">"${que.thoanTu}"</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div class="bg-white p-2.5 rounded-lg border border-[#E5DAC6]">
            <span class="text-xs font-bold text-red-800 flex items-center gap-1">
              <span>👑</span> Công Danh & Sự Nghiệp
            </span>
            <p class="text-xs text-stone-600 mt-1 leading-relaxed">${que.aspects?.career || ''}</p>
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-[#E5DAC6]">
            <span class="text-xs font-bold text-amber-700 flex items-center gap-1">
              <span>💰</span> Tài Vận & Tiền Bạc
            </span>
            <p class="text-xs text-stone-600 mt-1 leading-relaxed">${que.aspects?.wealth || ''}</p>
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-[#E5DAC6]">
            <span class="text-xs font-bold text-rose-700 flex items-center gap-1">
              <span>💖</span> Tình Duyên & Gia Đạo
            </span>
            <p class="text-xs text-stone-600 mt-1 leading-relaxed">${que.aspects?.love || ''}</p>
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-[#E5DAC6]">
            <span class="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span>🌿</span> Sức Khỏe & Bình An
            </span>
            <p class="text-xs text-stone-600 mt-1 leading-relaxed">${que.aspects?.health || ''}</p>
          </div>
        </div>

        <div class="bg-[#F4ECE1] p-3 rounded-lg text-xs text-stone-700">
          <strong class="text-[#8B1E1E]">Lời khuyên cổ nhân:</strong> ${que.advice}
        </div>
      </div>
    `;

    grid64Que.classList.add('hidden');
    queDetailView.classList.remove('hidden');
    modal.querySelector('.overflow-y-auto')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  btnBackTo64List?.addEventListener('click', () => {
    queDetailView?.classList.add('hidden');
    grid64Que?.classList.remove('hidden');
  });

  // Filter Group buttons
  filterQueGroup?.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterQueGroup.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#8B1E1E]', 'text-white', 'font-semibold');
        b.classList.add('bg-white', 'border', 'border-[#D8CCB7]', 'text-stone-700');
      });
      btn.classList.add('active', 'bg-[#8B1E1E]', 'text-white', 'font-semibold');
      btn.classList.remove('bg-white', 'border', 'border-[#D8CCB7]', 'text-stone-700');

      currentFilterGroup = btn.getAttribute('data-group') || 'all';
      render64QueGrid();
    });
  });

  // Search input
  searchQueInput?.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim();
    render64QueGrid();
  });

  // Initial render of 64 que grid
  render64QueGrid();
}

// 3. Phong Thủy Dương Trạch & Cẩm Nang Cổ Truyền Modal
function initPhongThuyModal() {
  const modal = document.getElementById('phongthuy-modal');
  const closeBtn = document.getElementById('close-phongthuy-modal');
  const triggerBtn = document.getElementById('btn-phongthuy-trigger');

  if (!modal) return;

  // Tabs & Panes
  const tabs = [
    { id: 'pt-tab-calc', paneId: 'pt-pane-calc' },
    { id: 'pt-tab-hoangoc', paneId: 'pt-pane-hoangoc' },
    { id: 'pt-tab-lakinh', paneId: 'pt-pane-lakinh' },
    { id: 'pt-tab-articles', paneId: 'pt-pane-articles' }
  ];

  function switchTab(targetTabId) {
    tabs.forEach(t => {
      const tabEl = document.getElementById(t.id);
      const paneEl = document.getElementById(t.paneId);
      if (!tabEl || !paneEl) return;

      if (t.id === targetTabId) {
        tabEl.classList.add('bg-[#8B1E1E]', 'text-white', 'border-[#8B1E1E]', 'shadow-2xs', 'font-bold');
        tabEl.classList.remove('bg-white', 'text-stone-700', 'border-[#D8CCB7]');
        paneEl.classList.remove('hidden');
      } else {
        tabEl.classList.remove('bg-[#8B1E1E]', 'text-white', 'border-[#8B1E1E]', 'shadow-2xs', 'font-bold');
        tabEl.classList.add('bg-white', 'text-stone-700', 'border-[#D8CCB7]');
        paneEl.classList.add('hidden');
      }
    });
  }

  tabs.forEach(t => {
    const btn = document.getElementById(t.id);
    if (btn) {
      btn.addEventListener('click', () => switchTab(t.id));
    }
  });

  // Open modal triggers
  function openModal(defaultTabId = 'pt-tab-calc') {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    switchTab(defaultTabId);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('pt-tab-calc');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Wire Top Menu Links to open modal at specific tab
  document.querySelectorAll('a[href="#phong-thuy-section"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('bát trạch')) {
        e.preventDefault();
        openModal('pt-tab-calc');
      } else if (text.includes('la kinh')) {
        e.preventDefault();
        openModal('pt-tab-lakinh');
      } else if (text.includes('nhà ở') || text.includes('văn phòng')) {
        e.preventDefault();
        openModal('pt-tab-articles');
      } else if (link.id === 'btn-phongthuy-trigger') {
        e.preventDefault();
        openModal('pt-tab-calc');
      }
    });
  });

  // Populate Build Year Select
  const buildYearSelect = document.getElementById('pt-build-year');
  if (buildYearSelect) {
    const curYear = new Date().getFullYear();
    buildYearSelect.innerHTML = '';
    for (let y = curYear - 1; y <= curYear + 6; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      const canChi = typeof PhongThuyEngine !== 'undefined' ? PhongThuyEngine.getCanChiYear(y) : '';
      opt.textContent = `Năm ${y} (${canChi})`;
      if (y === curYear) opt.selected = true;
      buildYearSelect.appendChild(opt);
    }
  }

  // Handle Form Submit
  const calcForm = document.getElementById('phongthuy-calc-form');
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runCalculation();
      showToast('Đã tính toán hạn làm nhà và hướng phong thủy!');
    });
  }

  function runCalculation() {
    if (typeof PhongThuyEngine === 'undefined') return;

    const birthYearInput = document.getElementById('pt-birth-year');
    const genderInput = document.querySelector('input[name="pt-gender"]:checked');
    const buildYearSelect = document.getElementById('pt-build-year');

    const birthYear = parseInt(birthYearInput ? birthYearInput.value : 1990, 10);
    const gender = genderInput ? genderInput.value : 'Nam';
    const buildYear = parseInt(buildYearSelect ? buildYearSelect.value : 2026, 10);

    const result = PhongThuyEngine.evaluateBuildHouse(birthYear, gender, buildYear);
    renderPhongThuyFullResult(result);
  }

  function renderPhongThuyFullResult(res) {
    const container = document.getElementById('phongthuy-full-result');
    if (!container) return;

    const isScoreGood = res.score >= 70;
    const isScoreModerate = res.score >= 40 && res.score < 70;

    const bannerBg = isScoreGood 
      ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
      : (isScoreModerate ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-red-50 border-red-300 text-red-900');

    const badgeBg = isScoreGood 
      ? 'bg-emerald-600 text-white' 
      : (isScoreModerate ? 'bg-amber-600 text-white' : 'bg-red-700 text-white');

    container.innerHTML = `
      <!-- Banner Tổng Quan Đánh Giá -->
      <div class="p-4 rounded-xl border-2 ${bannerBg} shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/15 pb-2.5 mb-2.5">
          <div>
            <span class="text-xs uppercase tracking-wider font-semibold opacity-80">
              Gia chủ: ${res.gender} • Sinh năm ${res.birthYear} (${res.birthCanChi}) • Khởi công năm ${res.buildYear} (${res.buildCanChi})
            </span>
            <h4 class="font-serif font-bold text-base sm:text-lg mt-0.5">${res.conclusion}</h4>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold ${badgeBg}">
              Tuổi mụ: ${res.lunarAge} tuổi
            </span>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-900/10">
              Điểm: ${res.score}/100
            </span>
          </div>
        </div>
        <p class="text-xs leading-relaxed opacity-95">
          <strong>Lời khuyên:</strong> ${res.recommendation}
        </p>
      </div>

      <!-- 3 Cột Đại Hạn: Hoang Ốc, Kim Lâu, Tam Tai -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        
        <!-- 1. Hạn Hoang Ốc -->
        <div class="p-3.5 bg-white rounded-xl border ${res.hoangOc.type === 'good' ? 'border-emerald-200' : 'border-red-200'} shadow-2xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-bold text-stone-700">1. Hạn Hoang Ốc</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${res.hoangOc.type === 'good' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                ${res.hoangOc.label}
              </span>
            </div>
            <div class="font-serif font-bold text-sm ${res.hoangOc.type === 'good' ? 'text-emerald-800' : 'text-red-800'} mb-1">
              Cung ${res.hoangOc.name}
            </div>
            <p class="text-[11px] text-stone-500 italic mb-1 font-serif">"${res.hoangOc.poem}"</p>
            <p class="text-stone-600 leading-relaxed text-[11px]">${res.hoangOc.meaning}</p>
          </div>
          <div class="mt-2.5 pt-2 border-t border-stone-100 text-[10px] text-stone-500">
            📍 Vị trí bàn tay: <strong>${res.hoangOc.fingerPos}</strong>
          </div>
        </div>

        <!-- 2. Hạn Kim Lâu -->
        <div class="p-3.5 bg-white rounded-xl border ${!res.kimLau.isBad ? 'border-emerald-200' : 'border-red-200'} shadow-2xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-bold text-stone-700">2. Hạn Kim Lâu</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${!res.kimLau.isBad ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                ${res.kimLau.type}
              </span>
            </div>
            <div class="font-serif font-bold text-sm ${!res.kimLau.isBad ? 'text-emerald-800' : 'text-red-800'} mb-1">
              ${res.kimLau.name}
            </div>
            <p class="text-[11px] text-stone-500 mb-1">
              Phép tính: ${res.lunarAge} ÷ 9 = dư <strong>${res.kimLau.remainder}</strong>
            </p>
            <p class="text-stone-600 leading-relaxed text-[11px]">${res.kimLau.desc}</p>
          </div>
          <div class="mt-2.5 pt-2 border-t border-stone-100 text-[10px] text-stone-500">
            ${!res.kimLau.isBad ? '✓ Không kỵ Thân, Thê, Tử, Súc' : '⚠️ Cần người khác đứng lễ động thổ'}
          </div>
        </div>

        <!-- 3. Hạn Tam Tai -->
        <div class="p-3.5 bg-white rounded-xl border ${!res.tamTai.isBad ? 'border-emerald-200' : 'border-red-200'} shadow-2xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-bold text-stone-700">3. Hạn Tam Tai</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${!res.tamTai.isBad ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                ${res.tamTai.isBad ? 'Phạm Tam Tai' : 'Bình Hòa'}
              </span>
            </div>
            <div class="font-serif font-bold text-sm ${!res.tamTai.isBad ? 'text-emerald-800' : 'text-red-800'} mb-1">
              ${res.tamTai.stage}
            </div>
            <p class="text-[11px] text-stone-500 mb-1">
              Tam hợp tuổi: <strong>${res.tamTai.groupName}</strong> (Kỵ: ${res.tamTai.tamTaiYearsName})
            </p>
            <p class="text-stone-600 leading-relaxed text-[11px]">${res.tamTai.desc}</p>
          </div>
          <div class="mt-2.5 pt-2 border-t border-stone-100 text-[10px] text-stone-500">
            ${!res.tamTai.isBad ? '✓ Khí trường bình an hòa thuận' : '⚠️ Tránh việc khởi công làm dang dở'}
          </div>
        </div>

      </div>

      <!-- Bát Trạch Quái Mệnh & Hướng Nhà Cát Hung -->
      <div class="bg-white p-4 rounded-xl border border-[#E5DAC6] shadow-2xs space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2">
          <div>
            <span class="text-[11px] text-stone-500">Bát Trạch Minh Kính Định Hướng</span>
            <h5 class="font-serif font-bold text-base text-[#8B1E1E]">
              Mệnh Quái: ${res.batTrach.name} • Thuộc ${res.batTrach.group} (${res.batTrach.houseGroup})
            </h5>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${res.batTrach.group.includes('Đông') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
            Hợp Hướng: ${res.batTrach.houseGroup}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <!-- 4 Hướng Tốt -->
          <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1.5">
            <h6 class="font-serif font-bold text-emerald-900 flex items-center gap-1">
              <span>✓</span>
              <span>4 Hướng Đại Cát (Đặt Cửa Chính, Phòng Khách, Giường Ngủ, Bàn Thờ):</span>
            </h6>
            <div class="grid grid-cols-2 gap-2 text-[11px]">
              ${res.batTrach.goodDirs.map(d => `
                <div class="bg-white/80 p-1.5 rounded border border-emerald-100">
                  <span class="font-bold text-emerald-800">${d.name}</span> (${d.star})
                  <p class="text-stone-500 text-[10px] line-clamp-2">${d.meaning}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 4 Hướng Xấu -->
          <div class="p-3 bg-rose-50/70 border border-rose-200 rounded-lg space-y-1.5">
            <h6 class="font-serif font-bold text-rose-900 flex items-center gap-1">
              <span>✗</span>
              <span>4 Hướng Hung Hiểm (Nên Tránh, Hoặc Đặt Bếp/Vệ Sinh Trấn Yểm):</span>
            </h6>
            <div class="grid grid-cols-2 gap-2 text-[11px]">
              ${res.batTrach.badDirs.map(d => `
                <div class="bg-white/80 p-1.5 rounded border border-rose-100">
                  <span class="font-bold text-rose-800">${d.name}</span> (${d.star})
                  <p class="text-stone-500 text-[10px] line-clamp-2">${d.meaning}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        ${!res.canBuild ? `
          <!-- Khung Hướng Dẫn Mượn Tuổi Nếu Phạm Hạn -->
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex flex-col sm:flex-row gap-2.5 items-start">
            <span class="text-xl">🤝</span>
            <div>
              <strong class="font-serif text-sm">Gợi ý mượn tuổi làm nhà theo kinh nghiệm cổ nhân:</strong>
              <p class="mt-0.5 text-stone-700 leading-relaxed text-[11px]">
                Năm này gia chủ phạm đại hạn, để việc xây dựng hanh thông, hãy mượn tuổi người nam giới lớn hơn, thuộc nội tộc, gia đình êm ấm, không phạm Tam Tai, Kim Lâu, Hoang Ốc trong năm ${res.buildYear}.
              </p>
              <button type="button" class="mt-1.5 text-xs text-[#8B1E1E] font-bold underline hover:text-red-900 cursor-pointer" onclick="document.getElementById('pt-tab-articles').click(); setTimeout(() => document.querySelectorAll('#pt-articles-list button')[3]?.click(), 100);">
                Xem chi tiết quy trình 4 bước mượn tuổi và thủ tục chuộc nhà cổ truyền →
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  // Populate Tab 3: 24 Sơn Hướng La Kinh Table
  function renderLaKinhTable(filterDir = 'all') {
    const tbody = document.getElementById('pt-lakinh-table-body');
    if (!tbody || typeof PhongThuyEngine === 'undefined') return;

    const list = PhongThuyEngine.LA_KINH_24_SON.filter(item => {
      if (filterDir === 'all') return true;
      return item.huong.includes(filterDir);
    });

    tbody.innerHTML = list.map(item => `
      <tr class="hover:bg-[#FAF7F2] transition text-stone-700">
        <td class="py-2 px-3 font-serif font-bold text-[#8B1E1E]">${item.son}</td>
        <td class="py-2 px-3 font-medium">${item.quai}</td>
        <td class="py-2 px-3 font-semibold text-stone-800">${item.huong}</td>
        <td class="py-2 px-3 text-emerald-800 font-mono font-bold">${item.centerDeg}°</td>
        <td class="py-2 px-3 font-mono text-stone-600">${item.degFrom}° - ${item.degTo}°</td>
        <td class="py-2 px-3 font-medium ${item.hanh === 'Hỏa' ? 'text-red-600' : (item.hanh === 'Thủy' ? 'text-blue-600' : (item.hanh === 'Mộc' ? 'text-emerald-600' : (item.hanh === 'Kim' ? 'text-amber-600' : 'text-stone-600')))}">${item.hanh}</td>
        <td class="py-2 px-3 text-[11px] text-stone-600">${item.yNghia}</td>
      </tr>
    `).join('');
  }

  const lakinhFilter = document.getElementById('pt-lakinh-filter');
  if (lakinhFilter) {
    lakinhFilter.addEventListener('change', (e) => {
      renderLaKinhTable(e.target.value);
    });
  }

  // Populate Tab 4: Articles List & Reader
  function initArticles() {
    const listContainer = document.getElementById('pt-articles-list');
    const reader = document.getElementById('pt-article-reader');
    const backBtn = document.getElementById('btn-back-to-articles');

    if (!listContainer || typeof PhongThuyEngine === 'undefined') return;

    listContainer.innerHTML = PhongThuyEngine.ARTICLES.map((art, idx) => `
      <div class="bg-white rounded-xl border border-[#E5DAC6] overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between">
        <div class="h-32 overflow-hidden relative">
          <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
          <span class="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8B1E1E] text-white shadow-xs">
            ${art.badge}
          </span>
        </div>
        <div class="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <h5 class="font-serif font-bold text-sm text-[#8B1E1E] line-clamp-2 leading-snug mb-1">
              ${art.title}
            </h5>
            <p class="text-xs text-stone-600 line-clamp-2 mb-2 leading-relaxed">
              ${art.sub}
            </p>
          </div>
          <div class="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span class="text-[10px] text-stone-400 font-serif italic">${art.author}</span>
            <button type="button" class="btn-read-art px-3 py-1 rounded-full bg-[#8B1E1E] hover:bg-red-800 text-white font-medium text-[11px] transition cursor-pointer" data-art-index="${idx}">
              Đọc tiếp →
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click event for each article
    listContainer.querySelectorAll('.btn-read-art').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-art-index'), 10);
        openArticle(idx);
      });
    });

    function openArticle(idx) {
      const art = PhongThuyEngine.ARTICLES[idx];
      if (!art || !reader) return;

      document.getElementById('reader-title').textContent = art.title;
      document.getElementById('reader-sub').textContent = art.sub;
      document.getElementById('reader-author').textContent = art.author;
      document.getElementById('reader-badge').textContent = art.badge;
      document.getElementById('reader-image').src = art.image;
      document.getElementById('reader-content').innerHTML = art.content;

      listContainer.classList.add('hidden');
      reader.classList.remove('hidden');
      reader.scrollIntoView({ behavior: 'smooth' });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        reader.classList.add('hidden');
        listContainer.classList.remove('hidden');
      });
    }
  }

  // Initial runs
  runCalculation();
  renderLaKinhTable('all');
  initArticles();
}

// 4. Lịch Vạn Niên & Tra Cứu Ngày Giờ Hoàng Đạo
function initHoangDaoModal() {
  const triggerBtn = document.getElementById('btn-hoangdao-trigger');
  const modal = document.getElementById('hoangdao-modal');
  const closeBtn = document.getElementById('close-hoangdao-modal');

  const selectMonth = document.getElementById('lunar-select-month');
  const selectYear = document.getElementById('lunar-select-year');
  const btnPrevMonth = document.getElementById('lunar-prev-month');
  const btnNextMonth = document.getElementById('lunar-next-month');
  const btnToday = document.getElementById('btn-lunar-today');
  const calendarGrid = document.getElementById('lunar-calendar-grid');
  const detailPanel = document.getElementById('lunar-day-detail-panel');

  if (!modal) return;

  const today = new Date();
  let currentMonth = today.getMonth() + 1; // 1 - 12
  let currentYear = today.getFullYear();   // 2026
  let selectedDate = {
    day: today.getDate(),
    month: currentMonth,
    year: currentYear
  };

  // Populate select month (1 - 12)
  if (selectMonth) {
    selectMonth.innerHTML = Array.from({ length: 12 }, (_, i) => i + 1).map(m => `
      <option value="${m}">Tháng ${m}</option>
    `).join('');
  }

  // Populate select year (1930 - 2050)
  if (selectYear) {
    let yearOptions = '';
    for (let y = 1930; y <= 2050; y++) {
      yearOptions += `<option value="${y}">Năm ${y}</option>`;
    }
    selectYear.innerHTML = yearOptions;
  }

  function syncDropdowns() {
    if (selectMonth) selectMonth.value = currentMonth;
    if (selectYear) selectYear.value = currentYear;
  }

  function renderCalendar() {
    if (!calendarGrid || !window.LICH_VAN_NIEN_ENGINE) return;
    syncDropdowns();

    const days = window.LICH_VAN_NIEN_ENGINE.getMonthCalendarGrid(currentMonth, currentYear);
    
    calendarGrid.innerHTML = days.map(d => {
      const isSelected = (d.solar.day === selectedDate.day && d.solar.month === selectedDate.month && d.solar.year === selectedDate.year);
      const isToday = (d.solar.day === today.getDate() && d.solar.month === (today.getMonth() + 1) && d.solar.year === today.getFullYear());
      const isHoangDao = d.hoangDaoDay.isHoangDao;
      
      let containerClass = "relative p-1 sm:p-1.5 rounded-lg flex flex-col items-center justify-between transition-all cursor-pointer select-none min-h-[46px] sm:min-h-[50px] ";
      
      if (!d.isCurrentMonth) {
        containerClass += "opacity-35 hover:opacity-75 bg-transparent ";
      } else {
        containerClass += "hover:bg-stone-100 ";
      }

      if (isSelected) {
        containerClass += "bg-red-50 border-2 border-[#8B1E1E] shadow-xs scale-102 ";
      } else if (isToday) {
        containerClass += "border border-amber-500 bg-amber-50/40 ";
      } else {
        containerClass += "border border-transparent ";
      }

      let solarColor = d.solar.isWeekend ? "text-[#8B1E1E]" : "text-stone-800";
      if (!d.isCurrentMonth) solarColor = "text-stone-400";

      const lunarDisplay = (d.lunar.day === 1 ? `${d.lunar.day}/${d.lunar.month}` : d.lunar.day);
      const lunarColor = (d.lunar.day === 1 || d.lunar.day === 15) ? "text-[#8B1E1E] font-bold" : "text-stone-500";

      return `
        <div 
          class="${containerClass}" 
          onclick="window.selectLichVanNienDay(${d.solar.day}, ${d.solar.month}, ${d.solar.year})"
          title="${d.solar.dayOfWeek}, ${d.solar.day}/${d.solar.month}/${d.solar.year} (ÂL: ${d.lunar.day}/${d.lunar.month} ${d.canChi.day}) - ${d.hoangDaoDay.name}"
        >
          <!-- Chấm Hoàng Đạo / Hắc Đạo góc trên phải -->
          <div class="absolute top-1 right-1">
            ${isHoangDao ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-500 block" title="Hoàng Đạo"></span>' : '<span class="w-1.5 h-1.5 rounded-full bg-stone-300 block" title="Hắc Đạo"></span>'}
          </div>

          <!-- Dương Lịch -->
          <span class="font-serif font-bold text-xs sm:text-sm ${solarColor}">
            ${d.solar.day}
          </span>

          <!-- Âm Lịch -->
          <span class="text-[9.5px] sm:text-[10.5px] font-sans ${lunarColor}">
            ${lunarDisplay}
          </span>
        </div>
      `;
    }).join('');
  }

  function renderDayDetail(d, m, y) {
    if (!detailPanel || !window.LICH_VAN_NIEN_ENGINE) return;
    const info = window.LICH_VAN_NIEN_ENGINE.getLichVanNienDayInfo(d, m, y);

    const isHoangDao = info.hoangDaoDay.isHoangDao;
    const statusBadge = isHoangDao ? 'bg-emerald-600 text-white' : 'bg-stone-500 text-white';

    detailPanel.innerHTML = `
      <!-- TỜ LỊCH NGÀY (TRADITIONAL TEAR-OFF CALENDAR SHEET STYLE) -->
      <div class="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E5DAC6] shadow-sm relative overflow-hidden">
        
        <!-- Header tờ lịch -->
        <div class="flex items-center justify-between border-b border-stone-100 pb-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full ${statusBadge} font-bold text-[11px] shadow-2xs">
              ${info.hoangDaoDay.isHoangDao ? '★ HOÀNG ĐẠO' : 'HẮC ĐẠO'}
            </span>
            <span class="font-serif font-bold text-xs sm:text-sm text-[#8B1E1E]">
              ${info.hoangDaoDay.name}
            </span>
          </div>
          <span class="text-xs text-stone-500 font-medium">
            ${info.solar.dayOfWeek}
          </span>
        </div>

        <!-- Trung tâm ngày Dương & Âm -->
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          <!-- Số ngày Dương to bản -->
          <div class="sm:col-span-5 text-center p-3 rounded-xl bg-gradient-to-b from-[#FAF7F2] to-[#F5EEDF] border border-[#E8DEC8]">
            <div class="text-[11px] font-medium text-stone-600 uppercase tracking-wide">Dương Lịch</div>
            <div class="font-serif font-black text-4xl sm:text-5xl text-[#8B1E1E] leading-none py-1">
              ${info.solar.day}
            </div>
            <div class="text-xs font-semibold text-stone-700">
              Tháng ${info.solar.month} năm ${info.solar.year}
            </div>
          </div>

          <!-- Thông tin ngày Âm Lịch & Can Chi -->
          <div class="sm:col-span-7 space-y-1.5 text-xs">
            <div class="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
              <div class="text-[10.5px] font-medium text-stone-500 uppercase">Âm Lịch</div>
              <div class="font-serif font-bold text-base sm:text-lg text-stone-900">
                Ngày ${info.lunar.day} tháng ${info.lunar.month}${info.lunar.isLeap ? ' (Nhuận)' : ''}
              </div>
              <div class="text-[11.5px] text-[#8B1E1E] font-medium">
                Năm ${info.canChi.year}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-1.5 text-[11px]">
              <div class="p-1.5 rounded-lg bg-stone-50 border border-stone-200">
                <span class="text-stone-500 block text-[10px]">Ngày Can Chi:</span>
                <strong class="text-stone-800">${info.canChi.day}</strong>
              </div>
              <div class="p-1.5 rounded-lg bg-stone-50 border border-stone-200">
                <span class="text-stone-500 block text-[10px]">Tháng Can Chi:</span>
                <strong class="text-stone-800">${info.canChi.month}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Dòng Tiết khí, Trực, Nhị thập bát tú -->
        <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-100 text-center text-xs">
          <div class="p-1.5 rounded bg-stone-50">
            <span class="text-[10px] text-stone-500 block">Tiết Khí</span>
            <strong class="text-stone-800 text-[11px]">${info.tietKhi}</strong>
          </div>
          <div class="p-1.5 rounded bg-stone-50">
            <span class="text-[10px] text-stone-500 block">Trực</span>
            <strong class="text-[#8B1E1E] text-[11px]">Trực ${info.truc.name}</strong>
          </div>
          <div class="p-1.5 rounded bg-stone-50">
            <span class="text-[10px] text-stone-500 block">Nhị Thập Bát Tú</span>
            <strong class="text-blue-900 text-[11px]">${info.sao28.name}</strong>
          </div>
        </div>

      </div>

      <!-- KHUNG 12 KHUNG GIỜ: HOÀNG ĐẠO (CÁT) & HẮC ĐẠO (HUNG) -->
      <div class="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E5DAC6] shadow-sm space-y-3">
        <div class="flex items-center justify-between border-b border-stone-100 pb-2">
          <h4 class="font-serif font-bold text-xs sm:text-sm text-[#8B1E1E] flex items-center gap-1.5">
            <span>⏰</span>
            <span>12 Khung Giờ Trong Ngày:</span>
          </h4>
          <span class="text-[10.5px] text-stone-500">6 Giờ Hoàng Đạo (Cát) & 6 Giờ Hắc Đạo</span>
        </div>

        <!-- 6 GIỜ HOÀNG ĐẠO (TỐT) -->
        <div>
          <span class="text-[11px] font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span> 6 Giờ Hoàng Đạo (Nên Khởi Sự, Xuất Hành, Ký Kết):
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            ${info.hoangDaoHours.map(h => `
              <div class="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                <div class="flex items-center justify-between">
                  <strong class="text-emerald-900 font-serif text-[11.5px]">${h.fullName}</strong>
                  <span class="text-[9.5px] px-1 rounded bg-emerald-200 text-emerald-800 font-bold">${h.starName}</span>
                </div>
                <div class="text-[10.5px] text-emerald-700 font-mono mt-0.5">${h.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 6 GIỜ HẮC ĐẠO (CẦN TRÁNH) -->
        <div class="pt-1">
          <span class="text-[11px] font-bold text-stone-600 uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <span class="w-2 h-2 rounded-full bg-stone-400 inline-block"></span> 6 Giờ Hắc Đạo (Cần Cẩn Trọng, Tránh Việc Lớn):
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            ${info.hacDaoHours.map(h => `
              <div class="p-1.5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between opacity-85">
                <div class="flex items-center justify-between">
                  <span class="text-stone-700 font-medium text-[11px]">${h.fullName}</span>
                  <span class="text-[9px] px-1 rounded bg-stone-200 text-stone-600">${h.starName}</span>
                </div>
                <div class="text-[10px] text-stone-500 font-mono mt-0.5">${h.time}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- HƯỚNG XUẤT HÀNH & TUỔI XUNG -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div class="p-3 bg-white rounded-xl border border-[#E5DAC6] space-y-1">
          <strong class="text-[#8B1E1E] block font-serif text-xs">🧭 Hướng Xuất Hành Cát Lợi:</strong>
          <div class="text-[11px] text-stone-700 space-y-0.5">
            <div>• <strong>Hỷ Thần (Hôn nhân, hòa hợp):</strong> Hướng ${info.huong.hy}</div>
            <div>• <strong>Tài Thần (Cầu tài, buôn bán):</strong> Hướng ${info.huong.tai}</div>
            <div>• <strong>Hạc Thần (Nên tránh):</strong> Hướng ${info.huong.hac}</div>
          </div>
        </div>

        <div class="p-3 bg-white rounded-xl border border-[#E5DAC6] space-y-1">
          <strong class="text-amber-800 block font-serif text-xs">⚠️ Tuổi Xung Khắc Với Ngày:</strong>
          <p class="text-[11px] text-stone-600 leading-relaxed">
            ${info.tuoiXung}
          </p>
        </div>
      </div>

      <!-- VIỆC NÊN LÀM & VIỆC KIÊNG CỮ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
          <strong class="text-emerald-900 block font-serif text-xs flex items-center gap-1">
            <span>✓</span> Việc Nên Làm:
          </strong>
          <p class="text-stone-700 text-[11px] leading-relaxed">
            ${info.truc.good}. Thích hợp khởi công, mở hàng, ký kết vào các giờ Hoàng Đạo nêu trên.
          </p>
        </div>

        <div class="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
          <strong class="text-rose-900 block font-serif text-xs flex items-center gap-1">
            <span>✗</span> Việc Nên Kiêng Cữ:
          </strong>
          <p class="text-stone-700 text-[11px] leading-relaxed">
            ${info.truc.bad}. Hạn chế tranh chấp, kiện tụng, xuất quân vào các giờ Hắc Đạo.
          </p>
        </div>
      </div>

      <!-- CÁC NÚT LIÊN KẾT NHANH SANG DỊCH & TỬ VI VỚI NGÀY NÀY -->
      <div class="flex flex-wrap items-center justify-end gap-2 pt-1">
        <button 
          type="button" 
          onclick="window.quickCastQueFromLich(${info.solar.day}, ${info.solar.month}, ${info.solar.year})" 
          class="px-3.5 py-1.5 rounded-lg bg-[#8B1E1E] hover:bg-red-800 text-white font-medium text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>🌸 Lập Quẻ Dịch Ngày Này</span>
        </button>
        <button 
          type="button" 
          onclick="window.quickFillTuViFromLich(${info.solar.day}, ${info.solar.month}, ${info.solar.year})" 
          class="px-3.5 py-1.5 rounded-lg border border-[#C5A059] bg-[#FAF7F2] hover:bg-[#EFE8DA] text-stone-800 font-medium text-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>📜 Xem Lá Số Tử Vi Ngày Này</span>
        </button>
      </div>
    `;
  }

  // Global selector callback
  window.selectLichVanNienDay = function (d, m, y) {
    selectedDate = { day: d, month: m, year: y };
    if (m !== currentMonth || y !== currentYear) {
      currentMonth = m;
      currentYear = y;
    }
    renderCalendar();
    renderDayDetail(d, m, y);
  };

  // Quick link helper: Lập quẻ Mai Hoa với ngày này
  window.quickCastQueFromLich = function (d, m, y) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    const modalDich = document.getElementById('kinhdich-modal');
    if (modalDich) {
      modalDich.classList.remove('hidden');
      modalDich.classList.add('flex');
      if (typeof switchMainTab === 'function') switchMainTab('kinhdich');
      if (typeof switchKinhDichSubTab === 'function') switchKinhDichSubTab('maihoa');
      
      const radioCustom = document.querySelector('input[name="maihoa-time-type"][value="custom"]');
      if (radioCustom) {
        radioCustom.checked = true;
        radioCustom.dispatchEvent(new Event('change'));
      }
      const dayInput = document.getElementById('maihoa-custom-day');
      const monthInput = document.getElementById('maihoa-custom-month');
      const yearInput = document.getElementById('maihoa-custom-year');
      if (dayInput) dayInput.value = d;
      if (monthInput) monthInput.value = m;
      if (yearInput) yearInput.value = y;

      const modalContent = modalDich.querySelector('.overflow-y-auto');
      if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`Đã chuyển ngày ${d}/${m}/${y} sang Lập quẻ Mai Hoa!`);
    }
  };

  // Quick link helper: Điền ngày vào form tử vi
  window.quickFillTuViFromLich = function (d, m, y) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    const daySelect = document.getElementById('tuvi-day');
    const monthSelect = document.getElementById('tuvi-month');
    const yearSelect = document.getElementById('tuvi-year');
    if (daySelect) daySelect.value = d;
    if (monthSelect) monthSelect.value = m;
    if (yearSelect) yearSelect.value = y;
    if (window.updateTuViDatePreview) window.updateTuViDatePreview();

    const tuviSection = document.getElementById('tuvi-center-section');
    if (tuviSection) tuviSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`Đã điền ngày ${d}/${m}/${y} vào Lập lá số Tử Vi!`);
  };

  // Event handlers
  selectMonth?.addEventListener('change', (e) => {
    currentMonth = parseInt(e.target.value);
    renderCalendar();
    renderDayDetail(selectedDate.day, currentMonth, currentYear);
  });

  selectYear?.addEventListener('change', (e) => {
    currentYear = parseInt(e.target.value);
    renderCalendar();
    renderDayDetail(selectedDate.day, currentMonth, currentYear);
  });

  btnPrevMonth?.addEventListener('click', () => {
    if (currentMonth === 1) {
      currentMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar();
    renderDayDetail(1, currentMonth, currentYear);
  });

  btnNextMonth?.addEventListener('click', () => {
    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear++;
    } else {
      currentMonth--;
    }
    renderCalendar();
    renderDayDetail(1, currentMonth, currentYear);
  });

  btnToday?.addEventListener('click', () => {
    const now = new Date();
    currentMonth = now.getMonth() + 1;
    currentYear = now.getFullYear();
    selectedDate = { day: now.getDate(), month: currentMonth, year: currentYear };
    renderCalendar();
    renderDayDetail(selectedDate.day, currentMonth, currentYear);
  });

  function openHoangDaoModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderCalendar();
    renderDayDetail(selectedDate.day, selectedDate.month, selectedDate.year);
  }

  triggerBtn?.addEventListener('click', () => openHoangDaoModal());
  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  // Export to window
  window.openHoangDaoModal = openHoangDaoModal;
}

// 5. Hero Banner "Mua Ngay" Consultation Modal
function initHeroOrderModal() {
  const buyBtn = document.getElementById('btn-hero-buy');
  const modal = document.getElementById('order-modal');
  const closeBtn = document.getElementById('close-order-modal');
  const form = document.getElementById('order-service-form');

  if (buyBtn && modal) {
    buyBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      showToast('Đặt dịch vụ 24 tháng Tài - Quan - Tật thành công! Chuyên gia sẽ liên hệ qua Zalo trong 15 phút.');
    });
  }
}

// 6. Shopping Cart Drawer
let cart = [
  { id: 1, name: 'Vòng tay đá phong thủy thạch anh tóc vàng', price: 450000, quantity: 1 }
];

function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const drawer = document.getElementById('cart-drawer');
  const closeBtn = document.getElementById('close-cart-drawer');
  const addToCartBtns = document.querySelectorAll('.btn-add-cart');

  updateCartUI();

  if (cartBtn && drawer) {
    cartBtn.addEventListener('click', () => {
      drawer.classList.remove('translate-x-full');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.add('translate-x-full');
    });
  }

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id || '1', 10);
      const name = btn.dataset.name || 'Sản phẩm Phong Thủy';
      const price = parseInt(btn.dataset.price || '300000', 10);

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }

      updateCartUI();
      showToast(`Đã thêm "${name}" vào giỏ hàng!`);
    });
  });
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const container = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total-price');

  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }

  if (container) {
    if (cart.length === 0) {
      container.innerHTML = '<div class="text-center py-10 text-stone-500 text-sm">Giỏ hàng đang trống</div>';
    } else {
      container.innerHTML = cart.map((item, idx) => `
        <div class="flex items-center justify-between py-3 border-b border-[#E8DFC8]">
          <div class="flex-1 pr-3">
            <h5 class="text-xs font-semibold text-stone-800 line-clamp-1">${item.name}</h5>
            <div class="text-[11px] text-stone-500 mt-0.5">${item.price.toLocaleString('vi-VN')}₫ × ${item.quantity}</div>
          </div>
          <div class="text-right">
            <div class="text-xs font-bold text-[#8B1E1E]">${(item.price * item.quantity).toLocaleString('vi-VN')}₫</div>
            <button onclick="removeCartItem(${item.id})" class="text-[10px] text-rose-600 hover:underline mt-1">Xóa</button>
          </div>
        </div>
      `).join('');
    }
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (totalEl) {
    totalEl.textContent = total.toLocaleString('vi-VN') + '₫';
  }
}

window.removeCartItem = function(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng');
};

// 7. Search Modal
function initSearch() {
  const openBtn = document.getElementById('search-btn');
  const modal = document.getElementById('search-modal');
  const closeBtn = document.getElementById('close-search-modal');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  const searchable = [
    { title: 'Lập lá số Tử Vi trọn đời (12 Cung Mệnh & Vận Hạn)', category: 'Tử Vi', link: '#', modal: 'tuvi' },
    { title: 'Gieo quẻ Kinh Dịch & Bát Quái cổ truyền', category: 'Bói Dịch', link: '#', modal: 'kinhdich' },
    { title: 'Xem ngày tốt xấu, giờ Hoàng Đạo xuất hành', category: 'Lịch Vạn Sự', link: '#', modal: 'hoangdao' },
    { title: 'Ý Nghĩa các sao trong Tử Vi', category: 'Ý Nghĩa Các Sao Trong Tử Vi', link: '#', modal: 'knowledge', categoryKey: 'tuvi' },
    { title: 'Ý nghĩa sao Tử Vi & Thiên Phủ: Bộ đôi Đế tinh tối thượng', category: 'Ý Nghĩa Các Sao Trong Tử Vi', link: '#', modal: 'knowledge', categoryKey: 'tuvi' },
    { title: 'Bộ Tứ Hóa: Khoa, Quyền, Lộc, Kỵ và cách giải mã số mệnh', category: 'Ý Nghĩa Các Sao Trong Tử Vi', link: '#', modal: 'knowledge', categoryKey: 'tuvi' },
    { title: 'Sao Thái Dương & Thái Âm - Nhật Nguyệt quang minh tọa thủ', category: 'Ý Nghĩa Các Sao Trong Tử Vi', link: '#', modal: 'knowledge', categoryKey: 'tuvi' },
    { title: 'Sao Hóa Khoa là gì? Ý nghĩa trong lá số tử vi', category: 'Ý Nghĩa Các Sao Trong Tử Vi', link: '#', modal: 'knowledge', categoryKey: 'tuvi' },
    { title: 'Cách tính chỉ số biểu đạt theo thần số học', category: 'Thần Số Học', link: '#', modal: 'knowledge', categoryKey: 'thanso' },
    { title: 'Ý nghĩa con số chủ đạo từ 1 đến 11 & 22: Định hướng số mệnh', category: 'Thần Số Học', link: '#', modal: 'knowledge', categoryKey: 'thanso' },
    { title: 'Năm cá nhân & 4 đỉnh cao cuộc đời: Nắm bắt vận hội thành công', category: 'Thần Số Học', link: '#', modal: 'knowledge', categoryKey: 'thanso' },
    { title: 'Hướng dẫn chọn vật phẩm phong thủy theo mệnh ngũ hành', category: 'Vật Phẩm Phong Thủy', link: '#', modal: 'knowledge', categoryKey: 'phongthuy' },
    { title: 'Cách khai quang điểm nhãn & đặt Tỳ Hưu, Thiềm Thừ chiêu tài', category: 'Vật Phẩm Phong Thủy', link: '#', modal: 'knowledge', categoryKey: 'phongthuy' },
    { title: 'Top 5 pháp bảo phong thủy trấn trạch, trừ tà và an gia vượng khí', category: 'Vật Phẩm Phong Thủy', link: '#', modal: 'knowledge', categoryKey: 'phongthuy' },
    { title: 'Bảng ngày hoàng đạo tháng 7 năm 2026 & cách chọn giờ tốt xuất hành', category: 'Xem Ngày Hoàng Đạo', link: '#', modal: 'knowledge', categoryKey: 'hoangdao' },
    { title: 'Nghi lễ & cách chọn ngày lành tháng tốt: Khởi công, động thổ, nhập trạch', category: 'Xem Ngày Hoàng Đạo', link: '#', modal: 'knowledge', categoryKey: 'hoangdao' },
    { title: 'Cách nhận biết ngày Tam Nương, Nguyệt Kỵ & phương pháp hóa giải xuất hành', category: 'Xem Ngày Hoàng Đạo', link: '#', modal: 'knowledge', categoryKey: 'hoangdao' },
    { title: 'Khóa học Tử Vi Đẩu Số thực chiến 2026', category: 'Khóa Học', link: '#' }
  ];

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      input?.focus();
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  if (input && results) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        results.innerHTML = '<div class="text-stone-400 text-center py-4 text-xs">Nhập từ khóa để tra cứu (ví dụ: Tử vi, Phong thủy, Kinh dịch...)</div>';
        return;
      }
      const filtered = searchable.filter(item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
      if (filtered.length === 0) {
        results.innerHTML = '<div class="text-stone-500 text-center py-4 text-xs">Không tìm thấy kết quả phù hợp</div>';
      } else {
        results.innerHTML = filtered.map((item, idx) => `
          <div data-idx="${idx}" class="search-result-row block p-2.5 rounded-lg hover:bg-[#FAF7F2] transition border-b border-stone-100 cursor-pointer">
            <span class="text-[10px] font-semibold text-[#8B1E1E] uppercase">${item.category}</span>
            <div class="text-xs font-medium text-stone-800 mt-0.5">${item.title}</div>
          </div>
        `).join('');

        results.querySelectorAll('.search-result-row').forEach(row => {
          row.addEventListener('click', () => {
            const idx = parseInt(row.getAttribute('data-idx'), 10);
            const item = filtered[idx];
            if (!item) return;

            modal.classList.add('hidden');
            modal.classList.remove('flex');

            if (item.modal === 'knowledge' && typeof window.openKnowledgeModal === 'function') {
              window.openKnowledgeModal(item.categoryKey || 'tuvi');
            } else if (item.modal === 'tuvi') {
              document.getElementById('tuvi-quick-form')?.scrollIntoView({ behavior: 'smooth' });
            } else if (item.modal === 'kinhdich') {
              document.getElementById('btn-kinhdich-trigger')?.click();
            } else if (item.modal === 'hoangdao') {
              document.getElementById('btn-hoangdao-trigger')?.click();
            }
          });
        });
      }
    });
  }
}

function initToast() {
  // Container already exists in HTML
}

// 8. Tương tác chuyên đề Ý Nghĩa Các Sao Trong Tử Vi & Tabs Kiến Thức Huyền Học
function initStarArticles() {
  const modalYnghia = document.getElementById('modal-ynghia-cacsao');
  const closeBtn = document.getElementById('close-modal-ynghia');
  const closeBtnBottom = document.getElementById('close-modal-ynghia-btn');
  const modalHeaderTitle = document.getElementById('modal-header-title');
  const modalHeaderDesc = document.getElementById('modal-header-desc');

  // Category Tabs bên trong Modal
  const modalTabs = document.querySelectorAll('.modal-nav-tab');
  const modalPanes = {
    tuvi: document.getElementById('modal-pane-tuvi'),
    thanso: document.getElementById('modal-pane-thanso'),
    phongthuy: document.getElementById('modal-pane-phongthuy'),
    hoangdao: document.getElementById('modal-pane-hoangdao')
  };

  const categoryMeta = {
    tuvi: {
      title: 'Ý Nghĩa Các Sao Trong Tử Vi',
      desc: 'Tuyển tập các chuyên đề luận giải chính tinh, tứ hóa và cách cục tinh diệu'
    },
    thanso: {
      title: 'Thần Số Học & Bản Đồ Số Mệnh',
      desc: 'Khám phá chỉ số biểu đạt, con số chủ đạo 1-11 và 4 đỉnh cao kim tự tháp cuộc đời'
    },
    phongthuy: {
      title: 'Vật Phẩm Phong Thủy & Chiêu Tài An Gia',
      desc: 'Cẩm nang chọn vật phẩm theo mệnh ngũ hành, khai quang linh vật và pháp bảo trấn trạch'
    },
    hoangdao: {
      title: 'Xem Ngày Hoàng Đạo & Lịch Vạn Niên',
      desc: 'Tra cứu ngày giờ đại cát, nghi lễ khởi công động thổ và bí quyết tránh ngày Tam Nương'
    }
  };

  function switchModalTab(targetCat) {
    if (!categoryMeta[targetCat]) targetCat = 'tuvi';

    // Cập nhật giao diện nút tab trong Modal
    modalTabs.forEach(tab => {
      const cat = tab.getAttribute('data-target');
      if (cat === targetCat) {
        tab.className = 'modal-nav-tab px-3 py-1 rounded-full text-xs font-semibold bg-[#8B1E1E] text-white shadow-2xs transition whitespace-nowrap cursor-pointer flex items-center gap-1.5';
      } else {
        tab.className = 'modal-nav-tab px-3 py-1 rounded-full text-xs font-medium text-stone-600 hover:text-[#8B1E1E] hover:bg-[#EAE0D0] transition whitespace-nowrap cursor-pointer flex items-center gap-1.5';
      }
    });

    // Ẩn/Hiện Panes
    Object.keys(modalPanes).forEach(cat => {
      const pane = modalPanes[cat];
      if (pane) {
        if (cat === targetCat) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      }
    });

    // Cập nhật tiêu đề & mô tả Modal Header
    if (modalHeaderTitle && categoryMeta[targetCat]) {
      modalHeaderTitle.textContent = categoryMeta[targetCat].title;
    }
    if (modalHeaderDesc && categoryMeta[targetCat]) {
      modalHeaderDesc.textContent = categoryMeta[targetCat].desc;
    }
  }

  // Gắn sự kiện click các tab trong Modal
  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-target');
      switchModalTab(cat);
    });
  });

  function openModal(category = 'tuvi') {
    if (!modalYnghia) return;
    switchModalTab(category);
    modalYnghia.classList.remove('hidden');
    requestAnimationFrame(() => {
      modalYnghia.classList.remove('opacity-0');
      modalYnghia.classList.add('opacity-100');
    });
  }

  function closeModal() {
    if (!modalYnghia) return;
    modalYnghia.classList.add('opacity-0');
    modalYnghia.classList.remove('opacity-100');
    setTimeout(() => {
      modalYnghia.classList.add('hidden');
    }, 250);
  }

  // Cho phép gọi mở modal từ bên ngoài
  window.openKnowledgeModal = openModal;

  // Lắng nghe click trên các thẻ Danh mục ở trang chủ (.category-card-trigger)
  document.querySelectorAll('.category-card-trigger').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category') || 'tuvi';
      openModal(cat);
    });
  });

  // Lắng nghe click trên từng bài viết nhỏ trong các lưới sub-grid (.article-item-trigger)
  document.querySelectorAll('.article-item-trigger').forEach(art => {
    art.addEventListener('click', () => {
      const cat = art.getAttribute('data-category') || 'tuvi';
      openModal(cat);
    });
  });

  // Legacy triggers
  const cardYnghia = document.getElementById('card-ynghia-cacsao');
  if (cardYnghia) {
    cardYnghia.addEventListener('click', () => openModal('tuvi'));
  }
  document.querySelectorAll('.star-article-trigger').forEach(trig => {
    trig.addEventListener('click', () => openModal('tuvi'));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtnBottom) closeBtnBottom.addEventListener('click', closeModal);

  if (modalYnghia) {
    modalYnghia.addEventListener('click', (e) => {
      if (e.target === modalYnghia) closeModal();
    });
  }

  // Tabs danh mục trên trang chủ
  const tabs = {
    all: document.getElementById('tab-blog-all'),
    stars: document.getElementById('tab-blog-stars'),
    thanso: document.getElementById('tab-blog-thanso'),
    phongthuy: document.getElementById('tab-blog-phongthuy'),
    hoangdao: document.getElementById('tab-blog-hoangdao')
  };

  const grids = {
    all: document.getElementById('grid-blog-all'),
    stars: document.getElementById('grid-blog-stars'),
    thanso: document.getElementById('grid-blog-thanso'),
    phongthuy: document.getElementById('grid-blog-phongthuy'),
    hoangdao: document.getElementById('grid-blog-hoangdao')
  };

  function switchHomepageTab(activeKey) {
    Object.keys(tabs).forEach(key => {
      const tab = tabs[key];
      if (!tab) return;
      if (key === activeKey) {
        tab.className = 'px-2.5 py-0.5 rounded-full font-medium transition-all bg-[#8B1E1E] text-white shadow-2xs cursor-pointer';
      } else {
        tab.className = 'px-2.5 py-0.5 rounded-full font-medium transition-all text-stone-600 hover:text-[#8B1E1E] hover:bg-[#F2EAE0] cursor-pointer';
      }
    });

    Object.keys(grids).forEach(key => {
      const grid = grids[key];
      if (!grid) return;
      if (key === activeKey) {
        grid.classList.remove('hidden');
      } else {
        grid.classList.add('hidden');
      }
    });
  }

  if (tabs.all) tabs.all.addEventListener('click', () => switchHomepageTab('all'));
  if (tabs.stars) tabs.stars.addEventListener('click', () => switchHomepageTab('stars'));
  if (tabs.thanso) tabs.thanso.addEventListener('click', () => switchHomepageTab('thanso'));
  if (tabs.phongthuy) tabs.phongthuy.addEventListener('click', () => switchHomepageTab('phongthuy'));
  if (tabs.hoangdao) tabs.hoangdao.addEventListener('click', () => switchHomepageTab('hoangdao'));

  // Link "Xem tất cả"
  const linkViewAll = document.getElementById('link-view-all-blog');
  if (linkViewAll) {
    linkViewAll.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('tuvi');
    });
  }
}
