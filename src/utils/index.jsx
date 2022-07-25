import { Slide } from '@material-ui/core';
import { forwardRef } from 'react';

export const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const getToken = () => localStorage.getItem('access_token');

export const trimData = (data) => {
  if (typeof data !== 'object') return;

  const cloneData = { ...data };

  for (const key in cloneData) {
    cloneData[key] = cloneData[key].trim();
  }

  return cloneData;
};

export const trucateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 1)}…`;
};

export const createTimer = (minutes, onChange, onFinish) => {
  let intervalId = null;

  function start() {
    clear();

    let currentSecond = minutes * 60;

    intervalId = setInterval(() => {
      console.log(currentSecond);
      onChange?.(currentSecond);

      currentSecond--;

      if (currentSecond < 1) {
        clear();
        onFinish?.();
      }
    }, 1000);
  }

  function clear() {
    clearInterval(intervalId);
  }

  return { start, clear };
};
