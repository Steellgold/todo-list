import { InputHTMLAttributes, PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  width?: "small" | "medium" | "large";
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;