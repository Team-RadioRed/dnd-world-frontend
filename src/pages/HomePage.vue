<script>
import { VERSION } from '@/storage/constants';

export default {
    computed: {
        version() { return VERSION }
    }
}
</script>


<template>
    <div class="home-page-main-container">
        <div class="home-page-header-container">
            <label>Проекты __</label>
            <label class="home-page-version">версия: {{ version }}</label>
        </div>

        <div class="home-page-url-container">
            <RouterLink :to="{ name: 'sailpunk-eastmap' }" class="home-page-url-component">
                <img src="https://radiored.ru/images/worlds/w001.jpg" class="home-page-url-image">
                <div class="home-page-url-text-container">
                    <label class="home-page-url-title">>> Sailpunk [ Восточные провинции ]</label>
                    <label class="home-page-url-description">Мир для D&D компании</label>
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'endless-empire' }" class="home-page-url-component">
                <img src="https://radiored.ru/images/worlds/w002.jpg" class="home-page-url-image">
                <div class="home-page-url-text-container">
                    <label class="home-page-url-title">>> Endless Empire</label>
                    <label class="home-page-url-description">Description</label>
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'minsk-metro' }" class="home-page-url-component">
                <img src="https://radiored.ru/images/worlds/w003.jpg" class="home-page-url-image">
                <div class="home-page-url-text-container">
                    <label class="home-page-url-title">>> Metro 2033 [Минск]</label>
                    <label class="home-page-url-description">Description</label>
                </div>
            </RouterLink>
        </div>
    </div>
</template>