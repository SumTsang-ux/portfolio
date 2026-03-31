"use strict";
/*
 * PIXEL INDUSTRY INCLUDE FILE
 * 
 * Includes functions necessary for proper theme work and some helper functions.
 * 
 */


/**
 * Function for converting to SVG
 * @param void
 * @return void
 */

function convertToSVG() {
    jQuery('.icon-container img').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
}



/**
 * Runs on both load and resize
 */
jQuery(window).on("load resize", function () {

    if (
            ((navigator.userAgent.match(/iPad/i)) && (navigator.userAgent.match(/iPad/i) !== null)
                    || (navigator.userAgent.match(/iPhone/i)) && (navigator.userAgent.match(/iPhone/i) !== null)
                    || (navigator.userAgent.match(/Android/i)) && (navigator.userAgent.match(/Android/i) !== null)
                    || (navigator.userAgent.match(/BlackBerry/i)) && (navigator.userAgent.match(/BlackBerry/i) !== null)
                    || (navigator.userAgent.match(/iemobile/i)) && (navigator.userAgent.match(/iemobile/i) !== null)
                    ) && (VolcannoInclude.isTouchDevice())
            )
    {

    }

    if (jQuery(window).width() > 992) {
        // Iconic blockquote height
        var blockquoteParentHeight = jQuery(".blockquote-iconic-wrapper").closest(".row").outerHeight();
        jQuery(".blockquote-iconic-wrapper").outerHeight(blockquoteParentHeight);
    } else {
        jQuery(".blockquote-iconic-wrapper").height("auto");
    }



    /**
     * Navigation
     */

    var windowWidth = jQuery(window).width(),
            dropdownItem = jQuery(".navbar-nav > li.dropdown");
    if (!VolcannoInclude.isTouchDevice() && (windowWidth >= 991)) {
        dropdownItem.addClass("hover");
    } else {
        dropdownItem.removeClass("hover");
    }

    VolcannoInclude.set_page_title_height();
    VolcannoInclude.left_menu_list_container();
    VolcannoInclude.fullscreen_section_vertical_center();
    VolcannoInclude.set_section_height();
    VolcannoInclude.set_map_height();

    if (jQuery(window).width() > 992) {
        VolcannoInclude.fullscreen_with_footer();
    }

    // CHECK IF OWL CAROUSEL USES DOTS PAGINATION AND IF DOES PUSH NAVIGATION ARROWS UP TO ALIGN IT IN THE MIDDLE

    if (jQuery(".owl-dots").is(':visible')) {
        jQuery(".owl-prev, .owl-next").addClass("owl-nav-with-dots");
    }

    // Team member height
    var teamMemberHeight = jQuery(".team-member.simple-style").height();
    jQuery(".team-member.simple-style .mask").height(teamMemberHeight);

    // Team members - vertical align team social links
    var teamSocialHeight = jQuery(".block-item .team-social").height();
    jQuery(".block-item .team-social").css("top", -teamSocialHeight / 2);

    // Featured Blog

    if (jQuery(window).width() > 767) {
        if (jQuery("#featured-blog-masterslider").length > 0) {
            var featuredBlogSliderHeight = jQuery("#featured-blog-masterslider").height();
            jQuery(".featured-post-intro").parent().css("height", featuredBlogSliderHeight).addClass("column-table");
        }
    } else {
        if (jQuery("#featured-blog-masterslider").length > 0) {
            jQuery(".featured-post-intro").parent().addClass("column-table");
        }
    }
});

