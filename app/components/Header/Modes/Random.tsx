import { Tab } from '../../../../types';
import React, { useCallback, useContext, useState } from 'react';
import { TabContext } from '../../../context/TabContext';
import { SoundContext } from '../../../context/SoundContext';
import { RemoveContext } from '../../../context/RemoveContext';
import getTabs from '../../../utils/getTabs'; 
import { Fatality } from '../../Sounds/Fatality';

export const RandomMode = () => { 
    const setTabToDelete = useContext(RemoveContext)?.setTabToDelete;
    const soundOn = useContext(SoundContext)?.soundOn;
    const allTabs = useContext(TabContext)?.allTabs;
    const setAllTabs = useContext(TabContext)?.setAllTabs;
    const [fatality, setFatality] = useState(false);

    const randomClick = async () => {
        if (allTabs) {
          const tabsList = Object.values(allTabs).reduce((acc, curr): Tab[] => {
            acc.push(...curr);
            return acc;
          }, []);
          const randNum = Math.floor(Math.random() * tabsList.length);
          const randTab = tabsList[randNum].tabId;
    
    
          if(soundOn) setFatality(prev => !prev);
          if (randTab) {
            if (setTabToDelete) setTabToDelete(randTab);
            const tabToDelete = await chrome.tabs.get(randTab);
            const { active, windowId } = tabToDelete;
            let timeToRemove: number;
            if (active) timeToRemove = 1500;
            else timeToRemove = 500;
        
            setTimeout(chrome.tabs.remove, timeToRemove, randTab);
            setTimeout(() => getTabs().then(tabs => {
              if (setAllTabs) setAllTabs(tabs);
            }), timeToRemove + 100);
            if(soundOn) setTimeout(() => setFatality(prev => !prev), 1500);
          }
        };
      };

    return <div id="random-mode" className="mode">
        <button className='font-medium text-sm tooltip' id="random" data-tip='Close a tab at random' onClick={randomClick}>
            Random
        </button>
        {fatality && soundOn && <Fatality play={fatality}/>}
    </div>
}