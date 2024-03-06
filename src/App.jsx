import './App.css'
import Weather from './components/Weather'

function App() {
  
  const apikey = "d14ff0c3233af2bb2350b344e22aa0e3"

  return (
    <>
      <Weather apikey={apikey}/>
    </>
  )
}

export default App
