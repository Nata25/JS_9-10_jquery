$(function() {

    $(".js-checkbox-container").mousedown(function() {
    /* при клике на чекбоксе меняем его вид и значение */
        changeCheck($(this));
    });

    $(".js-checkbox-container").each(function() {
    /* при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид */
         changeCheckStart($(this));
    });

}); // end of ready

function changeCheck(el) {
/*
    функция смены вида и значения чекбокса
    el - span контейнер дял обычного чекбокса
    input - чекбокс
*/
    var el = el,
    input = el.find("input").eq(0);

    if (!input.attr("checked")) {
        el.html('\u005E');
        input.attr("checked", true);
        console.log("checked");
    }
    else {
        el.html("");
        input.attr("checked", false);
    }
    return true;
}

function changeCheckStart(el) {
/*
    если установлен атрибут checked, меняем вид чекбокса
*/
    var el = el,
    input = el.find("input").eq(0);
    if (input.attr("checked")) {
        el.html("\2039");
    }
    return true;
}
