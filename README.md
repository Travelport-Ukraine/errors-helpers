# ⚠ Errors Helpers

Current lib helps with error handling in Node.
It provides few helpers that makes life easier. If you want error handling and creation be easy use this lib.
 
## Installation

Run `npm install --save node-errors-helpers`

## API

* [get(error)](#getError) ⇒ <code>Object</code>
* [generate(list, extend, [customFields, [getErr]])](#generateFromList) ⇒ <code>Object</code>
* [inner(error, ErrorClass)](#inner) ⇒ <code>Boolean</code>
* [lib](#FBPlatform+sendImage) ⇒ <code>Object</code>

<a name="getError"></a>
### get(error)

Generate object representation of the Error.

**Returns**: <code>{ code, message, stack, data }</code>

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Any error created with [generateFromList](#generateFromList) |


<a name="generateFromList"></a>
### generate(list, extend, [customFields, [getErr]])]
Generate array of errors from object of definitions.
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
| extend | <code>AnyErrorType</code> |  Class that will all generated errors extend. |
| customFields | <code>Array\<String\></code> | Additional fields that each error will have. Objects will contain fields as props of an object. Default `['data']` |
| getErr | <code>Function(AnyErrorType)</code> | Function that generate object from error. Default: [getError](#getError) |


<a name="inner"></a>
### inner(error, ErrorClass)

Check if error has any inner errors with ErrorClass.

**Returns**: <code>Boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Any error created with [generateFromList](#generateFromList) |
| ErrorClass | <code>Error</code> | Any Error from Node or current lib. |

<a name="lib"></a>
### lib

This lib points to [node-common-errors](https://github.com/shutterstock/node-common-errors)
