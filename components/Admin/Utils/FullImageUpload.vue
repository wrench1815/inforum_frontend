<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col-12">
          <div v-if="showFileUpload">
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              @change="selectFile"
            />
          </div>
          <div class="my-3"></div>
          <div class="d-flex justify-content-end gap-3">
            <button
              class="btn btn-primary"
              @click="cleanSetup"
              v-if="showResetButton"
            >
              Reset
            </button>
            <button
              class="btn btn-success"
              @click="uploadImage"
              v-if="showUploadButton"
            >
              Upload
            </button>
          </div>

          <div v-if="showUploading">
            <h2 class="text-center py-3">Uploading...</h2>
          </div>
        </div>

        <div class="col-12" v-if="show">
          <h2 class="text-center py-2">Image Preview</h2>
          <div class="d-flex justify-content-center py-2">
            <img :src="src" alt="Image Preview" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullImageUpload',

  props: ['uploadFolder'],

  data() {
    return {
      // image source from device
      src: '',
      show: false,
      isUpload: false,
      showUploadButton: false,
      showResetButton: false,
      showUploading: false,
      showFileUpload: true,
    }
  },

  methods: {
    cleanSetup() {
      this.src = ''
      this.show = false
      this.isUpload = false
      this.showUploadButton = false
      this.showResetButton = false
      this.showUploading = false
      this.showFileUpload = true
    },

    uploadImage() {
      if (this.isUpload) {
        this.show = false
        this.showUploading = true
        this.showUploadButton = false
        this.showResetButton = false
        const instance = this.$cloudinary.upload(this.src, {
          folder: this.uploadFolder ? this.uploadFolder : 'uploads',
          uploadPreset: 'front_upload',
        })
        instance
          .then((res) => {
            this.cloudSource = res.url
            this.showUploading = false
            this.$emit('uploadImageUrl', res.url)
            this.cleanSetup()
          })
          .catch((err) => {
            this.$swal.fire({
              icon: 'error',
              title: 'Uploading Failed',
              text: 'Unable to upload image',
              showCloseButton: true,
              showConfirmButton: false,
            })
            this.cleanSetup()
          })
      }
    },

    async selectFile(e) {
      const file = e.target.files[0]
      if (!file) {
        return
      }
      // validations: I may change them in future for now, its ok
      const pattern = new RegExp(/(jpg|jpeg|png)/)
      if (!pattern.test(file.type)) {
        this.$swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Only png, jpg, jpeg files are allowed',
          showCloseButton: true,
          showConfirmButton: false,
        })
        this.src = ''
        this.showCropButton = false
        e.target.value = ''
        return
      }
      // mb -> bytes
      const converter = (sizeInMb) => sizeInMb * 1024 * 1024
      // file should be less than 2 mb
      if (!(file.size < converter(2))) {
        this.$swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Image size should be less than 2 MB',
          showCloseButton: true,
          showConfirmButton: false,
        })
        this.src = ''
        this.showCropButton = false
        e.target.value = ''
        return
      }
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target.result)
          reader.readAsDataURL(f)
        })
      const data = await readData(file)
      this.src = data
      this.showUploadButton = true
      this.showResetButton = true
      this.show = true
      this.isUpload = true
      this.showFileUpload = false
    },
  },
}
</script>

<style scoped></style>
