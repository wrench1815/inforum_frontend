export default function ({ store, redirect }) {
  if (store.getters.loggedInUserRole != 'Admin') {
    return redirect('/')
  }
}
