#lodash-template-cli

Run lodash.template from the command line.  
e.g. `_template -f tpl.html -j data.json -o out.html`

### install

```
npm install -g twalker/lodash-template-cli
```


### Usage

```
Usage: _template [options]

Options:

  -f, --file [path]  Template file
  -j, --json [path]  Json file
  -o, --out [path]   Output file

```

### example


__input__
tpl.html

```html
<html>
  version: ${version}
  is number 1: ${version === 1}
</html>
```
data.json

```javascript
{ "version": 1 }
```

from terminal:

```bash
_template -f tpl.html -j data.json -o out.html
```

__output__

out.html

```html
<html>
  version: 1
  is number 1: true
</html>

```

TODO:

- switch from commander to yargs
  + template should just be first arg
  + tempate and data should be required
