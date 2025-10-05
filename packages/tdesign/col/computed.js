import utils from '../common/utils.wxs';

export function getColStyles(gutter, style = '', customStyle = '') {
  console.log('getColStyles.gutter', gutter);
  let innerStyle = '';
  if (gutter) {
    innerStyle = utils._style({
      'padding-right': utils.addUnit(gutter / 2),
      'padding-left': utils.addUnit(gutter / 2),
    });
  }

  const result = utils._style([style, customStyle, innerStyle]);

  console.log('result', result, innerStyle, utils._style([style, customStyle]));
  return result;
}

