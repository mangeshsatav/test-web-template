"use strict";


function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/;
    if (!emailReg.test(email)) {
        return false;
    } else {
        return true;
    }
}
function validateContactNumber(number) {
    var numberReg = /^((\+)?[1-9]{1,3})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;
    if (!numberReg.test(number)) {
        return false;
    } else {
        return true;
    }
}
function validateTextOnly(text) {
    var textReg = /^[A-z]+$/;
    if (!textReg.test(text)) {
        return false;
    } else {
        return true;
    }
}
function validateNumberOnly(number) {
    var numberReg = /^[0-9]+$/;
    if (!numberReg.test(number)) {
        return false;
    } else {
        return true;
    }
}
function checkElementValidation(child, type, check, error) {
    child.parent().find('.error-message').remove();
    if ( child.val() == "" && child.attr("data-required") == "required" ) {
        child.addClass("error");
        child.parent().append('<span class="error-message">' + child.parents("form").attr("data-required") + '</span>');
        child.parent().find('.error-message').css("margin-left", -child.parent().find('.error-message').innerWidth()/2);
        return false;
    } else if( child.attr("data-validation") == type &&
        child.val() != "" ) {
        if( !check ) {
            child.addClass("error");
            child.parent().append('<span class="error-message">' + error + '</span>');
            child.parent().find('.error-message').css("margin-left", -child.parent().find('.error-message').innerWidth()/2);
            return false;
        }
    }
    child.removeClass("error");
    return true;
}
function checkFormValidation(el) {
    var valid = true,
        children = el.find('input[type="text"], textarea');
    children.each(function(index) {
        var child = children.eq(index);
        var parent = child.parents("form");
        if( !checkElementValidation(child, "email", validateEmail(child.val()), parent.attr("data-email")) ||
            !checkElementValidation(child, "phone", validateContactNumber(child.val()), parent.attr("data-phone")) ||
            !checkElementValidation(child, "text_only", validateTextOnly(child.val()), parent.attr("data-text")) ||
            !checkElementValidation(child, "number", validateNumberOnly(child.val()), parent.attr("data-number"))
            ) {
            valid = false;
        }
    });
    return valid;
}
jQuery.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


