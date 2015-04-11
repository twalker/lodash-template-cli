#lodash-template-cli

Run lodash.template from the command line.

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

```bash
_template -f tpl.html -j data.json -o out.html
```

__outputs__

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
