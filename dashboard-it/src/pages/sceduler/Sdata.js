import moment from 'moment';
import Axios from "axios";
const todate = (time) => {

  return (moment(time).toDate());
}
export default Axios.get('http://localhost:5000/findschedudata').then((response) => {
  const arr23=[]
  for (let i = 0; i < response.data.length; i++) {
      arr23.push(
          {
              id: response.data[i].s_id,
              notes:response.data[i].notes,
              startDate: todate(response.data[i].time_start),
              endDate: todate(response.data[i].time_end),
              title: response.data[i].title,
              name: parseInt(response.data[i].owner_n)
          },
      )
  }
  return arr23


});