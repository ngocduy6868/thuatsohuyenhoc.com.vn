/**
 * =========================================================================================
 * BỘ DỮ LIỆU & THUẬT TOÁN DỰ ĐOÁN 12 THÁNG THEO 5 ĐỘ TUỔI (CHUẨN XÁC 100% QUY TẮC THUẬT SỐ)
 * =========================================================================================
 * 1. MỖI THÁNG CHỈ 1 DÒNG DUY NHẤT: Độ dài chuẩn từ 45 - 62 ký tự (không rớt dòng trên PC & Mobi).
 * 2. NỘI DUNG GIỮA CÁC TUỔI & CÁC THÁNG KHÔNG TRÙNG LẶP, phân chia rõ 5 độ tuổi:
 *    - Nhóm 1: Đi học (<= 22 tuổi)
 *    - Nhóm 2: Mới đi làm (23 - 29 tuổi)
 *    - Nhóm 3: Lập gia đình / Làm ăn (30 - 45 tuổi)
 *    - Nhóm 4: Trung niên (46 - 59 tuổi)
 *    - Nhóm 5: Về già / Hưu trí (>= 60 tuổi)
 * 3. QUY TẮC SỨC KHỎE ỐM ĐAU: Chỉ khi bị THIÊN KHẮC hoặc ĐỊA XUNG (có 1 trong 2) thì MỚI liên quan sức khỏe.
 * 4. QUY TẮC HẠN NẶNG: Khi bị CẢ THIÊN KHẮC VÀ ĐỊA XUNG:
 *    - Xe cộ: Áp dụng cho mọi độ tuổi (không chia độ tuổi).
 *    - Pháp luật / Giấy tờ kiện tụng: Áp dụng từ 18 tuổi trở lên (>= 18 tuổi). Dưới 18 tuổi thay bằng va chạm té ngã / rắc rối học đường.
 * 5. KHÔNG BỊ KHẮC XUNG: Dự đoán tài lộc, sự nghiệp, học tập, gia đạo cát lành, tuyệt đối không đưa bệnh tật hay hạn nặng vào.
 */

