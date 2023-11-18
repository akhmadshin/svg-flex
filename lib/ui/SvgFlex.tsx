import { forwardRef, PropsWithChildren } from 'react';

import { SvgFlexProps } from '../type';

export const SvgFlex = forwardRef<SVGSVGElement, PropsWithChildren<SvgFlexProps>>(({
  x = 0,
  y = 0,
  gap = 0,
  justify = 'start',
  align = 'start',
  direction = 'row',
  padding = 0,
  children,
}, ref) => (
    <svg
      data-direction={direction}
      data-padding={padding}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-flex
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      x={x + padding}
      y={y + padding}
    >
      {children}
    </svg>
  ));
