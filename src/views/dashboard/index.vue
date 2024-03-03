<script setup>

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();


</script>
<template>
   <div>Dashboard</div>
    {{authStore.user}}<br>
    {{authStore.isLoggedIn}}
</template>