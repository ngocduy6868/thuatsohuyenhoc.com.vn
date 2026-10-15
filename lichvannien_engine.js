/**
 * ENGINE LỊCH VẠN NIÊN & TRA CỨU NGÀY GIỜ HOÀNG ĐẠO
 * Chuẩn thuật toán thiên văn học Việt Nam (Hồ Ngọc Đức & Ngọc Hạp Thông Thư)
 */

(function (window) {
  const PI = Math.PI;

  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const CHI_HOURS = [
    '23:00 - 01:00', '01:00 - 03:00', '03:00 - 05:00', '05:00 - 07:00',
    '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00',
    '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'
  ];

  const TIET_KHI = [
    'Xuân Phân', 'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng',
    'Hạ Chí', 'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ',
    'Thu Phân', 'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết',
    'Đông Chí', 'Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập'
  ];

  const TRUC_12 = [
    { name: 'Kiến', good: 'Xuất hành, đính hôn, nhận chức', bad: 'Động thổ, an táng' },
    { name: 'Trừ', good: 'Tẩy trần, chữa bệnh, giải trừ oan khuất', bad: 'Khai trương, cưới hỏi' },
    { name: 'Mãn', good: 'Cầu tài, khai trương, nhập kho', bad: 'Khởi công, động thổ' },
    { name: 'Bình', good: 'Tu bổ, quét dọn, san nền, xây tường', bad: 'Ký kết, khởi kiện' },
    { name: 'Định', good: 'Ký kết hợp đồng, giao dịch, cưới hỏi', bad: 'Kiện tụng, xuất quân' },
    { name: 'Chấp', good: 'Đặt đá, động thổ, xây đắp, gieo trồng', bad: 'Xuất tiền, dọn nhà' },
    { name: 'Phá', good: 'Dỡ nhà cũ, chữa bệnh, phá bỏ cái cũ', bad: 'Mọi việc đại sự khác' },
    { name: 'Nguy', good: 'Lễ bái, cầu an, cúng tế', bad: 'Đi thuyền, leo cao' },
    { name: 'Thành', good: 'Khai trương, nhập trạch, cưới hỏi, nhập học', bad: 'Kiện tụng, tranh chấp' },
    { name: 'Thâu', good: 'Thu nợ, nhận chức, nhập kho, gặt hái', bad: 'An táng, xuất hành' },
    { name: 'Khai', good: 'Khai trương, động thổ, cưới gả, xuất hành', bad: 'An táng, đào hầm' },
    { name: 'Bế', good: 'Đắp đê, xây tường, lấp vá cống rãnh', bad: 'Chữa bệnh, cưới hỏi' }
  ];

  const SAO_28 = [
    { name: 'Giác Mộc Giao', nature: 'Cát', element: 'Mộc' },
    { name: 'Cang Kim Long', nature: 'Hung', element: 'Kim' },
    { name: 'Đê Thổ Lạc', nature: 'Hung', element: 'Thổ' },
    { name: 'Phòng Nhật Thố', nature: 'Cát', element: 'Nhật' },
    { name: 'Tâm Nguyệt Hồ', nature: 'Hung', element: 'Nguyệt' },
    { name: 'Vĩ Hỏa Hổ', nature: 'Cát', element: 'Hỏa' },
    { name: 'Cơ Thủy Báo', nature: 'Cát', element: 'Thủy' },
    { name: 'Đẩu Mộc Giải', nature: 'Cát', element: 'Mộc' },
    { name: 'Ngưu Kim Ngưu', nature: 'Hung', element: 'Kim' },
    { name: 'Nữ Thổ Bức', nature: 'Hung', element: 'Thổ' },
    { name: 'Hư Nhật Thử', nature: 'Hung', element: 'Nhật' },
    { name: 'Nguy Nguyệt Yến', nature: 'Hung', element: 'Nguyệt' },
    { name: 'Thất Hỏa Trư', nature: 'Cát', element: 'Hỏa' },
    { name: 'Bích Thủy Du', nature: 'Cát', element: 'Thủy' },
    { name: 'Khuê Mộc Lang', nature: 'Hung', element: 'Mộc' },
    { name: 'Lâu Kim Cẩu', nature: 'Cát', element: 'Kim' },
    { name: 'Vị Thổ Trĩ', nature: 'Cát', element: 'Thổ' },
    { name: 'Mão Nhật Kê', nature: 'Hung', element: 'Nhật' },
    { name: 'Tất Nguyệt Ô', nature: 'Cát', element: 'Nguyệt' },
    { name: 'Chủy Hỏa Hầu', nature: 'Hung', element: 'Hỏa' },
    { name: 'Sâm Thủy Viên', nature: 'Cát', element: 'Thủy' },
    { name: 'Tỉnh Mộc Hãn', nature: 'Cát', element: 'Mộc' },
    { name: 'Quỷ Kim Dương', nature: 'Hung', element: 'Kim' },
    { name: 'Liễu Thổ Chướng', nature: 'Hung', element: 'Thổ' },
    { name: 'Tinh Nhật Mã', nature: 'Hung', element: 'Nhật' },
    { name: 'Trương Nguyệt Lộc', nature: 'Cát', element: 'Nguyệt' },
    { name: 'Dực Hỏa Xà', nature: 'Hung', element: 'Hỏa' },
    { name: 'Chẩn Thủy Dẫn', nature: 'Cát', element: 'Thủy' }
  ];

  // 12 Thần Sát Nhật / Hoàng Đạo - Hắc Đạo
  // Thứ tự 12 sao: Thanh Long (HĐ), Minh Đường (HĐ), Thiên Hình (HĐa), Chu Tước (HĐa), Kim Quỹ (HĐ), Thiên Đức/Bảo Quang (HĐ),
  // Bạch Hổ (HĐa), Ngọc Đường (HĐ), Thiên Lao (HĐa), Huyền Vũ (HĐa), Tư Mệnh (HĐ), Câu Trận (HĐa)
  const THAN_SAT_12 = [
    { name: 'Thanh Long', isHoangDao: true, rating: 'Đại Cát' },
    { name: 'Minh Đường', isHoangDao: true, rating: 'Đại Cát' },
    { name: 'Thiên Hình', isHoangDao: false, rating: 'Hắc Đạo (Hung)' },
    { name: 'Chu Tước', isHoangDao: false, rating: 'Hắc Đạo (Hung)' },
    { name: 'Kim Quỹ', isHoangDao: true, rating: 'Đại Cát' },
    { name: 'Thiên Đức', isHoangDao: true, rating: 'Đại Cát' },
    { name: 'Bạch Hổ', isHoangDao: false, rating: 'Hắc Đạo (Đại Hung)' },
    { name: 'Ngọc Đường', isHoangDao: true, rating: 'Đại Cát' },
    { name: 'Thiên Lao', isHoangDao: false, rating: 'Hắc Đạo (Hung)' },
    { name: 'Huyền Vũ', isHoangDao: false, rating: 'Hắc Đạo (Hung)' },
    { name: 'Tư Mệnh', isHoangDao: true, rating: 'Đại Cát' },
    { name: 'Câu Trận', isHoangDao: false, rating: 'Hắc Đạo (Hung)' }
  ];

  // Khởi đầu sao Thanh Long theo từng tháng âm lịch (Tháng 1-12)
  // Tháng 1,7 khởi Tý; Tháng 2,8 khởi Dần; Tháng 3,9 khởi Thìn; Tháng 4,10 khởi Ngọ; Tháng 5,11 khởi Thân; Tháng 6,12 khởi Tuất
  const START_HOANG_DAO_MONTH = [0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10];

  // Khởi đầu sao Thanh Long cho 12 giờ theo Chi của ngày
  // Ngày Dần Thân khởi Tý; Mão Dậu khởi Dần; Thìn Tuất khởi Thìn; Tị Hợi khởi Ngọ; Tý Ngọ khởi Thân; Sửu Mùi khởi Tuất
  const START_HOANG_DAO_HOURS = {
    'Tý': 8, 'Ngọ': 8,
    'Sửu': 10, 'Mùi': 10,
    'Dần': 0, 'Thân': 0,
    'Mão': 2, 'Dậu': 2,
    'Thìn': 4, 'Tuất': 4,
    'Tị': 6, 'Hợi': 6
  };

  // =========================================================================
  // THUẬT TOÁN THIÊN VĂN DƯƠNG LỊCH -> ÂM LỊCH
  // =========================================================================
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
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
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

  function convertSolar2Lunar(dd, mm, yyyy, timeZone = 7) {
    const dayNumber = jdFromDate(dd, mm, yyyy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let lastNm = getNewMoonDay(k + 1, timeZone);
    if (lastNm > dayNumber) {
      lastNm = getNewMoonDay(k, timeZone);
    }
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
    let leap = false;
    let lunarYear = y + 1;
    let leapMonth = 0;
    if (Math.floor((b11 - a11) / 29) > 12) {
      leapMonth = getLeapMonthOffset(a11, timeZone);
      let leapIndex = leapMonth - 1;
      if (diff === leapIndex) {
        leap = true;
      }
      if (diff > leapIndex) {
        diff--;
      }
    }
    let lunarMonth = diff + 11;
    if (lunarMonth > 12) {
      lunarMonth -= 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    const lunarDay = dayNumber - lastNm + 1;
    return {
      day: lunarDay,
      month: lunarMonth,
      year: lunarYear,
      leap,
      jd: dayNumber
    };
  }

  function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap = false, timeZone = 7) {
    let a11;
    if (lunarMonth < 11) {
      a11 = getLunarMonth11(lunarYear - 1, timeZone);
    } else {
      a11 = getLunarMonth11(lunarYear, timeZone);
    }
    let b11 = getLunarMonth11(lunarYear, timeZone);
    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let off = lunarMonth - 11;
    if (off < 0) off += 12;
    if (Math.floor((b11 - a11) / 29) > 12) {
      let leapOff = getLeapMonthOffset(a11, timeZone);
      let leapIndex = leapOff - 1;
      if (lunarLeap) {
        off = leapOff;
      } else if (off >= leapOff) {
        off += 1;
      }
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

  // Can Chi ngày, tháng, năm
  function getCanChiDay(jdn) {
    const canIdx = (jdn + 9) % 10;
    const chiIdx = (jdn + 1) % 12;
    return {
      can: CAN[canIdx],
      chi: CHI[chiIdx],
      canIdx, chiIdx,
      name: `${CAN[canIdx]} ${CHI[chiIdx]}`
    };
  }

  function getCanChiYear(lunarYear) {
    const canIdx = (lunarYear - 4) % 10;
    const chiIdx = (lunarYear - 4) % 12;
    return {
      can: CAN[canIdx],
      chi: CHI[chiIdx],
      name: `${CAN[canIdx]} ${CHI[chiIdx]}`
    };
  }

  function getCanChiMonth(lunarMonth, lunarYear) {
    const canNamIdx = (lunarYear - 4) % 10;
    const canThangStart = ((canNamIdx % 5) * 2 + 2) % 10;
    const canThang = CAN[(canThangStart + lunarMonth - 1) % 10];
    const chiThang = CHI[(lunarMonth + 1) % 12];
    return {
      can: canThang,
      chi: chiThang,
      name: `${canThang} ${chiThang}`
    };
  }

  function getTietKhiByJd(jdn, timeZone = 7) {
    const sunLong = getSunLongitude(jdn, timeZone);
    return TIET_KHI[sunLong] || 'Bạch Lộ';
  }

  // Tra cứu ngày Hoàng Đạo hay Hắc Đạo
  function getHoangDaoOfDay(lunarMonth, chiNgayIdx) {
    const mIdx = (lunarMonth - 1) % 12;
    const startOffset = START_HOANG_DAO_MONTH[mIdx];
    const saoIdx = (chiNgayIdx - startOffset + 12) % 12;
    const sao = THAN_SAT_12[saoIdx];
    return {
      name: `${sao.name} ${sao.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}`,
      isHoangDao: sao.isHoangDao,
      starName: sao.name,
      rating: sao.rating
    };
  }

  // Tra cứu 12 giờ Hoàng Đạo / Hắc Đạo trong ngày
  function get12HoursOfDay(chiNgayName, canNgayIdx) {
    const startHourIdx = START_HOANG_DAO_HOURS[chiNgayName] || 0;
    const canGioStart = (canNgayIdx % 5) * 2; // Ngũ thử độn can

    return CHI.map((chi, idx) => {
      const saoIdx = (idx - startHourIdx + 12) % 12;
      const sao = THAN_SAT_12[saoIdx];
      const can = CAN[(canGioStart + idx) % 10];
      return {
        chi,
        can,
        time: CHI_HOURS[idx],
        fullName: `Giờ ${can} ${chi}`,
        starName: sao.name,
        isHoangDao: sao.isHoangDao,
        nature: sao.isHoangDao ? 'Hoàng Đạo (Cát)' : 'Hắc Đạo (Hung)'
      };
    });
  }

  // 12 Trực
  function getTrucOfDay(lunarMonth, chiNgayIdx) {
    const thangChiIdx = (lunarMonth + 1) % 12; // Tháng 1 ÂL là Dần (index 2)
    const trucIdx = (chiNgayIdx - thangChiIdx + 12) % 12;
    return TRUC_12[trucIdx] || TRUC_12[0];
  }

  // Nhị Thập Bát Tú
  function getNhiThapBatTu(jdn) {
    const starIdx = (jdn + 17) % 28;
    return SAO_28[starIdx] || SAO_28[0];
  }

  // Hướng xuất hành theo Can Ngày
  function getHuongXuatHanh(canNgay) {
    const map = {
      'Giáp': { hy: 'Đông Bắc', tai: 'Đông Nam', hac: 'Đông Bắc' },
      'Ất': { hy: 'Tây Bắc', tai: 'Đông Nam', hac: 'Đông Bắc' },
      'Bính': { hy: 'Tây Nam', tai: 'Chính Đông', hac: 'Chính Đông' },
      'Đinh': { hy: 'Chính Nam', tai: 'Chính Đông', hac: 'Chính Đông' },
      'Mậu': { hy: 'Đông Nam', tai: 'Chính Bắc', hac: 'Chính Bắc' },
      'Kỷ': { hy: 'Đông Bắc', tai: 'Chính Nam', hac: 'Chính Nam' },
      'Canh': { hy: 'Tây Bắc', tai: 'Tây Nam', hac: 'Tây Nam' },
      'Tân': { hy: 'Tây Nam', tai: 'Tây Nam', hac: 'Tây Nam' },
      'Nhâm': { hy: 'Chính Nam', tai: 'Chính Tây', hac: 'Chính Tây' },
      'Quý': { hy: 'Đông Nam', tai: 'Chính Tây', hac: 'Chính Tây' }
    };
    return map[canNgay] || { hy: 'Đông Nam', tai: 'Chính Bắc', hac: 'Tây Bắc' };
  }

  // Tuổi xung khắc trong ngày
  function getTuoiXung(canNgay, chiNgay) {
    const xungChiMap = {
      'Tý': 'Ngọ', 'Sửu': 'Mùi', 'Dần': 'Thân', 'Mão': 'Dậu',
      'Thìn': 'Tuất', 'Tị': 'Hợi', 'Ngọ': 'Tý', 'Mùi': 'Sửu',
      'Thân': 'Dần', 'Dậu': 'Mão', 'Tuất': 'Thìn', 'Hợi': 'Tị'
    };
    const xungChi = xungChiMap[chiNgay] || 'Ngọ';
    return `Các tuổi ${xungChi} (như Bính ${xungChi}, Canh ${xungChi}, Nhâm ${xungChi}) cần cẩn trọng trong ngày.`;
  }

  // TỔNG HỢP TOÀN BỘ THÔNG TIN LỊCH VẠN NIÊN CỦA 1 NGÀY
  function getLichVanNienDayInfo(dd, mm, yyyy) {
    const lunar = convertSolar2Lunar(dd, mm, yyyy);
    const jdn = lunar.jd;
    const canChiDay = getCanChiDay(jdn);
    const canChiYear = getCanChiYear(lunar.year);
    const canChiMonth = getCanChiMonth(lunar.month, lunar.year);
    const tietKhi = getTietKhiByJd(jdn);
    const hoangDaoDay = getHoangDaoOfDay(lunar.month, canChiDay.chiIdx);
    const hours12 = get12HoursOfDay(canChiDay.chi, canChiDay.canIdx);
    const truc = getTrucOfDay(lunar.month, canChiDay.chiIdx);
    const sao28 = getNhiThapBatTu(jdn);
    const huong = getHuongXuatHanh(canChiDay.can);
    const tuoiXung = getTuoiXung(canChiDay.can, canChiDay.chi);

    // Day of week
    const dateObj = new Date(yyyy, mm - 1, dd);
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const thuStr = dayNames[dateObj.getDay()];

    return {
      solar: { day: dd, month: mm, year: yyyy, dayOfWeek: thuStr, isWeekend: (dateObj.getDay() === 0 || dateObj.getDay() === 6) },
      lunar: { day: lunar.day, month: lunar.month, year: lunar.year, isLeap: lunar.leap },
      canChi: {
        day: canChiDay.name,
        month: canChiMonth.name,
        year: canChiYear.name,
        canDay: canChiDay.can,
        chiDay: canChiDay.chi
      },
      tietKhi,
      hoangDaoDay,
      hours12,
      hoangDaoHours: hours12.filter(h => h.isHoangDao),
      hacDaoHours: hours12.filter(h => !h.isHoangDao),
      truc,
      sao28,
      huong,
      tuoiXung
    };
  }

  // TẠO LƯỚI LỊCH THÁNG CHO BÀN LỊCH VẠN NIÊN
  function getMonthCalendarGrid(month, year) {
    const firstDayDate = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Day of week of 1st day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    // We start week on Monday (1): 0 => 6, 1 => 0, 2 => 1, ...
    let startDayIdx = firstDayDate.getDay() === 0 ? 6 : firstDayDate.getDay() - 1;

    const days = [];

    // Empty padding days before day 1
    const prevMonthDays = new Date(year, month - 1, 0).getDate();
    for (let i = startDayIdx - 1; i >= 0; i--) {
      const prevD = prevMonthDays - i;
      const prevM = month === 1 ? 12 : month - 1;
      const prevY = month === 1 ? year - 1 : year;
      const info = getLichVanNienDayInfo(prevD, prevM, prevY);
      days.push({ ...info, isCurrentMonth: false });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const info = getLichVanNienDayInfo(d, month, year);
      days.push({ ...info, isCurrentMonth: true });
    }

    // Trailing padding days to fill 5 or 6 rows (multiples of 7)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 12 ? 1 : month + 1;
      const nextY = month === 12 ? year + 1 : year;
      const info = getLichVanNienDayInfo(d, nextM, nextY);
      days.push({ ...info, isCurrentMonth: false });
    }

    return days;
  }

  // Export engine
  window.LICH_VAN_NIEN_ENGINE = {
    convertSolar2Lunar,
    convertLunar2Solar,
    getCanChiDay,
    getCanChiMonth,
    getCanChiYear,
    getTietKhiByJd,
    getHoangDaoOfDay,
    get12HoursOfDay,
    getTrucOfDay,
    getNhiThapBatTu,
    getHuongXuatHanh,
    getTuoiXung,
    getLichVanNienDayInfo,
    getMonthCalendarGrid
  };

})(window);
