import {Component, Input} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    inputs: ['photos'],
    templateUrl:'./templates/main.html'

})


export class AppComponent
{

    API_KEY:string = '9dbd11a573a92b7962c238c8d7611492';
    url:string = "";
    photos:Array<Photo>=[];

    //includes http object to be used to get data in searchPhoto method
    constructor(public http: Http){}

    searchPhoto(color: string)
    {
            // maps colors to colorcode used in api call
            var colorMap =
            {
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
            var maxPhotos = 6;  //amount of photos to display on the webpage
            this.url = url;

            //get json data from api call
            this.http.get(url).map(res => res.json()).subscribe(
                data => {

                    //removes all photos in the array
                    this.photos = [];

                    for(var i in data.photos.photo)
                    {
                      if (parseInt(i) > (maxPhotos - 1))  //maxPhotos - 1, since i begins at 0
                      {
                        break;
                      }
                      var newPhoto = data.photos.photo[i];

                      //adds new photo object to photos array
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
