import { forwardRef, ReactElement } from "react";
import clsx from "clsx";
import { ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ width, variant, ...props }, ref): ReactElement => {
  const disabled = clsx({
    "cursor-not-allowed": props.disabled
  });

  const sizes = clsx({
    "text-xs": width === "small",
    "text-sm": width === "medium",
    "text-base": width === "large"
  });

  const variants = clsx({
    "bg-blue-600 hover:bg-blue-700": variant === "primary",
    "bg-red-600 opacity-80 hover:bg-red-700 hover:opacity-90": variant === "danger",
    "bg-green-600 hover:bg-green-700": variant === "success"
  });

  return (
    <button
      ref={ref}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-lg px-4 p-2.5 text-center font-medium text-white focus:ring-0",
        disabled,
        sizes,
        variants
      )}
      disabled={props.disabled}
      {...props}
    />
  );
});

Button.displayName = "Button";