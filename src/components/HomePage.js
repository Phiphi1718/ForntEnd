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
        spaceBetween={0} // Khoảng cách giữa các slide
        slidesPerView={1} // Chỉ hiển thị một slide một lúc
        loop={true} // Lặp lại vòng quay các slide
        autoplay={{
          delay: 5000, // Thời gian delay giữa các slide (3 giây)
          disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
          waitForTransition: true,
        }}
        effect="fade" // Hiệu ứng chuyển đổi giữa các slide
        modules={[Autoplay, EffectFade]} // Thêm các module Autoplay và EffectFade
      >
        <SwiperSlide>
          <div className="banner-slide" style={{ backgroundImage: "url('/banner.jpg')" }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-slide" style={{ backgroundImage: "url('/banner2.jpg')" }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-slide" style={{ backgroundImage: "url('/banner3.jpg')" }}></div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HomePage;
