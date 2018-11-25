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
    jsonTodo.id = todos.length
    todos.push(jsonTodo);
    this.storage.set('todo', todos)
    })
  }

  deleteTodo(id : number): Promise<any> {
    var promise = new Promise((resolve, reject) =>{
      let todos
      //get the element in the table with the id
      this.getTodos().then((data)=>{
        todos = data || [];
      let item = todos.filter((i) => { return i.id == id });
  
      //remove the element from the array
      const index: number = todos.indexOf(item[0]);
      if (index !== -1) {
        todos.splice(index, 1);
      }
  
      //update the todos array db
      this.storage.set('todo', todos)
  
      resolve()
      
      }).catch(function(error) {
        reject()
      })
    })
    return promise

  }

}
