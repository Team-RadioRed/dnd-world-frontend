<script>
export default {
    props: {
        data: Object
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
    <div class="info-container info-column">
        <label class="info-container-title" v-if="data.isHideName != true">{{ data.name }}</label>
        <table class="dt-stats-table">
            <tr>
                <th>Сил</th>
                <th>Лов</th>
                <th>Тел</th>
                <th>Инт</th>
                <th>Мдр</th>
                <th>Хар</th>
            </tr>
            <tr>
                <td v-for="(description, index) in data.description" :key="index">
                    {{ description }}<br>({{ getModifier(description) }})
                </td>
            </tr>
        </table>
    </div>
</template>