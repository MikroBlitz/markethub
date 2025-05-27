<template>
    <div class="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-200">
                Find your items at your fingertips
            </h1>
            <p class="text-gray-800 dark:text-gray-300 mt-2">
                Explore items around the world
            </p>
        </div>

        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
            <UCard
                v-for="listing in listings"
                :key="listing.id"
                class="hover:shadow-lg transition-shadow cursor-pointer"
                @click="goToListing(listing.id)"
            >
                <img
                    :src="listing.image"
                    alt="Listing"
                    class="w-full h-48 object-cover rounded-xl"
                />
                <template #footer>
                    <div class="space-y-1">
                        <div class="flex justify-between">
                            <p>{{ listing.id }}</p>
                            <p
                                class="font-semibold text-gray-800 dark:text-gray-100"
                            >
                                {{ listing.title }}
                            </p>
                            <p class="text-sm text-gray-500">
                                ${{ listing.price }}/pc
                            </p>
                        </div>
                        <p class="text-sm text-gray-500">
                            {{ listing.location }}
                        </p>
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const listings = ref([]);
const router = useRouter();

function goToListing(id) {
    router.push(`/products/${id}`);
}

onMounted(async () => {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        listings.value = data.map((product) => ({
            id: product.id,
            image: product.images[0] || "/images/default.jpg",
            location: product.category?.name || "Unknown Location",
            price: product.price,
            title: product.title,
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});

definePageMeta({ layout: "app-layout", permission: "view product" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Products",
});
</script>
