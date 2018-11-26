import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  constructor(private storage: Storage) { }

  getTodos(): Promise<any> {
    return this.storage.get('todo')
  }

  addTodo(jsonTodo : any){
    let todos
    this.getTodos().then((data)=>{
      todos = data || [];
    jsonTodo.id = UUID.UUID();

    console.log(jsonTodo.id)
    todos.push(jsonTodo);
    this.storage.set('todo', todos)
    })
  }

  editTodo(jsonTodo : any): Promise<any> {
    var promise = new Promise((resolve, reject) =>{

    let todos
    console.log(jsonTodo)
    //get the element in the table with the id
    this.getTodos().then((data)=>{
        todos = data || [];
        todos = todos.map((i) => { 
        if(i.id == jsonTodo.id){
          i = jsonTodo
          console.log(i)
        }
        return i
      });
      this.storage.set('todo', todos)
      resolve()
    }).catch((error) => {
      reject()
    })

  })
  return promise
    
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
      
      }).catch((error) => {
        reject()
      })
    })
    return promise

  }

}
