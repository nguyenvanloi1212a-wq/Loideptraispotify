// =======================================================
// Spotify Core Pro - Kích Hoạt Tính Năng & Diệt Quảng Cáo
// Phiên bản Cao Cấp phát triển bởi Lợi Đẹp Trai
// =======================================================
const url = $request.url;
if (!$response || !$response.body) $done({});
let body = $response.body;

try {
    // 1. Khử sạch quảng cáo âm thanh và banner quảng cáo ẩn
    if (url.includes("ad-logic")) {
        let obj = JSON.parse(body);
        obj.ads = [];
        obj.ad_slots = [];
        obj.gated_attributes = [];
        if (obj.payload) obj.payload = {};
        $done({ body: JSON.stringify(obj) });
    } 
    // 2. Ép hệ thống mở khóa Premium hoàn toàn
    else if (url.includes("bootstrap") || url.includes("customize")) {
        let obj = JSON.parse(body);
        
        if (obj.ucs_response_wrapper?.ucs_response?.resolve_trends) {
            let trends = obj.ucs_response_wrapper.ucs_response.resolve_trends;
            trends.forEach(trend => {
                if (trend.customization) {
                    trend.customization.forEach(item => {
                        // Kích hoạt full tính năng trả phí và chất lượng âm thanh cao
                        if (["is_premium", "premium_consumer", "can_play_on_demand", "streaming_quality_hifi"].includes(item.name)) {
                            item.value = "true";
                        }
                        // Vô hiệu hóa tính năng ép trộn bài và quảng cáo
                        if (["ads_enabled", "shuffle_restricted"].includes(item.name)) {
                            item.value = "false";
                        }
                    });
                }
            });
        }
        
        // Cấu hình bổ sung phòng hờ các phiên bản Spotify mới thay đổi cấu trúc
        if (obj.product) obj.product = "premium";
        if (obj.type) obj.type = "premium";
        if (obj.features) {
            obj.features.is_premium = true;
            obj.features.ads_enabled = false;
        }

        $done({ body: JSON.stringify(obj) });
    } else {
        $done({});
    }
} catch (e) {
    // Bộ bọc an toàn: Nếu có lỗi cấu trúc dữ liệu, trả về gói tin gốc chống crash app
    $done({});
}
