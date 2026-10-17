/**
 * =========================================================================
 * THUẬT SỐ HUYỀN HỌC - TÍCH HỢP TÌM KIẾM KIẾN THỨC TOÀN TRANG
 * Tự động tìm kiếm tức thì (Live Search), gợi ý kết quả và mở bài viết
 * =========================================================================
 */
(function () {
  'use strict';

  function removeVietnameseTones(str) {
    if (!str) return '';
    str = String(str);
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return str.toLowerCase().trim();
  }

  function getBasePath() {
    var p = '';
    try {
      p = decodeURIComponent(window.location.pathname).replace(/\\/g, '/');
    } catch (e) {
      p = (window.location.pathname || '').replace(/\\/g, '/');
    }
    if (p.indexOf('XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM') !== -1 || p.indexOf('XEM%20T%E1%BB%AC%20VI%20&%20X%C3%94NG%20%C4%90%E1%BA%A4T%20%C4%90%E1%BA%A6U%20N%C4%82M') !== -1) {
      return '../';
    }
    return './';
  }

  function isRootPage() {
    return typeof window.renderTabCmFeed === 'function' && typeof window.chuyenTab === 'function';
  }

  function resolveAssetPath(src) {
    if (!src) return '';
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('blob:')) {
      return src;
    }
    var base = getBasePath();
    if (base === '../') {
      if (src.startsWith('../')) return src;
      return '../' + src.replace(/^\.\//, '');
    }
    return src;
  }

  function formatContent(raw, base) {
    if (!raw) return '<p>Đang cập nhật nội dung chi tiết...</p>';
    var res = String(raw).trim();
    if (res.indexOf('<p>') === -1 && res.indexOf('<div>') === -1) {
      res = res.split(/\n\s*\n/).map(function (p) {
        return '<p style="margin-bottom: 14px; text-indent: 24px; line-height: 1.65; text-align: justify;">' + p.trim() + '</p>';
      }).join('');
    }
    if (base === '../') {
      res = res.replace(/src=["'](?!https?:|data:|\.\.\/|\/)([^"']+)["']/g, 'src="../$1"');
    }
    return res;
  }

  // Danh mục dữ liệu dự phòng chuẩn có đầy đủ nội dung bài viết
  var DEFAULT_SEARCH_CATALOG = [
    {
      id: "tuvi-tron-doi-giai-ma-menh-than",
      tieuDe: "Tử Vi Trọn Đời: Giải Mã Bản Đồ Định Mệnh Qua Cung Mệnh & Cung Thân",
      chuyenMuc: "Xem tử vi trọn đời",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "08/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Tử Vi Trọn Đời.png",
      tomTat: "Khám phá cấu trúc cốt lõi của lá số tử vi trọn đời. Phân tích mối tương quan giữa cung Mệnh (tiền định) và cung Thân (hậu thiên lập nghiệp) quyết định họa phúc một kiếp người.",
      noiDung: `
        <h3>1. Cung Mệnh và Cung Thân: Gốc rễ của số phận</h3>
        <p>Trong nghệ thuật dự trắc Tử Vi Đẩu Số, <strong>Cung Mệnh</strong> được coi là gốc rễ, thể hiện hình hài, cốt cách, tính cách thiên bẩm và vận mệnh nửa đầu cuộc đời (từ nhỏ đến khoảng 30 - 32 tuổi). Trong khi đó, <strong>Cung Thân</strong> là nơi nương tựa của hậu thiên, phản ánh hành động, nỗ lực cá nhân và giai đoạn từ tuổi trung niên trở về già.</p>

        <p style="text-align: center; margin: 18px 0;">
          <img src="Ảnh Bài Viết Khung 16-9/Xem Tử Vi Trọn Đời.png" alt="Tử vi trọn đời" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
        </p>

        <h3>2. Mối quan hệ giữa Cung Mệnh và Ngũ Hành Bản Mệnh</h3>
        <p>Một lá số thượng cách khi Ngũ Hành của bản mệnh tương sinh hoặc tỷ hòa với Ngũ Hành của vị trí cung an Mệnh. Ví dụ: Người mệnh Hỏa cư tại cung Dần, Mão (Mộc) gọi là Mộc sinh Hỏa, suốt đời dễ gặp hoàn cảnh tương trợ, gặp nguy hóa an.</p>
        
        <h3>3. Lời khuyên tu tâm dưỡng tính cải mệnh</h3>
        <blockquote>"Đức năng thắng số - Nhân định thắng thiên. Lá số tử vi chỉ ra khuynh hướng của vũ trụ, nhưng cách lựa chọn, sự tích đức hành thiện và nghị lực bản thân mới là yếu tố quyết định nấc thang thành tựu cuối cùng."</blockquote>
      `
    },
    {
      id: "tuvi-ngay-12-con-giap",
      tieuDe: "Tử Vi Hôm Nay: Luận Đoán Cát Hung 12 Con Giáp & Giờ Hoàng Đạo Khởi Sự",
      chuyenMuc: "Xem tử vi hàng ngày",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "15/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Tử Vi Hàng Ngày.jpeg",
      tomTat: "Dự báo chi tiết vận trình công danh, tài lộc, tình duyên của 12 con giáp trong ngày hôm nay. Hướng dẫn chọn khung giờ đại cát và hướng xuất hành nghênh tiếp Hỷ Thần, Tài Thần.",
      noiDung: `
        <p><strong>Tử vi hàng ngày</strong> là nội dung giúp bạn tham khảo những xu hướng và diễn biến nổi bật có thể xảy ra trong ngày dựa trên <strong>năm sinh</strong>, <strong>giới tính</strong> và <strong>ngày Can Chi</strong>. Hệ thống kết hợp Can Chi năm sinh, ngũ hành bản mệnh và trường khí ngày để đưa ra lời khuyên xác thực nhất.</p>
        <h3>1. Tổng quan trường khí và cục diện ngày hôm nay</h3>
        <p>Trong thuật số tử vi, vận trình mỗi ngày chịu ảnh hưởng sâu sắc bởi sự vận hành của Thiên Can, Địa Chi và hệ sao Lưu Nhật. Khởi sự vào các khung giờ Hoàng Đạo giúp chiêu tài tụ lộc và vạn sự hanh thông.</p>
        <h3>2. Bảng giờ hoàng đạo đại cát trong ngày</h3>
        <p>• <strong>Giờ Mão (05h - 07h):</strong> Ngọc Đường Hoàng Đạo – Cát lợi cho việc dâng hương, khai trương mở hàng.</p>
        <p>• <strong>Giờ Tỵ (09h - 11h):</strong> Tư Mệnh Hoàng Đạo – Cực tốt cho việc ký kết hợp đồng, gặp gỡ đối tác quý nhân.</p>
        <p>• <strong>Giờ Thân (15h - 17h):</strong> Thanh Long Hoàng Đạo – Thuận lợi cầu tài lộc, xuất hành đi xa an toàn như ý.</p>
      `
    },
    {
      id: "tuvi-tuan-chuyen-bien-tai-loc",
      tieuDe: "Tử Vi Tuần Mới: Chuyển Biến Cung Tài Bạch & Sự Nghiệp 12 Tuổi",
      chuyenMuc: "Xem tử vi hàng tuần",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "14/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Tử Vi Theo Tuần.png",
      tomTat: "Khám phá diễn biến vận hạn trong 7 ngày tới, nhận diện cơ hội tài chính và quý nhân tương trợ.",
      noiDung: `
        <h3>1. Bức tranh vận trình tuần mới tổng quát</h3>
        <p>Bước sang tuần mới, vầng nhật nguyệt hội tụ nhiều cát tinh mang lại năng lượng chuyển mình tích cực. Những ai đang ấp ủ dự án mới nên nhanh chóng triển khai vào đầu tuần (từ Thứ Hai đến Thứ Tư) để nắm trọn thiên thời địa lợi.</p>
        <h3>2. Điểm sáng tài lộc và sự nghiệp</h3>
        <p>Những bản mệnh mang hành Thổ và Kim sẽ đón nhận nhiều vận may bất ngờ về tiền bạc trong tuần này. Khoản thu phụ từ công việc tự do hoặc đầu tư tay trái có xu hướng gia tăng đáng kể.</p>
      `
    },
    {
      id: "tuvi-thang-nguyet-lenh",
      tieuDe: "Tử Vi Tháng Này: Dự Đoán Vượng Suy Tài Vận Theo Lịch Nguyệt Lệnh",
      chuyenMuc: "Xem tử vi hàng tháng",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "10/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Tử Vi Theo Tháng.jpeg",
      tomTat: "Cẩm nang dự báo xu thế tháng theo chu kỳ tiết khí và tiết lệnh, phòng ngừa hao tài tốn của.",
      noiDung: `
        <h3>1. Quy luật nguyệt lệnh chi phối vận hạn tháng</h3>
        <p>Mỗi tháng âm lịch đại diện cho một mùa khí và vị trí tinh tú riêng biệt. Khi sao Lưu Nguyệt di chuyển qua các cung vị trên lá số tử vi cá nhân, nó sẽ kích hoạt các sự kiện trọng đại về sức khỏe, điền sản, gia quyến.</p>
        <h3>2. Các lưu ý trọng yếu trong tháng</h3>
        <p>• <strong>Về phương diện sức khỏe:</strong> Chú trọng ăn uống cân bằng, tập thể dục nhẹ nhàng và giữ ấm cơ thể.</p>
        <p>• <strong>Về đầu tư:</strong> Tránh các thương vụ rủi ro cao, ưu tiên giữ vốn an toàn và tích lũy bền vững.</p>
      `
    },
    {
      id: "tuvi-van-han-dai-van-tieu-han",
      tieuDe: "Xem Vận Hạn Tử Vi: Cách Tính Đại Vận 10 Năm & Hóa Giải Sát Tinh Cung Hạn",
      chuyenMuc: "Xem vận hạn tử vi",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "05/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Vận Hạn Tử Vi.png",
      tomTat: "Hướng dẫn nhận diện chu kỳ Đại Hạn 10 năm và Tiểu Hạn hàng năm, hóa giải sát tinh.",
      noiDung: `
        <h3>1. Cơ chế vận hành của Đại Vận và Lưu Niên Tiểu Hạn</h3>
        <p>Một đời người trải qua nhiều chu kỳ Đại Vận 10 năm. Tùy theo Cục số mà tuổi bắt đầu bước vào Đại Vận sẽ rơi vào 2, 3, 4, 5 hoặc 6 tuổi.</p>
        <h3>2. Nhận diện các sao hung sát tinh thường gặp</h3>
        <p>• <strong>Kình Dương - Đà La:</strong> Chủ về trở ngại, thị phi kiện tụng hoặc va chạm thương tật.</p>
        <p>• <strong>Địa Không - Địa Kiếp:</strong> Tượng trưng cho hao tán tài sản bất ngờ nếu mưu sự không chính đáng.</p>
        <p>• <strong>Hóa Kỵ:</strong> Sao của sự nghi kỵ, đố kỵ và cản trở tiến trình công danh.</p>
      `
    },
    {
      id: "tuvi-can-xuong-tinh-cot",
      tieuDe: "Cân Xương Tính Cốt Lượng Chỉ: Dự Đoán Số Mệnh Sang Hèn Đời Người",
      chuyenMuc: "Cân xương đoán số",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "02/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Cân Xương Đoán Số.png",
      tomTat: "Bảng cân lượng chỉ Lượng - Chỉ theo năm, tháng, ngày, giờ sinh dự đoán tiền tài, hậu vận.",
      noiDung: `
        <h3>1. Nguồn gốc phép Cân Xương Tính Cốt</h3>
        <p>Phép cân xương đoán số do Khổng Minh Gia Cát Lượng hoặc Viên Thiên Cang truyền lại. Dựa vào giờ, ngày, tháng, năm sinh quy đổi ra số lượng chỉ, cộng lại để luận đoán phúc thọ cả đời.</p>
        <h3>2. Ý nghĩa các mức lượng chỉ</h3>
        <p>Từ 2 lượng 1 chỉ đến 7 lượng 1 chỉ, mỗi mức số đều có lời thơ và bài phú diễn giải tương ứng về số mệnh sang hèn, tiền bần hậu phú.</p>
      `
    },
    {
      id: "tuvi-12-con-giap-dau-nam",
      tieuDe: "Xem Tử Vi Đầu Năm 2026: Luận Đoán Cát Hung 12 Con Giáp & Vận Trình Đầu Xuân",
      chuyenMuc: "Tử Vi Đầu Năm",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "05/10/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Tử Vi 2026.png",
      tomTat: "Tổng quan tử vi năm Bính Ngọ 2026 cho 12 con giáp, sao chiếu mệnh, hạn tuổi và phương pháp nghênh cát.",
      noiDung: `
        <h3>1. Khí vận năm mới Bính Ngọ 2026</h3>
        <p>Năm Bính Ngọ mang nạp âm Thiên Hà Thủy. Đây là dòng nước mưa từ trời đem lại sức sống mới cho vạn vật, tạo tiền đề thuận lợi cho những ai biết nắm bắt thời cơ.</p>
        <h3>2. Cẩm nang khai xuân 12 con giáp</h3>
        <p>Chú trọng chọn ngày xuất hành mùng 1, mùng 2, mùng 4 Tết theo hướng Hỷ Thần và Tài Thần để đón nguồn năng lượng hanh thông suốt cả năm.</p>
      `
    },
    {
      id: "xong-dat-dau-nam-dai-cat",
      tieuDe: "Xông Đất Đầu Năm 2026: Cẩm Nang Chọn Tuổi Xông Nhà, Mở Hàng Đại Cát",
      chuyenMuc: "Xông Đất Đầu Năm",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "06/10/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xông Đất Đầu Năm 2026.png",
      tomTat: "Bảng tra tuổi xông nhà, mở hàng khai xuân cát lợi tương sinh bản mệnh gia chủ rước tài lộc.",
      noiDung: `
        <h3>1. Ý nghĩa phong tục xông đất đầu xuân</h3>
        <p>Người xông đất là người đầu tiên bước qua cửa nhà gia chủ sau giao thừa. Một người có tính cách xởi lởi, sức khỏe dồi dào, gia đạo yên ấm và tuổi tương sinh với gia chủ sẽ mang lại may mắn suốt cả năm.</p>
        <h3>2. Các tiêu chuẩn chọn người xông đất</h3>
        <p>• Tuổi Tam Hợp, Lục Hợp với gia chủ và năm mới.</p>
        <p>• Ngũ Hành tương sinh (Kim sinh Thủy, Thủy sinh Mộc, Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim).</p>
      `
    },
    {
      id: "xem-ngay-mua-xe-cat-loi",
      tieuDe: "Xem Ngày Mua Xe Hợp Tuổi: Chọn Ngày Cát Tinh Nghênh Tài Khí, Vạn Dặm Bình An",
      chuyenMuc: "Xem ngày mua xe",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "15/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Ngày Tốt Mua Xe.png",
      tomTat: "Chi tiết các tiêu chí phong thủy khi trạch nhật mua xe ô tô, xe máy: Chọn ngày Đại An, Tốc Hỷ, sao Lộc Tồn...",
      noiDung: `
        <h3>1. Ý nghĩa việc chọn ngày mua xe hợp tuổi</h3>
        <p>Phương tiện đi lại gắn liền với sự an toàn tính mạng và công danh tài vận của mỗi người. Mua xe vào ngày cát lợi không những giúp tâm lý gia chủ vững vàng, tay lái bình an mà còn kích hoạt vượng khí, thuận đường làm ăn buôn bán.</p>
        <h3>2. Cách chọn ngày giờ mua xe chuẩn xác</h3>
        <p>• <strong>Chọn ngày có cát tinh:</strong> Ưu tiên các ngày có sao Thiên Mã, Lộc Mã, Phúc Sinh, Thiên Đức hợp chiếu.</p>
        <p>• <strong>Chọn khung giờ Hoàng Đạo:</strong> Khi nhận xe và lăn bánh rời showroom, cần xuất phát đúng vào giờ cát (như giờ Đại An, Tốc Hỷ).</p>
      `
    },
    {
      id: "xem-ngay-xuat-hanh-hanh-thong",
      tieuDe: "Xem Ngày Xuất Hành: Định Hướng Hỷ Thần, Tài Thần Để Đi Đến Nơi Về Đến Chốn",
      chuyenMuc: "Xem ngày xuất hành",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "14/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Ngày Xuất Hành.png",
      tomTat: "Bí quyết chọn ngày giờ xuất hành hanh thông, đón may mắn tài lộc, bình an thuận buồm xuôi gió.",
      noiDung: `
        <h3>1. Phương pháp định hướng xuất hành</h3>
        <p>Khi bước chân ra khỏi ngõ đầu tiên trong chuyến đi, việc chọn đúng hướng nghênh Thần mang ý nghĩa quyết định cát hung của chuyến hành trình:</p>
        <p>• <strong>Hỷ Thần:</strong> Chủ về tin vui, hỷ sự, tình duyên thắm nồng, gặp gỡ thuận lợi.</p>
        <p>• <strong>Tài Thần:</strong> Chủ về đàm phán hợp đồng, kinh doanh thu lợi nhuận cao.</p>
      `
    },
    {
      id: "xem-ngay-tot-hon-nhan",
      tieuDe: "Xem Ngày Tốt Kết Hôn: Chọn Ngày Bất Tương, Định Nghĩa Trăm Năm Hòa Hợp",
      chuyenMuc: "Xem ngày tốt kết hôn",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "13/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Ngày Tốt Kết Hôn.png",
      tomTat: "Tiêu chuẩn trạch nhật đám cưới, hỏi, chọn ngày Bất Tương tránh Cô Thần, Quả Tú, Nguyệt Hình.",
      noiDung: `
        <h3>1. Trạch nhật hôn nhân - Nền tảng trăm năm</h3>
        <p>Chọn ngày cưới hỏi là nghi lễ vô cùng thiêng liêng. Ngày Bất Tương là ngày âm dương hòa hợp, không xung không sát, cực kỳ cát lợi cho việc kết tóc se duyên.</p>
      `
    },
    {
      id: "xem-ngay-hoang-dao-toan-tap",
      tieuDe: "Xem Ngày Hoàng Đạo: Ý Nghĩa 6 Sao Cát & Cách Tra Cứu Khung Giờ Khởi Sự",
      chuyenMuc: "Xem ngày hoàng đạo",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "12/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Ngày Hoàng Đạo.png",
      tomTat: "Bảng tra cứu chi tiết 6 ngày Hoàng Đạo: Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh.",
      noiDung: `
        <h3>1. Sáu vì sao Hoàng Đạo đại cát</h3>
        <p>• <strong>Thanh Long:</strong> Cát tinh đứng đầu, mưu sự đại thành.</p>
        <p>• <strong>Minh Đường:</strong> Lợi cho thăng quan tiến chức, quý nhân phù trợ.</p>
        <p>• <strong>Kim Quỹ:</strong> Tụ tài sinh lộc, giữ gìn tài sản.</p>
        <p>• <strong>Thiên Đức:</strong> Giải trừ tai ương, phúc đức dồi dào.</p>
        <p>• <strong>Ngọc Đường:</strong> Thuận buồm xuôi gió, danh lộc song toàn.</p>
        <p>• <strong>Tư Mệnh:</strong> An khang thịnh vượng, gia đạo bình yên.</p>
      `
    },
    {
      id: "xem-ngay-dong-tho-xay-nha",
      tieuDe: "Xem Ngày Động Thổ: Nghi Lễ Khởi Công & Các Tiêu Chí Tránh Thái Tuế, Tam Tai",
      chuyenMuc: "Xem ngày động thổ",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "11/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Ngày Động Thổ.png",
      tomTat: "Hướng dẫn trạch cát khởi công, động thổ xây dựng, chuẩn bị lễ vật và văn khấn Thổ Thần long mạch.",
      noiDung: `
        <h3>1. Tầm quan trọng của ngày động thổ</h3>
        <p>Động thổ là nghi lễ xin phép thần linh thổ địa khi tác động đến long mạch. Chọn ngày đại cát giúp quá trình thi công thuận lợi, gia chủ bình an và hưng vượng sau khi dọn vào ở.</p>
      `
    },
    {
      id: "xem-ngay-khai-truong-phat-tai",
      tieuDe: "Xem Ngày Khai Trương: Nghênh Tài Đón Lộc, Buôn May Bán Đắt Suốt Cả Năm",
      chuyenMuc: "Xem ngày khai trương",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "09/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Ngày Khai Trương.jpeg",
      tomTat: "Chọn ngày mở hàng, khai trương cửa hàng, doanh nghiệp đón vượng khí hanh thông, chiêu tài đắc lộc.",
      noiDung: `
        <h3>1. Mở hàng khai xuân đón tài lộc</h3>
        <p>Ngày khai trương khởi đầu cho hoạt động kinh doanh buôn bán. Chọn ngày giờ Hoàng Đạo, sao Lộc Tồn, Thiên Hỷ giúp công việc hanh thông, khách hàng tấp nập.</p>
      `
    },
    {
      id: "xem-ngay-ky-hop-dong-thanh-cong",
      tieuDe: "Xem Ngày Ký Hợp Đồng: Chọn Giờ Cát Khánh Để Giao Dịch Thuận Buồm Xuôi Gió",
      chuyenMuc: "Xem ngày ký hợp đồng",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "08/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Ngày Ký Hợp Đồng.jpeg",
      tomTat: "Phương pháp chọn giờ Hoàng Đạo, sao Thiên Quan, Thiên Phúc khi ký kết văn bản hợp đồng lớn.",
      noiDung: `
        <h3>1. Chọn giờ cát khánh ký hợp đồng</h3>
        <p>Ký kết hợp đồng là dấu mốc hợp tác kinh tế quan trọng. Chọn giờ có sao Thiên Quan, Thiên Phúc hoặc Trực Khai giúp giao dịch thuận buồm xuôi gió và đôi bên cùng phát triển.</p>
      `
    },
    {
      id: "xemtuoi-vo-chong-hoa-hop",
      tieuDe: "Xem Tuổi Vợ Chồng Hòa Hợp: Luận Giải Cung Phi Bát Trạch & Ngũ Hành Tương Sinh",
      chuyenMuc: "Xem tuổi vợ chồng",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "15/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Tuổi Vợ Chồng.png",
      tomTat: "Phân tích Thiên Can, Địa Chi, Cung Phi Bát Tự xem vợ chồng hòa hợp Sinh Khí, Diên Niên, Phục Vì.",
      noiDung: `
        <h3>1. Yếu tố xem tuổi vợ chồng chuẩn xác</h3>
        <p>Phối hợp Thiên Can, Địa Chi, Cung Phi Bát Trạch và Ngũ Hành nạp âm. Hướng tới các cung Sinh Khí, Thiên Y, Diên Niên, Phục Vì để gia đình hạnh phúc, con cháu đề huề.</p>
      `
    },
    {
      id: "xemtuoi-sinh-con-tai-loc",
      tieuDe: "Xem Tuổi Sinh Con Hợp Tuổi Cha Mẹ: Đón Tài Đón Lộc, Gia Đạo Hưng Thịnh",
      chuyenMuc: "Xem tuổi sinh con",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "14/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Xem Tuổi Sinh Con.png",
      tomTat: "Chọn năm sinh con hợp tuổi cha mẹ, tương sinh ngũ hành mang lại may mắn, bình an cho cả gia đình.",
      noiDung: `
        <h3>1. Chọn năm sinh con hợp phong thủy</h3>
        <p>Con cái là lộc trời ban. Chọn năm sinh con có Ngũ Hành tương sinh với cha mẹ giúp gia đình thêm hòa thuận, công việc làm ăn của cha mẹ ngày càng khởi sắc.</p>
      `
    },
    {
      id: "phongthuy-nha-o-vuong-khi",
      tieuDe: "Phong Thủy Nhà Ở Dương Trạch: Bố Cục Phòng Khách, Ban Thờ & Bếp Hút Vượng Khí",
      chuyenMuc: "Phong Thủy",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "12/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/62c337658a2c9f247cc18cc4fe228bd1_thumb_phongthuy_nhacua.jpg",
      tomTat: "Các nguyên tắc phong thủy phòng khách, hướng ban thờ, bếp nấu tụ tài tụ lộc cho ngôi nhà.",
      noiDung: `
        <h3>1. Ba yếu tố Dương Trạch Tam Yếu</h3>
        <p>Môn (cửa chính), Chủ (phòng ngủ gia chủ) và Táo (bếp nấu) là ba vị trí quan trọng nhất chi phối tài lộc, sức khỏe của mọi thành viên trong gia đình.</p>
      `
    },
    {
      id: "boisim-kinhdich-phoidao",
      tieuDe: "Luận Giải Phong Thủy Sim Số: Phương Pháp Phối Quẻ Kinh Dịch Chuyên Sâu",
      chuyenMuc: "Xem Bói Sim",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "10/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Luận Giải Phong Thủy Sim Số.png",
      tomTat: "Cách tính 4 số cuối, phối quẻ Thượng - Hạ Kinh Dịch chấm điểm phong thủy sim số cát tường.",
      noiDung: `
        <h3>1. Phương pháp phối quẻ Kinh Dịch sim số</h3>
        <p>Phân chia 5 số đầu làm Thượng quái, 5 số cuối làm Hạ quái, lấy tổng chia 8 để tìm quẻ dịch. Kết hợp 64 quẻ Kinh Dịch để xác định sim cát hay hung.</p>
      `
    },
    {
      id: "lenghi-cam-nang-co-truyen",
      tieuDe: "Cẩm Nang Lễ Nghi Cổ Truyền Việt Nam: Khai Quang, Gia Tiên & Văn Khấn Chuẩn",
      chuyenMuc: "Lễ Nghi",
      tacGia: "Thầy Duy Tâm Phúc",
      ngayDang: "15/09/2026",
      hinhAnh: "Ảnh Bài Viết Khung 16-9/Cẩm Nang Lễ Nghi Cổ Truyền Việt Nam.png",
      tomTat: "Hướng dẫn bài bản nghi lễ thờ cúng gia tiên, văn khấn mùng 1, ngày rằm, động thổ, cúng lễ đầy đủ.",
      noiDung: `
        <h3>1. Lễ nghi thờ phụng cổ truyền Việt Nam</h3>
        <p>Bàn thờ là nơi tụ khí linh thiêng của ngôi nhà. Giữ gìn sự tôn nghiêm, hương khói ấm cúng và lòng thành kính chính là gốc rễ của phúc lộc gia đình.</p>
      `
    }
  ];

  // Lấy toàn bộ bài viết từ tất cả kho dữ liệu
  function getAllSearchableArticles() {
    var customList = [];
    var storages = [
      "BAI_VIET_CHUYEN_MUC_CUSTOM",
      "TUVI_BAI_VIET_CUSTOM",
      "XEMNGAY_BAI_VIET_CUSTOM",
      "XEMTUOI_BAI_VIET_CUSTOM",
      "TAMLINH_BAI_VIET_CUSTOM",
      "PHONGTHUY_BAI_VIET_CUSTOM",
      "KIENTHUC_BAI_VIET_CUSTOM"
    ];

    storages.forEach(function (k) {
      try {
        var s = localStorage.getItem(k);
        if (s) {
          var arr = JSON.parse(s);
          if (Array.isArray(arr)) {
            customList = customList.concat(arr);
          }
        }
      } catch (e) {}
    });

    var map = {};
    customList.forEach(function (p) {
      if (p && p.id) {
        if (!map[p.id] || (Number(p.updatedAt) || 0) >= (Number(map[p.id].updatedAt) || 0)) {
          map[p.id] = p;
        }
      }
    });

    var result = Object.values(map);
    var ids = new Set(result.map(function (p) { return p.id; }));

    var defSources = [
      window.BAI_VIET_CHUYEN_MUC,
      window.TUVI_BAI_VIET_DATA,
      window.XEMNGAY_BAI_VIET_DATA,
      window.XEMTUOI_BAI_VIET_DATA,
      window.TAMLINH_LENGHI_DATA,
      DEFAULT_SEARCH_CATALOG
    ];

    defSources.forEach(function (source) {
      if (Array.isArray(source)) {
        source.forEach(function (item) {
          if (item && item.id && !ids.has(item.id)) {
            result.push(item);
            ids.add(item.id);
          }
        });
      }
    });

    return result;
  }

  // Tìm bài viết theo ID hoặc khớp tiêu đề
  function findArticleById(id) {
    if (!id) return null;
    var all = getAllSearchableArticles();
    var found = all.find(function (p) { return p && p.id === id; });
    if (found) return found;

    var normId = removeVietnameseTones(id);
    return all.find(function (p) {
      if (!p) return false;
      var pIdNorm = removeVietnameseTones(p.id || '');
      var tNorm = removeVietnameseTones(p.tieuDe || '');
      return pIdNorm.indexOf(normId) !== -1 || normId.indexOf(pIdNorm) !== -1 || tNorm.indexOf(normId) !== -1;
    }) || null;
  }

  // Hiển thị modal đọc bài viết chi tiết độc lập trên mọi trang
  function showUniversalArticleModal(post) {
    if (!post) return;

    var modal = document.getElementById('nav-search-article-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'nav-search-article-modal';
      modal.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'width: 100vw',
        'height: 100vh',
        'background: rgba(15, 8, 8, 0.78)',
        'backdrop-filter: blur(4px)',
        '-webkit-backdrop-filter: blur(4px)',
        'z-index: 9999999',
        'display: flex',
        'align-items: center',
        'justify-content: center',
        'padding: 16px',
        'box-sizing: border-box',
        'opacity: 0',
        'visibility: hidden',
        'transition: opacity 0.25s ease, visibility 0.25s ease'
      ].join(';');

      var dialog = document.createElement('div');
      dialog.className = 'nav-modal-dialog';
      dialog.style.cssText = [
        'background: #FAF7F2',
        'border: 2px solid #DFBA73',
        'border-radius: 10px',
        'width: 100%',
        'max-width: 840px',
        'max-height: 90vh',
        'display: flex',
        'flex-direction: column',
        'box-shadow: 0 16px 45px rgba(0, 0, 0, 0.55)',
        'overflow: hidden',
        'font-family: inherit'
      ].join(';');

      dialog.innerHTML = [
        '<div style="background: linear-gradient(135deg, #7A1414 0%, #4E0808 100%); color: #FFF; padding: 13px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #DFBA73;">',
        '  <div style="display: flex; align-items: center; gap: 10px;">',
        '    <span id="nav-modal-cat-badge" style="background: rgba(0,0,0,0.3); border: 1px solid #DFBA73; color: #FFE6AA; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 3px;">Tử Vi</span>',
        '    <span style="font-size: 13px; color: #EBD3AB; font-weight: 600;">Bài Viết Chuyên Mục & Kiến Thức</span>',
        '  </div>',
        '  <button type="button" id="nav-modal-btn-close-x" style="background: transparent; border: none; color: #FFF; font-size: 22px; cursor: pointer; padding: 0 6px; line-height: 1; transition: color 0.15s;" title="Đóng">✖</button>',
        '</div>',
        '<div style="padding: 24px 28px; overflow-y: auto; flex: 1;">',
        '  <h2 id="nav-modal-title" style="font-family: \'Playfair Display\', \'Noto Serif\', Georgia, serif; font-size: 22px; font-weight: 800; color: #7A1414; line-height: 1.35; margin: 0 0 12px 0;"></h2>',
        '  <div class="article-modal-meta" style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: #8C7B6B; margin-bottom: 16px; border-bottom: 1px dashed #E0D6C3; padding-bottom: 10px; flex-wrap: wrap;">',
        '    <span class="article-meta-author"><span class="meta-label">✍ Tác giả:</span> <strong id="nav-modal-author" style="color: #4A3E31;">Thầy Duy Tâm Phúc</strong></span>',
        '    <span class="article-meta-dot">•</span>',
        '    <span class="article-meta-date"><span class="meta-label">📅 Ngày đăng:</span> <strong id="nav-modal-date" style="color: #4A3E31;"></strong></span>',
        '  </div>',
        '  <div id="nav-modal-img-wrap" style="margin-bottom: 20px; text-align: center; display: none;">',
        '    <img id="nav-modal-img" src="" alt="Ảnh minh họa" style="max-width: 100%; height: auto; max-height: 460px; display: inline-block; margin: 0 auto; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.12);">',
        '  </div>',
        '  <div id="nav-modal-content" style="font-family: \'Inter\', system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.65; color: #2C241E; text-align: justify;"></div>',
        '</div>',
        '<div style="padding: 11px 24px; background: #FAF7F2; border-top: 1px solid #DFBA73; display: flex; justify-content: space-between; align-items: center; gap: 12px;">',
        '  <a id="nav-modal-btn-open-feed" href="#" style="padding: 7px 16px; background: #FFF; color: #7A1414; border: 1px solid #DFBA73; border-radius: 5px; font-weight: 700; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">🔍 Xem Trong Chuyên Mục</a>',
        '  <button type="button" id="nav-modal-btn-close-bot" style="padding: 7px 22px; background: #7A1414; color: #FFE6AA; border: 1px solid #DFBA73; border-radius: 5px; font-weight: 700; cursor: pointer; font-size: 13.5px; transition: all 0.2s;">Đóng Lại</button>',
        '</div>'
      ].join('');

      modal.appendChild(dialog);
      document.body.appendChild(modal);

      function closeModal() {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }

      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });

      var btnX = dialog.querySelector('#nav-modal-btn-close-x');
      if (btnX) btnX.onclick = closeModal;

      var btnBot = dialog.querySelector('#nav-modal-btn-close-bot');
      if (btnBot) btnBot.onclick = closeModal;

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.visibility === 'visible') {
          closeModal();
        }
      });
    }

    var base = getBasePath();
    var catBadge = modal.querySelector('#nav-modal-cat-badge');
    if (catBadge) catBadge.textContent = post.chuyenMuc || 'Kiến Thức';

    var titleEl = modal.querySelector('#nav-modal-title');
    if (titleEl) titleEl.textContent = post.tieuDe || 'Bài Viết';

    var authorEl = modal.querySelector('#nav-modal-author');
    if (authorEl) authorEl.textContent = post.tacGia || 'Thầy Duy Tâm Phúc';

    var dateEl = modal.querySelector('#nav-modal-date');
    if (dateEl) dateEl.textContent = post.ngayDang || '2026';

    var imgWrap = modal.querySelector('#nav-modal-img-wrap');
    var imgEl = modal.querySelector('#nav-modal-img');
    if (post.hinhAnh) {
      if (imgEl) imgEl.src = resolveAssetPath(post.hinhAnh);
      if (imgWrap) imgWrap.style.display = 'block';
    } else {
      if (imgWrap) imgWrap.style.display = 'none';
    }

    var contentEl = modal.querySelector('#nav-modal-content');
    if (contentEl) {
      var rawContent = post.noiDung || post.tomTat || '';
      contentEl.innerHTML = formatContent(rawContent, base);
    }

    var feedLink = modal.querySelector('#nav-modal-btn-open-feed');
    if (feedLink) {
      feedLink.href = base + 'index.html#chuyenmuc';
    }

    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    document.body.style.overflow = 'hidden';
  }

  // Điều phối mở bài viết phù hợp với từng trang
  function displayArticleModal(post) {
    if (!post) return;

    if (isRootPage() && typeof window.openArticleModal === 'function') {
      try {
        window.openArticleModal(post.id, post);
        return;
      } catch (err) {
        console.warn('Lỗi mở modal hệ thống gốc, hiển thị modal độc lập:', err);
      }
    }

    showUniversalArticleModal(post);
  }

  // Khởi tạo tính năng tìm kiếm trên thanh điều hướng
  function initNavSearch() {
    var searchInput = document.getElementById('search-input');
    var searchBtn = document.getElementById('btn-search');
    var navSearchWrap = document.querySelector('.nav-search');

    if (!searchInput || !searchBtn || !navSearchWrap) return;

    navSearchWrap.style.position = 'relative';

    var dropdown = document.getElementById('nav-search-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'nav-search-dropdown';
      dropdown.style.cssText = [
        'position: absolute',
        'top: calc(100% + 7px)',
        'right: 0',
        'width: clamp(310px, 32vw, 440px)',
        'max-height: 440px',
        'overflow-y: auto',
        'background: #FFFDF9',
        'border: 1.5px solid #DFBA73',
        'border-radius: 6px',
        'box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45)',
        'z-index: 999999',
        'display: none',
        'font-family: inherit',
        'text-align: left'
      ].join(';');
      navSearchWrap.appendChild(dropdown);
    }

    function hideDropdown() {
      if (dropdown) dropdown.style.display = 'none';
    }

    function showDropdown() {
      if (dropdown) dropdown.style.display = 'block';
    }

    function handleLiveSearch() {
      var q = searchInput.value.trim();
      if (!q) {
        hideDropdown();
        return;
      }

      var normQ = removeVietnameseTones(q);
      var all = getAllSearchableArticles();

      var matches = all.filter(function (p) {
        if (!p) return false;
        var tNorm = removeVietnameseTones(p.tieuDe || '');
        var cNorm = removeVietnameseTones(p.chuyenMuc || '');
        var sNorm = removeVietnameseTones(p.tomTat || '');
        return tNorm.indexOf(normQ) !== -1 || cNorm.indexOf(normQ) !== -1 || sNorm.indexOf(normQ) !== -1;
      });

      matches.sort(function (a, b) {
        var tA = removeVietnameseTones(a.tieuDe || '').indexOf(normQ) !== -1 ? 1 : 0;
        var tB = removeVietnameseTones(b.tieuDe || '').indexOf(normQ) !== -1 ? 1 : 0;
        if (tB !== tA) return tB - tA;
        return (Number(b.updatedAt) || 0) - (Number(a.updatedAt) || 0);
      });

      var topMatches = matches.slice(0, 6);

      if (topMatches.length === 0) {
        dropdown.innerHTML = [
          '<div style="padding: 20px 16px; text-align: center; color: #8C7B6B;">',
          '  <i class="fa-solid fa-magnifying-glass" style="font-size: 22px; color: #DFBA73; margin-bottom: 8px; display: block;"></i>',
          '  <div style="font-weight: 700; color: #7A1414; font-size: 13.5px; margin-bottom: 4px;">Không tìm thấy bài viết phù hợp</div>',
          '  <div style="font-size: 12px; color: #666;">Thử tìm với từ khóa khác (ví dụ: tử vi, mua xe, xuất hành, phong thủy...)</div>',
          '</div>'
        ].join('');
        showDropdown();
        return;
      }

      var html = [
        '<div style="padding: 8px 14px; background: #FAF3E8; border-bottom: 1px solid #DFBA73; display: flex; align-items: center; justify-content: space-between;">',
        '  <span style="font-size: 11.5px; font-weight: 800; color: #7A1414; text-transform: uppercase; letter-spacing: 0.5px;">',
        '    <i class="fa-solid fa-book-open" style="margin-right: 5px;"></i> Kết Quả Tìm Thấy (' + matches.length + ')',
        '  </span>',
        '  <span style="font-size: 11px; color: #888;">Nhấp để mở xem bài</span>',
        '</div>',
        '<div style="display: flex; flex-direction: column;">'
      ].join('');

      topMatches.forEach(function (p) {
        var cm = p.chuyenMuc || "Kiến Thức";
        var date = p.ngayDang || "2026";
        var title = p.tieuDe || "Bài viết";
        var snippet = (p.tomTat || "").substring(0, 110);
        if (snippet.length >= 110) snippet += '...';

        html += [
          '<div class="search-drop-item" data-id="' + p.id + '" style="padding: 10px 14px; border-bottom: 1px solid #F0E6D8; cursor: pointer; transition: background 0.15s; display: flex; flex-direction: column; gap: 4px;">',
          '  <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">',
          '    <span style="background: #FAF3E8; color: #7A1414; border: 1px solid #DFBA73; padding: 1px 6px; border-radius: 3px; font-size: 10.5px; font-weight: 700;">' + cm + '</span>',
          '    <span style="font-size: 11px; color: #888;">📅 ' + date + '</span>',
          '  </div>',
          '  <div style="font-size: 13px; font-weight: 700; color: #2C241E; line-height: 1.4;">' + title + '</div>',
          snippet ? '  <div style="font-size: 11.5px; color: #666; line-height: 1.35;">' + snippet + '</div>' : '',
          '</div>'
        ].join('');
      });

      html += '</div>';
      html += [
        '<div id="btn-view-all-results" style="padding: 9px 14px; background: #FAF3E8; border-top: 1px solid #DFBA73; text-align: center; font-size: 12px; font-weight: 700; color: #7A1414; cursor: pointer; transition: all 0.2s;">',
        '  🔍 Xem tất cả kết quả trong Chuyên Mục &rarr;',
        '</div>'
      ].join('');

      dropdown.innerHTML = html;
      showDropdown();

      // Gắn sự kiện click mở ngay bài viết trên màn hình khi nhấp vào bài viết
      dropdown.querySelectorAll('.search-drop-item').forEach(function (el) {
        el.onmouseenter = function () { this.style.background = '#FAF3E8'; };
        el.onmouseleave = function () { this.style.background = '#FFFDF9'; };
        el.onclick = function (e) {
          e.stopPropagation();
          var pid = this.getAttribute('data-id') || (e.currentTarget && e.currentTarget.getAttribute('data-id'));
          hideDropdown();
          var post = findArticleById(pid);
          if (post) {
            displayArticleModal(post);
          } else {
            console.warn('Không tìm thấy bài viết ID:', pid);
          }
        };
      });

      var viewAllBtn = document.getElementById('btn-view-all-results');
      if (viewAllBtn) {
        viewAllBtn.onmouseenter = function () { this.style.background = '#7A1414'; this.style.color = '#FFE6AA'; };
        viewAllBtn.onmouseleave = function () { this.style.background = '#FAF3E8'; this.style.color = '#7A1414'; };
        viewAllBtn.onclick = function (e) {
          e.stopPropagation();
          hideDropdown();
          executeFullSearch(q);
        };
      }
    }

    // Thực hiện tìm kiếm toàn diện khi nhấn nút [Tìm] hoặc gõ Enter
    function executeFullSearch(query) {
      var q = (query || searchInput.value || '').trim();
      if (!q) {
        searchInput.focus();
        return;
      }
      hideDropdown();

      if (isRootPage()) {
        if (typeof window.chuyenTab === 'function') {
          window.chuyenTab('chuyenmuc');
        }
        if (typeof window.tabCmCurrentSearch !== 'undefined') {
          window.tabCmCurrentSearch = q;
        }
        var searchBox = document.getElementById('tab-cm-search');
        if (searchBox) searchBox.value = q;
        if (typeof window.renderTabCmFeed === 'function') {
          window.renderTabCmFeed();
        }
        var cmSection = document.getElementById('chuyenmuc') || document.getElementById('tab-chuyenmuc');
        if (cmSection) {
          cmSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.location.href = getBasePath() + 'index.html?search=' + encodeURIComponent(q) + '#chuyenmuc';
      }
    }

    var debounceTimer = null;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleLiveSearch, 120);
    });

    searchInput.addEventListener('focus', function () {
      if (searchInput.value.trim()) {
        handleLiveSearch();
      }
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeFullSearch();
      } else if (e.key === 'Escape') {
        hideDropdown();
      }
    });

    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      executeFullSearch();
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-search')) {
        hideDropdown();
      }
    });
  }

  // Tự động kiểm tra tham số URL khi trang tải (?search=... hoặc ?openArticle=...)
  function checkUrlSearchParameters() {
    try {
      var params = new URLSearchParams(window.location.search);
      var qArticle = params.get('openArticle');
      var qSearch = params.get('search');

      if (qArticle) {
        setTimeout(function () {
          var post = findArticleById(qArticle);
          if (post) {
            displayArticleModal(post);
          }
        }, 350);
      } else if (qSearch && isRootPage()) {
        setTimeout(function () {
          if (typeof window.chuyenTab === 'function') {
            window.chuyenTab('chuyenmuc');
          }
          if (typeof window.tabCmCurrentSearch !== 'undefined') {
            window.tabCmCurrentSearch = qSearch;
          }
          var searchBox = document.getElementById('tab-cm-search');
          if (searchBox) searchBox.value = qSearch;
          var navInput = document.getElementById('search-input');
          if (navInput) navInput.value = qSearch;
          if (typeof window.renderTabCmFeed === 'function') {
            window.renderTabCmFeed();
          }
          var cmSection = document.getElementById('chuyenmuc') || document.getElementById('tab-chuyenmuc');
          if (cmSection) {
            cmSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 350);
      }
    } catch (e) {}
  }

  // =========================================================================
  // XỬ LÝ MENU CON TRÊN MOBILE: BẤM VÀO THÌ HIỆN, DI CHUYỂN / BẤM RA NGOÀI TỰ ẨN
  // =========================================================================
  function initMobileMenuDropdownToggle() {
    var navItems = document.querySelectorAll('.nav-item');
    if (!navItems || navItems.length === 0) return;

    navItems.forEach(function (item) {
      var submenu = item.querySelector('.nav-submenu');
      if (!submenu) return;

      var link = item.querySelector('.nav-link');
      if (link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 900) {
            var isOpen = item.classList.contains('mobile-open');

            // Đóng tất cả các menu đang mở khác trước
            document.querySelectorAll('.nav-item.mobile-open').forEach(function (el) {
              if (el !== item) el.classList.remove('mobile-open');
            });

            // Đảo ngược trạng thái mở / đóng
            if (isOpen) {
              item.classList.remove('mobile-open');
            } else {
              item.classList.add('mobile-open');
            }
          }
        });
      }

      // Khi bấm vào bất kỳ mục con nào bên trong -> đóng menu lại ngay
      var subLinks = submenu.querySelectorAll('a');
      subLinks.forEach(function (subLink) {
        subLink.addEventListener('click', function () {
          item.classList.remove('mobile-open');
        });
      });
    });

    // Khi di chuyển / bấm chuột hoặc chạm ra bất kỳ chỗ nào khác ngoài menu -> tự động đóng ngay!
    function dongMenuKhiBamNgoai(e) {
      if (window.innerWidth <= 900) {
        if (!e.target.closest('.nav-item')) {
          document.querySelectorAll('.nav-item.mobile-open').forEach(function (el) {
            el.classList.remove('mobile-open');
          });
        }
      }
    }
    document.addEventListener('click', dongMenuKhiBamNgoai);
    document.addEventListener('touchstart', dongMenuKhiBamNgoai, { passive: true });

    // Khi cuộn trang -> tự động ẩn đi để không che mắt
    window.addEventListener('scroll', function () {
      if (window.innerWidth <= 900) {
        var openMenus = document.querySelectorAll('.nav-item.mobile-open');
        if (openMenus.length > 0) {
          openMenus.forEach(function (el) {
            el.classList.remove('mobile-open');
          });
        }
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNavSearch();
      checkUrlSearchParameters();
      initMobileMenuDropdownToggle();
    });
  } else {
    initNavSearch();
    checkUrlSearchParameters();
    initMobileMenuDropdownToggle();
  }

  window.addEventListener('load', function () {
    checkUrlSearchParameters();
    initMobileMenuDropdownToggle();
  });
})();
