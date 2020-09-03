# eslint-plugin-import-sort-by-depth

Sorts imports starting by node_modules, then user&#39;s own components

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-import-sort-by-depth`:

```
$ npm install eslint-plugin-import-sort-by-depth --save-dev
```


## Usage

Add `import-sort-by-depth` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "import-sort-by-depth"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "import-sort-by-depth/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





