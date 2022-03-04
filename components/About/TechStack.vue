<template>
  <div class="container">
    <div class="row align-items-center">
      <!-- Info Card -->
      <div class="col-lg-4 me-auto mt-lg-0 mt-4">
        <div class="card mt-4 bg-gradient-light shadow-blur">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <a class="d-block blur-shadow-image ratio ratio-16x9">
              <img
                src="~/assets/images/technology.jpg"
                alt="Technology"
                class="img-fluid border-radius-lg img-cover-top"
              />
            </a>
            <div
              class="colored-shadow"
              lazy-background="~/assets/images/technology.jpg"
            ></div>
          </div>
          <div class="card-body text-center">
            <h5 class="font-weight-norma text-primary">Tech Stack</h5>
            <p class="mb-0 text-dark">
              Various Technologies that were used in Building Inforum. Without
              these, It would not be possible to Build this Application.
            </p>
          </div>
        </div>
      </div>
      <!-- Start:Stack -->
      <div class="col-lg-6">
        <div class="row justify-content-start">
          <!-- Start:Nuxt JS -->
          <div class="col-md-6">
            <div class="info">
              <img
                class="img-fluid"
                src="~/assets/svg/nuxt-colored.svg"
                width="90rem"
                alt="Nuxt"
              />
              <h5 class="nuxt-text-primary">
                <a
                  class="nuxt-text-primary"
                  href="https://nuxtjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Nuxt JS</a
                >
              </h5>
              <p class="text-dark">
                A Javascript library, based on Vue.js, that allows to build
                reactive web applications.
              </p>
            </div>
          </div>
          <!-- End:Nuxt JS -->

          <!-- Start:ASP -->
          <div class="col-md-6">
            <div class="info">
              <img
                class="img-fluid py-4"
                src="~/assets/svg/dotnet-logo-text-logo-Purple.svg"
                width="135rem"
                alt="ASP"
              />
              <h5 class="asp-text-primary mt-n2">
                <a
                  class="asp-text-primary"
                  href="https://dotnet.microsoft.com/en-us/apps/aspnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  >ASP .NET</a
                >
              </h5>
              <p class="text-dark">
                ASP.NET is a web development framework, for .Net framework,
                developed by Microsoft.
              </p>
            </div>
          </div>
          <!-- End:ASP -->
        </div>
        <div class="row justify-content-start mt-4">
          <!-- Start:Bootstrap -->
          <div class="col-md-6">
            <div class="info">
              <img
                class="img-fluid py-2"
                width="90rem"
                src="~/assets/svg/bootstrap-logo.svg"
                alt="Bootstrap"
              />
              <h5 class="bootstrap-text-primary">
                <a
                  class="bootstrap-text-primary"
                  href="https://getbootstrap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Bootstrap 5</a
                >
              </h5>
              <p class="text-dark">
                A Mobile First Responsive Front-End Framework, to quickly build
                Responsive Applications.
              </p>
            </div>
          </div>
          <!-- End:Bootstrap -->

          <!-- Start:Cloudinary -->
          <div class="col-md-6">
            <div class="info">
              <img
                class="img-fluid py-2"
                src="~/assets/svg/cloudinary_cloud_glyph_regular.svg"
                width="109rem"
                alt="Cloudinary"
              />
              <h5 class="cloudinary-text-primary">
                <a
                  class="cloudinary-text-primary"
                  href="https://cloudinary.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Cloudinary</a
                >
              </h5>
              <p class="text-dark">
                A Blazing Fast Media CDN with powerfull Meida Manipulation and
                Transformations.
              </p>
            </div>
          </div>
          <!-- End:Cloudinary -->
        </div>
        <div class="row justify-content-center mt-4">
          <!-- Start:SQL Server -->
          <div class="col-md-6">
            <div class="info">
              <img
                class="img-fluid py-2"
                width="90rem"
                src="~/assets/svg/microsoft-sql-server-logo.svg"
                alt="SQL Server"
              />
              <h5 class="sql-server-text-primary">
                <a
                  class="sql-server-text-primary"
                  href="https://www.microsoft.com/sql-server/sql-server-2019"
                  target="_blank"
                  rel="noopener noreferrer"
                  >SQL Server</a
                >
              </h5>
              <p class="text-dark">
                A Relational Database Management System (RDBMS) that is
                developed by Microsoft.
              </p>
            </div>
          </div>
          <!-- End:SQL Server -->
        </div>
      </div>
      <!-- Start:Stack -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechStack',
}
</script>

<style scoped>
.nuxt-text-primary {
  color: #00dc82;
}

.asp-text-primary {
  color: #512bd4;
}

.bootstrap-text-primary {
  color: #7511f7;
}

.cloudinary-text-primary {
  color: #3448c5;
}

.sql-server-text-primary {
  color: #d22b28;
}

.colored-shadow {
  transform: scale(0.94);
  top: 3.5%;
  filter: blur(12px);
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: -1;
}

.img-cover-top {
  object-fit: cover;
  object-position: center 20%;
}
</style>
