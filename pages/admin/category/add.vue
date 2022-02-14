<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add Category</h2>
          </div>

          <!-- Start:Category Add Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="addCategory">
                <div class="row mt-4">
                  <!-- Start:Name -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Name</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="categoryName"
                      />
                    </div>
                  </div>
                  <!-- End:Name -->
                </div>
                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Add Category
                  </button>
                </div>
                <!-- Start:Submit Button -->
              </form>
            </div>
          </div>
          <!-- End:Category Add Form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      categoryName: '',
    }
  },

  async asyncData({ $axios, $config }) {
    const categories = await $axios.$get('/Categories')
    return { categories }
  },

  methods: {
    categoryValidator(name) {
      if (name) {
        return name.length > 0
      } else {
        return false
      }
    },
    async addCategory() {
      const data = {
        name: this.categoryName,
      }
      if (this.categoryValidator(data.name)) {
        this.$axios
          .$post('/Categories', data)
          .then((res) => {
            let timerInterval
            this.$swal({
              title: 'Success!',
              html: 'Category created successfully. <br /> Redirecting in <b></b> Seconds.',
              type: 'success',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.showLoading()
                const b = this.$swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Math.ceil(this.$swal.getTimerLeft() / 1000)
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              },
            }).then(() => {
              this.$router.push('/admin/category')
            })
          })
          .catch((err) => {
            this.$swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Category cannot be created, may already exists, or something went wrong ',
              confirmButtonText: 'Try Again',
            })
          })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Category cannot be empty',
          confirmButtonText: 'Try Again',
        })
      }
    },
  },
}
</script>

<style></style>
