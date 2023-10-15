'use client';

import React, {useState, useEffect} from 'react';
import { MotionConfig, LayoutGroup, motion } from 'framer-motion';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startTimer = () => {
    setIsPlaying(true);
  }

  const stopTimer = () => {
    setIsPlaying(false);
  }

  const toggleTimer = () => {
    isPlaying ? stopTimer() : startTimer()
  }

  const resetTimer = () => {
    setIsPlaying(() => false);
    setTimeElapsed(() => 0);
  }

  useEffect(() => {
    const et = setInterval(() => {
      if (isPlaying) {
        setTimeElapsed((value) => value+1);
      }
    }, 1000);

    return () => {
      clearInterval(et);
    }
  }, [isPlaying]);
  
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % 3];

  return (
    <MotionConfig reducedMotion="user">
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <LayoutGroup key={index}>
            <li
              className={styles.color}
              
            >
              {isSelected && (
                <motion.div layoutId="outline-box"
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
            </LayoutGroup>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={toggleTimer}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button onClick={resetTimer}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
