import React from "react";
import UrlInputOption from "./UrlInputOption";
import { BlockedUrlOptions } from "@/common/types";

interface UrlInputOptionsProps {
  onOptionChange: (option: BlockedUrlOptions, checked: boolean) => void;
}

const UrlInputOptions: React.FC<UrlInputOptionsProps> = ({
  onOptionChange,
}) => {
  return (
    <div className="mt-2 space-y-2">
      <ul className="flex flex-row flex-wrap gap-1 pb-2">
        <UrlInputOption
          id={BlockedUrlOptions.DETOX}
          emoji="🧘‍♂️"
          text="30 Days"
          checked={true}
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id={BlockedUrlOptions.ONLY_TODAY}
          emoji="📅"
          text="24 hours"
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id={BlockedUrlOptions.STRICT}
          emoji="🔥"
          text="Forever"
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id={BlockedUrlOptions.EASY_REMOVAL}
          emoji="🎯"
          text="Anytime"
          onOptionChange={onOptionChange}
        />
      </ul>
    </div>
  );
};

export default UrlInputOptions;
