import {useState} from 'react';

export function useCommunityListItem() {
  const [showWriter, setShowWriter] = useState(false);

  const handleClickKebab = () => {
    setShowWriter(prev => !prev);
  };

  return {showWriter, handleClickKebab};
}
