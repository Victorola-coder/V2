<template>
    <nav class="flex items-center justify-end gap-2 z-10 px-8 py-3 bg-dark-el fixed top-0 left-0 right-0">
        <div class="w-1/2">
            <h1 class="font-bold text-2xl">30 Days V2</h1>
        </div>
        <div class="w-1/2 flex items-center justify-end gap-3">
            <NuxtLink to="/lib">Library</NuxtLink>
            <NuxtLink to="/">Home</NuxtLink>
        </div>
    </nav>
    <div class="mt-20 px-8 mb-4">
        <slot></slot>
    </div>
</template>


<style>
a.router-link-exact-active {
    @apply  border-b-slate-300;
}
nav a {
    @apply  border-b-2 border-solid border-b-dark-el;
}
</style>