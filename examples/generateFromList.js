var m = require('../lib');

var list = {
  NO_MONEY: 'There is no money at this account',
  TIMEOUT: 'Timeout reached.'
};

var list2 = {
  NO_COCA_COLA: 'No coke in bar.',
  NO_FANTA: 'No fanta in bar.',
  NO_SPRITE: 'No sprite in bar.',
};

var PayGateError = m.lib.helpers.generateClass('PayGateError', {
  extends: Error,
});

var BarError = m.lib.helpers.generateClass('BarError', {
  extends: PayGateError,
});

var PayGateErrors = m.generate(list, PayGateError);
var BarErrors = m.generate(list2, BarError);

try {
  throw new PayGateErrors.NO_MONEY({ balance: 0 });
} catch(e) {
  // error has data attribute with prop balance
  e instanceof PayGateError;
  try {
    throw new BarErrors.NO_FANTA(null, e);
  } catch(e2) {
    e2 instanceof BarError // true
    e2 instanceof PayGateError // true
    e2.inner_error // NoMoneyError
  }
}
