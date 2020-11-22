// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas colorMode HSB frameRate background width height stroke
   noFill noStroke keyCode rect UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW */

let windowX, windowY, selectionX, selectionY, locked, shotLocked, startedX, startedY, finalX, finalY, deltaY, imageBase64, working, empty;

chrome.storage.local.get('working', (response) => {
    if (response.working) {
        empty = 0;
    }
  });
  chrome.runtime.onMessage.addListener(request => {
    if (request.working) {
      working = true;
    }
  });

var s = function(sketch){

    sketch.setup = function() {
        
        // Canvas & color settings
        var cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cnv.position(0, 0, 'fixed');
        deltaY = 0;
    }

    sketch.draw = function(){
    }

    sketch.mousePressed = function() {
        shotLocked = false;
        if (sketch.mouseX < sketch.windowWidth && sketch.mouseY < sketch.windowHeight && sketch.mouseX >= 0 && sketch.mouseY >= 0 && working == true) {
            locked = true;
            startedX = sketch.mouseX;
            startedY = sketch.mouseY;
        } else {
        locked = false;
        }
    }
    
    sketch.mouseDragged = function() {
        if (locked) {
            sketch.clear();
            sketch.noFill();
            sketch.rect(startedX, startedY, sketch.mouseX - startedX, sketch.mouseY - startedY);
        }
    }
    
    sketch.mouseReleased = function() {
        if(working){
            shotLocked = true;
            locked = false;
            finalX = sketch.mouseX;
            finalY = sketch.mouseY;
            logFinal();
            sketch.clear();
            alert('screenshot!')
            working = false;
        }
    }

    function logFinal(){
        console.log('startedX', startedX)
        console.log('startedY', startedY + deltaY)
        console.log('finalX', finalX)
        console.log('finalY', finalY + deltaY)
        html2canvas(document.body, {
            x: startedX,
            y: deltaY + startedY,
            width: finalX - startedX,
            height: finalY - startedY,
            logging: true,
        }).then(function(canvas){
            // document.body.appendChild(canvas);
            var imageBase64 = canvas.toDataURL();
            console.log('base64: ', imageBase64);
        })
    }

    sketch.mouseWheel = function(event) {
        deltaY += event.delta;
        sketch.clear();
    }

    // sketch.keyPressed = function() {
    //     if (sketch.keyCode === UP_ARROW) {
    //         working = true;
    //     }
    // }

    // html2canvas(document.body, {
    //     x: window.scrollX,
    //     y: window.scrollY,
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //     logging: true,
    // });

}

var myp5 = new p5(s);
