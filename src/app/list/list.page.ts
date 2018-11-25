import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service'; 

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  private todos

  constructor(
    private dbService : DbService
  ){
    this.refreshTodos()
  }

  refreshTodos(){
    this.dbService.getTodos().then((data) => {
    this.todos = data})
  }



  ngOnInit() {
  }

  deleteTodo(item){
    this.dbService.deleteTodo(item.id).then((value) => {
      this.refreshTodos() 
    })
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
