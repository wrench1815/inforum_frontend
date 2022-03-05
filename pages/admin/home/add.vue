<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <!-- Edit page -->
            <h2 class="mx-4">Add Home</h2>
          </div>

          <div class="col-12">
            <div class="card-body position-relative">
              <div class="row">
                <div class="col-12">
                  <div class="input-group input-group-static mt-4">
                    <label class="text-primary">Sub Heading</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="home.subHeading"
                    />
                  </div>
                </div>

                <div class="col-12" v-if="home.showImageUploader">
                  <div class="input-group input-group-static mt-4">
                    <label class="text-primary mb-2"
                      >Choose Heading Image</label
                    >
                    <div class="form-control">
                      <!-- Image upload component -->
                      <FullImageUpload
                        :uploadFolder="'home'"
                        @uploadImageUrl="handleImageUrl($event)"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-12" v-if="home.headerImage">
                  <div>
                    <h3 class="text-center pb-3 pt-5 text-primary">
                      Header Image
                    </h3>
                    <div class="d-flex justify-content-center">
                      <img
                        :src="home.headerImage"
                        alt="Header Image"
                        class="img-fluid"
                        v-lazy-load
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-end mt-4">
                <button @click="addHome" class="btn bg-gradient-primary mb-0">
                  Add Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End:content -->
  </div>
</template>

<script>
import FullImageUpload from '~/components/Admin/Utils/FullImageUpload.vue'

export default {
  layout: 'admin',

  components: {
    FullImageUpload,
  },

  data() {
    return {
      home: {
        subHeading: '',
        headerImage: '',
        showImageUploader: true,
      },
    }
  },

  methods: {
    async handleImageUrl(url) {
      this.home.showImageUploader = false
      this.home.headerImage = url
    },

    async addHome(e) {
      e.preventDefault()

      const formData = {
        subHeading: this.home.subHeading,
        headerImage: this.home.headerImage,
      }

      // on successful validation
      if (formData.subHeading !== '' && formData.headerImage !== '') {
        await this.$axios
          .$post(`/Home`, formData)
          .then((res) => {
            // on success
            if (res.status === 201) {
              const message = res.message
              let timerInterval

              // trigerring modal
              this.$swal
                .fire({
                  icon: 'success',
                  type: 'success',
                  title: 'Successfully Added',
                  html: `${message}<br />Redirecting in <b></b> Seconds.`,
                  timer: 2000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  didOpen: () => {
                    this.$swal.showLoading()
                    const b = this.$swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                      b.textContent = Math.ceil(
                        this.$swal.getTimerLeft() / 1000
                      )
                    }, 100)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  },
                })
                .then(() => {
                  this.$router.push(`/admin/Home`)
                })
            }
          })
          // on failure
          .catch((err) => {
            // trigerring modal
            this.$swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Cannot add home data',
              showCloseButton: true,
              showConfirmButton: false,
            })
          })
      }
      // on unsuccessful validation
      else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Sub Heading and Header Image Cannot Be Empty',
          showCloseButton: true,
          showConfirmButton: false,
        })
      }
    },
  },
}
</script>

<style></style>
