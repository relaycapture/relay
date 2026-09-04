'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MechanicalOdometerProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function OdometerDigit({ digit }: { digit: string }) {
  const isNumber = !isNaN(parseInt(digit, 10));

  if (!isNumber) {
    return <span className="inline-block">{digit}</span>;
  }

  const num = parseInt(digit, 10);

  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline select-none">
      <motion.span
        initial={false}
        animate={{ y: `-${num * 10}%` }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
          mass: 0.2,
        }}
        className="absolute inset-x-0 top-0 flex flex-col items-center"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="flex h-[1em] w-full items-center justify-center leading-none"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function MechanicalOdometer({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: MechanicalOdometerProps) {
  const formattedString = typeof value === 'number' ? value.toLocaleString() : value;
  const characters = formattedString.split('');

  return (
    <span className={`inline-flex items-baseline font-mono tracking-tight font-bold ${className}`}>
      {prefix && <span className="mr-0.5 select-none">{prefix}</span>}
      {characters.map((char, i) => (
        <OdometerDigit key={`${i}-${char === ',' ? 'comma' : 'digit'}`} digit={char} />
      ))}
      {suffix && <span className="ml-1 select-none font-normal text-xs">{suffix}</span>}
    </span>
  );
}
