<?php
/**
 * API ĐỒNG BỘ BÀI VIẾT TỰ ĐỘNG - THUAT SOHUYENHOC.COM.VN
 * Tự động nhận dữ liệu từ trang viet-bai.html và cập nhật cho toàn bộ website
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/data-baiviet.json';
$jsFile   = __DIR__ . '/js/dulieu-baiviet.js';

// GET: Trả về toàn bộ dữ liệu bài viết mới nhất
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(new stdClass(), JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// POST: Nhận bài viết từ viet-bai.html và ghi đè đồng bộ
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $data = json_decode($rawInput, true);
        if ($data !== null && is_array($data)) {
            // Ghi vào file data-baiviet.json
            file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            
            // Cập nhật cả file js/dulieu-baiviet.js để nạp nhanh tức thì cho mọi thiết bị
            if (!is_dir(__DIR__ . '/js')) {
                mkdir(__DIR__ . '/js', 0755, true);
            }
            $jsContent = "(function() {\n  var masterData = " . json_encode($data, JSON_UNESCAPED_UNICODE) . ";\n  window.DULIEU_CHUYENMUC_MASTER = masterData;\n  try {\n    for (var k in masterData) {\n      if (masterData.hasOwnProperty(k)) {\n        var existing = localStorage.getItem(k);\n        if (!existing || existing === '[]' || existing === 'null') {\n          localStorage.setItem(k, typeof masterData[k] === 'string' ? masterData[k] : JSON.stringify(masterData[k]));\n        }\n      }\n    }\n  } catch(e) {}\n})();";
            file_put_contents($jsFile, $jsContent);

            echo json_encode([
                'success' => true,
                'message' => 'Đã đồng bộ tự động lên máy chủ thành công!',
                'time' => date('d/m/Y H:i:s')
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ!'], JSON_UNESCAPED_UNICODE);
    exit;
}
