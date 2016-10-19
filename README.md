# ⚠ Errors Helpers [![Build Status](https://travis-ci.org/Travelport-Ukraine/errors-helpers.svg?branch=master)](https://travis-ci.org/Travelport-Ukraine/errors-helpers)

This library helps with error handling in Node.

It provides following API:
- Generators API
    - Custom error creation (with inheritance and chaining)
    - Creates lists of errors from simple key-value objects
- Helpers API
    - Getting iterable object from error instance
    - Getting full name for inherited error instance
    - Getting array of stacks for an error chain
    - Detecting if there is an error of particular error class in the chain

## Installation

Run `npm install --save node-errors-helpers`

## Example

Simple usage of this lib.

```javascript
const { createErrorClass, createErrorsList } = require('errors-helpers');

const SWError = createErrorClass(
  'RuntimeError',
  'Runtime error',
  Error // parent error class, optional
);

const StarWarsErrors = createErrorsList({
  'NO_LUKE': 'No Luke Skywalker!',
  'NO_DARTH': 'No Darth Vader!',
  'YOUR_FATHER': 'I am you father, Luke!',
}, SWError);

throw new SWError();
throw new StarWarsErrors.YOUR_FATHER({ location: 'Bespin' });
throw new StarWarsErrors.NO_LUKE({ far: 'away' }, causedByError /* some generated or catched error */);
```

[More examples.](/examples/generateFromList.js)

## API
* [createErrorClass(name, message, baseType)](#createclass) ⇒ [`CustomError`](#customerror)
* [createErrorsList(list, extend)](#createlist) ⇒ `Object`
* helpers
  * .[getFullName(error)](#fullname) ⇒ `String`
  * .[getObject(error)](#getobject) ⇒ `Object`
  * .[getFullStack(error)](#fullstack) ⇒ `Array\<String>`
  * .[hasErrorClass(error, ErrorClass)](#haserrorclass) ⇒ `Boolean`

<a name="createclass"></a>
### createErrorClass(name, message, baseType))

Creates error class with the `name` provided, that will throw error with `message`. When `baseType` class provided, new error class will be extending base one, if not `Error` class is extended. Each error generated with this helper will have specific structure and [constructor](#customerror).

**Returns**: `CustomError`

| Param | Type | Description | Optional |
| --- | --- | --- | --- |
| name | `String` | Name the for class to generate. | no |
| message | `String` | The message calss instance will be thrown with. | no |
| baseType | `String` | Class to extend. If not provided `Error` class is extended. | yes |

<a name="customerror"></a>
#### CustomError

Any custom error has such constructor:
```javascript
  const err = new CustomError(data = null, causedBy = null);
  // err.data
  // err.name
  // err.causedBy
```

Created error class will throw error instance with [`message`](#createclass) provided in class constructor.
Field `data` has `any` type. So you can pass there everything.

You can pass an error as second param and it will be saved as cause of current error. See [examples](/examples/generateFromList.js) for more information.

<a name="createlist"></a>
### createErrorsList(list, extend)
Generates object of errors from object of definitions.
If no `extend` class provided error classes are extended from `Error`.

Object sample:
```javascript
{
  'SOME_ERROR_CODE': 'Message that will be shown.',
  'ANOTHER_ERROR': 'Another message %)'
}
```
**Returns**: `Object (key - code, value - Error)`

| Param | Type | Description | Optional |
| --- | --- | --- | --- |
| list | `Object` |  Object that define errors. | no |
| extend | `AnyErrorType` |  Class that all generated errors will extend. | yes |

<a name="fullname"></a>
### helpers.getFullName(error)

Returns full name of error. Concats all parent classes names with `.`.

**Returns**: `String`

| Param | Type | Description | Optional |
| --- | --- | --- | --- |
| error | `CustomError` | CustomError | no |


<a name="getobject"></a>
### helpers.getObject(error)

Retruns iterable error data object.

For better errors representation in JSON format.

**Returns**: `Object { name, stack, message, data, causedBy }`

| Param | Type | Description | Optional |
| --- | --- | --- | --- |
| error | `CustomError` | CustomError | no |


<a name="fullstack"></a>
### helpers.getFullStack(error)

Recursively gets stacks from `causedBy` errors and return `Array` of them.

**Returns**: `Array\<String>`

| Param | Type | Description | Optional |
| --- | --- | --- | --- |
| error | `CustomError` | CustomError | no |

<a name="haserrorclass"></a>
### helpers.hasErrorClass(error, ErrorClass)

Looks for `ErrorClass` in `error`. Recursivly looks in `causedBy` fields.
Returns `true` if an instance of `ErrorClass` is found, `false` otherwise.


**Returns**: `Boolean`

| Param | Type | Description | Optional |
| --- | --- | --- | --- |
| error | `CustomError` | Where to look for class. | no |
| ErrorClass | `AnotherCustomError` | What class to look for. | no |

