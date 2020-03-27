export const getItemLS = (key) => {
    return JSON.parse(localStorage.getItem(key))
}
export const setItemLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    return true
}
export const removeItemLS = key => {
    localStorage.removeItem(key)
}
export const clearLS = () => {
    localStorage.clear()
}