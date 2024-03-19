<template>
  <section id="sectionFooter">
    <div class="image-content">
      <div class="slideTitle">
        <div class="overlay-footerTop"></div>
        <div class="overlay-footerBottom"></div>
        <div class="footerSwiper">
          <Swiper
            :modules="[SwiperAutoplay, SwiperEffectFade]"
            :slides-per-view="1"
            :spaceBetween="30"
            :centeredSlides="true"
            :loop="true"
            :effect="'creative'"
            :autoplay="{
              delay: 5000,
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
        </div>
        <h1
          class="item-footer text-light animate__animated"
          ref="animatedElement1"
          :class="animationClass1"
        >
          TERIMAKASIH
        </h1>
      </div>
      <div
        class="text-footer text-light animate__animated"
        ref="animatedElement2"
        :class="animationClass2"
      >
        <p class="font-content pt-1">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
          Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada
          kami.
        </p>
        <p class="font-content">Lost of Love,</p>
        <div class="nameCouple">
          <h1 class="font-title pe-2">Rulliana</h1>
          <h1 class="font-and pe-2">&</h1>
          <h1 class="font-title pe-2">Bayu</h1>
        </div>
        <div
          class="madeFooter pb-4 pt-5 bottomSlideFooter"
          ref="bottomSlideFooter"
        >
          <h4>Made With &#10084; by</h4>
          <h4 class="pt-2">Nekonads</h4>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      observer: null,
      lastY: 0,
      animationClass1: "",
      animationClass2: "",
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

    const bottomSlideFooter = this.$refs.bottomSlideFooter;
    if (bottomSlideFooter) {
      this.observer.observe(bottomSlideFooter);
    }

    const observer1 = new IntersectionObserver(this.handleIntersection1, {
      threshold: 0.1,
    });
    observer1.observe(this.$refs.animatedElement1);

    const observer2 = new IntersectionObserver(this.handleIntersection2, {
      threshold: 0.1,
    });
    observer2.observe(this.$refs.animatedElement2);
  },
  methods: {
    handleIntersection1(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animationClass1) {
          this.animationClass1 = "animate__slideInDown";
        }
      });
    },
    handleIntersection2(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animationClass2) {
          this.animationClass2 = "animate__slideInDown";
        }
      });
    },
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
<style>
.bottomSlideFooter {
  transition: 1s;
  opacity: 0;
  transform: translateY(-50px);
}

.bottomSlideFooter.is-inViewport {
  opacity: 1;
  transition: 2s;
  transform: translateY(0);
}
#sectionFooter {
  width: 100%;
  height: 100%;
}
#sectionFooter .image-content {
  background-color: var(--color-and);
  width: 100%;
  height: 100%;
  position: relative;
  /* background-image: url("/img/cover1.jpg"); */
  background-size: cover;
  background-position: 50% 50%;
}
.slideTitle {
  padding-top: 4em;
  background-color: var(--color-and);
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: 50% 50%;
}
.footerSwiper img {
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: 50% 50%;
}

.item-footer {
  padding: 1em 2em;
  position: absolute;
  bottom: 0;
  z-index: 2;
  font-size: 24px;
}

.text-footer {
  padding: 0 4em;
  width: 100%;
  height: 100%;
  background-color: var(--color-and);
}

.overlay-footerBottom,
.overlay-footerTop {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.overlay-footerBottom {
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(39, 39, 39, 1) 90%
  );
}
.overlay-footerTop {
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 0) 70%,
    rgba(39, 39, 39, 1) 84%
  );
}

.text-footer {
  font-size: 12px;
  text-align: justify;
  /* text-justify: inter-character; */
}

.nameCouple {
  display: flex;
  align-items: center;
}
.nameCouple h1:nth-child(odd) {
  font-size: 2.5em;
}
.nameCouple h1:nth-child(even) {
  font-size: 1.5em;
}
.madeFooter h4 {
  font-size: 12px;
}
.madeFooter h4:last-child {
  font-size: 48px;
  font-family: "Robertson-Alternate" !important;
}
</style>
