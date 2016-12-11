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
    $(".js-checkbox").change(function() {
        console.log("active checkbox");
    });

    $("#js-checkbox-input").change(function() {
        console.log($(this).is(":checked"));
    });


}); // end of ready
