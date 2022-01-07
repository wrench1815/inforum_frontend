<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Home</h2>
          </div>
          <div class="col-12" v-if="homeData.length == 0">
            <h1>No Home Available</h1>
          </div>
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">id</th>
                      <th class="text-uppercase text-start ps-2">Heading</th>
                      <th class="text-uppercase">Sub Heading</th>
                      <th class="text-uppercase">Header Image Link</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="home in homeData"
                      :key="home.id"
                      :pkey="home.id"
                    >
                      <td class="text-bold">
                        {{ home.id }}
                      </td>
                      <td
                        class="text-capitalize text-start link-info cursor-pointer custom-paragraph"
                      >
                        <NuxtLink
                          class="link-info text-bold"
                          :to="`/admin/home/preview/${home.id}`"
                          >{{ home.heading }}</NuxtLink
                        >
                      </td>
                      <td class="text-capitalize text-start custom-paragraph">
                        {{ home.subHeading }}
                      </td>
                      <td class="text-start custom-paragraph">
                        {{ home.headerImageLink }}
                      </td>
                      <td>
                        <div class="d-flex justify-content-evenly">
                          <NuxtLink :to="`/admin/home/edit/${home.id}`">
                            <i class="fas fa-edit text-warning"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer"
                            @click="deleteHome(home.id)"
                          >
                            <i class="fas fa-trash text-danger"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-end mx-4 mt-4">
            <NuxtLink class="btn btn-success" to="/admin/home/add"
              >Add Home</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, $config }) {
    const homeData = await $axios.$get('/home')
    return { homeData }
  },
  methods: {
    deleteHome(id) {
      const customAlert = this.$swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger me-1',
          cancelButton: 'btn btn-success ms-1',
        },
        buttonsStyling: false,
      })

      customAlert
        .fire({
          icon: 'question',
          title: 'Are you sure ?',
          text: `Do you really want to delete this item? This process cannot be undone.`,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$axios.$delete(`/Home/${id}`)

            this.$swal.fire({
              icon: 'success',
              title: 'Item Deleted',
              text: 'Item Deleted Successfully',
            })

            this.homeData = this.homeData.filter((item) => item.id != id)
          }
        })
    },
  },
}
</script>

<style scoped>
.custom-paragraph {
  max-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
