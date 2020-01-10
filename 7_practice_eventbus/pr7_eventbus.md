# Practice7_Eventbus

##1. Vue 문법
1. EventBus
	- 앞선 예제에서와 같이 각 컴포넌트에 이벤트가 흩뿌려져 있으면 어디서 어떤 이벤트가 발생하는지 파악도 어렵고 코드 수정도 어렵다.
	- Vuex와 비슷한 개념인 EventBus를 통해 이벤트를 루트 컴포넌트에서 한번에 관리할 수 있다.
	#### EventBus.js 라는 빈 Vue 인스턴스를 포함한 파일을 생성
	```javascript
    import Vue from 'vue';

	//빈 vue를 Event bus라고 보면 된다.
	export default new Vue();
    ```
    
    #### TicTacToe.vue에서 eventbus를 사용
    ```javascript
    <script>
    import EventBus from "./EventBus";
    
    export default{
    	methods: {
            onClickTd(rowIndex, cellIndex){
                const rootData = this.$root.$data;
        },
        created() {
            EventBus.$on('clickTd', this.onClickTd);
        },
    }
    ```
    - 위와 같이 루트 컴포넌트에서 EventBus를 import한 후 $on을 통해 메소드를 이어준다.
    - 위 코드에서는 clickTd에 onClickTd 메소드를 이어주었다.
    - created() 내부에 써준다.
    
    #### TdComponent.vue에서 emit을 통해 clickTd와 onClickTd를 이어줌. 이 때, 매개인자로 rowIndex와 cellIndex를 넘겨준다.
    ```javascript
    methods: {
            onClickTd(){
                //이미 그 칸을 누가 눌렀으면 함수 종료해버리기
                if(this.cellData) return;

                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            }
        }
    ```