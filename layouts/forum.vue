<template>
  <div class="container vh-100">
    <div class="grid h-100">
      <!-- nav -->
      <div class="nav-custom">
        <ForumTopNav />
      </div>

      <!-- left -->
      <div class="left bg-white shadow-lg rounded-3">
        <ForumLeftSideBar />
      </div>

      <!-- middle -->
      <div class="middle bg-white shadow-lg rounded-3">
        <nuxt />
      </div>

      <!-- right -->
      <div class="right bg-white shadow-lg rounded-3">
        <ForumRightSideBar />
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
/* here i have chosen 12 cols and 12 rows as you can see in repeat() function . You can choose any number of your choice and customize it with full freedom. You can specify each block length uniquely also . 1fr means it will take available space */

/* concept of grid lines: if no of cols is 3 then no of grid lines will be 4 because imagine: |  |   |   |  4 lines will be required to create 3 cols right. This is same for the rows. Just a one extra */

/* grid rows and grid cols property works this way: this is like index in 2d matrix ... from how this line to that line. or you can choose span it will take available space automatically. But i like to be as explicit as possible */

/* if can't understand anything ..ask anytime. or refer docs to get more out of grid. I know only 2 % of css-grid. */

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;
}

.nav-custom {
  grid-column: 1/13;
  grid-row: 1/2;
}

.left {
  display: none;
  overflow-y: scroll;
}

.middle {
  grid-column: 1/13;
  grid-row: 2/13;
  overflow-y: scroll;
}

.right {
  display: none;
  overflow-y: scroll;
}

/* sm */
@media (min-width: 576px) {
}

/* md  */
@media (min-width: 768px) {
}

/* lg  */
@media (min-width: 992px) {
  .left {
    display: block;
    grid-column: 1/3;
    grid-row: 2/13;
  }

  .middle {
    grid-column: 3/11;
  }

  .right {
    display: block;
    grid-column: 11/13;
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
