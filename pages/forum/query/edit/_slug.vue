<template>
  <div>
    <div v-if="loading">
      <h2 class="text-center">Loading.....</h2>
    </div>
    <div v-if="!loading">
      <div class="card card-body">
        <h3>Add a new Query</h3>
        <form v-on:submit.prevent="editForumQuery">
          <div class="row">
            <!-- Start:Title -->
            <div class="col-12">
              <div class="input-group input-group-static mt-4">
                <label class="text-primary"
                  >Title<span class="text-danger ms-1">*</span></label
                >
                <input
                  class="form-control"
                  type="text"
                  v-model="queryTitle"
                  @keyup="validateTitle"
                />
              </div>
              <!-- Start:Title Validation -->
              <div
                class="text-danger text-sm mt-2 text-bold"
                v-if="helpTexts.title"
              >
                {{ helpTexts.title }}
              </div>
              <!-- End:Title Validation -->
            </div>
            <!-- End:Title -->

            <!-- Start:Description -->
            <div class="col-12">
              <div class="input-group input-group-static mt-4 mb-2">
                <label class="text-primary"
                  >Description<span class="text-danger ms-1">*</span></label
                >
              </div>
              <ForumRichTextEditor
                v-model="queryDescription"
                :content="queryDescription"
                @keyup="validateDescription"
              />

              <!-- Start:Description Validation -->
              <div
                class="col-12 text-danger text-sm mt-2 text-bold"
                v-if="helpTexts.description"
              >
                {{ helpTexts.description }}
              </div>
              <!-- End:Description Validation -->
            </div>
            <!-- End:Description -->

            <!-- Start:Category -->
            <div class="col">
              <div class="input-group input-group-static mt-4">
                <label class="text-primary"
                  >Category<span class="text-danger ms-1">*</span></label
                >
                <select
                  class="form-select form-control w-100 ps-3 mt-3"
                  v-model="queryCategory"
                >
                  <option disabled value="">Select Query Category</option>
                  <option
                    v-for="cat in categories"
                    :key="cat.id"
                    v-bind:value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <!-- Start:Category Validation -->
              <div
                class="col-12 text-danger text-sm mt-2 text-bold"
                v-if="helpTexts.category"
              >
                {{ helpTexts.category }}
              </div>
              <!-- End:category Validation -->
            </div>
            <!-- End:Category -->
          </div>
          <!-- Start:Submit Button -->
          <div class="text-end mt-4">
            <button type="submit" class="btn bg-gradient-primary mb-0">
              Update Query
            </button>
          </div>
          <!-- Start:Submit Button -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['auth'],

  layout: 'forum',

  data() {
    return {
      loading: true,
      query: '',
      queryTitle: '',
      queryDescription: '',
      queryCategory: '',
      categories: [],
      querySlug: this.$route.params.slug,
      helpTexts: {
        title: '',
        description: '',
        category: '',
      },
    }
  },

  computed: {
    ...mapGetters(['loggedInUser']),
  },

  methods: {
    validateTitle() {
      if (this.queryTitle.length < 10) {
        this.helpTexts.title = 'Title must be at least 10 characters long'
      } else {
        this.helpTexts.title = ''
      }
    },

    validateDescription() {
      if (this.queryDescription.length < 50) {
        this.helpTexts.description =
          'Description must be at least 50 characters long'
      } else {
        this.helpTexts.description = ''
      }
    },

    validateCategory() {
      if (this.queryCategory === '') {
        this.helpTexts.category = 'Please select a category'
        console.log('cat')
      } else {
        this.helpTexts.category = ''
      }
    },

    editForumQuery() {
      const queryData = {
        id: this.query.id,
        title: this.queryTitle,
        description: this.queryDescription,
        categoryId: Number(this.queryCategory),
        authorId: this.loggedInUser.id,
        datePosted: this.query.datePosted,
        vote: this.query.vote,
      }

      this.validateTitle()
      this.validateDescription()
      this.validateCategory()

      if (
        this.helpTexts.title == '' &&
        this.helpTexts.description == '' &&
        this.helpTexts.category == ''
      ) {
        this.$axios
          .$put(`/ForumQuery/${this.query.id}`, queryData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal({
                title: 'Success',
                text: 'Query Updated Successfully',
                icon: 'success',
                button: 'Ok',
              }).then(() => {
                this.$router.push('/forum')
              })
            } else {
              this.$swal({
                title: 'Error',
                html: 'Something went wrong<br>Please try again',
                icon: 'error',
                button: 'Ok',
              })
            }
          })
          .catch((err) => {
            this.$swal({
              title: 'Error',
              html: 'Something went wrong<br>Please try again',
              icon: 'error',
              button: 'Ok',
            })
          })
      } else
        this.$swal({
          title: 'Validation Errors',
          text: 'Please fill all the fields',
          icon: 'info',
          button: 'Ok',
        })
    },
  },

  mounted() {
    this.$axios
      .$get('/Categories')
      .then((cats) => {
        this.categories = cats
      })
      .then(() => {
        this.$axios
          .$get(`ForumQuery/slug/${this.querySlug}`)
          .then((res) => {
            this.query = res
            this.queryTitle = res.title
            this.queryDescription = res.description
            this.queryCategory = res.categoryId
          })
          .then(() => {
            this.loading = false
          })
      })
  },
}
</script>

<style></style>
