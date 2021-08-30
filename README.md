# Convert a Google Spreadsheet to a localization file. Version 2

## Installation
`npm install qoqa/localize-with-spreadsheet-2`

## Differences in version 2 (only major ones listed)

- Preserve line breaks from the Google Sheets
- Uses newer version of `google-spreadsheet` which in turn supports the Google Sheets v4 API

## Example

Requires:

- API key (https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=api-key)
- Spreadsheet key
- Sheet name filter

Create a file `update-localization.js`

```javascript
const Localize = require('localize-with-spreadsheet-2')

Localize.fromGoogleSpreadsheet('[api-key]', '[spreadsheet-key]', '*')
  .then(localizer => {
    localizer.setKeyCol('KEY') // name of the column containing the translation key
    localizer.setRemarksCol('Remarks') // name of the column containing the remarks

    Array.from(['en', 'de']).forEach(language => localizer.save(
      `project-name/resource/${language}.lproj/Localizable.strings`,
      { valueCol: language, format: 'ios' } // format can also be 'android' or 'json'
    ))
  })
```

Run it with
`node update-localization.js`

## Advanced

You can filter the worksheets to include with the third parameter of 'fromGoogleSpreadsheet':

```
Localize.fromGoogleSpreadsheet('[api-key]', '[spreadsheet-key]', '*')
Localize.fromGoogleSpreadsheet('[api-key]', '[spreadsheet-key]', '[mobile-app]')
```

## Notes

- The script will preserve everything that is above the tags: < !-- AUTO-GENERATED --> or // AUTO-GENERATED
