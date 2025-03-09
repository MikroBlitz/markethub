<template>
    <header class="bg-white border-b border-gray-200 p-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center space-x-4">
                <UInput
                    icon="i-heroicons-magnifying-glass"
                    placeholder="Search..."
                    color="gray"
                    variant="outline"
                    class="hidden md:block w-64"
                />

                <UButton
                    icon="i-heroicons-bell"
                    color="gray"
                    variant="ghost"
                    :trailing="false"
                />

                <UDropdown :items="userMenuItems">
                    <UAvatar
                        src="https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
                        size="sm"
                        class="cursor-pointer"
                    />
                </UDropdown>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
defineEmits(["toggle-sidebar"]);

const auth = useAuthStore();
const toast = useToast();

const userMenuItems = [
    [
        { icon: "i-heroicons-user-circle", label: "Profile", to: "/dashboard" },
        { icon: "i-heroicons-cog-6-tooth", label: "Settings", to: "/settings" },
    ],
    [
        {
            click: () => {
                auth.logout();
                toast.add({
                    color: "green",
                    icon: "i-heroicons-check-circle",
                    title: "You have been logged out.",
                });
            },
            icon: "i-heroicons-arrow-right-on-rectangle",
            label: "Logout",
        },
    ],
];
</script>
