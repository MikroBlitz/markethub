<template>
    <div class="flex items-center justify-center bg-gray-50">
        <main class="flex-1 overflow-y-auto p-4 max-w-screen-xl">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
                <DashboardStatCard
                    title="Total Revenue"
                    value="$24,345"
                    :trend="12.5"
                    icon="i-heroicons-currency-dollar"
                />
                <DashboardStatCard
                    title="Orders"
                    value="1,274"
                    :trend="8.2"
                    icon="i-heroicons-shopping-cart"
                />
                <DashboardStatCard
                    title="Customers"
                    value="3,849"
                    :trend="-2.4"
                    icon="i-heroicons-users"
                />
                <DashboardStatCard
                    title="Conversion Rate"
                    value="3.2%"
                    :trend="5.7"
                    icon="i-heroicons-chart-bar"
                />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div class="lg:col-span-2">
                    <DashboardChartCard title="Sales Overview" />
                </div>
                <div>
                    <UCard>
                        <template #header>
                            <h3 class="text-base py-1 font-medium">
                                Traffic Sources
                            </h3>
                        </template>

                        <div class="h-64">
                            <!-- Placeholder for a pie chart -->
                            <div
                                class="h-full w-full flex items-center justify-center bg-gray-50 rounded-lg"
                            >
                                <p class="text-gray-400 text-sm">
                                    Traffic sources chart would be rendered here
                                </p>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>

            <DashboardProductsTable title="Top Products" />
        </main>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "app-layout",
});
</script>
