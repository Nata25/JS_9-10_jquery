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
        keepInViewport: true,
        bottomPositionCorrelation: 0
    })
    .change(function(event) {
        $(".selectBox-container")
            .removeClass()
            .addClass("selectBox-container " + event.target.value);
    });

    // JS custom checkboxes
    $(".js-wrapper").mousedown(function() {
        changeCheck($(this));
    });

    $(".js-wrapper").each(function() {
    // if any checkboxes are checked or disabled, style them properly
        changeCheckStart($(this));
    });

    // don't check native checkbox on click (conflict with script logic)
    $(".js-native-checkbox").click(function(event) {
        event.preventDefault();
    });

    // Helpers for js checkbox
    function changeCheck(el) {
        var input = el.find(".js-native-checkbox");

        if (!input.attr("disabled")) {

            var container = el.find(".js-checkbox-container"),
            message = el.find(".message");

            if (!input.attr("checked")) {
                container.html('\u2228');
                input.attr("checked", true);
                message.css("display", "block");
            }
            else {
                container.html("");
                input.attr("checked", false);
                message.css("display", "none");
            }
            // fire event manually
            input.change();
        }
    }

    function changeCheckStart(el) {
        var el = el,
        container = el.find(".js-checkbox-container"),
        input = el.find(".js-native-checkbox");

        if (input.attr("checked")) {
            container.html("\u2228");
        }

        if (input.attr("disabled")) {
            el.addClass("label-disabled");
            container.addClass("input-disabled");
        }
    }

    // Test if native checkboxes work fine

    $(".css-native-checkbox").change(function() {
        console.log($(this).is(":checked"));
    });

    $(".js-native-checkbox").change(function() {
        console.log($(this).is(":checked"));
    });

}); // end of ready
