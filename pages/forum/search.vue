<template>
  <div>
    <!-- Start:Loading -->
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <!-- End:Loading -->

    <!-- Start:Not Loading -->
    <div v-if="!loading">
      <!-- Start:Search Bar -->
      <div class="position-sticky top-0 z-index-sticky">
        <form v-on:submit.prevent="onSearch">
          <div
            class="card card-body mb-3 flex-row gap-2 align-items-center justify-content-center"
          >
            <div class="input-group input-group-outline">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                v-model="searchQuery"
              />
            </div>
            <button type="submit" class="btn btn-success mb-0 btn-round">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <!-- End:Search Bar -->

      <!-- Start:If Searched -->
      <section v-if="!showNothing">
        <!-- Search Title -->
        <h3 class="card card-body">Search Results</h3>

        <div>
          <!-- Start:If Empty Result -->
          <div
            class="card card-body mt-3"
            v-if="searchResults.pagination.totalCount == 0"
          >
            <NotFound :message="'Search returned Empty.'" />
          </div>
          <!-- End:If Empty Result -->

          <!-- Start:If Not Empty -->
          <template v-else>
            <!-- Start:Query -->
            <ForumQuestionCard
              v-for="query in searchResults.forumQuery"
              :key="query.id"
              :query="query"
            />
            <!-- End:Query -->

            <!-- Start:Load More -->
            <div class="text-center">
              <div
                class="link-primary my-3 d-inline-block cursor-pointer"
                v-if="searchResults.pagination.hasNext"
                @click="loadMoreQueries"
              >
                Load more.... <i class="fas fa-"></i>
              </div>
            </div>
            <!-- End:Load More -->
          </template>
          <!-- End:If Not Empty -->
        </div>
      </section>
      <!-- End:If Searched -->

      <section v-if="showNothing">
        <div class="card card-body mt-3 align-items-center">
          <img
            class="img-fluid w-60"
            src="~assets/svg/Questions.svg"
            alt="Nothing to Search"
            v-lazy-load
          />
          <h4>Nothing to Search</h4>
        </div>
      </section>
    </div>
    <!-- End:Not Loading -->
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'forum',

  components: {
    Loading,
  },

  data() {
    return {
      loading: true,
      searchQuery: this.$router.currentRoute.params.query || '',
      searchResults: {},
      showNothing: false,
      pageNumber: 1,
    }
  },

  methods: {
    // Search Query
    onSearch() {
      if (this.searchQuery.length < 3) {
        this.$swal({
          title: 'Validation Error',
          icon: 'info',
          type: 'info',
          text: 'Cannot be smaller than 3 characters',
        })
      } else {
        this.$axios
          .$get(`ForumQuery?search=${this.searchQuery}`)
          .then((res) => {
            this.searchResults = res
          })
          .then(() => {
            this.loading = false
            this.showNothing = false
          })
          .catch((err) => {
            this.$swal({
              title: 'Error',
              html: 'Something went wrong<br>Please try again',
              icon: 'error',
              button: 'Ok',
            })
          })
      }
    },

    // fetch Queries on passing param
    fetchSearchResults() {
      if (this.searchQuery.length != 0) {
        this.$axios
          .$get(`ForumQuery?search=${this.searchQuery}`)
          .then((res) => {
            this.searchResults = res
          })
          .then(() => {
            this.loading = false
            this.showNothing = false
          })
          .catch((err) => {
            this.$swal({
              title: 'Error',
              html: 'Something went wrong<br>Please try again',
              icon: 'error',
              button: 'Ok',
            })
          })
      } else {
        Promise.resolve()
          .then(() => {
            this.showNothing = true
          })
          .then(() => {
            this.loading = false
          })
      }
    },

    // Load More Queries
    loadMoreQueries() {
      this.pageNumber = this.pageNumber + 1

      this.$axios
        .$get(
          `ForumQuery?pageNumber=${this.pageNumber}&search=${this.searchQuery}`
        )
        .then((res) => {
          this.searchResults.forumQuery = this.searchResults.forumQuery.concat(
            res.forumQuery
          )
          this.searchResults.pagination = res.pagination
        })
        .catch((err) => {
          this.$swal({
            title: 'Error',
            icon: 'error',
            type: 'error',
            html: `'Unable to fetch Queries.<br/>Please Try Again Later.'`,
          })
        })
    },
  },

  mounted() {
    this.fetchSearchResults()
  },
}
</script>

<style scoped>
.btn-round {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1rem !important;
  border-radius: 50rem !important;
  height: 48px !important;
  width: 48px !important;
  transition: all 0.2s ease-in-out !important;
}

.btn-round:focus {
  outline: none !important;
  box-shadow: none !important;
}

.input-group-outline input {
  border: 2px solid #d2d6da !important;
}

.input-group-outline input:focus {
  border: 2px solid #e91e63 !important;
}
</style>
