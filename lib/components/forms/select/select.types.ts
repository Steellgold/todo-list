import { SelectHTMLAttributes, PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  width?: "small" | "medium" | "large";
  options: Record<string, string>;
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & Props;