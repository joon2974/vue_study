<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
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

                const rootData = this.$root.$data;

                //this.$root.$data를 통해 최상위 부모 컴포넌트의 data에 접근
                console.log(this.$root.$data);
                //해당 컴포넌트의 부모 컴포넌트의 data에 접근
                console.log(this.$parent.$data);

                //Vue에서 배열이 있을 때, 아래와 같이 index를 통해 그 배열에 접근하여 값을 바꾸면
                //화면에 반영이 되지 않는다.!!!!, 객체의 key를 바꾸는 것도 동일
                //this.$set을 이용한다.
                //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

                //인덱스를 여러 개 쓸 경우 마지막 인덱스를 key로 주면 됨
                //$set(테이블 인덱스, 키(마지막 인덱스), 바꿀 값)!!!!
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

                let win = false;
                if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2]){
                    win = true;
                }
                if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex]){
                    win = true;
                }
                if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn){
                    win = true;
                }
                if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn){
                    win = true;
                }

                if(win){
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [['','',''], ['','',''], ['','','']];
                }else{ //무승부
                    let all = true; //all이 true면 무승부
                    rootData.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if (!cell){
                                all = false;
                            }
                        });
                    });

                    if(all){ //무승부, 게임 초기화
                        rootData.winner = rootData.turn;
                        rootData.turn = 'O';
                        rootData.tableData = [['','',''], ['','',''], ['','','']];
                    }else{
                        //자식 컴포넌트에서 부모 컴포넌트의 데이터를 조작할 수 있다
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        }
    }
</script>