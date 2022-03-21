<template>
  <div class="d-none"></div>
</template>

<script>
import { Network } from '@capacitor/network'
import { StatusBar, Style } from '@capacitor/status-bar'

export default {
  name: 'NetworkStatus',

  mounted() {
    StatusBar.show()
    StatusBar.setStyle({ style: Style.Dark })
    StatusBar.setBackgroundColor({ color: '#e91e63' })

    Network.addListener('networkStatusChange', (status) => {
      status.connected
        ? StatusBar.setBackgroundColor({ color: '#e91e63' })
        : StatusBar.setBackgroundColor({ color: '#fb8c00' })
    })
  },
}
</script>

<style></style>
