import { BlockedUrl, BlockedUrlOptions } from "@/common/types";
import { checkBlockedUrl, getCurrentDomain } from "@/common/utils";
import { isURL } from "class-validator";
import React, { useEffect, useState } from "react";
import UrlInputOptions from "./subcomponents/UrlInputOptions";

const InputNewUrl: React.FC<{
  blockedUrls: BlockedUrl[];
  setBlockedUrls: React.Dispatch<React.SetStateAction<BlockedUrl[]>>;
}> = ({ blockedUrls, setBlockedUrls }) => {
  const [newUrl, setNewUrl] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOptions] = useState(BlockedUrlOptions.DETOX);

  useEffect(() => {
    getCurrentDomain().then((domain) => {
      if (domain && isURL(domain)) {
        setNewUrl(domain);
      }
    });
  }, []);

  const handleAddUrl = async (): Promise<void> => {
    if (!newUrl) return;

    const newBlockedUrl: BlockedUrl = {
      domain: newUrl,
      option,
      createdAt: new Date().getTime(),
    };

    const updatedUrls = [...blockedUrls, newBlockedUrl];
    console.log("Storing updatedUrls:", updatedUrls);
    setBlockedUrls(updatedUrls);
    chrome.storage.local.set({ blockedUrls: updatedUrls }, () => {
      console.log("Storage set complete");
      chrome.storage.local.get(["blockedUrls"], (result) => {
        console.log(
          "Verification - blockedUrls in storage:",
          result.blockedUrls
        );
      });
    });
    setNewUrl("");

    setShowOptions(false);
    setOptions(BlockedUrlOptions.DETOX);

    await checkBlockedUrl();
  };

  const handleOptionChange = (
    option: BlockedUrlOptions,
    checked: boolean
  ): void => {
    // Handle option change here
    console.log("Option changed:", option, checked);

    setOptions(option);
  };

  return (
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
              className="w-full pl-7 pr-8 py-2 placeholder:italic placeholder:text-slate-400 text-sm border-0 focus:outline-none focus:ring-0"
            />
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="absolute right-1 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <hr className="shadow-sm" />
          <UrlInputOptions
            isOpen={showOptions}
            onOptionChange={handleOptionChange}
          />
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
  );
};

export default InputNewUrl;
