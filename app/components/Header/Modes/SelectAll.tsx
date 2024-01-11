import React, { useState, useCallback, useContext } from 'react';
import { TabContext } from '../../../context/TabContext';
import { SelectContext } from '../../../context/SelectContext';

interface SelectAllProps { 
   
}

export const SelectAllMode: React.FC<SelectAllProps> = ({  }) => { 
    const allTabs = useContext(TabContext)?.allTabs; 
    const addToSelectedTabs = useContext(SelectContext)?.addToSelectedTabs;
    const removeFromSelectedTabs = useContext(SelectContext)?.removeFromSelectedTabs;
    const [ checked, setChecked ] = useState<boolean>(false);
    const selectAll = () => { 
        if (allTabs && !checked) {
            if (addToSelectedTabs) { 
              const tabs = Object.values(allTabs)[0]
                  .filter(tab => tab.tabId)
                  .map(tab => Number(tab.tabId));
    
              addToSelectedTabs(...tabs);
              setChecked(true);
            }
          }
        else if (checked) { 
          // With no input, removes all from selected tabs by default
          if (removeFromSelectedTabs) removeFromSelectedTabs();
          setChecked(false);
        }
      }

    return ( 
        <div id="select-all-mode" className="mode select-btn flex items-center justify-center h-10 m-auto">
            <input type='checkbox' checked={checked} className={`checkbox checkbox-primary 'checkbox-md mx-1'`} onClick={selectAll} />
        </div>
    )
}
