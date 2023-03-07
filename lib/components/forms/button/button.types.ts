import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  variant?: "primary" | "success" | "danger";
  width?: "small" | "medium" | "large";
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Props;