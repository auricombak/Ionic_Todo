import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service'; 
import { Item } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  todos: any = undefined;

  constructor(
    private dbService : DbService
  ){
  }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos(){
    this.dbService.getTodos().then((data) => {
      data = data||[]
      this.todos = data.map((item) => {
        item.isEdit = false
        return item
      })

      console.log(this.todos)
    })
  }

  deleteTodo(item){
    this.dbService.deleteTodo(item.id).then((value) => {
      this.refreshTodos() 
    })
  }

  archiveTodo(item){
    this.dbService.archiveTodo(item).then((value) => {
      this.refreshTodos() 
    })
  }


  onFileChanged(event , todo) {
    const file = event.target.files[0]
    let image
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
    todo.image = myReader.result.toString()
    }
    myReader.readAsDataURL(file);
  }

  isBrowser(){
    return document.URL.startsWith('http');
  }

  pushForm(todo){
    let updatedTodo = todo
    delete updatedTodo.isEdit
    this.dbService.editTodo(updatedTodo).then(()=>{
      todo.isEdit = false
    })
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
