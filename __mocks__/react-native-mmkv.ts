const mockStorage = {
  set: jest.fn(),
  getString: jest.fn(),
  getNumber: jest.fn(),
  getBoolean: jest.fn(),
  getBuffer: jest.fn(),
  getAllKeys: jest.fn(() => []),
  contains: jest.fn(() => false),
  delete: jest.fn(),
  clearAll: jest.fn(),
  addOnValueChangedListener: jest.fn(() => ({ remove: jest.fn() })),
};

export const createMMKV = jest.fn(() => mockStorage);
