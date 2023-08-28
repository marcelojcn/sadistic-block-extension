
async function synchronizeExistingBlockedUrls() {
    var table = document.getElementById("blockedUrlsTable");
  
    const result = await chrome.storage.local.get(["blockedUrls"]);
    var blockedUrls = result?.blockedUrls;
  
    if(!blockedUrls){
      return;
    }
  
    for(const url of blockedUrls){
      var row = table.insertRow(-1);
      var cell = row.insertCell(0);
      cell.innerHTML = url;
    }
  }
  
  function addBlockedUrlToTheTable(url) {
    var table = document.getElementById("blockedUrlsTable");
    
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = url;
  }
  
  async function addWord() {
      var text = document.getElementById("newBlockedUrl")?.value;
  
      if(!text){
        return;
      }
  
      const result = await chrome.storage.local.get(["blockedUrls"]);
      var blockedUrls = result?.blockedUrls;
  
      if(!blockedUrls){
        blockedUrls = [];
      }
      else if(blockedUrls.includes(text)){
        return;
      }
  
      blockedUrls.push(text);
  
      await chrome.storage.local.set({blockedUrls: blockedUrls});
      addBlockedUrlToTheTable(text);
    }
  
    document.getElementById("newBlockedUrlButton").addEventListener("click", addWord);
  
    synchronizeExistingBlockedUrls();