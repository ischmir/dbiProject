<script setup>
    import IconsComp from './IconsComp.vue';
</script>

<template>
    <header>
        <!-- Logo -->
        <div class="header__logo">
        <img alt="DBI Logo" class="header__logo-image" src="../assets/img/dbi-logo-black.svg" />
        <span class="header__logo-title">Egenkontrol</span>
        </div>

        <!-- Title and Search -->
        <div class="header__center">
        <h1 class="header__title">Dashboard</h1>
        <div class="header__search">
            <input type="text" class="header__search-input" placeholder="Søg"/>
            <span><IconsComp name="help" /></span>
        </div>
        </div>

        <!-- Action Buttons -->
         <div class="header__actions">
            <div class="header__button">
                <IconsComp name="help" />
            </div>
            <div class="header__button">
                    <IconsComp name="notifications" />
                    <span class="header__notification-badge"></span>
            </div>
            <div class="header__button">
                    <IconsComp name="user" />
            </div>
            <div class="header__button">
                    <IconsComp name="logout" />
            </div>
         </div>
    </header>
</template>
  
<style lang="scss" scoped>
    header {
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-template-areas: 
            "logo logo logo center center center center center center center center center actions actions actions actions";
        column-gap: 12px;
    }

    header * {
        border-radius: 4px;
    }

    /* ─── Logo Area ─────────────────────────────── */
    .header__logo {
        grid-area: logo;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--primary-color);
    }

    .header__logo-image {
        height: 3vw;
    }
    .header__logo-title {
        display: flex;
        align-items: flex-end;
        height: 3vw;
        font-weight: bolder;
        padding-left: 4px;
    }

    /* ─── Center Area ───────────────────────────── */
    .header__center {
        grid-area: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1vw;
        background-color: var(--primary-color);
    }

    .header__search {
        position: relative;
    }

    .header__search-input {
        padding: 0.5rem 2.5rem 0.5rem 1rem;
        border: 1px solid var(--placeholder-text-inactive-text);
        border-radius: 9999px;
        outline: none;
        font-size: 1rem;
    }

    /* ─── Actions Area ──────────────────────────── */
    .header__actions {
        grid-area: actions;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas: "help notifications profile logout";
        column-gap: 12px;
    }

    /* ─── Button Styling ────────────────────────── */
    .header__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: var(--primary-color);
        border: none;
    }
    .header__button--help {
        background-color: transparent;
        border: none;
        size: 1.5em;
    }
</style>
