<template>
  <div class="container vh-100">
    <div class="grid h-100">
      <!-- nav -->
      <div class="nav-custom">
        <ForumTopNav />
      </div>

      <!-- left -->
      <div class="left">
        <ForumLeftSideBar />
      </div>

      <!-- middle -->
      <div class="middle pe-1 position-relative" id="middle">
        <nuxt />
        <ToUpEle :eleId="'middle'" />
      </div>

      <!-- right -->
      <div class="right pe-1">
        <ForumRightSideBar class="bg-white shadow-lg rounded-3" />
      </div>
    </div>
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

.nav-custom {
  grid-column: 1/13;
  grid-row: 1/2;
}

.left {
  display: block;
  grid-column: 1/13;
  grid-row: 2/4;
  overflow-y: auto;
}

.middle {
  grid-column: 1/13;
  grid-row: 3/13;
  overflow-y: auto;
}

.right {
  display: none;
  overflow-y: auto;
}

/* sm */
@media (min-width: 576px) {
}

/* md  */
@media (min-width: 768px) {
  .grid {
    gap: 1rem;
  }
  .left {
    grid-column: 1/2;
    grid-row: 2/13;
    overflow-y: auto;
  }
  .middle {
    grid-column: 2/13;
    grid-row: 2/13;
  }
}

/* lg  */
@media (min-width: 992px) {
  .left {
    display: block;
    grid-column: 1/2;
    grid-row: 2/13;
  }

  .middle {
    grid-column: 2/10;
  }

  .right {
    display: block;
    grid-column: 10/13;
    grid-row: 2/13;
  }
}

/* xl */
@media (min-width: 1200px) {
}

/* xxl */
@media (min-width: 1400px) {
}
</style>
