const generatePassword = (length: number): string => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i+1) {
    password += chars[array[i] % chars.length];
  }
  return password;
};

export default generatePassword;
