// HomePage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import FeaturedProducts from './FeaturedProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade } from 'swiper';
import IceBlended from './IceBlended';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsPromotion from './NewsPromotion';


// Import các component CartButton và FloatingButton
import CartButton from '../components/CartButton'; // Đảm bảo đúng đường dẫn
import FloatingButton from '../components/FloatingButton'; // Đảm bảo đúng đường dẫn

function HomePage() {
  return (
    <div>
      <MainBanner />
      <FeaturedProducts />
      <IceBlended />
      <NewsPromotion />
      <FloatingButton /> {/* Nút Hotline */}
      <CartButton /> {/* Nút Giỏ hàng */}
      
    </div>
  );
}

function MainBanner() {
  return (
    <section className="banner-home">
  <Swiper
    spaceBetween={0}
    slidesPerView={1}
    loop={true}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
      waitForTransition: true,
    }}
    effect="fade"
    modules={[Autoplay, EffectFade]}
  >
    <SwiperSlide>
      <div className="banner-slide">
        <img src="/banner.jpg" alt="Banner 1" />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="banner-slide">
        <img src="/banner2.jpg" alt="Banner 2" />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="banner-slide">
        <img src="/banner3.jpg" alt="Banner 3" />
      </div>
    </SwiperSlide>
  </Swiper>
</section>

  );
}

export default HomePage;
