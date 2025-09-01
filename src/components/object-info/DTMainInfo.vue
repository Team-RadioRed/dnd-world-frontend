<script>
import SDTContainer from './SDTContainer.vue';

export default {
    props: {
        data: Object
    },
    components: {
        SDTContainer
    }
}
</script>


<template>
    <SDTContainer :title="data.name" :title-hide="data.isHideName">
        <div class="dt-main-info-container">
            <label><b>Раса:</b> {{ data.race ? data.race : "Незвестно" }}</label>
            <label><b>Тип:</b> {{ data.types ? data.types : "Незвестно" }}</label>
            <label><b>Класс:</b> {{ data.class ? data.class : "Незвестно" }}</label>
            <label><b>Владение:</b> {{ data.possession ? data.possession : "Незвестно" }}</label>
            <label><b>Навыки:</b> {{ data.skills ? data.skills : "Незвестно" }}</label>
            <label><b>Языки:</b> {{ data.languages ? data.languages : "Незвестно" }}</label>
        </div>
    </SDTContainer>
</template>