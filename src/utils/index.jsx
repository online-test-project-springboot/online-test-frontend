import { Slide } from '@material-ui/core';
import { forwardRef } from 'react';

export const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  