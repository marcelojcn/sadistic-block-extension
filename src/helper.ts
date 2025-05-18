export interface Tab {
  id?: number;
  url?: string;
}

export async function getCurrentTab(): Promise<Tab | undefined> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
