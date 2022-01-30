# STORE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

# How to Use Store

- First import mapGetters `import { mapGetters } from 'vuex'`
- Then load needed state in computed

  ```js
  computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
    },
  ```

- Now use the State where needed
