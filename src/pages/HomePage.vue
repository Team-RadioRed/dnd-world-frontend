<script>
export default {

}
</script>


<template>
    <div class="all-container">
        <RouterLink :to="{ name: 'sailpunk-eastmap' }" class="wold-container">
            <img src="https://radiored.ru/images/worlds/w001.jpg" class="top-image">
            <label class="bottom-text"><b>Sailpunk</b></label>
            <label class="bottom-text">Map of the Eastern provinces</label>
        </RouterLink>
    </div>
</template>


<style scoped>
.all-container {
    width: 100dvw;
    height: 100dvh;
    background-color: #2e3440;
    padding: 10px;
    display: flex;
    flex-direction: row;
    row-gap: 10px;
    column-gap: 10px;
    box-sizing: border-box;
}

.wold-container {
    background-color: #434c5e;
    width: 256px;
    height: 256px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px #000000;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
}

.wold-container:hover {
    background-color: #4c566a;
}

.wold-container label {
    cursor: pointer;
}

.top-image {
    width: 256px;
    height: 192px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    flex: 0 0 192px;
}

.bottom-text {
    flex: 1 1 50%;
    width: 256px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #eceff4;
}
</style>