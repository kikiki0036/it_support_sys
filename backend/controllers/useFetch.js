import axios from 'axios'
async function useFetch(param,text) {
    console.log("text : ", { text });
    console.log("param : ", param);
    let data = await axios.post(text, param).
        then(responce => {
            return responce.status;
        })
        .catch(error => {
            return undefined;
        })
    console.log("data : ", data);
    // set(data);
}
export default useFetch;