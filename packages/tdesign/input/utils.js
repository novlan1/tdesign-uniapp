import { getCharacterLength } from '../common/utils';


export function getInnerMaxLen({
  allowInputOverMax,
  maxcharacter,
  maxlength,
  dataValue,
  rawValue,
  count,
}) {
  if (allowInputOverMax) {
    return -1;
  }
  if (!maxcharacter || maxcharacter < 0) {
    return maxlength;
  }
  if (!dataValue) {
    return maxcharacter;
  }


  const { length: realCount } = getCharacterLength('maxcharacter', rawValue, Infinity);

  if (realCount >= maxcharacter) {
    return dataValue.length;
  }

  const extra = count - dataValue.length;

  return maxcharacter - extra;
}
