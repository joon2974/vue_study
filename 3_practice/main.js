//package.json의 vue를 가져오는 것 파이썬과 비슷? 최신문법
import Vue from 'vue';
import numberBaseball from './numberBaseball';

//vue 인스턴스!
new Vue(numberBaseball).$mount("#root");