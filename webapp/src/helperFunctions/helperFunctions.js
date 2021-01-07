export const convertToDollars = (pennies) => {
  let dollars = pennies / 100
  dollars = dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return dollars
}
