import Vue from 'vue';
import Vuex from 'vuex';

//Vue랑 Vuex 연결
Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER'; //import {SET_WINNER} from './store'
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

//가장 중요한 것만 export default, 아닌건 그냥 export
export default new Vuex.Store({ //import store from './store'
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    }, // vue의 data와 비슷
    getters: {
        turnMessage(state){
            return state.turn + '님이 승리하셨습니다.';
        }
    }, //vue의 computed와 비슷, 기존의 state를 활용하여 무언가를 할 때. 캐싱됨.
    mutations: {
        //mutations의 함수는 대문자로 명명하는 것이 규칙
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}){
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['' ,'', ''],
                ['', '', ''],
            ]
        },
        [NO_WINNER](state){
            state.winner = '';
        }
    }, //state를 수정할 때 사용. 동기적으로
    actions: {

    }, //비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때.
});