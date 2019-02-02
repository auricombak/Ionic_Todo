import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DbService } from '../services/db.service'; 

declare var cordova;

@Injectable({
  providedIn: 'root'
})



export class NotificationService {

  
  constructor(private dbService: DbService) {
    this.eventNotification(this.dbService)
   }


   eventNotification(dbService){
    cordova.plugins.notification.local.on('fait', function (notification) {
      dbService.getTodoById(notification.id).then((todo) => {
        alert(todo.title)
        dbService.archiveTodo(todo).then((value) => {
          alert("Success")
        })
      });
    });
   }

   sendNotification(todo : any){
     
    cordova.plugins.notification.local.schedule({
      id: todo.id,
      title: todo.title,
      text: todo.description,
      actions: [{
        id: 'fait',
        title: 'Fait',
        smallIcon: 'https://img.icons8.com/color/48/000000/todo-list.png'
      }],
      trigger: { at : new Date(todo.date+','+todo.hour) },
    });

   }

   updateNotification(todo : any){
     
    cordova.plugins.notification.local.schedule({
      id: todo.id,
      title: todo.title,
      text: todo.description,
      trigger: { at : new Date(todo.date+','+todo.hour) },
    });
    
   }

   cancelNotification(id : number){
     cordova.plugins.notification.local.cancel({
       id:id
     });
   }

}
