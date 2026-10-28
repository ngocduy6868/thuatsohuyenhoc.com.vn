/**
 * THUẬT SỐ HUYỀN HỌC - MAIN INTERACTIVE SCRIPT
 * Tích hợp động cơ an sao Tử Vi Đẩu Số 12 Cung & Thiên Bàn
 */

// Đảm bảo dữ liệu Base64 Logo Bát Quái luôn sẵn sàng kể cả khi mở file:/// offline
if (typeof window !== 'undefined' && !window.LOGO_BATQUAI_TRON_DATA_URL && typeof document !== 'undefined') {
  try {
    var _sLogo = document.createElement('script');
    _sLogo.src = 'js/logo_batquai_data.js';
    document.head.appendChild(_sLogo);
  } catch(e) {}
}

// Dữ liệu Thiên Can & Địa Chi
const THIEN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// Danh sách tháng âm lịch
const LUNAR_MONTHS = [
  'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 
  'Bảy', 'Tám', 'Chín', 'Mười', 'Mười một', 'Chạp'
];

// 12 Giờ Can Chi
const LUNAR_HOURS = [
  { chi: 'Tý', time: '23h - 01h' },
  { chi: 'Sửu', time: '01h - 03h' },
  { chi: 'Dần', time: '03h - 05h' },
  { chi: 'Mão', time: '05h - 07h' },
  { chi: 'Thìn', time: '07h - 09h' },
  { chi: 'Tỵ', time: '09h - 11h' },
  { chi: 'Ngọ', time: '11h - 13h' },
  { chi: 'Mùi', time: '13h - 15h' },
  { chi: 'Thân', time: '15h - 17h' },
  { chi: 'Dậu', time: '17h - 19h' },
  { chi: 'Tuất', time: '19h - 21h' },
  { chi: 'Hợi', time: '21h - 23h' }
];

// Bộ nhớ đệm ảnh lá số
let cachedTuViDataUrl = null;
let cachedTuViBlob = null;

function khoiTaoToanBoMainForm() {
  initSolarSelectors();
  initLunarSelectors();
  initCalendarToggle();
  initEventHandlers();
  initModalEvents();
}

document.addEventListener('DOMContentLoaded', khoiTaoToanBoMainForm);
if (document.readyState !== 'loading') {
  khoiTaoToanBoMainForm();
}

/**
 * Khởi tạo dữ liệu các bộ chọn Dương Lịch
 */
function initSolarSelectors() {
  const yearSelect = document.getElementById('select-year');
  const monthSelect = document.getElementById('select-month');
  const daySelect = document.getElementById('select-day');
  const hourSelect = document.getElementById('select-hour');
  const minuteSelect = document.getElementById('select-minute');
  const limitYearSelect = document.getElementById('select-limit-year');

  if (!yearSelect || !monthSelect || !daySelect || !hourSelect) return;

  if (yearSelect.options.length === 0) {
    for (let y = 2100; y >= 1940; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      if (y === 2008) opt.selected = true;
      yearSelect.appendChild(opt);
    }
  }

  if (monthSelect.options.length === 0) {
    for (let m = 1; m <= 12; m++) {
      const opt = document.createElement('option');
      const val = m < 10 ? '0' + m : '' + m;
      opt.value = val;
      opt.textContent = val;
      if (m === 8) opt.selected = true;
      monthSelect.appendChild(opt);
    }
  }

  if (daySelect.options.length === 0) {
    for (let d = 1; d <= 31; d++) {
      const opt = document.createElement('option');
      const val = d < 10 ? '0' + d : '' + d;
      opt.value = val;
      opt.textContent = val;
      if (d === 8) opt.selected = true;
      daySelect.appendChild(opt);
    }
  }

  if (hourSelect.options.length === 0) {
    const chiHours = [
      { h: 0, label: '00h (Tý)' },
      { h: 1, label: '01h (Sửu)' },
      { h: 2, label: '02h (Sửu)' },
      { h: 3, label: '03h (Dần)' },
      { h: 4, label: '04h (Dần)' },
      { h: 5, label: '05h (Mão)' },
      { h: 6, label: '06h (Mão)' },
      { h: 7, label: '07h (Thìn)' },
      { h: 8, label: '08h (Thìn)' },
      { h: 9, label: '09h (Tỵ)' },
      { h: 10, label: '10h (Tỵ)' },
      { h: 11, label: '11h (Ngọ)' },
      { h: 12, label: '12h (Ngọ)' },
      { h: 13, label: '13h (Mùi)' },
      { h: 14, label: '14h (Mùi)' },
      { h: 15, label: '15h (Thân)' },
      { h: 16, label: '16h (Thân)' },
      { h: 17, label: '17h (Dậu)' },
      { h: 18, label: '18h (Dậu)' },
      { h: 19, label: '19h (Tuất)' },
      { h: 20, label: '20h (Tuất)' },
      { h: 21, label: '21h (Hợi)' },
      { h: 22, label: '22h (Hợi)' },
      { h: 23, label: '23h (Tý)' }
    ];

    chiHours.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.h < 10 ? '0' + item.h : '' + item.h;
      opt.textContent = `${item.h < 10 ? '0' + item.h : item.h} (${item.label.split(' ')[1].replace(/[()]/g, '')})`;
      if (item.h === 10) opt.selected = true;
      hourSelect.appendChild(opt);
    });
  }

  // Khởi tạo đầy đủ danh sách 00 - 59 phút
  if (minuteSelect && minuteSelect.options.length < 50) {
    const currentMin = minuteSelect.value || '30';
    minuteSelect.innerHTML = '';
    for (let mi = 0; mi <= 59; mi++) {
      const opt = document.createElement('option');
      const val = mi < 10 ? '0' + mi : '' + mi;
      opt.value = val;
      opt.textContent = val;
      if (val === currentMin) opt.selected = true;
      minuteSelect.appendChild(opt);
    }
  }

  // Khởi tạo danh sách năm xem hạn tới năm 2100 kèm Can Chi chuẩn
  if (limitYearSelect && limitYearSelect.options.length < 50) {
    const currentLimitVal = parseInt(limitYearSelect.value, 10) || 2026;
    limitYearSelect.innerHTML = '';
    const canNames = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const chiNames = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    for (let y = 1940; y <= 2100; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      const can = canNames[(y - 4) % 10];
      const chi = chiNames[(y - 4) % 12];
      opt.textContent = `Năm ${y} (${can} ${chi})`;
      if (y === currentLimitVal) opt.selected = true;
      limitYearSelect.appendChild(opt);
    }
  }
}

/**
 * Khởi tạo dữ liệu các bộ chọn Âm Lịch (Thiên Can - Địa Chi)
 */
function initLunarSelectors() {
  const canSelect = document.getElementById('select-lunar-can');
  const monthSelect = document.getElementById('select-lunar-month');
  const daySelect = document.getElementById('select-lunar-day');
  const hourSelect = document.getElementById('select-lunar-hour');

  if (!canSelect || !monthSelect || !daySelect || !hourSelect) return;

  THIEN_CAN.forEach((can) => {
    const opt = document.createElement('option');
    opt.value = can;
    opt.textContent = can;
    if (can === 'Mậu') opt.selected = true;
    canSelect.appendChild(opt);
  });

  updateLunarChiOptions('Thìn');

  canSelect.addEventListener('change', function () {
    updateLunarChiOptions();
  });

  LUNAR_MONTHS.forEach((mName) => {
    const opt = document.createElement('option');
    opt.value = mName;
    opt.textContent = mName;
    if (mName === 'Tám') opt.selected = true;
    monthSelect.appendChild(opt);
  });

  for (let d = 1; d <= 30; d++) {
    const opt = document.createElement('option');
    const val = d < 10 ? '0' + d : '' + d;
    opt.value = val;
    opt.textContent = val;
    if (d === 8) opt.selected = true;
    daySelect.appendChild(opt);
  }

  LUNAR_HOURS.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.chi;
    opt.textContent = item.chi;
    opt.title = `${item.chi} (${item.time})`;
    if (item.chi === 'Tỵ') opt.selected = true;
    hourSelect.appendChild(opt);
  });
}

/**
 * Cập nhật danh sách Địa Chi theo Thiên Can đã chọn
 */
function updateLunarChiOptions(targetChi) {
  const canSelect = document.getElementById('select-lunar-can');
  const chiSelect = document.getElementById('select-lunar-chi');
  if (!canSelect || !chiSelect) return;

  const canName = canSelect.value;
  const canIdx = THIEN_CAN.indexOf(canName);
  const isDuongCan = canIdx % 2 === 0;

  const currentVal = targetChi || chiSelect.value;
  chiSelect.innerHTML = '';

  DIA_CHI.forEach((chi, idx) => {
    const isDuongChi = idx % 2 === 0;
    if (isDuongCan === isDuongChi) {
      const opt = document.createElement('option');
      opt.value = chi;
      opt.textContent = chi;
      if (chi === currentVal) {
        opt.selected = true;
      }
      chiSelect.appendChild(opt);
    }
  });

  if (!chiSelect.value && chiSelect.options.length > 0) {
    chiSelect.selectedIndex = 0;
  }
}

/**
 * Chuyển đổi hiển thị giữa Dương Lịch và Âm Lịch
 */
function initCalendarToggle() {
  const radios = document.querySelectorAll('input[name="calendar_type"]');
  const groupDuong = document.getElementById('group-duong-lich');
  const groupAm = document.getElementById('group-am-lich');

  if (!groupDuong || !groupAm) return;

  radios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.value === 'am') {
        groupDuong.classList.add('is-hidden');
        groupAm.classList.remove('is-hidden');
      } else {
        groupDuong.classList.remove('is-hidden');
        groupAm.classList.add('is-hidden');
      }
    });
  });
}

/**
 * Tính toán năm dương lịch tương ứng từ Can Chi và cờ "Lớn hơn 60 tuổi"
 */
function calculateYearFromCanChi(canName, chiName, isOver60) {
  const canIdx = THIEN_CAN.indexOf(canName);
  const chiIdx = DIA_CHI.indexOf(chiName);
  if (canIdx === -1 || chiIdx === -1) return 2026;

  let k = ((canIdx - chiIdx) / 2) % 6;
  if (k < 0) k += 6;
  const offset = 10 * k + canIdx;

  let year = 1984 + offset;
  const currentYear = 2026;

  while (year > currentYear) year -= 60;
  while (year <= currentYear - 60) year += 60;

  if (isOver60) {
    year -= 60;
  }

  return year;
}

/**
 * HÀM RENDER 12 CUNG VÀ THIÊN BÀN TỬ VI
 */
function render12Palaces(userData) {
  cachedTuViDataUrl = null;
  cachedTuViBlob = null;

  const container = document.getElementById('tuvi-12-palaces');
  if (!container) return;

  if (typeof document !== 'undefined' && !document.getElementById('font-dancing-script')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'font-dancing-script';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Charm:wght@700&family=Charmonman:wght@700&family=Pattaya&family=Dancing+Script:wght@700&display=swap';
    document.head.appendChild(fontLink);
  }

  if (typeof TuViEngine === 'undefined') {
    alert('Đang nạp động cơ TuViEngine, vui lòng thử lại sau giây lát!');
    return;
  }

  const laSo = TuViEngine.lapLaSo(userData);
  const { thienBan, palaces, tuanPositions, trietPositions } = laSo;
  window.currentTuViPositions = { tuan: tuanPositions, triet: trietPositions };

  const formatDisplayHour = (str) => {
    if (!str) return '07 giờ 30 phút';
    const m = str.match(/(\d{1,2})h\s*-\s*(\d{1,2})h/i);
    if (m) return `${m[1].padStart(2, '0')} giờ 30 phút`;
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

  function renderPalaceCell(cell, colStart, rowStart) {
    const { chiIdx, chiName, canChiShort, palaceName, isThan, daiHanAge, stars, trangSinh, tieuHanChi, hanThang } = cell;

    const canChiColors = {
      2: '#1E7B34', 3: '#1E7B34', // Dần, Mão (Mộc)
      5: '#D81E05', 6: '#D81E05', // Tỵ, Ngọ (Hỏa)
      8: '#777777', 9: '#777777', // Thân, Dậu (Kim)
      11: '#1A1A1A', 0: '#1A1A1A', // Hợi, Tý (Thủy)
      4: '#D98A2C', 10: '#D98A2C', 1: '#D98A2C', 7: '#D98A2C' // Thìn, Tuất, Sửu, Mùi (Thổ)
    };
    const canChiColor = canChiColors[chiIdx] || '#1A1A1A';

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

    const isTuanOrTrietStar = (s) => {
      if (!s || !s.name) return false;
      const n = s.name.trim().toLowerCase();
      return n === 'tuần' || n === 'triệt' || 
             n === 'tuần không' || n === 'triệt không' ||
             n.startsWith('tuần') || n.startsWith('triệt') ||
             n === 'tuan' || n === 'triet';
    };

    const chinhTinhHtml = (stars.chinhTinh || [])
      .filter(s => !isTuanOrTrietStar(s))
      .map(s => {
        return `<div class="star-main-bold star-${s.element}">${s.name}${s.status}</div>`;
      }).join('');

    const phuGoodHtml = (stars.phuTinhGood || [])
      .filter(s => !isTuanOrTrietStar(s))
      .map(s => {
        return `<div class="tuvi-phu-star star-${s.element} ${s.status ? 'font-semibold' : ''}">${s.name}${s.status || ''}</div>`;
      }).join('');

    const phuBadHtml = (stars.phuTinhBad || [])
      .filter(s => !isTuanOrTrietStar(s))
      .map(s => {
        return `<div class="tuvi-phu-star star-${s.element} ${s.status ? 'font-semibold' : ''}">${s.name}${s.status || ''}</div>`;
      }).join('');

    const hasBadgeAtNgoMui = (Array.isArray(tuanPositions) && tuanPositions.includes(6) && tuanPositions.includes(7)) ||
                             (Array.isArray(trietPositions) && trietPositions.includes(6) && trietPositions.includes(7));
    const hasBadgeAtSuuTy = (Array.isArray(tuanPositions) && tuanPositions.includes(0) && tuanPositions.includes(1)) ||
                            (Array.isArray(trietPositions) && trietPositions.includes(0) && trietPositions.includes(1));

    let headerLeftCornerStyle = '';
    let headerRightCornerStyle = '';
    let footerLeftCornerStyle = '';
    let footerRightCornerStyle = '';
    if (hasBadgeAtNgoMui) {
      if (chiIdx === 6) footerRightCornerStyle = 'padding-right: 20px;';
      else if (chiIdx === 7) footerLeftCornerStyle = 'padding-left: 20px;';
    }
    if (hasBadgeAtSuuTy) {
      if (chiIdx === 1) headerRightCornerStyle = 'padding-right: 20px;';
    }

    return `
      <div class="tuvi-cell" style="grid-column: ${colStart}; grid-row: ${rowStart};">
        <div style="position: relative; display: flex; align-items: center; justify-content: space-between; padding-bottom: 2px;">
          <span class="tuvi-canchi" style="color: ${canChiColor}; font-weight: 850; font-size: 12px; z-index: 2; ${headerLeftCornerStyle}">${canChiShort}</span>
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; width: 100%; text-align: center;">
            <span style="font-weight: 850; color: #111111; font-size: ${isThan ? '13px' : '14px'}; letter-spacing: 0.2px; display: inline-block;">${displayPalaceName}</span>
          </div>
          <span style="color: #111111; font-weight: 850; font-size: 14px; z-index: 2; ${headerRightCornerStyle}">${daiHanAge}</span>
        </div>

        <div style="text-align: center; padding: 4px 0; min-height: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          ${chinhTinhHtml}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding: 2px 0; font-size: 13px; line-height: 1.2; flex: 1;">
          <div class="tuvi-phu-list" style="text-align: left; padding-left: 4px;">
            ${phuGoodHtml}
          </div>
          <div class="tuvi-phu-list" style="text-align: left; padding-left: 4px;">
            ${phuBadHtml}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; font-size: 13px; color: #111111; font-weight: 800;">
          <span style="text-align: left; white-space: nowrap; padding-left: 2px; font-weight: 800; ${footerLeftCornerStyle}">${tieuHanChi || chiName}</span>
          <strong style="text-align: center; color: #111111; font-weight: 850; white-space: nowrap; padding: 0 4px;">${trangSinh}</strong>
          <span style="text-align: right; white-space: nowrap; padding-right: 2px; font-weight: 800; ${footerRightCornerStyle}">Tháng ${hanThang !== undefined ? hanThang : (chiIdx + 1)}</span>
        </div>
      </div>
    `;
  }

  function getBoundaryCoords(chi1, chi2) {
    const pair = [Math.min(chi1, chi2), Math.max(chi1, chi2)];
    if (pair[0] === 0 && pair[1] === 1) return { left: '50%', top: '75%' };
    if (pair[0] === 2 && pair[1] === 3) return { left: '12.5%', top: '75%' };
    if (pair[0] === 4 && pair[1] === 5) return { left: '12.5%', top: '25%' };
    if (pair[0] === 6 && pair[1] === 7) return { left: '50%', top: '25%' };
    if (pair[0] === 8 && pair[1] === 9) return { left: '87.5%', top: '25%' };
    if (pair[0] === 10 && pair[1] === 11) return { left: '87.5%', top: '75%' };
    return null;
  }
  window.getTuViBoundaryCoords = getBoundaryCoords;

  let boundaryBadgesHtml = '';
  const isSameBoundary = Array.isArray(tuanPositions) && Array.isArray(trietPositions) &&
    tuanPositions.length >= 2 && trietPositions.length >= 2 &&
    Math.min(tuanPositions[0], tuanPositions[1]) === Math.min(trietPositions[0], trietPositions[1]) &&
    Math.max(tuanPositions[0], tuanPositions[1]) === Math.max(trietPositions[0], trietPositions[1]);

  if (isSameBoundary) {
    const coords = getBoundaryCoords(tuanPositions[0], tuanPositions[1]);
    if (coords) {
      boundaryBadgesHtml += `
        <div class="tuvi-boundary-badge tuvi-badge-tuan" style="left: calc(${coords.left} - 28px); top: ${coords.top};"><span class="tuvi-badge-label">Tuần</span></div>
        <div class="tuvi-boundary-badge tuvi-badge-triet" style="left: calc(${coords.left} + 28px); top: ${coords.top};"><span class="tuvi-badge-label">Triệt</span></div>
      `;
    }
  } else {
    if (Array.isArray(tuanPositions) && tuanPositions.length >= 2) {
      const coordsTuan = getBoundaryCoords(tuanPositions[0], tuanPositions[1]);
      if (coordsTuan) {
        boundaryBadgesHtml += `
          <div class="tuvi-boundary-badge tuvi-badge-tuan" style="left: ${coordsTuan.left}; top: ${coordsTuan.top};"><span class="tuvi-badge-label">Tuần</span></div>
        `;
      }
    }

    if (Array.isArray(trietPositions) && trietPositions.length >= 2) {
      const coordsTriet = getBoundaryCoords(trietPositions[0], trietPositions[1]);
      if (coordsTriet) {
        boundaryBadgesHtml += `
          <div class="tuvi-boundary-badge tuvi-badge-triet" style="left: ${coordsTriet.left}; top: ${coordsTriet.top};"><span class="tuvi-badge-label">Triệt</span></div>
        `;
      }
    }
  }

  const thienBanBorderCoords = {
    0: { x: 75, y: 100 },
    1: { x: 25, y: 100 },
    2: { x: 0, y: 100 },
    3: { x: 0, y: 75 },
    4: { x: 0, y: 25 },
    5: { x: 0, y: 0 },
    6: { x: 25, y: 0 },
    7: { x: 75, y: 0 },
    8: { x: 100, y: 0 },
    9: { x: 100, y: 25 },
    10: { x: 100, y: 75 },
    11: { x: 100, y: 100 }
  };

  const findPalaceChi = (targetName) => {
    const found = Object.values(palaces).find(p => 
      (p.palaceName && p.palaceName.trim().toUpperCase().includes(targetName)) ||
      (p.palaceDisplayName && p.palaceDisplayName.toUpperCase().includes(targetName))
    );
    return found ? found.chiIdx : null;
  };

  const pMenh = findPalaceChi('MỆNH') ?? 3;
  const pQuan = findPalaceChi('QUAN') ?? ((pMenh + 4) % 12);
  const pTai = findPalaceChi('TÀI') ?? ((pMenh + 8) % 12);
  const pt1 = thienBanBorderCoords[pMenh] || { x: 0, y: 75 };
  const pt2 = thienBanBorderCoords[pQuan] || { x: 75, y: 0 };
  const pt3 = thienBanBorderCoords[pTai] || { x: 100, y: 100 };
  const tamHopPoints = `${pt1.x},${pt1.y} ${pt2.x},${pt2.y} ${pt3.x},${pt3.y}`;
  window.currentTamHopPoints = [pt1, pt2, pt3];

  // Tra cứu vị trí 4 cung của Tứ Hóa: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ (theo ảnh mẫu hình 2)
  const shortPalaceNameMap = {
    'PHU THÊ': 'PHU/THÊ',
    'THÊ': 'PHU/THÊ',
    'PHU': 'PHU/THÊ',
    'PHU/THÊ': 'PHU/THÊ',
    'PHÚC ĐỨC': 'PHÚC',
    'PHÚC': 'PHÚC',
    'ĐIỀN TRẠCH': 'ĐIỀN',
    'ĐIỀN': 'ĐIỀN',
    'TẬT ÁCH': 'TẬT',
    'TẬT': 'TẬT',
    'QUAN LỘC': 'QUAN',
    'QUAN': 'QUAN',
    'TÀI BẠCH': 'TÀI',
    'TÀI': 'TÀI',
    'THIÊN DI': 'DI',
    'DI': 'DI',
    'TỬ TỨC': 'TỬ',
    'TỬ': 'TỬ',
    'HUYNH ĐỆ': 'HUYNH',
    'HUYNH': 'HUYNH',
    'NÔ BỘC': 'NÔ',
    'NÔ': 'NÔ',
    'PHỤ MẪU': 'PHỤ',
    'PHỤ': 'PHỤ',
    'MỆNH': 'MỆNH'
  };

  const getPalaceOfHoa = (starPattern) => {
    for (const p of Object.values(palaces)) {
      const allStars = [
        ...(p.stars?.chinhTinh || []),
        ...(p.stars?.phuTinhGood || []),
        ...(p.stars?.phuTinhBad || [])
      ];
      if (allStars.some(s => s.name && s.name.toLowerCase().includes(starPattern))) {
        const raw = (p.palaceName || p.palaceDisplayName || '')
          .replace(/<[^>]*>/g, '')
          .replace(/&lt;[^&]*&gt;/g, '')
          .trim();
        return shortPalaceNameMap[raw] || raw;
      }
    }
    return '';
  };

  let tuHoaPalaces = {
    loc: getPalaceOfHoa('hóa lộc'),
    quyen: getPalaceOfHoa('hóa quyền'),
    khoa: getPalaceOfHoa('hóa khoa'),
    ky: getPalaceOfHoa('hóa kỵ')
  };

  if (!tuHoaPalaces.loc || !tuHoaPalaces.quyen || !tuHoaPalaces.khoa || !tuHoaPalaces.ky) {
    const canNames = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const birthCan = (thienBan.birthCanChi || '').split(' ')[0].trim();
    const cIdx = canNames.indexOf(birthCan);
    const tuHoaByCan = {
      0: { loc: 'liêm trinh', quyen: 'phá quân', khoa: 'vũ khúc', ky: 'thái dương' },
      1: { loc: 'thiên cơ', quyen: 'thiên lương', khoa: 'tử vi', ky: 'thái âm' },
      2: { loc: 'thiên đồng', quyen: 'thiên cơ', khoa: 'văn xương', ky: 'liêm trinh' },
      3: { loc: 'thái âm', quyen: 'thiên đồng', khoa: 'thiên cơ', ky: 'cự môn' },
      4: { loc: 'tham lang', quyen: 'thái âm', khoa: 'hữu bật', ky: 'thiên cơ' },
      5: { loc: 'vũ khúc', quyen: 'tham lang', khoa: 'thiên lương', ky: 'văn khúc' },
      6: { loc: 'thái dương', quyen: 'vũ khúc', khoa: 'thái âm', ky: 'thiên đồng' },
      7: { loc: 'cự môn', quyen: 'thái dương', khoa: 'văn khúc', ky: 'văn xương' },
      8: { loc: 'thiên lương', quyen: 'tử vi', khoa: 'thiên phủ', ky: 'vũ khúc' },
      9: { loc: 'phá quân', quyen: 'cự môn', khoa: 'thái âm', ky: 'tham lang' }
    };
    if (cIdx >= 0 && tuHoaByCan[cIdx]) {
      const cfg = tuHoaByCan[cIdx];
      if (!tuHoaPalaces.loc) tuHoaPalaces.loc = getPalaceOfHoa(cfg.loc);
      if (!tuHoaPalaces.quyen) tuHoaPalaces.quyen = getPalaceOfHoa(cfg.quyen);
      if (!tuHoaPalaces.khoa) tuHoaPalaces.khoa = getPalaceOfHoa(cfg.khoa);
      if (!tuHoaPalaces.ky) tuHoaPalaces.ky = getPalaceOfHoa(cfg.ky);
    }
  }

  container.innerHTML = `
    <div id="tuvi-image-view" style="width: 100%; height: 100%; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer;" onclick="if(typeof window.openTuViImageZoomModal==='function')window.openTuViImageZoomModal();" title="Bản Đồ Lá Số Tử Vi Chuẩn Truyền Thống (Độ nét cao - Nhấn để phóng to)">
      <div id="tuvi-scaler-box" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer;">
        <div id="tuvi-scaler-inner" style="position: relative; margin: 0 auto; overflow: hidden; cursor: pointer;">
          <div id="tuvi-live-board" class="tuvi-sheet-wrapper" style="width: 832px; background: #FFFFFF; padding: 22px 16px; position: absolute; left: 0; top: 0; transform-origin: 0 0; box-sizing: border-box; cursor: pointer;">
      <div class="tuvi-board" style="position: relative;">
        <!-- ROW 1 -->
        ${renderPalaceCell(palaces[5], 1, 1)}
        ${renderPalaceCell(palaces[6], 2, 1)}
        ${renderPalaceCell(palaces[7], 3, 1)}
        ${renderPalaceCell(palaces[8], 4, 1)}

        <!-- ROW 2 -->
        ${renderPalaceCell(palaces[4], 1, 2)}

        <!-- THIÊN BÀN TRUNG TÂM -->
        <div class="tuvi-thienban" style="grid-column: 2 / span 2; grid-row: 2 / span 2; overflow: hidden; position: relative;">
          <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="${tamHopPoints}" fill="none" stroke="#A8A29E" stroke-width="0.4" stroke-linejoin="round" />
          </svg>
          
          <!-- LOGO BÁT QUÁI NẰM GỌN TRUNG TÂM THIÊN BÀN (CHUẨN 100% CẢ PC VÀ MOBILE) -->
          <div class="tuvi-thienban-watermark" style="position: absolute; left: 70px; top: 137px; transform: none; width: 260px; height: 260px; background-image: url('${(typeof window !== 'undefined' && window.LOGO_BATQUAI_TRON_DATA_URL && window.LOGO_BATQUAI_TRON_DATA_URL.startsWith('data:')) ? window.LOGO_BATQUAI_TRON_DATA_URL : 'assets/logo_batquai_tron.png'}'); background-repeat: no-repeat; background-position: center center; background-size: contain; border-radius: 50%; opacity: 0.22; pointer-events: none; -webkit-touch-callout: none; user-select: none; z-index: 2;"></div>

          <div style="padding-bottom: 4px; position: relative; z-index: 10; text-align: center;">
            <div style="font-size: 14.5px; font-weight: 700; color: #1A3DB5; text-transform: uppercase; letter-spacing: 0.8px; font-family: sans-serif;">DIỄN ĐÀN TỬ VI THUẬT SỐ</div>
            <div style="font-size: 14px; color: #C81500; font-weight: 600; font-family: monospace; padding-bottom: 2px; letter-spacing: 0.5px;">http://www.thuatsohuyenhoc.com.vn</div>
            <h2 style="font-family: sans-serif; font-weight: 800; font-size: 22px; color: #1A3DB5; letter-spacing: 1px; margin: 2px 0 0 0;">LÁ SỐ TỬ VI</h2>
          </div>

          <div style="padding: 4px 6px; font-size: 14px; line-height: 1.38; text-align: left; max-width: 290px; margin: 10px 0 0 10px; position: relative; z-index: 10; width: auto; color: #1A3DB5; font-family: sans-serif;">
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Họ tên:</span>
              <span style="font-weight: 700; color: #1A3DB5;">${thienBan.name}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Năm:</span>
              <span style="color: #1A3DB5; font-weight: 650; width: 110px; min-width: 110px;">${thienBan.solYear}</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.birthCanChi}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Tháng:</span>
              <span style="color: #1A3DB5; font-weight: 650; width: 110px; min-width: 110px;">${String(thienBan.solMonth).padStart(2, '0')} (${thienBan.lunMonth})</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.canChiMonth}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Ngày:</span>
              <span style="color: #1A3DB5; font-weight: 650; width: 110px; min-width: 110px;">${String(thienBan.solDay).padStart(2, '0')} (${thienBan.lunDay})</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.canChiDay}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Giờ:</span>
              <span style="color: #1A3DB5; font-weight: 650; width: 110px; min-width: 110px;">${displayHour}</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.canChiHour}</span>
            </div>

            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; padding-top: 6px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Năm xem:</span>
              <span style="color: #1A3DB5; font-weight: 650; width: 110px; min-width: 110px;">${thienBan.viewYear}</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.viewCanChi}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="width: 78px; min-width: 78px;"></span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.currentAge} tuổi</span>
            </div>

            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; padding-top: 6px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Âm Dương:</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.amDuongNamNu}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Mệnh:</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.napAmMenh}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Cục:</span>
              <span style="color: #1A3DB5; font-weight: 700;">${displayCuc}</span>
            </div>

            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; padding-top: 6px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Chủ Mệnh:</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.chuMenh}</span>
            </div>
            <div style="display: flex; align-items: center; white-space: nowrap; gap: 4px; margin-bottom: 2px;">
              <span style="color: #262626; font-weight: 650; width: 78px; min-width: 78px;">Chủ Thân:</span>
              <span style="color: #1A3DB5; font-weight: 700;">${thienBan.chuThan}</span>
            </div>
            
            <div style="display: flex; white-space: nowrap; gap: 4px; padding-top: 6px;">
              <span style="width: 78px; min-width: 78px;"></span>
              <div style="color: #1A3DB5; font-weight: 650; line-height: 1.38;">
                <div>${thienBan.amDuongLy}</div>
                <div>${thienBan.cucMenhRelation}</div>
                <div>${displayThanCu}</div>
              </div>
            </div>
          </div>

          <!-- 2 CÂU THƠ LỤC BÁT (THƯ PHÁP VIỆT BỐ TRÍ THEO ẢNH MẪU 2 - GIẢM XUỐNG 0.86 & CĂN HẾT SANG PHẢI) -->
          <div class="tuvi-poem-calligraphy" style="position: absolute; top: 110px; right: 2px; z-index: 15; display: flex; flex-direction: row; gap: 6px; pointer-events: none; user-select: none;">
            <!-- Cột 1 (Câu lục): Người trồng cây hạnh người chơi -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-around; height: 200px; font-family: 'Charm', 'Charmonman', 'Pattaya', 'Thư Pháp', 'ThuPhap', 'VNI-ThuPhap', 'UTM ThuPhap', 'Ong Do', 'Dancing Script', cursive, serif; font-size: 18.5px; font-weight: 700; color: #0F368E; text-shadow: 0 0.5px 1.5px rgba(15, 54, 142, 0.3); line-height: 1.15; white-space: nowrap;">
              <span>Người</span>
              <span>trồng</span>
              <span>cây</span>
              <span>hạnh</span>
              <span>người</span>
              <span>chơi</span>
            </div>
            <!-- Cột 2 (Câu bát): Ta trồng cây đức để đời mai sau -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 200px; font-family: 'Charm', 'Charmonman', 'Pattaya', 'Thư Pháp', 'ThuPhap', 'VNI-ThuPhap', 'UTM ThuPhap', 'Ong Do', 'Dancing Script', cursive, serif; font-size: 18.5px; font-weight: 700; color: #0F368E; text-shadow: 0 0.5px 1.5px rgba(15, 54, 142, 0.3); line-height: 1.15; white-space: nowrap;">
              <span>Ta</span>
              <span>trồng</span>
              <span>cây</span>
              <span>đức</span>
              <span>để</span>
              <span>đời</span>
              <span>mai</span>
              <span>sau</span>
            </div>
          </div>

          <!-- Ô SAO TỨ HÓA (CHIA CÂN KHOẢNG CÁCH 2 BÊN TÍNH TỪ PHẦN NGOÀI CỦA Ô THỨ 2) -->
          <div style="position: absolute; bottom: 24px; left: 0; width: calc(100% - 58px); z-index: 20; display: flex; justify-content: center; pointer-events: none;">
            <div class="tuvi-tuhoa-box" style="pointer-events: auto; border: 1.5px solid #D81E05; border-radius: 4px; padding: 4px 10px; background: rgba(255, 255, 255, 0.96); box-shadow: 0 1px 3px rgba(0,0,0,0.06); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="display: grid; grid-template-columns: auto auto; column-gap: 16px; row-gap: 2px; font-size: 13px; font-weight: 700; color: #D81E05; line-height: 1.35; white-space: nowrap;">
                <div>H.Lộc: <span>${tuHoaPalaces.loc || 'MỆNH'}</span></div>
                <div>H.Khoa: <span>${tuHoaPalaces.khoa || 'QUAN'}</span></div>
                <div>H.Quyền: <span>${tuHoaPalaces.quyen || 'TÀI'}</span></div>
                <div>H.Kỵ: <span>${tuHoaPalaces.ky || 'THIÊN DI'}</span></div>
              </div>
            </div>
          </div>

          <!-- THUAT SO HUYEN HOC & AN TRIEN (THEO CHIEU DUNG - Ô THỨ 2 TĂNG 1.3 VÀ GIỮ BÊN PHẢI ĐỂ ZOOM) -->
          <div style="position: absolute; bottom: 8px; right: 8px; z-index: 20; display: flex; flex-direction: column; align-items: center; gap: 5px; pointer-events: none; transform: scale(1.3); transform-origin: right bottom;">
            <!-- Chu Thu Phap: Thuat So Huyen Hoc -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 34px; box-sizing: border-box; padding: 4px 2px; background: linear-gradient(180deg, #FDFBF7 0%, #EFE5D3 100%); border: 1px solid #C5A059; border-radius: 6px; box-shadow: inset 0 0 6px rgba(197, 160, 89, 0.25), 0 1px 3px rgba(0,0,0,0.08);">
              <span style="font-family: 'KaiTi', 'STKaiti', 'Baskerville', 'Playfair Display', serif; font-size: 13.5px; font-weight: 900; color: #7A1414; line-height: 1.25; text-shadow: 0 1px 1px rgba(120, 20, 20, 0.15);">術</span>
              <span style="font-family: 'KaiTi', 'STKaiti', 'Baskerville', 'Playfair Display', serif; font-size: 13.5px; font-weight: 900; color: #7A1414; line-height: 1.25; text-shadow: 0 1px 1px rgba(120, 20, 20, 0.15);">數</span>
              <span style="font-family: 'KaiTi', 'STKaiti', 'Baskerville', 'Playfair Display', serif; font-size: 13.5px; font-weight: 900; color: #7A1414; line-height: 1.25; text-shadow: 0 1px 1px rgba(120, 20, 20, 0.15);">玄</span>
              <span style="font-family: 'KaiTi', 'STKaiti', 'Baskerville', 'Playfair Display', serif; font-size: 13.5px; font-weight: 900; color: #7A1414; line-height: 1.25; text-shadow: 0 1px 1px rgba(120, 20, 20, 0.15);">學</span>
            </div>
            <!-- Dau An Trien -->
            <div style="width: 34px; height: 34px; box-sizing: border-box; border: 1.5px solid #B82828; padding: 1.5px; border-radius: 5px; background: #FFF; box-shadow: 0 1px 4px rgba(184, 40, 40, 0.2); display: flex; align-items: center; justify-content: center; overflow: hidden; pointer-events: none;">
              <img src="${(typeof window !== 'undefined' && window.AN_TRIEN_DATA_URL && window.AN_TRIEN_DATA_URL.startsWith('data:')) ? window.AN_TRIEN_DATA_URL : 'assets/an_trien.png'}" alt="Ấn Triện" style="width: 100%; height: 100%; object-fit: contain; display: block; pointer-events: none; -webkit-touch-callout: none; user-select: none;">
            </div>
          </div>
        </div>

        ${renderPalaceCell(palaces[9], 4, 2)}

        <!-- ROW 3 -->
        ${renderPalaceCell(palaces[3], 1, 3)}
        ${renderPalaceCell(palaces[10], 4, 3)}

        <!-- ROW 4 -->
        ${renderPalaceCell(palaces[2], 1, 4)}
        ${renderPalaceCell(palaces[1], 2, 4)}
        ${renderPalaceCell(palaces[0], 3, 4)}
        ${renderPalaceCell(palaces[11], 4, 4)}

        <!-- TUẦN & TRIỆT BADGES -->
        ${boundaryBadgesHtml}
            </div>
          </div>
          <!-- THẺ ẢNH THỰC THỂ TRONG SUỐT PHỦ LÊN LIVE BOARD PHỤC VỤ MENU CHUỘT PHẢI (LƯU / TẢI / SAO CHÉP ẢNH) -->
          <img id="tuvi-board-img" class="tuvi-board-img" src="${cachedTuViDataUrl || ''}" alt="Bản Đồ Lá Số Tử Vi Chuẩn Truyền Thống" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0.001; z-index: 30; cursor: pointer; display: block;" title="Bản Đồ Lá Số Tử Vi Chuẩn Truyền Thống (Nhấn chuột trái để phóng to, chuột phải để Lưu / Tải ảnh)" onclick="if(typeof window.openTuViImageZoomModal==='function')window.openTuViImageZoomModal();" onmousedown="if(!this.src || this.src===window.location.href){if(cachedTuViDataUrl){this.src=cachedTuViDataUrl;}else if(typeof window.renderTuViBoardToImage==='function'){window.renderTuViBoardToImage();}}" />
        </div>
      </div>
    </div>
    <div id="tuvi-render-staging" aria-hidden="true" style="position: absolute; left: -9999px; top: -9999px; width: 832px; opacity: 0; pointer-events: none;"></div>
  `;

  const stagingEl = document.getElementById('tuvi-render-staging');
  const liveBoardEl = document.getElementById('tuvi-live-board');
  if (stagingEl && liveBoardEl) {
    stagingEl.innerHTML = liveBoardEl.outerHTML;
    const stagingBoard = stagingEl.firstElementChild;
    if (stagingBoard) {
      stagingBoard.id = 'tuvi-staging-board';
      stagingBoard.style.position = 'static';
      stagingBoard.style.transform = 'none';
      stagingBoard.style.width = '832px';
      stagingBoard.style.minWidth = '832px';
      stagingBoard.style.maxWidth = '832px';
      stagingBoard.style.margin = '0 auto';
    }
  }

  if (typeof window.fitTuViModalLiveBoard === "function") {
    window.fitTuViModalLiveBoard();
    requestAnimationFrame(function() { window.fitTuViModalLiveBoard(); });
    setTimeout(function() { if (typeof window.fitTuViModalLiveBoard === "function") window.fitTuViModalLiveBoard(); }, 50);
  }

  // Tự động kết xuất ảnh ngầm để cấp src cho thẻ img overlay phục vụ menu chuột phải Lưu / Tải ảnh
  setTimeout(function() {
    if (typeof window.renderTuViBoardToImage === 'function') {
      window.renderTuViBoardToImage();
    }
  }, 100);
}

/**
 * Vẽ nhãn Tuần & Triệt đè trực tiếp lên Canvas khi xuất ảnh
 */
function drawTuViBadgesOnCanvas(canvas, positions) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const boardW = 800;
  const boardH = 1068;
  const padX = 16;
  const padY = 22;
  const totalW = boardW + padX * 2;
  const scale = canvas.width / totalW;

  // 1. Vẽ thanh tam giác Tam Hợp Mệnh - Quan - Tài trực tiếp lên Canvas
  if (Array.isArray(window.currentTamHopPoints) && window.currentTamHopPoints.length === 3) {
    const cellW = boardW / 4;
    const cellH = boardH / 4;
    const tbW = cellW * 2;
    const tbH = cellH * 2;

    const pts = window.currentTamHopPoints.map(pt => ({
      x: (padX + cellW + (pt.x / 100) * tbW) * scale,
      y: (padY + cellH + (pt.y / 100) * tbH) * scale
    }));

    ctx.save();
    // Loại trừ vùng ô Tứ Hóa đã căn giữa để đường Tam Hợp không đè lên ô Tứ Hóa
    const boxX = (padX + cellW + 35) * scale;
    const boxY = (padY + cellH + tbH - 24 - 50) * scale;
    const boxW = 270 * scale;
    const boxH = 55 * scale;

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.rect(boxX + boxW, boxY, -boxW, boxH);
    ctx.clip('evenodd');

    ctx.strokeStyle = '#A8A29E';
    ctx.lineWidth = Math.max(1, Math.round(0.6 * scale));
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  if (!positions) return;

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
        topPxOffset = (match[2] === '-' ? -1 : 1) * parseFloat(match[3]);
      } else {
        topPercent = parseFloat(coords.top) || 0;
      }
    } else {
      topPercent = Number(coords.top) || 0;
    }

    let cx = (padX + (parseFloat(coords.left) / 100) * boardW) * scale;
    let cy = (padY + (topPercent / 100) * boardH + topPxOffset) * scale;

    if (offsetDir !== 0) {
      cx += offsetDir * (badgeW / 2 + Math.round(2 * scale));
    }

    const rx = Math.round(cx - badgeW / 2);
    const ry = Math.round(cy - badgeH / 2);

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

    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, cx, cy);
    ctx.restore();
  }

  if (isSamePosition) {
    drawBadge(positions.tuan, 'Tuần', -1);
    drawBadge(positions.triet, 'Triệt', 1);
  } else {
    drawBadge(positions.tuan, 'Tuần', 0);
    drawBadge(positions.triet, 'Triệt', 0);
  }
}

