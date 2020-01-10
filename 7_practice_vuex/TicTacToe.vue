<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
        </table>
        <div v-if="winner">{{winner}}님이 이겼습니다.</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from "./store";

    export default {
        //Vuex 객체 사용
        store,
        data() {
            return{
            };
        },
        computed: {
            //store의 state를 일일이 computed에 넣어놓기 귀찮으므로 mapState를 통해 한번에 불러옴.
            ...mapState(['winner', 'turn', 'tableData']),
          // winner(){
          //     return this.$store.state.winner;
          // },
          // turn(){
          //     return this.$store.state.turn;
          // },
        },
        methods: {
            onChangeData(){
                //Vue 임포트 해서 Vue.set하는 것과 동일
                Vue.set(this.tableData[1], 0, 'X');
            },
            onClickTd(rowIndex, cellIndex){
                //이미 그 칸을 누가 눌렀으면 함수 종료해버리기
                if(this.cellData) return;

                // vuex의 mutation을 부를 때는 commit을 사용!!
                this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex});
                console.log([rowIndex, cellIndex], "Index");

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
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
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
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    }else{
                        //자식 컴포넌트에서 부모 컴포넌트의 데이터를 조작할 수 있다
                        this.$store.commit(CHANGE_TURN);
                    }
                }
            }
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