document.addEventListener('DOMContentLoaded', function(){
    var checkPageButton = document.getElementById('activateButton');
    checkPageButton.addEventListener('click', function(){
        chrome.tabs.getSelected(null, function(tab){
            alert('YO');
        })
    })
})

document.querySelector('#testbutton').addEventListener('click', () => {
  var working = true;
    chrome.storage.local.set({ working });
// get all the google tabs and send a message to their tabs 
    chrome.tabs.query({ active: true }, tabs => {
        tabs.forEach(tab => 
      chrome.tabs.sendMessage(tab.id, { working } )
    );
  });
});
