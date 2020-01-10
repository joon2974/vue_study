<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}님이 이겼습니다.</div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent';
    import EventBus from "./EventBus";

    export default {
        components: {
          TableComponent,
        },
        data() {
            return{
                tableData: [
                  ['', '', ''],
                  ['', '', ''],
                  ['', '', ''],
                ],
                turn: 'O',
                winner: '',
            };
        },
        methods: {
            onChangeData(){
                //Vue 임포트 해서 Vue.set하는 것과 동일
                this.$set(this.tableData[1], 0, 'X');
            },
            onClickTd(rowIndex, cellIndex){
                const rootData = this.$root.$data;

                //Vue에서 배열이 있을 때, 아래와 같이 index를 통해 그 배열에 접근하여 값을 바꾸면
                //화면에 반영이 되지 않는다.!!!!, 객체의 key를 바꾸는 것도 동일
                //this.$set을 이용한다.
                //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

                //인덱스를 여러 개 쓸 경우 마지막 인덱스를 key로 주면 됨
                //$set(테이블 인덱스, 키(마지막 인덱스), 바꿀 값)!!!!
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);

                let win = false;
                if(this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2]){
                    win = true;
                }
                if(this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex]){
                    win = true;
                }
                if(this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn){
                    win = true;
                }
                if(this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn){
                    win = true;
                }

                if(win){
                    this.winner = this.turn;
                    this.turn = 'O';
                    this.tableData = [['','',''], ['','',''], ['','','']];
                }else{ //무승부
                    let all = true; //all이 true면 무승부
                    this.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if (!cell){
                                all = false;
                            }
                        });
                    });

                    if(all){ //무승부, 게임 초기화
                        this.winner = this.turn;
                        this.turn = 'O';
                        this.tableData = [['','',''], ['','',''], ['','','']];
                    }else{
                        //자식 컴포넌트에서 부모 컴포넌트의 데이터를 조작할 수 있다
                        this.turn = this.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        },
        //EventBus의 단점: root 컴포넌트가 복잡해진다.
        created() {
            EventBus.$on('clickTd', this.onClickTd);
        },
    };
</script>

<style>
    table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>