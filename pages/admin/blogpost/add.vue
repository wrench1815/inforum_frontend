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
            <form>
              <div class="card-body position-relative">
                <div class="row mt-4">
                  <!-- Start:Title -->
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Title</label>
                      <input class="form-control" type="text" />
                    </div>
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
                    ></textarea>
                  </div>
                </div>
                <!-- End:Excerpt -->

                <!-- Start:Category -->
                <div class="col">
                  <div class="input-group input-group-static my-4">
                    <label class="text-primary">Category</label>
                    <select class="form-select form-control w-100 ps-3 mt-3">
                      <option>Select Post Category</option>
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
                <!-- Start:Category -->

                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="button" class="btn bg-gradient-primary mb-0">
                    Add Post
                  </button>
                </div>
                <!-- Start:Submit Button -->
              </div>
            </form>
          </div>
          <!-- End:Post Add Form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ $axios, $config }) {
    const categories = await $axios.$get('/Categories')
    return { categories }
  },

  methods: {},
}
</script>

<style></style>
