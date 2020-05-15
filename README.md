# node-lipi
Collection of tools for working with Indian language scripts

# Install

```
$ npm install --save lipi
```

# Modules

## Detect

Detects the stript for the given input stirng. Basically, it looks at the first few characters in the string and returns the most probable script based on the characters used.

Supported scripts:
- `deva` (Devanagari)
- `beng` (Bengali)
- `guru` (Gurumukhi)
- `gujr` (Gujarati)
- `orya` (Oriya)
- `taml` (Tamil)
- `telu` (Telugu)
- `knda` (Kannada)
- `mlym` (Malayalam)

Return value will be one of the above code or `qaaa`, if the it was not able to identify one of these scripts with enough confidence.

## Transliterate

Transliterate the input string. Takes source and target script code.

Supported scripts:
- `deva` (Devanagari)
- `gujr` (Gujarati)
