const { createErrorClass, createErrorsList, helpers } = require('../');

const RuntimeError = createErrorClass('RuntimeError', 'Error during validation.', Error);
const ValidationError = createErrorClass('ValidationError', 'Error during validation.', Error);

const UserValidationError = createErrorClass(
  'UserValidationError',
  'Error during user validation.',
  ValidationError
);

const UserValidationErrors = createErrorsList({
  NO_NAME: 'Please specify name.',
  NO_LOGIN: 'Please specify login.',
}, UserValidationError);


try{
  try {
    throw new UserValidationErrors.NO_NAME({ user: { name: null } });
  } catch (e) {
    // e instanceof UserValidationError; // true
    // e instanceof ValidationError; // true
    // e instanceof Error; // true
    // e instanceof RuntimeError; // false
    throw new RuntimeError(null, e);
  }
} catch (e) {
  // e instanceof RuntimeError; // true
  helpers.hasErrorClass(e, ValidationError); // true
}

