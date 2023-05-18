import React, { useState } from 'react'
// import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
// DatePickerCalendar
import { DateRangePickerCalendar,START_DATE } from '../../date-calendar'
import Example from './Example'

const DatePickerCalendarExample = () => {
  // const [date, setDate] = useState()

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }
  return (
    <Example>
      {/* <p>Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p> */}

       {/* <p>Selected start date: {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
//       <p>Selected end date: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
//       <p>Currently selecting: {focus}.</p> */}

      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      />
    </Example>
  )
}

export default DatePickerCalendarExample


// import React, { useState } from 'react'
// import { format } from 'date-fns'
// import { enGB } from 'date-fns/locale'
// import { DateRangePickerCalendar, START_DATE } from '../../react-nice-dates/src'
// // import '../../react-nice-dates/build/style.css'

// const DatePickerCalendarExample = () => {
//   const [startDate, setStartDate] = useState()
//   const [endDate, setEndDate] = useState()
//   const [focus, setFocus] = useState(START_DATE)
//   const handleFocusChange = newFocus => {
//     setFocus(newFocus || START_DATE)
//   }

//   return (
//     <div>
//       {/* <p>Selected start date: {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
//       <p>Selected end date: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
//       <p>Currently selecting: {focus}.</p> */}
//       <DateRangePickerCalendar
//         startDate={startDate}
//         endDate={endDate}
//         focus={focus}
//         onStartDateChange={setStartDate}
//         onEndDateChange={setEndDate}
//         onFocusChange={handleFocusChange}
//         locale={enGB}
//       />
//     </div>
//   )
// }

// export default DatePickerCalendarExample