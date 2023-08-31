export function userStore(userdata){
    return userdata ? defineStore('userdata', { state: () => userdata })() : false;
}