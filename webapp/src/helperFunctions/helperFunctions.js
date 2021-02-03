export const convertToDollars = (pennies) => {
  let dollars = pennies / 100
  dollars = dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return dollars
}

export const toRomanNumerals = (num) => {
  const decimalValue = [5000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const romanNumeral = ['V', 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  let romanized = ''
  const convert = (nonRoman) => {
    let romanNumerals = ''
    for (let index = 0; index < decimalValue.length; index++) {
      while (decimalValue[index] <= nonRoman) {
        romanNumerals += romanNumeral[index]
        nonRoman -= decimalValue[index]
      }
    }
    return romanNumerals
  }
  if (num % 1 !== 0) { // check if decimnal is present
    const numSplit = num.toString().split('.')
    let dollars = convert(+numSplit[0])
    let pennies = convert(+numSplit[1])
    romanized = `${dollars}.${pennies}`
  } else {
    romanized = convert(num)
  }
  return romanized
}
