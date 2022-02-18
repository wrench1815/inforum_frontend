<template>
  <div>
    <nav class="bg-white bg-white z-index-3 border-radius-xl shadow-card">
      <div
        class="d-flex align-items-center justify-content-between align-content-center px-3"
      >
        <NuxtLink class="navbar-brand fs-4 link-dark" to="/">
          <img src="@/assets/icon.jpg" width="25rem" alt="logo" class="mb-1" />
          <span>Inforum</span>
        </NuxtLink>
        <!-- <div><i class="fas fa-search fs-5"></i></div> -->
        <div>
          <!-- <i class="fas fa-user-astronaut fs-5"></i> -->
          <div class="dropdown">
            <div
              class="dropdown-toggle"
              type="button"
              id="AdminProfileDrop"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                v-if="!isAuthenticated"
                class="avatar avatar-sm img-fit"
                :src="profileImage"
                alt=""
              />
              <img
                v-if="isAuthenticated"
                class="avatar avatar-sm img-fit"
                :src="loggedInUser.profileImage"
                alt=""
              />
            </div>
            <ul
              v-if="isAuthenticated"
              class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
              aria-labelledby="AdminProfileDrop"
            >
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/profile"
                  >Profile</NuxtLink
                >
              </li>
              <li v-if="loggedInUserRole != 'User'">
                <NuxtLink class="dropdown-item text-dark" to="/dash"
                  >Dash</NuxtLink
                >
              </li>
              <li v-if="loggedInUserRole == 'Admin'">
                <NuxtLink class="dropdown-item text-dark" to="/admin"
                  >Admin</NuxtLink
                >
              </li>
              <li>
                <div class="dropdown-divider border-dark opacity-4"></div>
              </li>
              <li>
                <div class="dropdown-item text-dark">
                  <NuxtLink class="btn btn-sm btn-danger m-0" to="/logout"
                    >Logout<i class="ms-2 fas fa-sign-out-alt text-xs"></i
                  ></NuxtLink>
                </div>
              </li>
            </ul>
            <ul
              v-if="!isAuthenticated"
              class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
              aria-labelledby="AdminProfileDrop"
            >
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/login"
                  >Login<i class="ms-2 fas fa-sign-in-alt"></i
                ></NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/signup"
                  >Sign Up<i class="ms-2 fas fa-user-plus"></i
                ></NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopNav',

  data() {
    return {
      profileImage: require('@/assets/images/img-1.jpg'),
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },
}
</script>

<style scoped>
.img-fit {
  object-position: center;
  object-fit: cover;
}
</style>
