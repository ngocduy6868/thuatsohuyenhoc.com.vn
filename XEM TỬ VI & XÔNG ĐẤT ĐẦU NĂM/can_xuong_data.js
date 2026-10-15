/**
 * DỮ LIỆU VÀ CÔNG THỨC CÂN XƯƠNG ĐOÁN SỐ (VIÊN THIÊN CANG)
 * Chuẩn xác thuật chiêm tinh cổ truyền Á Đông - Quy đổi Năm, Tháng, Ngày, Giờ Âm Lịch
 * Nền tảng Thuật Số Huyền Học
 */

const CAN_XUONG_DATA = {
  // 1. BẢNG LƯỢNG CHỈ THEO 60 HOA GIÁP (Đơn vị tính quy ra CHỈ: 1 Lượng = 10 Chỉ)
  namSinh: {
    "Giáp Tý": { luong: 1, chi: 2, tongChi: 12, canChi: "Giáp Tý", menh: "Hải Trung Kim", namTieuBieu: 1984 },
    "Ất Sửu": { luong: 0, chi: 9, tongChi: 9, canChi: "Ất Sửu", menh: "Hải Trung Kim", namTieuBieu: 1985 },
    "Bính Dần": { luong: 0, chi: 6, tongChi: 6, canChi: "Bính Dần", menh: "Lư Trung Hỏa", namTieuBieu: 1986 },
    "Đinh Mão": { luong: 0, chi: 7, tongChi: 7, canChi: "Đinh Mão", menh: "Lư Trung Hỏa", namTieuBieu: 1987 },
    "Mậu Thìn": { luong: 1, chi: 2, tongChi: 12, canChi: "Mậu Thìn", menh: "Đại Lâm Mộc", namTieuBieu: 1988 },
    "Kỷ Tỵ": { luong: 0, chi: 5, tongChi: 5, canChi: "Kỷ Tỵ", menh: "Đại Lâm Mộc", namTieuBieu: 1989 },
    "Canh Ngọ": { luong: 0, chi: 9, tongChi: 9, canChi: "Canh Ngọ", menh: "Lộ Bàng Thổ", namTieuBieu: 1990 },
    "Tân Mùi": { luong: 0, chi: 8, tongChi: 8, canChi: "Tân Mùi", menh: "Lộ Bàng Thổ", namTieuBieu: 1991 },
    "Nhâm Thân": { luong: 0, chi: 7, tongChi: 7, canChi: "Nhâm Thân", menh: "Kiếm Phong Kim", namTieuBieu: 1992 },
    "Quý Dậu": { luong: 0, chi: 8, tongChi: 8, canChi: "Quý Dậu", menh: "Kiếm Phong Kim", namTieuBieu: 1993 },

    "Giáp Tuất": { luong: 1, chi: 5, tongChi: 15, canChi: "Giáp Tuất", menh: "Sơn Đầu Hỏa", namTieuBieu: 1994 },
    "Ất Hợi": { luong: 0, chi: 9, tongChi: 9, canChi: "Ất Hợi", menh: "Sơn Đầu Hỏa", namTieuBieu: 1995 },
    "Bính Tý": { luong: 1, chi: 6, tongChi: 16, canChi: "Bính Tý", menh: "Giản Hạ Thủy", namTieuBieu: 1996 },
    "Đinh Sửu": { luong: 0, chi: 8, tongChi: 8, canChi: "Đinh Sửu", menh: "Giản Hạ Thủy", namTieuBieu: 1997 },
    "Mậu Dần": { luong: 0, chi: 8, tongChi: 8, canChi: "Mậu Dần", menh: "Thành Đầu Thổ", namTieuBieu: 1998 },
    "Kỷ Mão": { luong: 1, chi: 9, tongChi: 19, canChi: "Kỷ Mão", menh: "Thành Đầu Thổ", namTieuBieu: 1999 },
    "Canh Thìn": { luong: 1, chi: 2, tongChi: 12, canChi: "Canh Thìn", menh: "Bạch Lạp Kim", namTieuBieu: 2000 },
    "Tân Tỵ": { luong: 0, chi: 6, tongChi: 6, canChi: "Tân Tỵ", menh: "Bạch Lạp Kim", namTieuBieu: 2001 },
    "Nhâm Ngọ": { luong: 0, chi: 8, tongChi: 8, canChi: "Nhâm Ngọ", menh: "Dương Liễu Mộc", namTieuBieu: 2002 },
    "Quý Mùi": { luong: 0, chi: 7, tongChi: 7, canChi: "Quý Mùi", menh: "Dương Liễu Mộc", namTieuBieu: 2003 },

    "Giáp Thân": { luong: 0, chi: 5, tongChi: 5, canChi: "Giáp Thân", menh: "Tuyền Trung Thủy", namTieuBieu: 2004 },
    "Ất Dậu": { luong: 1, chi: 5, tongChi: 15, canChi: "Ất Dậu", menh: "Tuyền Trung Thủy", namTieuBieu: 2005 },
    "Bính Tuất": { luong: 0, chi: 6, tongChi: 6, canChi: "Bính Tuất", menh: "Ốc Thượng Thổ", namTieuBieu: 2006 },
    "Đinh Hợi": { luong: 1, chi: 6, tongChi: 16, canChi: "Đinh Hợi", menh: "Ốc Thượng Thổ", namTieuBieu: 2007 },
    "Mậu Tý": { luong: 1, chi: 5, tongChi: 15, canChi: "Mậu Tý", menh: "Tích Lịch Hỏa", namTieuBieu: 2008 },
    "Kỷ Sửu": { luong: 0, chi: 7, tongChi: 7, canChi: "Kỷ Sửu", menh: "Tích Lịch Hỏa", namTieuBieu: 2009 },
    "Canh Dần": { luong: 0, chi: 9, tongChi: 9, canChi: "Canh Dần", menh: "Tùng Bách Mộc", namTieuBieu: 2010 },
    "Tân Mão": { luong: 1, chi: 2, tongChi: 12, canChi: "Tân Mão", menh: "Tùng Bách Mộc", namTieuBieu: 2011 },
    "Nhâm Thìn": { luong: 1, chi: 0, tongChi: 10, canChi: "Nhâm Thìn", menh: "Trường Lưu Thủy", namTieuBieu: 2012 },
    "Quý Tỵ": { luong: 0, chi: 7, tongChi: 7, canChi: "Quý Tỵ", menh: "Trường Lưu Thủy", namTieuBieu: 2013 },

    "Giáp Ngọ": { luong: 1, chi: 5, tongChi: 15, canChi: "Giáp Ngọ", menh: "Sa Trung Kim", namTieuBieu: 1954 },
    "Ất Mùi": { luong: 0, chi: 6, tongChi: 6, canChi: "Ất Mùi", menh: "Sa Trung Kim", namTieuBieu: 1955 },
    "Bính Thân": { luong: 0, chi: 5, tongChi: 5, canChi: "Bính Thân", menh: "Sơn Hạ Hỏa", namTieuBieu: 1956 },
    "Đinh Dậu": { luong: 1, chi: 4, tongChi: 14, canChi: "Đinh Dậu", menh: "Sơn Hạ Hỏa", namTieuBieu: 1957 },
    "Mậu Tuất": { luong: 1, chi: 4, tongChi: 14, canChi: "Mậu Tuất", menh: "Bình Địa Mộc", namTieuBieu: 1958 },
    "Kỷ Hợi": { luong: 0, chi: 9, tongChi: 9, canChi: "Kỷ Hợi", menh: "Bình Địa Mộc", namTieuBieu: 1959 },
    "Canh Tý": { luong: 0, chi: 7, tongChi: 7, canChi: "Canh Tý", menh: "Bích Thượng Thổ", namTieuBieu: 1960 },
    "Tân Sửu": { luong: 0, chi: 7, tongChi: 7, canChi: "Tân Sửu", menh: "Bích Thượng Thổ", namTieuBieu: 1961 },
    "Nhâm Dần": { luong: 1, chi: 2, tongChi: 12, canChi: "Nhâm Dần", menh: "Kim Bạch Kim", namTieuBieu: 1962 },
    "Quý Mão": { luong: 1, chi: 2, tongChi: 12, canChi: "Quý Mão", menh: "Kim Bạch Kim", namTieuBieu: 1963 },

    "Giáp Thìn": { luong: 0, chi: 8, tongChi: 8, canChi: "Giáp Thìn", menh: "Phú Đăng Hỏa", namTieuBieu: 1964 },
    "Ất Tỵ": { luong: 0, chi: 7, tongChi: 7, canChi: "Ất Tỵ", menh: "Phú Đăng Hỏa", namTieuBieu: 1965 },
    "Bính Ngọ": { luong: 1, chi: 3, tongChi: 13, canChi: "Bính Ngọ", menh: "Thiên Hà Thủy", namTieuBieu: 1966 },
    "Đinh Mùi": { luong: 0, chi: 5, tongChi: 5, canChi: "Đinh Mùi", menh: "Thiên Hà Thủy", namTieuBieu: 1967 },
    "Mậu Thân": { luong: 1, chi: 4, tongChi: 14, canChi: "Mậu Thân", menh: "Đại Trạch Thổ", namTieuBieu: 1968 },
    "Kỷ Dậu": { luong: 0, chi: 5, tongChi: 5, canChi: "Kỷ Dậu", menh: "Đại Trạch Thổ", namTieuBieu: 1969 },
    "Canh Tuất": { luong: 0, chi: 9, tongChi: 9, canChi: "Canh Tuất", menh: "Thoa Xuyến Kim", namTieuBieu: 1970 },
    "Tân Hợi": { luong: 1, chi: 7, tongChi: 17, canChi: "Tân Hợi", menh: "Thoa Xuyến Kim", namTieuBieu: 1971 },
    "Nhâm Tý": { luong: 0, chi: 5, tongChi: 5, canChi: "Nhâm Tý", menh: "Tang Đố Mộc", namTieuBieu: 1972 },
    "Quý Sửu": { luong: 0, chi: 7, tongChi: 7, canChi: "Quý Sửu", menh: "Tang Đố Mộc", namTieuBieu: 1973 },

    "Giáp Dần": { luong: 1, chi: 2, tongChi: 12, canChi: "Giáp Dần", menh: "Đại Khê Thủy", namTieuBieu: 1974 },
    "Ất Mão": { luong: 0, chi: 8, tongChi: 8, canChi: "Ất Mão", menh: "Đại Khê Thủy", namTieuBieu: 1975 },
    "Bính Thìn": { luong: 0, chi: 8, tongChi: 8, canChi: "Bính Thìn", menh: "Sa Trung Thổ", namTieuBieu: 1976 },
    "Đinh Tỵ": { luong: 1, chi: 6, tongChi: 16, canChi: "Đinh Tỵ", menh: "Sa Trung Thổ", namTieuBieu: 1977 },
    "Mậu Ngọ": { luong: 1, chi: 9, tongChi: 19, canChi: "Mậu Ngọ", menh: "Thiên Thượng Hỏa", namTieuBieu: 1978 },
    "Kỷ Mùi": { luong: 0, chi: 6, tongChi: 6, canChi: "Kỷ Mùi", menh: "Thiên Thượng Hỏa", namTieuBieu: 1979 },
    "Canh Thân": { luong: 0, chi: 8, tongChi: 8, canChi: "Canh Thân", menh: "Thạch Lựu Mộc", namTieuBieu: 1980 },
    "Tân Dậu": { luong: 1, chi: 6, tongChi: 16, canChi: "Tân Dậu", menh: "Thạch Lựu Mộc", namTieuBieu: 1981 },
    "Nhâm Tuất": { luong: 1, chi: 0, tongChi: 10, canChi: "Nhâm Tuất", menh: "Đại Hải Thủy", namTieuBieu: 1982 },
    "Quý Hợi": { luong: 0, chi: 7, tongChi: 7, canChi: "Quý Hợi", menh: "Đại Hải Thủy", namTieuBieu: 1983 }
  },

  // 2. BẢNG LƯỢNG CHỈ THEO THÁNG SINH ÂM LỊCH (Tháng 1 - Tháng 12)
  thangSinh: {
    1: { luong: 0, chi: 6, tongChi: 6, text: "Tháng Giêng (1)" },
    2: { luong: 0, chi: 7, tongChi: 7, text: "Tháng 2" },
    3: { luong: 1, chi: 8, tongChi: 18, text: "Tháng 3" },
    4: { luong: 0, chi: 9, tongChi: 9, text: "Tháng 4" },
    5: { luong: 0, chi: 5, tongChi: 5, text: "Tháng 5" },
    6: { luong: 1, chi: 6, tongChi: 16, text: "Tháng 6" },
    7: { luong: 0, chi: 9, tongChi: 9, text: "Tháng 7" },
    8: { luong: 1, chi: 5, tongChi: 15, text: "Tháng 8" },
    9: { luong: 1, chi: 8, tongChi: 18, text: "Tháng 9" },
    10: { luong: 0, chi: 8, tongChi: 8, text: "Tháng 10" },
    11: { luong: 0, chi: 9, tongChi: 9, text: "Tháng 11" },
    12: { luong: 0, chi: 5, tongChi: 5, text: "Tháng Chạp (12)" }
  },

  // 3. BẢNG LƯỢNG CHỈ THEO NGÀY SINH ÂM LỊCH (Ngày 1 - Ngày 30)
  ngaySinh: {
    1: { luong: 0, chi: 5, tongChi: 5, text: "Mùng 1" },
    2: { luong: 1, chi: 0, tongChi: 10, text: "Mùng 2" },
    3: { luong: 0, chi: 8, tongChi: 8, text: "Mùng 3" },
    4: { luong: 1, chi: 5, tongChi: 15, text: "Mùng 4" },
    5: { luong: 1, chi: 6, tongChi: 16, text: "Mùng 5" },
    6: { luong: 1, chi: 5, tongChi: 15, text: "Mùng 6" },
    7: { luong: 0, chi: 8, tongChi: 8, text: "Mùng 7" },
    8: { luong: 1, chi: 6, tongChi: 16, text: "Mùng 8" },
    9: { luong: 0, chi: 8, tongChi: 8, text: "Mùng 9" },
    10: { luong: 1, chi: 6, tongChi: 16, text: "Ngày 10" },
    11: { luong: 0, chi: 9, tongChi: 9, text: "Ngày 11" },
    12: { luong: 1, chi: 7, tongChi: 17, text: "Ngày 12" },
    13: { luong: 0, chi: 8, tongChi: 8, text: "Ngày 13" },
    14: { luong: 1, chi: 7, tongChi: 17, text: "Ngày 14" },
    15: { luong: 1, chi: 0, tongChi: 10, text: "Ngày 15 (Rằm)" },
    16: { luong: 0, chi: 8, tongChi: 8, text: "Ngày 16" },
    17: { luong: 0, chi: 9, tongChi: 9, text: "Ngày 17" },
    18: { luong: 1, chi: 8, tongChi: 18, text: "Ngày 18" },
    19: { luong: 0, chi: 5, tongChi: 5, text: "Ngày 19" },
    20: { luong: 1, chi: 5, tongChi: 15, text: "Ngày 20" },
    21: { luong: 1, chi: 0, tongChi: 10, text: "Ngày 21" },
    22: { luong: 0, chi: 9, tongChi: 9, text: "Ngày 22" },
    23: { luong: 0, chi: 8, tongChi: 8, text: "Ngày 23" },
    24: { luong: 0, chi: 9, tongChi: 9, text: "Ngày 24" },
    25: { luong: 1, chi: 5, tongChi: 15, text: "Ngày 25" },
    26: { luong: 1, chi: 8, tongChi: 18, text: "Ngày 26" },
    27: { luong: 0, chi: 7, tongChi: 7, text: "Ngày 27" },
    28: { luong: 0, chi: 8, tongChi: 8, text: "Ngày 28" },
    29: { luong: 1, chi: 6, tongChi: 16, text: "Ngày 29" },
    30: { luong: 0, chi: 6, tongChi: 6, text: "Ngày 30" }
  },

  // 4. BẢNG LƯỢNG CHỈ THEO GIỜ SINH ÂM LỊCH (12 Canh Giờ)
  gioSinh: {
    "Ty": { name: "Giờ Tý (23h00 - 00h59)", luong: 1, chi: 6, tongChi: 16, key: "Ty" },
    "Suu": { name: "Giờ Sửu (01h00 - 02h59)", luong: 0, chi: 6, tongChi: 6, key: "Suu" },
    "Dan": { name: "Giờ Dần (03h00 - 04h59)", luong: 0, chi: 7, tongChi: 7, key: "Dan" },
    "Mao": { name: "Giờ Mão (05h00 - 06h59)", luong: 1, chi: 0, tongChi: 10, key: "Mao" },
    "Thin": { name: "Giờ Thìn (07h00 - 08h59)", luong: 0, chi: 9, tongChi: 9, key: "Thin" },
    "Ty2": { name: "Giờ Tỵ (09h00 - 10h59)", luong: 1, chi: 6, tongChi: 16, key: "Ty2" },
    "Ngo": { name: "Giờ Ngọ (11h00 - 12h59)", luong: 1, chi: 0, tongChi: 10, key: "Ngo" },
    "Mui": { name: "Giờ Mùi (13h00 - 14h59)", luong: 0, chi: 8, tongChi: 8, key: "Mui" },
    "Than": { name: "Giờ Thân (15h00 - 16h59)", luong: 0, chi: 8, tongChi: 8, key: "Than" },
    "Dau": { name: "Giờ Dậu (17h00 - 18h59)", luong: 0, chi: 9, tongChi: 9, key: "Dau" },
    "Tuat": { name: "Giờ Tuất (19h00 - 20h59)", luong: 0, chi: 6, tongChi: 6, key: "Tuat" },
    "Hoi": { name: "Giờ Hợi (21h00 - 22h59)", luong: 1, chi: 6, tongChi: 16, key: "Hoi" }
  },

  // 5. TOÀN BỘ 51 LỜI GIẢI MÃ LƯỢNG CHỈ VIÊN THIÊN CANG (2 Lượng 1 Chỉ đến 7 Lượng 1 Chỉ)
  loiGiai: {
    21: {
      diem: 21, luong: 2, chi: 1, luongChiText: "2 Lượng 1 Chỉ",
      phanCap: "Hạ Cách - Thân Hàn Cực Khổ",
      thoHanViet: "Thân mạng cốt cách tự hàn vi,\nTha hương bạt thiệp vấn hà quy.\nLục thân vô kháo cô thân lập,\nBôn tẩu phong trần vạn sự phi.",
      dichTho: "Mệnh số sinh ra cốt cực hàn,\nBôn ba đây đó kiếp phong trần.\nLục thân chẳng thể nương nhờ cậy,\nĐộc mã đơn thân nhọc tấm thân.",
      tongQuan: "Số lượng chỉ 2 lượng 1 là mức nhẹ nhất trong Cân Xương Đoán Số. Mệnh chủ tiền vận chịu nhiều cay đắng, phúc trạch tổ nghiệp mỏng manh, không được người thân giúp đỡ, phải một mình tự bươn chải nơi đất khách quê người.",
      congDanh: "Công danh tài vận thủa trẻ trắc trở, làm việc kiếm tiền gặp nhiều thử thách thăng trầm. Đến trung niên nếu biết kiên nhẫn tích lũy, không nản lòng thoái chí thì dần có cơ hội ổn định cuộc sống mưu sinh.",
      giaDao: "Tình duyên gia đạo nên kết hôn muộn để tránh xung khắc gãy đổ. Tự lập sớm giúp mệnh chủ trui rèn bản lĩnh, sau này thấu hiểu và gắn kết cùng bạn đời.",
      khuyenTu: "Cổ nhân dạy: 'Tận nhân lực, tri thiên mệnh'. Mệnh tuy nhẹ nhưng tâm thành đức dày sẽ chuyển nguy thành an. Nên chăm làm việc thiện, phóng sinh cứu vật, giữ gìn chữ tín và siêng năng cần kiệm thì hậu vận bớt gian nan, hưởng phúc an lành."
    },
    22: {
      diem: 22, luong: 2, chi: 2, luongChiText: "2 Lượng 2 Chỉ",
      phanCap: "Hạ Cách - Bôn Ba Vất Vả",
      thoHanViet: "Thân hàn cốt lạc mệnh nan đào,\nLao tâm khổ tứ vọng đồ lao.\nĐãi đáo trung niên phong thủy chuyển,\nTự hữu an khang chiếu ánh cao.",
      dichTho: "Thân hàn mệnh bạc chịu phong sương,\nCực nhọc bôn ba khắp nẻo đường.\nChờ đợi trung niên thời vận chuyển,\nTrời ban phúc khí rạng hào quang.",
      tongQuan: "Mệnh 2 lượng 2 chỉ thủa nhỏ hay gặp đau ốm, khó nuôi hoặc gia cảnh bình hàn. Tiền vận vất vả, làm lụng quần quật nhưng tiền tài như nước chảy qua kẽ tay khó giữ được.",
      congDanh: "Nghề nghiệp nên học lấy một nghề tinh xảo trong tay để tự mưu sinh. Về sau khi qua tuổi 38, vận khí dần dần khởi sắc, có tích lũy tài chính.",
      giaDao: "Gia đình anh em ít người nương tựa, tình cảm đôi lứa cần bao dung, nhường nhịn lẫn nhau thì gia đạo mới yên ổn bền lâu.",
      khuyenTu: "Tích cực tu bồi âm đức, hiếu kính cha mẹ, chớ nản chí trước khó khăn. Vận khí hậu vận sẽ dần chuyển mình ấm êm."
    },
    23: {
      diem: 23, luong: 2, chi: 3, luongChiText: "2 Lượng 3 Chỉ",
      phanCap: "Bình Hạ - Tự Lực Cánh Sinh",
      thoHanViet: "Thử mệnh suy lai phúc bất toàn,\nCơ nghiệp tổ tông hữu nhược vô.\nNhược yếu thành gia tịnh lập nghiệp,\nTha hương cầu thực tự kinh doanh.",
      dichTho: "Số này phúc lộc chửa vẹn toàn,\nTổ nghiệp tiêu điều khó cậy trông.\nMuốn dựng nghiệp nhà nên xứ khác,\nTha hương lập xứ ắt hanh thông.",
      tongQuan: "Mệnh chủ là người có chí khí nhưng sinh bất phùng thời, tổ tiên không để lại nhiều tài sản, phải tự mình gây dựng cơ đồ từ đôi bàn tay trắng.",
      congDanh: "Hợp làm ăn buôn bán xa quê, đổi dời chỗ ở nhiều lần mới tụ tài. Từ 40 tuổi trở đi, công việc làm ăn mới đi vào quỹ đạo vững chắc.",
      giaDao: "Duyên phận vợ chồng gắn kết qua gian khó, đồng cam cộng khổ cùng nhau gây dựng kinh tế, con cái sau này ngoan ngoãn hiếu thuận.",
      khuyenTu: "Nên giữ tâm bình khí hòa, chớ tham lợi trước mắt, siêng gieo duyên lành ắt phước báu ngày một dày thêm."
    },
    24: {
      diem: 24, luong: 2, chi: 4, luongChiText: "2 Lượng 4 Chỉ",
      phanCap: "Bình Hạ - Hậu Vận Hồi Tâm",
      thoHanViet: "U hoài bất đắc chí nan thông,\nCơ sự vị thành thối chuyển trung.\nVô đoan phong khởi phong lãng tĩnh,\nBất giác xuân hồi hoa chính hồng.",
      dichTho: "Chí lớn chưa thành dạ ngổn ngang,\nThăng trầm lui tới bước phong trần.\nMây tan sóng lặng qua giông bão,\nXuân đến hoa cười rực rỡ xuân.",
      tongQuan: "Người có số lượng 2 lượng 4 chỉ là người có tài nhưng buổi đầu gặp nhiều trắc trở, việc mưu tính ban đầu hay bị đình trệ. Tuy nhiên hậu vận có lộc nở hoa.",
      congDanh: "Thủa thiếu thời đổi nghề nhiều lần, trung niên gặp cơ hội tốt mở ra đường làm ăn độc lập. Tài lộc từ tuổi 42 phát triển rất khá.",
      giaDao: "Vợ chồng cần thấu hiểu, tránh nóng vội khẩu thiệt. Hậu vận ấm êm, hưởng niềm vui điền viên cùng con cháu.",
      khuyenTu: "Nhẫn nại là chìa khóa vàng mở cánh cửa thành công. Hãy giữ tâm kiên định, chớ thấy sóng cả mà ngã tay chèo."
    },
    25: {
      diem: 25, luong: 2, chi: 5, luongChiText: "2 Lượng 5 Chỉ",
      phanCap: "Bình Cách - Tự Thân Vận Động",
      thoHanViet: "Thân mạng cốt cách tự bôn trì,\nCơ nghiệp tiêu điều tổ bất y.\nĐãi đắc tam thập niên dĩ hậu,\nPhương kiến môn đình đắc hảo thì.",
      dichTho: "Cốt cách thân này phải tự bươn,\nTrông nhờ tổ nghiệp chẳng vuông tròn.\nNgoài ba mươi tuổi qua thời hạn,\nMôn đình rạng rỡ đón mây son.",
      tongQuan: "Cuộc đời mệnh chủ như cây tùng kiên cường trong gió bão, không ỷ lại người khác, tự lập tự cường, càng về sau càng có vị thế vững chãi.",
      congDanh: "Sự nghiệp thủa đôi mươi bấp bênh, qua tuổi 32 bắt đầu có quý nhân trợ lực, kinh doanh hoặc công danh dần đi vào thế ổn định vững bền.",
      giaDao: "Gia đạo bình an, bạn đời là hậu phương vững chắc. Con cái thông minh, biết thương yêu gia đình.",
      khuyenTu: "Làm việc minh bạch, chân thành đối nhân xử thế, siêng năng hành thiện, tích đức thì phúc thọ miên trường."
    },
    26: {
      diem: 26, luong: 2, chi: 6, luongChiText: "2 Lượng 6 Chỉ",
      phanCap: "Bình Cách - Trước Trắc Trở Sau An Nhàn",
      thoHanViet: "Nhất sinh tác sự tự bình hành,\nKhổ tận cam lai phúc lộc sinh.\nTrung vận tiệm giai gia nghiệp chấn,\nLão lai hưởng thụ thái bình thanh.",
      dichTho: "Một đời làm việc giữ ngay ngay,\nKhổ tận cam lai hưởng phúc dày.\nTrung vận mở mang cơ nghiệp tốt,\nTuổi già nhàn hạ tháng ngày say.",
      tongQuan: "Người có lượng chỉ 2 lượng 6 tính tình ngay thẳng, chất phác, làm việc gì cũng chăm chỉ hết mình. Tuổi trẻ có phần lao tâm nhưng từ trung niên phúc lộc sinh sôi.",
      congDanh: "Công việc từ tốn mà tiến chắc, thích hợp nghề chuyên môn kỹ thuật hoặc thương trường bền bỉ, hậu vận của cải dư giả.",
      giaDao: "Hôn nhân êm ấm, vợ chồng chung sức đồng lòng, con cái phương trưởng thành đạt.",
      khuyenTu: "Giữ vững đạo đức nghề nghiệp, tích phước qua việc giúp đỡ người hoạn nạn, ắt được quỷ thần kính phục, trời phật chở che."
    },
    27: {
      diem: 27, luong: 2, chi: 7, luongChiText: "2 Lượng 7 Chỉ",
      phanCap: "Bình Cách - Bền Bỉ Thành Công",
      thoHanViet: "Nhất sinh tác sự thiểu thương lượng,\nKhổ tận cam lai tự hữu phương.\nMạc đạo công danh nan đắc tựu,\nLão lai y lộc cánh trùng quang.",
      dichTho: "Độc lập tự làm chẳng tính toan,\nKhổ rồi lại sướng bước thênh thang.\nChớ bảo công danh hoài trắc trở,\nTuổi già tài lộc sáng huy hoàng.",
      tongQuan: "Mệnh cách độc lập, có chí tiến thủ cao, tự mình định đoạt đường đi nước bước. Thủa nhỏ tuy thiếu thốn nhưng lớn lên tự tạo dựng tiền đồ.",
      congDanh: "Vận tiền tài tăng dần theo độ tuổi, sau 36 tuổi kinh doanh có lời to, có lộc đất đai nhà cửa.",
      giaDao: "Gia đình yên ấm, con cái thuận hòa, hiếu đễ với tổ tiên.",
      khuyenTu: "Nên lắng nghe lời khuyên chân thành của người lớn tuổi và bạn đời, sống từ tâm ắt lộc tự đến."
    },
    28: {
      diem: 28, luong: 2, chi: 8, luongChiText: "2 Lượng 8 Chỉ",
      phanCap: "Bình Cách - Cần Cù Khởi Nghiệp",
      thoHanViet: "Nhất sinh hành sự tợ phiêu bồng,\nTổ nghiệp vô thừa tự lập công.\nTrung vận khai hoa kết quả thực,\nLão niên y thực mãn gia phong.",
      dichTho: "Cuộc đời chiếc bóng tựa phiêu bồng,\nTổ nghiệp không nương tự lập công.\nTrung vận trổ hoa sinh trái ngọt,\nTuổi già no ấm phước mênh mông.",
      tongQuan: "Người này lúc trẻ hay phải di chuyển, công việc thay đổi liên tục, nhưng nhờ tính chịu khó và ham học hỏi nên tích lũy được nhiều kinh nghiệm quý.",
      congDanh: "Từ ngoài 40 tuổi làm ăn đại thịnh, tích lũy được khối tài sản đáng kể, được xóm giềng nể trọng.",
      giaDao: "Vợ chồng chung thủy sắc son, trải qua hoạn nạn càng thêm yêu thương gắn kết.",
      khuyenTu: "Tu tâm dưỡng tính, giữ gìn sức khỏe, thành tâm lễ bái gia tiên, tích đức cho con cháu."
    },
    29: {
      diem: 29, luong: 2, chi: 9, luongChiText: "2 Lượng 9 Chỉ",
      phanCap: "Bình Cách - Khổ Tận Cam Lai",
      thoHanViet: "Sơ niên vận khí trệ nan khai,\nLao toái tâm thần uổng thiết bài.\nHốt kiến xuân phong xuy vạn lý,\nKim môn bái đắc lộc trùng lai.",
      dichTho: "Đầu đời vận khí bế chưa thông,\nUổng phí tâm tư mộng chẳng tròn.\nBỗng ngọn gió xuân bay vạn dặm,\nCửa vàng rạng rỡ bổng lộc dồn.",
      tongQuan: "Mệnh chủ buổi sơ niên có nhiều dự tính nhưng khó thành, tâm tư trăn trở. Nhưng một khi thời vận đến như gió đông thổi tan băng tuyết, phất lên mạnh mẽ.",
      congDanh: "Gặp thời vận lớn vào khoảng tuổi 38 - 45, sự nghiệp phát triển vượt bậc, tiền bạc dồi dào.",
      giaDao: "Tình duyên ban đầu có chút muộn màng nhưng về sau rất viên mãn hạnh phúc.",
      khuyenTu: "Gặp thời chớ kiêu căng tự mãn, nên san sẻ phúc lộc cho người nghèo khó để giữ phúc dài lâu."
    },
    30: {
      diem: 30, luong: 3, chi: 0, luongChiText: "3 Lượng 0 Chỉ",
      phanCap: "Trung Cách - Tự Tay Lập Nghiệp",
      thoHanViet: "Lao lao lục lục tận phù sinh,\nBất đắc công danh uổng tận tình.\nKinh quá phong ba thành đại nghiệp,\nThân an gia đạo hỉ trùng sinh.",
      dichTho: "Lặn lội bôn ba một kiếp người,\nĐừng buồn thất bại thuở đôi mươi.\nVượt qua sóng gió nên cơ nghiệp,\nNhà cửa yên vui rộn tiếng cười.",
      tongQuan: "Mệnh 3 lượng chẵn có bản lĩnh kiên cường, dám nghĩ dám làm, không ngại gian khó, là trụ cột vững chắc của gia đình.",
      congDanh: "Qua tuổi 35 bắt đầu gặt hái thành quả lớn trong công việc, tiền bạc vào nhà như nước, sự nghiệp vững vàng.",
      giaDao: "Gia đình thuận hòa, con cháu thảo hiền, trong ấm ngoài êm.",
      khuyenTu: "Sống ngay thẳng chính trực, giúp đỡ kẻ yếu thế, năng cúng dường tam bảo để phúc khí dồi dào."
    },
    31: {
      diem: 31, luong: 3, chi: 1, luongChiText: "3 Lượng 1 Chỉ",
      phanCap: "Trung Cách - Hậu Vận Hưng Thịnh",
      thoHanViet: "Bôn ba lao lực tận phù hoa,\nBạch thủ thành danh tiệm hiển hoa.\nTrung niên hậu đắc phong vân hội,\nPhú quý vinh hoa lộc mãn gia.",
      dichTho: "Bôn ba vất vả giữa trần ai,\nTay trắng làm nên dạ có tài.\nTrung vận gặp thời như rồng lướt,\nVinh hoa phú quý rực tương lai.",
      tongQuan: "Số người thông minh tháo vát, có tài năng ứng biến linh hoạt. Tiền vận tuy có nhọc nhằn nhưng trung hậu vận cực kỳ hưng thịnh.",
      congDanh: "Kinh doanh buôn bán hay theo nghiệp công danh đều thuận lợi sau tuổi 36, có của chìm của nổi.",
      giaDao: "Phu thê hòa thuận, con cái thông minh giỏi giang, gia môn phát đạt.",
      khuyenTu: "Giữ tâm thanh tịnh, chớ mưu mô trục lợi, thường xuyên hành thiện tích phúc."
    },
    32: {
      diem: 32, luong: 3, chi: 2, luongChiText: "3 Lượng 2 Chỉ",
      phanCap: "Trung Cách - Khổ Trước Sướng Sau",
      thoHanViet: "Sơ niên vận hạn uổng tâm cơ,\nCơ nghiệp thành trì vị tất kỳ.\nĐáo đắc trung niên xuân tự chí,\nPhú quý vinh hoa hựu khả kỳ.",
      dichTho: "Tuổi trẻ mưu toan phí uổng công,\nCơ đồ dựng dở chửa tươi hồng.\nĐến tuổi trung niên xuân lại tới,\nVinh hoa phú quý thỏa ước mong.",
      tongQuan: "Tính cách kiên nhẫn, điềm đạm. Thuở trẻ có những giai đoạn lận đận nhưng nhờ tích lũy bền bỉ nên khi bước vào trung niên sẽ đổi đời ngoạn mục.",
      congDanh: "Từ tuổi 37 trở đi thời vận mở ra, buôn bán phát tài, công tác có sự thăng tiến vượt bậc.",
      giaDao: "Vợ chồng hòa hợp, hậu vận sống vui vầy cùng con cháu, thọ khang trường cửu.",
      khuyenTu: "Tâm thiện ắt chiêu cảm phúc lành, nên năng bố thí phóng sinh, báo hiếu tổ tiên."
    },
    33: {
      diem: 33, luong: 3, chi: 3, luongChiText: "3 Lượng 3 Chỉ",
      phanCap: "Trung Cách - Cần Kiệm Thành Tài",
      thoHanViet: "Tảo niên sự nghiệp cánh gian nan,\nNhẫn nại cần lao mạc thán hàn.\nTrung vận tự nhiên khai đắc lộ,\nKim ngân tài bảo biến chu toàn.",
      dichTho: "Buổi sớm gian truân lắm nỗi hàn,\nCần cù nhẫn nại chớ than van.\nTrung niên trời mở con đường sáng,\nTài lộc đầy nhà bước chứa chan.",
      tongQuan: "Mệnh cách cần kiệm, tháo vát, làm ăn chắc chắn từng bước một. Không thích mạo hiểm nhưng rất có tầm nhìn xa trông rộng.",
      congDanh: "Tích lũy tài sản đều đặn, trung niên có nhà đất khang trang, kinh tế gia đình sung túc, không bao giờ phải chịu cảnh túng thiếu.",
      giaDao: "Gia đình nề nếp gia phong, con cái ngoan ngoãn có học thức.",
      khuyenTu: "Rộng mở lòng từ bi, chớ quá chi li tính toán, chia sẻ lộc trời ban cho cộng đồng."
    },
    34: {
      diem: 34, luong: 3, chi: 4, luongChiText: "3 Lượng 4 Chỉ",
      phanCap: "Trung Cách - Quý Nhân Tương Trợ",
      thoHanViet: "Thử mệnh phúc khí phúc duyên đa,\nHành sự công danh chánh tự hòa.\nTrung niên hữu đắc quý nhân trợ,\nPhú quý vinh hoa mãn ốc gia.",
      dichTho: "Số mệnh duyên may sẵn có thừa,\nCông danh sự nghiệp thuận lòng đưa.\nTrung niên may gặp quý nhân giúp,\nPhú quý đầy nhà sướng biết phu.",
      tongQuan: "Người có số lượng 3 lượng 4 chỉ tính tình ôn hòa, nhân hậu, đi đến đâu cũng được bạn bè mến chuộng, ra đời gặp nhiều quý nhân giúp đỡ.",
      congDanh: "Công việc hanh thông, thích hợp làm trong cơ quan nhà nước hoặc quản lý, doanh thương. Tài chính dồi dào, hưng vượng.",
      giaDao: "Hôn nhân như ý, con cháu hiếu thảo, gia tộc vinh quang.",
      khuyenTu: "Đáp đền ơn nghĩa quý nhân, sống chân thành khiêm tốn để giữ vững phước báo."
    },
    35: {
      diem: 35, luong: 3, chi: 5, luongChiText: "3 Lượng 5 Chỉ",
      phanCap: "Trung Cát - An Cư Lạc Nghiệp",
      thoHanViet: "Bình sinh phúc lộc tự an tường,\nHành thiện tích đức phúc tự trường.\nTổ nghiệp tuy vô tân nghiệp chấn,\nMôn đình hưng vượng chiếu quang mang.",
      dichTho: "Cả đời phúc lộc thảy an vui,\nTích đức làm nhân họa đẩy lùi.\nTổ nghiệp không dày tân nghiệp thịnh,\nCửa nhà rạng rỡ tỏa ngát mùi.",
      tongQuan: "Mệnh chủ sống đời an nhiên, tâm tính lương thiện, ít khi phải chịu đại nạn. Cuộc đời bình lặng mà ấm no hạnh phúc.",
      congDanh: "Công danh tài vận mức khá giả, không cần lao tâm khổ tứ quá nhiều mà lộc ăn lộc mặc luôn sung túc đầy đủ.",
      giaDao: "Vợ chồng đồng lòng, con cái thành đạt, gia đình sum vầy hạnh phúc.",
      khuyenTu: "Giữ tâm trong sạch, siêng năng làm việc thiện, nuôi dưỡng tâm đức cho muôn đời sau."
    },
    36: {
      diem: 36, luong: 3, chi: 6, luongChiText: "3 Lượng 6 Chỉ",
      phanCap: "Trung Cát - Danh Lợi Song Thu",
      thoHanViet: "Siêu quần xuất chúng hiển tài hoa,\nBạch thủ thành gia định bất ngoa.\nTrung vận tòng tâm toàn toại ý,\nKim ngân bảo ngọc mãn đình hoa.",
      dichTho: "Xuất chúng tài hoa rạng ánh ngời,\nTay không dựng nghiệp giữa đất trời.\nTrung niên mọi sự đều như ý,\nVàng ngọc đầy nhà dạ thảnh thơi.",
      tongQuan: "Là người có trí tuệ mẫn tiệp, thông minh sáng suốt, có tài lãnh đạo và tổ chức. Tự mình tạo dựng nên cơ đồ rực rỡ.",
      congDanh: "Đường công danh sáng lạn, kinh doanh đắc lợi, có tầm ảnh hưởng lớn trong xã hội hoặc ngành nghề mình theo đuổi.",
      giaDao: "Gia đạo hiển vinh, con cái đỗ đạt thành tài, rạng danh dòng họ.",
      khuyenTu: "Dùng tài năng và quyền uy để giúp đời cứu người, tránh xa kiêu mạn thị phi."
    },
    37: {
      diem: 37, luong: 3, chi: 7, luongChiText: "3 Lượng 7 Chỉ",
      phanCap: "Trung Cát - Trí Dũng Song Toàn",
      thoHanViet: "Thử mệnh suy lai đại bất đồng,\nBất tu tài lộc khổ tâm trung.\nXuân phong hốt đắc phong vân hội,\nNhất nhật công thành xưng hào hùng.",
      dichTho: "Số này suy xét khác người thường,\nTài lộc chẳng cần nhọc nỗi thương.\nNgọn gió xuân về rồng gặp hội,\nMột mai danh toại rạng muôn phương.",
      tongQuan: "Cốt cách phi phàm, nhìn xa trông rộng, có ý chí quật cường. Gặp thời vận thuận lợi sẽ làm nên nghiệp lớn lẫy lừng.",
      congDanh: "Tiền vận có thử thách nhưng đều vượt qua vẻ vang. Trung niên đại phát, tiền bạc của cải nhiều vô số kể.",
      giaDao: "Hôn nhân hạnh phúc, bạn đời sắc sảo đắc lực, con cái thành danh.",
      khuyenTu: "Tâm rộng lượng thì phúc trạch sâu, nên tích cực làm từ thiện trợ duyên cho người khốn khó."
    },
    38: {
      diem: 38, luong: 3, chi: 8, luongChiText: "3 Lượng 8 Chỉ",
      phanCap: "Thượng Cách - Thanh Cao Quý Phái",
      thoHanViet: "Nhất thân cốt cách tú tài ba,\nBạch thủ thành gia định hữu hoa.\nTrung vận tiệm giai toàn toại ý,\nVinh hoa phú quý lạc an hòa.",
      dichTho: "Cốt cách thanh cao vẹn sắc tài,\nTay không gầy dựng sự nghiệp dài.\nTrung niên như ý vinh hoa đến,\nPhú quý êm đềm sáng sớm mai.",
      tongQuan: "Mệnh cách thanh cao, có học thức và phong thái quý phái. Làm việc gì cũng được mọi người tôn trọng và ủng hộ.",
      congDanh: "Sự nghiệp thăng tiến như diều gặp gió, tài lộc dồi dào, có danh vọng và uy tín cao trong xã hội.",
      giaDao: "Gia đình mẫu mực, hòa thuận ấm êm, hưởng phúc an nhàn cùng con cháu.",
      khuyenTu: "Giữ tâm thanh tịnh, chớ màng danh lợi hư ảo, luôn nhớ ơn người đi trước."
    },
    39: {
      diem: 39, luong: 3, chi: 9, luongChiText: "3 Lượng 9 Chỉ",
      phanCap: "Thượng Cách - Vinh Hoa Đắc Lợi",
      thoHanViet: "Mệnh trung hữu phúc tự nhiên lai,\nCơ nghiệp trùng hưng đại triển tài.\nĐáo đắc trung niên xuân tự chí,\nKim môn bái đắc lộc trùng khai.",
      dichTho: "Số sẵn phúc ban tự đến nơi,\nCơ đồ trùng khởi rạng đất trời.\nTrung niên đón bước xuân hoa nở,\nCửa gấm mừng vui lộc ngút ngơi.",
      tongQuan: "Số mệnh hưởng phúc lộc trời ban, cuộc đời hanh thông, gặp hung hóa cát, quý nhân kề cận phù trợ.",
      congDanh: "Làm ăn đại phát, tiền vào như nước, tài chính dư dả, danh tiếng lẫy lừng khắp chốn.",
      giaDao: "Phu thê hòa hợp son sắt, con cái thông tuệ hiếu thảo, gia môn rực rỡ.",
      khuyenTu: "Phúc lộc càng nhiều càng nên cẩn trọng, tích đức phóng sinh để phúc trạch lưu truyền muôn đời."
    },
    40: {
      diem: 40, luong: 4, chi: 0, luongChiText: "4 Lượng 0 Chỉ",
      phanCap: "Thượng Cát - Phú Quý Tự Nhiên",
      thoHanViet: "Bình sinh y lộc tự nhiên lai,\nDanh lợi kiêm toàn triển đại tài.\nTổ nghiệp môn đình hưng thịnh vượng,\nVinh hoa phú quý tại thiên đài.",
      dichTho: "Cả đời cơm áo lộc trời cho,\nDanh lợi song toàn chẳng phải lo.\nTổ nghiệp cửa nhà thêm thịnh vượng,\nVinh hoa phú quý tựa thuyền to.",
      tongQuan: "Mệnh 4 lượng chẵn là số đại cát, sinh ra mang phúc tướng, cuộc sống từ nhỏ đến lớn hiếm khi gặp cảnh túng quẫn, mọi sự hanh thông.",
      congDanh: "Công việc thuận buồm xuôi gió, quan vận hanh thông, kinh doanh phát đạt, của cải đầy kho.",
      giaDao: "Gia đình thịnh vượng, con cháu nối dõi tông đường hiển vinh, phúc ấm tràn trề.",
      khuyenTu: "Nên năng làm việc thiện, mở lòng từ bi cứu giúp người nghèo khó để phúc đức dày sâu vững chãi."
    },
    41: {
      diem: 41, luong: 4, chi: 1, luongChiText: "4 Lượng 1 Chỉ",
      phanCap: "Thượng Cát - Thông Minh Quý Hiển",
      thoHanViet: "Thử mệnh suy lai sự sự thông,\nThông minh đĩnh ngộ hiển tôn dung.\nTrung niên vinh hiển gia thanh chấn,\nBất phước vinh hoa lạc thái bình.",
      dichTho: "Mệnh này suy xét vạn sự thông,\nSáng suốt thông minh tướng mạo rồng.\nTrung vận hiển vinh gia thế rạng,\nHưởng trọn an vui phúc trạch nồng.",
      tongQuan: "Là người tài trí hơn người, có tài hùng biện, giao tiếp xuất sắc và mưu lược sâu rộng. Được người đời kính trọng mến phục.",
      congDanh: "Làm quan thì thăng tiến thần tốc, làm kinh doanh thì dẫn đầu thương trường, tài lộc cuồn cuộn đổ về.",
      giaDao: "Gia môn thịnh vượng, môn đăng hộ đối, con cháu thành tài đỗ đạt.",
      khuyenTu: "Tránh xa tự phụ, luôn giữ tâm khiêm cung và trọng dụng người hiền."
    },
    42: {
      diem: 42, luong: 4, chi: 2, luongChiText: "4 Lượng 2 Chỉ",
      phanCap: "Thượng Cát - Phú Quý Khang Ninh",
      thoHanViet: "Bình sinh cốt cách đoan chính thần,\nTriêu dã công danh đắc tứ thân.\nPhú quý vinh hoa chung hữu đắc,\nAn khang trường thọ hưởng thiên ân.",
      dichTho: "Cốt cách bình sinh rất đoan trang,\nCông danh rạng rỡ bước đàng hoàng.\nVinh hoa phú quý tay cầm chắc,\nTrường thọ an khang hưởng phúc vàng.",
      tongQuan: "Người này cốt cách đoan chính, tâm địa thiện lương, phúc tướng rõ ràng. Cả đời an vui, ít bệnh tật tai ương.",
      congDanh: "Sự nghiệp hanh thông bền vững, tài lộc dồi dào, có danh tiếng và uy vọng lớn trong cộng đồng.",
      giaDao: "Vợ chồng hòa thuận son sắt đến đầu bạc răng long, con cháu đông đúc hiếu thảo.",
      khuyenTu: "Tích cực ấn tống kinh sách, làm cầu đắp đường, gieo mầm phúc thiện cho hậu thế."
    },
    43: {
      diem: 43, luong: 4, chi: 3, luongChiText: "4 Lượng 3 Chỉ",
      phanCap: "Quý Cách - Đại Phát Đại Tài",
      thoHanViet: "Trí mưu thông đạt mạc vi sầu,\nQuan vận hanh thông đắc thượng lưu.\nPhú quý song toàn thiên sở phú,\nKim ngọc mãn đường vĩnh bất hưu.",
      dichTho: "Trí tuệ mưu toan chớ bận sầu,\nCông danh hiển đạt bậc quyền cao.\nTrời ban phú quý song toàn vẹn,\nVàng ngọc đầy nhà mãi dạt dào.",
      tongQuan: "Mệnh mang cốt cách lãnh đạo, có tài trị quốc an dân hoặc điều hành doanh nghiệp lớn. Số mệnh rực rỡ hiếm ai sánh kịp.",
      congDanh: "Nắm giữ chức vụ trọng trách hoặc sở hữu cơ ngơi kinh doanh đồ sộ, tài chính hùng mạnh, tiền của muôn phần.",
      giaDao: "Gia đình hưng vượng, danh giá nức tiếng gần xa, hậu thế vẻ vang.",
      khuyenTu: "Lấy đức thu phục lòng người, tạo nhiều công ăn việc làm giúp ích cho xã hội."
    },
    44: {
      diem: 44, luong: 4, chi: 4, luongChiText: "4 Lượng 4 Chỉ",
      phanCap: "Quý Cách - Vạn Sự Hanh Thông",
      thoHanViet: "Vạn sự hanh thông hữu lộc lâm,\nBất tu lao lực uổng tâm thần.\nKim môn bái đắc thiên ban lộc,\nPhú quý vinh hoa hưởng cửu tân.",
      dichTho: "Vạn sự hanh thông đón lộc trời,\nChẳng cần lao lực nhọc lòng vơi.\nCửa son bổng lộc tràn muôn lối,\nPhú quý vinh hoa trọn kiếp đời.",
      tongQuan: "Số mệnh đại cát đại lợi, làm việc gì cũng dễ dàng đạt được thành công như ý, trời đất trợ duyên, quý nhân nâng đỡ.",
      congDanh: "Đường quan lộ rộng mở thênh thang, kinh doanh đại phát, lộc tài tích tụ không ngừng nghỉ.",
      giaDao: "Phu thê mặn nồng hạnh phúc, con cái phương trưởng, gia đạo ấm êm viên mãn.",
      khuyenTu: "Giữ tâm thanh liêm, chớ lãng phí của trời cho, tích cực hành thiện giúp đời."
    },
    45: {
      diem: 45, luong: 4, chi: 5, luongChiText: "4 Lượng 5 Chỉ",
      phanCap: "Quý Cách - Vinh Hoa Phú Quý",
      thoHanViet: "Danh lợi kiêm toàn hiển tổ tông,\nQuang huy môn hộ thịnh gia phong.\nThiên ân tứ đắc vinh hoa lộc,\nNhất thế an nhàn đại quý tôn.",
      dichTho: "Danh lợi song toàn rạng tổ tông,\nCửa nhà sáng chói ánh huy hoàng.\nTrời ban phúc lộc vinh hoa nở,\nMột kiếp an nhàn bậc quý tôn.",
      tongQuan: "Mệnh số hưởng phúc ấm tổ tiên to lớn, sinh ra có tướng quý, một đời hiển hách, làm rạng danh dòng tộc.",
      congDanh: "Sự nghiệp thăng hoa tuyệt đỉnh, tài vận hanh thông, của cải phong phú, địa vị vững như bàn thạch.",
      giaDao: "Gia tộc danh giá, con cái thành danh đỗ đạt, gia đạo vinh hiển đời đời.",
      khuyenTu: "Nhớ nguồn cội tổ tiên, siêng tu nhân tích đức, giúp đỡ họ hàng làng xóm."
    },
    46: {
      diem: 46, luong: 4, chi: 6, luongChiText: "4 Lượng 6 Chỉ",
      phanCap: "Quý Cách - Phúc Lộc Trường Cửu",
      thoHanViet: "Cốt cách thanh cao phú quý vinh,\nThiên giáng cát tường phúc lộc sinh.\nNhất sinh vô hoạn hoàn vô họa,\nTrường thọ an khang bách sự ninh.",
      dichTho: "Cốt cách thanh cao phú quý ròng,\nTrời ban cát khánh phúc khôn cùng.\nMột đời tai ách đều tan biến,\nTrường thọ an khang sự sự thông.",
      tongQuan: "Người có số lượng 4 lượng 6 chỉ cả đời sống trong nhung lụa bình an, tránh xa mọi tai ương hoạn nạn, thân tâm thanh thản an nhiên.",
      congDanh: "Tài lộc dồi dào, tiền bạc tự tìm đến, công việc làm ăn lúc nào cũng thuận lợi suôn sẻ.",
      giaDao: "Gia đình đầm ấm hạnh phúc, con cháu đông đúc sum vầy, hưởng trọn chữ Phúc - Lộc - Thọ.",
      khuyenTu: "Mệnh đã vẹn toàn, càng cần nuôi dưỡng lòng từ bi, phóng sinh tụ phước."
    },
    47: {
      diem: 47, luong: 4, chi: 7, luongChiText: "4 Lượng 7 Chỉ",
      phanCap: "Quý Cách - Đại Phú Đại Quý",
      thoHanViet: "Thử mệnh suy lai đại cát xương,\nBất tu sầu lự tự an khang.\nKim ngân bảo ngọc vô cùng tận,\nHiển hách môn đình vạn lý hương.",
      dichTho: "Mệnh này suy xét đại cát tường,\nChẳng phải âu lo bước dặm trường.\nVàng ngọc của tiền không xiết kể,\nCửa nhà danh tiếng rạng muôn phương.",
      tongQuan: "Là số mệnh của bậc cự phú hoặc quan chức quyền cao chức trọng. Tiếng thơm vang xa, của cải dồi dào chất chứa đầy nhà.",
      congDanh: "Kinh doanh phát tài vang dội, công danh sự nghiệp hiển hách tột đỉnh, có uy tín và sức ảnh hưởng lớn.",
      giaDao: "Gia môn thịnh vượng, con cái xuất chúng, nối nghiệp rạng danh cơ đồ.",
      khuyenTu: "Lấy của cải làm phương tiện giúp ích nhân gian, tích âm đức cho con cháu ngàn đời."
    },
    48: {
      diem: 48, luong: 4, chi: 8, luongChiText: "4 Lượng 8 Chỉ",
      phanCap: "Cực Quý - Danh Tiếng Lẫy Lừng",
      thoHanViet: "Sơ niên vận khí dĩ phi phàm,\nTrung vận vinh hoa hiển tổ tông.\nQuan lộ cao thăng thiên sở tứ,\nKim chương ngọc đới thế gian tôn.",
      dichTho: "Thuở trẻ thời vận đã phi phàm,\nTrung niên hiển hách rạng vinh quang.\nĐường quan cao vút trời ban thưởng,\nÁo gấm đai vàng nức tiếng vang.",
      tongQuan: "Số mệnh quý cách phi thường, tài năng xuất chúng, cốt cách uy nghi, sinh ra đã mang sứ mệnh làm nên những điều to lớn.",
      congDanh: "Đường công danh rực rỡ chói lòa, tài lộc dồi dào như suối nguồn, danh vọng lẫy lừng thiên hạ.",
      giaDao: "Hôn nhân môn đăng hộ đối, con cháu đỗ đạt làm rạng danh tiên tổ.",
      khuyenTu: "Giữ tâm thanh liêm, chánh trực, phụng sự nhân dân, tích phúc vô lượng."
    },
    49: {
      diem: 49, luong: 4, chi: 9, luongChiText: "4 Lượng 9 Chỉ",
      phanCap: "Cực Quý - Phúc Đức Vô Biên",
      thoHanViet: "Thử mệnh phúc khí thế gian hi,\nPhú quý vinh hoa tự hữu thì.\nNhất thế phong lưu y thực túc,\nCao môn hiển hách định vô nghi.",
      dichTho: "Phúc khí mệnh này thế gian hiếm,\nVinh hoa phú quý sẵn duyên kiềm.\nMột đời phong lưu cơm áo đủ,\nCửa cao danh giá rạng ngày đêm.",
      tongQuan: "Là số mệnh hiếm có trên đời, phước đức sâu dày tựa biển cả, một đời an nhàn sung túc, phong lưu tiêu sái.",
      congDanh: "Tiền tài danh vọng song toàn, làm ăn phát đạt, không cần nhọc nhằn mà tài lộc vẫn tự nhiên tìm đến.",
      giaDao: "Gia đình hạnh phúc viên mãn, con cháu đầy đàn thông minh tuấn tú.",
      khuyenTu: "Tâm thiện tích đức, giữ gìn truyền thống gia phong, giúp đỡ muôn dân."
    },
    50: {
      diem: 50, luong: 5, chi: 0, luongChiText: "5 Lượng 0 Chỉ",
      phanCap: "Cực Phẩm - Đại Phú Đại Cát",
      thoHanViet: "Vi nhân thanh cao hiển tài hoa,\nBạch thủ thành gia định hữu hoa.\nTrung vận phú quý giai toại ý,\nLão niên y thực mãn gia phong.",
      dichTho: "Người ở cõi trần rạng sắc hoa,\nTay không gây dựng nghiệp sơn hà.\nTrung niên phú quý như lòng ước,\nTuổi thọ an khang lộc chứa chan.",
      tongQuan: "Mệnh 5 lượng chẵn là bậc kỳ tài, phong độ đĩnh đạc, có tài mưu lược kinh bang tế thế, được muôn người kính trọng.",
      congDanh: "Sự nghiệp thăng hoa rực rỡ, tài lộc dồi dào, uy vọng vang dội khắp bốn phương trời.",
      giaDao: "Gia đạo hiển vinh, con cháu hiếu thảo, gia tộc đời đời hưng thịnh.",
      khuyenTu: "Thường xuyên hành thiện tích phúc, bảo tồn danh tiếng thanh bạch cho con cháu mai sau."
    },
    51: {
      diem: 51, luong: 5, chi: 1, luongChiText: "5 Lượng 1 Chỉ",
      phanCap: "Cực Phẩm - Quan Lộc Hiển Hách",
      thoHanViet: "Nhất sinh quan lộc hiển môn đình,\nPhúc trạch thâm thâm bách sự ninh.\nPhú quý song toàn thiên ân tứ,\nTrường thọ khang ninh thế thượng vinh.",
      dichTho: "Quan lộc một đời rạng cửa nhà,\nPhúc trạch sâu dày dẹp can qua.\nTrời ban phú quý song toàn vẹn,\nTrường thọ an khang rạng muôn hoa.",
      tongQuan: "Mệnh mang cốt cách đại quý, hưởng trọn ân huệ của trời đất, danh vọng tài lộc vẹn toàn, sống đời viên mãn trường thọ.",
      congDanh: "Nắm giữ quyền cao chức trọng, uy danh hiển hách, tài vận dồi dào không bao giờ suy suyển.",
      giaDao: "Gia đình danh giá, con cháu đỗ đạt làm quan hoặc doanh nhân thành đạt.",
      khuyenTu: "Lấy lòng nhân từ đối đãi muôn người, tích công bồi đức để phúc báo trường tồn."
    },
    52: {
      diem: 52, luong: 5, chi: 2, luongChiText: "5 Lượng 2 Chỉ",
      phanCap: "Cực Phẩm - Thiên Tứ Phúc Lộc",
      thoHanViet: "Nhất sinh phúc lộc tự nhiên lai,\nCơ nghiệp trùng hưng đại triển tài.\nKim môn bái đắc vinh hoa lộc,\nPhú quý an nhàn thế thượng giai.",
      dichTho: "Cả đời phúc lộc tự nhiên vào,\nCơ nghiệp vươn mình thế vút cao.\nCửa gấm đón mừng bao lộc quý,\nAn nhàn phú quý đẹp dường bao.",
      tongQuan: "Số mệnh đại phú quý, trời ban phước lộc, sinh ra đã mang mệnh vinh hiển, cuộc đời sung túc thảnh thơi.",
      congDanh: "Kinh doanh đắc tài, công danh đắc lộc, tiền tài tích lũy to lớn, địa vị xã hội cao quý.",
      giaDao: "Hôn nhân mỹ mãn, gia đạo thịnh vượng, con cái nối nghiệp vẻ vang.",
      khuyenTu: "Sống khiêm nhường, đem của cải giúp ích cho xã hội, tu dưỡng đạo đức thanh cao."
    },
    53: {
      diem: 53, luong: 5, chi: 3, luongChiText: "5 Lượng 3 Chỉ",
      phanCap: "Chí Tôn - Cơ Nghiệp Trường Tồn",
      thoHanViet: "Thử mệnh suy lai đại bất phàm,\nCơ nghiệp trùng hưng vạn lý san.\nThiên ân tứ đắc chân phú quý,\nQuang diệu môn đình thế thế truyền.",
      dichTho: "Mệnh này suy xét bậc phi phàm,\nCơ nghiệp muôn đời đứng vững an.\nTrời tặng ân sâu chân phú quý,\nRạng danh môn hộ vạn niên khang.",
      tongQuan: "Là mệnh cách của bậc vương giả hoặc danh gia vọng tộc lớn, cơ nghiệp đồ sộ truyền đời cho con cháu muôn đời.",
      congDanh: "Công thành danh toại, tài lộc như biển đông, nắm trong tay quyền thế và của cải khổng lồ.",
      giaDao: "Gia tộc danh giá tột bậc, con cháu nối tiếp truyền thống hiển vinh.",
      khuyenTu: "Dạy bảo con cháu giữ gìn gia phong đạo đức, lấy đức làm gốc rễ cho sự hưng thịnh."
    },
    54: {
      diem: 54, luong: 5, chi: 4, luongChiText: "5 Lượng 4 Chỉ",
      phanCap: "Chí Tôn - Phúc Thọ Miên Trường",
      thoHanViet: "Thử mệnh thanh cao tài trí đa,\nBình sinh sự sự định vô ngoa.\nKim môn bái đắc thiên ban lộc,\nPhúc thọ song toàn thế thế hoa.",
      dichTho: "Thanh cao tài trí dạ phi phàm,\nSự nghiệp bền lâu vững chắc an.\nCửa son bổng lộc trời ban tặng,\nPhúc thọ song toàn nở cánh hoa.",
      tongQuan: "Người có tài đức vẹn toàn, trí tuệ trác tuyệt, tâm hồn cao thượng. Vừa giàu sang phú quý lại vừa trường thọ an vui.",
      congDanh: "Quan lộ rạng ngời, sự nghiệp kiệt xuất, của cải dồi dào, được lưu danh sử sách.",
      giaDao: "Gia đình thuận hòa, con cháu thảo hiền, phúc ấm tràn ngập gia môn.",
      khuyenTu: "Tâm thanh tịnh, hành thiện không ngừng, giúp đỡ bá tánh dân lành."
    },
    55: {
      diem: 55, luong: 5, chi: 5, luongChiText: "5 Lượng 5 Chỉ",
      phanCap: "Chí Tôn - Phú Quý Vô Song",
      thoHanViet: "Thử mệnh phi phàm phú quý xương,\nXuất nhập bình an tứ quý hương.\nThiên ân chiếu giám gia môn thịnh,\nTrường thọ vinh hoa vạn thế trường.",
      dichTho: "Mệnh số phi phàm phú quý thay,\nVào ra bốn bể phúc đong đầy.\nTrời cao chiếu rọi nhà hưng thịnh,\nTrường thọ vinh hoa ngát cội cây.",
      tongQuan: "Số mệnh cực kỳ phú quý, ra ngoài có quý nhân tiền hô hậu ủng, vào nhà có tiền tài lộc biếu đầy kho, cuộc sống an nhiên tự tại.",
      congDanh: "Đại phú đại quý, tiếng tăm lừng lẫy khắp cõi, tài sản vô lượng.",
      giaDao: "Phu thê hòa hợp, gia phong lễ giáo, con cái hiển đạt thành tài.",
      khuyenTu: "Rộng mở lòng từ bi bác ái, bảo bọc chở che kẻ yếu để phúc trạch đời đời."
    },
    56: {
      diem: 56, luong: 5, chi: 6, luongChiText: "5 Lượng 6 Chỉ",
      phanCap: "Chí Tôn - Danh Chấn Thiên Hạ",
      thoHanViet: "Nhất sinh phúc lộc bái kim môn,\nTài mạo song toàn thế thượng tôn.\nCông danh hiển hách thanh danh chấn,\nPhú quý vinh hoa hưởng cửu tân.",
      dichTho: "Một đời phúc lộc đón cửa vàng,\nTài mạo song toàn nức tiếng vang.\nCông danh hiển hách lừng danh tiếng,\nPhú quý vinh hoa rạng xóm làng.",
      tongQuan: "Là nhân tài xuất chúng trong thiên hạ, tài mạo song toàn, uy danh vang dội khắp bốn bể năm châu.",
      congDanh: "Sự nghiệp lừng lẫy, tài lộc dồi dào khôn xiết, nắm giữ chức quyền trọng yếu hoặc làm chủ cơ đồ to lớn.",
      giaDao: "Gia tộc hiển vinh, con cháu đều là rồng phượng giữa đời.",
      khuyenTu: "Giữ tâm khiêm nhường, đem ánh sáng tri thức và lòng từ bi giúp đời."
    },
    57: {
      diem: 57, luong: 5, chi: 7, luongChiText: "5 Lượng 7 Chỉ",
      phanCap: "Thần Cách - Phúc Lộc Tự Nhiên",
      thoHanViet: "Phúc lộc thiên ban định dữ quân,\nBất tu lao khổ uổng tâm thần.\nNhất sinh thanh quý tiêu dao khách,\nKim ngọc mãn đường vĩnh bất bần.",
      dichTho: "Phúc lộc trời ban đã định phần,\nChẳng cần nhọc mệt phí tâm thần.\nMột đời thanh quý tiêu dao bước,\nVàng ngọc đầy nhà mãi chẳng bần.",
      tongQuan: "Cốt cách như thần tiên giáng thế, thanh cao tao nhã, không màng tranh đoạt mà phúc lộc vẫn tự nhiên đổ về đầy nhà.",
      congDanh: "Tài vận hưng thịnh, cuộc đời thong dong tự tại, muốn gì được nấy, an nhàn tột bực.",
      giaDao: "Gia đình ấm êm, hưởng trọn niềm vui thi phú điền viên cùng con cháu.",
      khuyenTu: "Tu tâm dưỡng tính, thuận theo lẽ trời, giúp người nghèo khó tích thêm thiện duyên."
    },
    58: {
      diem: 58, luong: 5, chi: 8, luongChiText: "5 Lượng 8 Chỉ",
      phanCap: "Đại Quý - Quan Lộc Đỉnh Cao",
      thoHanViet: "Mệnh đắc thiên ân hiển quý nhân,\nQuan cao lộc trọng bách tính thân.\nCông danh đại hiển gia thanh chấn,\nPhúc thọ song toàn thế thế xuân.",
      dichTho: "Mệnh hưởng trời ban bậc quý nhân,\nQuan cao bổng trọng giúp nhân dân.\nCông danh hiển hách gia môn rạng,\nPhúc thọ song toàn rực rỡ xuân.",
      tongQuan: "Là người sinh ra mang số làm quan to chức lớn hoặc thủ lĩnh đầu ngành, uy quyền và đức độ song hành.",
      congDanh: "Vạn dặm công danh thênh thang rộng mở, tiền bạc của cải nhiều không kể xiết, người người kính nể.",
      giaDao: "Gia đình hưng vượng, con cái đỗ đạt vinh hiển, dòng họ thơm lây.",
      khuyenTu: "Lấy đức trị dân, công minh chính trực, giữ gìn phúc báo thiên ân."
    },
    59: {
      diem: 59, luong: 5, chi: 9, luongChiText: "5 Lượng 9 Chỉ",
      phanCap: "Đại Quý - Của Cải Tựa Núi Non",
      thoHanViet: "Cốt cách thanh cao phú quý trường,\nTài nguyên cổn cổn vĩnh nan đao.\nThiên giáng cát tường gia nghiệp chấn,\nVinh hoa phú quý ốc gia cao.",
      dichTho: "Cốt cách thanh cao phú quý tràn,\nTiền tài cuồn cuộn tựa non ngàn.\nTrời ban phúc đức cơ đồ thịnh,\nNhà cửa nguy nga rạng chứa chan.",
      tongQuan: "Mệnh số hưởng lộc trời ban dồi dào, tiền của như sóng trào dâng, kinh doanh buôn bán nắm giữ huyết mạch tài chính.",
      congDanh: "Đại phú hào giữa nhân gian, của cải tích lũy tựa non cao, sự nghiệp bền vững muôn đời.",
      giaDao: "Gia môn thịnh vượng, con cháu đời đời hưởng lộc giàu sang.",
      khuyenTu: "Lấy của cải cứu giúp đồng bào hoạn nạn, gieo duyên lành cứu vớt muôn người."
    },
    60: {
      diem: 60, luong: 6, chi: 0, luongChiText: "6 Lượng 0 Chỉ",
      phanCap: "Cực Phẩm - Quan Lộc Cực Đỉnh",
      thoHanViet: "Nhất thân cốt cách tú thiên đình,\nPhú quý vinh hoa bách sự ninh.\nQuan lộ cao thăng thiên sở tứ,\nKim chương ngọc đới thế gian vinh.",
      dichTho: "Cốt cách người này sáng góc trời,\nVinh hoa phú quý rạng muôn nơi.\nĐường quan cao vút trời ban thưởng,\nÁo gấm ngọc ngà đẹp kiếp đời.",
      tongQuan: "Mệnh 6 lượng chẵn là cực phẩm trong Cân Xương Đoán Số, cốt cách tú khí ngút trời, tài năng cái thế, sinh ra làm rạng danh đất nước.",
      congDanh: "Đứng đầu thiên hạ về công danh tài lộc, tiếng tăm lừng lẫy, quyền uy vô song.",
      giaDao: "Gia tộc danh giá tột đỉnh, phúc ấm sâu dày lưu truyền ngàn năm.",
      khuyenTu: "Tâm rộng lớn vì non sông đất nước, tích đại âm đức cho muôn dân bá tánh."
    },
    61: {
      diem: 61, luong: 6, chi: 1, luongChiText: "6 Lượng 1 Chỉ",
      phanCap: "Vương Giả - Danh Chấn Thiên Hạ",
      thoHanViet: "Thử mệnh suy lai đại bất phàm,\nCơ nghiệp trùng hưng hiển giang san.\nThiên ân chiếu giám chân phú quý,\nQuang diệu môn đình thế thế khang.",
      dichTho: "Mệnh này suy xét bậc phi phàm,\nCơ nghiệp trùng hưng rạng núi sông.\nTrời rọi ánh ân chân phú quý,\nCửa nhà rạng rỡ phúc mênh mông.",
      tongQuan: "Mệnh bậc vương hầu tướng soái, khí phách ngút trời, một lời nói vạn người nghe theo, phúc lộc dồi dào vô tận.",
      congDanh: "Công thành danh toại ở mức cao nhất của xã hội, tài lộc đầy kho, danh tiếng vang dội muôn phương.",
      giaDao: "Gia tộc rực rỡ, con cháu tài giỏi xuất chúng, nối nghiệp cha ông vẻ vang.",
      khuyenTu: "Dùng quyền thế và tài lực để phụng sự nhân gian, tạo phước đức muôn đời."
    },
    62: {
      diem: 62, luong: 6, chi: 2, luongChiText: "6 Lượng 2 Chỉ",
      phanCap: "Vương Giả - Phúc Như Hải Hà",
      thoHanViet: "Phúc lộc trùng trùng tự hải hà,\nCông danh hiển hách bách hoa khai.\nTrường thọ an khang thiên sở tứ,\nPhú quý vinh hoa hưởng cửu đài.",
      dichTho: "Phúc lộc trùng trùng tựa biển sâu,\nCông danh rạng rỡ thắm muôn màu.\nTrời ban trường thọ an khang mãi,\nPhú quý vinh hoa đứng bậc đầu.",
      tongQuan: "Số mệnh phúc trạch sâu rộng như biển cả, tài vận vững bền tựa núi thái sơn. Trọn đời hưởng vinh hoa an lạc.",
      congDanh: "Đại phú đại quý, làm nên những công trình vĩ đại, tài sản vô lượng vô biên.",
      giaDao: "Gia đình mẫu mực, con cháu hiếu đễ, nối dõi tông đường rực rỡ.",
      khuyenTu: "Phát tâm Bồ Đề, bảo bọc sinh linh, tạo dựng công đức vô lượng."
    },
    63: {
      diem: 63, luong: 6, chi: 3, luongChiText: "6 Lượng 3 Chỉ",
      phanCap: "Vương Giả - Cực Quý Chí Tôn",
      thoHanViet: "Mệnh đắc chí tôn thiên sở sinh,\nQuan cao lộc trọng bách sự thành.\nKim môn bái đắc thiên ban lộc,\nVạn lý giang san tiếu ngạo hành.",
      dichTho: "Mệnh bậc chí tôn hưởng lộc trời,\nQuan cao lộc trọng rạng muôn nơi.\nCửa vàng đón nhận muôn ơn phúc,\nVạn dặm non sông thỏa bước chơi.",
      tongQuan: "Là mệnh cách chí tôn hiếm thấy, nắm giữ chìa khóa thịnh vượng, cốt cách thanh tao thoát tục, vạn sự hanh thông.",
      congDanh: "Đứng trên đỉnh cao danh vọng và tài chính, một đời hiển hách quang vinh không ai sánh kịp.",
      giaDao: "Gia đạo hiển vinh, con cháu đều là rường cột quốc gia.",
      khuyenTu: "Lấy chữ Tâm và chữ Đức làm kim chỉ nam, phụng sự cuộc đời."
    },
    64: {
      diem: 64, luong: 6, chi: 4, luongChiText: "6 Lượng 4 Chỉ",
      phanCap: "Đế Vương Cách - Thiên Ân Tứ Phúc",
      thoHanViet: "Cốt cách uy nghiêm hiển triều đình,\nPhúc trạch sâu dày bách tính sinh.\nPhú quý vinh hoa chung hữu đắc,\nThọ tỷ Nam Sơn bách sự ninh.",
      dichTho: "Cốt cách uy nghiêm rạng triều đình,\nPhúc trạch sâu dày phúc muôn sinh.\nVinh hoa phú quý tay nắm chắc,\nThọ tỷ Nam Sơn rạng thái bình.",
      tongQuan: "Cốt cách uy nghiêm, phúc trạch sâu dày, tài năng mưu lược xuất chúng, được muôn người ngưỡng mộ tôn kính.",
      congDanh: "Công danh tột bực, tài lộc dồi dào, nắm giữ trọng trách lớn lao của thời đại.",
      giaDao: "Gia tộc danh thơm muôn thuở, con cháu phương trưởng hiển vinh.",
      khuyenTu: "Làm việc đại nghĩa, giúp đỡ muôn dân, tích lũy công đức vô cùng tận."
    },
    65: {
      diem: 65, luong: 6, chi: 5, luongChiText: "6 Lượng 5 Chỉ",
      phanCap: "Đế Vương Cách - Phú Quý Ngút Trời",
      thoHanViet: "Thiên giáng cát tường phúc lộc lai,\nCông danh cái thế đại triển tài.\nTrường thọ an khang vinh hiển lạc,\nKim môn bái tạ phước trùng khai.",
      dichTho: "Trời ban cát khánh phúc lộc sang,\nCông danh cái thế bước hiên ngang.\nTrường thọ an khang vui vinh hiển,\nCửa son bái tạ phúc huy hoàng.",
      tongQuan: "Mệnh mang phúc tướng của bậc đại trượng phu kiệt xuất, tài trí hơn đời, một đời sống trong vinh hoa phú quý tột cùng.",
      congDanh: "Sự nghiệp huy hoàng chói lọi, tài chính thịnh vượng vô lượng, địa vị tôn quý.",
      giaDao: "Gia đạo bình an, phúc thọ tràn trề, con cháu đỗ đạt thành tài.",
      khuyenTu: "Tâm hướng thiện lương, bố thí cúng dường, giữ gìn truyền thống hiếu thuận."
    },
    66: {
      diem: 66, luong: 6, chi: 6, luongChiText: "6 Lượng 6 Chỉ",
      phanCap: "Đế Vương Cách - Cực Phẩm Vinh Hoa",
      thoHanViet: "Nhất sinh phúc lộc tại thiên nhai,\nĐại phú đại quý định bất sai.\nKim chương ngọc đới quang môn hộ,\nVinh hoa vạn thế hiển thiên tài.",
      dichTho: "Phúc lộc một đời tựa chân mây,\nĐại phú đại quý sẵn đủ đầy.\nÁo ngọc đai vàng rạng cửa ngõ,\nVinh hoa muôn thuở hiển danh tài.",
      tongQuan: "Là số mệnh cực phẩm nhân gian, trời ban phước lộc vô biên, phú quý vinh hoa không gì sánh bằng.",
      congDanh: "Nắm giữ đỉnh cao quyền lực và tài sản, danh tiếng lưu truyền sử sách muôn đời sau.",
      giaDao: "Gia tộc vẻ vang, con cháu hiển vinh, muôn đời ấm êm thịnh vượng.",
      khuyenTu: "Thường xuyên làm việc phước đức, giúp đỡ kẻ cơ hàn, giữ lòng từ bi."
    },
    67: {
      diem: 67, luong: 6, chi: 7, luongChiText: "6 Lượng 7 Chỉ",
      phanCap: "Đế Vương Cách - Danh Lưu Thiên Cổ",
      thoHanViet: "Thử mệnh suy lai đại cát tường,\nCơ nghiệp môn đình vạn lý hương.\nKim ngân bảo ngọc vô cùng tận,\nHiển hách công danh chấn tứ phương.",
      dichTho: "Mệnh này suy xét đại cát tường,\nCơ nghiệp cửa nhà ngát ngát hương.\nVàng ngọc muôn vàn không kể xiết,\nCông danh hiển hách trấn muôn phương.",
      tongQuan: "Số mệnh bậc hiền tài cái thế, danh tiếng lưu truyền thiên cổ, phúc lộc thọ khảo đều đạt mức tối thượng.",
      congDanh: "Đứng đầu thiên hạ về tài năng và đức độ, sự nghiệp rực rỡ, tiền tài dồi dào khôn xiết.",
      giaDao: "Gia tộc danh giá bậc nhất, hậu duệ thành danh hiển đạt muôn đời.",
      khuyenTu: "Lấy đạo trị thân, lấy đức trị đời, gieo mầm phúc thiện cho muôn triệu chúng sinh."
    },
    68: {
      diem: 68, luong: 6, chi: 8, luongChiText: "6 Lượng 8 Chỉ",
      phanCap: "Đế Vương Cách - Uy Danh Hiển Hách",
      thoHanViet: "Cốt cách thanh cao phú quý vinh,\nThiên giáng cát khánh phúc lộc sinh.\nNhất sinh phong lưu khoái hoạt khách,\nKim ngọc mãn đường bách sự ninh.",
      dichTho: "Cốt cách thanh cao phú quý dày,\nTrời ban phúc lộc thắm từng ngày.\nMột đời khoái hoạt phong lưu bước,\nVàng ngọc đầy nhà dạ ngất ngây.",
      tongQuan: "Mệnh cách đế vương phi phàm, hưởng trọn thanh nhàn phú quý, không biết đến buồn lo sầu muộn.",
      congDanh: "Công thành danh toại đỉnh cao, của cải tựa non ngàn, người người ngưỡng vọng.",
      giaDao: "Gia đình viên mãn tột bậc, con cháu hiếu thảo, gia phong rực rỡ muôn thuở.",
      khuyenTu: "Dùng của cải và uy quyền làm nhiều việc thiện nguyện cứu đời giúp người."
    },
    69: {
      diem: 69, luong: 6, chi: 9, luongChiText: "6 Lượng 9 Chỉ",
      phanCap: "Chí Cao Vô Thượng - Hưởng Thiên Lộc",
      thoHanViet: "Mệnh trung hữu phúc bái kim đài,\nĐại phú đại quý định bất sai.\nThiên giáng ân thâm gia nghiệp chấn,\nTrường thọ vinh hoa hưởng cửu giai.",
      dichTho: "Số sẵn phúc sâu bái cửa vàng,\nĐại phú đại quý bước thênh thang.\nTrời ban ân lớn cơ đồ thịnh,\nTrường thọ vinh hoa rạng xóm làng.",
      tongQuan: "Là số mệnh chí cao vô thượng, trời ban thiên lộc, công đức sâu dày từ tiền kiếp, sinh ra để hưởng vinh hoa tột bậc.",
      congDanh: "Sự nghiệp uy nghi chấn động, tài lộc dồi dào vô tận, đứng trên muôn người.",
      giaDao: "Gia tộc huy hoàng, con cháu rạng rỡ thành tài, hưởng phúc ấm trường tồn.",
      khuyenTu: "Tâm luôn hướng về cội nguồn, tích đức bồi công, giữ vẹn chữ Nhân Nghĩa."
    },
    70: {
      diem: 70, luong: 7, chi: 0, luongChiText: "7 Lượng 0 Chỉ",
      phanCap: "Chí Cao Vô Thượng - Cực Phẩm Thiên Triều",
      thoHanViet: "Thử mệnh suy lai đại bất phàm,\nCơ nghiệp vinh hoa chấn giang san.\nThiên ân chiếu giám chân quý cách,\nPhúc thọ miên trường thế thế an.",
      dichTho: "Mệnh này suy xét bậc phi phàm,\nCơ nghiệp vinh hoa rạng núi sông.\nTrời rọi ân sâu chân quý cách,\nPhúc thọ muôn đời hưởng thái bình.",
      tongQuan: "Mệnh 7 lượng chẵn là hàng cực phẩm nhân gian, người sinh ra có số mệnh này cực kỳ hiếm hoi, mang mệnh đế vương khanh tướng.",
      congDanh: "Quyền uy tột đỉnh, tiền của vô biên, công danh sự nghiệp lưu danh vạn thuở.",
      giaDao: "Gia tộc hiển hách bậc nhất thiên hạ, muôn đời hưởng lộc giàu sang phú quý.",
      khuyenTu: "Lấy đức dày chở muôn vật, làm nhiều việc thiện giúp dân giúp nước."
    },
    71: {
      diem: 71, luong: 7, chi: 1, luongChiText: "7 Lượng 1 Chỉ",
      phanCap: "Thượng Thượng Đại Cát - Mệnh Bậc Đế Vương",
      thoHanViet: "Thử mệnh suy lai tối cát tường,\nCơ nghiệp hùng cường vạn lý hương.\nKim chương ngọc đới thiên ân tứ,\nĐế vương quý cách trấn sơn hà.",
      dichTho: "Mệnh này suy xét tột cát tường,\nCơ nghiệp hùng cường ngát vạn phương.\nÁo ngọc đai vàng trời ban tặng,\nĐế vương quý cách trấn sơn hà.",
      tongQuan: "Là mức lượng chỉ cao nhất trong Cân Xương Đoán Số (7 lượng 1 chỉ). Mệnh chủ mang phúc đức sâu dày nhất trần gian, bậc kỳ tài xuất chúng, thọ khang phú quý tột đỉnh không ai sánh bằng.",
      congDanh: "Công danh đạt tới đỉnh cao tối thượng, tài lộc như đại dương bao la, lưu danh thiên cổ muôn đời sau mãi nhắc tên.",
      giaDao: "Gia đạo vinh hiển vô cùng, con cháu đời đời phát vương phát tướng, phúc trạch tràn đầy cõi trời đất.",
      khuyenTu: "Tâm ôm trọn nhân loại, đại từ đại bi, phổ độ quần sinh để phúc đức trường tồn cùng nhật nguyệt."
    }
  }
};

