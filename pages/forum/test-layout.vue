<template>
  <div class="p-2 vh-100">
    <div class="grid bg-primary h-100">
      <!-- nav -->
      <div class="nav-custom"></div>

      <!-- left -->
      <div class="left">
        <div class="content" v-for="content in contents" :key="content"></div>
      </div>

      <!-- middle -->
      <div class="middle">
        <div class="content" v-for="content in contents" :key="content"></div>
      </div>

      <!-- right -->
      <div class="right">
        <div class="content" v-for="content in contents" :key="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'test',
  data() {
    return {
      contents: [...Array(20).keys()],
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
  background: rgb(54, 53, 53);
}

.left {
  display: none;
  background: rgb(82, 24, 24);
  overflow-y: scroll;
}

.middle {
  grid-column: 1/13;
  grid-row: 2/13;
  background: rgb(65, 82, 24);
  overflow-y: scroll;
}

.right {
  display: none;
  background: rgb(24, 82, 63);
  overflow-y: scroll;
}

.content {
  height: 100px;
  background: white;
  margin-bottom: 10px;
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
