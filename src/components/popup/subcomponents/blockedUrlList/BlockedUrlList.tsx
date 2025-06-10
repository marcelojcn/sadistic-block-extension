import { BlockedUrl, BlockedUrlOptions } from "@/common/types";
import RemoveBlockedUrlButton from "./subcomponents/removeBlockedUrlButton/RemoveBlockedUrlButton";
import InfiniteSpan from "./subcomponents/infiniteSpan/InfiniteSpan";
import ExpiresInSpan from "./subcomponents/expiresInSpan/ExpiresInSpan";
import { generateGibberish } from "@/common/utils";

const OneMonthInHours = 24 * 30;

const BlockedUrlList: React.FC<{
  blockedUrls: BlockedUrl[];
  setBlockedUrls: React.Dispatch<React.SetStateAction<BlockedUrl[]>>;
}> = ({ blockedUrls, setBlockedUrls }) => {
  const orderedBlockedUrls = blockedUrls.sort((a) => {
    switch (a.option) {
      case BlockedUrlOptions.STRICT:
        return -2;
      case BlockedUrlOptions.DETOX:
        return -1;
      case BlockedUrlOptions.ONLY_TODAY:
        return 1;
      case BlockedUrlOptions.HIDDEN:
        return 2;
      case BlockedUrlOptions.EASY_REMOVAL_HIDDEN:
        return 3;
      case BlockedUrlOptions.EASY_REMOVAL:
        return 4;
      default:
        return 0;
    }
  });

  return (
    <div className="mb-4 relative">
      <h3 className="text-lg font-bold text-gray-700 mb-2">Blocked:</h3>
      <div className="overflow-y-auto h-36 verticalScrollGradient">
        <div className="flex flex-col space-y-2">
          {orderedBlockedUrls.map((blockedUrl) => {
            let action = <InfiniteSpan />;

            const createdAt = new Date(blockedUrl.createdAt);
            const hoursSinceCreation =
              (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60);
            if (blockedUrl.option === BlockedUrlOptions.ONLY_TODAY) {
              const hoursRemaining = 24 - createdAt.getHours();

              action =
                hoursSinceCreation > hoursRemaining ? (
                  <ExpiresInSpan blockedUrl={blockedUrl} />
                ) : (
                  <RemoveBlockedUrlButton
                    domain={blockedUrl.domain}
                    blockedUrls={blockedUrls}
                    setBlockedUrls={setBlockedUrls}
                  />
                );
            }
            if (
              blockedUrl.option === BlockedUrlOptions.EASY_REMOVAL ||
              blockedUrl.option === BlockedUrlOptions.EASY_REMOVAL_HIDDEN
            ) {
              action = (
                <RemoveBlockedUrlButton
                  domain={blockedUrl.domain}
                  blockedUrls={blockedUrls}
                  setBlockedUrls={setBlockedUrls}
                />
              );
            }
            if (blockedUrl.option === BlockedUrlOptions.DETOX) {
              const hoursSinceCreation =
                (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60);

              if (hoursSinceCreation > OneMonthInHours) {
                action = (
                  <RemoveBlockedUrlButton
                    domain={blockedUrl.domain}
                    blockedUrls={blockedUrls}
                    setBlockedUrls={setBlockedUrls}
                  />
                );
              }
            }

            let domain = blockedUrl.domain;
            if (
              blockedUrl.option === BlockedUrlOptions.HIDDEN ||
              blockedUrl.option === BlockedUrlOptions.EASY_REMOVAL_HIDDEN
            ) {
              domain = generateGibberish(domain.length);
            }

            return (
              <div
                key={blockedUrl.domain}
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
