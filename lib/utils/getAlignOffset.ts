import { FlexSvgAlign, FlexSvgDirection, Size } from '../type';

interface Props {
  flexSize: Size;
  svgSize: Size;
  direction: FlexSvgDirection;
  align: FlexSvgAlign;
}

export const getAlignOffset = ({
  flexSize,
  svgSize,
  direction,
  align,
}: Props) => {
  const alignEmptySpace = direction === 'row' ? flexSize.height - svgSize.height : flexSize.width - svgSize.width;
  let alignOffset = 0;
  switch (align) {
    case 'center':
      alignOffset = alignEmptySpace / 2;
      break;
    case 'start':
      alignOffset = 0;
      break;
    case 'end':
      alignOffset = alignEmptySpace;
      break;
    default:
      alignOffset = 0;
      break;
  }

  return alignOffset;
};
