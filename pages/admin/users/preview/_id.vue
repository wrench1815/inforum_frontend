<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <!-- Start:loading -->
      <div class="text-center" v-if="loading">
        <h2>Loading...</h2>
      </div>
      <!-- End:loading -->

      <!-- Start:loaded -->
      <div class="card p-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h1 class="mb-3">User</h1>
          </div>
          <div class="col-12 mb-3">
            <h4 class="">
              <span class="me-1">By</span>
              <span class="text-primary mx-1">{{
                user.firstName + ' ' + user.lastName
              }}</span
              >(<span class="text-info mx-1">{{ user.email }}</span
              >(<span class="text-info mx-1">{{ getGender(user.gender) }}</span
              >(<span class="text-info mx-1"> Role: {{ role }}</span
              >) <span class="mx-1">on</span
              ><span class="mx-1 text-primary">{{
                formattedDate(user.dateJoined)
              }}</span>
            </h4>
          </div>
        </div>
      </div>
      <!-- End:loaded -->
    </div>
    <!-- End:content -->
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      loading: true,
      user: {},
      role: '',
    }
  },

  methods: {
    // formats the date
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    getGender(n) {
      let gender = ''
      switch (n) {
        case 0:
          gender = 'Male'
          break

        case 1:
          gender = 'Female'
          break
        case 2:
          gender = 'Unspecified'
          break
        default:
          gender = 'Default'
          break
      }
      return gender
    },
  },

  mounted() {
    this.$axios
      .$get(`/User/single/${this.$route.params.id}`)
      .then((res) => {
        this.user = res.user
        this.role = res.userRole[0]
        this.loading = false
      })
      .catch((error) => {
        let msg

        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to load User<br/>Refresh Page to try Again.'
        }

        this.$swal({
          title: 'Error',
          icon: 'error',
          html: `${msg}`,
        })
      })
  },
}
</script>

<style></style>
