<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <!-- Edit page -->
            <h2 class="mx-4">Edit Home</h2>
          </div>

          <div class="col-12" v-if="loading">
            <Loading />
          </div>

          <div class="col-12" v-if="!loading">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="updateHome">
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Sub Heading</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="homeData.subHeading"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Choose Heading Image</label>
                      <div class="form-control">
                        <!-- Image upload component -->
                        <FullImageUpload
                          :uploadFolder="'home'"
                          @uploadImageUrl="handleImageUrl($event)"
                          v-if="showImageUploader"
                        />
                        <div
                          class="d-flex justify-content-start"
                          v-if="!showImageUploader"
                        >
                          <button class="btn btn-success" @click="showUploader">
                            Change Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12" v-if="!showImageUploader">
                    <div>
                      <h3 class="text-center pb-3 pt-5 text-primary">
                        Header Image
                      </h3>
                      <div class="d-flex justify-content-center">
                        <img
                          :src="homeData.headerImage"
                          alt="Header Image"
                          class="img-fluid"
                          v-lazy-load
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Update Home
                  </button>
                </div>
              </form>
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
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'admin',
  components: {
    FullImageUpload,
  },

  components: {
    Loading,
  },

  data() {
    return {
      homeData: {},
      showImageUploader: false,
      loading: true,
    }
  },

  mounted() {
    const blogPost = this.$axios.$get(`/Home/${this.$route.params.id}`)
    // on success
    blogPost
      .then((res) => {
        this.homeData = res
      })
      .then(() => {
        this.loading = false
      })
      // on failure
      .catch((err) => {
        // trigerring modal
        this.$swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Unable to fetch home data',
          showCloseButton: true,
          showConfirmButton: false,
        })
      })
  },

  methods: {
    async handleImageUrl(url) {
      this.showImageUploader = false
      this.homeData.headerImage = url
    },
    showUploader() {
      this.showImageUploader = true
      this.homeData.headerImage = ''
    },
    async updateHome() {
      const formData = {
        id: this.$route.params.id,
        subHeading: this.homeData.subHeading,
        headerImage: this.homeData.headerImage,
      }

      // on successful validation
      if (formData.subHeading !== '' && formData.headerImage !== '') {
        await this.$axios
          .$put(`/Home/${formData.id}`, formData)
          .then((res) => {
            // on success
            if (res.status === 200) {
              const message = res.message

              // trigerring modal
              this.$swal.fire({
                icon: 'success',
                title: 'Successfully Updated',
                text:
                  message.charAt(0).toUpperCase() +
                  message.slice(1).toLowerCase(),
              })

              // changing route
              this.$router.push(`/admin/home/preview/${formData.id}`)
            }
          })
          // on failure
          .catch((err) => {
            // trigerring modal
            this.$swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Cannot update home data',
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
