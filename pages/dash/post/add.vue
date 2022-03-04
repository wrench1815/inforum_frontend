<template>
  <div class="card-body pt-0">
    <h3 class="card card-body">Add a New Post</h3>

    <Loading class="mt-3" v-if="loading" />

    <form
      v-on:submit.prevent="addPost"
      class="card card-body mt-3"
      v-if="!loading"
    >
      <div class="row">
        <!-- Start:Featured Image -->
        <div class="col-12" v-if="showImageUploader">
          <div class="input-group input-group-static mb-4">
            <label class="text-primary"
              >Featured Image <span class="text-danger">*</span></label
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
                >Featured Image <span class="text-danger">*</span></label
              >
            </div>
            <div class="d-flex justify-content-center">
              <img
                :src="postFeatureImage"
                alt="Feature Image"
                class="img-fluid max-height-vh-100"
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
            <input class="form-control" type="text" v-model="postTitle" />
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

        <!-- Start:Image Upload -->
        <div class="col-12">
          <div class="input-group input-group-static my-4">
            <label class="text-primary">Upload Image</label>
          </div>

          <!--message  -->
          <div class="">
            <p>
              <span class="text-dark"
                >This section can be used for uploading images which are needed
                inside content section.</span
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

        <!-- Start: Short Description -->
        <div class="col-12">
          <div class="input-group input-group-static mt-4">
            <label class="text-primary"
              >Short Description <span class="text-danger">*</span></label
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
      </div>
      <!-- Start:Submit Button -->
      <div class="text-end mt-4">
        <button type="submit" class="btn bg-gradient-success">Add Post</button>
      </div>
      <!-- Start:Submit Button -->
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RichTextEditor from '~/components/Admin/Utils/RichTextEditor'
import FullImageUpload from '~/components/Admin/Utils/FullImageUpload.vue'
import CharacterCounter from '~/components/Admin/Utils/CharacterCount.vue'
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'dash',

  components: {
    RichTextEditor,
    FullImageUpload,
    CharacterCounter,
    Loading,
  },

  data() {
    return {
      loading: true,
      newPost: {
        title: '',
        description: '',
        shortDescription: '',
        featureImage: '',
        excerpt: '',
        category: '',
      },
      postTitle: '',
      postContent: '',
      postExcerpt: '',
      postCategory: '',
      postAuthor: '',
      postShortDescription: '',
      postFeatureImage: '',
      showImageUploader: true,
      categories: [],

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

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
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
        shortDescription: this.postShortDescription,
        featureImage: this.postFeatureImage,
        excerpt: this.postExcerpt,
        categoryId: parseInt(this.postCategory),
        authorId: this.loggedInUser.id,
      }

      // validations
      const errors = this.validator.validateAllFields(data)
      if (errors.length != 0) {
        const errorNames = errors.map((item) => `<li class="mb-2">${item}</li>`)
        const resHtml = `<ul class='text-danger list-unstyled'> ${errorNames.join(
          ' '
        )}</ul>`

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
            this.$router.push(`/dash/post/list`)
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

  mounted() {
    this.$axios
      .$get(`Categories`)
      .then((res) => {
        this.categories = res
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$swal({
          title: 'Error',
          type: 'error',
          icon: 'error',
          html: `Failed to fetch Necessary Data.<br/>Please try again later.`,
          confirmButtonText: 'Ok',
        })
      })
  },
}
</script>

<style scoped></style>
