import {Component, Input} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    inputs: ['url', 'buttonActivated', 'photoUrl'],
    templateUrl:'./templates/main.html'

})


export class AppComponent {

    API_KEY:string = 'e2e36ae3030ea4ef5f9144687ac93509';
    url:string = "";
    buttonActivated:boolean = false;
    photos:Array<Photo>=[];
    photoUrl:string;


    constructor(public http: Http){}

    searchPhoto(){

            var tag = 'blue';
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.API_KEY + '&tags=' + tag + '&format=json&nojsoncallback=1';
            console.log(url);
            this.url = url;
            this.buttonActivated = true;
            this.http.get(url).map(res => res.json()).subscribe(
                data => {
                    //this.photoUrl = 'https://farm'+data.photos.photo[0].farm+'.staticflickr.com/'+data.photos.photo[0].server+'/'+data.photos.photo[0].id+'_'+data.photos.photo[0].secret+'.jpg';
                    //console.log(this.photoUrl);
                    this.photos = [];

                    for(var i in data.photos)
                    {
                      this.photos.push(new Photo(data.photos[i].id, data.photos[i].server, data.photos[i].farm, data.photos[i].secret));
                    }
                },
                err => {console.log (err)}
                );


     }

}

class Photo
{
    constructor(public id:string,public server:string,public farm:string,public secret:string){

    }
}
