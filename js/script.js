$(function() {

    // Carousel
    $('.jcarousel').jcarousel({
        transitions: true,
        animation: {
            duration: 600,
            easing:   'cubic-bezier(.46,.16,.66,.92)'
        },
        wrap: 'circular'
    });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .jcarouselPagination({
            'item': function(page, carouselItems) {
                return '<a href="#' + page + '"></a>';
            }
        });


    // SelectBox

    $("select").selectBox({
        menuTransition: "fade",
        // keepInViewport: true
        bottomPositionCorrelation: 0
    })
    .change(function(event) {
        $(".selectBox-container")
            .removeClass()
            .addClass("selectBox-container " + event.target.value);
    });

    // JS custom checkbox
    $(".js-checkbox").mousedown(function() {
    /* при клике на чекбоксе меняем его вид и значение */
        changeCheck($(this));
    });

    $(".js-checkbox").each(function() {
    /* при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид */
         changeCheckStart($(this));
    });

    // Helpers for js checkbox
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
    }


}); // end of ready
