import React from 'react';
import { Composition } from 'remotion';
import { MainSequence } from './scenes/MainSequence';
import './style.css';

export function Root() {
  return (
    <>
      <Composition
        id="MainDemo"
        component={MainSequence}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
}
