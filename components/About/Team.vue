<template>
  <section
    class="pb-5 position-relative bg-gradient-dark card border-radius-top-start-0 border-radius-top-end-0"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Team behind Inforum
          </h3>
          <p class="text-white opacity-8 mb-0">
            Just a bunch of Nobodies enjoying what they like to do.
          </p>
        </div>
      </div>
      <div class="row">
        <!-- Team 1 -->
        <div class="col-lg-6 col-12">
          <div class="card card-profile mt-4">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-12 mt-n5">
                <div class="p-3 pe-md-0">
                  <div class="ratio ratio-1x1">
                    <img
                      class="w-100 border-radius-md shadow-lg img-cover"
                      :src="$config.hImage"
                      alt="Profile Image"
                      v-lazy-load
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-6 col-12 my-auto">
                <div class="card-body ps-lg-0">
                  <h5 class="mb-0">Hardeep Kumar</h5>
                  <h6 class="text-info">Team Lead, Backend</h6>
                  <p class="mb-0">
                    Team Lead. Incharge of Backend and Database. Also proficient
                    in Frontend and built many Aspects of Frontend especially
                    the User System and Comment System .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Team 1 -->

        <!-- Team 2 -->
        <div class="col-lg-6 col-12">
          <div class="card card-profile mt-lg-4 mt-5">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-12 mt-n5">
                <div class="p-3 pe-md-0">
                  <div class="ratio ratio-1x1">
                    <img
                      class="w-100 border-radius-md shadow-lg img-cover"
                      :src="$config.aImage"
                      alt="Profile Image"
                      v-lazy-load
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-6 col-12 my-auto">
                <div class="card-body ps-lg-0">
                  <h5 class="mb-0">Anmol Sharma</h5>
                  <h6 class="text-info">Frontend, Components</h6>
                  <p class="mb-0">
                    Frontend Developer. Incharge of Frontend and Component
                    System. Did a Phenomenal Job in building Pagination and
                    Routing system for the Application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Team 2 -->
      </div>
      <div class="row justify-content-center mt-4">
        <!-- Team 3 -->
        <div class="col-lg-6 col-12">
          <div class="card card-profile mt-4 z-index-2">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-12 mt-n5">
                <div class="p-3 pe-md-0">
                  <div class="ratio ratio-1x1">
                    <img
                      class="w-100 border-radius-md shadow-lg img-cover"
                      :src="$config.vImage"
                      alt="Profile Image"
                      v-lazy-load
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-6 col-12 my-auto">
                <div class="card-body ps-lg-0">
                  <h5 class="mb-0">Varun Sharma</h5>
                  <h6 class="text-info">Testing, Analysis</h6>
                  <p class="mb-0">
                    Testing and Application Analysis. Incharge of Breaking the
                    Application, So Bugs could be found and Fixed. Also perform
                    Analysis of the Application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Team 3 -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Team',
}
</script>

<style scoped>
.img-cover {
  object-fit: cover;
  object-position: center;
}
</style>
