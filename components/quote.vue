<template>
  <div id="quote">
    <div class="container p-0">
      <div
        class="containerScreen animate__animated"
        ref="animatedElement"
        :class="animationClass"
      >
        <div class="row">
          <div class="text-center col-12">
            <!-- <img src="" /> -->
          </div>
          <div class="col-12">
            <div class="container square-box">
              <div class="box">
                <div class="line-separator"></div>
                <p class="quotes padding-balance font-content">
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
                  untukmu isteri-isteri dari jenismu sendiri supaya kamu
                  cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya
                  diantaramu rasa kasih dan sayang. Sesungguhnya pada yang
                  demikian itu benar-benar terdapat tanda-tanda bagi kaum yang
                  berfikir.”<span>(QS. Ar-Rum: 21)</span>
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="text-end px-4z text-light">
            <div class="divider pe-4">
              <h1>&#8217;&#8217;</h1>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animationClass: "",
    };
  },
  mounted() {
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1,
    });

    observer.observe(this.$refs.animatedElement);
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animationClass) {
          this.animationClass = "animate__fadeInUp";
        }
      });
    },
  },
};
</script>

<style lang="css">
#quote {
  background-size: contain;
  padding: 2em 1em;
  background-color: var(--color-and);
}
.square-box {
  border: 1px solid #fff;
  background-color: transparent;
}

.box {
  padding: 1em;
}

#quote .row {
  display: flex;
  flex-wrap: wrap;
}

.quotes {
  white-space: pre-wrap;
  color: var(--color-bg);
  text-align: justify;
  font-weight: 400;
  font-size: 12px;
  padding: 0.5em 0 0.5em 0;
  font-style: italic;
  padding-top: 2em;
}
.quotes span {
  padding: 1em 0 1em 0;
  display: block;
}
.divider h1 {
  font-size: 4rem;
  position: relative;
}
.divider h1::before {
  content: " ";
  height: 2px;
  width: 80%;
  background: white;
  display: block;
  position: absolute;
  top: 30%;
  right: 10%;
}
/* ================================================= */
</style>
