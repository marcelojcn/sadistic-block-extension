import React from "react";
import UrlInputOption from "./UrlInputOption";

interface UrlInputOptionsProps {
  isOpen: boolean;
  onOptionChange: (option: string, checked: boolean) => void;
}

const UrlInputOptions: React.FC<UrlInputOptionsProps> = ({
  isOpen,
  onOptionChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2 space-y-2">
      <ul className="flex flex-row gap-1 pb-2">
        <UrlInputOption
          id="detox"
          emoji="🧘‍♂️"
          text="Detox"
          checked={true}
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id="onlyToday"
          emoji="📅"
          text="Only Today"
          onOptionChange={onOptionChange}
        />
        <UrlInputOption
          id="easyRemoval"
          emoji="🎯"
          text="Easy Removal"
          onOptionChange={onOptionChange}
        />
      </ul>
    </div>
  );
};

export default UrlInputOptions;
