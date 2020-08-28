$(function () {
   let info = {
       "nick-name":"赤島工造",
       "playlist":69380940
       // playlist:"157182977"
   }
   requestAPI({
       url:window.requestURL,
       data:{
           "API_type":'get_playlist_info',
           "queryString":{
                "id":info.playlist
           }
       },
       callback:function(data) {
           infoList_playlist(data.result.tracks);
       }
   });
   function infoList_playlist(tracks) {
       $.each(tracks,(index,track)=>{
           let num = index+1>=10?index+1:"0"+(index+1),ablum_name=track.name,artist_arr=[],artist_str = '',duoration = formatDate(track.duration/1000);
           let tr = document.createElement("tr");
           $.each(track.artists,(i,v)=>{
               artist_arr.push(v.name);
           })
           artist_str = artist_arr.join("/");
           let td = `<td class="index" data-num="${num}">${num}</td>`+
               `<td><i class="fa fa-heart" aria-hidden="true"></i><i class="fa fa-download" aria-hidden="true"></i></td>`+
               `<td>${track.name}</td>`+
               `<td>${artist_str}</td>`+
               `<td>${ablum_name}</td>`+
               `<td>${duoration.I}:${duoration.S}</td>`;
           tr.innerHTML = td;
           $("#infoList_playlist").append(tr);
       })
   }
}());