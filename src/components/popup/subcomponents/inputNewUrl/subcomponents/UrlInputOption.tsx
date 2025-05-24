import { BlockedUrlOptions } from "@/common/types";
import React, { useEffect } from "react";

interface UrlInputOptionProps {
  id: BlockedUrlOptions;
  emoji: string;
  text: string;
  checked?: boolean;
  onOptionChange: (option: BlockedUrlOptions, checked: boolean) => void;
}

const UrlInputOption: React.FC<UrlInputOptionProps> = ({
  id,
  emoji,
  text,
  checked,
  onOptionChange,
}) => {
  useEffect(() => {
    if (checked) {
      onOptionChange(id, checked);
    }
  }, []); // Empty array means this runs once on mount

  return (
    <li>
      <input
        type="radio"
        id={`url-input-option-${id}`}
        name="url-input-option"
        className="hidden peer"
        onChange={(e) => onOptionChange(id, e.target.checked)}
        defaultChecked={checked}
      />
      <label
        htmlFor={`url-input-option-${id}`}
        className="whitespace-nowrap inline-flex items-center justify-between p-1 text-gray-500 hover:text-gray-600 peer-checked:text-gray-600 bg-white hover:bg-gray-50  border-2 border-gray-200  peer-checked:border-blue-600 rounded-lg cursor-pointer"
      >
        {emoji}
        <div className="ml-1 text-base font-semibold">{text}</div>
      </label>
    </li>
  );
};

export default UrlInputOption;
