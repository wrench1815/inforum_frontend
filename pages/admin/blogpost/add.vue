<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add Post</h2>
          </div>

          <!-- form -->
          <div class="col-12">
            <form>
              <div class="card-body position-relative">
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Title</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                </div>

                <div class="input-group input-group-static mt-4">
                  <label class="text-primary">Exerpt</label>
                  <textarea
                    name="exerpt"
                    class="form-control"
                    rows="4"
                  ></textarea>
                </div>

                <div class="input-group input-group-static mt-4">
                  <label class="text-primary">Content</label>
                  <textarea
                    name="content"
                    class="form-control"
                    rows="10"
                  ></textarea>
                </div>

                <div class="input-group input-group-static my-4 flex-column">
                  <label class="text-primary">Category</label>
                  <select class="form-select w-100 ps-3 mt-3">
                    <option value="1">Python</option>
                    <option value="2">JavaScript</option>
                    <option value="3">CSharp</option>
                  </select>
                </div>

                <div class="text-end mt-4">
                  <button type="button" class="btn bg-gradient-primary mb-0">
                    Add Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
}
</script>

<style></style>
