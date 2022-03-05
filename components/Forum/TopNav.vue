<template>
  <div>
    <nav class="bg-white bg-white z-index-3 border-radius-xl shadow-card">
      <div
        class="d-flex align-items-center justify-content-between align-content-center px-3"
      >
        <NuxtLink class="navbar-brand fs-4 link-dark" to="/">
          <img
            src="@/assets/icon.jpg"
            width="25rem"
            alt="logo"
            class="mb-1"
            v-lazy-load
          />
          <span>Inforum</span>
        </NuxtLink>

        <!-- Start:Search Swal -->
        <div
          class="d-block d-sm-none ms-auto me-2 text-primary"
          v-if="$route.name != 'forum-search'"
          @click="openSearchSwal"
        >
          <i class="fas fa-search fs-5"></i>
        </div>
        <!-- End:Search Swal -->

        <!-- Start:Search Bar -->
        <div
          class="d-none d-sm-flex align-items-center gap-2"
          v-if="$route.name != 'forum-search'"
        >
          <form v-on:submit.prevent="onSearch">
            <div class="input-group input-group-outline">
              <span class="me-n4 my-auto text-primary text-test" id="searchIcon"
                ><i class="fas fa-search"></i
              ></span>
              <input
                type="text"
                class="form-control form-pad"
                placeholder="Search"
                v-model="searchQuery"
              />
            </div>
          </form>
        </div>
        <!-- End:Search Bar -->

        <!-- Start:DropDown Menu Items -->
        <div>
          <div class="dropdown">
            <div
              class="dropdown-toggle"
              type="button"
              id="AdminProfileDrop"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <!-- Start:Fallback Profile Image -->
              <img
                v-if="!isAuthenticated"
                class="avatar avatar-sm img-fit"
                :src="profileImage"
                alt="Avatar"
                v-lazy-load
              />
              <!-- End:Fallback Profile Image -->

              <!-- Start:User Profile Image -->
              <img
                v-if="isAuthenticated"
                class="avatar avatar-sm img-fit"
                :src="loggedInUser.profileImage"
                alt="Avatar"
                v-lazy-load
              />
              <!-- End:User Profile Image -->
            </div>

            <!-- Start:Authentiicated Menu -->
            <ul
              v-if="isAuthenticated"
              class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
              aria-labelledby="AdminProfileDrop"
            >
              <!-- Start:User Profile -->
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/profile"
                  >Profile</NuxtLink
                >
              </li>
              <!-- End:User Profile -->

              <!-- Start:Dash -->
              <li v-if="loggedInUserRole != 'User'">
                <NuxtLink class="dropdown-item text-dark" to="/dash"
                  >Dash</NuxtLink
                >
              </li>
              <!-- End:Dash -->

              <!-- Start:Admin -->
              <li v-if="loggedInUserRole == 'Admin'">
                <NuxtLink class="dropdown-item text-dark" to="/admin"
                  >Admin</NuxtLink
                >
              </li>
              <!-- End:Admin -->

              <li>
                <div class="dropdown-divider border-dark opacity-4"></div>
              </li>

              <!-- Start:Logout -->
              <li>
                <div class="dropdown-item text-dark">
                  <NuxtLink class="btn btn-sm btn-danger m-0" to="/logout"
                    >Logout<i class="ms-2 fas fa-sign-out-alt text-xs"></i
                  ></NuxtLink>
                </div>
              </li>
              <!-- End:Logout -->
            </ul>
            <!-- End:Authentiicated Menu -->

            <!-- Start:Un-Authentiicated Menu -->
            <ul
              v-if="!isAuthenticated"
              class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
              aria-labelledby="AdminProfileDrop"
            >
              <!-- Start:Login -->
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/login"
                  >Login<i class="ms-2 fas fa-sign-in-alt"></i
                ></NuxtLink>
              </li>
              <!-- End:Login -->

              <!-- Start:Logout -->
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/signup"
                  >Sign Up<i class="ms-2 fas fa-user-plus"></i
                ></NuxtLink>
              </li>
              <!-- End:Logout -->
            </ul>
            <!-- End:Un-Authentiicated Menu -->
          </div>
        </div>
        <!-- End:DropDown Menu Items -->
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopNav',

  watchQuery: ['query'],

  data() {
    return {
      profileImage:
        'https://res.cloudinary.com/inforum/image/upload/v1645625776/Defaults/profile_image_dummy_oawg87.png',
      searchQuery: '',
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    // Search Swal
    openSearchSwal() {
      const { value: searchQuery } = this.$swal({
        title: 'What you wanna Search?',
        input: 'text',
        icon: 'question',
        inputPlaceholder: 'Search',
        confirmButtonText: 'Search',
        showCloseButton: true,
        inputValidator: (value) => {
          if (value.length < 3) {
            return 'Cannot be smaller than 3 characters'
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({
            name: 'forum-search',
            params: {
              query: result.value,
            },
          })
        }
      })
    },

    // Search Bar
    onSearch() {
      if (this.searchQuery.length < 3) {
        this.$swal({
          title: 'Validation Error',
          icon: 'info',
          type: 'info',
          text: 'Cannot be smaller than 3 characters',
        })
      } else {
        this.$router.push({
          name: 'forum-search',
          params: {
            query: this.searchQuery,
          },
        })

        this.searchQuery = ''
      }
    },
  },
}
</script>

<style scoped>
.img-fit {
  object-position: center;
  object-fit: cover;
}

.input-group-outline input {
  border: 2px solid #d2d6da !important;
}

.input-group-outline input:focus {
  border: 2px solid #e91e63 !important;
}

.input-group.input-group-outline .form-control {
  padding: 0.4rem 0.75rem !important;
  padding-left: 1.7rem !important;
}
</style>