/**
 * Kết xuất đồ bản thành hình ảnh PNG độ phân giải cao
 */
window.fitTuViModalLiveBoard = function() {
  const box = document.getElementById("tuvi-scaler-box") || document.getElementById("tuvi-image-view");
  const inner = document.getElementById("tuvi-scaler-inner");
  const board = document.getElementById("tuvi-live-board");
  if (!box || !inner || !board) return;
  const vw = box.clientWidth || (window.innerWidth > 680 ? 640 : window.innerWidth - 16);
  const vh = box.clientHeight || (window.innerHeight - 120);
  if (vw <= 0 || vh <= 0) return;
  const origW = 832;
  const origH = 1112;
  const scale = Math.min(vw / origW, vh / origH, 1);
  board.style.transform = "scale(" + scale + ")";
  board.style.transformOrigin = "0 0";
  inner.style.width = Math.round(origW * scale) + "px";
  inner.style.height = Math.round(origH * scale) + "px";
};
if (typeof window !== "undefined") {
  window.addEventListener("resize", function() { if (typeof window.fitTuViModalLiveBoard === "function") window.fitTuViModalLiveBoard(); });
}

window.renderTuViBoardToImage = async function () {
  const view = document.getElementById('tuvi-image-view');
  const staging = document.getElementById('tuvi-render-staging');
  const captureTarget = (staging && (staging.querySelector('#tuvi-staging-board') || staging.firstElementChild)) || document.getElementById("tuvi-live-board");
  if (!view || !captureTarget) return;

  const fallbackToLiveBoard = () => {
    if (typeof window.fitTuViModalLiveBoard === "function") {
      window.fitTuViModalLiveBoard();
    }
  };

  if (typeof html2canvas !== 'function') {
    fallbackToLiveBoard();
    return;
  }

  try {
    if (document.fonts && document.fonts.ready) {
      await Promise.race([document.fonts.ready, new Promise(function(r) { setTimeout(r, 200); })]);
    }
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const canvas = await html2canvas(captureTarget, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: 832,
      height: 1112,
      windowWidth: 832,
      windowHeight: 1112,
      onclone: (clonedDoc) => {
        const targetInClone = clonedDoc.getElementById('tuvi-staging-board') || 
                              clonedDoc.getElementById('tuvi-live-board') || 
                              (clonedDoc.getElementById('tuvi-render-staging') && clonedDoc.getElementById('tuvi-render-staging').firstElementChild);
        
        if (targetInClone) {
          // Làm sạch hoàn toàn body của clonedDoc để chỉ chứa duy nhất Đồ Bản tại tọa độ gốc (0, 0)
          clonedDoc.body.innerHTML = '';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
          clonedDoc.body.style.background = '#FFFFFF';
          clonedDoc.body.style.width = '832px';
          clonedDoc.body.style.minWidth = '832px';
          clonedDoc.body.style.maxWidth = '832px';
          clonedDoc.body.style.height = '1112px';
          clonedDoc.body.style.minHeight = '1112px';
          clonedDoc.body.style.maxHeight = '1112px';
          clonedDoc.body.style.overflow = 'hidden';
          clonedDoc.body.style.zoom = '1';
          clonedDoc.body.style.transform = 'none';

          if (clonedDoc.documentElement) {
            clonedDoc.documentElement.style.margin = '0';
            clonedDoc.documentElement.style.padding = '0';
            clonedDoc.documentElement.style.zoom = '1';
            clonedDoc.documentElement.style.transform = 'none';
          }

          clonedDoc.body.appendChild(targetInClone);

          targetInClone.style.margin = '0';
          targetInClone.style.position = 'static';
          targetInClone.style.left = '0';
          targetInClone.style.top = '0';
          targetInClone.style.width = '832px';
          targetInClone.style.minWidth = '832px';
          targetInClone.style.maxWidth = '832px';
          targetInClone.style.height = '1112px';
          targetInClone.style.boxSizing = 'border-box';
          targetInClone.style.opacity = '1';
          targetInClone.style.transform = 'none';
          targetInClone.style.overflow = 'visible';
          targetInClone.style.display = 'block';

          // Chuẩn hóa board lưới 4x4
          const b = targetInClone.querySelector('.tuvi-board');
          if (b) {
            b.style.display = 'grid';
            b.style.gridTemplateColumns = '200px 200px 200px 200px';
            b.style.gridTemplateRows = '267px 267px 267px 267px';
            b.style.width = '800px';
            b.style.maxWidth = '800px';
            b.style.minWidth = '800px';
            b.style.margin = '0 auto';
          }

          // Chuẩn hóa 12 cung
          const cells = targetInClone.querySelectorAll('.tuvi-cell');
          cells.forEach(c => {
            c.style.width = '200px';
            c.style.maxWidth = '200px';
            c.style.boxSizing = 'border-box';
          });

          // Chuẩn hóa Watermark Bát Quái
          const wm = targetInClone.querySelector('.tuvi-thienban-watermark');
          if (wm) {
            wm.style.position = 'absolute';
            wm.style.left = '70px';
            wm.style.top = '137px';
            wm.style.width = '260px';
            wm.style.height = '260px';
            wm.style.transform = 'none';
          }

          // Chuẩn hóa Tuần / Triệt badges để căn giữa 100% trong html2canvas (giống hệt Live Board)
          const bBadges = targetInClone.querySelectorAll('.tuvi-boundary-badge');
          bBadges.forEach(bg => {
            bg.style.setProperty('transform', 'none', 'important');
            bg.style.setProperty('width', '50px', 'important');
            bg.style.setProperty('height', '24px', 'important');
            bg.style.setProperty('margin-left', '-25px', 'important');
            bg.style.setProperty('margin-top', '-12px', 'important');
            bg.style.setProperty('display', 'table', 'important');
            bg.style.setProperty('background', '#000000', 'important');
            bg.style.setProperty('background-color', '#000000', 'important');
            bg.style.setProperty('border-radius', '3px', 'important');
            bg.style.setProperty('box-sizing', 'border-box', 'important');
            bg.style.setProperty('padding', '0', 'important');
            bg.style.setProperty('text-align', 'center', 'important');
            bg.style.setProperty('line-height', '24px', 'important');

            const span = bg.querySelector('.tuvi-badge-label') || bg.querySelector('span');
            if (span) {
              span.style.setProperty('display', 'table-cell', 'important');
              span.style.setProperty('width', '50px', 'important');
              span.style.setProperty('height', '24px', 'important');
              span.style.setProperty('vertical-align', 'middle', 'important');
              span.style.setProperty('text-align', 'center', 'important');
              span.style.setProperty('line-height', '24px', 'important');
              span.style.setProperty('color', '#FFFFFF', 'important');
              span.style.setProperty('font-size', '12.5px', 'important');
              span.style.setProperty('font-weight', 'bold', 'important');
              span.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 'important');
              span.style.setProperty('margin', '0', 'important');
              span.style.setProperty('padding', '0', 'important');
            }
          });

          // Triệt tiêu hoàn toàn lỗi dãn chữ (letter-spacing) của html2canvas trên Windows
          const allElements = targetInClone.querySelectorAll('*');
          allElements.forEach(el => {
            el.style.letterSpacing = 'normal';
            el.style.fontKerning = 'none';
          });
        }
      }
    });

    cachedTuViDataUrl = canvas.toDataURL('image/png');
    canvas.toBlob((blob) => {
      cachedTuViBlob = blob;
    }, 'image/png');

    // Cập nhật src cho thẻ img overlay trên Live Board phục vụ menu chuột phải
    const overlayImg = document.getElementById('tuvi-board-img');
    if (overlayImg) {
      overlayImg.src = cachedTuViDataUrl;
    }

    // Lưu blob và dataURL để phục vụ tải ảnh/sao chép/in ấn, TUYỆT ĐỐI không ghi đè view.innerHTML
    // Giữ nguyên bản Live Board (#tuvi-live-board) phẳng chuẩn, sắc nét 100%, không bị cắt xén hay nhảy giật màn hình
  } catch (err) {
    console.error('Lỗi kết xuất ảnh lá số:', err);
    fallbackToLiveBoard();
  }
};

/**
 * Lấy Blob của ảnh lá số (Đảm bảo xuất chuẩn từ bản phẳng gốc 832px)
 */
async function getTuViImageBlob() {
  if (cachedTuViBlob && cachedTuViDataUrl) {
    return cachedTuViBlob;
  }
  if (typeof window.renderTuViBoardToImage === 'function') {
    await window.renderTuViBoardToImage();
  }
  return cachedTuViBlob;
}

/**
 * Chuyển đổi chuỗi base64 DataURL thành Blob an toàn 100% trên cả giao thức file:/// và https://
 */
