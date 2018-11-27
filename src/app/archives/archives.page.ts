import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service'; 
import { Item } from '@ionic/angular';

@Component({
  selector: 'app-archives',
  templateUrl: 'archives.page.html',
  styleUrls: ['archives.page.scss']
})

export class ArchivesPage implements OnInit {

  todos: any = undefined;

  constructor(
    private dbService : DbService
  ){
  }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos(){
    this.dbService.getArchives().then((data) => {
      data = data||[]
      this.todos = data.map((item) => {
        item.isEdit = false
        return item
      })

      console.log(this.todos)
    })
  }

  deleteTodo(item){
    this.dbService.deleteArchive(item.id).then((value) => {
      this.refreshTodos() 
    })
  }


}
