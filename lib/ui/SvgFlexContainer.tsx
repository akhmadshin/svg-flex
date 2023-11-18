import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { calculateAndSetSvgPosition } from '../utils/calculateAndSetSvgPosition';
import { calculateAndSetSvgSize } from '../utils/calculateAndSetSvgSize';
import { SvgFlexContainerProps } from '../type';

import { SvgFlex } from './SvgFlex.tsx';

export const SvgFlexContainer: React.FC<PropsWithChildren<SvgFlexContainerProps>> = ({
  children,
  justify,
  direction,
  onSizeCalculated,
  padding,
  x = 0,
  y = 0,
  gap = 0,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const rootSvgSize = calculateAndSetSvgSize(containerRef.current);
    calculateAndSetSvgPosition(containerRef.current);
    if (onSizeCalculated) {
      onSizeCalculated(rootSvgSize);
    }
  }, [containerRef, justify, direction, padding, gap, children]);

  return (
    <SvgFlex ref={containerRef} padding={padding} x={x} y={y} gap={gap} justify={justify} direction={direction}>
      {children}
    </SvgFlex>
  );
};
