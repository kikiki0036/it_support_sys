import Axios from "axios";
export default Axios.get('http://localhost:5000/findnameemp').then((response) => {
    const a = []
    // console.log(response);
    for (let i = 1; i < response.data.length; i++) {
        a.push(
            { text: response.data[i].it_name, id: i },
            // {
            //     text: response.data[i].emp_nameEng,
            //     id: i
            // },
        )
    }
    const emp = 
        a
    ;
    // console.log(emp);

    return emp


});