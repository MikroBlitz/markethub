<script setup lang="ts">
const user = {
    avatar: "/api/placeholder/100/100",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "Seller",
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
        date: "2025-02-24",
        id: 1,
        image: "/api/placeholder/150/100",
        likes: 7,
        price: 299,
        status: "active",
        title: "Vintage Camera",
        views: 52,
    },
    {
        date: "2025-02-20",
        id: 2,
        image: "/api/placeholder/150/100",
        likes: 3,
        price: 149,
        status: "active",
        title: "Mechanical Keyboard",
        views: 28,
    },
    {
        date: "2025-02-18",
        id: 3,
        image: "/api/placeholder/150/100",
        likes: 1,
        price: 89,
        status: "pending",
        title: "Leather Backpack",
        views: 15,
    },
]);

const recentActivity = ref([
    {
        color: "blue",
        description: "Alex sent you a message about the vintage camera",
        icon: "i-heroicons-envelope",
        id: 1,
        time: "10 minutes ago",
        title: "New message received",
        type: "message",
    },
    {
        color: "emerald",
        description: "Sarah made an offer of $250 for your mechanical keyboard",
        icon: "i-heroicons-currency-dollar",
        id: 2,
        time: "2 hours ago",
        title: "New offer received",
        type: "offer",
    },
    {
        color: "amber",
        description: "Your leather backpack listing was viewed 5 times",
        icon: "i-heroicons-eye",
        id: 3,
        time: "1 day ago",
        title: "New product view",
        type: "view",
    },
]);

const selectedTab = ref("overview");

const sidebarLinks = [
    { icon: "i-heroicons-home", label: "Overview", value: "overview" },
    { icon: "i-heroicons-squares-2x2", label: "Listings", value: "listings" },
    {
        icon: "i-heroicons-chat-bubble-left-right",
        label: "Messages",
        value: "messages",
    },
    { icon: "i-heroicons-currency-dollar", label: "Offers", value: "offers" },
    { icon: "i-heroicons-shopping-cart", label: "Orders", value: "orders" },
    { icon: "i-heroicons-chart-bar", label: "Analytics", value: "analytics" },
    { icon: "i-heroicons-cog-6-tooth", label: "Settings", value: "settings" },
];

const isSidebarOpen = ref(true);

