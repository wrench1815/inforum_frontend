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

          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="updateHome">
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Heading</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="homeData.heading"
                      />
                    </div>
                  </div>

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
                        <input type="file" />
                      </div>
                    </div>
                  </div>

                  <div class="col">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Preview Image</label>
                      <div class="form-control">
                        <img
                          class="img-fluid"
                          :src="homeData.headerImageLink"
                          alt="heading image"
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
export default {
  layout: 'admin',
  data() {
    return {
      homeData: {},
    }
  },

  created() {
    const blogPost = this.$axios.$get(`/Home/${this.$route.params.id}`)
    // on success
    blogPost
      .then((res) => {
        this.homeData = res
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
    async updateHome() {
      const formData = {
        id: this.$route.params.id,
        heading: this.homeData.heading,
        subHeading: this.homeData.subHeading,

        // this is hard coded untill we implement image upload
        headerImageLink:
          'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8YmxvZ3x8fHx8fDE2NDExNzQ2MTg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800',
      }

      // on successful validation
      if (
        formData.heading !== '' &&
        formData.subHeading !== '' &&
        formData.headerImageLink !== ''
      ) {
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
          text: 'Heading, Sub Heading and Header Image Cannot Be Empty',
          showCloseButton: true,
          showConfirmButton: false,
        })
      }
    },
  },
}
</script>

<style></style>
