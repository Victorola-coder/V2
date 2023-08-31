<template>
    <div class="input">
        <div>
            <span>{{ txt }}</span>
        </div>
        <div class="buttons">
            <button type="button" class="opt" v-for="opt in opts" :key="opt.txt" @click="opt.opt = !opt.opt" :class="opt.opt ? 'select' : ''">{{ opt.txt }}</button>
        </div>
    </div>
</template>

<script setup>
    const {opts, txt} = defineProps(['opts', 'txt']);
</script>

<style>
@tailwind components;
@layer components {
    .opt {
        @apply py-1 px-3 font-semibold mb-3 mr-2 rounded-md bg-dark-el;
    }
    .opt.select {
        @apply bg-blue-500;
    }
}
</style>