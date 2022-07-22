import { useEffect, useState } from 'react';

const useCountdown = (minutes) => {
  const [countDown, setCountDown] = useState(
   minutes * 60
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    if(countDown < 1) {
      clearInterval(interval);
    }
   
    return () => clearInterval(interval);
  });

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left

  let currentSeconds = countDown 
  
  const hours = Math.floor(currentSeconds / 3600);
  if(hours > 0) currentSeconds = currentSeconds - 3600 *hours

  const minutes = Math.floor(currentSeconds /60)
  if(minutes > 0) currentSeconds = currentSeconds - 60 *minutes

  const seconds = currentSeconds

  return [ hours, minutes, seconds];
};


export { useCountdown };