jQuery(function($) {

    /* navigation menu compatible for differnet devices like mobile etc*/
    $(".mobile-nav").on("click", function() {
        if( !$(".site-header").hasClass("header-type-2") ) {
            $(window).scrollTop(0);
        }
        $(".navigation").toggleClass("show");
        $(".site-header").toggleClass("show-mobile");
        if( $(window).scrollTop() < 200 && headerShowOnScroll && ! $(".site-header").hasClass("show-mobile") ) {
            $(".site-header").addClass("show-on-scroll");
        }
    });

    $('.nav-menu a[href*=#]:not([href=#])').on("click", function() {
        if( $(window).width() < 890 && $(".site-header").hasClass("show-mobile") ) {
            $(".mobile-nav").click();
        }
    });

    if( $(window).width() > 890 && $(".site-header").hasClass("header-type-2") ) {
        $(".mobile-nav").click();
    }





    /* Wrap select */
    $("form select").wrap("<div class='select-wrap' />");
    /*----------------------------------------------------*/
    /* Preload site
     /*----------------------------------------------------*/
   /* var timer=null;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;
    $.fn.radialProgressBar = function() {
        var counter = 1;
        var el = $(this).children("canvas");
        if( el[0].getContext ) {
            var context = el[0].getContext('2d');
            var imd_w, arc_p, arc_r, line_w;
            if( el.width() >= 121 ) {
                imd_w = 240;
                arc_p = 60;
                arc_r = 56;
                line_w = 7.0;
            } else if ( el.width() >= 77) {
                imd_w = 154;
                arc_p = 39;
                arc_r = 34;
                line_w = 4.0;
            }
            var devicePixelRatio = window.devicePixelRatio || 1,
                backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
                ratio = devicePixelRatio / backingStoreRatio;
            var imd = context.getImageData(0, 0, imd_w, imd_w);
            var max = $(el).attr("data-rpb-val");
            if (devicePixelRatio !== backingStoreRatio) {
                var oldWidth = $(el).width();
                var oldHeight = $(el).height();
                $(el).attr("width", oldWidth * ratio);
                $(el).attr("height", oldHeight * ratio);
                $(el).css("width", oldWidth + "px");
                $(el).css("height", oldHeight + "px");
                context.scale(ratio, ratio);
            }
            context.strokeStyle = el.css("color");
            context.lineWidth = line_w;
            draw(context, imd, arc_p, arc_r, quart, circ, counter, el, max);
        } else {
            $(el).siblings("div").children("span").html($(el).attr("data-rpb-val") + "%");
        }
    };

    */
    var headerShowOnScroll = false;
    if( $(".site-header").hasClass("show-on-scroll") ) {
        headerShowOnScroll  = true;
    }
    $( window ).scroll(function() {
        if( $(window).scrollTop() > 200 && headerShowOnScroll ) {
            $(".site-header").removeClass("show-on-scroll");
        } else if( $(window).scrollTop() < 200 && headerShowOnScroll && ! $(".site-header").hasClass("show-mobile") ) {
            $(".site-header").addClass("show-on-scroll");
        }
    });

    /*

    /* Contact Form on SUBMIT */
    $('form input[type="text"], form textarea').wrap('<div class="form-row" />');
    $('input[type="text"], textarea').on("blur", function(){
        var parent = $(this).parents("form");
        if( !checkElementValidation($(this), "email", validateEmail($(this).val()), parent.attr("data-email")) ||
            !checkElementValidation($(this), "phone", validateContactNumber($(this).val()), parent.attr("data-phone")) ||
            !checkElementValidation($(this), "text_only", validateTextOnly($(this).val()), parent.attr("data-text")) ||
            !checkElementValidation($(this), "number", validateNumberOnly($(this).val()), parent.attr("data-number"))) {
        }
    });
    $('[data-form="submit"]').on('click', function(e) {
        $(this).parents('form[data-success]').submit();
        e.preventDefault();
    });
    $("form[data-success]").on("submit", function(e){
        var el = $(this);
        var formData = el.serializeObject();
        if(checkFormValidation(el)) {
            try {
                $.ajax({
                    type: "POST",
                    url: window.location.protocol + '//' + window.location.hostname + (window.location.port === '' ? '' : ':'+ window.location.port) + window.location.pathname + 'php/mail.php',
                    data: {
                        form_data : formData,
                        to        : el.attr("data-to"),
                        from      : el.attr("data-from"),
                        subject   : el.attr("data-subject"),
                    },
                    success: function(msg) {
                        if( ! el.next().hasClass("success") ) {
                            $(el).after('<div class="success">' + el.attr("data-success") + '<span class="glyphicon glyphicon-remove"></span></div>');
                            $(el).next().find(".glyphicon-remove").on('click', function() {
                                $(this).parent().remove();
                            });
                        }
                    }
                });
            } catch(e) {}
        }
        e.preventDefault();
        return false;
    });
    /* Contact Form on Clear
    $('[data-form="clear"]').on('click', function() {
        var el = $(this).parents('form[data-success]').find('input[type="text"], textarea');
        el.each(function(index) {
            el.eq(index).val("");
            el.eq(index).removeClass("error");
            el.eq(index).parent().find(".error-message").remove();
        });
        if( $(this).parents('form[data-success]').next().hasClass("success") ) {
            $(this).parents('form[data-success]').next().remove();
        }
        return false;
    });

      */



    /* Portfolio

    /*

    try {
        var $container = $('.isotope');
        var first_scroll = true;
        $(window).scroll(function() {
            if(first_scroll) {
                $container.isotope();
                first_scroll = false;
            }
        });
        $(window).focus(function(){
            $container.isotope();
        });
        $container.isotope({
            itemSelector : '.isotope li',
            layoutMode: 'fitRows',
            animationOptions: {
                duration: 750,
                queue: false,
            }
        });
        $('.filter button').on('click', function() {
            $('.filter button').removeClass('selected');
            $(this).addClass("selected");
            var item = "";
            if( $(this).attr('data-filter') != '*' ) {
                item = ".";
            }
            item += $(this).attr('data-filter');
            $container.isotope({ filter: item });
        });
        $(window).smartresize(function(){
            var item = "";
            if( $('.filter button.selected').attr('data-filter') != '*' ) {
                item = ".";
            }
            item += $('.filter button.selected').attr('data-filter');
            $container.isotope({ filter: item });
        });
    } catch (e) { }

     */
    /* Performs a smooth page scroll to an anchor on the same page. */

    $('.nav-menu a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {
            var target = $(this.hash);
            var href = $.attr(this, 'href');
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 105
                }, 1000, function () {
                    //window.location.hash = href;
                });
                return false;
            }
        }
    });




    /*  function for current item highlighting and viceversa while scrolling the page*/
    if ($("body.home").length > 0) {
        $(window).scroll(function() {
            $('.nav-menu li').removeClass("current-menu-item");

            $('.nav-menu a[href*=#]:not([href=#]), .ls-layer a[href*=#]:not([href=#])').each(function(index) {
                var el = $($('.nav-menu a[href*=#]:not([href=#])').eq(index).attr("href"));
                if( el.length > 0 ) {
                    if(el.isOnScreen()){
                        $('.nav-menu a[href*=#]:not([href=#])').eq(index).parent().addClass("current-menu-item");
                        return false;
                    };
                }
            });
        });
    }



    $.fn.isOnScreen = function(){

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    };



});


