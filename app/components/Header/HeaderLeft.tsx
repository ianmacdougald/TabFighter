import React, { useState, useContext } from 'react';
import { RandomMode } from './Modes/Random';
import { SelectAllMode } from './Modes/SelectAll';

const HeaderLeft = () => {
  return (
    <div className='flex items-center'>
      <SelectAllMode></SelectAllMode>
      <RandomMode></RandomMode>

     
    </div>
  )
}

export default HeaderLeft;