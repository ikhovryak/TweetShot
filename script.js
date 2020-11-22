// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas colorMode HSB frameRate background width height stroke
   noFill noStroke keyCode rect UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW */

let windowX, windowY, selectionX, selectionY, locked, shotLocked, startedX, startedY, finalX, finalY, deltaY, imageBase64, working, empty, cnvPos;

chrome.storage.local.get('working', (response) => {
    if (response.working) {
        empty = 0;
    }
  });
  chrome.runtime.onMessage.addListener(request => {
    if (request.working) {
        working = true;
        cnvPos = true;
    }
  });

// var image = new Image();
// image.src = 'data:image/png;base64,iVBORw0K...';
// document.body.appendChild(image);

var s = function(sketch){

    var imagetext = '';

    sketch.setup = function() {
        
        // Canvas & color settings
        var cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cnv.position(sketch.windowWidth, sketch.windowHeight, 'fixed');
        deltaY = 0;
    }

    sketch.draw = function(){
        if (cnvPos){
            var cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
            cnv.position(0, 0, 'fixed');
            cnvPos = false;
            alert('canvas relocated!')
        }
    }

    sketch.mousePressed = function() {
        console.log('working: ', working);
        console.log('cnvpos: ', cnvPos);

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
            // addElement();
            console.log('IMAGE BASE 64', imageBase64);
            sketch.canvas.position(sketch.windowWidth, sketch.windowHeight, 'fixed');
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
            imageBase64 = canvas.toDataURL();
            console.log('base64: ', imageBase64);
            return imageBase64
        })
    }

    function addElement () { 
        // create a new div element 
        const newWrapper = document.createElement("div");
        newWrapper.style.zIndex = "9999999912939234234029929";
        newWrapper.style.position = 'fixed';
        newWrapper.style.width = '100%';
        newWrapper.style.height = '100%';
        newWrapper.style.backgroundColor = 'rgba(198, 198, 198, 0.4)';
        document.body.appendChild(newWrapper);

        newWrapper.innerHTML = "<html><head><script type='text/javascript' src='Codebird.js'></script><link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css' integrity='sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2' crossorigin='anonymous'><style>body {width: 350px;} html {width: 350px;}</style></head><body><main main role='main' class='container text-center py-3'><div class='row'><div class='col-sm'><h5>TweetShot</h5></div></div><div class='row'><div class='col-sm'><div id='alert_space'></div><div class='form-group text-left ' ><label for='tweet_text'>Tweet text:</label><textarea  class='form-control' id='tweet_text' rows='3' maxlength='300'></textarea><!-- <div class='form-group mb-2 text-right'> --><input disabled  maxlength='3' size='2' value='300' id='counter' class='float-right form-control-plaintext text-right text-secondary'></div><div class='form-check text-left'><input class='form-check-input' type='radio' value=''  id='link_check'><label class='form-check-label' for='link_check'>Include website link</label> <br/><span class='text-warning' id='lengthWarning'></span></div><div class='form-group mt-1'><a  type='button' class='btn btn-primary' id='tweet_button'>Tweet!</a><a onclick='collapseFunction()' type='button' class='btn btn-outline-secondary'>Cancel</a></div></div></div> </main><script type='text/javascript' src='main.js'></script><script src='jquery_slim_min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script><script src='popper_min.js' integrity='sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN' crossorigin='anonymous'></script><script src='bootstrap_min.js' integrity='sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s' crossorigin='anonymous'></script></body></html>"

        {/* newWrapper.innerHTML = "<div class='form-check text-left'><input class='form-check-input' type='radio' value=''  id='link_check'><label class='form-check-label' for='link_check'>Include website link</label> <br/><span class='text-warning' id='lengthWarning'></span></div><div class='form-group mt-1'><a  type='button' class='btn btn-primary' id='tweet_button'>Tweet!</a><a href='index2.html' type='button' class='btn btn-outline-secondary'>Cancel</a></div>" */}

        // const newDiv = document.createElement("div"); 
        // newWrapper.appendChild(newDiv); 
        // newDiv.style.position = 'fixed';
        // newDiv.style.width = '40%';
        // newDiv.style.height = '50%';
        // newDiv.style.marginLeft = '30%';
        // newDiv.style.marginTop = '10%';
        // newDiv.style.borderRadius = '1%';
        // newDiv.style.backgroundColor = 'rgba(68, 102, 135, 0.7)';
        // newDiv.style.opacity = '1';
        // newDiv.style.padding = '3%';

        // const textArea1 = document.createElement("textarea");
        // textArea1.maxLength = "300";
        // textArea1.style.width = '95%';
        // textArea1.style.height = '50%';
        // textArea1.style.backgroundColor = 'white';
        // textArea1.style.opacity = '1.0';
        // newDiv.appendChild(textArea1);

        // const postButtons = document.createElement("div");
        // postButtons.style.width = '100%';
        // postButtons.style.height = '10%';
        // newDiv.appendChild(postButtons);

        // const tweetButton = document.createElement("button");
        // tweetButton.innerHTML = "Tweet!";
        // postButtons.appendChild(tweetButton);

        // const cancelButton = document.createElement("button");
        // cancelButton.innerHTML = "Cancel";
        // postButtons.appendChild(cancelButton);

        // <div class="form-group mt-1">
        // <a  type="button" class="btn btn-primary" id="tweet_button">Tweet!</a>
        // <a href="index2.html" type="button" class="btn btn-outline-secondary">Cancel</a>
        // </div>

        // <div class="form-group text-left " >
        // <label for="tweet_text">Tweet text:</label>
        // <textarea  class="form-control" id="tweet_text" rows="3" maxlength="300"></textarea>
        // <!-- <div class="form-group mb-2 text-right"> -->
        // <input disabled  maxlength="3" size="2" value="300" id="counter" class="float-right form-control-plaintext text-right text-secondary">
        // </div>

        // <div class="form-check text-left">
        // <input class="form-check-input" type="radio" value=""  id="link_check">
        // <label class="form-check-label" for="link_check">Include website link</label> <br/>
        // <span class="text-warning" id="lengthWarning"></span>
        // </div>

        // var image1 = new Image();
        // image1.src = String;
        // document.body.appendChild(image);
        console.log('TYPE: ', typeof imageBase64)

    }

    sketch.mouseWheel = function(event) {
        deltaY += event.delta;
        sketch.clear();
        console.log(event.delta)
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
