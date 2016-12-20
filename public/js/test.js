
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
}

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
    $('.nav li.active').removeClass('active'),
        $('.nav a[href="'+global_section_id+'"]').closest('li').addClass('active');
}

function slide_to(){
    var header_height = $('header').outerHeight();

    $('.slideto:not(.active)').click(function(e){
        var el = $('#'+$(this).attr('href'));
        if (el.length){
            var el_top = el.offset().top - header_height + 10;
            $('html,body').animate({scrollTop:el_top},800);
        }
    });
}





$(window).resize(function(){

    if ($('#up2top').length) scrollcheck();
    if ($('.hidden').length) hidden_detect();
    if ($('.section').length) section_detect();

});

$(window).scroll(function(){

    if ($('#up2top').length) scrollcheck();
    if ($('.hidden').length) hidden_detect();
    if ($('.section').length) section_detect();

});

$(window).load(function(){

    if ($('.hidden').length) hidden_detect();
    if ($('.section').length) section_detect();
    if ($('.hide').length){
        $('.hide').removeClass('hide');
        setTimeout(function(){
            $('body').css('background','none');
            if ($('.after-send table').length) form_height();
        },400);
    }
    if ($('#slider').length) slider_init();

});



















//eof
/**
 * Created by Kostya on 31.03.2016.
 */
