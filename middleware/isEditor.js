export default function ({ store, redirect }) {
  if (store.getters.loggedInUserRole == 'User') {
    return redirect('/')
  }
}
