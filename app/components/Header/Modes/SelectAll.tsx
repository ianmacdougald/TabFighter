import React, { useState, useCallback } from 'react';

interface SelectAllProps { 
    action: () => void;
}

const SelectAll: React.FC<SelectAllProps> = ({ action }) => { 
    const [ checked, setChecked ] = useState<boolean>(false);
    const onClick = useCallback((e: any) => { 
        // Check the box and select everything
        setChecked(prev => !prev); 
        action();
    }, [ action ]);

    return ( 
        <div id="select-all-mode" className="mode select-btn flex items-center justify-center h-10 m-auto">
            <input type='checkbox' checked={checked} className={`checkbox checkbox-primary 'checkbox-md mx-1'`} onClick={onClick} />
        </div>
    )
}

export default SelectAll;