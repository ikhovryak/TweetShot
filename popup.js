

document.addEventListener('DOMContentLoaded', function(){
    var checkPageButton = document.getElementById('activateButton');
    checkPageButton.addEventListener('click', function(){
        chrome.tabs.getSelected(null, function(tab){
            var working = true;
        })
    })
})

var s = function(sketch){

    sketch.setup = function() {
        // Canvas & color settings
        var cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cnv.position(0, 0, 'fixed');
        deltaY = 0;
        sketch.fill(0);
        sketch.rect(0,0,500,500);
    }

}

var myp5 = new p5(s);