async function synchronizeExistingBlockedUrls(): Promise<void> {
  const table = document.getElementById("blockedUrlsTable") as HTMLTableElement;
  if (!table) return;

  const result = await chrome.storage.local.get(["blockedUrls"]);
  const blockedUrls: string[] = result?.blockedUrls;

  if (!blockedUrls) {
    return;
  }

  for (const url of blockedUrls) {
    const row = table.insertRow(-1);
    const cell = row.insertCell(0);
    cell.innerHTML = url;
  }
}

function addBlockedUrlToTheTable(url: string): void {
  const table = document.getElementById("blockedUrlsTable") as HTMLTableElement;
  if (!table) return;
  
  const row = table.insertRow(-1);
  const cell = row.insertCell(0);
  cell.innerHTML = url;
}

async function addWord(): Promise<void> {
  const inputElement = document.getElementById("newBlockedUrl") as HTMLInputElement;
  const text = inputElement?.value;

  if (!text) {
    return;
  }

  const result = await chrome.storage.local.get(["blockedUrls"]);
  let blockedUrls: string[] = result?.blockedUrls;

  if (!blockedUrls) {
    blockedUrls = [];
  } else if (blockedUrls.includes(text)) {
    return;
  }

  blockedUrls.push(text);

  await chrome.storage.local.set({ blockedUrls });
  addBlockedUrlToTheTable(text);
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("newBlockedUrlButton");
  if (button) {
    button.addEventListener("click", addWord);
  }
  synchronizeExistingBlockedUrls();
}); 