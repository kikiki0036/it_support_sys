// import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/login");
            // window.location.reload();
            history.go(0)
        } catch (error) {
            console.log(error);
        }
    }
    Logout()
}
export default Navbar