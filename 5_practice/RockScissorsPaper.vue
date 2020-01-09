<template>
<!-- 맨 바깥 div는 template로 바꾸지 못함! -->
    <div>
<!-- v-bind 뒤에 ""안에는 객체를 넣을 수 있다 -->
<!-- 원래 css에서는 background-image로 쓰지만 -->
<!-- JS에서는 -를 빼기로 인식하므로 -i를 I로 바꿔야 한다 -->
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>

<!-- devtools에서 frame은 항상 60 이상으로 최적화 -->
<script>
    const rspCoords = {
        바위: '0',
        가위: '-142px',
        보: '-284px',
    };

    const scores = {
      가위: 1,
      바위: 0,
      보: -1,
    };

    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find(function (v) {
            return v[1] === imgCoord;
        })[0];
    };

    //이후에 컴포넌트가 종료되면 setInterval 작업을 종료시키기 위해
    //변수로 따로 선언함
    let interval = null;

    export default {
        data() {
            return{
                //나중에 봤을때 그냥 px만 넣으면 뭔지 모르니까 변수로 넣어주기
                imgCoord: rspCoords.바위,
                score: 0,
                result: '',
            }
        },
        computed: {
            computedStyleObject(){
                return { background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
                };
            },
        },
        methods: {
            changeHand(){
                interval = setInterval(() => {
                    if(this.imgCoord === rspCoords.바위){
                        this.imgCoord = rspCoords.가위;
                    }else if(this.imgCoord === rspCoords.가위){
                        this.imgCoord = rspCoords.보;
                    }else if(this.imgCoord === rspCoords.보){
                        this.imgCoord = rspCoords.바위;
                    }
                }, 100);
            },
            onClickButton(choice){
                //손가락 잠시 멈춰주는 부분
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imgCoord)];
                const diff = myScore - cpuScore;

                if(diff === 0){
                    this.result = '비겼습니다.';
                }else if([-1, 2].includes(diff)){
                    this.result = '이겼습니다.';
                    this.score += 1;
                }else{
                    this.result = '졌습니다.';
                    this.score -= 1;
                }
                setTimeout(() => {
                    this.changeHand();
                }, 1000);
            }
        },
        //Lifecycle 4개
        created() {
            //컴포넌트가 화면에 나타나기 전, 생성될 때/ data, computed같은거 다 채워넣은 상태
            console.log('created');
        },
        beforeCreate(){
            console.log('before created');
        },
        mounted() {
            //컴포넌트가 화면에 나타난 후. 화면과 관련된 작업을 처리!!.
            console.log('mounted');
            this.changeHand();
        },
        beforeMount(){
            console.log('before mounted');
        },
        updated() {
            //화면의 data가 바뀌어서 다시 그려질 때
            console.log('updated');
        },
        beforeUpdate(){
            console.log('before updated');
        },
        destroyed() {
            //컴포넌트가 화면에서 사라질 때(없어질 때)
            console.log('destroyed');
        },
        beforeDestroy(){
            //mounted에서 interval 계속 실행시켰는데 setInterval이 컴포넌트가
            //종료되어도 계속 실행됨. 따라서 이런 쓸데없는 작업을 종료시켜준다.
            console.log('before destroyed');
            clearInterval(interval);
        },
    };
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>