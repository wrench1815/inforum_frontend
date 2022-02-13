<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <!-- Edit page -->
            <h2 class="mx-4">Edit Category</h2>
          </div>

          <!-- Start:CategoryAdd Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="updateCategory">
                <div class="row mt-4">
                  <!-- Start:Name -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Name</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="category.name"
                      />
                    </div>
                  </div>
                  <!-- End:Name -->
                </div>
                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Update Category
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
    <!-- End:content -->
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      category: {},
    }
  },

  created() {
    const blogPost = this.$axios.$get(`/Categories/${this.$route.params.id}`)
    blogPost.then((res) => {
      this.category = res
    })
  },

  methods: {
    async updateCategory() {
      const formData = {
        id: this.$route.params.id,
        name: this.category.name,
      }

      await this.$axios.$put(`/Categories/${formData.id}`, formData)

      let timerInterval

      this.$swal({
        title: 'Success!',
        html: 'Category updated successfully. <br /> Redirecting in <b></b> Seconds.',
        type: 'success',
        icon: 'success',
        timer: 5000,
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
    },
  },
}
</script>

<style></style>