// Responsive sidebar control
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// For mobile view, close sidebar when clicking a link
const handleLinkClick = (value: string) => {
    selectedTab.value = value;
    if (window.innerWidth < 768) {
        isSidebarOpen.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex">
        <!-- Sidebar -->
        <div
            class="fixed inset-y-0 left-0 z-50 transition-all duration-300 transform"
            :class="
                isSidebarOpen
                    ? 'translate-x-0'
                    : '-translate-x-full md:translate-x-0 md:w-16'
            "
        >
            <UCard
                class="h-full rounded-none flex flex-col border-r border-gray-200 overflow-hidden"
                :class="isSidebarOpen ? 'w-64' : 'w-16 md:w-16'"
            >
                <!-- Logo -->
                <div class="p-4 border-b flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span
                            v-if="isSidebarOpen"
                            class="text-primary font-bold text-2xl"
                            >Market<span class="text-gray-800">Hub</span></span
                        >
                        <span v-else class="text-primary font-bold text-2xl"
                            >M</span
                        >
                    </div>
                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-bars-3"
                        class="md:hidden"
                        @click="toggleSidebar"
                    />
                </div>

                <!-- User Info -->
                <div class="p-4 border-b">
                    <UButtonGroup v-if="isSidebarOpen" block class="mb-4">
                        <UButton block>Switch to Buyer</UButton>
                        <UButton block color="primary">Seller Mode</UButton>
                    </UButtonGroup>
                    <div
                        class="flex items-center space-x-3"
                        :class="isSidebarOpen ? '' : 'justify-center'"
                    >
                        <UAvatar :src="user.avatar" size="sm" />
                        <div v-if="isSidebarOpen">
                            <p class="font-medium text-sm">{{ user.name }}</p>
                            <p class="text-xs text-gray-500">{{ user.role }}</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 py-4 overflow-y-auto">
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
                                :class="isSidebarOpen ? '' : 'justify-center'"
                                @click="handleLinkClick(link.value)"
                            >
                                <span v-if="isSidebarOpen">{{
                                    link.label
                                }}</span>
                            </UButton>
                        </li>
                    </ul>
                </nav>

                <!-- Logout -->
                <div class="p-4 border-t">
                    <UButton
                        icon="i-heroicons-arrow-right-on-rectangle"
                        color="gray"
                        variant="ghost"
                        class="w-full justify-start"
                        :class="isSidebarOpen ? '' : 'justify-center'"
                    >
                        <span v-if="isSidebarOpen">Logout</span>
                    </UButton>
                </div>
            </UCard>
        </div>

        <!-- Main Content -->
        <main
            class="flex-1 transition-all duration-300"
            :class="isSidebarOpen ? 'md:ml-64' : 'md:ml-16'"
        >
            <!-- Topbar -->
            <UHeader sticky class="border-b">
                <template #left>
                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-bars-3"
                        class="md:hidden"
                        @click="toggleSidebar"
                    />
                    <h1 class="text-xl font-bold ml-2">Dashboard</h1>
                </template>
                <template #right>
                    <div class="flex items-center space-x-4">
                        <UButton
                            icon="i-heroicons-bell"
                            color="gray"
                            variant="ghost"
                        />
                        <UInput
                            placeholder="Search..."
                            icon="i-heroicons-magnifying-glass"
                            class="hidden md:block"
                        />
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
                            <UAvatar :src="user.avatar" size="sm" />
                        </UDropdown>
                    </div>
                </template>
            </UHeader>

            <!-- Page Content -->
            <UContainer class="py-8">
                <div v-if="selectedTab === 'overview'">
                    <!-- Stats Cards -->
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        <UCard
                            v-for="(stat, index) in stats"
                            :key="index"
                            class="bg-white"
                        >
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-sm text-gray-500">
                                        {{ stat.label }}
                                    </div>
                                    <div class="text-2xl font-bold mt-1">
                                        {{ stat.value }}
                                    </div>
                                    <UBadge
                                        :color="
                                            stat.change.startsWith('+')
                                                ? 'emerald'
                                                : 'red'
                                        "
                                        variant="subtle"
                                        class="mt-2"
                                    >
                                        {{ stat.change }}
                                    </UBadge>
                                </div>
                                <UBadge
                                    :icon="stat.icon"
                                    :color="stat.color"
                                    variant="subtle"
                                    size="xl"
                                />
                            </div>
                        </UCard>
                    </div>

                    <!-- Main Content -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- Recent Listings -->
                        <UCard class="lg:col-span-2">
                            <template #header>
                                <div class="flex justify-between items-center">
                                    <h2 class="text-lg font-medium">
                                        Recent Listings
                                    </h2>
                                    <UButton
                                        to="/listings"
                                        color="gray"
                                        variant="ghost"
                                        size="xs"
                                    >
                                        View All
                                    </UButton>
                                </div>
                            </template>
                            <div class="overflow-x-auto">
                                <UTable
                                    :rows="recentListings"
                                    :columns="[
                                        {
                                            key: 'image',
                                            label: '',
                                            sortable: false,
                                        },
                                        {
                                            key: 'title',
                                            label: 'Title',
                                            sortable: true,
                                        },
                                        {
                                            key: 'price',
                                            label: 'Price',
                                            sortable: true,
                                        },
                                        {
                                            key: 'status',
                                            label: 'Status',
                                            sortable: true,
                                        },
                                        {
                                            key: 'views',
                                            label: 'Views',
                                            sortable: true,
                                        },
                                        {
                                            key: 'actions',
                                            label: '',
                                            sortable: false,
                                        },
                                    ]"
                                >
                                    <template #image-data="{ row }">
                                        <img
                                            :src="row.image"
                                            alt="Product"
                                            class="w-12 h-12 object-cover rounded"
                                        />
                                    </template>
                                    <template #price-data="{ row }">
                                        ${{ row.price.toFixed(2) }}
                                    </template>
                                    <template #status-data="{ row }">
                                        <UBadge
                                            :color="
                                                row.status === 'active'
                                                    ? 'emerald'
                                                    : 'amber'
                                            "
                                        >
                                            {{ row.status }}
                                        </UBadge>
                                    </template>
                                    <template #views-data="{ row }">
                                        <div class="flex items-center">
                                            <UIcon
                                                name="i-heroicons-eye"
                                                class="mr-1 text-gray-500"
                                            />
                                            {{ row.views }}
                                        </div>
                                    </template>
                                    <template #actions-data>
                                        <UDropdown
                                            :items="[
                                                {
                                                    label: 'Edit',
                                                    icon: 'i-heroicons-pencil',
                                                },
                                                {
                                                    label: 'Delete',
                                                    icon: 'i-heroicons-trash',
                                                },
                                            ]"
                                        >
                                            <UButton
                                                color="gray"
                                                variant="ghost"
                                                icon="i-heroicons-ellipsis-horizontal"
                                            />
                                        </UDropdown>
                                    </template>
                                </UTable>
                            </div>
                        </UCard>

                        <!-- Recent Activity -->
                        <UCard>
                            <template #header>
                                <div class="flex justify-between items-center">
                                    <h2 class="text-lg font-medium">
                                        Recent Activity
                                    </h2>
                                    <UButton
                                        color="gray"
                                        variant="ghost"
                                        size="xs"
                                    >
                                        View All
                                    </UButton>
                                </div>
                            </template>
                            <div class="space-y-4">
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
                                        <p class="text-gray-400 text-xs mt-1">
                                            {{ activity.time }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </div>

                    <!-- Quick Actions -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <UCard>
                            <template #header>
                                <h2 class="text-lg font-medium">
                                    Quick Actions
                                </h2>
                            </template>
                            <div class="space-y-4">
                                <UButton
                                    block
                                    icon="i-heroicons-plus"
                                    color="primary"
                                >
                                    Create New Listing
                                </UButton>
                                <UButton
                                    block
                                    icon="i-heroicons-chart-bar"
                                    variant="outline"
                                    color="gray"
                                >
                                    View Analytics
                                </UButton>
                                <UButton
                                    block
                                    icon="i-heroicons-chat-bubble-left-right"
                                    variant="outline"
                                    color="gray"
                                >
                                    Check Messages
                                </UButton>
                            </div>
                        </UCard>

                        <!-- Tips & Tricks -->
                        <UCard class="col-span-1 md:col-span-2">
                            <template #header>
                                <h2 class="text-lg font-medium">
                                    Tips for Sellers
                                </h2>
                            </template>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <UBadge
                                        icon="i-heroicons-light-bulb"
                                        color="amber"
                                        variant="subtle"
                                        class="mr-3 mt-1"
                                    />
                                    <div>
                                        <h3 class="font-medium text-sm">
                                            Use high-quality images
                                        </h3>
                                        <p class="text-gray-500 text-xs mt-1">
                                            Listings with multiple high-quality
                                            images get 2x more views.
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <UBadge
                                        icon="i-heroicons-light-bulb"
                                        color="amber"
                                        variant="subtle"
                                        class="mr-3 mt-1"
                                    />
                                    <div>
                                        <h3 class="font-medium text-sm">
                                            Detailed descriptions
                                        </h3>
                                        <p class="text-gray-500 text-xs mt-1">
                                            Include all relevant details to
                                            reduce buyer questions.
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <UBadge
                                        icon="i-heroicons-light-bulb"
                                        color="amber"
                                        variant="subtle"
                                        class="mr-3 mt-1"
                                    />
                                    <div>
                                        <h3 class="font-medium text-sm">
                                            Respond quickly
                                        </h3>
                                        <p class="text-gray-500 text-xs mt-1">
                                            Sellers who respond within 2 hours
                                            are 50% more likely to make a sale.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </div>

                <!-- Placeholder for other tabs -->
                <div
                    v-if="selectedTab !== 'overview'"
                    class="flex flex-col items-center justify-center py-12"
                >
                    <UIcon
                        :name="
                            sidebarLinks.find(
                                (link) => link.value === selectedTab,
                            )?.icon || ''
                        "
                        class="text-6xl text-gray-300 mb-4"
                    />
                    <h2 class="text-2xl font-bold text-gray-700">
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
                        class="mt-6"
                        @click="selectedTab = 'overview'"
                    >
                        Return to Overview
                    </UButton>
                </div>
            </UContainer>
        </main>
    </div>
</template>
