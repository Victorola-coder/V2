<template>
    <div class="w-full flex items-center justify-center h-screen">
        <slot></slot>
    </div>
</template>

<style>
div.h-screen>div {
    @apply lg:w-1/2 sm:w-10/12;
}
</style>