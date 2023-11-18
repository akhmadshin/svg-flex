import { FlexSvgDirection, FlexSvgJustify, Size } from '../type';

interface Props {
  availableSpace: Size;
  childSvgSizes: Size[];
  direction: FlexSvgDirection;
  justify: FlexSvgJustify;
  svgIndex: number
}

export const getJustifyOffset = ({
  availableSpace,
  childSvgSizes,
  direction,
  justify,
  svgIndex,
}: Props) => {
  const justifyEmptySpace = direction === 'col' ? availableSpace.height : availableSpace.width;

  const getJustifyCenterOffset = () => svgIndex === 0 ? justifyEmptySpace / 2 : 0;

  const getJustifyBetweenOffset = () => {
    if (childSvgSizes.length === 1) {
      return getJustifyCenterOffset();
    }
    return svgIndex === 0 ? 0 : justifyEmptySpace / (childSvgSizes.length - 1);
  };

  let justifyOffset = 0;
  switch (justify) {
    case 'between':
      justifyOffset = getJustifyBetweenOffset();
      break;
    case 'center':
      justifyOffset = getJustifyCenterOffset();
      break;
    case 'start':
      justifyOffset = 0;
      break;
    case 'end':
      justifyOffset = svgIndex === 0 ? justifyEmptySpace : 0;
      break;
    default:
      justifyOffset = 0;
      break;
  }

  return justifyOffset;
};
