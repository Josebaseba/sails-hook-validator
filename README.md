# Sails.js request validation hook

[![Build Status](https://travis-ci.org/Josebaseba/sails-hook-validator.svg?branch=master)](https://travis-ci.org/@touch4it/sails-hook-validator)
![Sails dependency version (scoped)](https://img.shields.io/npm/dependency-version/@touch4it/sails-hook-validator/peer/sails)
![Validator dependency version (scoped)](https://img.shields.io/npm/dependency-version/@touch4it/sails-hook-validator/validator)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![npm version](https://img.shields.io/npm/v/@touch4it/sails-hook-validator)
![node version](https://img.shields.io/node/v/@touch4it/sails-hook-validator)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@touch4it/sails-hook-validator)
![last commit](https://img.shields.io/github/last-commit/touch4it/sails-hook-validator)

Sails hook for validate request.

```javascript
  npm install --save @touch4it/sails-hook-validator
```

## `req.validator(rules, [sendResponse=true, [cb]])`

>  Requirements:
> - [Sails](https://www.npmjs.com/package/sails) ^1.0.0
> - [Lodash](https://www.npmjs.com/package/lodash) enabled as global in Sails (by default it comes enabled)
> - Node.js >= 10

### `rules`

Rules defined as string parameter name (required string value) or object (more complex validation). Rules passed as array of strings or objects

Optional parameters prefixed with `?`

Possible options specified later in "Validation types" section

```js
req.validator(['name']);

```

```js
req.validator([{'name': 'string'}]);
```

```js
req.validator(['?name']);

```

### `sendResponse`

`true`: If something goes wrong, return a 400 to the user with the error

`false`: Return

### `cb`

Callback function

## Return value

If something goes wrong it returns a 400 or false, based on `sendResponse`. If validation is successful, it returns the params. It works as a filter too, since it returns only parameters specified in `rules`.

## Examples

Filter of parameters

If there is single parameter to be validated, we can pass it as string instead of array

```js
  // req.params.all() === {name: 'joseba', surname: 'legarreta'}

  const params = req.validator('name');

  // params === {name: 'joseba'}
```

For more that one params the required params have to pass it as an Array

Missing parameter causes system to return 400 if second parameter (`sendResponse`) is not set or `true`. False is returned if second parameter is `false`

```js
  // req.params.all() === {id: 1, name: 'joseba'}

  const params = req.validator(['id', 'password'], false);

  // params === false

  if (!params) {
    return null;
  }
```

```js
  // req.params.all() === {id: 1, name: 'joseba'}

  const params = req.validator(['id', 'password']);

  // Sent 400 with message "password is required."
```

Callback function can be used to notify execution end

```js
  const filter = [
    'id',
    '?name',
    {'?surname': ['string', 'toUpper']},
    height: 'float',
    '?age': 'int'
  ];
  req.validator(filter, false, function(err, params) {
    // err === {message: 'parsedError...', invalidParameters: ['invalid', 'parameter', 'list']}
    if (err) {
      return res.badRequest(err.message);
    }
    return res.ok(params);
  });
```
or
```js
  const filter = [
    'id',
    '?name',
    {'?surname': ['string', 'toUpper']},
    height: 'float',
    '?age': 'int'
  ];
  req.validator(filter, function(err, params) {
    // If error occurs the validator will use req.status(400).send(...)
    return res.ok(params);
  });

```

Apart from validation, we can also use sanitization of inputs

```js

  // req.params.all() === {id: 1, likes: '12.20', url: 'HttP://GOOGLE.eS', email: 'JOSEBA@gMaiL.com'}
  const params = req.validator(['id', {likes: 'int', url: ['url', 'toLower'], email: 'email'}]);
  // params = {id: 1, likes: 12, url: 'http://google.es', email: 'joseba@gmail.com'}
```
```js
  // req.params.all() === {id: 1, likes: '12.20', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
  const params = req.validator(['id', 'url', {likes: 'float', email: 'email'}]);
  // params = {id: 1, likes: 12.20, url: 'http://google.es', email: 'joseba@gmail.com'}
```
```js
  // req.params.all() === {id: 1, likes: 'hello', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
  const params = req.validator(['id', {url: ['url', 'lower'], likes: 'float', email: 'email'}]);
  // Client gets a 400 - 'likes' has to be a float
```

We can also specify optional values by prefixing `?`

```js
  // If we have a nickname and/or a name parameters it will return it to the `param`  applying the rules
  // If nickname or/and name are undefined in the request, it will ignore them and won't send 400

  const param = req.validator('?nickname', {color: ['hexcolor', 'upper'], '?name': 'toUpper'});
```

### Validation

Validation uses [validator](https://www.npmjs.com/package/validator) package under the hood

#### Validation types

*   `alpha` - letters only
*   `alphanumeric` - letters and numbers
*   `ascii`
*   `base64`
*   `boolean`
*   `country2` - ISO 3166-1 alpha-2
*   `country3` - ISO 3166-1 alpha-3
*   `creditCard`
*   `date` - ISO 8601 or RFC 3339 date
*   `email`
*   `empty`
*   `float`
*   `fqdn` - fully qualified domain name
*   `hex`
*   `hexColor`
*   `int`
*   `ip` - IPv4 or IPv6
*   `ipRange` - IPv4 range
*   `isbn` - ISBN
*   `issn` - ISSN
*   `isin` - ISIN
*   `isrc` - ISRC
*   `json`
*   `jwt`
*   `latlon`
*   `lower` - lowercase
*   `macAddress`
*   `mobilePhone`
*   `md5`
*   `mongoId`
*   `numeric`
*   `port`
*   `string`
*   `upper` - uppercase
*   `uuid` - UUID v 3, 4 or 5
*   `url`

#### Sanitization types

*   `escape` - replace <, >, &, ', " and / with HTML entities
*   `unescape` - replaces HTML encoded entities with <, >, &, ', " and /
*   `trim` - trim whitespaces from left and right
*   `ltrim` - trim whitespaces from left
*   `rtrim` - trim whitespaces from right
*   `toBoolean`
*   `toDate`
*   `toEmail`
*   `toLower`
*   `toUpper`

## Tests

To test this hook, you need [mocha](https://www.npmjs.com/package/mocha) installed in your computer globally.

```javascript
// Just if you don't have mocha installed yet
npm install -g mocha

// And then just run mocha in the hook folder

mocha

// Optional: Change port or log level

log=info port=1234 mocha

// log level options = error, warn, info, verbose and silly. By default: warn
// port by default: 1992
```
