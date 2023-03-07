import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  variant?: "primary" | "success" | "danger" | "action"
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Props;