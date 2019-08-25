$(function() {
    $('#goods a.tabs').click(function() {
        var tab_id = $(this).attr('id');
        tabClick(tab_id)
    });

    function tabClick(tab_id) {
        if (tab_id != $('#goods a.active').attr('id')) {
            $('#goods .tabs').removeClass('active');
            $('#' + tab_id).addClass('active');
            $('#con_' + tab_id).addClass('active');
        }
    }
    $('.open_menu').click(function(e) {
        if ($(this).hasClass('opened')) {
            $('#menu_overlay').hide();
            $('#container').removeClass('opened');
            $(this).removeClass('opened');
            setTimeout(function() {
                $('#menu').hide();
            }, 350);
        } else {
            if ($('#header').hasClass('cart_opened')) {
                $('#header').removeClass('cart_opened')
            }
            $('#menu').show();
            $('#menu_overlay').show();
            $('#container').addClass('opened');
            $(this).addClass('opened');
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        }
    });
    $('#menu_overlay').click(function() {
        $('#menu_overlay').hide();
        $('#container').removeClass('opened');
        $('.open_menu').removeClass('opened');
        setTimeout(function() {
            $('#menu').hide();
        }, 350);
    })
    $(document).mouseup(function(e) {
        var container = $("#header");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('#header').hasClass('cart_opened')) {
                $('#header').removeClass('cart_opened')
            }
        }
    });
});
$(document).ready(function() {
    $('body').after('<!--\nСайт был разработан студией YTStyle\nАдрес студии: http://ytstyle.ru/\nСайт управляется системой YT Shop Engine\n-->');
});