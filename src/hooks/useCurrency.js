import { useSyncExternalStore } from "react";

import data from "../data/orderServices.json";

/* عملة العرض (EGP / USD) — مشتركة بين كل المكونات ومتخزنة في المتصفح.
   رسالة الواتس بتتبعت دايمًا بالجنيه. */

const KEY = "order-currency";
const listeners = new Set();

let display = "EGP";

try {
  if (localStorage.getItem(KEY) === "USD" && data.currency.usd?.enabled) display = "USD";
} catch {
  /* التخزين مش متاح */
}

const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const getSnapshot = () => display;

export function setCurrency(next) {
  display = next;

  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* التخزين مش متاح */
  }

  listeners.forEach((callback) => callback());
}

export default function useCurrency() {
  const current = useSyncExternalStore(subscribe, getSnapshot);
  const { usd, label } = data.currency;
  const enabled = Boolean(usd?.enabled);
  const isUsd = enabled && current === "USD";

  const money = (value) =>
    new Intl.NumberFormat("en-US").format(isUsd ? Math.round(value / usd.rate) : value);

  return {
    display: isUsd ? "USD" : "EGP",
    label: isUsd ? "USD" : label,
    money,
    enabled,
    setCurrency,
  };
}