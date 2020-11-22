var cb = new Codebird;
cb.setConsumerKey("t7X6NW8MUzqCwt4mh2Ij7JXsT", "vIHcvrSWyD7Zivbe2joxElXrs5m07QfhlRa9adNoPgsJmQ7xo1");
cb.setToken(localStorage.getItem("oauth_token"), localStorage.getItem("oauth_token_secret"));
console.log("my token");
console.log(localStorage.getItem("oauth_token"));
function logIn() {
    console.log(document.getElementById("PINFIELD").value);
    cb.__call(
        "oauth_accessToken",
        {oauth_verifier: document.getElementById("PINFIELD").value},
        function (reply,rate,err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                // store the authenticated token, which may be different from the request token (!)

                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                localStorage.setItem("oauth_token", reply.oauth_token);
                localStorage.setItem("oauth_token_secret", reply.oauth_token_secret);

                console.log("set token");
            }
    
            // if you need to persist the login after page reload,
            // consider storing the token in a cookie or HTML5 local storage
        }
    );
};

function logIn2() {
    console.log("fuck");
};


var imageBase64 = null;
function openFile(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        var output = document.getElementById('output');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
    return dataURL;
};


function send_tweet(){
    upload_media();
    document.getElementById("alert_space").innerHTML = "<div class='alert alert-success' role='alert'>Tweet was posted!</div>";
}
function upload_media()
{
    
    var tweet_text = document.getElementById("tweet_text").value;
    // var img = document.getElementById("screenshot").files[0];

    // const reader = new FileReader();
    // const preview = document.getElementById('preview_image');

    // reader.addEventListener("load", function () {
    //     // convert image file to base64 string
    //     preview.src = reader.result;
    // }, false);

    // if (img) {
    //     reader.readAsDataURL(img);
    //     image64 = reader.result;
    //     console.log("success");
    //     console.log(image64.split(",")[1]);
    // }
    console.log(tweet_text);
    base64 = localStorage.getItem("base64");
    

    if(tweet_text!=""){
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

        document.getElementById("tweet_text").disabled=true;
        document.getElementById("tweet_button").disabled=true;
        document.getElementById("link_check").disabled=true;

        document.getElementById("alert_space").innerHTML = "<div class='alert alert-success' role='alert'>Tweet was posted! <a href='index2.html' style='text-success'>Back to main</a></div>";

    }
    // Flash success
}

function addLink(){
    var currentLocation = window.location;
    var last = "";
    console.log(chrome.storage.local.get("current_tab", function (result) {
        last = result.current_tab;}));
    
    link = document.URL;
    // last = chrome.storage.local.get("current_tab", document.URL);
    prevValue = document.getElementById("tweet_text").value;
    if(prevValue.length+last.length<=299){
        document.getElementById("tweet_text").value= prevValue + " " + link;
    }
    else{
        document.getElementById("lengthWarning").innerHTML = "Adding the link would exceed the tweet length limit.";
    }
    
}

function textCounter(field,field2,maxlimit)
{
    var countfield = document.getElementById(field2);
    if ( field.value.length > maxlimit ) {
    field.value = field.value.substring( 0, maxlimit );
    return false;
    } else {
    countfield.value = maxlimit - field.value.length;
    }
}


function textCounter2()
{
    var field = document.getElementById("tweet_text");
    var countfield = document.getElementById("counter");
    var maxlimit = 300;
    if ( field.value.length > maxlimit ) {
    field.value = field.value.substring( 0, maxlimit );
    return false;
    } else {
    countfield.value = maxlimit - field.value.length;
    }
}


document.getElementById("tweet_text").onkeyup = textCounter2;

document.getElementById("link_check").onclick = addLink;

document.getElementById("tweet_button").onclick = send_tweet;

// document.querySelector("textarea").onkeyup = textCounter2;



// tweet_text_area.addEventListener("onkeyup", textCounter2);