<template>
  <section id="loveStory">
    <div class="containerLoveStory">
      <div
        align="center"
        class="title-heading m-0 animate__animated"
        ref="animatedElement"
        :class="animationClass"
      >
        <h1 class="font-content mb-0 text-light">Love Story</h1>
        <div class="line-separator" style="width: 70%"></div>
      </div>
    </div>

    <div class="loveStory-list text-light">
      <div class="listStory bottomSlideLS" ref="bottomSlideLS">
        <div class="itemStory py-4">
          <div class="dateStory pe-4 font-content">
            <h4>JUN</h4>
            <h4>2022</h4>
          </div>
          <div class="font-content">
            <h4 class="titleStory">Perkenalan</h4>
            <p class="textStory pt-2 m-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio cupiditate aliquid Distinctio cupiditate aliquid.
            </p>
          </div>
        </div>
        <div class="itemStory py-4">
          <div class="dateStory pe-4 font-content">
            <h4>AUG</h4>
            <h4>2022</h4>
          </div>
          <div class="font-content">
            <h4 class="titleStory">Awal Hubungan</h4>
            <p class="textStory pt-2 m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
              error earum quasi, repellendus suscipit rehenderit. At beatae quos
              nemo possimus aut!
            </p>
          </div>
        </div>
        <div class="itemStory py-4">
          <div class="dateStory pe-4 font-content">
            <h4>DEC</h4>
            <h4>2023</h4>
          </div>
          <div class="font-content">
            <h4 class="titleStory">Lamaran</h4>
            <p class="textStory pt-2 m-0">
              Lorem ipsum dolor sit amet consectetur ipsam numquam ut dolorem
              libero vitae quae deleniti voluptatem. Corporis, nesciunt quas.
              Beatae nobis libero incidunt tempora veritatis!
            </p>
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
      // Animate
      animationClass: "",
      // customSlide
      observer: null,
      lastY: 0,
    };
  },
  mounted() {
    // customSlide
    const obsOptions = {
      threshold: 0.2,
    };
    this.observer = new IntersectionObserver(this.inViewport, obsOptions);

    const bottomSlideLS = this.$refs.bottomSlideLS;
    if (bottomSlideLS) {
      this.observer.observe(bottomSlideLS);
    }

    // Animate
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1,
    });
    observer.observe(this.$refs.animatedElement);
  },
  methods: {
    // CustomSlide
    inViewport(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inViewport");
        } else {
          entry.target.classList.remove("is-inViewport");
        }
      });
    },
    // Animate
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animationClass) {
          this.animationClass = "animate__fadeInUp";
        }
      });
    },
  },
  // for CustomSlide
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

<style lang="css">
.bottomSlideLS {
  transition: 1s;
  opacity: 0;
  transform: translateY(100px);
}

.bottomSlideLS.is-inViewport {
  opacity: 1;
  transition: 2s;
  transform: translateY(0);
}
#loveStory {
  background-color: var(--color-and);
  padding: 30px 2em;
  padding: 30px 2em 30px 2em;
  width: 100%;
  height: 100%;
}
.itemStory {
  display: flex;
}
.dateStory {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h4 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
}

.titleStory {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  word-spacing: 1px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ffffffd8;
}
.textStory {
  text-align: justify;
  /* text-justify: inter-character; */
  font-size: 12px;
}
/* ================================================= */
</style>
