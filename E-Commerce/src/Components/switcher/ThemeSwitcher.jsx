

const ThemeWrapper = () => {
   
  };

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme';
import "./switcher.css"

const Switcher = ({ children }) => {
    const mode = useSelector((state) => state.theme.mode);
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);
  
    const dispatch = useDispatch();
    return (
      

<label for="theme" class="theme">
	<span class="theme__toggle-wrap">
		<input onClick={() => dispatch(toggleTheme())} id="theme" className="theme__toggle" checked={mode == "light" ? false : true} type="checkbox" role="switch" name="theme" />
		<span class="theme__icon">
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
			<span class="theme__icon-part"></span>
		</span>
	</span>
</label>
      
    
      
    );
}

export default Switcher
