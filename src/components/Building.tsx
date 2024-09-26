import { Children } from "./Children";

export interface Building {
  id: number;
  name: string;
  group: string;
  children: Children[];
}
