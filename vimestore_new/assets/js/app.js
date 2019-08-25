jQuery.fn.exists = function() {
    return $(this).length;
}

function changeImgSize(){
    var img = this.content.find('img');
    img.css('max-height', '100%');
    img.css('width', 'auto');
    img.css('max-width', '1000px');
}

$(document).ready(function() {
    $('.slider').slick({
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        adaptiveHeight: true
    });
    $('.online-sells').slick({
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        centerMode: false,
        autoplay: false,
        variableWidth: true
    });
    $('.product_screen').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true
    });
    if ($('.product_screen').exists()) {
        $('.slick-track').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            },
            callbacks: {
                resize: changeImgSize,
                imageLoadComplete:changeImgSize,
                change:changeImgSize
            }
        });
    };

    /*Draw*/

    if ($('.draw-main').exists()) {

        ($(".join-btn").hasClass("good") ? m = true : m = false);
        var n = 0,
            auth = false;
        console.log(m);
        if (m === false) {
            $.post("/draw/user/check", function(data) {
                $.each(data.user, function(key, check) {
                    check_demand(check, n);
                    n++;
                });
                (data.user.auth === true ? auth = true : '');
                console.log('Auth post: ' + auth);
                (data.access === true ? $(".join-btn").removeClass("disabled") : '');
            }, "json");

            function check_demand(d, n) {
                c = $(".demand:eq(" + n + ") span.payed-link")
                b = $(".demand:eq(" + n + ") a");
                if (d) {
                    c.addClass("on").text('Выполнено');
                    b.addClass("disabled");
                } else {
                    c.text('Не выполнено');
                }
            }
            $("#take").on("click", function() {
                $this = $(this);
                $this.addClass('loading').text('Загрузка...');
                $.post("/draw/user/add", function(data) {
                    $this.removeClass('loading');
                    if (data.error === true) {
                        $this.addClass('error').text(data.response);
                    } else {
                        $this.addClass('good').text('Вы участвуете');
                    }
                }, "json");
            });
        } else {
            $(".demand a").addClass("disabled");
            $(".demand span.payed-link").addClass("on").text('Выполнено');
        }
        $(".already-won").on("click", function() {
            if (auth) {
                $.post("/draw/user/my_wins", function(data) {
                    $("#prize").html(data);
                    $.magnificPopup.open({
                        items: {
                            src: '#win'
                        },
                        type: 'inline'
                    });
                });
            } else {
                return false;
            }
        });

    };

});

if ($('.online-sells').exists()) {

    _lastSale();

    function _lastSale() {
        setInterval(function() {
            var id = $('.online-sells .slick-track a:first-child').data('id');
            $.post("/ajax/last_sale_ajax", {
                lastID: id
            }, function(data) {
                if (data.new === true) {
                    $.each(data.product, function(key, product) {
                        $('.online-sells').slick('slickAdd', product, true);
                    });
                }
            }, "json");
        }, 30000);

    };

};

(function(a) {
    a.fn.countdown = function(h, e, t) {
        var c = a(this);
        var j = new Date();
        var g = h - Math.floor(j.getTime() / 1000);
        c.attr("title", t);

        function i() {
            var k = new Date();
            var l = Math.floor(e - (k.getTime() / 1000) - g);
            l--;
            if (l <= 0) {
                clearInterval(b);
                c.html("Раздача закончена!");
                return false
            }
            c.html(d(l))
        }

        function d(m) {
            var l = 0;
            var n = 0;
            var k = 0;
            l = Math.floor(m / 3600);
            n = Math.floor((m - l * 3600) / 60);
            k = m - l * 3600 - n * 60;
            return (l < 10 ? "0" + l : l) + ":" + (n < 10 ? "0" + n : n) + ":" + (k < 10 ? "0" + k : k)
        }
        i();
        var b = setInterval(i, 1000)
    }
})(jQuery);

$('.search-input').keyup(function(){
    var input_data = $('.search-input').val();
    if (input_data.length === 0) {
        $('.autocomplete-list').hide();
        $('.search-autocomplete').hide();
    } else {
        if (input_data.length >= 3) {
            $.ajax({
                type: "POST",
                url: "/ajax/autocomplete",
                data: {
                    'q': input_data
                },
                dataType: "json",
                success: function(data) {
                    $('.autocomplete-list').show();
                    $('.search-autocomplete').show();
                    if (data.count > 0) {
                        $('.autocomplete-list').html(data.html);
                        $('.search-wr-loadout-bot').show();
                        $('.js-live-search_all-link').attr('href', '/catalog?q=' + input_data);
                    } else {
                        $('.autocomplete-list').html('<div class="autocomplete-list"><div class="notfound">По вашему запросу ничего не найдено</div></div>');
                        $('.search-wr-loadout-bot').hide();
                    }
                }
            });
        };
    };
});