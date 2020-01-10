<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import {CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER} from "./store";

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

                //Vue에서 배열이 있을 때, 아래와 같이 index를 통해 그 배열에 접근하여 값을 바꾸면
                //화면에 반영이 되지 않는다.!!!!, 객체의 key를 바꾸는 것도 동일
                //this.$set을 이용한다.
                //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

                //mutation을 부를 때는 commit을 사용
                this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex});

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