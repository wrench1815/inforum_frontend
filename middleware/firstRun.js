export default function ({ $axios, store, redirect }) {
  $axios.$get('FirstRun').then((response) => {
    if (!response.isOpen) {
      return redirect('/')
    }
  })
}
