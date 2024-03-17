<template lang="">
  <section id="weddingDetail">
    <div
      align="center"
      class="title-heading m-0 animate__animated"
      ref="animatedElement"
      :class="animationClass"
    >
      <h1 class="font-content mb-0">Wedding Event</h1>
      <div class="line-separator-dark"></div>
    </div>
    <div class="row justify-content-md-center slideLeft" ref="slideLeft">
      <div align="start" class="cover-rundown top">
        <div class="slide-img">
          <Swiper
            :modules="[SwiperAutoplay, SwiperEffectFade]"
            :slides-per-view="1"
            :spaceBetween="30"
            :centeredSlides="true"
            :loop="true"
            :effect="'fade'"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :creative-effect="{
              prev: {
                shadow: false,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }"
          >
            <swiper-slide><img src="/slider1/2.jpg" /></swiper-slide>
            <swiper-slide><img src="/slider1/3.jpg" /></swiper-slide
            ><swiper-slide><img src="/slider1/4.jpg" /></swiper-slide>
          </Swiper>
          <div class="image-overlay-rundown"></div>
          <div class="item-rundown col-12">
            <h1 class="title-resepsi schedule-title ps-2">Reception</h1>
            <p class="title-date ps-4 mb-0">Selasa, 11 Desember 2024</p>
            <p class="title-time ps-4">10.00 WIB</p>
            <p class="title-address ps-4 mb-0">
              Jln. perum palem pertiwi blok G no.51
            </p>
            <p class="title-location ps-4">
              Kec. Gresik, Kabupaten Gresik, Jawa Timur, Indonesia
            </p>
            <NuxtLink
              to="https://www.google.com/maps/place/DapurQ/@-7.2843741,112.5723024,12z/data=!4m11!1m3!11m2!2s-mJblZ0y90_W2xjVmf149MhRhorSRw!3e2!3m6!1s0x2e7801327e38bf45:0xa28c5aca5244994f!8m2!3d-7.2605872!4d112.5816391!15sCgEqWgMiASqSARFicnVuY2hfcmVzdGF1cmFudOABAA!16s%2Fg%2F11lh4tyk7b?entry=ttu"
              target="_blank"
            >
              <div align="center" class="btnLink pt-3 pb-4">
                <button
                  type="button"
                  class="btn-lg-rounded btn-link font-content"
                >
                  Google Maps
                </button>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center slideRight" ref="slideRight">
      <div align="end" class="cover-rundown bottom">
        <div class="slide-img">
          <Swiper
            :modules="[SwiperAutoplay, SwiperEffectFade]"
            :slides-per-view="1"
            :spaceBetween="30"
            :centeredSlides="true"
            :loop="true"
            :effect="'fade'"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :creative-effect="{
              prev: {
                shadow: false,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }"
          >
            <swiper-slide><img src="/slider1/3.jpg" /></swiper-slide>
            <swiper-slide><img src="/slider1/4.jpg" /></swiper-slide
            ><swiper-slide><img src="/slider1/2.jpg" /></swiper-slide>
          </Swiper>
          <div class="image-overlay-rundown"></div>
          <div class="item-rundown col-12">
            <h1 class="schedule-title pe-4">Unduh Mantu</h1>
            <p class="title-date pe-4 mb-0">Selasa, 11 Desember 2024</p>
            <p class="title-time pe-4">10.00 WIB</p>
            <p class="title-address pe-4 mb-0">
              Jln. perum palem pertiwi blok G no.51
            </p>
            <p class="title-location pe-4">
              Kec. Gresik, Kabupaten Gresik, Jawa Timur, Indonesia
            </p>
            <NuxtLink to="" target="_blank">
              <div align="center" class="btnLink pt-3 pb-4">
                <button
                  type="button"
                  class="btn-lg-rounded btn-link font-content"
                >
                  Google Maps
                </button>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      animationClass: "",
      observer: null,
      lastY: 0,
    };
  },
  mounted() {
    const obsOptions = {
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection,
      obsOptions
    );

    // SlideLeft & SlideRight
    const slideLeft = this.$refs.slideLeft;
    const slideRight = this.$refs.slideRight;

    // Observasi Resepsi
    if (slideLeft) {
      this.observer.observe(slideLeft);
    }
    // Observasi UnduhMantu
    if (slideRight) {
      this.observer.observe(slideRight);
    }
    const observer = new IntersectionObserver(this.handleAnimateIntersection, {
      threshold: 0.5,
    });
    observer.observe(this.$refs.animatedElement);
  },
  methods: {
    // Animate
    handleAnimateIntersection(entries) {
      entries.forEach((entry) => {
        // Jika elemen masuk ke dalam viewport dan animasi belum pernah dimainkan sebelumnya
        if (entry.isIntersecting && !this.animationClass) {
          this.animationClass = "animate__fadeInDown"; // Ganti dengan kelas animasi yang diinginkan dari animate.css
        }
      });
    },
    // Custom
    handleIntersection(entries) {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
      });
    },
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>
<style scooped>
/* Female Profile */
.slideLeft {
  transition: 1s;
  opacity: 0;
  transform: translateX(-100px);
}
.slideLeft.is-inViewport {
  opacity: 1;
  transform: translateY(0);
}
/* Male Profile */
.slideRight {
  transition: 1s;
  opacity: 0;
  transform: translateX(100px);
}
.slideRight.is-inViewport {
  opacity: 1;
  transform: translateY(0);
  transition: 2s;
}
@media (prefer-reduced-motion) {
  .slideLeft,
  .slideRight {
    transition: none;
  }
}
#weddingDetail {
  /* border: 1px solid red; */
  background-size: contain;
  background-color: var(--color-bg);
  padding: 30px 2em;
  width: 100%;
}
#weddingDetail .row {
  flex-direction: column-reverse;
}

.title-heading h1 {
  font-size: 24px;
}

.rundown {
  width: 100%;
  color: var(--color-bg);
  text-align: start;
}

.cover-rundown {
  padding: 0;
  display: flex;
  margin: 2em 0;
  background-color: var(--color-and);
  position: relative;
  flex-direction: column;
}
.item-rundown {
  position: absolute;
  z-index: 3;
  bottom: 0;
  top: 0;
  color: var(--color-bg);
}

.item-rundown p {
  font-size: 14px;
  font-family: "Montserrat" serif;
}
.title-resepsi,
.schedule-title {
  margin: 10px 5px;
  font-family: "Robertson-Alternate" !important;
  font-size: 48px;
}

/* Button Hover & Action */

.btn-link {
  color: var(--color-bg);
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 90%;
  height: 40px;
  align-items: center;
  border: 1px solid var(--color-bg);
  border-radius: 10px;
  transition: all ease-in 0.2s !important;
  text-decoration: none;
}
.btn-link:hover {
  color: var(--color-bg);
  transform: translateY(-6px);
  border-radius: 10px;
  transition: transform ease 0.2s;
  opacity: 1 !important;
  box-shadow: 0px 2px 0px 1px #000;
}

.btn-link:active {
  font-weight: 600;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  transform: translateY(2px);
  transition: transform ease 0.5s;
  box-shadow: 0px 0px 0px 0px #000;
}
/* Close button */

.slide-img {
  position: relative;
  top: 0;
  left: 0;
}
.slide-img img {
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: 50% 50%;
}
.image-overlay-rundown {
  position: absolute;
  z-index: 3;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  height: 100%;
  left: 0;
  top: 0;
}
</style>