/**
 * Hàm tra cứu Can Chi từ năm sinh Dương Lịch
 */
function layCanChiTheoNam(nam) {
  const canArr = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
  const chiArr = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
  const can = canArr[nam % 10];
  const chi = chiArr[nam % 12];
  return can + " " + chi;
}

/**
 * Hàm định dạng hiển thị Lượng Chỉ
 */
function dinhDangLuongChi(luong, chi) {
  if (luong === 0) return `${chi} Chỉ`;
  if (chi === 0) return `${luong} Lượng`;
  return `${luong} Lượng ${chi} Chỉ`;
}

/**
 * HÀM TÍNH TOÁN CÂN XƯƠNG ĐOÁN SỐ
 * Input: canChiNam, thangAm, ngayAm, gioKey, gioiTinh
 * Output: Đối tượng chi tiết kết quả
 */
function tinhCanXuongDoanSo(canChiNam, thangAm, ngayAm, gioKey, gioiTinh = 'Nam') {
  const infoNam = CAN_XUONG_DATA.namSinh[canChiNam] || { luong: 0, chi: 9, tongChi: 9, canChi: canChiNam };
  const infoThang = CAN_XUONG_DATA.thangSinh[thangAm] || { luong: 0, chi: 6, tongChi: 6 };
  const infoNgay = CAN_XUONG_DATA.ngaySinh[ngayAm] || { luong: 0, chi: 5, tongChi: 5 };
  const infoGio = CAN_XUONG_DATA.gioSinh[gioKey] || { luong: 1, chi: 6, tongChi: 16, name: "Giờ Tý" };

  const tongChi = infoNam.tongChi + infoThang.tongChi + infoNgay.tongChi + infoGio.tongChi;
  const tongLuong = Math.floor(tongChi / 10);
  const soChiDu = tongChi % 10;

  // Lấy bài giải tương ứng (từ 21 đến 71)
  let diemKey = tongChi;
  if (diemKey < 21) diemKey = 21;
  if (diemKey > 71) diemKey = 71;

  const loiGiai = CAN_XUONG_DATA.loiGiai[diemKey] || CAN_XUONG_DATA.loiGiai[21];

  return {
    gioiTinh: gioiTinh,
    nam: {
      canChi: canChiNam,
      luong: infoNam.luong,
      chi: infoNam.chi,
      tongChi: infoNam.tongChi,
      text: dinhDangLuongChi(infoNam.luong, infoNam.chi),
      menh: infoNam.menh || ''
    },
    thang: {
      soThang: thangAm,
      luong: infoThang.luong,
      chi: infoThang.chi,
      tongChi: infoThang.tongChi,
      text: dinhDangLuongChi(infoThang.luong, infoThang.chi)
    },
    ngay: {
      soNgay: ngayAm,
      luong: infoNgay.luong,
      chi: infoNgay.chi,
      tongChi: infoNgay.tongChi,
      text: dinhDangLuongChi(infoNgay.luong, infoNgay.chi)
    },
    gio: {
      key: gioKey,
      name: infoGio.name,
      luong: infoGio.luong,
      chi: infoGio.chi,
      tongChi: infoGio.tongChi,
      text: dinhDangLuongChi(infoGio.luong, infoGio.chi)
    },
    tongChi: tongChi,
    tongLuong: tongLuong,
    soChiDu: soChiDu,
    tongLuongChiText: `${tongLuong} Lượng ${soChiDu} Chỉ`,
    tongSoLuongThapPhan: (tongChi / 10).toFixed(1),
    loiGiai: loiGiai
  };
}
