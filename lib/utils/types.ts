import { ReactElement } from "react";

export type Task = {
  id?: number;
  title: string;
  priority: string;
  createdAt?: string;
};

export type Component<Props> = (props: Props) => ReactElement;