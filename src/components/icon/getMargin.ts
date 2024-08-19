export const getNullIconMargin = (size: 'xl' | 'l' | 'm' | 's'): string => {
  switch (size) {
    case 'xl':
      return '4px';
    case 'l':
      return '4px';
    case 'm':
      return '3px';
    case 's':
    default:
      return '2px';
  }
};
