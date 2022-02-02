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
            <h1>Uploading ...</h1>
          </div>
        </div>

        <!-- cropper -->
        <div class="col-12" v-if="src != '' && showCropper">
          <cropper
            class="cropper"
            :src="src"
            :auto-zoom="true"
            :stencil-props="{
              aspectRatio: 1 / 1,
            }"
            @change="change"
          />
        </div>

        <!-- Cropped Image Preview -->
        <div class="col-12" v-show="show">
          <h1>Cropped Image</h1>
          <div id="canvas"></div>
        </div>

        <!-- Uploaded Image Preview -->
        <div class="col-12" v-if="cloudSource != ''">
          <h1>Uploaded Image</h1>
          <img class="img-fluid" :src="cloudSource" alt="Image" />
          <div>
            <button class="btn btn-success" @click="copyUrl">
              {{ isCopied ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  layout: 'admin',

  components: {
    Cropper,
  },

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
      isCopied: false,
    }
  },

  methods: {
    uploadFile() {
      this.showUploading = true
      this.show = false
      this.showResetButton = false
      this.showUploadButton = false
      this.saveImage()
      if (this.isUpload) {
        const instance = this.$cloudinary.upload(this.savedImage, {
          folder: 'test',
          uploadPreset: 'front_upload',
        })
        instance.then((res) => {
          this.cloudSource = res.url
          this.showUploading = false
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
