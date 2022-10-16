import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SvgLineAnimation2Props {
  className?: string
  width?: number
  height?: number
  path?: string
  color?: string
  duration?: number
  length?: number
  begin?: number
  strokeWidth?: number
}
export const SvgLineAnimation2 = ({
  className = '',
  width = 226,
  height = 226,
  path = 'M0 72.5H682L732 0.5H3082',
  color = '#0091FF',
  duration = 3,
  length = 100,
  begin = 0,
  strokeWidth = 2
}: SvgLineAnimation2Props) => {
  const uuid = String(uuidv4());
  const [maskId] = useState('svgline-' + uuid);
  const [radialGradientId] = useState('radialGradient-' + uuid);

  return (
        <div className={className} style={{ width, height }}>
          <svg width="100%" height="100%" viewBox="0 0 226 226" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id={radialGradientId} cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id={maskId}>
                <circle r={length} cx="0" cy="0" fill={`url(#${radialGradientId})`}>
                  <animateMotion
                    begin={`${begin}s`}
                    dur={`${duration}s`}
                    path={path}
                    rotate="auto"
                    repeatCount="indefinite"
                  />
                </circle>
              </mask>
            </defs>
            <path d={path} stroke={color} strokeWidth={strokeWidth} mask={`url(#${maskId})`} />
          </svg>
        </div>
  );
};
