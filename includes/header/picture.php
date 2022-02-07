<section class="page-header" bg-image="images/carousel-slides/slide__osen1.jpg">
    <div class="page-header__container">
        <div class="page-header__parent">
            <section class="page-header__caption">
            <h6 class="page-header__subheading wow shake" data-wow-duration="1s">
                Отдохни от городской суеты
            </h6>
            <h2 class="page-header__heading wow fadeInUp" data-wow-duration="0.7s">
                <span class="page-header__thin-text">Добро пожаловать в </span><span class="page-header__bold-text">Рожкао!</span>
            </h2>
            </section>
        </div>
    </div>
</section>

<!-- Картиночки -->
<div class="page-carousel">
    <div class="page-carousel__container">
        <div class="page-carousel__parent swiper-container">
            <div class="swiper-wrapper">
               <?php for($i = 0; $i <= 7; $i ++): ?>
               <a data-lightbox="swiper-slides" href="images/fotogalereya/fotogalereya__zima-2021/<?php echo($i + 1) ?>.jpg" class="swiper-slide page-carousel__slide lightbox-link">
                 <img src="images/fotogalereya/fotogalereya__zima-2021/<?php echo($i + 1) ?>__thumb.jpg" alt="осень в рожкао" class="page-carousel__image">
               </a>
               <?php endfor ?>
            </div>
        </div>
    </div>
</div>