(jQuery)(function ($) {

    // CHANGE THE COLOR OF SEARCH INPUT DEPENDING ON PAGE CONTENT BACKGROUND
    if (jQuery(".header-wrapper").next().hasClass("dark")) {
        jQuery("#m_search").addClass("light-style");
    } else if (jQuery(".header-wrapper").next().hasClass("light")) {
        jQuery("#m_search").addClass("dark-style");
    }
       VolcannoInclude.set_section_height();
        VolcannoInclude.fullscreen_section_vertical_center();
    // convertToSVG init
    convertToSVG();
    
    // Trigger animation init
    VolcannoInclude.triggerAnimation();
    
    /**
     * Search animation
     */
    if (!VolcannoInclude.isTouchDevice() || jQuery(".header-wrapper").hasClass("header-style-03") || (jQuery(window).width() > 992) && VolcannoInclude.isTouchDevice()) {
        jQuery(".header-wrapper").on("click", ".search-submit", function (e) {
            e.preventDefault();

            jQuery(this).next("#m_search").slideDown(100).focus();
        });

        jQuery("#m_search").focusout(function (e) {
            jQuery(e.target).slideUp(100);
        });
    }

    /**
     * Subnavigation
     */

    (function () {
        jQuery("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (event) {
            // Avoid following the href location when clicking
            event.preventDefault();
            // Avoid having the menu to close when clicking
            event.stopPropagation();
            // If a menu is already open we close it
            jQuery(this).closest(".dropdown-submenu").toggleClass("open");
            console.log("dropdown");
        });

    })();



    // Sticky sidebar
    if (jQuery(".fixed-sidebar").length > 0) {
        VolcannoInclude.stickySidebar();
        jQuery(window).on("scroll", function () {
            if (jQuery(window).width() > 991) {
                VolcannoInclude.stickySidebar();
            }
        });
        jQuery(window).on("resize", function () {
            if (jQuery(window).width() < 992) {
                jQuery(".fixed-sidebar").removeClass("stick");
                jQuery(".fixed-sidebar").attr("style", "");
            }
        });
    }
    /**
     * Content tabs
     */
    (function () {
        jQuery(".tabs").each(function () {
            var $tabLis = jQuery(this).find("li");
            var $tabContent = jQuery(this).next(".tab-content-wrap").find(".tab-content");

            $tabContent.hide();
            $tabLis.first().addClass("active").show();
            $tabContent.first().show();
        });

        jQuery(".tabs").on("click", "li", function (e) {
            var $this = jQuery(this);
            var parentUL = $this.parent();
            var tabContent = parentUL.next(".tab-content-wrap");

            parentUL.children().removeClass("active");
            $this.addClass("active");

            tabContent.find(".tab-content").hide();
            var showById = jQuery($this.find("a").attr("href"));
            tabContent.find(showById).fadeIn();

            e.preventDefault();
        });
    })();

    // Init scripts on page load
    VolcannoInclude.init();

    // CHECK IF THERE THUMBNAIL NAVIGATION EXISTS AND ADD CLASS TO BODY
    if (jQuery(".open-thumbs-bar-button").length) {
        jQuery("body").addClass("slider-thumbnails");
    }

    // BLOG POST - SHOW SOCIAL MEDIA OPTIONS WHEN MOUSE ENTER MENU ICON
    jQuery(".blog-share").on("mouseenter", ".blog-share-btn", function () {
        $(this).parent().find(".social-links").addClass("open");
    });
    jQuery(".blog-post").on("mouseleave", ".blog-share", function () {
        jQuery(this).parent().find(".social-links").removeClass("open");
    });

    // ANIMATE TEXT
    if (jQuery(".animated-text").length > 0) {
        jQuery('.animated-text').waypoint(function () {
            $(this).find('.animated-text-inner').addClass('animateTextReveal');
        }, {offset: '85%'});
    }

    // ANIMATE SOCIAL LINKS
    if (jQuery("#footer .social-links.social-animated").length > 0) {
        jQuery('#footer .social-links.social-animated').waypoint(function () {
            jQuery(this).find('a').each(function (i) {
                var socialLink = $(this);
                setTimeout(function () {
                    socialLink.addClass('animate-social-icon');
                }, (i + 1) * 200);
            });
        }, {offset: '90%'});
    }


    // PUSH CONTENT DOWN WHEN HEADER IS NOT TRANSPARENT
    jQuery(window).on('load resize', function () {
        var $header = jQuery(".header-wrapper");

        if ($header.is(".header-transparent")) {
            $header.next().css("margin-top", 0);

        } else if ($header.not(".header-transparent")) {
            var header_height = $header.height();

            $header.next().css("margin-top", header_height);
        }
        if ($header.is(".left-menu")) {
            $header.next().css("margin-top", 0);

        }
    });

    // LEFT MENU - COLLAPSE ON SMALLER SCREENS
    if (jQuery(".left-menu").length > 0) {
        $(".left-menu").on("click", ".navbar-toggle", function () {
            $(this).closest(".left-menu").toggleClass("left-menu-collapsed");
        });
    }
});

