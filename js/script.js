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

    // jQuery part

    // $(".inner-list").hide();

    $(".navigation a", ".jquery-navigation-container").click(function(event) {
        event.preventDefault();
    });

    $(".jquery-navigation-container .list-container").hover(
        function() {
            var submenu = $(this).children("ul");
            submenu.slideToggle(250);
            submenu.toggleClass("color-animated");
        }
    );

    // JavaScript part

    // Hide all submenues (if user has no js, everithing would be visible by default)
    // var submenues = document.getElementsByClassName("inner-list");
    // var len = submenues.length;
    // for (var i = 0; i < len; i++) {
    //     submenues[i].style.display = "none";
    // };

    // Prevent page reload on menu items click
    var links = document.querySelectorAll(".js-navigation-container .navigation a");
    len = links.length;
    for (var i = 0; i < len; i++) {
        links[i].addEventListener("click", function(event) {
            event.preventDefault();
        });
    }

    // Show submenues on parent hover
    var listContainers = document.querySelectorAll(".js-navigation-container .list-container");
    len = listContainers.length;
    console.log("len", len);


    for (var i = 0; i < len; i++) {
        var elem = listContainers[i].children[1]; // get inner list
        // get its height
        elem.style.display = "block";
        var initialTop = elem.style.top;
        elem.style.top = "-10000px";
        var height;
        if (elem.offsetHeight) {
            height = elem.offsetHeight;
        }
        else if (elem.style.pixelHeight) {
            height = elem.style.pixelHeight;
        }

        listContainers[i].addEventListener("mouseenter", function(event) {
            var innerList = this.children[1];
            innerList.style.top = initialTop;
            console.log("inside mouseenter height is ", height);

            // Animate slideDown effect
            animateSlideDown(innerList, height, 500);

        });

        listContainers[i].addEventListener("mouseleave", function(event) {
            var innerList = this.children[1];

            innerList.style.opacity = "0";
            setTimeout(function() {
                innerList.style.display = "none";
                innerList.style.opacity = "1";
            }, 300);

        // animateSlideUp(innerList, height, 500);

        });
    }

    function animateSlideDown(element, height, duration) {
        // @param {DOM element} element
        // @param {number} hight - element's height
        // @param {number} duration

        element.style.display = "block"; // need to display element after mouseleave
        element.style.overflow = "hidden";
        element.style.height = 0;

        var tick = 50;

        var frames = Math.floor(duration / tick); // num of frames
        step = Math.floor(height / frames);
        var currentHeight = height - frames * step;
        var renderFrame = setInterval(function() {
            currentHeight += step;
            element.style.height = currentHeight + "px";
            console.log(element.style.height);
        }, tick);

        setTimeout(function() {
            clearInterval(renderFrame);
            element.style.overflow = "visible";
        }, duration);
    }


    function animateSlideUp(element, height, duration, step) {

        // prepare for animation
        element.style.overflow = "hidden";

        var frames = Math.floor(height / step); // num of frames
        var tick = Math.floor(duration / frames);
        var recalculatedDuration = tick * frames; // actual animation duration
        console.log("frames: ", frames, "tick: ", tick, "duration: ", recalculatedDuration);
        // var currentHeight = height % step;
        currentHeight = height;
        var renderFrame = setInterval(function() {
            currentHeight -= step;
            element.style.height = currentHeight + "px";
            console.log(element.style.height);
        }, tick);

        setTimeout(function() {
            // console.log("inside setTimeout");
            clearInterval(renderFrame);
            element.style.height = 0;
            console.log(element.style.height);
        }, recalculatedDuration);

    }

}); // end of ready
