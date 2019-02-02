import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class DbService {

  constructor(private storage: Storage) { }




  //Get all the todos archived
  getArchives(): Promise<any> {
    return this.storage.get('archive')
  }

  //Add the todo in archive array and delete it from todos array
  archiveTodo(jsonTodo: any): Promise<any> {

    var promise = new Promise((resolve, reject) => {

      let archives
      this.getArchives().then((data) => {
        archives = data || [];
        archives.push(jsonTodo);
        this.storage.set('archive', archives)
      })



      let todos
      //get the element in the table with the id
      this.getTodos().then((data) => {
        todos = data || [];
        let item = todos.filter((i) => { return i.id == jsonTodo.id });

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

  deleteArchive(id: number): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      let archives
      //get the element in the table with the id
      this.getArchives().then((data) => {
        archives = data || [];
        let item = archives.filter((i) => { return i.id == id });

        //remove the element from the array
        const index: number = archives.indexOf(item[0]);
        if (index !== -1) {
          archives.splice(index, 1);
        }

        //update the todos array db
        this.storage.set('archive', archives)

        resolve()

      }).catch((error) => {
        reject()
      })
    })
    return promise

  }

  //#############################################################################//

  //Add a todo
  getTodos(): Promise<any> {
    return this.storage.get('todo')
  }

    //Get a todo by ID
  getTodoById(id ): Promise<any> {

    var promise = new Promise((resolve, reject) => {
      let todos = [];
      this.getTodos().then((todos) => {
        let todo = todos.find(function(todo) {
          return todo.id == id;
        });
        if(todo != null){
          resolve(todo)
        }else{
          reject()
        }

      });

      
    });
    return promise
  }

  getTodosByCategories(categories): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      let todos = [];
      this.getTodos().then((todos) => {
        let todo = todos.filter(function(item) {
          return item.categories.some(r => categories.includes(r))
        });
        if(todo.length>0){
          resolve(todo)
        }else{
          reject()
        }

      });

      
    });
    return promise
  }

  getTodoByTitle(title ): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      let todos = [];
      this.getTodos().then((todos) => {
        let todo = todos.filter(function(todo) {
          return todo.title.includes(title);
        });
        if(todo != null){
          resolve(todo)
        }else{
          reject()
        }

      });

      
    });
    return promise
  }

//Add a todo
  addTodo(jsonTodo: any) {
    let todos
    this.getTodos().then((data) => {
      todos = data || [];
      todos.push(jsonTodo);
      this.storage.set('todo', todos)
    })
  }



  editTodo(jsonTodo: any): Promise<any> {
    var promise = new Promise((resolve, reject) => {

      let todos
      console.log(jsonTodo)
      //get the element in the table with the id
      this.getTodos().then((data) => {
        todos = data || [];
        todos = todos.map((i) => {
          if (i.id == jsonTodo.id) {
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

  deleteTodo(id: number): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      let todos
      //get the element in the table with the id
      this.getTodos().then((data) => {
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
