$(function () {
    $("body").on("click",".play",function () {
        let audio = $("#audio").get(0);
        if(audio.paused){
            audio.play();
            changePlayBtnStyle('pause');
        }
        else{
            audio.pause();
            changePlayBtnStyle('play');
        }
    })
    function changePlayBtnStyle(type) {
        switch (type) {
            case 'play':
                $(".play").html("<i class=\"fas fa-play\" aria-hidden=\"true\"></i>");
                break;
            case 'pause':
                $(".play").html("<i class=\"fas fa-pause\" aria-hidden=\"true\"></i>");
                break;
        }
    }
});