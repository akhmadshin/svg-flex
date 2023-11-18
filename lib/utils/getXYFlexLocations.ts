import { FlexSvgAlign, FlexSvgDirection, FlexSvgJustify, Location, Size } from '../type';

import { getAlignOffset } from './getAlignOffset';
import { getJustifyOffset } from './getJustifyOffset';

interface Props {
  flexSize: Size;
  availableSpace: Size;
  childSvgSizes: Size[];
  direction: FlexSvgDirection;
  justify: FlexSvgJustify;
  align: FlexSvgAlign;
  gap: number;
}

export const getXYFlexLocations = ({
  flexSize,
  availableSpace,
  childSvgSizes,
  direction,
  justify,
  align,
  gap,
}: Props) => {
  const INITIAL_Y_POINT = 0;
  const INITIAL_X_POINT = 0;

  return childSvgSizes.reduce((acc: Location[], childSvgSize, svgIndex) => {
    const prevOffset = acc[acc.length - 1] || undefined;
    const prevSvg = childSvgSizes[svgIndex - 1] || undefined;
    const prevSvgHeight = prevSvg ? prevSvg.height + gap : 0;
    const prevSvgWidth = prevSvg ? prevSvg.width + gap : 0;
    let xOffset = prevOffset ? prevOffset.x + prevSvgWidth : INITIAL_X_POINT;
    let yOffset = INITIAL_Y_POINT;
    if (direction === 'col') {
      xOffset = INITIAL_X_POINT;
      yOffset = prevOffset ? prevOffset.y + prevSvgHeight : INITIAL_Y_POINT;
    }

    const justifyOffset = getJustifyOffset({ justify, svgIndex, childSvgSizes, availableSpace, direction });
    const alignOffset = getAlignOffset({ flexSize, align, svgSize: childSvgSize, direction });


    if (direction === 'row') {
      xOffset += justifyOffset;
      yOffset += alignOffset;
    } else if (direction === 'col') {
      yOffset += justifyOffset;
    }
    acc.push({ y: yOffset, x: xOffset });
    return acc;
  }, []);
};
