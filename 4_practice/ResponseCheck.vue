<template>
<!-- 맨 바깥 div는 template로 바꾸지 못함! -->
    <div>
<!-- 바인딩을 통해 data의 state와 연결 -->
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
<!-- v-show를 하면 ""내부가 false면 display:none, true면 true -->
<!-- v-if와 기능적으로는 동일하지만 v-show는 태그 유지!!!, v-if는 태그를 삭제 -->
<!-- 기능없이 감싸주는 애를 div대신 template으로 쓰면 상하관계 1단계 무시 -->
        <template v-show="result.length">
<!-- reduce로 result 내의 요소 전부 더하기, || 옵션으로 초깃값 주기 -->
            <div>평균 시간: {{average}} ms</div>
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = 0;

    export default {
        data() {
            return{
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요.',
            }
        },
        //일반 데이터를 가공해서 쓸 때, template에서 계산도 가능하지만
        //computed는 값을 캐싱할 수 있기 때문에 유리
        computed: {
          average(){
              return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
          }
        },
        methods: {
            onReset(){
                this.result = [];
            },
            onClickScreen(){
                if(this.state === 'waiting'){
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요.';
                    timeout = setTimeout(() => {
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000);
                }else if(this.state === 'ready'){
                    clearTimeout(timeout);
                    this.state = 'waiting';
                    this.message = '너무 빨라요! 초록색이 된 후에 클릭하세요.';
                }else if(this.state === 'now'){
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요.';
                    this.result.push(endTime - startTime);
                }
            },
        },
    };
</script>

<!--이 css는 해당 컴포넌트에만 유효하다-->
<style scoped>
    #screen{
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting{
        background-color: aqua;
    }
    #screen.ready{
        background-color: red;
        color: white;
    }
    #screen.now{
        background-color: greenyellow;
    }
</style>