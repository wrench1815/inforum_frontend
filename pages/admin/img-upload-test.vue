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
          <button class="btn btn-primary" @click="cropImage">Crop</button>
          <button class="btn btn-primary" @click="saveImage">Save</button>
          <button class="btn btn-success" @click="uploadFile">Upload</button>
        </div>

        <div class="col-2"></div>
        <div class="col-8" v-if="src != ''">
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
        <div class="col-2"></div>
        <div class="col-12" v-show="show" id="canvas"></div>
        <div class="col-12" v-if="savedImage">
          <h1>Saved Image</h1>
          <img :src="savedImage" class="img-fluid" alt="saved image" />
        </div>

        <div class="col-12" v-if="cloudSource != ''">
          <h1>Cloudinary Image</h1>
          <img class="img-fluid" :src="cloudSource" alt="Image" />
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
      src: '',
      coordinates: {},
      croppedImage: null,
      show: false,
      savedImage: '',
      isUpload: false,
      cloudSource: '',
    }
  },

  methods: {
    uploadFile() {
      // upload
      if (this.isUpload) {
        const instance = this.$cloudinary.upload(this.savedImage, {
          folder: 'test',
          uploadPreset: 'front_upload',
        })
        instance.then((res) => {
          this.cloudSource = res.url
        })
      }
    },
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas)
      this.croppedImage = canvas
      this.coordinates = coordinates
    },
    cropImage() {
      if (this.croppedImage) {
        const { left, top, width, height } = this.coordinates
        const imgCanvas = document.querySelector('#canvas')
        const img = this.croppedImage
        img.style.display = 'block'
        imgCanvas.appendChild(img)
        this.show = true
      }
    },
    saveImage() {
      if (this.croppedImage) {
        let image = document
          .querySelector('#canvas canvas')
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
        this.savedImage = image
        this.isUpload = true
      }
    },
    _cropCanvas(sourceCanvas, left, top, width, height) {
      let destCanvas = document.createElement('canvas')
      destCanvas.width = width
      destCanvas.height = height
      destCanvas.getContext('2d').drawImage(
        sourceCanvas,
        left,
        top,
        width,
        height, // source rect with content to crop
        0,
        0,
        width,
        height
      ) // newCanvas, same size as source rect
      return destCanvas
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
    },
  },
}
</script>

<style scoped>
.cropper {
  /* height: 600px;
  width: 600px; */
  height: 100%;
  width: 100%;
  background: #ddd;
}
</style>
