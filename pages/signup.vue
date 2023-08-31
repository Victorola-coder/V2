<template>
    <Title>Sign Up • V2</Title>
    <div>
        <form class="form" @submit.prevent="submit">
            <div class="flex items-center mb-2">
                <h1 class="w-1/2">Create Account</h1>
                <h1 v-if="error.server" class=" w-1/2 text-right text-red-400">Sorry, an error occoured</h1>
            </div>
            <p class="opacity-60">Already have an account? <NuxtLink to="/login" class="text-blue-500 font-semibold">Login</NuxtLink></p>
            <div class="grid grid-cols-2 gap-4">
                <div class="input">
                    <div>
                        <span>First Name</span>
                    </div>
                    <input type="text" required v-model="form.firstName" placeholder="e.g. Alex">
                </div>
                <div class="input">
                    <div>
                        <span>Surname</span>
                    </div>
                    <input type="text" required v-model="form.lastName" placeholder="e.g. Smith">
                </div>
            </div>
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
                    <i class="error" v-if="error.password">At least six characters long</i>
                </div>
                <input type="password" required v-model="form.password" placeholder="At least six characters long">
            </div>
            <div class="input">
                <div>
                    <span>Confirm Password</span>
                    <i class="error" v-if="error.confirmpassword">Password's don't match</i>
                </div>
                <input type="password" required v-model="form.confirm" placeholder="Confirm Password">
            </div>
            <button class="bg-blue-500 py-2 rounded-md font-semibold mt-2">{{state}}</button>
        </form>
    </div>
</template>

<script setup>
definePageMeta(({
    layout: 'account'
}))
const state = ref('Create Account');
const error = reactive({
    email: false,
    password: false,
    confirmpassword: false,
    server: false
})
const form = reactive({
    email: '',
    password: '',
    confirm: '',
    lastName: '',
    firstName: ''
})
function submit(){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    for(const key in error) error[key] = false;
    if(!regex.test(form.email))return error.email = "Invalid Email";
    if(form.password.length < 6) return error.password = true;
    if(form.confirm != form.password) return error.confirmpassword = true;
    state.value = "Loading...";
    $fetch('/api/auth/c', { method: 'POST', body: { email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName  }})
        .then(resp => {
            if(resp.success) {
                state.value = "Welcome";
                return location.href = "/";
            } else {
                Object.assign(error, resp.error);
                state.value = "Create Account";
            }
        })
        .catch(err => {
            console.error(err);
            error.server = true;
            state.value = "Create Account";
        })
}
</script>