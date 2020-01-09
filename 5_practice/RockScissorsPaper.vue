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

<script>
    const rspCoords = {
        바위: '0',
        가위: '-142px',
        보: '-284px',
    };

    export default {
        data() {
            return{
                //나중에 봤을때 그냥 px만 넣으면 뭔지 모르니까 변수로 넣어주기
                imgcoord: rspCoords.바위,
                score: 0,
                result: '',
            }
        },
        computed: {
            computedStyleObject(){
                return { background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgcoord} 0`,
                };
            },
        },
        methods: {
            onClickButton(choice){

            }
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