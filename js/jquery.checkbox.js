$(function() {

    $(".js-checkbox").mousedown(function() {
    /* при клике на чекбоксе меняем его вид и значение */
        changeCheck($(this));
    });

    $(".js-checkbox").each(function() {
    /* при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид */
         changeCheckStart($(this));
    });

}); // end of ready

function changeCheck(el) {
    var container = el.find(".js-checkbox-container"),
    input = el.find(".js-native-checkbox"),
    message = el.find(".message");

    if (!input.attr("checked")) {
        console.log("not checked");
        container.html('\u2228');
        input.attr("checked", true);
        message.css("display", "block");
    }
    else {
        container.html("");
        input.attr("checked", false);
        message.css("display", "none");
    }
}

function changeCheckStart(el) {
    var container = el.find(".js-checkbox-container"),
    input = el.find(".js-native-checkbox");

    if (input.attr("checked")) {
        container.html("\u2228");
}
