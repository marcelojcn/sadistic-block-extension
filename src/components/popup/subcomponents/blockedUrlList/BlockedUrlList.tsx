import { BlockedUrl, BlockedUrlOptions } from "@/common/types";
import RemoveBlockedUrlButton from "./subcomponents/removeBlockedUrlButton/RemoveBlockedUrlButton";
import InfiniteSpan from "./subcomponents/infiniteSpan/InfiniteSpan";
import ExpiresInSpan from "./subcomponents/expiresInSpan/ExpiresInSpan";

const BlockedUrlList: React.FC<{
  blockedUrls: BlockedUrl[];
  setBlockedUrls: React.Dispatch<React.SetStateAction<BlockedUrl[]>>;
}> = ({ blockedUrls, setBlockedUrls }) => {
  return (
    <div className="pb-4 relative">
      <h3 className="text-lg font-bold text-gray-700 mb-2">Blocked:</h3>
      <div className="overflow-y-auto h-36 verticalScrollGradient">
        <div className="flex flex-col space-y-2">
          {blockedUrls.map((blockedUrl) => {
            console.log("blockedUrl", blockedUrl);
            let action = <InfiniteSpan />;

            const createdAt = new Date(blockedUrl.createdAt);
            const hoursRemaining = 24 - createdAt.getHours();
            if (blockedUrl.option === BlockedUrlOptions.ONLY_TODAY) {
              action =
                hoursRemaining > 0 ? (
                  <ExpiresInSpan blockedUrl={blockedUrl} />
                ) : (
                  <RemoveBlockedUrlButton
                    domain={blockedUrl.domain}
                    blockedUrls={blockedUrls}
                    setBlockedUrls={setBlockedUrls}
                  />
                );
            }
            if (blockedUrl.option === BlockedUrlOptions.EASY_REMOVAL) {
              action = (
                <RemoveBlockedUrlButton
                  domain={blockedUrl.domain}
                  blockedUrls={blockedUrls}
                  setBlockedUrls={setBlockedUrls}
                />
              );
            }
            if (blockedUrl.option === BlockedUrlOptions.DETOX) {
            }
            return (
              <div
                key={blockedUrl.domain}
                className="flex justify-between items-center py-1 px-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-4 h-4 drop-shadow-md"
                    src={`https://icons.duckduckgo.com/ip3/${blockedUrl.domain}.ico`}
                    alt={`${blockedUrl.domain} favicon`}
                  />
                  <span className="truncate text-left">
                    {blockedUrl.domain}
                  </span>
                </div>

                {action}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlockedUrlList;
