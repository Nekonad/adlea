<template lang="">
  <section id="coupleProfile">
    <div align="center" class="couple-heading m-0">
      <p class="font-content mb-0">
        Dengan memohon Rahmat dan Ridho Allah SWT. Kami mengharapkan kehadiran
        Bapak/Ibu/Saudara/i. pada acara Pernikahan putra-putri kami
      </p>
    </div>
    <div class="container female-profile" ref="femaleProfile">
      <div class="row justify-content-center">
        <div class="profile-detail female pl-0 col-6 col-12">
          <div class="container p-0 object-frame-female bShadow">
            <div class="orb-deco">
              <div class="photo-frame-female"></div>
              <div class="detail-name mt-3">
                <h2 class="name mb-3">
                  Rulliana<br />
                  Putri
                </h2>
                <p class="child-of mb-1 font-content">Putri dari:</p>
                <p class="parents mb-0 font-content">Bapak. lorem</p>
                <p class="parents mb-0 font-content">Ibu. lorem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      align="center"
      class="couple-separator-and col separator-profile"
      ref="separatorProfile"
    >
      <h1 class="font-and">&</h1>
    </div>
    <div class="container male-profile" ref="maleProfile">
      <div class="row justify-content-center">
        <div class="profile-detail male pl-0 col-6 col-12">
          <div class="container p-0 object-frame-male bShadow">
            <div class="orb-deco">
              <div class="photo-frame-male"></div>
              <div class="detail-name mt-3">
                <h2 class="name mb-3">Bayu Aji<br />Surya Ningrat</h2>
                <p class="child-of mb-1 font-content">Putra pertama dari:</p>
                <p class="parents mb-0 font-content">Bapak. lorem</p>
                <p class="parents mb-0 font-content">Ibu. lorem</p>
              </div>
            </div>
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
      observer: null,
      lastY: 0,
    };
  },
  mounted() {
    const obsOptions = {
      threshold: 0.2,
    };
    this.observer = new IntersectionObserver(this.inViewport, obsOptions);

    // Ambil referensi untuk profil perempuan dan laki-laki
    const femaleProfile = this.$refs.femaleProfile;
    const maleProfile = this.$refs.maleProfile;
    const separatorProfile = this.$refs.separatorProfile;

    // Observasi profil perempuan
    if (femaleProfile) {
      this.observer.observe(femaleProfile);
    }
    if (separatorProfile) {
      this.observer.observe(separatorProfile);
    }
    // Observasi profil laki-laki
    if (maleProfile) {
      this.observer.observe(maleProfile);
    }
  },
  methods: {
    inViewport(entries) {
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
.female-profile {
  transition: 1s;
  opacity: 0;
  transform: translateX(-100px);
}
.female-profile.is-inViewport {
  opacity: 1;
  transform: translateY(0);
  animation: slideLeft 1s ease;
}
/* Male Profile */
.male-profile {
  transition: 1s;
  opacity: 0;
  transform: translateX(100px);
}
.male-profile.is-inViewport {
  opacity: 1;
  transform: translateY(0);
  animation: slideRight 1.5s ease;
}
/* separator Profile */
.separator-profile {
  transform: scale(0.5);
  transition: 0.5s;
  opacity: 0;
}
.separator-profile.is-inViewport {
  opacity: 1;
  transform: scale(1);
  transition: 2s;
}

@keyframes slideLeft {
  0% {
    transform: translateX(50px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slideRight {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateY(0);
  }
}
@media (prefer-reduced-motion) {
  .female-profile,
  .male-profile {
    transition: none;
  }
}
#coupleProfile {
  /* border: 1px solid red; */
  background-size: contain;
  background-color: var(--color-bg);
  padding: 30px 3em 30px 3em;
  width: 100%;
}
#coupleProfile .row {
  flex-direction: column-reverse;
}

.couple-heading p {
  font-size: 14px;
}

.male-profile .profile-detail {
  color: black;
  text-align: end;
  padding: 1em 2em;
  position: relative;
}
.female-profile .profile-detail {
  color: black;
  text-align: start;
  padding: 1em 2em;
  position: relative;
}
.object-frame-male {
  display: flex;
  margin: 1em 0;
  background-color: var(--color-pola);
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  /* box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.35); */
}
.object-frame-female {
  display: flex;
  margin: 1em 0;
  background-color: var(--color-pola);
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  /* box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.35); */
}
.orb-deco {
  width: 100%;
  padding: 1em;
}
.photo-frame-male {
  background-image: url(/assets/img/b1.jpg);
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  height: 240px;
}
.photo-frame-female {
  background-image: url(/assets/img/r1.jpg);
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  height: 240px;
}
.object-frame-male h2 {
  font-weight: 700;
  font-size: 24px;
}
.object-frame-female h2 {
  font-weight: 700;
  font-size: 24px;
}
.detail-name p:nth-child(2) {
  font-size: 12px;
}
.detail-name p {
  font-size: 16px;
}

/* =============   SEPARATOR  ============ */

#coupleProfile .couple-separator-and h1 {
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  font-size: 5rem !important;
}

.couple-separator-and {
  h1:before,
  h1:after {
    content: "";
    flex: 1 1;
    border-bottom: 2px solid #000;
    margin: auto;
  }
  h1:before {
    margin-left: 3rem;
    margin-right: 10px;
  }
  h1:after {
    margin-right: 3rem;
    margin-left: 10px;
  }
}
</style>
