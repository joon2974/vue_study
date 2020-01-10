<template>
    <table>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
    </table>
</template>

<script>
    import TdComponent from './TdComponent';
    export default {
        props: {
            rowData: Array,
            rowIndex: Number,
        },
        data(){
            return{
                parents: '내가 니 애비다',
            }
        },
        components: {
            TdComponent,
        },
    }
</script>