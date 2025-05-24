import { BlockedUrl } from "@/common/types";

const RemoveBlockedUrlButton: React.FC<{
  domain: string;
  blockedUrls: BlockedUrl[];
  setBlockedUrls: React.Dispatch<React.SetStateAction<BlockedUrl[]>>;
}> = ({ domain, blockedUrls, setBlockedUrls }) => {
  const handleRemoveUrl = (urlToRemove: string): void => {
    const updatedUrls = blockedUrls.filter(
      ({ domain }) => domain !== urlToRemove
    );
    setBlockedUrls(updatedUrls);
    chrome.storage.local.set({ blockedUrls: updatedUrls });
  };

  return (
    <button
      onClick={() => handleRemoveUrl(domain)}
      className="text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  );
};

export default RemoveBlockedUrlButton;
