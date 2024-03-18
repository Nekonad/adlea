<template>
  <section id="section-bottom">
    <div id="wishes-form">
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
          <form @submit.prevent="submitForm">
            <fieldset class="form-group">
              <input
                v-model="formData.nameGuest"
                type="text"
                placeholder="Nama Tamu"
                required="required"
                aria-required="true"
                maxLenght="200"
                class="form-control"
                autocomplete="off"
                spellcheck="false"
              />
            </fieldset>
            <fieldset class="form-group mt-3 mb-3">
              <select
                v-model="formData.confirmOfAttendance"
                class="custom form-select"
                aria-label="Default select example"
              >
                <option selected disabled :value="null">
                  Konfirmasi Kehadiran
                </option>
                <option
                  v-for="person in persons"
                  :value="person.name"
                  :key="person.personId"
                >
                  {{ person.name }}
                </option>
              </select>
            </fieldset>
            <div v-if="formData.confirmOfAttendance === 'Hadir'">
              <fieldset class="form-group mt-3 mb-3">
                <select
                  v-model="formData.totalAttendance"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled selected :value="null">Jumlah Hadir</option>
                  <option
                    v-for="person in guest[0].person"
                    :value="person"
                    :key="person"
                  >
                    {{ person }}
                  </option>
                </select>
              </fieldset>
            </div>
            <fieldset class="form-group mt-3 mb-3">
              <textarea
                v-model="formData.messageText"
                placeholder="Tulis Ucapan"
                required="required"
                rows="3"
                wrap="soft"
                aria-required="true"
                maxlenght="200"
                class="form-control"
                spellcheck="false"
              ></textarea>
            </fieldset>

            <div align="center" class="btnBtm pt-2 pb-4">
              <button type="submit" class="btn btn-Btm font-content">
                SEND
              </button>
            </div>
          </form>
          <p
            v-if="formError"
            class="error-message text-danger wow animate__animated animate__slideInDown mb-0"
          >
            {{ formErrorMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="wish-list slideDownSec" ref="slideDownSec">
      <div
        class="wish-item"
        v-for="(wish, index) in reversedWishList"
        :key="index"
      >
        <div class="name font-content">{{ wish.nameGuest }}</div>
        <div class="pesan font-content">{{ wish.messageText }}</div>
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
      selectedAttendance: null,
      formData: {
        nameGuest: "",
        confirmOfAttendance: null,
        totalAttendance: null,
        messageText: "",
      },
      persons: [
        { name: "Hadir", personId: 1 },
        { name: "Tidak Hadir", personId: 0 },
      ],
      guest: [{ id: 1, name: "person 1", person: ["1", "2"] }],
      formSubmitted: false,
      time: null,
      wishList: [],
      formError: false,
    };
  },
  computed: {
    //for select totalConfirm
    selectedGuest() {
      const selected = this.selectedAttendance;
      return selected
        ? this.guest.find((x) => x.id === selected.personId)
        : null;
    },
    reversedWishList() {
      // Balik urutan elemen dalam wishList sehingga input terbaru berada di bagian paling atas
      return this.wishList.slice().reverse();
    },
    //for error not input confirmAttendance
    formErrorMessage() {
      if (!this.formData.confirmOfAttendance) {
        return "Konfirmasi kehadiran harus diisi!";
      } else if (
        this.formData.confirmOfAttendance === "Hadir" &&
        !this.formData.totalAttendance
      ) {
        return "Jumlah hadir harus diisi!";
      } else {
        return ""; // pesan kosong jika tidak ada error
      }
    },
  },
  mounted() {
    this.getDataFromAPI(); // GET DATA API
    const obsOptions = {
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection,
      obsOptions
    );

    // Observasi elemen slideLeft dan animatedElement
    const slideDown = this.$refs.slideDown;
    const slideDownSec = this.$refs.slideDownSec;

    if (slideDown) {
      this.observer.observe(slideDown);
    }
    if (slideDownSec) {
      this.observer.observe(slideDownSec);
    }
    const observer = new IntersectionObserver(this.handleAnimateIntersection, {
      threshold: 0.1,
    });
    observer.observe(this.$refs.animatedElement);
  },
  methods: {
    // GET DATA
    async getDataFromAPI() {
      try {
        const response = await fetch(
          "https://65f09bffda8c6584131c2339.mockapi.io/rsvpv1/rsvpv1"
        );
        if (response.ok) {
          const data = await response.json();
          //simpan data dari API ke dalam wishList
          this.wishList = data;
        } else {
          console.error("Gagal mengambil data:", response.statusText);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    },

    // metode untuk menambahkan ucapan ke dalam wishList
    addWishToList(nameGuest, messageText) {
      this.wishList.push({ nameGuest, messageText });
    },

    // POST AND PUT
    async submitForm() {
      try {
        // Validasi konfirmasi kehadiran
        if (!this.formData.confirmOfAttendance) {
          this.formError = true;
          setTimeout(() => {
            this.formError = false;
          }, 3000);
          return;
        }

        // Validasi total hadir jika konfirmasi kehadiran adalah "Hadir"
        if (
          this.formData.confirmOfAttendance === "Hadir" &&
          !this.formData.totalAttendance
        ) {
          this.formError = true;
          setTimeout(() => {
            this.formError = false;
          }, 3000);
          return;
        }

        // Jika konfirmasi kehadiran adalah "Tidak Hadir", total kehadiran harus diisi
        if (this.formData.confirmOfAttendance !== null) {
          const response = await fetch(
            "https://65f09bffda8c6584131c2339.mockapi.io/rsvpv1/rsvpv1",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...this.formData,
                time: new Date().toLocaleString(),
                // Include submission time
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Submit PUT
            this.addWishToList(data.nameGuest, data.messageText);
            // Clear form submission
            this.formData = {
              nameGuest: "",
              confirmOfAttendance: null,
              totalAttendance: null,
              messageText: "",
              // Other form data
            };
            console.log("Form telah berhasil disubmit");
          } else {
            console.error("Gagal mengirim data:", response.statusText);
          }
        } else {
          // Jika confirmOfAttendance atau totalAttendance masih null, tampilkan pesan kesalahan
          this.formError = true;
          setTimeout(() => {
            this.formError = false;
          }, 3000);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    },

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
.error-message {
  position: absolute;
  align-items: start;
  font-size: 14px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: 2px;
}
.slideDown {
  opacity: 0;
  transform: translateY(50px);
}
.slideDownSec {
  opacity: 0;
  transform: translateY(50px);
}
.slideDownSec.is-inViewport {
  opacity: 1;
  transition: 1.5s;
  transform: translateY(0);
}
.slideDown.is-inViewport {
  opacity: 1;
  transition: 1s;
  transform: translateY(0);
}
#section-bottom {
  background-color: var(--color-bg);
  padding: 30px 2em 2em 2em;
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
  color: #fff;
  background-color: #000;
  border-radius: 5px;
  transition: transform ease 0.2s;
  opacity: 1 !important;
  box-shadow: 0px 2px 0px 1px #8b8b8b;
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

.wish-list {
  max-height: 400px;
  overflow: auto;
  padding: 2em 1em;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.wish-item {
  padding: 1px;
  margin-bottom: 1em;
  border-bottom: 1px solid #00000050;
}

.wish-item .name {
  font-weight: 600;
  text-transform: capitalize;
  font-size: 14px;
  letter-spacing: 1px;
  word-spacing: 1px;
}
.wish-item .pesan {
  font-weight: 600;
  color: #0000008f;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-size: 12px;
  display: inline-block;
  text-transform: capitalize;
}
.wish-item .pesan::first-letter,
.wish-item .name::first-letter {
  text-transform: uppercase;
}
</style>
