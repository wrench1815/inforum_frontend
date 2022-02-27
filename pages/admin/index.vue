<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h1>Welcome to Inform Admin</h1>
            <p>Use this Section to manage various Aspects of the Site.</p>
          </div>
        </div>
        <div class="col-12 mt-3">
          <div class="card">
            <div class="card-header border-bottom pb-0 pt-3">
              <h3>First Run Status</h3>
            </div>
            <div class="card-body pt-2">
              <ul class="list-unstyled">
                <!-- First Run -->
                <li class="text-bold">
                  First Run:
                  <i
                    class="fas fa-check text-success"
                    v-if="firstRunStatus.firstRun"
                  ></i>
                  <i
                    class="fas fa-times text-danger"
                    v-if="!firstRunStatus.firstRun"
                  ></i>
                </li>
                <!-- First Run -->

                <!-- Roles -->
                <li class="text-bold">
                  Roles Initialized:
                  <i
                    class="fas fa-check text-success"
                    v-if="firstRunStatus.rolesInitialized"
                  ></i>
                  <i
                    class="fas fa-times text-danger"
                    v-if="!firstRunStatus.rolesInitialized"
                  ></i>
                </li>
                <!-- Roles -->

                <!-- Default User -->
                <li class="text-bold">
                  Default User:
                  <i
                    class="fas fa-check text-success"
                    v-if="firstRunStatus.defaultUser"
                  ></i>
                  <i
                    class="fas fa-times text-danger"
                    v-if="!firstRunStatus.defaultUser"
                  ></i>
                </li>
                <!-- Default User -->

                <!-- Default Category -->
                <li class="text-bold">
                  Default Category:
                  <i
                    class="fas fa-check text-success"
                    v-if="firstRunStatus.defaultCategory"
                  ></i>
                  <i
                    class="fas fa-times text-danger"
                    v-if="!firstRunStatus.defaultCategory"
                  ></i>
                </li>
                <!-- Default Category -->
              </ul>

              <!-- Start:First Run Fallback -->
              <div
                v-if="
                  !firstRunStatus.defaultUser ||
                  !firstRunStatus.rolesInitialized ||
                  !firstRunStatus.defaultCategory
                "
              >
                <h5>Click on Below buttons one by one in Sequence</h5>
                <p class="text-bold">
                  Initialize Roles<span class="text-warning mx-1">></span>Add
                  Default User<span class="text-danger mx-1">></span>Set Default
                  Category
                </p>
                <button
                  class="btn btn-primary"
                  v-if="!firstRunStatus.rolesInitialized"
                  @click="initRoles"
                >
                  Initialize Roles
                </button>
                <button
                  class="btn btn-primary"
                  v-if="!firstRunStatus.defaultUser"
                  @click="initDefaultUser"
                >
                  Add Default User
                </button>
                <button
                  class="btn btn-primary"
                  v-if="!firstRunStatus.defaultCategory"
                  @click="initDefaultCat"
                >
                  Set Default Category
                </button>
              </div>
              <!-- End:First Run Fallback -->
            </div>
          </div>
        </div>

        <!-- Start:10 Popular Queries -->
        <div class="col-12 mt-3">
          <div class="card">
            <div class="card-header border-bottom pb-0 pt-3">
              <h3>Top 10 Forum Queries</h3>
            </div>
            <div class="table-responsive border rounded-3">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr class="text-primary text-center text-md">
                    <th class="text-uppercase">S.No</th>
                    <th class="text-uppercase text-start ps-2">Query Title</th>
                    <th class="text-uppercase">Votes</th>
                    <th class="text-uppercase">Date Posted</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="align-middle text-center text-dark"
                    v-if="queries.length == 0"
                  >
                    <td class="text-bold text-lg" colspan="4">
                      No Posts Found
                    </td>
                  </tr>

                  <tr
                    class="align-middle text-center text-dark"
                    v-else
                    v-for="(query, index) in queries"
                    :key="query.id"
                  >
                    <td class="text-bold">
                      {{ index + 1 }}
                    </td>
                    <td
                      class="text-capitalize text-start link-info cursor-pointer custom-paragraph"
                    >
                      <NuxtLink
                        class="link-info text-bold"
                        :to="`/admin/forum/preview/${query.id}`"
                        >{{ query.title }}</NuxtLink
                      >
                    </td>

                    <td class="text-center text-bold">
                      {{ query.vote }}
                    </td>

                    <td class="text-center">
                      {{ formattedDate(query.datePosted) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- End:10 Popular Queries -->

        <!-- Start:10 Popular Posts -->
        <div class="col-12 mt-3">
          <div class="card">
            <div class="card-header border-bottom pb-0 pt-3">
              <h3>Top 10 Blog Posts</h3>
            </div>
            <div class="table-responsive border rounded-3">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr class="text-primary text-center text-md">
                    <th class="text-uppercase">S.No</th>
                    <th class="text-uppercase text-start ps-2">Post Title</th>
                    <th class="text-uppercase">Stars</th>
                    <th class="text-uppercase">Date Posted</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="align-middle text-center text-dark"
                    v-if="posts.length == 0"
                  >
                    <td class="text-bold text-lg" colspan="4">
                      No Posts Found
                    </td>
                  </tr>

                  <tr
                    class="align-middle text-center text-dark"
                    v-else
                    v-for="(post, index) in posts"
                    :key="post.id"
                  >
                    <td class="text-bold">
                      {{ index + 1 }}
                    </td>
                    <td
                      class="text-capitalize text-start link-info cursor-pointer custom-paragraph"
                    >
                      <NuxtLink
                        class="link-info text-bold"
                        :to="`/admin/blogpost/preview/${post.id}`"
                        >{{ post.title }}</NuxtLink
                      >
                    </td>

                    <td class="text-center text-bold">
                      {{ post.star }}
                    </td>

                    <td class="text-center">
                      {{ formattedDate(post.datePosted) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- End:10 Popular Queries -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      firstRunStatus: {
        firstRun: true,
        defaultUser: true,
        rolesInitialized: false,
        defaultCategory: true,
      },
      queries: [],
      posts: [],
    }
  },

  methods: {
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    getFirstRunStatus() {
      this.$axios.$get('FirstRun').then((res) => {
        if (res.isOpen) {
          this.firstRunStatus.firstRun = false
        }
      })
    },

    defaultUserStatus() {
      this.$axios.$get('FirstRun/default_user').then((res) => {
        this.firstRunStatus.defaultUser = res.exist
      })
    },

    defaultCategoryStatus() {
      this.$axios.$get('FirstRun/default_category').then((res) => {
        this.firstRunStatus.defaultCategory = res.exist
      })
    },

    rolesInitializedStatus() {
      this.$axios.$get('FirstRun/roles').then((res) => {
        if (res.adminExist && res.userExist && res.editorExist) {
          this.firstRunStatus.rolesInitialized = true
        }
      })
    },

    initRoles() {
      this.$swal({
        title: 'Processing',
        icon: 'info',
        text: 'Please wait while the Roles are Initialized.',
        didOpen: () => {
          this.$swal.showLoading()

          this.$axios
            .$get('FirstRun/add/roles')
            .then((res) => {
              this.$swal.hideLoading()
              this.$swal.close()

              this.$swal({
                title: 'Success',
                icon: 'success',
                text: 'Roles Initialized Successfully.',
              }).then(() => {
                this.rolesInitializedStatus()
              })
            })
            .catch((err) => {
              this.$swal.hideLoading()
              this.$swal.close()

              this.$swal({
                title: 'Error',
                icon: 'error',
                html: `Failed to Initialize Roles.<br/>Try Again.`,
              })
            })
        },
      })
    },

    initDefaultUser() {
      if (this.firstRunStatus.rolesInitialized) {
        this.$swal({
          title: 'Processing',
          icon: 'info',
          text: 'Please wait while Default User is Created.',
          didOpen: () => {
            this.$swal.showLoading()

            this.$axios
              .$get('FirstRun/add/default_user')
              .then((res) => {
                this.$swal.hideLoading()
                this.$swal.close()

                this.$swal({
                  title: 'Success',
                  icon: 'success',
                  text: 'Default User Created Successfully.',
                }).then(() => {
                  this.defaultUserStatus()
                })
              })
              .catch((err) => {
                this.$swal.hideLoading()
                this.$swal.close()

                this.$swal({
                  title: 'Error',
                  icon: 'error',
                  html: `Failed to Create Default User.<br/>Try Again.`,
                })
              })
          },
        })
      } else {
        this.$swal({
          title: 'Error',
          icon: 'error',
          html: `Roles are not Initialized.<br/>Initialize Roles First.`,
        })
      }
    },

    initDefaultCat() {
      this.$swal({
        title: 'Processing',
        icon: 'info',
        text: 'Please wait while Default Category is Created.',
        didOpen: () => {
          this.$swal.showLoading()

          const catData = {
            name: 'General',
          }

          this.$axios
            .$post('/Categories', catData)
            .then((res) => {
              this.$swal.hideLoading()
              this.$swal.close()

              this.$swal({
                title: 'Success',
                icon: 'success',
                text: 'Default Category Created Successfully.',
              }).then(() => {
                this.defaultCategoryStatus()
              })
            })
            .catch((err) => {
              this.$swal.hideLoading()
              this.$swal.close()

              this.$swal({
                title: 'Error',
                icon: 'error',
                html: `Failed to Create Default Category.<br/>Try Again.`,
              })
            })
        },
      })
    },
  },

  mounted() {
    this.getFirstRunStatus()
    this.defaultUserStatus()
    this.defaultCategoryStatus()
    this.rolesInitializedStatus()

    this.$axios
      .$get(`ForumQuery?PageSize=10&voteSort=true`)
      .then((q) => {
        this.queries = q.forumQuery
      })
      .then(() => {
        this.$axios.$get(`BlogPosts?PageSize=5&starSort=true`).then((b) => {
          this.posts = b.posts
        })
      })
  },
}
</script>

<style></style>
