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
                        <option disabled>Select Post Category</option>
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

export default {
  layout: 'admin',

  components: {
    RichTextEditor,
  },

  data() {
    return {
      postTitle: '',
      postContent: '',
      postExcerpt: '',
      postCategory: '',
    }
  },

  async asyncData({ $axios, $config }) {
    const categories = await $axios.$get('/Categories')
    return { categories }
  },

  methods: {
    async addPost() {
      const data = {
        title: this.postTitle,
        description: this.postContent,
        excerpt: this.postExcerpt,
        categoryId: parseInt(this.postCategory),
        authorId: this.$auth.$storage.getUniversal('user').user.id,
      }
      await this.$axios.$post('/BlogPosts', data)
      this.$router.push(`/admin/blogpost`)
    },
  },
}
</script>

<style></style>
