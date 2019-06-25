
export function getItem () {
  window.localStorage.getItem()
}
export function setItem (userInfo) {
  return window.localStorage.setItem('user_info', JSON.stringify(userInfo))
}
export function removeItem () {
  window.localStorage.removeItem('')
}
