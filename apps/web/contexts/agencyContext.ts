import { createContext } from "react";

export interface ContextProps {
  selectedAgencies: string[];
}

export const AgencyContext = createContext<ContextProps>({ selectedAgencies: [] });
