import React from "react";
import UrlInputOption from "./UrlInputOption";
import { BlockedUrlOptions } from "@/common/types";

interface UrlInputOptionsProps {
  isOpen: boolean;
  onOptionChange: (option: BlockedUrlOptions, checked: boolean) => void;
}

const UrlInputOptions: React.FC<UrlInputOptionsProps> = ({
  isOpen,
  onOptionChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2 space-y-2">
      <ul className="flex flex-row flex-wrap gap-1 pb-2">
        <UrlInputOption
          id={BlockedUrlOptions.DETOX}
          emoji="🧘‍♂️"
          text="Detox"
          checked={true}
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id={BlockedUrlOptions.ONLY_TODAY}
          emoji="📅"
          text="Only Today"
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id={BlockedUrlOptions.EASY_REMOVAL}
          emoji="🎯"
          text="Easy Removal"
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id={BlockedUrlOptions.STRICT}
          emoji="🔥"
          text="Strict"
          onOptionChange={onOptionChange}
        />
      </ul>
    </div>
  );
};

export default UrlInputOptions;
