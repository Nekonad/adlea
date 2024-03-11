<template lang="">
  <div id="section-bottom" class="cover">
    <section id="wishes">
      <div class="cover">
        <div
          align="center"
          class="title-heading m-0 animate__animated"
          ref="animatedElement"
          :class="animationClass"
        >
          <h1 class="font-content mb-0">RSVP & Wishes</h1>
          <div class="line-separator-dark ln-btm"></div>
        </div>
        <div class="cover-bottom font-content text-center">
          <p>
            Diharapkan kepada tamu undangan untuk mengisi form kehadiran dibawah
            ini
          </p>
        </div>
        <div class="line-separator-dark mt-2" style="width: 100%"></div>
        <div class="wishes container pt-4 slideDown" ref="slideDown">
          <form>
            <fieldset class="form-group">
              <input
                type="text"
                placeholder="Nama Tamu"
                required="required"
                aria-required="true"
                maxLenght="200"
                class="form-control"
                id="exampleInputEmail1"
              />
            </fieldset>
            <fieldset class="form-group mt-3 mb-3">
              <select
                v-model="selectedAttendance"
                class="custom form-select"
                aria-label="Default select example"
              >
                <option selected disabled :value="null">
                  Konfirmasi Kehadiran
                </option>
                <option v-for="person in persons" :value="person">
                  {{ person.name }}
                </option>
              </select>
            </fieldset>
            <div v-if="selectedGuest">
              <fieldset class="form-group mt-3 mb-3">
                <select
                  v-model="selectedGuestPerson"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled selected :value="null">Jumlah Hadir</option>
                  <option
                    v-for="person in selectedGuest.person"
                    :value="person"
                  >
                    {{ person }}
                  </option>
                </select>
              </fieldset>
            </div>
            <fieldset class="form-group mt-3 mb-3">
              <textarea
                placeholder="Tulis Ucapan"
                required="required"
                rows="3"
                wrap="soft"
                aria-required="true"
                maxlenght="200"
                class="form-control"
              ></textarea>
            </fieldset>
            <NuxtLink to="" target="_blank">
              <div align="center" class="btnBtm pt-2 pb-4">
                <button
                  type="button"
                  class="btn-lg-rounded btn-Btm font-content"
                >
                  SEND
                </button>
              </div>
            </NuxtLink>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animationClass: "",
      observer: null,
      lastY: 0,
      selectedAttendance: null,
      persons: [
        { name: "Hadir", personId: 1 },
        { name: "Tidak Hadir", personId: 2 },
      ],
      guest: [{ id: 1, name: "person 1", person: ["1", "2"] }],
      selectedGuestPerson: null,
    };
  },
  computed: {
    selectedGuest() {
      const selected = this.selectedAttendance;
      return selected
        ? this.guest.find((x) => x.id === selected.personId)
        : null;
    },
  },
  mounted() {
    const obsOptions = {
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection,
      obsOptions
    );

    // Observasi elemen slideLeft dan animatedElement
    const slideDown = this.$refs.slideDown;

    if (slideDown) {
      this.observer.observe(slideDown);
    }
    const observer = new IntersectionObserver(this.handleAnimateIntersection, {
      threshold: 0.1,
    });
    observer.observe(this.$refs.animatedElement);
  },
  methods: {
    // Animate
    handleAnimateIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animationClass) {
          this.animationClass = "animate__fadeInDown";
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
<style lang="css">
.slideDown {
  opacity: 0;
  transform: translateY(50px);
}
.slideDown.is-inViewport {
  opacity: 1;
  transition: 1s;
  transform: translateY(0);
}
#section-bottom {
  background-color: var(--color-bg);
  padding: 30px 2em 30px 2em;
  width: 100%;
  height: 100%;
}
.cover-bottom p:nth-child(1) {
  font-size: 14px;
  padding: 2em 0;
}

/* Button Hover & Action */

.btn-Btm {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 8px;
  background-color: #000;
  width: 100%;
  height: 40px;
  align-items: center;
  border-radius: 5px;
  transition: all ease-in 0.2s !important;
  text-decoration: none;
}
.btn-Btm:hover {
  transform: translateY(-6px);
  border-radius: 5px;
  transition: transform ease 0.2s;
  opacity: 1 !important;
  box-shadow: 0px 2px 0px 1px #fff;
}

.btn-Btm:active {
  font-weight: 600;
  color: #000;
  background-color: transparent;
  transform: translateY(2px);
  transition: transform ease 0.5s;
  box-shadow: 0px 0px 0px 0px #000;
}
/* Close button */
</style>
