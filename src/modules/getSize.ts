export const getSize = (size: 'xl' | 'l' | 'm' | 's'): string => {
  switch (size) {
    case 'xl':
      return '28px';
    case 'l':
      return '16px';
    case 'm':
      return '14px';
    case 's':
    default:
      return '12px';
  }
};
