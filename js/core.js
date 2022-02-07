let button = document.querySelector('.page-navbar__hamburger-button');
let block = document.querySelector('.page-navbar__navigation-parent');

let header = $('.page-header');

const slide_up_timing = 150;
const slide_down_timing = 250;
// Чиним dark reader
$('html').attr('style', 'background:none !important;' );
// Прелоадер
$(window).on('load', function () {
  setTimeout(load, 300);
});

// $("a[href$='.php']").attr('href', function() {
//   $("a[href$='.php']").attr('href').replace(/.php/gi, '')
// })

// Автоподставка тега active в навигации
$(function(){
  let url = window.location.pathname,
      urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there

      // if (url = '/') {
      //   $('.page-navbar__navigation-item-link[href=index.php]').addClass('active');
      //   console.log('Подходит')
      // };

      // now grab every link from the navigation
      if (url != '/') {
        $('.page-navbar__navigation-item-link').each(function(){
          // and test its normalized href against the url pathname regexp
          if(urlRegExp.test(this.href.replace(/\/$/,''))){
              $(this).parent().addClass('active');
          }
        });

        $('.page-navbar__dropdown-link').each(function(){
            // and test its normalized href against the url pathname regexp
            if(urlRegExp.test(this.href.replace(/\/$/,''))){
                $(this).parent().addClass('active');
                $(this).parent('.page-navbar__dropdown-item').parent('.page-navbar__dropdown').parent('.page-navbar__navigation-item--dropdown').addClass('active');
            }
          });
      } else {
        $('.page-navbar__navigation-item-link[href^="index"]').each(function(){
          // and test its normalized href against the url pathname regexp
          $(this).parent().addClass('active');
        });
      };
});

// === Попап
let popup = document.querySelector('.popup-fade')
let popup_activator = $('.popup-opener')
let popup_closer = $('.popup-close')

// Открыть попап
popup_activator.click(function() {
  // Меняем url
  let url = window.location.pathname;
  window.history.pushState(null, null, url + '#poopup-is-opened');
  // Определяем блок с текстом
  let text_body = $(this).parent().children('.hidden-content-for-popup').children();

  // Заполняем попап
  $(text_body).clone(true).unwrap().appendTo('.popup__container-for-content');

  // Добавляем класс active
  popup.classList.add('active');

  // Убираем колесо прокрутки
  $('body').css('overflow-y', 'hidden');




  // Делаем отступ
  $('body').css('padding-right', getScrollbarWidth());
  $('.page-navbar__navigation-container').css('padding-right', `${getScrollbarWidth()}px`);
});
// Закрыть попап кнопкой
popup_closer.click(function() {
  closePopup()
});

// Закрыть попап кликом вне области всплывающего окна
popup.onclick = function(e) {
  if (!$('.popup-centering').is(e.target) && $('.popup-centering').has(e.target).length === 0) {
    closePopup()
  };
};

function closePopup() {
  popup.classList.remove('active')

  // Меняем Url
  let url = window.location.pathname;
  window.history.pushState(null, null, url + '');
  // Добавляем колесо прокрутки
  $('body').css('overflow-y', 'auto');
  // Делаем отступ
  $('body').css('padding-right', '0');
  $('.page-navbar__navigation-container').css('padding-right', '0');

  // Очищаем попап
  $('.popup__container-for-content').html('');
}

function readmore() {
  const news = $('.page-news__text');
  news.children('.page-news__content').children('.page-news__readmore-open').click(function() {
    $(this).parent('.page-news__content').children('.hidden-post-content').addClass('active');
    $(this).parent('.page-news__content').children('.hidden-post-content').children('.page-news__readmore-close').addClass('visible');
    $(this).addClass('hidden');
  });
  news.children('.page-news__content').children('.hidden-post-content').children('.page-news__readmore-close').click(function() {
    $(this).parent('.hidden-post-content').removeClass('active');
    $(this).removeClass('visible');
    $(this).parent('.hidden-post-content').parent('.page-news__content').children('.page-news__readmore-open.hidden').removeClass('hidden');
  });
};