var VolcannoInclude = {
    /**
     * Init function
     * @param void
     * @return void
     */
    init: function () {
        VolcannoInclude.scrollToTop();
        VolcannoInclude.placeholderFix();
        VolcannoInclude.portfolio();
        VolcannoInclude.teamMembers();


        if (jQuery("#blog-grid").length > 0) {
            VolcannoInclude.isotopeBlogGrid();
        }
        if (jQuery("#blog-masonry").length > 0) {
            VolcannoInclude.isotopeMasonry();
        }
        if (jQuery(".portfolio-grid.isotope-items").length > 0) {
            VolcannoInclude.portfolioIsotopeGrid();
        }
        if (jQuery(".portfolio-masonry").length > 0) {
            VolcannoInclude.portfolioIsotopeMasonry();
        }
        if (jQuery("#photography-portfolio").length > 0) {
            VolcannoInclude.photographyIsotopeMasonry();
        }
        if (jQuery("#shop-products.isotope-items").length > 0) {
            VolcannoInclude.shopIsotopeGrid();
        }

        if (jQuery(".btn-slide-down").length > 0) {
            VolcannoInclude.slideDown();
        }
        if (jQuery(".shop-item-hover-button").length > 0) {
            jQuery('.shop-item-hover-button').on('focus', function () {
                jQuery(this).blur();
            });
        }

        if (jQuery(".master-slider").length > 0) {
            VolcannoInclude.masterSliderGeneral();
        }

        if (jQuery("#accordion").length > 0) {
            VolcannoInclude.accordion();
        }
        if (!VolcannoInclude.isTouchDevice() || !VolcannoInclude.isIOSDevice() || jQuery(window).width() > 973) {
            VolcannoInclude.parallaxElements();
        }

        if ((!VolcannoInclude.isTouchDevice() || !VolcannoInclude.isIOSDevice()) || ((VolcannoInclude.isTouchDevice() || VolcannoInclude.isIOSDevice()) && jQuery(window).width() > 991)) {
            jQuery(window).on("load resize", function () {
                var window_y = jQuery(document).scrollTop();
                if (window_y > 0) {
                    VolcannoInclude.setStaticHeader(window_y);
                }

                if (jQuery(".header-wrapper").next(".page-content.dark, .ms-slide.dark").length > 0) {
                    jQuery(".header-wrapper .logo-dark").hide();
                    jQuery(".header-wrapper .logo-light").show();

                    jQuery(".header-wrapper .logo-dark, .header-wrapper.header-light-dark-current .logo-dark, .header-wrapper.header-white-logo .logo-light,.header-wrapper.header-light-dark-current.header-white-logo .logo-light, .header-wrapper.header-light-theme-color .logo-dark,.header-wrapper.header-light-default .logo-dark,.header-wrapper.header-dark-theme-color .logo-dark, .header-wrapper.hamburger-menu-light .logo-light,.header-wrapper.hamburger-menu-dark .logo-dark").show();
                    jQuery(".header-wrapper .logo-light, .header-wrapper.header-light-dark-current .logo-light, .header-wrapper.header-white-logo .logo-dark, .header-wrapper.header-light-dark-current.header-white-logo .logo-dark, .header-wrapper.header-light-theme-color .logo-light,.header-wrapper.header-light-default .logo-light,.header-wrapper.header-dark-theme-color .logo-light, .header-wrapper.hamburger-menu-light .logo-dark, .header-wrapper.hamburger-menu-dark .logo-light").hide();
                } else {
                    jQuery(".header-wrapper .logo-dark").show();
                    jQuery(".header-wrapper .logo-light").hide();
                }

            });

            var header_height_top_bar = jQuery(".header-wrapper.header-transparent #top-bar-wrapper").outerHeight();

            if (jQuery(".header-wrapper.header-transparent").next().hasClass("page-title")) {
                jQuery(".header-wrapper.header-transparent").next().css("margin-top", header_height_top_bar);
            }

            jQuery(window).on("scroll", function () {
                var position = jQuery(this).scrollTop();
                VolcannoInclude.setStaticHeader(position);
            });
        }

        // Check if header is not resized or is header light darker type and show logo
        var headerNotResizedCheck = VolcannoInclude.debounce(function () {
            if (!jQuery(".header-wrapper").hasClass("resize-header") && !jQuery(".header-wrapper").hasClass("header-light-darker")) {

                jQuery(".header-wrapper .logo-dark").show();
            }
        }, 15);

        window.addEventListener('scroll', headerNotResizedCheck);

        // HAMBURGER MENU FIRST LEVEL DROPDOWN    
        jQuery(".hamburger-nav").on("click", ".dropdown", function (e) {
            e.preventDefault();
            jQuery(this).toggleClass("active").next().slideToggle(300);
            jQuery(this).parent().siblings("li").find(".dropdown.active").removeClass("active").next().slideUp(300);
            //   jQuery(this).closest(".hamburger-nav").find(".dropdown-multilevel.active").removeClass("active").next().slideUp(300);
        });

        // HAMBURGER MENU MULTI LEVEL DROPDOWN    
        jQuery(".hamburger-nav-submenu").on("click", ".dropdown-multilevel", function (e) {
            e.preventDefault();
            jQuery(this).addClass("active").next().slideToggle(300);
            jQuery(this).parent().siblings("li").find(".dropdown-multilevel.active").removeClass("active").next().slideUp(300);
        });
        jQuery("body").on("click", ".hamburger.active", function () {
            jQuery(".fat-nav").find(".dropdown.active, .dropdown-multilevel.active").removeClass("active").next().hide();
        });

    },
    /**
     * Set static header
     * @param position
     * @return void
     */
    setStaticHeader: function (position) {
        var header_height = jQuery(".header-wrapper").height();
        var top_bar_height = jQuery(".top-bar-wrapper").outerHeight();

        if (position > header_height) {
            jQuery(".header-wrapper").stop().animate({
                top: -top_bar_height
            }, 50)
                    .addClass("resize-header");

            if (!jQuery(".header-wrapper.hamburger-menu").hasClass(".header-transparent")) {
                jQuery(".header-wrapper.hamburger-menu").addClass("resize-header");
            } else {
                jQuery(".header-wrapper.hamburger-menu").removeClass("resize-header");
            }

        } else if (position < header_height) {
            jQuery(".header-wrapper").stop().animate({
                top: 0
            }, 50)
                    .removeClass("resize-header");

            jQuery(".header-wrapper.hamburger-menu").removeClass("resize-header");
        }
    },
    /**
     * Trigger animation function
     */
    triggerAnimation: function () {
        if (!VolcannoInclude.isTouchDevice()) {

            // ANIMATED CONTENT
            if (jQuery(".animated")[0]) {
                jQuery(".animated").css("opacity", "0");
            }

            var currentRow = -1;
            var counter = 1;

            jQuery(".triggerAnimation").waypoint(function () {
                var $this = jQuery(this);
                var rowIndex = jQuery(".row").index(jQuery(this).closest(".row"));
                if (rowIndex !== currentRow) {
                    currentRow = rowIndex;
                    jQuery(".row").eq(rowIndex).find(".triggerAnimation").each(function (i, val) {
                        var element = jQuery(this);
                        setTimeout(function () {
                            var animation = element.attr("data-animate");
                            element.css("opacity", "1");
                            element.addClass("animated " + animation);
                        }, (i * 500));
                    });

                }

                //counter++;

            },
                    {
                        offset: "85%",
                        triggerOnce: true
                    }
            );
        }
    },
    // SET FULL SCREEN PAGE TITLE HEIGHT
    set_page_title_height: function () {
        var headerHeight = jQuery(".header-wrapper").height();
        var screenHeight = jQuery(window).height();
        jQuery(".page-title-fullscreen, .intro-hero-fullscreen").css("height", screenHeight);

        if (jQuery(window).width() < 992) {
            jQuery(".page-title-fullscreen, .intro-hero-fullscreen").css("height", screenHeight - headerHeight);
        }
    },
    // SET FULL SCREEN SECTION HEIGHT
    set_section_height: function () {
        var screenHeight = jQuery(window).height();

        if (jQuery(window).width() < 992) {
            jQuery(".fullscreen-section").css("height", "500");
        }
        if (jQuery(window).width() > 992) {
            jQuery(".fullscreen-section").css("height", screenHeight);
        }


        // Full screen height columns
        var verticalCenteredWrapperHeight = jQuery(".vertical-centered-container, .full-height-column").closest(".page-content").height();
        jQuery(".vertical-centered-container, .full-height-column").height(verticalCenteredWrapperHeight);


    },
    // VERTICAL ALIGNMENT OF THE CONTENT INSIDE OF FULL SCREEN SECTION
    fullscreen_section_vertical_center: function () {
        var screenHeight = jQuery(window).height();
        jQuery(".countdown-container, .maintenance-container").css("height", screenHeight);
        jQuery(".contact-container, .coming-soon-heading-container").css("height", screenHeight);

        if (jQuery(window).width() < 992) {
            jQuery(".coming-soon-heading-container").css("height", "auto");
        }
    },
    // SET FULLSCREEN SECTION INCLUDING FOOTER
    fullscreen_with_footer: function () {
        var headerHeight = jQuery(".header-wrapper").height();
        var footerHeight = jQuery("#footer-wrapper").outerHeight();
        var screenHeight = jQuery(window).height();

        jQuery(".fullscreen-section-with-footer, .fullscreen-section-with-footer .portfolio-fullscreen-section, .heading-vertical-center-container .vertical-center, #portfolio-half-item-horizontal-carousel.owl-carousel .owl-item").css({"height": screenHeight - footerHeight - headerHeight});
        jQuery(".fullscreen-section-with-footer, .fullscreen-section-with-footer .portfolio-fullscreen-section, .heading-vertical-center-container .vertical-center").css({"margin-top": headerHeight});

        if (jQuery(window).width() < 768) {
            jQuery(".fullscreen-section-with-footer .portfolio-fullscreen-section, .heading-vertical-center-container .vertical-center, #portfolio-half-item-horizontal-carousel.owl-carousel .owl-item").css("height", screenHeight - footerHeight - headerHeight);
        }
    },
    // LEFT MENU
    left_menu_list_container: function () {

        var screenHeight = jQuery(window).height();
        var leftMenuTopContentHeight = jQuery(".left-menu .left-menu-top-content").outerHeight();
        var leftMenuFooterHeight = jQuery(".menu-footer").outerHeight();
        var leftMenuMainContainerHeight = screenHeight - leftMenuTopContentHeight - leftMenuFooterHeight;
        var leftMenuContainer = jQuery(".menu-container");
        var leftMenuLevel = jQuery(".menu__level");

        leftMenuLevel.css("height", leftMenuMainContainerHeight);
        leftMenuContainer.css("height", leftMenuMainContainerHeight);
    },
    debounce: function (func, wait, immediate) {

        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    },
    /**
     * Contact forms AJAX submit
     * @param id
     * @return data
     */
    contactFormAjax: function (id) {
        // Show recaptcha on form click
        jQuery("form").on("click", function (event) {
            jQuery(".g-recaptcha", this).addClass("recaptcha-visible");
        });
        // Forms
        switch (id) {
            // Contact us form
            case "contact-us":

                jQuery(".wpcf7-submit").on("click", function (event) {
                    event.preventDefault();

                    var action = jQuery('input[name="action"]').val(id);

                    var form = jQuery(event.target).closest("form");
                    var inputFields = form.find('input:not([type="submit"])');
                    var textArea = form.find(".wpcf7-textarea");

                    var data = new FormData(form[0]);

                    jQuery.ajax({
                        type: "POST",
                        url: "contact.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: data
                    }).done(function (data) {
                        if (data === "Message sent succesfully.") {
                            inputFields.each(function (index, el) {
                                jQuery(this).val("");
                            });

                            textArea.each(function (index, el) {
                                jQuery(this).val("");
                            });

                            grecaptcha.reset();
                        }
                        alert(data);
                    });
                });
                break;

            case "comment-form":

                jQuery(".wpcf7-submit").on("click", function (event) {
                    event.preventDefault();

                    var action = jQuery('input[name="action"]').val(id);

                    var form = jQuery(event.target).closest("form");
                    var inputFields = form.find('input:not([type="submit"])');
                    var textArea = form.find(".wpcf7-textarea");

                    var data = new FormData(form[0]);

                    jQuery.ajax({
                        type: "POST",
                        url: "contact.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: data
                    }).done(function (data) {
                        if (data === "Message sent succesfully.") {
                            inputFields.each(function (index, el) {
                                jQuery(this).val("");
                            });

                            textArea.each(function (index, el) {
                                jQuery(this).val("");
                            });

                            grecaptcha.reset();
                        }
                        alert(data);
                    });
                });
                break;

                // Newsletter form
            case "newsletter":
                jQuery(".newsletter .submit").on("click", function (event) {
                    event.preventDefault();
                    var action = jQuery('input[name="action"]').val(id);

                    var form = jQuery(event.target).closest("form");
                    var inputFields = form.find('input:not([type="submit"])');

                    var data = new FormData(form[0]);

                    jQuery.ajax({
                        type: "POST",
                        url: "contact.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: data
                    }).done(function (data) {
                        if (data === "Message sent succesfully.") {
                            inputFields.each(function (index, el) {
                                jQuery(this).val("");
                            });

                        }
                        alert(data);
                    });
                });
                break;

            default:
                // statements_def
                break;
        }
    },
    // SET FULL SCREEN MAP HEIGHT
    set_map_height: function () {
        var screenHeight = jQuery(window).height();

        if (jQuery(window).width() < 992) {
            jQuery(".fullscreen-section .contact-map-container #map").css("height", 500);
            jQuery(".fullscreen-section").css("height", "auto");
        } else if (jQuery(window).width() > 991) {
            jQuery(".fullscreen-section .contact-map-container #map").css("height", screenHeight);
        }
    },
    /**
     * Function to check is user is on touch device
     * @param void
     * @return bool
     */
    isTouchDevice: function () {
        return Modernizr.touch;
    },
    /**
     * Function to check is user is on iOS Device
     * @param void
     * @return bool
     */
    isIOSDevice: function () {
        if (
                (navigator.userAgent.match(/iPad/i)) && (navigator.userAgent.match(/iPad/i) !== null)
                || (navigator.userAgent.match(/iPhone/i)) && (navigator.userAgent.match(/iPhone/i) !== null)
                || (navigator.userAgent.match(/Android/i)) && (navigator.userAgent.match(/Android/i) !== null)
                || (navigator.userAgent.match(/BlackBerry/i)) && (navigator.userAgent.match(/BlackBerry/i) !== null)
                || (navigator.userAgent.match(/iemobile/i)) && (navigator.userAgent.match(/iemobile/i) !== null)
                )
        {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Function for scroll to top
     * @param void
     * @return void
     */
    scrollToTop: function () {
        jQuery("body").on("click", ".to-top", function () {
            jQuery("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    },
    /**
     * Slide down to the next section
     * 
     * @returns void
     */
    slideDown: function () {
        jQuery("body").on("click", ".btn-slide-down", function (e) {

            jQuery('html,body').animate({
                scrollTop: $(this.hash).offset().top - 70
            }, 800);

            return false;

            e.preventDefault();
        });
    },
    /**
     * Function for smooth scroll
     * @param void
     * @return void
     */
    smoothScroll: function () {
        var $window = jQuery(window);        //Window object
        var scrollTime = 0.5;           //Scroll time
        var scrollDistance = 380;       //Distance. Use smaller value for shorter scroll and greater value for longer scroll

        $window.on("mousewheel DOMMouseScroll", function (event) {

            event.preventDefault();

            var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to($window, scrollTime, {
                scrollTo: {y: finalScroll, autoKill: true},
                ease: Power1.easeOut, //For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
                autoKill: true,
                overwrite: 5
            });
        });
    },
    /**
     * Function for old browsers placeholder fix
     * 
     * @returns void
     */
    placeholderFix: function () {
        jQuery("input, textarea").placeholder();
    },
    /**
     * Portfolio
     * 
     * @returns void
     */
    portfolio: function () {
        // PORTFOLIO ITEMS EFFECT
        jQuery(".portfolio-item").on("mouseenter", ".mask", function () {
            jQuery(this).addClass("animMask");
        });
        jQuery(".portfolio-item").on("mouseleave", ".mask", function () {
            jQuery(this).removeClass("animMask");
        });
        // PORTFOLIO - SHOW MASK ON HOVER
        jQuery(".portfolio-hover .portfolio-item").on("mouseenter", ".portfolio-item-container", function () {
            jQuery(this).find(".mask").css("opacity", "1");
        });
        jQuery(".portfolio-hover .portfolio-item").on("mouseleave", ".portfolio-item-container", function () {
            jQuery(this).find(".mask").css("opacity", "0");
        });
    },
    teamMembers: function () {
        // TEAM MEMBER MENU BUTTON
        jQuery(".team-member").on("mouseenter", ".menu-icon", function () {
            jQuery(this).addClass("open");
        });
        jQuery(".team-member").on("mouseleave", ".block-social-container", function () {
            jQuery(this).find(".menu-icon").removeClass("open");
        });

        // TEAM MEMBER SIMPLE STYLE MASK
        jQuery(".team-member.simple-style").on("mouseenter", ".mask", function () {
            jQuery(this).addClass("animMask");
        });
        jQuery(".team-member.simple-style").on("mouseleave", ".mask", function () {
            jQuery(this).removeClass("animMask");
        });

        // TEAM MEMBERS - SHOW SOCIAL MEDIA OPTIONS WHEN MOUSE ENTER MENU ICON
        jQuery(".team-member").on("mouseenter", ".block-social-container", function () {
            jQuery(this).parent().find(".team-social").addClass("open");
        });
        jQuery(".team-member").on("mouseleave", ".block-social-container", function () {
            jQuery(this).parent().find(".team-social").removeClass("open");
        });
    },
    accordion: function () {
        function change_icon(e) {
            jQuery(e.target).prev('.panel-heading').find(".indicator").toggleClass('fa-plus fa-minus');
        }
        jQuery('#accordion').on('hidden.bs.collapse', change_icon);
        jQuery('#accordion').on('shown.bs.collapse', change_icon);
    },
    /**
     * Horizontal parallax moving images
     * 
     * @returns {undefined}
     */
    parallaxElements: function () {

        jQuery(".parallax-elements").each(function () {
            // if .parallax-elements exits on the page, the parent element will get a class .parallax-elements-wrapper
            jQuery(this).parent().addClass("parallax-elements-wrapper");
        });

        //http://www.shinyface.com/2010/09/04/simple-parallax-with-jquery/
        jQuery('.parallax-elements').mousemove(
                function (e) {
                    /* Work out mouse position */
                    var offset = jQuery(this).offset();
                    var xPos = e.pageX - offset.left;
                    var yPos = e.pageY - offset.top;

                    /* Get percentage positions */
                    var mouseXPercent = Math.round(xPos / jQuery(this).width() * 100);
                    var mouseYPercent = Math.round(yPos / jQuery(this).height() * 100);

                    jQuery(this).find('#parallax-1').each(
                            function () {
                                var diffX = jQuery('.parallax-elements').width() + 400;
                                var diffY = jQuery('.parallax-elements').height() - jQuery(this).height() / 3;

                                var myX = diffX * (mouseXPercent / 300); //) / 100) / 2;


                                var myY = diffY * (mouseYPercent / 500);


                                var cssObj = {
                                    'left': myX + 'px',
                                    'top': myY + 'px'
                                }
                                //$(this).css(cssObj);
                                jQuery(this).animate({left: myX, top: myY}, {duration: 50, queue: false, easing: 'linear'});

                            }
                    );
                    jQuery(this).find('#parallax-2').each(
                            function () {
                                var diffX = jQuery('.parallax-elements').width() + 250;
                                var diffY = jQuery('.parallax-elements').height() - jQuery(this).height() / 2;

                                var myX = diffX * (mouseXPercent / 400); //) / 100) / 2;


                                var myY = diffY * (mouseYPercent / 900);


                                var cssObj = {
                                    'left': myX + 'px',
                                    'top': myY + 'px'
                                }
                                //$(this).css(cssObj);
                                jQuery(this).animate({left: myX, top: myY}, {duration: 50, queue: false, easing: 'linear'});

                            }
                    );
                    jQuery(this).find('#parallax-3').each(
                            function () {
                                var diffX = jQuery('.parallax-elements').width() + 100;
                                var diffY = jQuery('.parallax-elements').height() - jQuery(this).height() / 1;

                                var myX = diffX * (mouseXPercent / 600); //) / 100) / 2;


                                var myY = diffY * (mouseYPercent / 1300);


                                var cssObj = {
                                    'left': myX + 'px',
                                    'top': myY + 'px'
                                };
                                //$(this).css(cssObj);
                                jQuery(this).animate({left: myX, top: myY}, {duration: 50, queue: false, easing: 'linear'});

                            }
                    );
                }
        );

    },
    /**
     * Function for facebook share plugin init
     * @param void
     * @return void
     */
    sharrreFacebookInit: function () {
        jQuery('.sharrre-facebook').sharrre({
            share: {
                facebook: true
            },
            enableHover: false,
            enableTracking: true,
            template: '<a class="box" href="#"><div class="share"><span></span></div></a>',
            click: function (api, options) {
                api.simulateClick();
                api.openPopup('facebook');
            }
        });
    },
    /**
     * Function for facebook share plugin init
     * @param void
     * @return void
     */
    sharrreTwitterInit: function () {
        jQuery('.sharrre-twitter').sharrre({
            share: {
                facebook: true
            },
            enableHover: false,
            enableTracking: true,
            template: '<a class="box" href="#"><div class="share"><span></span></div></a>',
            click: function (api, options) {
                api.simulateClick();
                api.openPopup('twitter');
            }
        });
    },
    /**
     * Function for facebook share plugin init
     * @param void
     * @return void
     */
    sharrreGooglePlusInit: function () {
        jQuery('.sharrre-google-plus').sharrre({
            share: {
                facebook: true
            },
            enableHover: false,
            enableTracking: true,
            template: '<a class="box" href="#"><div class="share"><span></span></div></a>',
            click: function (api, options) {
                api.simulateClick();
                api.openPopup('googlePlus');
            }
        });
    },
    /**
     * Function for manific popup initialisation
     * @param id
     * @return void
     */
    magnificPopupInit: function (id) {
        switch (id) {

            case "newsletter-popup":

                jQuery('.newsletter-popup-trigger').magnificPopup({
                    type: 'inline'
                });
                break;

            default:
                // statements_def
                break;
        }
    },
    /**
     * Masterslider thumblist
     * 
     * @returns {undefined}
     */
    masterSliderGeneral: function () {
        // Open thumbs on slider
        jQuery(".master-slider").on("mouseenter", ".open-thumbs-bar-button", function () {
            jQuery(this).addClass('open');
        });
        jQuery(".master-slider").on("mouseleave", ".open-thumbs-bar-button", function () {
            jQuery(this).removeClass('open');
        });


        jQuery(".master-slider").on("click", ".open-thumbs-bar-button", function () {
            if (jQuery(".ms-thumb-list").hasClass("ms-dir-v")) {
                jQuery(this).closest(".slider-thumbnails").toggleClass('push-thumbs-to-left').find(".close-icon").removeClass("close-icon").attr("class", "thumbs-icon");
                jQuery(this).closest(".push-thumbs-to-left").find(".thumbs-icon").removeClass("thumbs-icon").attr("class", "close-icon");
            } else {
                jQuery(this).closest(".slider-thumbnails").toggleClass('push-thumbs-up').find(".close-icon").removeClass("close-icon").attr("class", "thumbs-icon");
                jQuery(this).closest(".push-thumbs-up").find(".thumbs-icon").removeClass("thumbs-icon").attr("class", "close-icon");
            }
        });
    },
    /**
     * Isotope blog grid
     * 
     * @returns void
     */
    isotopeBlogGrid: function () {

        var $grid = jQuery('#blog-grid');

        jQuery('.blog-content-wrapper .post-body').matchHeight({
            byRow: false,
            property: 'height',
            target: null,
            remove: false
        });

        // on load calculate image width / height ratio 
        // and store to element data attribute for later use
        var blogSliderHeight = jQuery('.blog-posts .post-media').height();
        var blogSliderWidth = jQuery('.blog-posts .post-media').width();
        var blogSliderRatio = blogSliderHeight / blogSliderWidth;
        jQuery('.blog-posts .gallery-post .post-media').data('ratio', blogSliderRatio);

        // match height update event
        jQuery.fn.matchHeight._afterUpdate = function (event, groups) {

            // check that isotope is initialized or not
            if (!$grid.data('isotope')) {
                // init Isotope
                $grid.isotope({
                    itemSelector: '.isotope-item',
                    percentPosition: true
                });

                // layout Isotope after each image loads
                $grid.imagesLoaded().progress(function () {
                    $grid.isotope('layout');
                });
            } else {

                // event is undefined when manually triggered e.g. when filtering
                if (typeof (event) == "undefined") {

                    // calculate height
                    var blogSliderRatio = jQuery('.blog-posts .gallery-post .post-media').data('ratio');
                    var blogSliderWidth = jQuery('.blog-posts .gallery-post').width();
                    var blogSliderHeight = blogSliderWidth * blogSliderRatio;
                    jQuery('.blog-posts .gallery-post .post-media').height(blogSliderHeight);
                }

                // filter functions
                var filterFns = {
                };

                var filterValue = jQuery('.button-group .filter-button.is-checked').attr('data-filter');

                // use filterFn if matches value
                filterValue = filterFns[ filterValue ] || filterValue;
                $grid.isotope({filter: filterValue});
            }

        }

        // on resize clear height style
        jQuery(window).on('resize', function () {
            jQuery('.blog-posts .gallery-post .post-media').attr('style', '');
        });

        // bind filter button click
        jQuery('.filters-button-group').on('click', '.filter-button', function () {
            jQuery('.button-group .filter-button').removeClass('is-checked');
            jQuery(this).addClass('is-checked');

            // trigger update event in matchHeights plugin
            jQuery.fn.matchHeight._update();

        });

    },
    /**
     * Isotope blog grid
     * 
     * @returns void
     */
    isotopeMasonry: function () {

        // init Isotope
        var $grid = jQuery('#blog-masonry').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });

        // filter functions
        var filterFns = {
        };
        // bind filter button click
        jQuery('.filters-button-group').on('click', '.filter-button', function () {
            var filterValue = jQuery(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({filter: filterValue});
        });
        // change is-checked class on buttons
        jQuery('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = jQuery(buttonGroup);
            $buttonGroup.on('click', '.filter-button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                jQuery(this).addClass('is-checked');
            });
        });

    },
    portfolioIsotopeGrid: function () {
        // init Isotope
        var $grid = jQuery('.portfolio-grid.isotope-items').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });

        // filter functions
        var filterFns = {
        };
        // bind filter button click
        jQuery('.filters-button-group').on('click', '.filter-button', function () {
            var filterValue = jQuery(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({filter: filterValue});
        });
        // change is-checked class on buttons
        jQuery('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = jQuery(buttonGroup);
            $buttonGroup.on('click', '.filter-button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                jQuery(this).addClass('is-checked');
            });
        });
    },
    portfolioIsotopeMasonry: function () {
        // init Isotope
        var $grid = jQuery('.portfolio-masonry').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true

        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });

        // filter functions
        var filterFns = {
        };
        // bind filter button click
        jQuery('.filters-button-group').on('click', '.filter-button', function () {
            var filterValue = jQuery(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({filter: filterValue});
        });
        // change is-checked class on buttons
        jQuery('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = jQuery(buttonGroup);
            $buttonGroup.on('click', '.filter-button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                jQuery(this).addClass('is-checked');
            });
        });
    },
    photographyIsotopeMasonry: function () {
        // init Isotope
        var $grid = jQuery('#portfolio-photography').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });
    },
    shopIsotopeGrid: function () {
        // init Isotope
        var $grid = jQuery('#shop-products.isotope-items').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });

        // filter functions
        var filterFns = {
        };
        // bind filter button click
        jQuery('.filters-button-group').on('click', '.filter-button', function () {
            var filterValue = jQuery(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({filter: filterValue});
        });
        // change is-checked class on buttons
        jQuery('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = jQuery(buttonGroup);
            $buttonGroup.on('click', '.filter-button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                jQuery(this).addClass('is-checked');
            });
        });
    },
    stickySidebar: function () {
        var headerHeight = jQuery(".header-wrapper").height();
        var window_top = jQuery(window).scrollTop() + headerHeight + 50;
        var footer_top = jQuery("#footer-wrapper").offset().top - headerHeight;
        var div_top = jQuery('#sticky-anchor').offset().top;
        var div_height = jQuery(".fixed-sidebar").height();


        var padding = 0;  // tweak here or get from margins etc

        if (window_top + div_height > footer_top + headerHeight)
            jQuery('.fixed-sidebar').css({top: (window_top + div_height - footer_top + padding - headerHeight) * -1})
        else if (window_top > div_top) {
            jQuery('.fixed-sidebar').addClass('stick');
            jQuery('.fixed-sidebar').css({top: headerHeight + 50})
        } else {
            jQuery('.fixed-sidebar').removeClass('stick');
        }
    }
};