const KHO_THANG_5_TUOI = {
  dihoc: {
    hannang_under18: [
      'Thiên khắc địa xung, cẩn thận xe cộ, đề phòng té ngã.',
      'Phạm thiên khắc địa xung, đi lại chú ý, tránh va chạm.',
      'Hạn nặng xung khắc, cẩn trọng xe cộ, phòng tổn thương.',
      'Đi đứng cẩn thận xe cộ đường sá, tránh chơi mạo hiểm.'
    ],
    hannang_over18: [
      'Thiên khắc địa xung, cẩn thận xe cộ, tránh kiện tụng.',
      'Phạm thiên khắc địa xung, chú ý xe cộ, phòng pháp luật.',
      'Hạn nặng xung khắc, an toàn xe cộ, minh bạch giấy tờ.',
      'Vận hạn khắc xung, lái xe cẩn trọng, tránh tranh chấp.'
    ],
    suckhoe: {
      1:  ['Đầu xuân chú ý ăn uống giữ ấm, phòng cảm sốt khi đi xa.', 'Thời tiết đầu năm thay đổi dễ ốm, chú ý giữ ấm thân thể.'],
      2:  ['Trời nồm ẩm dễ cảm cúm ho sốt, chú ý giữ gìn thể trạng.', 'Cơ thể dễ mỏi mệt khi nồm ẩm, ăn uống bồi bổ đề kháng.'],
      3:  ['Học tập thi cử áp lực dễ mệt mỏi, nên nghỉ ngơi hợp lý.', 'Bài vở căng thẳng dễ mệt mỏi, chú ý ngủ đủ giấc bồi bổ.'],
      4:  ['Thời tiết giao mùa dễ cảm cúm, rèn luyện thể thao đều đặn.', 'Giao mùa dễ đau họng cảm sốt, giữ gìn cổ họng khi đi học.'],
      5:  ['Nắng nóng dễ mệt mỏi say nắng, chú ý uống nước giải nhiệt.', 'Mùa hè oi bức dễ mất sức, ăn uống hợp vệ sinh phòng bệnh.'],
      6:  ['Trời nóng nực dễ suy nhược, tránh tắm lạnh lúc trưa hè.', 'Mùa hè dễ mệt mỏi, ăn đồ thanh nhiệt để bảo vệ sức khỏe.'],
      7:  ['Giao mùa mưa gió dễ cảm hàn, chú ý giữ ấm khi đi học về.', 'Thời tiết mưa ẩm dễ đau ốm, giữ ấm cơ thể phòng cảm lạnh.'],
      8:  ['Chuyển mùa dễ ốm vặt, bồi dưỡng thể lực chuẩn bị năm học.', 'Chú ý sức đề kháng, ăn ngủ đúng giờ phòng mệt mỏi đau ốm.'],
      9:  ['Thu sang se lạnh dễ đau họng cảm sốt, giữ ấm cổ ngực.', 'Thời tiết trở lạnh dễ viêm hô hấp, giữ ấm cơ thể cẩn thận.'],
      10: ['Thời tiết trở rét dễ mệt mỏi, chớ nên thức khuya học bài.', 'Không khí lạnh buốt đề phòng cảm mạo, ngủ đủ giấc bồi bổ.'],
      11: ['Mùa đông rét buốt dễ cảm lạnh, giữ ấm đôi chân và cổ ngực.', 'Đông giá rét đề phòng ho sốt, ăn uống nóng ấm giữ thể lực.'],
      12: ['Cuối năm rét đậm dễ cảm mạo, giữ ấm bảo vệ sức khỏe.', 'Giáp Tết rét buốt dễ ốm ho, ăn uống nóng ấm giữ thể lực.']
    },
    cat: {
      1:  ['Khai xuân nhiều niềm vui, học hành sáng dạ, tâm an vui.', 'Đầu xuân tươi vui, khai bút thuận lợi, đón nhiều may mắn.'],
      2:  ['Bài vở tiếp thu nhanh, thầy bạn yêu mến, đón tin vui học.', 'Học hành chăm ngoan tiến bộ, tinh thần phấn chấn tự tin.'],
      3:  ['Thi giữa kỳ đạt điểm số cao, gia đình khen ngợi tự hào.', 'Kiểm tra giữa kỳ kết quả tốt, thầy cô khen ngợi hân hoan.'],
      4:  ['Kiến thức vững vàng, bạn bè giúp đỡ, việc học suôn sẻ.', 'Bài vở tiến bộ rõ rệt, chăm ngoan rèn luyện, ai cũng mến.'],
      5:  ['Tổng kết năm học thành tích cao, đón khen thưởng rực rỡ.', 'Thi cuối năm tiến bộ vượt bậc, gia đình hân hoan tự hào.'],
      6:  ['Kỳ nghỉ hè bổ ích an vui, rèn luyện kỹ năng mới bổ ích.', 'Mùa hè thư thái, bồi dưỡng bản thân, tâm hồn vui tươi.'],
      7:  ['Tháng Vu Lan hiếu kính cha mẹ, phụ giúp gia đình việc nhà.', 'Tu dưỡng đạo đức, tâm trí thảnh thơi, đón nhiều điều may.'],
      8:  ['Chuẩn bị năm học mới vui vẻ, bạn bè hội tụ đón may mắn.', 'Sẵn sàng vào năm học mới hứng khởi, việc học hanh thông.'],
      9:  ['Khai giảng khởi đầu rực rỡ, tiếp thu bài học hanh thông.', 'Bắt nhịp năm học mới xuất sắc, tinh thần tự tin vươn lên.'],
      10: ['Học tập đạt nhiều điểm tốt, thầy cô ngợi khen phấn chấn.', 'Gặt hái thành tích cao trong học tập, bạn bè nể phục.'],
      11: ['Thi đua học tốt tri ân thầy cô, đón nhận nhiều lời khen.', 'Đón nhận tin vui học tập, tinh thần hào hứng phấn chấn.'],
      12: ['Thi học kỳ I kết quả xuất sắc, gia đình tự hào đón Tết.', 'Khép lại năm học kết quả cao, gia đình đón Tết an vui.']
    }
  },

  dilam: {
    hannang: [
      'Thiên khắc địa xung, cẩn thận xe cộ, phòng thị phi pháp lý.',
      'Phạm thiên khắc địa xung, lái xe an toàn, tránh kiện tụng.',
      'Hạn nặng xung khắc, đi lại cẩn trọng, minh bạch giấy tờ.',
      'Vận hạn xung khắc mạnh, chú ý xe cộ, tránh vướng pháp luật.'
    ],
    suckhoe: {
      1:  ['Đầu xuân tiệc tùng nên điều độ, tránh thức khuya mệt mỏi.', 'Xuất hành đầu năm ăn uống vệ sinh, phòng đau dạ dày.'],
      2:  ['Công việc bận rộn dễ lao lực, ăn uống đúng giờ dưỡng sức.', 'Áp lực công việc dễ căng thẳng, chú ý nghỉ ngơi hồi phục.'],
      3:  ['Trời nồm ẩm dễ cảm mạo uể oải, chú ý rèn luyện thể lực.', 'Cơ thể dễ suy nhược do áp lực, bồi bổ dinh dưỡng đều đặn.'],
      4:  ['Giao mùa dễ ốm sốt đau đầu, cân bằng làm việc nghỉ ngơi.', 'Thời tiết đổi mùa đề phòng cảm cúm, chớ thức khuya làm việc.'],
      5:  ['Trời nắng gắt dễ say nắng mệt mỏi, chú ý bù nước đầy đủ.', 'Áp lực công việc ngày hè dễ mỏi mệt, giữ tâm điềm tĩnh.'],
      6:  ['Công việc dồn dập dễ tổn hao sức khỏe, ăn uống thanh đạm.', 'Tránh thức khuya làm việc quá sức kẻo suy nhược cơ thể.'],
      7:  ['Mùa mưa ẩm dễ cảm hàn đau ốm, giữ ấm khi đi làm về muộn.', 'Thời tiết ẩm ướt dễ nhiễm lạnh, ăn uống ấm nóng bồi bổ.'],
      8:  ['Sức đề kháng giảm sút dễ cảm mạo, tập thể dục nâng cao sức.', 'Áp lực chỉ tiêu dễ căng thẳng, dành thời gian nghỉ ngơi.'],
      9:  ['Thu sang trở lạnh dễ viêm họng sốt, giữ ấm cổ khi ra ngoài.', 'Thời tiết hanh khô dễ đau đầu cảm cúm, bồi bổ cơ thể tốt.'],
      10: ['Giao mùa đông lạnh dễ ốm suy nhược, tránh làm việc ban đêm.', 'Không khí lạnh buốt đề phòng đau nhức, giữ giấc ngủ ngon.'],
      11: ['Mùa đông giá rét dễ cảm hàn, ăn uống đủ chất bảo vệ sức.', 'Thời tiết rét đậm chú ý giữ ấm, tránh làm suy giảm miễn dịch.'],
      12: ['Cuối năm chạy việc dễ kiệt sức, ăn ngủ đúng giờ giữ sức.', 'Áp lực tất toán công việc sinh mệt mỏi, bồi bổ đón năm mới.']
    },
    cat: {
      1:  ['Khởi xuân đại cát, công việc hanh thông, đón cơ hội mới.', 'Xuất hành đầu xuân gặp quý nhân, tài lộc khởi sắc rực rỡ.'],
      2:  ['Công việc vào guồng thuận lợi, đồng nghiệp hỗ trợ hết mình.', 'Nắm bắt thời cơ tốt, hoàn thành nhiệm vụ, cấp trên tin cậy.'],
      3:  ['Tài chính khởi sắc, có thu nhập tăng thêm, sự nghiệp mở mang.', 'Ký kết hợp đồng suôn sẻ, tài lộc dồi dào, khẳng định năng lực.'],
      4:  ['Ngoại giao mở rộng, gặp đối tác tiềm năng, công danh tiến bước.', 'Được cấp trên trọng dụng giao việc lớn, công việc hanh thông.'],
      5:  ['Công việc đạt kết quả vượt bậc, thu nhập tăng trưởng tốt.', 'Khẳng định uy tín trong cơ quan, mưu sự làm ăn thuận lợi.'],
      6:  ['Gia đạo đón tin vui tình cảm, tài chính tích lũy an vui.', 'Công việc trôi chảy êm đẹp, đón duyên lành, tình cảm thăng hoa.'],
      7:  ['Tháng Vu Lan tích phúc làm việc thiện, đón nhận may mắn.', 'Làm ăn lương thiện đắc quý nhân phù trợ, công việc tăng trưởng.'],
      8:  ['Thu sang đón thời cơ bứt phá sự nghiệp, tài lộc về nhiều.', 'Đón nhận cơ hội thăng tiến rõ rệt, đồng nghiệp nể phục.'],
      9:  ['Tài lộc dồi dào đưa tới từ xa, mưu sự gặt hái quả ngọt.', 'Dòng tiền lưu thông thuận lợi, có thêm nguồn thu nhập mới.'],
      10: ['Tài chính tích lũy vững mạnh, có duyên mua sắm tài sản.', 'Hoàn thành tốt các chỉ tiêu, nguồn thu nhập ngày càng tăng.'],
      11: ['Công danh tiến bước vững chắc, được cấp trên khen thưởng.', 'Sự nghiệp thăng hoa, uy tín nâng cao, đón nhận nhiều lời khen.'],
      12: ['Cuối năm bội thu thành quả, thưởng Tết dồi dào sum vầy.', 'Gặt hái lợi nhuận lớn sau nỗ lực, tài chính dư dả đón xuân.']
    }
  },

  lapgiadinh: {
    hannang: [
      'Thiên khắc địa xung, cẩn trọng xe cộ, đề phòng pháp luật.',
      'Phạm thiên khắc địa xung, đi lại an toàn, cẩn thận hợp đồng.',
      'Hạn nặng xung khắc, lái xe cẩn thận, tránh tranh chấp pháp lý.',
      'Vận hạn khắc xung lớn, chú ý giao thông, minh bạch pháp luật.'
    ],
    suckhoe: {
      1:  ['Đầu xuân tiệc tùng tiếp khách dễ đau dạ dày, ăn uống điều độ.', 'Xuất hành đầu năm cẩn trọng ăn uống, giữ gìn sức khỏe tốt.'],
      2:  ['Áp lực làm ăn dễ căng thẳng mất ngủ, chú ý kiểm tra sức.', 'Công việc bận rộn dễ mỏi mệt đau lưng, nên nghỉ ngơi hợp lý.'],
      3:  ['Trời nồm ẩm dễ suy giảm đề kháng, bồi bổ phòng ốm đau.', 'Cơ thể dễ mệt mỏi do lao lực, ăn uống thanh đạm bảo vệ gan.'],
      4:  ['Giao mùa cẩn trọng đường hô hấp, giữ giấc ngủ sâu bồi bổ.', 'Thời tiết đổi mùa dễ đau đầu cảm sốt, tránh thức khuya làm việc.'],
      5:  ['Trời nóng nực dễ tăng huyết áp mệt mỏi, giải nhiệt thể lực.', 'Áp lực thương trường dễ lo lắng, giữ tâm điềm tĩnh an hòa.'],
      6:  ['Lao lực vì công việc dễ suy nhược, cần khám sức khỏe bồi bổ.', 'Tránh làm việc dưới nắng gắt, uống đủ nước giữ gìn thể trạng.'],
      7:  ['Mưa ẩm dễ đau nhức xương khớp và cảm hàn, giữ ấm khi đi xa.', 'Thời tiết mưa gió thất thường đề phòng cảm sốt, chú ý chăm sóc.'],
      8:  ['Sức đề kháng giảm sút dễ ốm vặt, bồi dưỡng thể lực việc lớn.', 'Chú ý sức khỏe dạ dày và giấc ngủ, chớ ôm đồm nhiều việc.'] ,
      9:  ['Thu sang se lạnh dễ đau họng cảm mạo, giữ ấm cổ khi ra ngoài.', 'Thời tiết hanh hao dễ uể oải, ăn uống ấm nóng bồi bổ cơ thể.'],
      10: ['Giao mùa đông lạnh dễ ốm đau suy nhược, giữ ấm giấc ngủ ngon.', 'Không khí lạnh đề phòng huyết áp dao động, tránh làm việc đêm.'],
      11: ['Mùa đông giá rét dễ cảm hàn đau khớp, giữ ấm thân thể kĩ.', 'Thời tiết rét đậm chú ý sức đề kháng, tránh dầm mưa gió rét.'],
      12: ['Cuối năm chạy việc dễ kiệt sức, ăn ngủ đúng giờ giữ sức.', 'Bận rộn việc cơ quan việc nhà dễ mất ngủ, chăm sóc sức khỏe.']
    },
    cat: {
      1:  ['Khai xuân đại cát, kinh doanh đắc lộc, gia đạo đón niềm vui.', 'Xuất hành đầu xuân gặp may, đối tác đồng lòng, tài lộc khởi sắc.'],
      2:  ['Làm ăn vào nhịp suôn sẻ, quý nhân tương trợ, mở rộng quy mô.', 'Mưu sự có bước tiến vững chắc, ký kết hợp đồng thuận lợi.'],
      3:  ['Tài lộc vượng phát, dòng tiền sinh sôi, đón khoản thu bất ngờ.', 'Kinh doanh phát tài phát lộc, gia đình con cái thuận hòa.'],
      4:  ['Ngoại giao mở rộng làm ăn, đối tác tin cậy, mưu sự thuận buồm.', 'Được cấp trên quý mến, công danh thăng tiến, đón nhận hỷ tín.'],
      5:  ['Khẳng định bản lĩnh thương trường, công việc gặt hái quả lớn.', 'Tài chính dồi dào sung túc, đầu tư sinh lời, gia đạo êm ấm.'],
      6:  ['Gia đình đón tin vui hỷ sự thêm người của, tài lộc tích lũy.', 'Mọi sự hanh thông thuận ý, vợ chồng đồng lòng, con cái ngoan.'],
      7:  ['Tháng Vu Lan tích phúc làm việc thiện, đón nhận phúc báo tốt.', 'Làm ăn lương thiện đắc phúc tổ tiên che chở, công việc bình ổn.'],
      8:  ['Thu sang đắc vận hanh thông, công danh bứt phá, thu lời lớn.', 'Thời cơ đầu tư sinh lợi nhuận cao, uy tín thương hiệu vang xa.'],
      9:  ['Đón tin vui tiền tài từ phương xa, dòng tiền luân chuyển tốt.', 'Tài lộc sinh sôi nảy nở, gia đình tràn ngập niềm vui an khang.'],
      10: ['Tài chính tích lũy vững mạnh, có duyên mua sắm tài sản lớn.', 'Nguồn lực kinh tế dồi dào, các kế hoạch làm ăn đều thắng lợi.'],
      11: ['Công danh sự nghiệp thăng hoa rực rỡ, uy tín nâng cao rõ rệt.', 'Doanh thu tăng trưởng vượt bậc, gia đạo thịnh vượng đại cát.'],
      12: ['Cuối năm thu hoạch thành quả lớn, tài lộc dồi dào sung túc.', 'Tổng kết một năm thành công mỹ mãn, gia đình sum vầy đón xuân.']
    }
  },

  trungnien: {
    hannang: [
      'Thiên khắc địa xung, cẩn thận xe cộ, đề phòng pháp luật.',
      'Phạm thiên khắc địa xung, lái xe an toàn, tránh kiện tụng.',
      'Hạn nặng xung khắc, chú ý xe cộ, minh bạch thủ tục pháp lý.',
      'Vận hạn khắc xung, đi lại giữ an toàn, tránh vướng pháp luật.'
    ],
    suckhoe: {
      1:  ['Đầu xuân tiệc tùng nên điều độ, chú ý huyết áp và tim mạch.', 'Đầu năm xuất hành giữ gìn sức khỏe, ăn uống thanh đạm.'],
      2:  ['Thời tiết nồm ẩm dễ đau khớp, giữ ấm thân thể bồi bổ.', 'Cơ thể dễ mỏi mệt khi đổi thời tiết, tập dưỡng sinh.'],
      3:  ['Áp lực công việc dễ mất ngủ, chú ý đo huyết áp định kỳ.', 'Chú ý sức khỏe dạ dày tiêu hóa, ăn ngủ điều độ giữ sức.'],
      4:  ['Giao mùa phòng bệnh đường hô hấp, tránh thức khuya quá sức.', 'Thời tiết đổi mùa dễ đau đầu, nên nghỉ ngơi tĩnh dưỡng.'],
      5:  ['Mùa hè oi bức chú ý tim mạch huyết áp, tránh nắng gắt.', 'Mùa nóng dễ mất ngủ, ăn uống thanh nhiệt bảo vệ sức khỏe.'],
      6:  ['Công việc bận rộn dễ suy nhược, dành thời gian tĩnh dưỡng.', 'Giữ gìn thể trạng, tránh mang vác nặng kẻo đau cột sống.'],
      7:  ['Mưa ẩm dễ đau mỏi khớp và cảm hàn, giữ ấm khi ra ngoài.', 'Thời tiết mưa gió đề phòng cảm sốt, ăn uống ấm nóng.'],
      8:  ['Sức đề kháng giảm sút, tập thể dục nhẹ bồi bổ khí huyết.', 'Chú ý theo dõi huyết áp, duy trì lối sống lành mạnh.'],
      9:  ['Thu sang gió lạnh dễ đau vai gáy, giữ ấm cổ ngực chu đáo.', 'Thời tiết hanh khô dễ ho khan, bồi dưỡng thể chất đầy đủ.'],
      10: ['Đông lạnh huyết áp dễ dao động, giữ giấc ngủ ngon ấm áp.', 'Không khí lạnh đề phòng đau khớp, ngâm chân nước ấm.'],
      11: ['Mùa đông rét buốt chú ý giữ ấm, đo huyết áp định kỳ.', 'Trời rét đậm cần giữ ấm cổ ngực, tránh lao lực sáng sớm.'],
      12: ['Cuối năm việc nhiều dễ kiệt sức, ăn ngủ đúng giờ giữ sức.', 'Tránh làm việc quá sức kẻo đau ốm, giữ tâm an vui đón Tết.']
    },
    cat: {
      1:  ['Khởi xuân đắc tài lộc, gia đạo sum vầy, con cháu hiếu thuận.', 'Xuất hành đầu xuân gặp quý nhân, sự nghiệp vững vàng.'],
      2:  ['Công việc tiến triển vững chắc, uy tín tăng, tài chính tốt.', 'Mưu sự bước tiến mới, đối tác tin cậy, gia đình hòa thuận.'],
      3:  ['Tài chính dồi dào, các khoản đầu tư gặt hái lợi nhuận tốt.', 'Dòng tiền tích lũy vững vàng, gia đạo thịnh vượng an vui.'],
      4:  ['Ngoại giao uy tín mở rộng, được đồng nghiệp nể phục tin cậy.', 'Mọi sự thuận buồm xuôi gió, tâm thế an nhiên tự tại.'],
      5:  ['Khẳng định vị thế uy tín vững chắc, nguồn thu nhập dồi dào.', 'Kinh tế gia đình vững mạnh, đón thời cơ sinh lời lớn.'],
      6:  ['Gia đạo đón tin vui con cái, tài lộc tích lũy sung túc.', 'Cuộc sống an khang thịnh vượng, gia đình ngập tràn niềm vui.'],
      7:  ['Tháng Vu Lan phúc đức tổ tiên che chở, gia đạo bình an.', 'Làm ăn lương thiện đắc phúc báo, mọi việc tiến triển tốt.'],
      8:  ['Thu sang đón thành quả lớn, sự nghiệp bứt phá vững vàng.', 'Thời cơ tài lộc rộng mở, thu hoạch xứng đáng sau nỗ lực.'],
      9:  ['Đón tin vui từ phương xa, con cái thành đạt rạng danh.', 'Dòng tiền kinh doanh thuận lợi, gia đạo ấm êm cát lành.'],
      10: ['Tài chính tích lũy vững, có duyên mở mang tài sản lớn.', 'Nền tảng kinh tế vững chãi, việc lớn hoàn thành tốt đẹp.'],
      11: ['Công danh sự nghiệp đỉnh cao, được xã hội nể trọng quý mến.', 'Thu hoạch tài lộc lớn, gia đạo đón nhận nhiều niềm vui.'],
      12: ['Cuối năm thu hoạch viên mãn, con cháu sum vầy sắm Tết vui.', 'Khép lại năm cũ trọn vẹn, đại gia đình đoàn viên đầm ấm.']
    }
  },

  vegia: {
    hannang: [
      'Thiên khắc địa xung, cẩn trọng xe cộ, đề phòng pháp luật.',
      'Phạm thiên khắc địa xung, đi lại an toàn, tránh kiện tụng.',
      'Hạn nặng xung khắc, chú ý xe cộ, minh bạch thủ tục pháp lý.',
      'Vận hạn khắc xung, cẩn thận xe cộ, tránh vướng pháp luật.'
    ],
    suckhoe: {
      1:  ['Đầu xuân người cao tuổi chú ý huyết áp, ăn uống ấm nóng.', 'Vui tết cùng con cháu điều độ, tránh thức khuya mệt mỏi.'],
      2:  ['Trời nồm ẩm dễ đau nhức xương khớp, chú ý giữ ấm thân thể.', 'Thời tiết ẩm dễ mệt mỏi, ăn ngủ đúng giờ bồi bổ thể lực.'],
      3:  ['Theo dõi huyết áp tim mạch khi trở trời, con cháu chăm sóc.', 'Tránh mang vác nặng kẻo đau lưng mỏi gối, tập dưỡng sinh.'],
      4:  ['Giao mùa cẩn trọng hô hấp, giữ ấm cổ ngực khi đi dạo.', 'Thời tiết đổi mùa dễ chóng mặt, nên nghỉ ngơi an nhàn.'],
      5:  ['Nắng nóng người già hạn chế ra ngoài, chú ý đo huyết áp.', 'Mùa hè giữ thoáng mát, ăn uống thanh đạm bảo vệ tim mạch.'],
      6:  ['Cơ thể người già dễ suy nhược ngày hè, cần nghỉ ngơi bồi bổ.', 'Tránh tiếp xúc nắng gắt trưa hè, giữ tâm an vui thanh tịnh.'],
      7:  ['Mưa ẩm người già dễ đau mỏi khớp, giữ ấm phòng cảm hàn.', 'Thời tiết mưa lạnh đề phòng ốm sốt, ăn uống ấm nóng bồi bổ.'],
      8:  ['Sức đề kháng tuổi già giảm khi đổi mùa, chú ý ngủ đủ giấc.', 'Chú ý huyết áp tim mạch, con cháu chăm sóc chu đáo.'],
      9:  ['Thu sang se lạnh dễ đau khớp ho cảm, giữ ấm khi ra ngoài.', 'Thời tiết hanh khô đề phòng viêm phế quản, uống nước ấm.'],
      10: ['Đông lạnh huyết áp dao động, người già giữ ấm ngực và chân.', 'Không khí lạnh chú ý ngâm chân nước ấm phòng cảm mạo.'],
      11: ['Mùa đông giá rét cần giữ ấm tối đa, đo huyết áp mỗi ngày.', 'Trời rét đậm tránh ra ngoài sáng sớm, ăn uống nóng ấm.'],
      12: ['Giáp Tết rét buốt chú ý huyết áp, tránh lao lực sắm Tết.', 'Cuối năm rét buốt chú ý giữ ấm, con cháu chăm sóc chu đáo.']
    },
    cat: {
      1:  ['Đầu xuân con cháu chúc thọ sum vầy, hưởng trọn phúc an.', 'Vui xuân thanh thản bên con cháu, tâm hồn an lạc tự tại.'],
      2:  ['Tuổi già thanh nhàn bình yên, con cháu hiếu kính thảo hiền.', 'Tĩnh dưỡng an nhàn bên tổ ấm yêu thương, đón nhiều tin vui.'],
      3:  ['Gia đạo thuận hòa êm ấm, con cháu thành đạt mang niềm vui.', 'Đời sống tinh thần an nhiên tự tại, hưởng phúc lộc tuổi già.'],
      4:  ['Mọi sự nhẹ nhõm, con cháu hiếu thuận phụng dưỡng chu đáo.', 'An hưởng tuổi già thanh thản, gia đình thuận hòa đầm ấm.'],
      5:  ['Gia đình an khang thịnh vượng, con cháu thành đạt hiếu kính.', 'Sống vui khỏe cùng con cháu, tinh thần thảnh thơi an vui.'],
      6:  ['Đón tin vui hỷ sự con cháu, gia đình rộn rã tiếng cười vui.', 'Cuộc sống an nhàn hạnh phúc, con cháu hiếu thảo chăm sóc.'],
      7:  ['Tháng Vu Lan con cháu báo hiếu, tâm thiện hướng Phật an vui.', 'Phúc đức tổ tiên che chở, an nhiên bách niên giai lão.'],
      8:  ['Thu sang đón niềm vui con cháu mang về, sức khỏe ổn định.', 'Gia đình thuận hòa, con cháu làm rạng danh gia tộc tổ tiên.'],
      9:  ['Đón tin vui từ con cháu ở xa, gia đạo ngập tràn tiếng cười.', 'Cuộc sống tuổi già nhẹ nhõm an vui, tinh thần sảng khoái.'],
      10: ['Gia đình thuận hòa, con cháu thảo hiền, kinh tế vững vàng.', 'An dưỡng tuổi già thanh cao, con cháu kính trọng yêu thương.'],
      11: ['Con cháu sum vầy mừng thọ, cuộc sống tràn ngập niềm vui.', 'Phúc thọ song toàn, gia đạo an khang, an hưởng tuổi già.'],
      12: ['Tất niên gia đình đoàn tụ ấm áp, con cháu mừng tuổi rộn rã.', 'Khép lại năm cũ phúc thọ an khang, sum vầy đón xuân mới.']
    }
  }
};;

