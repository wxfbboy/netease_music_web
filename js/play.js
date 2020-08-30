$(function () {
    let currentIndex = 0;
    let audio = $("#audio").get(0);
    $("body").on("click",".play",function () {
        if(audio.paused){
            audio.play();
            changePlayBtnStyle('pause');
        }
        else{
            audio.pause();
            changePlayBtnStyle('play');
        }
    });
    $("body").on("click",".step-forward",function () {
        let songTotals = localStorage.getItem('songTotals');
        currentIndex = ( currentIndex + 1) >= songTotals?0:currentIndex+1;
        audio.pause();
        changePlayBtnStyle('play');
        playMusic(currentIndex);
    });
    $("body").on("click",".step-backward",function () {
        let songTotals = localStorage.getItem('songTotals');
        currentIndex = ( currentIndex - 1) < 0?songTotals-1:currentIndex-1;
        alert(currentIndex);
        changePlayBtnStyle('play');
        playMusic(currentIndex);
    });
    function playMusic(index) {
        let trs = $("#infoList_playlist").find("tr");
        let currentTR = trs.get(index);
        let mp3Url = currentTR.dataset.mp3Url;
        $(audio).prop("src",mp3Url);
        audio.play();
        changePlayBtnStyle('pause');
        $(trs).find("td.index").each((index,td)=>{
            $(td).html(td.dataset.num).removeClass('active');
        });
        $(currentTR).find("td.index").html("<i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i>").addClass("active");
    }
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