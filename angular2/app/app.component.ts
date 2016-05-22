import {Component, Input} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    inputs: ['url', 'buttonActivated'],
    templateUrl:'./templates/main.html'

})


export class AppComponent {

    API_KEY:string = '9dbd11a573a92b7962c238c8d7611492';
    url:string = "";
    buttonActivated:boolean = false;
    photos:Array<Photo>=[];
    testUrl:string = "";


    constructor(public http: Http){}

    searchPhoto(color: string){

            var colorMap = {
              'red':'0',
              'orange':'2',
              'yellow':'4',
              'green':'5',
              'blue':'8',
              'purple':'9',
              'black':'e',
              'white':'c'
            }


            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.API_KEY + '&tags=' + color + '&color_codes='+colorMap[color]+'&format=json&nojsoncallback=1';
            var maxPhotos = 5; //5 + 1 = 6 photos
            //console.log(url);
            this.url = url;
            this.buttonActivated = true;
            this.http.get(url).map(res => res.json()).subscribe(
                data => {
                    //this.photoUrl = 'https://farm'+data.photos.photo[0].farm+'.staticflickr.com/'+data.photos.photo[0].server+'/'+data.photos.photo[0].id+'_'+data.photos.photo[0].secret+'.jpg';
                    //console.log(this.photoUrl);
                    this.photos = [];

                    for(var i in data.photos.photo)
                    {
                      if (parseInt(i) > maxPhotos)  //i starts at 0
                      {
                        break;
                      }
                      var newPhoto = data.photos.photo[i];

                      this.photos.push(new Photo(newPhoto.id, newPhoto.server, newPhoto.farm, newPhoto.secret));

                    }

                },
                err => {console.log (err)}
                );

     }


}

class Photo
{
    url:string = "";

    constructor(public id:string,public server:string,public farm:string,public secret:string){
        this.url = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'.jpg';
    }

}
