<template>
    <table>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-index="index" :cell-data="cellData" :row-index="rowIndex"></td-component>
    </table>
</template>

<script>
    import TdComponent from './TdComponent';
    export default {
        props: {
            rowIndex: Number,
        },
        data(){
            return{
                parents: '내가 니 애비다',
            }
        },
        computed: {
          rowData(){
              return this.$store.state.tableData[this.rowIndex];
          }
        },
        components: {
            TdComponent,
        },
    }
</script>