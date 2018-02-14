//= ../bower_components/jquery/dist/jquery.js
//= ../bower_components/popper.js/dist/umd/popper.js
//= ../bower_components/bootstrap/js/dist/util.js
//= ../bower_components/bootstrap/js/dist/dropdown.js


//= ../bower_components/owl.carousel/dist/owl.carousel.min.js

//= ../bower_components/microplugin/src/microplugin.js
//= ../bower_components/selectize/dist/js/standalone/selectize.min.js

//= ../bower_components/izimodal/js/iziModal.min.js

//= ../bower_components/js-cookie/src/js.cookie.js


// меню
$(function(){
	// если есть js добавляем специальную мету для меню
	$('.nav').addClass('nav--hasjs');
	
	// приводим по к виду по умолчанию
	$('.nav--hasjs').find('.nav__sublist').each(function(){
		$(this).addClass('nav__sublist--disabled').siblings('.nav__expand').removeClass('nav__expand--active').find('i').removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
	});

	// действия для раскытия подпунктов
	$('.nav__expand').on('click', function(e){
		e.preventDefault();
		if($(this).siblings('.nav__sublist').hasClass('nav__sublist--disabled')) {
			// раскрытие
			$(this).parent('.nav__item').siblings('.nav__item').each(function() {
				$(this).find('.nav__sublist').addClass('nav__sublist--disabled');
				$(this).find('.nav__expand').removeClass('nav__expand--active');
				$(this).find('i').removeClass('fa-angle-double-double-up').addClass('fa-angle-double-down');
			});
			$(this).addClass('nav__expand--active');
			$(this).siblings('.nav__sublist').removeClass('nav__sublist--disabled');
			$(this).find('i').removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
		} else {
			//закрытие
			$(this).siblings('.nav__sublist').addClass('nav__sublist--disabled');
			$(this).removeClass('nav__expand--active');
			$(this).find('i').removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
		}
		$(this).blur();
		
	});

	// выпадание и скрытие мобильного меню
	$('.nav__btn').on('click', function(){
		$('.nav--hasjs').css('left', 0);
	});
	$('.nav__close').on('click', function(){
		$('.nav--hasjs').css('left', '-100vw');
	});

});


// Табы
$(function() {
	tabsCollection = $('.collections.tabs').attr('id');
	console.log(tabsCollection);

	if(!Cookies.get(tabsCollection)) {
		var activeTab = $('li.collections__span.active').attr('data-name');
		Cookies.set(tabsCollection, activeTab);
	} else {
		var activeTab = Cookies.get(tabsCollection);
		var activeTabNum = $("li.collections__span[data-name='"+ activeTab +"']").index();
		$('.collections__span').eq(activeTabNum).addClass('active').siblings().removeClass('active')
			.closest('.tabs').find('div.tabs__content').removeClass('active').eq(activeTabNum).addClass('active');
	}
  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    var newTab = $(this).attr('data-name');
    Cookies.set(tabsCollection, newTab);
  });
});

$(function() {
  $('.videoedit__tabs').on('click', '.videoedit__tab:not(.videoedit__tab--active)', function() {
    $(this)
      .addClass('videoedit__tab--active').siblings().removeClass('videoedit__tab--active')
      .closest('.videoedit').find('.vieoedit__tabcontent').removeClass('vieoedit__tabcontent--active').eq($(this).index()).addClass('vieoedit__tabcontent--active');
  });
});



// карусель
$(function(){
	$('.carousel__list').owlCarousel({
		loop: true,
		nav: true,
		smartSpeed: 700,
		dots: false,
		autoplay: true,
		autoplayTimeout: 8000,
		navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
		responsive: {
			0: {
				items: 1
			}, 
			992: {
				items: 2
			}	
		}
	});
});


$(function() {
	$('select:not(.addtoalbum__select)').selectize();
});

$(function() {
	$('.dropdown-toggle').dropdown();
});

$(function(){
	$("#toAlbum").iziModal();
});

$(document).on('click', '.watch__camera', function (event) {
    event.preventDefault();
    // $('#modal').iziModal('setZindex', 99999);
    // $('#modal').iziModal('open', { zindex: 99999 });
    $('#toAlbum').iziModal('open');
});



// video.js
// videojs-contrib-ads.js
// videojs-preroll.js
// videojs('top-video', {}, function(){
//   var player = this;
//   player.preroll({
//     src:"http://79.170.191.82/uploads3/video/300/2017/12/08/f3e4296dceb4d408b1f714b3f8a28a0c.mp4",
//     adSign: true,
//     lang: {
//     	'skip':'Пропустить',
// 	    'skip in': 'Пропустить через ',
// 	    'advertisement': 'Реклама',
// 	    'video start in': 'Видео начнетсячерез: '
//     }
//   });
// });


