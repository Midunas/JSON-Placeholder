const swiper = new Swiper(".swiper-container", {
    slidesPerView: 5,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
    spaceBetween: 15,
    grid: {
      fill: "rows",
      rows: 3,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      init: function () {},
      orientationchange: function () {},
      beforeResize: function () {
          swiper.params.slidesPerView = 2;
          swiper.params.slidesPerColumn = 1;
          swiper.params.slidesPerGroup = 1;
        swiper.init();
      },
    },
  });