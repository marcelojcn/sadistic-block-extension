interface BlockedUrl {
  domain: string;
  deleteAt?: Date;
  createdAt: Date;
}

async function synchronizeExistingBlockedUrls(): Promise<void> {
  const div = document.getElementById("blockedUrlsTable") as HTMLDivElement;
  if (!div) return;

  const result = await chrome.storage.local.get(["blockedUrls"]);
  const blockedUrls: BlockedUrl[] = result?.blockedUrls;

  if (!blockedUrls) {
    return;
  }

  for (const url of blockedUrls) {
    appendUrl(div, url);
  }
}

function addBlockedUrlToTheTable(blockedUrl: BlockedUrl): void {
  const div = document.getElementById("blockedUrlsTable") as HTMLDivElement;
  if (!div) return;

  appendUrl(div, blockedUrl);
}

function appendUrl(div: HTMLDivElement, blockedUrl: BlockedUrl): void {
  const wrapperDiv: HTMLDivElement = document.createElement("div");
  wrapperDiv.className = "flex justify-between items-center";

  const urlChild: HTMLDivElement = document.createElement("div");
  urlChild.innerHTML = `&#x2022; ${blockedUrl.domain}`;
  urlChild.className = "pt-1 px-2 text-gray-800 font-light tracking-normal";
  wrapperDiv.appendChild(urlChild);

  const statusChild: HTMLDivElement = document.createElement("div");
  statusChild.innerHTML = blockedUrl.deleteAt
    ? `until: ${blockedUrl.deleteAt.toLocaleString().split(",")[0]}`
    : "&#8734;";
  statusChild.className = "text-gray-400";
  wrapperDiv.appendChild(statusChild);

  div.appendChild(wrapperDiv);
}

async function addWord(): Promise<void> {
  const inputElement = document.getElementById(
    "newBlockedUrl"
  ) as HTMLInputElement;
  let text = inputElement?.value;

  if (!text) {
    return;
  }

  if (!text.startsWith("https://")) {
    text = `https://${text}`;
  }

  const deserializedUrl = new URL(text);
  const url = deserializedUrl.hostname;

  const result = await chrome.storage.local.get(["blockedUrls"]);
  let blockedUrls: BlockedUrl[] = result?.blockedUrls;

  if (!blockedUrls) {
    blockedUrls = [];
  } else if (
    blockedUrls.some((blockedUrl) => blockedUrl.domain.startsWith(url))
  ) {
    return;
  }

  const blockUrl: BlockedUrl = {
    domain: url,
    createdAt: new Date(),
  };

  const justTodayElement = document.getElementById(
    "input-just-today"
  ) as HTMLInputElement;

  if (justTodayElement.checked) {
    const now = new Date();
    now.setDate(now.getDay() + 1);
    now.setHours(0, 0, 0, 0);

    blockUrl.deleteAt = now;
  }

  blockedUrls.push(blockUrl);

  await chrome.storage.local.set({ blockedUrls });
  addBlockedUrlToTheTable(blockUrl);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("newBlockedUrlButton");
  if (button) {
    button.addEventListener("click", addWord);
  }

  synchronizeExistingBlockedUrls();
});
