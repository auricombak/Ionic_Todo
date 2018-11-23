import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  constructor(private storage: Storage) { }

  getTodos(): Promise<any> {
    return this.storage.get('todo')
  }

  getTodoPerName(name : string){
    let todos

    this.getTodos().then((data)=>{
      todos = data || [];
      let item = todos.filter((i) => { return i.name == name });
      return item[0];
    })

  }

  addTodo(jsonTodo : any){
    let todos
    this.getTodos().then((data)=>{
      todos = data || [];
    console.log(todos)
    todos.push(jsonTodo);
    console.log(jsonTodo)
    this.storage.set('todo', todos)
    })
  }

}
