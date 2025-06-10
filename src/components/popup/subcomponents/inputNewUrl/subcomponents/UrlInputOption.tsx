import { BlockedUrlOptions } from "@/common/types";
import { Tooltip } from "flowbite-react";
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
      <Tooltip content={text} placement="auto">
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
          className="whitespace-nowrap inline-flex items-center justify-between p-2 mx-0.5 bg-white hover:bg-gray-100 peer-checked:bg-gray-100 rounded-lg cursor-pointer"
        >
          {emoji}
        </label>
      </Tooltip>
    </li>
  );
};

export default UrlInputOption;
