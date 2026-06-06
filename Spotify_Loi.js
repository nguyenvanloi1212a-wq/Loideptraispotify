// ========= Tối ưu hoá Spotify Premium bởi Lợi Đẹp Trai ========= //
var url = $request.url;
var obj = null;

try {
  if ($response && $response.body) {
    obj = JSON.parse($response.body);
  }
} catch (e) {
  // Để trống ở đây, không gọi $done để tránh trùng lặp lệnh kết thúc
}

if (obj) {
  if (url.includes("ad-logic")) {
    // Triệt tiêu hoàn toàn cấu trúc quảng cáo ẩn và banner
    obj = { "ads": [], "ad_slots": [], "gated_attributes": [] };
  } else if (url.includes("bootstrap")) {
    // Ép hệ thống mở khóa tính năng Premium
    if (obj.ucs_response_wrapper && obj.ucs_response_wrapper.ucs_response) {
      let patches = obj.ucs_response_wrapper.ucs_response.resolve_trends || [];
      patches.forEach(p => {
        if (p.customization) {
          p.customization.forEach(c => {
            if (c.name === "is_premium" || c.name === "premium_consumer") c.value = "true";
            if (c.name === "ads_enabled") c.value = "false";
          });
        }
      });
    }
  }
  $done({ body: JSON.stringify(obj) });
} else {
  // Chỉ gọi duy nhất ở đây nếu gói tin không có dữ liệu hợp lệ
  $done({});
}
