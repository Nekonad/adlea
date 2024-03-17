<template lang="">
  <section id="payGift">
    <div
      align="center"
      class="title-heading m-0 animate__animated"
      ref="animatedElement"
      :class="animationClass"
    >
      <h1 class="font-content mb-0">Wedding Gift</h1>
      <div class="line-separator-dark line-size"></div>
    </div>
    <div class="cover-pay font-content text-center">
      <div class="pay-text">
        <p>
          Kehadiran Bapak/Ibu/Saudara/i merupakan suatu tanda kasih bagi kami.
          Apabila ingin memberi tanda kasih dalam bentuk lain, Anda dapat
          memberi tanda kasih melalui:
        </p>
      </div>
      <button
        type="button"
        class="btnGift slideTop"
        ref="slideTop"
        @click="togglGift = !togglGift"
      >
        Click Here
      </button>
      <!-- CARD -->
      <Transition name="slide" mode="out-in">
        <div
          v-if="togglGift"
          class="animate_animated animate__slideOutUp giftlist"
        >
          <div class="row pt-4">
            <!-- CARD 1 -->
            <div class="col-12 cardGift">
              <div class="card card-settings mt-3 mb-3">
                <div class="card-body p-4">
                  <div class="card-inside ps-2 pe-2">
                    <div class="card-title">
                      <h5 align="start ">BCA</h5>
                    </div>
                    <div align="end" class="card-text">
                      <p ref="textToCopy" class="mb-0">
                        <b>2922453</b>
                      </p>
                      <p
                        class="font-content mb-0"
                        style="font-size: 14px; font-style: italic"
                      >
                        a/n username
                      </p>
                    </div>
                    <div
                      class="line-separator-dark mt-3 mb-3 line-size"
                      style="width: 100%"
                    ></div>
                    <div class="card-bottom">
                      <p
                        v-if="bcaCopySuccess"
                        class="wow animate__animated animate__slideInUp text-approved mb-0"
                      >
                        berhasil disalin!
                      </p>
                      <div align="end" class="copyLink">
                        <button
                          @click="
                            copyTextToClipboard('2922453', 'bcaCopySuccess')
                          "
                          type="button"
                          class="btnCard"
                        >
                          Salin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- CARD 2 -->
            <div class="col-12 cardGift">
              <div class="card card-settings mt-3 mb-3">
                <div class="card-body bShadow p-4">
                  <div class="card-inside ps-2 pe-2">
                    <div class="card-title">
                      <h5 align="start ">BNI</h5>
                    </div>
                    <div align="end" class="card-text">
                      <p class="mb-0">
                        <b>89765337</b>
                      </p>
                      <p
                        class="font-content mb-0"
                        style="font-size: 14px; font-style: italic"
                      >
                        a/n username
                      </p>
                    </div>
                    <div
                      class="line-separator-dark mt-3 mb-3 line-size"
                      style="width: 100%"
                    ></div>
                    <div class="card-bottom">
                      <p
                        v-if="bniCopySuccess"
                        class="wow animate__animated animate__slideInUp text-approved mb-0"
                      >
                        berhasil disalin!
                      </p>
                      <div align="end" class="copyLink">
                        <button
                          @click="
                            copyTextToClipboard('89765337', 'bniCopySuccess')
                          "
                          type="button"
                          class="btnCard"
                        >
                          Salin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- CARD 3 -->
            <div class="col-12 cardGift">
              <div class="card card-settings mt-3 mb-3">
                <div class="card-body p-4">
                  <div class="card-inside ps-2 pe-2">
                    <div class="card-title">
                      <h5 align="start ">GIFT</h5>
                    </div>
                    <div align="end" class="card-text">
                      <p class="mb-0" style="font-size: 12px">
                        <b>Jln. perum palem pertiwi blok G no.51</b>
                      </p>
                      <p
                        class="font-content mb-0"
                        style="font-size: 14px; font-style: italic"
                      >
                        a/n username
                      </p>
                    </div>
                    <div
                      class="line-separator-dark mt-3 mb-3 line-size"
                      style="width: 100%"
                    ></div>
                    <div class="card-bottom">
                      <p
                        v-if="giftCopySuccess"
                        class="wow animate__animated animate__slideInUp text-approved mb-0"
                      >
                        berhasil disalin!
                      </p>
                      <div align="end" class="copyLink">
                        <button
                          @click="
                            copyTextToClipboard(
                              'Jln. perum palem pertiwi blok G no.51',
                              'giftCopySuccess'
                            )
                          "
                          type="button"
                          class="btnCard"
                        >
                          Salin Alamat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
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
      togglGift: false,
      bcaCopySuccess: false,
      bniCopySuccess: false,
      giftCopySuccess: false,
    };
  },
  mounted() {
    const obsOptions = {
      threshold: 1,
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection,
      obsOptions
    );

    // Observasi elemen slideLeft dan animatedElement
    const slideTop = this.$refs.slideTop;

    if (slideTop) {
      this.observer.observe(slideTop);
    }
    const observer = new IntersectionObserver(this.handleAnimateIntersection, {
      threshold: 0.1,
    });
    observer.observe(this.$refs.animatedElement);
  },
  methods: {
    toggleGift() {
      this.togglGift = !this.togglGift;
    },
    copyTextToClipboard(textToCopy, successData) {
      // Membuat sebuah elemen input untuk menyalin teks
      const input = document.createElement("input");
      input.style.opacity = 0;
      input.value = textToCopy;
      document.body.appendChild(input);

      // Memilih teks di dalam input dan menyalinnya ke clipboard
      input.select();
      document.execCommand("copy");

      // Menghapus elemen input
      document.body.removeChild(input);

      // Menampilkan pesan sukses
      this[successData] = true;
      // Mengatur timeout untuk menyembunyikan pesan sukses setelah beberapa detik
      setTimeout(() => {
        this[successData] = false;
      }, 3000);
    },
    // Callback saat elemen masuk atau keluar dari viewport
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

<style>
@media (prefer-reduced-motion) {
  .slideTop {
    transition: none;
  }
}
.slideTop {
  transition: 1s;
  opacity: 0;
  transform: translateY(10px);
}
.slideTop.is-inViewport {
  opacity: 1;
  transition: 2s;
  transform: translateY(0);
}
#payGift {
  background-color: var(--color-bg);
  padding: 30px 2em 30px 2em;
  width: 100%;
  height: 100%;
}
.cover-pay {
  width: 100%;
  height: 100%;
}
.pay-text p {
  font-size: 14px;
  padding: 2em 0;
}