// Нажатие по кнопке
button.onclick = function(e) {
  e.stopPropagation();

  toggleMenu();
};
// document.onclick = function(e) {
//   let target = e.target;

//   let menu = target == block || block.contains(target);
//   let hamburger = target == button;
//   let menu_active = block.classList.contains('active');

//   if (!menu && !hamburger && menu_active) {
//     toggleMenu();
//   };
// };
function toggleMenu () {
  if($(block).hasClass('active')) {
    $(block).animate({
      left: "-100%"
    }, 400);;

    $(block).toggleClass('active');
  } else {
    $(block).animate({
      left: "0"
    }, 400);;

    $(block).toggleClass('active');
  }
};
// Выпадающее меню
$(document).ready(function(){
  // Подстановка фона
  backgrounder();
  // Проверка Url

  if(window.location.hash.indexOf('#popup-is-opened') !== -1) {
    closePopup()
  }
  // Читать далее
  readmore();

  // Фиксация меню при покрутке
  if ($(window).scrollTop() > 75) {
    menuFixation();
  };
  menuFixation();
	document.onclick = function(e) {
    if (!$(block).is(e.target) && $(block).hasClass('active') && $(block).has(e.target).length === 0) {
      toggleMenu();
    };
    let active = $('.page-navbar__dropdown.is-active');
    let active_l = active.prev();
    if (!active.is(e.target) && !active_l.is(e.target)) {
        active.slideUp(slide_up_timing);
        active.removeClass('is-active')
        active_l.removeClass('active')
      };
    };
  $(".page-navbar__navigation-item--dropdown > a").on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass("active")) {
      $(this).next().slideUp(slide_up_timing);
      $(this).removeClass("active");
      $(this).next().removeClass('is-active');
    } else {
      $(".page-navbar__navigation-item--dropdown > a").removeClass('active');
      $('.page-navbar__dropdown').slideUp();
      $(this).addClass("active");
      $(this).next().slideDown(slide_down_timing);
      $(this).next().addClass('is-active');
    };
  });
});
// Подставка фона через атрибут bg-image
function backgrounder() {
  let blocks = document.querySelectorAll('[bg-image]');
  let array = Array.prototype.slice.call(blocks)
  array.forEach(function(item, i, arr) {
    let attr = item.getAttribute('bg-image');
    item.style.backgroundImage = `url(${attr})`;

    let position = item.getAttribute('bg-position');
    item.style.backgroundPosition = position;
  });
};
function menuFixation() {
  $(window).scroll(function(){
    if($(this).scrollTop()> $('.page-navbar__upper-container').height()){
        $('.page-navbar__navigation-container').addClass('fixed');
        header.css('margin-top', `${$('.page-navbar__navigation-container').height()}px`);
      }
      else if ($(this).scrollTop()< $('.page-navbar__upper-container').height()){
        $('.page-navbar__navigation-container').removeClass('fixed');
        header.css('margin-top', '');
    };
  });
};

function load() {
  $('.preloader').fadeOut().end().delay(400).fadeOut('slow');
  new WOW().init();

  let position = document.documentElement.scrollTop;

  console.log('Позиция прокрутки = ' + position)

  if (position > $('.page-navbar__upper-container').height()) {
    $('.page-navbar__navigation-container').addClass('fixed');
    header.css('margin-top', `${$('.page-navbar__navigation-container').height()}px`);
  };
};


// Получаем ширину скролла
let getScrollbarWidth = function() {
  let div, width = getScrollbarWidth.width;
  if (width === undefined) {
    div = document.createElement('div');
    div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
    div = div.firstChild;
    document.body.appendChild(div);
    width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }
  return width;
};

console.log('Ширина колеса прокрутки на вашем устройстве = ' + getScrollbarWidth())
