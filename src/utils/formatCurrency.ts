export const toCurrency = (value: number) =>
    new Intl.NumberFormat("th-TH", {
      currency: "THA",
      style: "currency",
      currencyDisplay: "code",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
    .replace("THA", "")
    .trim()