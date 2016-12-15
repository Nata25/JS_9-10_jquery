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
            animateSlide(innerList, height, 500, true);

        });

        listContainers[i].addEventListener("mouseleave", function(event) {
            var innerList = this.children[1];

            // Slide Up effect
            //***************
            animateSlide(innerList, height, 300);

            // Opacity effect
            //***************
            // innerList.style.opacity = "0";
            // setTimeout(function() {
            //     innerList.style.display = "none";
            //     innerList.style.opacity = "1";
            // }, 300);
        });
    }

    function animateSlide(element, height, duration, isDown) {
        // @param {DOM element} element
        // @param {number} hight - element's height
        // @param {number} duration
        // @param {boolean} isDown : true for slideDown animation

        element.style.display = "block"; // need to display element after mouseleave if opacity effect is used instead of slideUp
        var slideDownAnimationEnded = !isDown;
        // var slideUpAnimationEnded = !isDown;

        if (isDown) {
            element.style.height = 0;
        }

        element.style.overflow = "hidden";

        var tick = 30;

        var frames = Math.floor(duration / tick); // num of frames
        step = Math.floor(height / frames);

        var currentHeight = (isDown) ? (height - frames * step) : height;

        var renderFrame = setInterval(function() {

            if (isDown) {
                currentHeight += step;
            }
            else if (slideDownAnimationEnded) {
                currentHeight -= step;
            }
            element.style.height = currentHeight + "px";
        }, tick);

        setTimeout(function() {
            clearInterval(renderFrame);
            if (isDown) {
                // enable showing next submenu on hover but only if slideDown is finished
                element.style.overflow = "visible";
                slideDownAnimationEnded = true;
            }
            else {
                if (slideDownAnimationEnded) element.style.height = 0; // get rid of the last fraction
                // else element.style.display = "none";
                else {
                    element.style.opacity = "0";
                    setTimeout(function() {
                        element.style.display = "none";
                        element.style.opacity = "1";
                    }, 300);
                }
            }
            console.log("animation", slideDownAnimationEnded)
        }, duration);
        console.log("animation", slideDownAnimationEnded);
    }

}); // end of ready
