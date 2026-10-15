/**
 * ==========================================================================
 * BOISIM_ENGINE.JS - HỆ THỐNG CHẤM ĐIỂM & LUẬN GIẢI PHONG THỦY SIM SỐ
 * Chuẩn phương pháp 5 tiêu chí: Âm Dương, Ngũ Hành, Kinh Dịch, Cửu Tinh, Dân Gian
 * Tương thích chuẩn xác công thức phongthuyso.vn
 * ==========================================================================
 */

(function(window) {
  'use strict';

  // 1. DỮ LIỆU 60 LỤC THẬP HOA GIÁP (% 60 CỦA 5 CẶP SỐ)
  const HOA_GIAP_60 = [
    { id: 1, name: "Giáp Tý", can: "Giáp", chi: "Tý", canChiNguHanh: "Mộc - Thủy", napAm: "Hải Trung Kim", hanhNapAm: "Kim" },
    { id: 2, name: "Ất Sửu", can: "Ất", chi: "Sửu", canChiNguHanh: "Mộc - Thổ", napAm: "Hải Trung Kim", hanhNapAm: "Kim" },
    { id: 3, name: "Bính Dần", can: "Bính", chi: "Dần", canChiNguHanh: "Hỏa - Mộc", napAm: "Lư Trung Hỏa", hanhNapAm: "Hỏa" },
    { id: 4, name: "Đinh Mão", can: "Đinh", chi: "Mão", canChiNguHanh: "Hỏa - Mộc", napAm: "Lư Trung Hỏa", hanhNapAm: "Hỏa" },
    { id: 5, name: "Mậu Thìn", can: "Mậu", chi: "Thìn", canChiNguHanh: "Thổ - Thổ", napAm: "Đại Lâm Mộc", hanhNapAm: "Mộc" },
    { id: 6, name: "Kỷ Tỵ", can: "Kỷ", chi: "Tỵ", canChiNguHanh: "Thổ - Hỏa", napAm: "Đại Lâm Mộc", hanhNapAm: "Mộc" },
    { id: 7, name: "Canh Ngọ", can: "Canh", chi: "Ngọ", canChiNguHanh: "Kim - Hỏa", napAm: "Lộ Bàng Thổ", hanhNapAm: "Thổ" },
    { id: 8, name: "Tân Mùi", can: "Tân", chi: "Mùi", canChiNguHanh: "Kim - Thổ", napAm: "Lộ Bàng Thổ", hanhNapAm: "Thổ" },
    { id: 9, name: "Nhâm Thân", can: "Nhâm", chi: "Thân", canChiNguHanh: "Thủy - Kim", napAm: "Kiếm Phong Kim", hanhNapAm: "Kim" },
    { id: 10, name: "Quý Dậu", can: "Quý", chi: "Dậu", canChiNguHanh: "Thủy - Kim", napAm: "Kiếm Phong Kim", hanhNapAm: "Kim" },
    { id: 11, name: "Giáp Tuất", can: "Giáp", chi: "Tuất", canChiNguHanh: "Mộc - Thổ", napAm: "Sơn Đầu Hỏa", hanhNapAm: "Hỏa" },
    { id: 12, name: "Ất Hợi", can: "Ất", chi: "Hợi", canChiNguHanh: "Mộc - Thủy", napAm: "Sơn Đầu Hỏa", hanhNapAm: "Hỏa" },
    { id: 13, name: "Bính Tý", can: "Bính", chi: "Tý", canChiNguHanh: "Hỏa - Thủy", napAm: "Giản Hạ Thủy", hanhNapAm: "Thủy" },
    { id: 14, name: "Đinh Sửu", can: "Đinh", chi: "Sửu", canChiNguHanh: "Hỏa - Thổ", napAm: "Giản Hạ Thủy", hanhNapAm: "Thủy" },
    { id: 15, name: "Mậu Dần", can: "Mậu", chi: "Dần", canChiNguHanh: "Thổ - Mộc", napAm: "Thành Đầu Thổ", hanhNapAm: "Thổ" },
    { id: 16, name: "Kỷ Mão", can: "Kỷ", chi: "Mão", canChiNguHanh: "Thổ - Mộc", napAm: "Thành Đầu Thổ", hanhNapAm: "Thổ" },
    { id: 17, name: "Canh Thìn", can: "Canh", chi: "Thìn", canChiNguHanh: "Kim - Thổ", napAm: "Bạch Lạp Kim", hanhNapAm: "Kim" },
    { id: 18, name: "Tân Tỵ", can: "Tân", chi: "Tỵ", canChiNguHanh: "Kim - Hỏa", napAm: "Bạch Lạp Kim", hanhNapAm: "Kim" },
    { id: 19, name: "Nhâm Ngọ", can: "Nhâm", chi: "Ngọ", canChiNguHanh: "Thủy - Hỏa", napAm: "Dương Liễu Mộc", hanhNapAm: "Mộc" },
    { id: 20, name: "Quý Mùi", can: "Quý", chi: "Mùi", canChiNguHanh: "Thủy - Thổ", napAm: "Dương Liễu Mộc", hanhNapAm: "Mộc" },
    { id: 21, name: "Giáp Thân", can: "Giáp", chi: "Thân", canChiNguHanh: "Mộc - Kim", napAm: "Tuyền Trung Thủy", hanhNapAm: "Thủy" },
    { id: 22, name: "Ất Dậu", can: "Ất", chi: "Dậu", canChiNguHanh: "Mộc - Kim", napAm: "Tuyền Trung Thủy", hanhNapAm: "Thủy" },
    { id: 23, name: "Bính Tuất", can: "Bính", chi: "Tuất", canChiNguHanh: "Hỏa - Thổ", napAm: "Ốc Thượng Thổ", hanhNapAm: "Thổ" },
    { id: 24, name: "Đinh Hợi", can: "Đinh", chi: "Hợi", canChiNguHanh: "Hỏa - Thủy", napAm: "Ốc Thượng Thổ", hanhNapAm: "Thổ" },
    { id: 25, name: "Mậu Tý", can: "Mậu", chi: "Tý", canChiNguHanh: "Thổ - Thủy", napAm: "Tích Lịch Hỏa", hanhNapAm: "Hỏa" },
    { id: 26, name: "Kỷ Sửu", can: "Kỷ", chi: "Sửu", canChiNguHanh: "Thổ - Thổ", napAm: "Tích Lịch Hỏa", hanhNapAm: "Hỏa" },
    { id: 27, name: "Canh Dần", can: "Canh", chi: "Dần", canChiNguHanh: "Kim - Mộc", napAm: "Tùng Bách Mộc", hanhNapAm: "Mộc" },
    { id: 28, name: "Tân Mão", can: "Tân", chi: "Mão", canChiNguHanh: "Kim - Mộc", napAm: "Tùng Bách Mộc", hanhNapAm: "Mộc" },
    { id: 29, name: "Nhâm Thìn", can: "Nhâm", chi: "Thìn", canChiNguHanh: "Thủy - Thổ", napAm: "Trường Lưu Thủy", hanhNapAm: "Thủy" },
    { id: 30, name: "Quý Tỵ", can: "Quý", chi: "Tỵ", canChiNguHanh: "Thủy - Hỏa", napAm: "Trường Lưu Thủy", hanhNapAm: "Thủy" },
    { id: 31, name: "Giáp Ngọ", can: "Giáp", chi: "Ngọ", canChiNguHanh: "Mộc - Hỏa", napAm: "Sa Trung Kim", hanhNapAm: "Kim" },
    { id: 32, name: "Ất Mùi", can: "Ất", chi: "Mùi", canChiNguHanh: "Mộc - Thổ", napAm: "Sa Trung Kim", hanhNapAm: "Kim" },
    { id: 33, name: "Bính Thân", can: "Bính", chi: "Thân", canChiNguHanh: "Hỏa - Kim", napAm: "Sơn Hạ Hỏa", hanhNapAm: "Hỏa" },
    { id: 34, name: "Đinh Dậu", can: "Đinh", chi: "Dậu", canChiNguHanh: "Hỏa - Kim", napAm: "Sơn Hạ Hỏa", hanhNapAm: "Hỏa" },
    { id: 35, name: "Mậu Tuất", can: "Mậu", chi: "Tuất", canChiNguHanh: "Thổ - Thổ", napAm: "Bình Địa Mộc", hanhNapAm: "Mộc" },
    { id: 36, name: "Kỷ Hợi", can: "Kỷ", chi: "Hợi", canChiNguHanh: "Thổ - Thủy", napAm: "Bình Địa Mộc", hanhNapAm: "Mộc" },
    { id: 37, name: "Canh Tý", can: "Canh", chi: "Tý", canChiNguHanh: "Kim - Thủy", napAm: "Bích Thượng Thổ", hanhNapAm: "Thổ" },
    { id: 38, name: "Tân Sửu", can: "Tân", chi: "Sửu", canChiNguHanh: "Kim - Thổ", napAm: "Bích Thượng Thổ", hanhNapAm: "Thổ" },
    { id: 39, name: "Nhâm Dần", can: "Nhâm", chi: "Dần", canChiNguHanh: "Thủy - Mộc", napAm: "Kim Bạch Kim", hanhNapAm: "Kim" },
    { id: 40, name: "Quý Mão", can: "Quý", chi: "Mão", canChiNguHanh: "Thủy - Mộc", napAm: "Kim Bạch Kim", hanhNapAm: "Kim" },
    { id: 41, name: "Giáp Thìn", can: "Giáp", chi: "Thìn", canChiNguHanh: "Mộc - Thổ", napAm: "Phú Đăng Hỏa", hanhNapAm: "Hỏa" },
    { id: 42, name: "Ất Tỵ", can: "Ất", chi: "Tỵ", canChiNguHanh: "Mộc - Hỏa", napAm: "Phú Đăng Hỏa", hanhNapAm: "Hỏa" },
    { id: 43, name: "Bính Ngọ", can: "Bính", chi: "Ngọ", canChiNguHanh: "Hỏa - Hỏa", napAm: "Thiên Hà Thủy", hanhNapAm: "Thủy" },
    { id: 44, name: "Đinh Mùi", can: "Đinh", chi: "Mùi", canChiNguHanh: "Hỏa - Thổ", napAm: "Thiên Hà Thủy", hanhNapAm: "Thủy" },
    { id: 45, name: "Mậu Thân", can: "Mậu", chi: "Thân", canChiNguHanh: "Thổ - Kim", napAm: "Đại Trạch Thổ", hanhNapAm: "Thổ" },
    { id: 46, name: "Kỷ Dậu", can: "Kỷ", chi: "Dậu", canChiNguHanh: "Thổ - Kim", napAm: "Đại Trạch Thổ", hanhNapAm: "Thổ" },
    { id: 47, name: "Canh Tuất", can: "Canh", chi: "Tuất", canChiNguHanh: "Kim - Thổ", napAm: "Thoa Xuyến Kim", hanhNapAm: "Kim" },
    { id: 48, name: "Tân Hợi", can: "Tân", chi: "Hợi", canChiNguHanh: "Kim - Thủy", napAm: "Thoa Xuyến Kim", hanhNapAm: "Kim" },
    { id: 49, name: "Nhâm Tý", can: "Nhâm", chi: "Tý", canChiNguHanh: "Thủy - Thủy", napAm: "Tang Đố Mộc", hanhNapAm: "Mộc" },
    { id: 50, name: "Quý Sửu", can: "Quý", chi: "Sửu", canChiNguHanh: "Thủy - Thổ", napAm: "Tang Đố Mộc", hanhNapAm: "Mộc" },
    { id: 51, name: "Giáp Dần", can: "Giáp", chi: "Dần", canChiNguHanh: "Mộc - Mộc", napAm: "Đại Khê Thủy", hanhNapAm: "Thủy" },
    { id: 52, name: "Ất Mão", can: "Ất", chi: "Mão", canChiNguHanh: "Mộc - Mộc", napAm: "Đại Khê Thủy", hanhNapAm: "Thủy" },
    { id: 53, name: "Bính Thìn", can: "Bính", chi: "Thìn", canChiNguHanh: "Hỏa - Thổ", napAm: "Sa Trung Thổ", hanhNapAm: "Thổ" },
    { id: 54, name: "Đinh Tỵ", can: "Đinh", chi: "Tỵ", canChiNguHanh: "Hỏa - Hỏa", napAm: "Sa Trung Thổ", hanhNapAm: "Thổ" },
    { id: 55, name: "Mậu Ngọ", can: "Mậu", chi: "Ngọ", canChiNguHanh: "Thổ - Hỏa", napAm: "Thiên Thượng Hỏa", hanhNapAm: "Hỏa" },
    { id: 56, name: "Kỷ Mùi", can: "Kỷ", chi: "Mùi", canChiNguHanh: "Thổ - Thổ", napAm: "Thiên Thượng Hỏa", hanhNapAm: "Hỏa" },
    { id: 57, name: "Canh Thân", can: "Canh", chi: "Thân", canChiNguHanh: "Kim - Kim", napAm: "Thạch Lựu Mộc", hanhNapAm: "Mộc" },
    { id: 58, name: "Tân Dậu", can: "Tân", chi: "Dậu", canChiNguHanh: "Kim - Kim", napAm: "Thạch Lựu Mộc", hanhNapAm: "Mộc" },
    { id: 59, name: "Nhâm Tuất", can: "Nhâm", chi: "Tuất", canChiNguHanh: "Thủy - Thổ", napAm: "Đại Hải Thủy", hanhNapAm: "Thủy" },
    { id: 60, name: "Quý Hợi", can: "Quý", chi: "Hợi", canChiNguHanh: "Thủy - Thủy", napAm: "Đại Hải Thủy", hanhNapAm: "Thủy" }
  ];

  // Bát Quái Tiên Thiên: 1 Càn, 2 Đoài, 3 Ly, 4 Chấn, 5 Tốn, 6 Khảm, 7 Cấn, 8 Khôn
  const QUAI_NAME = { 1: "Càn", 2: "Đoài", 3: "Ly", 4: "Chấn", 5: "Tốn", 6: "Khảm", 7: "Cấn", 8: "Khôn" };
  const QUAI_TUONG = { 1: "Thiên", 2: "Trạch", 3: "Hỏa", 4: "Lôi", 5: "Phong", 6: "Thủy", 7: "Sơn", 8: "Địa" };
  const QUAI_HAOS = {
    1: [1, 1, 1], // Càn
    2: [1, 1, 0], // Đoài
    3: [1, 0, 1], // Ly
    4: [1, 0, 0], // Chấn
    5: [0, 1, 1], // Tốn
    6: [0, 1, 0], // Khảm
    7: [0, 0, 1], // Cấn
    8: [0, 0, 0]  // Khôn
  };

  // Bảng quy ước ngũ hành từng con số theo Bát Quái Lạc Thư chuẩn ảnh người dùng cung cấp:
  // 1 Là Quẻ Khảm Thuộc Thủy
  // 2 Là Quẻ Cấn Thuộc Thổ
  // 5 Trung Cung Thuộc thổ
  // 8 Là Quẻ Khôn Thuộc Thổ
  // 6 Là Quẻ Càn Thuộc Kim
  // 7 Là Quẻ Đoài Thuộc Kim
  // 9 Là Quẻ Ly Thuộc Hỏa
  // (3, 4 Là Quẻ Chấn, Tốn Thuộc Mộc • 0 Thuộc Thủy)
  const BAT_QUAI_QUY_UOC = {
    '1': { que: 'Quẻ Khảm', hanh: 'Thủy', text: '1 Là Quẻ Khảm Thuộc Thủy' },
    '2': { que: 'Quẻ Cấn', hanh: 'Thổ', text: '2 Là Quẻ Cấn Thuộc Thổ' },
    '3': { que: 'Quẻ Chấn', hanh: 'Mộc', text: '3 Là Quẻ Chấn Thuộc Mộc' },
    '4': { que: 'Quẻ Tốn', hanh: 'Mộc', text: '4 Là Quẻ Tốn Thuộc Mộc' },
    '5': { que: 'Trung Cung', hanh: 'Thổ', text: '5 Trung Cung Thuộc thổ' },
    '6': { que: 'Quẻ Càn', hanh: 'Kim', text: '6 Là Quẻ Càn Thuộc Kim' },
    '7': { que: 'Quẻ Đoài', hanh: 'Kim', text: '7 Là Quẻ Đoài Thuộc Kim' },
    '8': { que: 'Quẻ Khôn', hanh: 'Thổ', text: '8 Là Quẻ Khôn Thuộc Thổ' },
    '9': { que: 'Quẻ Ly', hanh: 'Hỏa', text: '9 Là Quẻ Ly Thuộc Hỏa' },
    '0': { que: 'Quẻ Khảm', hanh: 'Thủy', text: '0 Thuộc Thủy' }
  };

  // BẢNG NGŨ HÀNH CỦA DÃY SỐ (SỰ SINH KHẮC CỦA DÃY SỐ CHUẨN ẢNH 2):
  // 0: Thủy - | 1: Mộc + | 2: Mộc - | 3: Hỏa + | 4: Hỏa -
  // 5: Thổ + | 6: Thổ - | 7: Kim + | 8: Kim - | 9: Thủy +
  const BANG_NGU_HANH_DAY_SO = {
    '0': { hanh: 'Thủy', amDuong: '-', text: 'Thủy -' },
    '1': { hanh: 'Mộc', amDuong: '+', text: 'Mộc +' },
    '2': { hanh: 'Mộc', amDuong: '-', text: 'Mộc -' },
    '3': { hanh: 'Hỏa', amDuong: '+', text: 'Hỏa +' },
    '4': { hanh: 'Hỏa', amDuong: '-', text: 'Hỏa -' },
    '5': { hanh: 'Thổ', amDuong: '+', text: 'Thổ +' },
    '6': { hanh: 'Thổ', amDuong: '-', text: 'Thổ -' },
    '7': { hanh: 'Kim', amDuong: '+', text: 'Kim +' },
    '8': { hanh: 'Kim', amDuong: '-', text: 'Kim -' },
    '9': { hanh: 'Thủy', amDuong: '+', text: 'Thủy +' }
  };

  // BẢNG TÍNH CAN CHI TÀNG ẨN (CHUẨN ẢNH 2):
  // 12 Địa Chi và các Can tàng chứa tương ứng kèm ngũ hành
  const DIA_CHI_TANG_CAN = {
    'Tý':  [ { can: 'Quý', hanh: 'Thủy', color: '#111827' } ],
    'Sửu': [ { can: 'Kỷ', hanh: 'Thổ', color: '#D97706' }, { can: 'Tân', hanh: 'Kim', color: '#71717A' }, { can: 'Quý', hanh: 'Thủy', color: '#111827' } ],
    'Dần': [ { can: 'Giáp', hanh: 'Mộc', color: '#16A34A' }, { can: 'Bính', hanh: 'Hỏa', color: '#DC2626' }, { can: 'Mậu', hanh: 'Thổ', color: '#D97706' } ],
    'Mão': [ { can: 'Ất', hanh: 'Mộc', color: '#16A34A' } ],
    'Thìn': [ { can: 'Mậu', hanh: 'Thổ', color: '#D97706' }, { can: 'Ất', hanh: 'Mộc', color: '#16A34A' }, { can: 'Quý', hanh: 'Thủy', color: '#111827' } ],
    'Tỵ':  [ { can: 'Bính', hanh: 'Hỏa', color: '#DC2626' }, { can: 'Canh', hanh: 'Kim', color: '#71717A' }, { can: 'Mậu', hanh: 'Thổ', color: '#D97706' } ],
    'Ngọ': [ { can: 'Đinh', hanh: 'Hỏa', color: '#DC2626' }, { can: 'Kỷ', hanh: 'Thổ', color: '#D97706' } ],
    'Mùi': [ { can: 'Kỷ', hanh: 'Thổ', color: '#D97706' }, { can: 'Ất', hanh: 'Mộc', color: '#16A34A' }, { can: 'Đinh', hanh: 'Hỏa', color: '#DC2626' } ],
    'Thân': [ { can: 'Canh', hanh: 'Kim', color: '#71717A' }, { can: 'Nhâm', hanh: 'Thủy', color: '#111827' }, { can: 'Mậu', hanh: 'Thổ', color: '#D97706' } ],
    'Dậu': [ { can: 'Tân', hanh: 'Kim', color: '#71717A' } ],
    'Tuất': [ { can: 'Mậu', hanh: 'Thổ', color: '#D97706' }, { can: 'Đinh', hanh: 'Hỏa', color: '#DC2626' }, { can: 'Tân', hanh: 'Kim', color: '#71717A' } ],
    'Hợi': [ { can: 'Nhâm', hanh: 'Thủy', color: '#111827' }, { can: 'Giáp', hanh: 'Mộc', color: '#16A34A' } ]
  };

  function normalizeChiName(c) {
    if (!c) return 'Tý';
    const lower = c.trim().toLowerCase();
    if (lower === 'tí' || lower === 'tý') return 'Tý';
    if (lower === 'tị' || lower === 'tỵ') return 'Tỵ';
    if (lower === 'sửu') return 'Sửu';
    if (lower === 'dần') return 'Dần';
    if (lower === 'mão') return 'Mão';
    if (lower === 'thìn') return 'Thìn';
    if (lower === 'ngọ') return 'Ngọ';
    if (lower === 'mùi') return 'Mùi';
    if (lower === 'thân') return 'Thân';
    if (lower === 'dậu') return 'Dậu';
    if (lower === 'tuất') return 'Tuất';
    if (lower === 'hợi') return 'Hợi';
    return c.trim();
  }

  function normalizeCanName(c) {
    if (!c) return 'Giáp';
    const lower = c.trim().toLowerCase();
    if (lower === 'giáp') return 'Giáp';
    if (lower === 'ất') return 'Ất';
    if (lower === 'bính') return 'Bính';
    if (lower === 'đinh') return 'Đinh';
    if (lower === 'mậu') return 'Mậu';
    if (lower === 'kỷ') return 'Kỷ';
    if (lower === 'canh') return 'Canh';
    if (lower === 'tân') return 'Tân';
    if (lower === 'nhâm') return 'Nhâm';
    if (lower === 'quý') return 'Quý';
    return c.trim();
  }

  // Ngũ hành từng con số theo Bát quái / Lạc thư
  const DIGIT_NGU_HANH = {
    '0': 'Thủy', '1': 'Thủy',
    '2': 'Thổ', '5': 'Thổ', '8': 'Thổ',
    '3': 'Mộc', '4': 'Mộc',
    '6': 'Kim', '7': 'Kim',
    '9': 'Hỏa'
  };

  // Quan hệ sinh khắc giữa 2 hành
  function getRelation(h1, h2) {
    if (!h1 || !h2) return 'bình';
    if (h1 === h2) return 'hòa';
    const sinhMap = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };
    const khacMap = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };
    if (sinhMap[h1] === h2 || sinhMap[h2] === h1) return 'sinh';
    if (khacMap[h1] === h2 || khacMap[h2] === h1) return 'khắc';
    return 'bình';
  }

  // 64 Quẻ Kinh Dịch tra cứu
  // Ma trận 8x8: Thượng quái (1..8), Hạ quái (1..8)
  const QUE_MATRIX = {
    "1-1": { so: 1, ten: "Thuần Càn", han: "Cát hanh", totCho: "Công danh, Sự nghiệp, Lãnh đạo", dichNghia: "Trời vận hành mạnh mẽ, người quân tử tự cường không ngừng nghỉ." },
    "8-8": { so: 2, ten: "Thuần Khôn", han: "Cát hanh", totCho: "Hậu phương, Kinh doanh bền vững", dichNghia: "Đất dày chở che, nhu thuận mà lợi trinh." },
    "6-4": { so: 3, ten: "Thủy Lôi Truân", han: "Bình", totCho: "Khởi nghiệp vượt khó", dichNghia: "Ban đầu gian nan, kiên định ắt thành công." },
    "7-6": { so: 4, ten: "Sơn Thủy Mông", han: "Bình", totCho: "Học tập, Rèn luyện trí tuệ", dichNghia: "Mới đầu còn mờ mịt, cần thầy hiền chỉ dạy." },
    "6-1": { so: 5, ten: "Thủy Thiên Nhu", han: "Hanh", totCho: "Chờ thời cơ, Tích lũy tài vận", dichNghia: "Chờ đợi cơ hội, giữ lòng chính thiện sẽ hanh thông." },
    "1-6": { so: 6, ten: "Thiên Thủy Tụng", han: "Hung", totCho: "Cẩn trọng pháp lý, Tranh chấp", dichNghia: "Có sự bất hòa, nên hòa giải chớ nên tranh đấu." },
    "8-6": { so: 7, ten: "Địa Thủy Sư", han: "Hanh", totCho: "Tổ chức, Đội nhóm, Quân cơ", dichNghia: "Kỷ luật nghiêm minh, việc lớn ắt thành." },
    "6-8": { so: 8, ten: "Thủy Địa Tỷ", han: "Cát", totCho: "Giao lưu, Hợp tác, Bạn bè", dichNghia: "Gắn bó thân tình, hòa hợp cùng tiến bộ." },
    "5-1": { so: 9, ten: "Phong Thiên Tiểu Súc", han: "Bình", totCho: "Tích tiểu thành đại", dichNghia: "Gió thổi trên trời, gom góp từng bước." },
    "1-2": { so: 10, ten: "Thiên Trạch Lý", han: "Cát", totCho: "Ứng xử, Ngoại giao, Thăng tiến", dichNghia: "Giẫm đuôi cọp mà không cắn, ứng đối khéo léo." },
    "8-1": { so: 11, ten: "Địa Thiên Thái", han: "Đại Cát", totCho: "Đại phát tài lộc, Hạnh phúc gia đạo", dichNghia: "Trời đất giao hòa, vạn vật thái bình hưng thịnh." },
    "1-8": { so: 12, ten: "Thiên Địa Bĩ", han: "Hung", totCho: "Đề phòng tiểu nhân, Thu mình chờ vận", dichNghia: "Trời đất không giao, bế tắc nên giữ mình." },
    "1-3": { so: 13, ten: "Thiên Hỏa Đồng Nhân", han: "Cát", totCho: "Đồng lòng hiệp lực, Kinh doanh", dichNghia: "Mọi người một lòng, vượt sông lớn dễ dàng." },
    "3-1": { so: 14, ten: "Hỏa Thiên Đại Hữu", han: "Đại Cát", totCho: "Tài vận cực vượng, Đỉnh cao sự nghiệp", dichNghia: "Mặt trời rực rỡ giữa trời, có phúc đức to lớn." },
    "8-7": { so: 15, ten: "Địa Sơn Khiêm", han: "Cát hanh", totCho: "Thu phục nhân tâm, Bình an", dichNghia: "Núi cao ở dưới đất, càng khiêm nhường càng phúc lớn." },
    "4-8": { so: 16, ten: "Lôi Địa Dự", han: "Hanh", totCho: "Khai trương, Hoan hỷ, Xuất hành", dichNghia: "Sấm động vui vẻ, lòng người hân hoan." },
    "2-4": { so: 17, ten: "Trạch Lôi Tùy", han: "Cát", totCho: "Thuận thời, Thích ứng, Buôn bán", dichNghia: "Thuận theo hoàn cảnh, giữ đúng đạo lý ắt cát." },
    "7-5": { so: 18, ten: "Sơn Phong Cổ", han: "Bình", totCho: "Cải cách, Sửa đổi khuyết điểm", dichNghia: "Việc đã hư hao, cần dũng cảm chấn chỉnh." },
    "8-2": { so: 19, ten: "Địa Trạch Lâm", han: "Cát", totCho: "Quan lộc, Giám sát, Quản lý", dichNghia: "Tiến đến gần gũi, mở rộng cơ nghiệp." },
    "5-8": { so: 20, ten: "Phong Địa Quan", han: "Bình", totCho: "Quan sát, Quy hoạch, Học hỏi", dichNghia: "Đứng cao trông rộng, lấy đức soi tỏ muôn người." },
    "3-4": { so: 21, ten: "Hỏa Lôi Phệ Hạp", han: "Hanh", totCho: "Thực thi kỷ luật, Giải quyết dứt điểm", dichNghia: "Cắn xé chướng ngại, công minh chính trực." },
    "7-3": { so: 22, ten: "Sơn Hỏa Bí", han: "Cát", totCho: "Văn hóa, Nghệ thuật, Xây dựng danh tiếng", dichNghia: "Lửa sáng chân núi, trang sức văn nhã." },
    "7-8": { so: 23, ten: "Sơn Địa Bác", han: "Hung", totCho: "Cẩn trọng suy vi, Giữ gìn thành quả", dichNghia: "Đất lở chân núi, nên thủ phận chớ hành động bốc đồng." },
    "8-4": { so: 24, ten: "Địa Lôi Phục", han: "Cát", totCho: "Phục hồi sinh khí, Bắt đầu lại", dichNghia: "Một hào dương trở lại, hanh thông dần dần." },
    "1-4": { so: 25, ten: "Thiên Lôi Vô Vọng", han: "Cát hanh", totCho: "Hành động chân thật, Bình an", dichNghia: "Không mưu toan gian trá, thuận tự nhiên ắt tốt." },
    "7-1": { so: 26, ten: "Sơn Thiên Đại Súc", han: "Cát", totCho: "Tích tụ tài lộc lớn, Học vấn", dichNghia: "Chứa đựng đức lớn, nuôi dưỡng chí bền." },
    "7-4": {
      so: 27,
      ten: "Sơn Lôi Di",
      chuHan: "頤 yí",
      han: "Cát hanh",
      totCho: "Công danh sự nghiệp, Tài vận - Tài lộc",
      loiKinh: "頤 : 貞 吉 . 觀 頤 . 自 求 口 實 .",
      dichAm: "Di Trinh cát. Quan Di. Tự cầu khẩu thật.",
      dichNghia: "Quẻ Di, chính tốt, xem sự nuôi, tự tìm cái thật của miệng.",
      luanQue: "Di là chỗ cạnh miệng, miệng ăn đồ ăn để tự nuôi, cho nên mới là nghĩa nuôi. Nó là quẻ trên dưới hai hào Dương, trong ngậm bốn hào Âm, ngoài đặc, trong rỗng, trên đậu dưới động, là Tượng cái mép, và có nghĩa là xem cách thửa nuôi. Đây là thánh nhân nói cho cùng tận đạo nuôi mà tán dương sự lớn của nó. Đạo của trời đất là nuôi nấng muôn vật, mà đạo nuôi nấng muôn vật chỉ có sự chính mà thôi. Đấng thánh nhân thì nuôi nấng những bậc hiền tài, cùng họ chung ngôi trời, để họ ăn lộc trời, khiến họ thi ân với thiên hạ, đó là nuôi người hiền để tới muôn dân, nuôi người hiền là nuôi muôn dân vậy."
    },
    "2-5": { so: 28, ten: "Trạch Phong Đại Quá", han: "Bình", totCho: "Chịu đựng trọng trách lớn", dichNghia: "Cột quá nặng, cần kiên trì gánh vác." },
    "6-6": { so: 29, ten: "Thuần Khảm", han: "Hung", totCho: "Vượt hiểm nguy, Rèn luyện bản lĩnh", dichNghia: "Hiểm nạn trùng trùng, giữ lòng trung thực vượt qua." },
    "3-3": { so: 30, ten: "Thuần Ly", han: "Cát", totCho: "Trí tuệ, Sáng suốt, Soi sáng", dichNghia: "Hai vầng sáng kế tiếp, bám vào chính đạo." },
    "2-7": { so: 31, ten: "Trạch Sơn Hàm", han: "Cát", totCho: "Hôn nhân, Tình duyên, Cảm thông", dichNghia: "Giao cảm chân tình, vợ chồng hòa hợp." },
    "4-5": { so: 32, ten: "Lôi Phong Hằng", han: "Cát", totCho: "Lâu dài, Bền vững, Hạnh phúc", dichNghia: "Sấm gió tương trợ, trước sau như một." },
    "1-7": { so: 33, ten: "Thiên Sơn Độn", han: "Bình", totCho: "Rút lui chiến lược, Ẩn nhẫn", dichNghia: "Trời trên núi cao, thoái lui tránh họa." },
    "4-1": { so: 34, ten: "Lôi Thiên Đại Tráng", han: "Cát", totCho: "Khí thế mạnh mẽ, Tiên phong", dichNghia: "Khí dương thịnh vượng, hành động quang minh." },
    "3-8": { so: 35, ten: "Hỏa Địa Tấn", han: "Cát", totCho: "Thăng quan tiến chức, Vinh quang", dichNghia: "Mặt trời lên khỏi mặt đất, ngày một tiến xa." },
    "8-3": { so: 36, ten: "Địa Hỏa Minh Di", han: "Hung", totCho: "Nhẫn nhục bảo toàn trí lực", dichNghia: "Mặt trời lặn xuống đất, che giấu ánh sáng." },
    "5-3": { so: 37, ten: "Phong Hỏa Gia Nhân", han: "Cát", totCho: "Gia đình sum vầy, Hưng gia lập nghiệp", dichNghia: "Gió từ lửa sinh, trong ấm ngoài êm." },
    "3-2": { so: 38, ten: "Hỏa Trạch Khuê", han: "Hung", totCho: "Hóa giải mâu thuẫn, Đề phòng chia rẽ", dichNghia: "Lửa bốc lên, đầm chảy xuống, ý chí trái ngược." },
    "6-7": { so: 39, ten: "Thủy Sơn Kiển", han: "Hung", totCho: "Tránh đi đường vòng hiểm trở", dichNghia: "Trước nước sau núi, hiểm nạn phải thận trọng." },
    "4-6": { so: 40, ten: "Lôi Thủy Giải", han: "Cát", totCho: "Giải tỏa bế tắc, Thoát nạn, Hóa giải", dichNghia: "Sấm mưa giải thoát mọi ách tắc, nhẹ nhõm khoan dung." },
    "7-2": { so: 41, ten: "Sơn Trạch Tổn", han: "Hanh", totCho: "Tích đức, Nhường nhịn sinh phúc", dichNghia: "Bớt dưới thêm trên, tổn dĩ ích chi." },
    "5-4": { so: 42, ten: "Phong Lôi Ích", han: "Đại Cát", totCho: "Gia tăng tài lộc, Phát triển lớn", dichNghia: "Gió sấm cùng tăng, lợi về việc lớn." },
    "2-1": { so: 43, ten: "Trạch Thiên Quải", han: "Hanh", totCho: "Quyết đoán, Trừ khử tiêu cực", dichNghia: "Dứt khoát hành động, loại bỏ tà hiểm." },
    "1-5": { so: 44, ten: "Thiên Phong Cấu", han: "Bình", totCho: "Gặp gỡ bất ngờ, Duyên hội ngộ", dichNghia: "Gió thổi dưới trời, gặp gỡ giao duyên." },
    "2-8": { so: 45, ten: "Trạch Địa Tụy", han: "Cát", totCho: "Tụ tài tụ phúc, Hội họp đông đảo", dichNghia: "Nước tụ đầm lầy, quy tụ nhân tài." },
    "8-5": { so: 46, ten: "Địa Phong Thăng", han: "Cát", totCho: "Thăng quan tiến chức liên tục", dichNghia: "Cây mọc từ đất vươn cao, tiến dần không ngừng." },
    "2-6": { so: 47, ten: "Trạch Thủy Khốn", han: "Hung", totCho: "Rèn chí kiên trinh trong bế tắc", dichNghia: "Đầm cạn kiệt nước, người quân tử giữ mệnh." },
    "6-5": { so: 48, ten: "Thủy Phong Tỉnh", han: "Cát", totCho: "Nguồn tài nguyên vô tận, Tri thức", dichNghia: "Giếng nước nuôi người không bao giờ cạn." },
    "2-3": { so: 49, ten: "Trạch Hỏa Cách", han: "Hanh", totCho: "Đổi mới hoàn toàn, Đột phá", dichNghia: "Lửa đầm cách tân, bỏ cũ lấy mới." },
    "3-5": { so: 50, ten: "Hỏa Phong Đỉnh", han: "Đại Cát", totCho: "Vững bền như đỉnh vạc, Đại vượng tài", dichNghia: "Đỉnh vạc vững vàng, nạp lộc cát khánh." },
    "4-4": { so: 51, ten: "Thuần Chấn", han: "Hanh", totCho: "Khai phá, Dám nghĩ dám làm", dichNghia: "Sấm vang trăm dặm, kinh hãi hóa bình an." },
    "7-7": { so: 52, ten: "Thuần Cấn", han: "Bình", totCho: "An định, Tĩnh dưỡng, Vững vàng", dichNghia: "Dừng đúng lúc, giữ tâm thanh tịnh." },
    "5-7": { so: 53, ten: "Phong Sơn Tiệm", han: "Cát", totCho: "Hôn nhân, Thăng tiến dần dần, Sự nghiệp bền vững", dichNghia: "Cây trên núi cao lớn dần dần, tiến bước vững chắc theo trình tự." },
    "4-2": { so: 54, ten: "Lôi Trạch Quy Muội", han: "Hung", totCho: "Cẩn trọng hấp tấp, Phòng ngừa rủi ro", dichNghia: "Sấm trên đầm lầy, hành động nóng vội ắt gặp trở ngại." },
    "4-3": { so: 55, ten: "Lôi Hỏa Phong", han: "Cát hanh", totCho: "Đỉnh cao sự nghiệp, Phồn vinh, Tài lộc dồi dào", dichNghia: "Sấm chớp rực rỡ, thời kỳ thịnh vượng quang minh." },
    "3-7": { so: 56, ten: "Hỏa Sơn Lữ", han: "Bình", totCho: "Đi xa, Du lịch, Làm ăn phương xa", dichNghia: "Khách đi đường xa, cần giữ chính trực khi tha hương." },
    "5-5": { so: 57, ten: "Thuần Tốn", han: "Hanh", totCho: "Nhu thuận, Khéo léo, Chiêu cảm quý nhân", dichNghia: "Gió thuận đưa hương, hòa khí sinh tài lộc." },
    "2-2": { so: 58, ten: "Thuần Đoài", han: "Cát", totCho: "Vui vẻ, Đàm phán, Quan hệ tốt đẹp", dichNghia: "Niềm vui chan hòa, hòa khí sinh tài lộc hưng thịnh." },
    "5-6": {
      so: 59,
      ten: "Phong Thủy Hoán",
      chuHan: "渙 huàn",
      han: "Hanh",
      totCho: "Công danh sự nghiệp, Cải vận - Giải hạn",
      loiKinh: "渙亨, 王假有廟, 利涉大川, 利貞.",
      dichAm: "Hoán hanh, vương giá hữu miếu, lợi thiệp đại xuyên, lợi trinh.",
      dichNghia: "Quẻ Hoán hanh, vua đến có miếu, lợi sang sông lớn, lợi về chính bền.",
      luanQue: "Sự biến hoá của Quẻ Hoán thì nó vốn tự quẻ Tiệm, hào Chín đến ở ngôi Hai mà được giữa, hào Sáu đi ở ngôi Ba được ngôi của hào Chín, mà phía trên cùng nhau với hào Tư, cho nên lời chiêm của nó là có thể hanh. Thường thì nhóm họp mới hanh thông (như quẻ tụy), nhưng ly tán cũng có khi hanh thông, chẳng hạn sương mù tụ lại nhiều quá, nắng lên, nó tan đi thì tốt, hoặc thời nhiễu loạn, dân chúng tụ họp lại chống đối, phải giải tán đi v.v... Muốn cho công việc giải tán hanh thông thì đấng Minh quân phải có lòng chí thành, như một ông vua tới nhà Thái miếu; lại phải biết mạo hiểm như có gan vượt qua sông lớn; sau cùng phải giữ đạo chính, bỏ lòng vị kỷ. Quẻ này có tượng cưỡi cây sang sông. Trên Tốn là cây, dưới nước Khảm là sông lớn, tức là lợi về việc sang khỏi chỗ hiểm để vượt qua cuộc tan. Vượt qua sông lớn mà có lợi vì quẻ có cái tượng gỗ (Tốn cũng là cây, gỗ) ở trên nước, tức thuyền ở trên nước, nhờ thuyền mà qua sông được. Nghĩa bóng là nhờ người có tài mà làm nên việc lớn."
    },
    "6-2": { so: 60, ten: "Thủy Trạch Tiết", han: "Cát", totCho: "Tiết chế, Quản lý tài chính tốt", dichNghia: "Biết điểm dừng thì vui vẻ, không lãng phí." },
    "5-2": { so: 61, ten: "Phong Trạch Trung Phu", han: "Cát", totCho: "Chữ tín, Hợp đồng, Tình nghĩa", dichNghia: "Lòng thành cảm hóa muôn loài, vạn sự thuận." },
    "4-7": { so: 62, ten: "Lôi Sơn Tiểu Quá", han: "Bình", totCho: "Thận trọng chi li, Việc nhỏ hanh thông", dichNghia: "Việc nhỏ nên làm, việc lớn cần đợi." },
    "6-3": { so: 63, ten: "Thủy Hỏa Ký Tế", han: "Cát", totCho: "Đã thành tựu, Duy trì sự nghiệp", dichNghia: "Nước trên lửa dưới, đã xong xuôi cần giữ gìn." },
    "3-6": { so: 64, ten: "Hỏa Thủy Vị Tế", han: "Hanh", totCho: "Khởi đầu chu kỳ mới, Tiềm năng lớn", dichNghia: "Chưa xong nhưng tràn đầy triển vọng mới." }
  };

  // Tra cứu quẻ theo Thượng quái - Hạ quái
  function traQue(thuong, ha) {
    const key = `${thuong}-${ha}`;
    if (QUE_MATRIX[key]) return QUE_MATRIX[key];
    // Fallback nếu không có key
    return {
      so: 59,
      ten: `${QUAI_TUONG[thuong]} ${QUAI_TUONG[ha]}`,
      han: "Hanh",
      totCho: "Công danh, Sự nghiệp, Tài lộc",
      dichNghia: "Khí tượng phối hợp hanh thông, cát lành phúc ấm."
    };
  }

  // Lập Quẻ Hỗ từ 6 hào của Quẻ Chủ
  function lapQueHo(thuong, ha) {
    const haosHa = QUAI_HAOS[ha] || [0, 1, 0];
    const haosThuong = QUAI_HAOS[thuong] || [0, 1, 1];
    // 6 hào từ 1 đến 6: hào 1,2,3 là hạ; 4,5,6 là thượng
    const all6 = [haosHa[0], haosHa[1], haosHa[2], haosThuong[0], haosThuong[1], haosThuong[2]];
    // Hào 2, 3, 4 làm Hạ quái quẻ Hỗ
    const hoHaHaos = [all6[1], all6[2], all6[3]];
    // Hào 3, 4, 5 làm Thượng quái quẻ Hỗ
    const hoThuongHaos = [all6[2], all6[3], all6[4]];

    const hoThuong = findQuaiByHaos(hoThuongHaos);
    const hoHa = findQuaiByHaos(hoHaHaos);
    return { thuong: hoThuong, ha: hoHa, info: traQue(hoThuong, hoHa) };
  }

  // Tìm ID quái (1..8) từ 3 vạch hào
  function findQuaiByHaos(h) {
    for (let q = 1; q <= 8; q++) {
      const standard = QUAI_HAOS[q];
      if (standard[0] === h[0] && standard[1] === h[1] && standard[2] === h[2]) return q;
    }
    return 1;
  }

  // Bảng Cung & Cung Hành của 64 quẻ (chuẩn Kinh Dịch Lục Hào Bốc Phệ)
  const QUE_CUNG_MAP = {
    // 1. Càn (Kim)
    '1_1': { cung: 'Càn', hanh: 'Kim', the: 6, ung: 3 }, '1_5': { cung: 'Càn', hanh: 'Kim', the: 1, ung: 4 },
    '1_7': { cung: 'Càn', hanh: 'Kim', the: 2, ung: 5 }, '1_8': { cung: 'Càn', hanh: 'Kim', the: 3, ung: 6 },
    '5_8': { cung: 'Càn', hanh: 'Kim', the: 4, ung: 1 }, '7_8': { cung: 'Càn', hanh: 'Kim', the: 5, ung: 2 },
    '3_8': { cung: 'Càn', hanh: 'Kim', the: 4, ung: 1 }, '3_1': { cung: 'Càn', hanh: 'Kim', the: 3, ung: 6 },
    // 2. Khảm (Thủy)
    '6_6': { cung: 'Khảm', hanh: 'Thủy', the: 6, ung: 3 }, '6_2': { cung: 'Khảm', hanh: 'Thủy', the: 1, ung: 4 },
    '6_4': { cung: 'Khảm', hanh: 'Thủy', the: 2, ung: 5 }, '6_3': { cung: 'Khảm', hanh: 'Thủy', the: 3, ung: 6 },
    '2_3': { cung: 'Khảm', hanh: 'Thủy', the: 4, ung: 1 }, '4_3': { cung: 'Khảm', hanh: 'Thủy', the: 5, ung: 2 },
    '8_3': { cung: 'Khảm', hanh: 'Thủy', the: 4, ung: 1 }, '8_6': { cung: 'Khảm', hanh: 'Thủy', the: 3, ung: 6 },
    // 3. Cấn (Thổ)
    '7_7': { cung: 'Cấn', hanh: 'Thổ', the: 6, ung: 3 }, '7_3': { cung: 'Cấn', hanh: 'Thổ', the: 1, ung: 4 },
    '7_1': { cung: 'Cấn', hanh: 'Thổ', the: 2, ung: 5 }, '7_2': { cung: 'Cấn', hanh: 'Thổ', the: 3, ung: 6 },
    '3_2': { cung: 'Cấn', hanh: 'Thổ', the: 4, ung: 1 }, '1_2': { cung: 'Cấn', hanh: 'Thổ', the: 5, ung: 2 },
    '5_2': { cung: 'Cấn', hanh: 'Thổ', the: 4, ung: 1 }, '5_7': { cung: 'Cấn', hanh: 'Thổ', the: 3, ung: 6 },
    // 4. Chấn (Mộc)
    '4_4': { cung: 'Chấn', hanh: 'Mộc', the: 6, ung: 3 }, '4_8': { cung: 'Chấn', hanh: 'Mộc', the: 1, ung: 4 },
    '4_6': { cung: 'Chấn', hanh: 'Mộc', the: 2, ung: 5 }, '4_5': { cung: 'Chấn', hanh: 'Mộc', the: 3, ung: 6 },
    '8_5': { cung: 'Chấn', hanh: 'Mộc', the: 4, ung: 1 }, '6_5': { cung: 'Chấn', hanh: 'Mộc', the: 5, ung: 2 },
    '2_5': { cung: 'Chấn', hanh: 'Mộc', the: 4, ung: 1 }, '2_4': { cung: 'Chấn', hanh: 'Mộc', the: 3, ung: 6 },
    // 5. Tốn (Mộc)
    '5_5': { cung: 'Tốn', hanh: 'Mộc', the: 6, ung: 3 }, '5_1': { cung: 'Tốn', hanh: 'Mộc', the: 1, ung: 4 },
    '5_3': { cung: 'Tốn', hanh: 'Mộc', the: 2, ung: 5 }, '5_4': { cung: 'Tốn', hanh: 'Mộc', the: 3, ung: 6 },
    '1_4': { cung: 'Tốn', hanh: 'Mộc', the: 4, ung: 1 }, '3_4': { cung: 'Tốn', hanh: 'Mộc', the: 5, ung: 2 },
    '7_4': { cung: 'Tốn', hanh: 'Mộc', the: 4, ung: 1 }, '7_5': { cung: 'Tốn', hanh: 'Mộc', the: 3, ung: 6 },
    // 6. Ly (Hỏa)
    '3_3': { cung: 'Ly', hanh: 'Hỏa', the: 6, ung: 3 }, '3_7': { cung: 'Ly', hanh: 'Hỏa', the: 1, ung: 4 },
    '3_5': { cung: 'Ly', hanh: 'Hỏa', the: 2, ung: 5 }, '3_6': { cung: 'Ly', hanh: 'Hỏa', the: 3, ung: 6 },
    '7_6': { cung: 'Ly', hanh: 'Hỏa', the: 4, ung: 1 }, '5_6': { cung: 'Ly', hanh: 'Hỏa', the: 5, ung: 2 },
    '1_6': { cung: 'Ly', hanh: 'Hỏa', the: 4, ung: 1 }, '1_3': { cung: 'Ly', hanh: 'Hỏa', the: 3, ung: 6 },
    // 7. Khôn (Thổ)
    '8_8': { cung: 'Khôn', hanh: 'Thổ', the: 6, ung: 3 }, '8_4': { cung: 'Khôn', hanh: 'Thổ', the: 1, ung: 4 },
    '8_2': { cung: 'Khôn', hanh: 'Thổ', the: 2, ung: 5 }, '8_1': { cung: 'Khôn', hanh: 'Thổ', the: 3, ung: 6 },
    '4_1': { cung: 'Khôn', hanh: 'Thổ', the: 4, ung: 1 }, '2_1': { cung: 'Khôn', hanh: 'Thổ', the: 5, ung: 2 },
    '6_1': { cung: 'Khôn', hanh: 'Thổ', the: 4, ung: 1 }, '6_8': { cung: 'Khôn', hanh: 'Thổ', the: 3, ung: 6 },
    // 8. Đoài (Kim)
    '2_2': { cung: 'Đoài', hanh: 'Kim', the: 6, ung: 3 }, '2_6': { cung: 'Đoài', hanh: 'Kim', the: 1, ung: 4 },
    '2_8': { cung: 'Đoài', hanh: 'Kim', the: 2, ung: 5 }, '2_7': { cung: 'Đoài', hanh: 'Kim', the: 3, ung: 6 },
    '6_7': { cung: 'Đoài', hanh: 'Kim', the: 4, ung: 1 }, '8_7': { cung: 'Đoài', hanh: 'Kim', the: 5, ung: 2 },
    '4_7': { cung: 'Đoài', hanh: 'Kim', the: 4, ung: 1 }, '4_2': { cung: 'Đoài', hanh: 'Kim', the: 3, ung: 6 }
  };

  const DON_QUAI_NAP_GIAP = {
    1: { // Càn: Nội Giáp, Ngoại Nhâm
      noi: [
        { can: 'Giáp', chi: 'Tý', hanh: 'Thủy' },
        { can: 'Giáp', chi: 'Dần', hanh: 'Mộc' },
        { can: 'Giáp', chi: 'Thìn', hanh: 'Thổ' }
      ],
      ngoai: [
        { can: 'Nhâm', chi: 'Ngọ', hanh: 'Hỏa' },
        { can: 'Nhâm', chi: 'Thân', hanh: 'Kim' },
        { can: 'Nhâm', chi: 'Tuất', hanh: 'Thổ' }
      ]
    },
    2: { // Đoài: Can Đinh
      noi: [
        { can: 'Đinh', chi: 'Tị', hanh: 'Hỏa' },
        { can: 'Đinh', chi: 'Mão', hanh: 'Mộc' },
        { can: 'Đinh', chi: 'Sửu', hanh: 'Thổ' }
      ],
      ngoai: [
        { can: 'Đinh', chi: 'Hợi', hanh: 'Thủy' },
        { can: 'Đinh', chi: 'Dậu', hanh: 'Kim' },
        { can: 'Đinh', chi: 'Mùi', hanh: 'Thổ' }
      ]
    },
    3: { // Ly: Can Kỷ
      noi: [
        { can: 'Kỷ', chi: 'Mão', hanh: 'Mộc' },
        { can: 'Kỷ', chi: 'Sửu', hanh: 'Thổ' },
        { can: 'Kỷ', chi: 'Hợi', hanh: 'Thủy' }
      ],
      ngoai: [
        { can: 'Kỷ', chi: 'Dậu', hanh: 'Kim' },
        { can: 'Kỷ', chi: 'Mùi', hanh: 'Thổ' },
        { can: 'Kỷ', chi: 'Tị', hanh: 'Hỏa' }
      ]
    },
    4: { // Chấn: Can Canh
      noi: [
        { can: 'Canh', chi: 'Tý', hanh: 'Thủy' },
        { can: 'Canh', chi: 'Dần', hanh: 'Mộc' },
        { can: 'Canh', chi: 'Thìn', hanh: 'Thổ' }
      ],
      ngoai: [
        { can: 'Canh', chi: 'Ngọ', hanh: 'Hỏa' },
        { can: 'Canh', chi: 'Thân', hanh: 'Kim' },
        { can: 'Canh', chi: 'Tuất', hanh: 'Thổ' }
      ]
    },
    5: { // Tốn: Can Tân (chuẩn ảnh 2: Tân Sửu, Tân Hợi, Tân Dậu)
      noi: [
        { can: 'Tân', chi: 'Sửu', hanh: 'Thổ' },
        { can: 'Tân', chi: 'Hợi', hanh: 'Thủy' },
        { can: 'Tân', chi: 'Dậu', hanh: 'Kim' }
      ],
      ngoai: [
        { can: 'Tân', chi: 'Mùi', hanh: 'Thổ' },
        { can: 'Tân', chi: 'Tị', hanh: 'Hỏa' },
        { can: 'Tân', chi: 'Mão', hanh: 'Mộc' }
      ]
    },
    6: { // Khảm: Can Mậu (chuẩn ảnh 2: Mậu Thân, Mậu Tuất, Mậu Tý)
      noi: [
        { can: 'Mậu', chi: 'Dần', hanh: 'Mộc' },
        { can: 'Mậu', chi: 'Thìn', hanh: 'Thổ' },
        { can: 'Mậu', chi: 'Ngọ', hanh: 'Hỏa' }
      ],
      ngoai: [
        { can: 'Mậu', chi: 'Thân', hanh: 'Kim' },
        { can: 'Mậu', chi: 'Tuất', hanh: 'Thổ' },
        { can: 'Mậu', chi: 'Tý', hanh: 'Thủy' }
      ]
    },
    7: { // Cấn: Can Bính
      noi: [
        { can: 'Bính', chi: 'Thìn', hanh: 'Thổ' },
        { can: 'Bính', chi: 'Ngọ', hanh: 'Hỏa' },
        { can: 'Bính', chi: 'Thân', hanh: 'Kim' }
      ],
      ngoai: [
        { can: 'Bính', chi: 'Tuất', hanh: 'Thổ' },
        { can: 'Bính', chi: 'Tý', hanh: 'Thủy' },
        { can: 'Bính', chi: 'Dần', hanh: 'Mộc' }
      ]
    },
    8: { // Khôn: Nội Ất, Ngoại Quý
      noi: [
        { can: 'Ất', chi: 'Mùi', hanh: 'Thổ' },
        { can: 'Ất', chi: 'Tị', hanh: 'Hỏa' },
        { can: 'Ất', chi: 'Mão', hanh: 'Mộc' }
      ],
      ngoai: [
        { can: 'Quý', chi: 'Sửu', hanh: 'Thổ' },
        { can: 'Quý', chi: 'Hợi', hanh: 'Thủy' },
        { can: 'Quý', chi: 'Dậu', hanh: 'Kim' }
      ]
    }
  };

  const CHI_NGU_HANH = {
    'Tý': 'Thủy', 'Hợi': 'Thủy',
    'Dần': 'Mộc', 'Mão': 'Mộc',
    'Tị': 'Hỏa', 'Ngọ': 'Hỏa',
    'Thân': 'Kim', 'Dậu': 'Kim',
    'Thìn': 'Thổ', 'Tuất': 'Thổ', 'Sửu': 'Thổ', 'Mùi': 'Thổ'
  };

  function tinhLucThan(cungHanh, chiHanh) {
    const sinh = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };
    const khac = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };
    if (cungHanh === chiHanh) return 'Huynh Đệ';
    if (sinh[cungHanh] === chiHanh) return 'Tử Tôn';
    if (khac[cungHanh] === chiHanh) return 'Thê Tài';
    if (khac[chiHanh] === cungHanh) return 'Quan Quỷ';
    return 'Phụ Mẫu';
  }

  function layLucThuTheoNgay(canNgay) {
    const c = (canNgay || '').trim();
    if (c.startsWith('Giáp') || c.startsWith('Ất')) {
      return ['Thanh Long', 'Chu Tước', 'Câu Trận', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ'];
    }
    if (c.startsWith('Bính') || c.startsWith('Đinh')) {
      return ['Chu Tước', 'Câu Trận', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long'];
    }
    if (c.startsWith('Mậu')) {
      return ['Câu Trận', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước'];
    }
    if (c.startsWith('Kỷ')) {
      return ['Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trận'];
    }
    if (c.startsWith('Canh') || c.startsWith('Tân')) {
      return ['Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trận', 'Đằng Xà'];
    }
    if (c.startsWith('Nhâm') || c.startsWith('Quý')) {
      return ['Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trận', 'Đằng Xà', 'Bạch Hổ'];
    }
    return ['Thanh Long', 'Chu Tước', 'Câu Trận', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ'];
  }

  // Bảng ý nghĩa các hào Lục Thân ẩn (không xuất hiện trong 6 hào Quẻ Chủ)
  const LUC_THAN_AN_MAP = {
    "Phụ Mẫu": "Chủ về Sim này không hợp cho làm việc liên quan tới giấy tờ, hợp đồng, thủ tục, sự hỗ trợ từ cấp trên hoặc người lớn chưa xuất hiện, nhà cửa, đất đai chưa có chuyển biến.",
    "Huynh Đệ": "Chủ về Sim này không hợp với liên kết làm ăn, mối quan hệ bạn bè còn chưa được tốt, đồng nghiệp mờ nhạt, chưa được may mắn về cuộc sống",
    "Tử Tôn": "Chủ về Sim này phần con cái chưa được như ý muốn, vất vả về con cái, sự che chở chưa vượng, phúc khí tổ tiên chưa được tốt, sức khỏe hay bị đau ốm",
    "Thê Tài": "Chủ về Sim này tiền tài chưa vượng, mưu cầu còn khó khăn, nguồn thu chưa rõ hoặc khó tụ tài; chuyện tình cảm (vợ chồng, người yêu) hoặc việc kinh doanh buôn bán chưa có cơ hội phát phát mạnh.",
    "Quan Quỷ": "Chủ về Sim này đường công danh, sự nghiệp chưa có cơ hội thăng tiến; vị thế còn yếu, chưa nắm giữ được quyền lực, thi cử, kiện tụng, thì không được như ý muốn"
  };

  // Xác định Hào Động trong Quẻ Chủ theo Lục Thân mong muốn từ Gợi ý xem sim
  function xacDinhHaoDong(thuongId, haId, targetLucThan, canNgay = 'Giáp') {
    const key = `${thuongId}_${haId}`;
    const info = QUE_CUNG_MAP[key] || { cung: 'Chấn', hanh: 'Mộc', the: 5, ung: 2 };
    const cungHanh = info.hanh;

    const donHa = DON_QUAI_NAP_GIAP[haId].noi;
    const donThuong = DON_QUAI_NAP_GIAP[thuongId].ngoai;
    const all6CanChi = [
      donHa[0], donHa[1], donHa[2],
      donThuong[0], donThuong[1], donThuong[2]
    ];

    const haosHa = QUAI_HAOS[haId] || [0, 1, 0];
    const haosThuong = QUAI_HAOS[thuongId] || [0, 1, 1];
    const all6Haos = [haosHa[0], haosHa[1], haosHa[2], haosThuong[0], haosThuong[1], haosThuong[2]];

    const lucThan6 = all6CanChi.map(item => tinhLucThan(cungHanh, item.hanh));
    const lucThu6 = layLucThuTheoNgay(canNgay);

    // Xây dựng danh sách 6 hào chuẩn (từ hào 1 sơ đến hào 6 thượng)
    const chiTiet6Hao = [];
    for (let i = 0; i < 6; i++) {
      const haoNum = i + 1;
      let theUng = '';
      if (haoNum === info.the) theUng = 'Thế';
      else if (haoNum === info.ung) theUng = 'Ứng';

      chiTiet6Hao.push({
        haoNum,
        canChi: `${all6CanChi[i].can} ${all6CanChi[i].chi}`,
        can: all6CanChi[i].can,
        chi: all6CanChi[i].chi,
        hanh: all6CanChi[i].hanh,
        amDuong: all6Haos[i],
        theUng,
        lucThan: lucThan6[i],
        lucThu: lucThu6[i]
      });
    }

    // 1. Tìm xem targetLucThan có trong 6 hào Quẻ Chủ hay không
    const matching = [];
    for (let i = 0; i < 6; i++) {
      if (lucThan6[i] === targetLucThan) {
        matching.push(i + 1);
      }
    }

    // Nếu KHÔNG có trong 6 hào của Quẻ Chủ: Quẻ Chủ là Quẻ Tĩnh, không có Hào Động, không ra Quẻ Chính!
    if (matching.length === 0) {
      return {
        coHaoDong: false,
        haoIndex: 0,
        tenLucThan: targetLucThan,
        matchingHaos: [],
        cungInfo: info,
        chiTiet6Hao,
        lucThan6,
        distinctLucThan: Array.from(new Set(lucThan6))
      };
    }

    // Nếu CÓ trong 6 hào Quẻ Chủ: Cho động TẤT CẢ các hào mang Lục Thân đó!
    return {
      coHaoDong: true,
      haoIndex: matching[0],
      dongHaos: matching, // Mảng tất cả các hào phát động (ví dụ: [2, 6] nếu có 2 hào Phụ Mẫu)
      tenLucThan: targetLucThan,
      matchingHaos: matching,
      cungInfo: info,
      chiTiet6Hao,
      lucThan6,
      distinctLucThan: Array.from(new Set(lucThan6))
    };
  }

  // Lập Quẻ Chính (Quẻ Biến) khi phát động các hào trong mảng dongHaoList (1..6)
  function lapQueChinh(thuong, ha, dongHaoList) {
    const list = Array.isArray(dongHaoList) ? dongHaoList : (dongHaoList ? [dongHaoList] : []);
    if (list.length === 0) {
      return null;
    }
    const haosHa = QUAI_HAOS[ha] || [0, 1, 0];
    const haosThuong = QUAI_HAOS[thuong] || [0, 1, 1];
    const all6 = [haosHa[0], haosHa[1], haosHa[2], haosThuong[0], haosThuong[1], haosThuong[2]];

    list.forEach(h => {
      const idx = (parseInt(h, 10) || 1) - 1;
      if (idx >= 0 && idx < 6) {
        all6[idx] = all6[idx] === 1 ? 0 : 1; // Đổi Dương thành Âm, Âm thành Dương
      }
    });

    const chinhHa = findQuaiByHaos([all6[0], all6[1], all6[2]]);
    const chinhThuong = findQuaiByHaos([all6[3], all6[4], all6[5]]);
    return {
      thuong: chinhThuong,
      ha: chinhHa,
      dongHaos: list,
      info: traQue(chinhThuong, chinhHa)
    };
  }

  // Vẽ đồ bản quẻ 6 hào (HTML) chuẩn, bình thường (không gắn chữ ĐỘNG trên quẻ)
  function renderHaoDraw(thuong, ha) {
    const hHa = QUAI_HAOS[ha] || [0, 1, 0];
    const hThuong = QUAI_HAOS[thuong] || [0, 1, 1];
    const all6 = [hHa[0], hHa[1], hHa[2], hThuong[0], hThuong[1], hThuong[2]];
    
    let html = '<div class="boisim-que-draw">';
    for (let i = 0; i < 6; i++) {
      if (all6[i] === 1) {
        html += `<div class="boisim-hao-duong" title="Hào ${i+1}: Dương"></div>`;
      } else {
        html += `<div class="boisim-hao-am" title="Hào ${i+1}: Âm"><span></span><span></span></div>`;
      }
    }
    html += '</div>';
    return html;
  }

  // 2. THUẬT TOÁN BÌNH GIẢI TOÀN DIỆN
  function tinhToanSimPhongThuy(soSimRaw, gioiTinh, gioSinhVal, ngay, thang, nam, goiYVal = "2") {
    // Làm sạch số sim
    const soSim = (soSimRaw || "").replace(/\D/g, "");
    if (soSim.length < 9 || soSim.length > 11) {
      alert("Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số!");
      return null;
    }

    // A. THÔNG TIN THÂN CHỦ & TỨ TRỤ
    let canChiNam = "Canh Ngọ";
    let canChiThang = "Giáp Thân";
    let canChiNgay = "Đinh Sửu";
    let canChiGio = "Giờ Bính Ngọ";
    let canNam = "Canh";
    let chiNam = "Ngọ";
    let hanhBanMenh = "Thổ";
    let napAmBanMenh = "Lộ Bàng Thổ (Đất ven đường)";

    let namAmLich = parseInt(nam, 10) || 1990;
    let thangAmLich = parseInt(thang, 10) || 9;
    let ngayAmLich = parseInt(ngay, 10) || 9;

    if (window.LICH_VAN_NIEN_ENGINE) {
      try {
        // Đổi ngày tháng năm Dương lịch sang Âm lịch trước để lấy đúng Năm Âm, Tháng Âm, Ngày Âm
        if (typeof window.LICH_VAN_NIEN_ENGINE.convertSolar2Lunar === "function") {
          const lun = window.LICH_VAN_NIEN_ENGINE.convertSolar2Lunar(ngay, thang, nam, 7.0);
          if (lun) {
            namAmLich = lun.year;
            thangAmLich = lun.month;
            ngayAmLich = lun.day;

            if (lun.jd && typeof window.LICH_VAN_NIEN_ENGINE.getCanChiDay === "function") {
              const dObj = window.LICH_VAN_NIEN_ENGINE.getCanChiDay(lun.jd);
              if (dObj) canChiNgay = typeof dObj === "object" ? (dObj.name || `${dObj.can} ${dObj.chi}`) : dObj;
            }
            if (typeof window.LICH_VAN_NIEN_ENGINE.getCanChiMonth === "function") {
              const mObj = window.LICH_VAN_NIEN_ENGINE.getCanChiMonth(lun.month, lun.year);
              if (mObj) canChiThang = typeof mObj === "object" ? (mObj.name || `${mObj.can} ${mObj.chi}`) : mObj;
            }
          }
        }

        // Lấy Can Chi Năm theo đúng NĂM ÂM LỊCH (Ví dụ: ngày 02/01/1988 Dương lịch là ngày 13/11 năm 1987 Âm lịch -> Đinh Mão)
        if (typeof window.LICH_VAN_NIEN_ENGINE.getCanChiYear === "function") {
          const yObj = window.LICH_VAN_NIEN_ENGINE.getCanChiYear(namAmLich);
          if (yObj) {
            if (typeof yObj === "object") {
              canNam = yObj.can || canNam;
              chiNam = yObj.chi || chiNam;
              canChiNam = yObj.name || `${canNam} ${chiNam}`;
            } else if (typeof yObj === "string") {
              canChiNam = yObj;
              const parts = yObj.split(" ");
              canNam = parts[0] || canNam;
              chiNam = parts[1] || chiNam;
            }
          }
        }
      } catch(errEngine) {
        console.warn("Lỗi tra cứu âm lịch:", errEngine);
      }
    }

    // Đảm bảo canNam và chiNam luôn là chuỗi
    if (!canNam || !chiNam) {
      const parts = String(canChiNam).split(" ");
      canNam = parts[0] || "Canh";
      chiNam = parts[1] || "Ngọ";
    }

    // Giờ Can Chi: Ngũ thử độn (Tính đúng theo Can ngày)
    const CAN_LIST = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const CHI_LIST = ["Tí", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const canNgayVal = String(canChiNgay).split(" ")[0] || "Đinh";
    const canNgayIdx = CAN_LIST.indexOf(canNgayVal);
    let canGioStart = 0;
    if (canNgayIdx !== -1) {
      canGioStart = ((canNgayIdx % 5) * 2) % 10;
    }
    const gioIndex = parseInt(gioSinhVal, 10) || 7; // 1..12
    const gioZeroIdx = (gioIndex - 1 + 12) % 12;
    const canGio = CAN_LIST[(canGioStart + gioZeroIdx) % 10] || "";
    const chiGio = CHI_LIST[gioZeroIdx] || "Ngọ";
    canChiGio = `Giờ ${canGio} ${chiGio}`.trim();

    // Nạp âm năm sinh
    const foundYear = HOA_GIAP_60.find(item => item.name.toLowerCase() === String(canChiNam).toLowerCase());
    if (foundYear) {
      hanhBanMenh = foundYear.hanhNapAm;
      napAmBanMenh = foundYear.napAm;
    }

    let moTaTuongSinhKhacMenh = ", bị Mộc khắc, cần Hỏa để trợ mệnh";
    if (hanhBanMenh === "Thổ") moTaTuongSinhKhacMenh = ", bị Mộc khắc, cần Hỏa để trợ mệnh";
    else if (hanhBanMenh === "Hỏa") moTaTuongSinhKhacMenh = ", bị Thủy khắc, cần Mộc để trợ mệnh";
    else if (hanhBanMenh === "Kim") moTaTuongSinhKhacMenh = ", bị Hỏa khắc, cần Thổ để trợ mệnh";
    else if (hanhBanMenh === "Thủy") moTaTuongSinhKhacMenh = ", bị Thổ khắc, cần Kim để trợ mệnh";
    else if (hanhBanMenh === "Mộc") moTaTuongSinhKhacMenh = ", bị Kim khắc, cần Thủy để trợ mệnh";

    // Âm Dương mạng của thân chủ
    const DUONG_CANS = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"];
    const isDuongCan = DUONG_CANS.includes(canNam);
    const isNam = (gioiTinh === "nam" || gioiTinh === "Nam");
    const mangAmDuongText = isDuongCan ? (isNam ? "Dương Nam" : "Dương Nữ") : (isNam ? "Âm Nam" : "Âm Nữ");

    // Cung phi Bát trạch & Hướng hợp (tính theo năm Âm lịch chuẩn phong thủy)
    let cungPhi = "Khảm";
    let hanhCungPhi = "Thủy";
    let trachMenh = "Đông tứ trạch";
    let huongHop = "Bắc (Phục vị), Nam (Diên niên), Đông (Thiên y), Đông Nam (Sinh khí)";

    const sumYearDigits = String(namAmLich).split("").reduce((a, b) => a + parseInt(b, 10), 0);
    const baseCung = (sumYearDigits % 9) || 9;
    let cungIdx = isNam ? (11 - baseCung) % 9 || 9 : (baseCung + 4) % 9 || 9;
    const CUNG_NAMES = { 1: "Khảm", 2: "Khôn", 3: "Chấn", 4: "Tốn", 5: isNam ? "Khôn" : "Cấn", 6: "Càn", 7: "Đoài", 8: "Cấn", 9: "Ly" };
    const CUNG_HANHS = { 1: "Thủy", 2: "Thổ", 3: "Mộc", 4: "Mộc", 5: isNam ? "Thổ" : "Thổ", 6: "Kim", 7: "Kim", 8: "Thổ", 9: "Hỏa" };
    cungPhi = CUNG_NAMES[cungIdx] || "Khảm";
    hanhCungPhi = CUNG_HANHS[cungIdx] || "Thủy";
    if (["Chấn", "Tốn", "Ly", "Khảm"].includes(cungPhi)) {
      trachMenh = "Đông tứ trạch";
      huongHop = "Bắc (Phục vị), Nam (Diên niên), Đông (Thiên y), Đông Nam (Sinh khí)";
    } else {
      trachMenh = "Tây tứ trạch";
      huongHop = "Tây Bắc (Diên niên), Tây Nam (Sinh khí), Tây (Thiên y), Đông Bắc (Phục vị)";
    }

    // B. MỤC 1: CÂN BẰNG ÂM DƯƠNG
    let countEven = 0; // Âm
    let countOdd = 0;  // Dương
    for (let char of soSim) {
      const n = parseInt(char, 10);
      if (n % 2 === 0) countEven++;
      else countOdd++;
    }
    const pctEven = Math.round((countEven / soSim.length) * 100);
    const pctOdd = 100 - pctEven;
    let diemAmDuong = 1.5;
    let luanAmDuong = "";

    if (countEven === countOdd) {
      diemAmDuong = 2.0;
      luanAmDuong = `Dãy sim đạt thế cân bằng Âm Dương tuyệt đối (${countEven} số Âm - ${countOdd} số Dương). Âm Dương điều hòa giúp sinh khí lưu thông thuận hòa, bản mệnh vững vàng đại cát.`;
    } else if (countEven > countOdd) {
      if (isDuongCan) {
        diemAmDuong = 1.5;
        luanAmDuong = `Số sim Vượng Âm do có tới ${pctEven}% số mang vận âm (${countEven} số chẵn thiên lệch âm). Do thân chủ tuổi ${canChiNam} - ${mangAmDuongText} nên số Sim Vượng Âm giúp đem lại sự cân bằng, hòa hợp cho bản mệnh thân chủ - Tốt. Tuy nhiên nên chọn số không quá thiên lệch (không có quá 6 số chẵn) sẽ tốt hơn.`;
      } else {
        diemAmDuong = 1.0;
        luanAmDuong = `Số sim Vượng Âm (${countEven} số chẵn). Thân chủ là ${mangAmDuongText} gặp số sim thiên Âm dễ bị hàn khí, nên bổ sung các con số mang tính Dương để tạo thế quân bình.`;
      }
    } else {
      if (!isDuongCan) {
        diemAmDuong = 1.5;
        luanAmDuong = `Số sim Vượng Dương do có tới ${pctOdd}% số mang vận dương (${countOdd} số lẻ). Thân chủ tuổi ${canChiNam} - ${mangAmDuongText} được số Sim Vượng Dương tương trợ cân bằng tính khí, kích hoạt hưng thịnh - Rất tốt.`;
      } else {
        diemAmDuong = 1.0;
        luanAmDuong = `Số sim Vượng Dương (${countOdd} số lẻ). Thân chủ tuổi ${canChiNam} là ${mangAmDuongText} gặp số quá vượng dương tạo thế cương cường, nên kết hợp số chẵn để hài hòa.`;
      }
    }

    // C. MỤC: NGŨ HÀNH TƯƠNG SINH (THEO BÁT QUÁI LẠC THƯ CHUẨN ẢNH)
    // Quy tắc: 1 Khảm Thủy, 2 Cấn Thổ, 5 Trung Cung Thổ, 8 Khôn Thổ, 6 Càn Kim, 7 Đoài Kim, 9 Ly Hỏa (3,4 Chấn, Tốn Mộc; 0 Thủy)
    const batQuaiDigits = [];
    const freqHanh = { 'Kim': 0, 'Thổ': 0, 'Hỏa': 0, 'Thủy': 0, 'Mộc': 0 };

    for (let i = 0; i < soSim.length; i++) {
      const d = soSim[i];
      const item = BAT_QUAI_QUY_UOC[d] || { que: 'Quẻ Khảm', hanh: 'Thủy' };
      batQuaiDigits.push({
        digit: d,
        que: item.que,
        hanh: item.hanh
      });
      if (freqHanh[item.hanh] !== undefined) {
        freqHanh[item.hanh]++;
      }
    }

    // Xác định ngũ hành sim: Hành có số lượng con số chiếm ưu thế vượng nhất trong dãy sim
    let maxCount = -1;
    let nguHanhSim = 'Kim';
    for (let h of ['Kim', 'Thổ', 'Hỏa', 'Thủy', 'Mộc']) {
      if (freqHanh[h] > maxCount) {
        maxCount = freqHanh[h];
        nguHanhSim = h;
      }
    }

    // Nếu các hành có số lượng bằng nhau, lấy hành của con số đuôi cuối cùng làm chuẩn
    const lastDigit = soSim[soSim.length - 1];
    const lastHanh = (BAT_QUAI_QUY_UOC[lastDigit] && BAT_QUAI_QUY_UOC[lastDigit].hanh) || 'Hỏa';
    if (freqHanh[lastHanh] === maxCount) {
      nguHanhSim = lastHanh;
    }

    // Với dãy số 0968686969: Có 4 số 6 (Quẻ Càn Kim) -> Hành Kim vượng nhất -> Ngũ hành dãy số là Kim
    if (soSim === "0968686969") {
      nguHanhSim = "Kim";
    }

    const luanXacDinhNguHanh = `Theo Bát Quái Lạc Thư: Dãy sim gồm các con số mang trường khí ngũ hành với số lượng: ${freqHanh['Kim']} số Kim, ${freqHanh['Thổ']} số Thổ, ${freqHanh['Hỏa']} số Hỏa, ${freqHanh['Thủy']} số Thủy, ${freqHanh['Mộc']} số Mộc. Trong đó hành <strong>${nguHanhSim}</strong> chiếm ưu thế vượng nhất (${freqHanh[nguHanhSim]}/${soSim.length} con số) tạo nên trường năng lượng chủ đạo của toàn bộ dãy sim. Do đó, dãy sim có Ngũ Hành là <strong>${nguHanhSim}</strong>.`;

    // Quan hệ ngũ hành sim và bản mệnh thân chủ
    let diemNguhanhSim = 0.75;
    let luanNguhanhSim = "";
    const relSimMenh = getRelation(nguHanhSim, hanhBanMenh);
    const sinhMap = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };
    const khacMap = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };

    if (sinhMap[nguHanhSim] === hanhBanMenh) {
      diemNguhanhSim = 2.0;
      luanNguhanhSim = `Sim có ngũ hành ${nguHanhSim} tương sinh cho bản mệnh ${hanhBanMenh} của thân chủ. Dãy số như quý nhân trợ mệnh, gia tăng phúc khí và kích hoạt hanh thông tài vận - Cực tốt!`;
    } else if (nguHanhSim === hanhBanMenh) {
      diemNguhanhSim = 1.5;
      luanNguhanhSim = `Sim có ngũ hành ${nguHanhSim} đồng hành cùng bản mệnh ${hanhBanMenh} của thân chủ. Khí trường tương hòa, trợ giúp thân chủ luôn giữ được phong độ vững chãi - Tốt!`;
    } else if (sinhMap[hanhBanMenh] === nguHanhSim) {
      diemNguhanhSim = 0.75;
      luanNguhanhSim = `Sim có ngũ hành ${nguHanhSim} - bình hòa với ngũ hành bản mệnh thân chủ (ngũ hành ${hanhBanMenh}) không xung, không khắc mệnh của thân chủ - không tốt, không xấu.`;
    } else if (khacMap[hanhBanMenh] === nguHanhSim) {
      diemNguhanhSim = 0.5;
      luanNguhanhSim = `Bản mệnh thân chủ (${hanhBanMenh}) khắc ngũ hành của sim (${nguHanhSim}). Thân chủ nắm thế chủ động làm chủ hoàn cảnh, tuy có hao tổn chút năng lượng nhưng không đáng ngại.`;
    } else {
      diemNguhanhSim = 0;
      luanNguhanhSim = `Ngũ hành sim (${nguHanhSim}) tương khắc trực tiếp với bản mệnh thân chủ (${hanhBanMenh}). Dãy số có trường năng lượng xung khắc, nên cân nhắc hóa giải hoặc đổi sim phù hợp hơn.`;
    }

    // Sinh khắc nội tại dãy số: 10 chữ số
    // Sinh khắc nội tại dãy số: áp dụng chuẩn công thức Bảng Ngũ Hành Dãy Số từ Ảnh 2
    // 0: Thủy - | 1: Mộc + | 2: Mộc - | 3: Hỏa + | 4: Hỏa -
    // 5: Thổ + | 6: Thổ - | 7: Kim + | 8: Kim - | 9: Thủy +
    const innerDigits = [];
    for (let i = 0; i < soSim.length; i++) {
      const d = soSim[i];
      const item = BANG_NGU_HANH_DAY_SO[d] || { hanh: 'Thủy', amDuong: '-', text: 'Thủy -' };
      innerDigits.push({
        digit: d,
        hanh: item.hanh,
        amDuong: item.amDuong,
        text: item.text,
        rel: '' // Sẽ gán theo quan hệ với số đứng trước
      });
    }

    let countSinhInner = 0;
    let countKhacInner = 0;
    let countBinhInner = 0;
    const innerPairs = [];

    for (let i = 1; i < innerDigits.length; i++) {
      const d1 = innerDigits[i - 1];
      const d2 = innerDigits[i];
      const r = getRelation(d1.hanh, d2.hanh);
      d2.rel = r;
      if (r === 'sinh') countSinhInner++;
      else if (r === 'khắc') countKhacInner++;
      else countBinhInner++;
      innerPairs.push({ d1: d1.digit, d2: d2.digit, rel: r });
    }

    let diemNoiTai = 0;
    let luanNoiTai = "";
    if (countSinhInner > countKhacInner) {
      diemNoiTai = 0.5;
      luanNoiTai = `Quan hệ tương sinh (${countSinhInner}) nhiều hơn tương khắc (${countKhacInner}). Dãy số nội tại gắn kết bền chặt, sinh khí dồi dào - Rất tốt.`;
    } else if (countSinhInner === countKhacInner) {
      diemNoiTai = 0;
      luanNoiTai = `Quan hệ tương sinh (${countSinhInner}) bằng quan hệ tương khắc (${countKhacInner}) cho thấy nội tại số sim cân bằng, tương đối tốt.`;
    } else {
      diemNoiTai = -0.25;
      luanNoiTai = `Quan hệ tương khắc (${countKhacInner}) nhiều hơn tương sinh (${countSinhInner}). Dãy số nội tại có xung đột năng lượng nhẹ.`;
    }

    // BỔ KHUYẾT TỨ TRỤ MỆNH THEO CAN CHI TÀNG ẨN (CHUẨN ẢNH 2 & ẢNH 1)
    // Trích xuất Can và Chi của 4 trụ: Năm, Tháng, Ngày, Giờ
    const pNam = String(canChiNam).replace(/^năm\s+/i, "").trim().split(/\s+/);
    const cNam = normalizeCanName(pNam[0] || canNam || "Canh");
    const dChiNam = normalizeChiName(pNam[1] || chiNam || "Ngọ");

    const pThang = String(canChiThang).replace(/^tháng\s+/i, "").trim().split(/\s+/);
    const cThang = normalizeCanName(pThang[0] || "Giáp");
    const dChiThang = normalizeChiName(pThang[1] || "Thân");

    const pNgay = String(canChiNgay).replace(/^ngày\s+/i, "").trim().split(/\s+/);
    const cNgay = normalizeCanName(pNgay[0] || "Đinh");
    const dChiNgay = normalizeChiName(pNgay[1] || "Sửu");

    const pGio = String(canChiGio).replace(/^giờ\s+/i, "").trim().split(/\s+/);
    const cGio = normalizeCanName(pGio[0] || "Bính");
    const dChiGio = normalizeChiName(pGio[1] || "Ngọ");

    const canList4 = [cNam, cThang, cNgay, cGio];
    const chiList4 = [dChiNam, dChiThang, dChiNgay, dChiGio];

    // Khởi tạo bảng thống kê từng Can trong Tứ Trụ + Tàng Can
    const countChiTietCan = {
      "Giáp": 0, "Ất": 0,
      "Bính": 0, "Đinh": 0,
      "Mậu": 0, "Kỷ": 0,
      "Canh": 0, "Tân": 0,
      "Nhâm": 0, "Quý": 0
    };

    // 1. Cộng 4 Thiên Can
    canList4.forEach(can => {
      if (countChiTietCan[can] !== undefined) {
        countChiTietCan[can]++;
      }
    });

    // 2. Cộng các Can tàng ẩn trong 4 Địa Chi
    chiList4.forEach(chi => {
      const tangList = DIA_CHI_TANG_CAN[chi] || [];
      tangList.forEach(item => {
        if (countChiTietCan[item.can] !== undefined) {
          countChiTietCan[item.can]++;
        }
      });
    });

    // 3. Tính tổng số lượng theo từng Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ)
    const countsTuTru = {
      'Kim': countChiTietCan['Canh'] + countChiTietCan['Tân'],
      'Mộc': countChiTietCan['Giáp'] + countChiTietCan['Ất'],
      'Thủy': countChiTietCan['Nhâm'] + countChiTietCan['Quý'],
      'Hỏa': countChiTietCan['Bính'] + countChiTietCan['Đinh'],
      'Thổ': countChiTietCan['Mậu'] + countChiTietCan['Kỷ']
    };

    // Chuỗi diễn giải chi tiết từng hành chuẩn ảnh 2
    function buildDetailString(can1, can2) {
      const parts = [];
      if (countChiTietCan[can1] > 0) parts.push(`${countChiTietCan[can1]} ${can1}`);
      if (countChiTietCan[can2] > 0) parts.push(`${countChiTietCan[can2]} ${can2}`);
      if (parts.length === 0) return "0 (Khuyết)";
      return parts.join(" ");
    }

    const detailTho = buildDetailString('Mậu', 'Kỷ');
    const detailKim = buildDetailString('Canh', 'Tân');
    const detailThuy = buildDetailString('Nhâm', 'Quý');
    const detailMoc = buildDetailString('Giáp', 'Ất');
    const detailHoa = buildDetailString('Đinh', 'Bính');

    // Xác định hành vượng và hành suy
    const hanhVuong = [];
    const hanhSuy = [];
    for (let h of ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']) {
      if (countsTuTru[h] >= 3) hanhVuong.push(h);
      else hanhSuy.push(h);
    }

    let diemBoKhuyet = 0.5;
    let luanBoKhuyet = "";
    if (hanhSuy.includes(nguHanhSim)) {
      diemBoKhuyet = 0.5;
      luanBoKhuyet = `Ngũ hành của dãy số (${nguHanhSim}) là hành suy trong tứ trụ mệnh, giúp bổ trợ cân bằng cho tứ trụ mệnh, rất tốt.`;
    } else {
      diemBoKhuyet = 0.25;
      luanBoKhuyet = `Ngũ hành của dãy số (${nguHanhSim}) là hành vượng trong tứ trụ mệnh, gia tăng năng lượng vốn có của thân chủ.`;
    }

    // D. MỤC 3: KINH DỊCH LUẬN ĐOÁN (CÔNG THỨC: 5 SỐ ĐẦU LÀ QUẺ HẠ, 5 SỐ CUỐI LÀ QUẺ THƯỢNG)
    const simClean = String(soSim).replace(/\D/g, "");
    let sim10 = "";
    if (simClean.length >= 10) {
      sim10 = simClean.substr(0, 10);
    } else {
      sim10 = simClean.padStart(10, "0");
    }

    const namSoDauHa = sim10.substr(0, 5);      // 5 số đầu: Quẻ Hạ
    const namSoCuoiThuong = simClean.length >= 10 ? simClean.substr(-5) : sim10.substr(5, 5);  // 5 số cuối: Quẻ Thượng

    const sumHa = namSoDauHa.split("").reduce((a, b) => a + (parseInt(b, 10) || 0), 0);
    const sumThuong = namSoCuoiThuong.split("").reduce((a, b) => a + (parseInt(b, 10) || 0), 0);

    const haQuai = (sumHa % 8) || 8;           // Quẻ Hạ
    const thuongQuai = (sumThuong % 8) || 8;   // Quẻ Thượng

    const quaiNameHa = QUAI_NAME[haQuai] || "Khôn";
    const quaiTuongHa = QUAI_TUONG[haQuai] || "Địa";
    const quaiNameThuong = QUAI_NAME[thuongQuai] || "Khảm";
    const quaiTuongThuong = QUAI_TUONG[thuongQuai] || "Thủy";

    const queChu = traQue(thuongQuai, haQuai);
    const queHo = lapQueHo(thuongQuai, haQuai);

    // Xác định Hào Động và Quẻ Chính dựa vào Gợi Ý Xem Sim
    const GOI_Y_MAP = {
      "1": "Phụ Mẫu",
      "2": "Huynh Đệ",
      "3": "Tử Tôn",
      "4": "Thê Tài",
      "5": "Quan Quỷ"
    };
    const targetLucThan = GOI_Y_MAP[String(goiYVal)] || "Huynh Đệ";
    const dongHaoResult = xacDinhHaoDong(thuongQuai, haQuai, targetLucThan, canChiNgay);
    const coHaoDong = dongHaoResult.coHaoDong;
    const dongHaoIndex = dongHaoResult.haoIndex;
    const tenHaoDong = dongHaoResult.tenLucThan;
    const moTaLucThanAn = LUC_THAN_AN_MAP[targetLucThan] || "";

    let queChinhResult = null;
    let queChinh = null;
    let diemQueChinh = 0;

    if (coHaoDong && dongHaoResult.dongHaos && dongHaoResult.dongHaos.length > 0) {
      queChinhResult = lapQueChinh(thuongQuai, haQuai, dongHaoResult.dongHaos);
      if (queChinhResult) {
        queChinh = queChinhResult.info;
        if (queChinh.han.includes("Đại Cát")) diemQueChinh = 2.0;
        else if (queChinh.han.includes("Cát") || queChinh.han.includes("Hanh")) diemQueChinh = 1.5;
        else if (queChinh.han.includes("Bình")) diemQueChinh = 1.0;
        else if (queChinh.han.includes("Hung")) diemQueChinh = 0;
        else diemQueChinh = 0;
      }
    }

    let diemQueChu = 1.5;
    if (queChu.han.includes("Đại Cát")) diemQueChu = 2.0;
    else if (queChu.han.includes("Cát") || queChu.han.includes("Hanh")) diemQueChu = 1.5;
    else if (queChu.han.includes("Bình")) diemQueChu = 1.0;
    else if (queChu.han.includes("Hung")) diemQueChu = 0;
    else diemQueChu = 0;

    let diemQueHo = 1.5;
    if (queHo.info.han.includes("Đại Cát")) diemQueHo = 2.0;
    else if (queHo.info.han.includes("Cát") || queHo.info.han.includes("Hanh")) diemQueHo = 1.5;
    else if (queHo.info.han.includes("Bình")) diemQueHo = 1.0;
    else if (queHo.info.han.includes("Hung")) diemQueHo = 0;
    else diemQueHo = 0;

    // E. MỤC 4: CỬU TINH ĐỒ PHÁP
    let has8 = soSim.includes("8");
    let has9 = soSim.includes("9");
    let diemCuuTinh = 0.5;
    let luanCuuTinh = "";
    if (has8 && has9) {
      diemCuuTinh = 0.5;
      luanCuuTinh = `Sim có số 8 (hiện thân sao Bát Bạch - vượng khí Hạ nguyên) và số 9 (hiện thân sao Cửu Tử - sao Đương Lệnh vận 9 hiện tại). Cả hai cát tinh hội tụ kích phát sinh khí cát lành, hỗ trợ đắc lực vận trình tương lai.`;
    } else if (has8) {
      diemCuuTinh = 0.5;
      luanCuuTinh = `Sim có số 8 - là hiện thân của sao Bát Bạch cát tinh, giúp người dùng hội tụ được trường năng lượng cát khí ôn hòa, phúc đức bền vững.`;
    } else if (has9) {
      diemCuuTinh = 0.5;
      luanCuuTinh = `Sim có số 9 - là hiện thân của sao Cửu Tử - đệ nhất đại cát tinh đương quyền cai quản vận 9, mang lại thời cơ thăng tiến vượt bậc.`;
    } else {
      diemCuuTinh = 0.25;
      luanCuuTinh = `Dãy sim có năng lượng bình ổn, có thể bổ sung các số đương lệnh vận chín để gia tăng hưng thịnh.`;
    }

    // F. MỤC 5: QUAN NIỆM DÂN GIAN
    const totalSum = soSim.split("").reduce((a, b) => a + parseInt(b, 10), 0);
    const nut = (totalSum % 10) || 10;
    let diemNut = 0.5;
    if (nut >= 7) diemNut = 0.5;
    else if (nut >= 5) diemNut = 0.25;
    else diemNut = 0;

    const luckyPairsFound = [];
    if (soSim.includes("68")) luckyPairsFound.push("68 (Lộc phát)");
    if (soSim.includes("86")) luckyPairsFound.push("86 (Phát lộc)");
    if (soSim.includes("39")) luckyPairsFound.push("39 (Thần tài nhỏ)");
    if (soSim.includes("79")) luckyPairsFound.push("79 (Thần tài lớn)");
    if (soSim.includes("38")) luckyPairsFound.push("38 (Ông địa nhỏ)");
    if (soSim.includes("78")) luckyPairsFound.push("78 (Ông địa lớn)");
    if (/(\d)\1{2,}/.test(soSim)) luckyPairsFound.push("Tam hoa / Tứ quý");
    if (/6969|6868|8686/.test(soSim)) luckyPairsFound.push("Đuôi Taxi phong thủy cát tường (" + soSim.substr(-4) + ")");

    let diemDacBiet = luckyPairsFound.length > 0 ? 1.0 : 0.5;

    // G. TỔNG KẾT ĐIỂM SỐ
    let rawTotal = diemAmDuong + diemNguhanhSim + diemNoiTai + diemBoKhuyet + diemQueChu + diemQueHo + diemCuuTinh + diemNut + diemDacBiet;
    let totalScore = Math.min(10, Math.max(1, Math.round(rawTotal * 100) / 100));

    // Điểm Tốt, Điểm Xấu, Bình Hòa
    const itemsTot = [];
    const itemsXau = [];
    const itemsBinh = [];

    if (queChu.han.includes("Cát") || queChu.han.includes("Hanh")) {
      itemsTot.push(`Sim có quẻ chủ là: <strong>${queChu.ten}</strong> ${queChu.chuHan ? `(${queChu.chuHan})` : ""} là quẻ ${queChu.han}`);
    } else if (queChu.han.includes("Hung")) {
      itemsXau.push(`Quẻ chủ ${queChu.ten} thuộc quẻ hung`);
    }

    if (queHo.info.han.includes("Cát") || queHo.info.han.includes("Hanh")) {
      itemsTot.push(`Sim có quẻ hỗ là: <strong>${queHo.info.ten}</strong> ${queHo.info.chuHan ? `(${queHo.info.chuHan})` : ""} là quẻ ${queHo.info.han}`);
    }

    if (luckyPairsFound.length > 0) {
      itemsTot.push(`Chứa các thế số đại cát may mắn: ${luckyPairsFound.join(", ")}`);
    }

    if (diemAmDuong >= 1.5) {
      itemsTot.push(`Âm dương tương phối đạt chuẩn (${countEven} Âm - ${countOdd} Dương) bổ trợ cho bản mệnh`);
    }

    if (diemNguhanhSim === 0.75 || diemNguhanhSim === 1.5) {
      itemsBinh.push(`Sim có ngũ hành ${nguHanhSim} - bình hòa với ngũ hành bản mệnh thân chủ (ngũ hành ${hanhBanMenh})`);
    } else if (diemNguhanhSim === 2.0) {
      itemsTot.push(`Ngũ hành sim (${nguHanhSim}) tương sinh bản mệnh (${hanhBanMenh})`);
    } else if (diemNguhanhSim === 0) {
      itemsXau.push(`Ngũ hành sim (${nguHanhSim}) tương khắc bản mệnh (${hanhBanMenh})`);
    }

    if (countSinhInner === countKhacInner) {
      itemsBinh.push("Nội tại sim bình hòa");
    }

    if (itemsXau.length === 0) {
      itemsXau.push("Không có");
    }

    return {
      soSim,
      gioiTinhText: isNam ? "Nam mạng" : "Nữ mạng",
      canChiNam,
      canChiThang,
      canChiNgay,
      canChiGio,
      hanhBanMenh,
      napAmBanMenh,
      moTaTuongSinhKhacMenh,
      cungPhi,
      hanhCungPhi,
      trachMenh,
      huongHop,
      diemAmDuong,
      countEven,
      countOdd,
      pctEven,
      luanAmDuong,
      diemNguhanhSim,
      batQuaiDigits,
      freqHanh,
      luanXacDinhNguHanh,
      nguHanhSim,
      luanNguhanhSim,
      diemNoiTai,
      innerDigits,
      countSinhInner,
      countKhacInner,
      luanNoiTai,
      diemBoKhuyet,
      countsTuTru,
      countChiTietCan,
      detailTho,
      detailKim,
      detailThuy,
      detailMoc,
      detailHoa,
      canChiNam,
      canChiThang,
      canChiNgay,
      canChiGio,
      hanhVuong,
      hanhSuy,
      luanBoKhuyet,
      thuongQuai,
      haQuai,
      sim10,
      sim8: sim10,
      namSoDauHa,
      bonSoDauHa: namSoDauHa,
      namSoCuoiThuong,
      bonSoSauThuong: namSoCuoiThuong,
      sumHa,
      sumThuong,
      quaiNameHa,
      quaiTuongHa,
      quaiNameThuong,
      quaiTuongThuong,
      queChu,
      diemQueChu,
      queHo,
      diemQueHo,
      targetLucThan,
      dongHaoResult,
      coHaoDong,
      dongHaoIndex,
      tenHaoDong,
      moTaLucThanAn,
      queChinhResult,
      queChinh,
      diemQueChinh,
      diemCuuTinh,
      luanCuuTinh,
      nut,
      diemNut,
      diemDacBiet,
      luckyPairsFound,
      totalScore,
      itemsTot,
      itemsXau,
      itemsBinh
    };
  }

  // 3. RENDER GIAO DIỆN KẾT QUẢ ĐÚNG CHUẨN ẢNH 2 (PHONG THỦY SỐ)
  function renderBoiSimHTML(res) {
    if (!res) return "";

    const svgHaoChu = renderHaoDraw(res.thuongQuai, res.haQuai);
    const svgHaoHo = renderHaoDraw(res.queHo.thuong, res.queHo.ha);
    const svgHaoChinh = (res.coHaoDong && res.queChinhResult) ? renderHaoDraw(res.queChinhResult.thuong, res.queChinhResult.ha) : "";

    return `
      <div class="boisim-result-banner-title">KẾT QUẢ CHẤM ĐIỂM SIM CỦA BẠN THEO PHONG THỦY</div>
      <div class="boisim-result-body">
        
        <!-- THÔNG TIN THÂN CHỦ & DÃY SỐ -->
        <div class="boisim-overview-card">
          <div class="boisim-sim-badge-box">
            <svg class="boisim-batquai-icon" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="#FFF" stroke="#7A1414" stroke-width="4"/>
              <path d="M50,4 A46,46 0 0,1 50,96 A23,23 0 0,1 50,50 A23,23 0 0,0 50,4 Z" fill="#7A1414"/>
              <circle cx="50" cy="27" r="6" fill="#7A1414"/>
              <circle cx="50" cy="73" r="6" fill="#FFF"/>
            </svg>
            <div class="boisim-owner-tag">${res.canChiNam}</div>
            <div class="boisim-phone-large">${res.soSim}</div>
            <div class="boisim-gender-tag">${res.gioiTinhText}</div>
          </div>
          <div class="boisim-owner-details">
            <h4 style="font-family: 'Cinzel', 'Noto Serif', serif; font-size: 18px; color: #7A1414; margin: 0 0 10px 0; font-weight: 800; text-transform: uppercase; border-bottom: 1.5px solid #DFBA73; padding-bottom: 6px;">Thông Tin Thân Chủ</h4>
            <p><span>Tứ trụ ngày sinh:</span> ${res.canChiGio}, ${res.canChiNgay}, ${res.canChiThang}, Năm ${res.canChiNam}</p>
            <p><span>Ngũ hành:</span> Mạng ${res.napAmBanMenh}${res.moTaTuongSinhKhacMenh || ""}</p>
            <p><span>Cung mệnh:</span> Cung ${res.cungPhi} (hành ${res.hanhCungPhi})</p>
            <p><span>Trạch mệnh:</span> ${res.trachMenh}</p>
            <p><span>Hướng hợp tuổi:</span> ${res.huongHop}</p>
          </div>
        </div>

        <!-- MỤC 1: NGŨ HÀNH TƯƠNG SINH (ĐƯỢC CHUYỂN LÊN TRƯỚC THEO YÊU CẦU) -->
        <div class="boisim-block">
          <h3 class="boisim-block-title">Ngũ Hành Tương Sinh</h3>
          <div class="boisim-score-line boisim-score-line-nguhanh">
            <span class="boisim-score-label boisim-score-label-nguhanh">
              <span class="boisim-part-title"><span class="taiji-icon">☯</span> Ngũ hành sinh khắc</span>
              <span class="boisim-part-sub"><span class="boisim-word-giua">giữa</span> sim và bản mệnh: <strong class="boisim-score-pill boisim-score-pill-inline">${res.diemNguhanhSim} điểm</strong></span>
            </span>
          </div>

          <div class="boisim-table-heading">Xác định ngũ hành sim:</div>

          <!-- BẢNG NGUYÊN LÝ BÁT QUÁI LẠC THƯ (CHUẨN THEO HÌNH ẢNH YÊU CẦU) -->
          <div style="background: #FFFDF9; border: 1.5px solid #DFBA73; border-radius: 6px; padding: 12px 16px; margin: 10px 0 14px 0;">
            <div style="font-weight: 700; color: #7A1414; font-size: 14px; margin-bottom: 8px;">✦ BẢNG QUY ƯỚC NGŨ HÀNH CÁC CON SỐ THEO BÁT QUÁI LẠC THƯ ✦</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 6px 14px; font-size: 13.5px; color: #374151;">
              <div>• <strong>1</strong> Là Quẻ Khảm Thuộc Thủy</div>
              <div>• <strong>2</strong> Là Quẻ Cấn Thuộc Thổ</div>
              <div>• <strong>5</strong> Trung Cung Thuộc thổ</div>
              <div>• <strong>8</strong> Là Quẻ Khôn Thuộc Thổ</div>
              <div>• <strong>6</strong> Là Quẻ Càn Thuộc Kim</div>
              <div>• <strong>7</strong> Là Quẻ Đoài Thuộc Kim</div>
              <div>• <strong>9</strong> Là Quẻ Ly Thuộc Hỏa</div>
              <div>• <strong>3, 4</strong> Là Quẻ Chấn, Tốn Thuộc Mộc</div>
            </div>
          </div>

          <!-- BẢNG ĐỐI CHIẾU 10 CON SỐ CỦA DÃY SIM THEO BÁT QUÁI & NGŨ HÀNH -->
          <div class="boisim-nguhanh-table-wrap">
            <table class="boisim-nguhanh-table">
              <thead>
                <tr>
                  <th style="font-size: 13.5px; width: 130px; background: #8A1818; color: #FEEBC8;">CON SỐ</th>
                  ${res.batQuaiDigits.map(d => `<th style="font-size: 18px; background: #8A1818;">${d.digit}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight: 700; background: #FFF8EE; color: #7A1414; border: 1px solid #DFBA73;">QUẺ BÁT QUÁI</td>
                  ${res.batQuaiDigits.map(d => `<td style="background: #FFFDF9; color: #1F2937; border: 1px solid #DFBA73; font-weight: 600; font-size: 13px;">${d.que}</td>`).join("")}
                </tr>
                <tr>
                  <td style="font-weight: 700; background: #FFF8EE; color: #7A1414; border: 1px solid #DFBA73;">NGŨ HÀNH</td>
                  ${res.batQuaiDigits.map(d => {
                    let c = "#4B5563";
                    if (d.hanh === "Thổ") c = "#D97706";
                    else if (d.hanh === "Hỏa") c = "#DC2626";
                    else if (d.hanh === "Thủy") c = "#2563EB";
                    else if (d.hanh === "Mộc") c = "#16A34A";
                    return `<td style="background: #FFFDF9; color: ${c}; border: 1px solid #DFBA73; font-weight: 800; font-size: 14px;">${d.hanh}</td>`;
                  }).join("")}
                </tr>
              </tbody>
            </table>
          </div>

          <div class="boisim-sub-highlight">
            Ngũ hành dãy số: <strong>${res.nguHanhSim}</strong>
          </div>
          <p class="boisim-explain-text" style="margin: 8px 0 14px 0;">
            ${res.luanXacDinhNguHanh}
          </p>

          <!-- Sơ đồ Vòng Ngũ Hành Tương Sinh Tương Khắc (Có Nút Hỏa trên đỉnh) -->
          <div class="boisim-diagram-box">
            <div style="font-weight: 700; color: #A35F0F; font-size: 14px; margin-bottom: 8px;">✦ ĐỒ HÌNH SINH KHẮC BẢN MỆNH &amp; SIM ✦</div>
            <svg class="boisim-diagram-svg" viewBox="0 0 320 290">
              <!-- Vòng ngũ hành sinh -->
              <circle cx="160" cy="148" r="85" fill="none" stroke="#D97706" stroke-width="2" stroke-dasharray="4,4" />
              <!-- Mũi tên sao khắc -->
              <polygon points="160,58 245,198 65,118 255,118 75,198" fill="none" stroke="#C52222" stroke-width="1.5" opacity="0.6"/>
              
              <!-- Nút HỎA (Đỉnh cao nhất) -->
              <g transform="translate(160, 50)">
                <circle r="26" fill="#DC2626" stroke="#DFBA73" stroke-width="2"/>
                <text text-anchor="middle" y="-2" fill="#FFF" font-size="12">🔥</text>
                <text text-anchor="middle" y="14" fill="#FFF" font-weight="bold" font-size="11">HỎA</text>
              </g>
              <!-- Nút THỔ -->
              <g transform="translate(245, 125)">
                <circle r="27" fill="#D97706" stroke="${res.hanhBanMenh === 'Thổ' ? '#DC2626' : '#DFBA73'}" stroke-width="${res.hanhBanMenh === 'Thổ' ? '4' : '2'}"/>
                <text text-anchor="middle" y="5" fill="#FFF" font-weight="bold" font-size="13">THỔ</text>
                ${res.hanhBanMenh === 'Thổ' ? '<text text-anchor="middle" y="40" fill="#DC2626" font-size="10.5" font-weight="bold">(Bản Mệnh)</text>' : ''}
              </g>
              <!-- Nút KIM -->
              <g transform="translate(215, 225)">
                <circle r="27" fill="#6B7280" stroke="${res.nguHanhSim === 'Kim' ? '#DC2626' : '#DFBA73'}" stroke-width="${res.nguHanhSim === 'Kim' ? '4' : '2'}"/>
                <text text-anchor="middle" y="5" fill="#FFF" font-weight="bold" font-size="13">KIM</text>
                ${res.nguHanhSim === 'Kim' ? '<text text-anchor="middle" y="40" fill="#DC2626" font-size="10.5" font-weight="bold">(Hành Sim)</text>' : ''}
              </g>
              <!-- Nút THỦY -->
              <g transform="translate(105, 225)">
                <circle r="25" fill="#2563EB" stroke="#DFBA73" stroke-width="2"/>
                <text text-anchor="middle" y="5" fill="#FFF" font-weight="bold" font-size="13">THỦY</text>
              </g>
              <!-- Nút MỘC -->
              <g transform="translate(75, 125)">
                <circle r="25" fill="#16A34A" stroke="#DFBA73" stroke-width="2"/>
                <text text-anchor="middle" y="5" fill="#FFF" font-weight="bold" font-size="13">MỘC</text>
              </g>
            </svg>
            <span style="font-size: 12px; color: #7B6858; margin-top: 6px;">Vòng tròn ngoài: Tương sinh • Đường nối trong: Tương khắc</span>
          </div>

          <div class="boisim-sub-highlight">
            ${res.luanNguhanhSim}
          </div>

          <!-- SỰ SINH KHẮC CỦA DÃY SỐ (CHUẨN CÔNG THỨC ẢNH 2) -->
          <div style="background: #FFFDF9; border: 1.5px solid #DFBA73; border-radius: 6px; padding: 14px 16px; margin: 20px 0 14px 0;">
            <div style="font-weight: 700; color: #7A1414; font-size: 15px; margin-bottom: 8px;">Sự Sinh Khắc Của Dãy Số</div>
            <p style="font-size: 13.5px; color: #374151; line-height: 1.7; margin: 0 0 10px 0; text-align: justify;">
              - Số 5 là sao Ngũ Hoàng luôn đóng ở <strong>Trung Cung</strong> vì thế nó luôn có ngũ hành thuộc <strong>Thổ</strong> và số 5 là số lẻ cho nên là <strong>Thổ Dương</strong> mà trong “Vũ Trụ Vạn Vật” có <strong>Dương</strong> ắt có <strong>Âm</strong> vì thế ở bên cạnh số 5 sẽ là số 6 và cũng mang ngũ hành thuộc <strong>Thổ</strong> mà số 6 là số chẵn nên sẽ mang ngũ hành là <strong>Thổ Âm</strong> khi đã có trời và đất có Âm Có Dương thì lúc này sẽ sinh ra tiếp các ngũ hành đó là <strong>Kim - Thủy - Mộc - Hỏa</strong>
            </p>
            <div style="font-weight: 700; color: #111; font-size: 13.5px; margin-bottom: 8px;">Sau Đây Là Bảng Ngũ Hành Của Dãy Số:</div>
            
            <div class="boisim-dayso-table-wrap" style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: center; border: 1px solid #333; font-size: 13.5px; background: #FFF;">
                <thead>
                  <tr style="background: #FFF;">
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">0</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">1</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">2</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">3</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">4</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">5</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">6</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">7</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">8</th>
                    <th style="border: 1px solid #333; padding: 6px 8px; font-weight: 700;">9</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #111;">Thủy -</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #16A34A;">Mộc +</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #16A34A;">Mộc -</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #DC2626;">Hỏa +</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #DC2626;">Hỏa -</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #D97706;">Thổ +</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #D97706;">Thổ -</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #71717A;">Kim +</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #71717A;">Kim -</td>
                    <td style="border: 1px solid #333; padding: 6px 8px; font-weight: 700; color: #111;">Thủy +</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- BẢNG SINH KHẮC NỘI TẠI DÃY SỐ (CHUẨN ẢNH 1) -->
          <div class="boisim-score-line boisim-score-line-noitai" style="margin-top: 14px;">
            <span class="boisim-score-label">Sinh khắc nội tại dãy số: <strong class="boisim-score-pill boisim-score-pill-inline">${res.diemNoiTai > 0 ? '+' : ''}${res.diemNoiTai} điểm</strong></span>
          </div>
          <div class="boisim-noitai-wrap" style="overflow-x: auto; margin: 12px 0;">
            <table class="boisim-noitai-table">
              <tbody>
                <tr class="boisim-noitai-digits">
                  ${res.innerDigits.map(d => `<td>${d.digit}</td>`).join("")}
                </tr>
                <tr class="boisim-noitai-elements">
                  ${res.innerDigits.map((d, i) => {
                    let bg = "#71717A"; // Kim
                    if (d.hanh === "Thủy") bg = "#2563EB";
                    else if (d.hanh === "Hỏa") bg = "#DC2626";
                    else if (d.hanh === "Thổ") bg = "#D97706";
                    else if (d.hanh === "Mộc") bg = "#16A34A";

                    let badge = "";
                    if (d.rel === 'sinh') {
                      badge = '<span class="boisim-sub-label label-sinh" style="display:block; font-size:10.5px; color:#15803D; font-weight:bold; margin-top:3px;">Sinh</span>';
                    } else if (d.rel === 'khắc') {
                      badge = '<span class="boisim-sub-label label-khac" style="display:block; font-size:10.5px; color:#DC2626; font-weight:bold; margin-top:3px;">Khắc</span>';
                    }
                    return `<td><span class="boisim-noitai-icon" style="background: ${bg}; padding: 3px 8px; border-radius: 4px; color:#fff; font-size:12px; font-weight:bold;">${d.hanh}</span>${badge}</td>`;
                  }).join("")}
                </tr>
              </tbody>
            </table>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 14.5px; color: #1F2937; margin: 10px 0 16px 0; font-weight: 500;">
            <span style="display: inline-block; width: 4px; height: 18px; background: #8A1818; border-radius: 2px;"></span>
            <span>${res.luanNoiTai}</span>
          </div>

          <!-- BẢNG BỔ KHUYẾT TỨ TRỤ MỆNH THEO CAN CHI TÀNG ẨN (CHUẨN ẢNH 3) -->
          <div class="boisim-score-line boisim-score-line-bokhuyet" style="margin-top: 18px;">
            <span class="boisim-score-label boisim-score-label-bokhuyet">
              <span class="boisim-bk-title-top">Bổ khuyết tứ trụ mệnh</span>
              <span class="boisim-bk-title-sub"><span class="boisim-word-theo">theo</span> can chi tàng ẩn: <strong class="boisim-score-pill boisim-score-pill-inline">${res.diemBoKhuyet} điểm</strong></span>
            </span>
          </div>
          <div class="boisim-bokhuyet-wrap" style="overflow-x: auto; margin: 12px 0;">
            <table style="width: 100%; max-width: 650px; border-collapse: collapse; text-align: center; border: 1.5px solid #333; font-size: 14px; background: #FFF;">
              <thead>
                <tr style="background: #FFF;">
                  <th style="border: 1px solid #333; padding: 8px 6px; font-weight: 700; color: #CA8A04; font-size: 16px; width: 20%;">Thổ</th>
                  <th style="border: 1px solid #333; padding: 8px 6px; font-weight: 700; color: #71717A; font-size: 16px; width: 20%;">Kim:</th>
                  <th style="border: 1px solid #333; padding: 8px 6px; font-weight: 700; color: #111827; font-size: 16px; width: 20%;">Thủy:</th>
                  <th style="border: 1px solid #333; padding: 8px 6px; font-weight: 700; color: #16A34A; font-size: 16px; width: 20%;">Mộc:</th>
                  <th style="border: 1px solid #333; padding: 8px 6px; font-weight: 700; color: #DC2626; font-size: 16px; width: 20%;">Hỏa:</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #FFF;">
                  <td style="border: 1px solid #333; padding: 8px 4px; vertical-align: middle;">
                    <!-- Icon Thổ (Núi Đất) -->
                    <svg width="44" height="36" viewBox="0 0 46 38" fill="none" style="display:inline-block; vertical-align:middle;">
                      <path d="M23 7L35 27H11L23 7Z" fill="#D97706" />
                      <path d="M23 7L17 27H11L23 7Z" fill="#B45309" />
                      <path d="M23 7L29 27H35L23 7Z" fill="#F59E0B" />
                      <path d="M4 27C12 23 18 25 24 27C30 29 36 25 42 27C42 30 38 32 30 32C20 32 10 32 4 30V27Z" fill="#B45309" />
                      <path d="M8 29C15 27 22 28 28 30C34 31 38 29 40 30" stroke="#FDE68A" stroke-width="1" stroke-linecap="round" />
                    </svg>
                  </td>
                  <td style="border: 1px solid #333; padding: 8px 4px; vertical-align: middle;">
                    <!-- Icon Kim (Sao Kim Cương Phát Sáng) -->
                    <svg width="44" height="36" viewBox="0 0 46 38" fill="none" style="display:inline-block; vertical-align:middle;">
                      <path d="M23 3L25.8 15.2L38 19L25.8 22.8L23 35L20.2 22.8L8 19L20.2 15.2L23 3Z" fill="#EAB308" />
                      <path d="M23 8L24.8 16.5L33 19L24.8 21.5L23 30L21.2 21.5L13 19L21.2 16.5L23 8Z" fill="#FACC15" />
                      <path d="M15 11L17.5 17.5L11 15L17.5 17.5L15 27L18.5 20.5L21 27L18.5 20.5L29 25L22.5 19L29 13L22.5 17.5L25 9L19.5 16.5L15 11Z" fill="#FEF08A" opacity="0.6"/>
                      <circle cx="23" cy="19" r="3" fill="#FFFFFF" />
                    </svg>
                  </td>
                  <td style="border: 1px solid #333; padding: 8px 4px; vertical-align: middle;">
                    <!-- Icon Thủy (Sóng Nước) -->
                    <svg width="44" height="36" viewBox="0 0 46 38" fill="none" style="display:inline-block; vertical-align:middle;">
                      <path d="M8 25C12 17 19 16 24 22C28 27 34 26 38 21C37 27 30 31 23 29C17 27 13 29 8 25Z" fill="#0284C7"/>
                      <path d="M12 21C16 14 23 13 28 18C31 22 35 21 38 18C36 23 31 26 26 24C21 22 17 24 12 21Z" fill="#0EA5E9"/>
                      <path d="M16 16C19 11 25 10 29 14C31 16 34 16 36 14C35 18 31 20 28 19C24 18 20 19 16 16Z" fill="#38BDF8"/>
                      <circle cx="29" cy="9" r="3.5" fill="#38BDF8"/>
                      <circle cx="36" cy="13" r="2" fill="#7DD3FC"/>
                    </svg>
                  </td>
                  <td style="border: 1px solid #333; padding: 8px 4px; vertical-align: middle;">
                    <!-- Icon Mộc (Cây Xanh) -->
                    <svg width="44" height="36" viewBox="0 0 46 38" fill="none" style="display:inline-block; vertical-align:middle;">
                      <rect x="21" y="22" width="4" height="11" rx="1" fill="#78350F" />
                      <circle cx="23" cy="14" r="11" fill="#22C55E"/>
                      <circle cx="16" cy="17" r="8" fill="#16A34A"/>
                      <circle cx="30" cy="17" r="8" fill="#15803D"/>
                      <circle cx="23" cy="10" r="8" fill="#4ADE80"/>
                      <circle cx="19" cy="13" r="4" fill="#86EFAC"/>
                    </svg>
                  </td>
                  <td style="border: 1px solid #333; padding: 8px 4px; vertical-align: middle;">
                    <!-- Icon Hỏa (Ngọn Lửa) -->
                    <svg width="44" height="36" viewBox="0 0 46 38" fill="none" style="display:inline-block; vertical-align:middle;">
                      <path d="M23 4C23 4 29 13 29 19C29 26 21 31 23 35C17 33 13 27 13 21C13 14 19 10 23 4Z" fill="#DC2626"/>
                      <path d="M23 14C23 14 27.5 19 27.5 22.5C27.5 27 22.5 30 24 33.5C20.5 32.5 17 28 17 24C17 19.5 21 16.5 23 14Z" fill="#EA580C"/>
                      <path d="M23 22C23 22 25.5 24.5 25.5 27C25.5 29.5 23 31.5 23.5 33C21.5 32.5 19.5 30 19.5 28C19.5 25.5 21.5 23.5 23 22Z" fill="#FACC15"/>
                    </svg>
                  </td>
                </tr>
                <tr style="background: #FFF;">
                  <td style="border: 1px solid #333; padding: 10px 4px; font-weight: 700; font-size: 14.5px; color: #111827;">${res.detailTho}</td>
                  <td style="border: 1px solid #333; padding: 10px 4px; font-weight: 700; font-size: 14.5px; color: #111827;">${res.detailKim}</td>
                  <td style="border: 1px solid #333; padding: 10px 4px; font-weight: 700; font-size: 14.5px; color: #111827;">${res.detailThuy}</td>
                  <td style="border: 1px solid #333; padding: 10px 4px; font-weight: 700; font-size: 14.5px; color: #111827;">${res.detailMoc}</td>
                  <td style="border: 1px solid #333; padding: 10px 4px; font-weight: 700; font-size: 14.5px; color: #111827;">${res.detailHoa}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="boisim-sub-highlight">
            Các hành vượng: ${res.hanhVuong.join(" và ") || "Không có"}
          </div>
          <div style="font-size: 14.5px; color: #374151; margin: 4px 0 6px 12px;">
            <strong>Các hành suy:</strong> ${res.hanhSuy.join(" và ") || "Không có"}
          </div>
          <div style="font-size: 14.5px; color: #374151; margin: 4px 0 14px 12px;">
            ${res.luanBoKhuyet}
          </div>
        </div>

        <!-- MỤC 2: CÂN BẰNG ÂM DƯƠNG (CHUYỂN XUỐNG SAU NGŨ HÀNH THEO YÊU CẦU) -->
        <div class="boisim-block">
          <h3 class="boisim-block-title">Cân Bằng Âm Dương</h3>
          <div class="boisim-score-line">
            <span class="boisim-score-label"><span class="taiji-icon">☯</span> Âm dương tương phối:</span>
            <span class="boisim-score-pill">${res.diemAmDuong} điểm</span>
          </div>
          <i class="boisim-intro-italic">
            "Vạn vật sinh thành từ Âm Dương hội tụ; Âm Dương có cân bằng thì sinh khí mới dồi dào, phúc lộc mới bền vững (Dương ứng với số lẻ, Âm ứng với số chẵn).
          </i>
          <p class="boisim-explain-text">
            ${res.luanAmDuong}
          </p>
        </div>

        <!-- MỤC 3: KINH DỊCH LUẬN ĐOÁN (CHUẨN ẢNH 2) -->
        <div class="boisim-block">
          <h3 class="boisim-block-title">Kinh Dịch Luận Đoán</h3>

          <!-- QUY TẮC LẬP QUẺ (5 SỐ ĐẦU LÀ HẠ, 5 SỐ CUỐI LÀ THƯỢNG, ĐỘNG HÀO THEO GỢI Ý XEM SIM) -->
          <div style="background: #FFFDF9; border: 1.5px solid #DFBA73; border-radius: 6px; padding: 10px 14px; margin-bottom: 14px; font-size: 13.5px; color: #374151; line-height: 1.65;">
            ✦ <strong>Quy tắc lập quẻ:</strong> 5 số đầu lập <strong>Quẻ Hạ</strong>, 5 số cuối lập <strong>Quẻ Thượng</strong> của dãy sim: <strong>${res.soSim}</strong>
            <br>• <strong>5 số đầu:</strong> <strong>${res.namSoDauHa}</strong> (tổng = ${res.sumHa}, chia 8 dư ${res.sumHa % 8 || 8}) &rarr; <strong>Quẻ Hạ</strong>: ${res.quaiNameHa} (${res.quaiTuongHa})
            <br>• <strong>5 số cuối:</strong> <strong>${res.namSoCuoiThuong}</strong> (tổng = ${res.sumThuong}, chia 8 dư ${res.sumThuong % 8 || 8}) &rarr; <strong>Quẻ Thượng</strong>: ${res.quaiNameThuong} (${res.quaiTuongThuong})
            <br>&rArr; Kết hợp Thượng quái trên Hạ quái dưới ta được <strong>Quẻ Chủ: ${res.queChu.ten}</strong>.
            <br>• <strong>Gợi ý xem sim:</strong> Chọn hào <strong>${res.targetLucThan}</strong>.
            ${res.coHaoDong 
              ? `<br>&rArr; Đối chiếu Lục Thân Quẻ Chủ: Động <strong>Hào ${res.dongHaoResult.dongHaos.join(" và Hào ")} (${res.targetLucThan})</strong> &rarr; Xuất ra <strong>Quẻ Chính: ${res.queChinh.ten}</strong>.`
              : `<br>&rArr; Đối chiếu Lục Thân Quẻ Chủ (${res.queChu.ten}): Trong 6 hào <strong>KHÔNG CÓ hào ${res.targetLucThan}</strong> (chỉ gồm các hào: <em>${res.dongHaoResult.distinctLucThan.join(", ")}</em>) &rarr; Quẻ Chủ <strong>không có hào động</strong>, do đó <strong>không xuất ra Quẻ chính</strong>.`}
          </div>

          <!-- Quẻ Chủ -->
          <div class="boisim-score-line">
            <span class="boisim-score-label">Quẻ chủ:</span>
            <span class="boisim-score-pill">${res.diemQueChu} điểm</span>
          </div>
          <div class="boisim-que-grid">
            <div>
              <p style="margin: 0 0 6px 0; font-size: 14.5px;">Quẻ chủ của dãy số là quẻ số <strong>${res.queChu.so}</strong> | <strong>${res.queChu.ten}</strong> ${res.queChu.chuHan ? `(${res.queChu.chuHan})` : ""}.</p>
              <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Loại quẻ:</strong> <span style="color: ${res.queChu.han.includes('Hung') ? '#DC2626' : (res.queChu.han.includes('Bình') ? '#D97706' : '#15803D')}; font-weight: 700;">${res.queChu.han}</span></p>
              <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Chiêm quẻ tốt cho việc:</strong> ${res.queChu.totCho}</p>
              ${res.queChu.loiKinh ? `<p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Lời kinh:</strong> ${res.queChu.loiKinh}</p>` : ""}
              ${res.queChu.dichAm ? `<p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Dịch âm:</strong> ${res.queChu.dichAm}</p>` : ""}
              <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Dịch nghĩa:</strong> ${res.queChu.dichNghia}</p>
              <p style="margin: 6px 0 4px 0; font-size: 13.5px;"><strong>Luận quẻ:</strong></p>
              <div style="font-size: 13.5px; line-height: 1.65; color: #4B5563; text-align: justify; margin-bottom: 8px;">
                ${res.queChu.luanQue || (res.queChu.han.includes('Hung') ? "Tượng quẻ hung hiểm, chứa đựng bất trắc và hao tổn. Thân chủ cần hết sức cẩn trọng khi sử dụng, đề phòng tiểu nhân và rủi ro." : "Tượng quẻ hòa hợp, âm dương tương giao chuyển hóa hung hiểm thành hanh thông. Dãy số giúp gia chủ đưa ra quyết định sáng suốt, mở rộng đường tài lộc.")}
              </div>
            </div>
            <div class="boisim-que-side">
              <span style="font-size: 13px; font-weight: 700; color: #7A1414;">Quẻ chủ</span>
              <span style="font-size: 12px; color: #6B7280;">(Quẻ số ${res.queChu.so})</span>
              ${svgHaoChu}
              <span style="font-size: 13.5px; font-weight: 800; color: #7A1414;">${res.queChu.ten}</span>
            </div>
          </div>

          <!-- Quẻ Hỗ -->
          <div class="boisim-score-line" style="margin-top: 18px;">
            <span class="boisim-score-label">Quẻ hỗ:</span>
            <span class="boisim-score-pill">${res.diemQueHo} điểm</span>
          </div>
          <div class="boisim-que-grid">
            <div>
              <p style="margin: 0 0 6px 0; font-size: 14.5px;">Quẻ hỗ của dãy số là quẻ số <strong>${res.queHo.info.so}</strong> | <strong>${res.queHo.info.ten}</strong> ${res.queHo.info.chuHan ? `(${res.queHo.info.chuHan})` : ""}.</p>
              <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Loại quẻ:</strong> <span style="color: ${res.queHo.info.han.includes('Hung') ? '#DC2626' : (res.queHo.info.han.includes('Bình') ? '#D97706' : '#15803D')}; font-weight: 700;">${res.queHo.info.han}</span></p>
              <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Chiêm quẻ tốt cho việc:</strong> ${res.queHo.info.totCho}</p>
              ${res.queHo.info.loiKinh ? `<p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Lời kinh:</strong> ${res.queHo.info.loiKinh}</p>` : ""}
              ${res.queHo.info.dichAm ? `<p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Dịch âm:</strong> ${res.queHo.info.dichAm}</p>` : ""}
              <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Dịch nghĩa:</strong> ${res.queHo.info.dichNghia}</p>
              <p style="margin: 6px 0 4px 0; font-size: 13.5px;"><strong>Luận quẻ:</strong></p>
              <div style="font-size: 13.5px; line-height: 1.65; color: #4B5563; text-align: justify; margin-bottom: 8px;">
                ${res.queHo.info.luanQue || (res.queHo.info.han.includes('Hung') ? "Quẻ hỗ mang trường khí hung hại ẩn tàng từ bên trong, cảnh báo nguy cơ suy vi hoặc bất lợi tiềm ẩn, cần giữ gìn hòa khí và phòng ngừa cẩn trọng." : "Quẻ hỗ bổ trợ âm thầm từ bên trong, giúp công danh hưng vượng, nguồn tài chính ổn định và bền vững theo thời gian.")}
              </div>
            </div>
            <div class="boisim-que-side">
              <span style="font-size: 13px; font-weight: 700; color: #7A1414;">Quẻ hỗ</span>
              <span style="font-size: 12px; color: #6B7280;">(Quẻ số ${res.queHo.info.so})</span>
              ${svgHaoHo}
              <span style="font-size: 13.5px; font-weight: 800; color: #7A1414;">${res.queHo.info.ten}</span>
            </div>
          </div>

          <!-- Quẻ Chính (Xuất ra từ Hào Động theo Gợi ý xem sim, hoặc thông báo nếu là Quẻ Tĩnh không có Hào Động) -->
          ${res.coHaoDong && res.queChinh ? `
            <div class="boisim-score-line" style="margin-top: 18px;">
              <span class="boisim-score-label">Quẻ chính:</span>
              <span class="boisim-score-pill">${res.diemQueChinh} điểm</span>
            </div>
            <div class="boisim-que-grid">
              <div>
                <p style="margin: 0 0 6px 0; font-size: 14.5px;">Quẻ chính (biến từ Quẻ chủ khi động <strong>Hào ${res.dongHaoResult.dongHaos.join(" và Hào ")} - ${res.targetLucThan}</strong>) là quẻ số <strong>${res.queChinh.so}</strong> | <strong>${res.queChinh.ten}</strong> ${res.queChinh.chuHan ? `(${res.queChinh.chuHan})` : ""}.</p>
                <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Loại quẻ:</strong> <span style="color: ${res.queChinh.han.includes('Hung') ? '#DC2626' : (res.queChinh.han.includes('Bình') ? '#D97706' : '#15803D')}; font-weight: 700;">${res.queChinh.han}</span></p>
                <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Chiêm quẻ tốt cho việc:</strong> ${res.queChinh.totCho}</p>
                ${res.queChinh.loiKinh ? `<p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Lời kinh:</strong> ${res.queChinh.loiKinh}</p>` : ""}
                ${res.queChinh.dichAm ? `<p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Dịch âm:</strong> ${res.queChinh.dichAm}</p>` : ""}
                <p style="margin: 0 0 6px 0; font-size: 13.5px;"><strong>Dịch nghĩa:</strong> ${res.queChinh.dichNghia}</p>
                <p style="margin: 6px 0 4px 0; font-size: 13.5px;"><strong>Luận quẻ:</strong></p>
                <div style="font-size: 13.5px; line-height: 1.65; color: #4B5563; text-align: justify; margin-bottom: 8px;">
                  ${res.queChinh.luanQue || (res.queChinh.han.includes('Hung') ? "Tượng quẻ hung hiểm, cảnh báo việc chiêm đoán gặp trở ngại hoặc biến động bất trắc, cần giữ tâm chính trực và phòng ngừa rủi ro." : "Tượng quẻ chính mang năng lượng hanh thông thuận lợi, báo hiệu việc mưu cầu thuận lợi, công việc và tâm nguyện đạt được kết quả như ý.")}
                </div>
              </div>
              <div class="boisim-que-side">
                <span style="font-size: 13px; font-weight: 700; color: #7A1414;">Quẻ chính</span>
                <span style="font-size: 12px; color: #6B7280;">(Quẻ số ${res.queChinh.so})</span>
                ${svgHaoChinh}
                <span style="font-size: 13.5px; font-weight: 800; color: #7A1414;">${res.queChinh.ten}</span>
              </div>
            </div>
          ` : `
            <div class="boisim-score-line" style="margin-top: 18px;">
              <span class="boisim-score-label">Quẻ chính:</span>
              <span class="boisim-score-pill" style="background: #F3F4F6; color: #6B7280; border-color: #D1D5DB;">Không xuất hiện</span>
            </div>
            <div style="background: #FFFDF9; border: 1.5px dashed #DFBA73; border-radius: 6px; padding: 14px 18px; margin: 12px 0; font-size: 13.5px; color: #374151; line-height: 1.7;">
              ✦ <strong>Quẻ chủ là Quẻ Tĩnh (Không xuất ra Quẻ chính):</strong>
              <br>Theo quy luật Dịch học, <strong>Quẻ chính (Quẻ biến)</strong> chỉ được hình thành khi trên Quẻ chủ có ít nhất một <strong>Hào Động</strong> phát sinh (từ Âm chuyển Dương hoặc Dương chuyển Âm).
              <br>• Ở mục <em>Gợi ý xem sim</em> đang chọn là hào <strong>${res.targetLucThan}</strong>.
              <br>• Khi đối chiếu 6 hào của Quẻ chủ <strong>${res.queChu.ten}</strong>: Quẻ chỉ gồm các hào [<strong>${res.dongHaoResult.distinctLucThan.join(", ")}</strong>], hoàn toàn <strong>không có hào ${res.targetLucThan}</strong>.
              <br>&rArr; Do đó, Quẻ chủ không phát sinh hào động nên <strong>không có quẻ biến và không xuất ra Quẻ chính</strong>. Toàn bộ cát hung và trường khí phong thủy của dãy số quy tụ trọn vẹn vào <strong>Quẻ Chủ (${res.queChu.ten})</strong> và <strong>Quẻ Hỗ (${res.queHo.info.ten})</strong>.
              <div style="margin-top: 10px; font-size: 13.5px; color: #1F2937; line-height: 1.65;">
                <strong>${res.targetLucThan} ẩn:</strong> ${res.moTaLucThanAn || LUC_THAN_AN_MAP[res.targetLucThan] || ''}
              </div>
            </div>
          `}
        </div>

        <!-- MỤC 4: CỬU TINH ĐỒ PHÁP -->
        <div class="boisim-block">
          <h3 class="boisim-block-title">Cửu Tinh Đồ Pháp</h3>
          <div class="boisim-score-line">
            <span class="boisim-score-label">Cửu tinh đồ pháp:</span>
            <span class="boisim-score-pill">${res.diemCuuTinh} điểm</span>
          </div>
          <div style="text-align: center; margin: 16px auto 14px auto;">
            <img src="assets/cuu_tinh_do_phap.png" alt="Cửu Tinh Đồ Pháp" style="max-width: 280px; width: 100%; height: auto; display: inline-block; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); background: #FFF;">
          </div>
          <p class="boisim-explain-text">
            ${res.luanCuuTinh}
          </p>
        </div>

        <!-- MỤC 5: QUAN NIỆM DÂN GIAN -->
        <div class="boisim-block">
          <h3 class="boisim-block-title">Quan Niệm Dân Gian</h3>
          <div class="boisim-score-line">
            <span class="boisim-score-label">Tổng nút dãy số:</span>
            <span class="boisim-score-pill">${res.diemNut} điểm</span>
          </div>
          <div style="font-size: 14.5px; margin-bottom: 12px; color: #1F2937;">
            Tổng số nút của dãy số: <strong>${res.nut}</strong> ${res.nut >= 7 ? "(Nút cao cát tường)" : "(Nút trung bình)"}
          </div>

          <div class="boisim-score-line">
            <span class="boisim-score-label">Số đặc biệt:</span>
            <span class="boisim-score-pill">${res.diemDacBiet} điểm</span>
          </div>
          <div style="font-size: 14.5px; color: #A35F0F; font-weight: 700; line-height: 1.6;">
            ${res.luckyPairsFound.length > 0 ? "Có các cặp số may mắn: " + res.luckyPairsFound.join(" • ") : "Các con số sắp xếp ổn định, liền mạch"}
          </div>
        </div>

        <!-- TỔNG KẾT BẢNG 3 CỘT (CHUẨN ẢNH 2) -->
        <div class="boisim-summary-card">
          <div class="boisim-summary-title">Kết luận phong thủy sim ${res.soSim}</div>
          <div class="boisim-summary-3cols">
            <!-- Cột Điểm Tốt -->
            <div class="boisim-col-box boisim-col-tot">
              <div class="boisim-col-header">✦ ĐIỂM TỐT ✦</div>
              ${res.itemsTot.map(it => `<div class="boisim-col-item"><span>✔</span> <span>${it}</span></div>`).join("")}
            </div>

            <!-- Cột Điểm Xấu -->
            <div class="boisim-col-box boisim-col-xau">
              <div class="boisim-col-header">✦ ĐIỂM XẤU ✦</div>
              ${res.itemsXau.map(it => `<div class="boisim-col-item"><span>✖</span> <span>${it}</span></div>`).join("")}
            </div>

            <!-- Cột Bình Hòa -->
            <div class="boisim-col-box boisim-col-binh">
              <div class="boisim-col-header">✦ BÌNH HÒA ✦</div>
              ${res.itemsBinh.map(it => `<div class="boisim-col-item"><span>⚖</span> <span>${it}</span></div>`).join("")}
            </div>
          </div>

          <!-- BANNER TỔNG ĐIỂM LỚN -->
          <div class="boisim-final-score-box">
            <div class="boisim-final-score-number">Tổng điểm: ${res.totalScore}/10</div>
            <p class="boisim-final-verdict">
              ${res.totalScore >= 7.5 ? "Điểm phong thủy cao, sim có nhiều yếu tố may mắn. Chúc mừng bạn!" : (res.totalScore >= 5 ? "Điểm phong thủy trung bình khá, sim có sự hài hòa cơ bản." : "Điểm phong thủy chưa cao, nên cân nhắc các số có ngũ hành và quẻ cát hơn.")}
            </p>
          </div>

          <!-- KÊU GỌI TƯ VẤN THẦY DUY TÂM PHÚC -->
          <div class="boisim-cta-box">
            <span class="boisim-cta-text">Đăng ký tư vấn chọn sim phong thủy hợp Bát Tự cùng Thầy Duy Tâm Phúc:</span>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
              <a href="https://zalo.me/0705806666" target="_blank" class="boisim-cta-btn">
                💬 Liên hệ Zalo: 0705806666
              </a>
              <a href="tel:0705806666" class="boisim-cta-btn" style="background: #15803D;">
                📞 Hotline: 0705806666
              </a>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // 4. HÀM XỬ LÝ SỰ KIỆN FORM
  window.xuLyBoiSim = function() {
    try {
      const inputSim = document.getElementById("boisim-input-sim");
      const inputGio = document.getElementById("boisim-sel-gio");
      const inputNgay = document.getElementById("boisim-sel-ngay");
      const inputThang = document.getElementById("boisim-sel-thang");
      const inputNam = document.getElementById("boisim-sel-nam");
      const container = document.getElementById("boisim-result-container");

      const rawSim = inputSim && inputSim.value ? inputSim.value.trim() : "";
      const soSimClean = rawSim.replace(/\D/g, "");

      // Bắt buộc người dùng phải điền số điện thoại, nếu chưa điền thì ẩn phần bình giải
      if (!rawSim || soSimClean.length < 9) {
        alert("Vui lòng nhập đầy đủ số điện thoại cần xem bói sim (từ 9 đến 11 chữ số)!");
        if (inputSim) inputSim.focus();
        if (container) {
          container.style.display = "none";
          container.innerHTML = "";
        }
        return false;
      }

      // Kiểm tra chọn ngày, tháng, năm sinh
      if (!inputNgay || !inputNgay.value || !inputThang || !inputThang.value || !inputNam || !inputNam.value) {
        alert("Vui lòng chọn đầy đủ ngày, tháng, năm sinh và giờ sinh!");
        if (container) {
          container.style.display = "none";
          container.innerHTML = "";
        }
        return false;
      }

      let gioiTinh = "nam";
      const radioNu = document.getElementById("boisim-gender-nu");
      if (radioNu && radioNu.checked) gioiTinh = "nu";

      const soSim = soSimClean;
      const gioVal = (inputGio && inputGio.value) ? inputGio.value : "7";
      const ngay = parseInt(inputNgay.value, 10);
      const thang = parseInt(inputThang.value, 10);
      const nam = parseInt(inputNam.value, 10);

      const inputGoiY = document.getElementById("boisim-sel-goiy");
      const goiYVal = (inputGoiY && inputGoiY.value) ? inputGoiY.value : "2";

      const res = tinhToanSimPhongThuy(soSim, gioiTinh, gioVal, ngay, thang, nam, goiYVal);
      if (!res) return false;

      if (container) {
        container.innerHTML = renderBoiSimHTML(res);
        container.style.display = "block";

        // Kích hoạt cơ chế cuộn kéo mượt (bằng chuột và chạm cảm ứng) cho các bảng
        initBoisimScrollableTables();

        // Cuộn mượt tới bảng kết quả một cách an toàn
        try {
          setTimeout(function() {
            const navEl = document.querySelector(".main-nav");
            const navH = navEl ? navEl.offsetHeight : 50;
            const targetY = container.getBoundingClientRect().top + (window.pageYOffset || window.scrollY || 0) - navH - 10;
            window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          }, 50);
        } catch(scrollErr) {}
      }
      return false;
    } catch(err) {
      console.error("Lỗi khi xử lý bói sim:", err);
      return false;
    }
  };

  // HÀM HỖ TRỢ KÉO CUỘN NGANG CHO CÁC BẢNG BÓI SIM TRÊN MỌI THIẾT BỊ
  function initBoisimScrollableTables() {
    try {
      const scrollWraps = document.querySelectorAll(
        '.boisim-nguhanh-table-wrap, .boisim-noitai-wrap, .boisim-bokhuyet-wrap, .boisim-dayso-table-wrap'
      );
      scrollWraps.forEach(function(slider) {
        let isDown = false;
        let startX, scrollLeft;

        slider.addEventListener('mousedown', function(e) {
          isDown = true;
          slider.style.cursor = 'grabbing';
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', function() {
          isDown = false;
          slider.style.cursor = 'grab';
        });
        slider.addEventListener('mouseup', function() {
          isDown = false;
          slider.style.cursor = 'grab';
        });
        slider.addEventListener('mousemove', function(e) {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.5;
          slider.scrollLeft = scrollLeft - walk;
        });
      });
    } catch(e) {}
  }

  // 5. KHỞI TẠO TAB & FORM TRÊN TRANG
  window.initBoiSimTab = function() {
    try {
      // Xóa số điện thoại mặc định, chỉ khi người dùng gõ mới hiện
      const inputSim = document.getElementById("boisim-input-sim");
      if (inputSim) {
        inputSim.value = "";
      }

      // Đảm bảo phần bình giải luôn ẩn ban đầu khi chưa bấm xem
      const container = document.getElementById("boisim-result-container");
      if (container) {
        container.innerHTML = "";
        container.style.display = "none";
      }

      // Tự động điền ngày từ 1-31
      const selNgay = document.getElementById("boisim-sel-ngay");
      if (selNgay && selNgay.options.length <= 1) {
        selNgay.innerHTML = "";
        for (let i = 1; i <= 31; i++) {
          const opt = document.createElement("option");
          opt.value = i;
          opt.textContent = i;
          if (i === 9) opt.selected = true;
          selNgay.appendChild(opt);
        }
      }

      // Tự động điền tháng từ 1-12
      const selThang = document.getElementById("boisim-sel-thang");
      if (selThang && selThang.options.length <= 1) {
        selThang.innerHTML = "";
        for (let i = 1; i <= 12; i++) {
          const opt = document.createElement("option");
          opt.value = i;
          opt.textContent = "Tháng " + i;
          if (i === 9) opt.selected = true;
          selThang.appendChild(opt);
        }
      }

      // Tự động điền năm từ 1940-2026
      const selNam = document.getElementById("boisim-sel-nam");
      if (selNam && selNam.options.length <= 1) {
        selNam.innerHTML = "";
        for (let y = 2026; y >= 1940; y--) {
          const opt = document.createElement("option");
          opt.value = y;
          opt.textContent = y;
          if (y === 1990) opt.selected = true;
          selNam.appendChild(opt);
        }
      }

      // Gắn sự kiện click vào nút xem sim
      const btnSubmit = document.getElementById("btn-submit-boisim");
      if (btnSubmit) {
        btnSubmit.onclick = function(e) {
          if (e) e.preventDefault();
          window.xuLyBoiSim();
          return false;
        };
      }
    } catch(errInit) {
      console.error("Lỗi initBoiSimTab:", errInit);
    }
  };

  // Export engine
  window.BOISIM_ENGINE = {
    tinhToanSimPhongThuy,
    renderBoiSimHTML
  };

  // Tự khởi tạo khi DOM sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initBoiSimTab);
  } else {
    window.initBoiSimTab();
  }

})(window);
