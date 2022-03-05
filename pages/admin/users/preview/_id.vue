<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <!-- Start:loading -->
      <Loading v-if="loading" />
      <!-- End:loading -->

      <!-- Start:loaded -->
      <div class="card-body px-3" v-if="!loading">
        <div class="row">
          <!-- profile navigation-->
          <div class="col-12 mb-3 card card-body">
            <div class="row justify-content-start align-items-center">
              <!-- Start:Profile Image -->
              <div class="col-auto">
                <div class="avatar-xl position-relative">
                  <img
                    :data-src="user.profileImage"
                    alt="img"
                    class="w-100 rounded-circle shadow-sm avatar-xl avatar-fit"
                    v-lazy-load
                  />
                </div>
              </div>
              <!-- End:Profile Image -->

              <div class="col-auto my-auto">
                <div class="h-100">
                  <!-- Start:User Name -->
                  <h5 class="mb-1 font-weight-bolder">
                    {{ user.firstName + ' ' + user.lastName }}
                  </h5>
                  <!-- End:User Name -->

                  <!-- Start:User Role -->
                  <p class="mb-0 font-weight-normal text-sm">
                    {{ role }}
                  </p>
                  <!-- End:User Role -->
                </div>
              </div>
            </div>
          </div>

          <!-- change basic info -->
          <div class="card mt-3">
            <div class="card-header">
              <h3>User Info</h3>
            </div>

            <div class="card-body pt-0">
              <div class="border-top mt-n3 mb-3"></div>
              <!-- Start:Full Name -->
              <div class="row">
                <div class="col-md-4 col-12 text-primary">Full Name</div>
                <div class="col-md-8 col-12 text-dark">
                  {{ user.firstName + ' ' + user.lastName }}
                </div>
              </div>
              <!-- End:Full Name -->

              <!-- Start:Gender -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Gender</div>
                <div class="col-md-8 col-12 text-dark">
                  {{ getGender(user.gender) }}
                </div>
              </div>
              <!-- End:Gender -->

              <!-- Start:DOB -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Birth Date</div>
                <div class="col-md-8 col-12 text-dark" v-if="user.dob">
                  {{ formattedDate(user.dob) }}
                </div>
                <div class="col-md-8 col-12 text-dark" v-else>-----</div>
              </div>
              <!-- End:DOB -->

              <!-- Start:Email -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Email</div>
                <div class="col-md-8 col-12 text-dark">{{ user.email }}</div>
              </div>
              <!-- End:Email -->

              <!-- Start:Address -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Address</div>
                <div class="col-md-8 col-12 text-dark" v-if="user.address">
                  {{ user.address }}
                </div>
                <div class="col-md-8 col-12 text-dark" v-else>-----</div>
              </div>
              <!-- End:Address -->

              <!-- Start:Role -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Role</div>
                <div class="col-md-8 col-12 text-dark">{{ role }}</div>
              </div>
              <!-- End:Role -->

              <!-- Start:Date Joined -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Date Joined</div>
                <div class="col-md-8 col-12 text-dark">
                  {{ formattedDate(user.dateJoined) }}
                </div>
              </div>
              <!-- End:Date Joined -->

              <div class="border-top"></div>
              <div class="row mt-3">
                <div class="col-12 d-flex justify-content-end">
                  <NuxtLink
                    class="btn btn-success"
                    :to="`/admin/users/edit/${user.id}`"
                  >
                    <i class="fas fa-edit"></i> Edit
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End:loaded -->
    </div>
    <!-- End:content -->
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'
export default {
  layout: 'admin',

  components: {
    Loading,
  },

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

    // convert string date to calander date
    stringToCalenderDate(d) {
      if (d) {
        const date = new Date(d)
        const year = String(date.getFullYear())
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }

      return null
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
        this.user.dob = this.stringToCalenderDate(res.user.dob)
        this.role = res.userRole[0]
      })
      .then(() => {
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

<style scoped>
.avatar-fit {
  object-position: center center;
  object-fit: cover;
}
</style>
