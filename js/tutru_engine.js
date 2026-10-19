/**
 * TUTRU_ENGINE.JS - BỘ CÔNG THỨC LẬP LÁ SỐ TỨ TRỤ (TỬ BÌNH - BÁT TỰ)
 * Chuẩn thuật toán cổ truyền & hệ thống tính toán lyso.vn/lasotutru.php
 * Thiết kế giao diện cắt chuẩn theo sheet "BẢNG XUẤT TỨ TRỤ" (Thiết Kế Trang.xlsx)
 */

(function (window) {
  'use strict';

  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  // Ngũ hành của Can: 0: Mộc, 1: Hỏa, 2: Thổ, 3: Kim, 4: Thủy
  const NGU_HANH_CAN = ['Mộc', 'Mộc', 'Hỏa', 'Hỏa', 'Thổ', 'Thổ', 'Kim', 'Kim', 'Thủy', 'Thủy'];
  const AM_DUONG_CAN = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]; // 0: Dương, 1: Âm
  // Ngũ hành của Chi
  const NGU_HANH_CHI = ['Thủy', 'Thổ', 'Mộc', 'Mộc', 'Thổ', 'Hỏa', 'Hỏa', 'Thổ', 'Kim', 'Kim', 'Thổ', 'Thủy'];

  // Mã màu Ngũ hành chuẩn mỹ thuật Á Đông
  const COLOR_NGU_HANH = {
    'Mộc': '#16A34A', // Xanh lá
    'Hỏa': '#D32F2F', // Đỏ
    'Thổ': '#D97706', // Vàng nâu/đất
    'Kim': '#4B5563', // Xám chì
    'Thủy': '#1D4ED8'  // Xanh dương thẫm
  };

  // 24 Tiết Khí theo kinh độ Mặt Trời (Sun Longitude: 0..23, mỗi cung 15 độ)
  const TIET_KHI_24 = [
    'Xuân Phân', 'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng',
    'Hạ Chí', 'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ',
    'Thu Phân', 'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết',
    'Đông Chí', 'Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập'
  ];

  // Bản đồ kinh độ Mặt Trời sang Chi Tháng Tứ Trụ (Bát Tự hoàn toàn tính theo Tiết lệnh):
  // 21 (Lập Xuân), 22 (Vũ Thủy) -> Dần (Chi 2)
  // 23 (Kinh Trập), 0 (Xuân Phân) -> Mão (Chi 3)
  // 1 (Thanh Minh), 2 (Cốc Vũ) -> Thìn (Chi 4)
  // 3 (Lập Hạ), 4 (Tiểu Mãn) -> Tị (Chi 5)
  // 5 (Mang Chủng), 6 (Hạ Chí) -> Ngọ (Chi 6)
  // 7 (Tiểu Thử), 8 (Đại Thử) -> Mùi (Chi 7)
  // 9 (Lập Thu), 10 (Xử Thử) -> Thân (Chi 8)
  // 11 (Bạch Lộ), 12 (Thu Phân) -> Dậu (Chi 9)
  // 13 (Hàn Lộ), 14 (Sương Giáng) -> Tuất (Chi 10)
  // 15 (Lập Đông), 16 (Tiểu Tuyết) -> Hợi (Chi 11)
  // 17 (Đại Tuyết), 18 (Đông Chí) -> Tý (Chi 0)
  // 19 (Tiểu Hàn), 20 (Đại Hàn) -> Sửu (Chi 1)
  const SUN_TO_CHI = {
    21: 2, 22: 2,
    23: 3, 0: 3,
    1: 4, 2: 4,
    3: 5, 4: 5,
    5: 6, 6: 6,
    7: 7, 8: 7,
    9: 8, 10: 8,
    11: 9, 12: 9,
    13: 10, 14: 10,
    15: 11, 16: 11,
    17: 0, 18: 0,
    19: 1, 20: 1
  };

  // 12 Địa Chi Tàng Can (Chính khí, Trung khí, Dư khí)
  const TANG_CAN = {
    0: [{ can: 'Quý', canIdx: 9, loai: 'Bản khí' }], // Tý
    1: [{ can: 'Kỷ', canIdx: 5, loai: 'Bản khí' }, { can: 'Quý', canIdx: 9, loai: 'Trung khí' }, { can: 'Tân', canIdx: 7, loai: 'Dư khí' }], // Sửu
    2: [{ can: 'Giáp', canIdx: 0, loai: 'Bản khí' }, { can: 'Bính', canIdx: 2, loai: 'Trung khí' }, { can: 'Mậu', canIdx: 4, loai: 'Dư khí' }], // Dần
    3: [{ can: 'Ất', canIdx: 1, loai: 'Bản khí' }], // Mão
    4: [{ can: 'Mậu', canIdx: 4, loai: 'Bản khí' }, { can: 'Ất', canIdx: 1, loai: 'Trung khí' }, { can: 'Quý', canIdx: 9, loai: 'Dư khí' }], // Thìn
    5: [{ can: 'Bính', canIdx: 2, loai: 'Bản khí' }, { can: 'Mậu', canIdx: 4, loai: 'Trung khí' }, { can: 'Canh', canIdx: 6, loai: 'Dư khí' }], // Tị
    6: [{ can: 'Đinh', canIdx: 3, loai: 'Bản khí' }, { can: 'Kỷ', canIdx: 5, loai: 'Trung khí' }], // Ngọ
    7: [{ can: 'Kỷ', canIdx: 5, loai: 'Bản khí' }, { can: 'Đinh', canIdx: 3, loai: 'Trung khí' }, { can: 'Ất', canIdx: 1, loai: 'Dư khí' }], // Mùi
    8: [{ can: 'Canh', canIdx: 6, loai: 'Bản khí' }, { can: 'Nhâm', canIdx: 8, loai: 'Trung khí' }, { can: 'Mậu', canIdx: 4, loai: 'Dư khí' }], // Thân
    9: [{ can: 'Tân', canIdx: 7, loai: 'Bản khí' }], // Dậu
    10: [{ can: 'Mậu', canIdx: 4, loai: 'Bản khí' }, { can: 'Tân', canIdx: 7, loai: 'Trung khí' }, { can: 'Đinh', canIdx: 3, loai: 'Dư khí' }], // Tuất
    11: [{ can: 'Nhâm', canIdx: 8, loai: 'Bản khí' }, { can: 'Giáp', canIdx: 0, loai: 'Trung khí' }] // Hợi
  };

  // 12 Giai đoạn Trường Sinh (Tên đầy đủ và tên viết tắt chuẩn Bát Tự)
  const TRUONG_SINH_FULL = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
  const TRUONG_SINH_SHORT_MAP = {
    'Trường Sinh': 'T.Sinh',
    'Mộc Dục': 'M.Dục',
    'Quan Đới': 'Q.Đới',
    'Lâm Quan': 'L.Quan',
    'Đế Vượng': 'Đ.Vượng',
    'Suy': 'Suy',
    'Bệnh': 'Bệnh',
    'Tử': 'Tử',
    'Mộ': 'Mộ',
    'Tuyệt': 'Tuyệt',
    'Thai': 'Thai',
    'Dưỡng': 'Dưỡng'
  };

  // Điểm khởi Trường Sinh của 10 Thiên Can trên 12 Địa Chi
  const TRUONG_SINH_START = {
    0: { chi: 11, thuan: true },  // Giáp sinh tại Hợi, đi thuận
    1: { chi: 6, thuan: false },  // Ất sinh tại Ngọ, đi nghịch
    2: { chi: 2, thuan: true },   // Bính sinh tại Dần, đi thuận
    3: { chi: 9, thuan: false },  // Đinh sinh tại Dậu, đi nghịch
    4: { chi: 2, thuan: true },   // Mậu sinh tại Dần, đi thuận
    5: { chi: 9, thuan: false },  // Kỷ sinh tại Dậu, đi nghịch
    6: { chi: 5, thuan: true },   // Canh sinh tại Tị, đi thuận
    7: { chi: 0, thuan: false },  // Tân sinh tại Tý, đi nghịch
    8: { chi: 8, thuan: true },   // Nhâm sinh tại Thân, đi thuận
    9: { chi: 3, thuan: false }   // Quý sinh tại Mão, đi nghịch
  };

  /**
   * Tính trạng thái Trường Sinh của Can trên Chi (mặc định trả về viết tắt chuẩn: T.Sinh, M.Dục, Q.Đới, L.Quan, Đ.Vượng...)
   */
  function layTrangThaiTruongSinh(canIdx, chiIdx, isShort = true) {
    const config = TRUONG_SINH_START[canIdx];
    if (!config) return isShort ? 'Suy' : 'Suy';
    let step = 0;
    if (config.thuan) {
      step = (chiIdx - config.chi + 12) % 12;
    } else {
      step = (config.chi - chiIdx + 12) % 12;
    }
    const full = TRUONG_SINH_FULL[step] || 'Suy';
    return isShort ? (TRUONG_SINH_SHORT_MAP[full] || full) : full;
  }

  /**
   * Tính Thập Thần của Target Can so với Nhật Can (Day Master)
   */
  function layThapThan(targetCanIdx, nhatCanIdx, isNhatTru = false) {
    if (isNhatTru && targetCanIdx === nhatCanIdx) return 'THÂN'; // Bản thân Nhật Chủ

    const targetHanh = Math.floor(targetCanIdx / 2);
    const nhatHanh = Math.floor(nhatCanIdx / 2);

    const targetAmDuong = targetCanIdx % 2; // 0: Dương, 1: Âm
    const nhatAmDuong = nhatCanIdx % 2;
    const cungDau = (targetAmDuong === nhatAmDuong);

    // Cùng hành (Tỷ, Kiếp)
    if (targetHanh === nhatHanh) {
      return cungDau ? 'TỶ' : 'KIẾP';
    }

    // Sinh Nhật Can (Ấn, Kiêu) -> Mẹ sinh con
    if ((targetHanh + 1) % 5 === nhatHanh) {
      return cungDau ? 'KIÊU' : 'ẤN';
    }

    // Khắc Nhật Can (Quan, Sát)
    if ((targetHanh + 2) % 5 === nhatHanh) {
      return cungDau ? 'SÁT' : 'QUAN';
    }

    // Nhật Can khắc Target (Tài, T.Tài)
    if ((nhatHanh + 2) % 5 === targetHanh) {
      return cungDau ? 'T.TÀI' : 'TÀI';
    }

    // Nhật Can sinh Target (Thực, Thương)
    if ((nhatHanh + 1) % 5 === targetHanh) {
      return cungDau ? 'THỰC' : 'THƯƠNG';
    }

    return 'TỶ';
  }

  /**
   * Tính Julian Day Number từ ngày/tháng/năm Dương lịch
   */
  function jdFromDate(d, m, y) {
    const a = Math.floor((14 - m) / 12);
    const y1 = y + 4800 - a;
    const m1 = m + 12 * a - 3;
    return d + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
  }

  /**
   * Tính kinh độ Mặt Trời chuẩn thiên văn học (0..23, mỗi cung 15 độ tương ứng 24 Tiết Khí)
   */
  function tinhKinhDoMatTroi(jdn, timeZone = 7) {
    const PI = Math.PI;
    const T = (jdn - 2451545.0 + 0.5 - timeZone / 24.0) / 36525.0;
    const dr = PI / 180;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;
    let C = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * dr);
    C += (0.019993 - 0.000101 * T) * Math.sin(2 * M * dr) + 0.000290 * Math.sin(3 * M * dr);
    let thetaDeg = (L0 + C) % 360;
    if (thetaDeg < 0) thetaDeg += 360;
    return Math.floor(thetaDeg / 15); // Đúng 24 mốc Tiết Khí, mỗi mốc 15 độ
  }

  /**
   * Xác định Tiết Khí và Trụ Tháng theo Tiết Lệnh của ngày/tháng/năm Dương lịch
   */
  function layThongTinTietKhiVaThang(d, m, y) {
    const jdCurrent = jdFromDate(d, m, y);
    const sunLong = tinhKinhDoMatTroi(jdCurrent, 7);
    const tietHienTai = TIET_KHI_24[sunLong] || 'Lập Xuân';
    const chiThangIdx = SUN_TO_CHI[sunLong] !== undefined ? SUN_TO_CHI[sunLong] : 2;

    // Tìm khoảng cách tới Tiết Lệnh kế tiếp (ranh giới sang Chi tháng sau, quét tới tối đa 35 ngày)
    let distNext = 15;
    for (let step = 1; step <= 35; step++) {
      const s = tinhKinhDoMatTroi(jdCurrent + step, 7);
      if (SUN_TO_CHI[s] !== undefined && SUN_TO_CHI[s] !== chiThangIdx) {
        distNext = step;
        break;
      }
    }

    // Tìm khoảng cách lùi về Tiết Lệnh của tháng hiện tại (ranh giới lùi sang Chi tháng trước)
    let distPrev = 15;
    for (let step = 1; step <= 35; step++) {
      const s = tinhKinhDoMatTroi(jdCurrent - step, 7);
      if (SUN_TO_CHI[s] !== undefined && SUN_TO_CHI[s] !== chiThangIdx) {
        distPrev = Math.max(1, step - 1);
        break;
      }
    }

    // Trụ Năm: Bắt đầu từ mốc Lập Xuân (sunLong 21).
    // Trong năm dương lịch y, từ ngày 1/1 đến trước Lập Xuân (thường 4/2, sunLong 19 hoặc 20):
    // Vẫn thuộc năm Bát Tự trước đó (y - 1).
    let namBatTu = y;
    if (m === 1 || (m === 2 && sunLong < 21)) {
      namBatTu = y - 1;
    }

    return {
      sunLong,
      tietHienTai,
      chiThangIdx,
      chiThangName: CHI[chiThangIdx],
      namBatTu,
      distNext,
      distPrev
    };
  }

  /**
   * Tra cứu Thần Sát của từng Trụ trong Tứ Trụ
   * Tham số:
   *  - canTruIdx: Thiên Can của trụ đang xét
   *  - chiTruIdx: Địa Chi của trụ đang xét
   *  - canNgayIdx: Can Ngày (Nhật Chủ)
   *  - chiNgayIdx: Chi Ngày
   *  - canNamIdx: Can Năm
   *  - chiNamIdx: Chi Năm
   *  - chiThangIdx: Chi Tháng (Nguyệt Lệnh)
   */
  function layThanSat(canTruIdx, chiTruIdx, canNgayIdx, chiNgayIdx, canNamIdx, chiNamIdx, chiThangIdx) {
    const list = [];
    const added = new Set();
    function addStar(name) {
      if (name && !added.has(name)) {
        added.add(name);
        list.push(name);
      }
    }

    // 1. Nguyệt Đức (theo Nguyệt Lệnh & Tam hợp hóa cục)
    const nguyetDucCan = {
      8: 8, 0: 8, 4: 8,   // Thân Tý Thìn -> Nhâm
      2: 2, 6: 2, 10: 2,  // Dần Ngọ Tuất -> Bính
      11: 0, 3: 0, 7: 0,  // Hợi Mão Mùi -> Giáp
      5: 6, 9: 6, 1: 6    // Tị Dậu Sửu -> Canh
    };
    if (nguyetDucCan[chiThangIdx] === canTruIdx) {
      addStar('Nguyệt Đức');
    }

    // 2. Nguyệt Đức Hợp (Can hợp với Can Nguyệt Đức)
    const nguyetDucHopCan = {
      8: 3, 0: 3, 4: 3,   // Nhâm hợp Đinh
      2: 7, 6: 7, 10: 7,  // Bính hợp Tân
      11: 5, 3: 5, 7: 5,  // Giáp hợp Kỷ
      5: 1, 9: 1, 1: 1    // Canh hợp Ất
    };
    if (nguyetDucHopCan[chiThangIdx] === canTruIdx) {
      addStar('Nguyệt Đức Hợp');
    }

    // 3. Đức Quý Nhân (Theo Thiệu Vĩ Hoa & Lý Số Bát Tự)
    const ducQuyNhanMap = {
      2: [2, 3], 6: [2, 3], 10: [2, 3],                   // Dần Ngọ Tuất: Bính, Đinh
      8: [8, 9, 4, 5], 0: [8, 9, 4, 5], 4: [8, 9, 4, 5], // Thân Tý Thìn: Nhâm, Quý, Mậu, Kỷ
      5: [6, 7], 9: [6, 7], 1: [6, 7],                   // Tị Dậu Sửu: Canh, Tân
      11: [0, 1], 3: [0, 1], 7: [0, 1]                   // Hợi Mão Mùi: Giáp, Ất
    };
    if (ducQuyNhanMap[chiThangIdx] && ducQuyNhanMap[chiThangIdx].includes(canTruIdx)) {
      addStar('Đức Quý Nhân');
    }

    // 4. Tú Quý Nhân (Theo Thiệu Vĩ Hoa & Lý Số Bát Tự)
    const tuQuyNhanMap = {
      2: [4, 9], 6: [4, 9], 10: [4, 9],                   // Dần Ngọ Tuất: Mậu, Quý
      8: [2, 7, 0, 5], 0: [2, 7, 0, 5], 4: [2, 7, 0, 5], // Thân Tý Thìn: Bính, Tân, Giáp, Kỷ
      5: [1, 6], 9: [1, 6], 1: [1, 6],                   // Tị Dậu Sửu: Ất, Canh
      11: [3, 8], 3: [3, 8], 7: [3, 8]                   // Hợi Mão Mùi: Đinh, Nhâm
    };
    if (tuQuyNhanMap[chiThangIdx] && tuQuyNhanMap[chiThangIdx].includes(canTruIdx)) {
      addStar('Tú Quý Nhân');
    }

    // 5. Thái Cực Quý Nhân (Thái Cực)
    const thaiCucMap = {
      0: [0, 6], 1: [0, 6],                    // Giáp, Ất: Tý, Ngọ
      2: [3, 9], 3: [3, 9],                    // Bính, Đinh: Mão, Dậu
      4: [4, 10, 1, 7], 5: [4, 10, 1, 7],      // Mậu, Kỷ: Thìn, Tuất, Sửu, Mùi
      6: [2, 11], 7: [2, 11],                  // Canh, Tân: Dần, Hợi
      8: [5, 8], 9: [5, 8]                     // Nhâm, Quý: Tị, Thân
    };
    if ((thaiCucMap[canNgayIdx] && thaiCucMap[canNgayIdx].includes(chiTruIdx)) ||
        (thaiCucMap[canNamIdx] && thaiCucMap[canNamIdx].includes(chiTruIdx))) {
      addStar('Thái Cực');
    }

    // 6. Phúc Tinh Quý Nhân (Phúc Tinh)
    const phucTinhMap = {
      0: [2, 0], 2: [2, 0], // Giáp, Bính: Dần, Tý
      1: [3, 1], 9: [3, 1], // Ất, Quý: Mão, Sửu
      4: [8],               // Mậu: Thân
      5: [7],               // Kỷ: Mùi
      3: [11],              // Đinh: Hợi
      6: [6],               // Canh: Ngọ
      7: [5],               // Tân: Tị
      8: [4]                // Nhâm: Thìn
    };
    if ((phucTinhMap[canNgayIdx] && phucTinhMap[canNgayIdx].includes(chiTruIdx)) ||
        (phucTinhMap[canNamIdx] && phucTinhMap[canNamIdx].includes(chiTruIdx))) {
      addStar('Phúc Tinh');
    }

    // 7. Thiên Y (chi trước Chi Tháng hoặc Chi Ngày)
    if ((chiThangIdx + 11) % 12 === chiTruIdx || (chiNgayIdx + 11) % 12 === chiTruIdx) {
      addStar('Thiên Y');
    }

    // 8. Tướng Tinh
    const tuongTinhMap = {
      8: 0, 0: 0, 4: 0,    // Thân Tý Thìn: Tý
      2: 6, 6: 6, 10: 6,   // Dần Ngọ Tuất: Ngọ
      5: 9, 9: 9, 1: 9,    // Tị Dậu Sửu: Dậu
      11: 3, 3: 3, 7: 3    // Hợi Mão Mùi: Mão
    };
    if (tuongTinhMap[chiNamIdx] === chiTruIdx || tuongTinhMap[chiNgayIdx] === chiTruIdx) {
      addStar('Tướng Tinh');
    }

    // 9. Đào Hoa (Hàm Trì)
    const daoHoaMap = {
      8: 9, 0: 9, 4: 9,    // Thân Tý Thìn: Dậu
      2: 3, 6: 3, 10: 3,   // Dần Ngọ Tuất: Mão
      5: 6, 9: 6, 1: 6,    // Tị Dậu Sửu: Ngọ
      11: 0, 3: 0, 7: 0    // Hợi Mão Mùi: Tý
    };
    if (daoHoaMap[chiNamIdx] === chiTruIdx || daoHoaMap[chiNgayIdx] === chiTruIdx) {
      addStar('Đào Hoa');
    }

    // 10. Không Vong (Tuần Không của Trụ Ngày và Trụ Năm)
    const tkNgayStart = (chiNgayIdx - (canNgayIdx % 10) + 12) % 12;
    const kvNgay1 = (tkNgayStart + 10) % 12;
    const kvNgay2 = (tkNgayStart + 11) % 12;
    if (chiTruIdx === kvNgay1 || chiTruIdx === kvNgay2) {
      addStar('Không Vong');
    }

    // 11. Thiên Ất Quý Nhân (Thiên Ất)
    const thienAtMap = {
      0: [1, 7], 4: [1, 7], 6: [1, 7], // Giáp Mậu Canh: Sửu Mùi
      1: [0, 8], 5: [0, 8],             // Ất Kỷ: Tý Thân
      2: [11, 9], 3: [11, 9],           // Bính Đinh: Hợi Dậu
      8: [5, 3], 9: [5, 3],             // Nhâm Quý: Tị Mão
      7: [6, 2]                         // Tân: Ngọ Dần
    };
    if ((thienAtMap[canNgayIdx] && thienAtMap[canNgayIdx].includes(chiTruIdx)) ||
        (thienAtMap[canNamIdx] && thienAtMap[canNamIdx].includes(chiTruIdx))) {
      addStar('Thiên Ất');
    }

    // 12. Thiên Đức
    const thienDucMap = {
      2: { type: 'can', val: 3 },  // Dần -> Đinh
      3: { type: 'chi', val: 8 },  // Mão -> Thân
      4: { type: 'can', val: 8 },  // Thìn -> Nhâm
      5: { type: 'can', val: 7 },  // Tị -> Tân
      6: { type: 'chi', val: 11 }, // Ngọ -> Hợi
      7: { type: 'can', val: 0 },  // Mùi -> Giáp
      8: { type: 'can', val: 9 },  // Thân -> Quý
      9: { type: 'chi', val: 2 },  // Dậu -> Dần
      10: { type: 'can', val: 2 }, // Tuất -> Bính
      11: { type: 'can', val: 1 }, // Hợi -> Ất
      0: { type: 'chi', val: 5 },  // Tý -> Tị
      1: { type: 'can', val: 6 }   // Sửu -> Canh
    };
    const td = thienDucMap[chiThangIdx];
    if (td) {
      if (td.type === 'can' && td.val === canTruIdx) addStar('Thiên Đức');
      if (td.type === 'chi' && td.val === chiTruIdx) addStar('Thiên Đức');
    }

    // 13. Dịch Mã
    const dichMaMap = {
      8: 2, 0: 2, 4: 2,    // Thân Tý Thìn: Dần
      2: 8, 6: 8, 10: 8,   // Dần Ngọ Tuất: Thân
      5: 11, 9: 11, 1: 11, // Tị Dậu Sửu: Hợi
      11: 5, 3: 5, 7: 5    // Hợi Mão Mùi: Tị
    };
    if (dichMaMap[chiNamIdx] === chiTruIdx || dichMaMap[chiNgayIdx] === chiTruIdx) {
      addStar('Dịch Mã');
    }

    // 14. Hoa Cái
    const hoaCaiMap = {
      8: 4, 0: 4, 4: 4,    // Thân Tý Thìn: Thìn
      2: 10, 6: 10, 10: 10,// Dần Ngọ Tuất: Tuất
      5: 1, 9: 1, 1: 1,    // Tị Dậu Sửu: Sửu
      11: 7, 3: 7, 7: 7    // Hợi Mão Mùi: Mùi
    };
    if (hoaCaiMap[chiNamIdx] === chiTruIdx || hoaCaiMap[chiNgayIdx] === chiTruIdx) {
      addStar('Hoa Cái');
    }

    // 15. Văn Xương
    const vanXuongMap = {
      0: 5, 1: 6, 2: 8, 3: 9, 4: 8, 5: 9, 6: 11, 7: 0, 8: 2, 9: 3
    };
    if (vanXuongMap[canNgayIdx] === chiTruIdx || vanXuongMap[canNamIdx] === chiTruIdx) {
      addStar('Văn Xương');
    }

    // 16. Kiến Lộc (Lộc Thần)
    const locMap = { 0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0 };
    if (locMap[canNgayIdx] === chiTruIdx) {
      addStar('Kiến Lộc');
    }

    // 17. Kình Dương
    const kinhDuongMap = { 0: 3, 1: 4, 2: 6, 3: 7, 4: 6, 5: 7, 6: 9, 7: 10, 8: 0, 9: 1 };
    if (kinhDuongMap[canNgayIdx] === chiTruIdx) {
      addStar('Kình Dương');
    }

    // 18. Kiếp Sát
    const kiepSatMap = {
      8: 5, 0: 5, 4: 5,    // Thân Tý Thìn: Tị
      2: 11, 6: 11, 10: 11,// Dần Ngọ Tuất: Hợi
      5: 2, 9: 2, 1: 2,    // Tị Dậu Sửu: Dần
      11: 8, 3: 8, 7: 8    // Hợi Mão Mùi: Thân
    };
    if (kiepSatMap[chiNamIdx] === chiTruIdx || kiepSatMap[chiNgayIdx] === chiTruIdx) {
      addStar('Kiếp Sát');
    }

    // 19. Tai Sát
    const taiSatMap = {
      8: 6, 0: 6, 4: 6,    // Thân Tý Thìn: Ngọ
      2: 0, 6: 0, 10: 0,   // Dần Ngọ Tuất: Tý
      5: 3, 9: 3, 1: 3,    // Tị Dậu Sửu: Mão
      11: 9, 3: 9, 7: 9    // Hợi Mão Mùi: Dậu
    };
    if (taiSatMap[chiNamIdx] === chiTruIdx || taiSatMap[chiNgayIdx] === chiTruIdx) {
      addStar('Tai Sát');
    }

    // 20. Vong Thần
    const vongThanMap = {
      8: 11, 0: 11, 4: 11, // Thân Tý Thìn: Hợi
      2: 5, 6: 5, 10: 5,   // Dần Ngọ Tuất: Tị
      5: 8, 9: 8, 1: 8,    // Tị Dậu Sửu: Thân
      11: 2, 3: 2, 7: 2    // Hợi Mão Mùi: Dần
    };
    if (vongThanMap[chiNamIdx] === chiTruIdx || vongThanMap[chiNgayIdx] === chiTruIdx) {
      addStar('Vong Thần');
    }

    // 21. Cô Thần & Quả Tú (theo Chi Năm)
    const coThanMap = {
      11: 2, 0: 2, 1: 2,   // Hợi Tý Sửu -> Dần
      2: 5, 3: 5, 4: 5,    // Dần Mão Thìn -> Tị
      5: 8, 6: 8, 7: 8,    // Tị Ngọ Mùi -> Thân
      8: 11, 9: 11, 10: 11 // Thân Dậu Tuất -> Hợi
    };
    const quaTuMap = {
      11: 10, 0: 10, 1: 10,// Hợi Tý Sửu -> Tuất
      2: 1, 3: 1, 4: 1,    // Dần Mão Thìn -> Sửu
      5: 4, 6: 4, 7: 4,    // Tị Ngọ Mùi -> Thìn
      8: 7, 9: 7, 10: 7    // Thân Dậu Tuất -> Mùi
    };
    if (coThanMap[chiNamIdx] === chiTruIdx) addStar('Cô Thần');
    if (quaTuMap[chiNamIdx] === chiTruIdx) addStar('Quả Tú');

    // 22. Kim Dư
    const kimDuMap = { 0: 4, 1: 5, 2: 7, 3: 8, 4: 7, 5: 8, 6: 10, 7: 11, 8: 1, 9: 2 };
    if (kimDuMap[canNgayIdx] === chiTruIdx) addStar('Kim Dư');

    // 23. Quốc Ấn
    const quocAnMap = { 0: 10, 1: 11, 2: 1, 3: 2, 4: 1, 5: 2, 6: 4, 7: 5, 8: 7, 9: 8 };
    if (quocAnMap[canNgayIdx] === chiTruIdx) addStar('Quốc Ấn');

    // 24. Hồng Loan & Thiên Hỷ (theo Chi Năm)
    const hongLoanMap = {
      0: 3, 1: 2, 2: 1, 3: 0, 4: 11, 5: 10,
      6: 9, 7: 8, 8: 7, 9: 6, 10: 5, 11: 4
    };
    if (hongLoanMap[chiNamIdx] === chiTruIdx) addStar('Hồng Loan');
    if (hongLoanMap[chiNamIdx] !== undefined && ((hongLoanMap[chiNamIdx] + 6) % 12) === chiTruIdx) {
      addStar('Thiên Hỷ');
    }

    // 25. Thiên Quan (Thiên Quan Quý Nhân)
    // Tra theo Can Ngày hoặc Can Năm
    const thienQuanMap = {
      0: [7],          // Giáp: Mùi
      1: [4, 7],       // Ất: Thìn, Mùi
      2: [4, 5],       // Bính: Thìn, Tị
      3: [2],          // Đinh: Dần
      4: [3],          // Mậu: Mão
      5: [9, 10],      // Kỷ: Dậu, Tuất
      6: [11],         // Canh: Hợi
      7: [8, 9],       // Tân: Thân, Dậu
      8: [8, 10],      // Nhâm: Thân, Tuất
      9: [6]           // Quý: Ngọ
    };
    if ((thienQuanMap[canNgayIdx] && thienQuanMap[canNgayIdx].includes(chiTruIdx)) ||
        (thienQuanMap[canNamIdx] && thienQuanMap[canNamIdx].includes(chiTruIdx))) {
      addStar('Thiên Quan');
    }

    // 26. Thập Ác (Thập Ác Đại Bại) - 10 ngày/trụ
    const thapAcList = [
      [0, 4], [1, 5], [2, 8], [3, 11], [4, 10],
      [5, 1], [6, 4], [7, 5], [8, 8], [9, 11]
    ];
    if (thapAcList.some(([c, ch]) => c === canTruIdx && ch === chiTruIdx)) {
      addStar('Thập Ác');
    }

    // 27. Khôi Cương (Khôi Canh) - 4 trụ: Canh Thìn, Canh Tuất, Mậu Tuất, Nhâm Thìn
    const khoiCuongList = [[6, 4], [6, 10], [4, 10], [8, 4]];
    if (khoiCuongList.some(([c, ch]) => c === canTruIdx && ch === chiTruIdx)) {
      addStar('Khôi Cương');
    }

    // 28. Âm Dương Sai Thố (12 ngày/trụ)
    const amDuongSaiThoList = [
      [2, 0], [3, 1], [4, 2], [7, 3], [8, 4], [9, 5],
      [2, 6], [3, 7], [4, 8], [7, 9], [8, 10], [9, 11]
    ];
    if (amDuongSaiThoList.some(([c, ch]) => c === canTruIdx && ch === chiTruIdx)) {
      addStar('Âm Dương Sai Thố');
    }

    // 29. Thiên Xá (theo mùa sinh và Can Chi ngày)
    const thienXaCheck = (canTruIdx === canNgayIdx && chiTruIdx === chiNgayIdx) && (
      ([2, 3, 4].includes(chiThangIdx) && canNgayIdx === 4 && chiNgayIdx === 2) || // Xuân: Mậu Dần
      ([5, 6, 7].includes(chiThangIdx) && canNgayIdx === 0 && chiNgayIdx === 6) || // Hạ: Giáp Ngọ
      ([8, 9, 10].includes(chiThangIdx) && canNgayIdx === 4 && chiNgayIdx === 8) ||// Thu: Mậu Thân
      ([11, 0, 1].includes(chiThangIdx) && canNgayIdx === 0 && chiNgayIdx === 0)   // Đông: Giáp Tý
    );
    if (thienXaCheck) {
      addStar('Thiên Xá');
    }

    // 30. Học Đường (Trường Sinh của Can Ngày / Can Năm)
    const hocDuongMap = { 0: 11, 1: 6, 2: 2, 3: 9, 4: 2, 5: 9, 6: 5, 7: 0, 8: 8, 9: 3 };
    if (hocDuongMap[canNgayIdx] === chiTruIdx || hocDuongMap[canNamIdx] === chiTruIdx) {
      addStar('Học Đường');
    }

    // 31. Từ Quán (Lâm Quan của Can Ngày / Can Năm)
    const tuQuanMap = { 0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0 };
    if (tuQuanMap[canNgayIdx] === chiTruIdx || tuQuanMap[canNamIdx] === chiTruIdx) {
      addStar('Từ Quán');
    }

    // 32. Thiên La & Địa Võng
    if (chiTruIdx === 10 || chiTruIdx === 11) {
      addStar('Thiên La');
    }
    if (chiTruIdx === 4 || chiTruIdx === 5) {
      addStar('Địa Võng');
    }

    // 33. Tang Môn & Điếu Khách
    if ((chiNamIdx + 2) % 12 === chiTruIdx) {
      addStar('Tang Môn');
    }
    if ((chiNamIdx + 10) % 12 === chiTruIdx) {
      addStar('Điếu Khách');
    }

    // 34. Bạch Hổ & Quan Phù
    if ((chiNamIdx + 8) % 12 === chiTruIdx) {
      addStar('Bạch Hổ');
    }
    if ((chiNamIdx + 4) % 12 === chiTruIdx) {
      addStar('Quan Phù');
    }

    // 35. Câu Sát & Giảo Sát
    const isDuongNamAmNu = (canNamIdx % 2 === 0);
    const couChi = isDuongNamAmNu ? (chiNamIdx + 3) % 12 : (chiNamIdx + 9) % 12;
    const giaoChi = isDuongNamAmNu ? (chiNamIdx + 9) % 12 : (chiNamIdx + 3) % 12;
    if (chiTruIdx === couChi) {
      addStar('Câu Sát');
    }
    if (chiTruIdx === giaoChi) {
      addStar('Giảo Sát');
    }

    // 36. Thiên Đức Hợp
    const thienDucHopMap = {
      2: { type: 'can', val: 8 },  // Đinh hợp Nhâm
      3: { type: 'chi', val: 5 },  // Thân hợp Tị
      4: { type: 'can', val: 3 },  // Nhâm hợp Đinh
      5: { type: 'can', val: 2 },  // Tân hợp Bính
      6: { type: 'chi', val: 2 },  // Hợi hợp Dần
      7: { type: 'can', val: 5 },  // Giáp hợp Kỷ
      8: { type: 'can', val: 4 },  // Quý hợp Mậu
      9: { type: 'chi', val: 11 }, // Dần hợp Hợi
      10: { type: 'can', val: 7 }, // Bính hợp Tân
      11: { type: 'can', val: 6 }, // Hợi -> Ất hợp Canh
      0: { type: 'chi', val: 8 },  // Tý -> Tị hợp Thân
      1: { type: 'can', val: 1 }   // Canh hợp Ất
    };
    const tdh = thienDucHopMap[chiThangIdx];
    if (tdh) {
      if (tdh.type === 'can' && tdh.val === canTruIdx) addStar('Thiên Đức Hợp');
      if (tdh.type === 'chi' && tdh.val === chiTruIdx) addStar('Thiên Đức Hợp');
    }

    return list;
  }

  /**
   * HÀM CHÍNH: LẬP LÁ SỐ TỨ TRỤ
   */
  function lapLaSoTuTru(params) {
    const hoTen = (params.hoTen || 'Nguyễn Văn A').trim();
    const gioiTinh = (params.gioiTinh !== undefined && params.gioiTinh !== null) ? parseInt(params.gioiTinh, 10) : 1; // 1: Nam, 0: Nữ
    const loaiLich = (params.loaiLich !== undefined && params.loaiLich !== null) ? parseInt(params.loaiLich, 10) : 1; // 1: Dương, 0: Âm
    let d = parseInt(params.ngay, 10) || 16;
    let m = parseInt(params.thang, 10) || 6;
    let y = parseInt(params.nam, 10) || 1976;
    const gio = (params.gio !== undefined && params.gio !== null && params.gio !== '') ? parseInt(params.gio, 10) : 12;
    const phut = (params.phut !== undefined && params.phut !== null && params.phut !== '') ? parseInt(params.phut, 10) : 30;
    const namXem = parseInt(params.namXem, 10) || new Date().getFullYear();

    const engineLich = window.LICH_VAN_NIEN_ENGINE || window.LICH_VAN_NIEN;
    let ngayNhapAlStr = '';

    // Nếu người dùng chọn Âm lịch, chuyển đổi chuẩn xác sang Dương lịch
    if (loaiLich === 0) {
      ngayNhapAlStr = `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
      if (engineLich && typeof engineLich.convertLunar2Solar === 'function') {
        const sol = engineLich.convertLunar2Solar(d, m, y, false);
        d = sol.day;
        m = sol.month;
        y = sol.year;
      }
    }

    // 1. TRỤ NĂM & TRỤ THÁNG (HOÀN TOÀN TÍNH THEO TIẾT LỆNH THIÊN VĂN BÁT TỰ)
    const tkInfo = layThongTinTietKhiVaThang(d, m, y);
    const namBatTu = tkInfo.namBatTu;
    const canNamIdx = (namBatTu - 4 + 120) % 10;
    const chiNamIdx = (namBatTu - 4 + 120) % 12;
    const canNam = CAN[canNamIdx];
    const chiNam = CHI[chiNamIdx];

    // 2. TRỤ THÁNG (Tính theo Tiết Lệnh và Ngũ Hổ Độn từ Can Năm Bát Tự)
    const chiThangIdx = tkInfo.chiThangIdx;
    const chiThang = CHI[chiThangIdx];

    // Ngũ Hổ Độn: Tìm Can của tháng Dần
    // Năm Giáp Kỷ khởi Bính Dần (2); Ất Canh khởi Mậu Dần (4); Bính Tân khởi Canh Dần (6); Đinh Nhâm khởi Nhâm Dần (8); Mậu Quý khởi Giáp Dần (0)
    const canDanStart = ((canNamIdx % 5) * 2 + 2) % 10;
    // Bước từ Dần (chiIdx = 2) đến chiThangIdx
    const stepFromDan = (chiThangIdx - 2 + 12) % 12;
    const canThangIdx = (canDanStart + stepFromDan) % 10;
    const canThang = CAN[canThangIdx];

    // 3. TRỤ NGÀY (Julian Day Number)
    // Giờ Tý bắt đầu từ 23:00 hôm trước. Nếu giờ >= 23, tính sang ngày hôm sau
    let dNgay = d;
    let mNgay = m;
    let yNgay = y;
    if (gio >= 23) {
      const nextDate = new Date(y, m - 1, d + 1);
      dNgay = nextDate.getDate();
      mNgay = nextDate.getMonth() + 1;
      yNgay = nextDate.getFullYear();
    }

    const jdn = jdFromDate(dNgay, mNgay, yNgay);
    const canNgayIdx = (jdn + 9) % 10;
    const chiNgayIdx = (jdn + 1) % 12;
    const canNgay = CAN[canNgayIdx];
    const chiNgay = CHI[chiNgayIdx];

    // NHẬT CHỦ (Nhật Nguyên)
    const nhatCanIdx = canNgayIdx;
    const nhatCan = canNgay;

    // 4. TRỤ GIỜ (Theo 12 canh giờ và Ngũ Thử Độn)
    let chiGioIdx = 0;
    if (gio >= 23 || gio < 1) chiGioIdx = 0; // Tý
    else chiGioIdx = Math.floor((gio + 1) / 2) % 12;
    const chiGio = CHI[chiGioIdx];

    // Ngũ Thử Độn: Can Ngày Giáp/Kỷ khởi Giáp Tý; Ất/Canh khởi Bính Tý; Bính/Tân khởi Mậu Tý; Đinh/Nhâm khởi Canh Tý; Mậu/Quý khởi Nhâm Tý
    const canGioStart = (canNgayIdx % 5) * 2;
    const canGioIdx = (canGioStart + chiGioIdx) % 10;
    const canGio = CAN[canGioIdx];

    // TẠO DỮ LIỆU 4 TRỤ CHI TIẾT
    function taoChiTietTru(canI, chiI, labelHeader, timeText, isNhat = false) {
      const c = CAN[canI];
      const ch = CHI[chiI];
      const thapThanCan = layThapThan(canI, nhatCanIdx, isNhat);
      const truongSinhCan = layTrangThaiTruongSinh(canI, chiThangIdx, true);
      const truongSinhChi = layTrangThaiTruongSinh(canI, chiI, true);

      const tangCanList = (TANG_CAN[chiI] || []).map(tc => {
        return {
          can: tc.can,
          canIdx: tc.canIdx,
          loai: tc.loai,
          thapThan: layThapThan(tc.canIdx, nhatCanIdx, false),
          truongSinh: layTrangThaiTruongSinh(tc.canIdx, chiThangIdx, true), // Vòng tràng sinh Can Ẩn tính chuẩn theo Nguyệt Lệnh (chiThangIdx)!
          color: COLOR_NGU_HANH[NGU_HANH_CAN[tc.canIdx]]
        };
      });

      const thanSatList = layThanSat(canI, chiI, canNgayIdx, chiNgayIdx, canNamIdx, chiNamIdx, chiThangIdx);

      return {
        label: labelHeader,
        timeText: timeText,
        can: c,
        canIdx: canI,
        canColor: COLOR_NGU_HANH[NGU_HANH_CAN[canI]],
        thapThanCan: thapThanCan,
        truongSinhCan: truongSinhCan,
        chi: ch,
        chiIdx: chiI,
        chiColor: COLOR_NGU_HANH[NGU_HANH_CHI[chiI]],
        truongSinhChi: truongSinhChi,
        tangCan: tangCanList,
        thanSat: thanSatList
      };
    }

    const truNam = taoChiTietTru(canNamIdx, chiNamIdx, `NĂM: ${y}`, `Năm ${canNam} ${chiNam}`, false);
    const truThang = taoChiTietTru(canThangIdx, chiThangIdx, `THÁNG: ${m}`, `Tháng ${canThang} ${chiThang}`, false);
    const truNgay = taoChiTietTru(canNgayIdx, chiNgayIdx, `NGÀY: ${d}`, `Ngày ${canNgay} ${chiNgay}`, true);
    const truGio = taoChiTietTru(canGioIdx, chiGioIdx, `GIỜ: ${gio < 10 ? '0' + gio : gio}:${phut < 10 ? '0' + phut : phut}`, `Giờ ${canGio} ${chiGio}`, false);

    // 5. TÍNH ĐẠI VẬN (8 ĐẠI VẬN)
    // Quy tắc thuận nghịch: Dương Nam, Âm Nữ đi Thuận; Âm Nam, Dương Nữ đi Nghịch
    const canNamAmDuong = canNamIdx % 2; // 0: Dương, 1: Âm
    const isThuan = (gioiTinh === 1 && canNamAmDuong === 0) || (gioiTinh === 0 && canNamAmDuong === 1);

    // Tính tuổi khởi vận (số ngày tới tiết tiếp theo chia cho 3)
    const soNgayTiet = isThuan ? tkInfo.distNext : tkInfo.distPrev;
    let tuoiKhoi = Math.max(1, Math.min(10, Math.floor(soNgayTiet / 3)));
    if (tuoiKhoi === 0) tuoiKhoi = 1;

    const daiVanList = [];
    let curCanDV = canThangIdx;
    let curChiDV = chiThangIdx;

    for (let i = 1; i <= 8; i++) {
      if (isThuan) {
        curCanDV = (curCanDV + 1) % 10;
        curChiDV = (curChiDV + 1) % 12;
      } else {
        curCanDV = (curCanDV - 1 + 10) % 10;
        curChiDV = (curChiDV - 1 + 12) % 12;
      }

      const startAge = tuoiKhoi + (i - 1) * 10;
      const endAge = startAge + 9;
      const cDV = CAN[curCanDV];
      const chDV = CHI[curChiDV];
      const ttCanDV = layThapThan(curCanDV, nhatCanIdx);
      const tsChiDV = layTrangThaiTruongSinh(curCanDV, curChiDV, true);

      const tcDV = (TANG_CAN[curChiDV] || []).map(tc => {
        return {
          can: tc.can,
          canIdx: tc.canIdx,
          thapThan: layThapThan(tc.canIdx, nhatCanIdx),
          truongSinh: layTrangThaiTruongSinh(tc.canIdx, curChiDV, true),
          color: COLOR_NGU_HANH[NGU_HANH_CAN[tc.canIdx]]
        };
      });

      daiVanList.push({
        thuTu: i,
        tieuDe: `ĐẠI VẬN ${i} (${startAge} - ${endAge} tuổi)`,
        startAge,
        endAge,
        can: cDV,
        canIdx: curCanDV,
        canColor: COLOR_NGU_HANH[NGU_HANH_CAN[curCanDV]],
        chi: chDV,
        chiIdx: curChiDV,
        chiColor: COLOR_NGU_HANH[NGU_HANH_CHI[curChiDV]],
        thapThanCan: ttCanDV,
        truongSinhChi: tsChiDV,
        tangCan: tcDV
      });
    }

    // 6. BẢNG 60 NĂM LƯU NIÊN (5 CỘT X 12 HÀNG)
    const luuNienList = [];
    const namBatDauLuuNien = y; // Từ năm sinh 1 tuổi
    for (let i = 0; i < 60; i++) {
      const curYearLN = namBatDauLuuNien + i;
      const ageLN = i + 1;
      const canLNIdx = (curYearLN - 4) % 10;
      const chiLNIdx = (curYearLN - 4) % 12;
      const cLN = CAN[canLNIdx];
      const chLN = CHI[chiLNIdx];
      const ttLN = layThapThan(canLNIdx, nhatCanIdx);
      const tsLN = layTrangThaiTruongSinh(nhatCanIdx, chiLNIdx);

      luuNienList.push({
        nam: curYearLN,
        tuoi: ageLN < 10 ? '0' + ageLN : '' + ageLN,
        can: cLN,
        chi: chLN,
        canColor: COLOR_NGU_HANH[NGU_HANH_CAN[canLNIdx]],
        chiColor: COLOR_NGU_HANH[NGU_HANH_CHI[chiLNIdx]],
        thapThan: ttLN,
        truongSinh: tsLN,
        isCurrentYear: (curYearLN === namXem)
      });
    }

    // Lấy thông tin ngày âm lịch chuẩn xác
    let amLichStr = '';
    if (loaiLich === 0 && ngayNhapAlStr) {
      amLichStr = ngayNhapAlStr;
    } else if (engineLich && typeof engineLich.convertSolar2Lunar === 'function') {
      const al = engineLich.convertSolar2Lunar(d, m, y);
      amLichStr = `${al.day < 10 ? '0' + al.day : al.day}/${al.month < 10 ? '0' + al.month : al.month}/${al.year}`;
    } else {
      amLichStr = `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
    }

    return {
      input: {
        hoTen,
        gioiTinh: gioiTinh === 1 ? 'Nam' : 'Nữ',
        gioiTinhVal: gioiTinh,
        ngaySinh: `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`,
        amLichStr,
        gioSinh: `${gio < 10 ? '0' + gio : gio}:${phut < 10 ? '0' + phut : phut}`,
        namXem,
        ngayXem: new Date().toLocaleDateString('vi-VN')
      },
      nhatChu: {
        can: nhatCan,
        nguHanh: NGU_HANH_CAN[nhatCanIdx],
        color: COLOR_NGU_HANH[NGU_HANH_CAN[nhatCanIdx]]
      },
      tietKhi: tkInfo.tietHienTai,
      nguyetLenh: `${chiThang} ${NGU_HANH_CHI[chiThangIdx]}`,
      nhatLenh: `${chiNgay} - ${NGU_HANH_CHI[chiNgayIdx]}`,
      truNam,
      truThang,
      truNgay,
      truGio,
      daiVan: daiVanList,
      luuNien: luuNienList
    };
  }

  /**
   * RENDER GIAO DIỆN XUẤT LÁ SỐ TỨ TRỤ
   * Cắt chuẩn theo bố cục sheet "BẢNG XUẤT TỨ TRỤ" & image3.png trong Thiết Kế Trang.xlsx
   */
  function renderBangLaSoTuTru(data, containerId) {
    const container = document.getElementById(containerId || 'tutru-output-container');
    if (!container || !data) return;

    const inp = data.input;
    const tn = data.truNam;
    const tt = data.truThang;
    const tng = data.truNgay;
    const tg = data.truGio;

    // Helper render từng ô trong hàng Can
    function renderCanCell(tru) {
      return `
        <div class="tt-can-box">
          <div class="tt-thapthan-top">${tru.thapThanCan}</div>
          <div class="tt-can-name" style="color: ${tru.canColor};">${(tru.can || '').toUpperCase()}</div>
          <div class="tt-ts-top">${tru.truongSinhCan}</div>
        </div>
      `;
    }

    // Helper render từng ô trong hàng Chi
    function renderChiCell(tru) {
      return `
        <div class="tt-chi-box">
          <div class="tt-chi-spacer"></div>
          <div class="tt-chi-name" style="color: ${tru.chiColor};">${(tru.chi || '').toUpperCase()}</div>
          <div class="tt-ts-bottom">${tru.truongSinhChi}</div>
        </div>
      `;
    }

    // Helper render từng ô trong hàng Can Ẩn (Tàng Can)
    function renderTangCanCell(tru) {
      let itemsHtml = '';
      tru.tangCan.forEach(tc => {
        itemsHtml += `
          <div class="tt-tc-item">
            <span class="tt-tc-name" style="color: ${tc.color}; font-weight: 700;">${tc.can}</span>
            <span class="tt-tc-th">${tc.thapThan}</span>
            <span class="tt-tc-ts">${tc.truongSinh}</span>
          </div>
        `;
      });
      return `
        <div class="tt-tangcan-box">
          ${itemsHtml}
        </div>
      `;
    }

    // Danh sách các sao Phụ Tinh xấu (Hung Sát) hiển thị màu đen theo yêu cầu
    const SAO_XAU_SET = new Set([
      'Thập Ác', 'Không Vong', 'Kình Dương', 'Kiếp Sát', 'Tai Sát', 'Vong Thần', 'Cô Thần', 'Quả Tú', 'Đào Hoa',
      'Âm Dương Sai Thố', 'Thiên La', 'Địa Võng', 'Tang Môn', 'Điếu Khách', 'Bạch Hổ', 'Quan Phù', 'Câu Sát', 'Giảo Sát',
      'Đại Hao', 'Tiểu Hao', 'Thiên Cẩu', 'Phá Toái', 'Ngũ Quỷ'
    ]);

    // Helper render từng ô trong hàng Thần Sát (Phụ Tinh): An hết sao tốt trước rồi mới đến sao xấu theo yêu cầu
    function renderThanSatCell(tru) {
      let thanSatHtml = '';
      if (tru.thanSat && tru.thanSat.length > 0) {
        const goodStars = tru.thanSat.filter(ts => !SAO_XAU_SET.has(ts));
        const badStars = tru.thanSat.filter(ts => SAO_XAU_SET.has(ts));
        const sortedStars = [...goodStars, ...badStars];

        thanSatHtml = sortedStars.map(ts => {
          const isBad = SAO_XAU_SET.has(ts);
          const badgeClass = isBad ? 'tt-ts-badge tt-ts-bad' : 'tt-ts-badge';
          return `<div class="${badgeClass}">${ts}</div>`;
        }).join('');
      }
      return `
        <div class="tt-thansat-box">
          ${thanSatHtml}
        </div>
      `;
    }

    // Helper render 1 ô Đại Vận (Chuẩn bố cục ảnh 1 & ảnh mẫu Bát Tự)
    function renderDaiVanCol(dv) {
      const tcColsHtml = dv.tangCan.map(tc => `
        <div class="tt-dv-tc-col">
          <div class="tt-dv-tc-name" style="color: ${tc.color};">${tc.can}</div>
          <div class="tt-dv-tc-th">${tc.thapThan}</div>
          <div class="tt-dv-tc-ts">${tc.truongSinh}</div>
        </div>
      `).join('');

      return `
        <div class="tt-daivan-card">
          <div class="tt-dv-header">${dv.tieuDe}</div>
          <div class="tt-dv-body">
            <div class="tt-dv-thapthan">${dv.thapThanCan}</div>
            <div class="tt-dv-canchi">
              <div class="tt-dv-canchi-spacer"></div>
              <div class="tt-dv-canchi-main">
                <span class="tt-dv-can" style="color: ${dv.canColor};">${dv.can.toUpperCase()}</span>
                <span class="tt-dv-chi" style="color: ${dv.chiColor};">${dv.chi.toUpperCase()}</span>
              </div>
              <span class="tt-dv-ts">${dv.truongSinhChi}</span>
            </div>
            <div class="tt-dv-tangcan-cols tt-dv-tc-count-${dv.tangCan.length}">
              ${tcColsHtml}
            </div>
          </div>
        </div>
      `;
    }

    // Ánh xạ viết tắt Can cho Bảng 60 năm Lưu Niên theo yêu cầu (Bính Thìn -> B. Thìn)
    const CAN_SHORT_MAP = {
      'Giáp': 'G.',
      'Ất': 'Ấ.',
      'Bính': 'B.',
      'Đinh': 'Đ.',
      'Mậu': 'M.',
      'Kỷ': 'K.',
      'Canh': 'C.',
      'Tân': 'T.',
      'Nhâm': 'N.',
      'Quý': 'Q.'
    };

    // Helper render 60 năm Lưu Niên (5 cột x 12 hàng) dùng <table> chuẩn fixed thẳng tắp các cột
    let luuNienRowsHtml = '';
    const totalLN = data.luuNien.length; // 60
    const rowsCount = 12;
    for (let r = 0; r < rowsCount; r++) {
      luuNienRowsHtml += '<tr class="tt-ln-row">';
      for (let c = 0; c < 5; c++) {
        const idx = r * 5 + c;
        if (idx < totalLN) {
          const ln = data.luuNien[idx];
          const curClass = ln.isCurrentYear ? 'current-ln-cell' : '';
          const canShort = CAN_SHORT_MAP[ln.can] || ln.can;
          luuNienRowsHtml += `
            <td class="tt-ln-cell ${curClass}">
              <div class="tt-ln-cell-inner">
                <div class="tt-ln-year-age"><span class="tt-ln-year">${ln.nam}</span>&nbsp;<span class="tt-ln-age">(${ln.tuoi})</span></div>
                <div class="tt-ln-thapthan">${ln.thapThan}</div>
                <div class="tt-ln-canchi" style="white-space: nowrap;"><span style="color: ${ln.canColor}; font-weight: 700;">${canShort}</span>&nbsp;<span style="color: ${ln.chiColor}; font-weight: 700;">${ln.chi}</span></div>
                <div class="tt-ln-ts">${ln.truongSinh}</div>
              </div>
            </td>
          `;
        }
      }
      luuNienRowsHtml += '</tr>';
    }

    // Định dạng giờ phút theo đúng mẫu ảnh 2: 02h 30 Phút
    const gioParts = (inp.gioSinh || '12:30').split(':');
    const gioNum = parseInt(gioParts[0], 10) || 0;
    const phutNum = parseInt(gioParts[1], 10) || 0;
    const gioFormatted = (gioNum < 10 ? '0' + gioNum : '' + gioNum);
    const phutFormatted = (phutNum < 10 ? '0' + phutNum : '' + phutNum);

    // Lưu lại họ tên đương số và reset cache ảnh
    cachedTuTruHoTen = inp.hoTen || 'Thân_Chủ';
    cachedTuTruDataUrl = null;
    cachedTuTruBlob = null;

    // 1. Mở ngay Modal Popup Lá Số Tứ Trụ (#tutru-modal) giống hệt Lá Số Tử Vi
    const tutruModal = document.getElementById('tutru-modal');
    if (tutruModal) {
      tutruModal.classList.remove('hidden');
      if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
    }

    // 2. Hiển thị hoạt ảnh đang an sao & kết xuất đồ bản trong Modal Body
    const modalView = document.getElementById('tutru-image-view');
    if (modalView) {
      modalView.innerHTML = `
        <div style="padding: 48px 0; text-align: center;">
          <i class="fa-solid fa-circle-notch fa-spin text-[#8B1E1E]" style="font-size: 28px; color: #8B1E1E;"></i>
          <div style="margin-top: 12px; font-size: 13px; color: #78716C; font-weight: 500;">Đang an 4 Trụ, Thập Thần, Đại Vận &amp; kết xuất đồ bản…</div>
        </div>
      `;
    }

    // Cập nhật thông tin Đương Số lên thanh tiêu đề Modal
    const subTitleEl = document.getElementById('tutru-modal-subtitle') || document.querySelector('#tutru-modal .tuvi-modal-subtitle');
    if (subTitleEl) {
      subTitleEl.innerHTML = `Đương số: <strong style="color: #8B1E1E;">${inp.hoTen}</strong> (${inp.gioiTinh}) &bull; Sinh: <strong>${inp.ngaySinh}</strong> (${inp.amLichStr}) - ${gioFormatted}h${phutFormatted} &bull; Xem năm: <strong>${inp.namXem}</strong>`;
    }

    // 3. Render vùng đệm staging ẩn (1166px) trên trang để html2canvas chụp lại đồ bản chuẩn sắc nét
    container.innerHTML = `
      <!-- KHỐI ĐỆM RENDER ĐỒ BẢN ĐỂ HTML2CANVAS CHỤP LẠI (FIXED WIDTH 1166px MỞ RỘNG 1.1x) -->
      <div id="tutru-render-staging" class="tt-render-staging" aria-hidden="true">
        <div class="tt-laso-card">
          <!-- 1. BẢNG 4 TRỤ CHÍNH (NĂM - THÁNG - NGÀY - GIỜ) (ĐÃ CẮT BỎ PHẦN HÌNH 2 THEO YÊU CẦU) -->
          <div class="tt-section-title" style="margin-top: 0;">✦ BẢNG TỨ TRỤ (BÁT TỰ NGUYÊN BẢN) ✦</div>
          <table class="tt-tru-table">
            <thead>
              <tr>
                <th class="tt-tru-th">${tn.label}</th>
                <th class="tt-tru-th">${tt.label}</th>
                <th class="tt-tru-th">${tng.label}</th>
                <th class="tt-tru-th">${tg.label}</th>
              </tr>
            </thead>
            <tbody>
              <!-- HÀNG THIÊN CAN & THẬP THẦN -->
              <tr class="tt-row-can">
                <td class="tt-cell-can">${renderCanCell(tn)}</td>
                <td class="tt-cell-can">${renderCanCell(tt)}</td>
                <td class="tt-cell-can">${renderCanCell(tng)}</td>
                <td class="tt-cell-can">${renderCanCell(tg)}</td>
              </tr>
              <!-- HÀNG ĐỊA CHI & TRƯỜNG SINH -->
              <tr class="tt-row-chi">
                <td class="tt-cell-chi">${renderChiCell(tn)}</td>
                <td class="tt-cell-chi">${renderChiCell(tt)}</td>
                <td class="tt-cell-chi">${renderChiCell(tng)}</td>
                <td class="tt-cell-chi">${renderChiCell(tg)}</td>
              </tr>
              <!-- HÀNG TÀNG CAN (CAN ẨN) -->
              <tr class="tt-row-tangcan">
                <td class="tt-cell-tangcan">${renderTangCanCell(tn)}</td>
                <td class="tt-cell-tangcan">${renderTangCanCell(tt)}</td>
                <td class="tt-cell-tangcan">${renderTangCanCell(tng)}</td>
                <td class="tt-cell-tangcan">${renderTangCanCell(tg)}</td>
              </tr>
              <!-- HÀNG THẦN SÁT (PHỤ TINH) -->
              <tr class="tt-row-thansat">
                <td class="tt-cell-thansat">${renderThanSatCell(tn)}</td>
                <td class="tt-cell-thansat">${renderThanSatCell(tt)}</td>
                <td class="tt-cell-thansat">${renderThanSatCell(tng)}</td>
                <td class="tt-cell-thansat">${renderThanSatCell(tg)}</td>
              </tr>
            </tbody>
          </table>

          <!-- 2. BẢNG 8 ĐẠI VẬN (CHUẨN BẢNG BÁT TỰ BORDER-COLLAPSE KHÔNG BAO GIỜ MẤT DÒNG CHIA Ô) -->
          <div class="tt-section-title" style="margin-top: 24px;">✦ 8 ĐẠI VẬN CUỘC ĐỜI (MỖI ĐẠI VẬN 10 NĂM) ✦</div>
          <div class="tt-daivan-wrapper">
            <table class="tt-daivan-table">
              <tbody>
                <tr>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[0])}</td>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[1])}</td>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[2])}</td>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[3])}</td>
                </tr>
                <tr>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[4])}</td>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[5])}</td>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[6])}</td>
                  <td class="tt-daivan-cell">${renderDaiVanCol(data.daiVan[7])}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 3. BẢNG 60 NĂM LƯU NIÊN (12 HÀNG X 5 CỘT) -->
          <div class="tt-section-title" style="margin-top: 24px;">✦ BẢNG 60 NĂM LƯU NIÊN (CAN CHI - THẬP THẦN - TRƯỜNG SINH) ✦</div>
          <div class="tt-luunien-container">
            <table class="tt-luunien-table">
              <tbody>
                ${luuNienRowsHtml}
              </tbody>
            </table>
          </div>

          <!-- CHÚ THÍCH MÀU SẮC NGŨ HÀNH TRÊN ẢNH LÁ SỐ -->
          <div class="tt-card-footer-note" style="margin-top: 14px; padding-top: 10px; padding-bottom: 16px; border-top: 1px dashed #DFBA73;">
            <div class="tt-legend-note" style="text-align: center;">
              <span>• <strong>Màu sắc ngũ hành:</strong></span>
              <span style="color: #D32F2F; font-weight: 700;">● Hỏa</span> &nbsp;
              <span style="color: #D97706; font-weight: 700;">● Thổ</span> &nbsp;
              <span style="color: #4B5563; font-weight: 700;">● Kim</span> &nbsp;
              <span style="color: #1D4ED8; font-weight: 700;">● Thủy</span> &nbsp;
              <span style="color: #16A34A; font-weight: 700;">● Mộc</span>
            </div>
          </div>
        </div>
      </div>

      <!-- NÚT MỞ LẠI MODAL VÀ THANH CÔNG CỤ SAO CHÉP / TẢI ẢNH TRÊN TRANG -->
      <div style="text-align: center; padding: 18px 0; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
        <button type="button" class="tutru-btn-submit" onclick="window.openTuTruModal()" style="max-width: 320px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fa-solid fa-expand"></i> Mở Lại Bản Đồ Lá Số (Popup)
        </button>
        <button type="button" class="tuvi-action-btn btn-gold" onclick="window.copyTuTruImage()" style="padding: 10px 16px; font-size: 13px; font-weight: 700; border-radius: 6px; border: 1.5px solid #C5A059; background: #FFF8EE; color: #7A1414; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-regular fa-copy"></i> Sao chép ảnh
        </button>
        <button type="button" class="tuvi-action-btn btn-green" onclick="window.downloadTuTruImage()" style="padding: 10px 16px; font-size: 13px; font-weight: 700; border-radius: 6px; background: #16A34A; color: #FFF; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; border: none;">
          <i class="fa-solid fa-file-image"></i> Tải ảnh lá số (PNG)
        </button>
      </div>
    `;

    // Hiển thị đồ bản Lá Số Tứ Trụ tức thì 0 giây (MỘT PHÁT RA LUÔN - chuẩn như bên Tử Vi)
    const tutruView = document.getElementById('tutru-image-view');
    const stagingCard = container.querySelector('.tt-laso-card');
    if (tutruView && stagingCard) {
      tutruView.innerHTML = `
        <div id="tutru-scaler-box" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
          <div id="tutru-scaler-inner" style="position: relative; margin: 0 auto; overflow: hidden;">
            <div id="tutru-live-board" class="tt-laso-card" style="width: 1060px; min-width: 1060px; max-width: 1060px; position: absolute; left: 0; top: 0; transform-origin: 0 0; box-sizing: border-box; background: #FFFDF9; margin: 0;">
              ${stagingCard.innerHTML}
            </div>
          </div>
        </div>
      `;
      if (typeof window.fitTuTruModalLiveBoard === 'function') {
        window.fitTuTruModalLiveBoard();
        requestAnimationFrame(function() { window.fitTuTruModalLiveBoard(); });
      }
    }

    // Kích hoạt kết xuất đồ bản thành ảnh bằng html2canvas đưa vào #tutru-modal
    if (typeof window.renderTuTruBoardToImage === 'function') {
      window.renderTuTruBoardToImage();
    }
  }

  /**
   * KHỞI TẠO FORM & TƯƠNG TÁC
   */
  function khoiTaoFormTuTru() {
    const selDay = document.getElementById('tt-ngay');
    const selMonth = document.getElementById('tt-thang');
    const selYear = document.getElementById('tt-nam');
    const selHour = document.getElementById('tt-gio');
    const selMin = document.getElementById('tt-phut');

    if (selDay && selDay.options.length === 0) {
      for (let i = 1; i <= 31; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i < 10 ? '0' + i : '' + i;
        if (i === 16) opt.selected = true;
        selDay.appendChild(opt);
      }
    }

    if (selMonth && selMonth.options.length === 0) {
      for (let i = 1; i <= 12; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = 'Tháng ' + (i < 10 ? '0' + i : '' + i);
        if (i === 6) opt.selected = true;
        selMonth.appendChild(opt);
      }
    }

    if (selYear && (selYear.options.length < 50 || selYear.options[0]?.value !== '2100')) {
      const currentVal = parseInt(selYear.value, 10) || 1976;
      selYear.innerHTML = '';
      for (let y = 2100; y >= 1930; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = 'Năm ' + y;
        if (y === currentVal) opt.selected = true;
        selYear.appendChild(opt);
      }
    }

    if (selHour && selHour.options.length === 0) {
      for (let h = 0; h <= 23; h++) {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = (h < 10 ? '0' + h : '' + h) + ' giờ';
        if (h === 12) opt.selected = true;
        selHour.appendChild(opt);
      }
    }

    if (selMin && selMin.options.length < 50) {
      const currentMin = parseInt(selMin.value, 10) || 30;
      selMin.innerHTML = '';
      for (let mi = 0; mi <= 59; mi++) {
        const opt = document.createElement('option');
        opt.value = mi;
        const txt = mi < 10 ? '0' + mi : '' + mi;
        opt.textContent = txt + ' phút';
        if (mi === currentMin) opt.selected = true;
        selMin.appendChild(opt);
      }
    }
  }

  function xuLyLapLaSoTuTru(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const hoTen = (document.getElementById('tt-hoten') ? document.getElementById('tt-hoten').value : 'Nguyễn Văn A') || 'Nguyễn Văn A';
    
    let gioiTinh = 1;
    const radNu = document.querySelector('input[name="tt_gioitinh"][value="0"]');
    if (radNu && radNu.checked) gioiTinh = 0;

    let loaiLich = 1;
    const radAl = document.querySelector('input[name="tt_loailich"][value="0"]');
    if (radAl && radAl.checked) loaiLich = 0;

    const ngay = parseInt(document.getElementById('tt-ngay')?.value, 10) || 16;
    const thang = parseInt(document.getElementById('tt-thang')?.value, 10) || 6;
    const nam = parseInt(document.getElementById('tt-nam')?.value, 10) || 1976;
    const valGio = document.getElementById('tt-gio')?.value;
    const gio = (valGio !== undefined && valGio !== null && valGio !== '') ? parseInt(valGio, 10) : 12;
    const valPhut = document.getElementById('tt-phut')?.value;
    const phut = (valPhut !== undefined && valPhut !== null && valPhut !== '') ? parseInt(valPhut, 10) : 30;
    const namXem = parseInt(document.getElementById('tt-namxem')?.value, 10) || 2026;

    const data = lapLaSoTuTru({
      hoTen,
      gioiTinh,
      loaiLich,
      ngay,
      thang,
      nam,
      gio,
      phut,
      namXem
    });

    renderBangLaSoTuTru(data, 'tutru-output-container');
    if (typeof window.openTuTruModal === 'function') {
      window.openTuTruModal();
    }
  }

  let cachedTuTruDataUrl = null;
  let cachedTuTruBlob = null;
  let cachedTuTruHoTen = '';

