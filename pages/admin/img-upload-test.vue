<template>
  <div>
    <AdminNavBar v-bind:crumbs="['Home']" />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <h1>Image Upload Test</h1>
          <p>
            Upload the Image Below. After uploaded successfully, you can see the
            Image.
          </p>
        </div>
        <div class="col-12">
          <span>Upload to Cloudinary</span>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,image/jpeg,image/png"
            aria-label="upload image button"
            @change="selectFile"
          />
        </div>
        <div class="col-12" v-if="src != ''">
          <img class="img-fluid" :src="src" alt="Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      src: '',
    }
  },

  methods: {
    async selectFile(e) {
      const file = e.target.files[0]

      if (!file) {
        return
      }

      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target.result)
          reader.readAsDataURL(f)
        })

      const data = await readData(file)

      // upload
      const instance = this.$cloudinary.upload(data, {
        folder: 'test',
        uploadPreset: 'front_upload',
      })
      instance.then((res) => {
        this.src = res.url
      })
    },
  },
}
</script>

<style></style>
