import { BlockedUrl } from "@/common/types";
import React, { useState, useEffect } from "react";
import BlockedUrlList from "./subcomponents/blockedUrlList/BlockedUrlList";
import InputNewUrl from "./subcomponents/inputNewUrl/InputNewUrl";

const Popup: React.FC = () => {
  const [blockedUrls, setBlockedUrls] = useState<BlockedUrl[]>([]);

  useEffect(() => {
    // Load blocked URLs from storage
    chrome.storage.local.get(["blockedUrls"], (result) => {
      console.log("Storage result:", result);
      console.log("blockedUrls from storage:", result.blockedUrls);
      if (result.blockedUrls) {
        setBlockedUrls(result.blockedUrls);
      }
    });
  }, []);

  return (
    <div className="container mx-auto px-4 rounded-sm h-[350px] max-h-[350px]">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-700">
          A Sadistic approach to focus!
        </h1>
      </div>

      <InputNewUrl blockedUrls={blockedUrls} setBlockedUrls={setBlockedUrls} />

      <BlockedUrlList
        blockedUrls={blockedUrls}
        setBlockedUrls={setBlockedUrls}
      />
    </div>
  );
};

export default Popup;
