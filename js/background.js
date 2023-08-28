chrome.webNavigation.onBeforeNavigate.addListener(async () => {
    await check();
})

chrome.tabs.onActivated.addListener(async () => {
    await check();
});
  

async function check() {
    const result = await chrome.storage.local.get(["blockedUrls"]);
    const blockedUrls = result?.blockedUrls;
    if(!blockedUrls) return;


    const currentTab = await getCurrentTab();
    const currentUrl = currentTab?.url;

    if(!currentUrl) return;

    const deserializedUrl = new URL(currentUrl);
    const domain = deserializedUrl.hostname;

    if(!domain) return;

    if(blockedUrls.some((url) => domain.includes(url))) {
        chrome.tabs.update(currentTab.id, {url: './static/blocked.html'});
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}