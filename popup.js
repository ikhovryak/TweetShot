

document.querySelector('#testbutton').addEventListener('click', () => {
  console.log("triggeed");
  var working = true;
    chrome.storage.local.set({ working });
// get all the google tabs and send a message to their tabs 
    chrome.tabs.query({ active: true }, tabs => {
        tabs.forEach(tab => 
      chrome.tabs.sendMessage(tab.id, { working } )
    );
  });
});
