<script setup>
import IconsComp from './IconsComp.vue';
</script>

<template>
    <nav class="sidenav base-container">
        <div class="sidenav__container">
            <ul class="sidenav__menu">
                <li class="sidenav__item">
                    <router-link to="/" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Dashboard
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/reports" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Rapporter
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/deadlines" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Overskredet deadline
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/fill-in-form" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Udfyld skema
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/form-overview" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Skemaoversigt
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/users" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Brugere
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/teams" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Grupper
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/documents" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Dokumenter
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/plans" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Planlægning
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/calendar" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Kalender
                    </router-link>
                </li>
                <li class="sidenav__item">
                    <router-link to="/settings" class="sidenav__link">
                        <span class="icon-wrapper"><IconsComp name="help" /></span>
                        Administration
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.sidenav__container {
    display: flex;
    justify-content: center;
}
.sidenav__menu {
    list-style-type: none;
    padding-left: 0;
}

.sidenav__menu li {
    padding: 1.5vh;
}

.sidenav__menu li a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: bolder;
    color: var(--headlines-paragraphs);
    display: flex;
    align-items: center; /* Align icon and text */
}

.sidenav__menu li a:hover {
    color: var(--cta-button-hover-link-hover);
}

.sidenav__menu li a:active {
    color: var(--cta-button-hover-link-hover);
}

.icon-wrapper {
    display: inline-flex;
    margin-right: 1vh;
}
</style>