<template>
  <section>
    <!-- Component Usage: Extract pages:-> [...Array(this.pagination.totalPages).keys()].map(page => page + 1) -->
    <div class="container">
      <div class="row py-2">
        <div class="col-lg-4 mx-auto">
          <div class="d-flex justify-content-center">
            <ul class="pagination pagination-primary m-4 gap-1">
              <!-- first page -->
              <li
                :class="`page-item ${
                  !this.pagination.hasPrevious && 'disabled custom-cursor'
                }`"
                @click="firstPage"
              >
                <span class="page-link cursor-pointer" aria-label="Previous">
                  <span aria-hidden="true"
                    ><i class="fas fa-angle-double-left" aria-hidden="true"></i
                  ></span>
                </span>
              </li>

              <!-- previous Page -->
              <li
                :class="`page-item ${
                  !this.pagination.hasPrevious && 'disabled custom-cursor'
                }`"
                @click="previousPage"
              >
                <span class="page-link cursor-pointer" aria-label="Previous">
                  <span aria-hidden="true"
                    ><i class="fas fa-angle-left" aria-hidden="true"></i
                  ></span>
                </span>
              </li>

              <!-- page numbers -->
              <template
                v-for="page in transformPages(
                  this.pages,
                  pagination.currentPage
                )"
              >
                <li
                  :class="`page-item cursor-pointer ${
                    pagination.currentPage === page && 'active'
                  }`"
                  :key="page"
                  @click="selectedPage(page)"
                >
                  <span class="page-link bg-white">{{ page }}</span>
                </li>
              </template>

              <!-- next page -->
              <li
                :class="`page-item ${
                  !this.pagination.hasNext && 'disabled custom-cursor'
                }`"
                @click="nextPage"
              >
                <span class="page-link cursor-pointer" aria-label="Next">
                  <span aria-hidden="true"
                    ><i class="fas fa-angle-right" aria-hidden="true"></i
                  ></span>
                </span>
              </li>

              <!-- last page -->
              <li
                :class="`page-item ${
                  !this.pagination.hasNext && 'disabled custom-cursor'
                }`"
                @click="lastPage"
              >
                <span class="page-link cursor-pointer" aria-label="Next">
                  <span aria-hidden="true"
                    ><i class="fas fa-angle-double-right" aria-hidden="true"></i
                  ></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// for component usage: refer blog/index.vue
export default {
  name: 'Pagination',
  props: ['pagination', 'pageSize', 'pages'],
  methods: {
    firstPage() {
      this.$emit('getFirstPage')
    },
    lastPage() {
      this.$emit('getLastPage')
    },
    nextPage() {
      if (this.pagination.hasNext) {
        this.$emit('getNextPage')
      }
    },
    previousPage() {
      if (this.pagination.hasPrevious) {
        this.$emit('getPreviousPage')
      }
    },
    selectedPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.pagination.totalPages) {
        this.$emit('getSelectedPage', pageNumber)
      }
    },
    // this method sort pages list accordingly (3 or 5 items)
    transformPages(pages, currentPage) {
      const currentIndex = pages.indexOf(currentPage)

      // transforming for left items
      const leftIndex = currentIndex - 2 >= 0 ? currentIndex - 2 : 0

      // transforming for right items
      const rightIndex =
        currentIndex + 2 <= pages.length ? currentIndex + 2 : pages.length - 1

      // updating pages list
      pages = pages.slice(leftIndex, rightIndex + 1)

      //  transforming for 3 items
      if (pages.length < 5 && pages.length > 3) {
        const currentIndex = pages.indexOf(currentPage)
        return pages.slice(currentIndex - 1, currentIndex + 2)
      }

      return pages
    },
  },
}
</script>

<style scoped>
.custom-cursor {
  cursor: not-allowed !important;
}
</style>
