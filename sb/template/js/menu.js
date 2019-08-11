$(function () {
    $(window).scroll(function(e) {
		var st = $(window).scrollTop();
		if (st > 0) {
			$(".topmenu_box").addClass("topmenu_active");
		} else {
			$(".topmenu_box").removeClass("topmenu_active");
		}
	});
});
