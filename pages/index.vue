<template>
  <div class="">
    <loading class="mt-7 bg-transparent shadow-none" v-if="loading" />

    <template v-if="!loading">
      <!-- Header:Start -->
      <header>
        <div class="page-header min-vh-100">
          <div
            class="header-bg-image w-lg-55 w-md-50 w-sm-100 w-100 position-absolute fixed-top ms-auto h-100 z-index-0"
            loading="lazy"
            :style="{
              'background-image': 'url(' + homeData.headerImage + ')',
            }"
          ></div>
          <div class="container">
            <div class="row">
              <div class="col-lg-7">
                <div class="card card-body blur shadow-lg p-5 my-5">
                  <h1>
                    Welcome to
                    <span class="text-gradient bg-gradient-primary"
                      >Inforum</span
                    >
                  </h1>
                  <p class="lead text-bold">
                    {{ homeData.subHeading }}
                    <!-- An Information Exchange for Students by Students. -->
                  </p>
                  <div class="buttons">
                    <button type="button" class="btn bg-gradient-primary mt-4">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Header:End -->

      <!-- Recent Forum Queries:Start -->
      <div class="mx-3 mx-md-4">
        <div class="container mt-6">
          <div class="row pt-4">
            <div class="col">
              <h3>See Recent Queries</h3>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
                dicta, beatae, cumque soluta quos deleniti nostrum quo iste ea
                ut inventore illo labore consequatur laudantium quisquam
                praesentium accusamus consequuntur temporibus!
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Recent Forum Queries:End -->
    </template>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  components: { Loading },

  data() {
    return {
      homeData: {},
      loading: true,
    }
  },

  mounted() {
    this.$axios
      .$get('/home')
      .then((res) => {
        this.homeData = res[0] || {
          subHeading: 'Information Exchange For Students by Students.',
          headerImage:
            'https://res.cloudinary.com/inforum/image/upload/v1644820069/Defaults/img-1_nvdef7.jpg',
        }
      })
      .then(() => {
        this.loading = false
      })
  },
}
</script>

<style scoped>
.header-bg-image {
  /* background-image: url(~assets/images/img-1.jpg); */
  background-repeat: no-repeat;
  background-position: top left;
  background-size: fit;
}
</style>
