const expect = require('chai').expect;
const createErrorClass = require('../').createErrorClass;
const createErrorsList = require('../').createErrorsList;
const getErrorFullName = require('../').helpers.getFullName;
const getErrorObject = require('../').helpers.getObject;
const getErrorFullStack = require('../').helpers.getFullStack;
const errorHasErrorClass = require('../').helpers.hasErrorClass;

const BAR_ERROR_MESSAGE = 'Bar error has occured';
const BARTENDER_ERROR_MESSAGE = 'Bartender error has occured';
const BAR_ERROR_DATA = {
  somevar: 'someval',
  anothervar: 'anotherval'
};
const SIMPLE_ERRORS_LIST = {
  RAKE: 'You stepped on a rake',
  SLEEP: 'Do not sleep while you supposed to be working',
};
const BAR_ERRORS_LIST = {
  NO_LIGHT: 'No light turned on',
  NO_WATER: 'No water available',
  BARTNENDERS_BUSY: 'All bartenders are busy',
};

describe('Generators', () => {
  describe('#createErrorClass', () => {
    it('should create error class', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      expect(BarError).to.be.a('Function');
      expect(BarError.name).to.equal('BarError');
    });
    it('should create error instance without data', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const be = new BarError();
      expect(be).to.be.an.instanceOf(Error);
      expect(be).to.be.an.instanceOf(BarError);
      expect(be.stack).to.be.ok;
      expect(be.message).to.equal(BAR_ERROR_MESSAGE);
      expect(be).to.have.all.keys(['name', 'data']);
      expect(be.name).to.equal('Error.BarError');
      expect(be.__proto__.name).to.equal('BarError');
      expect(be.data).to.equal(null);
    });
    it('should create error instance with data', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const be = new BarError(BAR_ERROR_DATA);
      expect(be).to.be.an.instanceOf(Error);
      expect(be).to.be.an.instanceOf(BarError);
      expect(be.stack).to.be.ok;
      expect(be.message).to.equal(BAR_ERROR_MESSAGE);
      expect(be).to.have.all.keys(['name', 'data']);
      expect(be.data).to.be.an('Object');
      expect(be.data).to.have.all.keys(Object.keys(BAR_ERROR_DATA));
    });
    it('should create error caused by another error', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const be = new BarError(null, new Error('Security error'));
      expect(be).to.be.an.instanceOf(Error);
      expect(be).to.be.an.instanceOf(BarError);
      expect(be.stack).to.be.ok;
      expect(be.message).to.equal(BAR_ERROR_MESSAGE);
      expect(be).to.have.all.keys(['name', 'data', 'causedBy']);
      expect(be.name).to.equal('Error.BarError');
      expect(be.__proto__.name).to.equal('BarError');
      expect(typeof be.causedBy).to.equal('object');
    });
    it('should create inherited instance', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const be = new BartenderError();
      expect(be).to.be.an.instanceOf(Error);
      expect(be).to.be.an.instanceOf(BarError);
      expect(be).to.be.an.instanceOf(BartenderError);
      expect(be.stack).to.be.ok;
      expect(be.message).to.equal(BARTENDER_ERROR_MESSAGE);
      expect(be).to.have.all.keys(['name', 'data']);
      expect(be.name).to.equal('BarError.BartenderError');
      expect(be.__proto__.name).to.equal('BartenderError');
      expect(be.data).to.equal(null);
    });
  });
  describe('#createErrorsList', () => {
    it('should create errors list inherited from Error', () => {
      const list = createErrorsList(SIMPLE_ERRORS_LIST);
      expect(list).to.have.all.keys(Object.keys(SIMPLE_ERRORS_LIST));
      expect(list['RAKE']).to.be.a('Function');
      expect(list['RAKE'].name).to.equal('RAKE');
    });
    it('should create error from the list created', () => {
      const list = createErrorsList(SIMPLE_ERRORS_LIST);
      const be = new list.RAKE();
      expect(be).to.be.an.instanceOf(Error);
      expect(be).to.be.an.instanceOf(list.RAKE);
      expect(be).to.have.all.keys(['name', 'data']);
      expect(be.name).to.equal('Error.RAKE');
      expect(be.__proto__.name).to.equal('RAKE');
      expect(be.data).to.equal(null);
    });
    it('should create errors list inherited from custom error', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const list = createErrorsList(BAR_ERRORS_LIST, BarError);
      expect(list).to.have.all.keys(Object.keys(BAR_ERRORS_LIST));
      expect(list['BARTNENDERS_BUSY']).to.be.a('Function');
      expect(list['BARTNENDERS_BUSY'].name).to.equal('BARTNENDERS_BUSY');
      const be = new list.BARTNENDERS_BUSY();
      expect(be).to.be.an.instanceOf(Error);
      expect(be).to.be.an.instanceOf(list.BARTNENDERS_BUSY);
      expect(be).to.have.all.keys(['name', 'data']);
      expect(be.name).to.equal('BarError.BARTNENDERS_BUSY');
      expect(be.__proto__.name).to.equal('BARTNENDERS_BUSY');
      expect(be.data).to.equal(null);
    });
  });
});

