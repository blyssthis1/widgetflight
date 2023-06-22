import { useState, useEffect } from 'react'
import TableRow from './TableRow'

const TableBody = () => {

    const [flights, setFlights] = useState(null)

    const getFlights = () => {
        fetch('http://localhost:8000/flights') //Promise<Response>
            .then(response => response.json())  //Promise<any>
            .then(flights => setFlights(Object.values(flights.data))) //Promise<void>
            .catch(err => console.log(err))
    }

    useEffect(() => getFlights(), [])

    console.log(flights)


  return (
    <tbody>

    {flights?.map((flight, _index) => (
        <TableRow key={_index} flight ={flight} />
    ))}
    </tbody>
  )
}

export default TableBody