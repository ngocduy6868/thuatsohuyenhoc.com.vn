/**
 * MODULE LỊCH ÂM DƯƠNG - THUẬT SỐ HUYỀN HỌC
 * Công thức tính toán và giao diện tra cứu Lịch Âm Dương chuẩn 24h.com.vn
 * Dữ liệu Tiết Khí & Mệnh Ngày được cập nhật chuẩn từ file 'Tiết Khí - Mệnh Ngày.docx'
 */

(function (window) {
  'use strict';

  // 60 Hoa Giáp Nạp Âm Ngũ Hành
  const NAP_AM_60 = {
    'Giáp Tý': 'Hải Trung Kim', 'Ất Sửu': 'Hải Trung Kim',
    'Bính Dần': 'Lư Trung Hỏa', 'Đinh Mão': 'Lư Trung Hỏa',
    'Mậu Thìn': 'Đại Lâm Mộc', 'Kỷ Tỵ': 'Đại Lâm Mộc',
    'Canh Ngọ': 'Lộ Bàng Thổ', 'Tân Mùi': 'Lộ Bàng Thổ',
    'Nhâm Thân': 'Kiếm Phong Kim', 'Quý Dậu': 'Kiếm Phong Kim',
    'Giáp Tuất': 'Sơn Đầu Hỏa', 'Ất Hợi': 'Sơn Đầu Hỏa',
    'Bính Tý': 'Giản Hạ Thủy', 'Đinh Sửu': 'Giản Hạ Thủy',
    'Mậu Dần': 'Thành Đầu Thổ', 'Kỷ Mão': 'Thành Đầu Thổ',
    'Canh Thìn': 'Bạch Lạp Kim', 'Tân Tỵ': 'Bạch Lạp Kim',
    'Nhâm Ngọ': 'Dương Liễu Mộc', 'Quý Mùi': 'Dương Liễu Mộc',
    'Giáp Thân': 'Tuyền Trung Thủy', 'Ất Dậu': 'Tuyền Trung Thủy',
    'Bính Tuất': 'Ốc Thượng Thổ', 'Đinh Hợi': 'Ốc Thượng Thổ',
    'Mậu Tý': 'Tích Lịch Hỏa', 'Kỷ Sửu': 'Tích Lịch Hỏa',
    'Canh Dần': 'Tùng Bách Mộc', 'Tân Mão': 'Tùng Bách Mộc',
    'Nhâm Thìn': 'Trường Lưu Thủy', 'Quý Tỵ': 'Trường Lưu Thủy',
    'Giáp Ngọ': 'Sa Trung Kim', 'Ất Mùi': 'Sa Trung Kim',
    'Bính Thân': 'Sơn Hạ Hỏa', 'Đinh Dậu': 'Sơn Hạ Hỏa',
    'Mậu Tuất': 'Bình Địa Mộc', 'Kỷ Hợi': 'Bình Địa Mộc',
    'Canh Tý': 'Bích Thượng Thổ', 'Tân Sửu': 'Bích Thượng Thổ',
    'Nhâm Dần': 'Kim Bạch Kim', 'Quý Mão': 'Kim Bạch Kim',
    'Giáp Thìn': 'Phúc Đăng Hỏa', 'Ất Tỵ': 'Phúc Đăng Hỏa',
    'Bính Ngọ': 'Thiên Hà Thủy', 'Đinh Mùi': 'Thiên Hà Thủy',
    'Mậu Thân': 'Đại Trạch Thổ', 'Kỷ Dậu': 'Đại Trạch Thổ',
    'Canh Tuất': 'Thoa Xuyến Kim', 'Tân Hợi': 'Thoa Xuyến Kim',
    'Nhâm Tý': 'Tang Đố Mộc', 'Quý Sửu': 'Tang Đố Mộc',
    'Giáp Dần': 'Đại Khê Thủy', 'Ất Mão': 'Đại Khê Thủy',
    'Bính Thìn': 'Sa Trung Thổ', 'Đinh Tỵ': 'Sa Trung Thổ',
    'Mậu Ngọ': 'Thiên Thượng Hỏa', 'Kỷ Mùi': 'Thiên Thượng Hỏa',
    'Canh Thân': 'Thạch Lựu Mộc', 'Tân Dậu': 'Thạch Lựu Mộc',
    'Nhâm Tuất': 'Đại Hải Thủy', 'Quý Hợi': 'Đại Hải Thủy'
  };

  // BẢNG 24 TIẾT KHÍ TRONG NĂM TÍNH THEO NGÀY DƯƠNG LỊCH (Tiết Khí - Mệnh Ngày.docx)
  const TIET_KHI_24 = [
    { name: 'Tiểu hàn', mua: 'Đông', startMonth: 1, startDay: 5, time: '15h 23', range: '5 - 6/1' },
    { name: 'Đại hàn', mua: 'Đông', startMonth: 1, startDay: 20, time: '08h 45', range: '20 - 21/1' },
    { name: 'Lập xuân', mua: 'Xuân', startMonth: 2, startDay: 4, time: '03h 02', range: '4 - 5/2' },
    { name: 'Vũ thủy', mua: 'Xuân', startMonth: 2, startDay: 18, time: '22h 52', range: '18 - 19/2' },
    { name: 'Kinh trập', mua: 'Xuân', startMonth: 3, startDay: 5, time: '20h 59', range: '5 - 6/3' },
    { name: 'Xuân phân', mua: 'Xuân', startMonth: 3, startDay: 20, time: '21h 46', range: '20 - 21/3' },
    { name: 'Thanh minh', mua: 'Xuân', startMonth: 4, startDay: 4, time: '01h 40', range: '4 - 5/4' },
    { name: 'Cốc vũ', mua: 'Xuân', startMonth: 4, startDay: 20, time: '08h 39', range: '20 - 21/4' },
    { name: 'Lập hạ', mua: 'Hạ', startMonth: 5, startDay: 5, time: '18h 48', range: '5 - 6/5' },
    { name: 'Tiểu mãn', mua: 'Hạ', startMonth: 5, startDay: 21, time: '07h 36', range: '21 - 22/5' },
    { name: 'Mang chủng', mua: 'Hạ', startMonth: 6, startDay: 5, time: '22h 48', range: '5 - 6/6' },
    { name: 'Hạ chí', mua: 'Hạ', startMonth: 6, startDay: 21, time: '15h 24', range: '21 - 22/6' },
    { name: 'Tiểu thử', mua: 'Hạ', startMonth: 7, startDay: 7, time: '08h 57', range: '7 - 8/7' },
    { name: 'Đại thử', mua: 'Hạ', startMonth: 7, startDay: 22, time: '02h 13', range: '22 - 23/7' },
    { name: 'Lập thu', mua: 'Thu', startMonth: 8, startDay: 7, time: '18h 42', range: '7 - 8/8' },
    { name: 'Xử thử', mua: 'Thu', startMonth: 8, startDay: 23, time: '09h 18', range: '23 - 24/8' },
    { name: 'Bạch lộ', mua: 'Thu', startMonth: 9, startDay: 7, time: '21h 41', range: '7 - 8/9' },
    { name: 'Thu phân', mua: 'Thu', startMonth: 9, startDay: 23, time: '07h 05', range: '23 - 24/9' },
    { name: 'Hàn lộ', mua: 'Thu', startMonth: 10, startDay: 8, time: '13h 29', range: '8 - 9/10' },
    { name: 'Sương giáng', mua: 'Thu', startMonth: 10, startDay: 23, time: '16h 38', range: '23 - 24/10' },
    { name: 'Lập đông', mua: 'Đông', startMonth: 11, startDay: 7, time: '16h 52', range: '7 - 8/11' },
    { name: 'Tiểu tuyết', mua: 'Đông', startMonth: 11, startDay: 22, time: '14h 23', range: '22 - 23/11' },
    { name: 'Đại tuyết', mua: 'Đông', startMonth: 12, startDay: 7, time: '09h 52', range: '7 - 8/12' },
    { name: 'Đông chí', mua: 'Đông', startMonth: 12, startDay: 21, time: '03h 50', range: '21 - 22/12' }
  ];

  // BẢNG TIẾT KHÍ THEO THÁNG DƯƠNG LỊCH (Row 14 Trạch Nhật Excel & Tiết Khí - Mệnh Ngày.docx)
  const TIET_KHI_THEO_THANG = {
    1: { mua: 'Đông', moTa: 'Tiểu Hàn: 15h 23 Ngày 5 - 6/1 - Đại Hàn: 08h 45 Ngày 20 - 21/1' },
    2: { mua: 'Xuân', moTa: 'Lập Xuân: 03h 02 Ngày 4 - 5/2 - Vũ Thủy: 22h 52 Ngày 18 - 19/2' },
    3: { mua: 'Xuân', moTa: 'Kinh Trập: 20h 59 Ngày 5 - 6/3 - Xuân Phân: 21h 46 Ngày 20 - 21/3' },
    4: { mua: 'Xuân', moTa: 'Thanh Minh: 01h 40 Ngày 4 - 5/4 - Cốc Vũ: 08h 39 Ngày 20 - 21/4' },
    5: { mua: 'Hạ', moTa: 'Lập Hạ: 18h 48 Ngày 5 - 6/5 - Tiểu Mãn: 07h 36 Ngày 21 - 22/5' },
    6: { mua: 'Hạ', moTa: 'Mang Chủng: 22h 48 Ngày 5 - 6/6 - Hạ Chí: 15h 24 Ngày 21 - 22/6' },
    7: { mua: 'Hạ', moTa: 'Tiểu Thử: 08h 57 Ngày 7 - 8/7 - Đại Thử: 02h 13 Ngày 22 - 23/7' },
    8: { mua: 'Thu', moTa: 'Lập Thu: 18h 42 Ngày 7 - 8/8 - Xử Thử: 09h 18 Ngày 23 - 24/8' },
    9: { mua: 'Thu', moTa: 'Bạch Lộ: 21h 41 Ngày 7 - 8/9 - Thu Phân: 07h 05 Ngày 23 - 24/9' },
    10: { mua: 'Thu', moTa: 'Hàn Lộ: 13h 29 Ngày 8 - 9/10 - Sương Giáng: 16h 38 Ngày 23 - 24/10' },
    11: { mua: 'Đông', moTa: 'Lập Đông: 16h 52 Ngày 7 - 8/11 - Tiểu Tuyết: 14h 23 Ngày 22 - 23/11' },
    12: { mua: 'Đông', moTa: 'Đại Tuyết: 09h 52 Ngày 7 - 8/12 - Đông Chí: 03h 50 Ngày 21 - 22/12' }
  };

  /**
   * Tính Tiết Khí chuẩn theo ngày Dương Lịch (d, m) từ 'Tiết Khí - Mệnh Ngày.docx'
   */
  function layTietKhiTheoNgayDuong(d, m) {
    const val = m * 100 + d;
    let tk = TIET_KHI_24[23]; // Mặc định Đông chí
    for (let i = TIET_KHI_24.length - 1; i >= 0; i--) {
      const item = TIET_KHI_24[i];
      const itemVal = item.startMonth * 100 + item.startDay;
      if (val >= itemVal) {
        tk = item;
        break;
      }
    }
    const thangMoTa = TIET_KHI_THEO_THANG[m] ? TIET_KHI_THEO_THANG[m].moTa : '';
    return {
      ten: tk.name.charAt(0).toUpperCase() + tk.name.slice(1),
      mua: tk.mua,
      khoiTiet: `${tk.time} Ngày ${tk.range}`,
      thangMoTa: thangMoTa
    };
  }

  // DỮ LIỆU MỆNH NGÀY 60 HOA GIÁP LẤY THEO CAN CHI (Tiết Khí - Mệnh Ngày.docx)
  const MENH_NGAY_60_DATA = {
    "Mậu Ngọ": { tinhChat: "Địa Chi sinh Thiên Can (Ngọ Hỏa sinh Mậu Thổ) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Nhâm Thân, Giáp Ngọ nội lực kiên cố, không ngại Hỏa khắc.", tuongTacDiaChi: "Lục hợp Mùi; tam hợp Dần và Tuất hóa Hỏa cục. Tương xung Tý, tự hình Ngọ, tương hình Dậu, tương hại Sửu, tương phá Mão, tuyệt Hợi." },
    "Nhâm Thân": { tinhChat: "Địa Chi sinh Thiên Can (Thân Kim sinh Nhâm Thủy) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Mậu Tuất nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Tị; tam hợp Tý và Thìn hóa Thủy cục. Tương xung Dần, tương hình Dần và Hợi, tương hại Hợi, tương phá Tị, tuyệt Mão." },
    "Tân Dậu": { tinhChat: "Can Chi đồng hành (Tân Kim, Dậu Kim) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Tân Mùi, Kỷ Dậu, Đinh Tị dày dặn, bền bỉ, không bị Mộc tổn hại.", tuongTacDiaChi: "Lục hợp Thìn; tam hợp Sửu và Tị hóa Kim cục. Tương xung Mão, tự hình Dậu, tương hại Tuất, tương phá Tý, tuyệt Dần." },
    "Tân Tị": { tinhChat: "Địa Chi khắc Thiên Can (Tị Hỏa khắc Tân Kim) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Kỷ Hợi nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Thân; tam hợp Sửu và Dậu hóa Kim cục. Tương xung Hợi, tương hình Thân, tương hại Dần, tương phá Thân, tuyệt Tý." },
    "Đinh Hợi": { tinhChat: "Địa Chi khắc Thiên Can (Hợi Thủy khắc Đinh Hỏa) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Đinh Mùi, Quý Hợi dòng chảy dồi dào, không sợ Thổ ngăn trở.", tuongTacDiaChi: "Lục hợp Dần; tam hợp Mão và Mùi hóa Mộc cục. Tương xung Tị, tự hình Hợi, tương hại Thân, tương phá Dần, tuyệt Ngọ." },
    "Canh Tuất": { tinhChat: "Địa Chi sinh Thiên Can (Tuất Thổ sinh Canh Kim) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Mậu Tuất nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Mão; tam hợp Dần và Ngọ hóa Hỏa cục. Tương xung Thìn, tương hình Mùi, tương hại Dậu, tương phá Mùi, tuyệt Thìn.", tamSat: "Kỵ mệnh các tuổi Hợi, Mão, Mùi ." },
    "Quý Dậu": { tinhChat: "Địa Chi sinh Thiên Can (Dậu Kim sinh Quý Thủy) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Kỷ Hợi nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Thìn; tam hợp Sửu và Tị hóa Kim cục. Tương xung Mão, tự hình Dậu, tương hại Tuất, tương phá Tý, tuyệt Dần." },
    "Kỷ Hợi": { tinhChat: "Thiên Can khắc Địa Chi (Kỷ Thổ khắc Hợi Thủy) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Tân Mùi, Kỷ Dậu, Đinh Tị dày dặn, vững bền, không lo Mộc tổn thương.", tuongTacDiaChi: "Lục hợp Dần; tam hợp Mão và Mùi hóa Mộc cục. Tương xung Tị, tự hình Hợi, tương hại Thân, tương phá Dần, tuyệt Ngọ." },
    "Kỷ Sửu": { tinhChat: "Can Chi đồng hành (Kỷ Thổ, Sửu Thổ) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Quý Dậu, Ất Mùi bản tính vững vàng, không sợ Hỏa tổn hại.", tuongTacDiaChi: "Lục hợp Tý; tam hợp Tị và Dậu hóa Kim cục. Tương xung Mùi, tương hình Tuất, tương hại Ngọ, tương phá Thìn, tuyệt Mùi.", tamSat: "Kỵ mệnh các tuổi Dần, Ngọ, Tuất ." },
    "Kỷ Dậu": { tinhChat: "Thiên Can sinh Địa Chi (Kỷ Thổ sinh Dậu Kim) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Đinh Mùi, Quý Hợi dòng chảy dồi dào, không sợ Thổ áp chế.", tuongTacDiaChi: "Lục hợp Thìn; tam hợp Sửu và Tị hóa Kim cục. Tương xung Mão, tự hình Dậu, tương hại Tuất, tương phá Tý, tuyệt Dần." },
    "Mậu Thìn": { tinhChat: "Can Chi đồng hành (Mậu Thổ, Thìn Thổ) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Canh Ngọ, Mậu Thân, Bính Thìn khí chất vững chắc, không e sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Dậu; tam hợp Thân và Tý hóa Thủy cục. Tương xung Tuất, tự hình Thìn, tương hình Mùi, tương hại Mão, tương phá Sửu, tuyệt Tuất." },
    "Giáp Thân": { tinhChat: "Địa Chi khắc Thiên Can (Thân Kim khắc Giáp Mộc) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Mậu Tý, Bính Thân, Mậu Ngọ hỏa khí vững vàng, không sợ Thủy khắc.", tuongTacDiaChi: "Lục hợp Tị; tam hợp Tý và Thìn hóa Thủy cục. Tương xung Dần, tương hình Dần và Hợi, tương hại Hợi, tương phá Tị, tuyệt Mão." },
    "Ất Mùi": { tinhChat: "Thiên Can khắc Địa Chi (Ất Mộc khắc Mùi Thổ) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Kỷ Hợi nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Ngọ; tam hợp Mão và Hợi hóa Mộc cục. Tương xung Sửu, tự hình Sửu, tương hại Tý, tương phá Tuất, tuyệt Sửu.", tamSat: "Kỵ mệnh các tuổi Thân, Tý, Thìn ." },
    "Ất Dậu": { tinhChat: "Địa Chi khắc Thiên Can (Dậu Kim khắc Ất Mộc) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Kỷ Sửu, Đinh Dậu, Kỷ Mùi nội lực tương sinh, không sợ Thủy suy xuyển.", tuongTacDiaChi: "Lục hợp Thìn; tam hợp Sửu và Tị hóa Kim cục. Tương xung Mão, tự hình Dậu, tương hại Tuất, tương phá Tý, tuyệt Dần." },
    "Quý Mão": { tinhChat: "Thiên Can sinh Địa Chi (Quý Thủy sinh Mão Mộc) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Kỷ Hợi nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Tuất; tam hợp Hợi và Mùi hóa Mộc cục. Tương xung Dậu, tương hình Tý, tương hại Thìn, tương phá Ngọ, tuyệt Thân." },
    "Kỷ Tị": { tinhChat: "Địa Chi sinh Thiên Can (Tị Hỏa sinh Kỷ Thổ) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Tân Mùi, Kỷ Dậu, Đinh Tị dày dặn, bền bỉ, không bị Mộc tổn hại.", tuongTacDiaChi: "Lục hợp Thân; tam hợp Sửu và Dậu hóa Kim cục. Tương xung Hợi, tương hình Thân, tương hại Dần, tương phá Thân, tuyệt Tý." },
    "Nhâm Dần": { tinhChat: "Thiên Can sinh Địa Chi (Nhâm Thủy sinh Dần Mộc) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Mậu Tuất nhờ có Kim tôi luyện mà đắc lợi.", tuongTacDiaChi: "Lục hợp Hợi; tam hợp Ngọ và Tuất hóa Hỏa cục. Tương xung Thân, tương hình Tị, tương hại Tị, tương phá Hợi, tuyệt Dậu." },
    "Giáp Thìn": { tinhChat: "Thiên Can khắc Địa Chi (Giáp Mộc khắc Thìn Thổ) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Nhâm Thân, Giáp Ngọ nội lực kiên cố, không ngại Hỏa khắc.", tuongTacDiaChi: "Lục hợp Dậu; tam hợp Tý và Thân hóa Thủy cục. Tương xung Tuất, tự hình Thìn, tương hình Mùi, tương hại Mão, tương phá Sửu, tuyệt Tuất.", tamSat: "Kỵ mệnh các tuổi Tị, Dậu, Sửu ." },
    "Ất Tị": { tinhChat: "Thiên Can sinh Địa Chi (Ất Mộc sinh Tị Hỏa) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Quý Dậu, Ất Mùi bản tính vững vàng, không sợ Hỏa tổn hại.", tuongTacDiaChi: "Lục hợp Thân; tam hợp Sửu và Dậu hóa Kim cục. Tương xung Hợi, tương hình Thân, tương hại Dần, tương phá Thân, tuyệt Tý." },
    "Quý Sửu": { tinhChat: "Địa Chi khắc Thiên Can (Sửu Thổ khắc Quý Thủy) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Tân Mùi, Kỷ Dậu, Đinh Tị bản tính kiên cố, không bị Mộc tổn hại.", tuongTacDiaChi: "Lục hợp Tý; tam hợp Tị và Dậu hóa Kim cục. Tương xung Mùi, tương hình Tuất, tương hại Ngọ, tương phá Thìn, tuyệt Mùi." },
    "Nhâm Tuất": { tinhChat: "Địa Chi khắc Thiên Can (Tuất Thổ khắc Nhâm Thủy) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Mậu Tý, Bính Thân, Mậu Ngọ hỏa khí cực thịnh, không sợ Thủy khắc.", tuongTacDiaChi: "Lục hợp Mão; tam hợp Dần và Ngọ hóa Hỏa cục. Tương xung Thìn, tương hình Mùi, tương hại Dậu, tương phá Mùi, tuyệt Thìn." },
    "Bính Dần": { tinhChat: "Địa Chi sinh Thiên Can (Dần Mộc sinh Bính Hỏa) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Nhâm Thân, Giáp Ngọ nội lực vững vàng, không ngại Hỏa khắc.", tuongTacDiaChi: "Lục hợp Hợi; tam hợp Ngọ và Tuất hóa Hỏa cục. Tương xung Thân, tương hình Tị, tương hại Tị, tương phá Hợi, tuyệt Dậu." },
    "Quý Tị": { tinhChat: "Thiên Can khắc Địa Chi (Quý Thủy khắc Tị Hỏa) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Kỷ Sửu, Đinh Dậu, Kỷ Mùi nội lực tương sinh, không sợ Thủy lấn át.", tuongTacDiaChi: "Lục hợp Thân; tam hợp Sửu và Dậu hóa Kim cục. Tương xung Hợi, tương hình Thân, tương hại Dần, tương phá Thân, tuyệt Tý." },
    "Kỷ Mão": { tinhChat: "Địa Chi khắc Thiên Can (Mão Mộc khắc Kỷ Thổ) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Đinh Mùi, Quý Hợi trường lưu dồi dào, không sợ Thổ áp chế.", tuongTacDiaChi: "Lục hợp Tuất; tam hợp Hợi và Mùi hóa Mộc cục. Tương xung Dậu, tương hình Tý, tương hại Thìn, tương phá Ngọ, tuyệt Thân." },
    "Bính Thìn": { tinhChat: "Thiên Can sinh Địa Chi (Bính Hỏa sinh Thìn Thổ) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Bính Ngọ, Nhâm Tuất bản mệnh thâm sâu, không sợ Thổ áp chế.", tuongTacDiaChi: "Lục hợp Dậu; tam hợp Tý và Thân hóa Thủy cục. Tương xung Tuất, tự hình Thìn, tương hình Mùi, tương hại Mão, tương phá Sửu, tuyệt Tuất.", tamSat: "Kỵ mệnh các tuổi Tị, Dậu, Sửu ." },
    "Đinh Mão": { tinhChat: "Địa Chi sinh Thiên Can (Mão Mộc sinh Đinh Hỏa) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Quý Dậu, Ất Mùi bản tính kiên định, không sợ Hỏa suy suyển.", tuongTacDiaChi: "Lục hợp Tuất; tam hợp Hợi và Mùi hóa Mộc cục. Tương xung Dậu, tương hình Tý, tương hại Thìn, tương phá Ngọ, tuyệt Thân." },
    "Giáp Ngọ": { tinhChat: "Thiên Can sinh Địa Chi (Giáp Mộc sinh Ngọ Hỏa) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Mậu Tuất nhờ có Kim tôi luyện mà đắc lợi.", tuongTacDiaChi: "Lục hợp Mùi; tam hợp Dần và Tuất hóa Hỏa cục. Tương xung Tý, tự hình Ngọ, tương hình Dậu, tương hại Sửu, tương phá Mão, tuyệt Hợi." },
    "Tân Mùi": { tinhChat: "Địa Chi sinh Thiên Can (Mùi Thổ sinh Tân Kim) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Đinh Mùi, Quý Hợi trường lưu dồi dào, không sợ Thổ ngăn trở.", tuongTacDiaChi: "Lục hợp Ngọ; tam hợp Mão và Hợi hóa Mộc cục. Tương xung Sửu, tương hình Sửu, tương hại Tý, tương phá Tuất, tuyệt Sửu." },
    "Bính Tuất": { tinhChat: "Thiên Can sinh Địa Chi (Bính Hỏa sinh Tuất Thổ) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Bính Ngọ, Nhâm Tuất bản mệnh thâm sâu, không sợ Thổ áp chế.", tuongTacDiaChi: "Lục hợp Mão; tam hợp Dần và Ngọ hóa Hỏa cục. Tương xung Thìn, tương hình Mùi, tương hại Dậu, tương phá Mùi, tuyệt Thìn.", tamSat: "Kỵ mệnh các tuổi Hợi, Mão, Mùi ." },
    "Ất Mão": { tinhChat: "Can Chi đồng hành (Ất Mộc, Mão Mộc) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Kỷ Sửu, Đinh Dậu, Kỷ Mùi nội lực tương sinh, không sợ Thủy suy xuyển.", tuongTacDiaChi: "Lục hợp Tuất; tam hợp Hợi và Mùi hóa Mộc cục. Tương xung Dậu, tương hình Tý, tương hại Thìn, tương phá Ngọ, tuyệt Thân." },
    "Bính Ngọ": { tinhChat: "Can Chi đồng hành (Bính Hỏa, Ngọ Hỏa) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Mậu Tý, Bính Thân, Mậu Ngọ hỏa tính cực vượng, không sợ Thủy khắc.", tuongTacDiaChi: "Lục hợp Mùi; tam hợp Dần và Tuất hóa Hỏa cục. Tương xung Tý, tự hình Ngọ, tương hình Dậu, tương hại Sửu, tương phá Mão, tuyệt Hợi." },
    "Tân Hợi": { tinhChat: "Thiên Can sinh Địa Chi (Tân Kim sinh Hợi Thủy) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Kỷ Hợi nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Dần; tam hợp Mão và Mùi hóa Mộc cục. Tương xung Tị, tự hình Hợi, tương hại Thân, tương phá Dần, tuyệt Ngọ." },
    "Giáp Tuất": { tinhChat: "Thiên Can khắc Địa Chi (Giáp Mộc khắc Tuất Thổ) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Nhâm Thân, Giáp Ngọ nội lực vững vàng, không ngại Hỏa khắc.", tuongTacDiaChi: "Lục hợp Mão; tam hợp Dần và Ngọ hóa Hỏa cục. Tương xung Thìn, tương hình Mùi, tương hại Dậu, tương phá Mùi, tuyệt Thìn." },
    "Nhâm Thìn": { tinhChat: "Địa Chi khắc Thiên Can (Thìn Thổ khắc Nhâm Thủy) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Mậu Tý, Bính Thân, Mậu Ngọ hỏa tính vượng thịnh, không ngại Thủy khắc.", tuongTacDiaChi: "Lục hợp Dậu; tam hợp Tý và Thân hóa Thủy cục. Tương xung Tuất, tự hình Thìn, tương hình Mùi, tương hại Mão, tương phá Sửu, tuyệt Tuất.", tamSat: "Kỵ mệnh các tuổi Tị, Dậu, Sửu ." },
    "Canh Tý": { tinhChat: "Thiên Can sinh Địa Chi (Canh Kim sinh Tý Thủy) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Bính Ngọ, Nhâm Tuất bản mệnh thâm sâu, không sợ Thổ lấn át.", tuongTacDiaChi: "Lục hợp Sửu; tam hợp Thân và Thìn hóa Thủy cục. Tương xung Ngọ, tương hình Mão, tương hại Mùi, tương phá Dậu, tuyệt Tị." },
    "Bính Thân": { tinhChat: "Thiên Can khắc Địa Chi (Bính Hỏa khắc Thân Kim) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Nhâm Thân, Giáp Ngọ nội lực kiên định, không sợ Hỏa khắc.", tuongTacDiaChi: "Lục hợp Tị; tam hợp Tý và Thìn hóa Thủy cục. Tương xung Dần, tương hình Dần và Hợi, tương hại Hợi, tương phá Tị, tuyệt Mão." },
    "Canh Thìn": { tinhChat: "Địa Chi sinh Thiên Can (Thìn Thổ sinh Canh Kim) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Mậu Tuất nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Dậu; tam hợp Tý và Thân hóa Thủy cục. Tương xung Tuất, tự hình Thìn, tương hình Mùi, tương hại Mão, tương phá Sửu, tuyệt Tuất.", tamSat: "Kỵ mệnh các tuổi Tị, Dậu, Sửu ." },
    "Kỷ Mùi": { tinhChat: "Can Chi đồng hành (Kỷ Thổ, Mùi Thổ) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Quý Dậu, Ất Mùi bản tính vững vàng, không sợ Hỏa suy xuyển.", tuongTacDiaChi: "Lục hợp Ngọ; tam hợp Mão và Hợi hóa Mộc cục. Tương xung Sửu, tự hình Sửu, tương hại Tý, tương phá Tuất, tuyệt Sửu.", tamSat: "Kỵ mệnh các tuổi Thân, Tý, Thìn ." },
    "Tân Sửu": { tinhChat: "Địa Chi sinh Thiên Can (Sửu Thổ sinh Tân Kim) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Đinh Mùi, Quý Hợi dòng chảy dồi dào, không sợ Thổ ngăn trở.", tuongTacDiaChi: "Lục hợp Tý; tam hợp Tị và Dậu hóa Kim cục. Tương xung Mùi, tương hình Tuất, tương hại Ngọ, tương phá Thìn, tuyệt Mùi.", tamSat: "Kỵ mệnh các tuổi Dần, Ngọ, Tuất ." },
    "Quý Mùi": { tinhChat: "Địa Chi khắc Thiên Can (Mùi Thổ khắc Quý Thủy) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Tân Mùi, Kỷ Dậu, Đinh Tị dày dặn, bền bỉ, không bị Mộc tổn hại.", tuongTacDiaChi: "Lục hợp Ngọ; tam hợp Mão và Hợi hóa Mộc cục. Tương xung Sửu, tự hình Sửu, tương hại Tý, tương phá Tuất, tuyệt Sửu.", tamSat: "Kỵ mệnh các tuổi Thân, Tý, Thìn ." },
    "Canh Dần": { tinhChat: "Thiên Can khắc Địa Chi (Canh Kim khắc Dần Mộc) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Canh Ngọ, Mậu Thân, Bính Thìn khí chất dày dặn, không sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Hợi; tam hợp Ngọ và Tuất hóa Hỏa cục. Tương xung Thân, tương hình Tị, tương hại Tị, tương phá Hợi, tuyệt Dậu." },
    "Nhâm Ngọ": { tinhChat: "Thiên Can khắc Địa Chi (Nhâm Thủy khắc Ngọ Hỏa) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Canh Ngọ, Mậu Thân, Bính Thìn khí chất vững chắc, không e sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Mùi; tam hợp Dần và Tuất hóa Hỏa cục. Tương xung Tý, tự hình Ngọ, tương hình Dậu, tương hại Sửu, tương phá Mão, tuyệt Hợi." },
    "Đinh Sửu": { tinhChat: "Thiên Can sinh Địa Chi (Đinh Hỏa sinh Sửu Thổ) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Kỷ Sửu, Đinh Dậu, Kỷ Mùi nội lực tương sinh, không ngại Thủy khắc.", tuongTacDiaChi: "Lục hợp Tý; tam hợp Tị và Dậu hóa Kim cục. Tương xung Mùi, tương hình Tuất, tương hại Ngọ, tương phá Thìn, tuyệt Mùi." },
    "Canh Thân": { tinhChat: "Can Chi đồng hành (Canh Kim, Thân Kim) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Canh Ngọ, Mậu Thân, Bính Thìn khí chất vững chắc, không e sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Tị; tam hợp Tý và Thìn hóa Thủy cục. Tương xung Dần, tương hình Dần và Hợi, tương hại Hợi, tương phá Tị, tuyệt Mão." },
    "Mậu Thân": { tinhChat: "Thiên Can sinh Địa Chi (Mậu Thổ sinh Thân Kim) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Bính Ngọ, Nhâm Tuất bản mệnh thâm sâu, không sợ Thổ ngăn trở.", tuongTacDiaChi: "Lục hợp Tị; tam hợp Tý và Thìn hóa Thủy cục. Tương xung Dần, tương hình Dần và Hợi, tương hại Hợi, tương phá Tị, tuyệt Mão." },
    "Đinh Mùi": { tinhChat: "Thiên Can sinh Địa Chi (Đinh Hỏa sinh Mùi Thổ) — Ngày Cát ( Bảo nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Kỷ Sửu, Đinh Dậu, Kỷ Mùi nội lực tương sinh, không ngại Thủy áp chế.", tuongTacDiaChi: "Lục hợp Ngọ; tam hợp Mão và Hợi hóa Mộc cục. Tương xung Sửu, tự hình Sửu, tương hại Tý, tương phá Tuất, tuyệt Sửu.", tamSat: "Kỵ mệnh các tuổi Thân, Tý, Thìn ." },
    "Quý Hợi": { tinhChat: "Can Chi đồng hành (Quý Thủy, Hợi Thủy) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Kỷ Sửu, Đinh Dậu, Kỷ Mùi nội lực tương sinh, không ngại Thủy áp chế.", tuongTacDiaChi: "Lục hợp Dần; tam hợp Mão và Mùi hóa Mộc cục. Tương xung Tị, tự hình Hợi, tương hại Thân, tương phá Dần, tuyệt Ngọ." },
    "Giáp Tý": { tinhChat: "Địa Chi sinh Thiên Can (Tý Thủy sinh Giáp Mộc) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Mậu Tuất nhờ có Kim rèn giũa mà chuyển biến thành lợi.", tuongTacDiaChi: "Lục hợp Sửu; tam hợp Thân và Thìn hóa Thủy cục. Tương xung Ngọ, tương hình Mão, tương hại Mùi, tương phá Dậu, tuyệt Tị." },
    "Đinh Tị": { tinhChat: "Can Chi đồng hành (Đinh Hỏa, Tị Hỏa) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Đinh Mùi, Quý Hợi dòng chảy dồi dào, không sợ Thổ ngăn trở.", tuongTacDiaChi: "Lục hợp Thân; tam hợp Sửu và Dậu hóa Kim cục. Tương xung Hợi, tương hình Thân, tương hại Dần, tương phá Thân, tuyệt Tý." },
    "Đinh Dậu": { tinhChat: "Thiên Can khắc Địa Chi (Đinh Hỏa khắc Dậu Kim) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Quý Dậu, Ất Mùi bản tính vững chắc, không ngại Hỏa tổn hại.", tuongTacDiaChi: "Lục hợp Thìn; tam hợp Sửu và Tị hóa Kim cục. Tương xung Mão, tự hình Dậu, tương hại Tuất, tương phá Tý, tuyệt Dần." },
    "Nhâm Tý": { tinhChat: "Can Chi đồng hành (Nhâm Thủy, Tý Thủy) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Canh Ngọ, Mậu Thân, Bính Thìn khí chất vững vàng, không e sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Sửu; tam hợp Thân và Thìn hóa Thủy cục. Tương xung Ngọ, tương hình Mão, tương hại Mùi, tương phá Dậu, tuyệt Tị.", kyTuoi: "Bính Ngọ, Canh Ngọ." },
    "Tân Mão": { tinhChat: "Thiên Can khắc Địa Chi (Tân Kim khắc Mão Mộc) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Tân Mùi, Kỷ Dậu, Đinh Tị bền bỉ kiên cố, không e sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Tuất; tam hợp Hợi và Mùi hóa Mộc cục. Tương xung Dậu, tương hình Tý, tương hại Thìn, tương phá Ngọ, tuyệt Thân." },
    "Mậu Tuất": { tinhChat: "Can Chi đồng hành (Mậu Thổ, Tuất Thổ) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Mộc khắc Thổ; riêng các tuổi hành Thổ như Canh Ngọ, Mậu Thân, Bính Thìn khí chất kiên cố, không e sợ Mộc khắc.", tuongTacDiaChi: "Lục hợp Mão; tam hợp Dần và Ngọ hóa Hỏa cục. Tương xung Thìn, tương hình Mùi, tương hại Dậu, tương phá Mùi, tuyệt Thìn." },
    "Ất Sửu": { tinhChat: "Thiên Can khắc Địa Chi (Ất Mộc khắc Sửu Thổ) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Kim khắc Mộc; riêng tuổi Kỷ Hợi nhờ có Kim tương tác mà đắc lợi.", tuongTacDiaChi: "Lục hợp Tý; tam hợp Tị và Dậu hóa Kim cục. Tương xung Mùi, tương hình Tuất, tương hại Ngọ, tương phá Thìn, tuyệt Mùi." },
    "Ất Hợi": { tinhChat: "Địa Chi sinh Thiên Can (Hợi Thủy sinh Ất Mộc) — Ngày Cát ( Nghĩa nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Quý Dậu, Ất Mùi bản tính kiên định, không sợ Hỏa suy suyển.", tuongTacDiaChi: "Lục hợp Dần; tam hợp Mão và Mùi hóa Mộc cục. Tương xung Tị, tự hình Hợi, tương hại Thân, tương phá Dần, tuyệt Ngọ." },
    "Mậu Tý": { tinhChat: "Thiên Can khắc Địa Chi (Mậu Thổ khắc Tý Thủy) — Ngày Cát trung bình ( Chế nhật ).", tuongTacNguHanh: "Nạp Âm Hỏa khắc Kim; riêng các tuổi hành Kim như Nhâm Thân, Giáp Ngọ nội lực kiên cố, không ngại Hỏa khắc.", tuongTacDiaChi: "Lục hợp Sửu; tam hợp Thân và Thìn hóa Thủy cục. Tương xung Ngọ, tương hình Mão, tương hại Mùi, tương phá Dậu, tuyệt Tị." },
    "Giáp Dần": { tinhChat: "Can Chi đồng hành (Giáp Mộc, Dần Mộc) — Ngày Cát ( Chuyên nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Mậu Tý, Bính Thân, Mậu Ngọ hỏa khí vững chắc, không ngại Thủy khắc.", tuongTacDiaChi: "Lục hợp Hợi; tam hợp Ngọ và Tuất hóa Hỏa cục. Tương xung Thân, tương hình Tị, tương hại Tị, tương phá Hợi, tuyệt Dậu." },
    "Mậu Dần": { tinhChat: "Địa Chi khắc Thiên Can (Dần Mộc khắc Mậu Thổ) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Bính Ngọ, Nhâm Tuất bản mệnh thâm sâu, không sợ Thổ ngăn trở.", tuongTacDiaChi: "Lục hợp Hợi; tam hợp Ngọ và Tuất hóa Hỏa cục. Tương xung Thân, tương hình Tị, tương hại Tị, tương phá Hợi, tuyệt Dậu." },
    "Canh Ngọ": { tinhChat: "Địa Chi khắc Thiên Can (Ngọ Hỏa khắc Canh Kim) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thổ khắc Thủy; riêng các tuổi hành Thủy như Bính Ngọ, Nhâm Tuất bản mệnh thâm sâu, không lo Thổ áp chế.", tuongTacDiaChi: "Lục hợp Mùi; tam hợp Dần và Tuất hóa Hỏa cục. Tương xung Tý, tự hình Ngọ, tương hình Dậu, tương hại Sửu, tương phá Mão, tuyệt Hợi." },
    "Bính Tý": { tinhChat: "Địa Chi khắc Thiên Can (Tý Thủy khắc Bính Hỏa) — Ngày Hung ( Phạt nhật ).", tuongTacNguHanh: "Nạp Âm Thủy khắc Hỏa; riêng các tuổi hành Hỏa như Mậu Tý, Bính Thân, Mậu Ngọ hỏa khí vững chắc, không lo Thủy áp chế.", tuongTacDiaChi: "Lục hợp Sửu; tam hợp Thân và Thìn hóa Thủy cục. Tương xung Ngọ, tương hình Mão, tương hại Mùi, tương phá Dậu, tuyệt Tị." }
  };

  // Ngày lễ Dương lịch cố định
  const LE_DUONG = {
    '1/1': 'Tết Dương Lịch',
    '14/2': 'Lễ Tình Nhân (Valentine)',
    '27/2': 'Ngày Thầy thuốc Việt Nam',
    '8/3': 'Ngày Quốc tế Phụ nữ',
    '26/3': 'Ngày thành lập Đoàn TNCS Hồ Chí Minh',
    '30/4': 'Ngày Giải phóng miền Nam',
    '1/5': 'Ngày Quốc tế Lao động',
    '7/5': 'Ngày Chiến thắng Điện Biên Phủ',
    '19/5': 'Ngày sinh Chủ tịch Hồ Chí Minh',
    '1/6': 'Ngày Quốc tế Thiếu nhi',
    '21/6': 'Ngày Báo chí Cách mạng Việt Nam',
    '27/7': 'Ngày Thương binh Liệt sĩ',
    '19/8': 'Ngày Cách mạng Tháng Tám',
    '2/9': 'Ngày Quốc Khánh Việt Nam',
    '10/10': 'Ngày Giải phóng Thủ đô',
    '20/10': 'Ngày Phụ nữ Việt Nam',
    '20/11': 'Ngày Nhà giáo Việt Nam',
    '22/12': 'Ngày thành lập QĐND Việt Nam',
    '24/12': 'Đêm Giáng Sinh (Noel)',
    '25/12': 'Lễ Giáng Sinh'
  };

  // Ngày lễ Âm lịch truyền thống
  const LE_AM = {
    '1/1': 'Mùng 1 Tết Nguyên Đán',
    '2/1': 'Mùng 2 Tết Nguyên Đán',
    '3/1': 'Mùng 3 Tết Nguyên Đán',
    '15/1': 'Tết Nguyên Tiêu (Rằm tháng Giêng)',
    '3/3': 'Tết Hàn Thực (Bánh trôi bánh chay)',
    '10/3': 'Giỗ Tổ Hùng Vương',
    '15/4': 'Đại lễ Phật Đản (Phật Lịch)',
    '5/5': 'Tết Đoan Ngọ (Giết sâu bọ)',
    '15/7': 'Lễ Vu Lan Báo Hiếu (Rằm tháng 7)',
    '15/8': 'Tết Trung Thu (Rằm tháng 8)',
    '9/9': 'Tết Trùng Cửu',
    '10/10': 'Tết Trùng Thập',
    '23/12': 'Ông Táo Chầu Trời',
    '29/12': 'Tất niên cuối năm',
    '30/12': 'Đêm Giao Thừa'
  };

  // Trạng thái ngày đang chọn hiện tại của Lịch Âm Dương
  let currentDate = new Date();
  let traCuuMode = 'duong_am'; // 'duong_am' | 'am_duong'
  let lastRenderedData = null;

  function taoOptionsNgay(selectedDay, maxDays = 31) {
    let html = '';
    for (let i = 1; i <= maxDays; i++) {
      html += `<option value="${i}" ${i === selectedDay ? 'selected' : ''}>Ngày ${i}</option>`;
    }
    return html;
  }

  function taoOptionsThang(selectedMonth) {
    let html = '';
    for (let i = 1; i <= 12; i++) {
      html += `<option value="${i}" ${i === selectedMonth ? 'selected' : ''}>Tháng ${i}</option>`;
    }
    return html;
  }

  function taoOptionsNam(selectedYear) {
    let html = '';
    const curY = new Date().getFullYear();
    const startY = curY - 70;
    const endY = curY + 70;
    for (let i = startY; i <= endY; i++) {
      html += `<option value="${i}" ${i === selectedYear ? 'selected' : ''}>Năm ${i}</option>`;
    }
    return html;
  }

  function capNhatSoNgayTraCuuLichAmDuong() {
    const selDay = document.getElementById('lad-search-day');
    const selMonth = document.getElementById('lad-search-month');
    const selYear = document.getElementById('lad-search-year');
    if (!selDay || !selMonth || !selYear) return;
    const m = parseInt(selMonth.value, 10);
    const y = parseInt(selYear.value, 10);
    const curD = parseInt(selDay.value, 10) || 1;
    const maxDays = (traCuuMode === 'am_duong') ? 30 : new Date(y, m, 0).getDate();
    selDay.innerHTML = taoOptionsNgay(curD <= maxDays ? curD : maxDays, maxDays);
  }

  function chuyenCheDoTraCuu(mode) {
    traCuuMode = mode;
    const selDay = document.getElementById('lad-search-day');
    const selMonth = document.getElementById('lad-search-month');
    const selYear = document.getElementById('lad-search-year');
    if (!selDay || !selMonth || !selYear || !lastRenderedData) return;

    if (mode === 'am_duong') {
      const l = lastRenderedData.lunar;
      selYear.value = l.year;
      selMonth.value = l.month;
      capNhatSoNgayTraCuuLichAmDuong();
      selDay.value = l.day;
    } else {
      const s = lastRenderedData.solar;
      selYear.value = s.year;
      selMonth.value = s.month;
      capNhatSoNgayTraCuuLichAmDuong();
      selDay.value = s.day;
    }
  }

  function xuLyTraCuuLichAmDuong() {
    const selDay = document.getElementById('lad-search-day');
    const selMonth = document.getElementById('lad-search-month');
    const selYear = document.getElementById('lad-search-year');
    const radAm = document.getElementById('lad-radio-am-duong');
    if (!selDay || !selMonth || !selYear) return;

    const d = parseInt(selDay.value, 10);
    const m = parseInt(selMonth.value, 10);
    const y = parseInt(selYear.value, 10);
    const isAmSangDuong = radAm && radAm.checked;

    if (isAmSangDuong) {
      let sol = null;
      const engine = window.LICH_VAN_NIEN_ENGINE;
      if (engine && typeof engine.convertLunar2Solar === 'function') {
        sol = engine.convertLunar2Solar(d, m, y, false, 7);
      } else if (typeof window.convertLunar2Solar === 'function') {
        sol = window.convertLunar2Solar(d, m, y, 0, 7);
      }
      if (sol && sol.day && sol.month && sol.year) {
        hienThiNgay(sol.day, sol.month, sol.year);
        if (window.LICH_THANG && typeof window.LICH_THANG.loadThang === 'function') {
          window.LICH_THANG.loadThang(sol.month, sol.year, sol.day);
        }
        if (typeof window.chonNgayTrachNhatTuLichThang === 'function') {
          window.chonNgayTrachNhatTuLichThang(sol.day, sol.month, sol.year);
        }
      }
    } else {
      hienThiNgay(d, m, y);
      if (window.LICH_THANG && typeof window.LICH_THANG.loadThang === 'function') {
        window.LICH_THANG.loadThang(m, y, d);
      }
      if (typeof window.chonNgayTrachNhatTuLichThang === 'function') {
        window.chonNgayTrachNhatTuLichThang(d, m, y);
      }
    }
  }

  /**
   * CÔNG THỨC: TÍNH TOÁN DỮ LIỆU LỊCH ÂM DƯƠNG CHO 1 NGÀY
   */
  function tinhToanLichAmDuong(d, m, y) {
    let engine = window.LICH_VAN_NIEN_ENGINE;
    if (!engine) {
      console.warn('LICH_VAN_NIEN_ENGINE chưa tải, đang chờ...');
      return null;
    }

    const dayInfo = engine.getLichVanNienDayInfo(d, m, y);
    const canChiNgay = dayInfo.canChi.day;
    const napAm = NAP_AM_60[canChiNgay] || 'Bình Hòa';
    const hanhNapAm = napAm.split(' ').pop(); // Lấy hành ngũ hành: Kim, Mộc, Thủy, Hỏa, Thổ

    // LẤY DỮ LIỆU MỆNH NGÀY THEO CAN CHI TỪ 'Tiết Khí - Mệnh Ngày.docx'
    const menhChiTiet = MENH_NGAY_60_DATA[canChiNgay] || null;

    // LẤY TIẾT KHÍ CHUẨN XÁC THEO NGÀY DƯƠNG LỊCH TỪ 'Tiết Khí - Mệnh Ngày.docx'
    const tkObj = layTietKhiTheoNgayDuong(d, m);

    // Tìm sự kiện / ngày lễ
    const keyDuong = `${d}/${m}`;
    const keyAm = `${dayInfo.lunar.day}/${dayInfo.lunar.month}`;
    let specialEvent = '';
    if (LE_DUONG[keyDuong]) {
      specialEvent = LE_DUONG[keyDuong];
    } else if (LE_AM[keyAm]) {
      specialEvent = LE_AM[keyAm];
    } else if (dayInfo.lunar.day === 1) {
      specialEvent = 'Ngày mồng một đầu tháng';
    } else if (dayInfo.lunar.day === 15) {
      specialEvent = 'Ngày Rằm (Vọng)';
    }

    // Tuổi xung chi tiết
    const chiDay = dayInfo.canChi.chiDay;
    const canDay = dayInfo.canChi.canDay;
    const xungChiMap = {
      'Tý': 'Ngọ', 'Sửu': 'Mùi', 'Dần': 'Thân', 'Mão': 'Dậu',
      'Thìn': 'Tuất', 'Tị': 'Hợi', 'Ngọ': 'Tý', 'Mùi': 'Sửu',
      'Thân': 'Dần', 'Dậu': 'Mão', 'Tuất': 'Thìn', 'Hợi': 'Tị'
    };
    const xungChi = xungChiMap[chiDay] || 'Ngọ';
    const tuoiXungChiTiet = `${canDay === 'Giáp' ? 'Mậu' : 'Bính'} ${xungChi}, Canh ${xungChi}, Nhâm ${xungChi}`;

    // Giờ Hoàng Đạo & Hắc Đạo dạng text hiển thị chuẩn 24h
    const gioHoangDaoStr = dayInfo.hoangDaoHours.map(h => `${h.chi} (${h.time})`).join(', ');
    const gioHacDaoStr = dayInfo.hacDaoHours.map(h => `${h.chi} (${h.time})`).join(', ');

    return {
      solar: {
        day: d,
        month: m,
        year: y,
        dayStr: d < 10 ? '0' + d : '' + d,
        monthStr: m < 10 ? '0' + m : '' + m,
        dayOfWeek: dayInfo.solar.dayOfWeek,
        specialEvent: specialEvent
      },
      lunar: {
        day: dayInfo.lunar.day,
        month: dayInfo.lunar.month,
        year: dayInfo.lunar.year,
        isLeap: dayInfo.lunar.isLeap,
        canChiDay: dayInfo.canChi.day,
        canChiMonth: dayInfo.canChi.month,
        canChiYear: dayInfo.canChi.year
      },
      menhNgay: napAm,
      hanhNapAm: hanhNapAm,
      menhChiTiet: menhChiTiet,
      isHoangDao: dayInfo.hoangDaoDay.isHoangDao,
      starName: dayInfo.hoangDaoDay.name,
      rating: dayInfo.hoangDaoDay.rating,
      gioHoangDao: gioHoangDaoStr,
      gioHacDao: gioHacDaoStr,
      tuoiXung: tuoiXungChiTiet,
      tietKhi: tkObj.ten,
      tietKhiMua: tkObj.mua,
      tietKhiKhoiTiet: tkObj.khoiTiet,
      tietKhiThang: tkObj.thangMoTa,
      huong: dayInfo.huong,
      raw: dayInfo
    };
  }

  /**
   * GIAO DIỆN: RENDER KHUNG XEM LỊCH ÂM DƯƠNG
   */
  function renderLichAmDuong(data) {
    const container = document.getElementById('box_lich_am_duong');
    if (!container || !data) return;

    lastRenderedData = data;
    const s = data.solar;
    const l = data.lunar;
    const badgeClass = data.isHoangDao ? 'badge-hoangdao' : 'badge-hacdao';
    const badgeText = data.isHoangDao 
      ? `<span class="lad-tag-title">Ngày Hoàng Đạo</span> <span class="lad-tag-desc">(${data.starName})</span>` 
      : `<span class="lad-tag-title">Ngày Hắc Đạo</span> <span class="lad-tag-desc">(${data.starName})</span>`;

    const curSearchD = (traCuuMode === 'am_duong') ? l.day : s.day;
    const curSearchM = (traCuuMode === 'am_duong') ? l.month : s.month;
    const curSearchY = (traCuuMode === 'am_duong') ? l.year : s.year;
    const maxSearchDays = (traCuuMode === 'am_duong') ? 30 : new Date(s.year, s.month, 0).getDate();

    container.innerHTML = `
      <div class="lad-card-wrapper">
        <!-- HEADER CỦA BOX LỊCH ÂM DƯƠNG -->
        <div class="lad-header-bar">
          <div class="lad-header-title">
            <span class="lad-header-icon">📅</span>
            <span>LỊCH ÂM DƯƠNG NGÀY ${s.dayStr}/${s.monthStr}/${s.year}</span>
          </div>
        </div>

        <!-- BỘ TRA CỨU / ĐỔI LỊCH ÂM DƯƠNG VIỆT NAM (CHUẨN ẢNH 2) -->
        <div class="lad-search-panel">
          <div class="lad-search-banner">
            ĐỔI LỊCH ÂM DƯƠNG – TRA CỨU LỊCH ÂM DƯƠNG
          </div>
          <div class="lad-search-body">
            <div class="lad-search-row-selects">
              <select id="lad-search-day" class="lad-search-select" aria-label="Chọn ngày">
                ${taoOptionsNgay(curSearchD, maxSearchDays)}
              </select>
              <select id="lad-search-month" class="lad-search-select" aria-label="Chọn tháng" onchange="window.capNhatSoNgayTraCuuLichAmDuong()">
                ${taoOptionsThang(curSearchM)}
              </select>
              <select id="lad-search-year" class="lad-search-select" aria-label="Chọn năm" onchange="window.capNhatSoNgayTraCuuLichAmDuong()">
                ${taoOptionsNam(curSearchY)}
              </select>
            </div>
            <div class="lad-search-row-actions">
              <div class="lad-search-radios">
                <label class="lad-radio-label">
                  <input type="radio" name="lad_search_type" id="lad-radio-duong-am" value="duong_am" ${traCuuMode === 'duong_am' ? 'checked' : ''} onchange="window.chuyenCheDoTraCuu('duong_am')">
                  <span>Dương → Âm</span>
                </label>
                <label class="lad-radio-label">
                  <input type="radio" name="lad_search_type" id="lad-radio-am-duong" value="am_duong" ${traCuuMode === 'am_duong' ? 'checked' : ''} onchange="window.chuyenCheDoTraCuu('am_duong')">
                  <span>Âm → Dương</span>
                </label>
              </div>
              <button type="button" class="btn-lad-ketqua" onclick="window.xuLyTraCuuLichAmDuong()">Tra Cứu</button>
            </div>
          </div>
        </div>

        <!-- KHUNG SONG LỊCH DƯƠNG - ÂM CHUẨN 24H -->
        <div class="lad-dual-box">
          <!-- Nút ngày trước -->
          <button type="button" class="lad-nav-btn lad-prev-btn" onclick="window.prevDayLichAmDuong()" title="Xem ngày trước">
            ‹
          </button>

          <!-- CỘT DƯƠNG LỊCH -->
          <div class="lad-col lad-solar-col">
            <div class="lad-col-label">DƯƠNG LỊCH</div>
            <div class="lad-big-number solar-num">${s.dayStr}</div>
            <div class="lad-sub-date">Tháng ${s.monthStr} năm ${s.year}</div>
            <div class="lad-day-of-week">${s.dayOfWeek}</div>
            ${s.specialEvent ? `<div class="lad-event-tag">${s.specialEvent}</div>` : ''}
          </div>

          <!-- ĐƯỜNG PHÂN CÁCH TRUNG TÂM -->
          <div class="lad-divider">
            <div class="lad-divider-badge ${badgeClass}">${data.isHoangDao ? 'HOÀNG ĐẠO' : 'HẮC ĐẠO'}</div>
          </div>

          <!-- CỘT ÂM LỊCH -->
          <div class="lad-col lad-lunar-col">
            <div class="lad-col-label">ÂM LỊCH</div>
            <div class="lad-big-number lunar-num">${l.day}</div>
            <div class="lad-sub-date">Tháng ${l.month}${l.isLeap ? ' (Nhuận)' : ''} năm ${l.canChiYear}</div>
            <div class="lad-canchi-line">Ngày <strong>${l.canChiDay}</strong> - Tháng <strong>${l.canChiMonth}</strong></div>
            <div class="lad-status-tag ${badgeClass}">${badgeText}</div>
          </div>

          <!-- Nút ngày sau -->
          <button type="button" class="lad-nav-btn lad-next-btn" onclick="window.nextDayLichAmDuong()" title="Xem ngày sau">
            ›
          </button>
        </div>

        <!-- THANH NÚT CHUYỂN NHANH HÔM NAY -->
        <div class="lad-quick-actions">
          <button type="button" class="lad-action-btn" onclick="window.prevDayLichAmDuong()">◀ Hôm trước</button>
          <button type="button" class="lad-action-btn lad-btn-today" onclick="window.todayLichAmDuong()">★ Hôm nay</button>
          <button type="button" class="lad-action-btn" onclick="window.nextDayLichAmDuong()">Hôm sau ▶</button>
        </div>

        <!-- KHỐI THÔNG TIN CHI TIẾT CÁT HUNG CHUẨN 24H & TÀI LIỆU TIẾT KHÍ - MỆNH NGÀY -->
        <div class="lad-info-card">
          <!-- HÀNG MỆNH NGÀY (CẬP NHẬT ĐẦY ĐỦ NỘI DUNG THEO CAN CHI TỪ TIẾT KHÍ - MỆNH NGÀY.DOCX) -->
          <div class="lad-info-row lad-menh-row">
            <span class="lad-info-label">✦ Mệnh ngày:</span>
            <div class="lad-info-value">
              <span class="lad-menh-badge highlight-gold">${data.menhNgay} (${data.hanhNapAm})</span>
              ${data.menhChiTiet ? `
                <div class="lad-menh-detail-card">
                  ${data.menhChiTiet.tinhChat ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Tính chất ngày:</span> ${data.menhChiTiet.tinhChat}</div>` : ''}
                  ${data.menhChiTiet.tuongTacNguHanh ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Tương tác Ngũ hành:</span> ${data.menhChiTiet.tuongTacNguHanh}</div>` : ''}
                  ${data.menhChiTiet.tuongTacDiaChi ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Tương tác Địa Chi:</span> ${data.menhChiTiet.tuongTacDiaChi}</div>` : ''}
                  ${data.menhChiTiet.kyTuoi ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Kỵ tuổi:</span> ${data.menhChiTiet.kyTuoi}</div>` : ''}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- HÀNG TIẾT KHÍ (TÍNH CHUẨN XÁC THEO NGÀY DƯƠNG LỊCH TỪ TIẾT KHÍ - MỆNH NGÀY.DOCX) -->
          <div class="lad-info-row lad-tietkhi-row">
            <span class="lad-info-label">✦ Tiết khí:</span>
            <div class="lad-info-value">
              <span class="lad-tietkhi-badge">${data.tietKhi}</span>
              <span class="lad-tietkhi-mua">(${data.tietKhiMua})</span>
              <div class="lad-tietkhi-desc">
                <div>• <strong>Khởi tiết:</strong> ${data.tietKhiKhoiTiet}</div>
                <div>• <strong>Tiết khí tháng ${s.monthStr}:</strong> ${data.tietKhiThang}</div>
              </div>
            </div>
          </div>

          <div class="lad-info-row">
            <span class="lad-info-label">✦ Giờ hoàng đạo:</span>
            <span class="lad-info-value gio-hoang-dao">${data.gioHoangDao}</span>
          </div>
          <div class="lad-info-row">
            <span class="lad-info-label">✦ Giờ hắc đạo:</span>
            <span class="lad-info-value gio-hac-dao">${data.gioHacDao}</span>
          </div>
          <div class="lad-info-row">
            <span class="lad-info-label">✦ Tuổi xung:</span>
            <span class="lad-info-value">${data.tuoiXung}</span>
          </div>
          <div class="lad-info-row">
            <span class="lad-info-label">✦ Hướng xuất hành:</span>
            <span class="lad-info-value">
              Hỷ Thần: <strong>${data.huong.hy}</strong> &nbsp;|&nbsp; 
              Tài Thần: <strong>${data.huong.tai}</strong> &nbsp;|&nbsp; 
              Hạc Thần: <strong>${data.huong.hac}</strong>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * ĐIỀU KHIỂN & CÁC HÀM CÔNG CỘNG (PUBLIC API)
   */
  function hienThiNgay(d, m, y) {
    currentDate = new Date(y, m - 1, d);
    const data = tinhToanLichAmDuong(d, m, y);
    if (data) {
      renderLichAmDuong(data);
    }
  }

  function prevDay() {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    hienThiNgay(prev.getDate(), prev.getMonth() + 1, prev.getFullYear());
    if (window.LICH_THANG && typeof window.LICH_THANG.highlightNgay === 'function') {
      window.LICH_THANG.highlightNgay(prev.getDate(), prev.getMonth() + 1, prev.getFullYear());
    }
  }

  function nextDay() {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    hienThiNgay(next.getDate(), next.getMonth() + 1, next.getFullYear());
    if (window.LICH_THANG && typeof window.LICH_THANG.highlightNgay === 'function') {
      window.LICH_THANG.highlightNgay(next.getDate(), next.getMonth() + 1, next.getFullYear());
    }
  }

  function today() {
    const now = new Date();
    hienThiNgay(now.getDate(), now.getMonth() + 1, now.getFullYear());
    if (window.LICH_THANG && typeof window.LICH_THANG.loadThang === 'function') {
      window.LICH_THANG.loadThang(now.getMonth() + 1, now.getFullYear(), now.getDate());
    }
  }

  /**
   * GIAO DIỆN: RENDER KHUNG LỊCH ÂM HÔM NAY (CHUẨN BAN ĐẦU - ẢNH 1)
   */
  let currentDateHomNay = new Date();

  function renderLichHomNay(data) {
    const container = document.getElementById('box_lich_hom_nay');
    if (!container || !data) return;

    const s = data.solar;
    const l = data.lunar;
    const badgeClass = data.isHoangDao ? 'badge-hoangdao' : 'badge-hacdao';
    const badgeText = data.isHoangDao 
      ? `<span class="lad-tag-title">Ngày Hoàng Đạo</span> <span class="lad-tag-desc">(${data.starName})</span>` 
      : `<span class="lad-tag-title">Ngày Hắc Đạo</span> <span class="lad-tag-desc">(${data.starName})</span>`;

    container.innerHTML = `
      <div class="lad-card-wrapper">
        <!-- HEADER CỦA BOX LỊCH ÂM DƯƠNG BAN ĐẦU -->
        <div class="lad-header-bar">
          <div class="lad-header-title">
            <span class="lad-header-icon">📅</span>
            <span>LỊCH ÂM DƯƠNG NGÀY ${s.dayStr}/${s.monthStr}/${s.year}</span>
          </div>
          <div class="lad-quick-picker-btn" onclick="window.moPopupChonNgayLichAmDuong()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Xem nhanh theo ngày
          </div>
        </div>

        <!-- KHUNG SONG LỊCH DƯƠNG - ÂM CHUẨN 24H -->
        <div class="lad-dual-box">
          <!-- Nút ngày trước -->
          <button type="button" class="lad-nav-btn lad-prev-btn" onclick="window.prevDayLichHomNay()" title="Xem ngày trước">
            ‹
          </button>

          <!-- CỘT DƯƠNG LỊCH -->
          <div class="lad-col lad-solar-col">
            <div class="lad-col-label">DƯƠNG LỊCH</div>
            <div class="lad-big-number solar-num">${s.dayStr}</div>
            <div class="lad-sub-date">Tháng ${s.monthStr} năm ${s.year}</div>
            <div class="lad-day-of-week">${s.dayOfWeek}</div>
            ${s.specialEvent ? `<div class="lad-event-tag">${s.specialEvent}</div>` : ''}
          </div>

          <!-- ĐƯỜNG PHÂN CÁCH TRUNG TÂM -->
          <div class="lad-divider">
            <div class="lad-divider-badge ${badgeClass}">${data.isHoangDao ? 'HOÀNG ĐẠO' : 'HẮC ĐẠO'}</div>
          </div>

          <!-- CỘT ÂM LỊCH -->
          <div class="lad-col lad-lunar-col">
            <div class="lad-col-label">ÂM LỊCH</div>
            <div class="lad-big-number lunar-num">${l.day}</div>
            <div class="lad-sub-date">Tháng ${l.month}${l.isLeap ? ' (Nhuận)' : ''} năm ${l.canChiYear}</div>
            <div class="lad-canchi-line">Ngày <strong>${l.canChiDay}</strong> - Tháng <strong>${l.canChiMonth}</strong></div>
            <div class="lad-status-tag ${badgeClass}">${badgeText}</div>
          </div>

          <!-- Nút ngày sau -->
          <button type="button" class="lad-nav-btn lad-next-btn" onclick="window.nextDayLichHomNay()" title="Xem ngày sau">
            ›
          </button>
        </div>

        <!-- THANH NÚT CHUYỂN NHANH HÔM NAY (CHUẨN BAN ĐẦU) -->
        <div class="lad-quick-actions">
          <button type="button" class="lad-action-btn" onclick="window.prevDayLichHomNay()">◀ Hôm trước</button>
          <button type="button" class="lad-action-btn lad-btn-today" onclick="window.todayLichHomNay()">★ Hôm nay</button>
          <button type="button" class="lad-action-btn" onclick="window.nextDayLichHomNay()">Hôm sau ▶</button>
        </div>

        <!-- KHỐI THÔNG TIN CHI TIẾT CÁT HUNG CHUẨN 24H & TÀI LIỆU TIẾT KHÍ - MỆNH NGÀY -->
        <div class="lad-info-card">
          <!-- HÀNG MỆNH NGÀY -->
          <div class="lad-info-row lad-menh-row">
            <span class="lad-info-label">✦ Mệnh ngày:</span>
            <div class="lad-info-value">
              <span class="lad-menh-badge highlight-gold">${data.menhNgay} (${data.hanhNapAm})</span>
              ${data.menhChiTiet ? `
                <div class="lad-menh-detail-card">
                  ${data.menhChiTiet.tinhChat ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Tính chất ngày:</span> ${data.menhChiTiet.tinhChat}</div>` : ''}
                  ${data.menhChiTiet.tuongTacNguHanh ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Tương tác Ngũ hành:</span> ${data.menhChiTiet.tuongTacNguHanh}</div>` : ''}
                  ${data.menhChiTiet.tuongTacDiaChi ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Tương tác Địa Chi:</span> ${data.menhChiTiet.tuongTacDiaChi}</div>` : ''}
                  ${data.menhChiTiet.kyTuoi ? `<div class="lad-detail-line"><span class="lad-detail-tag">• Kỵ tuổi:</span> ${data.menhChiTiet.kyTuoi}</div>` : ''}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- HÀNG TIẾT KHÍ -->
          <div class="lad-info-row lad-tietkhi-row">
            <span class="lad-info-label">✦ Tiết khí:</span>
            <div class="lad-info-value">
              <span class="lad-tietkhi-badge">${data.tietKhi}</span>
              <span class="lad-tietkhi-mua">(${data.tietKhiMua})</span>
              <div class="lad-tietkhi-desc">
                <div>• <strong>Khởi tiết:</strong> ${data.tietKhiKhoiTiet}</div>
                <div>• <strong>Tiết khí tháng ${s.monthStr}:</strong> ${data.tietKhiThang}</div>
              </div>
            </div>
          </div>

          <div class="lad-info-row">
            <span class="lad-info-label">✦ Giờ hoàng đạo:</span>
            <span class="lad-info-value gio-hoang-dao">${data.gioHoangDao}</span>
          </div>
          <div class="lad-info-row">
            <span class="lad-info-label">✦ Giờ hắc đạo:</span>
            <span class="lad-info-value gio-hac-dao">${data.gioHacDao}</span>
          </div>
          <div class="lad-info-row">
            <span class="lad-info-label">✦ Tuổi xung:</span>
            <span class="lad-info-value">${data.tuoiXung}</span>
          </div>
          <div class="lad-info-row">
            <span class="lad-info-label">✦ Hướng xuất hành:</span>
            <span class="lad-info-value">
              Hỷ Thần: <strong>${data.huong.hy}</strong> &nbsp;|&nbsp; 
              Tài Thần: <strong>${data.huong.tai}</strong> &nbsp;|&nbsp; 
              Hạc Thần: <strong>${data.huong.hac}</strong>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function hienThiLichHomNay(d, m, y) {
    if (!d || !m || !y) {
      const now = new Date();
      d = now.getDate();
      m = now.getMonth() + 1;
      y = now.getFullYear();
    }
    currentDateHomNay = new Date(y, m - 1, d);
    const data = tinhToanLichAmDuong(d, m, y);
    if (data) {
      renderLichHomNay(data);
    }
  }

  function prevDayLichHomNay() {
    const prev = new Date(currentDateHomNay);
    prev.setDate(prev.getDate() - 1);
    hienThiLichHomNay(prev.getDate(), prev.getMonth() + 1, prev.getFullYear());
  }

  function nextDayLichHomNay() {
    const next = new Date(currentDateHomNay);
    next.setDate(next.getDate() + 1);
    hienThiLichHomNay(next.getDate(), next.getMonth() + 1, next.getFullYear());
  }

  function todayLichHomNay() {
    const now = new Date();
    hienThiLichHomNay(now.getDate(), now.getMonth() + 1, now.getFullYear());
  }

  /**
   * POPUP MODAL CHỌN NHANH NGÀY THÁNG NĂM
   */
  function capNhatSoNgayTrongModal() {
    const selDay = document.getElementById('lad-sel-day');
    const selMonth = document.getElementById('lad-sel-month');
    const selYear = document.getElementById('lad-sel-year');
    if (!selDay || !selMonth || !selYear) return;

    const m = parseInt(selMonth.value, 10) || (currentDate.getMonth() + 1);
    const y = parseInt(selYear.value, 10) || currentDate.getFullYear();
    const curVal = parseInt(selDay.value, 10) || currentDate.getDate();
    const maxDays = new Date(y, m, 0).getDate();

    selDay.innerHTML = '';
    for (let i = 1; i <= maxDays; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i < 10 ? '0' + i : '' + i;
      selDay.appendChild(opt);
    }
    selDay.value = curVal <= maxDays ? curVal : maxDays;
  }

  function khoiTaoModalSelects() {
    const selDay = document.getElementById('lad-sel-day');
    const selMonth = document.getElementById('lad-sel-month');
    const selYear = document.getElementById('lad-sel-year');
    if (!selDay || !selMonth || !selYear) return;

    if (selMonth.options.length === 0) {
      for (let i = 1; i <= 12; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = 'Tháng ' + (i < 10 ? '0' + i : '' + i);
        selMonth.appendChild(opt);
      }
      selMonth.addEventListener('change', capNhatSoNgayTrongModal);
    }
    if (selYear.options.length === 0) {
      const curYear = new Date().getFullYear();
      for (let i = curYear - 60; i <= curYear + 60; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = 'Năm ' + i;
        selYear.appendChild(opt);
      }
      selYear.addEventListener('change', capNhatSoNgayTrongModal);
    }
    if (selDay.options.length === 0) {
      capNhatSoNgayTrongModal();
    }
  }

  function moPopupChonNgay() {
    const modal = document.getElementById('lad-quick-modal');
    if (!modal) return;
    khoiTaoModalSelects();

    const d = currentDate.getDate();
    const m = currentDate.getMonth() + 1;
    const y = currentDate.getFullYear();

    const selDay = document.getElementById('lad-sel-day');
    const selMonth = document.getElementById('lad-sel-month');
    const selYear = document.getElementById('lad-sel-year');
    if (selYear) selYear.value = y;
    if (selMonth) selMonth.value = m;
    capNhatSoNgayTrongModal();
    if (selDay) selDay.value = d;

    modal.classList.add('show');
    modal.style.display = 'flex';

    modal.onclick = function (e) {
      if (e.target === modal) {
        dongPopupChonNgay();
      }
    };
  }

  function dongPopupChonNgay() {
    const modal = document.getElementById('lad-quick-modal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  function xacNhanChonNgay() {
    const selDay = document.getElementById('lad-sel-day');
    const selMonth = document.getElementById('lad-sel-month');
    const selYear = document.getElementById('lad-sel-year');
    if (!selDay || !selMonth || !selYear) return;

    const d = parseInt(selDay.value, 10);
    const m = parseInt(selMonth.value, 10);
    const y = parseInt(selYear.value, 10);

    hienThiNgay(d, m, y);
    hienThiLichHomNay(d, m, y);
    dongPopupChonNgay();

    if (window.LICH_THANG && typeof window.LICH_THANG.loadThang === 'function') {
      window.LICH_THANG.loadThang(m, y, d);
    }
    if (typeof window.chonNgayTrachNhatTuLichThang === 'function') {
      window.chonNgayTrachNhatTuLichThang(d, m, y);
    }
  }

  function init() {
    khoiTaoModalSelects();
    const now = new Date();
    hienThiNgay(now.getDate(), now.getMonth() + 1, now.getFullYear());
    hienThiLichHomNay(now.getDate(), now.getMonth() + 1, now.getFullYear());
  }

  // Xuất API công cộng cho trang web
  window.LICH_AM_DUONG = {
    init: init,
    hienThiNgay: hienThiNgay,
    hienThiLichHomNay: hienThiLichHomNay,
    prevDay: prevDay,
    nextDay: nextDay,
    today: today,
    prevDayHomNay: prevDayLichHomNay,
    nextDayHomNay: nextDayLichHomNay,
    todayHomNay: todayLichHomNay,
    moPopupChonNgay: moPopupChonNgay,
    dongPopupChonNgay: dongPopupChonNgay,
    xacNhanChonNgay: xacNhanChonNgay,
    chuyenCheDoTraCuu: chuyenCheDoTraCuu,
    capNhatSoNgayTraCuu: capNhatSoNgayTraCuuLichAmDuong,
    xuLyTraCuu: xuLyTraCuuLichAmDuong,
    layTietKhiTheoNgayDuong: layTietKhiTheoNgayDuong,
    MENH_NGAY_60_DATA: MENH_NGAY_60_DATA
  };

  window.prevDayLichAmDuong = prevDay;
  window.nextDayLichAmDuong = nextDay;
  window.todayLichAmDuong = today;
  window.hienThiLichHomNay = hienThiLichHomNay;
  window.prevDayLichHomNay = prevDayLichHomNay;
  window.nextDayLichHomNay = nextDayLichHomNay;
  window.todayLichHomNay = todayLichHomNay;
  window.moPopupChonNgayLichAmDuong = moPopupChonNgay;
  window.dongPopupChonNgayLichAmDuong = dongPopupChonNgay;
  window.xacNhanChonNgayQuick = xacNhanChonNgay;
  window.chuyenCheDoTraCuu = chuyenCheDoTraCuu;
  window.capNhatSoNgayTraCuuLichAmDuong = capNhatSoNgayTraCuuLichAmDuong;
  window.xuLyTraCuuLichAmDuong = xuLyTraCuuLichAmDuong;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 50);
    });
  } else {
    setTimeout(init, 50);
  }

})(window);