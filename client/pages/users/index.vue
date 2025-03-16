<template>
    <div class="w-screen flex flex-col gap-3 items-center mt-2 justify-center">
        <UCard>
            <div class="flex gap-3 items-center">
                <UButton variant="ghost" @click="router.back()"
                    ><Icon class="text-red-700" name="mdi-arrow-left" size="20"
                /></UButton>
                <div class="gap-2 flex items-center">
                    <Icon name="i-heroicons-user-group-solid" size="30" />
                    <h1 class="text-2xl font-bold">Users</h1>
                </div>
            </div>

            <DataTable
                class="max-w-[1400px]"
                :data="data"
                :loading="loading"
                @refetch="refetch"
            />
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { usersPaginate } from "~/graphql/User";

import DataTable from "./DataTable.vue";

const data = ref([]);
const router = useRouter();
const { loading, refetch, result } = useQuery(usersPaginate, {
    first: 10,
    page: 1,
});

const fetchData = async () => {
    try {
        loading.value = true;
        const res = await result.value;
        data.value = res.usersPaginate.data;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

definePageMeta({
    layout: "app-layout",
});
</script>
`
