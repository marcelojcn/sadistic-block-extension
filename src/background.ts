interface Tab {
  id?: number;
  url?: string;
}

interface BlockedUrl {
  domain: string;
  deleteAt?: Date;
  createdAt: Date;
}

async function getCurrentTab(): Promise<Tab | undefined> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function check(): Promise<void> {
  const result = await chrome.storage.local.get(["blockedUrls"]);
  const blockedUrls: BlockedUrl[] = result?.blockedUrls;
  if (!blockedUrls) return;

  const currentTab = await getCurrentTab();
  const currentUrl = currentTab?.url;

  if (!currentUrl) return;

  const deserializedUrl = new URL(currentUrl);
  const domain = deserializedUrl.hostname;

  if (!domain) return;

  if (blockedUrls.some((url) => domain.includes(url.domain))) {
    if (currentTab.id) {
      chrome.tabs.update(currentTab.id, { url: "./static/blocked.html" });
    }
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(async () => {
  await check();
});

chrome.tabs.onActivated.addListener(async () => {
  await check();
});
