import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service'; 
import { Item, Refresher } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var cordova;

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  todos: any = undefined;
  myDate: String = new Date().getFullYear() + "-" + (new Date().getMonth()-1) + "-" + new Date().getDate();
  sortBool : Boolean
  searchKeyWord : string
  categoriesPicked : Array<string>;
  listCategories: Array<string> = ["sport", "travail", "loisir", "administratif", "etudes"];

  constructor(
    private dbService : DbService,
    private platform : Platform,
    private notificationService : NotificationService,
    private camera : Camera
  ){
    this.sortBool = true
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; //January is 0!
    let year = today.getFullYear();
    let heures = today.getHours();
    let minutes = today.getMinutes();
    let dd
    let mm
    let hh
    let mn
    if (day < 10) {
      dd = '0' + day;
    }else{
      dd = '' + day; 
    }
    if (month < 10) {
      mm = '0' + month;
    }else{
      mm = month
    }
    if(heures <10){
      hh = '0' + heures
    }else if(heures == 0 ){
      hh = '00'
    }else{
      hh = heures
    }
    if(minutes <10){
      mn = '0' + minutes
    }else if(minutes == 0 ){
      mn = '00'
    }else{
      mn = minutes
    }
    this.myDate = year + '-' + mm  + '-' + dd + ' ' + hh + ':' +mn;
  }

  ngOnInit() {
    this.getTodos()
  }

  optionsPicked(){
    //TODO filter by categorie
    if(this.categoriesPicked.length != 0){
    this.dbService.getTodosByCategories(this.categoriesPicked).then((data) => {
      this.todos = data||[]
    })
  }
  }

  //Link with searchBar, display all todos with search contained in title 
  getItems($event){
    this.dbService.getTodoByTitle(this.searchKeyWord).then((data) => {
      this.todos = data||[]
    })

  }


  refresh(){
    if(this.sortBool){
      this.sortDate();
    }else{
      this.sortTitle();
    }
  }

  getTodos(){
    this.dbService.getTodos().then((data) => {
      data = data||[]
      this.todos = data.map((item) => {
        item.isEdit = false
        return item
      })
    })
  }

  sortDate(){
    var sortable = [];
    var sorted = [];
    this.todos.forEach(todo => {

            sortable.push([todo, todo.date+todo.hour])
          

    });
    sortable.sort(function(a, b) {
      if(a[1].toLowerCase() < b[1].toLowerCase()) { return 1; }
      if(a[1].toLowerCase() > b[1].toLowerCase()) { return -1; }
      return 0;
    });
    sortable.forEach(tuple => {
      sorted.push(tuple[0])
    });
    this.todos = sorted;
  }

  sortTitle(){
    var sortable = [];
    var sorted = [];
    this.todos.forEach(todo => {

            sortable.push([todo, todo.title])
          

    });
    sortable.sort(function(a, b) {
      if(a[1].toLowerCase() < b[1].toLowerCase()) { return -1; }
      if(a[1].toLowerCase() > b[1].toLowerCase()) { return 1; }
      return 0;
    });
    sortable.forEach(tuple => {
      sorted.push(tuple[0])
    });
    this.todos = sorted;
  }

  //TODO//
  sort($event){
    if($event.target.value == "m"){
      this.sortBool = false
    }
    else{
      this.sortBool = true
    }
    
    this.refresh()
  }

  deleteTodo(item){
    if(this.platform.is('android')){
      this.notificationService.cancelNotification(item.id);
    }
    this.dbService.deleteTodo(item.id).then((value) => {
      this.getTodos()
    })
  }

  archiveTodo(item){
    this.dbService.archiveTodo(item).then((value) => {
      this.getTodos()
    })
  }

  //##################################################

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
    if(this.platform.is('android') || this.platform.is('ios')) {
      return false;
    } else {
      return true;
    }
  }

  pushForm(todo){
    let updatedTodo = todo
    delete updatedTodo.isEdit
    this.dbService.editTodo(updatedTodo).then(()=>{
      // this.getTodos()
    })
    if(this.platform.is('android')){
      this.notificationService.updateNotification(todo);
    }

  }
  pictureFromCamera(todo){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.takePhoto(options, todo);
  }
  pictureFromGallery(todo){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.takePhoto(options, todo);
  }

  async takePhoto( options : CameraOptions, todo){
    try{
      //Take picture and store result in result
      const result = await this.camera.getPicture(options);

      todo.image = 'data:image/jpeg;base64,' + result;
    }
    catch(e){
      console.error(e);
    }
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
