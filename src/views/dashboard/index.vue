<script setup>

import { useMeStore } from "@/store/me";

const meStore = useMeStore();


</script>
<template>
   <div>Dashboard</div>
    {{meStore.user}}<br>
    {{meStore.isLoggedIn}}
</template>