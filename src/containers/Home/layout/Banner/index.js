import React from 'react';
import Slider from 'react-slick';
import './styles.scss';

const ProductItem = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true
  };
  return (
    <div className="wrapper__banner">
      <div>
        <Slider {...settings} className="banner">
          <div>
            <img
              src="images/banner_1.jpg"
              alt="banner_1"
              className="banner__img"
            />
          </div>
          <div>
            <img
              src="images/banner_2.jpg"
              alt="banner_2"
              className="banner__img"
            />
          </div>
          <div>
            <img
              src="images/banner_3.jpg"
              alt="banner_3"
              className="banner__img"
            />
          </div>
          <div>
            <img
              src="images/banner_4.jpeg"
              alt="banner_4"
              className="banner__img"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ProductItem;
