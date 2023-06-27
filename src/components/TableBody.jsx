import { useState, useEffect } from 'react'
import TableRow from './TableRow'

const TableBody = () => {

    const [flights, setFlights] = useState(null)

    const getFlights = () => {
        fetch('http://localhost:8000') //Promise<Response>
            .then(response => response.json())  //Promise<any>
            .then(flights => setFlights(Object.values(flights.data))) //Promise<void>
            .catch(err => console.log(err))
    }

    //useEffect(() => getFlights(), [])
    //We made it refresh every 5 seconds even though theres no new data bc its hard coded. But the trouble we came upon was that it wasn't loading soon as it got refreshed.
    //So we made firstLoad equal 0, so that it would load right away and then every 5 seconds afterwards. You can see it if you console.log and look under network.
    let firstLoad = 0
    useEffect(() => {
      if (firstLoad == 0){getFlights()
      firstLoad = 1 
      console.log("first load")}
      
      const interval = setInterval(() => {
        getFlights()
        console.log('This will run every second!');
      }, 5000);
      return () => clearInterval(interval);
    }, []);

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