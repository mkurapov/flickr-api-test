import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    inputs: ['url', 'buttonActivated', 'photoUrl'],
    directives: [MyCmp],
    template: `
      <my-cmp [photo-url]=photoUrl></my-cmp>
    `

})

class MyCmp {
  @Input('photo-url') photoUrl;
}

@Component({
  selector: 'my-cmp',

  template : `
  <h1>My First Angular 2 App</h1>
  <button (click)="searchPhoto()">Search</button>
  <div class="photo" [ngStyle]="{'background-image': url('photoUrl')}"></div>
  <a [hidden]="!buttonActivated" href="{{url}}">result: {{id}}</a>`
})

export class AppComponent {

    API_KEY:string = 'e2e36ae3030ea4ef5f9144687ac93509';
    url:string = "";
    buttonActivated:boolean = false;
    photos:Array<Photo>=[];
    photoUrl:string;


    constructor(public http: Http){}

    searchPhoto(){

            var tag = 'purple';
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.API_KEY + '&tags=' + tag + '&format=json&nojsoncallback=1';
            console.log(url);
            this.url = url;
            this.buttonActivated = true;
            this.http.get(url).map(res => res.json()).subscribe(
                data => {
                    this.photoUrl = 'https://farm'+data.photos.photo[0].farm+'.staticflickr.com/'+data.photos.photo[0].server+'/'+data.photos.photo[0].id+'_'+data.photos.photo[0].secret+'.jpg';
                    console.log(this.photoUrl);
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
