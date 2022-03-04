<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add Query</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start: Query Add -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="addQuery">
                <div class="row mb-4">
                  <!-- Start:Title -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary"
                        >Title <span class="text-danger">*</span></label
                      >
                      <input class="form-control" type="text" v-model="title" />
                    </div>
                  </div>
                  <!-- End:Title -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary mb-2"
                        >Description <span class="text-danger">*</span></label
                      >
                      <ForumRichTextEditor v-model="description" />
                    </div>
                  </div>
                  <!-- Start:Category -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary"
                        >Category <span class="text-danger">*</span></label
                      >
                      <select
                        class="form-select form-control w-100 ps-3 mt-3"
                        v-model="categoryId"
                      >
                        <option disabled value="">Select Post Category</option>
                        <option
                          v-for="cat in categories"
                          :key="cat.id"
                          v-bind:value="cat.id"
                        >
                          {{ cat.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <!-- End:Category -->
                </div>

                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Add Query
                  </button>
                </div>
                <!-- Start:Submit Button -->
              </form>
            </div>
          </div>
          <!-- End:Contact Form Add Form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',

  data() {
    return {
      title: '',
      description: '',
      categoryId: '',
      categories: [],

      // for error handling
      FormHelpTexts: {
        title: '',
        description: '',
        categoryId: '',
      },
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    validateTitle() {
      if (this.title.length < 10) {
        this.FormHelpTexts.title =
          '<strong>Title</strong> must be at least 10 Characters long.<br/>'
      } else {
        this.FormHelpTexts.title = ''
      }
    },

    validateDescription() {
      if (this.description.length < 20) {
        this.FormHelpTexts.description =
          '<strong>Description</strong> must be at least 20 Characters long.<br/>'
      } else {
        this.FormHelpTexts.description = ''
      }
    },

    validateCategory() {
      function checkCategoryId(id) {
        if (id) {
          id = String(id)
          return id ? (id.length > 0 ? true : false) : false
        } else {
          return false
        }
      }
      if (checkCategoryId(this.categoryId)) {
        this.FormHelpTexts.categoryId = ''
      } else {
        this.FormHelpTexts.categoryId =
          '<strong>Category</strong> cannot be empty.<br/>'
      }
    },

    async addQuery() {
      this.validateTitle()
      this.validateDescription()
      this.validateCategory()

      const { title, description, categoryId } = this.FormHelpTexts

      if (title == '' && description == '' && categoryId == '') {
        this.addForm()
      } else {
        let errors = [title, description, categoryId]

        errors = errors.filter((item) => item != '')

        const errorsList = errors.map((item) => `<li>${item}</li>`)

        this.$swal({
          title: 'Validation Errors!',
          icon: 'error',
          type: 'error',
          html: `<ul>${errorsList.join(' ')}</ul>`,
          confirmButtonText: 'Fix Now',
        })
      }
    },

    // Send data to Backend
    async addForm() {
      if (this.loggedInUserRole == 'Admin') {
        const data = {
          title: this.title,
          description: this.description,
          categoryId: Number(this.categoryId),
          authorId: this.loggedInUser.id,
        }

        await this.$axios
          .$post('/ForumQuery', data)
          .then((res) => {
            if (res.status == 201) {
              let timerInterval

              this.$swal({
                title: 'Success!',
                html: 'Query added successfully. <br /> Redirecting in <b></b> Seconds.',
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
                this.$router.push(`/admin/forum`)
              })
            }
          })
          .catch((err) => {
            let msg

            try {
              msg = res.message
            } catch (error) {
              msg = 'Unable to create query.<br/>Please Try Again Later.'
            }

            this.$swal({
              title: 'Error!',
              html: `${msg}`,
              type: 'error',
              icon: 'error',
              showConfirmButton: true,
            })
          })
      }
    },
  },

  created() {
    const categories = this.$axios.$get('/Categories')
    categories
      .then((res) => {
        this.categories = res
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Cannot fetch data',
          text: 'Unable to fetch categories, try refreshing the page',
        })
      })
  },
}
</script>

<style scoped></style>
