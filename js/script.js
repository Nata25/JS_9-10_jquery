$(function() {

//*********** Carousel *********** //
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

//*********** SelectBox *********** //

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

//*********** CheckBox *********** //

    $(".js-wrapper").mousedown(function(event) {
        // don't fire click event on 'secret message' showing
        if ($(event.target).hasClass("message")) {
            return false;
        }
        // don't fire event on disabled input
        var input = $(this).find(".js-native-checkbox");
        if (input.attr("disabled")) return false;

        changeCheck($(this), input);
    });

    // if any checkboxes are checked or disabled, style them properly
    $(".js-wrapper").each(function() {
        changeCheckStart($(this));
    });

    // don't check native checkbox on click (conflict with script logic)
    $(".js-native-checkbox").click(function(event) {
        event.preventDefault();
    });

    // Helpers for js checkbox
    function changeCheck(el, input) {
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

//*********** Navigation *********** //
    $(".inner-list").hide();

    $(".navigation a").click(function(event) {
        event.preventDefault();
    });

    $(".list-container").hover(
        function() {
            $(this).children("ul").slideToggle(250);
            $(this).children("ul").toggleClass("animated");
        }
    );
}); // end of ready
