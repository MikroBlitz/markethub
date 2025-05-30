<template>
    <Table />
</template>

<script setup lang="ts">
import Table from "~/pages/roles/components/Table.vue";

definePageMeta({ layout: "app-layout", permission: "view role" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Roles",
});
</script>
