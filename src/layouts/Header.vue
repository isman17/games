<script>
    import { RouterLink } from 'vue-router'

    export default {
        components: {
            RouterLink,
        },
    }
</script>

<template>
    <header class="fixed w-full h-16 flex items-center bg-black shadow-xl z-50">
        <div class="container mx-auto px-4 md:px-8">
            <nav>
                <RouterLink to="/">Home</RouterLink>
            </nav>
        </div>
  </header>
</template>