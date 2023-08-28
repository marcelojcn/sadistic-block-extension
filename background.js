const blockedUrls = [
    "youtube",
    "facebook",
    "instagram",
    "twitter",
    "territorial.io",
    "netflix",
    "twitch"
]

chrome.webNavigation.onBeforeNavigate.addListener(async () => {
    await check();
})

chrome.tabs.onActivated.addListener(async () => {
    await check();
});
  

async function check() {
    const currentTab = await getCurrentTab();
    const currentUrl = currentTab.url;

    if(blockedUrls.some((url) => currentUrl.includes(url))) {
        chrome.tabs.update(currentTab.id, {url: './static/blocked.html'});
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}