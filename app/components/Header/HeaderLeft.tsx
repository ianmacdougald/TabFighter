import React, { useContext } from 'react';
import { RandomMode } from './Modes/Random';
import { SelectAllMode } from './Modes/SelectAll';
import { DeleteMode } from './Modes/Delete';
import { SelectContext } from '../../context/SelectContext';

const HeaderLeft = () => {
  const selectedTabs = useContext(SelectContext)?.selectedTabs;
  return (
    <div className='flex items-center'>
      { selectedTabs && selectedTabs.size ? <DeleteMode /> : null }
      <SelectAllMode></SelectAllMode>
      <RandomMode></RandomMode>
    </div>
  )
}

export default HeaderLeft;