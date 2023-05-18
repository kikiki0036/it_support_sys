import React,{ useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { styled } from "@mui/material/styles";
import axios from 'axios';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: "0px 0px 4px #6262642f",
    fontSize: 12,
    fontFamily: 'Kanit'
  },
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      // border: "1px solid #ccc",
      boxShadow: "0px 1px 2px #6262642f ",
      backgroundColor: theme.palette.common.white,

    },
    width: 80,
    color: theme.palette.common.white,
    backgroundColor: "none"
  },
}));


const CssTextField = styled(TextField)(({ theme }) => ({
"& label.Mui-focused": {
},
"& label.MuiInputLabel-root ": {
  fontSize: 16,  

},
"& .MuiInput-underline:after": {
},
"& .MuiOutlinedInput-root": {
  "& fieldset": {
    borderColor: theme.palette.mode === "light" ? "#6262642f" : "#6262642f",  

  },
  "&:hover fieldset": {
    borderColor: theme.palette.mode === "light" ? "#62626467" : "#62626467",    

  },
  "&.Mui-focused fieldset": {
   
  },
  "&.Mui-disabled fieldset": {
    borderColor: theme.palette.mode === "light" ? "#6262642f" : "#6262642f",    
  },
},
"& .MuiOutlinedInput-input": {
  fontSize: 14,
  fontFamily: 'Kanit'
  // fontFamily: ["Kanit"]
},
"& .MuiInputBase-input": {
  // fontSize: 14,   

}
}));

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
}

const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];
  
const RenderData_Section = (props) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    
    const [Value_Selected, setValue_Selected] = useState([]);

    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e3);
        if (active) {
          setOptions([...topFilms]);
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);
  
    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    return (
        <div>
            <LightTooltip title="เลือกประเภทบริการ"
                placement="top-start"
                    // disableFocusListener={false} 
                    // disableHoverListener={false} 
                    // disableTouchListener={false} 
                arrow
            >
                <Autocomplete
                    // disabled={disabledBntn}
                    id="asynchronous-demo_n"
                    sx={{ width: 320 ,fontSize: 10}}
                    open={open}
                    onOpen={() => { setOpen(true); }}
                    onClose={() => { setOpen(false); }}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    getOptionLabel={(option) => option.title}
                    options={options}
                    loading={loading}
                    value={Value_Selected.length !== 0 ? Value_Selected : null}
                    onChange={(event, value) => {
                        if(value === null) {
                            setValue_Selected([])

                        } else {
                            setValue_Selected(value)

                        } 
                    }}
                    renderInput={(params) => (
                        /////////////////////////////////////////////////////

                        props.renderInput(Value_Selected,params,loading)
                    
                        /////////////////////////////////////////////////////

                    )}
                />
            </LightTooltip>
        </div>
    );
}

export default RenderData_Section

