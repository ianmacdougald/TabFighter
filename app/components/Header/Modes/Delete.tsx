import React, { useContext, useCallback } from 'react'; 
import { SelectContext } from '../../../context/SelectContext';

export const DeleteMode = () => { 
    const selectedTabs = useContext(SelectContext)?.selectedTabs;
    const closeTabs = () => { 
        if (selectedTabs && selectedTabs.size) { 
            setTimeout(() => { 
                selectedTabs.forEach(item => { 
                    try { 
                        chrome.tabs.remove(item)
                    } catch (e) { 
                      console.warn("Failed to remove tab with " + item + " id");
                    }
                  });
            }, 500);
        }
    }

    return (
     <div className='delete-btn flex items-center justify-center h-10 m-auto'  onClick={closeTabs}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
     </div>
    )
}