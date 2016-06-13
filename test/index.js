import { generate, get, findInner, lib } from '../src';
import { assert } from 'chai';

const list = {
  NO_BUNNY: 'No bunny.',
  NO_HONEY: 'No honey.',
  NO_MONEY: 'No money.',
};

describe('Modules tests', () => {
  it('should test generate for correct work', () => {
    const errors = generate(list, Error);
    assert(errors.NO_MONEY !== undefined, 'NO_MONEY is missing.');
    const e = new errors.NO_MONEY(null);
    assert(e.inner_error === undefined, 'Inner error is set.');
    assert(e.name === 'NoMoneyError', 'Incorrect name.');
    assert(e.parentName === 'Error', 'Incorrect parent.');
    assert(e.data === null, 'Incorrect data.');
  });

  it('should test findInner for correct work', () => {
    const HunnyBunnyError = lib.helpers.generateClass('HunnyBunnyError', {
      extends: Error,
    });
    const errors = generate(list, HunnyBunnyError);
    const first = new errors.NO_BUNNY(null);
    const second = new errors.NO_HONEY(null, first);

    assert(second.inner_error === first, 'Incorrect inner_error.');
    assert(findInner(second, HunnyBunnyError), 'Find inner is not working.');
  });

  it('should test get for correct work', () => {
    const errors = generate(list, Error);
    const first = new errors.NO_BUNNY({ cat: 'dog' });
    const obj = get(first);
    assert(obj.message, 'No message.');
    assert(obj.code, 'No code.');
    assert(obj.stack, 'No stack.');
    assert(obj.data, 'No data.');
    assert(obj.data.cat === 'dog', 'Data incorrect.');
  });
});
