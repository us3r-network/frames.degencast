export default function formatPrice(price: number) {
  let priceString = "";
  if (price > 1000000000) {
    priceString = `${(price / 1000000000).toFixed(2)}B`;
  } else if (price > 1000000) {
    priceString = `${(price / 1000000).toFixed(2)}M`;
  } else if (price > 1000) {
    priceString = `${(price / 1000).toFixed(2)}K`;
  } else if (price > 0) {
    priceString = `${price.toFixed(2)}`;
  }
  return priceString;
}
