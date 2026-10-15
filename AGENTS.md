# QUY TẮC BẢO VỆ CỐT LÕI VÀ BẢO TOÀN DỮ LIỆU DỰ ÁN (PROJECT PROTECTION PROTOCOL)

## 1. NGUYÊN TẮC BẤT KHẢ XÂM PHẠM VỀ CÔNG THỨC THUẬT SỐ
- **KHÔNG THAY ĐỔI / KHÔNG XÓA:** Tuyệt đối không tự ý chỉnh sửa, xóa bỏ, làm xáo trộn bất kỳ công thức, thuật toán hay hàm tính toán nào thuộc các bộ máy thuật số:
  - Tử Vi Đẩu Số (`js/tuvi_engine.js`, `js/tuvi_stars_data.js`, `js/tuvi_bai_viet_data.js`, `js/an_trien_data.js`...)
  - Lịch Vạn Niên & Âm Dương Lịch (`js/lichvannien_engine.js`, `js/lich_am_duong.js`, `js/lich_thang.js`...)
  - Xem Ngày Tốt / Trạch Nhật (`js/trachnhat_data.js`, `js/xemngay_bai_viet_data.js`...)
  - Xem Tuổi Hợp Hôn Nhân / Làm Ăn (`js/xemtuoi_bai_viet_data.js`...)
  - Kinh Dịch & Tướng Học Cổ Truyền (`js/kinhdich_engine.js`, `js/kinhdich_tuonghoc_data.js`...)
  - Bói Sim & Cân Xương Tính Cốt (`js/boisim_engine.js`, `XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/can_xuong_data.js`...)
  - Tứ Trụ Mệnh Lý (`js/tutru_engine.js`, `js/tutru_assets.js`...)
  - Cẩm nang kiểm duyệt chính sách Google Ads / SEO.

