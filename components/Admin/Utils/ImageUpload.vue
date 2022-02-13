<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col-12">
          <span v-if="!hideInputField">Upload Image</span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            aria-label="upload image button"
            @change="selectFile"
            v-if="!hideInputField"
          />
          <div class="my-3"></div>
          <button
            class="btn btn-primary"
            @click="cropImage"
            v-if="showCropButton"
          >
            Crop
          </button>
          <button
            class="btn btn-primary"
            @click="resetCrop"
            v-if="showResetButton"
          >
            Reset
          </button>
          <button
            class="btn btn-success"
            @click="uploadFile"
            v-if="showUploadButton"
          >
            Upload
          </button>

          <div v-if="showUploading">
            <h3>Uploading ...</h3>
          </div>
        </div>

        <!-- cropper -->
        <div class="col-12" v-if="src != '' && showCropper">
          <cropper
            class="cropper max-height-vh-90"
            :src="src"
            :auto-zoom="true"
            backgroundClass="bg-white"
            :stencil-props="{
              aspectRatio: 1 / 1,
            }"
            @change="change"
          />
        </div>

        <!-- Cropped Image Preview -->
        <div class="col-12" v-show="show">
          <h3>Cropped Image</h3>
          <div
            class="d-flex justify-content-center img-fluid"
            id="canvas"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: 'ImageUpload',
  components: {
    Cropper,
  },
  props: ['uploadFolder'],
  data() {
    return {
      // image source from device
      src: '',
      // coordinates of cropper
      coordinates: {},
      // cropped Image from the cropper
      croppedImage: null,
      // Saved Cropped Image
      savedImage: '',
      // uploaded Image src
      cloudSource: '',
      // show cropped Image
      show: false,
      // should crop image
      isCrop: false,
      // should upload image
      isUpload: false,
      showCropButton: false,
      showUploadButton: false,
      showResetButton: false,
      showCropper: false,
      showUploading: false,
      hideInputField: false,
      isCopied: false,
    }
  },
  methods: {
    cleanSetup() {
      // image source from device
      this.src = ''
      // coordinates of cropper
      this.coordinates = {}
      // cropped Image from the cropper
      this.croppedImage = null
      // Saved Cropped Image
      this.savedImage = ''
      // uploaded Image src
      this.cloudSource = ''
      // show cropped Image
      this.show = false
      // should crop image
      this.isCrop = false
      // should upload image
      this.isUpload = false
      this.showCropButton = false
      this.showUploadButton = false
      this.showResetButton = false
      this.showCropper = false
      this.showUploading = false
      this.hideInputField = false
      this.isCopied = false
    },
    uploadFile() {
      this.hideInputField = true
      this.showUploading = true
      this.show = false
      this.showResetButton = false
      this.showUploadButton = false
      this.saveImage()
      if (this.isUpload) {
        const instance = this.$cloudinary.upload(this.savedImage, {
          folder: this.uploadFolder ? this.uploadFolder : 'uploads',
          uploadPreset: 'front_upload',
        })
        instance.then((res) => {
          this.cloudSource = res.url
          this.showUploading = false
          this.$emit('uploadImageUrl', res.url)
          this.cleanSetup()
        })
      }
    },
    change({ coordinates, canvas }) {
      this.croppedImage = canvas
      this.coordinates = coordinates
      this.isCrop = true
    },
    cropImage() {
      if (this.isCrop) {
        const imgCanvas = document.querySelector('#canvas')
        const img = this.croppedImage
        img.style.display = 'block'
        img.classList.add('img-fluid')
        function removeAllChildNodes(parent) {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
          }
        }
        removeAllChildNodes(imgCanvas)
        imgCanvas.appendChild(img)
        this.show = true
        this.showCropper = false
        this.showCropButton = false
        this.showResetButton = true
        this.showUploadButton = true
      }
    },
    saveImage() {
      if (this.isCrop) {
        let image = document
          .querySelector('#canvas canvas')
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
        this.savedImage = image
        this.isUpload = true
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
      this.showCropper = true
      this.showCropButton = true
    },
    resetCrop() {
      this.showCropper = true
      this.showResetButton = false
      this.showCropButton = true
      this.show = false
      this.showUploadButton = false
    },
    copyUrl() {
      if (!this.isCopied) {
        const result = navigator.clipboard.writeText(this.cloudSource)
        result.then(() => {
          this.isCopied = true
        })
      }
    },
  },
}
</script>

<style scoped>
/* adjust cropper width and height here */
.cropper {
  height: 100%;
  width: 100%;
  background: #ddd;
}
</style>
