import React, {useRef, useState, useEffect} from 'react'

import './thememenu.css'

import { useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'


import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
    marginLeft: 5,
    padding: 0,
}));
const FormControlLabelStyle = styled(FormControlLabel)(({ theme }) => ({
    margin: 0,
    padding: 0,
}));
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 45,
  height: 28,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    top: 1,
    left: -4,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'red' : '#ccc',
        // backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',

      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'red' : '#403e74',
    width: 21,
    height: 21,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ccc',
    borderRadius: 20 / 2,
  },
}));

const mode_settings = [
    {
        id: 'light',
        name: 'Light',
        background: 'light-background',
        class: 'theme-mode-light'
    },
    {
        id: 'dark',
        name: 'Dark',
        background: 'dark-background',
        class: 'theme-mode-dark'
    }
]


// const color_settings = [
//     {
//         id: 'blue',
//         name: 'Blue',
//         background: 'blue-color',
//         class: 'theme-color-blue'
//     },
//     {
//         id: 'red',
//         name: 'Red',
//         background: 'red-color',
//         class: 'theme-color-red'
//     },
//     {
//         id: 'cyan',
//         name: 'Cyan',
//         background: 'cyan-color',
//         class: 'theme-color-cyan'
//     },
//     {
//         id: 'green',
//         name: 'Green',
//         background: 'green-color',
//         class: 'theme-color-green'
//     },
//     {
//         id: 'orange',
//         name: 'Orange',
//         background: 'orange-color',
//         class: 'theme-color-orange'
//     },
// ]

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const ThemeMenu = () => {

    const menu_ref = useRef(null)
    const menu_toggle_ref = useRef(null)

    clickOutsideRef(menu_ref, menu_toggle_ref)

    // const setActiveMenu = () => menu_ref.current.classList.add('active')

    // const closeMenu = () => menu_ref.current.classList.remove('active')

    const [currMode, setcurrMode] = useState('light')

    // const [currColor, setcurrColor] = useState('blue')

    const dispatch = useDispatch()

    const setMode = (event) => {
        
        if(event.target.checked) {
            setcurrMode('dark')
            localStorage.setItem('themeMode', 'theme-mode-dark')
            dispatch(ThemeAction.setMode('theme-mode-dark'))

        } else {
            setcurrMode('light')
            localStorage.setItem('themeMode', 'theme-mode-light')
            dispatch(ThemeAction.setMode('theme-mode-light'))
            
        }

    }

    // const setColor = color => {
    //     setcurrColor(color.id)
    //     localStorage.setItem('colorMode', color.class)
    //     dispatch(ThemeAction.setColor(color.class))
    // }

    useEffect(() => {
        const themeClass = mode_settings.find(e => e.class === localStorage.getItem('themeMode', 'theme-mode-light'))

        // const colorClass = color_settings.find(e => e.class === localStorage.getItem('colorMode', 'theme-mode-light'))

        if (themeClass !== undefined) setcurrMode(themeClass.id)

        // if (colorClass !== undefined) setcurrColor(colorClass.id)

    }, []);

    return (
        <FormGroupStyle>
            <FormControlLabelStyle
                control={<MaterialUISwitch defaultChecked />}
                label=""
                checked={currMode === 'light'? false : true}
                onChange={setMode}
            />
        </FormGroupStyle>
//         <div>
//             <button ref={menu_toggle_ref} className="dropdown__toggle" onClick={() => setActiveMenu()}>
//                 <i className='bx bx-palette'></i>
//             </button>
//             <div ref={menu_ref} className="theme-menu">
//                 <h4>Theme settings</h4>
//                 <button className="theme-menu__close" onClick={() => closeMenu()}>
//                     <i className='bx bx-x'></i>
//                 </button>
//                 <div className="theme-menu__select">
//                     <span>Choose mode</span>
//                     <ul className="mode-list">

//                         <FormGroupStyle>
//                             <FormControlLabelStyle
//                                 control={<MaterialUISwitch defaultChecked />}
//                                 label=""
//                                 checked={currMode === 'light'? false : true}
//                                 onChange={setMode}
//                             />
//                         </FormGroupStyle>
// {/* 
//                         {
//                             mode_settings.map((item, index) => (
//                                 <li key={index} onClick={() => setMode(item)}>
//                                     <div className={`mode-list__color ${item.background} ${item.id === currMode ? 'active' : ''}`}>
//                                         <i className='bx bx-check'></i>
//                                     </div>
//                                     <span>{item.name}</span>
//                                 </li>
//                             ))
//                         } */}
//                     </ul>
//                 </div>
//                 {/* <div className="theme-menu__select">
//                     <span>Choose color</span>
//                     <ul className="mode-list">
//                         {
//                             color_settings.map((item, index) => (
//                                 <li key={index} onClick={() => setColor(item)}>
//                                     <div className={`mode-list__color ${item.background} ${item.id === currColor ? 'active' : ''}`}>
//                                         <i className='bx bx-check'></i>
//                                     </div>
//                                     <span>{item.name}</span>
//                                 </li>
//                             ))
//                         }
//                     </ul>
//                 </div> */}
//             </div>
//         </div>
    )
}

export default ThemeMenu
