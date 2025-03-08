<template>
    <Body class="antialiased">
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
    </Body>
</template>
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isMobile = ref(false);

provide("isMobile", isMobile);

onMounted(() => {
    const mediaQuery = useMediaQuery("(max-width: 768px)");
    isMobile.value = mediaQuery.value;

    watch(mediaQuery, (newValue) => {
        isMobile.value = newValue;
    });
});
</script>
