import { FlexSvgDirection, Size } from '../type';

import { getFlexSize } from './getFlexSize';

export const calculateAndSetSvgSize = (svg: SVGSVGElement): Size => {
  const childSvgSizes = (Array.from(svg.children) as SVGSVGElement[]).map((svgChild) => {
    const isFlex = svgChild.getAttribute('data-flex');
    const childHeight = Number(svgChild.getAttribute('height'));
    const childWidth = Number(svgChild.getAttribute('width'));
    const childPadding = Number(svgChild.getAttribute('data-padding')) || 0;
    if (isFlex) {
      return calculateAndSetSvgSize(svgChild);
    }

    return { height: childHeight + childPadding * 2, width: childWidth + childPadding * 2 };
  });
  const padding = Number(svg.getAttribute('data-padding')) || 0;
  const direction = svg.getAttribute('data-direction') as FlexSvgDirection;
  const gap = Number(svg.getAttribute('data-gap'));
  const flexSize = getFlexSize(childSvgSizes, direction, gap, padding);

  const { height, width } = flexSize;
  svg.setAttribute('height', String(height));
  svg.setAttribute('width', String(width));
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  return flexSize;
};
