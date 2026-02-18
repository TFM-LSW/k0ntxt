export const isHexColor = (value: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(value);
};