window.fitTuTruModalLiveBoard = function() {
  const box = document.getElementById("tutru-scaler-box") || document.getElementById("tutru-image-view");
  const inner = document.getElementById("tutru-scaler-inner");
  const board = document.getElementById("tutru-live-board");
  if (!box || !inner || !board) return;
  const vw = box.clientWidth || (window.innerWidth > 800 ? 760 : window.innerWidth - 16);
  const vh = box.clientHeight || (window.innerHeight - 120);
  if (vw <= 0 || vh <= 0) return;
  const origW = 1060;
  const origH = board.scrollHeight || 1450;
  const scale = Math.min(vw / origW, vh / origH, 1);
  board.style.transform = "scale(" + scale + ")";
  board.style.transformOrigin = "0 0";
  inner.style.width = Math.round(origW * scale) + "px";
  inner.style.height = Math.round(origH * scale) + "px";
};
if (typeof window !== "undefined") {
  window.addEventListener("resize", function() { if (typeof window.fitTuTruModalLiveBoard === "function") window.fitTuTruModalLiveBoard(); });
}

  async function renderTuTruBoardToImage() {
    const view = document.getElementById('tutru-image-view');
    const staging = document.getElementById('tutru-render-staging');
    const sheet = staging && (staging.querySelector('.tt-laso-card') || staging.firstElementChild);
    if (!view || !staging || !sheet) return;

    const fallbackToLiveBoard = (note) => {
      const modalBody = document.querySelector('#tutru-modal .tuvi-modal-body');
      if (modalBody) {
        modalBody.style.overflowY = 'auto';
        modalBody.style.display = 'block';
      }
      staging.removeAttribute('aria-hidden');
      staging.id = 'tutru-live-board';
      staging.style.position = 'relative';
      staging.style.left = 'auto';
      staging.style.top = 'auto';
      staging.style.opacity = '1';
      staging.style.pointerEvents = 'auto';
      staging.style.width = '100%';
      staging.style.maxWidth = '1060px';
      staging.style.margin = '0 auto';
      view.innerHTML = note ? `<p style="margin-bottom: 12px; font-size: 13px; color: #B45309; text-align: center;">${note}</p>` : '';
      view.appendChild(staging);
    };

    if (typeof html2canvas !== 'function') {
      fallbackToLiveBoard();
      return;
    }

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const targetWidth = 1060;
      const targetHeight = sheet.scrollHeight || sheet.offsetHeight || 1450;

      const canvas = await html2canvas(sheet, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFDF9',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        width: targetWidth,
        height: targetHeight,
        windowWidth: 1180,
        windowHeight: Math.max(targetHeight + 200, 2000),
        onclone: (clonedDoc) => {
          if (clonedDoc.body) {
            clonedDoc.body.style.zoom = '1';
            clonedDoc.body.style.transform = 'none';
          }
          if (clonedDoc.documentElement) {
            clonedDoc.documentElement.style.zoom = '1';
            clonedDoc.documentElement.style.transform = 'none';
          }
          const s = clonedDoc.getElementById('tutru-render-staging');
          if (s) {
            s.style.position = 'static';
            s.style.left = '0';
            s.style.top = '0';
            s.style.opacity = '1';
            s.style.width = '1060px';
            s.style.maxWidth = '1060px';
            s.style.margin = '0';
          }
          const card = clonedDoc.querySelector('.tt-laso-card');
          if (card) {
            card.style.width = '1060px';
            card.style.maxWidth = '1060px';
            card.style.margin = '0';
            card.style.overflow = 'visible';
          }
          const daivan = clonedDoc.querySelector('.tt-daivan-wrapper');
          if (daivan) {
            daivan.style.overflow = 'visible';
            daivan.style.width = '100%';
            daivan.style.maxWidth = '100%';
          }
          const luunien = clonedDoc.querySelector('.tt-luunien-container');
          if (luunien) {
            luunien.style.overflow = 'visible';
            luunien.style.width = '100%';
            luunien.style.maxWidth = '100%';
          }
          const luunienTable = clonedDoc.querySelector('.tt-luunien-table');
          if (luunienTable) {
            luunienTable.style.width = '100%';
            luunienTable.style.maxWidth = '100%';
            luunienTable.style.tableLayout = 'fixed';
          }
        }
      });

      cachedTuTruDataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => { cachedTuTruBlob = blob; }, 'image/png');

      view.innerHTML = `<img src="${cachedTuTruDataUrl}" alt="Bản đồ Lá Số Tứ Trụ" class="tuvi-board-img">`;
      view.scrollTop = 0;
      const modalBody = document.querySelector('#tutru-modal .tuvi-modal-body');
      if (modalBody) modalBody.scrollTop = 0;
    } catch (err) {
      console.error('Lỗi khi xuất ảnh Lá Số Tứ Trụ:', err);
      fallbackToLiveBoard();
    }
  }

  /**
   * Tải ảnh Lá Số Tứ Trụ về máy tính (PNG)
   */
  async function downloadTuTruImage() {
    if (!cachedTuTruDataUrl && !cachedTuTruBlob) {
      if (typeof showToast === 'function') showToast('Chưa có ảnh lá số để tải về!');
      else alert('Chưa có ảnh lá số để tải về!');
      return;
    }
    const hoTen = (cachedTuTruHoTen || document.getElementById('tt-hoten')?.value || 'Thân_Chủ').trim();
    const fileName = `La_So_Tu_Tru_${hoTen.replace(/\s+/g, '_')}.png`;

    let blob = cachedTuTruBlob;
    if (!blob && cachedTuTruDataUrl) {
      try {
        const res = await fetch(cachedTuTruDataUrl);
        blob = await res.blob();
        cachedTuTruBlob = blob;
      } catch (e) {}
    }

    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      if (typeof showToast === 'function') showToast('Đã tải thành công ảnh Lá Số Tứ Trụ!');
      return;
    }

    if (cachedTuTruDataUrl) {
      const a = document.createElement('a');
      a.href = cachedTuTruDataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (typeof showToast === 'function') showToast('Đã tải thành công ảnh Lá Số Tứ Trụ!');
    }
  }

  /**
   * Sao chép ảnh Lá Số Tứ Trụ vào Clipboard
   */
  async function copyTuTruImage() {
    if (typeof showToast === 'function') showToast('Đang sao chép hình ảnh Lá Số...');
    const hoTen = (cachedTuTruHoTen || document.getElementById('tt-hoten')?.value || 'Thân_Chủ').trim();
    const fileName = `La_So_Tu_Tru_${hoTen.replace(/\s+/g, '_')}.png`;

    let blob = cachedTuTruBlob;
    if (!blob && cachedTuTruDataUrl) {
      try {
        const res = await fetch(cachedTuTruDataUrl);
        blob = await res.blob();
        cachedTuTruBlob = blob;
      } catch (e) {}
    }

    // 1. Thử ghi Clipboard API
    if (blob && navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        if (typeof showToast === 'function') {
          showToast('Đã sao chép hình ảnh Lá Số Tứ Trụ vào Clipboard! (Mẹo: Có thể chạm giữ vào ảnh để lưu)');
        } else {
          alert('Đã sao chép ảnh Lá Số Tứ Trụ vào Clipboard!');
        }
        return;
      } catch (err) {
        console.warn('Lỗi copy clipboard:', err);
      }
    }

    // 2. Thử Web Share API trên thiết bị Mobile
    if (blob && navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Lá Số Tứ Trụ',
            files: [file]
          });
          return;
        }
      } catch (e) {
        if (e.name === 'AbortError') return;
      }
    }

    downloadTuTruImage();
  }

  /**
   * In trực tiếp ảnh Lá Số Tứ Trụ
   */
  function printTuTruImage() {
    if (!cachedTuTruDataUrl) {
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
          <title>In Lá Số Tứ Trụ - Thuật Số Huyền Học</title>
          <style>
            @page { size: A4 portrait; margin: 6mm; }
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; background: #FFF; }
            img { width: 100%; max-width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body>
          <img src="${cachedTuTruDataUrl}" onload="setTimeout(function(){ window.print(); window.close(); }, 300);" />
        </body>
        </html>
      `);
      win.document.close();
    } else {
      window.print();
    }
  }

  function nhapLaiFormTuTru() {
    const form = document.getElementById('tutru-input-form');
    if (form) form.reset();
    const selYear = document.getElementById('tt-nam');
    if (selYear) selYear.value = 1976;
    const selMonth = document.getElementById('tt-thang');
    if (selMonth) selMonth.value = 6;
    const selDay = document.getElementById('tt-ngay');
    if (selDay) selDay.value = 16;
    const selHour = document.getElementById('tt-gio');
    if (selHour) selHour.value = 12;
    const selMin = document.getElementById('tt-phut');
    if (selMin) selMin.value = 30;
    cachedTuTruDataUrl = null;
    cachedTuTruBlob = null;
    if (typeof window.closeTuTruModal === 'function') window.closeTuTruModal();
    const container = document.getElementById('tutru-output-container');
    if (container) container.innerHTML = '';
  }

  function initTuTruTab() {
    khoiTaoFormTuTru();
    if (typeof window.closeTuTruModal === 'function') window.closeTuTruModal();
    // Khi mở tab Tứ Trụ, chỉ hiển thị form nhập liệu ban đầu
    // Chỉ trừ khi bấm vào nút "Lập Lá Số Tứ Trụ" mới xuất ra bảng lá số
    const container = document.getElementById('tutru-output-container');
    if (container) {
      container.innerHTML = '';
    }
  }

  window.openTuTruModal = function () {
    const modal = document.getElementById('tutru-modal');
    if (modal) modal.classList.remove('hidden');
    if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
    if (typeof window.fitTuTruModalLiveBoard === 'function') {
      window.fitTuTruModalLiveBoard();
      requestAnimationFrame(window.fitTuTruModalLiveBoard);
    }
  };

  window.closeTuTruModal = function () {
    const modal = document.getElementById('tutru-modal');
    if (modal) modal.classList.add('hidden');
  };

  window.openTuTruImageZoomModal = function () {
    const zoomModal = document.getElementById('modal-image-zoom');
    const zoomImg = document.getElementById('modal-zoom-img');
    const zoomTitle = document.getElementById('modal-zoom-title');
    if (!zoomModal || !zoomImg) return;

    window.currentZoomType = 'tutru';
    if (cachedTuTruDataUrl) {
      zoomImg.src = cachedTuTruDataUrl;
    } else {
      if (typeof window.renderTuTruBoardToImage === 'function') {
        window.renderTuTruBoardToImage();
      }
    }
    if (zoomTitle) {
      zoomTitle.textContent = 'Bức Ảnh Bản Đồ Lá Số Tứ Trụ (Độ Nét Cao)';
    }
    zoomModal.classList.remove('hidden');
    if (typeof window.fitPageToWindow === 'function') window.fitPageToWindow();
  };

  // Đóng modal khi click vào nền backdrop hoặc bấm Escape
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function (e) {
      const modal = document.getElementById('tutru-modal');
      if (modal && !modal.classList.contains('hidden') && e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeTuTruModal();
      }
    });

    const zoomDownloadBtn = document.getElementById('btn-modal-zoom-download');
    if (zoomDownloadBtn) {
      zoomDownloadBtn.addEventListener('click', function () {
        const zoomTitle = document.getElementById('modal-zoom-title');
        if (zoomTitle && zoomTitle.textContent.includes('Tứ Trụ') && typeof window.downloadTuTruImage === 'function') {
          window.downloadTuTruImage();
        }
      });
    }
  }

  // Đăng ký toàn cục
  window.TUTRU_ENGINE = {
    lapLaSo: lapLaSoTuTru,
    renderBangLaSo: renderBangLaSoTuTru,
    renderToImage: renderTuTruBoardToImage,
    downloadImage: downloadTuTruImage,
    copyImage: copyTuTruImage,
    printImage: printTuTruImage,
    openModal: window.openTuTruModal,
    closeModal: window.closeTuTruModal,
    openZoom: window.openTuTruImageZoomModal,
    layThapThan: layThapThan,
    layTrangThaiTruongSinh: layTrangThaiTruongSinh,
    khoiTaoForm: khoiTaoFormTuTru,
    xuLyLapLaSo: xuLyLapLaSoTuTru,
    nhapLaiForm: nhapLaiFormTuTru,
    init: initTuTruTab
  };

  window.initTuTruTab = initTuTruTab;
  window.xuLyLapLaSoTuTru = xuLyLapLaSoTuTru;
  window.nhapLaiFormTuTru = nhapLaiFormTuTru;
  window.renderTuTruBoardToImage = renderTuTruBoardToImage;
  window.downloadTuTruImage = downloadTuTruImage;
  window.copyTuTruImage = copyTuTruImage;
  window.printTuTruImage = printTuTruImage;
  window.lapLaiLaSoTuTru = function() {
    window.closeTuTruModal();
    const formCard = document.querySelector('.tutru-form-card');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', khoiTaoFormTuTru);
    } else {
      khoiTaoFormTuTru();
    }
  }

})(window);
