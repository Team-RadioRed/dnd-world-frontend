<script>
import SDTTitle from './SDTTitle.vue';

export default {
    props: {
        data: Object
    },
    components: {
        SDTTitle
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
    <div class="info-column">
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
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
    </div>
</template>