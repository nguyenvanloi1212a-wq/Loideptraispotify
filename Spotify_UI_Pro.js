// =======================================================
// Spotify UI Pro - Mở Khóa Chọn Bài & Dọn Sạch Giao Diện
// Phiên bản Cao Cấp phát triển bởi Lợi Đẹp Trai
// =======================================================
const url = $request.url;
if (!$response || !$response.body) $done({});
let body = $response.body;

try {
    // Nhắm mục tiêu vào các luồng giao diện danh sách nhạc
    if (url.includes("artistview") || url.includes("album-entity-view") || url.includes("playlist")) {
        
        // Sử dụng thuật toán quét chuỗi thông minh để bẻ khóa cơ chế phát nhạc
        body = body.replace(/"play_strategy":"SHUFFLE"/g, '"play_strategy":"ON_DEMAND"');
        body = body.replace(/"shuffle_only":true/g, '"shuffle_only":false');
        body = body.replace(/"can_play_on_demand":false/g, '"can_play_on_demand":true');
        
        let obj = JSON.parse(body);
        
        // Quét sâu và xóa bỏ hoàn toàn các Banner quảng cáo, gợi ý nâng cấp (Upsell/Promo)
        if (obj.components) {
            obj.components = obj.components.filter(item => {
                return !item.id?.includes("upsell") && !item.type?.includes("PROMO");
            });
        }
        
        $done({ body: JSON.stringify(obj) });
    } else {
        $done({});
    }
} catch (e) {
    // Trả về dữ liệu gốc nếu xảy ra lỗi phân tích cú pháp JSON
    $done({});
}
