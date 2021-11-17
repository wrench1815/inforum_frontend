<template>
  <div class="container mt-8">
    <h1 class="text-center">Contact Us</h1>
    <form>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <div class="input-group input-group-outline my-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group input-group-outline my-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md">
              <label class="form-label my-3">Message</label>
              <div class="input-group input-group-outline">
                <textarea
                  class="form-control"
                  placeholder="Leave your message"
                  rows="15"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md">
              <button type="submit" class="btn bg-gradient-primary my-3">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
