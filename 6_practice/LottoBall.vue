<template>
    <div class="ball" :style="background">{{number}}</div>
</template>

<script>
    export default {
        name: 'LottoBall',
        //props로 받은 변수로 바꾸는 것은 금지!!!(readonly)
        props: {
            number: Number,
        },
        //watch와 비슷하지만, 새로운 값 하나를 리턴한다.
        computed: {
            background(){
                let background;
                if(this.number <= 10){
                    background = 'red';
                }else if(this.number <= 20){
                    background = 'orange';
                }else if(this.number <= 30){
                    background = 'yellow';
                }else if(this.number <= 40){
                    background = 'blue';
                }else{
                    background = 'green';
                }
                return {
                    background,
                };
            }
        },
    }
</script>

<style>
    .ball{
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
    }
</style>