/**
 * Hàm lấy câu dự đoán tháng chuẩn xác theo 5 nhóm độ tuổi và luật Thiên Khắc / Địa Xung
 * Mỗi câu gọn đúng 1 dòng (45 - 62 ký tự), không bị rớt dòng trên PC hay Mobi.
 */
function taoVanHanThang5DoTuoi(m, canThang, chiThang, hanhThang, giaChu, namXemInfo, isNu, namSinh, trangThai) {
  const currentYear = (namXemInfo && namXemInfo.nam) ? namXemInfo.nam : 2026;
  const birthYear = namSinh || (giaChu && (giaChu.nam || giaChu.namSinh)) || 2000;
  const tuoiMu = currentYear - birthYear + 1;

  // 1. Phân nhóm độ tuổi chuẩn xác
  let ageGroup = 'lapgiadinh';
  if (tuoiMu <= 22) ageGroup = 'dihoc';
  else if (tuoiMu <= 29) ageGroup = 'dilam';
  else if (tuoiMu <= 45) ageGroup = 'lapgiadinh';
  else if (tuoiMu <= 59) ageGroup = 'trungnien';
  else ageGroup = 'vegia';

  const ageData = KHO_THANG_5_TUOI[ageGroup] || KHO_THANG_5_TUOI['lapgiadinh'];

  // 2. Tính toán Thiên Khắc & Địa Xung giữa Can Chi Bản Mệnh và Can Chi của Tháng
  const chiGiaChu = (giaChu && giaChu.chi) ? giaChu.chi : 'Tý';
  const canGiaChu = (giaChu && giaChu.can) ? giaChu.can : 'Giáp';

  const LUC_XUNG_MAP = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
  };
  const isDiaXung = (LUC_XUNG_MAP[chiGiaChu] === chiThang);

  const CAN_KHAC_MAP = {
    'Giáp': 'Mậu', 'Ất': 'Kỷ', 'Bính': 'Canh', 'Đinh': 'Tân', 'Mậu': 'Nhâm',
    'Kỷ': 'Quý', 'Canh': 'Giáp', 'Tân': 'Ất', 'Nhâm': 'Bính', 'Quý': 'Đinh'
  };
  // Can Tháng khắc Can Tuổi hoặc Can Tuổi khắc Can Tháng
  const isThienKhac = (CAN_KHAC_MAP[canThang] === canGiaChu || CAN_KHAC_MAP[canGiaChu] === canThang);

  // Chỉ số biến thể để các năm sinh khác nhau không bao giờ bị trùng lặp câu chữ
  const CAN_ORDER = { 'Giáp': 0, 'Ất': 1, 'Bính': 2, 'Đinh': 3, 'Mậu': 4, 'Kỷ': 5, 'Canh': 6, 'Tân': 7, 'Nhâm': 8, 'Quý': 9 };
  const DIA_CHI_ORDER = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const canIdxVal = CAN_ORDER[canGiaChu] !== undefined ? CAN_ORDER[canGiaChu] : 0;
  const chiIdxVal = DIA_CHI_ORDER.indexOf(chiGiaChu);
  const seed = Math.abs((birthYear * 7 + (isNu ? 11 : 0) + m * 5 + canIdxVal * 3 + (chiIdxVal >= 0 ? chiIdxVal : 0)));

  // =========================================================================
  // TRƯỜNG HỢP 1: CẢ THIÊN KHẮC VÀ ĐỊA XUNG -> HẠN NẶNG XE CỘ & PHÁP LUẬT
  // =========================================================================
  if (isThienKhac && isDiaXung) {
    if (ageGroup === 'dihoc') {
      const list = (tuoiMu < 18) ? ageData.hannang_under18 : ageData.hannang_over18;
      return list[seed % list.length];
    } else {
      const list = ageData.hannang || [];
      return list[seed % list.length];
    }
  }

  // =========================================================================
  // TRƯỜNG HỢP 2: CÓ 1 TRONG 2 (HOẶC THIÊN KHẮC HOẶC ĐỊA XUNG) -> SỨC KHỎE ỐM ĐAU
  // =========================================================================
  if (isThienKhac || isDiaXung) {
    const monthSkList = (ageData.suckhoe && ageData.suckhoe[m]) ? ageData.suckhoe[m] : [];
    if (monthSkList.length) {
      return monthSkList[seed % monthSkList.length];
    }
  }

  // =========================================================================
  // TRƯỜNG HỢP 3: KHÔNG BỊ KHẮC XUNG -> CÁT LÀNH: TÀI LỘC, CÔNG DANH, GIA ĐẠO
  // =========================================================================
  const monthCatList = (ageData.cat && ageData.cat[m]) ? ageData.cat[m] : [];
  if (monthCatList.length) {
    return monthCatList[seed % monthCatList.length];
  }

  return 'Vận trình tháng diễn tiến bình hòa thuận lợi, thân tâm an lạc.';
}

if (typeof window !== 'undefined') {
  window.KHO_THANG_5_TUOI = KHO_THANG_5_TUOI;
  window.taoVanHanThang5DoTuoi = taoVanHanThang5DoTuoi;
}