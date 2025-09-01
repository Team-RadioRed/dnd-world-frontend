<script>
import SDTContainer from './SDTContainer.vue';

export default {
    props: {
        data: Object
    },
    components: {
        SDTContainer
    },
    methods: {
        getModifier(value) {
            const modifier = Math.floor((value - 10) / 2);
            const sign = Math.sign(modifier) >= 0 ? "+" : "";
            return `${sign}${modifier}`;
        }
    }
}
</script>


<template>
    <SDTContainer :title="data.name" :title-hide="data.isHideName">
        <div class="dt-stats-table-container">
            <table class="dt-stats-table">
                <thead>
                    <tr>
                        <th>СИЛ</th>
                        <th>ЛОВ</th>
                        <th>ТЕЛ</th>
                        <th>ИНТ</th>
                        <th>МДР</th>
                        <th>ХАР</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(description, index) in data.description" :key="index">
                            {{ description }} ({{ getModifier(description) }})
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </SDTContainer>
</template>