/*
 * Filename	:custom-theme.js
 * 
 * UI settings for HTML developers
 * 
 * @package Require JS
 * @author  Sukumar P
 * @date 16-04-2015
 * @copyright (c) 2015 [Janaagraha] (http://janaagraha.org)
 */

$(document).ready(function () {
	
	/*
		top navbar carousel menu
	*/
	
	var navItemWidth = [];
	var itemTotalWidth = 0;
	$('.main-navbar > li').each(function() {
		navItemWidth = $(this).width();
		itemTotalWidth += navItemWidth; 
	});
	
	if(itemTotalWidth > 1000) {
		$('.main-navbar > li').css({'display': 'table-cell', 'float': 'none', 'vertical-align': 'top'});
		$('.main-navbar > li > a').css({'display': 'table-cell', 'padding-bottom': '12px', 'padding-top': '12px', 'vertical-align': 'middle'});
		var navMaxHeight = 0;
		$('.main-navbar > li > a').each(function() { navMaxHeight = Math.max(navMaxHeight, $(this).height()); }).height(navMaxHeight);
	}
		
	/*	----------------------------------------------------------------------------------------------------	*/
	
	/*
		10 million celebrations start
	*/
	$("body").on({
        click: function () {
			$('.millionCelebration').slideUp(600);
        }
    }, ".imgClose")	
	/*
		10 million celebrations end
	*/
	
	var navWidth = $(".breadcrumb-nav").width();
	var elLength = $(".breadcrumb-nav > *:not(span)").length;
	var indWidth = [], totalWidth = 0, activeWidth = 0;
	for(var i = 1; i <= elLength; i++) {
		indWidth = $(".breadcrumb-nav > *:nth-child(" + i +")").outerWidth(true);
		totalWidth += indWidth;
	}
	activeWidth = (navWidth - (totalWidth + 30));
	$(".breadcrumb-nav > span").css({"width": activeWidth + "px"});

    /*	!top navbar*/
    $('.top-navbar').scrollToFixed();

    $("body").on({
        mouseenter: function () {
            if ($(this).siblings("li").hasClass("open") === 1) {
                $(this).siblings("li").removeClass("open");
                $(this).addClass("open");
            }
            else {
                $(this).addClass("open");
            }
        },
        mouseleave: function () {
            $(this).removeClass("open");
        }
    }, ".top-navbar .main-navbar .main-navbar-dropdown")
    /*	#top navbar*/

    /*	----------------------------------------------------------------------------------------------------	*/

    /*	!sidebar*/
    $('.sticky-sidebar').scrollToFixed();
    /*	#sidebar*/

    /*	----------------------------------------------------------------------------------------------------	*/

    /*	!breadcrumb content box which is no border bottom and padding bottom*/
    if ($(".content-box-breadcrumb").length >= 1)
        $(".breadcrumb-nav").css({"border-bottom-style": "none", "padding-bottom": 0})
    /*	#breadcrumb*/

    /*	----------------------------------------------------------------------------------------------------	*/

    /*	!form ask a question in bribe hotline*/
    $("body").on({
        click: function (e) {
            e.preventDefault();
            var toggleObj = $(this).attr("href");
            if ($(toggleObj).hasClass("open")) {
                $(this).removeClass("active");
                $(toggleObj).hide(900).removeClass("open");
            }

            else {
                $(this).addClass("active");
                $(toggleObj).show(900).addClass("open");
            }
        }
    }, ".form-options-query-ask-qtn");

    if ($("form.ask-question").find(".has-error").length !== 0) {
        $("form.ask-question").addClass("open");
        $(".form-options-query-ask-qtn").addClass("active");
    }
    /*	#form ask a question in bribe hotline*/

    /*	----------------------------------------------------------------------------------------------------	*/

    /*	Ipab Im The News Page*/
    $('.news-in-media-list li a').mouseover(function () {
        $(this).find('.news-in-media-inner').stop().animate({height: 234}, 200);
        $(this).addClass("hover");
    }).mouseout(function () {
        $(this).find('.news-in-media-inner').stop().animate({height: 90}, 200);
        $(this).removeClass("hover");
    });

    /*	----------------------------------------------------------------------------------------------------	*/

    /*	!how tos listing as a card*/
    $("body").on({
        click: function (e) {
            e.preventDefault();

            var getHeight = $(".card-primary ul").height();
            $(".card-secondary ol").css("height", (getHeight - 30) + "px");
            $(".card-drop-down").css({"position": "relative", "top": "auto"});
            $(".card-drop-down").appendTo($(this).parents(".card-row"));

            $(this).parent(".card").addClass("open").siblings().removeClass("open");
            $(this).parents().siblings(".card-row").find(".open").removeClass("open");

            var el = $(this).parent().parent();
            var elOffset = el.offset().top;
            var elHeight = el.height();
            var windowHeight = $(window).height();
            var offset;

            if (elHeight < windowHeight) {
                offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
            }
            else {
                offset = elOffset;
            }
            $('html, body').animate({scrollTop: offset}, 500);
        }
    }, ".card > a");

    $("body").on({
        click: function (e) {
            e.preventDefault();
            var hrefVal = $(this).attr("href");
            $(this).parent("li").addClass("active");
            if ($(this).parent("li").siblings().hasClass("active")) {
                $(this).parent("li").siblings().removeClass("active");
                $(this).parent("li").addClass("active");
            }

            $(hrefVal).css({"position": "static"});
            $(hrefVal).siblings(".sub-category").css({"position": "absolute"});
        }
    }, ".card-primary ul > li > a");

    $("body").on({
        click: function (e) {
            e.preventDefault();
            $(this).parents(".card-drop-down").css({"position": "absolute", "top": "-9999px"});
            $(".card").removeClass("open");
        }
    }, ".card-secondary .close");

    $("body").on({
        click: function (e) {
            e.preventDefault();
            $(".card-secondary ol").mCustomScrollbar({
                setHeight: 0,
                theme: "dark-3"
            });
        }
    }, ".card-primary ul > li > a");

    /*	----------------------------------------------------------------------------------------------------	*/
    /*	User news letter registration */
    $("#news-letter-save").on("click", function () {
        $(".news_letter_user_name").html('');
        $(".news_letter_user_email").html('');
        $(".news_letter_user_city").html('');
        var full_name_dom_obj = $('#news-letter-user-name');
        var email_dom_obj = $('#news-letter-user-email');
        var city_dom_obj = $('#news-letter-user-city');
        var full_name = $.trim(full_name_dom_obj.val());
        var email = $.trim(email_dom_obj.val());
        var city_id = $.trim(city_dom_obj.val());
        var ret = true;
        var email_validate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        var chk_spl_char = /^\s*[a-zA-Z0-9,\s]+\s*$/;
        var space_char = /(^[\s]+|[\s]+$)/g;
        var full_name_reg = /^([A-Za-z .]){3,200}$/;
        if (full_name == "" || full_name == "Enter your Name") {
            simpleAjaxCall({formMethod: 'POST', dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'full_name_required', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(full_name_dom_obj, message);
            });
            ret = false;
        } else if (!full_name_reg.test(full_name)) {
            simpleAjaxCall({formMethod: 'POST', dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'valid_full_name', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(full_name_dom_obj, message);
            });
            ret = false;
        } else {
            removeError(full_name_dom_obj);
        }
        if (email == "" || email == " ") {
            simpleAjaxCall({formMethod: 'POST', dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'email_required', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(email_dom_obj, message);
            });
            ret = false;
        } else if (email_validate.test(email) == false) {
            simpleAjaxCall({formMethod: 'POST', dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'valid_email', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(email_dom_obj, message);
            });
            ret = false;
        } else {
            removeError(email_dom_obj);
        }
        if (city_id == 0) {
            simpleAjaxCall({formMethod: 'POST', dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'city_required', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(city_dom_obj, message);
            });
            ret = false;
        }
        else {
            removeError(city_dom_obj);
        }
        if (ret == false) {
            return ret;
        } else if (ret == true) {
            var config = {
                'formMethod': 'POST',
                'data': {
                    'full_name': full_name,
                    'email': email,
                    'city_id': city_id
                },
                'source': 'users/save',
                'dataType': 'JSON'
            };

            simpleAjaxCall(config).done(function (data) {
                var email = $("#news-letter-user-email").val();
                if (data.status) {
                    $(".news_letter_content").html("");
                    $(".news_letter_content").html(data.content).hide().fadeIn(10000, function () {
                        window.location.href = globalConfig.url;
                    });
                } else {
                    $(".news_letter_content").html("");
                    $(".news_letter_content").html(data.content).hide().fadeIn(8000, function () {
                        window.location.href = globalConfig.url;
                    });
                }
                return false;
            });
            return false;
        }
        return false;
    });
    /*	User news letter registration */
	
	$("body").on({
        click: function (e) {
            e.preventDefault();
            $("#userRegisterForm").find(".form-group").removeClass("has-error");
			$("#userRegisterForm").trigger("reset");
			$("#userRegisterForm .chzn-select-deselect").trigger('chosen:updated');
			defaultPlaceholder();
        }
    }, "[href='#registerUpdate']");
	
	$("body").on({
        click: function (e) {
            e.preventDefault();
            $("[id*='askQuestionToggle']").find(".form-group").removeClass("has-error");
			$("[id*='askQuestionToggle']").trigger("reset");
			$("[id*='askQuestionToggle'] .chzn-select-deselect").trigger('chosen:updated');
			defaultPlaceholder();
        }
    }, ".form-options-query-ask-qtn");
	
	/*header mobile view start*/
	
	function smallWindowHeight() {
		var winHeight = $(window).height();
		var faceHeight = $(".device-sm .face").outerHeight(true);
		var activeHeaderHeight = $(".device-sm .active-header").outerHeight(true);
		var reqHeight = winHeight;
		$(".device-sm .navbar-collapse").css({"min-height": reqHeight + "px", "max-height": reqHeight + "px", "overflow-y": "auto"});
		
		$(".device-sm .navbar-nav").css({"height": (reqHeight - (faceHeight + activeHeaderHeight)) +"px", "overflow-y": "auto"})
				
		$("html").css("overflow-y", "hidden");
		$('.device-sm').scrollToFixed();
	}
	
	$("body").on({
		click: function() {
			smallWindowHeight();
		}
	}, ".device-sm button[aria-expanded='false']");
	
	$("body").on({
		click: function() {
			$("html").css("overflow-y", "visible");
		}
	}, ".device-sm button[aria-expanded='true']");
	
	$(window).resize(function() {
		if($(".device-sm .navbar-collapse.in").length === 1) {
			smallWindowHeight();
		}
	});
	
	$("body").on({
		click: function(e) {
			e.preventDefault();
			smallWindowHeight();
		}
	}, "header.device-sm .top-navbar .navbar-nav > li > a");
	/*header mobile view end*/
	
});

