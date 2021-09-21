export const i18nCurrencyFormat = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
