<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add Post</h2>
          </div>

          <!-- Start:Post Add Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="addPost">
                <div class="row mt-4">
                  <!-- Start:Featured Image -->
                  <div class="col-12" v-if="showImageUploader">
                    <div class="input-group input-group-static mb-4">
                      <label class="text-primary"
                        >Featured Image
                        <span class="text-danger">*</span></label
                      >
                    </div>
                    <!-- Image upload component -->
                    <FullImageUpload
                      :uploadFolder="'feature_image'"
                      @uploadImageUrl="handleFeatureImage($event)"
                    />
                    <div class="border-bottom"></div>
                  </div>
                  <!-- End:Featured Image -->

                  <!--Start : Feature Image Preview -->
                  <div class="col-12" v-if="postFeatureImage">
                    <div>
                      <div class="input-group input-group-static mb-4">
                        <label class="text-primary"
                          >Featured Image
                          <span class="text-danger">*</span></label
                        >
                      </div>
                      <div class="d-flex justify-content-center">
                        <img
                          :src="postFeatureImage"
                          alt="Feature Image"
                          class="img-fluid"
                        />
                      </div>
                      <div class="border-bottom"></div>
                    </div>
                  </div>
                  <!--End : Feature Image Preview -->

                  <!-- Start:Title -->
                  <div class="col-12 mt-4">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary"
                        >Title <span class="text-danger">*</span></label
                      >
                      <input
                        class="form-control"
                        type="text"
                        v-model="postTitle"
                      />
                    </div>

                    <!-- character counter -->
                    <div class="d-flex justify-content-end">
                      <CharacterCounter
                        :data="postTitle"
                        :minLength="60"
                        :maxLength="65"
                      />
                    </div>
                  </div>
                  <!-- End:Title -->

                  <!-- Start:Content -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4 mb-2">
                      <label class="text-primary"
                        >Content <span class="text-danger">*</span></label
                      >
                    </div>
                    <RichTextEditor v-model="postContent" />
                  </div>
                  <!-- End:Content -->

                  <!-- Start:Image Upload -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Upload Image</label>
                    </div>

                    <!--message  -->
                    <div class="">
                      <p>
                        <span class="text-dark"
                          >This section can be used for uploading images which
                          are needed inside content section.</span
                        >
                      </p>
                    </div>
                    <!-- Image upload component -->
                    <FullImageUpload
                      :uploadFolder="'uploads'"
                      @uploadImageUrl="handleImageUrl($event)"
                    />

                    <div class="border-bottom"></div>
                  </div>
                  <!-- End: Image Upload -->

                  <!-- Start: Short Description -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary"
                        >Short Description
                        <span class="text-danger">*</span></label
                      >
                      <textarea
                        name="exerpt"
                        class="form-control"
                        rows="4"
                        v-model="postShortDescription"
                      ></textarea>
                    </div>
                    <!-- character counter -->
                    <div class="d-flex justify-content-end">
                      <CharacterCounter
                        :data="postShortDescription"
                        :minLength="150"
                        :maxLength="160"
                      />
                    </div>
                  </div>
                  <!-- End: Short Description -->
                  <!-- Start:Excerpt -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary"
                        >Excerpt <span class="text-danger">*</span></label
                      >

                      <textarea
                        name="exerpt"
                        class="form-control"
                        rows="4"
                        v-model="postExcerpt"
                      ></textarea>
                    </div>
                    <!-- character counter -->
                    <div class="d-flex justify-content-end">
                      <CharacterCounter
                        :data="postExcerpt"
                        :minLength="140"
                        :maxLength="150"
                      />
                    </div>
                  </div>
                  <!-- End:Excerpt -->

                  <!-- Start:Category -->
                  <div class="col">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary"
                        >Category <span class="text-danger">*</span></label
                      >
                      <select
                        class="form-select form-control w-100 ps-3 mt-3"
                        v-model="postCategory"
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

                  <!-- Start:Author -->
                  <div class="col">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary"
                        >Author <span class="text-danger">*</span></label
                      >
                      <select
                        class="form-select form-control w-100 ps-3 mt-3"
                        v-model="postAuthor"
                      >
                        <option disabled value="">Select Post Author</option>
                        <option
                          v-for="user in users"
                          :key="user.id"
                          v-bind:value="user.id"
                        >
                          {{ user.firstName }} {{ user.lastName }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <!-- End:Author -->
                </div>
                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button
                    type="submit"
                    class="btn bg-gradient-primary mb-0 text-md"
                  >
                    Add Post
                  </button>
                </div>
                <!-- Start:Submit Button -->
              </form>
            </div>
          </div>
          <!-- End:Post Add Form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RichTextEditor from '../../../components/Admin/Utils/RichTextEditor'
import FullImageUpload from '~/components/Admin/Utils/FullImageUpload.vue'
import CharacterCounter from '~/components/Admin/Utils/CharacterCount.vue'

export default {
  layout: 'admin',

  components: {
    RichTextEditor,
    FullImageUpload,
    CharacterCounter,
  },

  data() {
    return {
      postTitle: '',
      postContent: '',
      postExcerpt: '',
      postCategory: '',
      postAuthor: '',
      postShortDescription: '',
      postFeatureImage: '',
      showImageUploader: true,

      // validations
      validator: {
        errorMessages: {
          title: 'Title must be 60-65 characters long',
          description: 'Content must be 500 characters long',
          shortDescription: 'Short Description must be 150-160 characters long',
          excerpt: 'Excerpt must be 140-150 characters long',
          categoryId: 'Post must have a category',
          authorId: 'Post must have an author',
          featureImage: 'Post must have a feature image',
        },

        checkTitle: (title) => {
          title = String(title)
          const length = title.length
          return length >= 60 && length <= 65
        },

        checkDescription: (description) => {
          description = String(description)
          const length = description.length
          return length >= 500
        },

        checkShortDescription: (shortDescription) => {
          shortDescription = String(shortDescription)
          const length = shortDescription.length
          return length >= 150 && length <= 160
        },

        checkExcerpt: (excerpt) => {
          excerpt = String(excerpt)
          const length = excerpt.length
          return length >= 140 && length <= 150
        },

        checkFeatureImage: (url) => {
          url = String(url)
          return url.length > 0
        },

        checkCategoryId: (id) => {
          if (id) {
            id = String(id)
            return id ? (id.length > 0 ? true : false) : false
          } else {
            return false
          }
        },

        checkAuthorId: (id) => {
          id = String(id)
          return id ? (id.length > 0 ? true : false) : false
        },

        validateAllFields(post) {
          const errors = []

          // feature image
          if (!this.checkFeatureImage(post.featureImage)) {
            errors.push(this.errorMessages.featureImage)
          }

          // title
          if (!this.checkTitle(post.title)) {
            errors.push(this.errorMessages.title)
          }

          // description
          if (!this.checkDescription(post.description)) {
            errors.push(this.errorMessages.description)
          }

          // short description
          if (!this.checkShortDescription(post.shortDescription)) {
            errors.push(this.errorMessages.shortDescription)
          }

          // excerpt
          if (!this.checkExcerpt(post.excerpt)) {
            errors.push(this.errorMessages.excerpt)
          }

          // category id
          if (!this.checkCategoryId(post.categoryId)) {
            errors.push(this.errorMessages.categoryId)
          }

          // author id
          if (!this.checkAuthorId(post.authorId)) {
            errors.push(this.errorMessages.authorId)
          }

          return errors
        },
      },
    }
  },

  async asyncData({ $axios, $config }) {
    const categories = await $axios.$get('/Categories')
    const editors = await $axios.$get(`/User/list/editor`)
    const admins = await $axios.$get(`/User/list/admin`)
    const users = [...editors.users, ...admins.users]

    return { categories, editors, admins, users }
  },

  methods: {
    copyUrl(url) {
      const customAlert = this.$swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ms-1',
        },
        buttonsStyling: false,
      })

      customAlert
        .fire({
          icon: 'question',
          title: 'Copy Image',
          text: `Copy Uploaded Image Url`,
          confirmButtonText: 'Copy',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const result = navigator.clipboard.writeText(url)
            result
              .then(() => {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Copied',
                  text: 'Uploaded Image Url Copied Successfully',
                })
              })
              .catch(() => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Cannot Copy',
                  text: 'Unable to copy uploaded image url',
                })
              })
          }
        })
    },
    async handleFeatureImage(url) {
      this.showImageUploader = false
      this.postFeatureImage = url
    },
    async handleImageUrl(url) {
      this.copyUrl(url)
    },
    async addPost() {
      const data = {
        title: this.postTitle,
        description: this.postContent,
        excerpt: this.postExcerpt,
        categoryId: parseInt(this.postCategory),
        authorId: this.postAuthor,
        shortDescription: this.postShortDescription,
        featureImage: this.postFeatureImage,
      }

      // validations
      const errors = this.validator.validateAllFields(data)
      if (errors.length != 0) {
        const errorNames = errors.map((item) => `<li class="mb-2">${item}</li>`)
        const resHtml = `<ul class='text-danger'> ${errorNames.join(' ')}</ul>`

        // triggering modal on errors
        this.$swal.fire({
          icon: 'error',
          title: 'Validation Errors',
          html: resHtml,
          showCloseButton: true,
          showConfirmButton: false,
        })
      } else {
        const result = this.$axios.$post('/BlogPosts', data)

        result
          .then((res) => {
            this.$swal.fire({
              icon: 'success',
              title: 'Blog Post Was Added',
              text: 'Blog post was added successfully',
            })
            this.$router.push(`/admin/blogpost`)
          })
          .catch((err) => {
            this.$swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Unable to add blog post',
            })
          })
      }
    },
  },
}
</script>

<style></style>
