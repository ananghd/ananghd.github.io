/*  ---------------------------------------------------
    Template Name: Sona
    Description: Sona Hotel Html Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Offcanvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
   $(".hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Date Picker
	--------------------*/
    $("#date-in").datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy',
        defaultDate: "22 August, 2024",
        onSelect: function(dateText, inst) {
            // You can also perform other actions here
            console.log("Date selected:", dateText);
            var selected = new Date(dateText);
            var today = new Date();

            // Calculate the time difference in milliseconds
            var timeDifference = Math.abs(today - selected);

            // Convert the time difference from milliseconds to days
            var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))+1;
            console.log("Days difference:", dayDifference);

            $("#date-out").datepicker("option", "minDate", dayDifference); 
        }
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    $("#date-out").datepicker({
        minDate: 1,
        dateFormat: 'dd MM, yy',
        defaultDate: "23 August, 2024"
    });

    /*------------------
		Nice Select
	--------------------*/
    $("select").niceSelect();

    // check AvailabilityBtn
    $("#checkAvailabilityBtn").on("click", function() {
        let startDate =  $("#date-in").datepicker("getDate");
        let endDate =  $("#date-out").datepicker("getDate");
        let checkIn =  $.datepicker.formatDate("yy-mm-dd", startDate);
        let checkOut =  $.datepicker.formatDate("yy-mm-dd", endDate);
        let room = $("#room").val();
        let guest = $("#guest").val();
        let guestType = guest == 1 ? 'Single' : (guest == 2 ? 'Double' : (guest == 3 ? 'Triple': 'Triple'));
        let roomGrades = [];
        for (let index = 0; index < room; index++) {
            roomGrades.push(`${guest}:0:0:0:${guestType}`);
        }
        const rg = roomGrades.join('%7C');
        console.log(`date ${startDate} ${endDate} ${checkIn} ${checkOut} ${room} ${guest}`);
        let encodeId = 'TUEyNDAzMDAwMDA1';
        let id = 'MA05110755-MA2403000005';
        let baseUrl = 'https://www.artotelwanderlust.com/hotel/artotel-gelora-senayan/g/jakarta-en.html?';
        let url = `${baseUrl}checkIn=${checkIn}&checkOut=${checkOut}&rm=${room}&rg=${rg}&id=${id}&encodeId=${encodeId}`;
        window.open(url, "_blank");
    });

})(jQuery);