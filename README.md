   # ⚠ Errors Helpers [![Build Status](https://travis-ci.org/Travelport-Ukraine/errors-helpers.svg?branch=master)](https://travis-ci.org/Travelport-Ukraine/errors-helpers)

Current lib helps with error handling in Node.
It provides few helpers that makes life easier. If you want error handling and creation be easy use this lib.
 
## Installation

Run `npm install --save node-errors-helpers`

## Example

Simple usage of this lib.

```javascript
const { createErrorClass, createErrorsList } = require('errors-helpers');

const SWError = createErrorClass(
	'RuntimeError', 
    'Error during validation.', 
    Error
);

const StarWarsErrors = createErrorsList({
    'NO_LUKE': 'No Luke Skywalker!',
    'NO_DARTH': 'No Darth Vader!',
    'YOUR_FATHER': 'I am you father, Luke!',
  }, 
  SWError);

throw new StartWarsErrors.YOUR_FATHER({ /* additional data */ });
throw new StartWarsErrors.NO_LUKE({ far: 'away' }, causedByError /* some error */);
```

[More examples.](/examples/generateFromList.js)

## API
* [createErrorClass(name, message, baseType)](#createclass) ⇒ [<code>CustomError</code>](#customerror)
* [createErrorsList(list, extend)](#createlist) ⇒ <code>Object</code>
* helpers
  * .[getFullName(error)](#fullname) ⇒ <code>String</code>
  * .[getObject(error)](#object) ⇒ <code>Object</code>
  * .[getFullStack(error)](#fullstack) ⇒ <code>Array\<String></code>
  * .[hasErrorClass(error, ErrorClass)](#haserrorclass) ⇒ <code>Boolean</code>

<a name="createclass"></a>
### createErrorClass(name, message, baseType))

Creates class with `name` that will throw error with `message` that extends `baseType` class. Each error generated with this helper will have specific structure and [constructor](#customerror). 

**Returns**: <code>CustomError</code>

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name for class to generate. |
| message | <code>String</code> | Message for class to throw. |
| baseType | <code>String</code> | Class to extend. |

<a name="customerror"></a>
#### CustomError

Any custom error has such constructor: 
```javascript
const err = new CustomError(data = null, causedBy = null);
	// err.data
    // err.name
    // err.causedBy
```

By default such error class will throw error with [`message`](#createclass).
Field `data` has `any` type. So you can pass there everything. 

You can pass some error as second param and it will be saved as cause of current error. See [examples](/examples/generateFromList.js) for more information.

<a name="createlist"></a>
### createErrorsList(list, extend)
Generate object of errors from object of definitions.
Object sample: 
```javascript
{
  'SOME_ERROR_CODE': 'Message that will be shown.',
  'ANOTHER_ERROR': 'Another message %)'
}
```
**Returns**: <code>Object (key - code, value - Error)</code>

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Object</code> |  Object that define errors. |
| extend | <code>AnyErrorType</code> |  Class that all generated errors will extend. |

<a name="fullname"></a>
### helpers.getFullName(error)

Returns full name of error. Concats all parent classes names with `.`

**Returns**: <code>String</code>

| Param | Type | Description |
| --- | --- | --- |
| error | <code>CustomError</code> | CustomError |


<a name="object"></a>
### helpers.getObject(error)

Retruns object.

For better errors representation in JSON format. 

**Returns**: <code>Object { name, stack, message, data, causedBy }</code>

| Param | Type | Description |
| --- | --- | --- |
| error | <code>CustomError</code> | CustomError |


<a name="object"></a>
### helpers.getFullStack(error)

Recursivly gets stacks from `causedBy` errors and return `Array` of them.

**Returns**: <code>Array\<String></code>

| Param | Type | Description |
| --- | --- | --- |
| error | <code>CustomError</code> | CustomError |

<a name="haserrorclass"></a>
### helpers.hasErrorClass(error, ErrorClass)

Looks for `ErrorClass` in `error`. Recursivly looks in `causedBy` fields.


**Returns**: <code>Boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| error | <code>CustomError</code> | Where to look for class. |
| ErrorClass | <code>AnotherCustomError</code> | What class to look for. |

