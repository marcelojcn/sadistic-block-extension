import { BlockedUrl } from "@/common/types";

const BlockedUrlList: React.FC<{
  blockedUrls: BlockedUrl[];
  setBlockedUrls: React.Dispatch<React.SetStateAction<BlockedUrl[]>>;
}> = ({ blockedUrls, setBlockedUrls }) => {
  const handleRemoveUrl = (urlToRemove: string): void => {
    const updatedUrls = blockedUrls.filter(
      ({ domain }) => domain !== urlToRemove
    );
    setBlockedUrls(updatedUrls);
    chrome.storage.local.set({ blockedUrls: updatedUrls });
  };

  return (
    <div className="pb-4 relative">
      <h3 className="text-lg font-bold text-gray-700 mb-2">Blocked:</h3>
      <div className="overflow-y-auto h-36 scrollGradient">
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
  );
};

export default BlockedUrlList;