/* =============  TRANSITON =========================== */
.slide-enter-active {
  transition: all 0.8s cubic-bezier(0, 0.47, 0.83, 0.75);
}

.slide-leave-active {
  transition: all 0.8s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

/* Button Hover & Action */

.btnGift {
  color: var(--color-and);
  font-size: 14px;
  font-weight: 600;
  background-color: transparent;
  width: 60%;
  height: 40px;
  align-items: center;
  border: 1px solid var(--color-and);
  border-radius: 10px;
  transition: all ease-in 0.2s !important;
  text-decoration: none;
}
.btnGift:hover {
  color: var(--color-and);
  transform: translateY(-6px);
  border-radius: 5px;
  transition: transform ease 0.2s;
  opacity: 1 !important;
  box-shadow: 0px 2px 0px 1px #000;
}

.btnGift:active {
  font-weight: 600;
  color: #fff;
  background-color: #000;
  transform: translateY(2px);
  transition: transform ease 0.5s;
  box-shadow: 0px 0px 0px 0px #000;
}
/* Buttton Card */
.btnCard {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  background-color: #089aed;
  width: 40%;
  height: 30px;
  border: none;
  align-items: end;
  border-radius: 8px;
  transition: all ease-in 0.2s !important;
  text-decoration: none;
  align-items: end;
}
.btnCard:hover {
  background-color: #0ca5fd;
  transition: transform ease 0.2s;
  opacity: 1 !important;
}

.btnCard:active {
  font-weight: 600;
  background-color: #086faa;
  transform: translateY(2px);
  transition: transform ease 0.5s;
}
/* Close button */
.form-control:focus,
.form-select:focus:focus {
  border-color: #000918;
  box-shadow: 0 0 0 0.2rem rgba(2, 19, 56, 0.25);
}

.text-approved {
  position: absolute;
  left: 0;
  align-items: start;
  font-size: 14px;
  font-style: italic;
  color: #089aed;
  letter-spacing: 1px;
}

.card-title h5 {
  font-weight: 700;
  font-size: 24px;
}
.card-bottom {
  position: relative;
}
</style>
