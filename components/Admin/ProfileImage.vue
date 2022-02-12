<template>
  <img
    :class="isAvatar ? defaultStyles : classNames"
    :src="profileImage"
    alt="Avatar"
  />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      profileImage: '',
      fallBackImage: require('@/assets/images/img-1.jpg'),
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

<style></style>
