function resetLysrc(lysrcs) {
    lysrcs = formatLyric(lysrcs);
    loadLysrc(lysrcs);
    const minHeight = $("#lrcContainer").height()/2;
    let scrollTop = 0;
    $("#lrcBox").find(".lrc").each((i,p)=>{
        scrollTop = p.offsetTop <= minHeight? 0 : p.offsetTop - minHeight;
        p.dataset.scrollTop = scrollTop;
    })
}
$(function () {
    $("#audio").on("timeupdate",function () {
        $("#lrcBox").find(".lrc").each((i,p)=>{
            if(Math.abs(this.currentTime - p.dataset.timepoint)<1){
                $(p).addClass("current").siblings().removeClass('current');
                scrollLyric(i,p.dataset.scrollTop)
            }
        })
    })
})
let currentLine = -1;
function scrollLyric(i,scrollTop) {
    $("#lrcContainer").stop().animate({'scrollTop':scrollTop},300);
    currentLine = i;
}
function loadLysrc(lysrcs) {
    $("#lrcBox").html("");
    $.each(lysrcs,(i,lysrc)=>{
        let p = document.createElement('p');
        p.innerHTML = lysrc.lrcstr;
        p.dataset.timepoint = lysrc.timepoint;
        p.dataset.index = i;
        p.className = "lrc";
        $("#lrcBox").append(p);
    });
}