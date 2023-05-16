import React, {useCallback, useEffect, useState, useRef} from 'react'
import './App.css'

const Display = ({minute, digit}) => {

  return (digit >= 10 ? <>{minute}:{digit}</> : <>{minute}:0{digit}</>)
}

const Timer = ({setTime, sbreak, lbreak, pomodoro}) => {

  return (
    <>
  <ul className="toggle-time">
    <li onClick={(e) => setTime(pomodoro, 1)}>Pomodoro</li>
    <li onClick={(e) => setTime(sbreak, 2)}>Short break</li>
    <li onClick={(e) => setTime(lbreak, 3)}>Long break</li>
  </ul>
  </>
  )
}


  function Switchtab({currTab, minute, digit, seconds, sbreak, lbreak, pomodoro, setTime}) {
    let count = useRef(0);
    useEffect(() => {
      
      if (seconds === 0) {
        if(currTab === 1) {
          setTime(sbreak, 2)
          count.current = count.current + 1;
          
        } 
        
        if (currTab === 1 && count.current === 4) {
          setTime(lbreak, 3)
        }

        if (currTab === 2) {
          setTime(pomodoro, 1)
        } 
        
        if (currTab === 3) {
          count.current = 0;
          setTime(pomodoro, 1)
        }
      }
    }, [seconds === 0])
    
    switch(currTab) {
      case 1: 
      return <div className={currTab === 1 ? "active" : "not-active"}> 
      <Display minute={minute} digit={digit}/>
      </div>


      case 2: 
      return <div className={currTab === 2 ? "active" : "not-active"}>
             <Display minute={minute} digit={digit}/></div>

      case 3: 
      return <div className={currTab === 3 ? "active" : "not-active"}>
             <Display minute={minute} digit={digit}/></div>
    }
  }

const Input = ({clicked, submit}) => {


  const [input, setInput] = useState({
    pomodoro: 1500,
    short_break: 300,
    long_break: 900
  })

  const handleInputChange = (e) => {
      setInput({
        ...input, [e.target.name] : e.target.value * 60, 
      })
  }


  if(clicked === true) {
    return (
    <>
    <form>
      <label>Pomodoro</label>
      <input name="pomodoro" onChange={handleInputChange} type="number" placeholder="0"/> minutes 
      
       <label>Short Break</label>
      <input name="short_break" onChange={handleInputChange} type="number" placeholder="0"/> minutes 

       <label>Long Break</label>
      <input name="long_break" onChange={handleInputChange} type="number" placeholder="0"/> minutes 

      <button onClick={(e) => submit(e, input)} type="submit">Apply</button>
    </form>
      
    </>
  )
  }
  
}


const App = () => {

  const [pomodoro, setPomodoro] = useState(1500)
  const [seconds, setSeconds] = useState(pomodoro)
  const [shortBreak, setshortBreak] = useState(300)
  const [longBreak, setlongBreak] = useState(900)
  const [clicked, setClicked] = useState(false) 
  const [clicked2, setClicked2] = useState(false)
  const [currTab, setcurrTab] = useState(1)

  //Set Time based on user input 

const toggleTime = useCallback((time, tab) => {
    setSeconds(time)
    setcurrTab(tab)
  }, [])

  //Time Count down
  useEffect(() => {
    if(clicked === true && seconds > 0) {
       const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1) 
    }, 1000)
    return () => clearInterval(interval)
    }
    
  }, [clicked, seconds])

  

  let minute = Math.floor(seconds / 60)
  let digit_second = seconds % 60



const clickStart = () => {
  if(!clicked) {
    setClicked(true)
  } 
  setClicked(!clicked)
}

const clickSettings = () => {
  if(!clicked2) {
    setClicked2(true)
  } 
  setClicked2(!clicked2)
}

const submitValue = (e, input) => {
  e.preventDefault()
  console.log(input.pomodoro)
  setPomodoro(input.pomodoro)
  setSeconds(input.pomodoro)
  setlongBreak(input.long_break)
  setshortBreak(input.short_break)
}

  return (
    <>
    
    <Timer setTime={toggleTime} sbreak={shortBreak} lbreak={longBreak} pomodoro={pomodoro} />
    <Switchtab currTab={currTab} minute={minute} digit={digit_second} seconds={seconds} setTime={toggleTime} sbreak={shortBreak} lbreak={longBreak} pomodoro={pomodoro}/>
    <button onClick={clickStart}>Start</button>
    <button onClick={clickSettings}>Settings</button>
    <Input clicked={clicked2} submit={submitValue}/>
    </>
  )
}
  

export default App


/*

* The timer will only take minutes as input
* However, the timer will also have to count down seconds


* The application will also allows user to pause / reset time. 

*/