# NPM available names.

This script will check if a name is available on NPM.

To do so the script usages a regex test from [check-if-word](https://www.npmjs.com/package/check-if-word) to check if it is a valid `en` word.

## Contents

- `index.mjs` - Mail file to run the check.
  - first argument: start from this name, default: `aaaa`.
  - second argument: number of characters, default: `4`.
- In the following folders, available names for each number of characters. (up to 5. Feel free to check more yourself)
- `/3` - 3 characters names.
- `/4` - 4 characters names.
- `/5` - 5 characters names.

## Usage

To give the script a starting point at aaa and check 3 characters names:

```bash
node index.mjs aaa 3
```

> Important, if you want to check 3,5,6,etc... characters names, you need to run the script for each of them and with the correct starting point eg `aaa` for 3 characters names, `aaaa` for 4 characters names, etc...
