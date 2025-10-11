export const getTypeof = function (obj) {
  return typeof obj;
};

export const getActionClass = function (prefix, buttonLayout) {
  const cls = [`${prefix}__button`, `${prefix}__button--action`];

  if (buttonLayout) {
    cls.push(`${prefix}__button--${buttonLayout}`);
  }

  return cls.join(' ');
};
