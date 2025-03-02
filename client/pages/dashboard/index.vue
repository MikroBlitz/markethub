<script setup lang="ts">
const isMobile = inject("isMobile");

const user = {
    avatar: "/api/placeholder/100/100",
    name: "Ronald McDonald",
    role: "Drunken Master",
};
const stats = [
    {
        change: "+5.2%",
        color: "emerald",
        icon: "i-heroicons-banknotes",
        label: "Revenue",
        value: "$2,415",
    },
    {
        change: "+10.2%",
        color: "blue",
        icon: "i-heroicons-shopping-bag",
        label: "Sales",
        value: "12",
    },
    {
        change: "+24.5%",
        color: "amber",
        icon: "i-heroicons-eye",
        label: "Views",
        value: "1,240",
    },
    {
        change: "-1.3%",
        color: "red",
        icon: "i-heroicons-chat-bubble-left-right",
        label: "Messages",
        value: "8",
    },
];
const recentListings = ref([
    {
        id: 1,
        image: "/api/placeholder/150/100",
        price: 299,
        status: "active",
        title: "Vintage Camera",
        views: 52,
    },
    {
        id: 2,
        image: "/api/placeholder/150/100",
        price: 149,
        status: "active",
        title: "Mechanical Keyboard",
        views: 28,
    },
    {
        id: 3,
        image: "/api/placeholder/150/100",
        price: 89,
        status: "pending",
        title: "Leather Backpack",
        views: 15,
    },
]);
const recentActivity = ref([
    {
        color: "blue",
        description: "Alex messaged about the camera",
        icon: "i-heroicons-envelope",
        id: 1,
        time: "10m ago",
        title: "New message",
    },
    {
        color: "emerald",
        description: "Sarah offered $250 for keyboard",
        icon: "i-heroicons-currency-dollar",
        id: 2,
        time: "2h ago",
        title: "New offer",
    },
    {
        color: "amber",
        description: "Backpack viewed 5 times",
        icon: "i-heroicons-eye",
        id: 3,
        time: "1d ago",
        title: "New views",
    },
]);
const sidebarLinks = [
    { icon: "i-heroicons-home", label: "Overview", value: "overview" },
    { icon: "i-heroicons-squares-2x2", label: "Listings", value: "listings" },
    {
        icon: "i-heroicons-chat-bubble-left-right",
        label: "Messages",
        value: "messages",
    },
    { icon: "i-heroicons-shopping-cart", label: "Orders", value: "orders" },
    { icon: "i-heroicons-cog-6-tooth", label: "Settings", value: "settings" },
];
const selectedTab = ref("overview");
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
const handleLinkClick = (value) => {
    selectedTab.value = value;
    isSidebarOpen.value = false;
};
onMounted(() => {
    isSidebarOpen.value = window.innerWidth >= 768;
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <!-- Mobile Overlay -->
        <div
            v-if="isSidebarOpen"
            class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            @click="toggleSidebar"
        />

        <!-- Sidebar -->
        <aside
            class="fixed md:sticky top-0 h-screen z-50 w-64 transform transition-transform duration-300 md:translate-x-0"
            :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        >
            <UCard
                class="h-full flex flex-col overflow-hidden rounded-none border-r"
            >
                <div class="p-4 border-b flex items-center justify-between">
                    <span class="text-primary font-bold text-xl"
                        >MarketHub</span
                    >
                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-x-mark"
                        class="md:hidden"
                        @click="toggleSidebar"
                    />
                </div>
                <div class="p-4 border-b flex items-center space-x-3">
                    <UAvatar :src="user.avatar" size="sm" />
                    <div>
                        <p class="font-medium text-sm">{{ user.name }}</p>
                        <p class="text-xs text-gray-500">{{ user.role }}</p>
                    </div>
                </div>
                <nav class="flex-1 py-2 overflow-y-auto">
                    <ul class="space-y-1 px-3">
                        <li v-for="link in sidebarLinks" :key="link.value">
                            <UButton
                                :icon="link.icon"
                                :color="
                                    selectedTab === link.value
                                        ? 'primary'
                                        : 'gray'
                                "
                                :variant="
                                    selectedTab === link.value
                                        ? 'soft'
                                        : 'ghost'
                                "
                                class="w-full justify-start"
                                @click="handleLinkClick(link.value)"
                                >{{ link.label }}</UButton
                            >
                        </li>
                    </ul>
                </nav>
                <div class="p-4 border-t">
                    <UButton
                        icon="i-heroicons-arrow-right-on-rectangle"
                        color="gray"
                        variant="ghost"
                        class="w-full justify-start"
                        >Logout</UButton
                    >
                </div>
            </UCard>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
            <div
                class="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center justify-between"
            >
                <div class="flex items-center">
                    <UButton
                        v-if="isMobile"
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-bars-3"
                        @click="toggleSidebar"
                    />
                    <h1 class="text-xl font-bold ml-2 hidden sm:block">
                        Dashboard
                    </h1>
                </div>
                <div class="flex items-center space-x-2 sm:space-x-4">
                    <UButton
                        icon="i-heroicons-bell"
                        color="gray"
                        variant="ghost"
                    />
                    <div class="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            class="pl-9 pr-4 py-2 rounded-md border border-gray-300 w-40 lg:w-64 text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                        />
                        <span class="absolute left-3 top-2.5 text-gray-400"
                            ><UIcon name="i-heroicons-magnifying-glass"
                        /></span>
                    </div>
                    <UDropdown
                        :items="[
                            {
                                label: 'Profile',
                                icon: 'i-heroicons-user-circle',
                            },
                            {
                                label: 'Settings',
                                icon: 'i-heroicons-cog-6-tooth',
                            },
                            {
                                label: 'Logout',
                                icon: 'i-heroicons-arrow-right-on-rectangle',
                            },
                        ]"
                    >
                        <UAvatar
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                            size="xs"
                        />
                    </UDropdown>
                </div>
            </div>

            <UContainer class="py-4 md:py-6">
                <div v-if="selectedTab === 'overview'">
                    <!-- Stats Grid -->
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
                    >
                        <UCard
                            v-for="(stat, i) in stats"
                            :key="i"
                            class="bg-white"
                        >
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-sm text-gray-500">
                                        {{ stat.label }}
                                    </div>
                                    <div class="text-xl font-bold mt-1">
                                        {{ stat.value }}
                                    </div>
                                    <UBadge
                                        :color="
                                            stat.change.startsWith('+')
                                                ? 'emerald'
                                                : 'red'
                                        "
                                        variant="subtle"
                                        class="mt-1"
                                        >{{ stat.change }}</UBadge
                                    >
                                </div>
                                <UBadge
                                    :icon="stat.icon"
                                    :color="stat.color"
                                    variant="subtle"
                                    size="lg"
                                />
                            </div>
                        </UCard>
                    </div>

                    <!-- Content Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <!-- Listings Table -->
                        <UCard class="lg:col-span-2 overflow-hidden">
                            <template #header>
                                <div class="flex justify-between items-center">
                                    <h2 class="text-base font-medium">
                                        Recent Listings
                                    </h2>
                                    <UButton
                                        color="gray"
                                        variant="ghost"
                                        size="xs"
                                        >View All</UButton
                                    >
                                </div>
                            </template>
                            <div class="overflow-x-auto -mx-4 sm:mx-0">
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                class="px-4 py-2 text-xs font-medium text-left text-gray-500"
                                            />
                                            <th
                                                class="px-4 py-2 text-xs font-medium text-left text-gray-500"
                                            >
                                                Title
                                            </th>
                                            <th
                                                class="px-4 py-2 text-xs font-medium text-left text-gray-500"
                                            >
                                                Price
                                            </th>
                                            <th
                                                class="px-4 py-2 text-xs font-medium text-left text-gray-500 hidden sm:table-cell"
                                            >
                                                Status
                                            </th>
                                            <th
                                                class="px-4 py-2 text-xs font-medium text-left text-gray-500 hidden sm:table-cell"
                                            >
                                                Views
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200"
                                    >
                                        <tr
                                            v-for="item in recentListings"
                                            :key="item.id"
                                        >
                                            <td
                                                class="px-4 py-2 whitespace-nowrap"
                                            >
                                                <img
                                                    :src="item.image"
                                                    class="w-10 h-10 rounded object-cover"
                                                />
                                            </td>
                                            <td
                                                class="px-4 py-2 whitespace-nowrap text-sm"
                                            >
                                                {{ item.title }}
                                            </td>
                                            <td
                                                class="px-4 py-2 whitespace-nowrap text-sm"
                                            >
                                                ${{ item.price }}
                                            </td>
                                            <td
                                                class="px-4 py-2 whitespace-nowrap hidden sm:table-cell"
                                            >
                                                <UBadge
                                                    :color="
                                                        item.status === 'active'
                                                            ? 'emerald'
                                                            : 'amber'
                                                    "
                                                    >{{ item.status }}</UBadge
                                                >
                                            </td>
                                            <td
                                                class="px-4 py-2 whitespace-nowrap text-sm hidden sm:table-cell"
                                            >
                                                <UIcon
                                                    name="i-heroicons-eye"
                                                    class="inline mr-1"
                                                />{{ item.views }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </UCard>

                        <!-- Activity -->
                        <UCard>
                            <template #header>
                                <h2 class="text-base font-medium">
                                    Recent Activity
                                </h2>
                            </template>
                            <div class="space-y-3">
                                <div
                                    v-for="activity in recentActivity"
                                    :key="activity.id"
                                    class="flex"
                                >
                                    <UBadge
                                        :icon="activity.icon"
                                        :color="activity.color"
                                        variant="subtle"
                                        class="mr-3 mt-1"
                                    />
                                    <div>
                                        <h3 class="font-medium text-sm">
                                            {{ activity.title }}
                                        </h3>
                                        <p class="text-gray-500 text-xs mt-1">
                                            {{ activity.description }}
                                        </p>
                                        <p class="text-gray-400 text-xs">
                                            {{ activity.time }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </div>

                <!-- Other tabs placeholder -->
                <div v-if="selectedTab !== 'overview'" class="text-center py-8">
                    <UIcon
                        :name="
                            sidebarLinks.find(
                                (link) => link.value === selectedTab,
                            )?.icon || ''
                        "
                        class="text-4xl text-gray-300 mb-4"
                    />
                    <h2 class="text-xl font-bold text-gray-700">
                        {{
                            sidebarLinks.find(
                                (link) => link.value === selectedTab,
                            )?.label
                        }}
                    </h2>
                    <p class="text-gray-500 mt-2">
                        This section is under development
                    </p>
                    <UButton
                        color="primary"
                        class="mt-4"
                        @click="selectedTab = 'overview'"
                        >Return to Overview</UButton
                    >
                </div>
            </UContainer>
        </main>
    </div>
</template>
