<template>
  <img
    :class="isAvatar ? defaultStyles : classNames"
    :src="profileImage"
    alt="Avatar"
    v-lazy-load
  />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      profileImage: '',
      fallBackImage:
        'https://res.cloudinary.com/inforum/image/upload/v1645625776/Defaults/profile_image_dummy_oawg87.png',
      defaultStyles: 'avatar avatar-sm  p-0 m-0 img-fit shadow',
    }
  },
  props: ['userId', 'isAvatar', 'classNames'],
  mounted() {
    this.$axios
      .$get(`User/single/${this.userId}`)
      .then((res) => {
        this.profileImage = res.user.profileImage
      })
      .catch((err) => {
        this.profileImage = this.fallBackImage
      })
  },
}
</script>

<style scoped>
.img-fit {
  object-position: center;
  object-fit: cover;
}
</style>
