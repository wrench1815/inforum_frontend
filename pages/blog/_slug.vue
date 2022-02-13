<template>
  <div>
    <div v-if="loading">Loading Data</div>
    <div v-if="!loading">
      <!-- Start:Header -->
      <header>
        <div
          class="page-header min-vh-95 header-image"
          :style="`background-image: url(${img})`"
          loading="lazy"
        >
          <span class="mask bg-gradient-dark opacity-6"></span>
          <div class="container">
            <div class="row">
              <div class="col-lg-10 d-flex justify-content-center flex-column">
                <h1 class="text-white mb-0">{{ post.title }}</h1>
                <p class="lead pe-sm-5 me-sm-5 text-white opacity-8">
                  {{ post.shortDescription }}
                </p>

                <!-- Start:Author -->
                <div class="mt-3 text-white">
                  <img
                    :src="author.user.profileImage"
                    width="25rem"
                    :alt="`${author.user.firstName} ${author.user.lastName}`"
                    class="mb-1 avatar img-fit"
                  />
                  <span class=""
                    >{{ author.user.firstName }}
                    {{ author.user.lastName }}</span
                  >
                </div>
                <!-- End:Author -->

                <!-- Start:Date -->
                <div class="text-white">
                  {{ formattedDate(post.datePosted) }}
                </div>
                <!-- End:Date -->
                <!-- <h5 class="mt-3 text-white">Connect with us on</h5>
              <div class="d-flex justify-content-start">
                <a href="javascript:;"
                  ><i
                    class="fab fa-facebook text-white me-4 text-lg"
                    aria-hidden="true"
                  ></i
                ></a>
                <a href="javascript:;"
                  ><i
                    class="fab fa-instagram text-white me-4 text-lg"
                    aria-hidden="true"
                  ></i
                ></a>
                <a href="javascript:;"
                  ><i
                    class="fab fa-twitter text-white me-4 text-lg"
                    aria-hidden="true"
                  ></i
                ></a>
                <a href="javascript:;"
                  ><i
                    class="fab fa-google-plus text-white text-lg"
                    aria-hidden="true"
                  ></i
                ></a>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- End:Header -->

      <!-- Start:Main Section -->
      <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <section class="py-5 mt-5">
          <div class="container">
            <div class="row">
              <div
                v-html="post.description"
                class="col-lg-9 ms-auto me-auto"
                id="postContent"
              ></div>
            </div>

            <!-- Start:carousel -->
            <!-- <section class="py-7 position-relative">
            <div
              id="carousel-testimonials"
              class="carousel slide carousel-team"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-md-5 ms-lg-auto">
                        <div class="p-3">
                          <img
                            class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                            src="https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                            alt="First slide"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div class="col-md-5 me-lg-auto position-relative">
                        <h6
                          class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                        >
                          First Step
                        </h6>
                        <h1
                          class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                        >
                          Give your best
                        </h1>
                        <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                          Give your best to create something unique with high
                          impact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-md-5 ms-lg-auto">
                        <div class="p-3">
                          <img
                            class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                            src="https://images.unsplash.com/photo-1602781975725-cab34bd38d94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                            alt="Second slide"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div class="col-md-5 me-lg-auto position-relative">
                        <h6
                          class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                        >
                          Second Step
                        </h6>
                        <h1
                          class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                        >
                          Plan your work
                        </h1>
                        <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                          As we live, our hearts turn colder. Cause pain is what
                          we go through.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-md-5 ms-lg-auto">
                        <div class="p-3">
                          <img
                            class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                            src="https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=974&amp;q=80"
                            alt="Third slide"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div class="col-md-5 me-lg-auto position-relative">
                        <h6
                          class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                        >
                          Third Step
                        </h6>
                        <h1
                          class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                        >
                          Follow your dreams
                        </h1>
                        <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                          The time is now for it to be okay to be great. People
                          in this world shun people.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-md-5 ms-lg-auto">
                        <div class="p-3">
                          <img
                            class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                            src="https://images.unsplash.com/photo-1579523616974-c2b09289c27e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=966&amp;q=80"
                            alt="Fourth slide"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div class="col-md-5 me-lg-auto position-relative">
                        <h6
                          class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                        >
                          Fourth Step
                        </h6>
                        <h1
                          class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                        >
                          Never give up
                        </h1>
                        <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                          Everyone’s born confident, and everything’s taken away
                          from you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="position-relative mt-n6">
                <a
                  class="carousel-control-prev text-dark position-absolute bottom-0 end-0 ms-auto"
                  href="#carousel-testimonials"
                  role="button"
                  data-bs-slide="prev"
                >
                  <i
                    class="fas fa-2x fa-chevron-left position-absolute start-0 ms-3 mt-7 mt-md-0 ms-n5 ms-md-0"
                    aria-hidden="true"
                  ></i>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next text-dark position-absolute bottom-0 end-0 ms-auto ms-4"
                  href="#carousel-testimonials"
                  role="button"
                  data-bs-slide="next"
                >
                  <i
                    class="fas fa-2x fa-chevron-right mt-7 mt-md-0"
                    aria-hidden="true"
                  ></i>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </section> -->
            <!-- End:carousel -->
          </div>
        </section>

        <hr />

        <!-- Start:Comments -->
        <section class="py-7">
          <div class="container">
            <div class="row">
              <div class="col-lg-9 ms-auto me-auto">
                <BlogFullComment :postId="post.id" />
              </div>
            </div>
          </div>
        </section>
        <!-- End:Comments -->

        <!-- Start:Related Articles -->
        <!-- <section class="py-7">
        <div class="container">
          <div class="row">
            <div class="col-9 text-center mx-auto">
              <h3 class="mb-1">See other articles</h3>
              <p class="mb-6 px-md-6">
                Create a unique and beautiful blog posts. You can also connect
                your blog directly to Google Analytics to have a more detailed
                look.
              </p>
            </div>
            <div class="col-lg-4 mb-lg-0 mb-4">
              <div class="card">
                <div
                  class="card-header p-0 mx-3 mt-n4 position-relative z-index-1"
                >
                  <a href="javascript:;" class="d-block blur-shadow-image">
                    <img
                      src="@/assets/images/img-1.jpg"
                      class="img-fluid border-radius-md"
                      alt="anastasia"
                      loading="lazy"
                    />
                  </a>
                  <div
                    class="colored-shadow"
                    style="
                      background-image: url('../../assets/img/examples/color2.jpg');
                    "
                  ></div>
                </div>
                <div class="card-body">
                  <span
                    class="text-gradient text-primary text-uppercase text-xs font-weight-bold"
                    >House</span
                  >
                  <a
                    href="javascript:;"
                    class="card-title mt-3 h5 d-block text-darker"
                  >
                    Shared Coworking
                  </a>
                  <p class="card-description mb-4">
                    Use border utilities to quickly style the border and
                    border-radius of an element. Great for images, buttons.
                  </p>
                  <div class="author align-items-center">
                    <img
                      src="@/assets/images/img-1.jpg"
                      alt="..."
                      class="avatar shadow"
                      loading="lazy"
                    />
                    <div class="name ps-2">
                      <span>Mathew Glock</span>
                      <div class="stats">
                        <small>Posted on 28 February</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-lg-0 mb-4">
              <div class="card">
                <div
                  class="card-header p-0 mx-3 mt-n4 position-relative z-index-1"
                >
                  <a href="javascript:;" class="d-block blur-shadow-image">
                    <img
                      src="@/assets/images/img-1.jpg"
                      class="img-fluid border-radius-md"
                      alt="nastuh"
                      loading="lazy"
                    />
                  </a>
                  <div
                    class="colored-shadow"
                    style="
                      background-image: url('../../assets/img/examples/color3.jpg');
                    "
                  ></div>
                </div>
                <div class="card-body">
                  <span
                    class="text-gradient text-info text-uppercase text-xs font-weight-bold"
                    >House</span
                  >
                  <a
                    href="javascript:;"
                    class="text-darker card-title mt-3 h5 d-block"
                  >
                    Really Housekeeping
                  </a>
                  <p class="card-description mb-4">
                    Use border utilities to quickly style the border and
                    border-radius of an element. Great for images, buttons.
                  </p>
                  <div class="author align-items-center">
                    <img
                      src="@/assets/images/img-1.jpg"
                      alt="ivana"
                      class="avatar shadow"
                      loading="lazy"
                    />
                    <div class="name ps-2">
                      <span>Mathew Glock</span>
                      <div class="stats">
                        <small>Posted on 28 February</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-lg-0 mb-4">
              <div class="card">
                <div
                  class="card-header p-0 mx-3 mt-n4 position-relative z-index-1"
                >
                  <a href="javascript:;" class="d-block blur-shadow-image">
                    <img
                      src="@/assets/images/img-1.jpg"
                      class="img-fluid border-radius-md"
                      alt="annie"
                      loading="lazy"
                    />
                  </a>
                  <div
                    class="colored-shadow"
                    style="
                      background-image: url('../../assets/img/examples/color1.jpg');
                    "
                  ></div>
                </div>
                <div class="card-body">
                  <span
                    class="text-gradient text-warning text-uppercase text-xs font-weight-bold"
                    >House</span
                  >
                  <a
                    href="javascript:;"
                    class="text-darker card-title mt-3 h5 d-block"
                  >
                    Shared Coworking
                  </a>
                  <p class="card-description mb-4">
                    Use border utilities to quickly style the border and
                    border-radius of an element. Great for images, buttons.
                  </p>
                  <div class="author align-items-center">
                    <img
                      src="@/assets/images/img-1.jpg"
                      alt="marie"
                      class="avatar shadow"
                      loading="lazy"
                    />
                    <div class="name ps-2">
                      <span>Mathew Glock</span>
                      <div class="stats">
                        <small>Posted on 28 February</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
        <!-- End:Related Articles -->

        <!-- Start:Social Links -->
        <!-- <div class="py-lg-5 py-0">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <h4 class="mb-1">Thank you for your support!</h4>
              <p class="lead mb-0">Delivering the best products</p>
            </div>
            <div
              class="col-lg-6 mt-lg-0 mt-4 d-lg-flex align-items-center justify-content-end"
            >
              <a href="javascript:;" class="btn btn-twitter mb-lg-0 mb-2 me-2">
                <i class="fab fa-twitter me-1" aria-hidden="true"></i> Twitter
              </a>
              <a href="javascript:;" class="btn btn-facebook mb-lg-0 mb-2 me-2">
                <i class="fab fa-facebook-square me-1" aria-hidden="true"></i>
                Facebook
              </a>
              <a href="javascript:;" class="btn btn-tumblr mb-lg-0 mb-2 me-2">
                <i class="fab fa-tumblr me-1" aria-hidden="true"></i> Tumblr
              </a>
              <a href="javascript:;" class="btn btn-dribbble mb-lg-0 mb-2">
                <i class="fab fa-dribbble me-1" aria-hidden="true"></i> Dribbble
              </a>
            </div>
          </div>
        </div>
      </div> -->
        <!-- End:Social Links -->
      </div>
      <!-- End:Main Section -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: '',
      author: '',
      loading: true,
      img: '',
    }
  },

  methods: {
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    // get post data from api
    this.$axios
      .$get(`/BlogPosts/slug/${this.$route.params.slug}`)
      .then((res) => {
        this.post = res
      })
      .then(() => {
        this.$axios
          .$get(`User/single/${this.post.authorId}`)
          .then((u) => {
            this.author = u
          })
          .then(() => {
            var postFeaturedImage = this.post.featuredImage
            if (postFeaturedImage != null) {
              this.img = postFeaturedImage.url
            } else {
              this.img =
                'https://res.cloudinary.com/inforum/image/upload/v1643628290/Blog/img-1_nzeds8.jpg'
            }

            this.loading = false
          })
          .then(() => {
            const postContent = document.getElementById('postContent')

            // adds classes to images to make them responsive
            const images = postContent.getElementsByTagName('img')
            if (images.length > 0) {
              for (let i = 0; i < images.length; i++) {
                images[i].classList.add('img-fluid', 'shadow-lg')
              }
            }

            // adds classes to figures and its sub-elements to make them responsive
            const figures = postContent.getElementsByTagName('figure')
            if (figures.length > 0) {
              for (let i = 0; i < figures.length; i++) {
                figures[i].classList.add('mx-auto')
                figures[i]
                  .getElementsByTagName('img')[0]
                  .classList.add('figure-img', 'img-fluid', 'shadow-lg')
                figures[i]
                  .getElementsByTagName('figcaption')[0]
                  .classList.add('figure-caption', 'text-center', 'text-bold')
              }
            }
          })
      })
  },
  methods: {
    getDatePosted() {
      const myDate = new Date(this.post.datePosted)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },
}
</script>

<style scoped>
.header-image {
  background-size: cover;
  transform: translate3d(0px, 0px, 0px);
}

.img-fit {
  object-fit: cover;
  object-position: center;
}
</style>
