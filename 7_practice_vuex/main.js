//package.json의 vue를 가져오는 것 파이썬과 비슷? 최신문법
import Vue from 'vue';
import TicTacToe from './TicTacToe';

//vue 인스턴스!
new Vue(TicTacToe).$mount("#root");