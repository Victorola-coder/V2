<template>
    <Title>Login • V2</Title>
    <div>
        <form class="form" @submit.prevent="submit">
            <div class="flex items-center mb-2">
                <h1 class="w-1/2">Login Account</h1>
                <h1 v-if="error.server" class=" w-1/2 text-right text-red-400">Sorry, an error occoured</h1>
            </div>
            <p class="opacity-60">Don't have an account? <NuxtLink to="/signup" class="text-blue-500 font-semibold">Signup</NuxtLink></p>
            <div class="input">
                <div>
                    <span>Email</span>
                    <i class="error" v-if="error.email">{{ error.email }}</i>
                </div>
                <input type="email" required v-model="form.email" placeholder="e.g. youremail@example.com">
            </div>
            <div class="input">
                <div>
                    <span>Password</span>
                    <i class="error" v-if="error.password">Incorrect password</i>
                </div>
                <input type="password" required v-model="form.password" placeholder="At least six characters long">
            </div>
            <button class="bg-blue-500 py-2 rounded-md font-semibold mt-2">{{state}}</button>
        </form>
    </div>
</template>

<script setup>
definePageMeta(({
    layout: 'account'
}))
const state = ref('Login');
const error = reactive({
    email: false,
    password: false,
    server: false
})
const form = reactive({
    email: '',
    password: '',
})
function submit(){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    for(const key in error) error[key] = false;
    if(!regex.test(form.email))return error.email = "Invalid Email";
    state.value = "Loading...";
    $fetch('/api/auth/v', { method: 'POST', body: { email: form.email, password: form.password  }})
        .then(resp => {
            if(resp.success) {
                state.value = "Welcome";
                return location.href = "/";
            } else {
                Object.assign(error, resp.error);
                state.value = "Login";
            }
        })
        .catch(err => {
            console.error(err);
            error.server = true;
            state.value = "Login";
        })
}
</script>