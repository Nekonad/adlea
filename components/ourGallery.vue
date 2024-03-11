<template lang="">
  <div id="ourGallery">
    <div class="containerOurgallery">
      <div
        align="center"
        class="title-heading m-0 animate__animated"
        ref="animatedElement"
        :class="animationClass"
      >
        <h1 class="font-content mb-0">Our Gallery</h1>
        <div class="line-separator" style="width: 70%"></div>
      </div>
      <div class="cover-gallery py-5">
        <div class="row py-2 slideFirst" ref="slideFirst">
          <div class="col-4">
            <img
              src="/img/thumbnail/1.jpg"
              alt=""
              class="img-fluid slide-item slideFirstItem"
            />
          </div>
          <div class="col-4">
            <img
              src="/img/thumbnail/2.jpg"
              alt=""
              class="img-fluid slide-item slideFirstItem"
            />
          </div>
          <div class="col-4">
            <img
              src="/img/thumbnail/3.jpg"
              alt=""
              class="img-fluid slide-item slideFirstItem"
            />
          </div>
        </div>
        <div class="row justify-content-between py-2 slideSec" ref="slideSec">
          <div class="col-8">
            <img
              src="/img/thumbnail/4.jpg"
              alt=""
              class="img-fluid slide-item slideSecItem"
            />
          </div>
          <div class="col-4">
            <img
              src="/img/thumbnail/5.jpg"
              alt=""
              class="img-fluid slide-item slideSecItem"
            />
          </div>
        </div>
        <div class="row py-2 slideThird" ref="slideThird">
          <div class="col-3">
            <img
              src="/img/thumbnail/6.jpg"
              alt=""
              class="img-fluid slide-item slideThirdItem"
            />
          </div>
          <div class="col-9">
            <img
              src="/img/thumbnail/7.jpg"
              alt=""
              class="img-fluid slide-item slideThirdItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animationClass: "", // Kelas animasi awalnya kosong
    };
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    // Animate
    handleAnimateIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animationClass) {
          this.animationClass = "animate__fadeInDown"; //
        }
      });
    },
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        // Panggil kedua method handleIntersection dan handleAnimateIntersection di dalam fungsi pengamat Intersection Observer
        this.handleIntersection(entries);
        this.handleAnimateIntersection(entries);
      },
      {
        threshold: 0.5, // Ambil tindakan saat elemen masuk sebanyak 50% ke dalam viewport
      }
    );

    // Observasi setiap ".slideFirst .slide-item"
    const slideFirstItems = this.$el.querySelectorAll(".slideFirstItem");
    slideFirstItems.forEach((item) => {
      observer.observe(item);
    });

    // Observasi setiap ".slideSec .slide-item"
    const slideSecItems = this.$el.querySelectorAll(".slideSecItem");
    slideSecItems.forEach((item) => {
      observer.observe(item);
    });

    // Observasi setiap ".slideThird .slide-item"
    const slideThirdItems = this.$el.querySelectorAll(".slideThirdItem");
    slideThirdItems.forEach((item) => {
      observer.observe(item);
    });

    // Observasi ".animatedElement" untuk animasi kustom
    observer.observe(this.$refs.animatedElement);
  },
};
</script>
<style lang="css">
.slideFirstItem {
  opacity: 0;
  transform: translate(100px);
  transition: opacity 0.2s ease, transform 0.5s ease;
}

/* Animasi untuk slide-item di row kedua */
.slideSecItem {
  opacity: 0;
  transform: translate(100px);
  transition: opacity 0.2s ease, transform 0.5s ease;
}

/* Animasi untuk slide-item di row ketiga */
.slideThirdItem {
  opacity: 0;
  transform: translateX(-100px);
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.slide-item {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.slide-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Pengaturan animasi nth-child */
/* slideFirst */
.slideFirst .col-4:nth-child(1) .slide-item {
  transition-delay: 200ms;
}

.slideFirst .col-4:nth-child(2) .slide-item {
  transition-delay: 400ms;
}

.slideFirst .col-4:nth-child(3) .slide-item {
  transition-delay: 600ms;
}

/* .slideSec .col-8 .slide-item {
  transition-delay: 800ms;
}
.slideSec .col-4 .slide-item {
  transition-delay: 1s;
}
.slideThird .col-3 .slide-item {
  transition-delay: 1.2s;
}
.slideThird .col-9 .slide-item {
  transition-delay: 1.4s;
} */
#ourGallery {
  background-color: var(--color-and);
  padding: 30px 2em;
  width: 100%;
}
.containerOurgallery .title-heading h1 {
  color: var(--color-bg);
  font-weight: 400;
}
</style>
