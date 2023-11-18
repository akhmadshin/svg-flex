import { FlexSvgDirection, Size } from '../type';

const getTotalValue = (arr: number[]) => arr.reduce((acc: number, value) => {
  // eslint-disable-next-line no-param-reassign
  acc += value;
  return acc;
}, 0);

const getHighestValue = (arr: number[]) => arr.reduce((acc: number, value) => {
  if (value > acc) {
    // eslint-disable-next-line no-param-reassign
    acc = value;
  }
  return acc;
}, 0);

const getFlexHeight = (svgSizeList: Size[], direction: FlexSvgDirection, gap: number): number => {
  const svgHeightList = svgSizeList.map((svgSize) => svgSize.height);
  const svgHeightWithGapList = svgSizeList.map((svgSize) => svgSize.height + gap);

  if (direction === 'col') {
    return getTotalValue(svgHeightWithGapList) - gap;
  }

  if (direction === 'row') {
    return getHighestValue(svgHeightList);
  }
  return 0;
};

const getFlexWidth = (svgSizeList: Size[], direction: FlexSvgDirection, gap: number) => {
  const svgWidthList = svgSizeList.map((svgSize) => svgSize.width);
  const svgWidthWithGapList = svgSizeList.map((svgSize) => svgSize.width + gap);
  if (direction === 'col') {
    return getHighestValue(svgWidthList);
  }
  if (direction === 'row') {
    return getTotalValue(svgWidthWithGapList) - gap;
  }
  return 0;
};

export const getFlexSize = (svgSizeList: Size[], direction: FlexSvgDirection, gap: number, padding: number): Size => {
  const flexHeight = getFlexHeight(svgSizeList, direction, gap);
  const flexWidth = getFlexWidth(svgSizeList, direction, gap);

  return {
    width: flexWidth + padding * 2,
    height: flexHeight + padding * 2,
  };
};