window.tuviDataURLtoBlob = function (dataurl) {
  if (!dataurl || typeof dataurl !== 'string') return null;
  try {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (err) {
    return null;
  }
};

/**
 * Trình tải ảnh chuẩn cho cả 3 mục: Tử Vi, Tứ Trụ, Kinh Dịch
 * - Trên PC (Desktop): Mở trực tiếp hộp thoại "Lưu như" (Save As) của Windows với tên tệp và định dạng PNG
 * - Trên Mobile: Mở Share Sheet lưu trực tiếp vào Thư viện / Album ảnh
 */
window.saveImageFileWithPicker = async function (blobOrDataUrl, defaultFileName, successMsg) {
  let blob = (blobOrDataUrl instanceof Blob) ? blobOrDataUrl : window.tuviDataURLtoBlob(blobOrDataUrl);
  if (!blob) return false;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768);

  // 1. Trên Điện thoại: Mở bảng chia sẻ hệ điều hành để bấm "Lưu hình ảnh" vào Cuộn camera / Album ảnh
  if (isMobile && navigator.canShare && typeof File !== 'undefined') {
    try {
      const file = new File([blob], defaultFileName, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: defaultFileName.replace(/\.png$/i, ''),
          text: defaultFileName.replace(/\.png$/i, '')
        });
        if (typeof showToast === 'function') showToast('Đã mở bảng lưu ảnh vào Album ảnh!');
        return true;
      }
    } catch (e) {
      if (e.name === 'AbortError') return true;
    }
  }

  // 2. Trên PC: Mở cửa sổ "Lưu như" (Save As) của Windows qua File System Access API
  if (!isMobile && typeof window.showSaveFilePicker === 'function') {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: defaultFileName,
        types: [{
          description: 'Tệp PNG',
          accept: { 'image/png': ['.png'] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      if (typeof showToast === 'function') showToast(successMsg || 'Đã tải thành công ảnh về máy!');
      return true;
    } catch (err) {
      if (err.name === 'AbortError') {
        return true; // Người dùng chủ động bấm Hủy trên hộp thoại Lưu như
      }
    }
  }

  // 3. Fallback tiêu chuẩn qua thẻ <a> download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = defaultFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  if (typeof showToast === 'function') showToast(successMsg || 'Đã tải thành công ảnh về máy!');
  return true;
};

/**
 * Tải ảnh Lá Số Tử Vi về máy tính (PNG) & Hỗ trợ Mobile lưu vào Album ảnh
 */
window.downloadTuViImage = async function () {
  const name = document.getElementById('input-fullname')?.value.trim() || 'Thân_Chủ';
  const fileName = `La_So_Tu_Vi_${name.replace(/\s+/g, '_')}.png`;

  let blob = cachedTuViBlob;
  if (!blob) {
    if (typeof showToast === 'function') showToast('Đang kết xuất ảnh Lá Số Tử Vi...');
    blob = await getTuViImageBlob();
  }
  if (!blob && cachedTuViDataUrl) {
    blob = window.tuviDataURLtoBlob(cachedTuViDataUrl);
  }

  if (blob) {
    await window.saveImageFileWithPicker(blob, fileName, 'Đã tải thành công ảnh Lá Số Tử Vi!');
  } else if (cachedTuViDataUrl) {
    await window.saveImageFileWithPicker(cachedTuViDataUrl, fileName, 'Đã tải thành công ảnh Lá Số Tử Vi!');
  }
};

/**
 * Sao chép hình ảnh Lá Số Tử Vi vào Clipboard & Hỗ trợ Mobile
 */
window.copyTuViImage = async function () {
  showToast('Đang kết xuất và sao chép hình ảnh Lá Số...');
  try {
    const blob = await getTuViImageBlob();
    if (!blob) return;

    // 1. Ghi Clipboard API
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('Đã sao chép hình ảnh Lá Số Tử Vi vào Clipboard! (Mẹo: Có thể chạm giữ vào ảnh để lưu)');
        return;
      } catch (err) {
        console.warn('Lỗi ghi clipboard:', err);
      }
    }

    // 2. Thử Web Share API trên Mobile
    if (navigator.share && navigator.canShare) {
      const name = document.getElementById('input-fullname')?.value.trim() || 'Thân_Chủ';
      const fileName = `La_So_Tu_Vi_${name.replace(/\s+/g, '_')}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Lá Số Tử Vi',
          files: [file]
        });
        return;
      }
    }
  } catch (err) {
    if (err && err.name === 'AbortError') return;
    console.warn('Lỗi sao chép/chia sẻ ảnh:', err);
  }

  showToast('Đang tải ảnh lá số về máy...');
  window.downloadTuViImage();
};

/**
 * Phóng to toàn màn hình Lá Số Tử Vi
 */
window.openTuViImageZoomModal = async function () {
  const zoomModal = document.getElementById('modal-image-zoom');
  const zoomImg = document.getElementById('modal-zoom-img');
  const zoomTitle = document.getElementById('modal-zoom-title');
  if (!zoomModal || !zoomImg) return;

  window.currentZoomType = 'tuvi';
  if (zoomTitle) {
    zoomTitle.textContent = 'Bức Ảnh Bản Đồ Lá Số Tử Vi (Độ Nét Cao)';
  }

  if (cachedTuViDataUrl) {
    zoomImg.src = cachedTuViDataUrl;
  } else {
    const blob = await getTuViImageBlob();
    if (blob) {
      zoomImg.src = URL.createObjectURL(blob);
    }
  }
  zoomModal.classList.remove('hidden');
  if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
};

/**
 * Hiển thị thông báo Toast nhanh
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

/**
 * Quản lý sự kiện Modal
 */
function initModalEvents() {
  const tuviModal = document.getElementById('tuvi-modal');
  const closeBtn = document.getElementById('close-tuvi-modal');
  const closeFooterBtn = document.getElementById('btn-close-tuvi-footer');

  const zoomModal = document.getElementById('modal-image-zoom');
  const closeZoomBtn = document.getElementById('close-zoom-modal');
  const zoomBtn = document.getElementById('btn-zoom-tuvi');
  const copyBtn = document.getElementById('btn-copy-tuvi');
  const downloadBtn = document.getElementById('download-tuvi-image-btn');
  const printBtn = document.getElementById('btn-print-tuvi');
  const zoomDownloadBtn = document.getElementById('btn-modal-zoom-download');

  const closeTuVi = () => {
    if (tuviModal) tuviModal.classList.add('hidden');
  };

  const closeZoom = () => {
    if (zoomModal) zoomModal.classList.add('hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeTuVi);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeTuVi);
  if (closeZoomBtn) closeZoomBtn.addEventListener('click', closeZoom);

  if (tuviModal) {
    tuviModal.addEventListener('click', function (e) {
      if (e.target === tuviModal) closeTuVi();
    });
  }

  if (zoomModal) {
    zoomModal.addEventListener('click', function (e) {
      if (e.target === zoomModal) closeZoom();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeZoom();
      closeTuVi();
    }
  });

  if (zoomBtn) zoomBtn.addEventListener('click', window.openTuViImageZoomModal);
  if (copyBtn) copyBtn.addEventListener('click', window.copyTuViImage);
  if (downloadBtn) downloadBtn.addEventListener('click', window.downloadTuViImage);
  if (zoomDownloadBtn) {
    zoomDownloadBtn.addEventListener('click', function () {
      if (window.currentZoomType === 'tutru' && typeof window.downloadTuTruImage === 'function') {
        window.downloadTuTruImage();
      } else if (window.currentZoomType === 'kinhdich' && typeof window.downloadKinhDichImage === 'function') {
        window.downloadKinhDichImage();
      } else if (typeof window.downloadTuViImage === 'function') {
        window.downloadTuViImage();
      }
    });
  }
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  if (!window.openTuTruImageZoomModal) {
    window.openTuTruImageZoomModal = function() {
      if (window.TUTRU_ENGINE && typeof window.TUTRU_ENGINE.openZoom === 'function') {
        window.TUTRU_ENGINE.openZoom();
      }
    };
  }
}

/**
 * Xử lý các sự kiện tương tác form & nút bấm LẬP LÁ SỐ
 */
function initEventHandlers() {
  const btnSubmit = document.getElementById('btn-submit-tuvi');
  const tuviModal = document.getElementById('tuvi-modal');

  if (btnSubmit) {
    btnSubmit.addEventListener('click', function () {
      const name = document.getElementById('input-fullname')?.value.trim() || 'Nguyễn Văn An';
      const gender = document.querySelector('input[name="gender"]:checked')?.value === 'nam' ? 'Nam' : 'Nữ';
      const calType = document.querySelector('input[name="calendar_type"]:checked')?.value;
      const limitYear = parseInt(document.getElementById('select-limit-year')?.value || '2026', 10);

      // Hiển thị modal trước khi an sao
      if (tuviModal) {
        tuviModal.classList.remove('hidden');
        if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
      }

      let day, month, year, hour;

      if (calType === 'am') {
        const can = document.getElementById('select-lunar-can')?.value || 'Mậu';
        const chi = document.getElementById('select-lunar-chi')?.value || 'Thìn';
        const monthText = document.getElementById('select-lunar-month')?.value || 'Tám';
        const monthIdx = LUNAR_MONTHS.indexOf(monthText) + 1;
        const dayVal = parseInt(document.getElementById('select-lunar-day')?.value || '8', 10);
        const hourChi = document.getElementById('select-lunar-hour')?.value || 'Tỵ';
        const isOver60 = document.getElementById('check-over-60')?.checked || false;

        const calcYear = calculateYearFromCanChi(can, chi, isOver60);

        day = dayVal;
        month = monthIdx > 0 ? monthIdx : 8;
        year = calcYear;
        hour = hourChi;

        render12Palaces({
          name,
          day,
          month,
          year,
          hour,
          gender,
          calendarType: 'Âm lịch',
          viewYear: limitYear
        });
      } else {
        day = parseInt(document.getElementById('select-day')?.value || '8', 10);
        month = parseInt(document.getElementById('select-month')?.value || '8', 10);
        year = parseInt(document.getElementById('select-year')?.value || '2008', 10);
        const hourVal = document.getElementById('select-hour')?.value || '10';
        const minuteVal = document.getElementById('select-minute')?.value || '30';
        hour = `${hourVal}:${minuteVal}`;

        render12Palaces({
          name,
          day,
          month,
          year,
          hour,
          gender,
          calendarType: 'Dương lịch',
          viewYear: limitYear
        });
      }
    });
  }

  const btnBooking = document.getElementById('btn-hero-buy') || document.getElementById('btn-booking-hero');
  if (btnBooking) {
    btnBooking.addEventListener('click', function () {
      const modal = document.getElementById('modal-booking-zalo');
      if (modal) {
        modal.style.display = 'flex';
      } else {
        alert('Kính mời bạn liên hệ trực tiếp Hotline/Zalo: 0705806666 để đặt lịch luận giải chuyên sâu từng cung cùng Thầy Ngọc Duy (Duy Tâm Phúc)!');
      }
    });
  }
}

/* ==========================================================================
   MODULE LỊCH VẠN SỰ & TRẠCH NHẬT CHO TRANG CHỦ
   ========================================================================== */
(function() {
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const THU = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];

  const NGU_HANH_CAN = { "Giáp":"Mộc", "Ất":"Mộc", "Bính":"Hỏa", "Đinh":"Hỏa", "Mậu":"Thổ", "Kỷ":"Thổ", "Canh":"Kim", "Tân":"Kim", "Nhâm":"Thủy", "Quý":"Thủy" };
  const NGU_HANH_CHI = { "Tý":"Thủy", "Sửu":"Thổ", "Dần":"Mộc", "Mão":"Mộc", "Thìn":"Thổ", "Tị":"Hỏa", "Ngọ":"Hỏa", "Mùi":"Thổ", "Thân":"Kim", "Dậu":"Kim", "Tuất":"Thổ", "Hợi":"Thủy" };

  const NAP_AM = {
    "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim", "Bính Dần": "Lư Trung Hỏa", "Đinh Mão": "Lư Trung Hỏa",
    "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tị": "Đại Lâm Mộc", "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
    "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim", "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
    "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy", "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
    "Canh Thìn": "Bạch Lạp Kim", "Tân Tị": "Bạch Lạp Kim", "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
    "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy", "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
    "Mậu Tý": "Thích Lịch Hỏa", "Kỷ Sửu": "Thích Lịch Hỏa", "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
    "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tị": "Trường Lưu Thủy", "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
    "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa", "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
    "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ", "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
    "Giáp Thìn": "Phú Đăng Hỏa", "Ất Tị": "Phú Đăng Hỏa", "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
    "Mậu Thân": "Đại Dịch Thổ", "Kỷ Dậu": "Đại Dịch Thổ", "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
    "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc", "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
    "Bính Thìn": "Sa Trung Thổ", "Đinh Tị": "Sa Trung Thổ", "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
    "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc", "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy"
  };

  const NHI_THAP_BAT_TU_DATA = [
    { ten: "Giác", luan: "Nên làm: Đi thi, khởi công, giá thú. Kỵ: Chôn cất, xây tường." },
    { ten: "Cang", luan: "Nên làm: Cắt áo, may vá. Kỵ: Khởi công, cưới gả, đào giếng." },
    { ten: "Đê", luan: "Nên làm: Nhập học, cầu tài. Kỵ: Xuất hành xa, kiện cáo." },
    { ten: "Phòng", luan: "Nên làm: Khởi công xây dựng, cưới hỏi, nhập trạch, khai trương đại cát." },
    { ten: "Tâm", luan: "Nên làm: Cúng tế, trừ tà. Kỵ: Cưới gả, tranh tụng, động thổ." },
    { ten: "Vĩ", luan: "Nên làm: Khởi tạo, khai trương, cưới gả, xuất hành đều tốt đẹp." },
    { ten: "Cơ", luan: "Nên làm: Khởi tạo, khai trương, chôn cất cát lợi." },
    { ten: "Đẩu", luan: "Nên làm: Xây đắp, trồng trọt, cưới hỏi, chiêu tài." },
    { ten: "Ngưu", luan: "Nên làm: Đi thuyền, cầu danh. Kỵ: Cưới gả, làm nhà." },
    { ten: "Nữ", luan: "Nên làm: Nhập học, may mặc. Kỵ: Kiện tụng, tranh chấp." },
    { ten: "Hư", luan: "Nên làm: Tu tạo mồ mả. Kỵ: Khởi công, cưới hỏi, khai trương." },
    { ten: "Nguy", luan: "Nên làm: Cắt cỏ, đắp đê. Kỵ: Đi thuyền, động thổ." },
    { ten: "Thất", luan: "Nên làm: Khởi công, mở cửa, nhập trạch, giá thú rất tốt." },
    { ten: "Bích", luan: "Nên làm: Khởi tạo, khai trương, chôn cất, cưới hỏi trăm sự hanh thông." },
    { ten: "Khuê", luan: "Nên làm: Học hành, khai bút. Kỵ: Khởi công, giá thú." },
    { ten: "Lâu", luan: "Nên làm: Cưới gả, khai trương, tu tạo hưng vượng." },
    { ten: "Vị", luan: "Nên làm: Khởi công, nhập trạch, cầu tài lộc cát lợi." },
    { ten: "Mão", luan: "Nên làm: Xây đắp công trình, nhập trạch. Kỵ: Cưới hỏi." },
    { ten: "Tất", luan: "Nên làm: Khởi tạo, giá thú, chôn cất, trăm sự tốt lành." },
    { ten: "Chủy", luan: "Nên làm: Cúng bái, cầu an. Kỵ: Khởi công, cưới gả, nhậm chức." },
    { ten: "Sâm", luan: "Nên làm: Khởi công, khai trương, cầu tài, xuất hành thuận lợi." },
    { ten: "Tỉnh", luan: "Nên làm: Khởi tạo, đào ao, tu sửa nhà cửa, gieo trồng." },
    { ten: "Quỷ", luan: "Nên làm: Chôn cất, chặt cỏ phá đất, cắt áo. Kỵ: Cưới hỏi, khởi công." },
    { ten: "Liễu", luan: "Nên làm: Phá dỡ nhà, giải oan. Kỵ: Khởi tạo, giá thú." },
    { ten: "Tinh", luan: "Nên làm: Nhập trạch, an táng. Kỵ: Cưới gả, làm chuồng trại." },
    { ten: "Trương", luan: "Nên làm: Khởi tạo, khai trương, cưới gả thuận lợi trăm bề." },
    { ten: "Dực", luan: "Nên làm: Khởi công, xây dựng, xuất hành, thi cử đỗ đạt." },
    { ten: "Chẩn", luan: "Nên làm: Khởi tạo, cưới gả, nhập trạch, xuất hành đại cát." }
  ];

  const THAP_NHI_TRUC_DATA = [
    { ten: "Kiến", luan: "Nên: Xuất hành, nhậm chức, đính hôn. Kỵ: Động thổ, khai trương." },
    { ten: "Trừ", luan: "Nên: Trừ bỏ tà khí, chữa bệnh, dọn dẹp nhà cửa. Kỵ: Khởi tạo lớn." },
    { ten: "Mãn", luan: "Nên: Khởi công, khai trương, nhập trạch, cầu tài lộc dồi dào." },
    { ten: "Bình", luan: "Nên: Sửa và trang trí tường, sửa đường xá, lấp hầm hố." },
    { ten: "Định", luan: "Nên: Cưới gả, giao dịch, ký hợp đồng, cầu tự, nhập học." },
    { ten: "Chấp", luan: "Nên: Đắp đê, trồng trọt, săn bắt. Kỵ: Mở kho, xuất tiền của." },
    { ten: "Phá", luan: "Nên: Phá dỡ công trình cũ, giải trừ việc xấu. Kỵ: Khởi tạo, cưới hỏi." },
    { ten: "Nguy", luan: "Nên: Cúng lễ, cầu an. Kỵ: Leo trèo cao, xuất hành vượt biển." },
    { ten: "Thành", luan: "Nên: Trăm sự đều tốt, giá thú, khai trương, nhập trạch đắc lộc." },
    { ten: "Thu", luan: "Nên: Thu hoạch, thu nợ, mua sắm tài sản. Kỵ: Chôn cất, khởi công." },
    { ten: "Khai", luan: "Nên: Mở mang cơ sở, động thổ, cưới hỏi, nhập học đại cát." },
    { ten: "Bế", luan: "Nên: Đắp đập, ngăn nước, xây tường. Kỵ: Khai trương, xuất hành." }
  ];

  const PI = Math.PI;

  function jdFromDate(dd, mm, yy) {
    let a = Math.floor((14 - mm) / 12);
    let y = yy + 4800 - a;
    let m = mm + 12 * a - 3;
    return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function jdToDate(jd) {
    let a = jd + 32044;
    let b = Math.floor((4 * a + 3) / 146097);
    let c = a - Math.floor((146097 * b) / 4);
    let d = Math.floor((4 * c + 3) / 1461);
    let e = c - Math.floor((1461 * d) / 4);
    let m = Math.floor((5 * e + 2) / 153);
    let day = e - Math.floor((153 * m + 2) / 5) + 1;
    let month = m + 3 - 12 * Math.floor(m / 10);
    let year = 100 * b + d - 4800 + Math.floor(m / 10);
    return [day, month, year];
  }

  function getNewMoonDay(k, timeZone) {
    let T = k / 1236.85;
    let T2 = T * T;
    let T3 = T2 * T;
    let dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
    C1 = C1 - 0.0004 * Math.sin(3 * dr * Mpr);
    C1 = C1 + 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
    C1 = C1 - 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    C1 = C1 - 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
    C1 = C1 + 0.0100 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);
    let deltat = (T < -11) ? (0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3) : (-0.000278 + 0.000265 * T + 0.000262 * T2);
    return Math.floor(Jd1 + C1 - deltat + 0.5 + timeZone / 24);
  }

  function getSunLongitude(jdn, timeZone) {
    let T = (jdn - 2451545.0 + 0.5 - timeZone / 24) / 36525;
    let dr = PI / 180;
    let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
    let M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;
    let C = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * dr);
    C += (0.019993 - 0.000101 * T) * Math.sin(2 * M * dr) + 0.000290 * Math.sin(3 * M * dr);
    let theta = L0 + C;
    theta = theta * dr;
    theta = theta - PI * 2 * Math.floor(theta / (PI * 2));
    return Math.floor(theta / PI * 6);
  }

  function getLunarMonth11(yy, timeZone) {
    let off = jdFromDate(31, 12, yy) - 2415021;
    let k = Math.floor(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    let sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    let k = Math.floor((a11 - 2415021.0769986) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  function convertSolar2Lunar(dd, mm, yy, timeZone) {
    let dayNumber = jdFromDate(dd, mm, yy);
    let k = Math.floor((dayNumber - 2415021.0769986) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }
    let lunarDay = dayNumber - monthStart + 1;
    let diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      let leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) lunarLeap = 1;
      }
    }
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear--;
    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  }

  function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone) {
    let a11;
    if (lunarMonth < 11) a11 = getLunarMonth11(lunarYear - 1, timeZone);
    else a11 = getLunarMonth11(lunarYear, timeZone);
    let k = Math.floor(0.5 + (a11 - 2415021.0769986) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) off += 12;
    if (getLunarMonth11(lunarYear, timeZone) - a11 > 365) {
      let leapOff = getLeapMonthOffset(a11, timeZone);
      let leapMonth = leapOff - 2;
      if (leapMonth < 0) leapMonth += 12;
      if (lunarLeap === 1 && lunarMonth === leapMonth) off = leapOff;
      else if (off >= leapOff) off++;
    }
    let monthStart = getNewMoonDay(k + off, timeZone);
    return jdToDate(monthStart + lunarDay - 1);
  }

  function tinhCatHungThan(thangChi, canNgay, chiNgay, trucTen) {
    let cat = [];
    let hung = [];

    const chiThangIdx = CHI.indexOf(thangChi);
    const chiNgayIdx = CHI.indexOf(chiNgay);

    const thienDucMap = { "Dần":"Đinh", "Mão":"Thân", "Thìn":"Nhâm", "Tị":"Tân", "Ngọ":"Hợi", "Mùi":"Giáp", "Thân":"Quý", "Dậu":"Dần", "Tuất":"Bính", "Hợi":"Ất", "Tý":"Tị", "Sửu":"Canh" };
    if (thienDucMap[thangChi] === canNgay || thienDucMap[thangChi] === chiNgay) cat.push("Thiên Đức");

    const nguyetDucMap = { "Dần":"Bính", "Ngọ":"Bính", "Tuất":"Bính", "Thân":"Nhâm", "Tý":"Nhâm", "Thìn":"Nhâm", "Hợi":"Giáp", "Mão":"Giáp", "Mùi":"Giáp", "Tị":"Canh", "Dậu":"Canh", "Sửu":"Canh" };
    if (nguyetDucMap[thangChi] === canNgay) cat.push("Nguyệt Đức");

    if ((["Dần","Mão","Thìn"].includes(thangChi) && canNgay==="Mậu" && chiNgay==="Dần") ||
        (["Tị","Ngọ","Mùi"].includes(thangChi) && canNgay==="Giáp" && chiNgay==="Ngọ") ||
        (["Thân","Dậu","Tuất"].includes(thangChi) && canNgay==="Mậu" && chiNgay==="Thân") ||
        (["Hợi","Tý","Sửu"].includes(thangChi) && canNgay==="Giáp" && chiNgay==="Tý")) {
      cat.push("Thiên Xá");
    }

    if (chiNgay === thangChi) cat.push("Dân Nhật");
    if ((chiNgayIdx + 4) % 12 === chiThangIdx || (chiNgayIdx + 8) % 12 === chiThangIdx) cat.push("Tam Hợp", "Ngũ Hợp");
    if ((chiNgayIdx + chiThangIdx) % 12 === 1) cat.push("Lục Hợp", "Âm Đức");
    if (["Kiến", "Mãn", "Định", "Khai"].includes(trucTen)) cat.push("Thời Đức", "Thiên Quan");
    if (["Tý", "Dậu", "Mão"].includes(chiNgay)) cat.push("Ngọc Vũ", "Dương Đức");
    if (["Sửu", "Mùi", "Tị"].includes(chiNgay)) cat.push("Tư Mệnh", "Phúc Sinh");

    if ((chiNgayIdx + 6) % 12 === chiThangIdx) hung.push("Nguyệt Phá", "Đại Hao");
    if (["Thìn", "Tuất", "Sửu", "Mùi"].includes(chiNgay)) hung.push("Thổ Kị", "Thổ Phủ", "Hà Khôi");
    if (chiNgay === thangChi) hung.push("Trùng Phục");
    if ((chiThangIdx + 3) % 12 === chiNgayIdx) hung.push("Nguyệt Hình");
    if (["Dần","Thân","Tị","Hợi"].includes(chiNgay)) hung.push("Kiếp Sát", "Thiên Tặc");
    if (["Tý","Ngọ","Mão","Dậu"].includes(chiNgay)) hung.push("Hoành Thiên Chu Tước", "Vãng Vong");
    if (["Phá", "Bế", "Nguy"].includes(trucTen)) hung.push("Cửu Xú", "La Thiên Đại Thoái");

    return {
      catThan: cat.length > 0 ? cat.join(", ") + "." : "Không có cát tinh đặc biệt.",
      hungThan: hung.length > 0 ? hung.join(", ") + "." : "Không phạm hung tinh nặng."
    };
  }

  function tinhGioHoangHacDao(chiNgay) {
    const THAN_SAT = [
      { ten: "Thanh Long", loai: "hoang" },
      { ten: "Minh \u0110\u01B0\u1EDDng", loai: "hoang" },
      { ten: "Thi\u00EAn H\u00ECnh", loai: "hac" },
      { ten: "Chu T\u01B0\u1EDBc", loai: "hac" },
      { ten: "Kim Qu\u1EF9", loai: "hoang" },
      { ten: "Kim \u0110\u01B0\u1EDDng", loai: "hoang" },
      { ten: "B\u1EA1ch H\u1ED5", loai: "hac" },
      { ten: "Ng\u1ECDc \u0110\u01B0\u1EDDng", loai: "hoang" },
      { ten: "Thi\u00EAn Lao", loai: "hac" },
      { ten: "Huy\u1EC1n V\u0169", loai: "hac" },
      { ten: "T\u01B0 M\u1EC7nh", loai: "hoang" },
      { ten: "C\u00E2u Tr\u1EADn", loai: "hac" }
    ];

    const KHOI_THANH_LONG = {
      "Dần": 0, "Thân": 0,
      "Mão": 2, "Dậu": 2,
      "Thìn": 4, "Tuất": 4,
      "Tị": 6,  "Hợi": 6,
      "Tý": 8,  "Ngọ": 8,
      "Sửu": 10, "Mùi": 10
    };

    const startChi = KHOI_THANH_LONG[chiNgay];
    let dsHoangDao = [];
    let dsHacDao = [];

    for (let gioIdx = 0; gioIdx < 12; gioIdx++) {
      let offset = (gioIdx - startChi + 12) % 12;
      let sao = THAN_SAT[offset];
      let tenChi = CHI[gioIdx];

      if (sao.loai === "hoang") {
        dsHoangDao.push(`${tenChi} (${sao.ten})`);
      } else {
        dsHacDao.push(`${tenChi} (${sao.ten})`);
      }
    }

    return {
      hoangDaoStr: dsHoangDao.join("&nbsp;&nbsp; - &nbsp;&nbsp;"),
      hacDaoStr: dsHacDao.join("&nbsp;&nbsp; - &nbsp;&nbsp;")
    };
  }

          function tinhNgayHoangHacDao(lMonth, chiNgay) {
    const CHI_MAP = {
      "T\u00FD": 0, "S\u1EEDu": 1, "D\u1EA7n": 2, "M\u00E3o": 3, "Th\u00ECn": 4, "T\u1ECB": 5, "T\u1EF5": 5,
      "Ng\u1ECD": 6, "M\u00F9i": 7, "Th\u00E2n": 8, "D\u1EADu": 9, "Tu\u1EA5t": 10, "H\u1EE3i": 11
    };
    const SAO_12 = [
      { ten: "Thanh Long", loai: "Ho\u00E0ng \u0110\u1EA1o", isHoangDao: true },
      { ten: "Minh \u0110\u01B0\u1EDDng", loai: "Ho\u00E0ng \u0110\u1EA1o", isHoangDao: true },
      { ten: "Thi\u00EAn H\u00ECnh", loai: "H\u1EAFc \u0110\u1EA1o", isHoangDao: false },
      { ten: "Chu T\u01B0\u1EDBc", loai: "H\u1EAFc \u0110\u1EA1o", isHoangDao: false },
      { ten: "Kim Qu\u1EF9", loai: "Ho\u00E0ng \u0110\u1EA1o", isHoangDao: true },
      { ten: "Kim \u0110\u01B0\u1EDDng", loai: "Ho\u00E0ng \u0110\u1EA1o", isHoangDao: true },
      { ten: "B\u1EA1ch H\u1ED5", loai: "H\u1EAFc \u0110\u1EA1o", isHoangDao: false },
      { ten: "Ng\u1ECDc \u0110\u01B0\u1EDDng", loai: "Ho\u00E0ng \u0110\u1EA1o", isHoangDao: true },
      { ten: "Thi\u00EAn Lao", loai: "H\u1EAFc \u0110\u1EA1o", isHoangDao: false },
      { ten: "Huy\u1EC1n V\u0169", loai: "H\u1EAFc \u0110\u1EA1o", isHoangDao: false },
      { ten: "T\u01B0 M\u1EC7nh", loai: "Ho\u00E0ng \u0110\u1EA1o", isHoangDao: true },
      { ten: "C\u00E2u Tr\u1EA7n", loai: "H\u1EAFc \u0110\u1EA1o", isHoangDao: false }
    ];
    const chiIdx = CHI_MAP[chiNgay] !== undefined ? CHI_MAP[chiNgay] : 0;
    const m = parseInt(lMonth, 10) || 1;
    const startChi = ((m - 1) % 6) * 2;
    const offset = (chiIdx - startChi + 12) % 12;
    return SAO_12[offset];
  }
  function chayTrachNhatMain(d, m, y) {
    if (!document.getElementById("main-txt-nam-duong")) return;

    const jdn = jdFromDate(d, m, y);

    const canNgayIdx = (jdn + 9) % 10;
    const chiNgayIdx = (jdn + 1) % 12;
    const canNgay = CAN[canNgayIdx];
    const chiNgay = CHI[chiNgayIdx];
    const canChiNgay = `${canNgay} ${chiNgay}`;

    const lunar = convertSolar2Lunar(d, m, y, 7.0);
    const lDay = lunar[0];
    const lMonth = lunar[1];
    const lYear = lunar[2];

    const canNam = CAN[(lYear + 6) % 10];
    const chiNam = CHI[(lYear + 8) % 12];
    const canChiNam = `${canNam} ${chiNam}`;

    const canThang = CAN[(lYear * 12 + lMonth + 3) % 10];
    const chiThang = CHI[(lMonth + 1) % 12];
    const canChiThang = `${canThang} ${chiThang}`;

    // Khởi Giờ Tý theo Can Ngày (Ngũ Thử Độn)
    const mapKhoiCan = {
      "Giáp": "Giáp", "Kỷ": "Giáp",
      "Ất": "Bính", "Canh": "Bính",
      "Bính": "Mậu", "Tân": "Mậu",
      "Đinh": "Canh", "Nhâm": "Canh",
      "Mậu": "Nhâm", "Quý": "Nhâm"
    };
    const canGioTy = (mapKhoiCan[canNgay] || "Giáp") + " Tý";

    const ngHanhNgay = `${NGU_HANH_CAN[canNgay]} - ${NGU_HANH_CHI[chiNgay]}`;
    const ngHanhThang = `${NGU_HANH_CAN[canThang]} - ${NGU_HANH_CHI[chiThang]}`;
    const ngHanhNam = `${NGU_HANH_CAN[canNam]} - ${NGU_HANH_CHI[chiNam]}`;

    const napAmNgay = NAP_AM[canChiNgay] || "Sa Trung Kim";
    const napAmThang = NAP_AM[canChiThang] || "Sơn Hạ Hỏa";
    const napAmNam = NAP_AM[canChiNam] || "Thiên Hà Thủy";

    const dateObj = new Date(y, m - 1, d);
    const thuStr = THU[dateObj.getDay()];
    const solarFullStr = `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;

    // 1. Header và khối Ngày Dương / Âm (D9:D13)
    const elNamDuong = document.getElementById("main-txt-nam-duong");
    if (elNamDuong) elNamDuong.innerText = y;

    const elAmNgayThang = document.getElementById("main-txt-am-ngay-thang");
    if (elAmNgayThang) elAmNgayThang.innerText = `${lDay} - ${lMonth}`;

    const elThu = document.getElementById("main-txt-thu");
    if (elThu) elThu.innerText = thuStr;

    const elGioTy = document.getElementById("main-txt-gio-ty");
    if (elGioTy) elGioTy.innerText = `Giờ: ${canGioTy}`;

    const elFullSolar = document.getElementById("main-txt-full-solar-date");
    if (elFullSolar) elFullSolar.innerText = solarFullStr;

    // 2. Ngày, Tháng, Năm Âm Lịch (Row 10)
    const elNgayAm = document.getElementById("main-txt-ngay-am");
    if (elNgayAm) elNgayAm.innerText = lDay;
    const elThangAm = document.getElementById("main-txt-thang-am");
    if (elThangAm) elThangAm.innerText = lMonth;
    const elNamAm = document.getElementById("main-txt-nam-am");
    if (elNamAm) elNamAm.innerText = lYear;

    // 3. Can Chi (Row 11)
    const elCanChiNgay = document.getElementById("main-txt-can-chi-ngay");
    if (elCanChiNgay) elCanChiNgay.innerText = canChiNgay;
    const elCanChiThang = document.getElementById("main-txt-can-chi-thang");
    if (elCanChiThang) elCanChiThang.innerText = canChiThang;
    const elCanChiNam = document.getElementById("main-txt-can-chi-nam");
    if (elCanChiNam) elCanChiNam.innerText = canChiNam;

    // 4. Ngũ Hành (Row 12)
    const elNgHanhNgay = document.getElementById("main-txt-ngu-hanh-ngay");
    if (elNgHanhNgay) elNgHanhNgay.innerText = ngHanhNgay;
    const elNgHanhThang = document.getElementById("main-txt-ngu-hanh-thang");
    if (elNgHanhThang) elNgHanhThang.innerText = ngHanhThang;
    const elNgHanhNam = document.getElementById("main-txt-ngu-hanh-nam");
    if (elNgHanhNam) elNgHanhNam.innerText = ngHanhNam;

    // 5. Nạp Âm (Row 13)
    const elNapAmNgay = document.getElementById("main-txt-nap-am-ngay");
    if (elNapAmNgay) elNapAmNgay.innerText = napAmNgay;
    const elNapAmThang = document.getElementById("main-txt-nap-am-thang");
    if (elNapAmThang) elNapAmThang.innerText = napAmThang;
    const elNapAmNam = document.getElementById("main-txt-nap-am-nam");
    if (elNapAmNam) elNapAmNam.innerText = napAmNam;

        // 6. Tiết Khí (Row 14 - Lấy chuẩn theo THÁNG DƯƠNG LỊCH của năm từ Tiết Khí.docx)
    let tietKhiStr = "Bạch Lộ: 21h 41 Ngày 7 - 8/9 - Thu Phân: 07h 05 Ngày 23 - 24/9";
    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.TIET_KHI_THEO_THANG) {
      const tkObj = window.TRACH_NHAT_DATA.TIET_KHI_THEO_THANG[m];
      if (tkObj) {
        tietKhiStr = tkObj.moTa;
      }
    } else if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.TIET_KHI) {
      const list = window.TRACH_NHAT_DATA.TIET_KHI;
      const monthPairs = {
        1: [22, 23], 2: [0, 1], 3: [2, 3], 4: [4, 5], 5: [6, 7], 6: [8, 9],
        7: [10, 11], 8: [12, 13], 9: [14, 15], 10: [16, 17], 11: [18, 19], 12: [20, 21]
      };
      const pair = monthPairs[m] || [14, 15];
      const tk1 = list[pair[0]];
      const tk2 = list[pair[1]];
      if (tk1 && tk2) {
        tietKhiStr = `${tk1.name}: ${tk1.time} Ngày ${tk1.date} - ${tk2.name}: ${tk2.time} Ngày ${tk2.date}`;
      }
    }
    const elTietKhi = document.getElementById("main-txt-tiet-khi");
    if (elTietKhi) elTietKhi.innerText = tietKhiStr;


        // 7. Sao Tốt, Sao Xấu, Nên Làm, Kiêng Cữ (Row 15, 16, 22, 23) - Lấy theo THÁNG ÂM LỊCH và ĐỊA CHI NGÀY từ Sao Tốt - Sao Xấu.docx
    let saoTotStr = "Thanh Long, Thiên Đức, Giải Thần";
    let nenLamStr = "Khởi sự việc lớn, tế tự cầu phúc, giải hạn, kiện tụng giải oan.";
    let saoXauStr = "Kiếp Sát, Hoàng Sa";
    let kiengCuStr = "Xuất hành đường dài, động thổ xây dựng, cưới hỏi, an táng.";

    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.SAO_TOT_XAU) {
      const stxMonth = window.TRACH_NHAT_DATA.SAO_TOT_XAU[String(lMonth)] || window.TRACH_NHAT_DATA.SAO_TOT_XAU[lMonth];
      if (stxMonth) {
        const item = stxMonth[chiNgay] || stxMonth[chiNgay.toUpperCase()] || stxMonth[chiNgay.toLowerCase()];
        if (item) {
          saoTotStr = item.saoTot ? item.saoTot : "Không có cát tinh đặc biệt";
          if (item.nen) nenLamStr = item.nen;
          saoXauStr = item.saoXau ? item.saoXau : "Không có hung tinh đặc biệt";
          if (item.ky) kiengCuStr = item.ky;
        }
      }
    }
    const elSaoTot = document.getElementById("main-txt-sao-tot");
    if (elSaoTot) elSaoTot.innerText = saoTotStr;
    const elSaoXau = document.getElementById("main-txt-sao-xau");
    if (elSaoXau) elSaoXau.innerText = saoXauStr;
    const elNenLam = document.getElementById("main-txt-nen-lam");
    if (elNenLam) elNenLam.innerText = nenLamStr;
    const elKiengCu = document.getElementById("main-txt-kieng-cu");
    if (elKiengCu) { elKiengCu.innerText = kiengCuStr; elKiengCu.style.color = "#2C241E"; elKiengCu.style.fontWeight = "normal"; }


    // 8. Tiêu đề Phân Tích Tốt Xấu (Row 17)
    const elSecTitle = document.getElementById("main-txt-section-title");
    const daoNgay = tinhNgayHoangHacDao(lMonth, chiNgay);
    if (elSecTitle && daoNgay) {
      const textColor = daoNgay.isHoangDao ? "#7A1414" : "#111111";
      elSecTitle.style.color = textColor;
      elSecTitle.innerHTML = `PH\u00C2N T\u00CDCH T\u1ED0T X\u1EA4U C\u1EE6A NG\u00C0Y ${solarFullStr} <span style="color: ${textColor}; font-weight: bold;">(NG\u00C0Y ${daoNgay.loai.toUpperCase()} - ${daoNgay.ten.toUpperCase()})</span>`;
    }

    // 9. Giờ Hoàng Đạo & Giờ Hắc Đạo (Row 18, 19)
    const gioData = tinhGioHoangHacDao(chiNgay);
    const elGioHoang = document.getElementById("main-txt-gio-hoang-dao");
    if (elGioHoang) elGioHoang.innerHTML = gioData.hoangDaoStr;
    const elGioHac = document.getElementById("main-txt-gio-hac-dao");
    if (elGioHac) elGioHac.innerHTML = gioData.hacDaoStr;

    // 10. Can Chi Luận & Kỵ Tuổi (Row 20, 21)
    const chiXung = CHI[(chiNgayIdx + 6) % 12];
    let canChiLuanStr = `Thiên Can ${canNgay}, Địa Chi ${chiNgay}. `;
    let kyTuoiStr = `Tuổi kỵ: ${chiXung} (Bính ${chiXung}, Canh ${chiXung}, Nhâm ${chiXung}).`;

    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.NGU_HANH_CAN_CHI) {
      const nhInfo = window.TRACH_NHAT_DATA.NGU_HANH_CAN_CHI[canChiNgay];
      if (nhInfo) {
        let parts = [];
        if (nhInfo.tinhChat) parts.push(`<div style="margin-bottom: 1px; font-size: 12px; line-height: 1.25;"><strong>Tính chất ngày:</strong> ${nhInfo.tinhChat}</div>`);
        if (nhInfo.diaChi) parts.push(`<div style="margin-bottom: 1px; font-size: 12px; line-height: 1.25;"><strong>Tương tác Địa Chi:</strong> ${nhInfo.diaChi}</div>`);
        if (nhInfo.nguHanh) parts.push(`<div style="margin-bottom: 1px; font-size: 12px; line-height: 1.25;"><strong>Tương tác Ngũ hành:</strong> ${nhInfo.nguHanh}</div>`);
        if (false && nhInfo.tamSat) parts.push(`<div><strong style="color: #8B1E1E;">Tam Sát:</strong> ${nhInfo.tamSat}</div>`);
        if (parts.length > 0) canChiLuanStr = parts.join("");

        if (nhInfo.kyTuoi) {
          let kt = nhInfo.kyTuoi.trim();
          kyTuoiStr = kt.toLowerCase().startsWith("kỵ tuổi:") ? kt : `Kỵ tuổi: ${kt}`;
        }
      }
    }
    const elCanChiLuan = document.getElementById("main-txt-can-chi-luan");
    if (elCanChiLuan) elCanChiLuan.innerHTML = canChiLuanStr;
    const elKyTuoi = document.getElementById("main-txt-ky-tuoi");
    if (elKyTuoi) elKyTuoi.innerHTML = `<strong style="color: #333333;">${kyTuoiStr}</strong>`;


        // 11. Bách Kỵ (Row 24)
    let danhSachBachKy = [];
    const nk = (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.NGAY_KY) ? window.TRACH_NHAT_DATA.NGAY_KY : null;

    if (nk) {
      // 1. Tam Nương
      if (nk.tamNuong && nk.tamNuong.includes(lDay)) {
        danhSachBachKy.push(`<div>• <strong style="color: #333333;">Ngày Tam Nương:</strong> Ngày ${lDay} Âm lịch — Kỵ khai trương, xuất hành, cưới hỏi, sửa chữa, cất nóc.</div>`);
      }
      // 2. Nguyệt Kỵ
      if (nk.nguyetKy && nk.nguyetKy.includes(lDay)) {
        danhSachBachKy.push(`<div>• <strong style="color: #333333;">Ngày Nguyệt Kỵ:</strong> Ngày ${lDay} Âm lịch ("Mùng năm, mười bốn, hai ba - Đi chơi còn lỗ nữa là đi buôn") — Tránh khởi sự việc lớn.</div>`);
      }
      // 3. Sát Chủ Dương
      if (nk.satChuDuong && nk.satChuDuong[lMonth] && nk.satChuDuong[lMonth].includes(lDay)) {
        danhSachBachKy.push(`<div>• <strong style="color: #333333;">Ngày Sát Chủ Dương:</strong> Tháng ${lMonth} kỵ ngày ${lDay} Âm lịch — Đại hung, kỵ xây dựng, cưới hỏi, xuất hành, an táng, làm nhà.</div>`);
      }
      // 4. Dương Công Kỵ
      if (nk.duongCongKy && nk.duongCongKy[lMonth] && nk.duongCongKy[lMonth].includes(lDay)) {
        danhSachBachKy.push(`<div>• <strong style="color: #333333;">Ngày Dương Công Kỵ:</strong> Tháng ${lMonth} kỵ ngày ${lDay} Âm lịch — Ngày hung hiểm nhất trong năm, bách sự giai hung, tối kỵ khởi công, động thổ, giá thú.</div>`);
      }
      // 5. Ngày Con Nước
      if (nk.conNuoc && nk.conNuoc[lMonth] && nk.conNuoc[lMonth].includes(lDay)) {
        danhSachBachKy.push(`<div>• <strong style="color: #333333;">Ngày Con Nước:</strong> Tháng ${lMonth} kỵ ngày ${lDay} Âm lịch — Kỵ xuất hành đường thủy, cẩn trọng sông nước, tránh khai trương mở tiệm.</div>`);
      }
      // 6. Kim Thần Thất Sát
      if (nk.kimThanThatSat && nk.kimThanThatSat[canNam] && nk.kimThanThatSat[canNam].includes(chiNgay)) {
        danhSachBachKy.push(`<div>• <strong style="color: #333333;">Kim Thần Thất Sát:</strong> Năm ${canNam} kỵ ngày ${chiNgay} — Theo trạch cát là ngày đại hung, trăm việc khởi sự đều bất lợi.</div>`);
      }
    }

    // Ngày Sóc Vọng (mùng 1 hoặc rằm)
    if (lDay === 1 || lDay === 15) {
      danhSachBachKy.push(`<div>• <strong>Ngày Sóc Vọng:</strong> Ngày ${lDay === 1 ? "mùng 1" : "rằm 15"} Âm lịch — Thận trọng trong các việc khởi công lớn, nên thanh tịnh cúng bái cầu an.</div>`);
    }

    let bachKyHtml = "";
    if (danhSachBachKy.length > 0) {
      bachKyHtml = danhSachBachKy.join("");
    } else {
      bachKyHtml = `<strong style="color: #333333;">Không phạm bất kỳ ngày Nguyệt Kỵ, Tam Nương, Dương Công Kỵ, Sát Chủ Dương, Con Nước hay Kim Thần Thất Sát nào.</strong>`;
    }

    const elBachKy = document.getElementById("main-txt-bach-ky");
    if (elBachKy) elBachKy.innerHTML = bachKyHtml;


    // 12. Nhị Thập Bát Tú (Row 25)
    const saoIndex = (jdn + 11) % 28;
    let starObj = null;
    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.NHI_THAP_BAT_TU && window.TRACH_NHAT_DATA.NHI_THAP_BAT_TU[saoIndex]) {
      starObj = window.TRACH_NHAT_DATA.NHI_THAP_BAT_TU[saoIndex];
    }
    const elNhiThap = document.getElementById("main-txt-nhi-thap");
    if (elNhiThap && starObj) {
      const tenHienThi = starObj.moTa || (starObj.ten ? (starObj.ten + " (" + (starObj.loai || starObj.nguHanh || "Bình Tú") + ")") : "Quỳ Kim Dương");
      elNhiThap.innerHTML = `
        <div class="star-name-line" style="font-weight: bold; color: #7A1414; margin-bottom: 4px;">Sao: ${tenHienThi}</div>
        <div>• <strong>Nên Làm:</strong> ${starObj.nenLam || 'Cát lợi khởi tạo việc nhỏ.'}</div>
        <div>• <strong>Kỵ Làm:</strong> ${starObj.kyLam || 'Không kỵ việc gì lớn.'}</div>
        <div>• <strong>Ngoại Lệ:</strong> ${starObj.ngoaiLe || 'Gặp ngày tam hợp trăm việc đều lành.'}</div>
      `;
    }

    // 13. Đổng Công (Row 26)
    const trucIdx = (chiNgayIdx - (lMonth + 1) % 12 + 12) % 12;
    const trucItem = THAP_NHI_TRUC_DATA[trucIdx] || { ten: "Kiến", luan: "Khởi tạo tốt" };
    let dongCongLuan = `<strong>Trực ${trucItem.ten}:</strong> ${trucItem.luan}`;
    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.DONG_CONG) {
      const dcThang = window.TRACH_NHAT_DATA.DONG_CONG[String(lMonth)];
      if (dcThang && dcThang[trucItem.ten]) {
        dongCongLuan = `<strong>Trực ${trucItem.ten} (${dcThang[trucItem.ten].chi}):</strong> ${dcThang[trucItem.ten].luan}`;
      }
    }
    const elDongCong = document.getElementById("main-txt-dong-cong");
    if (elDongCong) elDongCong.innerHTML = dongCongLuan;

    function rutGonHuong(str) {
      if (!str) return "";
      return str
        .replace(/\s*đón\s+(Hỷ|Tài|Quý|Hạc)\s*Thần/gi, "")
        .replace(/Chính\s*Đông/gi, "C. Đông")
        .replace(/Chính\s*Tây/gi, "C. Tây")
        .replace(/Chính\s*Nam/gi, "C. Nam")
        .replace(/Chính\s*Bắc/gi, "C. Bắc")
        .replace(/Đông\s*Bắc/gi, "Đ. Bắc")
        .replace(/Tây\s*Bắc/gi, "T. Bắc")
        .replace(/Tây\s*Nam/gi, "T. Nam")
        .replace(/Đông\s*Nam/gi, "Đ. Nam")
        .trim();
    }

        // 14. Tam Sát (Row 27-29)
    let tsNamStr = `<strong>N\u0103m:</strong> ${chiNam} t\u1EA1i ph\u00EDa B\u1EAFc (H\u1EE3i, T\u00FD, S\u1EEDu).`;
    let tsThangStr = `<strong>Th\u00E1ng:</strong> ${lMonth} t\u1EA1i ph\u00EDa \u0110\u00F4ng (D\u1EA7n, M\u00E3o, Th\u00ECn)`;
    let tsToiKyStr = `<strong>T\u1ED1i K\u1EF5:</strong> \u0110\u1ED9ng th\u1ED5, \u0111\u00E0o m\u00F3ng, \u0111\u1EADp ph\u00E1, s\u1EEDa ch\u1EEFa, nh\u1EADp tr\u1EA1ch : "Tam S\u00E1t kh\u1EA3 h\u01B0\u1EDBng b\u1EA5t kh\u1EA3 t\u1ECD\u0061" C\u00F3 th\u1EC3 h\u01B0\u1EDBng m\u1EB7t v\u1EC1 ph\u01B0\u01A1ng Tam S\u00E1t, nh\u01B0ng tuy\u1EC7t \u0111\u1ED1i kh\u00F4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 l\u01B0ng nh\u00E0 (t\u1ECD\u0061) ho\u1EB7c kh\u1EDFi c\u00F4ng cu\u1ED1c \u0111\u1EA5t t\u1EA1i ph\u01B0\u01A1ng Tam S\u00E1t.`;

    if (window.TRACH_NHAT_DATA) {
      if (window.TRACH_NHAT_DATA.TAM_SAT_NAM && window.TRACH_NHAT_DATA.TAM_SAT_NAM[chiNam]) {
        tsNamStr = `<strong>N\u0103m:</strong> ${chiNam} t\u1EA1i ph\u00EDa ${rutGonHuong(window.TRACH_NHAT_DATA.TAM_SAT_NAM[chiNam])}.`;
      }
      if (window.TRACH_NHAT_DATA.TAM_SAT_THANG && window.TRACH_NHAT_DATA.TAM_SAT_THANG[String(lMonth)]) {
        let valThang = rutGonHuong(window.TRACH_NHAT_DATA.TAM_SAT_THANG[String(lMonth)]).replace(/^(t\u1EA1i\s*ph\u00EDa\s*|t\u1EA1i\s*|tại\s*phía\s*|tại\s*)/i, "").trim();
        tsThangStr = `<strong>Th\u00E1ng:</strong> ${lMonth} t\u1EA1i ph\u00EDa ${valThang}`;
      }
      if (window.TRACH_NHAT_DATA.TAM_SAT_TOI_KY && window.TRACH_NHAT_DATA.TAM_SAT_TOI_KY.length > 5) {
        tsToiKyStr = `<strong>T\u1ED1i K\u1EF5:</strong> ${rutGonHuong(window.TRACH_NHAT_DATA.TAM_SAT_TOI_KY)}`;
      }
    }
    const elTsNam = document.getElementById("main-txt-tam-sat-nam");
    if (elTsNam) elTsNam.innerHTML = tsNamStr;
    const elTsThang = document.getElementById("main-txt-tam-sat-thang");
    if (elTsThang) elTsThang.innerHTML = tsThangStr;
    const elTsToiKy = document.getElementById("main-txt-tam-sat-toi-ky");
    if (elTsToiKy) elTsToiKy.innerHTML = tsToiKyStr;

    // 15. Hung Niên (Row 30)
    let tTueVal = chiNam;
    let tPhaVal = CHI[(CHI.indexOf(chiNam) + 6) % 12];
    let hoangVal = "Đ. Bắc";
    let hacVal = "Tây";
    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.HUNG_NIEN && window.TRACH_NHAT_DATA.HUNG_NIEN[chiNam]) {
      const hn = window.TRACH_NHAT_DATA.HUNG_NIEN[chiNam];
      tTueVal = hn.tTue || tTueVal;
      tPhaVal = hn.tPha || tPhaVal;
      hoangVal = rutGonHuong(hn.hoang || hoangVal);
      hacVal = rutGonHuong(hn.hac || hacVal);
    }
    const elTTue = document.getElementById("main-txt-t-tue");
    if (elTTue) elTTue.innerText = tTueVal;
    const elTPha = document.getElementById("main-txt-t-pha");
    if (elTPha) elTPha.innerText = tPhaVal;
    const elHoang = document.getElementById("main-txt-hoang");
    if (elHoang) elHoang.innerText = rutGonHuong(hoangVal);
    const elHac = document.getElementById("main-txt-hac");
    if (elHac) elHac.innerText = rutGonHuong(hacVal);

    // 16. Cát Hung Phương - Hướng Thần (Row 31 - Chuẩn Thiết Kế 2 Hàng)
    const HY_THAN_CAN = {
      "Giáp": "Đ. Bắc",
      "Ất": "T. Bắc",
      "Bính": "T. Nam",
      "Đinh": "Chính Nam",
      "Mậu": "Đ. Nam",
      "Kỷ": "Đ. Bắc",
      "Canh": "T. Bắc",
      "Tân": "T. Nam",
      "Nhâm": "Chính Nam",
      "Quý": "Đ. Nam"
    };

    let hyVal = HY_THAN_CAN[canNgay] || "Đ. Bắc";
    let taiVal = "T. Nam";
    let quyVal = "Đ. Bắc - T. Nam";
    let hacThanVal = "Chính Bắc";

    if (window.TRACH_NHAT_DATA && window.TRACH_NHAT_DATA.CAT_HUNG_PHUONG && window.TRACH_NHAT_DATA.CAT_HUNG_PHUONG[canChiNgay]) {
      const ch = window.TRACH_NHAT_DATA.CAT_HUNG_PHUONG[canChiNgay];
      if (ch.hy && ch.hy.trim()) hyVal = rutGonHuong(ch.hy);
      if (ch.tai && ch.tai.trim()) taiVal = rutGonHuong(ch.tai);
      if (ch.quy && ch.quy.trim()) quyVal = rutGonHuong(ch.quy);
      if (ch.hac && ch.hac.trim()) hacThanVal = rutGonHuong(ch.hac);
    }
    const elHyThan = document.getElementById("main-txt-hy-than");
    if (elHyThan) elHyThan.innerText = rutGonHuong(hyVal);
    const elTaiThan = document.getElementById("main-txt-tai-than");
    if (elTaiThan) elTaiThan.innerText = rutGonHuong(taiVal);
    const elQuyThan = document.getElementById("main-txt-quy-than");
    if (elQuyThan) elQuyThan.innerText = rutGonHuong(quyVal);
    const elHacThan = document.getElementById("main-txt-hac-than");
    if (elHacThan) elHacThan.innerText = rutGonHuong(hacThanVal);

    // Cập nhật nhãn phụ cho bộ chọn ngày Lịch Vạn Sự mới
    const elSubNgay = document.getElementById("lvs-picker-sub-ngay");
    if (elSubNgay) elSubNgay.textContent = `(Tháng ${m})`;
    const elSubThang = document.getElementById("lvs-picker-sub-thang");
    if (elSubThang) elSubThang.textContent = `(Năm ${y})`;
    const elSubNam = document.getElementById("lvs-picker-sub-nam");
    if (elSubNam) elSubNam.textContent = `(${canChiNam})`;

    // 17. CẬP NHẬT ĐỘNG KHỐI TỔNG QUAN NGÀY (HÀNG DƯỚI CÙNG TRANG CHỦ)
    const elTongQuanNgay = document.getElementById("main-txt-tong-quan-ngay");
    if (elTongQuanNgay) {
      const listGioTot = gioData && gioData.hoangDaoStr
        ? gioData.hoangDaoStr.split("&nbsp;&nbsp; - &nbsp;&nbsp;").map(s => s.split(" ")[0].trim()).filter(Boolean)
        : [];
      const strGioTot = listGioTot.length > 0 ? listGioTot.join(", ") : "Dần, Thìn, Tị, Thân, Dậu, Hợi";
      const kyTuoiClean = kyTuoiStr ? kyTuoiStr.replace(/<[^>]*>/g, "").replace(/^Tuổi kỵ:\s*/i, "").replace(/^Kỵ tuổi:\s*/i, "").trim() : "";

      let danhGiaNgay = "";
      if (daoNgay && daoNgay.isHoangDao) {
        danhGiaNgay = `là ngày Hoàng Đạo - ${daoNgay.ten}, cát lành và thuận lợi cho việc xuất hành, giao dịch, mưu sự và tế tự.`;
      } else if (daoNgay) {
        danhGiaNgay = `là ngày Hắc Đạo - ${daoNgay.ten}, không quá tốt cũng không quá xấu, nên cẩn trọng khi khởi sự việc lớn.`;
      } else {
        danhGiaNgay = `là ngày bình hòa, nên ưu tiên các việc hợp tuổi, hợp giờ tốt.`;
      }

      let khuyenNen = nenLamStr && nenLamStr !== "Khởi sự việc lớn, tế tự cầu phúc, giải hạn, kiện tụng giải oan."
        ? `Nên ưu tiên: ${nenLamStr}. `
        : "Nên ưu tiên các việc hợp tuổi, hợp giờ tốt; ";
      let khuyenTranh = kiengCuStr && kiengCuStr !== "Xuất hành đường dài, động thổ xây dựng, cưới hỏi, an táng."
        ? `Tránh / kiêng cữ: ${kiengCuStr}. `
        : "tránh các việc lớn, khai trương, cưới hỏi nếu phạm ngày kỵ. ";

      const tsThangClean = tsThangStr ? tsThangStr.replace(/<[^>]*>/g, "").trim() : "phương vị xấu";

      let tqText = `Ngày ${lDay}/${lMonth} Âm lịch (${solarFullStr}) ${danhGiaNgay} `
        + `${khuyenNen}${khuyenTranh}`
        + `Giờ tốt trong ngày là ${strGioTot}. `
        + `Các tuổi kỵ: ${kyTuoiClean || (chiXung + ' (tương xung)')}. `
        + `Cần lưu ý hướng Tam Sát (${tsThangClean}), kiêng các việc phạm tuổi, phạm ngày và tránh động công lớn.`;

      elTongQuanNgay.textContent = tqText;
    }
  }

  window.khoiTaoBoChonNgayMain = function() {
    const selNgay = document.getElementById("main-selNgay");
    const selThang = document.getElementById("main-selThang");
    const selNam = document.getElementById("main-selNam");
    if (!selNgay || !selThang || !selNam) return;

    const now = new Date();
    const curD = now.getDate();
    const curM = now.getMonth() + 1;
    const curY = now.getFullYear();

    selNgay.innerHTML = "";
    for (let d = 1; d <= 31; d++) {
      const sel = (d === curD) ? " selected" : "";
      selNgay.innerHTML += `<option value="${d}"${sel}>Ngày ${d}</option>`;
    }

    selThang.innerHTML = "";
    for (let m = 1; m <= 12; m++) {
      const sel = (m === curM) ? " selected" : "";
      selThang.innerHTML += `<option value="${m}"${sel}>Tháng ${m}</option>`;
    }

    selNam.innerHTML = "";
    for (let y = 1950; y <= 2050; y++) {
      const sel = (y === curY) ? " selected" : "";
      selNam.innerHTML += `<option value="${y}"${sel}>Năm ${y}</option>`;
    }

    selNgay.value = curD;
    selThang.value = curM;
    selNam.value = curY;
  };

  window.xuLyChonNgayMain = function() {
    const selNgay = document.getElementById("main-selNgay");
    const selThang = document.getElementById("main-selThang");
    const selNam = document.getElementById("main-selNam");
    if (!selNgay || !selThang || !selNam) return;

    const radioChecked = document.querySelector('input[name="loaiLichMain"]:checked');
    const loaiLich = radioChecked ? radioChecked.value : "duong";

    let d = parseInt(selNgay.value, 10);
    let m = parseInt(selThang.value, 10);
    let y = parseInt(selNam.value, 10);

    if (loaiLich === "am") {
      const solar = convertLunar2Solar(d, m, y, 0, 7.0);
      d = solar[0];
      m = solar[1];
      y = solar[2];
    }

    chayTrachNhatMain(d, m, y);
    if (typeof window.canChinhChanLich === "function") {
      window.canChinhChanLich();
      setTimeout(window.canChinhChanLich, 50);
      setTimeout(window.canChinhChanLich, 200);
    }
  };

  window.chonHomNayMain = function(offsetDays = 0) {
    const target = new Date();
    target.setDate(target.getDate() + offsetDays);
    const radDuong = document.querySelector('input[name="loaiLichMain"][value="duong"]');
    if (radDuong) radDuong.checked = true;

    const selNgay = document.getElementById("main-selNgay");
    const selThang = document.getElementById("main-selThang");
    const selNam = document.getElementById("main-selNam");
    if (selNgay && selThang && selNam) {
      selNgay.value = target.getDate();
      selThang.value = target.getMonth() + 1;
      selNam.value = target.getFullYear();
    }
    window.xuLyChonNgayMain();
  };

  // =========================================================================
  // LOGIC TAB CHUYÊN MỤC & MODAL ĐỌC BÀI VIẾT
  // =========================================================================
  let tabCmCurrentCategory = "all";
  let tabCmCurrentSubCategory = null;
  let tabCmCurrentSearch = "";

  const CM_SUB_CATEGORIES = {
    "Kiến Thức": [
      "Tử Vi Đẩu Số",
      "Kinh Dịch",
      "Bát Tự – Tứ Trụ",
      "Âm Dương - Ngũ Hành",
      "Lịch Pháp",
      "Các Thuật Số Khác",
      "Xem Bói Sim"
    ],
    "Tâm Linh": [
      "Tín Ngưỡng Dân Gian",
      "Thờ Cúng",
      "Chùa – Đền – Phủ – Miếu",
      "Điềm Báo Dân Gian",
      "Tâm Linh Trong Đời Sống",
      "Chuyện Tâm Linh"
    ],
    "Lễ Nghi": [
      "Lễ Tết",
      "Lễ Gia Đình",
      "Nghi Lễ Nhà Cửa",
      "Cưới Hỏi",
      "Tang Lễ",
      "Văn Khấn",
      "Lễ Vật"
    ],
    "Phong Thủy": [
      "Địa Lý Phong Thủy Âm Trạch",
      "Địa Lý Phong Thủy Dương Trạch",
      "Phong Thủy Nhà Ở",
      "Phong Thủy Phòng Ngủ",
      "Phong Thủy Phòng Khách",
      "Phong Thủy Phòng Bếp",
      "Phong Thủy Bàn Thờ",
      "Phong Thủy Đất đai",
      "Phong Thủy Theo Tuổi",
      "Phong Thủy Vật Phẩm",
      "Phong Thủy Kinh Doanh"
    ],
    "Tử Vi": [
      "Xem tử vi hàng ngày",
      "Xem tử vi hàng tuần",
      "Xem tử vi hàng tháng",
      "Xem tử vi trọn đời",
      "Xem vận hạn tử vi",
      "Cân xương đoán số",
      "Tử Vi & Xông Đất Đầu Năm",
      "Tử Vi 2026",
      "Xông Đất Đầu Năm 2026"
    ],
    "Xem Ngày": [
      "XEM NGÀY TỐT",
      "Xem ngày mua xe",
      "Xem ngày xuất hành",
      "Xem ngày tốt kết hôn",
      "Xem ngày hoàng đạo",
      "Xem ngày động thổ",
      "Xem ngày tốt xây dựng",
      "Xem ngày đổ trần, lợp mái",
      "Xem ngày nhập trạch nhà mới",
      "Xem ngày mua nhà",
      "Xem ngày khai trương",
      "Xem ngày ký hợp đồng",
      "Xem ngày tốt nhận chức",
      "Xem ngày an táng"
    ],
    "Xem Tuổi": [
      "Xem tuổi vợ chồng",
      "Xem tuổi sinh con",
      "Xem tuổi kết hôn",
      "Xem tuổi hợp nhau",
      "Xem tuổi làm nhà",
      "Xem tuổi mua nhà",
      "Xem tuổi làm ăn",
      "Xem hướng nhà hợp tuổi"
    ],
    "Tướng Số": [
      "Tướng Số Nhân Tướng",
      "Diện Tướng",
      "Tướng Mạo & Tam Đình",
      "Tướng Đi & Thanh Âm",
      "Ca Dao Tục Ngữ Xem Tướng",
      "Xem Tướng Chỉ Tay",
      "Xem Tướng Nốt Ruồi",
      "Khí Sắc & Thần Khí"
    ]
  };

  function findParentCategory(subCat) {
    if (!subCat) return null;
    const subClean = subCat.trim().toLowerCase();
    for (const [parent, subs] of Object.entries(CM_SUB_CATEGORIES)) {
      if (parent.toLowerCase() === subClean) return parent;
      if (subs.some(s => s.toLowerCase() === subClean || subClean.includes(s.toLowerCase()) || s.toLowerCase().includes(subClean))) {
        return parent;
      }
    }
    return null;
  }

  function parseDateVN(str) {
    if (!str) return 0;
    if (typeof str !== "string") {
      if (str instanceof Date) return str.getTime();
      return Number(str) || 0;
    }
    const s = str.trim();
    const matchDMY = s.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
    if (matchDMY) {
      const d = parseInt(matchDMY[1], 10);
      const m = parseInt(matchDMY[2], 10) - 1;
      const y = parseInt(matchDMY[3], 10);
      return new Date(y, m, d).getTime();
    }
    const matchYMD = s.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
    if (matchYMD) {
      const y2 = parseInt(matchYMD[1], 10);
      const m2 = parseInt(matchYMD[2], 10) - 1;
      const d2 = parseInt(matchYMD[3], 10);
      return new Date(y2, m2, d2).getTime();
    }
    const t = new Date(s).getTime();
    return isNaN(t) ? 0 : t;
  }

  function getSortedArticles() {
    // Tự động xóa sạch mọi cookie lỗi thời hoặc bên thứ ba để đảm bảo không bị xung đột
    try {
      if (typeof document !== "undefined" && document.cookie) {
        document.cookie.split(";").forEach(function(c) {
          var eq = c.indexOf("=");
          var name = eq > -1 ? c.substring(0, eq).trim() : c.trim();
          if (name) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=" + window.location.pathname;
          }
        });
      }
    } catch(e) {}

    // LUÔN NẠP TRỌN VẸN TOÀN BỘ KHO GỐC TRƯỚC (ĐẢM BẢO 100% ĐẦY ĐỦ TẤT CẢ CHUYÊN MỤC VÀ KHÔNG BỊ MẤT BÀI)
    const masterMap = {};
    const fallbackMaster = window.ORIGINAL_RECOVERED_ARTICLES_BACKUP || window.DEFAULT_RECOVERED_ARTICLES_FALLBACK;
    if (fallbackMaster) {
      ["TUVI_BAI_VIET_CUSTOM", "XEMNGAY_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM", "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM", "TUONGSO_BAI_VIET_CUSTOM", "BAI_VIET_CHUYEN_MUC_CUSTOM"].forEach(function(k) {
        var fbList = fallbackMaster[k];
        if (Array.isArray(fbList)) {
          fbList.forEach(p => {
            if (p && p.id) masterMap[p.id] = p;
          });
        }
      });
    }

    // SAU ĐÓ GHI ĐÈ BẤT KỲ BÀI VIẾT NÀO ĐÃ ĐƯỢC CHỈNH SỬA / LƯU MỚI TỪ LOCALSTORAGE
    ["BAI_VIET_CHUYEN_MUC_CUSTOM", "XEMNGAY_BAI_VIET_CUSTOM", "TUVI_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM", "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM", "TUONGSO_BAI_VIET_CUSTOM"].forEach(function(k) {
      try {
        var stored = localStorage.getItem(k);
        if (stored) {
          var list = JSON.parse(stored);
          if (Array.isArray(list)) {
            list.forEach(p => {
              if (p && p.id) {
                var nowMax = Date.now() + 60000;
                var pUp = Number(p.updatedAt) || 0;
                var mUp = Number(masterMap[p.id] ? masterMap[p.id].updatedAt : 0) || 0;
                if (pUp > nowMax) pUp = 0;
                if (mUp > nowMax) mUp = 0;
                if (!masterMap[p.id] || pUp >= mUp) {
                  masterMap[p.id] = p;
                }
              }
            });
          }
        }
      } catch(e) {}
    });

    let customPosts = Object.values(masterMap);

    // Đồng bộ tác giả bài viết trong localStorage về Thầy Duy Tâm Phúc
    ["BAI_VIET_CHUYEN_MUC_CUSTOM", "XEMNGAY_BAI_VIET_CUSTOM", "TUVI_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM", "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM", "TUONGSO_BAI_VIET_CUSTOM"].forEach(function(k) {
      try {
        var arr = JSON.parse(localStorage.getItem(k) || "[]");
        if (Array.isArray(arr) && arr.length > 0) {
          var changed = false;
          arr.forEach(function(item) {
            if (item && item.tacGia !== "Thầy Duy Tâm Phúc") {
              item.tacGia = "Thầy Duy Tâm Phúc";
              changed = true;
            }
                        if (item && (item.id === "tuvi-tron-doi-giai-ma-menh-than" || item.id === "post-tu-vi-tron-doi-12-con-giap-1699" || (item.tieuDe && item.tieuDe.indexOf("Tá»¬ VI TRá»ŒN Äá»œI") !== -1))) {
              item.chuyenMuc = "Xem tá»­ vi trá»n Ä‘á»i";
              item.hinhAnh = "áº¢nh BÃ i Viáº¿t Khung 16-9/Tá»­ Vi Trá»n Äá»i.png";
              changed = true;
            }
            if (item && item.id === "post-tu-vi-tron-doi-12-con-giap-1699") {
              if (item.chuyenMuc !== "Tử Vi") {
                item.chuyenMuc = "Tử Vi";
                changed = true;
              }
              if (Number(item.updatedAt) <= 1791277679597) {
                item.updatedAt = 1791288888888;
                changed = true;
              }
              if (!item.hinhAnh || item.hinhAnh.indexOf("banner_tu_vi_tong_quan") !== -1 || item.hinhAnh.indexOf("phongthuy_coxua") !== -1) {
                item.hinhAnh = "assets/images/banner_tuvi_tron_doi_12_con_giap.png";
                changed = true;
              }
            }
            if (item && (item.id === "post-ly-tinh-cua-sao-tu-vi-1639" || item.id === "bai-luc-thap-tinh-he-tu-vi" || (item.tieuDe && item.tieuDe.indexOf("LÝ TÍNH") !== -1))) {
              if (!item.hinhAnh || item.hinhAnh.indexOf("banner_tu_vi_tong_quan") !== -1 || item.hinhAnh.indexOf("phongthuy_coxua") !== -1) {
                item.hinhAnh = "Ảnh Bài Viết Khung 16-9/Sao Tử Vi.png";
                changed = true;
              }
            }
            if (item && item.hinhAnh && item.hinhAnh.indexOf("banner_tu_vi_tong_quan") !== -1) {
              item.hinhAnh = "assets/images/banner_tuvi_tron_doi_12_con_giap.png";
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(k, JSON.stringify(arr));
          }
        }
      } catch(e) {}
    });

    let hiddenIds = [];
    try {
      const h = localStorage.getItem("BAI_VIET_HIDDEN_IDS");
      if (h) hiddenIds = hiddenIds.concat(JSON.parse(h));
      const hXN = localStorage.getItem("XEMNGAY_HIDDEN_IDS");
      if (hXN) hiddenIds = hiddenIds.concat(JSON.parse(hXN));
      const hXT = localStorage.getItem("XEMTUOI_HIDDEN_IDS");
      if (hXT) hiddenIds = hiddenIds.concat(JSON.parse(hXT));
      const hTV = localStorage.getItem("TUVI_HIDDEN_IDS");
      if (hTV) hiddenIds = hiddenIds.concat(JSON.parse(hTV));
      const hTL = localStorage.getItem("TAMLINH_HIDDEN_IDS");
      if (hTL) hiddenIds = hiddenIds.concat(JSON.parse(hTL));
      const hPT = localStorage.getItem("PHONGTHUY_HIDDEN_IDS");
      if (hPT) hiddenIds = hiddenIds.concat(JSON.parse(hPT));
      const hKT = localStorage.getItem("KIENTHUC_HIDDEN_IDS");
      if (hKT) hiddenIds = hiddenIds.concat(JSON.parse(hKT));
      const hTS = localStorage.getItem("TUONGSO_HIDDEN_IDS");
      if (hTS) hiddenIds = hiddenIds.concat(JSON.parse(hTS));
    } catch (e) {}

    const unwantedPostIds = new Set([
      "bai-kham-thien-thien-tuong",
      "sao-that-sat-trong-tu-vi-dau-so",
      "sao-pha-quan-trong-tu-vi-dau-so",
      "sao-tham-lang-trong-tu-vi-dau-so",
      "bai-viet-moi-cua-ban",
      "post-trach-nhat-la-gi-nguyen-tac-chon-ng-mulpzbi0",
      "tuvi-post-ban-ve-sao-khong-kiep-mvary3y7"
    ]);

    let defaultPosts = []; // Đã hợp nhất trọn vẹn 45 bài chuẩn vào window.ORIGINAL_RECOVERED_ARTICLES_BACKUP


    const hiddenSet = new Set(hiddenIds.filter(id => !["tuvi-ngay-12-con-giap", "tuvi-thang-nguyet-lenh", "xem-ngay-xuat-hanh-hanh-thong", "xem-ngay-xuat-hanh"].includes(id)));
    const combined = [];
    const ids = new Set();

    // Gom toàn bộ ảnh thực tế từ các bài viết (Base64, banner, art do người dùng upload/cập nhật)
    const realImgById = {};
    const realImgByTitle = {};
    function isRealImg(img) {
      if (!img || typeof img !== 'string') return false;
      const s = img.trim();
      if (!s || s === 'undefined' || s === 'null') return false;
      if (s.includes("phongthuy_coxua") || s.includes("banner_tu_vi_tong_quan")) return false;
      if (s.startsWith("data:image/") || s.startsWith("blob:") || s.startsWith("http://") || s.startsWith("https://")) return true;
      if (/\.(png|jpe?g|webp|gif|svg|bmp)(\?.*)?$/i.test(s)) return true;
      return s.includes("assets/") || s.includes("images/") || s.includes("Khung 16-9") || s.length > 30;
    }

    customPosts.forEach(item => {
      if (!item) return;
      const img = (item.hinhAnh || '').trim();
      if (isRealImg(img)) {
        if (item.id) realImgById[item.id] = img;
        if (item.tieuDe) realImgByTitle[item.tieuDe.trim().toLowerCase()] = img;
      }
    });

    (window.TUVI_BAI_VIET_DATA || []).forEach(d => {
      if (d && isRealImg(d.hinhAnh)) {
        if (d.id && !realImgById[d.id]) realImgById[d.id] = d.hinhAnh;
        if (d.tieuDe && !realImgByTitle[d.tieuDe.trim().toLowerCase()]) {
          realImgByTitle[d.tieuDe.trim().toLowerCase()] = d.hinhAnh;
        }
      }
    });
    (window.XEMNGAY_BAI_VIET_DATA || []).forEach(d => {
      if (d && isRealImg(d.hinhAnh)) {
        if (d.id && !realImgById[d.id]) realImgById[d.id] = d.hinhAnh;
        if (d.tieuDe && !realImgByTitle[d.tieuDe.trim().toLowerCase()]) {
          realImgByTitle[d.tieuDe.trim().toLowerCase()] = d.hinhAnh;
        }
      }
    });
    (window.XEMTUOI_BAI_VIET_DATA || []).forEach(d => {
      if (d && isRealImg(d.hinhAnh)) {
        if (d.id && !realImgById[d.id]) realImgById[d.id] = d.hinhAnh;
        if (d.tieuDe && !realImgByTitle[d.tieuDe.trim().toLowerCase()]) {
          realImgByTitle[d.tieuDe.trim().toLowerCase()] = d.hinhAnh;
        }
      }
    });
    (window.BAI_VIET_CHUYEN_MUC || []).forEach(d => {
      if (d && isRealImg(d.hinhAnh)) {
        if (d.id && !realImgById[d.id]) realImgById[d.id] = d.hinhAnh;
        if (d.tieuDe && !realImgByTitle[d.tieuDe.trim().toLowerCase()]) {
          realImgByTitle[d.tieuDe.trim().toLowerCase()] = d.hinhAnh;
        }
      }
    });
    (window.TAMLINH_LENGHI_DATA || []).forEach(d => {
      if (d && isRealImg(d.hinhAnh)) {
        if (d.id && !realImgById[d.id]) realImgById[d.id] = d.hinhAnh;
        if (d.tieuDe && !realImgByTitle[d.tieuDe.trim().toLowerCase()]) {
          realImgByTitle[d.tieuDe.trim().toLowerCase()] = d.hinhAnh;
        }
      }
    });

    function resolveImg(post) {
      if (!post) return '';

      // 1. Nếu bài viết không có ảnh, tuyệt đối không ép ảnh mặc định
      if (post.hinhAnh === "" || (typeof post.hinhAnh === 'string' && post.hinhAnh.trim() === '')) {
        return '';
      }

      // 2. ƯU TIÊN SỐ 1 TUYỆT ĐỐI: Ảnh do người dùng tự lưu/cập nhật từ trang viết bài
      const img = (post.hinhAnh || '').trim();
      if (img && img.length > 3 && isRealImg(img)) return img;

      // 3. Tra cứu theo ID nếu bài viết chuẩn đã có ảnh hợp lệ trong kho
      if (post.id && realImgById[post.id]) return realImgById[post.id];

      // 4. Tra cứu theo tiêu đề chính xác
      if (post.tieuDe) {
        const normT = post.tieuDe.trim().toLowerCase();
        if (realImgByTitle[normT]) return realImgByTitle[normT];
        for (const k in realImgByTitle) {
          if (normT.includes(k) || k.includes(normT)) return realImgByTitle[k];
        }
      }

      return '';
    }
    window.resolveArticleImageHelper = resolveImg;

    const backupMaster = window.ORIGINAL_RECOVERED_ARTICLES_BACKUP || window.DEFAULT_RECOVERED_ARTICLES_FALLBACK;
    const backupMapAll = {};
    if (backupMaster) {
      ["TUVI_BAI_VIET_CUSTOM", "XEMNGAY_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM", "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM", "TUONGSO_BAI_VIET_CUSTOM", "BAI_VIET_CHUYEN_MUC_CUSTOM"].forEach(k => {
        const bData = backupMaster[k];
        const list = (bData && (bData.value || (Array.isArray(bData) ? bData : []))) || [];
        list.forEach(item => {
          if (item && item.id) backupMapAll[item.id] = item;
        });
      });
    }

    const customMap = {};
    customPosts.forEach(p => {
      if (p && p.id) {
        if (p.id === "tuvi-ngay-12-con-giap") {
          const cm = (p.chuyenMuc || "").toLowerCase();
          const tt = (p.tieuDe || "").toLowerCase();
          const nd = (p.noiDung || p.tomTat || "").toLowerCase();
          if ((cm.indexOf("xem ngày") !== -1 && cm.indexOf("tử vi") === -1) ||
              tt.indexOf("ngày lành tháng tốt") !== -1 ||
              (nd.indexOf("trạch nhật") !== -1 && nd.indexOf("12 con giáp") === -1)) {
            return;
          }
        }
        if (p.id === "post-trach-nhat-la-gi-nguyen-tac-chon-ng-mulpzbi0" || 
            (p.id.indexOf("trach-nhat") !== -1 && ((p.tieuDe || "").indexOf("?") !== -1 || (p.tieuDe || "").indexOf("\uFFFD") !== -1))) {
          return;
        }

        // Tự động nâng cấp nếu bản chuẩn vật lý trên PC dài hơn bản cookie/localStorage của máy
        // TUYỆT ĐỐI KHÔNG GHI ĐÈ nếu bài viết đã được người dùng chỉnh sửa (updatedAt > 1792020983905)
        if (backupMapAll[p.id]) {
          const bRef = backupMapAll[p.id];
          const isUserEdited = (Number(p.updatedAt) || 0) > 1792020983905;
          if (!isUserEdited && bRef.noiDung && (!p.noiDung || bRef.noiDung.length > (p.noiDung.length + 100))) {
            p.noiDung = bRef.noiDung;
            p.tomTat = bRef.tomTat || p.tomTat;
            p.tieuDe = bRef.tieuDe || p.tieuDe;
          }
        }

        p.hinhAnh = resolveImg(p);
        if (!customMap[p.id] || (Number(p.updatedAt) || 0) >= (Number(customMap[p.id].updatedAt) || 0)) {
          if (!isRealImg(p.hinhAnh) && customMap[p.id] && isRealImg(customMap[p.id].hinhAnh)) {
            p.hinhAnh = customMap[p.id].hinhAnh;
          }
          customMap[p.id] = p;
        }
      }
    });

    Object.values(customMap).forEach(p => {
      if (!p || !p.id || hiddenSet.has(p.id) || unwantedPostIds.has(p.id)) return;
      if (p.chuyenMuc && (p.chuyenMuc.includes("Âm Dương – Can Chi") || p.chuyenMuc.includes("Âm Dương - Can Chi"))) {
        p.chuyenMuc = "Âm Dương - Ngũ Hành";
      }
      p.hinhAnh = resolveImg(p);
      combined.push(p);
      ids.add(p.id);
    });

    defaultPosts.forEach(p => {
      if (p && p.id && !ids.has(p.id) && !hiddenSet.has(p.id) && !unwantedPostIds.has(p.id)) {
        p = Object.assign({}, p, { hinhAnh: resolveImg(p) });
        combined.push(p);
        ids.add(p.id);
      }
    });

    combined.sort((a, b) => {
      const upA = Number(a.updatedAt) || 0;
      const upB = Number(b.updatedAt) || 0;
      if (upA && upB && upA !== upB) return upB - upA;
      if (upA && !upB) return -1;
      if (!upA && upB) return 1;

      const dateA = parseDateVN(a.ngayDang);
      const dateB = parseDateVN(b.ngayDang);
      if (dateB !== dateA) return dateB - dateA;

      const uA = typeof a.uuTienFeed === "number" ? a.uuTienFeed : 99;
      const uB = typeof b.uuTienFeed === "number" ? b.uuTienFeed : 99;
      if (uA !== uB) return uA - uB;
      return 0;
    });

    combined.forEach(p => {
      if (p) p.tacGia = "Thầy Duy Tâm Phúc";
    });

    return combined;
  }

  function formatArticleContentForModal(raw) {
    if (!raw) return "";
    let str = raw.trim();

    const upperVN = "[A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]";
    const lowerVN = "[a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]";
    const splitRegex = new RegExp(`^((?:(?:Phần|Mục|Bài|Chương)\\s*(?:\\d{1,2}|[IVXLCDM]{1,6})[.:\\-\\/]?|\\d{1,2}[.:\\-\\/]|[IVXLCDM]{1,6}[.:\\-\\/\\)])\\s+[\\s\\S]{2,50}?${lowerVN})(?=${upperVN}${lowerVN})`, "u");

    function preprocessSquashedContent(inputStr) {
      if (!inputStr) return "";
      let s = inputStr.replace(/([.!?…])\s*(?=(?:(?:Phần|Mục|Bài|Chương)\s*(?:\\d{1,2}|[IVXLCDM]{1,6})[.:\\-\\/]?|\\d{1,2}[.:\\-\\/]|[IVXLCDM]{1,6}[.:\\-\\/\\)]|[A-Z][.:\\-\\)])\\s+[\p{L}])/gu, '$1\n\n');
      const rawLines = s.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const outLines = [];
      for (const line of rawLines) {
        if (/^(?:(?:Phần|Mục|Bài|Chương)\s*(?:\\d{1,2}|[IVXLCDM]{1,6})[.:\\-\\/]?|\\d{1,2}[.:\\-\\/]|[IVXLCDM]{1,6}[.:\\-\\/\\)])\s+[\p{L}0-9]/u.test(line)) {
          const m = line.match(splitRegex);
          if (m && m[1]) {
            const titlePart = m[1].trim();
            const bodyPart = line.substring(m[1].length).trim();
            outLines.push(titlePart);
            if (bodyPart) outLines.push(bodyPart);
            continue;
          }
        }
        outLines.push(line);
      }
      return outLines.join('\n\n');
    }

    str = preprocessSquashedContent(str);

    // Nhận diện dòng tiêu đề lớn / tiêu đề con giáp / tiêu đề các phần 1 tới 20 / số La Mã I, II, III (17px nâu đỏ #7A1414)
    function isHeadingLine(clean) {
      if (!clean || clean.length > 95) return false;
      // Không phải các đầu mục phân tích thông thường có dấu hai chấm đầu dòng
      if (/^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận|\d+\.\s*(?:Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận)):/iu.test(clean)) {
        return false;
      }
      // Tiêu đề con giáp: chứa TUỔI TÝ, TUỔI SỬU, ... (viết hoa hoặc dạng tiêu đề, có thể đi kèm emoji hoặc số thứ tự)
      if (/(?:TUỔI|Tuổi)\s+(?:TÝ|SỬU|DẦN|MÃO|MẸO|THÌN|TỴ|NGỌ|MÙI|THÂN|DẬU|TUẤT|HỢI)(?:[^\p{L}]|$)/u.test(clean)) {
        if (!/[.!?]$/.test(clean) || clean.length < 55) return true;
      }
      // Dạng: [emoji/số] [TIÊU ĐỀ VIẾT HOA / TIÊU ĐỀ MỤC]
      if (/^(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\d{1,2}\.)\s*[0-9]{0,2}\.?\s*[\p{L}\s–—\-]{4,}$/u.test(clean) && clean.length <= 80) {
        if (!/[.!?…]$/.test(clean)) return true;
      }
      // Dạng số La Mã (I., II., III., I), II), Phần I, Mục II...): Cỡ chữ chuẩn 17px nâu đỏ
      if (/^(?:[IVXLCDM]{1,6}[.:\-\)\/]|(?:Phần|Mục|Bài|Chương)\s+[IVXLCDM]{1,6}[.:\-\)\/]?)\s+[\p{L}0-9]/u.test(clean)) {
        return true;
      }
      // Dạng chữ cái (A., B., C., A), B)...)
      if (/^[A-Z][.:\-\)]\s+[\p{L}0-9]/u.test(clean) && clean.length <= 75) {
        return true;
      }
      // Dạng tiêu đề trong ngoặc kép hoặc độc lập ngắn gọn
      if (/^(?:[“"'][^”"']{5,90}[”"'])$/u.test(clean)) {
        return true;
      }
      // Nhận diện tiêu đề các phần từ 1 tới 20 (hoặc 1 tới 99, Phần 1-20, Mục 1-20...): Cỡ chữ chuẩn 17px
      if (/^(?:(?:Phần|Mục|Bài|Chương)\s*\d{1,2}[.:\-\/]?|\d{1,2}[.:\-\/])\s+[\p{L}0-9]/u.test(clean)) {
        if (!/[!?…]$/.test(clean) || clean.length <= 70) {
          const withoutPrefix = clean.replace(/^(?:(?:Phần|Mục|Bài|Chương)\s*\d{1,2}[.:\-\/]?|\d{1,2}[.:\-\/])\s*/u, '');
          const dotSentenceCount = (withoutPrefix.match(/\.\s+[\p{L}0-9]/gu) || []).length;
          if (dotSentenceCount === 0 && clean.length <= 85) return true;
        }
      }
      return false;
    }

    // Nhận diện tiêu đề con H4 (như 1.1, 1.2, a), b), Tiểu mục 1...)
    function isSubHeading(clean) {
      if (!clean || clean.length > 80) return false;
      if (/^(?:\d{1,2}\.\d{1,2}[.:\-\)]|[a-z]\)[.:\-\)]?|(?:Tiểu mục|Mục con)\s*\d{1,2}[.:\-\/]?)\s+[\p{L}0-9]/u.test(clean)) {
        return true;
      }
      return false;
    }

    // Nhận diện tiêu đề mục thông thường (như "Tầm quan trọng của ngày mua xe trong phong thủy", "Cách chọn ngày giờ mua xe phù hợp")
    function isSectionHeading(clean) {
      if (!clean || clean.length > 80) return false;
      if (isHeadingLine(clean) || isSubHeading(clean)) return false;
      if (/^(?:(?:\d+\.|\*|-|•)\s*)/.test(clean)) return false;
      if (/^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/i.test(clean)) return false;
      if (/[.,:;?!…]$/.test(clean)) return false;
      return true;
    }

    function formatPlainTextToWordHTML(plainText) {
      const rawLines = plainText.split(/\r?\n/).map(l => l.trim());
      const htmlParts = [];
      let currentP = [];

      function flushP() {
        if (currentP.length > 0) {
          const textContent = currentP.join('<br>');
          htmlParts.push(`<p style="font-size: 15.5px; line-height: 1.68; font-weight: normal; text-align: justify; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0 0 12px 0; color: #2C241E;">${textContent}</p>`);
          currentP = [];
        }
      }

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i];
        if (!line) {
          flushP();
          continue;
        }
        if (isHeadingLine(line)) {
          flushP();
          htmlParts.push(`<h3 style="font-size: 18px; font-weight: 700; color: #7A1414; margin: 22px 0 10px 0; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.45; border-left: 4px solid #DFBA73; padding-left: 10px;">${line}</h3>`);
        } else if (isSubHeading(line)) {
          flushP();
          htmlParts.push(`<h4 style="font-size: 16px; font-weight: 700; color: #7A1414; margin: 16px 0 8px 0; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.45;">${line}</h4>`);
        } else if (isSectionHeading(line)) {
          flushP();
          htmlParts.push(`<h3 style="font-size: 18px; font-weight: 700; color: #7A1414; margin: 22px 0 10px 0; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.45; border-left: 4px solid #DFBA73; padding-left: 10px;">${line}</h3>`);
        } else {
          const isListItem = /^(?:(?:\d{1,2}|[a-zA-Z])[.:\-\)]|[•\*\-+–—])\s+/u.test(line) ||
            /^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/iu.test(line);

          let formattedLine = line;
          const colonIdx = line.indexOf(':');
          if (colonIdx > 0 && colonIdx < 65) {
            formattedLine = `<strong>${line.substring(0, colonIdx + 1)}</strong>${line.substring(colonIdx + 1)}`;
          }

          if (isListItem) {
            flushP();
            let nextIdx = i + 1;
            while (nextIdx < rawLines.length && !rawLines[nextIdx]) nextIdx++;
            const nextLine = nextIdx < rawLines.length ? rawLines[nextIdx] : "";
            const nextIsList = nextLine && (
              /^(?:(?:\d{1,2}|[a-zA-Z])[.:\-\)]|[•\*\-+–—])\s+/u.test(nextLine) ||
              /^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/iu.test(nextLine)
            );

            const marginB = nextIsList ? "0 0 5px 0" : "0 0 14px 0";
            const lastClass = nextIsList ? "" : " last-item";
            htmlParts.push(`<p class="article-list-item${lastClass}" style="font-size: 15.5px; line-height: 1.52; font-weight: normal; text-align: justify; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: ${marginB}; color: #2C241E;">${formattedLine}</p>`);
          } else {
            currentP.push(formattedLine);
          }
        }
      }
      flushP();
      return htmlParts.join('\n');
    }

    // Kiểm tra xem bài viết đã có các thẻ cấu trúc HTML chuẩn (p, h1-h6, div, blockquote, li, ul, ol, table, img...)
    const hasStructuredHtml = /<(p|h[1-6]|div|blockquote|li|ul|ol|table|img|iframe|video|audio)\b/i.test(str);

    // CHỈ chuyển đổi từ plain text sang Word HTML khi nội dung THỰC SỰ là văn bản thô (chưa có thẻ HTML cấu trúc nào)
    if (!hasStructuredHtml) {
      let cleanPlain = str
        .replace(/<[^>]+>/g, '');
      cleanPlain = preprocessSquashedContent(cleanPlain);
      return formatPlainTextToWordHTML(cleanPlain);
    }

    let cleanHtml = str
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<xml[\s\S]*?<\/xml>/gi, '')
      .replace(/<meta[\s\S]*?>/gi, '')
      .replace(/<link[\s\S]*?>/gi, '');

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;

    // 0. Gột sạch toàn bộ font-size và font-family rác từ các thẻ con (span, font, strong...) để không bị chữ to chữ nhỏ
    tempDiv.querySelectorAll("span, font, b, strong, i, em, u, a, small, sub, sup").forEach(el => {
      if (el.style) {
        el.style.removeProperty("font-size");
        el.style.removeProperty("font-family");
        if (el.style.lineHeight) el.style.removeProperty("line-height");
      }
      if (el.getAttribute && el.getAttribute("size")) el.removeAttribute("size");
      if (el.getAttribute && el.getAttribute("face")) el.removeAttribute("face");
    });

    // 1. Tháo gỡ các thẻ wrapper b, strong, span bên ngoài bọc các khối p, div
    tempDiv.querySelectorAll("b, strong, span").forEach(wrapper => {
      if (wrapper.querySelector("p, div, h1, h2, h3, h4, h5, h6, table, ul, ol, blockquote")) {
        const parent = wrapper.parentNode;
        if (parent) {
          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
          }
          parent.removeChild(wrapper);
        }
      }
    });

    // 1b. Dọn sạch các thẻ p/div rỗng hoặc chỉ chứa khoảng trắng/br rác
    tempDiv.querySelectorAll("p, div").forEach(el => {
      const text = el.textContent.trim();
      const hasMedia = el.querySelector("img, iframe, video, audio, table");
      if (!text && !hasMedia) {
        el.remove();
      }
    });

    // 1c. Tự động loại bỏ dòng tiêu đề thô từ file Word như "PHẦN 1: TỬ VI 2026", "PHẦN 10: XÔNG ĐẤT ĐẦU NĂM"
    tempDiv.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6").forEach(el => {
      const t = el.textContent.trim();
      if (/^PHẦN\s+\d+[:\s]/i.test(t)) {
        el.remove();
      }
    });

    // 2. Gộp các thẻ p/div danh sách liên tiếp để khoảng cách dãn dòng liền mạch (KHÔNG gộp tiêu đề phần 18px)
    const allBlocks = Array.from(tempDiv.querySelectorAll("p, div"));
    for (let i = 0; i < allBlocks.length; i++) {
      const cur = allBlocks[i];
      if (!cur || !cur.parentNode) continue;
      const txt = cur.textContent.trim();
      if (isHeadingLine(txt)) continue;
      if (/^(?:(?:\d{1,2}|[a-zA-Z])[.:\-\)]|[•\*\-+–—])\s+/u.test(txt) || /^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/iu.test(txt)) {
        let next = cur.nextElementSibling;
        while (next && (next.tagName.toLowerCase() === 'p' || next.tagName.toLowerCase() === 'div')) {
          const nextTxt = next.textContent.trim();
          if (!nextTxt && !next.querySelector("img, iframe, video, audio, table")) {
            const emptyEl = next;
            next = next.nextElementSibling;
            if (emptyEl.parentNode) emptyEl.parentNode.removeChild(emptyEl);
            continue;
          }
          if (isHeadingLine(nextTxt)) break;
          if (/^(?:(?:\d{1,2}|[a-zA-Z])[.:\-\)]|[•\*\-+–—])\s+/u.test(nextTxt) || /^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/iu.test(nextTxt)) {
            cur.innerHTML += '<br>' + next.innerHTML;
            const toRemove = next;
            next = next.nextElementSibling;
            if (toRemove.parentNode) toRemove.parentNode.removeChild(toRemove);
          } else {
            break;
          }
        }
      }
    }

    // 2b. Tách các khối có chứa tiêu đề phần ở đầu theo sau bởi <br> và nội dung
    tempDiv.querySelectorAll("p, div").forEach(el => {
      if (el.querySelector("p, div, h1, h2, h3, h4, h5, h6, table, ul, ol")) return;
      const inner = el.innerHTML;
      if (inner.includes("<br") || inner.includes("<BR")) {
        const parts = inner.split(/<br\s*[\/]?>/i);
        if (parts.length >= 2) {
          const firstPartTemp = document.createElement("div");
          firstPartTemp.innerHTML = parts[0];
          const firstText = firstPartTemp.textContent.trim();
          if (isHeadingLine(firstText)) {
            const h3 = document.createElement("h3");
            h3.style.fontSize = "18px";
            h3.style.fontWeight = "700";
            h3.style.color = "#7A1414";
            h3.style.margin = "22px 0 10px 0";
            h3.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            h3.style.lineHeight = "1.45";
            h3.innerHTML = parts[0];

            // Dọn sạch màu đen bên trong h3
            h3.querySelectorAll("font, span, b, strong").forEach(sub => {
              if (sub.getAttribute("color") === "#2C241E" || sub.getAttribute("color") === "#000000" || sub.style.color === "rgb(44, 36, 30)" || sub.style.color === "rgb(0, 0, 0)") {
                sub.removeAttribute("color");
                sub.style.removeProperty("color");
              }
            });

            const restHtml = parts.slice(1).join('<br>').trim();
            if (restHtml) {
              const restP = document.createElement("p");
              restP.style.fontSize = "15.5px";
              restP.style.lineHeight = "1.68";
              restP.style.textAlign = "justify";
              restP.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
              restP.style.margin = "0 0 12px 0";
              restP.style.color = "#2C241E";
              restP.innerHTML = restHtml;

              el.parentNode.insertBefore(h3, el);
              el.parentNode.insertBefore(restP, el);
              el.parentNode.removeChild(el);
            } else {
              el.parentNode.replaceChild(h3, el);
            }
          }
        }
      }
    });

    tempDiv.querySelectorAll("h1, h2, h3").forEach(h => {
      const hTxt = h.textContent.trim();
      if (hTxt.length > 55) {
        // Tự động phân tách tiêu đề mục ngắn và đoạn văn bản nếu bị dính chùm vào thẻ h3 từ bản Word
        let titlePart = "";
        let bodyPart = "";
        const m = hTxt.match(/^(\d+\.\s*[^\.\n:]{3,45}(?:[:\.]|\s(?=[A-ZÀ-Ỹa-zà-ỹ])))(.*)$/);
        if (m && m[1] && m[2] && m[2].trim().length > 15) {
          titlePart = m[1].trim();
          bodyPart = m[2].trim();
        } else {
          const dotIdx = hTxt.indexOf('.');
          const secondDot = hTxt.indexOf('.', dotIdx + 1);
          if (secondDot > 0 && secondDot < 50) {
            titlePart = hTxt.substring(0, secondDot).trim();
            bodyPart = hTxt.substring(secondDot + 1).trim();
          }
        }
        if (titlePart && bodyPart) {
          const newH3 = document.createElement("h3");
          newH3.textContent = titlePart;
          const newP = document.createElement("p");
          newP.textContent = bodyPart;
          if (h.parentNode) {
            h.parentNode.insertBefore(newH3, h);
            h.parentNode.insertBefore(newP, h);
            h.remove();
            h = newH3;
          }
        }
      }
      h.style.fontSize = "18px";
      h.style.fontWeight = "700";
      h.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      h.style.color = "#7A1414";
      h.style.margin = "22px 0 10px 0";
      h.style.lineHeight = "1.45";
      h.querySelectorAll("font, span, b, strong, p").forEach(sub => {
        if (sub.style) {
          sub.style.removeProperty("color");
          sub.style.removeProperty("font-size");
          sub.style.removeProperty("font-family");
          sub.style.removeProperty("font-weight");
        }
        if (sub.getAttribute && sub.getAttribute("color")) sub.removeAttribute("color");
        if (sub.getAttribute && sub.getAttribute("size")) sub.removeAttribute("size");
        if (sub.getAttribute && sub.getAttribute("face")) sub.removeAttribute("face");
      });
    });

    tempDiv.querySelectorAll("h4, h5, h6").forEach(h => {
      h.style.fontSize = "16px";
      h.style.fontWeight = "700";
      h.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      h.style.color = "#7A1414";
      h.style.margin = "16px 0 8px 0";
      h.style.lineHeight = "1.45";
      h.querySelectorAll("font, span, b, strong, p").forEach(sub => {
        if (sub.style) {
          sub.style.removeProperty("color");
          sub.style.removeProperty("font-size");
          sub.style.removeProperty("font-family");
          sub.style.removeProperty("font-weight");
        }
        if (sub.getAttribute && sub.getAttribute("color")) sub.removeAttribute("color");
        if (sub.getAttribute && sub.getAttribute("size")) sub.removeAttribute("size");
        if (sub.getAttribute && sub.getAttribute("face")) sub.removeAttribute("face");
      });
    });

    tempDiv.querySelectorAll("p, div, li").forEach(el => {
      if (el.tagName.toLowerCase() === "div" && el.querySelector("p, div, h1, h2, h3, h4, h5, h6, table, ul, ol")) {
        return;
      }
      const textContent = el.textContent.trim();
      if (!textContent) return;

      if (isHeadingLine(textContent)) {
        const h3 = document.createElement("h3");
        h3.style.fontSize = "18px";
        h3.style.fontWeight = "700";
        h3.style.color = "#7A1414";
        h3.style.margin = "22px 0 10px 0";
        h3.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        h3.style.lineHeight = "1.45";
        h3.innerHTML = el.innerHTML;
        h3.querySelectorAll("font, span, b, strong, p").forEach(sub => {
          if (sub.style) {
            sub.style.removeProperty("color");
            sub.style.removeProperty("font-size");
            sub.style.removeProperty("font-family");
            sub.style.removeProperty("font-weight");
          }
          if (sub.getAttribute && sub.getAttribute("color")) sub.removeAttribute("color");
          if (sub.getAttribute && sub.getAttribute("size")) sub.removeAttribute("size");
          if (sub.getAttribute && sub.getAttribute("face")) sub.removeAttribute("face");
        });
        if (el.parentNode) el.parentNode.replaceChild(h3, el);
      } else if (isSectionHeading(textContent)) {
        const h3 = document.createElement("h3");
        h3.style.fontSize = "18px";
        h3.style.fontWeight = "700";
        h3.style.color = "#7A1414";
        h3.style.margin = "22px 0 10px 0";
        h3.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        h3.style.lineHeight = "1.45";
        h3.innerHTML = el.innerHTML;
        h3.querySelectorAll("font, span, b, strong, p").forEach(sub => {
          if (sub.style) {
            sub.style.removeProperty("color");
            sub.style.removeProperty("font-size");
            sub.style.removeProperty("font-family");
            sub.style.removeProperty("font-weight");
          }
          if (sub.getAttribute && sub.getAttribute("color")) sub.removeAttribute("color");
          if (sub.getAttribute && sub.getAttribute("size")) sub.removeAttribute("size");
          if (sub.getAttribute && sub.getAttribute("face")) sub.removeAttribute("face");
        });
        if (el.parentNode) el.parentNode.replaceChild(h3, el);
      } else {
        const isListItem = el.tagName.toLowerCase() === 'li' ||
          /^(?:(?:\d{1,2}|[a-zA-Z])[.:\-\)]|[•\*\-+–—])\s+/u.test(textContent) ||
          /^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/iu.test(textContent);

        el.style.fontSize = "15.5px";
        el.style.textAlign = "justify";
        el.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        el.style.color = "#2C241E";
        el.style.fontWeight = "normal";

        if (isListItem) {
          el.classList.add("article-list-item");
          el.style.lineHeight = "1.52";

          let next = el.nextElementSibling;
          while (next && !next.textContent.trim()) {
            next = next.nextElementSibling;
          }
          const nextText = next ? next.textContent.trim() : "";
          const nextIsList = next && (
            next.tagName.toLowerCase() === 'li' ||
            /^(?:(?:\d{1,2}|[a-zA-Z])[.:\-\)]|[•\*\-+–—])\s+/u.test(nextText) ||
            /^(?:Tính cách|Công danh|Tài lộc|Tình duyên|Gia đạo|Sức khỏe|Hậu vận):/iu.test(nextText)
          );

          if (nextIsList) {
            el.style.margin = "0 0 5px 0";
          } else {
            el.classList.add("last-item");
            el.style.margin = "0 0 14px 0";
          }

          // In đậm phần đầu mục trước dấu : nếu chưa in đậm
          const colonIdx = textContent.indexOf(':');
          if (colonIdx > 0 && colonIdx < 65 && !el.querySelector("strong, b")) {
            const raw = el.innerHTML;
            const rawColon = raw.indexOf(':');
            if (rawColon > 0 && rawColon < 90 && !raw.slice(0, rawColon).includes('<')) {
              el.innerHTML = `<strong>${raw.substring(0, rawColon + 1)}</strong>${raw.substring(rawColon + 1)}`;
            }
          }
        } else {
          el.style.lineHeight = "1.68";
          el.style.margin = "0 0 12px 0";
        }

        // Bỏ font-weight bold trên chính thẻ p/div nếu có
        if (el.style) {
          el.style.fontWeight = "normal";
        }

        // Tháo gỡ các thẻ strong, b hoặc span bold nếu bao bọc cả câu/đoạn dài (> 55 ký tự)
        el.querySelectorAll("strong, b, span, font").forEach(inner => {
          const it = inner.textContent.trim();
          // Nếu thẻ in đậm dài hơn 55 ký tự (cả câu hoặc cả đoạn văn), tháo gỡ để trở về chữ thường thanh mảnh như Mẫu Ảnh 2
          if (it.length > 55) {
            if (inner.tagName.toLowerCase() === "strong" || inner.tagName.toLowerCase() === "b") {
              const parent = inner.parentNode;
              if (parent) {
                while (inner.firstChild) {
                  parent.insertBefore(inner.firstChild, inner);
                }
                parent.removeChild(inner);
              }
            } else if (inner.style) {
              if (inner.style.fontWeight === "bold" || inner.style.fontWeight === "700") {
                inner.style.fontWeight = "normal";
              }
            }
          }
          // Dọn sạch màu đen rgb(0,0,0) / #000 để màu chữ đồng bộ chuẩn #2C241E thanh nhã như Mẫu Ảnh 2
          if (inner.style) {
            const c = (inner.style.color || "").toLowerCase().trim();
            if (c === "rgb(0, 0, 0)" || c === "#000" || c === "#000000" || c === "black") {
              inner.style.removeProperty("color");
            }
          }
          if (inner.getAttribute && (inner.getAttribute("color") === "#000000" || inner.getAttribute("color") === "#000" || inner.getAttribute("color") === "black")) {
            inner.removeAttribute("color");
          }
        });
      }
    });

    // Dọn sạch mọi font-size, font-family và màu đen rác còn sót lại trên bất kỳ thẻ con nào trong toàn bộ bài viết
    tempDiv.querySelectorAll("span, font, b, strong, i, em, u, a, small, sub, sup").forEach(el => {
      if (el.style) {
        el.style.removeProperty("font-size");
        el.style.removeProperty("font-family");
        if (el.style.lineHeight) el.style.removeProperty("line-height");
        const c = (el.style.color || "").toLowerCase().trim();
        if (c === "rgb(0, 0, 0)" || c === "#000" || c === "#000000" || c === "black") {
          el.style.removeProperty("color");
        }
      }
      if (el.getAttribute && el.getAttribute("size")) el.removeAttribute("size");
      if (el.getAttribute && el.getAttribute("face")) el.removeAttribute("face");
      if (el.getAttribute && (el.getAttribute("color") === "#000000" || el.getAttribute("color") === "#000" || el.getAttribute("color") === "black")) {
        el.removeAttribute("color");
      }
    });

    return tempDiv.innerHTML;
  }

  let lastModalOpenTime = 0;
  let lastModalOpenId = "";
  window.openArticleModal = function(postId, directPost) {
    let post = directPost;
    const now = Date.now();
    const targetIdStr = String(postId || (directPost && directPost.id) || "");
    if (now - lastModalOpenTime < 250 && lastModalOpenId === targetIdStr) {
      return; // Debounce rapid / duplicate clicks
    }
    lastModalOpenTime = now;
    lastModalOpenId = targetIdStr;

    if (!post) {
      const storages = ["TUVI_BAI_VIET_CUSTOM", "XEMNGAY_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM", "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM", "TUONGSO_BAI_VIET_CUSTOM", "BAI_VIET_CHUYEN_MUC_CUSTOM"];
      let customList = [];
      for (const k of storages) {
        try {
          const list = JSON.parse(localStorage.getItem(k) || "[]");
          if (Array.isArray(list)) customList = customList.concat(list);
        } catch(e) {}
      }
      if (customList.length === 0) {
        const fallbackMaster = window.ORIGINAL_RECOVERED_ARTICLES_BACKUP || window.DEFAULT_RECOVERED_ARTICLES_FALLBACK;
        if (fallbackMaster) {
          for (const k of storages) {
            var fbList = fallbackMaster[k];
            if (Array.isArray(fbList)) {
              customList = customList.concat(fbList);
            }
          }
        }
      }
      customList.sort((a, b) => (Number(b.updatedAt) || 0) - (Number(a.updatedAt) || 0));
      post = customList.find(p => p && p.id === postId);
      if (!post && (postId === "tuvi-can-xuong-tinh-cot" || (postId && postId.includes("can-xuong")))) {
        post = customList.find(p => p && (
          (p.id && (p.id === "tuvi-can-xuong-tinh-cot" || p.id.includes("can-xuong") || p.id.includes("tinh-cot"))) ||
          ((p.chuyenMuc || "").toLowerCase().includes("cân xương")) ||
          ((p.tieuDe || "").toLowerCase().includes("cân xương"))
        ));
      }
    }
    if (!post) {
      const allSorted = getSortedArticles();
      post = allSorted.find(p => p.id === postId);
    }
    if (!post) {
      post = (window.XEMNGAY_BAI_VIET_DATA && window.XEMNGAY_BAI_VIET_DATA.find(p => p.id === postId)) ||
             (window.XEMTUOI_BAI_VIET_DATA && window.XEMTUOI_BAI_VIET_DATA.find(p => p.id === postId)) ||
             (window.TUVI_BAI_VIET_DATA && window.TUVI_BAI_VIET_DATA.find(p => p.id === postId)) ||
             (window.TAMLINH_LENGHI_DATA && window.TAMLINH_LENGHI_DATA.find(p => p.id === postId)) ||
             (window.BAI_VIET_CHUYEN_MUC && window.BAI_VIET_CHUYEN_MUC.find(p => p.id === postId));
    }
    if (!post) {
      const fbSources = [window.ORIGINAL_RECOVERED_ARTICLES_BACKUP, window.DEFAULT_RECOVERED_ARTICLES_FALLBACK, window.DULIEU_CHUYENMUC_MASTER];
      for (const fb of fbSources) {
        if (!fb) continue;
        if (Array.isArray(fb)) {
          post = fb.find(p => p && p.id === postId);
          if (post) break;
        } else if (typeof fb === 'object') {
          for (const k in fb) {
            let list = fb[k];
            if (typeof list === 'string') {
              try { list = JSON.parse(list); } catch(e) { list = []; }
            } else if (list && list.value) {
              list = list.value;
            }
            if (Array.isArray(list)) {
              post = list.find(p => p && (p.id === postId || (postId && p.id && (p.id.includes(postId) || postId.includes(p.id)))));
              if (post) break;
            }
          }
          if (post) break;
        }
      }
    }

    if (!post && postId) {
      // Tìm kiếm tương đối theo ID hoặc tiêu đề
      const allStorages = [window.DEFAULT_RECOVERED_ARTICLES_FALLBACK, window.DULIEU_CHUYENMUC_MASTER, window.ORIGINAL_RECOVERED_ARTICLES_BACKUP];
      for (const src of allStorages) {
        if (!src) continue;
        for (const k in src) {
          let list = src[k];
          if (typeof list === 'string') { try { list = JSON.parse(list); } catch(e) { list = []; } }
          else if (list && list.value) { list = list.value; }
          if (Array.isArray(list)) {
            post = list.find(p => p && (p.id === postId || (p.id && (p.id.indexOf(postId) !== -1 || postId.indexOf(p.id) !== -1))));
            if (post) break;
          }
        }
        if (post) break;
      }
    }

    // Tự động kiểm tra và phục hồi nếu bài viết bị lỗi font / ký tự lạ \uFFFD / Mojibake hoặc bị lưu bản rút gọn trong cookie/storage
    const fullText = (post.tieuDe || "") + " " + (post.noiDung || "") + " " + (post.tomTat || "");
    const isCorrupted = fullText.indexOf("\uFFFD") !== -1 || fullText.indexOf("Tr?ch Nh?t") !== -1 || fullText.indexOf("KhÃ¡i") !== -1 || fullText.indexOf("XÃ´ng") !== -1 || fullText.indexOf("Ã ") !== -1 || fullText.indexOf("á»") !== -1 || fullText.indexOf("Ã©") !== -1;
    const isUserEdited = (Number(post.updatedAt) || 0) > 1792020983905 && !isCorrupted;
    const backupMaster = window.ORIGINAL_RECOVERED_ARTICLES_BACKUP || window.DEFAULT_RECOVERED_ARTICLES_FALLBACK;
    if (backupMaster && post && post.id && (!isUserEdited || isCorrupted)) {
      let cleanBackup = null;
      const backupKeys = [
        "TUVI_BAI_VIET_CUSTOM", "XEMNGAY_BAI_VIET_CUSTOM", "XEMTUOI_BAI_VIET_CUSTOM",
        "TAMLINH_BAI_VIET_CUSTOM", "PHONGTHUY_BAI_VIET_CUSTOM", "KIENTHUC_BAI_VIET_CUSTOM",
        "TUONGSO_BAI_VIET_CUSTOM", "BAI_VIET_CHUYEN_MUC_CUSTOM"
      ];
      for (let bk of backupKeys) {
        const bData = backupMaster[bk];
        let list = [];
        if (typeof bData === 'string') {
          try { list = JSON.parse(bData); } catch(e) { list = []; }
        } else if (bData && bData.value) {
          list = bData.value;
        } else if (Array.isArray(bData)) {
          list = bData;
        }
        cleanBackup = list.find(p => p && (p.id === post.id || (post.id && p.id && (p.id === "xem-ngay-tot-tong-quan" && post.id.indexOf("trach-nhat") !== -1))));
        if (cleanBackup) break;
      }
      if (cleanBackup && cleanBackup.noiDung) {
        const curLen = (post.noiDung || "").length;
        const bLen = cleanBackup.noiDung.length;
        if (isCorrupted || bLen > curLen + 100) {
          post = Object.assign({}, cleanBackup);
        }
      }
    }

    if (post && post.id === "tuvi-ngay-12-con-giap") {
      const cmCheck = (post.chuyenMuc || "").toLowerCase();
      const ttCheck = (post.tieuDe || "").toLowerCase();
      const ndCheck = (post.noiDung || post.tomTat || "").toLowerCase();
      if ((cmCheck.indexOf("xem ngày") !== -1 && cmCheck.indexOf("tử vi") === -1) ||
          ttCheck.indexOf("ngày lành tháng tốt") !== -1 ||
          (ndCheck.indexOf("trạch nhật") !== -1 && ndCheck.indexOf("12 con giáp") === -1)) {
        post = (window.TUVI_BAI_VIET_DATA && window.TUVI_BAI_VIET_DATA.find(p => p.id === "tuvi-ngay-12-con-giap")) || post;
      }
    }

    let namActive = 2026;
    if (typeof window.layNamHienHanhAmDuong === 'function') {
      namActive = window.layNamHienHanhAmDuong();
    }

    let dispCat = post.chuyenMuc || "Chuyên Mục";
    let dispTitle = post.tieuDe || "";
    let dispContent = post.noiDung || post.tomTat || "";

    // Sửa triệt để lỗi chính tả nếu có
    dispCat = dispCat.replace(/Đấu Năm/g, "Đầu Năm");
    dispTitle = dispTitle.replace(/Đấu Năm/g, "Đầu Năm");
    dispContent = dispContent.replace(/Đấu Năm/g, "Đầu Năm");

    if (post.id === 'tuvi-12-con-giap-dau-nam') {
      dispCat = `Tử Vi ${namActive}`;
      if (!isUserEdited && (!post.tieuDe || post.tieuDe.indexOf("Xem Tử Vi Năm") !== -1)) {
        dispTitle = `Xem Tử Vi Năm ${namActive}: Luận Đoán Cát Hung 12 Con Giáp & Vận Trình Đầu Xuân`;
      }
      if (namActive !== 2026 && !isUserEdited) {
        dispContent = dispContent.replace(/2026/g, namActive);
      }
    } else if (post.id === 'xong-dat-dau-nam-dai-cat') {
      dispCat = `Xông Đất Đầu Năm ${namActive}`;
      if (!isUserEdited && (!post.tieuDe || post.tieuDe.indexOf("Xông Đất Đầu Năm") !== -1)) {
        dispTitle = `Xông Đất Đầu Năm ${namActive}: Cẩm Nang Chọn Tuổi Xông Nhà, Mở Hàng Đại Cát`;
      }
      if (namActive !== 2026 && !isUserEdited) {
        dispContent = dispContent.replace(/2026/g, namActive);
      }
    }

    const badge = document.getElementById("modal-cat-badge");
    if (badge) badge.textContent = dispCat;
    const title = document.getElementById("modal-post-title");
    if (title) title.textContent = dispTitle;
    const author = document.getElementById("modal-post-author");
    if (author) author.textContent = "Thầy Duy Tâm Phúc";
    const date = document.getElementById("modal-post-date");
    if (date) date.textContent = post.ngayDang || "";
    
    let modalImgSrc = post.hinhAnh;
    if (typeof window.resolveArticleImageHelper === 'function') {
      modalImgSrc = window.resolveArticleImageHelper(post);
    }

    const imgWrap = document.getElementById("modal-post-img-wrap");
    if (imgWrap) {
      if (modalImgSrc && typeof modalImgSrc === 'string' && modalImgSrc.trim() !== '') {
        const _cm = (dispCat || "").trim().toLowerCase();
        const _pid = (post.id || "").trim().toLowerCase();
        let cursorStyle = "default";
        let titleAttr = "";
        let clickHandler = null;
        if (_cm.includes("tuần") || _pid.includes("tuan")) {
          cursorStyle = "pointer";
          titleAttr = "Bấm để sang tra cứu tử vi theo tháng / tuần";
          clickHandler = function() { window.location.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/tu-vi-theo-thang.html?from=tuan"; };
        } else if (_cm.includes("tháng") || _pid.includes("thang")) {
          cursorStyle = "pointer";
          titleAttr = "Bấm để sang tra cứu tử vi theo tháng";
          clickHandler = function() { window.location.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/tu-vi-theo-thang.html"; };
        }

        const safeImgSrc = modalImgSrc.trim();
        imgWrap.innerHTML = '<img id="modal-post-img" src="' + safeImgSrc + '" alt="" style="width: 100%; max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 8px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.12); cursor: ' + cursorStyle + ';"' + (titleAttr ? ' title="' + titleAttr + '"' : '') + '>';
        imgWrap.style.display = "block";
        imgWrap.style.textAlign = "center";
        imgWrap.style.margin = "0 auto 20px auto";
        const newImg = document.getElementById("modal-post-img");
        if (newImg) {
          if (clickHandler) newImg.onclick = clickHandler;
          newImg.onerror = function() {
            var curr = this.getAttribute("src") || "";
            if (!this.dataset.triedFallback1) {
              this.dataset.triedFallback1 = "1";
              if (curr.indexOf("%") === -1 && /[^\x00-\x7F]/.test(curr)) {
                this.src = encodeURI(curr);
                return;
              }
              if (_pid.indexOf("van-han") !== -1) {
                this.src = "assets/images/xem_van_han_tu_vi.png";
                return;
              }
            } else if (!this.dataset.triedFallback2) {
              this.dataset.triedFallback2 = "1";
              if (_pid.indexOf("van-han") !== -1) {
                this.src = "Ảnh Bài Viết Khung 16-9/xem_van_han_tu_vi.png";
                return;
              }
            }
            this.onerror = null;
            imgWrap.innerHTML = "";
            imgWrap.style.display = "none";
          };
        }
      } else {
        imgWrap.innerHTML = "";
        imgWrap.style.display = "none";
      }
    }

    const content = document.getElementById("modal-post-content");
    if (content) {
      content.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      content.style.fontSize = "15.5px";
      content.style.lineHeight = "1.65";
      content.style.color = "#2C241E";
      content.style.textAlign = "justify";
      try {
        content.innerHTML = formatArticleContentForModal(dispContent);
      } catch(errFmt) {
        console.warn("Lỗi định dạng nội dung modal:", errFmt);
        content.innerHTML = dispContent || "<p>Nội dung đang được cập nhật...</p>";
      }

      // Tự động loại bỏ ảnh bên trong nội dung nếu đã hiển thị ở ảnh bìa trên cùng (tránh trùng lặp 2 ảnh)
      try {
        if (content) {
          const coverName = (modalImgSrc ? modalImgSrc.split('/').pop().split('?')[0] : "").toLowerCase().trim();
          const innerImgs = Array.from(content.getElementsByTagName("img"));
          innerImgs.forEach(innerImg => {
            const rawSrc = (innerImg.getAttribute("src") || "").toLowerCase().trim();
            const innerName = rawSrc.split('/').pop().split('?')[0].trim();
            if (!coverName || innerName === coverName || rawSrc.includes(coverName) || coverName.includes(innerName)) {
              const pParent = innerImg.closest("p") || innerImg.closest("div") || innerImg.parentNode;
              if (pParent && (!pParent.textContent || !pParent.textContent.trim())) {
                pParent.remove();
              } else {
                innerImg.remove();
              }
            }
          });
        }
      } catch (err) {}
    }

    const actionBtn = document.getElementById("modal-action-btn");
    if (actionBtn) {
      const cm = (dispCat || "").trim().toLowerCase();
      const pid = (post.id || "").trim().toLowerCase();
      // Kiểm tra tất cả các mục Xem Ngày (ở Widget Ảnh 2): Tuyệt đối KHÔNG hiển thị "Tra Cứu Theo Tuổi Của Bạn"
      const isXemNgay = (
        (window.XEMNGAY_SUB_CATS && window.XEMNGAY_SUB_CATS.some(sc => sc && (sc.toLowerCase() === cm || cm.includes(sc.toLowerCase())))) ||
        (window.XEMNGAY_BAI_VIET_DATA && window.XEMNGAY_BAI_VIET_DATA.some(x => x && x.id === post.id)) ||
        pid.startsWith("xem-ngay") ||
        (cm.includes("xem ngày") && !cm.includes("tử vi"))
      );

      if (isXemNgay) {
        actionBtn.style.display = "none";
      } else if (cm.includes("tuần") || pid.includes("tuan")) {
        actionBtn.style.display = "inline-flex";
        actionBtn.innerHTML = "🔍 (Tra Cứu Theo Tuổi Của Bạn)";
        actionBtn.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/tu-vi-theo-thang.html?from=tuan";
        actionBtn.target = "_self";
      } else if (cm.includes("tháng") || pid.includes("thang")) {
        actionBtn.style.display = "inline-flex";
        actionBtn.innerHTML = "🔍 (Tra Cứu Theo Tuổi Của Bạn)";
        actionBtn.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/tu-vi-theo-thang.html";
        actionBtn.target = "_self";
      } else if (cm.includes("tử vi hàng ngày") || cm.includes("tử vi ngày") || pid === "tuvi-ngay-hom-nay" || pid === "tuvi-ngay-12-con-giap" || pid.includes("tuvi-ngay")) {
        actionBtn.style.display = "inline-flex";
        actionBtn.innerHTML = "🔍 (Tra Cứu Theo Tuổi Của Bạn)";
        actionBtn.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/tu-vi-theo-ngay.html";
        actionBtn.target = "_self";
      } else if (cm.includes("xông đất") || pid.includes("xong-dat")) {
        actionBtn.style.display = "inline-flex";
        actionBtn.innerHTML = "🔍 (Tra Cứu Theo Tuổi Của Bạn)";
        actionBtn.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/index.html#xong-dat-dau-nam";
        actionBtn.target = "_self";
      } else if (cm.includes("tử vi") && (pid.includes("dau-nam") || cm.includes("đầu năm") || pid.includes("tuvi-12-con-giap") || pid.includes("tuvi-xong-dat") || cm.includes("202"))) {
        actionBtn.style.display = "inline-flex";
        actionBtn.innerHTML = "🔍 (Tra Cứu Theo Tuổi Của Bạn)";
        actionBtn.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/index.html#tu-vi-dau-nam";
        actionBtn.target = "_self";
      } else if (cm.includes("cân xương") || pid.includes("can-xuong") || pid.includes("canxuong")) {
        actionBtn.style.display = "inline-flex";
        actionBtn.innerHTML = "🔍 (Tra Cứu Theo Tuổi Của Bạn)";
        actionBtn.href = "XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/index.html#can-xuong-doan-so";
        actionBtn.target = "_self";
      } else {
        actionBtn.style.display = "none";
      }
    }

    const modal = document.getElementById("article-reader-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  window.closeArticleModal = function() {
    const modal = document.getElementById("article-reader-modal");
    if (modal) modal.classList.remove("active");
    const actionBtn = document.getElementById("modal-action-btn");
    if (actionBtn) actionBtn.style.display = "none";
    document.body.style.overflow = "";
  };

  // Đảm bảo mọi cú click vào bài viết (ảnh, tiêu đề, thẻ) đều mở modal đọc bài mượt mà
  document.addEventListener("click", function(e) {
    const card = e.target.closest(".featured-article-card, .side-article-item, .bottom-article-card, .article-card-item, [data-post-id]");
    if (card && typeof window.openArticleModal === "function") {
      const onclickAttr = card.getAttribute("onclick") || "";
      const match = onclickAttr.match(/openArticleModal\(['"]([^'"]+)['"]\)/);
      const postId = (card.getAttribute("data-post-id") || (match ? match[1] : "")).trim();
      if (postId) {
        // Chỉ ngăn chặn khi click vào các link a nội bộ không có href khác
        const aTag = e.target.closest("a");
        if (aTag && (aTag.getAttribute("href") === "#" || !aTag.getAttribute("href"))) {
          e.preventDefault();
        }
        window.openArticleModal(postId);
      }
    }
  });

  function isArticleInCurrentCategory(p, currentCat, currentSub) {
    if (!p) return false;
    const catLower = (p.chuyenMuc || "").trim().toLowerCase();
    const titleLower = (p.tieuDe || "").trim().toLowerCase();
    const descLower = (p.tomTat || "").trim().toLowerCase();

    // 1. Nếu đang chọn lọc theo chuyên mục con cụ thể
    if (currentSub && currentSub !== "all") {
      const subLower = currentSub.trim().toLowerCase();
      if (subLower.includes("diện tướng") || subLower.includes("ngũ quan")) {
        return catLower.includes("diện tướng") || catLower.includes("ngũ quan") || titleLower.includes("ngũ quan") || titleLower.includes("diện tướng");
      }
      if (subLower.includes("tam đình") || subLower.includes("vận trình")) {
        return catLower.includes("tam đình") || titleLower.includes("tam đình") || descLower.includes("tam đình");
      }
      if (subLower.includes("thanh âm") || subLower.includes("tướng đi") || subLower.includes("cốt cách")) {
        return catLower.includes("thanh âm") || catLower.includes("tướng đi") || titleLower.includes("cử chỉ") || titleLower.includes("thanh âm");
      }
      if (subLower.includes("ca dao")) {
        return catLower.includes("ca dao") || titleLower.includes("ca dao") || descLower.includes("ca dao");
      }
      if (subLower.includes("chỉ tay") || subLower.includes("bàn tay")) {
        return catLower.includes("chỉ tay") || titleLower.includes("chỉ tay") || titleLower.includes("bàn tay");
      }
      if (subLower.includes("nốt ruồi")) {
        return catLower.includes("nốt ruồi") || titleLower.includes("nốt ruồi");
      }
      if (subLower.includes("khí sắc") || subLower.includes("thần khí") || subLower.includes("nhân tướng")) {
        return catLower.includes("khí sắc") || catLower.includes("thần khí") || catLower.includes("nhân tướng") || titleLower.includes("khí sắc") || titleLower.includes("nhân tướng");
      }
      if (subLower === "địa lý phong thủy âm trạch" || subLower.includes("âm trạch")) {
        return catLower.includes("âm trạch") || titleLower.includes("âm trạch") || descLower.includes("âm trạch") || catLower.includes("mộ") || titleLower.includes("mộ");
      }
      if (subLower === "địa lý phong thủy dương trạch" || subLower.includes("dương trạch")) {
        return catLower.includes("dương trạch") || titleLower.includes("dương trạch") || (catLower.includes("địa lý") && !catLower.includes("âm trạch"));
      }
      if (subLower === "tử vi đẩu số") {
        return catLower.includes("tử vi") || catLower.includes("tu vi") || titleLower.includes("tử vi");
      }
      if (subLower === "kinh dịch") {
        return catLower.includes("kinh dịch") || catLower.includes("dịch") || titleLower.includes("kinh dịch") || titleLower.includes("quẻ");
      }
      if (subLower.includes("bát tự") || subLower.includes("tứ trụ")) {
        return catLower.includes("bát tự") || catLower.includes("tứ trụ") || titleLower.includes("bát tự") || titleLower.includes("tứ trụ");
      }
      if (subLower.includes("âm dương") || subLower.includes("can chi") || subLower.includes("ngũ hành")) {
        return catLower.includes("âm dương") || catLower.includes("can chi") || catLower.includes("ngũ hành") || titleLower.includes("can chi") || titleLower.includes("ngũ hành");
      }
      if (subLower.includes("lịch pháp")) {
        return catLower.includes("lịch pháp") || catLower.includes("khâm thiên") || titleLower.includes("lịch pháp") || catLower.includes("xem ngày");
      }
      if (subLower.includes("văn khấn")) {
        return catLower.includes("văn khấn") || titleLower.includes("văn khấn");
      }
      if (subLower.includes("thờ cúng")) {
        return catLower.includes("thờ cúng") || titleLower.includes("thờ cúng") || catLower.includes("bàn thờ");
      }
      if (subLower.includes("chùa") || subLower.includes("đền") || subLower.includes("phủ") || subLower.includes("miếu")) {
        return catLower.includes("chùa") || catLower.includes("đền") || catLower.includes("miếu") || catLower.includes("phủ") || titleLower.includes("chùa") || titleLower.includes("đền");
      }
      if (subLower.includes("điềm báo")) {
        return catLower.includes("điềm báo") || catLower.includes("giấc mơ") || titleLower.includes("điềm báo") || titleLower.includes("chiêm bao");
      }
      if (subLower.includes("phòng ngủ")) {
        return catLower.includes("phòng ngủ") || titleLower.includes("phòng ngủ");
      }
      if (subLower.includes("phòng khách")) {
        return catLower.includes("phòng khách") || titleLower.includes("phòng khách");
      }
      if (subLower.includes("phòng bếp") || subLower.includes("bếp")) {
        return catLower.includes("bếp") || titleLower.includes("bếp");
      }
      if (subLower.includes("bàn thờ")) {
        return catLower.includes("bàn thờ") || titleLower.includes("bàn thờ");
      }
      if (subLower.includes("đất đai")) {
        return catLower.includes("đất") || titleLower.includes("đất");
      }
      if (subLower.includes("theo tuổi")) {
        return catLower.includes("tuổi") || titleLower.includes("tuổi");
      }
      if (subLower.includes("vật phẩm")) {
        return catLower.includes("vật phẩm") || titleLower.includes("vật phẩm");
      }
      if (subLower.includes("kinh doanh")) {
        return catLower.includes("kinh doanh") || titleLower.includes("kinh doanh");
      }
      if (subLower.includes("lễ tết")) {
        return catLower.includes("lễ tết") || titleLower.includes("lễ tết") || catLower.includes("tết");
      }
      if (subLower.includes("lễ gia đình")) {
        return catLower.includes("gia đình") || titleLower.includes("gia đình");
      }
      if (subLower.includes("nhà cửa")) {
        return catLower.includes("nhà cửa") || titleLower.includes("nhà cửa") || catLower.includes("nhập trạch") || catLower.includes("động thổ");
      }
      if (subLower.includes("cưới hỏi")) {
        return catLower.includes("cưới") || titleLower.includes("cưới");
      }
      if (subLower.includes("tang lễ")) {
        return catLower.includes("tang") || titleLower.includes("tang");
      }
      if (subLower.includes("sim") || subLower.includes("bói sim")) {
        return catLower.includes("sim") || titleLower.includes("sim") || descLower.includes("sim");
      }
      if (subLower.includes("các thuật số khác") || subLower.includes("thuật số khác")) {
        return p.id === "tuvi-can-xuong-tinh-cot" || catLower.includes("thuật số") || catLower.includes("cân xương") || titleLower.includes("cân xương");
      }
      if (subLower.includes("lễ vật")) {
        return catLower.includes("lễ vật") || titleLower.includes("lễ vật") || catLower.includes("sắm lễ");
      }
      if (subLower.includes("hàng ngày") || subLower.includes("hôm nay")) {
        return catLower.includes("hàng ngày") || titleLower.includes("hàng ngày") || titleLower.includes("hôm nay") || catLower.includes("hôm nay");
      }
      if (subLower.includes("hàng tuần") || subLower.includes("tuần")) {
        return catLower.includes("tuần") || titleLower.includes("tuần");
      }
      if (subLower.includes("hàng tháng") || subLower.includes("tháng")) {
        return catLower.includes("tháng") || titleLower.includes("tháng");
      }
      if (subLower.includes("trọn đời")) {
        return catLower.includes("trọn đời") || titleLower.includes("trọn đời");
      }
      if (subLower.includes("vận hạn")) {
        return catLower.includes("vận hạn") || titleLower.includes("vận hạn");
      }
      if (subLower.includes("cân xương")) {
        return catLower.includes("cân xương") || titleLower.includes("cân xương");
      }
      if (subLower.includes("xông đất") || subLower.includes("đầu năm")) {
        return catLower.includes("xông đất") || titleLower.includes("xông đất") || catLower.includes("đầu năm") || titleLower.includes("đầu năm");
      }
      if (subLower.includes("mua xe")) {
        return catLower.includes("mua xe") || titleLower.includes("mua xe");
      }
      if (subLower.includes("xuất hành")) {
        return catLower.includes("xuất hành") || titleLower.includes("xuất hành");
      }
      if (subLower.includes("kết hôn") || subLower.includes("hôn phối")) {
        return catLower.includes("kết hôn") || titleLower.includes("kết hôn") || catLower.includes("vợ chồng") || titleLower.includes("vợ chồng");
      }
      if (subLower.includes("hoàng đạo")) {
        return catLower.includes("hoàng đạo") || titleLower.includes("hoàng đạo");
      }
      if (subLower.includes("động thổ")) {
        return catLower.includes("động thổ") || titleLower.includes("động thổ");
      }
      if (subLower.includes("xây dựng")) {
        return catLower.includes("xây dựng") || titleLower.includes("xây dựng");
      }
      if (subLower.includes("đổ trần") || subLower.includes("lợp mái")) {
        return catLower.includes("đổ trần") || titleLower.includes("đổ trần") || catLower.includes("lợp mái") || titleLower.includes("lợp mái");
      }
      if (subLower.includes("nhập trạch")) {
        return catLower.includes("nhập trạch") || titleLower.includes("nhập trạch");
      }
      if (subLower.includes("mua nhà")) {
        return catLower.includes("mua nhà") || titleLower.includes("mua nhà");
      }
      if (subLower.includes("khai trương")) {
        return catLower.includes("khai trương") || titleLower.includes("khai trương");
      }
      if (subLower.includes("ký hợp đồng") || subLower.includes("hợp đồng")) {
        return catLower.includes("hợp đồng") || titleLower.includes("hợp đồng");
      }
      if (subLower.includes("nhận chức")) {
        return catLower.includes("nhận chức") || titleLower.includes("nhận chức");
      }
      if (subLower.includes("an táng")) {
        return catLower.includes("an táng") || titleLower.includes("an táng");
      }
      if (subLower.includes("ngày tốt")) {
        return catLower.includes("ngày tốt") || titleLower.includes("ngày tốt") || catLower.includes("ngày lành") || titleLower.includes("ngày lành");
      }
      if (subLower.includes("vợ chồng")) {
        return catLower.includes("vợ chồng") || titleLower.includes("vợ chồng");
      }
      if (subLower.includes("sinh con")) {
        return catLower.includes("sinh con") || titleLower.includes("sinh con");
      }
      if (subLower.includes("hợp nhau")) {
        return catLower.includes("hợp nhau") || titleLower.includes("hợp nhau");
      }
      if (subLower.includes("làm nhà")) {
        return catLower.includes("làm nhà") || titleLower.includes("làm nhà") || catLower.includes("xây nhà");
      }
      if (subLower.includes("làm ăn")) {
        return catLower.includes("làm ăn") || titleLower.includes("làm ăn");
      }
      if (subLower.includes("hướng nhà")) {
        return catLower.includes("hướng nhà") || titleLower.includes("hướng nhà");
      }
      return catLower === subLower || catLower.includes(subLower) || titleLower.includes(subLower);
    }

    // 2. Lọc theo chuyên mục lớn
    if (!currentCat || currentCat === "all") return true;
    const currLower = currentCat.trim().toLowerCase();

    if (currLower === "kiến thức" || currLower === "kienthuc") {
      if (catLower.includes("tướng") || (p.id && (p.id.includes("tuong") || p.id.includes("nhan-tuong")))) return false;
      // Yêu cầu: danh sách bài viết ở phần kiến thức để lại mỗi bài trong ảnh (Cân Xương Đoán Số)
      if (p.id === "tuvi-can-xuong-tinh-cot" || (p.tieuDe && p.tieuDe.includes("Cân Xương"))) return true;
      if (p.isCustomPost || (p.id && String(p.id).startsWith("post-"))) {
        return catLower.includes("kiến thức") || CM_SUB_CATEGORIES["Kiến Thức"].some(s => catLower.includes(s.toLowerCase()));
      }
      return false;
    } else if (currLower.includes("tướng") || currLower.includes("tuong") || currLower === "tuongso") {
      // Loại bỏ các bài viết thuộc Tử Vi Đẩu Số (kể cả sao Thiên Tướng, Tướng Quân...)
      if (catLower.includes("tử vi") || catLower.includes("tu vi") || titleLower.includes("tử vi") || (p.id && (p.id.includes("kham-thien") || p.id.includes("tuvi")))) {
        return false;
      }
      return (
        catLower.includes("tướng") ||
        catLower.includes("tuong") ||
        catLower.includes("chỉ tay") ||
        catLower.includes("nốt ruồi") ||
        catLower.includes("ngũ quan") ||
        catLower.includes("tam đình") ||
        titleLower.includes("nhân tướng") ||
        titleLower.includes("diện tướng") ||
        titleLower.includes("tướng mạo") ||
        titleLower.includes("tướng pháp") ||
        titleLower.includes("xem tướng") ||
        titleLower.includes("chỉ tay") ||
        titleLower.includes("nốt ruồi") ||
        titleLower.includes("ngũ quan") ||
        titleLower.includes("tam đình") ||
        (p.id && (p.id.startsWith("tuong-so-") || p.id.includes("nhan-tuong") || p.id.includes("chi-tay") || p.id.includes("not-ruoi") || p.id.includes("ngu-quan") || p.id.includes("tam-dinh") || p.id.includes("tai-duc") || p.id.includes("ca-dao"))) ||
        (CM_SUB_CATEGORIES["Tướng Số"] && CM_SUB_CATEGORIES["Tướng Số"].some(s => catLower.includes(s.toLowerCase())))
      );
    } else if (currLower === "tâm linh" || currLower === "tamlinh") {
      return (
        catLower === "tâm linh" ||
        catLower.includes("tâm linh") ||
        catLower.includes("tam linh") ||
        catLower.includes("tín ngưỡng") ||
        catLower.includes("thờ cúng") ||
        catLower.includes("chùa") ||
        catLower.includes("đền") ||
        catLower.includes("phủ") ||
        catLower.includes("miếu") ||
        catLower.includes("điềm báo") ||
        catLower.includes("giấc mơ") ||
        catLower.includes("chuyện tâm linh") ||
        catLower.includes("nhân quả")
      );
    } else if (currLower === "lễ nghi" || currLower === "lenghi") {
      return (
        catLower === "lễ nghi" ||
        catLower.includes("lễ nghi") ||
        catLower.includes("le nghi") ||
        catLower.includes("lễ tết") ||
        catLower.includes("lễ gia đình") ||
        catLower.includes("nhà cửa") ||
        catLower.includes("cưới hỏi") ||
        catLower.includes("tang lễ") ||
        catLower.includes("văn khấn") ||
        catLower.includes("lễ vật")
      );
    } else if (currLower.includes("phong thủy") || currLower.includes("phong thuy") || currLower === "phongthuy") {
      return (
        catLower.includes("phong thủy") ||
        catLower.includes("phong thuy") ||
        catLower.includes("âm trạch") ||
        catLower.includes("dương trạch") ||
        catLower.includes("phòng ngủ") ||
        catLower.includes("phòng khách") ||
        catLower.includes("phòng bếp") ||
        catLower.includes("bàn thờ") ||
        catLower.includes("đất đai") ||
        catLower.includes("kinh doanh") ||
        catLower.includes("vật phẩm")
      );
    } else if (currLower.includes("sim") || currLower.includes("bói sim")) {
      return catLower.includes("sim") || catLower.includes("bói sim");
    } else if (currLower.includes("khóa học") || currLower.includes("khoa hoc")) {
      return catLower.includes("khóa học") || catLower.includes("khoa hoc");
    } else if (currLower.includes("diễn đàn") || currLower.includes("dien dan")) {
      return catLower.includes("diễn đàn") || catLower.includes("dien dan");
    } else if (currLower === "tử vi" || currLower === "tuvi") {
      // LOẠI BỎ TRIỆT ĐỂ BÀI VIẾT TƯỚNG SỐ, CHỈ TAY, NỐT RUỒI, TAM ĐÌNH, NGŨ QUAN
      if (
        catLower.includes("tướng") ||
        catLower.includes("tuong") ||
        catLower.includes("nhân tướng") ||
        catLower.includes("diện tướng") ||
        catLower.includes("chỉ tay") ||
        catLower.includes("nốt ruồi") ||
        catLower.includes("ngũ quan") ||
        catLower.includes("tam đình") ||
        (p.id && (p.id.startsWith("tuong-so-") || p.id.includes("nhan-tuong") || p.id.includes("tuong-hoc") || p.id.includes("chi-tay") || p.id.includes("not-ruoi") || p.id.includes("ngu-quan") || p.id.includes("tam-dinh") || p.id.includes("tai-duc") || p.id.includes("ca-dao")))
      ) {
        return false;
      }
      return (
        catLower.includes("tử vi") ||
        catLower.includes("tu vi") ||
        titleLower.includes("tử vi") ||
        catLower.includes("cân xương") ||
        titleLower.includes("cân xương") ||
        catLower.includes("xông đất") ||
        titleLower.includes("xông đất") ||
        (CM_SUB_CATEGORIES["Tử Vi"] && CM_SUB_CATEGORIES["Tử Vi"].some(s => catLower.includes(s.toLowerCase())))
      );
    } else if (currLower === "xem ngày" || currLower === "xemngay") {
      return (
        catLower.includes("xem ngày") ||
        catLower.includes("xem ngay") ||
        catLower.includes("ngày tốt") ||
        catLower.includes("ngày lành") ||
        catLower.includes("trạch nhật") ||
        titleLower.includes("xem ngày") ||
        titleLower.includes("ngày tốt") ||
        titleLower.includes("ngày lành") ||
        (CM_SUB_CATEGORIES["Xem Ngày"] && CM_SUB_CATEGORIES["Xem Ngày"].some(s => catLower.includes(s.toLowerCase())))
      );
    } else if (currLower === "xem tuổi" || currLower === "xemtuoi") {
      return (
        catLower.includes("xem tuổi") ||
        catLower.includes("xem tuoi") ||
        catLower.includes("tuổi hợp") ||
        (catLower.includes("tuổi") && !catLower.includes("phong thủy theo tuổi")) ||
        titleLower.includes("xem tuổi") ||
        (CM_SUB_CATEGORIES["Xem Tuổi"] && CM_SUB_CATEGORIES["Xem Tuổi"].some(s => catLower.includes(s.toLowerCase())))
      );
    }
    return catLower === currLower || catLower.includes(currLower);
  }

  // Render các nút phân loại con dưới thanh chuyên mục
  function renderTabCmSubCategories(parentCat, activeSub) {
    const subBar = document.getElementById("tab-cm-subcat-bar");
    const subList = document.getElementById("tab-cm-subcat-list");
    const catGroup = document.getElementById("tab-cm-cat-filters");
    if (!subBar || !subList) return;

    const HIDE_CAT_BAR = ["kiến thức", "tâm linh", "lễ nghi", "phong thủy", "tướng số", "tuong", "tử vi", "xem ngày", "xem tuổi"];
    const shouldHideCatBar = parentCat && (parentCat !== "all" || HIDE_CAT_BAR.some(c => parentCat.toLowerCase().includes(c)));

    // Yêu cầu: "chỗ phần chuyên mục ở ảnh 2 bỏ đi cho tao"
    // Ẩn thanh Chuyên Mục (#tab-cm-cat-filters) khi đang ở chuyên mục cụ thể (Tướng Số, Kiến Thức, Tâm Linh, Lễ Nghi, Phong Thủy...)
    if (catGroup) {
      if (shouldHideCatBar) {
        catGroup.style.display = "none";
      } else {
        catGroup.style.display = "flex";
      }
    }

    if (!parentCat || parentCat === "all" || !CM_SUB_CATEGORIES[parentCat]) {
      subBar.style.display = "none";
      subList.innerHTML = "";
      return;
    }

    const subs = CM_SUB_CATEGORIES[parentCat];
    subBar.style.display = "block";
    if (shouldHideCatBar) {
      subBar.style.borderTop = "none";
      subBar.style.marginTop = "0";
      subBar.style.paddingTop = "0";
    } else {
      subBar.style.borderTop = "1px dashed #DFBA73";
      subBar.style.marginTop = "10px";
      subBar.style.paddingTop = "10px";
    }
    let html = `<span style="font-size: 12px; font-weight: 700; color: #7A1414; margin-right: 4px;">Phân Loại:</span>`;
    html += `<button type="button" class="filter-subcat-pill ${!activeSub ? 'active' : ''}" data-sub="all">● Tất Cả ${parentCat}</button>`;
    subs.forEach(s => {
      const isActive = activeSub && activeSub.trim().toLowerCase() === s.trim().toLowerCase();
      html += `<button type="button" class="filter-subcat-pill ${isActive ? 'active' : ''}" data-sub="${s}">${s}</button>`;
    });
    subList.innerHTML = html;

    const subBtns = subList.querySelectorAll(".filter-subcat-pill");
    subBtns.forEach(btn => {
      btn.onclick = function() {
        subBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const sVal = this.getAttribute("data-sub");
        if (sVal === "all") {
          tabCmCurrentSubCategory = null;
        } else {
          tabCmCurrentSubCategory = sVal;
        }
        window.renderChuyenMucTab();
      };
    });
  }

  window.renderChuyenMucTab = function() {
    const allSorted = getSortedArticles();
    if (allSorted.length === 0) return;

    // Lọc danh sách bài viết theo đúng chuyên mục và phân loại con hiện tại
    const activePosts = tabCmCurrentCategory === "all" ? allSorted : allSorted.filter(p => isArticleInCurrentCategory(p, tabCmCurrentCategory, tabCmCurrentSubCategory));
    const postsToShow = tabCmCurrentCategory === "all" ? allSorted : activePosts;

    // Cập nhật tiêu đề breadcrumb tương ứng
    const titleEl = document.getElementById("tab-cm-breadcrumb-title");
    if (titleEl) {
      if (tabCmCurrentSubCategory) {
        titleEl.textContent = "✦ PHÂN LOẠI: " + tabCmCurrentSubCategory.toUpperCase() + " (" + tabCmCurrentCategory.toUpperCase() + ") ✦";
      } else if (tabCmCurrentCategory === "all") {
        titleEl.textContent = "✦ CHUYÊN MỤC TỔNG HỢP: TẤT CẢ BÀI VIẾT TRÊN TRANG ✦";
      } else if (tabCmCurrentCategory === "Kiến Thức" || tabCmCurrentCategory === "kienthuc") {
        titleEl.textContent = "✦ KHO KIẾN THỨC HUYỀN HỌC (TỬ VI, KINH DỊCH, BÁT TỰ - TỨ TRỤ, LỊCH PHÁP...) ✦";
      } else if (tabCmCurrentCategory === "Tâm Linh") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ TÂM LINH & HUYỀN BÍ ✦";
      } else if (tabCmCurrentCategory === "Lễ Nghi") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ LỄ NGHI & VĂN KHẤN CỔ TRUYỀN ✦";
      } else if (tabCmCurrentCategory.includes("Phong Thủy") || tabCmCurrentCategory === "phongthuy") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ PHONG THỦY ĐỊA LÝ & BÁT TRẠCH ✦";
      } else if (tabCmCurrentCategory === "Khóa Học") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ KHÓA HỌC & ĐÀO TẠO THUẬT SỐ ✦";
      } else if (tabCmCurrentCategory === "Diễn Đàn") {
        titleEl.textContent = "✦ DIỄN ĐÀN GIAO LƯU & LUẬN GIẢI HUYỀN HỌC ✦";
      } else if (tabCmCurrentCategory === "Tử Vi") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ TỬ VI & VẬN HẠN ĐẨU SỐ ✦";
      } else if (tabCmCurrentCategory === "Xem Ngày") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ XEM NGÀY LÀNH THÁNG TỐT & TUYỂN TRẠCH ✦";
      } else if (tabCmCurrentCategory === "Xem Tuổi") {
        titleEl.textContent = "✦ CHUYÊN ĐỀ XEM TUỔI HỢP HÔN & ĐOÁN MỆNH ✦";
      } else if (tabCmCurrentCategory.includes("Tướng") || tabCmCurrentCategory.includes("tuong")) {
        titleEl.textContent = "✦ CHUYÊN ĐỀ TƯỚNG SỐ & NHÂN TƯỚNG HỌC ✦";
      } else {
        titleEl.textContent = "✦ CHUYÊN MỤC: " + tabCmCurrentCategory.toUpperCase() + " ✦";
      }
    }

    // 1. Featured bài mới nhất của chuyên mục đó
    const mainPost = postsToShow.length > 0 ? postsToShow[0] : null;
    const leftContainer = document.getElementById("tab-cm-featured-wrap");
    if (leftContainer) {
      if (mainPost) {
        const hasMainImg = Boolean(mainPost.hinhAnh && mainPost.hinhAnh.trim());
        leftContainer.innerHTML = `
          <article class="featured-article-card" onclick="openArticleModal('${mainPost.id || ''}')" style="cursor: pointer;">
            ${hasMainImg ? `
            <div class="featured-art-img-wrap">
              <img src="${mainPost.hinhAnh}" alt="${mainPost.tieuDe || ''}" class="featured-art-img">
              <span class="article-category-tag">${mainPost.chuyenMuc || ''}</span>
            </div>` : `
            <div style="padding: 16px 20px 0 20px;">
              <span class="article-category-tag" style="position: static; display: inline-block;">${mainPost.chuyenMuc || ''}</span>
            </div>`}
            <div class="featured-art-body">
              <h4 class="featured-art-title">
                <a href="#" onclick="openArticleModal('${mainPost.id || ''}'); return false;">${mainPost.tieuDe || ''}</a>
              </h4>
              <div class="featured-art-meta">
                <span>${mainPost.tacGia || 'Thầy Duy Tâm Phúc'}</span>
                &bull;
                <span>${mainPost.ngayDang || ''}</span>
              </div>
              <p class="featured-art-desc">
                ${mainPost.tomTat || ''}
              </p>
            </div>
          </article>
        `;
      } else {
        leftContainer.innerHTML = `
          <div style="padding: 36px 20px; text-align: center; background: #FFF; border: 1px dashed #DFBA73; border-radius: 8px; color: #7B6858;">
            <p style="font-size: 15px; font-weight: 700; color: #7A1414; margin-bottom: 6px;">Chưa có bài viết tiêu điểm trong chuyên mục này</p>
            <p style="font-size: 13px; margin: 0;">Nội dung đang được cập nhật, vui lòng quay lại sau.</p>
          </div>
        `;
      }
    }

    // 2. Các bài mới tiếp theo của chuyên mục đó
    const sideContainer = document.getElementById("tab-cm-side-list");
    if (sideContainer) {
      let sideHtml = "";
      const sidePosts = postsToShow.slice(1, 6);
      if (sidePosts.length === 0) {
        sideContainer.innerHTML = postsToShow.length === 0 ? "" : `
          <div style="padding: 20px; text-align: center; background: #FFF; border: 1px dashed #DFBA73; border-radius: 6px; font-size: 12.5px; color: #7B6858;">
            Đang cập nhật thêm các bài viết cùng chuyên mục...
          </div>
        `;
      } else {
        sidePosts.forEach(post => {
          const hasSideImg = Boolean(post.hinhAnh && post.hinhAnh.trim());
          sideHtml += `
            <article class="side-article-item" onclick="openArticleModal('${post.id || ''}')" style="cursor: pointer;">
              ${hasSideImg ? `
              <div class="side-art-thumb">
                <img src="${post.hinhAnh}" alt="${post.tieuDe || ''}">
              </div>` : ''}
              <div class="side-art-content"${!hasSideImg ? ' style="padding-left: 0;"' : ''}>
                <h5 class="side-art-title">
                  <a href="#" onclick="openArticleModal('${post.id || ''}'); return false;">${post.tieuDe || ''}</a>
                </h5>
                <span class="side-art-date">${post.ngayDang || ''}</span>
              </div>
            </article>
          `;
        });
        sideContainer.innerHTML = sideHtml;
      }
    }

    // 3. Ẩn khối tìm kiếm & lọc chuyên mục (ảnh 2) và danh sách bài viết cũ khi xem Khóa Học hoặc Diễn Đàn
    const isSpecialSingleCat = (tabCmCurrentCategory === "Khóa Học" || tabCmCurrentCategory === "Diễn Đàn");
    const filterSection = document.getElementById("tab-cm-danh-sach");
    const olderSection = document.getElementById("tab-cm-older-articles-sec");
    const viewAllLink = document.getElementById("tab-cm-view-all-link");

    if (filterSection) {
      filterSection.style.display = isSpecialSingleCat ? "none" : "";
    }
    if (olderSection) {
      olderSection.style.display = isSpecialSingleCat ? "none" : "";
    }
    if (viewAllLink) {
      viewAllLink.style.display = isSpecialSingleCat ? "none" : "";
    }

    // 4. Danh sách các bài viết bên dưới theo bộ lọc (nếu không phải Khóa Học / Diễn Đàn)
    if (!isSpecialSingleCat) {
      renderTabCmFeed();
    }
  };

  function renderTabCmFeed() {
    const container = document.getElementById("tab-cm-articles-feed");
    if (!container) return;

    const allSorted = getSortedArticles();
    const kw = tabCmCurrentSearch.trim().toLowerCase();

    const filtered = allSorted.filter(p => {
      if (!isArticleInCurrentCategory(p, tabCmCurrentCategory, tabCmCurrentSubCategory)) return false;
      if (kw) {
        const matchTitle = (p.tieuDe || "").toLowerCase().includes(kw);
        const matchCat = (p.chuyenMuc || "").toLowerCase().includes(kw);
        const matchDesc = (p.tomTat || "").toLowerCase().includes(kw);
        if (!matchTitle && !matchCat && !matchDesc) return false;
      }
      return true;
    });

    const badge = document.getElementById("tab-cm-count-badge");
    if (badge) badge.textContent = filtered.length + " Bài Viết";

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 36px 20px; text-align: center; background: #FFF; border: 1px dashed #DFBA73; border-radius: 8px; color: #7B6858;">
          <p style="font-size: 15px; font-weight: 700; color: #7A1414; margin-bottom: 6px;">Không tìm thấy bài viết nào phù hợp!</p>
          <p style="font-size: 13px; margin: 0;">Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn chuyên mục "Tất Cả".</p>
        </div>
      `;
      return;
    }

    if (!kw) {
      filtered.sort((a, b) => {
        const timeA = Math.max(parseDateVN(a.ngayDang), a.updatedAt || 0);
        const timeB = Math.max(parseDateVN(b.ngayDang), b.updatedAt || 0);
        if (timeB !== timeA) return timeB - timeA;
        const uA = a.uuTienFeed || 999;
        const uB = b.uuTienFeed || 999;
        return uA - uB;
      });
    }

    let html = "";
    filtered.forEach(p => {
      let cm = p.chuyenMuc || "";
      let shortCat = "Tử Vi";
      if (cm.includes("Kiến Thức") || cm.includes("Công Thức")) shortCat = "Kiến Thức";
      else if (cm.includes("Tâm Linh")) shortCat = "Tâm Linh";
      else if (cm.includes("Lễ Nghi") || cm.includes("Văn Khấn")) shortCat = "Lễ Nghi";
      else if (cm.includes("Xem Ngày") || cm.includes("Đổng Công")) shortCat = "Xem Ngày";
      else if (cm.indexOf("Phong") >= 0) shortCat = "Phong Thủy";
      else if (cm.indexOf("Dịch") >= 0 || cm.indexOf("Dich") >= 0) shortCat = "Kinh Dịch";
      else if (cm.indexOf("Tướng") >= 0 || cm.indexOf("Tuong") >= 0) shortCat = "Tướng Số";
      else if (cm.indexOf("Sim") >= 0) shortCat = "Bói Sim";
      else if (cm.indexOf("Khóa Học") >= 0) shortCat = "Khóa Học";
      else if (cm.indexOf("Diễn Đàn") >= 0) shortCat = "Diễn Đàn";
      else if (cm) shortCat = cm.length > 14 ? cm.substring(0, 12) + ".." : cm;
      else shortCat = "Tử Vi";

      const hasCardImg = Boolean(p.hinhAnh && p.hinhAnh.trim());
      let imgPath = hasCardImg ? p.hinhAnh.trim() : "";
      if (imgPath && imgPath.startsWith("assets/") && !imgPath.startsWith("assets/images/") && !imgPath.includes("extracted") && !imgPath.endsWith(".png")) {
        imgPath = imgPath.replace("assets/", "assets/images/");
      }

      html += `
        <article class="article-card-item" onclick="openArticleModal('${p.id}')">
          ${hasCardImg ? `
          <div class="article-card-thumb-wrap">
            <img src="${imgPath}" alt="${p.tieuDe}" class="article-card-thumb-img" onerror="this.onerror=null; this.parentElement.style.display='none';">
            <span class="article-card-cat-badge">${shortCat}</span>
          </div>` : `
          <div style="padding: 12px 14px 0 14px;">
            <span class="article-card-cat-badge" style="position: static; display: inline-block;">${shortCat}</span>
          </div>`}
          <div class="article-card-content">
            <h4 class="article-card-title">${p.tieuDe}</h4>
            <div class="article-card-meta">
              <span class="article-card-meta-info"><strong class="article-card-meta-author">${p.tacGia || "Thầy Duy Tâm Phúc"}</strong> <span class="article-card-meta-date">- ${p.ngayDang || "15/09/2026"}</span></span>
              <span class="article-comment-badge">0</span>
            </div>
          </div>
        </article>
      `;
    });
    container.innerHTML = html;
  }

  // Gắn sự kiện bộ lọc và tìm kiếm cho tab Chuyên Mục
  function initTabCmEvents() {
    const catGroup = document.getElementById("tab-cm-cat-filters");
    if (catGroup) {
      const catBtns = catGroup.querySelectorAll(".filter-cat-pill");
      catBtns.forEach(btn => {
        btn.onclick = function() {
          catBtns.forEach(b => b.classList.remove("active"));
          this.classList.add("active");
          const selCat = this.getAttribute("data-cat") || "all";
          tabCmCurrentCategory = selCat;
          tabCmCurrentSubCategory = null;

          // Đồng bộ trạng thái đỏ cho quick-pill và thanh navbar
          document.querySelectorAll(".quick-pill").forEach(p => p.classList.remove("active"));
          document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
          const selLower = selCat.toLowerCase();
          if (selLower.includes("tướng") || selLower.includes("tuong")) {
            const pillTS = document.getElementById("quick-pill-tuongso");
            if (pillTS) pillTS.classList.add("active");
          } else if (selLower.includes("kinh dịch")) {
            const pillKD = document.getElementById("quick-pill-kinhdich");
            if (pillKD) pillKD.classList.add("active");
          } else if (selLower.includes("tử vi")) {
            const pillTV = document.getElementById("quick-pill-tuvi");
            if (pillTV) pillTV.classList.add("active");
          } else if (selLower.includes("tứ trụ") || selLower.includes("bát tự")) {
            const pillTT = document.getElementById("quick-pill-tutru");
            if (pillTT) pillTT.classList.add("active");
          } else if (selLower.includes("sim")) {
            const pillBS = document.getElementById("quick-pill-boisim");
            if (pillBS) pillBS.classList.add("active");
          } else if (selCat === "all") {
            const navCm = document.getElementById("nav-item-chuyenmuc");
            if (navCm) navCm.classList.add("active");
          } else if (selCat === "Kiến Thức") {
            const navKT = document.getElementById("nav-item-kienthuc");
            if (navKT) navKT.classList.add("active");
          } else if (selCat === "Tâm Linh") {
            const navTL = document.getElementById("nav-item-tamlinh");
            if (navTL) navTL.classList.add("active");
          } else if (selCat === "Lễ Nghi") {
            const navLN = document.getElementById("nav-item-lenghi");
            if (navLN) navLN.classList.add("active");
          } else if (selLower.includes("phong thủy")) {
            const navPT = document.getElementById("nav-item-phongthuy");
            if (navPT) navPT.classList.add("active");
          } else if (selCat === "Khóa Học") {
            const navKH = document.getElementById("nav-item-khoahoc");
            if (navKH) navKH.classList.add("active");
          } else if (selCat === "Diễn Đàn") {
            const navDD = document.getElementById("nav-item-diendan");
            if (navDD) navDD.classList.add("active");
          }

          renderTabCmSubCategories(selCat, null);
          window.renderChuyenMucTab();
        };
      });
    }

    const searchBox = document.getElementById("tab-cm-search");
    if (searchBox) {
      searchBox.oninput = function() {
        tabCmCurrentSearch = this.value;
        renderTabCmFeed();
      };
    }

    const modal = document.getElementById("article-reader-modal");
    if (modal) {
      modal.onclick = function(e) {
        if (e.target === modal) window.closeArticleModal();
      };
    }
  }

  // Lắng nghe sự kiện lưu/sửa bài từ trang viet-bai.html để đồng bộ tức thì sang trang chủ
  window.addEventListener("storage", function(e) {
    if (e.key === "BAI_VIET_SYNC_TRIGGER" || (e.key && e.key.includes("BAI_VIET"))) {
      if (typeof window.renderChuyenMucTab === "function") {
        window.renderChuyenMucTab();
      }
    }
  });

  // =========================================================================
  // CHUYỂN ĐỔI TAB MƯỢT MÀ: TRANG CHỦ <-> LỊCH VẠN SỰ <-> CHUYÊN MỤC
  // =========================================================================
  window.chuyenTab = function(tabName, targetCategory) {
    const tabTrangChu = document.getElementById("tab-trangchu");
    const tabLich = document.getElementById("tab-lich");
    const tabChuyenMuc = document.getElementById("tab-chuyenmuc");
    const tabKinhDich = document.getElementById("tab-kinhdich");
    const tabLichAmDuong = document.getElementById("tab-lich-amduong");
    const tabLichHomNay = document.getElementById("tab-lich-homnay");
    const tabLichThang = document.getElementById("tab-lich-thang");
    const tabTutru = document.getElementById("tab-tutru");
    const pillKinhDich = document.getElementById("quick-pill-kinhdich");
    const pillTutru = document.getElementById("quick-pill-tutru");
    const pillBoiSim = document.getElementById("quick-pill-boisim");
    const pillLich = document.getElementById("quick-pill-lich");
    const pillTuVi = document.getElementById("quick-pill-tuvi");
    const pillTuongSo = document.getElementById("quick-pill-tuongso");
    const navTrangChu = document.getElementById("nav-item-trangchu");
    const navChuyenMuc = document.getElementById("nav-item-chuyenmuc");
    const navLich = document.getElementById("nav-item-lich");
    const navKienThuc = document.getElementById("nav-item-kienthuc");
    const tabBoiSim = document.getElementById("tab-boisim");
    const navBoiSim = document.getElementById("nav-item-boisim");
    const navPhongThuy = document.getElementById("nav-item-phongthuy");

    // Reset active tren navbar va quick pills
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });
    document.querySelectorAll(".quick-pill").forEach(pill => {
      pill.classList.remove("active");
    });

    if (tabName === "chuyenmuc" || tabName === "kienthuc") {
      document.body.classList.add("is-tab-chuyenmuc");
    } else {
      document.body.classList.remove("is-tab-chuyenmuc");
    }

    if (tabName === "kinhdich") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabKinhDich) {
        tabKinhDich.style.display = "block";
        tabKinhDich.classList.remove("hidden");
      }
      if (pillKinhDich) pillKinhDich.classList.add("active");

      // YÊU CẦU: KHI BẤM VÀO KINH DỊCH Ở ẢNH 2 LÚC NÀO CŨNG PHẢI VỀ ẢNH THỨ 3 (GIAO DIỆN LẬP QUẺ BAN ĐẦU)
      const setupBox = document.getElementById('kd-hinh-1-container');
      const xuatQuePanel = document.getElementById('view-xuat-que');
      const kdHeader = document.querySelector('#kinhdich .lich-section-header');

      if (setupBox) setupBox.style.display = 'block';
      if (xuatQuePanel) {
        xuatQuePanel.style.display = 'none';
        xuatQuePanel.classList.remove('active');
      }
      if (kdHeader) kdHeader.style.display = '';
      const secBody = document.querySelector('#kinhdich .lich-section-body');
      if (secBody) secBody.style.padding = '16px';

      if (typeof window.switchKdSubTab === 'function') {
        window.switchKdSubTab('maihoa');
      }

      if (typeof window.initKinhDichTab === "function") {
        window.initKinhDichTab();
      }

      // Cuộn lên phần Kinh Dịch hoặc đầu trang
      const kdCard = document.getElementById('kinhdich');
      if (kdCard) {
        kdCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

    } else if (tabName === "chuyenmuc" || tabName === "kienthuc") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabChuyenMuc) {
        tabChuyenMuc.style.display = "block";
        tabChuyenMuc.classList.remove("hidden");
      }

      let activeParent = "all";
      let activeSub = null;

      if (tabName === "kienthuc" && !targetCategory) {
        activeParent = "Kiến Thức";
        activeSub = null;
      } else if (targetCategory) {
        const foundParent = findParentCategory(targetCategory);
        if (foundParent) {
          activeParent = foundParent;
          if (foundParent.toLowerCase() === targetCategory.toLowerCase()) {
            activeSub = null;
          } else {
            activeSub = targetCategory;
          }
        } else {
          activeParent = targetCategory;
          activeSub = null;
        }
      } else {
        activeParent = "all";
        activeSub = null;
      }

      tabCmCurrentCategory = activeParent;
      tabCmCurrentSubCategory = activeSub;

      // Cập nhật nút active trên thanh Chuyên Mục (#tab-cm-cat-filters)
      const catGroup = document.getElementById("tab-cm-cat-filters");
      if (catGroup) {
        const catBtns = catGroup.querySelectorAll(".filter-cat-pill");
        catBtns.forEach(b => {
          const bCat = (b.getAttribute("data-cat") || "").toLowerCase();
          const pCat = activeParent.toLowerCase();
          if (bCat === pCat || (pCat.includes("phong thủy") && bCat.includes("phong thủy")) || (pCat.includes("tướng") && bCat.includes("tướng"))) {
            b.classList.add("active");
          } else {
            b.classList.remove("active");
          }
        });
      }

      // Cập nhật thanh phân loại con (#tab-cm-subcat-bar)
      renderTabCmSubCategories(activeParent, activeSub);

      // Cập nhật active trên main nav & quick-pills
      document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
      document.querySelectorAll(".quick-pill").forEach(p => p.classList.remove("active"));

      const actNorm = (activeParent || "").toLowerCase();
      if (actNorm.includes("tướng") || actNorm.includes("tuong")) {
        // Đang xem Tướng Số -> Nút Tướng Số trên Quick-Pill báo đỏ, thanh navbar bên dưới KHÔNG ĐƯỢC ĐỎ!
        if (pillTuongSo) pillTuongSo.classList.add("active");
      } else if (actNorm.includes("kinh dịch")) {
        if (pillKinhDich) pillKinhDich.classList.add("active");
      } else if (actNorm.includes("tử vi")) {
        if (pillTuVi) pillTuVi.classList.add("active");
      } else if (actNorm.includes("tứ trụ") || actNorm.includes("bát tự")) {
        if (pillTutru) pillTutru.classList.add("active");
      } else if (actNorm.includes("sim")) {
        if (pillBoiSim) pillBoiSim.classList.add("active");
      } else if (actNorm.includes("lịch")) {
        if (pillLich) pillLich.classList.add("active");
      } else if (activeParent === "Kiến Thức") {
        if (navKienThuc) navKienThuc.classList.add("active");
        else if (navChuyenMuc) navChuyenMuc.classList.add("active");
      } else if (activeParent === "Tâm Linh") {
        const n = document.getElementById("nav-item-tamlinh");
        if (n) n.classList.add("active");
      } else if (activeParent === "Lễ Nghi") {
        const n = document.getElementById("nav-item-lenghi");
        if (n) n.classList.add("active");
      } else if (activeParent.includes("Phong Thủy")) {
        const n = document.getElementById("nav-item-phongthuy");
        if (n) n.classList.add("active");
      } else if (activeParent === "Khóa Học") {
        const n = document.getElementById("nav-item-khoahoc");
        if (n) n.classList.add("active");
      } else if (activeParent === "Diễn Đàn") {
        const n = document.getElementById("nav-item-diendan");
        if (n) n.classList.add("active");
      } else {
        // Chỉ khi người dùng bấm trực tiếp vào mục "Chuyên Mục" tổng quát (all) thì mới sáng đỏ nút Chuyên Mục ở thanh dưới
        if (navChuyenMuc) navChuyenMuc.classList.add("active");
      }

      initTabCmEvents();
      if (typeof window.renderChuyenMucTab === "function") {
        window.renderChuyenMucTab();
      }

      setTimeout(function() {
        const target = tabChuyenMuc;
        if (target) {
          const navEl = document.querySelector(".main-nav");
          const navHeight = navEl ? navEl.offsetHeight : 50;
          const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        }
      }, 50);

    } else if (tabName === "lich" || tabName === "lich-van-su") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabLich) {
        tabLich.style.display = "block";
        tabLich.classList.remove("hidden");
      }
      if (pillLich) pillLich.classList.add("active");

      // Khoi tao va tinh toan du lieu Trach Nhat
      if (typeof window.khoiTaoBoChonNgayMain === "function") {
        window.khoiTaoBoChonNgayMain();
      }
      if (typeof window.xuLyChonNgayMain === "function") {
        window.xuLyChonNgayMain();
      }
      if (typeof window.canChinhChanLich === "function") {
        window.canChinhChanLich();
        setTimeout(window.canChinhChanLich, 50);
        setTimeout(window.canChinhChanLich, 200);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else if (tabName === "lich-amduong" || tabName === "lich-am-duong") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabLichAmDuong) {
        tabLichAmDuong.style.display = "block";
        tabLichAmDuong.classList.remove("hidden");
      }
      if (pillLich) pillLich.classList.add("active");

      if (window.LICH_AM_DUONG && typeof window.LICH_AM_DUONG.init === "function") {
        window.LICH_AM_DUONG.init();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else if (tabName === "lich-homnay" || tabName === "lich-hom-nay") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabLichHomNay) {
        tabLichHomNay.style.display = "block";
        tabLichHomNay.classList.remove("hidden");
      }
      if (pillLich) pillLich.classList.add("active");

      if (window.hienThiLichHomNay) {
        window.hienThiLichHomNay();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else if (tabName === "lich-thang") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabLichThang) {
        tabLichThang.style.display = "block";
        tabLichThang.classList.remove("hidden");
      }
      if (pillLich) pillLich.classList.add("active");

      if (window.LICH_THANG && typeof window.LICH_THANG.init === "function") {
        window.LICH_THANG.init();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else if (tabName === "tutru") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (tabTutru) {
        tabTutru.style.display = "block";
        tabTutru.classList.remove("hidden");
      }
      if (pillTutru) pillTutru.classList.add("active");

      if (typeof window.initTuTruTab === "function") {
        window.initTuTruTab();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else if (tabName === "boisim" || tabName === "sim") {
      if (tabTrangChu) tabTrangChu.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLich) tabLich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichHomNay) tabLichHomNay.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) {
        tabBoiSim.style.display = "block";
        tabBoiSim.classList.remove("hidden");
      }
      if (pillBoiSim) pillBoiSim.classList.add("active");

      if (typeof window.initBoiSimTab === "function") {
        window.initBoiSimTab();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else {
      if (tabTrangChu) tabTrangChu.style.display = "block";
      if (tabLich) tabLich.style.display = "none";
      if (tabChuyenMuc) tabChuyenMuc.style.display = "none";
      if (tabKinhDich) tabKinhDich.style.display = "none";
      if (tabLichAmDuong) tabLichAmDuong.style.display = "none";
      if (tabLichThang) tabLichThang.style.display = "none";
      if (tabTutru) tabTutru.style.display = "none";
      if (tabBoiSim) tabBoiSim.style.display = "none";
      if (navTrangChu) navTrangChu.classList.add("active");

      if (typeof window.setCheDoTrangChu === 'function') {
        window.setCheDoTrangChu();
      }

      window.scrollTo(0, 0);
      if (typeof window.syncChuyenMuc === 'function') {
        window.syncChuyenMuc();
      }
    }
  };

  // Lắng nghe sự kiện click trên toàn trang để chuyển tab
  document.addEventListener("click", function(e) {
    const el = e.target.closest("a, button, li");
    if (!el) return;

    const href = el.getAttribute("href") || "";
    const txt = (el.innerText || "").trim().toUpperCase();

    if (el.id === "quick-pill-kinhdich" || href === "#kinhdich" || (txt === "KINH DỊCH" && el.classList.contains("quick-pill"))) {
      if (document.getElementById("tab-kinhdich")) {
        e.preventDefault();
        window.chuyenTab("kinhdich");
      }
    } else if (el.id === "quick-pill-tutru" || href === "#tutru" || (txt === "TỨ TRỤ" && el.classList.contains("quick-pill"))) {
      if (document.getElementById("tab-tutru")) {
        e.preventDefault();
        window.chuyenTab("tutru");
      }
    } else if (el.id === "quick-pill-boisim" || href === "#boisim" || (txt === "XEM BÓI SIM" && el.classList.contains("quick-pill"))) {
      if (document.getElementById("tab-boisim")) {
        e.preventDefault();
        window.chuyenTab("boisim");
      }
    } else if (el.id === "quick-pill-lich" || (href === "#lich" && el.classList.contains("quick-pill")) || (txt === "LỊCH VẠN SỰ" && el.classList.contains("quick-pill"))) {
      if (document.getElementById("tab-lich")) {
        e.preventDefault();
        window.chuyenTab("lich");
      }
    } else if (el.id === "quick-pill-tuvi" || (txt === "TỬ VI" && el.classList.contains("quick-pill"))) {
      e.preventDefault();
      if (typeof window.moLapLaSoTuVi === "function") window.moLapLaSoTuVi();
    } else if (el.id === "quick-pill-tuongso" || href === "#tuongso" || (txt === "TƯỚNG SỐ" && el.classList.contains("quick-pill"))) {
      e.preventDefault();
      window.chuyenTab("chuyenmuc", "Tướng Số");
      if (typeof window.chonkhamChuyenMuc === "function") window.chonkhamChuyenMuc("Tướng Số");
    } else if (el.id === "nav-item-chuyenmuc" || el.closest("#nav-item-chuyenmuc") || href === "#chuyenmuc" || (txt === "CHUYÊN MỤC" && el.classList.contains("nav-link"))) {
      if (document.getElementById("tab-chuyenmuc")) {
        e.preventDefault();
        window.chuyenTab("chuyenmuc");
      }
    } else if (el.id === "nav-item-kienthuc" || el.closest("#nav-item-kienthuc") || href === "#kienthuc" || (txt === "KIẾN THỨC" && el.classList.contains("nav-link"))) {
      if (document.getElementById("tab-chuyenmuc")) {
        e.preventDefault();
        window.chuyenTab("kienthuc");
      }
    } else if (el.id === "nav-item-lich" || el.closest("#nav-item-lich") || href === "#lich" || href === "#lich-van-su" || (txt === "LỊCH VẠN SỰ" && el.classList.contains("nav-link"))) {
      if (document.getElementById("tab-lich")) {
        e.preventDefault();
        window.chuyenTab("lich");
      }
    } else if (el.id === "nav-item-trangchu" || el.closest("#nav-item-trangchu") || href === "#trangchu" || (txt === "TRANG CHỦ" && el.classList.contains("nav-link"))) {
      if (document.getElementById("tab-trangchu")) {
        e.preventDefault();
        window.chuyenTab("trangchu");
      }
    }
  });

  function khoiDongTabTrang() {
    if (typeof window.khoiTaoBoChonNgayMain === "function") {
      window.khoiTaoBoChonNgayMain();
    }
    if (typeof window.xuLyChonNgayMain === "function") {
      window.xuLyChonNgayMain();
    }

    // Kiểm tra nếu trang vừa được F5 / Reload: luôn quay về Trang Chủ
    var isReload = false;
    try {
      var navEntries = performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0 && navEntries[0].type === 'reload') {
        isReload = true;
      } else if (window.performance && window.performance.navigation && window.performance.navigation.type === 1) {
        isReload = true;
      }
    } catch(e) {}
    try {
      if (sessionStorage.getItem('PAGE_RELOADED_FLAG') === '1') {
        isReload = true;
      }
    } catch(e) {}

    if (isReload) {
      if (window.location.hash && window.location.hash !== '#trangchu') {
        try {
          history.replaceState(null, null, window.location.pathname);
        } catch(err) {
          window.location.hash = '';
        }
      }
      window.chuyenTab("trangchu");
      return;
    }

    const h = window.location.hash;
    if (h === "#kinhdich" || h === "#tab-kinhdich") {
      window.chuyenTab("kinhdich");
    } else
    if (h === "#chuyenmuc" || h === "#tab-chuyenmuc" || h === "#kienthuc" || h === "#tab-kienthuc") {
      window.chuyenTab(h === "#kienthuc" || h === "#tab-kienthuc" ? "kienthuc" : "chuyenmuc");
    } else if (h === "#lich" || h === "#lich-van-su" || h === "#tab-lich") {
      window.chuyenTab("lich");
    } else if (h === "#lich-am-duong" || h === "#lich-amduong" || h === "#am-duong") {
      window.chuyenTab("lich-amduong");
    } else if (h === "#lich-hom-nay" || h === "#lich-homnay" || h === "#hom-nay") {
      window.chuyenTab("lich-homnay");
    } else if (h === "#lich-thang") {
      window.chuyenTab("lich-thang");
    } else if (h === "#tamlinh" || h === "#tab-tamlinh") {
      window.chuyenTab("chuyenmuc", "Tâm Linh");
    } else if (h === "#lenghi" || h === "#tab-lenghi") {
      window.chuyenTab("chuyenmuc", "Lễ Nghi");
    } else if (h === "#tuvi" || h === "#tab-tuvi" || h === "#cm-tuvi") {
      window.chuyenTab("chuyenmuc", "Tử Vi");
    } else if (h === "#xemngay" || h === "#tab-xemngay") {
      window.chuyenTab("chuyenmuc", "Xem Ngày");
    } else if (h === "#xemtuoi" || h === "#tab-xemtuoi") {
      window.chuyenTab("chuyenmuc", "Xem Tuổi");
    } else if (h === "#tutru" || h === "#tab-tutru") {
      window.chuyenTab("tutru");
    } else if (h === "#tuongso" || h === "#tab-tuongso") {
      window.chuyenTab("chuyenmuc", "Tướng Số");
    } else if (h === "#boisim" || h === "#tab-boisim") {
      window.chuyenTab("boisim");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", khoiDongTabTrang);
  } else {
    khoiDongTabTrang();
  }

  window.addEventListener("hashchange", function() {
    const h = window.location.hash;
    if (h === "#kinhdich" || h === "#tab-kinhdich") {
      window.chuyenTab("kinhdich");
    } else
    if (h === "#chuyenmuc" || h === "#tab-chuyenmuc" || h === "#kienthuc" || h === "#tab-kienthuc") {
      window.chuyenTab(h === "#kienthuc" || h === "#tab-kienthuc" ? "kienthuc" : "chuyenmuc");
    } else if (h === "#tuvi" || h === "#tab-tuvi" || h === "#cm-tuvi") {
      window.chuyenTab("chuyenmuc", "Tử Vi");
    } else if (h === "#xemngay" || h === "#tab-xemngay") {
      window.chuyenTab("chuyenmuc", "Xem Ngày");
    } else if (h === "#xemtuoi" || h === "#tab-xemtuoi") {
      window.chuyenTab("chuyenmuc", "Xem Tuổi");
    } else if (h === "#tamlinh" || h === "#tab-tamlinh") {
      window.chuyenTab("chuyenmuc", "Tâm Linh");
    } else if (h === "#lenghi" || h === "#tab-lenghi") {
      window.chuyenTab("chuyenmuc", "Lễ Nghi");
    } else if (h === "#phongthuy" || h === "#tab-phongthuy") {
      window.chuyenTab("chuyenmuc", "Phong Thủy");
    } else if (h === "#lich" || h === "#lich-van-su" || h === "#tab-lich") {
      window.chuyenTab("lich");
    } else if (h === "#lich-am-duong" || h === "#lich-amduong" || h === "#am-duong") {
      window.chuyenTab("lich-amduong");
    } else if (h === "#lich-hom-nay" || h === "#lich-homnay" || h === "#hom-nay") {
      window.chuyenTab("lich-homnay");
    } else if (h === "#lich-thang") {
      window.chuyenTab("lich-thang");
    } else if (h === "#tutru" || h === "#tab-tutru") {
      window.chuyenTab("tutru");
    } else if (h === "#tuongso" || h === "#tab-tuongso") {
      window.chuyenTab("chuyenmuc", "Tướng Số");
    } else if (h === "#boisim" || h === "#tab-boisim") {
      window.chuyenTab("boisim");
    } else if (h === "#trangchu" || h === "" || h === "#") {
      window.chuyenTab("trangchu");
    }
  });
})();
/* ==========================================================================
   MODULE KINH DỊCH & 64 QUẺ DỊCH - GIAO DIỆN CHÍNH TÔNG
   ========================================================================== */

(function(window) {
  // Trạng thái hiện tại
  let isKdInitialized = false;
  let currentKdSubtab = 'maihoa';
  let dongXuTossIndex = 1; // 1 to 6
  let dongXuHistory = []; // { haoNum, val, score, isDong, name }
  let clockInterval = null;


  // ==========================================================================
  // MODULE KINH DỊCH & BỐI DỊCH CHÍNH TÔNG (MAI HOA, LỤC HÀO, NGẪU NHIÊN, XU)
  // Chuẩn phương pháp Bói Dịch tuvivietnam.vn/boidich1/ & Đồ Bản Dịch Quái
  // ĐÃ BỎ Ô HỌ VÀ TÊN THEO YÊU CẦU CỦA NGƯỜI DÙNG
  // ==========================================================================

  // Chuyển đổi giữa các Subtabs trong Kinh Dịch
  window.switchKdSubTab = function(subtab) {
    currentKdSubtab = subtab;
    const setupBox = document.getElementById('kd-hinh-1-container');
    const xuatQuePanel = document.getElementById('view-xuat-que');

    if (subtab === 'xuatque') {
      if (setupBox) setupBox.style.display = 'none';
      if (xuatQuePanel) {
        xuatQuePanel.style.display = 'block';
        xuatQuePanel.classList.add('active');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (setupBox) setupBox.style.display = 'block';
    if (xuatQuePanel) {
      xuatQuePanel.style.display = 'none';
      xuatQuePanel.classList.remove('active');
    }

    const allViews = {
      maihoa: document.getElementById('view-mai-hoa'),
      luchao: document.getElementById('view-luc-hao'),
      dongxu: document.getElementById('view-dong-xu'),
      huongdan: document.getElementById('view-huong-dan')
    };

    const allBtns = {
      maihoa: document.getElementById('kd-subtab-btn-maihoa'),
      luchao: document.getElementById('kd-subtab-btn-luchao'),
      dongxu: document.getElementById('kd-subtab-btn-dongxu'),
      xuatque: document.getElementById('kd-subtab-btn-xuatque'),
      huongdan: document.getElementById('kd-subtab-btn-huongdan')
    };

    Object.keys(allViews).forEach(key => {
      if (allViews[key]) {
        if (key === subtab) {
          allViews[key].classList.add('active');
          allViews[key].style.display = 'block';
        } else {
          allViews[key].classList.remove('active');
          allViews[key].style.display = 'none';
        }
      }
    });

    Object.keys(allBtns).forEach(key => {
      if (allBtns[key]) {
        if (key === subtab) {
          allBtns[key].classList.add('active');
        } else {
          allBtns[key].classList.remove('active');
        }
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quay lại giao diện thiết lập lập quẻ (Hình 1)
  window.quayLaiLapQue = function() {
    if (typeof window.closeKinhDichModal === 'function') {
      window.closeKinhDichModal();
    }
    const setupBox = document.getElementById('kd-hinh-1-container');
    const xuatQuePanel = document.getElementById('view-xuat-que');
    if (setupBox) {
      setupBox.style.display = 'block';
    }
    if (xuatQuePanel) {
      xuatQuePanel.style.display = 'none';
      xuatQuePanel.classList.remove('active');
    }
    const kdHeader = document.querySelector('#kinhdich .lich-section-header');
    if (kdHeader) {
      kdHeader.style.display = '';
    }
    const secBody = document.querySelector('#kinhdich .lich-section-body');
    if (secBody) {
      secBody.style.padding = '16px';
    }
    if (typeof window.switchKdSubTab === 'function') {
      window.switchKdSubTab(currentKdSubtab && currentKdSubtab !== 'xuatque' ? currentKdSubtab : 'maihoa');
    }
    const card = document.getElementById('kinhdich');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lấy thông tin chiêm bốc & Dụng Thần dùng chung (Không có Họ và Tên)
  function getKdSharedParams() {
    const questionInput = document.getElementById('kd-noidung-input');
    const question = (questionInput ? questionInput.value : '').trim() || 'Hỏi việc đại sự và vận may sắp tới';
    const dungThanSelect = document.getElementById('kd-dungthan-select');
    const dungThan = parseInt(dungThanSelect ? dungThanSelect.value : '5', 10) || 5;
    const cachTinhToanRadio = document.querySelector('input[name="kd-cach-tinhtoan"]:checked');
    const cachTinhToan = parseInt(cachTinhToanRadio ? cachTinhToanRadio.value : '1', 10);
    return { question, dungThan, cachTinhToan };
  }

  // Khởi tạo toàn bộ module Kinh Dịch
  window.initKinhDichTab = function() {
    if (isKdInitialized) return;
    isKdInitialized = true;

    initQuickQuestionButtons();
    initMaiHoaEvents();
    initLucHaoEvents();
    initNgauNhienEvents();
    initDongXuEvents();
    initTraCuu64Events();
  };

  // 1. Nút & Dropdown câu hỏi gợi ý nhanh (Gán thẳng vào ô Chiêm sự chung)
  function initQuickQuestionButtons() {
    const quickSelect = document.getElementById('kd-quick-select');
    if (quickSelect) {
      quickSelect.addEventListener('change', function() {
        const mainInput = document.getElementById('kd-noidung-input');
        if (mainInput && this.value) {
          mainInput.value = this.value;
        }
      });
    }

    document.querySelectorAll('.quick-question-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.getAttribute('data-text');
        const mainInput = document.getElementById('kd-noidung-input');
        if (mainInput && text) {
          mainInput.value = text;
        }
      });
    });
  }

  // 2. Mai Hoa Dịch Số Events (Hỗ trợ Dương lịch & Âm lịch chuẩn tuvivietnam.vn/boidich1/)
  function initMaiHoaEvents() {
    const typeDuongRadio = document.getElementById('maihoa-type-duong');
    const typeAmRadio = document.getElementById('maihoa-type-am');
    const duongBox = document.getElementById('maihoa-duonglich-box');
    const amBox = document.getElementById('maihoa-amlich-box');
    const numBox = document.getElementById('maihoa-number-box');
    const btnToggleNum = document.getElementById('btn-toggle-number-box');
    const btnSyncNow = document.getElementById('btn-sync-maihoa-now');
    const btnRandom = document.getElementById('btn-random-maihoa-numbers');
    const btnExec = document.getElementById('btn-execute-maihoa');

    // Chuyển đổi qua lại giữa Dương lịch và Âm lịch
    if (typeDuongRadio) {
      typeDuongRadio.addEventListener('change', function() {
        if (this.checked) {
          if (duongBox) duongBox.style.display = 'block';
          if (amBox) amBox.style.display = 'none';
        }
      });
    }
    if (typeAmRadio) {
      typeAmRadio.addEventListener('change', function() {
        if (this.checked) {
          if (duongBox) duongBox.style.display = 'none';
          if (amBox) amBox.style.display = 'block';
        }
      });
    }

    // Toggle khung nhập 3 số tâm khởi
    if (btnToggleNum && numBox) {
      btnToggleNum.addEventListener('click', function() {
        const isHidden = numBox.style.display === 'none' || !numBox.style.display;
        numBox.style.display = isHidden ? 'block' : 'none';
        this.textContent = isHidden ? '✕ Đóng Khung 3 Số Tâm Khởi' : '🎲 Hoặc Khởi Quẻ Bằng 3 Số Tâm Khởi';
      });
    }

    // Điền dữ liệu vào các dropdown Dương lịch
    const selNam = document.getElementById('maihoa-nam-duong');
    const selThang = document.getElementById('maihoa-thang-duong');
    const selNgay = document.getElementById('maihoa-ngay-duong');
    const selGio = document.getElementById('maihoa-gio-duong');
    const selPhut = document.getElementById('maihoa-phut-duong');
    const selNgayAm = document.getElementById('maihoa-ngay-am');

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curDate = now.getDate();
    const curHour = now.getHours();
    const curMin = now.getMinutes();

    // Điền năm Dương lịch: 1900 đến 2050
    if (selNam && selNam.options.length <= 1) {
      selNam.innerHTML = '';
      for (let y = curYear + 5; y >= 1920; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `Năm ${y}`;
        if (y === curYear) opt.selected = true;
        selNam.appendChild(opt);
      }
    }

    // Điền tháng Dương lịch: 1 đến 12
    if (selThang && selThang.options.length <= 1) {
      selThang.innerHTML = '';
      for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = `Tháng ${m < 10 ? '0' + m : m}`;
        if (m === curMonth) opt.selected = true;
        selThang.appendChild(opt);
      }
    }

    // Điền ngày Dương lịch: 1 đến 31
    if (selNgay && selNgay.options.length <= 1) {
      selNgay.innerHTML = '';
      for (let d = 1; d <= 31; d++) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = `Ngày ${d < 10 ? '0' + d : d}`;
        if (d === curDate) opt.selected = true;
        selNgay.appendChild(opt);
      }
    }

    // Điền giờ Dương lịch: 0 đến 23
    if (selGio && selGio.options.length <= 1) {
      selGio.innerHTML = '';
      for (let h = 0; h <= 23; h++) {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = `${h < 10 ? '0' + h : h} giờ`;
        if (h === curHour) opt.selected = true;
        selGio.appendChild(opt);
      }
    }

    // Điền phút Dương lịch: 0 đến 59
    if (selPhut && selPhut.options.length <= 1) {
      selPhut.innerHTML = '';
      for (let mi = 0; mi <= 59; mi++) {
        const opt = document.createElement('option');
        opt.value = mi;
        opt.textContent = `${mi < 10 ? '0' + mi : mi} phút`;
        if (mi === curMin) opt.selected = true;
        selPhut.appendChild(opt);
      }
    }

    // Điền ngày Âm lịch: 01 đến 30
    if (selNgayAm && selNgayAm.options.length <= 1) {
      selNgayAm.innerHTML = '';
      for (let d = 1; d <= 30; d++) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = `Ngày ${d < 10 ? '0' + d : d}`;
        if (d === 15) opt.selected = true;
        selNgayAm.appendChild(opt);
      }
    }

    // Nút đồng bộ thời gian hiện tại
    function syncToCurrentTime() {
      const n = new Date();
      if (selNam) selNam.value = n.getFullYear();
      if (selThang) selThang.value = n.getMonth() + 1;
      if (selNgay) selNgay.value = n.getDate();
      if (selGio) selGio.value = n.getHours();
      if (selPhut) selPhut.value = n.getMinutes();

      // Nếu có can chi thư viện, đồng bộ cả Âm lịch
      if (window.DICH_QUAI_ENGINE && typeof window.DICH_QUAI_ENGINE.getCanChiThoiDiem === 'function') {
        const cc = window.DICH_QUAI_ENGINE.getCanChiThoiDiem(n);
        const selCanNam = document.getElementById('maihoa-can-nam-am');
        const selChiNam = document.getElementById('maihoa-chi-nam-am');
        const selThangAm = document.getElementById('maihoa-thang-am');
        const selChiGioAm = document.getElementById('maihoa-chi-gio-am');

        if (selCanNam && cc.canNam) selCanNam.value = cc.canNam;
        if (selChiNam && cc.chiNam) selChiNam.value = cc.chiNam;
        if (selThangAm && cc.lunarMonth) selThangAm.value = cc.lunarMonth;
        if (selNgayAm && cc.lunarDay) selNgayAm.value = cc.lunarDay;
        if (selChiGioAm && cc.chiGio) selChiGioAm.value = cc.chiGio;
      }
    }

    if (btnSyncNow) {
      btnSyncNow.addEventListener('click', syncToCurrentTime);
    }
    syncToCurrentTime();

    // Nút random 3 số tâm khởi
    if (btnRandom) {
      btnRandom.addEventListener('click', function() {
        const n1 = document.getElementById('maihoa-num-1');
        const n2 = document.getElementById('maihoa-num-2');
        const n3 = document.getElementById('maihoa-num-3');
        if (n1) n1.value = Math.floor(Math.random() * 8) + 1;
        if (n2) n2.value = Math.floor(Math.random() * 8) + 1;
        if (n3) n3.value = Math.floor(Math.random() * 6) + 1;
      });
    }

    // Nút thực thi Lập Quẻ Mai Hoa
    if (btnExec) {
      btnExec.addEventListener('click', function() {
        if (!window.DICH_QUAI_ENGINE) {
          alert('Lỗi: Chưa tải xong thư viện Kinh Dịch!');
          return;
        }

        const shared = getKdSharedParams();
        const options = {
          dungThan: shared.dungThan,
          cachTinhToan: shared.cachTinhToan
        };

        // Nếu người dùng đang mở hộp 3 số
        if (numBox && numBox.style.display !== 'none') {
          options.mode = 'number';
          options.num1 = parseInt(document.getElementById('maihoa-num-1')?.value, 10) || 1;
          options.num2 = parseInt(document.getElementById('maihoa-num-2')?.value, 10) || 4;
          options.num3 = parseInt(document.getElementById('maihoa-num-3')?.value, 10) || 2;
        } else if (typeAmRadio && typeAmRadio.checked) {
          // Lấy quẻ theo Âm lịch
          options.amLich = {
            canNam: document.getElementById('maihoa-can-nam-am')?.value || 'Giáp',
            chiNam: document.getElementById('maihoa-chi-nam-am')?.value || 'Thìn',
            thangAm: parseInt(document.getElementById('maihoa-thang-am')?.value, 10) || 1,
            ngayAm: parseInt(document.getElementById('maihoa-ngay-am')?.value, 10) || 15,
            chiGioAm: document.getElementById('maihoa-chi-gio-am')?.value || 'Tý'
          };
        } else {
          // Lấy quẻ theo Dương lịch
          const y = parseInt(selNam?.value, 10) || curYear;
          const m = parseInt(selThang?.value, 10) || curMonth;
          const d = parseInt(selNgay?.value, 10) || curDate;
          const h = parseInt(selGio?.value, 10) || curHour;
          const mi = parseInt(selPhut?.value, 10) || curMin;
          options.duongLich = { nam: y, thang: m, ngay: d, gio: h, phut: mi };
          options.date = new Date(y, m - 1, d, h, mi);
        }

        const result = window.DICH_QUAI_ENGINE.lapQueMaiHoa(shared.question, options);
        hienThiKetQuaXuatQue(result);
      });
    }
  }

  // 3. Lục Hào Dự Trắc Events (Bảng 6 Hào Dương/Âm & Động chuẩn tuvivietnam.vn/boidich1/)
    function getQueKep64List() {
    if (!window.DICH_QUAI_ENGINE || !window.DICH_QUAI_ENGINE.QUE_KEP_INFO) return [];
    const raw = window.DICH_QUAI_ENGINE.QUE_KEP_INFO;
    if (Array.isArray(raw)) return raw;
    return Object.keys(raw).map((k, idx) => {
      const parts = k.split('_').map(Number);
      const item = raw[k];
      return Object.assign({
        index: idx + 1,
        key: k,
        thuong: parts[0],
        ha: parts[1],
        name: item.name,
        cung: item.cung,
        cungHanh: item.cungHanh,
        the: item.the,
        ung: item.ung,
        note: item.note,
        thoanTu: item.shortThoan || '',
        nguHanh: item.cungHanh
      }, item);
    });
  }
  function initLucHaoEvents() {
    const sel64 = document.getElementById('luchao-64-select');
    const btnExec = document.getElementById('btn-execute-luchao');

    // Điền danh sách 64 quẻ vào select
    if (sel64 && window.DICH_QUAI_ENGINE && window.DICH_QUAI_ENGINE.QUE_KEP_INFO) {
      sel64.innerHTML = '<option value="">-- Chọn trực tiếp quẻ trong 64 quẻ (Tùy chọn) --</option>';
      const list64 = getQueKep64List();
      list64.forEach((q, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = `${idx + 1}. ${q.name} (Cung ${q.cung} - ${q.thoanTu || ''})`;
        sel64.appendChild(opt);
      });

      // Khi chọn 1 quẻ từ 64 quẻ, tự động đồng bộ 6 hào Dương/Âm trên bảng
      sel64.addEventListener('change', function() {
        const idx = parseInt(this.value, 10);
        if (!idx) return;
        const q = list64.find(item => item.index === idx);
        if (q && window.DICH_QUAI_ENGINE.TRIGRAMS_INFO) {
          const tInfo = window.DICH_QUAI_ENGINE.TRIGRAMS_INFO[q.thuong];
          const hInfo = window.DICH_QUAI_ENGINE.TRIGRAMS_INFO[q.ha];
          if (tInfo && hInfo) {
            const lines = [...hInfo.lines, ...tInfo.lines]; // lines 1 to 6
            for (let i = 1; i <= 6; i++) {
              const val = lines[i - 1]; // 1 = Duong, 0 = Am
              const radio = document.querySelector(`input[name="hao_${i}"][value="${val}"]`);
              if (radio) radio.checked = true;
            }
          }
        }
      });
    }

    // Nút thực thi Lập Quẻ Lục Hào
    if (btnExec) {
      btnExec.addEventListener('click', function() {
        if (!window.DICH_QUAI_ENGINE) {
          alert('Lỗi: Chưa tải xong thư viện Kinh Dịch!');
          return;
        }

        const shared = getKdSharedParams();
        const sixLines = [];
        for (let i = 1; i <= 6; i++) {
          const r = document.querySelector(`input[name="hao_${i}"]:checked`);
          sixLines.push(parseInt(r ? r.value : '1', 10));
        }

        const dongList = [];
        for (let i = 1; i <= 6; i++) {
          const chk = document.getElementById(`Bien${i}`);
          if (chk && chk.checked) dongList.push(i);
        }

        const options = {
          sixLines: sixLines,
          dongList: dongList,
          dungThan: shared.dungThan,
          cachTinhToan: shared.cachTinhToan,
          date: new Date()
        };

        const result = window.DICH_QUAI_ENGINE.lapQueLucHao(shared.question, options);
        hienThiKetQuaXuatQue(result);
      });
    }
  }

  // 4. Quẻ Ngẫu Nhiên Events (Truyền thống hoặc 1 Hào Động)
  function initNgauNhienEvents() {
    const btnExec = document.getElementById('btn-execute-ngaunhien');
    if (btnExec) {
      btnExec.addEventListener('click', function() {
        if (!window.DICH_QUAI_ENGINE) {
          alert('Lỗi: Chưa tải xong thư viện Kinh Dịch!');
          return;
        }

        const shared = getKdSharedParams();
        const modeRadio = document.querySelector('input[name="cach_ngaunhien"]:checked');
        const mode = modeRadio ? modeRadio.value : 'truyen_thong';

        const options = {
          mode: mode,
          dungThan: shared.dungThan,
          cachTinhToan: shared.cachTinhToan,
          date: new Date()
        };

        const result = window.DICH_QUAI_ENGINE.lapQueNgauNhien(shared.question, options);
        hienThiKetQuaXuatQue(result);
      });
    }
  }

  // 5. Gieo Đồng Xu Cổ 3D Events
  function initDongXuEvents() {
    const btnTossStep = document.getElementById('btn-toss-coin-step');
    const btnTossAuto = document.getElementById('btn-toss-coins-auto');
    const btnReset = document.getElementById('btn-reset-coins');
    const btnExec = document.getElementById('btn-execute-dongxu');
    const btnTossText = document.getElementById('btn-toss-text');
    const roundText = document.getElementById('dongxu-current-round-text');

    resetDongXuState();

    function resetDongXuState() {
      dongXuTossIndex = 1;
      dongXuHistory = [];
      if (btnTossText) btnTossText.textContent = 'Gieo Hào 1 (Sơ Hào)';
      if (roundText) roundText.textContent = 'Lần gieo: Hào 1 (Sơ Hào)';
      if (btnExec) {
        btnExec.disabled = true;
        btnExec.style.opacity = '0.6';
      }
      if (btnTossStep) {
        btnTossStep.disabled = false;
        btnTossStep.style.opacity = '1';
        btnTossStep.style.pointerEvents = 'auto';
      }
      if (btnTossAuto) {
        btnTossAuto.disabled = false;
        btnTossAuto.style.opacity = '1';
        btnTossAuto.style.pointerEvents = 'auto';
        btnTossAuto.innerHTML = '<span>⚡</span> Gieo Tự Động (6 Hào)';
      }

      // Reset 3 đồng xu về mặt Chữ (Dương) ban đầu
      const coinEls = [document.getElementById('coin-1'), document.getElementById('coin-2'), document.getElementById('coin-3')];
      const labelEls = [document.getElementById('coin-1-label'), document.getElementById('coin-2-label'), document.getElementById('coin-3-label')];
      coinEls.forEach(c => {
        if (c) {
          c.classList.remove('flipping', 'is-am');
          c.classList.add('is-duong');
          c.style.transform = 'rotateY(0deg)';
        }
      });
      labelEls.forEach(l => {
        if (l) {
          l.textContent = 'DƯƠNG (Chữ)';
          l.className = 'kd-coin-label label-ngua';
        }
      });

      const summaryEl = document.getElementById('dongxu-toss-result-summary');
      if (summaryEl) {
        summaryEl.innerHTML = 'Nhấn nút gieo bên dưới để khởi quẻ lần đầu';
      }

      // Reset ladder rows
      for (let i = 1; i <= 6; i++) {
        const row = document.querySelector(`.kd-ladder-row[data-hao="${i}"]`);
        if (row) {
          row.classList.remove('active', 'completed');
          const visual = row.querySelector('.ladder-visual');
          const status = row.querySelector('.ladder-status');
          if (i === 1) {
            row.classList.add('active');
            if (visual) visual.innerHTML = '<span style="color: #7A1414; font-weight: 700;">Đang chờ gieo</span>';
            if (status) status.textContent = 'Sơ Hào';
          } else {
            if (visual) visual.innerHTML = '<span style="color: #C8B99F;">Chưa gieo</span>';
            if (status) status.textContent = 'Chờ...';
          }
        }
      }
    }

    if (btnReset) {
      btnReset.addEventListener('click', resetDongXuState);
    }

    let isTossingCoin = false;

    // Thực hiện 1 lần gieo xu: Cả 3 đồng xu rung lắc nhảy nhót 3D trong 1.0 giây rồi mới ra hào
    function performSingleToss(callback) {
      if (dongXuTossIndex > 6 || isTossingCoin) {
        if (callback) callback();
        return;
      }

      isTossingCoin = true;

      // Khóa nút bấm trong khi đang lắc xu
      if (btnTossStep) {
        btnTossStep.disabled = true;
        btnTossStep.style.opacity = '0.7';
        btnTossStep.style.pointerEvents = 'none';
      }
      if (btnTossAuto) {
        btnTossAuto.disabled = true;
        btnTossAuto.style.opacity = '0.7';
        btnTossAuto.style.pointerEvents = 'none';
      }

      const summaryEl = document.getElementById('dongxu-toss-result-summary');
      if (summaryEl) {
        summaryEl.innerHTML = `<span style="color: #D81E05; font-size: 12.5px; font-weight: 800;">
          <i class="fa-solid fa-dice fa-spin"></i> Đang lắc 3 đồng tiền cổ gieo Hào ${dongXuTossIndex}...
        </span>`;
      }

      // 0 = Sấp (Lưng/Âm), 1 = Ngửa (Mặt chữ/Dương)
      const c1 = Math.random() < 0.5 ? 0 : 1;
      const c2 = Math.random() < 0.5 ? 0 : 1;
      const c3 = Math.random() < 0.5 ? 0 : 1;
      const tossValues = [c1, c2, c3];

      // Kích hoạt Animation 3D lắc và nhảy xu
      const coinEls = [document.getElementById('coin-1'), document.getElementById('coin-2'), document.getElementById('coin-3')];
      const labelEls = [document.getElementById('coin-1-label'), document.getElementById('coin-2-label'), document.getElementById('coin-3-label')];

      coinEls.forEach((el, idx) => {
        if (el) {
          el.classList.remove('flipping', 'is-duong', 'is-am');
          void el.offsetWidth; // Force reflow
          el.classList.add('flipping');
        }
      });

      labelEls.forEach(l => {
        if (l) {
          l.textContent = 'Đang lắc...';
          l.className = 'kd-coin-label label-tossing';
        }
      });

      // Sau 1.0s đồng xu tiếp đất và dừng lại đúng mặt
      setTimeout(() => {
        coinEls.forEach((el, idx) => {
          if (el) {
            el.classList.remove('flipping');
            const val = tossValues[idx];
            el.classList.toggle('is-duong', val === 1);
            el.classList.toggle('is-am', val === 0);
            el.style.transform = val === 1 ? 'rotateY(0deg)' : 'rotateY(180deg)';
          }
        });

        labelEls.forEach((l, idx) => {
          if (l) {
            const val = tossValues[idx];
            l.textContent = val === 1 ? 'DƯƠNG (Chữ)' : 'ÂM (Lưng)';
            l.className = 'kd-coin-label ' + (val === 1 ? 'label-ngua' : 'label-sap');
          }
        });

        const sum = c1 + c2 + c3;
        let score = 7;
        let lineVal = 1;
        let isDong = false;
        let desc = '';

        if (sum === 3) {
          score = 9; lineVal = 1; isDong = true; desc = 'Lão Dương (9 - Động)';
        } else if (sum === 0) {
          score = 6; lineVal = 0; isDong = true; desc = 'Lão Âm (6 - Động)';
        } else if (sum === 1) {
          score = 7; lineVal = 1; isDong = false; desc = 'Thiếu Dương (7)';
        } else {
          score = 8; lineVal = 0; isDong = false; desc = 'Thiếu Âm (8)';
        }

        dongXuHistory.push({
          haoNum: dongXuTossIndex,
          score: score,
          lineVal: lineVal,
          isDong: isDong,
          desc: desc
        });

        // Cập nhật dòng tóm tắt kết quả
        if (summaryEl) {
          const duongCount = sum;
          const amCount = 3 - sum;
          summaryEl.innerHTML = `<span style="color: #2C241E;">Hào ${dongXuTossIndex}: </span><strong style="color:${isDong ? '#D81E05' : '#1A3DB5'};">${duongCount} Dương, ${amCount} Âm (Tổng ${score}) ➔ ${desc}</strong>`;
        }

        const currRow = document.querySelector(`.kd-ladder-row[data-hao="${dongXuTossIndex}"]`);
        if (currRow) {
          currRow.classList.remove('active');
          currRow.classList.add('completed');
          const visual = currRow.querySelector('.ladder-visual');
          const status = currRow.querySelector('.ladder-status');

          let lineHtml = '';
          const color = isDong ? '#D81E05' : '#1A3DB5';
          if (lineVal === 1) {
            lineHtml = `<span style="display:inline-block; width:50px; height:6px; background:${color}; border-radius:2px;"></span>`;
          } else {
            lineHtml = `<span style="display:inline-flex; width:50px; justify-content:space-between;">
              <span style="display:inline-block; width:22px; height:6px; background:${color}; border-radius:2px;"></span>
              <span style="display:inline-block; width:22px; height:6px; background:${color}; border-radius:2px;"></span>
            </span>`;
          }

          if (isDong) {
            lineHtml += `<span style="color:#D81E05; font-weight:800; font-size:11px; margin-left:6px;">● ĐỘNG</span>`;
          }

          if (visual) visual.innerHTML = lineHtml;
          if (status) status.innerHTML = `<strong style="color:${color}; font-size:11px;">${desc}</strong>`;
        }

        dongXuTossIndex++;
        isTossingCoin = false;

        if (dongXuTossIndex <= 6) {
          if (btnTossText) btnTossText.textContent = `Gieo Hào ${dongXuTossIndex}`;
          if (roundText) roundText.textContent = `Lần gieo tiếp theo: Hào ${dongXuTossIndex}`;
          const nextRow = document.querySelector(`.kd-ladder-row[data-hao="${dongXuTossIndex}"]`);
          if (nextRow) {
            nextRow.classList.add('active');
            const visual = nextRow.querySelector('.ladder-visual');
            if (visual) visual.innerHTML = '<span style="color: #7A1414; font-weight: 700;">Đang chờ gieo</span>';
          }
          // Mở lại nút gieo thủ công
          if (btnTossStep) {
            btnTossStep.disabled = false;
            btnTossStep.style.opacity = '1';
            btnTossStep.style.pointerEvents = 'auto';
          }
          if (btnTossAuto) {
            btnTossAuto.disabled = false;
            btnTossAuto.style.opacity = '1';
            btnTossAuto.style.pointerEvents = 'auto';
          }
        } else {
          if (btnTossText) btnTossText.textContent = 'Đã đủ 6 Hào!';
          if (roundText) roundText.innerHTML = '<strong style="color:#16A34A;">Đã hoàn tất 6 lần gieo! Bấm "HOÀN TẤT GIEO ĐỒNG XU & XUẤT QUẺ" bên dưới.</strong>';
          if (btnExec) {
            btnExec.disabled = false;
            btnExec.style.opacity = '1';
          }
          if (btnTossStep) {
            btnTossStep.disabled = true;
            btnTossStep.style.opacity = '0.6';
          }
          if (btnTossAuto) {
            btnTossAuto.disabled = true;
            btnTossAuto.style.opacity = '0.6';
            btnTossAuto.innerHTML = '<span>⚡</span> Đã gieo xong 6 Hào!';
          }
        }

        if (callback) callback();
      }, 1000);
    }

    if (btnTossStep) {
      btnTossStep.addEventListener('click', function() {
        if (dongXuTossIndex > 6) {
          alert('Bạn đã gieo đủ 6 lần! Vui lòng bấm nút "HOÀN TẤT GIEO ĐỒNG XU & XUẤT QUẺ DỊCH QUÁI" bên dưới.');
          return;
        }
        performSingleToss();
      });
    }

    if (btnTossAuto) {
      btnTossAuto.addEventListener('click', function() {
        if (dongXuTossIndex > 6) {
          alert('Bạn đã gieo đủ 6 lần! Vui lòng bấm nút "HOÀN TẤT GIEO ĐỒNG XU & XUẤT QUẺ DỊCH QUÁI" bên dưới.');
          return;
        }
        btnTossAuto.innerHTML = '<span>⚡</span> Đang gieo tự động 6 Hào...';
        btnTossAuto.disabled = true;
        btnTossAuto.style.opacity = '0.7';

        function nextAuto() {
          if (dongXuTossIndex <= 6) {
            performSingleToss(() => {
              if (dongXuTossIndex <= 6) {
                setTimeout(nextAuto, 450);
              } else {
                btnTossAuto.innerHTML = '<span>⚡</span> Đã gieo xong 6 Hào!';
              }
            });
          } else {
            btnTossAuto.innerHTML = '<span>⚡</span> Đã gieo xong 6 Hào!';
          }
        }
        nextAuto();
      });
    }

    if (btnExec) {
      btnExec.addEventListener('click', function() {
        if (!window.DICH_QUAI_ENGINE) return;
        if (dongXuHistory.length < 6) {
          while (dongXuHistory.length < 6) {
            const h = dongXuHistory.length + 1;
            const c1 = Math.random() < 0.5 ? 0 : 1;
            const c2 = Math.random() < 0.5 ? 0 : 1;
            const c3 = Math.random() < 0.5 ? 0 : 1;
            const sum = c1 + c2 + c3;
            let score = 7, lineVal = 1, isDong = false;
            if (sum === 3) { score = 9; lineVal = 1; isDong = true; }
            else if (sum === 0) { score = 6; lineVal = 0; isDong = true; }
            else if (sum === 1) { score = 7; lineVal = 1; isDong = false; }
            else { score = 8; lineVal = 0; isDong = false; }
            dongXuHistory.push({ haoNum: h, score: score, lineVal: lineVal, isDong: isDong });
          }
        }

        const shared = getKdSharedParams();
        const tossesForEngine = dongXuHistory.map(h => ({
          score: h.score,
          haoNum: h.haoNum
        }));

        const options = {
          dungThan: shared.dungThan,
          cachTinhToan: shared.cachTinhToan,
          date: new Date()
        };

        const result = window.DICH_QUAI_ENGINE.lapQueDongXu(shared.question, tossesForEngine, options);
        hienThiKetQuaXuatQue(result);
      });
    }
  }

// Module Co Bảng Xuất Quẻ & Cập nhật tên Subtab 5 động
  let isFitOnePageEnabled = true;

  function updateSubtab5Name(methodName) {
    const btnEl = document.getElementById('kd-subtab-btn-xuatque');
    if (btnEl) {
      btnEl.style.display = 'none';
    }
  }
  window.updateSubtab5Name = updateSubtab5Name;

  window.toggleFitOnePage = function() {
    isFitOnePageEnabled = !isFitOnePageEnabled;
    applyFitOnePage(isFitOnePageEnabled);
  };

  window.applyFitOnePage = function(enable) {
    isFitOnePageEnabled = (typeof enable === 'boolean') ? enable : isFitOnePageEnabled;
    const fitWrapper = document.getElementById('dq-fit-wrapper');
    const captureEl = document.getElementById('trang-dich-quai-capture');
    const btnToggle = document.getElementById('btn-toggle-fit-page');

    if (!captureEl || !fitWrapper) return;

    if (isFitOnePageEnabled) {
      fitWrapper.classList.add('fit-active');
      if (btnToggle) {
        btnToggle.classList.add('active');
        btnToggle.innerHTML = '<i class="fa-solid fa-compress"></i> Đang Co Vừa 1 Trang (Bật)';
      }
      const availWidth = fitWrapper.parentElement ? fitWrapper.parentElement.clientWidth : window.innerWidth;
      const availHeight = Math.max(500, window.innerHeight - 170);
      const boardWidth = 980;
      const boardHeight = captureEl.scrollHeight || 840;

      const scaleX = (availWidth - 20) / boardWidth;
      const scaleY = availHeight / boardHeight;
      const scale = Math.min(scaleX, scaleY, 1.0);

      fitWrapper.style.transform = `scale(${scale.toFixed(3)})`;
      fitWrapper.style.transformOrigin = 'top center';
      fitWrapper.style.width = `${boardWidth}px`;
      fitWrapper.style.margin = '0 auto';

      const scaledHeight = boardHeight * scale;
      const parentContainer = fitWrapper.parentElement;
      if (parentContainer) {
        parentContainer.style.height = `${scaledHeight + 24}px`;
        parentContainer.style.overflow = 'hidden';
      }
    } else {
      fitWrapper.classList.remove('fit-active');
      fitWrapper.style.transform = 'none';
      fitWrapper.style.width = '100%';
      fitWrapper.style.margin = '0';
      if (btnToggle) {
        btnToggle.classList.remove('active');
        btnToggle.innerHTML = '<i class="fa-solid fa-expand"></i> Co Bảng Vào 1 Trang';
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

  window.toggleFullScreenQue = function() {
    const target = document.getElementById('xuat-que-container') || document.getElementById('kinhdich-result') || document.getElementById('view-xuat-que');
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

  // 6. Hiển thị Kết quả ra Bảng Xuất Quẻ (Trang Dịch Quái)
  function hienThiKetQuaXuatQue(resultData) {
    const xuatQueContainer = document.getElementById('xuat-que-container');
    const resultBox = document.getElementById('kinhdich-result');
    const emptyBox = document.getElementById('kinhdich-empty-state');
    const setupBox = document.getElementById('kd-hinh-1-container');
    const xuatQuePanel = document.getElementById('view-xuat-que');

    if (!window.DICH_QUAI_ENGINE) return;

    // Đổi tên Subtab 4 động
    if (resultData && resultData.methodName) {
      updateSubtab5Name(resultData.methodName);
    }

    const html = window.DICH_QUAI_ENGINE.renderTrangDichQuaiHtml(resultData);

    // Lưu vào staging ẩn để html2canvas chụp sắc nét
    const staging = document.getElementById('kinhdich-render-staging');
    if (staging) {
      staging.innerHTML = html;
    }

    if (xuatQueContainer) {
      xuatQueContainer.innerHTML = html;
    }
    if (resultBox) {
      resultBox.innerHTML = html;
      resultBox.style.display = 'block';
    }
    if (emptyBox) {
      emptyBox.style.display = 'none';
    }

    // Cập nhật tên file khi tải ảnh
    let queName = 'Que_Dich';
    if (resultData && resultData.queChu && resultData.queChu.name) {
      queName = resultData.queChu.name.replace(/\s+/g, '_');
      if (resultData.queBien && resultData.queBien.name) {
        queName += '_bien_' + resultData.queBien.name.replace(/\s+/g, '_');
      }
    }
    cachedKinhDichName = queName;

    // Cập nhật phụ đề trên Modal (xuống dòng ở Việc xem theo yêu cầu Hình 3)
    const subtitleEl = document.getElementById('kinhdich-modal-subtitle');
    if (subtitleEl) {
      const chuName = resultData.queChu ? resultData.queChu.name : '';
      const bienName = resultData.queBien ? resultData.queBien.name : '';
      const question = resultData.question || 'Xem Quẻ Dịch';
      subtitleEl.innerHTML = `Quẻ Chủ: <strong style="color: #8B1E1E;">${chuName}</strong> ${bienName ? '&bull; Quẻ Biến: <strong style="color: #8B1E1E;">' + bienName + '</strong>' : ''}<br><span style="display:inline-block; margin-top: 2px;">Việc xem: <strong style="color: #2C241E;">${question}</strong></span>`;
    }

    // MỞ NGAY MODAL POPUP XUẤT QUẺ KINH DỊCH (GIỐNG HỆT TỬ VI & TỨ TRỤ)
    if (typeof window.openKinhDichModal === 'function') {
      window.openKinhDichModal();
    }

    // Hiển thị đồ bản quẻ dịch tức thì 0 giây (MỘT PHÁT RA LUÔN - chuẩn như bên Tử Vi)
    const modalView = document.getElementById('kinhdich-image-view');
    if (modalView) {
      modalView.innerHTML = `
        <div id="kinhdich-scaler-box" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer;" onclick="if(typeof window.openKinhDichImageZoomModal==='function')window.openKinhDichImageZoomModal();" title="Bản Đồ Quẻ Dịch Chuẩn Truyền Thống (Độ nét cao - Nhấn để phóng to)">
          <div id="kinhdich-scaler-inner" style="position: relative; margin: 0 auto; overflow: hidden; cursor: pointer;">
            <div id="kinhdich-live-card" style="width: 1150px; min-width: 1150px; max-width: 1150px; position: absolute; left: 0; top: 0; transform-origin: 0 0; box-sizing: border-box; background: #FFFFFF; margin: 0; cursor: pointer;">
              <style>
                #kinhdich-live-card .dq-download-toolbar { display: none !important; }
                #kinhdich-live-card .dq-cards-row { flex-direction: row !important; }
                #kinhdich-live-card .dichquai-export-board { width: 1150px !important; min-width: 1150px !important; max-width: 1150px !important; margin: 0 !important; box-shadow: none !important; background-color: #FFFFFF !important; }
              </style>
              ${html}
            </div>
          </div>
        </div>
      `;
      modalView.style.cursor = 'pointer';
      modalView.onclick = function(e) {
        if (typeof window.openKinhDichImageZoomModal === 'function') {
          window.openKinhDichImageZoomModal();
        }
      };
      if (typeof window.fitKinhDichModalLiveBoard === 'function') {
        window.fitKinhDichModalLiveBoard();
        requestAnimationFrame(function() { window.fitKinhDichModalLiveBoard(); });
      }
    }

    // Hiển thị nút "Mở Lại Bản Đồ Quẻ Dịch" trên giao diện để người dùng có thể mở lại khi đóng modal (chữ to 1.4, nằm gọn 1 dòng)
    let reopenBar = document.getElementById('kd-reopen-modal-bar');
    if (!reopenBar && setupBox) {
      reopenBar = document.createElement('div');
      reopenBar.id = 'kd-reopen-modal-bar';
      reopenBar.style.cssText = 'margin: 0 auto 14px; text-align: center; display: flex; justify-content: center; gap: 10px; width: 100%;';
      reopenBar.innerHTML = `
        <button type="button" onclick="window.openKinhDichModal()" class="kd-action-btn-main kd-btn-reopen-modal" id="btn-reopen-kinhdich-modal" style="padding: 12px 28px; font-size: 1.4rem; font-weight: 700; background: linear-gradient(135deg, #7A1414 0%, #5A0808 100%); color: #FFF; border: 1.5px solid #DFBA73; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 3px 10px rgba(122,20,20,0.3); white-space: nowrap;">
          <i class="fa-solid fa-expand" style="font-size: 1.25rem;"></i> <span>Mở Lại Bản Đồ Quẻ Dịch (Popup)</span>
        </button>
      `;
      setupBox.prepend(reopenBar);
    } else if (reopenBar) {
      reopenBar.style.display = 'flex';
      const btn = reopenBar.querySelector('button');
      if (btn) {
        btn.style.fontSize = '1.4rem';
        btn.style.whiteSpace = 'nowrap';
      }
    }

    // Kết xuất đồ bản thành ảnh PNG độ nét cao đưa vào Modal
    if (typeof renderKinhDichBoardToImage === 'function') {
      renderKinhDichBoardToImage();
    }
  }

  // 7. Tra Cứu 64 Quẻ Grid & Search
  function render64QueGrid(filterCung = 'all', keyword = '') {
    const gridEl = document.getElementById('grid-64-que');
    if (!gridEl || !window.DICH_QUAI_ENGINE || !window.DICH_QUAI_ENGINE.QUE_KEP_INFO) return;

    const list64 = getQueKep64List();
    gridEl.innerHTML = '';

    const kw = keyword.toLowerCase().trim();

    list64.forEach((q, idx) => {
      if (filterCung !== 'all' && q.cung !== filterCung) return;
      if (kw && !q.name.toLowerCase().includes(kw) && !(q.thoanTu || '').toLowerCase().includes(kw)) return;

      const card = document.createElement('div');
      card.className = 'kd-que-card';
      card.innerHTML = `
        <span class="kd-que-num">#${idx + 1}</span>
        <div class="kd-que-name">${q.name}</div>
        <div class="kd-que-cung">Cung ${q.cung} • ${q.nguHanh || ''}</div>
      `;

      card.addEventListener('click', function() {
        if (confirm(`Bạn muốn lập quẻ và xem đồ bản Trang Dịch Quái quẻ "${q.name}" (${q.thoanTu || ''})?`)) {
          const shared = getKdSharedParams();
          const res = window.DICH_QUAI_ENGINE.lapQueLucHao(`Tra cứu quẻ ${q.name}: ${shared.question}`, {
            thuongQuai: q.thuong,
            haQuai: q.ha,
            dongList: [5],
            dungThan: shared.dungThan,
            cachTinhToan: shared.cachTinhToan,
            date: new Date()
          });
          hienThiKetQuaXuatQue(res);
        }
      });

      gridEl.appendChild(card);
    });
  }

  function initTraCuu64Events() {
    const searchInput = document.getElementById('search-64-que-input') || document.getElementById('search-64-que');
    let currentCung = 'all';

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        render64QueGrid(currentCung, this.value);
      });
    }

    document.querySelectorAll('.filter-que-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-que-btn').forEach(b => {
          b.style.background = '#FFF';
          b.style.color = '#55483C';
          b.style.borderColor = '#D8CCB7';
        });
        this.style.background = '#7A1414';
        this.style.color = '#FFF';
        this.style.borderColor = '#7A1414';

        currentCung = this.getAttribute('data-cung') || 'all';
        const kw = searchInput ? searchInput.value : '';
        render64QueGrid(currentCung, kw);
      });
    });
  }

  // 8. Tải ảnh bản đồ quẻ dịch (html2canvas)
  window.downloadTrangDichQuai = function() {
    const target = document.getElementById('trang-dich-quai-capture');
    if (!target) {
      alert('Không tìm thấy đồ bản quẻ dịch để tải!');
      return;
    }

    if (typeof html2canvas === 'undefined') {
      alert('Thư viện tạo ảnh chưa sẵn sàng. Bạn có thể dùng tính năng In quẻ dịch!');
      return;
    }

    html2canvas(target, { scale: 2, useCORS: true, backgroundColor: '#FAF7F2' }).then(canvas => {
      const link = document.createElement('a');
      link.download = `Que_Kinh_Dich_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      console.error(err);
      alert('Có lỗi khi xuất ảnh. Vui lòng thử lại hoặc dùng chức năng In!');
    });
  };

})(window);

  // =========================================================================
  // XUẤT QUẺ KINH DỊCH THÀNH ẢNH & MODAL POPUP (CHUẨN TỬ VI & TỨ TRỤ)
  // =========================================================================
  let cachedKinhDichDataUrl = null;
  let cachedKinhDichBlob = null;
