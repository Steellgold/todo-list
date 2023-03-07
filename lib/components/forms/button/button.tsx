import { forwardRef, ReactElement } from "react";
import clsx from "clsx";
import { ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, ...props }, ref): ReactElement => {
  const disabled = clsx({
    "cursor-not-allowed": props.disabled
  });

  const variants = clsx({
    "bg-blue-600 hover:bg-blue-700": variant === "primary",
    "bg-red-600  hover:bg-red-700": variant === "danger",
    "bg-green-600 hover:bg-green-700": variant === "success",
    "bg-gray-600 hover:bg-gray-700": variant === "action"
  });

  return (
    <button
      ref={ref}
      className={clsx(
        "rounded-lg p-3 text-center font-medium text-white focus:ring-0 text-sm px-3 py-[12.5px]",
        disabled,
        variants
      )}
      disabled={props.disabled}
      {...props}
    />
  );
});

Button.displayName = "Button";