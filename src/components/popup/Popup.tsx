import { BlockedUrl } from "@/common/types";
import { checkBlockedUrl, getCurrentDomain } from "@/common/utils";
import { isURL } from "class-validator";
import React, { useState, useEffect } from "react";

const Popup: React.FC = () => {
  const [newUrl, setNewUrl] = useState("");
  const [blockedUrls, setBlockedUrls] = useState<BlockedUrl[]>([]);

  useEffect(() => {
    getCurrentDomain().then((domain) => {
      if (domain && isURL(domain)) {
        setNewUrl(domain);
      }
    });
  }, []);

  useEffect(() => {
    // Load blocked URLs from storage
    chrome.storage.local.get(["blockedUrls"], (result) => {
      if (result.blockedUrls) {
        setBlockedUrls(result.blockedUrls);
      }
    });
  }, []);

  const handleAddUrl = async (): Promise<void> => {
    if (!newUrl) return;

    const newBlockedUrl: BlockedUrl = {
      domain: newUrl,
      createdAt: new Date(),
    };

    const updatedUrls = [...blockedUrls, newBlockedUrl];
    setBlockedUrls(updatedUrls);
    chrome.storage.local.set({ blockedUrls: updatedUrls });
    setNewUrl("");

    await checkBlockedUrl();
  };

  const handleRemoveUrl = (urlToRemove: string): void => {
    const updatedUrls = blockedUrls.filter(
      ({ domain }) => domain !== urlToRemove
    );
    setBlockedUrls(updatedUrls);
    chrome.storage.local.set({ blockedUrls: updatedUrls });
  };

  return (
    <div className="container mx-auto px-4 my-5 rounded-sm h-64">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-700">
          A Sadistic approach to focus!
        </h1>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="flex items-center relative">
              {newUrl && (
                <img
                  className="absolute left-1 w-4 h-4 drop-shadow-md"
                  src={`https://icons.duckduckgo.com/ip3/${newUrl}.ico`}
                  alt={`${newUrl} favicon`}
                />
              )}
              <input
                type="text"
                placeholder="New url to be blocked..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full pl-7 pr-1 py-2 placeholder:italic placeholder:text-slate-400 text-sm border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <hr className="shadow-sm" />
          </div>
          <div>
            <button
              onClick={handleAddUrl}
              className="py-2 text-sm font-bold text-gray-700 hover:text-gray-400 hover:underline"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-y-auto h-36 scrollGradient">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Blocked:</h3>
          <div className="flex flex-col space-y-2">
            {blockedUrls.map(({ domain }) => (
              <div
                key={domain}
                className="flex justify-between items-center py-1 px-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-4 h-4 drop-shadow-md"
                    src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
                    alt={`${domain} favicon`}
                  />
                  <span className="truncate text-left">{domain}</span>
                </div>
                <button
                  onClick={() => handleRemoveUrl(domain)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
