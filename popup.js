var cb = new Codebird;
// localStorage.removeItem("oauth_token");
cb.setConsumerKey("t7X6NW8MUzqCwt4mh2Ij7JXsT", "vIHcvrSWyD7Zivbe2joxElXrs5m07QfhlRa9adNoPgsJmQ7xo1");

if(localStorage.getItem("oauth_token")){
  console.log("auth");
  console.log(localStorage.getItem("oauth_token"));
  document.getElementById("all_controls").class = "row";
  document.getElementById("log_in").class = "d-none d-print-block";
  cb.setToken(localStorage.getItem("oauth_token"), localStorage.getItem("oauth_token_secret"));
}
else{
  document.getElementById("all_controls").class = "row d-none d-print-block";
  document.getElementById("log_in").class = "";
  cb.__call(
        "oauth_requestToken",
        {oauth_callback: "oob"},
        function (reply,rate,err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                // stores it
                console.log(reply.oauth_token);
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
    
                // gets the authorize screen URL
                cb.__call(
                    "oauth_authorize",
                    {},
                    function (auth_url) {
                        let window_params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                        width=600,height=300,left=100,top=100`;
                        window.codebird_auth = window.open(auth_url, "login", window_params);
                        
                    }
                );
            }
        }
    );

}
// "main.js",  "post.js"
console.log("hola");

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
                document.getElementById("log_in").innerHTML = "";
                console.log("set token");
            }
    
            // if you need to persist the login after page reload,
            // consider storing the token in a cookie or HTML5 local storage
        }
    );
};


document.querySelector('#testbutton').addEventListener('click', () => {
  var tweet_text = document.getElementById("tweet_text").value;
  console.log("triggeed");
 
  var working = true;
    chrome.storage.local.set({ working });
// get all the google tabs and send a message to their tabs 
    chrome.tabs.query({ active: true }, tabs => {
        tabs.forEach(tab => 
      chrome.tabs.sendMessage(tab.id, { working } )
    );
  })
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {tw_text: tweet_text}, function(response) {
      console.log(response.farewell);
    });
  });
  ;
  
  
  // chrome.storage.local.set({ tweet_text });
  // chrome.tabs.query({ active: true }, tabs => {
  //   tabs.forEach(tab => 
  // chrome.tabs.sendMessage(tab.id, { tweet_text } )
// );
// });
});

function send_tweet(){
    upload_media();
    document.getElementById("alert_space").innerHTML = "<div class='alert alert-success' role='alert'>Tweet was posted!</div>";
}
    // }
function upload_media2()
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

    // base64 = localStorage.getItem("base64");
    // base64 = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB+0lEQVR42mP8//8/Ay0BEwONwagFoxZQDljI0PP8x7/Z93/e+PxXmpMpXp5dh4+ZgYHh0bd/clxYnMuINaMtfvRLgp3RVZwVU+rkuz+eRz+//wXVxcrEkKnEceXTX0dRlhoNTmKDaOvzXwHHv6x9+gtN/M9/hpjTX+GmMzAw/P7HMOnOj+ff//35x/Ds+z9iLfjPwPDt7//QE1/Sz319/RNh3PkPf+58+Yup/t7Xf9p8zFKcTMRa4CLGCrFm1v2fSjs+pJ/7uuvl7w+//yO7HRkUq3GEyrCREMk+kqy2IiyH3/xhYGD48uf/rPs/Z93/yczIwM3CiFU9Hw5xnD4ouvTt4Tf0AP37n+HTb+w+UOBmIs2CICm2R9/+EZlqGRkYzIVYSLMgRIYtUYGdSAsMBFgUuJhIy2iMDAwt2pysjAwLHv78RcgnOcrs5BQVHEyMG579Imi6Nh9zrBxZFgixMW624pXnwldYcTAzLjDhZmUit7AzE2K54c7fp8eF1QhWRobFptwmgiwkF3b//jMwMjJ8+P3/zPs/yx/9Wvr412+MgBJlZ1xsyuOOrbAibMHH3/87b32fce/nR2ypnpuFMVGevU6TQ5SdqKKeEVez5cuf/7te/j727s+9L/++/v3PzcyowM1kIcTiLs7Kz8pIfNnOONouGrVg1AIGAJ6gvN4J6V9GAAAAAElFTkSuQmCC";
    

    // if(tweet_text!=""){
    //     if(base64){
            
    var params = {
        status: tweet_text
    };
    cb.__call("statuses_update", params, function(reply, rate, err) {
        console.log(reply);
    });
        
        // window.location.href = "index2.html";

        document.getElementById("tweet_text").disabled=true;
        document.getElementById("tweet_button").disabled=true;
        document.getElementById("link_check").disabled=true;

        document.getElementById("alert_space").innerHTML = "<div class='alert alert-success' role='alert'>Tweet was posted! <a href='popup.html' style='text-success'>Back to main</a></div>";

    }
    // Flash success


function addLink(){
    var currentLocation = window.location;
    var last = "";
    let tabURL = "";
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var tabURL = tabs[0].url;
        prevValue = document.getElementById("tweet_text").value;
        if(prevValue.length+last.length<=299){
            document.getElementById("tweet_text").value= prevValue + " " + tabURL;
        }
        else{
            document.getElementById("lengthWarning").innerHTML = "Adding the link would exceed the tweet length limit.";
        }
        // localStorage.setItem("cur_tab":tabURL);
        console.log("tabs!");
        console.log(tabURL);
        textCounter2();
    });
    // URL = 
    // console.log(chrome.storage.local.get("current_tab", function (result) {
    //     last = result.current_tab;}));
    
    // link = document.URL;
    // last = chrome.storage.local.get("current_tab", document.URL);
    
    
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

function close_window(){
  window.close();
}

document.getElementById("tweet_text").onkeyup = textCounter2;

document.getElementById("link_check").onclick = addLink;

document.getElementById("tweet_button").onclick = upload_media2;

// document.querySelector("textarea").onkeyup = textCounter2;
document.getElementById("cancel_button").onclick = close_window;

document.querySelector("#login_button").onclick = logIn;

// tweet_text_area.addEventListener("onkeyup", textCounter2);
