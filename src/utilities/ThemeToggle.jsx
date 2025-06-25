// src/utilities/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { ComputerDesktopIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';


export default function ThemeToggle() {

  /*
  - Following useState will have the selected mode by user, ByDefalut it will be system 
  */
  const [mode, setMode] = useState('system'); 

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      return 'dark';
    } else if (theme === 'light') {
      root.classList.remove('dark');
      return 'light';
    } else {
      // system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  };

  /*
  - Following function is for handelling the theme change on the user selection
  */

  const handleChange = (e) => {
    const value = e.target.value;
    setMode(value)
    localStorage.setItem('theme', value)
    applyTheme(value)
  }


  /*
  - This useEffect is for saving the user selected theme in local storage 
  */

  useEffect(()=>{
    const saved = localStorage.getItem('theme');

    if(saved === 'light' || saved === 'dark'){
      setMode(saved);
      applyTheme(saved);
    }
    else{
      setMode('system');
      applyTheme('system');
    }
  },[]);


  /*
  - This useEffect is for handelling the system theme change(by system meaning the device theme)
  */

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const systemThemeChangeHandler = () => {
      if (mode === 'system') {
        applyTheme('system');
      }
    };

    if (mode === 'system') {
      media.addEventListener('change', systemThemeChangeHandler);
    }

    return () => {
      media.removeEventListener('change', systemThemeChangeHandler);
    };
  }, [mode]);

 
  return (

    <div className="flex items-center space-x-2 bg-indigo-transparent p-1 rounded-full">

       {/*system*/}
      
      <label title="System" className={`btn rounded-full ${mode==='system' ? 'bg-gray-700' : ''} btn-sm btn-circle swap swap-rotate p-2`}>
        <input
          type="radio"
          name="theme"
          value="system"
          checked={mode === 'system'}
          onChange={handleChange}
          className="theme-controller hidden"
          aria-label="System theme"
        />
        <ComputerDesktopIcon className={`w-5 h-5 ${mode === 'system' || mode === 'dark' ? 'text-white' : 'text-gray-800'}  peer-checked:text-gray-800`} />
      </label>

      {/* Light */}

      <label title="Light" className={`btn rounded-full ${mode==='light' ? 'bg-gray-700' : ''} btn-sm btn-circle swap swap-rotate p-2`}>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={mode === 'light'}
          onChange={handleChange}
          className="theme-controller peer hidden"
          aria-label="Light mode"
        />
          <SunIcon className={`w-5 h-5 ${mode==='light' ? 'text-white' : 'text-yellow-500'} peer-checked:text-yellow`} />
      </label>

      {/* Dark */}

      <label title="Dark" className={`btn rounded-full ${mode==='dark' ? 'bg-gray-700' : ''} btn-sm btn-circle swap swap-rotate p-2`}>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={mode === 'dark'}
          onChange={handleChange}
          className="theme-controller peer hidden"
          aria-label="Dark mode"
        />
          <MoonIcon className="w-5 h-5 text-indigo-500 peer-checked:text-primary" />
      </label>
    </div>
  );
}
