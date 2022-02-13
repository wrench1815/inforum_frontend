<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <!-- Edit page -->
            <h2 class="mx-4">Edit Post</h2>
          </div>

          <!-- Start:Post Add Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="updatePost">
                <div class="row mt-4">
                  <!-- Start:Title -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Title</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="postData.title"
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
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Content</label>
                      <RichTextEditor
                        v-model="postData.description"
                        :content="postData.description"
                      />
                    </div>
                  </div>
                  <!-- End:Title -->

                  <!-- Start:Excerpt -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Excerpt</label>
                      <textarea
                        name="exerpt"
                        class="form-control"
                        rows="4"
                        v-model="postData.excerpt"
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
                        v-model="postData.categoryId"
                      >
                        <option disabled>Select Post Category</option>
                        <template v-for="category in categories">
                          <option
                            v-if="category.id == postData.categoryId"
                            :key="category.id"
                            :value="category.id"
                            selected
                          >
                            {{ category.name }}
                          </option>
                          <option
                            v-else
                            :key="category.id"
                            :value="category.id"
                          >
                            {{ category.name }}
                          </option>
                        </template>
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
                        v-model="postData.authorId"
                      >
                        <option disabled>Select Post Author</option>
                        <template v-for="user in users">
                          <option
                            v-if="user.id == postData.authorId"
                            :key="user.id"
                            :value="user.id"
                            selected
                          >
                            {{ user.firstName }} {{ user.lastName }}
                          </option>

                          <option v-else :key="user.id" :value="user.id">
                            {{ user.firstName }} {{ user.lastName }}
                          </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <!-- End:Author -->
                </div>
                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Update Post
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
    <!-- End:content -->
  </div>
</template>

<script>
import RichTextEditor from '../../../../components/Admin/Utils/RichTextEditor'
import FullImageUpload from '~/components/Admin/Utils/FullImageUpload.vue'

export default {
  layout: 'admin',

  components: {
    RichTextEditor,
    FullImageUpload,
  },

  data() {
    return {
      postData: {},
    }
  },

  async asyncData({ $axios, $config }) {
    const categories = await $axios.$get('/Categories')
    const editors = await $axios.$get(`/User/list/editor`)
    const admins = await $axios.$get(`/User/list/admin`)
    const users = [...editors.users, ...admins.users]

    return { categories, editors, admins, users }
  },

  created() {
    const blogPost = this.$axios.$get(`/BlogPosts/${this.$route.params.id}`)
    blogPost.then((res) => {
      this.postData = res
    })
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
    async updatePost() {
      const formData = {
        id: this.$route.params.id,
        title: this.postData.title,
        description: this.postData.description,
        excerpt: this.postData.excerpt,
        categoryId: parseInt(this.postData.categoryId),
        authorId: this.postData.authorId,
      }

      await this.$axios.$put(`/BlogPosts/${formData.id}`, formData)
      this.$router.push(`/admin/blogpost/preview/${formData.id}`)
    },
  },
}
</script>

<style></style>
