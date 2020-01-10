<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import { mapState } from 'vuex'
    import {CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER} from "./store";

    export default {
        props: {
            rowIndex: Number,
            cellIndex: Number,
        },
        computed: {
            ...mapState({
                tableData: state => state.tableData,
                turn: state => state.turn,
                cellData(state){
                    return state.tableData[this.rowIndex][this.cellIndex];
                }
            }),
          //   cellData(){
          //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
          //   },
          // // vuex의 state를 받아와 쓰기 위해 computed로 연결해준다.!!
          //   tableData(){
          //       return this.$store.state.tableData;
          //   },
          //   turn(){
          //     return this.$store.state.turn;
          //   },
        },
        methods: {
            onClickTd(){
                //이미 그 칸을 누가 눌렀으면 함수 종료해버리기
                if(this.cellData) return;

                // vuex의 mutation을 부를 때는 commit을 사용!!
                this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex});
                console.log([this.rowIndex, this.cellIndex], "Index");

                let win = false;
                if(this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2]){
                    win = true;
                }
                if(this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex]){
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
        }
    }
</script>