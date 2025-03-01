<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm fixed w-full z-10">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="text-green-600 font-bold text-2xl">
                            Market<span class="text-gray-800">Hub</span>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="flex items-center space-x-8">
                            <a
                                href="#"
                                class="text-gray-600 hover:text-green-600 transition-colors duration-300"
                                >Home</a
                            >
                            <a
                                href="#"
                                class="text-gray-600 hover:text-green-600 transition-colors duration-300"
                                >Explore</a
                            >
                            <a
                                href="#"
                                class="text-gray-600 hover:text-green-600 transition-colors duration-300"
                                >How it Works</a
                            >
                            <a
                                href="#"
                                class="text-gray-600 hover:text-green-600 transition-colors duration-300"
                                >About</a
                            >
                            <UButton
                                class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                                to="/login"
                                >Sign In</UButton
                            >
                        </div>
                    </div>
                    <div class="md:hidden">
                        <button class="text-gray-600">
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="flex flex-col items-center justify-center pt-32 pb-20 px-6">
            <div class="text-center max-w-3xl">
                <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Welcome to <span class="text-green-600">MarketHub</span>
                </h1>
                <p class="text-xl text-gray-600 mb-10 leading-relaxed">
                    MarketHub is a platform for trading any item you wish. It
                    revolves around a community-based ecosystem that links
                    buyers and sellers, enabling straightforward connections and
                    transactions.
                </p>
                <div
                    class="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <UButton
                        to="/login"
                        class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                        Get Started
                    </UButton>
                    <UButton
                        to="/explore"
                        class="bg-white hover:bg-gray-50 text-green-600 border border-green-600 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 w-full sm:w-auto"
                    >
                        Explore Marketplace
                    </UButton>
                </div>
            </div>

            <!-- Stats Section -->
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl"
            >
                <div class="bg-white p-8 rounded-xl shadow-md text-center">
                    <div class="text-4xl font-bold text-green-600 mb-2">
                        10K+
                    </div>
                    <div class="text-gray-600">Active Users</div>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-md text-center">
                    <div class="text-4xl font-bold text-green-600 mb-2">
                        50K+
                    </div>
                    <div class="text-gray-600">Items Listed</div>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-md text-center">
                    <div class="text-4xl font-bold text-green-600 mb-2">
                        99%
                    </div>
                    <div class="text-gray-600">Satisfaction Rate</div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-6">
                <h2 class="text-3xl font-bold text-center mb-12">
                    Why Choose MarketHub
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <h3 class="text-xl font-semibold mb-3">
                            Secure Transactions
                        </h3>
                        <p class="text-gray-600">
                            Our platform ensures every transaction is protected
                            with end-to-end encryption and buyer/seller
                            protection.
                        </p>
                    </div>
                    <div
                        class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <h3 class="text-xl font-semibold mb-3">
                            Community Driven
                        </h3>
                        <p class="text-gray-600">
                            Join thousands of users sharing reviews,
                            recommendations, and creating a trusted marketplace
                            environment.
                        </p>
                    </div>
                    <div
                        class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <h3 class="text-xl font-semibold mb-3">
                            Lightning Fast
                        </h3>
                        <p class="text-gray-600">
                            List items in seconds and connect with potential
                            buyers or sellers instantly through our optimized
                            platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="py-20 bg-green-600">
            <div class="max-w-4xl mx-auto text-center px-6">
                <h2 class="text-3xl font-bold text-white mb-6">
                    Ready to start trading?
                </h2>
                <p class="text-green-100 mb-10 text-lg">
                    Join thousands of users already experiencing the future of
                    peer-to-peer marketplace trading.
                </p>
                <UButton
                    to="/login"
                    class="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all duration-300"
                >
                    Get Started Today
                </UButton>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-gray-300 py-12">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div class="text-white font-bold text-2xl mb-4">
                            Market<span class="text-green-400">Hub</span>
                        </div>
                        <p class="text-gray-400">
                            The premier platform for community-based trading,
                            connecting people and products seamlessly.
                        </p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul class="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Home</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >About Us</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Features</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Pricing</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Resources</h3>
                        <ul class="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Blog</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Support</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Documentation</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-green-400 transition-colors duration-300"
                                    >Terms of Service</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Connect</h3>
                        <div class="flex space-x-4 mb-4">
                            <a
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <span class="sr-only">Facebook</span>
                                <svg
                                    class="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <span class="sr-only">Twitter</span>
                                <svg
                                    class="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <span class="sr-only">Instagram</span>
                                <svg
                                    class="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div>
                            <h4 class="font-medium mb-2">
                                Subscribe to our newsletter
                            </h4>
                            <div class="flex">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    class="bg-gray-700 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
                >
                    <p>© 2025 MarketHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts"></script>