/*	----------------------------------------------------------------------------------------------------	*/

function defaultPlaceholder() {
	$(".chosen-single > span").each(function() {
		var placeholderName = $(this).parents(".chosen-container").siblings(".chzn-select-deselect").attr("data-placeholder");
		$(this).html(placeholderName).parent().addClass("chosen-default");
	});
}

(function ($) {
    var config = {
        '.chzn-select': {},
        '.chzn-select-deselect': {allow_single_deselect: true},
        '.chzn-select-no-single': {disable_search_threshold: 10},
        '.chzn-select-no-results': {no_results_text: 'Oops, nothing found!'},
        '.chzn-select-width': {width: "95%"}
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
})(jQuery);

/*	----------------------------------------------------------------------------------------------------	*/

/*	** modal vertically middle align*/
 
function reposition() {
	var modal = $(this),
	dialog = modal.find('.modal-dialog');
	modal.css('display', 'block');
	/*
		Dividing by two centers the modal exactly, but dividing by three  or four works better for larger screens.
	*/
	dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
}
/*
Reposition when a modal is shown
*/
$('.modal').on('show.bs.modal', reposition);

/*
Reposition when the window is resized
*/
$(window).on('resize', function() {
	$('.modal:visible').each(reposition);
});

/* End of file custom-theme.js */
/* Location: ./assets/js/custom-theme.js */