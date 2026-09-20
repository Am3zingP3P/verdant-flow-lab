import { createContext, useContext } from "react";

export type Lang = "hu" | "sr";

type DictNode = string | boolean | DictNode[] | { [k: string]: DictNode };
export type Dict = { [k: string]: DictNode };

export type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
  dict: Dict;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
