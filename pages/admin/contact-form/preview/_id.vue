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
            <h1 class="mb-3">Contact</h1>
          </div>
          <div class="col-12 mb-3">
            <h4 class="">
              <span class="me-1">By</span>
              <span class="text-primary mx-1">{{ contact.fullName }}</span
              >(<span class="text-info mx-1">{{ contact.email }}</span
              >) <span class="mx-1">on</span
              ><span class="mx-1 text-primary">{{
                formattedDate(contact.createdOn)
              }}</span>
            </h4>
          </div>
          <div class="col-md-3">
            <h3 class="">Message</h3>
          </div>
          <div class="col-md-9">
            <section class="d-flex justify-content-center">
              {{ contact.message }}
            </section>
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
      })
  },
}
</script>

<style></style>
