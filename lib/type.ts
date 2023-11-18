export interface SvgFlexProps {
  justify?: FlexSvgJustify;
  align?: FlexSvgAlign;
  gap?: number;
  direction?: FlexSvgDirection;
  x?: number;
  y?: number;
  padding?: number;
}

export interface SvgFlexContainerProps extends SvgFlexProps {
  onSizeCalculated?: (size: Size) => void;
}

export type FlexSvgAlign = 'center' | 'start' | 'end';
export type FlexSvgDirection = 'row' | 'col';
export type FlexSvgJustify = 'between' | 'center' | 'start' | 'end';

export interface Size {
  height: number;
  width: number;
}

export interface Location {
  x: number;
  y: number;
}
