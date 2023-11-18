import { FlexSvgAlign, FlexSvgDirection, FlexSvgJustify } from '../type';

import { getFlexSize } from './getFlexSize';
import { getXYFlexLocations } from './getXYFlexLocations';

export const calculateAndSetSvgPosition = (svg: SVGSVGElement): void => {
  (Array.from(svg.children) as SVGSVGElement[]).forEach((svgChild) => {
    const isFlex = svgChild.getAttribute('data-flex');
    if (isFlex) {
      calculateAndSetSvgPosition(svgChild);
    }
  });
  const childSvgSizes = Array.from(svg.children).map((svgChild) => {
    const height = Number(svgChild.getAttribute('height'));
    const width = Number(svgChild.getAttribute('width'));
    return {
      height,
      width,
    };
  });
  const direction = svg.getAttribute('data-direction') as FlexSvgDirection;
  const gap = Number(svg.getAttribute('data-gap'));
  const padding = Number(svg.getAttribute('data-padding')) || 0;
  const flexSize = getFlexSize(childSvgSizes, direction, gap, padding);
  svg.setAttribute('height', String(flexSize.height));
  svg.setAttribute('width', String(flexSize.width));
  svg.setAttribute('viewBox', `0 0 ${flexSize.width} ${flexSize.height}`);


  const justify = svg.getAttribute('data-justify');
  const align = svg.getAttribute('data-align');

  const { parentElement } = svg;
  const parentPadding = Number(parentElement?.getAttribute('data-padding')) || 0;
  const parentWidth = Number(parentElement?.getAttribute('width')) - parentPadding * 2;
  const parentHeight = Number(parentElement?.getAttribute('height')) - parentPadding * 2;
  const parentDirection = parentElement?.getAttribute('data-direction');

  const availableWidth = parentDirection === 'col' ? parentWidth - flexSize.width : 0;
  const availableHeight = parentDirection === 'row' ? parentHeight - flexSize.height : 0;
  const availableSpace = {
    height: availableHeight,
    width: availableWidth,
  };

  const flexElementsPosition = getXYFlexLocations({
    childSvgSizes,
    justify: justify as FlexSvgJustify,
    align: align as FlexSvgAlign,
    direction,
    gap,
    flexSize, availableSpace,
  });

  Array.from(svg.children).forEach((e, index) => {
    const childPadding = Number(e?.getAttribute('data-padding')) || 0;
    e.setAttribute('x', String(flexElementsPosition[index].x + childPadding));
    e.setAttribute('y', String(flexElementsPosition[index].y + childPadding));
  });
};
