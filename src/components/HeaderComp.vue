<script setup>
    import IconsComp from './IconsComp.vue';
</script>

<template>
    <header>
        <!-- Logo -->
        <div class="header__logo base-container">
        <img alt="DBI Logo" class="header__logo-image" src="../assets/img/dbi-logo-black.svg" />
        <span class="header__logo-title">Egenkontrol</span>
        </div>

        <!-- Title and Search -->
        <div class="header__center base-container">
        <h1 class="header__title">Dashboard</h1>
        <div class="header__search">
            <input type="text" class="header__search-input" placeholder="Søg"/>
            <IconsComp iconname="help" />
        </div>
        </div>

        <!-- Action Buttons -->
         <div class="header__actions ">
            <div class="header__button base-container">
                <IconsComp iconname="help" />
            </div>
            <div class="header__button base-container">
                    <IconsComp iconname="notifications" />
                    <span class="header__notification-badge"></span>
            </div>
            <div class="header__button base-container">
                    <IconsComp iconname="user" />
            </div>
            <div class="header__button base-container">
                    <IconsComp iconname="logout" />
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
        column-gap: 1vh;
        box-sizing: border-box; /* Include padding in height calculation */
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
        padding-left: 0.25vh;
    }

    /* ─── Center Area ───────────────────────────── */
    .header__center {
        grid-area: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--primary-color);
        padding: 0 2vh ;
    }

    .header__title {
        font-size: 3rem;
        margin: 1vh 0;
        font-weight: 600;
    }

    .header__search-input {
        padding: 0.5vh 2.5vh 0.5vh 1vh;
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
        column-gap: 1vh;
    }

    /* ─── Button Styling ────────────────────────── */
    .header__button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--primary-color);
    }
</style>
