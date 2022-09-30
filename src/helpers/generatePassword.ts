const generatePassword = (length: number): string => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  array.forEach((_char, index) => {
    password += chars[array[index] % chars.length];
  });
  return password;
};

export default generatePassword;