## 2. QUY CHẾ KHÓA TOÀN DIỆN TRANG CHỦ (INDEX.HTML) - BẮT BUỘC HỎI TRƯỚC KHI SỬA
- **ĐỐI TƯỢNG BẢO VỆ:** Tệp trang chủ [**`index.html`**](file:///c:/Users/pc/Desktop/Giao%20Di%E1%BB%87n%20Trang%20Web/index.html) và toàn bộ các tệp tài nguyên, module thuật toán hiển thị trực tiếp trên trang chủ (`js/main.js`, `js/app.js`, `js/nav_search.js`, `css/style.css`...).
- **KHÓA CHẶT MỌI CÔNG THỨC TRANG CHỦ:** Toàn bộ công thức tính toán, tra cứu ngày giờ hoàng đạo, lịch âm dương, tử vi 12 con giáp, quẻ kinh dịch, xem tuổi, bói sim, hiển thị chuyên mục bài viết trên trang chủ là **BẤT BIẾN (LOCKED)**.
- **NGUYÊN TẮC HỎI Ý KIẾN TRƯỚC KHI CAN THIỆP:**
  Khi người dùng hoặc bất kỳ tác vụ nào yêu cầu sửa đổi liên quan đến trang chủ:
  1. **Tuyệt đối KHÔNG ĐƯỢC tự ý sửa code ngay.**
  2. **BẮT BUỘC PHẢI THÔNG BÁO VÀ HỎI Ý KIẾN NGƯỜI DÙNG TRƯỚC:**
     - Nêu rõ lý do vì sao cần chỉnh sửa.
     - Liệt kê chính xác đoạn nội dung, vị trí thẻ HTML hoặc hàm thuật toán bị tác động.
     - Phân tích rủi ro có thể ảnh hưởng đến giao diện hoặc tính năng khác của trang chủ.
  3. **CHỈ ĐƯỢC PHÉP CHỈNH SỬA KHI VÀ CHỈ KHI NGƯỜI DÙNG ĐÃ XÁC NHẬN ĐỒNG Ý.**

## 3. QUY ĐỊNH BẮT BUỘC KHI XÓA HOẶC THAY ĐỔI CÁC FILE HTML / JS ĐANG CHẠY
- **BẮT BUỘC PHẢI THÔNG BÁO VÀ HỎI Ý KIẾN TRƯỚC:** 
  Trước khi xóa, đổi tên hoặc sửa đổi lớn bất kỳ nội dung nào ảnh hưởng đến các tệp giao diện đang chạy (`index.html`, `viet-bai.html`, `Luận Giải Lá Số.html`, `tu-khoa-hot-chen.html`, các tệp trong thư mục `XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/`, `css/`, `js/`):
  - **Phải giải thích rõ ràng lý do cần thay đổi.**
  - **Phải liệt kê chính xác các file/hàm sẽ bị ảnh hưởng.**
  - **Chỉ được thực hiện sau khi Người Dùng (USER) đã xác nhận đồng ý.**

## 4. CƠ CHẾ KHÓA DỮ LIỆU ĐỘC LẬP - CHỐNG MẤT DỮ LIỆU KHI GỠ PHẦN MỀM NGOÀI
- Khi người dùng gỡ cài đặt phần mềm ngoài (như phần mềm 360, CCleaner...) hoặc dọn dẹp trình duyệt:
  - Bộ nhớ trình duyệt (`localStorage`) có thể bị xóa sạch bởi công cụ dọn rác bên thứ ba.
  - Do đó, toàn bộ dữ liệu bài viết chuẩn phải luôn được lưu trữ dự phòng dưới dạng **tệp mã nguồn vật lý cố định** trong thư mục dự án (`js/bai_viet_luu_tru_chuan.js`, `js/original_recovered_articles_backup.json`).
  - Giao diện `viet-bai.html` và `index.html` luôn có cơ chế nạp kép (Dual Layer): Ưu tiên dữ liệu tùy chỉnh, nhưng nếu `localStorage` bị trống thì lập tức nạp trọn vẹn từ tệp lưu trữ chuẩn vật lý trên máy tính, đảm bảo **100% không bao giờ bị mất bài hay mất ảnh**.

## 5. NGUYÊN TẮC BẢO TỒN BÀI VIẾT CẬP NHẬT TRÊN TRANG CHỦ & PHỤC HỒI DỮ LIỆU
- **BẢN CẬP NHẬT TỰ ĐỘNG THÀNH BẢN MẶC ĐỊNH DUY NHẤT:** Khi người dùng đã cập nhật bản mới từ trang viết bài (tiêu đề, nội dung, ảnh), Trang Chủ (`index.html`) BẮT BUỘC phải lưu giữ và biến bản cập nhật mới nhất đó thành bản mặc định hiển thị trên trang chủ. **TUYỆT ĐỐI KHÔNG ĐƯỢC PHÉP CHUYỂN CÁC BÀI VIẾT VỀ BÀI VIẾT MẶC ĐỊNH ĐẦU TIÊN CŨ**.
- **TRANG CHỦ LÀM MỐC PHỤC HỒI CHO TRANG VIẾT BÀI:** Khi người dùng không chủ động thay đổi mà do lỗi phần mềm ngoài (như phần mềm 360, dọn rác trình duyệt...) làm mất dữ liệu, hệ thống phải luôn lấy dữ liệu chuẩn hiển thị trên Trang Chủ làm căn cứ gốc để khôi phục lại trọn vẹn cả nội dung và ảnh cho trang viết bài (`viet-bai.html`).
- **GIỮ GIAO DIỆN TỰ NHIÊN, KHÔNG GẮN HUY HIỆU RƯỜM RÀ:** Trang chủ không cần gắn huy hiệu hay thông báo làm rối mắt người đọc, giữ giao diện sạch sẽ, chuyên nghiệp và chuẩn mực.
- **BẮT BUỘC THÔNG BÁO MỌI THAY ĐỔI:** Khi có bất kỳ sự thay đổi nào liên quan đến công thức thuật số, cấu trúc tệp hoặc nội dung dữ liệu khác với phần nội dung mà người dùng tự cập nhật, trợ lý AI BẮT BUỘC phải thông báo chi tiết và xin phép người dùng trước khi tiến hành.

## 6. NGUYÊN TẮC BẢO VỆ NỘI DUNG ĐANG SOẠN THẢO & ĐỒNG BỘ BÀI VIẾT TUYỆT ĐỐI
- **BẢO VỆ NỘI DUNG NGƯỜI DÙNG ĐANG HOÀN THIỆN:** Tuyệt đối không tự ý ghi đè, cắt ngắn, hoặc làm thay đổi nội dung bài viết người dùng đang trong quá trình soạn thảo và hoàn thiện. Mọi nội dung người dùng cập nhật phải được bảo toàn nguyên vẹn 100%.
- **TÔN TRỌNG LỆNH XÓA CỦA NGƯỜI DÙNG:** Khi người dùng đã chủ động bấm nút "Xóa" trên trang viết bài (`viet-bai.html`), ID của bài được lưu vào danh sách ẩn (`HIDDEN_IDS`). Bộ máy tự động chữa lành (`bai_viet_luu_tru_chuan.js`) và Trang Chủ (`js/main.js`) BẮT BUỘC phải tôn trọng quyết định này, TUYỆT ĐỐI KHÔNG tự động nạp lại hay hiển thị bài đã xóa, trừ khi chính người dùng bấm "Hiện Lại Bài Đã Ẩn".
- **KHO LƯU TRỮ VẬT LÝ CHUẨN CỦA DỰ ÁN:** Tệp `js/original_recovered_articles_backup.json` là kho lưu trữ toàn bộ nội dung bài viết đầy đủ, chuẩn xác, không bao giờ bị mất. Khi người dùng cần tìm lại bất kỳ nội dung bài viết cũ nào, luôn đối chiếu và trích xuất từ kho chuẩn này.
- **NGUYÊN TẮC ĐỒNG BỘ 100% TRANG CHỦ & TRANG VIẾT BÀI:** Số lượng bài viết và danh sách bài trên Trang Chủ (PC & Mobile) và Trang Viết Bài (`viet-bai.html`) phải luôn luôn trùng khớp tuyệt đối, không được có sự chênh lệch.


## 7. NGUYÊN TẮC BẢO TỒN PHIÊN BẢN CHỈNH SỬA CUỐI CÙNG THEO NGÀY GIỜ VÀ KHÓA ĐƯỜNG DẪN ẢNH THỰC TẾ
- **PHIÊN BẢN NGƯỜI DÙNG ĐÃ CHỈNH SỬA XONG LÀ DUY NHẤT:** Bất cứ khi nào Người Dùng (USER) cập nhật và chỉnh sửa xong một bài viết hay phần nào mà đã OK, đó là PHIÊN BẢN CUỐI CÙNG chính thức (theo mốc thời gian giờ và ngày). Tuyệt đối cấm AI lấy lại các phiên bản mã nguồn cũ lỗi thời để ghi đè hay cập nhật ngược lại.
- **KHÔNG ĐƯỢC PHÉP LÀM LỖI ĐƯỜNG DẪN ẢNH:** Mọi đường dẫn ảnh gán vào bài viết phải được đối soát chính xác 100% với tệp vật lý thực tế trên máy (đúng từng ký tự và phần mở rộng: `.jpeg`, `.jpg`, `.png`). Cấm tự ý thay đổi định dạng đuôi ảnh dẫn đến ảnh bị vỡ/lỗi hiển thị.
- **TUYỆT ĐỐI TUÂN THỦ Ý NGƯỜI DÙNG:** Không được tự ý làm theo suy đoán cá nhân. Mọi thao tác phải phục vụ đúng phiên bản mà người dùng đã hoàn thiện.

## 8. KHÓA BẤT BIẾN DỮ LIỆU BÀI VIẾT CHUẨN NGÀY 15/10/2026
- **PHIÊN BẢN CHUẨN XÁC ĐỊNH DUY NHẤT:** Toàn bộ 65 bài viết và hình ảnh trong kho vật lý `js/original_recovered_articles_backup.json` và `js/bai_viet_luu_tru_chuan.js` là phiên bản chuẩn nhất, hoàn thiện nhất ngày 15/10/2026.
- **TÍNH ĐỒNG BỘ TUYỆT ĐỐI:** Mục lục và danh sách bài viết giữa Trang Chủ (`index.html`), Trang Phụ (`XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/index.html`) và Trang Viết Bài (`viet-bai.html`) đã đạt trạng thái đồng nhất 100%.
- **KHÓA BẢO VỆ KHI CHUYỂN SANG PHẦN KHÁC:** Nghiêm cấm mọi hành vi tự ý ghi đè, sửa đổi, xóa bỏ hay làm xáo trộn kho dữ liệu bài viết này khi thực hiện các yêu cầu chỉnh sửa ở các khu vực khác của trang web. AI CHỈ ĐƯỢC PHÉP can thiệp vào đúng thành phần hoặc nội dung mà Người Dùng trực tiếp chỉ định và cung cấp.

## 9. KHÓA BẤT BIẾN TOÀN BỘ DỮ LIỆU & CÔNG THỨC MỤC TỬ VI THEO THÁNG (PC & MOBI) - NGÀY 15/10/2026
- **ĐỐI TƯỢNG KHÓA CHẶT:** Toàn bộ dữ liệu, giao diện, bảng tra cứu, cơ chế tự động chọn Năm xem & Tháng xem, thuật toán phân tích ngày động theo tuổi và kết quả luận giải tử vi theo tháng (18 đầu mục tháng và 5 đầu mục của 4 tuần) trong tệp [XEM TỬ VI & XÔNG ĐẤT ĐẦU NĂM/index.html](file:///c:/Users/pc/Desktop/Giao%20Di%E1%BB%87n%20Trang%20Web/XEM%20T%E1%BB%AC%20VI%20&%20X%C3%94NG%20%C4%90%E1%BA%A4T%20%C4%90%E1%BA%A6U%20N%C4%82M/index.html) trên cả PC và Mobile đã hoàn thiện chuẩn xác 100% vào ngày 15/10/2026.
- **NGUYÊN TẮC BẤT BIẾN:** Nghiêm cấm mọi hành vi tự ý chỉnh sửa, xóa bỏ, ghi đè hoặc thay đổi bất kỳ logic tính toán, dữ liệu hay giao diện nào của phần này nếu KHÔNG CÓ LỆNH TRỰC TIẾP TỪ NGƯỜI DÙNG (USER).


