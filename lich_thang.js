/**
 * MODULE LỊCH THÁNG - THUẬT SỐ HUYỀN HỌC
 * Công thức tính toán ma trận lưới Lịch Tháng và giao diện tra cứu chuẩn 24h.com.vn
 */

(function (window) {
  'use strict';

  // Ngày lễ Dương lịch
  const LE_DUONG = {
    '1/1': 'Tết Dương Lịch',
    '14/2': 'Valentine',
    '8/3': 'Quốc tế Phụ nữ',
    '30/4': 'Giải phóng MN',
    '1/5': 'Quốc tế Lao động',
    '19/5': 'Sinh nhật Bác',
    '1/6': 'Quốc tế Thiếu nhi',
    '27/7': 'Thương binh Liệt sĩ',
    '19/8': 'Cách mạng T8',
    '2/9': 'Quốc Khánh',
    '10/10': 'Giải phóng Thủ đô',
    '20/10': 'Phụ nữ VN',
    '20/11': 'Nhà giáo VN',
    '22/12': 'QĐND VN',
    '24/12': 'Giáng Sinh'
  };

  // Ngày lễ Âm lịch
  const LE_AM = {
    '1/1': 'Mùng 1 Tết',
    '2/1': 'Mùng 2 Tết',
    '3/1': 'Mùng 3 Tết',
    '15/1': 'Rằm T.Giêng',
    '10/3': 'Giỗ Tổ Hùng Vương',
    '15/4': 'Phật Đản',
    '5/5': 'Tết Đoan Ngọ',
    '15/7': 'Vu Lan',
    '15/8': 'Trung Thu',
    '9/9': 'Trùng Cửu',
    '23/12': 'Ông Táo',
    '30/12': 'Giao Thừa'
  };

  // Trạng thái tháng năm đang xem
  let viewingMonth = new Date().getMonth() + 1;
  let viewingYear = new Date().getFullYear();
  let selectedDay = new Date().getDate();

  /**
   * HÀM RÚT GỌN CAN CHI CHO GIAO DIỆN MOBI (VD: Nhâm Tuất -> N.Tuất)
   */
  function rutGonCanChi(str) {
    if (!str || typeof str !== 'string') return str;
    const parts = str.trim().split(/\s+/);
    if (parts.length === 2) {
      const can = parts[0];
      const chi = parts[1];
      const canMap = {
        'Giáp': 'G.', 'Ất': 'Ấ.', 'Bính': 'B.', 'Đinh': 'Đ.', 'Mậu': 'M.',
        'Kỷ': 'K.', 'Canh': 'C.', 'Tân': 'T.', 'Nhâm': 'N.', 'Quý': 'Q.'
      };
      if (canMap[can]) {
        return canMap[can] + chi;
      }
    }
    return str;
  }

  /**
   * CÔNG THỨC: TẠO MA TRẬN LƯỚI LỊCH THÁNG (7 CỘT x 5-6 HÀNG)
   */
  function tinhToanLichThang(month, year, selDay) {
    const engine = window.LICH_VAN_NIEN_ENGINE;
    if (!engine) {
      console.warn('LICH_VAN_NIEN_ENGINE chưa tải, đang chờ...');
      return null;
    }

    const todayObj = new Date();
    const todayD = todayObj.getDate();
    const todayM = todayObj.getMonth() + 1;
    const todayY = todayObj.getFullYear();

    const firstDayDate = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();

    // Thứ của ngày 1 (Thứ 2 = 0, Thứ 3 = 1, ..., Chủ Nhật = 6)
    let startDayIdx = firstDayDate.getDay() === 0 ? 6 : firstDayDate.getDay() - 1;

    const cells = [];

    // Các ngày đệm của tháng trước
    const prevMonthDays = new Date(year, month - 1, 0).getDate();
    for (let i = startDayIdx - 1; i >= 0; i--) {
      const prevD = prevMonthDays - i;
      const prevM = month === 1 ? 12 : month - 1;
      const prevY = month === 1 ? year - 1 : year;
      const info = engine.getLichVanNienDayInfo(prevD, prevM, prevY);
      cells.push(formatCellInfo(info, prevD, prevM, prevY, false, todayD, todayM, todayY, selDay, month, year));
    }

    // Các ngày trong tháng hiện tại
    for (let d = 1; d <= daysInMonth; d++) {
      const info = engine.getLichVanNienDayInfo(d, month, year);
      cells.push(formatCellInfo(info, d, month, year, true, todayD, todayM, todayY, selDay, month, year));
    }

    // Các ngày đệm của tháng kế tiếp (làm tròn bội số 7: 35 hoặc 42 ô)
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 12 ? 1 : month + 1;
      const nextY = month === 12 ? year + 1 : year;
      const info = engine.getLichVanNienDayInfo(d, nextM, nextY);
      cells.push(formatCellInfo(info, d, nextM, nextY, false, todayD, todayM, todayY, selDay, month, year));
    }

    return {
      month: month,
      year: year,
      monthStr: month < 10 ? '0' + month : '' + month,
      cells: cells
    };
  }

  function formatCellInfo(info, d, m, y, isCurrentMonth, todayD, todayM, todayY, selDay, curM, curY) {
    const isToday = (d === todayD && m === todayM && y === todayY);
    const isSelected = isCurrentMonth && (d === selDay && m === curM && y === curY);

    const keyDuong = `${d}/${m}`;
    const keyAm = `${info.lunar.day}/${info.lunar.month}`;
    let subText = info.canChi.day;
    let isHoliday = false;

    if (LE_DUONG[keyDuong]) {
      subText = LE_DUONG[keyDuong];
      isHoliday = true;
    } else if (LE_AM[keyAm]) {
      subText = LE_AM[keyAm];
      isHoliday = true;
    } else if (info.lunar.day === 1) {
      subText = 'Mồng một';
      isHoliday = true;
    } else if (info.lunar.day === 15) {
      subText = 'Ngày Rằm';
      isHoliday = true;
    }

    // Hiển thị ngày âm: nếu mùng 1 hoặc nhuận thì hiện dạng "1/tháng"
    let lunarDisplay = '' + info.lunar.day;
    if (info.lunar.day === 1) {
      lunarDisplay = `1/${info.lunar.month}${info.lunar.isLeap ? '*' : ''}`;
    }

    const subTextShort = isHoliday ? subText : rutGonCanChi(subText);

    return {
      solarDay: d,
      solarMonth: m,
      solarYear: y,
      solarDayStr: d < 10 ? '0' + d : '' + d,
      lunarDay: info.lunar.day,
      lunarMonth: info.lunar.month,
      lunarDisplay: lunarDisplay,
      isLeap: info.lunar.isLeap,
      canChiDay: info.canChi.day,
      subText: subText,
      subTextShort: subTextShort,
      isHoliday: isHoliday,
      isHoangDao: info.hoangDaoDay.isHoangDao,
      starName: info.hoangDaoDay.name,
      isCurrentMonth: isCurrentMonth,
      isToday: isToday,
      isSelected: isSelected
    };
  }

  /**
   * GIAO DIỆN: RENDER BẢNG LỊCH THÁNG 7 CỘT CHUẨN 24H
   */
  function renderLichThang(gridData) {
    const container = document.getElementById('box_lich_thang_grid');
    if (!container || !gridData) return;

    const m = gridData.month;
    const y = gridData.year;

    // Cập nhật tiêu đề và select
    const titleEl = document.getElementById('lt-title-month-year');
    if (titleEl) {
      titleEl.textContent = `THÁNG ${gridData.monthStr} - ${y}`;
    }
    const selM = document.getElementById('lt-sel-month');
    if (selM) selM.value = m;
    const selY = document.getElementById('lt-sel-year');
    if (selY) selY.value = y;

    // Tạo các hàng trong bảng 7 cột
    let rowsHtml = '';
    const cells = gridData.cells;
    const totalRows = Math.ceil(cells.length / 7);

    for (let r = 0; r < totalRows; r++) {
      rowsHtml += '<tr>';
      for (let c = 0; c < 7; c++) {
        const idx = r * 7 + c;
        const cell = cells[idx];
        if (!cell) {
          rowsHtml += '<td></td>';
          continue;
        }

        const isSun = (c === 6);
        const cellClass = [
          'lt-day-cell',
          cell.isCurrentMonth ? 'in-month' : 'out-month',
          cell.isToday ? 'cell-today' : '',
          cell.isSelected ? 'cell-selected' : '',
          isSun ? 'cell-sunday' : ''
        ].filter(Boolean).join(' ');

        const dotClass = cell.isHoangDao ? 'dot-hoangdao' : 'dot-hacdao';
        const dotTitle = cell.isHoangDao ? `Hoàng Đạo (${cell.starName})` : `Hắc Đạo (${cell.starName})`;

        rowsHtml += `
          <td class="${cellClass}" onclick="window.chonNgayLichThang(${cell.solarDay}, ${cell.solarMonth}, ${cell.solarYear})" title="Xem lịch ngày ${cell.solarDay}/${cell.solarMonth}/${cell.solarYear}">
            <div class="lt-cell-inner">
              <div class="lt-cell-top">
                <div class="lt-solar-wrap">
                  <span class="lt-dot ${dotClass}" title="${dotTitle}"></span>
                  <span class="lt-day-num ${cell.isHoliday ? 'text-red' : ''}">${cell.solarDayStr}</span>
                </div>
                <div class="lt-lunar-num ${cell.lunarDay === 1 || cell.lunarDay === 15 ? 'lunar-special' : ''}">
                  ${cell.lunarDisplay}
                </div>
              </div>
              <div class="lt-cell-bottom ${cell.isHoliday ? 'holiday-text' : ''}" title="${cell.subText}">
                <span class="lt-subtext-full">${cell.subText}</span>
                <span class="lt-subtext-short">${cell.subTextShort}</span>
              </div>
            </div>
          </td>
        `;
      }
      rowsHtml += '</tr>';
    }

    container.innerHTML = `
      <div class="lt-table-responsive">
        <table class="lt-calendar-table">
          <thead>
            <tr>
              <th><span class="lt-header-full">Thứ Hai</span><span class="lt-header-short">T.Hai</span></th>
              <th><span class="lt-header-full">Thứ Ba</span><span class="lt-header-short">T.Ba</span></th>
              <th><span class="lt-header-full">Thứ Tư</span><span class="lt-header-short">T.Tư</span></th>
              <th><span class="lt-header-full">Thứ Năm</span><span class="lt-header-short">T.Năm</span></th>
              <th><span class="lt-header-full">Thứ Sáu</span><span class="lt-header-short">T.Sáu</span></th>
              <th><span class="lt-header-full">Thứ Bảy</span><span class="lt-header-short">T.Bảy</span></th>
              <th class="th-sunday"><span class="lt-header-full">Chủ Nhật</span><span class="lt-header-short">C.Nhật</span></th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * ĐIỀU KHIỂN & CÁC HÀM CÔNG CỘNG (PUBLIC API)
   */
  function loadThang(m, y, dayToSelect) {
    viewingMonth = parseInt(m, 10);
    viewingYear = parseInt(y, 10);
    if (dayToSelect) selectedDay = parseInt(dayToSelect, 10);

    const gridData = tinhToanLichThang(viewingMonth, viewingYear, selectedDay);
    if (gridData) {
      renderLichThang(gridData);
    }
  }

  function prevMonth() {
    let m = viewingMonth - 1;
    let y = viewingYear;
    if (m < 1) {
      m = 12;
      y--;
    }
    loadThang(m, y, 1);
  }

  function nextMonth() {
    let m = viewingMonth + 1;
    let y = viewingYear;
    if (m > 12) {
      m = 1;
      y++;
    }
    loadThang(m, y, 1);
  }

  function veThangHienTai() {
    const now = new Date();
    loadThang(now.getMonth() + 1, now.getFullYear(), now.getDate());
    // Đồng bộ cả sang Lịch Âm Dương
    if (window.LICH_AM_DUONG && typeof window.LICH_AM_DUONG.hienThiNgay === 'function') {
      window.LICH_AM_DUONG.hienThiNgay(now.getDate(), now.getMonth() + 1, now.getFullYear());
    }
  }

  function chonNgay(d, m, y) {
    selectedDay = d;
    // Nếu ngày bấm thuộc tháng khác, chuyển luôn sang tháng đó
    if (m !== viewingMonth || y !== viewingYear) {
      loadThang(m, y, d);
    } else {
      // Highlight ô trong tháng hiện tại
      const cells = document.querySelectorAll('.lt-day-cell');
      cells.forEach(c => c.classList.remove('cell-selected'));
      // Vẽ lại bảng để cập nhật trạng thái chọn
      const gridData = tinhToanLichThang(viewingMonth, viewingYear, selectedDay);
      if (gridData) renderLichThang(gridData);
    }

    // ĐỒNG BỘ: Cập nhật ngay phần Lịch Âm Dương sang ngày được click
    if (window.LICH_AM_DUONG && typeof window.LICH_AM_DUONG.hienThiNgay === 'function') {
      window.LICH_AM_DUONG.hienThiNgay(d, m, y);
    }

    // Đồng bộ cả bộ chọn Trạch Nhật (nếu đang ở trang tab-lich)
    if (typeof window.chonNgayTrachNhatTuLichThang === 'function') {
      window.chonNgayTrachNhatTuLichThang(d, m, y);
    }
  }

  function highlightNgay(d, m, y) {
    if (m === viewingMonth && y === viewingYear) {
      selectedDay = d;
      const gridData = tinhToanLichThang(viewingMonth, viewingYear, selectedDay);
      if (gridData) renderLichThang(gridData);
    } else {
      loadThang(m, y, d);
    }
  }

  function xuLyChonThangNamDropdown() {
    const selM = document.getElementById('lt-sel-month');
    const selY = document.getElementById('lt-sel-year');
    if (selM && selY) {
      const m = parseInt(selM.value, 10);
      const y = parseInt(selY.value, 10);
      const maxDays = new Date(y, m, 0).getDate();
      const targetDay = selectedDay ? Math.min(selectedDay, maxDays) : 1;
      loadThang(m, y, targetDay);
    }
  }

  function khoiTaoDropdownNam() {
    const selY = document.getElementById('lt-sel-year');
    const selM = document.getElementById('lt-sel-month');
    if (!selY || !selM) return;

    if (selY.options.length <= 1) {
      selY.innerHTML = '';
      for (let y = 2050; y >= 1930; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `Năm ${y}`;
        if (y === viewingYear) opt.selected = true;
        selY.appendChild(opt);
      }
    }

    if (selM.options.length <= 1) {
      selM.innerHTML = '';
      for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = `Tháng ${m < 10 ? '0' + m : m}`;
        if (m === viewingMonth) opt.selected = true;
        selM.appendChild(opt);
      }
    }
  }

  function initLichThang() {
    khoiTaoDropdownNam();
    const now = new Date();
    loadThang(now.getMonth() + 1, now.getFullYear(), now.getDate());
  }

  // Đăng ký toàn cục
  window.LICH_THANG = {
    tinhToan: tinhToanLichThang,
    loadThang: loadThang,
    highlightNgay: highlightNgay,
    init: initLichThang
  };

  window.prevMonthLichThang = prevMonth;
  window.nextMonthLichThang = nextMonth;
  window.veThangHienTaiLichThang = veThangHienTai;
  window.chonNgayLichThang = chonNgay;
  window.xuLyChonThangNamDropdown = xuLyChonThangNamDropdown;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLichThang);
  } else {
    initLichThang();
  }

})(window);
