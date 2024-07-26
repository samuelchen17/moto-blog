import { ReactNode } from "react";

export default interface IRoute {
  name: string;
  path: string;
  element: ReactNode;
  auth: boolean;
  props?: any; // optional
}
