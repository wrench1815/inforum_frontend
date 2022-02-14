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
        <div class="card-header">
          <h2>Contact Info</h2>
        </div>
        <!-- testing -->
        <div class="row">
          <!-- change basic info -->
          <div class="mt-3">
            <div class="card-body pt-0">
              <div class="border-top mt-n3 mb-3"></div>
              <!-- Start:Full Name -->
              <div class="row">
                <div class="col-md-4 col-12 text-primary">Full Name</div>
                <div class="col-md-8 col-12 text-dark">
                  {{ contact.fullName }}
                </div>
              </div>
              <!-- End:Full Name -->

              <!-- Start: Message -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Message</div>
                <div class="col-md-8 col-12 text-dark">
                  {{ contact.message }}
                </div>
              </div>
              <!-- End: Message -->

              <!-- Start:Email -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Email</div>
                <div class="col-md-8 col-12 text-dark">{{ contact.email }}</div>
              </div>
              <!-- End:Email -->

              <!-- Start:Date Created -->
              <div class="row my-3">
                <div class="col-md-4 col-12 text-primary">Date Created</div>
                <div class="col-md-8 col-12 text-dark">
                  {{ formattedDate(contact.createdOn) }}
                </div>
              </div>
              <!-- End:Date created -->

              <div class="border-top"></div>

              <!-- Quick Action -->
              <div class="d-flex justify-content-end my-3">
                <NuxtLink
                  class="btn bg-gradient-success"
                  :to="`/admin/contact-form/edit/${contact.id}`"
                >
                  <i class="fas fa-edit"></i>
                  Edit
                </NuxtLink>
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
export default {
  layout: 'admin',

  data() {
    return {
      loading: true,
      contact: {},
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
  },

  mounted() {
    this.$axios
      .$get(`/ContactForms/${this.$route.params.id}`)
      .then((res) => {
        this.contact = res
        this.loading = false
      })
      .catch((error) => {
        let msg

        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to load Contact Form<br/>Refresh Page to try Again.'
        }

        this.$swal({
          title: 'Error',
          icon: 'error',
          html: `${msg}`,
        })

        this.$router.go(-1)
      })
  },
}
</script>

<style></style>
