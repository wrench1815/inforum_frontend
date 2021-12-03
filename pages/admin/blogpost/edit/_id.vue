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

                  <!-- Start:Content -->
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Content</label>
                      <textarea
                        name="content"
                        class="form-control"
                        rows="10"
                        v-model="postData.description"
                      ></textarea>
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
export default {
  layout: 'admin',

  data() {
    return {
      postData: {},
    }
  },

  async asyncData({ $axios, $config, params }) {
    const categories = await $axios.$get('/Categories')
    return { categories }
  },

  created() {
    const blogPost = this.$axios.$get(`/BlogPosts/${this.$route.params.id}`)
    blogPost.then((res) => {
      this.postData = res
    })
  },
  methods: {
    async updatePost() {
      const data = {
        title: this.postData.title,
        description: this.postData.description,
        excerpt: this.postData.excerpt,
        categoryId: parseInt(this.postData.categoryId),
      }
      console.log(data)
    },
  },
}
</script>

<style></style>
