$.fn.isOnScreen = function(){
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

$.fn.isOnScreenSection = function(){
	var viewport = {};
	viewport.top = $(window).scrollTop();
	viewport.bottom = viewport.top + 100;
	var bounds = {};
	bounds.top = this.offset().top;
	bounds.bottom = bounds.top + this.outerHeight();
	return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

function hidden_detect(){
	$('.hidden').each(function(){
		if ($(this).isOnScreen()){
			$(this).removeClass('hidden');
		}
	});
}

function section_detect(){
	global_section_id = 'top';
	$('.section').each(function(){
		if ($(this).isOnScreenSection()){
			global_section_id = $(this).attr('id');
		}
	});
	$('.slideto').removeClass('selected');
    $('.slideto[href="'+global_section_id+'"]').addClass('selected');
}

$(function(){
    $('.js-index-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2400,
        arrows: false,
        dots: false,
        fade: true,
        speed: 800
    });

    $('.js-next-brand').on('click',function(){
        $(this).closest('.js-slider-wrapper').find('.js-index-slider').slick("slickNext");
    });

    $('.js-prev-brand').on('click',function(){
        $(this).closest('.js-slider-wrapper').find('.js-index-slider').slick("slickPrev");
    });

    $('.up-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1200);
        return false;
    });

    $('.to-down-arrow').click(function(){
        var height = $("#wrapper main").height();

        $("html,body").animate({"scrollTop":height}, 1200);

    });

    $('.js-menu-toggle').click(function(){
        $(this).closest('#wrapper').find('.main-nav-menu').slideToggle('300');
    });

});

$(window).bind('ready resize scroll', function() {
    var scrollStart = $(window).height() + 100;
    var scrollTop = $(window).scrollTop();
    if (scrollTop > scrollStart) {
        $('.fixed-scrolling-nav').fadeIn();
    } else {
        $('.fixed-scrolling-nav').fadeOut();
    }
});

function slide_to(){
    var header_height = $('header').outerHeight();

    $('.slideto').click(function(e){
        var el = $('#'+$(this).attr('href'));

        if ($(this).hasClass('selected')) {
            $('.slideto').removeClass('selected');
            $(this).removeClass('selected');
        } else {
            $('.slideto').removeClass('selected');
            $(this).addClass('selected');
        }

        if (el.length){
            var el_top = el.offset().top - header_height + 10;
            $('html,body').animate({scrollTop:el_top},800);
        }
        e.preventDefault();
    });
}

$(document).ready(function(){
    if ($('.slideto').length) slide_to();
});

$(window).resize(function(){
    if ($('.hidden').length) hidden_detect();
    if ($('.section').length) section_detect();

});

$(window).scroll(function(){
    if ($('.hidden').length) hidden_detect();
    if ($('.section').length) section_detect();

});

$(window).load(function(){

    if ($('.hidden').length) hidden_detect();
    if ($('.section').length) section_detect();
    if ($('.hide').length){
        $('.hide').removeClass('hide');
    }
});


$(window).on('ready load resize',function(){
    $('.js-content-width').width($(window).width());
    $('.main-top-slider .slick-list').height($(window).height());
});

