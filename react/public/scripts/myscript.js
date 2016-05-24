
var API_KEY = '9dbd11a573a92b7962c238c8d7611492';


var App = React.createClass({

  getInitialState: function() {

    return {photos:[], url:'', maxPhotos: 6};
  },


  searchPhoto: function(color)
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


          this.state.url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&tags=' + color + '&color_codes='+colorMap[color]+'&format=json&nojsoncallback=1';
          var maxPhotos = 5;  //amount of photos to display on the webpage
          console.log(this.state.url);
          console.log(color);
          var that = this;
          $.getJSON(this.state.url, function(data) {

            that.setState({photos: data.photos.photo, maxPhotos: 6});

            });

            //console.log(this.state.photos.photo[0].id);



   },

  render: function()
  {
      var photosToShow = [];
      for (var i = 0; i < this.state.photos.length; i++)
      {
          var photo = this.state.photos[i];
          if (this.state.maxPhotos === 0) {

            break;
          }
          else {
              var photoUrl = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
              var photoStyle = { backgroundImage: 'url(' + photoUrl + ')' }
              photosToShow.push(<div className="photo" style={photoStyle}></div>);
              this.state.maxPhotos = this.state.maxPhotos - 1;
          }
      }


    // });


    return (
    <div className="app-wrapper">
        <h1>flickr by react</h1>
        <button onClick={this.searchPhoto.bind(this, 'red')} className="red"></button>
        <button onClick={this.searchPhoto.bind(this, 'orange')} className="orange"></button>
        <div className="photos-container">
            {photosToShow}
        </div>
      </div>
    );
  }


});

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
