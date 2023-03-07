import { SelectProps } from "./select.types";
import { forwardRef, ReactElement } from "react";
import clsx from "clsx";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ width, options, ...props }, ref): ReactElement => {
  const disabled = clsx({
    "text-gray-400 bg-gray-700 cursor-not-allowed": props.disabled,
    "text-white bg-gray-700": !props.disabled
  });

  const sizes = clsx({
    "text-sm": width === "small",
    "text-base": width === "medium",
    "w-full": width === "large"
  });

  return (
    <select
      ref={ref}
      className={clsx(
        "border rounded-lg block p-2.5 placeholder-gray-400 outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        disabled,
        sizes
      )}
      disabled={props.disabled}
      {...props}
    >
      {Object.entries(options).map(([key, value]) => (
        <option key={key} value={key}>{value}</option>
      ))}
    </select>
  );
});

Select.displayName = "Select";