#pratice7 - vuex

##- Vuex
1. vuex 인스턴스 기본 구조
	- store.js 파일
    ```javascript
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default new Vuex.Store{
        state: {}, //vue의 data와 비슷
        getters: {}, //vue의 computed와 비슷, state의 값으로 어떤 동작을 할 때, 캐싱 됨
        mutations: {}, //state를 수정할 때 사용, 동기적으로 작동함
        actions: {}, //비동기적으로 사용할 때, 혹은 여러 mutation을 연달아 실행할 때
    }
    ```
    - TicTacToe.vue 파일
    ```javascript
    <script>
    import store from './store'
    
    export default {
    	store,
        data(){
        	return ;
        },
    }
    </script>
    ```
    	- vuex는 vue의 확장 라이브러리이기 때문에 npm으로 추가 설치를 해주어야 한다.
    	- Vue.use를 사용함으로써 **vus와 vuex를 연동**시켜주어야 한다.
    	- 추가적으로 vuex 인스턴스를 사용할 **컴포넌트에서도 import하여 연동**시켜주어야 한다.
    	- vuex 인스턴스는 state, getters, mutations, actions의 4가지 필수요소로 구성되어 있다.
    	- 연결한 상태에서 TicTacToe.vue 안에서는 **this.$store.state.변수이름** 형식으로 접근할 수 있다.

2. vuex 사용하기
	- vuex export에는 일반 export와 export default가 있다.
		- export default: 가장 중요한 것만 export default를 사용하며 사용하는 측에서 불러올 때는 **import store from './store'** 형식으로 불러올 수 있다.
		- export: 그 외의 요소들을 export하는 데 쓰이며 사용하는 측에서 불러올 때는 **import {SET_WINNER} from './store'** 형식으로 불러오며 한 번에 여러 개를 불러올 수 있다.
		```javascript
        export const SET_WINNER = 'SET_WINNER'; //import {SET_WINNER} from './store'
		export const CLICK_CELL = 'CLICK_CELL';
		export const CHANGE_TURN = 'CHANGE_TURN';
		export const RESET_GAME = 'RESET_GAME';
		export const NO_WINNER = 'NO_WINNER';
        
        export default new Vuex.Store{
        state: {},
        getters: {},
        mutations: {
        	//mutations의 함수는 대문자로 명명하는 것이 규칙
        	[SET_WINNER](state, winner){
        	},
        	[CLICK_CELL](state, {row, cell}){
        	},
        	[CHANGE_TURN](state){
        	},
        	[RESET_GAME](state){
        	},
        	[NO_WINNER](state){
        	},
        	actions: {},
    		}

        ```
        	- 다음과 같이 mutations 내부의 메서드 이름은 전부 **대문자**로 명명하는 것이 규칙이며, 각 함수를 대괄호로 감싸서 외부로 export하여 사용한다.(export가 필수인 것은 아니다.)

        ```javascript
        import {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from "./store";
        
        export default {
        	methods: {
        		this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex});
        	}
        }
        ```
			- 사용할 때는 위와 같이 import를 한 후에 미리 선언한 형식에 맞게 parameter를 제공하여 사용한다.
			- **$store.commit** 을 통해 vuex 인스턴스의 함수를 사용한다.
	- mapState: vuex 인스턴스를 사용하는 컴포넌트 측에서는 vuex 인스턴스 내부의 변수를 사용하기 위해 **computed**를 사용해야만 한다.
	```javascript
    computed: {
           winner(){
               return this.$store.state.winner;
           },
           turn(){
               return this.$store.state.turn;
           },
        },
    ```
    	- 위과 같이 store에 하나씩 접근하여 메소드 형태로 변수를 할당해 주어야 한다.

    ```javascript
    import { mapState } from 'vuex';
    export default {
    	computed: {
            //store의 state를 일일이 computed에 넣어놓기 귀찮으므로 mapState를 통해 한번에 불러옴.
            ...mapState(['winner', 'turn', 'tableData']),
        },
    }
    ```
    	- 이러한 불편함을 해소하기 위해 vuex로부터 mapState를 import하고 ...mapState내부에 변수명을 적어주면 바로 접근이 가능하다.
    	- 이렇게 불러온 변수들은 해당 컴포넌트의 data()에 있는것처럼 methods에서 **this.변수이름** 과 같이 사용이 가능하다.
