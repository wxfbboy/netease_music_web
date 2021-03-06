$(function () {
    let currentIndex = 0;
    let isDrag = false;
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
        changePlayBtnStyle('play');
        playMusic(currentIndex);
    });
    $("#audio").on("play",function () {
        $(".disc_arc").css("animation-play-state","running");
    });
    $("#audio").on("pause",function () {
        $(".disc_arc").css("animation-play-state","paused");
    });
    $("#audio").on("timeupdate",function () {
        if(!isDrag) {
            let currentTime = formatTime(this.currentTime);
            let duration = formatTime(this.duration);
            let percent = (this.currentTime / this.duration) * 100;
            percent = percent.toFixed(2) + '%';
            $("#progress_current").css("width", percent);
            $(".timer1").html(currentTime.I + ":" + currentTime.S);
            $(".timer2").html(duration.I + ":" + duration.S);
        }
    });
    $("#audio").on("ended",function () {
        let songTotals = localStorage.getItem('songTotals');
        let nextIndex = currentIndex + 1;
        audio.pause();
        changePlayBtnStyle('play');
        if(nextIndex < songTotals){
            currentIndex = nextIndex;
            playMusic(currentIndex);
        }
    });
    $("#infoList_playlist").on('dblclick',"tr",function () {
        currentIndex = parseInt(this.dataset.index);
        audio.pause();
        changePlayBtnStyle('play');
        playMusic(currentIndex);
    })
    $("body").on("mousedown",".current_btn",function (event) {
        let currentTime = 0;
        isDrag = true;
        const current_btn_width = event.clientX-this.getBoundingClientRect().left;
        const moveArc = function (event) {
            let box_width = $(".progressbar").get(0).getBoundingClientRect().width;
            //((触发移动事件时dom的坐标点X - 拖拉按钮左边边距 - 起始点(即边框)坐标点X) = 进度条的长度)/边框的总长度
            let move_distance = event.clientX - current_btn_width - $(".progressbar").get(0).getBoundingClientRect().left;
            let player_percent = (move_distance/box_width*100);
            player_percent = player_percent <= 0 ? 0 : (player_percent>100?100:player_percent);
            $(".progress_current").width(player_percent+"%");
            currentTime = audio.duration*(player_percent/100);
            currentTimeObj = formatTime(currentTime);
            $(".timer1").html(currentTimeObj.I+":"+currentTimeObj.S);
        }
        const upArc = function(event){
            $("body").off("mousemove");
            $("body").off("mouseup");
            audio.currentTime = currentTime;
            isDrag = false;
        }
        $("body").on("mousemove",moveArc);
        $("body").on("mouseup",upArc);
    });
    $("body").on("click",".poster",function () {
        $("#pageSongDetail").css("opacity","1");
        $("#pageSongDetail").css("top","60px");
        $("#pageSongDetail").css("bottom","-60px");
        $("#pageSongDetail").css("right","0");
    });
    $("body").on("click","#btnCompressPlayBox",function () {
        $("#pageSongDetail").css("opacity","0");
        $("#pageSongDetail").css("top","100%");
        $("#pageSongDetail").css("bottom","100%");
        $("#pageSongDetail").css("right","100%");
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
        changeSmallWindows(index);
        loadSongDetail(index);
        loadSongLysrc(index);
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
    setInterval(function () {
        if(audio.readyState==4) {
            let timeRange = audio.buffered;
            let bufferedTime = timeRange.end(timeRange.length - 1);
            let bufferedPercent = (bufferedTime / audio.duration).toFixed(2) * 100+"%";

            $(".progress_cache").css("width", bufferedPercent);
        }
    },1000);
});