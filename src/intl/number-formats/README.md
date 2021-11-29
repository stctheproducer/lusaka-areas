# Options

Possible options for formats.

```yml
style: decimal, currency, percent, unit
currency: The currency to display
unit: The unit to display
notation: standard, scientific, compact, engineering
compactDisplay: short, long
useGrouping: true, false
currencyDisplay: symbol, narrowSymbol, code, name
currencySign: standard, accounting
numberingSystem: arab, arabext,  bali, beng, deva, fullwide,  gujr, guru, hanidec, khmr,  knda, laoo, latn, limb, mlym,  mong, mymr, orya, tamldec,  telu, thai, tibt
signDisplay: auto, never, always, exceptZero
unitDisplay: short, long, narrow
minimumIntegerDigits: 1 - 21
# * If fractionDigits, the number is rounded according to [[MinimumFractionDigits]] and [[MaximumFractionDigits]],
# * as described above. If significantDigits, the number is rounded according to [[MinimumSignificantDigits]] and
# * [[MaximumSignificantDigits]] as described above. If compactRounding, the number is rounded to 1 maximum
# * fraction digit if there is 1 digit before the decimal separator, and otherwise round to 0 fraction digits.
roundingType: fractionDigits, significantDigits, compactRounding
minimumFractionDigits: 0 - 20. Only used when [roundingType] is fractionDigits.
maximumFractionDigits: 0 - 20. Only used when [roundingType] is fractionDigits.
minimumSignificantDigits: 1 - 21. Only used when [roundingType] is significantDigits.
maximumSignificantDigits: 1 - 21. Only used when [roundingType] is significantDigits.
```
