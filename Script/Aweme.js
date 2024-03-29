/**
 * @supported 4162A98B8AFB
 */
let arr = {
    "allow_download": true,
    "share_type": 0,
    "show_progress_bar": 0,
    "draft_progress_bar": 0,
    "allow_duet": true,
    "allow_react": true,
    "prevent_download_type": 2,
    "allow_dynamic_wallpaper": false
};
let body = $response.body.replace(/watermark=1/g, "watermark=0");
var obj = JSON.parse(body);
if (obj.aweme_list) {
    for (var i = obj.aweme_list.length - 1; i >= 0; i--) {
        if (obj.aweme_list[i].is_ads == true) {
            obj.aweme_list.splice(i, 1);
        }
        if (obj.aweme_list[i].poi_info) {
            delete obj.aweme_list[i].poi_info;
        }
        if (obj.aweme_list[i].sticker_detail) {
            delete obj.aweme_list[i].sticker_detail;
        }
        if (obj.aweme_list[i].simple_promotions) {
            delete obj.aweme_list[i].simple_promotions;
        }
        obj.aweme_list[i].status.reviewed = 1;
        obj.aweme_list[i].video_control = arr;
    }
    $done({body: JSON.stringify(obj)});
} else if (obj.data) {
    for (var i = obj.data.length - 1; i >= 0; i--) {
        if (obj.data[i].aweme) {
            if (obj.data[i].aweme.poi_info) {
                delete obj.data[i].aweme.poi_info;
            }
            if (obj.data[i].aweme.simple_promotions) {
                delete obj.data[i].aweme.simple_promotions;
            }
            obj.data[i].aweme.status.reviewed = 1;
            obj.data[i].aweme.video_control = arr;
        } else {
            obj.data.splice(i, 1);
        }
    }
    $done({body: JSON.stringify(obj)});
} else {
    $done({body});
}