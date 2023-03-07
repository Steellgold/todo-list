import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  variant?: "primary" | "success" | "danger" | "action"
  width?: "small" | "medium" | "large";
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Props;