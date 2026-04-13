import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'test-challenge-storage',
  encryptionKey: 'hunter2',
  encryptionType: 'AES-256',
  mode: 'multi-process',
  readOnly: false,
  compareBeforeSet: false,
});
