export default function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency: string = "USD",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
