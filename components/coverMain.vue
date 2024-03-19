<template>
  <transition name="fade">
    <section id="welcome-section" v-show="!isContentHidden">
      <div class="image-content">
        <div class="overlay-cover-top"></div>
        <div class="overlay-cover-bottom"></div>
        <div class="image-overlay">
          <div class="heading-title text-light">
            <p
              class="animate__animated animate__fadeInDown date font-content text-light"
            >
              12 <b>.</b> 12 <b>.</b> 24
            </p>
            <div class="title-cover">
              <p
                class="wedding-of font-content animate__animated animate__fadeInDown"
              >
                The Wedding Of
              </p>
              <div id="couple-name" class="couple-name">
                <h1
                  class="name-female font-title animate__animated animate__fadeInLeft"
                >
                  Rulliana
                </h1>
                <h4 class="name-and font-and animate__animated animate__zoomIn">
                  &
                </h4>
                <h1
                  class="name-male font-title animate__animated animate__fadeInRight"
                >
                  Bayu
                </h1>
              </div>
              <p
                class="invite font-content animate__animated animate__fadeInUp"
              >
                Kepada Yth. <br />Tamu Undangan
              </p>
              <div
                align="center"
                class="animate__animated animate__fadeInUp btnCover pt-2"
              >
                <button
                  type="button"
                  class="btn-lg btn-cover font-content text-light"
                  @click="hideWelcomeSection"
                >
                  Buka Undangan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </transition>
  <!-- Audio -->
  <div class="background-music">
    <button @click="toggleAudio" class="music-control" ref="audioButton">
      <i v-if="!playing" class="bi bi-volume-up-fill"></i>
      <i v-else class="bi bi-volume-mute-fill"></i>
      <!-- {{ playing ? "Pause Audio" : "Play Audio" }} -->
    </button>
    <audio ref="audio" loop :volume="volume">
      <source src="/audio/Someone To Stay.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isContentHidden = ref(false);
    const audio = ref<HTMLAudioElement | null>(null);
    const audioButton = ref<HTMLButtonElement | null>(null);
    const playing = ref(false);
    const volume = ref(0.2); // Nilai default volume

    const toggleAudio = () => {
      if (audio.value && audioButton.value) {
        if (audio.value.paused) {
          audio.value.play();
          playing.value = true;
          audioButton.value.classList.remove("paused");
          audioButton.value.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
        } else {
          audio.value.pause();
          playing.value = false;
          audioButton.value.classList.add("paused");
          audioButton.value.innerHTML =
            '<i class="bi bi-volume-mute-fill"></i>';
        }
      }
    };

    const hideWelcomeSection = () => {
      isContentHidden.value = true;
      // Periksa apakah audio terdefinisi
      if (audio.value) {
        audio.value.play(); //audio play
      }
      // Jika Anda ingin menggunakan animasi fade out, Anda bisa menggunakan transition atau animasi CSS
    };

    return {
      isContentHidden,
      audio,
      playing,
      volume,
      audioButton,
      toggleAudio,
      hideWelcomeSection,
    };
  },
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.content-hidden {
  display: none;
}

#welcome-section {
  position: fixed;
  z-index: 99;
  width: 100vw;
  height: 100%;
}

.cover-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#welcome-section .image-content {
  /* background-color: #d9d9d9; */
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("/img/cover1.jpg");
  background-size: cover;
  background-position: 50% 50%;
}
#welcome-section .image-content .image-overlay {
  display: flex;
  justify-content: center;
}
#welcome-section .image-content .image-overlay .heading-title {
  /* background-color: #d9d9d9; */
  max-width: 400px;
  width: 100%;
  padding: 1em 2em;
  padding-bottom: 5em;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.heading-title .date {
  font-size: 18px;
  margin-top: 1em;
  text-align: end;
  position: relative;
}
.heading-title .date::before {
  content: " ";
  height: 2px;
  max-width: 250px;
  width: 70%;
  background: #fff;
  display: block;
  position: absolute;
  margin: auto;
  bottom: 50%;
}
.title-cover .invite {
  line-height: 2;
  padding: 1em 0 1em 0;
}
.title-cover {
  .couple-name h1 {
    line-height: 0.5;
    font-size: 72px !important;
    .name-female {
      margin-top: 30px;
      line-height: 0.5;
    }
  }
}
.wedding-of {
  padding-bottom: 10px;
}
.couple-name h4 {
  font-size: 32px;
  margin-bottom: 10px;
  margin-left: 80px;
}
.name-male {
  margin-left: 45px;
}
/* Button Hover & Action */
.btn-cover {
  color: #fff;
  background-color: #00000025;
  padding: 6px 20px;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 25px;
  transition: all ease-in 0.2s !important;
}
.btn-cover:hover {
  font-weight: 600;
  transform: translateY(-6px);
  background-color: #fff;
  border-radius: 5px;
  color: #0a0a0a !important;
  transition: transform ease 0.2s;
  opacity: 1 !important;
  box-shadow: 0px 2px 0px 1px #ffffff !important;
}
.btn-cover:active {
  font-weight: 600;
  color: #fff !important;
  background-color: #00000054;
  transform: translateY(2px);
  transition: transform ease 0.5s;
  box-shadow: 0px 0px 0px 0px #000;
}
/* Close button */

/* Overlay */
.overlay-cover-bottom,
.overlay-cover-top {
  width: 100%;
  z-index: 2;
  position: absolute;
  left: 0;
}
.overlay-cover-bottom {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(14 14 14) 100%
  );
  height: 70%;
  bottom: 0;
}
/* overlay close

/* AUDIOOOOOOO */
.background-music {
  position: absolute;
  z-index: 98;
}
.music-control {
  width: 50px;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 1em;
  top: 4em;
  background-color: #84a98c;
  border: none;
  border-radius: 50%;
  line-height: 0;
  /* animation: rotating 4s linear infinite; */
}

.music-control:before {
  content: "";
  z-index: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 50px;
  height: 50px;
  background: #84a98c;
  border-radius: 50%;
  animation: pulse-border 1500ms ease-out infinite;
}

.music-control .bi-volume-up-fill,
.music-control .bi-volume-mute-fill {
  font-size: 25px;
  z-index: 10;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  color: #e4e4e4;
}
@keyframes pulse-border {
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
    opacity: 0;
  }
}
@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
.music-control.paused {
  animation: none;
  background-color: #84a98c;
}
.music-control.paused:before {
  animation: none;
}

.music-control.paused .bi-volume-up-fill {
  color: #e4e4e4;
}

.music-control.paused .bi-volume-mute-fill {
  color: #e4e4e4;
}
</style>
