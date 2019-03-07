# sails-hook-req-validator

[![Build Status](https://travis-ci.org/Josebaseba/sails-hook-validator.svg?branch=master)](https://travis-ci.org/Josebaseba/sails-hook-validator)

Sails hook for validate request.

```javascript
  npm install --save sails-hook-validator
```

## req.validator();

>  Requirements:
Sails v1.0.0 and lodash enabled as global (by default it comes enabled) and node 6 >=

If something goes wrong it return a 400 to the user with the error, if it goes ok it returns the params. It works as a filter too, for example if the client sends name and surname but we only want to work with the name:

```javascript
  // req.params.all() === {name: 'joseba', surname: 'legarreta'}

  var param = req.validator('name');

  // param === {name: 'joseba'}

  // MORE EXAMPLES
  // For more that one params the required params have to go in an Array
  // req.params.all() === {id: 1, name: 'joseba'}

  var params = req.validator(['id', 'password']);

  // params === false && the client has a 400 - password is required
  // so we end the controller execution

  if(!params) return null;
  // If we have params continue the logic
  User.update(params.id, params).exec(function(){}); //...

  // MORE STUFF

  // Not sending the default 400 code with error text
  // Just set the second params as false.
  var params = req.validator(['nickname', 'email', 'password', '?name'], false);

  // In case of error params === false else the params will be an object with values

  if(params) return res.ok(); else return res.badRequest('Custom message');

  // ASYNC WAY GET ERROR AND PARAMS

  var filter = [
    'id', '?name',
    {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
  ];
  req.validator(filter, false, function(err, params){
    // err === {message: 'parsedError...', invalidParameters: ['invalid', 'parameter', 'list']}
    if(err) return res.badRequest(err.message);
    return res.ok(params);
  });

  // OR

  var filter = [
    'id', '?name',
    {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
  ];
  req.validator(filter, function(err, params){ // If error the validator will send the req.400
    if(params) return res.ok(params);
  });

```

If we want to check the type we can ask for it, for example: int, email, boolean, float... req.validator checks if it is the type that we are looking for or if it's posible to convert to the type that we want (ex: 'upper' check if is upperCase text, 'toUpper' upperCase the text if the value is a string, if it couldn't upperCase it the client will get an 400).

If it can't convert or the types doesn't match, it will send the 400 error to the client. Example:

```javascript

  // req.params.all() === {id: 1, likes: '12.20', url: 'HttP://GOOGLE.eS', email: 'JOSEBA@gMaiL.com'}
  var params = req.validator(['id', {likes: 'int', url: ['url', 'toLower'], email: 'email'}]);
  // params = {id: 1, likes: 12, url: 'http://google.es', email: 'joseba@gmail.com'}

  // MORE EXAMPLES

  // req.params.all() === {id: 1, likes: '12.20', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
  var params = req.validator(['id', 'url', {likes: 'float', email: 'email'}]);
  // params = {id: 1, likes: 12.20, url: 'http://google.es', email: 'joseba@gmail.com'}

  // MORE

  // req.params.all() === {id: 1, likes: 'hello', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
  var params = req.validator(['id', {url: ['url', 'lower'], likes: 'float', email: 'email'}]);
  // params === false and the client gets a res 400 - 'likes' has to be a float

  // More examples

  var param = req.validator({color: ['hexcolor', 'upper']});

  // More examples

  // Optional values

  var param = req.validator('?nickname', {color: ['hexcolor', 'upper'], '?name': 'toUpper'});

  // If we have a nickname and/or a name parameters it will return it to the param var applying the rules
  // If nickname or/and name are undefined in the request, it will ignore them and won't send 400

```

### Validation

Validation uses [validation](https://www.npmjs.com/package/validator) package under the hooh

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
