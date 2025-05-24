import { Tab, BlockedUrl } from "./types";

export const getCurrentTab = async (): Promise<Tab | undefined> => {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

export const getCurrentDomain = async (): Promise<string | undefined> => {
  const currentTab = await getCurrentTab();
  const currentUrl = currentTab?.url;
  if (!currentUrl) return;
  const deserializedUrl = new URL(currentUrl);
  return deserializedUrl.hostname;
};

export const checkBlockedUrl = async (): Promise<void> => {
  const result = await chrome.storage.local.get(["blockedUrls"]);

  const blockedUrls: BlockedUrl[] = result?.blockedUrls;
  if (!blockedUrls) return;

  const currentTab = await getCurrentTab();
  const currentUrl = currentTab?.url;

  if (!currentUrl) return;

  // Don't block if we're already on the blocked page
  if (currentUrl.includes("blocked.html")) return;

  try {
    const deserializedUrl = new URL(currentUrl);
    const domain = deserializedUrl.hostname;

    if (!domain) return;

    // Check if the current domain matches any blocked domain
    const isBlocked = blockedUrls.some((blockedUrl) => {
      const blockedDomain = blockedUrl.domain?.toLowerCase();
      const currentDomain = domain?.toLowerCase();

      return (
        currentDomain?.includes(blockedDomain) ||
        blockedDomain?.includes(currentDomain)
      );
    });

    if (isBlocked && currentTab.id) {
      chrome.tabs.update(currentTab.id, {
        url: chrome.runtime.getURL("static/blocked.html"),
      });
    }
  } catch (error) {
    console.error("Error checking blocked URL:", error);
  }
};
