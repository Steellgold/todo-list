import { forwardRef, ReactElement } from "react";
import { CheckboxProps } from "./checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ ...props }, ref): ReactElement => {
  return (
    <input
      ref={ref}
      type="checkbox"
      className="w-4 h-4 border rounded focus:ring-0 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";