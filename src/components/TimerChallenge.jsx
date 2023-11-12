import React, { useState, useRef } from 'react';

// ! If we use it outside the component, everything will be ok
// ! This variable will be shared across all the timers
// ! So none of the timers will have the unique identifier
// ! Every time the component rerenders the unique identifier will store the last value

const TimerChallenge = ({ title, targetTime }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // ! Now, every ref will be independent from each other, even that its defined insede of the comp
  // ? This value does not really impact on the UI, so we can manage this as a ref
  // ? Also the value of ref will store the whole time, is won`t be deleted
  const timer = useRef();

  // ! This variable is recreated every time the component rerenders
  //  let timer;
  const handleStart = () => {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  };

  const handleStop = () => {
    //   ! So the timer will not stop
    clearTimeout(timer.current);
  };

  return (
    <section className="challenge">
      <h2>{title}</h2>

      {timerExpired && <p>You lost</p>}

      <p className="challenge-time">
        {targetTime} {targetTime > 1 ? 'seconds' : 'second'}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? 'Stop' : 'Start'} Challenge</button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>{timerStarted ? 'Timer is running' : 'Timer is inactive'}</p>
    </section>
  );
};

export default TimerChallenge;
