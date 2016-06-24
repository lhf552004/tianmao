
$(function () {
    $("#wechat").click(function () {
        updateQrCode();
    });
});
function updateQrCode() {
    var options = {
        render: $('#render').val(),
        ecLevel: "H",
        minVersion: 6,

        fill: "#333333",
        background: "#ffffff",
        // fill: jq('#img-buffer')[0],

        text: location.href,
        size: 100,
        radius: 0.5,
        quiet: 1,

        mode: 2,

        mSize: 0.11,
        mPosX: 0.5,
        mPosY: 0.5,

        label: "",
        fontname: "Ubuntu",
        fontcolor: "#ff9818",

        image: $('#img-buffer')[0]
    };

    $('#qrcode').empty().qrcode(options);
}