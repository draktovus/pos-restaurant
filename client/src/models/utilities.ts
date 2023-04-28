// Custom toFixed function ripped from https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding
export function toFixed(num: number, fixed: number) {
  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  const result = num.toString().match(re)
  return result ? result[0] : 0
}
