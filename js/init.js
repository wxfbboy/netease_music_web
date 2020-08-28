$(function () {
   let info = {
       "nick-name":"赤島工造",
       "id":"69380940"
   }
   requestAPI({
       url:window.requestURL,
       data:{
           "API_type":'get_playlist_info',
           "queryString":{
                "id":info.id
           }
       },
       callback:function(data) {
            console.log(data.result.tracks);
       }
   });
}());