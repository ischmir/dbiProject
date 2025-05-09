<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import NavComp from '@/components/NavComp.vue';
</script>

<template>
    <div class="layout-grid">
        <HeaderComp class="header-comp" />
        <NavComp class="nav-comp" />
        <main class="main-comp base-container">
            <router-view />
        </main>
    </div>
</template>

<style lang="scss" scoped>
    .layout-grid {
        display: grid;
        grid-template-columns: repeat(16, minmax(50px, 1fr));
        grid-template-rows: auto 1fr;
        grid-template-areas:
          "header header header header header header header header header header header header header header header header"
          "nav nav nav main main main main main main main main main main main main main";
        gap: 1vh;
        height: calc(100vh - 2vh);
    }

    .header-comp {
        grid-area: header;
        box-sizing: border-box;
    }

    .nav-comp {
        grid-area: nav;
    }

    .main-comp {
        grid-area: main;
    }
</style>
