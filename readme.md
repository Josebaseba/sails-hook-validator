# sails-hook-req-validator

Sails hook for validate request.

```javascript
  npm install --save sails-hook-validator
```

###req.validator();

> ######Requirements:
Sails v0.11.X and lodash enabled as global (by default it comes enabled). For v0.10.X see below.

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

  // More exaples

  // Not sending the default 400 code with error text
  // Just set the second params as false.
  var params = req.validator(['nickname', 'email', 'password', '?name'], false);

  // In case of error params === false else the params will be an object with values

  if(params) return res.ok(); else return res.badRequest('Custom message');


```

##### Validation types (for now, maybe I will add more)

```javascript  
  'email'
  'toEmail'
  'url'
  'ip'
  'alpha'
  'numeric'
  'base64'
  'hex'
  'hexColor'
  'lower'
  'toLower'
  'upper'
  'toUpper'
  'string'
  'boolean'
  'toBoolean'
  'int'
  'float'
  'date'
  'toDate'
  'json'
  'ascii'
  'mongoId'
  'alphanumeric',
  'creditCard'
```

#### Sails v0.10.X

To work with req.validator() in v0.10 just clone this repo inside of api/hooks folder. <b>Not tested yet in v0.10!</b> But it should work with no problem...

## TO-DO

###### I'm working on it, I've to finish the some refactorization, comments in code, adding tests and docs.

- [x] Create basic usage of hook and check if it works

- [x] Publish in npm to test working in a sails application

- [x] Add the optional parameter option, with an '?' after the param name ('?surname')

- [x] Add the option of not sending the 400 default error

- [ ] Finish the tests

- [ ] Publish the 0.11.1 version

- [ ] Test it with sails 0.10

## Tests

To test this hook, you need [mocha](https://github.com/mochajs/mocha) installed in your computer globally.

```javascript
npm install -g mocha // Just if you don't have mocha installed yet

// And then just run mocha in the hook folder

mocha

// Optional: Change port or log level

log=info port=1234 mocha

// log level options = error, warn, info, verbose and silly. By default: warn
// port by default: 1992

```
