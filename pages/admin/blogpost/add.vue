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
                  <!-- Start:Title -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Title</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="postTitle"
                      />
                    </div>
                  </div>
                  <!-- End:Title -->

                  <!-- Start:Image Upload -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Upload Image</label>
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
                      <label class="text-primary">Content</label>
                    </div>
                    <RichTextEditor v-model="postContent" />
                  </div>
                  <!-- End:Content -->

                  <!-- Start:Excerpt -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Excerpt</label>
                      <textarea
                        name="exerpt"
                        class="form-control"
                        rows="4"
                        v-model="postExcerpt"
                      ></textarea>
                    </div>
                  </div>
                  <!-- End:Excerpt -->

                  <!-- Start:Category -->
                  <div class="col">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Category</label>
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
                      <label class="text-primary">Author</label>
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
                  <button type="submit" class="btn bg-gradient-primary mb-0">
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

export default {
  layout: 'admin',

  components: {
    RichTextEditor,
    FullImageUpload,
  },

  data() {
    return {
      postTitle: '',
      postContent: '',
      postExcerpt: '',
      postCategory: '',
      postAuthor: '',
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
          title: 'Are you sure ?',
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
      }
      await this.$axios.$post('/BlogPosts', data)
      this.$router.push(`/admin/blogpost`)
    },
  },
}
</script>

<style></style>
