/**
 * =========================================================================
 * KINHDICH_ENGINE.JS - HỆ THỐNG DỰ TRẮC KINH DỊCH & BỐC PHỆ LỤC HÀO
 * Thuật Số Huyền Học - Chuẩn hóa theo Đồ Bản Nạp Giáp Bốc Phệ Cổ Truyền
 * & Mẫu Thiết Kế Trang (Bảng Xuất Quẻ Dịch - Thiết Kế Trang.xlsx)
 * =========================================================================
 */

(function (window) {
  'use strict';

  // =========================================================================
  // 1. TÁM QUÁI ĐƠN (BÁT QUÁI CƠ BẢN) & NẠP GIÁP
  // =========================================================================
  const DON_QUAI = {
    1: { id: 1, name: 'Càn', symbol: '☰', title: 'Thiên', element: 'Kim', lines: [1, 1, 1] },
    2: { id: 2, name: 'Đoài', symbol: '☱', title: 'Trạch', element: 'Kim', lines: [1, 1, 0] },
    3: { id: 3, name: 'Ly', symbol: '☲', title: 'Hỏa', element: 'Hỏa', lines: [1, 0, 1] },
    4: { id: 4, name: 'Chấn', symbol: '☳', title: 'Lôi', element: 'Mộc', lines: [1, 0, 0] },
    5: { id: 5, name: 'Tốn', symbol: '☴', title: 'Phong', element: 'Mộc', lines: [0, 1, 1] },
    6: { id: 6, name: 'Khảm', symbol: '☵', title: 'Thủy', element: 'Thủy', lines: [0, 1, 0] },
    7: { id: 7, name: 'Cấn', symbol: '☶', title: 'Sơn', element: 'Thổ', lines: [0, 0, 1] },
    8: { id: 8, name: 'Khôn', symbol: '☷', title: 'Địa', element: 'Thổ', lines: [0, 0, 0] }
  };

  // Tra cứu ID quái từ 3 vạch hào
  function getDonQuaiIdFromLines(l1, l2, l3) {
    const key = `${l1}${l2}${l3}`;
    const map = {
      '111': 1, '110': 2, '101': 3, '100': 4,
      '011': 5, '010': 6, '001': 7, '000': 8
    };
    return map[key] || 1;
  }

  // Nạp Chi cho 8 quái đơn (nội quái: hào 1,2,3; ngoại quái: hào 4,5,6)
  const NAP_CHI = {
    1: { // Càn
      noi: [{ chi: 'Tý', hanh: 'Thủy' }, { chi: 'Dần', hanh: 'Mộc' }, { chi: 'Thìn', hanh: 'Thổ' }],
      ngoai: [{ chi: 'Ngọ', hanh: 'Hỏa' }, { chi: 'Thân', hanh: 'Kim' }, { chi: 'Tuất', hanh: 'Thổ' }]
    },
    2: { // Đoài
      noi: [{ chi: 'Tị', hanh: 'Hỏa' }, { chi: 'Mão', hanh: 'Mộc' }, { chi: 'Sửu', hanh: 'Thổ' }],
      ngoai: [{ chi: 'Hợi', hanh: 'Thủy' }, { chi: 'Dậu', hanh: 'Kim' }, { chi: 'Mùi', hanh: 'Thổ' }]
    },
    3: { // Ly
      noi: [{ chi: 'Mão', hanh: 'Mộc' }, { chi: 'Sửu', hanh: 'Thổ' }, { chi: 'Hợi', hanh: 'Thủy' }],
      ngoai: [{ chi: 'Dậu', hanh: 'Kim' }, { chi: 'Mùi', hanh: 'Thổ' }, { chi: 'Tị', hanh: 'Hỏa' }]
    },
    4: { // Chấn
      noi: [{ chi: 'Tý', hanh: 'Thủy' }, { chi: 'Dần', hanh: 'Mộc' }, { chi: 'Thìn', hanh: 'Thổ' }],
      ngoai: [{ chi: 'Ngọ', hanh: 'Hỏa' }, { chi: 'Thân', hanh: 'Kim' }, { chi: 'Tuất', hanh: 'Thổ' }]
    },
    5: { // Tốn
      noi: [{ chi: 'Sửu', hanh: 'Thổ' }, { chi: 'Hợi', hanh: 'Thủy' }, { chi: 'Dậu', hanh: 'Kim' }],
      ngoai: [{ chi: 'Mùi', hanh: 'Thổ' }, { chi: 'Tị', hanh: 'Hỏa' }, { chi: 'Mão', hanh: 'Mộc' }]
    },
    6: { // Khảm
      noi: [{ chi: 'Dần', hanh: 'Mộc' }, { chi: 'Thìn', hanh: 'Thổ' }, { chi: 'Ngọ', hanh: 'Hỏa' }],
      ngoai: [{ chi: 'Thân', hanh: 'Kim' }, { chi: 'Tuất', hanh: 'Thổ' }, { chi: 'Tý', hanh: 'Thủy' }]
    },
    7: { // Cấn
      noi: [{ chi: 'Thìn', hanh: 'Thổ' }, { chi: 'Ngọ', hanh: 'Hỏa' }, { chi: 'Thân', hanh: 'Kim' }],
      ngoai: [{ chi: 'Tuất', hanh: 'Thổ' }, { chi: 'Tý', hanh: 'Thủy' }, { chi: 'Dần', hanh: 'Mộc' }]
    },
    8: { // Khôn
      noi: [{ chi: 'Mùi', hanh: 'Thổ' }, { chi: 'Tị', hanh: 'Hỏa' }, { chi: 'Mão', hanh: 'Mộc' }],
      ngoai: [{ chi: 'Sửu', hanh: 'Thổ' }, { chi: 'Hợi', hanh: 'Thủy' }, { chi: 'Dậu', hanh: 'Kim' }]
    }
  };

  // Nạp Can cho 8 quái đơn
  const NAP_CAN = {
    1: { noi: 'Giáp', ngoai: 'Nhâm' }, // Càn
    2: { noi: 'Đinh', ngoai: 'Đinh' }, // Đoài
    3: { noi: 'Kỷ', ngoai: 'Kỷ' },     // Ly
    4: { noi: 'Canh', ngoai: 'Canh' }, // Chấn
    5: { noi: 'Tân', ngoai: 'Tân' },   // Tốn
    6: { noi: 'Mậu', ngoai: 'Mậu' },   // Khảm
    7: { noi: 'Bính', ngoai: 'Bính' }, // Cấn
    8: { noi: 'Ất', ngoai: 'Quý' }     // Khôn
  };

  // Ngũ hành của 12 Địa Chi
  const CHI_HANH = {
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
    'Thìn': 'Thổ', 'Tị': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
    'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy'
  };

  // Mã màu chuẩn theo Ngũ Hành (chính xác theo Ảnh 3)
  const HANH_COLOR = {
    'Mộc': '#16A34A',      // Xanh lá chuẩn Ảnh 3 (Tân Mão, Kỷ Mão)
    'Hỏa': '#DC2626',      // Đỏ tươi chuẩn Ảnh 3 (Tân Tỵ, Bính Ngọ)
    'Thổ': '#D97706',      // Nâu vàng / Cam đất chuẩn Ảnh 3 (Tân Mùi, Bính Thìn, Kỷ Sửu)
    'Kim': '#78909C',      // Xám bạc chuẩn Ảnh 3 (Bính Thân)
    'Thủy': '#0284C7'      // Xanh lam chuẩn Ảnh 3 (Kỷ Hợi)
  };

  // Mã màu của Lục Thú (chính xác theo Ảnh 3 & Yêu cầu: Câu Trần có màu giống hệt Đằng Xà)
  const LUC_THU_COLOR = {
    'Thanh Long': '#16A34A', // Xanh lá
    'Chu Tước': '#DC2626',   // Đỏ
    'Câu Trần': '#D97706',   // Màu vàng cam đất giống hệt Đằng Xà
    'Câu Trận': '#D97706',   // Màu vàng cam đất giống hệt Đằng Xà
    'Câu Trấn': '#D97706',   // Màu vàng cam đất giống hệt Đằng Xà
    'Đằng Xà': '#D97706',    // Nâu cam
    'Bạch Hổ': '#78909C',    // Xám bạc
    'Huyền Vũ': '#111111'    // Đen
  };

  function getLucThuColor(name) {
    if (!name) return '#111111';
    const n = String(name).trim();
    if (n.includes('Câu Tr') || n.includes('Đằng Xà')) {
      return '#D97706'; // Luôn đảm bảo Câu Trần mang màu vàng cam đất giống hệt Đằng Xà
    }
    return LUC_THU_COLOR[n] || '#111111';
  }

  // =========================================================================
  // 2. TÁM CUNG BÁT QUÁI (HỌ CUNG & THẾ ỨNG 64 QUẺ)
  // Khẩu quyết / Lời thoán ngắn chuẩn hóa từ file Kinh Dịch.docx
  // =========================================================================
  const QUE_KEP_INFO = {
    // 1. CUNG CÀN (KIM)
    '1_1': { name: 'Bát Thuần Càn', cung: 'Càn', cungHanh: 'Kim', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Cương Kiện Tự Cường' },
    '1_5': { name: 'Thiên Phong Cấu', cung: 'Càn', cungHanh: 'Kim', the: 1, ung: 4, note: '', shortThoan: 'Tương Phùng Bất Ngờ' },
    '1_7': { name: 'Thiên Sơn Độn', cung: 'Càn', cungHanh: 'Kim', the: 2, ung: 5, note: '', shortThoan: 'Rút Lui Tránh Họa' },
    '1_8': { name: 'Thiên Địa Bĩ', cung: 'Càn', cungHanh: 'Kim', the: 3, ung: 6, note: 'Lục Hợp', shortThoan: 'Bế Tắc Phòng Thân' },
    '5_8': { name: 'Phong Địa Quan', cung: 'Càn', cungHanh: 'Kim', the: 4, ung: 1, note: '', shortThoan: 'Quan Sát Chiêm Nghiệm' },
    '7_8': { name: 'Sơn Địa Bác', cung: 'Càn', cungHanh: 'Kim', the: 5, ung: 2, note: '', shortThoan: 'Thoái Ẩn Tiêu Mòn' },
    '3_8': { name: 'Hỏa Địa Tấn', cung: 'Càn', cungHanh: 'Kim', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Thăng Tiến Rạng Rỡ' },
    '3_1': { name: 'Hỏa Thiên Đại Hữu', cung: 'Càn', cungHanh: 'Kim', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Thịnh Vượng Đủ Đầy' },

    // 2. CUNG KHẢM (THỦY)
    '6_6': { name: 'Bát Thuần Khảm', cung: 'Khảm', cungHanh: 'Thủy', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Vượt Gian Hiểm Họa' },
    '6_2': { name: 'Thủy Trạch Tiết', cung: 'Khảm', cungHanh: 'Thủy', the: 1, ung: 4, note: 'Lục Hợp', shortThoan: 'Tiết Chế Chừng Mực' },
    '6_4': { name: 'Thủy Lôi Truân', cung: 'Khảm', cungHanh: 'Thủy', the: 2, ung: 5, note: '', shortThoan: 'Vạn Sự Khởi Đầu Nan' },
    '6_3': { name: 'Thủy Hỏa Ký Tế', cung: 'Khảm', cungHanh: 'Thủy', the: 3, ung: 6, note: 'Lục Hợp', shortThoan: 'Hoàn Thành Cảnh Giác' },
    '2_3': { name: 'Trạch Hỏa Cách', cung: 'Khảm', cungHanh: 'Thủy', the: 4, ung: 1, note: '', shortThoan: 'Cải Cựu Nghênh Tân' },
    '4_3': { name: 'Lôi Hỏa Phong', cung: 'Khảm', cungHanh: 'Thủy', the: 5, ung: 2, note: '', shortThoan: 'Đỉnh Cao Phồn Thịnh' },
    '8_3': { name: 'Địa Hỏa Minh Di', cung: 'Khảm', cungHanh: 'Thủy', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Giấu Sáng Vào Đêm' },
    '8_6': { name: 'Địa Thủy Sư', cung: 'Khảm', cungHanh: 'Thủy', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Kỷ Cương Điều Động' },

    // 3. CUNG CẤN (THỔ)
    '7_7': { name: 'Bát Thuần Cấn', cung: 'Cấn', cungHanh: 'Thổ', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Dừng Lại An Tĩnh' },
    '7_3': { name: 'Sơn Hỏa Bí', cung: 'Cấn', cungHanh: 'Thổ', the: 1, ung: 4, note: '', shortThoan: 'Trau Chuốt Thực Chất' },
    '7_1': { name: 'Sơn Thiên Đại Súc', cung: 'Cấn', cungHanh: 'Thổ', the: 2, ung: 5, note: '', shortThoan: 'Tích Tụ Khí Lực' },
    '7_2': { name: 'Sơn Trạch Tổn', cung: 'Cấn', cungHanh: 'Thổ', the: 3, ung: 6, note: '', shortThoan: 'Tổn Dưới Bổ Trên' },
    '3_2': { name: 'Hỏa Trạch Khuê', cung: 'Cấn', cungHanh: 'Thổ', the: 4, ung: 1, note: '', shortThoan: 'Xung Đột Bất Đồng' },
    '1_2': { name: 'Thiên Trạch Lý', cung: 'Cấn', cungHanh: 'Thổ', the: 5, ung: 2, note: '', shortThoan: 'Cẩn Trọng Hành Xử' },
    '5_2': { name: 'Phong Trạch Trung Phu', cung: 'Cấn', cungHanh: 'Thổ', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Tín Nghĩa Chân Thành' },
    '5_7': { name: 'Phong Sơn Tiệm', cung: 'Cấn', cungHanh: 'Thổ', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Tiến Bước Từ Từ' },

    // 4. CUNG CHẤN (MỘC)
    '4_4': { name: 'Bát Thuần Chấn', cung: 'Chấn', cungHanh: 'Mộc', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Chấn Động Tỉnh Thức' },
    '4_8': { name: 'Lôi Địa Dự', cung: 'Chấn', cungHanh: 'Mộc', the: 1, ung: 4, note: 'Lục Hợp', shortThoan: 'Dự Phòng Thừa Vui' },
    '4_6': { name: 'Lôi Thủy Giải', cung: 'Chấn', cungHanh: 'Mộc', the: 2, ung: 5, note: '', shortThoan: 'Tháo Gỡ Giải Tỏa' },
    '4_5': { name: 'Lôi Phong Hằng', cung: 'Chấn', cungHanh: 'Mộc', the: 3, ung: 6, note: '', shortThoan: 'Kiên Định Bền Lâu' },
    '8_5': { name: 'Địa Phong Thăng', cung: 'Chấn', cungHanh: 'Mộc', the: 4, ung: 1, note: '', shortThoan: 'Đi Lên Vững Chắc' },
    '6_5': { name: 'Thủy Phong Tỉnh', cung: 'Chấn', cungHanh: 'Mộc', the: 5, ung: 2, note: '', shortThoan: 'Dưỡng Nguồn Đức Hạnh' },
    '2_5': { name: 'Trạch Phong Đại Quá', cung: 'Chấn', cungHanh: 'Mộc', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Gánh Vác Quá Tải' },
    '2_4': { name: 'Trạch Lôi Tùy', cung: 'Chấn', cungHanh: 'Mộc', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Thuận Tùy Thời Thế' },

    // 5. CUNG TỐN (MỘC)
    '5_5': { name: 'Bát Thuần Tốn', cung: 'Tốn', cungHanh: 'Mộc', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Mềm Mỏng Thấu Suốt' },
    '5_1': { name: 'Phong Thiên Tiểu Súc', cung: 'Tốn', cungHanh: 'Mộc', the: 1, ung: 4, note: '', shortThoan: 'Tích Lũy Chờ Vận' },
    '5_3': { name: 'Phong Hỏa Gia Nhân', cung: 'Tốn', cungHanh: 'Mộc', the: 2, ung: 5, note: '', shortThoan: 'Chỉnh Đốn Trong Nhà' },
    '5_4': { name: 'Phong Lôi Ích', cung: 'Tốn', cungHanh: 'Mộc', the: 3, ung: 6, note: '', shortThoan: 'Tăng Cường Bổ Trợ' },
    '1_4': { name: 'Thiên Lôi Vô Vọng', cung: 'Tốn', cungHanh: 'Mộc', the: 4, ung: 1, note: 'Lục Hợp', shortThoan: 'Chân Thật Tự Nhiên' },
    '3_4': { name: 'Hỏa Lôi Phệ Hạp', cung: 'Tốn', cungHanh: 'Mộc', the: 5, ung: 2, note: '', shortThoan: 'Cương Quyết Trừng Phạt' },
    '7_4': { name: 'Sơn Lôi Di', cung: 'Tốn', cungHanh: 'Mộc', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Tu Dưỡng Thân Tâm' },
    '7_5': { name: 'Sơn Phong Cổ', cung: 'Tốn', cungHanh: 'Mộc', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Canh Tân Sửa Chữa' },

    // 6. CUNG LY (HỎA)
    '3_3': { name: 'Bát Thuần Ly', cung: 'Ly', cungHanh: 'Hỏa', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Sáng Suốt Nương Tựa' },
    '3_7': { name: 'Hỏa Sơn Lữ', cung: 'Ly', cungHanh: 'Hỏa', the: 1, ung: 4, note: '', shortThoan: 'Thận Trọng Đất Khách' },
    '3_5': { name: 'Hỏa Phong Đỉnh', cung: 'Ly', cungHanh: 'Hỏa', the: 2, ung: 5, note: '', shortThoan: 'Nung Đúc Luyện Tài' },
    '3_6': { name: 'Hỏa Thủy Vị Tế', cung: 'Ly', cungHanh: 'Hỏa', the: 3, ung: 6, note: '', shortThoan: 'Chưa Xong Khởi Lại' },
    '7_6': { name: 'Sơn Thủy Mông', cung: 'Ly', cungHanh: 'Hỏa', the: 4, ung: 1, note: '', shortThoan: 'Khai Sáng Khai Mông' },
    '5_6': { name: 'Phong Thủy Hoán', cung: 'Ly', cungHanh: 'Hỏa', the: 5, ung: 2, note: '', shortThoan: 'Giải Tán Ngăn Cách' },
    '1_6': { name: 'Thiên Thủy Tụng', cung: 'Ly', cungHanh: 'Hỏa', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Tranh Chấp Hòa Giải' },
    '1_3': { name: 'Thiên Hỏa Đồng Nhân', cung: 'Ly', cungHanh: 'Hỏa', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Đồng Tâm Hiệp Lực' },

    // 7. CUNG KHÔN (THỔ)
    '8_8': { name: 'Bát Thuần Khôn', cung: 'Khôn', cungHanh: 'Thổ', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Nhu Thuận Tải Vật' },
    '8_4': { name: 'Địa Lôi Phục', cung: 'Khôn', cungHanh: 'Thổ', the: 1, ung: 4, note: '', shortThoan: 'Phục Hồi Hồi Sinh' },
    '8_2': { name: 'Địa Trạch Lâm', cung: 'Khôn', cungHanh: 'Thổ', the: 2, ung: 5, note: '', shortThoan: 'Cận Kề Chỉ Đạo' },
    '8_1': { name: 'Địa Thiên Thái', cung: 'Khôn', cungHanh: 'Thổ', the: 3, ung: 6, note: 'Lục Hợp', shortThoan: 'Hanh Thông Hòa Hợp' },
    '4_1': { name: 'Lôi Thiên Đại Tráng', cung: 'Khôn', cungHanh: 'Thổ', the: 4, ung: 1, note: 'Lục Hợp', shortThoan: 'Tiết Chế Sức Mạnh' },
    '2_1': { name: 'Trạch Thiên Quải', cung: 'Khôn', cungHanh: 'Thổ', the: 5, ung: 2, note: '', shortThoan: 'Quyết Đoán Dứt Khoát' },
    '6_1': { name: 'Thủy Thiên Nhu', cung: 'Khôn', cungHanh: 'Thổ', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Kiên Nhẫn Đợi Thời' },
    '6_8': { name: 'Thủy Địa Tỷ', cung: 'Khôn', cungHanh: 'Thổ', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Liên Kết Thân Mật' },

    // 8. CUNG ĐOÀI (KIM)
    '2_2': { name: 'Bát Thuần Đoài', cung: 'Đoài', cungHanh: 'Kim', the: 6, ung: 3, note: 'Lục Xung', shortThoan: 'Vui Vẻ Hòa Ái' },
    '2_6': { name: 'Trạch Thủy Khốn', cung: 'Đoài', cungHanh: 'Kim', the: 1, ung: 4, note: 'Lục Hợp', shortThoan: 'Bế Tắc Rèn Chí' },
    '2_8': { name: 'Trạch Địa Tụy', cung: 'Đoài', cungHanh: 'Kim', the: 2, ung: 5, note: '', shortThoan: 'Tụ Họp Quần Thể' },
    '2_7': { name: 'Trạch Sơn Hàm', cung: 'Đoài', cungHanh: 'Kim', the: 3, ung: 6, note: '', shortThoan: 'Giao Cảm Đồng Điệu' },
    '6_7': { name: 'Thủy Sơn Kiển', cung: 'Đoài', cungHanh: 'Kim', the: 4, ung: 1, note: '', shortThoan: 'Ngăn Trở Phản Tỉnh' },
    '8_7': { name: 'Địa Sơn Khiêm', cung: 'Đoài', cungHanh: 'Kim', the: 5, ung: 2, note: '', shortThoan: 'Khiêm Cung Hạ Mình' },
    '4_7': { name: 'Lôi Sơn Tiểu Quá', cung: 'Đoài', cungHanh: 'Kim', the: 4, ung: 1, note: 'Du Hồn', shortThoan: 'Thận Trọng Vượt Mức' },
    '4_2': { name: 'Lôi Trạch Quy Muội', cung: 'Đoài', cungHanh: 'Kim', the: 3, ung: 6, note: 'Quy Hồn', shortThoan: 'Sai Lầm Hấp Tấp' }
  };

  // =========================================================================
  // 3. HỆ THỐNG LỤC THÂN, LỤC THÚ & THẦN SÁT
  // =========================================================================
  const NGU_HANH_SINH = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };
  const NGU_HANH_KHAC = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };

  function getLucThan(cungHanh, haoHanh) {
    if (cungHanh === haoHanh) return 'Huynh Đệ';
    if (NGU_HANH_SINH[cungHanh] === haoHanh) return 'Tử Tôn';
    if (NGU_HANH_KHAC[cungHanh] === haoHanh) return 'Thê Tài';
    if (NGU_HANH_KHAC[haoHanh] === cungHanh) return 'Quan Quỷ';
    return 'Phụ Mẫu';
  }

  // Khởi Lục Thú chuẩn phong thủy bốc phệ
  const LUC_THU_ORDER = ['Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ'];

  function getLucThu(canNgay) {
    let startIdx = 0;
    if (['Giáp', 'Ất'].includes(canNgay)) startIdx = 0;
    else if (['Bính', 'Đinh'].includes(canNgay)) startIdx = 1;
    else if (canNgay === 'Mậu') startIdx = 2;
    else if (canNgay === 'Kỷ') startIdx = 4; // Bạch Hổ khởi hào 1 (như trong mẫu Bảng Xuất Quẻ Dịch Excel)
    else if (['Canh', 'Tân'].includes(canNgay)) startIdx = 3; // Đằng Xà
    else if (['Nhâm', 'Quý'].includes(canNgay)) startIdx = 5; // Huyền Vũ

    const res = [];
    for (let i = 0; i < 6; i++) {
      res.push(LUC_THU_ORDER[(startIdx + i) % 6]);
    }
    return res;
  }

  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  function getTuanKhong(canNgay, chiNgay) {
    const canIdx = CAN.indexOf(canNgay);
    const chiIdx = CHI.indexOf(chiNgay);
    if (canIdx === -1 || chiIdx === -1) return ['Thân', 'Dậu'];
    const diff = (chiIdx - canIdx + 12) % 12;
    return [CHI[(diff + 10) % 12], CHI[(diff + 11) % 12]];
  }

  // Vòng 12 Cung Trường Sinh theo Cung Hành của Quẻ (cột Lục Thần)
  const TRUONG_SINH_12 = [
    'Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy',
    'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'
  ];

  const TRUONG_SINH_START = {
    'Mộc': 'Hợi',
    'Hỏa': 'Dần',
    'Kim': 'Tỵ',
    'Thủy': 'Thân',
    'Thổ': 'Thân'
  };

  function getLucThanTruongSinh(cungHanh, chiHao) {
    const startChi = TRUONG_SINH_START[cungHanh] || 'Hợi';
    const startIdx = CHI.indexOf(startChi);
    const targetIdx = CHI.indexOf(chiHao);
    if (startIdx === -1 || targetIdx === -1) return 'Trường Sinh';
    const offset = (targetIdx - startIdx + 12) % 12;
    return TRUONG_SINH_12[offset];
  }

  const PHUC_THAN_SHORT_MAP = {
    'Huynh Đệ': 'H. Đệ',
    'Quan Quỷ': 'Q. Quỷ',
    'Tử Tôn': 'T. Tôn',
    'Phụ Mẫu': 'P. Mẫu',
    'Thê Tài': 'T. Tài'
  };

  // Tra cứu 6 hào của Quẻ Bát Thuần gốc Cung để định Phục Thần
  function getPhucThanMap(cungName) {
    const batThuanId = {
      'Càn': 1, 'Đoài': 2, 'Ly': 3, 'Chấn': 4,
      'Tốn': 5, 'Khảm': 6, 'Cấn': 7, 'Khôn': 8
    }[cungName] || 1;

    const noiChi = NAP_CHI[batThuanId].noi;
    const ngoaiChi = NAP_CHI[batThuanId].ngoai;
    const allChi = [...noiChi, ...ngoaiChi];
    const noiCan = NAP_CAN[batThuanId].noi;
    const ngoaiCan = NAP_CAN[batThuanId].ngoai;
    const cungHanh = DON_QUAI[batThuanId].element;

    const result = [];
    for (let i = 0; i < 6; i++) {
      const can = i < 3 ? noiCan : ngoaiCan;
      const item = allChi[i];
      const lucThan = getLucThan(cungHanh, item.hanh);
      const shortLucThan = PHUC_THAN_SHORT_MAP[lucThan] || lucThan;
      result.push({
        haoNum: i + 1,
        can,
        chi: item.chi,
        hanh: item.hanh,
        lucThan,
        label: `${shortLucThan} - ${item.chi} (${item.hanh})`,
        fullLabel: `${lucThan} - ${item.chi} (${item.hanh})`
      });
    }
    return result;
  }

  function getThanSat(canNgay, chiNgay) {
    const locMap = { 'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tị', 'Đinh': 'Ngọ', 'Mậu': 'Tị', 'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý' };
    const quyMap = {
      'Giáp': ['Sửu', 'Mùi'], 'Mậu': ['Sửu', 'Mùi'], 'Canh': ['Sửu', 'Mùi'],
      'Ất': ['Tý', 'Thân'], 'Kỷ': ['Tý', 'Thân'],
      'Bính': ['Hợi', 'Dậu'], 'Đinh': ['Hợi', 'Dậu'],
      'Nhâm': ['Mão', 'Tị'], 'Quý': ['Mão', 'Tị'],
      'Tân': ['Ngọ', 'Dần']
    };
    const maMap = {
      'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
      'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân',
      'Tị': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi',
      'Hợi': 'Tị', 'Mão': 'Tị', 'Mùi': 'Tị'
    };
    const daoMap = {
      'Thân': 'Dậu', 'Tý': 'Dậu', 'Thìn': 'Dậu',
      'Dần': 'Mão', 'Ngọ': 'Mão', 'Tuất': 'Mão',
      'Tị': 'Ngọ', 'Dậu': 'Ngọ', 'Sửu': 'Ngọ',
      'Hợi': 'Tý', 'Mão': 'Tý', 'Mùi': 'Tý'
    };

    return {
      loc: locMap[canNgay] || 'Dần',
      quy: quyMap[canNgay] || ['Sửu', 'Mùi'],
      ma: maMap[chiNgay] || 'Dần',
      dao: daoMap[chiNgay] || 'Tý'
    };
  }

  function getVuongTuong(chiThang, haoHanh) {
    let thangHanh = 'Thủy';
    if (['Hợi', 'Tý'].includes(chiThang)) thangHanh = 'Thủy';
    else if (['Dần', 'Mão'].includes(chiThang)) thangHanh = 'Mộc';
    else if (['Tị', 'Ngọ'].includes(chiThang)) thangHanh = 'Hỏa';
    else if (['Thân', 'Dậu'].includes(chiThang)) thangHanh = 'Kim';
    else thangHanh = 'Thổ';

    if (haoHanh === thangHanh) return 'Vượng';
    if (NGU_HANH_SINH[thangHanh] === haoHanh) return 'Tướng';
    if (NGU_HANH_SINH[haoHanh] === thangHanh) return 'Hưu';
    if (NGU_HANH_KHAC[haoHanh] === thangHanh) return 'Tù';
    return 'Tử';
  }

  const DUNG_THAN_MAP = {
    1: { id: 1, name: 'Phụ Mẫu', desc: 'Nhà cửa, cha mẹ, xe cộ, giấy tờ, hợp đồng, văn bằng' },
    2: { id: 2, name: 'Huynh Đệ', desc: 'Anh em, bạn bè, đối tác cạnh tranh, hao tổn tài lộc' },
    3: { id: 3, name: 'Tử Tôn', desc: 'Con cái, phúc đức, giải nạn, thú vui, thuốc thang, đầu tư phát đạt' },
    4: { id: 4, name: 'Thê Tài', desc: 'Tiền của, tài lộc, vợ, của cải kinh doanh, hàng hóa' },
    5: { id: 5, name: 'Quan Quỷ', desc: 'Công danh, chức quyền, công việc, sếp, chồng, quan sự, kiện tụng' }
  };

  // Helper quan hệ ngũ hành giữa 2 đối tượng
  function getQuanHeNguHanh(hanhA, hanhB, nameA, nameB) {
    if (hanhA === hanhB) return `${nameA} hoà ${nameB}`;
    if (NGU_HANH_SINH[hanhA] === hanhB) return `${nameA} sinh ${nameB}`;
    if (NGU_HANH_SINH[hanhB] === hanhA) return `${nameB} sinh ${nameA}`;
    if (NGU_HANH_KHAC[hanhA] === hanhB) return `${nameA} khắc ${nameB}`;
    if (NGU_HANH_KHAC[hanhB] === hanhA) return `${nameB} khắc ${nameA}`;
    return `${nameA} hoà ${nameB}`;
  }

  // =========================================================================
  // 4. CÁC PHƯƠNG PHÁP LẬP QUẺ
  // =========================================================================
  function lapQueMaiHoa(question, options = {}) {
    let date = options.date || new Date();
    let canChi = options.canChi || getCanChiThoiDiem(date, options.cachTinhToan);

    let namChiVal = CHI.indexOf(canChi.chiNam) + 1;
    let thangVal = canChi.amLichThang || (date.getMonth() + 1);
    let ngayVal = canChi.amLichNgay || date.getDate();
    let gioChiVal = CHI.indexOf(canChi.chiGio) + 1;

    let tongThuong = namChiVal + thangVal + ngayVal;
    let thuongId = tongThuong % 8 === 0 ? 8 : tongThuong % 8;

    let tongHa = namChiVal + thangVal + ngayVal + gioChiVal;
    let haId = tongHa % 8 === 0 ? 8 : tongHa % 8;

    let dongHao = tongHa % 6 === 0 ? 6 : tongHa % 6;

    return buildDichQuaiFullResult({
      method: 'Mai Hoa Dịch Số (Thời Gian Lập Quẻ)',
      methodName: 'Xuất Quẻ Mai Hoa',
      methodTitle: 'PHẦN MỀM LẬP QUẺ DỊCH - XUẤT QUẺ MAI HOA',
      question: question || 'Xem tổng quan sự việc đại sự',
      timeStr: options.timeStr || `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      canChi,
      thuongId,
      haId,
      dongList: [dongHao],
      dungThan: options.dungThan || 5,
      cachTinhToan: options.cachTinhToan !== undefined ? options.cachTinhToan : 1
    });
  }

  function lapQueLucHao(question, options = {}) {
    const date = options.date || new Date();
    const canChi = options.canChi || getCanChiThoiDiem(date, options.cachTinhToan);

    let thuongId, haId, dongList = [];

    if (options.thuongId && options.haId) {
      thuongId = parseInt(options.thuongId, 10);
      haId = parseInt(options.haId, 10);
      dongList = options.dongList || [];
    } else if (options.sixLines && Array.isArray(options.sixLines)) {
      const lines = options.sixLines;
      haId = getDonQuaiIdFromLines(lines[0], lines[1], lines[2]);
      thuongId = getDonQuaiIdFromLines(lines[3], lines[4], lines[5]);
      dongList = options.dongList || [];
    } else {
      thuongId = Math.floor(Math.random() * 8) + 1;
      haId = Math.floor(Math.random() * 8) + 1;
      const dongHao = Math.floor(Math.random() * 6) + 1;
      dongList = [dongHao];
    }

    return buildDichQuaiFullResult({
      method: 'Lục Hào Dự Trắc (Bốc Phệ Chính Tông)',
      methodName: 'Xuất Quẻ Lục Hào',
      methodTitle: 'PHẦN MỀM LẬP QUẺ DỊCH - XUẤT QUẺ LỤC HÀO',
      question: question || 'Hỏi công danh sự nghiệp và thi cử thăng chức',
      timeStr: options.timeStr || `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      canChi,
      thuongId,
      haId,
      dongList,
      dungThan: options.dungThan || 5,
      cachTinhToan: options.cachTinhToan !== undefined ? options.cachTinhToan : 1
    });
  }

  function lapQueNgauNhien(question, options = {}) {
    const date = options.date || new Date();
    const canChi = options.canChi || getCanChiThoiDiem(date, options.cachTinhToan);

    let thuongId = options.thuongId || (Math.floor(Math.random() * 8) + 1);
    let haId = options.haId || (Math.floor(Math.random() * 8) + 1);
    let dongHao = options.dongHao || (Math.floor(Math.random() * 6) + 1);

    return buildDichQuaiFullResult({
      method: 'Ngẫu Nhiên Khởi Tâm (Linh Cảm Bát Quái)',
      methodName: 'Xuất Quẻ Ngẫu Nhiên',
      methodTitle: 'PHẦN MỀM LẬP QUẺ DỊCH - XUẤT QUẺ NGẪU NHIÊN',
      question: question || 'Xem định hướng công việc sắp tới',
      timeStr: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      canChi,
      thuongId,
      haId,
      dongList: [dongHao],
      dungThan: options.dungThan || 5,
      cachTinhToan: options.cachTinhToan !== undefined ? options.cachTinhToan : 1
    });
  }

  function lapQueDongXu(question, sixTosses, options = {}) {
    const date = options.date || new Date();
    const canChi = options.canChi || getCanChiThoiDiem(date, options.cachTinhToan);

    const chuLines = [];
    const dongList = [];

    sixTosses.forEach((toss, idx) => {
      const haoNum = idx + 1;
      if (toss === 6) {
        chuLines.push(0);
        dongList.push(haoNum);
      } else if (toss === 7) {
        chuLines.push(1);
      } else if (toss === 8) {
        chuLines.push(0);
      } else if (toss === 9) {
        chuLines.push(1);
        dongList.push(haoNum);
      } else {
        chuLines.push(1);
      }
    });

    const haId = getDonQuaiIdFromLines(chuLines[0], chuLines[1], chuLines[2]);
    const thuongId = getDonQuaiIdFromLines(chuLines[3], chuLines[4], chuLines[5]);

    return buildDichQuaiFullResult({
      method: 'Gieo 3 Đồng Tiền Cổ (Lục Hào Khởi Quẻ)',
      methodName: 'Xuất Quẻ Gieo Đồng Xu',
      methodTitle: 'PHẦN MỀM LẬP QUẺ DỊCH - XUẤT QUẺ GIEO ĐỒNG XU',
      question: question || 'Xem việc khởi sự bằng 3 đồng tiền cổ',
      timeStr: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      canChi,
      thuongId,
      haId,
      dongList,
      dungThan: options.dungThan || 5,
      cachTinhToan: options.cachTinhToan !== undefined ? options.cachTinhToan : 1
    });
  }

  // =========================================================================
  // 5. TÍNH TOÁN TOÀN BỘ KẾT QUẢ QUẺ DỊCH
  // =========================================================================
  function buildDichQuaiFullResult({ method, methodName, methodTitle, question, timeStr, canChi, thuongId, haId, dongList = [], dungThan = 5, cachTinhToan = 1 }) {
    const thuong = DON_QUAI[thuongId];
    const ha = DON_QUAI[haId];

    // 1. Quẻ Chủ (Chính Quái)
    const queChuKey = `${thuongId}_${haId}`;
    const queChuInfo = QUE_KEP_INFO[queChuKey] || {
      name: `${thuong.title} ${ha.title}`, cung: thuong.name, cungHanh: thuong.element, the: 6, ung: 3, note: '', shortThoan: 'Thông Thuận Cát Tường'
    };

    // 6 vạch của Quẻ Chủ (hào 1 đến hào 6)
    const chuLines = [...ha.lines, ...thuong.lines];

    // 2. Quẻ Hỗ
    const hoHaId = getDonQuaiIdFromLines(chuLines[1], chuLines[2], chuLines[3]);
    const hoThuongId = getDonQuaiIdFromLines(chuLines[2], chuLines[3], chuLines[4]);
    const queHoKey = `${hoThuongId}_${hoHaId}`;
    const queHoInfo = QUE_KEP_INFO[queHoKey] || {
      name: `${DON_QUAI[hoThuongId].title} ${DON_QUAI[hoHaId].title}`, cung: DON_QUAI[hoThuongId].name, cungHanh: DON_QUAI[hoThuongId].element, note: '', shortThoan: 'Vận Động Trung Gian'
    };
    const hoLines = [...DON_QUAI[hoHaId].lines, ...DON_QUAI[hoThuongId].lines];

    // 3. Quẻ Biến (Đổi vạch các hào động)
    const bienLines = [...chuLines];
    dongList.forEach(dongHao => {
      const idx = dongHao - 1;
      if (idx >= 0 && idx < 6) {
        bienLines[idx] = bienLines[idx] === 1 ? 0 : 1;
      }
    });

    const bienHaId = getDonQuaiIdFromLines(bienLines[0], bienLines[1], bienLines[2]);
    const bienThuongId = getDonQuaiIdFromLines(bienLines[3], bienLines[4], bienLines[5]);
    const queBienKey = `${bienThuongId}_${bienHaId}`;
    const queBienInfo = QUE_KEP_INFO[queBienKey] || {
      name: `${DON_QUAI[bienThuongId].title} ${DON_QUAI[bienHaId].title}`, cung: DON_QUAI[bienThuongId].name, cungHanh: DON_QUAI[bienThuongId].element, shortThoan: 'Tái Hồi Thành Công'
    };

    // 4. Thể và Dụng (Mai Hoa)
    let theQuai, dungQuai;
    const dongFirst = dongList[0] || 1;
    if (dongFirst <= 3) {
      dungQuai = { ...ha, viTri: 'Hạ Quái' };
      theQuai = { ...thuong, viTri: 'Thượng Quái' };
    } else {
      dungQuai = { ...thuong, viTri: 'Thượng Quái' };
      theQuai = { ...ha, viTri: 'Hạ Quái' };
    }

    let theDungRelation = '', theDungRating = '', theDungDesc = '';
    if (theQuai.element === dungQuai.element) {
      theDungRelation = 'Tỉ Hòa (Bình hòa cát lợi)';
      theDungRating = 'Đại Cát';
      theDungDesc = `Thể (${theQuai.title} - ${theQuai.element}) và Dụng (${dungQuai.title} - ${dungQuai.element}) đồng hành Tỉ Hòa, nội ngoại đồng tâm hiệp lực, âm dương tương hiệp, vạn sự hanh thông.`;
    } else if (NGU_HANH_SINH[dungQuai.element] === theQuai.element) {
      theDungRelation = 'Dụng sinh Thể (Sinh nhập - Đại Cát)';
      theDungRating = 'Đại Cát';
      theDungDesc = `Dụng (${dungQuai.title} - ${dungQuai.element}) sinh Thể (${theQuai.title} - ${theQuai.element}), ngoại cảnh trợ lực cho bản thân, cầu tài đắc tài, cầu danh đắc danh, có quý nhân phù trì.`;
    } else if (NGU_HANH_SINH[theQuai.element] === dungQuai.element) {
      theDungRelation = 'Thể sinh Dụng (Sinh xuất - Tiết khí)';
      theDungRating = 'Thứ Cát';
      theDungDesc = `Thể (${theQuai.title} - ${theQuai.element}) sinh Dụng (${dungQuai.title} - ${dungQuai.element}), hao tổn nguyên khí để gây dựng sự nghiệp, cần kiên trì vượt qua giai đoạn vất vả ban đầu.`;
    } else if (NGU_HANH_KHAC[theQuai.element] === dungQuai.element) {
      theDungRelation = 'Thể khắc Dụng (Khắc xuất - Hữu công)';
      theDungRating = 'Tiểu Cát';
      theDungDesc = `Thể (${theQuai.title} - ${theQuai.element}) khắc Dụng (${dungQuai.title} - ${dungQuai.element}), chủ thể nắm quyền chủ động chế ngự hoàn cảnh, tuy nhọc sức nhưng sau cùng thu được kết quả tốt đẹp.`;
    } else {
      theDungRelation = 'Dụng khắc Thể (Khắc nhập - Bất lợi)';
      theDungRating = 'Hung';
      theDungDesc = `Dụng (${dungQuai.title} - ${dungQuai.element}) khắc Thể (${theQuai.title} - ${theQuai.element}), hoàn cảnh áp chế chủ thể, đề phòng tranh chấp hoặc trở ngại bất ngờ.`;
    }

    // Nạp Giáp cho Quẻ Chủ & Quẻ Biến
    const napChu = [...NAP_CHI[haId].noi, ...NAP_CHI[thuongId].ngoai];
    const napBien = [...NAP_CHI[bienHaId].noi, ...NAP_CHI[bienThuongId].ngoai];

    const lucThuList = getLucThu(canChi.canNgay);
    const tuanKhong = getTuanKhong(canChi.canNgay, canChi.chiNgay);
    const thanSat = getThanSat(canChi.canNgay, canChi.chiNgay);
    const dungThanObj = DUNG_THAN_MAP[dungThan] || DUNG_THAN_MAP[5];

    // Tra cứu danh sách Phục Thần từ Bát Thuần quẻ gốc của Cung
    const phucThanMapChu = getPhucThanMap(queChuInfo.cung);
    const phucThanMapBien = getPhucThanMap(queBienInfo.cung);

    // Xác định các Lục Thân xuất hiện trên Quẻ Chủ
    const presentLucThanChu = new Set();
    for (let i = 0; i < 6; i++) {
      const lt = getLucThan(queChuInfo.cungHanh, napChu[i].hanh);
      presentLucThanChu.add(lt);
    }
    const allLucThanList = ['Phụ Mẫu', 'Huynh Đệ', 'Tử Tôn', 'Thê Tài', 'Quan Quỷ'];
    const missingLucThanChu = allLucThanList.filter(lt => !presentLucThanChu.has(lt));

    // Xác định Lục Thân thiếu trên Quẻ Biến
    const presentLucThanBien = new Set();
    for (let i = 0; i < 6; i++) {
      const lt = getLucThan(queChuInfo.cungHanh, napBien[i].hanh);
      presentLucThanBien.add(lt);
    }
    const missingLucThanBien = allLucThanList.filter(lt => !presentLucThanBien.has(lt));

    // 1. XÂY DỰNG BẢNG QUẺ CHỦ (6 HÀO TỪ HÀO 1 ĐẾN HÀO 6)
    const tableRowsChu = [];
    for (let i = 0; i < 6; i++) {
      const haoNum = i + 1;
      const isDong = dongList.includes(haoNum);
      const can = (i < 3 ? NAP_CAN[haId].noi : NAP_CAN[thuongId].ngoai);
      const chiItem = napChu[i];
      const hanh = chiItem.hanh;
      const lucThan = getLucThan(queChuInfo.cungHanh, hanh);
      const isThe = queChuInfo.the === haoNum;
      const isUng = queChuInfo.ung === haoNum;
      const isTK = tuanKhong.includes(chiItem.chi);
      const isDungThan = (lucThan === dungThanObj.name);

      // Phục Thần: nếu hào tại vị trí này trong quẻ Bát Thuần mang Lục Thân bị thiếu
      const batThuanHao = phucThanMapChu[i];
      let phucThanLabel = '';
      let phucThanFullLabel = '';
      if (missingLucThanChu.includes(batThuanHao.lucThan)) {
        phucThanLabel = batThuanHao.label;
        phucThanFullLabel = batThuanHao.fullLabel;
      }

      tableRowsChu.push({
        haoNum,
        isDong,
        isDungThan,
        line: chuLines[i],
        can,
        chi: chiItem.chi,
        hanh,
        napGiapText: `${can} ${chiItem.chi}`,
        napGiapColor: HANH_COLOR[hanh] || '#111111',
        theUng: isThe ? 'Thế' : (isUng ? 'Ứng' : ''),
        lucThan,
        lucThu: lucThuList[i],
        lucThuColor: getLucThuColor(lucThuList[i]),
        lucThanTS: getLucThanTruongSinh(queChuInfo.cungHanh, chiItem.chi),
        khongVong: isTK ? 'Không Vong' : '',
        phucThan: phucThanLabel,
        phucThanFull: phucThanFullLabel
      });
    }

    // 2. XÂY DỰNG BẢNG QUẺ BIẾN (6 HÀO)
    const tableRowsBien = [];
    for (let i = 0; i < 6; i++) {
      const haoNum = i + 1;
      const can = (i < 3 ? NAP_CAN[bienHaId].noi : NAP_CAN[bienThuongId].ngoai);
      const chiItem = napBien[i];
      const hanh = chiItem.hanh;
      // Trong bốc phệ, Quẻ Biến dùng Họ Quẻ của Quẻ Chủ để định Lục Thân & Lục Thần
      const lucThan = getLucThan(queChuInfo.cungHanh, hanh);
      const isThe = queBienInfo.the === haoNum;
      const isUng = queBienInfo.ung === haoNum;
      const isTK = tuanKhong.includes(chiItem.chi);

      const batThuanHao = phucThanMapBien[i];
      let phucThanLabel = '';
      let phucThanFullLabel = '';
      if (missingLucThanBien.includes(batThuanHao.lucThan)) {
        phucThanLabel = batThuanHao.label;
        phucThanFullLabel = batThuanHao.fullLabel;
      }

      tableRowsBien.push({
        haoNum,
        isDong: false,
        line: bienLines[i],
        can,
        chi: chiItem.chi,
        hanh,
        napGiapText: `${can} ${chiItem.chi}`,
        napGiapColor: HANH_COLOR[hanh] || '#111111',
        theUng: isThe ? 'Thế' : (isUng ? 'Ứng' : ''),
        lucThan,
        lucThu: lucThuList[i],
        lucThuColor: getLucThuColor(lucThuList[i]),
        lucThanTS: getLucThanTruongSinh(queChuInfo.cungHanh, chiItem.chi),
        khongVong: isTK ? 'Không Vong' : '',
        phucThan: phucThanLabel,
        phucThanFull: phucThanFullLabel
      });
    }

    // Bảng tableRows gộp phục vụ tương thích cũ
    const tableRows = [];
    for (let i = 0; i < 6; i++) {
      const c = tableRowsChu[i];
      const b = tableRowsBien[i];
      tableRows.push({
        haoNum: c.haoNum,
        isDong: c.isDong,
        isDungThan: c.isDungThan,
        chuLine: c.line,
        bienLine: b.line,
        theUng: c.theUng,
        lucThanChu: c.lucThan,
        canChiChu: `${c.chi}-${c.hanh}`,
        canHaoChu: c.napGiapText,
        tkChu: c.khongVong ? 'K' : '',
        lucThanBien: b.lucThan,
        canChiBien: `${b.chi}-${b.hanh}`,
        canHaoBien: b.napGiapText,
        tkBien: b.khongVong ? 'K' : '',
        lucThu: c.lucThu,
        vuongSu: getVuongTuong(canChi.chiThang, c.hanh),
        loc: thanSat.loc === c.chi ? 'L' : '',
        quy: thanSat.quy.includes(c.chi) ? 'Q' : '',
        ma: thanSat.ma === c.chi ? 'M' : '',
        dao: thanSat.dao === c.chi ? 'Đ' : ''
      });
    }

    // 3. XÂY DỰNG BẢNG THÔNG TIN LUẬN GIẢI
    const luanGiai = buildThongTinLuanGiai({
      queChuInfo,
      queBienInfo,
      tableRowsChu,
      tableRowsBien,
      dongList,
      dungThanObj,
      canChi
    });

    const nhatHanh = CHI_HANH[canChi.chiNgay] || 'Thổ';
    const nguyetHanh = CHI_HANH[canChi.chiThang] || 'Kim';

    return {
      method,
      methodName: methodName || 'Xuất Quẻ Dịch',
      methodTitle: methodTitle || 'PHẦN MỀM LẬP QUẺ DỊCH',
      question,
      timeStr,
      canChi,
      tuanKhong,
      thanSat,
      theQuai,
      dungQuai,
      theDungRelation,
      theDungRating,
      theDungDesc,
      dongList,
      dungThan: dungThanObj,
      cachTinhToan: cachTinhToan === 0 ? 'Theo Lịch Âm' : 'Theo Tiết Khí',
      queChu: { ...queChuInfo, lines: chuLines, upper: thuong, lower: ha },
      queHo: { ...queHoInfo, lines: hoLines, upper: DON_QUAI[hoThuongId], lower: DON_QUAI[hoHaId] },
      queBien: { ...queBienInfo, lines: bienLines, upper: DON_QUAI[bienThuongId], lower: DON_QUAI[bienHaId] },
      tableRowsChu,
      tableRowsBien,
      tableRows,
      luanGiai,
      nhatHanh,
      nguyetHanh
    };
  }

  // =========================================================================
  // 6. XÂY DỰNG NỘI DUNG THÔNG TIN LUẬN GIẢI (BỐC PHỆ CỔ PHÁP)
  // =========================================================================
  function buildThongTinLuanGiai({ queChuInfo, queBienInfo, tableRowsChu, tableRowsBien, dongList, dungThanObj, canChi }) {
    const chiNgayHanh = CHI_HANH[canChi.chiNgay] || 'Thổ';
    const chiThangHanh = CHI_HANH[canChi.chiThang] || 'Kim';
    const dungThanName = dungThanObj ? dungThanObj.name : 'Quan Quỷ';

    // 1. Dụng Thần
    const dungThanRows = tableRowsChu.filter(r => r.lucThan === dungThanName);
    let dungThanText = '';
    if (dungThanRows.length > 0) {
      dungThanText = `Dụng thần: ${dungThanName} - (ở Hào ${dungThanRows.map(r => r.haoNum).join(', ')})`;
    } else {
      dungThanText = `Dụng thần: ${dungThanName} - (ẩn ở Phục thần)`;
    }

    // 2. Nguyên Thần (sinh Dụng Thần)
    const NGUYEN_THAN_MAP = {
      'Quan Quỷ': 'Thê Tài',
      'Thê Tài': 'Tử Tôn',
      'Tử Tôn': 'Huynh Đệ',
      'Huynh Đệ': 'Phụ Mẫu',
      'Phụ Mẫu': 'Quan Quỷ'
    };
    // 3. Kỵ Thần (khắc Dụng Thần)
    const KY_THAN_MAP = {
      'Quan Quỷ': 'Tử Tôn',
      'Thê Tài': 'Huynh Đệ',
      'Tử Tôn': 'Phụ Mẫu',
      'Huynh Đệ': 'Quan Quỷ',
      'Phụ Mẫu': 'Thê Tài'
    };
    // 4. Cừu Thần (sinh Kỵ Thần, khắc Nguyên Thần)
    const CUU_THAN_MAP = {
      'Quan Quỷ': 'Huynh Đệ',
      'Thê Tài': 'Phụ Mẫu',
      'Tử Tôn': 'Quan Quỷ',
      'Huynh Đệ': 'Thê Tài',
      'Phụ Mẫu': 'Tử Tôn'
    };

    const nguyenThanName = NGUYEN_THAN_MAP[dungThanName] || 'Thê Tài';
    const kyThanName = KY_THAN_MAP[dungThanName] || 'Tử Tôn';
    const cuuThanName = CUU_THAN_MAP[dungThanName] || 'Huynh Đệ';

    function describeThanRows(targetName, roleLabel) {
      const matched = [...tableRowsChu].reverse().filter(r => r.lucThan === targetName);
      if (matched.length === 0) {
        return `Không hiện trên Quẻ Chủ (ẩn phục)`;
      }
      return matched.map(r => {
        const relNhat = getQuanHeNguHanh(chiNgayHanh, r.hanh, 'Nhật Thần', roleLabel);
        const relNguyet = getQuanHeNguHanh(r.hanh, chiThangHanh, roleLabel, 'Nguyệt Lệnh');
        const theTag = r.theUng === 'Thế' ? ' (Hào Thế)' : (r.theUng === 'Ứng' ? ' (Hào Ứng)' : '');
        return `Hào ${r.haoNum} - ${r.lucThan} - ${relNhat}; - ${relNguyet};${theTag}`;
      }).join('\n');
    }

    const nguyenThanText = describeThanRows(nguyenThanName, 'Nguyên Thần');
    const kyThanText = describeThanRows(kyThanName, 'Kỵ Thần');
    const cuuThanText = describeThanRows(cuuThanName, 'Cừu Thần');

    // Phục Thần
    const phucRows = tableRowsChu.filter(r => r.phucThan && r.phucThan.trim() !== '');
    let phucThanText = '';
    if (phucRows.length > 0) {
      phucThanText = phucRows.map(r => `Hào ${r.haoNum} - ${r.lucThan} (${r.hanh}) - Phục Thần là ${r.phucThanFull || r.phucThan}`).join('\n');
    } else {
      phucThanText = 'Hiện đủ trên quẻ (không có Phục Thần khuyết)';
    }

    // Lục Thân Sinh & Khắc
    const lucThanSinhText = 'Phụ Mẫu >> Huynh Đệ >> Tử Tôn >> Thê Tài >> Quan Quỷ >> Phụ Mẫu';
    const lucThanKhacText = 'Phụ Mẫu >> Tử Tôn >> Quan Quỷ >> Huynh Đệ >> Thê Tài >> Phụ Mẫu';

    // Lục Thân Biến
    let lucThanBienText = '';
    if (dongList && dongList.length > 0) {
      const sortedDong = [...dongList].sort((a, b) => b - a);
      lucThanBienText = sortedDong.map(h => {
        const chu = tableRowsChu[h - 1];
        const bien = tableRowsBien[h - 1];
        return `Hào ${h} ${chu.lucThan} biến ${bien.lucThan}`;
      }).join('; ');
    } else {
      lucThanBienText = 'Quẻ Tĩnh không có hào biến';
    }

    return {
      dungThanText,
      nguyenThanText,
      kyThanText,
      cuuThanText,
      phucThanText,
      lucThanSinhText,
      lucThanKhacText,
      lucThanBienText
    };
  }

  // =========================================================================
  // 7. RENDER GIAO DIỆN BẢNG XUẤT QUẺ DỊCH (CHUẨN SHEET BẢNG XUẤT QUẺ DỊCH)
  // =========================================================================
  function renderTrangDichQuaiHtml(data) {
    const {
      question, timeStr, canChi,
      dongList = [], queChu, queBien,
      tableRowsChu = [], tableRowsBien = [],
      luanGiai = {}, nhatHanh = 'Thổ', nguyetHanh = 'Kim',
      methodName = 'Xuất Quẻ Dịch', methodTitle
    } = data;

    const displayTitle = methodTitle || (methodName ? (methodName.toUpperCase().includes('XUẤT QUẺ') ? 'PHẦN MỀM LẬP QUẺ DỊCH - ' + methodName.toUpperCase() : 'PHẦN MỀM LẬP QUẺ DỊCH - XUẤT QUẺ ' + methodName.toUpperCase()) : 'PHẦN MỀM LẬP QUẺ DỊCH');

    // Helper đường dẫn ảnh linh hoạt
    function getAssetPath(filename) {
      if (typeof window !== 'undefined' && window.location) {
        const p = window.location.pathname || '';
        if (p.includes('/Kinh Dịch/') || p.includes('/Kinh%20D%E1%BB%8Bch/')) {
          return '../assets/' + filename;
        }
      }
      return 'assets/' + filename;
    }

    // Helper vẽ 6 vạch cho Thẻ Quẻ
    function renderCardBars(lines, dList = [], isChu = false) {
      let html = '<div class="dq-card-bars">';
      for (let i = 5; i >= 0; i--) {
        const haoNum = i + 1;
        const isDong = isChu && dList.includes(haoNum);
        const lineVal = lines[i];
        const color = isDong ? '#D81E05' : '#0033CC';

        html += '<div class="dq-bar-row">';
        if (lineVal === 1) {
          html += `<div class="dq-bar-yang" style="background-color: ${color};"></div>`;
        } else {
          html += `<div class="dq-bar-yin">
            <span style="background-color: ${color};"></span>
            <span style="background-color: ${color};"></span>
          </div>`;
        }
        if (isDong) {
          html += `<span class="dq-bar-dong-dot">●</span>`;
        }
        html += '</div>';
      }
      html += '</div>';
      return html;
    }

    // Helper vẽ vạch mini trong bảng Lục Hào
    function renderTableMiniBar(lineVal, isDong = false) {
      const color = isDong ? '#D81E05' : '#0033CC';
      if (lineVal === 1) {
        return `<div style="display:inline-block; width:68px; height:11.5px; background-color:${color}; border-radius:1px;"></div>`;
      } else {
        return `<div style="display:inline-flex; justify-content:space-between; width:68px; height:11.5px;">
          <span style="width:30px; height:11.5px; background-color:${color}; border-radius:1px;"></span>
          <span style="width:30px; height:11.5px; background-color:${color}; border-radius:1px;"></span>
        </div>`;
      }
    }

    // Dòng dữ liệu Quẻ Chủ (từ Hào 6 xuống Hào 1)
    const rowsChuHtml = [...tableRowsChu].reverse().map(row => `
      <tr>
        <td style="color: ${row.napGiapColor} !important; font-weight:800;">${row.napGiapText}</td>
        <td>
          <div class="dq-table-hao-cell">
            ${renderTableMiniBar(row.line, row.isDong)}
          </div>
        </td>
        <td style="color:#000000; font-weight:800;">${row.theUng}</td>
        <td style="color:#000000; font-weight:700;">${row.lucThan}</td>
        <td style="color: ${row.lucThuColor} !important; font-weight:800;">${row.lucThu}</td>
        <td style="color:#000000; font-weight:700;">${row.lucThanTS}</td>
        <td style="color:#000000; font-weight:${row.khongVong ? '800' : 'normal'};">${row.khongVong}</td>
        <td style="color:#000000; font-weight:700; white-space: nowrap;">${row.phucThan || ''}</td>
      </tr>
    `).join('');

    // Dòng dữ liệu Quẻ Biến (từ Hào 6 xuống Hào 1)
    const rowsBienHtml = [...tableRowsBien].reverse().map(row => `
      <tr>
        <td style="color: ${row.napGiapColor} !important; font-weight:800;">${row.napGiapText}</td>
        <td>
          <div class="dq-table-hao-cell">
            ${renderTableMiniBar(row.line, false)}
          </div>
        </td>
        <td style="color:#000000; font-weight:800;">${row.theUng}</td>
        <td style="color:#000000; font-weight:700;">${row.lucThan}</td>
        <td style="color: ${row.lucThuColor} !important; font-weight:800;">${row.lucThu}</td>
        <td style="color:#000000; font-weight:700;">${row.lucThanTS}</td>
        <td style="color:#000000; font-weight:${row.khongVong ? '800' : 'normal'};">${row.khongVong}</td>
        <td style="color:#000000; font-weight:700; white-space: nowrap;">${row.phucThan || ''}</td>
      </tr>
    `).join('');

    // Âm lịch & Tiết Khí hiển thị
    const amNgay = canChi.amLichNgay ? canChi.amLichNgay.toString().padStart(2, '0') : '03';
    const amThang = canChi.amLichThang ? canChi.amLichThang.toString().padStart(2, '0') : '08';
    const amNam = canChi.canNam && canChi.chiNam ? `${canChi.canNam} ${canChi.chiNam}` : '2026';
    const tietKhiStr = canChi.tietKhi || 'Bạch Lộ';

    const logoBatQuaiSrc = (typeof window !== 'undefined' && window.TUTRU_BATQUAI_DATA_URL) ? window.TUTRU_BATQUAI_DATA_URL : getAssetPath('logo_batquai.png');
    const anTrienSrc = (typeof window !== 'undefined' && window.AN_TRIEN_DATA_URL) ? window.AN_TRIEN_DATA_URL : getAssetPath('an_trien.png');

    return `
      <div class="dq-export-wrapper">
        <!-- Thanh nut chuc nang: Tai anh que, In que & Quay lai lap que khac -->
        <div class="dq-download-toolbar no-print" style="width: 100%; max-width: 1150px; display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 14px; box-sizing: border-box; flex-wrap: wrap;">
          <button type="button" id="btn-back-lapque" onclick="window.quayLaiLapQue()" class="kd-subtab-btn" style="padding: 9px 18px; font-size: 13.5px; font-weight: 700; background: #FFF; color: #7A1414; border: 1.5px solid #7A1414; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: all 0.2s;">
            <i class="fa-solid fa-arrow-left"></i> ← Lập Quẻ Khác / Quay Lại
          </button>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <button type="button" id="btn-download-dichquai" onclick="window.taiXuatQueDich()" class="kd-action-btn-main" style="padding: 9px 18px; font-size: 13.5px; font-weight: 700; background: #7A1414; color: #FFF; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 8px rgba(122,20,20,0.25);">
              <i class="fa-solid fa-download"></i> Tải Bản Xuất Quẻ (Ảnh PNG)
            </button>
            <button type="button" onclick="window.printTrangDichQuai()" class="kd-subtab-btn" style="padding: 9px 16px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-print"></i> In Bảng Quẻ (PDF)
            </button>
          </div>
        </div>

        <div id="trang-dich-quai-card" class="dichquai-export-board select-text" style="background-color: #F5F2EB !important; background-image: none !important;">
          <!-- 1. TIÊU ĐỀ & LOGO ĐỒ BẢN -->
          <div class="dq-header">
            <div class="dq-header-logo-wrap">
              <img src="${logoBatQuaiSrc}" alt="Logo Bát Quái" class="dq-header-logo" onerror="if(!this.dataset.retry){this.dataset.retry=1;this.src=(this.src.indexOf('../assets/')!==-1?'assets/':'../assets/')+'logo_batquai.png';}" />
            </div>
            <div class="dq-header-center">
              <div class="dq-site-title">THUẬT SỐ HUYỀN HỌC</div>
              <a href="http://www.thuatsohuyenhoc.com.vn" target="_blank" class="dq-site-url">http://www.thuatsohuyenhoc.com.vn</a>
              <div class="dq-app-title">${displayTitle}</div>
            </div>
            <div class="dq-header-right">
              <div class="dq-calligraphy-col" title="Thuật Số Huyền Học">
                <span>術</span>
                <span>數</span>
                <span>玄</span>
                <span>學</span>
              </div>
              <div class="dq-seal-wrap">
                <img src="${anTrienSrc}" alt="Ấn Triện" class="dq-seal-img" onerror="if(!this.dataset.retry){this.dataset.retry=1;this.src=(this.src.indexOf('../assets/')!==-1?'assets/':'../assets/')+'an_trien.png';}" />
              </div>
            </div>
          </div>

        <!-- 2. KHUNG THÔNG TIN XEM QUẺ (METADATA) -->
        <div class="dq-info-box">
          <table class="dq-info-table">
            <tbody>
              <tr>
                <td class="dq-info-label">Ngày Xem:</td>
                <td class="dq-info-value">
                  ${timeStr} (${amNgay}/${amThang}/${amNam} Âm Lịch - Tiết ${tietKhiStr})
                </td>
              </tr>
              <tr>
                <td class="dq-info-label">Can Chi:</td>
                <td class="dq-info-value">
                  Năm ${canChi.canNam} ${canChi.chiNam} - Tháng ${canChi.canThang} ${canChi.chiThang} - Ngày ${canChi.canNgay} ${canChi.chiNgay} - Giờ ${canChi.canGio} ${canChi.chiGio}
                </td>
              </tr>
              <tr>
                <td class="dq-info-label">Việc Xem:</td>
                <td class="dq-info-value" style="font-weight:400; color:#7A1414;">
                  ${question || 'Xem Về Quan Quỷ'}
                </td>
              </tr>
              <tr>
                <td class="dq-info-label">Tiết Khí:</td>
                <td class="dq-info-value" style="font-weight:400;">
                  <span style="display:inline-block; min-width:200px;">
                    Nhật Lệnh: ${canChi.chiNgay} - ${nhatHanh}
                  </span>
                  <span>
                    Nguyệt Lệnh: ${canChi.chiThang} ${nguyetHanh}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. CẶP THẺ SƠ ĐỒ 2 QUẺ (QUẺ CHỦ & QUẺ BIẾN) -->
        <div class="dq-cards-row">
          <!-- Card Quẻ Chủ -->
          <div class="dq-card-box">
            <div class="dq-card-name">${queChu.name}</div>
            <div class="dq-card-cung">HỌ ${queChu.cung.toUpperCase()}</div>
            ${renderCardBars(queChu.lines, dongList, true)}
            <div class="dq-card-footer">QUẺ CHỦ</div>
          </div>

          <!-- Card Quẻ Biến -->
          <div class="dq-card-box">
            <div class="dq-card-name">${queBien.name}</div>
            <div class="dq-card-cung">HỌ ${queBien.cung.toUpperCase()}</div>
            ${renderCardBars(queBien.lines, [], false)}
            <div class="dq-card-footer">QUẺ BIẾN</div>
          </div>
        </div>

        <!-- 4. BẢNG 1: QUẺ CHỦ (MỘT HÀNG RIÊNG ĐẦY ĐỦ) -->
        <div class="dq-table-container">
          <div class="dq-table-header-title">
            Quẻ Chủ: &nbsp; ${queChu.name} – ${queChu.shortThoan || 'Cải Cựu Nghênh Tân'}
          </div>
          <table class="dq-table">
            <thead>
              <tr>
                <th style="width: 12%;">Nạp Giáp</th>
                <th style="width: 12%;">Quái Hào</th>
                <th style="width: 8%;">Thế Ứng</th>
                <th style="width: 13%;">Lục Thân</th>
                <th style="width: 13%;">Lục Thú</th>
                <th style="width: 13%;">Lục Thần</th>
                <th style="width: 12%;">Không Vong</th>
                <th style="width: 17%;">Phục Thần</th>
              </tr>
            </thead>
            <tbody>
              ${rowsChuHtml}
            </tbody>
          </table>
        </div>

        <!-- 5. BẢNG 2: QUẺ BIẾN (MỘT HÀNG RIÊNG ĐẦY ĐỦ) -->
        <div class="dq-table-container">
          <div class="dq-table-header-title">
            Quẻ Biến: &nbsp; ${queBien.name} – ${queBien.shortThoan || 'Giao Cảm Đồng Điệu'}
          </div>
          <table class="dq-table">
            <thead>
              <tr>
                <th style="width: 12%;">Nạp Giáp</th>
                <th style="width: 12%;">Quái Hào</th>
                <th style="width: 8%;">Thế Ứng</th>
                <th style="width: 13%;">Lục Thân</th>
                <th style="width: 13%;">Lục Thú</th>
                <th style="width: 13%;">Lục Thần</th>
                <th style="width: 12%;">Không Vong</th>
                <th style="width: 17%;">Phục Thần</th>
              </tr>
            </thead>
            <tbody>
              ${rowsBienHtml}
            </tbody>
          </table>
        </div>


        <!-- 6. BẢNG THÔNG TIN LUẬN GIẢI -->
        <div class="dq-luan-box">
          <div class="dq-luan-header">THÔNG TIN LUẬN GIẢI</div>
          <table class="dq-luan-table">
            <colgroup>
              <col style="width: 175px;" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td class="dq-luan-label">Dụng Thần</td>
                <td class="dq-luan-content" style="font-weight:400; color:#7A1414;">${luanGiai.dungThanText || ''}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Nguyên Thần</td>
                <td class="dq-luan-content" style="font-weight:400;">${(luanGiai.nguyenThanText || '').replace(/\n/g, '<br>')}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Kỵ Thần</td>
                <td class="dq-luan-content" style="font-weight:400;">${(luanGiai.kyThanText || '').replace(/\n/g, '<br>')}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Cừu Thần</td>
                <td class="dq-luan-content" style="font-weight:400;">${(luanGiai.cuuThanText || '').replace(/\n/g, '<br>')}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Phục Thần</td>
                <td class="dq-luan-content" style="font-weight:400;">${(luanGiai.phucThanText || '').replace(/\n/g, '<br>')}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Lục Thân Sinh</td>
                <td class="dq-luan-content" style="color:#16A34A !important; font-weight:400 !important;">${luanGiai.lucThanSinhText || ''}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Lục Thân Khắc</td>
                <td class="dq-luan-content" style="color:#DC2626 !important; font-weight:400 !important;">${luanGiai.lucThanKhacText || ''}</td>
              </tr>
              <tr>
                <td class="dq-luan-label">Lục Thân Biến</td>
                <td class="dq-luan-content" style="font-weight:400;">${luanGiai.lucThanBienText || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    `;
  }

  // =========================================================================
  // 8. HELPER TÍNH CAN CHI THỜI ĐIỂM
  // =========================================================================
    function getCanChiThoiDiem(date, cachTinhToan = 1) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = date.getHours();
    const min = date.getMinutes();

    // 1. Chi Giờ
    const chiGioList = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    const chiGioIdx = Math.floor((h * 60 + min + 60) / 120) % 12;
    const chiGio = chiGioList[chiGioIdx];

    // 2. Can Chi Ngày từ Julian Day Number (JDN)
    const a = Math.floor((14 - m) / 12);
    const y1 = y + 4800 - a;
    const m1 = m + 12 * a - 3;
    const jdn = d + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
    const canNgayIdx = (jdn + 9) % 10;
    const chiNgayIdx = (jdn + 1) % 12;

    const canNgay = CAN[canNgayIdx];
    const chiNgay = CHI[chiNgayIdx];

    // 3. Can Giờ (Ngũ Thử Độn)
    const canGioStart = (canNgayIdx % 5) * 2;
    const canGio = CAN[(canGioStart + chiGioIdx) % 10];

    // 4. Âm Lịch (Ngày, Tháng, Năm Âm Lịch)
    let amNgay = d;
    let amThang = m;
    let amNam = y;
    let amLeap = 0;

    let lunar = null;
    if (typeof window !== 'undefined') {
      if (window.LICH_VAN_NIEN_ENGINE && typeof window.LICH_VAN_NIEN_ENGINE.convertSolar2Lunar === 'function') {
        lunar = window.LICH_VAN_NIEN_ENGINE.convertSolar2Lunar(d, m, y, 7.0);
      } else if (typeof window.convertSolar2Lunar === 'function') {
        lunar = window.convertSolar2Lunar(d, m, y, 7.0);
      }
    }
    if (lunar) {
      if (Array.isArray(lunar)) {
        amNgay = lunar[0];
        amThang = lunar[1];
        amNam = lunar[2];
        amLeap = lunar[3] || 0;
      } else {
        amNgay = lunar.day !== undefined ? lunar.day : (lunar[0] || d);
        amThang = lunar.month !== undefined ? lunar.month : (lunar[1] || m);
        amNam = lunar.year !== undefined ? lunar.year : (lunar[2] || y);
        amLeap = lunar.leap || 0;
      }
    }

    // 5. Can Chi Năm (theo Âm Lịch)
    const canNam = CAN[(amNam + 6) % 10];
    const chiNam = CHI[(amNam + 8) % 12];

    // 6. Tiết Khí
    let tietKhi = 'Bạch Lộ';
    if (typeof window !== 'undefined' && window.LICH_VAN_NIEN && typeof window.LICH_VAN_NIEN.getTietKhiByJd === 'function') {
      tietKhi = window.LICH_VAN_NIEN.getTietKhiByJd(jdn, 7);
    }

    // 7. Chi Tháng & Can Tháng
    // Bảng quy đổi 24 tiết khí sang 12 Chi Tháng
    const mapTietKhiToChi = {
      'Lập Xuân': 'Dần', 'Vũ Thủy': 'Dần',
      'Kinh Trập': 'Mão', 'Xuân Phân': 'Mão',
      'Thanh Minh': 'Thìn', 'Cốc Vũ': 'Thìn',
      'Lập Hạ': 'Tị', 'Tiểu Mãn': 'Tị',
      'Mang Chủng': 'Ngọ', 'Hạ Chí': 'Ngọ',
      'Tiểu Thử': 'Mùi', 'Đại Thử': 'Mùi',
      'Lập Thu': 'Thân', 'Xử Thử': 'Thân',
      'Bạch Lộ': 'Dậu', 'Thu Phân': 'Dậu',
      'Hàn Lộ': 'Tuất', 'Sương Giáng': 'Tuất',
      'Lập Đông': 'Hợi', 'Tiểu Tuyết': 'Hợi',
      'Đại Tuyết': 'Tý', 'Đông Chí': 'Tý',
      'Tiểu Hàn': 'Sửu', 'Đại Hàn': 'Sửu'
    };

    let chiThangIdx = (amThang + 1) % 12; // Mặc định theo Âm Lịch: Tháng 1 là Dần (idx 2)... Tháng 8 là Dậu (idx 9)
    if (cachTinhToan === 1 && mapTietKhiToChi[tietKhi]) {
      chiThangIdx = CHI.indexOf(mapTietKhiToChi[tietKhi]);
    }
    const chiThang = CHI[chiThangIdx];

    // Can Tháng: Ngũ Hổ Độn dựa trên canNam
    const canNamIdx = CAN.indexOf(canNam);
    const canDanIdx = ((canNamIdx % 5) * 2 + 2) % 10;
    const stepFromDan = (chiThangIdx - 2 + 12) % 12;
    const canThang = CAN[(canDanIdx + stepFromDan) % 10];

    return {
      canNam, chiNam,
      canThang, chiThang,
      canNgay, chiNgay,
      canGio, chiGio,
      tietKhi,
      amLichNgay: amNgay,
      amLichThang: amThang,
      amLichNam: amNam
    };
  }

  // Xuất ra global scope
  window.DICH_QUAI_ENGINE = {
    lapQueMaiHoa,
    lapQueLucHao,
    lapQueNgauNhien,
    lapQueDongXu,
    buildDichQuaiFullResult,
    renderTrangDichQuaiHtml,
    getCanChiThoiDiem,
    DUNG_THAN_MAP,
    DON_QUAI,
    TRIGRAMS_INFO: DON_QUAI,
    QUE_KEP_INFO,
    getLucThanTruongSinh,
    getPhucThanMap
  };

})(typeof window !== 'undefined' ? window : this);
