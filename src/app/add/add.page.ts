import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const DATABASE_FILE_NAME: string = 'data.db';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss'],
})



export class AddPage {

  constructor(private camera: Camera, private sqlite: SQLite) { }

  private db: SQLiteObject;

  listCategories: Array<string> = ["cat1", "cat2", "cat3"];

  image : string;

  //Todo JSON Object
  todo = {
    title : '',
    description : '',
    categories: [],
    date : '',
    hour : ''
  }

  private createDataBaseFile() : void{
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        console.log('Bdd Créée');
        this.db = db;
        this.createTables();
    
      })
      .catch(e => console.log(e));
  }

  private createTables() : void{
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `mydb`.`todo` ( '+
      '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,'+
      '`title` VARCHAR(45) NOT NULL,'+
      '`description` VARCHAR(100) NOT NULL,'+
      '`date` DATE NOT NULL,'+
      '`time` VARCHAR(45) NOT NULL,'+
      '`category` VARCHAR(45) NULL,'+
      '`image` VARCHAR(45) NULL,'+
      'PRIMARY KEY (`id`))', [])
    .then(() => console.log('Executed SQL'))
    .catch(e => console.log(e));
  }

  pictureFromCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.takePhoto(options);
  }

  pictureFromGallery(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.takePhoto(options);
  }

  async takePhoto( options : CameraOptions){
    try{
      //Take picture and store result in result
      const result = await this.camera.getPicture(options);

      this.image = 'data:image/jpeg;base64,' + result;
    }
    catch(e){
      console.error(e);
    }
  }
  

  logForm() {
    console.log(this.todo)
  }



}

// constructor(private storage: Storage, private camera: Camera) { 
//   storage.set('name', 'Max');
  
//   storage.get('age').then((val) => {
//     console.log('Your age is', val);
//   });
// }