describe('Helpers', () => {
  describe('#getFullName', () => {
    it('should return full name for default Error', () => {
      const efn = getErrorFullName(new Error());
      expect(efn).to.equal('Error');
    });
    it('should return full name for custom Error', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const efn = getErrorFullName(new BartenderError());
      expect(efn).to.equal('Error.BarError.BartenderError');
    });
    it('should return full name for custom Error from list', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const list = createErrorsList(BAR_ERRORS_LIST, BarError);
      const efn = getErrorFullName(new list.NO_WATER());
      expect(efn).to.equal('Error.BarError.NO_WATER');
    });
  });
  describe('#getFullStack', () => {
    it('should return full stack for default Error', () => {
      const efs = getErrorFullStack(new Error());
      expect(efs).to.be.an('Array');
      expect(efs).to.have.length(1);
    });
    it('should return full name for custom Error caused by another', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const efs = getErrorFullStack(new BartenderError(null, new Error()));
      expect(efs).to.be.an('Array');
      expect(efs).to.have.length(2);
    });
  });
  describe('#hasErrorClass', () => {
    it('should return true for Error/Error', () => {
      const hec = errorHasErrorClass(new Error(), Error);
      expect(hec).to.equal(true);
    });
    it('should return false for Error/BarError', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const hec = errorHasErrorClass(new Error(), BarError);
      expect(hec).to.equal(false);
    });
    it('should return true for BarError/Error', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const hec = errorHasErrorClass(new BarError(), Error);
      expect(hec).to.equal(true);
    });
    it('should return true for BarError/BarError', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const hec = errorHasErrorClass(new BartenderError(), BarError);
      expect(hec).to.equal(true);
    });
    it('should return true for BarError/Error', () => {
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const hec = errorHasErrorClass(new BartenderError(), Error);
      expect(hec).to.equal(true);
    });
  });
  describe('#getObject', () => {
    it('should return object for default Error', () => {
      const eo = getErrorObject(new Error());
      expect(eo).to.be.an('object');
      expect(eo).to.have.all.keys(['name', 'message', 'stack', 'data']);
      expect(eo.data).to.equal(null);
      expect(eo.name).to.equal('Error');
      expect(eo.message).to.equal('');
      expect(eo.stack).to.be.ok;
    });
    it('should return object for custom Error', () => {
      const data = { name: 'value' };
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const eo = getErrorObject(new BartenderError(data));
      expect(eo).to.be.an('object');
      expect(eo).to.have.all.keys(['name', 'message', 'stack', 'data']);
      expect(eo.data).to.equal(data);
      expect(eo.name).to.equal('BarError.BartenderError');
      expect(eo.message).to.equal(BARTENDER_ERROR_MESSAGE);
      expect(eo.stack).to.be.ok;
    });
    it('should return object with causedBy field', () => {
      const data = { name: 'value' };
      const BarError = createErrorClass('BarError', BAR_ERROR_MESSAGE);
      const BartenderError = createErrorClass('BartenderError', BARTENDER_ERROR_MESSAGE, BarError);
      const someError = new BarError();
      const eo = getErrorObject(new BartenderError(data, someError));
      expect(eo).to.be.an('object');
      expect(eo).to.have.keys(['causedBy', 'name', 'message', 'stack', 'data']);
      expect(eo.causedBy).to.ok;
      expect(eo.causedBy.name).to.equal('Error.BarError');

    });
  });
});
