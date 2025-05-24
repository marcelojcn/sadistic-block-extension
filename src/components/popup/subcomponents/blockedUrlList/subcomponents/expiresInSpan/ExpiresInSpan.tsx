import { BlockedUrl } from "@/common/types";

const ExpiresInSpan: React.FC<{
  blockedUrl: BlockedUrl;
}> = ({ blockedUrl }) => {
  const createdAt = new Date(blockedUrl.createdAt);
  const hoursRemaining = 24 - createdAt.getHours();

  return <span className="text-sm text-gray-500">{hoursRemaining} hours</span>;
};

export default ExpiresInSpan;
