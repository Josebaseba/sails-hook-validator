# sails-hook-req-validator

Sails hook for validate request.

###req.validator();

###### Under development

If something goes wrong it return a 400 to the user with the error, if it goes ok it returns the params. It works as a filter too, for example if the client sends name and surname but we only want to work with the name:

```javascript
  // req.params.all() === {name: 'joseba', surname: 'legarreta'}

  var param = req.validator('name');

  // param === {name: 'joseba'}

  // MORE EXAMPLES

  // req.params.all() === {id: 1, name: 'joseba'}

  var params = req.validator('id', 'password');

  // params === false && the client has a 400 - password is required
  // so we end the controller execution

  if(!params) return null;
  // If we have params continue the logic
  User.update(params.id, params).exec(function(){}); //...

```

If we want to check the type we can ask for it, for example: int, email, boolean, float... As you know all the ajax request are simple text (string) but req-validator checks if it is posible to convert to the type that we want, if it can't it will send the 400 error to the client. Example:

```javascript

// req.params.all() === {id: 1, likes: '12.20', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
var params = req.validator(['id', {likes: 'int', url: ['url', 'lower'], email: 'email'}]);
// params = {id: 1, likes: 12, url: 'http://google.es', email: 'joseba@gmail.com'}

// MORE EXAMPLES

// req.params.all() === {id: 1, likes: '12.20', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
var params = req.validator(['id', 'url', {likes: 'float', email: 'email'}]);
// params = {id: 1, likes: 12.20, url: 'http://google.es', email: 'joseba@gmail.com'}

// MORE

// req.params.all() === {id: 1, likes: 'hello', url: 'http://google.es', email: 'JOSEBA@gMaiL.com'}
var params = req.validator(['id', 'url', {likes: 'float', email: 'email'}]);
// params === false and the client gets a res 400 - 'likes' has to be a float

// More examples

var param = req.validator({color: ['hexcolor', 'upper']});

```

##### Validation types (for now, maybe I will add more)

```javascript  
  'email'
  'url'
  'ip'
  'alpha'
  'numeric'
  'base64'
  'hex'
  'hexcolor'
  'lower'
  'upper'
  'string'
  'boolean'
  'int'
  'float'
  'date'
  'json'
  'ascii'
  'mongoid'
  'alphanumeric'

```

###### I'm working on it, I've to finish the errorsParser, some refactorization, commenting code and tests.
