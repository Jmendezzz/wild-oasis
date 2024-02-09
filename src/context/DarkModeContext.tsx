import { ReactElement, createContext, useContext, useEffect, useState } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState";


const DarkModeContext = createContext();

function DarkModeProvider({children}:{children: ReactElement | ReactElement[]}) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme:dark)').matches, 'isDarkMode');

    useEffect(()=>{
        document.documentElement.classList.add(isDarkMode ? 'dark-mode' : 'ligth-mode');
        document.documentElement.classList.remove(isDarkMode ?'light-mode' : 'dark-mode');
    },[isDarkMode])

    function toggleDarkMode(){
        setIsDarkMode(prev => !prev);
    }


  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}} >
        {children}
    </DarkModeContext.Provider>
  )
}

function useDarkModeContext(){
    const context =  useContext(DarkModeContext);

    if(!context) throw new Error('DarkModeContext was used outside of DarkmodeProvider');

    return context;
}

export {DarkModeProvider, useDarkModeContext}