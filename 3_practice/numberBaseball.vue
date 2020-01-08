<template>
    <div>
        <h1>{{result}}</h1>
<!-- v-on을 @로 대체할 수 있고, prevent 추가함으로써 디폴트 속성 무력화 -->
        <form @submit.prevent="onSubmitForm">
            <input minlength="4" maxlength="4" v-model="value" ref="answer">
            <button type="submit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const array = [];
        for(let i = 0; i < 4; i += 1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    };

    export default {
        data() {
            return{
                answer: getNumbers(),
                tries: [],
                value: '',
                result: '',
            }
        },
        methods: {
            onSubmitForm(e){
                if(this.value === this.answer.join('')){ //value는 String, answer는 배열이므로!!!!, 정답일때
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = '홈런';
                    alert('게임을 다시 실행합니다.');
                    this.value = '';
                    
                    this.answer = getNumbers();
                    this.tries = [];
                    this.$refs.answer.focus();
                }else{ //정답 틀렸을 때
                    //화면과는 관련없는 데이터는 data에 써주지 않는다.
                    let strike = 0;
                    let ball = 0;
                    //문자열을 배열로 바꾸는 코드
                    const answerArray = this.value.split('').map(v => parseInt(v));

                    for(let i = 0; i < 4; i += 1){
                        if(answerArray[i] === this.answer[i]){ //숫자 자릿수 모두 정답
                            strike++;
                        }else if(this.answer.includes(answerArray[i])){ //숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    });
                    this.value = '';
                    this.$refs.answer.focus();

                    if(this.tries.length >= 10){ //10번째 시도
                        this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                        alert('게임을 다시 실행합니다.');
                        this.value = '';
                        this.answer = getNumbers();
                        this.tries = [];
                        this.$refs.answer.focus();
                    }
                }
            }
        },
    };
</script>

<style>
</style>