window.fitKinhDichModalLiveBoard = function() {
  const box = document.getElementById("kinhdich-scaler-box") || document.getElementById("kinhdich-image-view");
  const inner = document.getElementById("kinhdich-scaler-inner");
  const card = document.getElementById("kinhdich-live-card");
  if (!box || !inner || !card) return;
  const vw = box.clientWidth || (window.innerWidth > 800 ? 760 : window.innerWidth - 16);
  const vh = box.clientHeight || (window.innerHeight - 120);
  if (vw <= 0 || vh <= 0) return;
  const origW = 1150;
  const targetCard = card.querySelector(".dichquai-export-board") || card.querySelector(".dq-export-wrapper") || card;
  const origH = targetCard.scrollHeight || 1350;
  const scale = Math.min(vw / origW, vh / origH, 1);
  card.style.transform = "scale(" + scale + ")";
  card.style.transformOrigin = "0 0";
  inner.style.width = Math.round(origW * scale) + "px";
  inner.style.height = Math.round(origH * scale) + "px";
};
if (typeof window !== "undefined") {
  window.addEventListener("resize", function() { if (typeof window.fitKinhDichModalLiveBoard === "function") window.fitKinhDichModalLiveBoard(); });
}

  async function renderKinhDichBoardToImage() {
    const modalView = document.getElementById('kinhdich-image-view');
    const staging = document.getElementById('kinhdich-render-staging');
    const sheet = (staging && (staging.querySelector('#trang-dich-quai-card') || staging.querySelector('.dichquai-export-board')))
               || document.getElementById('trang-dich-quai-card');

    if (!sheet) {
      console.warn('Không tìm thấy element đồ bản để chụp ảnh');
      return;
    }

    if (typeof html2canvas === 'undefined') {
      console.warn('html2canvas chưa sẵn sàng, hiển thị DOM dự phòng');
      if (modalView) {
        modalView.innerHTML = `<div style="width:100%; height:100%; overflow-y:auto; padding: 6px;">${sheet.outerHTML}</div>`;
      }
      return;
    }

    try {
      // Đợi font chữ và layout render ổn định
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise(r => setTimeout(r, 100));

      const targetWidth = 1150;
      const targetHeight = sheet.scrollHeight || sheet.offsetHeight || 1200;

      const canvas = await html2canvas(sheet, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        width: targetWidth,
        height: targetHeight,
        windowWidth: 1150,
        windowHeight: Math.max(targetHeight + 200, 1600),
        logging: false,
        onclone: (clonedDoc) => {
          if (clonedDoc.body) {
            clonedDoc.body.style.zoom = '1';
            clonedDoc.body.style.transform = 'none';
          }
          if (clonedDoc.documentElement) {
            clonedDoc.documentElement.style.zoom = '1';
            clonedDoc.documentElement.style.transform = 'none';
          }
          const s = clonedDoc.getElementById('kinhdich-render-staging');
          if (s) {
            s.style.position = 'static';
            s.style.left = '0';
            s.style.top = '0';
            s.style.opacity = '1';
            s.style.width = '1150px';
            s.style.maxWidth = '1150px';
            s.style.backgroundColor = '#FFFFFF';
            s.style.backgroundImage = 'none';
            s.style.margin = '0';
            s.style.padding = '0';
          }
          const wrapper = clonedDoc.querySelector('.dq-export-wrapper');
          if (wrapper) {
            wrapper.style.width = '1150px';
            wrapper.style.maxWidth = '1150px';
            wrapper.style.margin = '0';
            wrapper.style.padding = '0';
          }
          const card = clonedDoc.querySelector('#trang-dich-quai-card') || clonedDoc.querySelector('.dichquai-export-board');
          if (card) {
            card.style.zoom = '1';
            card.style.transform = 'none';
            card.style.width = '1150px';
            card.style.maxWidth = '1150px';
            card.style.margin = '0';
            card.style.boxShadow = 'none';
            card.style.borderRadius = '2px';
            card.style.backgroundColor = '#FFFFFF';
            card.style.backgroundImage = 'none';
          }
          // Đảm bảo logo và ấn triện dùng trực tiếp base64 data URL để không bao giờ bị lỗi tainted canvas trên file:///
          const imgBatquai = clonedDoc.querySelector('.dq-header-logo');
          if (imgBatquai && window.TUTRU_BATQUAI_DATA_URL) {
            imgBatquai.src = window.TUTRU_BATQUAI_DATA_URL;
          }
          const imgTrien = clonedDoc.querySelector('.dq-seal-img');
          if (imgTrien && window.AN_TRIEN_DATA_URL) {
            imgTrien.src = window.AN_TRIEN_DATA_URL;
          }
          const tb = clonedDoc.querySelector('.dq-download-toolbar');
          if (tb) tb.style.display = 'none';
        }
      });

      cachedKinhDichDataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => { cachedKinhDichBlob = blob; }, 'image/png');

      if (modalView) {
        modalView.innerHTML = `<img id="kinhdich-board-img" src="${cachedKinhDichDataUrl}" alt="Bản đồ Quẻ Dịch" class="tuvi-board-img" draggable="true" title="Bản đồ Quẻ Dịch Chuẩn Truyền Thống (Độ nét cao - Nhấn để phóng to)" style="cursor: pointer;" onclick="if(typeof window.openKinhDichImageZoomModal==='function')window.openKinhDichImageZoomModal();">`;
        const img = modalView.querySelector('img');
        if (img) {
          if (img.complete && img.clientWidth > 0) {
            adjustKinhDichModalWidth();
          } else {
            img.onload = () => requestAnimationFrame(adjustKinhDichModalWidth);
          }
          requestAnimationFrame(adjustKinhDichModalWidth);
          setTimeout(adjustKinhDichModalWidth, 80);
        }
      }
    } catch (err) {
      console.error('Lỗi khi chụp ảnh đồ bản quẻ dịch:', err);
      if (modalView) {
        modalView.innerHTML = `<div style="width:100%; height:100%; overflow-y:auto; padding: 6px;">${sheet.outerHTML}</div>`;
      }
    }
  }

  // Tự động căn chỉnh khung ngoài của popup ôm sát ảnh quẻ dịch, cách ảnh đúng 1cm mỗi bên
  function adjustKinhDichModalWidth() {
    const modal = document.getElementById('kinhdich-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    const dialog = modal.querySelector('.tuvi-modal-dialog');
    const img = modal.querySelector('#kinhdich-board-img');
    if (!dialog || !img) return;

    const imgWidth = img.clientWidth || img.getBoundingClientRect().width;
    if (imgWidth > 100) {
      // 1cm = 37.8px; khoảng cách khung viền trái và phải cách mép ảnh đúng 1cm (2 bên là 2cm ≈ 76px)
      const targetWidth = Math.round(imgWidth + 76);
      dialog.style.width = targetWidth + 'px';
      dialog.style.maxWidth = '96vw';
    }
  }
  window.addEventListener('resize', adjustKinhDichModalWidth);

  // Đảm bảo sự kiện chuột phải / chạm giữ trên ảnh đồ bản (Tử Vi, Tứ Trụ, Kinh Dịch) luôn hiển thị menu ngữ cảnh của trình duyệt (Copy image, Save image as...)
  document.addEventListener('contextmenu', function(e) {
    if (e.target && (e.target.classList.contains('tuvi-board-img') || e.target.closest('#kinhdich-image-view img, #tuvi-image-view img, #tutru-image-view img, #kinhdich-board-img, #modal-zoom-img, .tt-laso-card img, .tuvi-sheet-wrapper img'))) {
      e.stopPropagation();
      return true;
    }
  }, true);

  window.openKinhDichModal = function() {
    const modal = document.getElementById('kinhdich-modal');
    if (modal) {
      modal.classList.remove('hidden');
      if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
      if (typeof window.fitKinhDichModalLiveBoard === 'function') {
        window.fitKinhDichModalLiveBoard();
        requestAnimationFrame(window.fitKinhDichModalLiveBoard);
      }
      requestAnimationFrame(adjustKinhDichModalWidth);
      setTimeout(adjustKinhDichModalWidth, 60);
    }
  };

  window.closeKinhDichModal = function() {
    const modal = document.getElementById('kinhdich-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  window.openKinhDichImageZoomModal = async function() {
    const zoomModal = document.getElementById('modal-image-zoom');
    const zoomImg = document.getElementById('modal-zoom-img');
    const zoomTitle = document.getElementById('modal-zoom-title');
    if (!zoomModal || !zoomImg) return;

    window.currentZoomType = 'kinhdich';
    if (zoomTitle) {
      zoomTitle.textContent = 'Bức Ảnh Bản Đồ Quẻ Dịch (Độ Nét Cao)';
    }

    if (cachedKinhDichDataUrl) {
      zoomImg.src = cachedKinhDichDataUrl;
    } else {
      if (typeof renderKinhDichBoardToImage === 'function') {
        await renderKinhDichBoardToImage();
      }
      if (cachedKinhDichDataUrl) {
        zoomImg.src = cachedKinhDichDataUrl;
      }
    }
    zoomModal.classList.remove('hidden');
    if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
  };

  window.copyKinhDichImage = async function() {
    if (typeof showToast === 'function') showToast('Đang sao chép hình ảnh Quẻ Dịch...');
    const fileName = `Bang_Xuat_Que_Dich_${cachedKinhDichName || 'Que'}_${Date.now()}.png`;

    let blob = cachedKinhDichBlob;
    if (!blob && cachedKinhDichDataUrl) {
      try {
        const res = await fetch(cachedKinhDichDataUrl);
        blob = await res.blob();
        cachedKinhDichBlob = blob;
      } catch (e) {}
    }

    // 1. Thử ghi Clipboard API
    if (blob && navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        if (typeof showToast === 'function') {
          showToast('Đã sao chép hình ảnh Quẻ Dịch vào Clipboard! (Mẹo: Có thể chạm giữ vào ảnh để lưu)');
        } else {
          alert('Đã sao chép ảnh Quẻ Dịch vào Clipboard!');
        }
        return;
      } catch (err) {
        console.warn('Lỗi copy clipboard:', err);
      }
    }

    // 2. Thử Web Share API trên Mobile
    if (blob && navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Bản Đồ Quẻ Dịch',
            files: [file]
          });
          return;
        }
      } catch (e) {
        if (e.name === 'AbortError') return;
      }
    }

    window.downloadKinhDichImage();
  };

  window.downloadKinhDichImage = async function() {
    if (!cachedKinhDichDataUrl && !cachedKinhDichBlob) {
      if (typeof renderKinhDichBoardToImage === "function") {
        if (typeof showToast === "function") showToast("Đang tạo ảnh chất lượng cao để tải về...");
        await renderKinhDichBoardToImage();
      }
    }
    const queName = cachedKinhDichName || 'Que_Dich';
    const fileName = `Bang_Xuat_Que_Dich_${queName.replace(/\s+/g, '_')}.png`;

    let blob = cachedKinhDichBlob;
    if (!blob && cachedKinhDichDataUrl && typeof window.tuviDataURLtoBlob === 'function') {
      blob = window.tuviDataURLtoBlob(cachedKinhDichDataUrl);
    }

    if (typeof window.saveImageFileWithPicker === 'function') {
      await window.saveImageFileWithPicker(blob || cachedKinhDichDataUrl, fileName, 'Đã tải thành công ảnh Quẻ Dịch!');
    } else {
      const url = blob ? URL.createObjectURL(blob) : cachedKinhDichDataUrl;
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (blob) setTimeout(() => URL.revokeObjectURL(url), 5000);
      if (typeof showToast === 'function') showToast('Đã tải thành công ảnh Quẻ Dịch!');
    }
  };

  window.printKinhDichImage = function() {
    if (!cachedKinhDichDataUrl) {
      window.print();
      return;
    }
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>In Đồ Bản Quẻ Dịch - Thuật Số Huyền Học</title>
          <style>
            @page { size: A4 portrait; margin: 6mm; }
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; background: #FFF; }
            img { width: 100%; max-width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body>
          <img src="${cachedKinhDichDataUrl}" onload="setTimeout(function(){ window.print(); window.close(); }, 300);" />
        </body>
        </html>
      `);
      win.document.close();
    } else {
      window.print();
    }
  };

  // Đóng modal khi click ra ngoài hoặc bấm phím Escape
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function(e) {
      const modal = document.getElementById('kinhdich-modal');
      if (modal && !modal.classList.contains('hidden') && e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.closeKinhDichModal();
      }
    });

    const zoomDownloadBtn = document.getElementById('btn-modal-zoom-download');
    if (zoomDownloadBtn) {
      zoomDownloadBtn.addEventListener('click', function () {
        const zoomTitle = document.getElementById('modal-zoom-title');
        if (zoomTitle && zoomTitle.textContent.includes('Quẻ Dịch') && typeof window.downloadKinhDichImage === 'function') {
          window.downloadKinhDichImage();
        }
      });
    }
  }

  // Tương thích ngược: Hàm tải xuất quẻ dịch & in quẻ
  window.taiXuatQueDich = function() {
    if (cachedKinhDichDataUrl) {
      window.downloadKinhDichImage();
      return;
    }
    const exportCard = document.getElementById('trang-dich-quai-card');
    if (!exportCard) {
      alert('Chưa có thông tin quẻ dịch để tải về!');
      return;
    }

    const btnDownload = document.getElementById('btn-download-dichquai');
    let originalText = '';
    if (btnDownload) {
      originalText = btnDownload.innerHTML;
      btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xuất ảnh...';
      btnDownload.disabled = true;
    }

    if (typeof html2canvas === 'undefined') {
      alert('Chưa tải xong thư viện tạo ảnh. Vui lòng tải lại trang hoặc thử lại!');
      if (btnDownload) {
        btnDownload.innerHTML = originalText;
        btnDownload.disabled = false;
      }
      return;
    }

    const prevZoom = exportCard.style.zoom;
    const prevTransform = exportCard.style.transform;
    exportCard.style.zoom = '1';
    exportCard.style.transform = 'none';

    html2canvas(exportCard, {
        scale: 2,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      scrollX: 0,
      scrollY: 0,
      logging: false
    }).then(function(canvas) {
      exportCard.style.zoom = prevZoom;
      exportCard.style.transform = prevTransform;
      const link = document.createElement('a');
      const now = new Date();
      const timeStamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
      link.download = `Bang_Xuat_Que_Dich_${timeStamp}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (btnDownload) {
        btnDownload.innerHTML = originalText;
        btnDownload.disabled = false;
      }
    }).catch(function(err) {
      exportCard.style.zoom = prevZoom;
      exportCard.style.transform = prevTransform;
      console.error('Lỗi khi tạo ảnh quẻ dịch:', err);
      alert('Không thể tạo ảnh tải về: ' + (err ? err.message : ''));
      if (btnDownload) {
        btnDownload.innerHTML = originalText;
        btnDownload.disabled = false;
      }
    });
  };

  window.printTrangDichQuai = function() {
    if (cachedKinhDichDataUrl) {
      window.printKinhDichImage();
    } else {
      window.print();
    }
  };
