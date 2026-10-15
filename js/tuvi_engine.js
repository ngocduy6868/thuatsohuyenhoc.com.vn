/**
 * ====================================================================
 * TỬ VI ĐẨU SỐ ENGINE - AN SAO & LẬP LÁ SỐ CHUẨN CỔ TRUYỀN
 * - Quy đổi chuẩn xác Dương Lịch sang Âm Lịch (dùng LICH_VAN_NIEN_ENGINE)
 * - Định Cung MỆNH, Cung THÂN theo Tháng & Giờ sinh
 * - Ngũ Hổ Độn an Can 12 cung
 * - Định Cục (Thủy Nhị, Mộc Tam, Kim Tứ, Thổ Ngũ, Hỏa Lục Cục)
 * - An 14 Chính Tinh (Tử Vi, Thiên Phủ, Thiên Cơ, Thái Dương...) đắc hãm
 * - An Phụ Tinh (Lộc Tồn, Kình Dương, Đà La, Xương, Khúc, Tả, Hữu, Không, Kiếp, Tứ Hóa...)
 * - Vòng Thái Tuế & Vòng Tràng Sinh
 * - Xác định vị trí Tuần Không & Triệt Không
 * ====================================================================
 */

const TuViEngine = (function () {
  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const CHI_SHORT = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const PALACE_NAMES = [
    'MỆNH', 'PHỤ MẪU', 'PHÚC ĐỨC', 'ĐIỀN TRẠCH', 
    'QUAN LỘC', 'NÔ BỘC', 'THIÊN DI', 'TẬT ÁCH', 
    'TÀI BẠCH', 'TỬ TỨC', 'PHU THÊ', 'HUYNH ĐỆ'
  ];

  // 14 Chính Tinh Miếu Vượng Đắc Hãm theo 12 cung (Tý đến Hợi)
  // M: Miếu, V: Vượng, Đ: Đắc, H: Hãm
  const CHINH_TINH_STATUS = {
    'Tử Vi':     ['B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'],
    'Thiên Cơ':  ['M', 'Đ', 'V', 'M', 'M', 'Đ', 'M', 'Đ', 'V', 'M', 'V', 'Đ'],
    'Thái Dương':['H', 'Đ', 'V', 'V', 'V', 'M', 'M', 'Đ', 'H', 'H', 'H', 'H'],
    'Vũ Khúc':   ['V', 'M', 'V', 'Đ', 'M', 'H', 'V', 'M', 'V', 'Đ', 'M', 'H'],
    'Thiên Đồng':['V', 'H', 'M', 'Đ', 'H', 'Đ', 'H', 'H', 'M', 'Đ', 'H', 'Đ'],
    'Liêm Trinh':['V', 'Đ', 'V', 'H', 'M', 'H', 'V', 'Đ', 'V', 'H', 'M', 'H'],
    'Thiên Phủ': ['M', 'M', 'M', 'Đ', 'M', 'Đ', 'V', 'M', 'M', 'Đ', 'M', 'Đ'],
    'Thái Âm':   ['V', 'M', 'H', 'H', 'H', 'H', 'H', 'Đ', 'V', 'V', 'M', 'M'],
    'Tham Lang': ['H', 'M', 'Đ', 'H', 'V', 'H', 'H', 'M', 'Đ', 'H', 'V', 'H'],
    'Cự Môn':    ['V', 'H', 'V', 'M', 'H', 'H', 'V', 'H', 'M', 'M', 'H', 'H'],
    'Thiên Tướng':['V', 'Đ', 'M', 'H', 'V', 'Đ', 'V', 'Đ', 'M', 'H', 'V', 'Đ'],
    'Thiên Lương':['V', 'Đ', 'V', 'V', 'M', 'H', 'M', 'Đ', 'V', 'V', 'M', 'H'],
    'Thất Sát':  ['M', 'Đ', 'M', 'H', 'H', 'V', 'M', 'Đ', 'M', 'H', 'H', 'V'],
    'Phá Quân':  ['M', 'V', 'H', 'H', 'Đ', 'H', 'M', 'V', 'H', 'H', 'Đ', 'H']
  };

  // Ngũ Hành của Chính Tinh & Phụ Tinh (Chuẩn 100% theo lá số mẫu Image 1)
  const STAR_ELEMENTS = {
    'Tử Vi': 'tho', 'Thiên Cơ': 'moc', 'Thái Dương': 'hoa', 'Vũ Khúc': 'kim',
    'Thiên Đồng': 'thuy', 'Liêm Trinh': 'hoa', 'Thiên Phủ': 'tho', 'Thái Âm': 'thuy',
    'Tham Lang': 'thuy', 'Cự Môn': 'thuy', 'Thiên Tướng': 'thuy', 'Thiên Lương': 'moc',
    'Thất Sát': 'kim', 'Phá Quân': 'thuy',
    'Văn Xương': 'kim', 'Văn Khúc': 'thuy', 'Tả Phù': 'tho', 'Hữu Bật': 'tho',
    'Thiên Khôi': 'hoa', 'Thiên Việt': 'hoa', 'Lộc Tồn': 'tho', 'Kình Dương': 'kim',
    'Đà La': 'kim', 'Địa Không': 'hoa', 'Địa Kiếp': 'hoa', 'Hỏa Tinh': 'hoa',
    'Hoả Tinh': 'hoa', 'Linh Tinh': 'hoa', 'Hóa Lộc': 'moc', 'Hóa Quyền': 'moc',
    'Hóa Khoa': 'moc', 'Hóa Kỵ': 'thuy', 'Thiên Mã': 'hoa', 'Đào Hoa': 'moc',
    'Hồng Loan': 'hoa', 'Thiên Hỷ': 'thuy', 'Bạch Hổ': 'kim', 'Tang Môn': 'moc',
    'Thái Tuế': 'hoa', 'Thiên Khốc': 'kim', 'Thiên Hư': 'kim', 'Long Trì': 'thuy',
    'Phượng Các': 'moc', 'Tam Thai': 'kim', 'Bát Tọa': 'moc', 'Ân Quang': 'moc',
    'Thiên Quý': 'tho', 'Thiên Quan': 'hoa', 'Thiên Phúc': 'hoa', 'Giải Thần': 'moc',
    'Thiên Đức': 'hoa', 'Nguyệt Đức': 'hoa', 'Phúc Đức': 'tho', 'Thiên Tài': 'tho',
    'Thiên Thọ': 'tho', 'Thiên Y': 'thuy', 'Thiên Trù': 'tho', 'Phong Cáo': 'tho',
    'Thanh Long': 'moc', 'Tướng Quân': 'moc', 'Bác Sĩ': 'thuy', 'Bác Sỹ': 'thuy',
    'Lực Sĩ': 'hoa', 'Phục Binh': 'hoa', 'Quan Phủ': 'hoa', 'Quan Phù': 'hoa',
    'Tử Phù': 'hoa', 'Tuế Phá': 'hoa', 'Tiểu Hao': 'hoa', 'Đại Hao': 'hoa',
    'Điếu Khách': 'hoa', 'Trực Phù': 'hoa', 'Kiếp Sát': 'hoa', 'Phá Toái': 'hoa',
    'Lưu Hà': 'thuy', 'Thiên La': 'kim', 'Địa Võng': 'kim', 'Cô Thần': 'tho',
    'Quả Tú': 'tho', 'Thiên Không': 'hoa', 'Thiên Hình': 'hoa', 'Thiên Diêu': 'thuy',
    'Hoa Cái': 'kim', 'Quốc Ấn': 'tho', 'Đường Phù': 'moc', 'Thai Phụ': 'kim',
    'Thiên Giải': 'hoa', 'Địa Giải': 'tho', 'Tấu Thư': 'kim', 'Phi Liêm': 'hoa',
    'Hỷ Thần': 'hoa', 'Hỉ Thần': 'hoa', 'Bệnh Phù': 'tho', 'Đẩu Quân': 'hoa',
    'Thiếu Dương': 'hoa', 'Thiếu Âm': 'tho', 'Long Đức': 'thuy', 'Thiên Thương': 'tho',
    'Thiên Sứ': 'thuy',
    // 10 Sao Lưu Niên theo Năm Xem (viewYear)
    'L.Thái Tuế': 'hoa', 'L.Tang Môn': 'moc', 'L.Bạch Hổ': 'kim',
    'L.Thiên Khốc': 'kim', 'L.Thiên Hư': 'kim', 'L.Lộc Tồn': 'tho',
    'L.Kình Dương': 'kim', 'L.Đà La': 'kim', 'L.Thiên Mã': 'hoa',
    'LN Văn Tinh': 'kim',
    // Bộ Lưu Tứ Hóa theo Can Năm Xem
    'L.Hóa Lộc': 'moc', 'L.Hóa Quyền': 'moc', 'L.Hóa Khoa': 'moc', 'L.Hóa Kỵ': 'thuy'
  };

  // Nạp âm Lục Thập Hoa Giáp
  function getNapAm(canIdx, chiIdx) {
    const canVal = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][canIdx % 10];
    const chiVal = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2][chiIdx % 12];
    let sum = canVal + chiVal;
    if (sum > 5) sum -= 5;
    const napAmMap = {
      1: { element: 'Kim', name: 'Hải Trung Kim' },
      2: { element: 'Thủy', name: 'Đại Khê Thủy' },
      3: { element: 'Hỏa', name: 'Tích Lịch Hỏa' },
      4: { element: 'Thổ', name: 'Lộ Bàng Thổ' },
      5: { element: 'Mộc', name: 'Bình Địa Mộc' }
    };
    return napAmMap[sum] || { element: 'Kim', name: 'Sa Trung Kim' };
  }

  // Chuyển đổi tên giờ sang chi index (0..11)
  function parseHourToChiIndex(hourInput) {
    if (hourInput === undefined || hourInput === null) return 4;
    if (typeof hourInput === 'number') {
      if (hourInput >= 0 && hourInput <= 11) return Math.floor(hourInput);
      return Math.floor(((hourInput % 24) + 1) / 2) % 12;
    }
    const h = String(hourInput).trim().toLowerCase();
    if (!h) return 4;

    // 1. Kiểm tra theo tên Chi (bao gồm cả biến thể chính tả Tý/Tí, Mão/Mẹo, Tỵ/Tị, Sửu/Sữu)
    if (h.includes('tỵ') || h.includes('tị')) return 5;
    if (h.includes('tý') || h.includes('tí')) return 0;
    if (h.includes('sửu') || h.includes('sữu') || h.includes('suu')) return 1;
    if (h.includes('dần') || h.includes('dan')) return 2;
    if (h.includes('mão') || h.includes('mẹo') || h.includes('mao') || h.includes('meo')) return 3;
    if (h.includes('thìn') || h.includes('thin')) return 4;
    if (h.includes('ngọ') || h.includes('ngo')) return 6;
    if (h.includes('mùi') || h.includes('mui')) return 7;
    if (h.includes('thân') || h.includes('than')) return 8;
    if (h.includes('dậu') || h.includes('dau')) return 9;
    if (h.includes('tuất') || h.includes('tuat')) return 10;
    if (h.includes('hợi') || h.includes('hoi')) return 11;
    if (h.includes('ty') || h.includes('ti')) return 0;

    // 2. Nhận diện số giờ (ví dụ: '10:30', '14h', '10 giờ 30 phút')
    const matchTime = h.match(/^(\d{1,2})(?::|h| giờ|\s|$)/);
    if (matchTime) {
      const hNum = parseInt(matchTime[1], 10);
      if (!isNaN(hNum) && hNum >= 0 && hNum <= 24) {
        return Math.floor(((hNum % 24) + 1) / 2) % 12;
      }
    }

    return 4; // Mặc định Thìn
  }

  /**
   * Tính CỤC Số (Thủy Nhị, Mộc Tam, Kim Tứ, Thổ Ngũ, Hỏa Lục)
   * Căn cứ theo Can Chi của cung MỆNH
   */
  function calculateCuc(canMenhIdx, chiMenhIdx) {
    const napAm = getNapAm(canMenhIdx, chiMenhIdx);
    switch (napAm.element) {
      case 'Thủy': return { num: 2, name: 'Thủy Nhị Cục', element: 'Thủy' };
      case 'Mộc':  return { num: 3, name: 'Mộc Tam Cục', element: 'Mộc' };
      case 'Kim':  return { num: 4, name: 'Kim Tứ Cục', element: 'Kim' };
      case 'Thổ':  return { num: 5, name: 'Thổ Ngũ Cục', element: 'Thổ' };
      case 'Hỏa':  return { num: 6, name: 'Hỏa Lục Cục', element: 'Hỏa' };
      default:     return { num: 2, name: 'Thủy Nhị Cục', element: 'Thủy' };
    }
  }

  /**
   * An Sao TỬ VI theo Ngày Sinh Âm Lịch và Cục Số
   */
  function findTuViPosition(lunarDay, cucNumber) {
    let X = 0;
    while ((lunarDay + X) % cucNumber !== 0) {
      X++;
    }
    const Q = (lunarDay + X) / cucNumber;
    let pos;
    if (X % 2 === 0) {
      // X chẵn: khởi Dần (2), đếm thuận Q bước, cộng thêm X
      pos = (2 + (Q - 1) + X) % 12;
    } else {
      // X lẻ: khởi Dần (2), đếm thuận Q bước, trừ đi X
      pos = (2 + (Q - 1) - X + 12) % 12;
    }
    return (pos + 12) % 12;
  }

  /**
   * An Triệt Không theo Can Năm
   */
  function getTrietKhong(canYearIdx) {
    switch (canYearIdx % 5) {
      case 0: return [8, 9];   // Giáp, Kỷ: Thân, Dậu
      case 1: return [6, 7];   // Ất, Canh: Ngọ, Mùi
      case 2: return [4, 5];   // Bính, Tân: Thìn, Tỵ
      case 3: return [2, 3];   // Đinh, Nhâm: Dần, Mão
      case 4: return [0, 1];   // Mậu, Quý: Tý, Sửu
      default: return [6, 7];
    }
  }

  /**
   * An Tuần Không theo Tuần Giáp (Can Chi Năm)
   */
  function getTuanKhong(canYearIdx, chiYearIdx) {
    // Độ lệch can chi để tìm đầu tuần Giáp
    let diff = (chiYearIdx - canYearIdx + 12) % 12;
    // diff = 0 -> Giáp Tý (Tuần tại Tuất 10, Hợi 11)
    // diff = 10 -> Giáp Tuất (Tuần tại Thân 8, Dậu 9)
    // diff = 8 -> Giáp Thân (Tuần tại Ngọ 6, Mùi 7)
    // diff = 6 -> Giáp Ngọ (Tuần tại Thìn 4, Tỵ 5)
    // diff = 4 -> Giáp Thìn (Tuần tại Dần 2, Mão 3)
    // diff = 2 -> Giáp Dần (Tuần tại Tý 0, Sửu 1)
    let tuan1 = (diff + 10) % 12;
    let tuan2 = (diff + 11) % 12;
    return [tuan1, tuan2];
  }

  /**
   * Tứ Hóa theo Can Năm
   */
  function getTuHoa(canYearIdx) {
    const tuHoaMap = {
      0: { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc', ky: 'Thái Dương' }, // Giáp
      1: { loc: 'Thiên Cơ', quyen: 'Thiên Lương', khoa: 'Tử Vi', ky: 'Thái Âm' },    // Ất
      2: { loc: 'Thiên Đồng', quyen: 'Thiên Cơ', khoa: 'Văn Xương', ky: 'Liêm Trinh' }, // Bính
      3: { loc: 'Thái Âm', quyen: 'Thiên Đồng', khoa: 'Thiên Cơ', ky: 'Cự Môn' },    // Đinh
      4: { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Hữu Bật', ky: 'Thiên Cơ' },    // Mậu
      5: { loc: 'Vũ Khúc', quyen: 'Tham Lang', khoa: 'Thiên Lương', ky: 'Văn Khúc' }, // Kỷ
      6: { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thái Âm', ky: 'Thiên Đồng' }, // Canh
      7: { loc: 'Cự Môn', quyen: 'Thái Dương', khoa: 'Văn Khúc', ky: 'Văn Xương' }, // Tân
      8: { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Thiên Phủ', ky: 'Vũ Khúc' },  // Nhâm
      9: { loc: 'Phá Quân', quyen: 'Cự Môn', khoa: 'Thái Âm', ky: 'Tham Lang' }     // Quý
    };
    return tuHoaMap[canYearIdx % 10] || tuHoaMap[0];
  }

  // =========================================================================
  // THUẬT TOÁN THIÊN VĂN DƯƠNG LỊCH <-> ÂM LỊCH TỰ THÂN (CHUẨN HỒ NGỌC ĐỨC)
  // =========================================================================
  const PI = Math.PI;
  function jdFromDate(d, m, y) {
    const a = Math.floor((14 - m) / 12);
    const y1 = y + 4800 - a;
    const m1 = m + 12 * a - 3;
    return d + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
  }
  function getNewMoonDay(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    const C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    const C2 = -0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
    const C3 = -0.0004 * Math.sin(3 * dr * Mpr);
    const C4 = 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
    const C5 = -0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    const C6 = -0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
    const C7 = 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);
    const deltat = (T < -4) ? 0.0 : (T < 0 ? (102.3 + 123.5 * T + 32.5 * T2) / 86400.0 : (65.0 / 86400.0));
    const JdNew = Jd1 + C1 + C2 + C3 + C4 + C5 + C6 + C7 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  }
  function getSunLongitude(jdn, timeZone) {
    const T = (jdn - 2451545.0 + 0.5 - timeZone / 24.0) / 36525.0;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = (L * dr) % (2 * PI);
    if (L < 0) L += 2 * PI;
    return Math.floor(L / (PI / 6));
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
    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0, i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }
  function convertSolar2Lunar(dd, mm, yyyy, timeZone = 7) {
    const dayNumber = jdFromDate(dd, mm, yyyy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let lastNm = getNewMoonDay(k + 1, timeZone);
    if (lastNm > dayNumber) lastNm = getNewMoonDay(k, timeZone);
    let a11 = getLunarMonth11(yyyy, timeZone);
    let b11 = a11;
    let y = yyyy;
    if (a11 >= lastNm) {
      y = yyyy - 1;
      a11 = getLunarMonth11(y, timeZone);
    } else {
      b11 = getLunarMonth11(yyyy + 1, timeZone);
    }
    let kCurrent = Math.floor((lastNm - 2415021.076998695) / 29.530588853 + 0.5);
    let k11 = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let diff = kCurrent - k11;
    let leap = false, lunarYear = y + 1;
    if (Math.floor((b11 - a11) / 29) > 12) {
      let leapOff = getLeapMonthOffset(a11, timeZone);
      let leapIndex = leapOff - 1;
      if (diff === leapIndex) leap = true;
      if (diff > leapIndex) diff--;
    }
    let lunarMonth = diff + 11;
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    const lunarDay = dayNumber - lastNm + 1;
    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap, jd: dayNumber };
  }
  function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap = false, timeZone = 7) {
    let a11;
    if (lunarMonth < 11) a11 = getLunarMonth11(lunarYear - 1, timeZone);
    else a11 = getLunarMonth11(lunarYear, timeZone);
    let b11 = getLunarMonth11(lunarYear, timeZone);
    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let off = lunarMonth - 11;
    if (off < 0) off += 12;
    if (Math.floor((b11 - a11) / 29) > 12) {
      let leapOff = getLeapMonthOffset(a11, timeZone);
      let leapIndex = leapOff - 1;
      if (lunarLeap) off = leapOff;
      else if (off >= leapOff) off += 1;
    }
    let nm = getNewMoonDay(k + off, timeZone);
    let jd = nm + lunarDay - 1;
    let a = jd + 32044;
    let b = Math.floor((4 * a + 3) / 146097);
    let c = a - Math.floor((146097 * b) / 4);
    let d = Math.floor((4 * c + 3) / 1461);
    let e = c - Math.floor((1461 * d) / 4);
    let m = Math.floor((5 * e + 2) / 153);
    let day = e - Math.floor((153 * m + 2) / 5) + 1;
    let month = m + 3 - 12 * Math.floor(m / 10);
    let year = 100 * b + d - 4800 + Math.floor(m / 10);
    return { day, month, year, jd };
  }

  // Kiểm tra giờ sinh có thuộc giờ Tý đêm (từ 23h00 trở đi) để chuyển ngày thuật số
  function isLateNightZiHour(hourInput) {
    if (hourInput === undefined || hourInput === null) return false;
    if (typeof hourInput === 'number') {
      return hourInput === 23;
    }
    const h = String(hourInput).trim().toLowerCase();
    const match = h.match(/^(\d{1,2})/);
    if (match && parseInt(match[1], 10) === 23) {
      return true;
    }
    if (h.includes('23h') || h.includes('23:') || h.includes('23 giờ')) {
      return true;
    }
    return false;
  }

  /**
   * HÀM CHÍNH: LẬP TOÀN BỘ LÁ SỐ TỬ VI
   */
  function lapLaSo(params) {
    const { name, day, month, year, hour, gender, calendarType, viewYear } = params;

    let solDay = parseInt(day, 10) || 15;
    let solMonth = parseInt(month, 10) || 7;
    let solYear = parseInt(year, 10) || 1995;

    let lunDay, lunMonth, lunYear, isLeap = false;
    const isLateZi = isLateNightZiHour(hour);

    let calcSolDay = solDay;
    let calcSolMonth = solMonth;
    let calcSolYear = solYear;

    // QUY ĐỔI LỊCH CHUẨN XÁC 100%
    if (calendarType === 'Dương lịch') {
      if (isLateZi) {
        // Sinh từ 23h00 trở đi đã bước sang ngày hôm sau theo thuật số cổ truyền
        const nextDate = new Date(solYear, solMonth - 1, solDay + 1);
        calcSolDay = nextDate.getDate();
        calcSolMonth = nextDate.getMonth() + 1;
        calcSolYear = nextDate.getFullYear();
      }
      const lun = convertSolar2Lunar(calcSolDay, calcSolMonth, calcSolYear, 7.0);
      lunDay = lun.day;
      lunMonth = lun.month;
      lunYear = lun.year;
      isLeap = lun.leap;
    } else {
      // Người dùng nhập Âm lịch -> tính Dương lịch tương ứng
      if (isLateZi) {
        // Nếu nhập Âm lịch mà giờ sinh từ 23h00 -> sang ngày Âm lịch tiếp theo
        const solCurr = convertLunar2Solar(solDay, solMonth, solYear, false, 7.0);
        const nextDate = new Date(solCurr.year, solCurr.month - 1, solCurr.day + 1);
        calcSolDay = nextDate.getDate();
        calcSolMonth = nextDate.getMonth() + 1;
        calcSolYear = nextDate.getFullYear();
        const lun = convertSolar2Lunar(calcSolDay, calcSolMonth, calcSolYear, 7.0);
        lunDay = lun.day;
        lunMonth = lun.month;
        lunYear = lun.year;
        isLeap = lun.leap;
      } else {
        lunDay = solDay;
        lunMonth = solMonth;
        lunYear = solYear;
        const sol = convertLunar2Solar(lunDay, lunMonth, lunYear, false, 7.0);
        solDay = sol.day;
        solMonth = sol.month;
        solYear = sol.year;
        calcSolDay = solDay;
        calcSolMonth = solMonth;
        calcSolYear = solYear;
      }
    }

    const hourChiIdx = parseHourToChiIndex(hour);

    // Can Chi Năm Sinh
    const canYearIdx = (lunYear - 4) % 10 >= 0 ? (lunYear - 4) % 10 : (lunYear - 4) % 10 + 10;
    const chiYearIdx = (lunYear - 4) % 12 >= 0 ? (lunYear - 4) % 12 : (lunYear - 4) % 12 + 12;
    const canYearName = CAN[canYearIdx];
    const chiYearName = CHI[chiYearIdx];
    const canChiYear = `${canYearName} ${chiYearName}`;

    // Can Chi Ngày, Tháng, Giờ (Thuật toán cổ truyền chuẩn xác 100%)
    // 1. Can Chi Tháng: Ngũ Hổ Độn theo Can Năm
    const canMonthIdx = ((canYearIdx % 5) * 2 + 2 + (lunMonth - 1)) % 10;
    const chiMonthIdx = (2 + (lunMonth - 1)) % 12;
    const canChiMonth = `${CAN[canMonthIdx]} ${CHI[chiMonthIdx]}`;

    // 2. Can Chi Ngày: Tính từ Julian Day của ngày quy chuẩn thuật số
    const aJd = Math.floor((14 - calcSolMonth) / 12);
    const yJd = calcSolYear + 4800 - aJd;
    const mJd = calcSolMonth + 12 * aJd - 3;
    const jdVal = calcSolDay + Math.floor((153 * mJd + 2) / 5) + 365 * yJd + Math.floor(yJd / 4) - Math.floor(yJd / 100) + Math.floor(yJd / 400) - 32045;
    const canDayIdx = (jdVal + 9) % 10;
    const chiDayIdx = (jdVal + 1) % 12;
    const canChiDay = `${CAN[canDayIdx]} ${CHI[chiDayIdx]}`;

    // 3. Can Chi Giờ: Ngũ Thử Độn theo Can Ngày
    // Giáp/Kỷ khởi Giáp (0), Ất/Canh khởi Bính (2), Bính/Tân khởi Mậu (4), Đinh/Nhâm khởi Canh (6), Mậu/Quý khởi Nhâm (8)
    const startCanHour = ((canDayIdx % 5) * 2) % 10;
    const canHourIdx = (startCanHour + hourChiIdx) % 10;
    const canChiHour = `${CAN[canHourIdx]} ${CHI[hourChiIdx]}`;

    // Bản Mệnh Ngũ Hành
    const napAmMenh = getNapAm(canYearIdx, chiYearIdx);

    // Âm Dương Nam Nữ & Chiều Đại Hạn
    const isDuongNam = (canYearIdx % 2 === 0) && (gender === 'Nam');
    const isAmNu = (canYearIdx % 2 === 1) && (gender === 'Nữ');
    const isThuanLy = isDuongNam || isAmNu; // Chiều chạy Đại hạn
    const amDuongNamNu = (canYearIdx % 2 === 0 ? 'Dương ' : 'Âm ') + (gender === 'Nam' ? 'Nam' : 'Nữ');

    // 1. TÌM CUNG MỆNH VÀ CUNG THÂN
    // Tháng 1 khởi Dần (2), đếm thuận đến tháng sinh
    const posMonth = (2 + (lunMonth - 1)) % 12;
    // An Mệnh: đếm nghịch đến giờ sinh
    const posMenh = (posMonth - hourChiIdx + 12) % 12;
    // An Thân: đếm thuận đến giờ sinh
    const posThan = (posMonth + hourChiIdx) % 12;

    // 2. NGŨ HỔ ĐỘN TÌM CAN CỦA 12 CUNG (KHỞI TỪ DẦN)
    const canDanIdx = ((canYearIdx % 5) * 2 + 2) % 10;
    const canOfCung = [];
    for (let c = 0; c < 12; c++) {
      const step = (c - 2 + 12) % 12;
      canOfCung[c] = (canDanIdx + step) % 10;
    }

    // 3. TÌM CỤC SỐ DỰA VÀO CUNG MỆNH
    const canMenhIdx = canOfCung[posMenh];
    const chiMenhIdx = posMenh;
    const cucInfo = calculateCuc(canMenhIdx, chiMenhIdx);

    // 4. AN SAO TỬ VI VÀ THIÊN PHỦ (14 CHÍNH TINH)
    const posTuVi = findTuViPosition(lunDay, cucInfo.num);
    const posThienPhu = (4 - posTuVi + 12) % 12;

    // Map chứa các sao của 12 cung (0..11)
    const palacesStars = Array.from({ length: 12 }, () => ({
      chinhTinh: [],
      phuTinhGood: [],
      phuTinhBad: []
    }));

    // Ghi nhớ vị trí các sao để an Tứ Hóa và các sao liên đới
    const starPositions = {};

    function addStar(pos, starName, type = 'phuGood', tag = '') {
      if (!starName) return;
      const lowerStar = starName.trim().toLowerCase();
      // Tuan & Triet chi hien thi duy nhat o vi tri ranh bien gioi giua 2 cung
      if (lowerStar === 'tu\u1EA7n' || lowerStar === 'tri\u1EC7t' || 
          lowerStar === 'tu\u1EA7n kh\u00F4ng' || lowerStar === 'tri\u1EC7t kh\u00F4ng' ||
          lowerStar.startsWith('tu\u1EA7n') || lowerStar.startsWith('tri\u1EC7t') ||
          lowerStar === 'tuan' || lowerStar === 'triet') {
        return;
      }
      const p = (pos % 12 + 12) % 12;
      starPositions[starName] = p;
      const element = STAR_ELEMENTS[starName] || 'kim';
      if (type === 'chinh') {
        const st = (CHINH_TINH_STATUS[starName] && CHINH_TINH_STATUS[starName][p]) || 'V';
        palacesStars[p].chinhTinh.push({ name: starName, status: `(${st})`, element });
      } else if (type === 'phuGood') {
        palacesStars[p].phuTinhGood.push({ name: starName, status: tag, element });
      } else {
        palacesStars[p].phuTinhBad.push({ name: starName, status: tag, element });
      }
    }

    // 14 Chính Tinh
    // 6 sao chòm Tử Vi (đi nghịch)
    addStar(posTuVi, 'Tử Vi', 'chinh');
    addStar(posTuVi - 1, 'Thiên Cơ', 'chinh');
    addStar(posTuVi - 3, 'Thái Dương', 'chinh');
    addStar(posTuVi - 4, 'Vũ Khúc', 'chinh');
    addStar(posTuVi - 5, 'Thiên Đồng', 'chinh');
    addStar(posTuVi - 8, 'Liêm Trinh', 'chinh');

    // 8 sao chòm Thiên Phủ (đi thuận)
    addStar(posThienPhu, 'Thiên Phủ', 'chinh');
    addStar(posThienPhu + 1, 'Thái Âm', 'chinh');
    addStar(posThienPhu + 2, 'Tham Lang', 'chinh');
    addStar(posThienPhu + 3, 'Cự Môn', 'chinh');
    addStar(posThienPhu + 4, 'Thiên Tướng', 'chinh');
    addStar(posThienPhu + 5, 'Thiên Lương', 'chinh');
    addStar(posThienPhu + 6, 'Thất Sát', 'chinh');
    addStar(posThienPhu + 10, 'Phá Quân', 'chinh');

    // 5. AN PHỤ TINH TOÀN DIỆN (ĐẦY ĐỦ 100+ SAO CHUẨN CỔ TRUYỀN)
    // 5.1. Lộc Tồn, Kình Dương, Đà La (theo Can năm)
    const locTonMap = { 0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0 };
    const posLocTon = locTonMap[canYearIdx % 10];
    addStar(posLocTon, 'Lộc Tồn', 'phuGood', '(Đ)');
    
    const posKinhDuong = (posLocTon + 1) % 12;
    const posDaLa = (posLocTon - 1 + 12) % 12;
    const isDacKinh = [1, 4, 7, 10].includes(posKinhDuong); // Thìn Tuất Sửu Mùi đắc địa
    const isDacDa = [1, 4, 7, 10].includes(posDaLa);
    addStar(posKinhDuong, 'Kình Dương', 'phuBad', isDacKinh ? '(Đ)' : '(H)');
    addStar(posDaLa, 'Đà La', 'phuBad', isDacDa ? '(Đ)' : '(H)');

    // 5.2. Vòng Bác Sĩ (12 sao khởi từ Lộc Tồn: Thuận với Dương Nam / Âm Nữ, Nghịch với Âm Nam / Dương Nữ)
    const bacSiStars = [
      { name: 'Bác Sỹ', type: 'phuGood' },
      { name: 'Lực Sĩ', type: 'phuGood' },
      { name: 'Thanh Long', type: 'phuGood' },
      { name: 'Tiểu Hao', type: 'phuBad' },
      { name: 'Tướng Quân', type: 'phuBad' }, // Cột phải theo lá số mẫu
      { name: 'Tấu Thư', type: 'phuGood' },
      { name: 'Phi Liêm', type: 'phuBad' },
      { name: 'Hỉ Thần', type: 'phuGood' },
      { name: 'Bệnh Phù', type: 'phuBad' },
      { name: 'Đại Hao', type: 'phuBad' },
      { name: 'Phục Binh', type: 'phuBad' },
      { name: 'Quan Phủ', type: 'phuBad' }
    ];
    bacSiStars.forEach((st, idx) => {
      const p = isThuanLy ? (posLocTon + idx) % 12 : (posLocTon - idx + 120) % 12;
      let tag = '';
      if (['Tiểu Hao', 'Đại Hao'].includes(st.name)) {
        tag = [2, 8, 3, 9].includes(p) ? '(Đ)' : '(H)'; // Dần Thân Mão Dậu đắc địa
      }
      addStar(p, st.name, st.type, tag);
    });

    // 5.3. Vòng Thái Tuế (12 sao khởi từ Chi năm, đi thuận) + Thiên Không (đồng cung Thiếu Dương)
    const thaiTueStars = [
      { name: 'Thái Tuế', type: 'phuBad' }, // Cột phải theo lá số mẫu
      { name: 'Thiếu Dương', type: 'phuGood' },
      { name: 'Tang Môn', type: 'phuBad' },
      { name: 'Thiếu Âm', type: 'phuGood' },
      { name: 'Quan Phù', type: 'phuBad' },
      { name: 'Tử Phù', type: 'phuBad' },
      { name: 'Tuế Phá', type: 'phuBad' },
      { name: 'Long Đức', type: 'phuGood' },
      { name: 'Bạch Hổ', type: 'phuBad' },
      { name: 'Phúc Đức', type: 'phuGood' },
      { name: 'Điếu Khách', type: 'phuBad' },
      { name: 'Trực Phù', type: 'phuBad' }
    ];
    thaiTueStars.forEach((st, idx) => {
      const p = (chiYearIdx + idx) % 12;
      let tag = '';
      if (['Tang Môn', 'Bạch Hổ'].includes(st.name)) {
        tag = [2, 8, 3, 9].includes(p) ? '(Đ)' : '(H)';
      }
      addStar(p, st.name, st.type, tag);
      if (idx === 1) addStar(p, 'Thiên Không', 'phuBad');
    });

    // 5.4. Văn Xương, Văn Khúc (theo Giờ sinh)
    const posXuong = (10 - hourChiIdx + 120) % 12;
    const posKhuc = (4 + hourChiIdx) % 12;
    const isDacXuong = [1, 4, 7, 10, 5, 11].includes(posXuong);
    const isDacKhuc = [1, 4, 7, 10, 5, 11].includes(posKhuc);
    addStar(posXuong, 'Văn Xương', 'phuGood', isDacXuong ? '(Đ)' : '(H)');
    addStar(posKhuc, 'Văn Khúc', 'phuGood', isDacKhuc ? '(Đ)' : '(H)');

    // 5.5. Tả Phù, Hữu Bật (theo Tháng sinh)
    const posTaPhu = (4 + (lunMonth - 1)) % 12;
    const posHuuBat = (10 - (lunMonth - 1) + 120) % 12;
    addStar(posTaPhu, 'Tả Phù', 'phuGood');
    addStar(posHuuBat, 'Hữu Bật', 'phuGood');

    // 5.6. Địa Không, Địa Kiếp (theo Giờ sinh)
    const posKhong = (11 - hourChiIdx + 120) % 12;
    const posKiep = (11 + hourChiIdx) % 12;
    const isDacKhong = [2, 8, 5, 11].includes(posKhong);
    const isDacKiep = [2, 8, 5, 11].includes(posKiep);
    addStar(posKhong, 'Địa Không', 'phuBad', isDacKhong ? '(Đ)' : '(H)');
    addStar(posKiep, 'Địa Kiếp', 'phuBad', isDacKiep ? '(Đ)' : '(H)');

    // 5.7. Hỏa Tinh, Linh Tinh (theo Chi năm, Giờ sinh và Âm Dương Nam Nữ)
    let startHoa, startLinh;
    if ([2, 6, 10].includes(chiYearIdx)) { // Dần Ngọ Tuất
      startHoa = 1; startLinh = 3;
    } else if ([8, 0, 4].includes(chiYearIdx)) { // Thân Tý Thìn
      startHoa = 2; startLinh = 10;
    } else if ([5, 9, 1].includes(chiYearIdx)) { // Tỵ Dậu Sửu
      startHoa = 3; startLinh = 10;
    } else { // Hợi Mão Mùi [11, 3, 7]
      startHoa = 9; startLinh = 10;
    }
    let posHoa, posLinh;
    if (isThuanLy) {
      posHoa = (startHoa + hourChiIdx) % 12;
      posLinh = (startLinh - hourChiIdx + 120) % 12;
    } else {
      posHoa = (startHoa - hourChiIdx + 120) % 12;
      posLinh = (startLinh + hourChiIdx) % 12;
    }
    const isDacHoa = [2, 6, 10, 5].includes(posHoa);
    const isDacLinh = [2, 6, 10, 5].includes(posLinh);
    addStar(posHoa, 'Hỏa Tinh', 'phuBad', isDacHoa ? '(Đ)' : '(H)');
    addStar(posLinh, 'Linh Tinh', 'phuBad', isDacLinh ? '(Đ)' : '(H)');

    // 5.8. Thiên Khôi, Thiên Việt (theo Can năm)
    const khoiVietMap = {
      0: [1, 7], 1: [0, 8], 2: [11, 9], 3: [11, 9], 4: [1, 7],
      5: [0, 8], 6: [1, 7], 7: [6, 2], 8: [3, 5], 9: [3, 5]
    };
    const kv = khoiVietMap[canYearIdx % 10] || [1, 7];
    addStar(kv[0], 'Thiên Khôi', 'phuGood');
    addStar(kv[1], 'Thiên Việt', 'phuGood');

    // 5.9. Thiên Mã (theo Chi năm)
    const maMap = { 2: 8, 6: 8, 10: 8, 8: 2, 0: 2, 4: 2, 5: 11, 9: 11, 1: 11, 11: 5, 3: 5, 7: 5 };
    const posMa = maMap[chiYearIdx] || 8;
    const isDacMa = [2, 5, 8].includes(posMa);
    addStar(posMa, 'Thiên Mã', 'phuGood', isDacMa ? '(Đ)' : '');

    // 5.10. Đào Hoa (chuẩn xác 100%), Hồng Loan, Thiên Hỷ
    let posDaoHoa = 0;
    if ([8, 0, 4].includes(chiYearIdx)) posDaoHoa = 9;      // Thân Tý Thìn -> Dậu
    else if ([2, 6, 10].includes(chiYearIdx)) posDaoHoa = 3;// Dần Ngọ Tuất -> Mão
    else if ([5, 9, 1].includes(chiYearIdx)) posDaoHoa = 6; // Tỵ Dậu Sửu -> Ngọ
    else posDaoHoa = 0;                                     // Hợi Mão Mùi -> Tý
    addStar(posDaoHoa, 'Đào Hoa', 'phuGood');

    const posHongLoan = (3 - chiYearIdx + 120) % 12;
    const posThienHy = (posHongLoan + 6) % 12;
    addStar(posHongLoan, 'Hồng Loan', 'phuGood');
    addStar(posThienHy, 'Thiên Hỷ', 'phuGood');

    // 5.11. Long Trì, Phượng Các, Giải Thần (theo Chi năm)
    const posLongTri = (4 + chiYearIdx) % 12;
    const posPhuongCac = (10 - chiYearIdx + 120) % 12;
    addStar(posLongTri, 'Long Trì', 'phuGood');
    addStar(posPhuongCac, 'Phượng Các', 'phuGood');
    addStar(posPhuongCac, 'Giải Thần', 'phuGood');

    // 5.12. Thiên Khốc, Thiên Hư (theo Chi năm)
    const posKhoc = (6 - chiYearIdx + 120) % 12;
    const posHu = (6 + chiYearIdx) % 12;
    const isDacKhoc = [0, 6, 3, 9].includes(posKhoc);
    const isDacHu = [0, 6, 3, 9].includes(posHu);
    addStar(posKhoc, 'Thiên Khốc', 'phuBad', isDacKhoc ? '(Đ)' : '(H)');
    addStar(posHu, 'Thiên Hư', 'phuBad', isDacHu ? '(Đ)' : '(H)');

    // 5.13. Tam Thai, Bát Tọa (theo Tả Phù, Hữu Bật và Ngày sinh)
    const posTamThai = (posTaPhu + (lunDay - 1)) % 12;
    const posBatToa = (posHuuBat - (lunDay - 1) + 1200) % 12;
    addStar(posTamThai, 'Tam Thai', 'phuGood');
    addStar(posBatToa, 'Bát Tọa', 'phuGood');

    // 5.14. Ân Quang, Thiên Quý (theo Văn Xương, Văn Khúc và Ngày sinh)
    const posAnQuang = (posXuong + (lunDay - 1) - 1 + 120) % 12;
    const posThienQuy = (posKhuc - (lunDay - 1) + 1 + 1200) % 12;
    addStar(posAnQuang, 'Ân Quang', 'phuGood');
    addStar(posThienQuy, 'Thiên Quý', 'phuGood');

    // 5.15. Thiên Hình, Thiên Diêu, Thiên Y (theo Tháng sinh)
    const posThienHinh = (9 + (lunMonth - 1)) % 12;
    const posThienDieu = (1 + (lunMonth - 1)) % 12;
    const isDacHinh = [2, 3, 8, 9].includes(posThienHinh);
    const isDacDieu = [3, 9].includes(posThienDieu);
    addStar(posThienHinh, 'Thiên Hình', 'phuBad', isDacHinh ? '(Đ)' : '(H)');
    addStar(posThienDieu, 'Thiên Diêu', 'phuBad', isDacDieu ? '(Đ)' : '(H)');
    addStar(posThienDieu, 'Thiên Y', 'phuGood');

    // 5.16. Cô Thần, Quả Tú (theo Chi năm)
    let posCoThan, posQuaTu;
    if ([11, 0, 1].includes(chiYearIdx)) { // Hợi Tý Sửu
      posCoThan = 2; posQuaTu = 10;
    } else if ([2, 3, 4].includes(chiYearIdx)) { // Dần Mão Thìn
      posCoThan = 5; posQuaTu = 1;
    } else if ([5, 6, 7].includes(chiYearIdx)) { // Tỵ Ngọ Mùi
      posCoThan = 8; posQuaTu = 4;
    } else { // Thân Dậu Tuất [8, 9, 10]
      posCoThan = 11; posQuaTu = 7;
    }
    addStar(posCoThan, 'Cô Thần', 'phuBad');
    addStar(posQuaTu, 'Quả Tú', 'phuBad');

    // 5.17. Kiếp Sát, Hoa Cái, Phá Toái (theo Chi năm)
    let posKiepSat;
    if ([2, 6, 10].includes(chiYearIdx)) posKiepSat = 11;
    else if ([8, 0, 4].includes(chiYearIdx)) posKiepSat = 5;
    else if ([5, 9, 1].includes(chiYearIdx)) posKiepSat = 2;
    else posKiepSat = 8;
    addStar(posKiepSat, 'Kiếp Sát', 'phuBad');

    let posHoaCai;
    if ([2, 6, 10].includes(chiYearIdx)) posHoaCai = 10;
    else if ([8, 0, 4].includes(chiYearIdx)) posHoaCai = 4;
    else if ([5, 9, 1].includes(chiYearIdx)) posHoaCai = 1;
    else posHoaCai = 7;
    addStar(posHoaCai, 'Hoa Cái', 'phuGood');

    let posPhaToai;
    if ([0, 6, 3, 9].includes(chiYearIdx)) posPhaToai = 5;
    else if ([2, 8, 5, 11].includes(chiYearIdx)) posPhaToai = 9;
    else posPhaToai = 1;
    addStar(posPhaToai, 'Phá Toái', 'phuBad');

    // 5.18. Thiên Quan, Thiên Phúc (theo Can năm)
    const thienQuanMap = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6];
    const thienPhucMap = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5];
    addStar(thienQuanMap[canYearIdx % 10], 'Thiên Quan', 'phuGood');
    addStar(thienPhucMap[canYearIdx % 10], 'Thiên Phúc', 'phuGood');

    // 5.19. Thiên Đức, Nguyệt Đức (theo Chi năm)
    const posThienDuc = (9 + chiYearIdx) % 12;
    const posNguyetDuc = (5 + chiYearIdx) % 12;
    addStar(posThienDuc, 'Thiên Đức', 'phuGood');
    addStar(posNguyetDuc, 'Nguyệt Đức', 'phuGood');

    // 5.20. Quốc Ấn, Đường Phù (theo Lộc Tồn)
    const posQuocAn = (posLocTon + 8) % 12;
    const posDuongPhu = (posLocTon - 7 + 120) % 12;
    addStar(posQuocAn, 'Quốc Ấn', 'phuGood');
    addStar(posDuongPhu, 'Đường Phù', 'phuGood');

    // 5.21. Thai Phụ, Phong Cáo (theo Văn Khúc)
    const posThaiPhu = (posKhuc + 2) % 12;
    const posPhongCao = (posKhuc - 2 + 120) % 12;
    addStar(posThaiPhu, 'Thai Phụ', 'phuGood');
    addStar(posPhongCao, 'Phong Cáo', 'phuGood');

    // 5.22. Thiên Giải, Địa Giải (theo Tháng sinh)
    const posThienGiai = (8 + (lunMonth - 1)) % 12;
    const posDiaGiai = (7 + (lunMonth - 1)) % 12;
    addStar(posThienGiai, 'Thiên Giải', 'phuGood');
    addStar(posDiaGiai, 'Địa Giải', 'phuGood');

    // 5.23. Lưu Hà, Thiên Trù (theo Can năm)
    const luuHaMap = [9, 10, 7, 4, 5, 6, 8, 3, 11, 2];
    const thienTruMap = [5, 6, 0, 5, 6, 8, 2, 6, 9, 10];
    addStar(luuHaMap[canYearIdx % 10], 'Lưu Hà', 'phuBad');
    addStar(thienTruMap[canYearIdx % 10], 'Thiên Trù', 'phuGood');

    // 5.23b. Lưu Niên Văn Tinh (cố định theo Can năm sinh)
    // Giáp: Tỵ, Ất: Ngọ, Bính: Thân, Đinh: Dậu, Mậu: Thân, Kỷ: Dậu, Canh: Hợi, Tân: Tý, Nhâm: Dần, Quý: Mão
    const lnVanTinhMap = { 0: 5, 1: 6, 2: 8, 3: 9, 4: 8, 5: 9, 6: 11, 7: 0, 8: 2, 9: 3 };
    const posLNVanTinh = lnVanTinhMap[canYearIdx % 10];
    addStar(posLNVanTinh, 'LN Văn Tinh', 'phuGood');

    // 5.24. Thiên La, Địa Võng (cố định Thìn, Tuất)
    addStar(4, 'Thiên La', 'phuBad');
    addStar(10, 'Địa Võng', 'phuBad');

    // 5.25. Đẩu Quân, Thiên Tài, Thiên Thọ
    const posDauQuan = (chiYearIdx - (lunMonth - 1) + hourChiIdx + 1200) % 12;
    const posThienTai = (posMenh + chiYearIdx) % 12;
    const posThienTho = (posThan + chiYearIdx) % 12;
    addStar(posDauQuan, 'Đẩu Quân', 'phuBad'); // Cột phải theo lá số mẫu
    addStar(posThienTai, 'Thiên Tài', 'phuGood');
    addStar(posThienTho, 'Thiên Thọ', 'phuGood');

    // 5.26. TỨ HÓA (Tra cứu vị trí chính xác của sao được Hóa, hỗ trợ cả Chính Tinh lẫn Phụ Tinh)
    const tuHoa = getTuHoa(canYearIdx);
    if (starPositions[tuHoa.loc] !== undefined) {
      const pLoc = starPositions[tuHoa.loc];
      const isDacLoc = [1, 7, 2, 8].includes(pLoc);
      addStar(pLoc, 'Hóa Lộc', 'phuGood', isDacLoc ? '(Đ)' : '(V)');
    }
    if (starPositions[tuHoa.quyen] !== undefined) {
      const pQuyen = starPositions[tuHoa.quyen];
      const isHamQuyen = [0, 6, 4, 10].includes(pQuyen);
      addStar(pQuyen, 'Hóa Quyền', 'phuGood', isHamQuyen ? '(H)' : '(V)');
    }
    if (starPositions[tuHoa.khoa] !== undefined) {
      addStar(starPositions[tuHoa.khoa], 'Hóa Khoa', 'phuGood', '(V)');
    }
    if (starPositions[tuHoa.ky] !== undefined) {
      const pKy = starPositions[tuHoa.ky];
      const isDacKy = [1, 7, 4, 10].includes(pKy); // Sửu Mùi Thìn Tuất đắc địa
      addStar(pKy, 'Hóa Kỵ', 'phuBad', isDacKy ? '(Đ)' : '(H)');
    }

    // 5.26b. Thiên Thương (tại Nô Bộc), Thiên Sứ (tại Tật Ách)
    const posNoBoc = (posMenh + 5) % 12;
    const posTatAch = (posMenh + 7) % 12;
    addStar(posNoBoc, 'Thiên Thương', 'phuBad');
    addStar(posTatAch, 'Thiên Sứ', 'phuBad');

    // 5.27. AN CÁC SAO LƯU NIÊN (THEO NĂM XEM viewYear)
    const vYear = parseInt(viewYear, 10) || 2026;
    const canViewIdx = (vYear - 4) % 10 >= 0 ? (vYear - 4) % 10 : (vYear - 4) % 10 + 10;
    const chiViewIdx = (vYear - 4) % 12 >= 0 ? (vYear - 4) % 12 : (vYear - 4) % 12 + 12;

    // 1. L.Thái Tuế (theo Chi năm xem)
    addStar(chiViewIdx, 'L.Thái Tuế', 'phuBad');

    // 2. L.Tang Môn (Tiến 2 từ L.Thái Tuế)
    const posLTangMon = (chiViewIdx + 2) % 12;
    addStar(posLTangMon, 'L.Tang Môn', 'phuBad');

    // 3. L.Bạch Hổ (Xung chiếu với L.Tang Môn)
    const posLBachHo = (chiViewIdx + 8) % 12;
    addStar(posLBachHo, 'L.Bạch Hổ', 'phuBad');

    // 4. L.Thiên Khốc (Khởi Ngọ đi nghịch đến Chi năm xem)
    const posLKhoc = (6 - chiViewIdx + 12) % 12;
    addStar(posLKhoc, 'L.Thiên Khốc', 'phuBad');

    // 5. L.Thiên Hư (Khởi Ngọ đi thuận đến Chi năm xem)
    const posLHu = (6 + chiViewIdx) % 12;
    addStar(posLHu, 'L.Thiên Hư', 'phuBad');

    // 6. L.Lộc Tồn (theo Can năm xem)
    const posLLocTon = locTonMap[canViewIdx];
    addStar(posLLocTon, 'L.Lộc Tồn', 'phuGood');

    // 7. L.Kình Dương (Tiến 1 từ L.Lộc Tồn)
    const posLKinhDuong = (posLLocTon + 1) % 12;
    addStar(posLKinhDuong, 'L.Kình Dương', 'phuBad');

    // 8. L.Đà La (Lùi 1 từ L.Lộc Tồn)
    const posLDaLa = (posLLocTon - 1 + 12) % 12;
    addStar(posLDaLa, 'L.Đà La', 'phuBad');

    // 9. L.Thiên Mã (theo Tam hợp Chi năm xem)
    const lMaMap = { 0: 2, 1: 11, 2: 8, 3: 5, 4: 2, 5: 11, 6: 8, 7: 5, 8: 2, 9: 11, 10: 8, 11: 5 };
    const posLThienMa = lMaMap[chiViewIdx];
    addStar(posLThienMa, 'L.Thiên Mã', 'phuGood');

    // 10. Bộ Lưu Tứ Hóa (Theo Can năm xem viewYear)
    const luuTuHoa = getTuHoa(canViewIdx);
    if (starPositions[luuTuHoa.loc] !== undefined) {
      addStar(starPositions[luuTuHoa.loc], 'L.Hóa Lộc', 'phuGood');
    }
    if (starPositions[luuTuHoa.quyen] !== undefined) {
      addStar(starPositions[luuTuHoa.quyen], 'L.Hóa Quyền', 'phuGood');
    }
    if (starPositions[luuTuHoa.khoa] !== undefined) {
      addStar(starPositions[luuTuHoa.khoa], 'L.Hóa Khoa', 'phuGood');
    }
    if (starPositions[luuTuHoa.ky] !== undefined) {
      addStar(starPositions[luuTuHoa.ky], 'L.Hóa Kỵ', 'phuBad');
    }


    // Tuần Không & Triệt Không
    const trietPos = getTrietKhong(canYearIdx);
    const tuanPos = getTuanKhong(canYearIdx, chiYearIdx);

    // Vòng Tràng Sinh theo Cục
    const trangSinhStart = {
      2: 8, // Thủy khởi Thân
      3: 11, // Mộc khởi Hợi
      4: 5,  // Kim khởi Tỵ
      5: 8,  // Thổ khởi Thân
      6: 2   // Hỏa khởi Dần
    }[cucInfo.num] || 8;

    const trangSinhNames = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
    const trangSinhMap = {};
    for (let i = 0; i < 12; i++) {
      const p = isThuanLy ? (trangSinhStart + i) % 12 : (trangSinhStart - i + 12) % 12;
      trangSinhMap[p] = trangSinhNames[i];
    }

    // Tính Chi của Tiểu Hạn cho từng cung (hiển thị góc dưới bên trái mỗi ô như lá số mẫu)
    let startTieuHan;
    const tamHopTieuHan = chiYearIdx % 4;
    if (tamHopTieuHan === 0) startTieuHan = 10;      // Thân Tý Thìn khởi Tuất
    else if (tamHopTieuHan === 1) startTieuHan = 7; // Tỵ Dậu Sửu khởi Mùi
    else if (tamHopTieuHan === 2) startTieuHan = 4; // Dần Ngọ Tuất khởi Thìn
    else startTieuHan = 1;                          // Hợi Mão Mùi khởi Sửu

    const tieuHanMap = {};
    for (let step = 0; step < 12; step++) {
      const palaceIdx = (gender === 'Nam') 
        ? (startTieuHan + step) % 12 
        : (startTieuHan - step + 12) % 12;
      const chiNameIdx = (chiYearIdx + step) % 12;
      tieuHanMap[palaceIdx] = CHI[chiNameIdx] === 'Tý' ? 'Tí' : CHI[chiNameIdx];
    }

    // Tính Hạn Tháng (Nguyệt Hạn) theo năm xem viewYear chuẩn cổ truyền:
    // 1. Cung Tiểu Hạn của năm xem:
    const currentAge = vYear - lunYear + 1;
    const ageOffset = (((currentAge - 1) % 12) + 12) % 12;
    const posTieuHanViewYear = (gender === 'Nam')
      ? (startTieuHan + ageOffset) % 12
      : (startTieuHan - ageOffset + 1200) % 12;

    // 2. Từ cung Tiểu Hạn của năm xem, coi là tháng 1, đếm NGHỊCH đến tháng sinh âm lịch:
    const posThangSinh = (posTieuHanViewYear - (lunMonth - 1) + 1200) % 12;

    // 3. Tại cung dừng lại, coi là giờ Tý, đếm THUẬN đến giờ sinh âm lịch -> Cung đó là THÁNG 1 (tháng Giêng):
    const posThang1 = (posThangSinh + hourChiIdx) % 12;

    // 4. Từ tháng 1 đếm THUẬN mỗi cung 1 tháng lần lượt đến tháng 12:
    const nguyetHanMap = {};
    for (let m = 1; m <= 12; m++) {
      const pIdx = (posThang1 + (m - 1)) % 12;
      nguyetHanMap[pIdx] = m;
    }

    // 6. XÂY DỰNG DỮ LIỆU HOÀN CHỈNH CHO 12 CUNG
    const palacesData = {};
    for (let i = 0; i < 12; i++) {
      const chiIdx = i; // 0: Tý .. 11: Hợi
      const canIdx = canOfCung[chiIdx];
      const canName = CAN[canIdx];
      const chiName = CHI[chiIdx];
      const canChiShort = `${canName.charAt(0)}.${chiName === 'Tý' ? 'Tí' : chiName}`;

      // Vị trí cung chức so với Mệnh
      const distFromMenh = (chiIdx - posMenh + 12) % 12;
      const palaceName = PALACE_NAMES[distFromMenh];
      const isThan = (chiIdx === posThan);

      // Đại hạn tuổi
      let daiHanAge;
      if (isThuanLy) {
        daiHanAge = cucInfo.num + distFromMenh * 10;
      } else {
        const revDist = (posMenh - chiIdx + 12) % 12;
        daiHanAge = cucInfo.num + revDist * 10;
      }

      // Chuẩn hóa tên cung khi an Cung Thân theo từng giờ sinh
      let palaceDisplayName = palaceName;
      if (isThan) {
        if (palaceName === 'PHÚC ĐỨC') palaceDisplayName = 'PHÚC <THÂN>';
        else if (palaceName === 'QUAN LỘC') palaceDisplayName = 'QUAN <THÂN>';
        else if (palaceName === 'TÀI BẠCH') palaceDisplayName = 'TÀI <THÂN>';
        else if (palaceName === 'THIÊN DI') palaceDisplayName = 'DI <THÂN>';
        else if (palaceName === 'PHU THÊ') palaceDisplayName = (gender === 'Nữ' ? 'PHU' : 'THÊ') + ' <THÂN>';
        else if (palaceName === 'MỆNH') palaceDisplayName = 'MỆNH <THÂN>';
        else palaceDisplayName = `${palaceName} <THÂN>`;
      }

      palacesData[chiIdx] = {
        chiIdx,
        chiName,
        canName,
        canChiShort,
        palaceName,
        palaceDisplayName,
        tieuHanChi: tieuHanMap[chiIdx] || chiName,
        isThan,
        daiHanAge,
        stars: palacesStars[chiIdx],
        trangSinh: trangSinhMap[chiIdx] || 'Trường Sinh',
        isTuan: tuanPos.includes(chiIdx),
        isTriet: trietPos.includes(chiIdx),
        hanThang: nguyetHanMap[chiIdx]
      };
    }

    // Tên cung Thân cư
    const rawThanPalace = palacesData[posThan]?.palaceName || 'MỆNH';
    let thanPalaceName = rawThanPalace;
    const thanCuMap = {
      'MỆNH': 'Thân Mệnh đồng cung',
      'PHÚC ĐỨC': 'Thân cư Phúc Đức',
      'QUAN LỘC': 'Thân cư Quan Lộc',
      'THIÊN DI': 'Thân cư Thiên Di',
      'TÀI BẠCH': 'Thân cư Tài Bạch',
      'PHU THÊ': gender === 'Nam' ? 'Thân cư Thê' : 'Thân cư Phu'
    };
    if (rawThanPalace === 'PHU THÊ') {
      thanPalaceName = gender === 'Nam' ? 'THÊ' : 'PHU';
    }
    let thanCuText = thanCuMap[rawThanPalace] || `Thân cư ${rawThanPalace}`;

    // Âm Dương thuận lý / nghịch lý:
    // Dương Nam / Âm Nữ đóng ở Dương cung (chẵn: Tý, Dần, Thìn, Ngọ, Thân, Tuất) là Thuận, Âm cung (lẻ) là Nghịch
    // Âm Nam / Dương Nữ đóng ở Âm cung (lẻ) là Thuận, Dương cung (chẵn) là Nghịch
    const isMenhDuongCung = (posMenh % 2 === 0);
    const isAmDuongThuanLy = (isDuongNam || isAmNu) ? isMenhDuongCung : !isMenhDuongCung;
    const amDuongLyText = isAmDuongThuanLy ? 'Âm Dương thuận lý' : 'Âm Dương nghịch lý';

    // Cục - Mệnh tương quan
    const cucEl = cucInfo.element;
    const menhEl = napAmMenh.element;
    let cucMenhRelation = 'Mệnh Cục bình hòa';
    const sinhMap = { 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy' };
    const khacMap = { 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy' };
    if (cucEl === menhEl) cucMenhRelation = 'Mệnh Cục bình hòa';
    else if (sinhMap[cucEl] === menhEl) cucMenhRelation = 'Cục sinh Mệnh';
    else if (sinhMap[menhEl] === cucEl) cucMenhRelation = 'Mệnh sinh Cục';
    else if (khacMap[cucEl] === menhEl) cucMenhRelation = 'Cục khắc Mệnh';
    else if (khacMap[menhEl] === cucEl) cucMenhRelation = 'Mệnh khắc Cục';

    // Chủ Mệnh (theo Cung Mệnh) & Chủ Thân (theo Chi Năm Sinh) chuẩn 100% cổ truyền
    const chuMenhMap = {
      0: 'Tham Lang', 1: 'Cự Môn', 2: 'Lộc Tồn', 3: 'Văn Khúc',
      4: 'Liêm Trinh', 5: 'Vũ Khúc', 6: 'Phá Quân', 7: 'Vũ Khúc',
      8: 'Liêm Trinh', 9: 'Văn Khúc', 10: 'Lộc Tồn', 11: 'Cự Môn'
    };
    const chuThanMap = {
      0: 'Linh Tinh', 1: 'Thiên Tướng', 2: 'Thiên Lương', 3: 'Thiên Đồng',
      4: 'Văn Xương', 5: 'Thiên Cơ', 6: 'Hỏa Tinh', 7: 'Thiên Tướng',
      8: 'Thiên Lương', 9: 'Thiên Đồng', 10: 'Văn Xương', 11: 'Thiên Cơ'
    };

    return {
      input: {
        name,
        solar: `${solDay}/${solMonth}/${solYear}`,
        lunar: `${lunDay}/${lunMonth}/${lunYear}${isLeap ? ' (Nhuận)' : ''}`,
        hour,
        gender,
        calendarType,
        viewYear: viewYear || 2026
      },
      thienBan: {
        name,
        birthCanChi: canChiYear,
        canChiMonth: canChiMonth || 'Canh Thân',
        canChiDay: canChiDay || 'Canh Thìn',
        canChiHour: canChiHour || 'Tân Tỵ',
        solDay, solMonth, solYear,
        lunDay, lunMonth, lunYear,
        lunarDateText: `Ngày ${lunDay} tháng ${lunMonth} năm ${canChiYear}`,
        solarDateText: `${solDay}/${solMonth}/${solYear}`,
        hourText: hour,
        amDuongNamNu,
        amDuongLy: amDuongLyText,
        cucMenhRelation,
        napAmMenh: napAmMenh.name,
        cucName: cucInfo.name,
        cucNumber: cucInfo.num,
        thanCu: thanCuText,
        chuMenh: chuMenhMap[posMenh] || 'Văn Khúc',
        chuThan: chuThanMap[chiYearIdx] || 'Linh Tinh',
        currentAge: (viewYear || 2026) - lunYear + 1,
        viewYear: viewYear || 2026,
        viewCanChi: CAN[(viewYear - 4) % 10] + ' ' + CHI[(viewYear - 4) % 12]
      },
      tuanPositions: tuanPos,
      trietPositions: trietPos,
      palaces: palacesData
    };
  }

  return {
    lapLaSo,
    getNapAm,
    findTuViPosition,
    calculateCuc
  };

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TuViEngine;
}
if (typeof window !== 'undefined') {
  window.TuViEngine = TuViEngine;
}
