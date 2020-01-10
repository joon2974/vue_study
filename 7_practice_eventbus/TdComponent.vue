<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import EventBus from "./EventBus";

    export default {
        props: {
            //O, X 또는 빈칸을 뜻함
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd(){
                //이미 그 칸을 누가 눌렀으면 함수 종료해버리기
                if(this.cellData) return;

                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            }
        }
    }
</script>