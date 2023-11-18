# svg-flex

A library that lets you use flexbox for svg images

### Installation

```sh
yarn add svg-flex
```

```sh
npm i svg-flex
```

### Example
```angular2html
import { SvgFlexContainer, SvgFlex } from 'svg-flex';

<SvgFlexContainer gap={16} justify="start" direction="col">
  <SvgFlex justify="between" direction="row" gap={8}>
    <SomeSvg />
    <SomeSvg />
   </SvgFlex>
  <SvgFlex justify="center" direction="row" gap={8}>
    <SomeSvg />
    <SomeSvg />
    <SomeSvg />  
   </SvgFlex>
</SvgFlexContainer>
```
### Props

```angular2html
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
```
