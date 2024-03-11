<template>
  <div id="welcome">
    <div class="wrapper container">
      <div class="wrap-overlay middle top">
        <div class="new_premCover-top upSlide" ref="upSlide">
          <p id="wedding-of" class="font-content mb-0">Wedding Invitation</p>
          <div class="text-wrapper">
            <div class="container hero-pola bShadow">
              <div class="pola-img"></div>
            </div>
          </div>
          <div id="welcome-text">
            <div class="couple-name">
              <h1 class="name-female font-title">Rulliana</h1>
              <h4 class="name-and font-and" style="font-size: 2rem">&</h4>
              <h1 class="name-male font-title">Bayu</h1>
            </div>
          </div>
        </div>
        <!-- Countdown -->
        <div id="countdown" class="soon">
          <div
            class="countdown-section container-sm bottomSlide"
            ref="bottomSlide"
          >
            <h1 class="text-start font-content">Save The Date</h1>
            <i class="bi bi-bookmark p-2"></i>
            <div class="countdown-date">
              <ul>
                <li id="days">
                  <span
                    ><b>{{ days }}</b></span
                  ><b> Hari</b>
                </li>
                <li id="Hours">
                  <span
                    ><b>{{ hours % 24 }}</b></span
                  ><b> Jam</b>
                </li>
                <li id="minutes">
                  <span
                    ><b>{{ minutes % 60 }}</b></span
                  ><b> Menit</b>
                </li>
                <li id="seconds">
                  <span
                    ><b>{{ seconds % 60 }}</b></span
                  ><b> Detik</b>
                </li>
              </ul>
              <p class="tgl-acara font-content">12 . 12 . 2024</p>
            </div>
          </div>
        </div>
        <div class="scroll-down bottomSlideSec" ref="bottomSlideSec">
          <div class="icon-scroll"></div>
          <p>Scroll</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup(props) { }>
import { ref } from "@vue/reactivity";
// CountDown
export default {
  setup() {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const launchDate = new Date("12 december 2024");

    setInterval(() => {
      const currDate = new Date();
      const launchTime = launchDate - currDate;

      seconds.value = parseInt(launchTime / 1000);
      minutes.value = parseInt(seconds.value / 60);
      hours.value = parseInt(minutes.value / 60);
      days.value = parseInt(hours.value / 24);
    }, 1000);

    return { days, hours, minutes, seconds };
  },
  // Animation On Scroll
  data() {
    return {
      observer: null,
      lastY: 0,
    };
  },
  mounted() {
    const obsOptions = {
      threshold: 0.2,
    };
    this.observer = new IntersectionObserver(this.inViewport, obsOptions);

    //  up & down
    const bottomSlide = this.$refs.bottomSlide;
    const bottomSlideSec = this.$refs.bottomSlideSec;
    const upSlide = this.$refs.upSlide;

    if (bottomSlide) {
      this.observer.observe(bottomSlide);
    }
    if (bottomSlideSec) {
      this.observer.observe(bottomSlideSec);
    }
    if (upSlide) {
      this.observer.observe(upSlide);
    }
  },
  methods: {
    inViewport(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inViewport");
        } else {
          // Menghapus animasi saat profil keluar dari viewport
          entry.target.classList.remove("is-inViewport");
        }
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
<style lang="css">
.bottomSlide,
.bottomSlideSec {
  transition: 1s;
  opacity: 0;
  transform: translateY(-100px);
}

.bottomSlide.is-inViewport,
.bottomSlideSec.is-inViewport {
  opacity: 1;
  transform: translateY(0);
}
.upSlide {
  transition: 1s;
  opacity: 0;
  transform: translateY(-100px);
}

.upSlide.is-inViewport {
  opacity: 1;
  transition: 2s;
  transform: translateY(0);
}

/* COUNTDOWN */
#countdown {
  width: 100%;
  color: var(--color-and);
  margin-bottom: 1rem;
}
.countdown-section h1 {
  display: inline;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.countdown-date ul {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 1rem;
  border-right: 2px solid var(--color-and);
}
#countdown li {
  display: inline-block !important;
  padding: 0 0.5em 0 0;
  text-align: center;
}
.countdown-date {
  display: flex;
  align-items: center;
}

#countdown ul {
  padding-left: 0;
  text-align: start;
  font-weight: 300;
}
#countdown li span {
  display: block;
  line-height: 1;
}
#countdown p {
  font-size: 18px;
  text-align: center;
  padding-left: 1em;
  font-weight: 600;
  margin: 0;
}
#countdown li span b {
  font-size: 16px;
  font-weight: 500;
}
#countdown li b {
  font-size: 14px;
}
.scroll-down {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 3em;
  bottom: 8em;
}
.scroll-down p {
  margin-top: 12px;
  font-weight: 500;
  font-size: 9px;
  letter-spacing: 4px;
  animation: nudgeText 1.5s ease-out infinite;
}
.icon-scroll::after {
  width: 20px;
  height: 40px;
  box-shadow: inset 0 0 0 1px #30333a;
  border-radius: 25px;
  animation: nudgeMouse 1.5s linear infinite;
}
.icon-scroll:after,
.icon-scroll:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.icon-scroll {
  width: 40px;
  height: 20px;
  position: relative;
}
.icon-scroll:before {
  width: 4px;
  height: 4px;
  background: #30333a;
  bottom: 20px;
  border-radius: 4px;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: scroll;
}
@keyframes scroll {
  0% {
    opacity: 1;
    transform: scale(2);
  }
  100% {
    opacity: 0;
    transform: translateY(26px);
  }
}
@keyframes nudgeMouse {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0px);
    box-shadow: inset 0 0 0 2px #30333a;
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(2px);
  }
  90% {
    transform: translateY(0);
  }
}
@keyframes nudgeText {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(0);
  }
}
</style>
