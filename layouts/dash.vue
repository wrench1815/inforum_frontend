<template>
  <div>
    <LazyNavBar />
    <div class="mt-7 container grid grid-height">
      <div class="left">
        <DashSideMenu />
      </div>
      <div class="middle max-height-vh-100" id="middle">
        <Nuxt />
        <ToUpEle :eleId="'middle'" />
      </div>
    </div>
    <PrivacyPolicy />
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: 'bg-light',
      },
      link: [
        // Material Design css
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/material_kit/css/material-kit.min.css',
        },
      ],
      script: [
        // Material Design js
        {
          type: 'text/javascript',
          src: '/material_kit/js/material-kit.min.js',
        },
      ],
    }
  },
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 0.5rem;
}

.left {
  display: block;
  grid-column: 1/13;
  grid-row: 1/3;
  overflow-y: auto;
}

.middle {
  grid-column: 1/13;
  grid-row: 2/13;
  overflow-y: auto;
  margin-top: 2rem;
}

/* sm */
@media (min-width: 576px) {
}

/* md  */
@media (min-width: 768px) {
  .grid {
    gap: 0.5rem;
  }
  .left {
    grid-column: 1/2;
    grid-row: 1/13;
    overflow-y: auto;
  }
  .middle {
    grid-column: 2/13;
    grid-row: 1/13;
    margin-top: 0rem;
  }
}

/* lg  */
@media (min-width: 992px) {
  .left {
    display: block;
    grid-column: 1/2;
    grid-row: 1/13;
  }

  .middle {
    grid-column: 2/13;
  }
}

/* xl */
@media (min-width: 1200px) {
}

/* xxl */
@media (min-width: 1400px) {
}

.grid-height {
  max-height: 85vh !important;
  min-height: 85vh !important;
  height: 85vh !important;
}
</style>
