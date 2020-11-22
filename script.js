// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas colorMode HSB frameRate background width height stroke
   noFill noStroke keyCode rect UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW */

let windowX, windowY, selectionX, selectionY, locked, shotLocked, startedX, startedY, finalX, finalY, deltaY, imageBase64, working, empty, cnvPos;
let tweet_text;
chrome.storage.local.set({"current_tab":document.URL});

chrome.storage.local.get('working', (response) => {
    if (response.working) {
        empty = 0;
    }
  });
//   chrome.runtime.onMessage.addListener(request => {
//     if (request.working) {
//         working = true;
//         cnvPos = true;
//     }
//   });

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
            alert('Start selecting the area of the screen you want to cut out!')
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
            // console.log("got before logFinal")
            logFinal();
            // console.log("got after logFinal")

            sketch.clear();
            // alert('screenshot!')
            // working = false;
            // // addElement();
            // console.log('IMAGE BASE 64', imageBase64);
            // alert(tweet_text);
            sketch.canvas.position(sketch.windowWidth, sketch.windowHeight, 'fixed');
            // upload_media(tweet_text, imageBase64.split(",")[1]);
            // alert('tweet sent!');
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
            // console.log('base64: ', imageBase64);
            // localStorage.setItem("base64", imageBase64.split(",")[1]);
            // alert('screenshot!')
            working = false;
            // addElement();
            // console.log('IMAGE BASE 64', imageBase64);
            if (confirm("This is the message of your tweet which will be sent along with the screenshot: \n \n"+tweet_text+"\n\nSend?")) {
                upload_media(tweet_text, imageBase64.split(",")[1]);
                alert('Tweet successfully sent!');
              } 
            location.reload();
            // alert(tweet_text);
            // sketch.canvas.position(sketch.windowWidth, sketch.windowHeight, 'fixed');
            // upload_media(tweet_text, imageBase64.split(",")[1]);
            
            // return imageBase64.split(",")[1];
        });
        // return imageBase64
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

        newWrapper.innerHTML = "<html><head><script type='text/javascript' src='Codebird.js'></script><link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css' integrity='sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2' crossorigin='anonymous'><style>body {width: 350px;} html {width: 350px;}</style></head><body><main main role='main' class='container text-center py-3'><div class='row'><div class='col-sm'><h5>TweetShot</h5></div></div><div class='row'><div class='col-sm'><div id='alert_space'></div><div class='form-group text-left ' ><label for='tweet_text'>Tweet text:</label><textarea  class='form-control' id='tweet_text' rows='3' maxlength='300'></textarea><!-- <div class='form-group mb-2 text-right'> --><input disabled  maxlength='3' size='2' value='300' id='counter' class='float-right form-control-plaintext text-right text-secondary'></div><div class='form-check text-left'><input class='form-check-input' type='radio' value=''  id='link_check'><label class='form-check-label' for='link_check'>Include website link</label> <br/><span class='text-warning' id='lengthWarning'></span></div><div class='form-group mt-1'><a  type='button' class='btn btn-primary' id='tweet_button'>Tweet!</a><a onclick='collapseFunction()' type='button' class='btn btn-outline-secondary'>Cancel</a></div></div></div> </main><script type='text/javascript' src='post.js'></script><script src='jquery_slim_min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script><script src='popper_min.js' integrity='sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN' crossorigin='anonymous'></script><script src='bootstrap_min.js' integrity='sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s' crossorigin='anonymous'></script></body></html>"

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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.working) {
            working = true;
            cnvPos = true;}
        tweet_text = request.tw_text;
        // send_tweet(request.tw_text);
    });

function send_tweet(tw_text){
    tweet_text = tw_text;
}
function upload_media(tweet_text, base64)
{
    
    // var tweet_text = document.getElementById("tweet_text").value;
    // var tweet_text = localStorage.getItem("tweet_text");
    console.log(tweet_text);

    // base64 = localStorage.getItem("base64");
    // base64 = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB+0lEQVR42mP8//8/Ay0BEwONwagFoxZQDljI0PP8x7/Z93/e+PxXmpMpXp5dh4+ZgYHh0bd/clxYnMuINaMtfvRLgp3RVZwVU+rkuz+eRz+//wXVxcrEkKnEceXTX0dRlhoNTmKDaOvzXwHHv6x9+gtN/M9/hpjTX+GmMzAw/P7HMOnOj+ff//35x/Ds+z9iLfjPwPDt7//QE1/Sz319/RNh3PkPf+58+Yup/t7Xf9p8zFKcTMRa4CLGCrFm1v2fSjs+pJ/7uuvl7w+//yO7HRkUq3GEyrCREMk+kqy2IiyH3/xhYGD48uf/rPs/Z93/yczIwM3CiFU9Hw5xnD4ouvTt4Tf0AP37n+HTb+w+UOBmIs2CICm2R9/+EZlqGRkYzIVYSLMgRIYtUYGdSAsMBFgUuJhIy2iMDAwt2pysjAwLHv78RcgnOcrs5BQVHEyMG579Imi6Nh9zrBxZFgixMW624pXnwldYcTAzLjDhZmUit7AzE2K54c7fp8eF1QhWRobFptwmgiwkF3b//jMwMjJ8+P3/zPs/yx/9Wvr412+MgBJlZ1xsyuOOrbAibMHH3/87b32fce/nR2ypnpuFMVGevU6TQ5SdqKKeEVez5cuf/7te/j727s+9L/++/v3PzcyowM1kIcTiLs7Kz8pIfNnOONouGrVg1AIGAJ6gvN4J6V9GAAAAAElFTkSuQmCC";
    

    // if(tweet_text!=""){
        if(base64){
            var params_2 = {
                media_data: base64
                
            };
            cb.__call("media_upload",params_2,function (reply, rate, err) {
                console.log(reply.media_id_string);

                var params = {
                    media_ids: reply.media_id_string,
                    status: tweet_text
                };
                cb.__call("statuses_update", params, function(reply, rate, err) {
                    console.log(reply);
                });
        });}
        else{
            var params = {
                status: tweet_text
            };
            cb.__call("statuses_update", params, function(reply, rate, err) {
                console.log(reply);
            });
        }
        // window.location.href = "index2.html";

        // document.getElementById("alert_space").innerHTML = "<div class='alert alert-success' role='alert'>Tweet was posted! <a href='index2.html' style='text-success'>Back to main</a></div>";

    }

var myp5 = new p5(s);
