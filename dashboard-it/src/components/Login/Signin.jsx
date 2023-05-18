import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// const Copyright = (props) => {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
// }

// localStorage.setItem('myData', "")

const theme = createTheme();

const Signin = () => {

let dataStore = new FormData();

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // dataStore.append('email', data.get('email'))

    // data.append('username', 'Chris');
    
    // console.log({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     username: data.get('username'),
    // });

    // console.log(data.get('email'));

    // for (var value of data.values()) {
    //   console.log(value);
    // }

    for(var value of data.entries()) {
      dataStore.append(value[0] , value[1]);
    }


    for(var value of data.entries()) {
      console.log(value[0]+ ', '+ value[1]);
    }

    console.log("---------------------");

    for(var value of dataStore.entries()) {
      console.log(value[0]+ ', '+ value[1]);
    }

    console.log(localStorage.getItem('user1'))
    
    localStorage.setItem('user1', data.get('email'))
    console.log(localStorage.getItem('user1'))
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required={true}
              fullWidth
              id="email"
              type="text"
              label="Email Address"
              name="email"
              autoComplete="email"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required  
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
}

export default Signin