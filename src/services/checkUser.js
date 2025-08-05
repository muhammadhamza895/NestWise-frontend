export const checkIsAdmin=()=>{
    const isAdmin = localStorage.getItem('isAdmin')
    return isAdmin == 'true'
}