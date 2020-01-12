export default {
  data: [
    {todo: '오픈케어랩 출근하기', state:true}
  ],
  list(tab){
    return new Promise(res => {
      if(tab === 'todo') res(this.data.filter(item => item.state === true));
      if(tab === 'finish') res(this.data.filter(item => item.state === false));
    })
  },
  add(todo = ''){
    todo = todo.trim();
    if(!todo) return;

    const state = true;
    this.data.push({todo, state});
  },
  finish(index){
    this.data.filter(item => item.state === true)[index].state = false;
  },
  reset(index){
    this.data.filter(item => item.state === false)[index].state = true;
  },
  remove(removeItem){
    this.data = this.data.filter(item => item.todo !== removeItem.todo);
  }
}
