export function isEmpty(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

export function getFormattedAmount(
  val: number,
  options?: {
    currency?: "INR" | "USD";
  }
) {
  const currency = options?.currency || "INR";
  return val.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency,
  });
}
