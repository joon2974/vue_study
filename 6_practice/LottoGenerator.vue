<template>
    <div>
        <div>당첨 숫자 - watch</div>
        <div id="결과창">
<!-- v-for는 반드시 key를 할당할 것! -->
            <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번 더!</button>
    </div>
</template>

<script>
    function getWinNumbers(){
        console.log('getWinNumbers');
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];
        while(candidate.length > 0){
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
        return [...winNumbers, bonusNumber];
    }

    //자식 컴포넌트 등록
    import LottoBall from "./LottoBall";

    const timeouts = [];
    export default {
        components: {
            'lotto-ball': LottoBall
        },
        data() {
            return{
                redo: false,
                winBalls: [],
                //winNumbers에 로또번호 7개 한번에 넣어놓고, 한개씩 순서대로 winBalls에 넘겨주면서 보여줌
                winNumbers: getWinNumbers(),
                bonus: null,
            }
        },
        methods: {
            onClickRedo(){
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
            },
            showBalls(){
                //let을 쓰면 closer문제가 생기지 않는다.
                for (let i = 0; i < this.winNumbers.length - 1; i++){
                    timeouts[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i + 1) * 1000);
                }
                timeouts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            },
        },
        mounted() {
            this.showBalls();
        },
        beforeDestroy() {
            timeouts.forEach((t) => {
                clearTimeout(t);
            });
        },
        //특정 값이 바뀌면 특정 동작을 하도록 감시, watch는 지양할 것. 최후의 수단
        //computed와 비슷하지만 하나의 값이 아닌 어떤 동작을 한다.
        watch: {
            //data의 winBalls를 감시
            winBalls(value, oldValue){
                console.log(value, oldValue);
                if(value.length === 0){
                    this.showBalls();
                }
            }
        },
    };
</script>

<style scoped>

</style>