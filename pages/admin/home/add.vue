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
              <form v-on:submit.prevent="addHome">
                <div class="row">
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Heading</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="home.heading"
                      />
                    </div>
                  </div>

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

                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Choose Heading Image</label>
                      <div class="form-control">
                        <input type="file" />
                      </div>
                    </div>
                  </div>

                  <template v-if="home.headerImageLink">
                    <div class="col">
                      <div class="input-group input-group-static my-4">
                        <label class="text-primary">Preview Image</label>
                        <div class="form-control">
                          <img class="img-fluid" src="" alt="heading image" />
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Add Home
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
      home: {
        heading: '',
        subHeading: '',
        headerImageLink: '',
      },
    }
  },

  methods: {
    async addHome() {
      const formData = {
        heading: this.home.heading,
        subHeading: this.home.subHeading,

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
                  timer: 5000,
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
