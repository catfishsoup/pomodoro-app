import React, {useEffect, useState} from 'react'

const Display = ({minute, digit}) => {
  return (digit > 10 ? <>{minute}:{digit}</> : <>{minute}:0{digit}</>)
}
const Input = ({setTime}) => {
  return (
    <><input onChange={setTime}/></>
  )
}
const App = () => {

  // Default Timer: 20 minutes; We have to use the timer to convert to seconds. 
  const [timer, setTimer] = useState(20)



  const [seconds, setSeconds] = useState(timer * 60)
  const [clicked, setClicked] = useState(false)

  // 1. Get the user input of minutes (default: 20 minutes)
  // 2. Convert the minute into seconds! 
  // The time will be stored the total seconds, the second variable is % 60 to keep track of second individually. 
  useEffect(() => {
    if(clicked === true && seconds > 0) {
       const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1) 
    }, 1000)
    return () => clearInterval(interval)
    }
    
  }, [clicked, seconds])

  const setTime = (e) => {
    // setTimer(e.target.value)
  }

  let minute = Math.floor(seconds / 60)
  let digit_second = seconds % 60; 


const clickButton = () => {
  if(!clicked) {
    setClicked(true)
  } 
  setClicked(!clicked)
}


  return(
    <div>
    <Display minute={minute} digit={digit_second}/>
    <Input setTime={setTime()}/>
    <button onClick={clickButton}>Start</button>
  </div>
  )
  
}
  

export default App


/*

* The timer will only take minutes as input
* However, the timer will also have to count down seconds


* The application will also allows user to pause / reset time. 

*/