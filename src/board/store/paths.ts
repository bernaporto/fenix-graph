const BasePath = {
  SELECTED: 'selected',
  VIEW: 'view',
  VIEW_POSITION: 'view.position',
  VIEW_SCALE: 'view.scale',
  VIEW_SIZE: 'view.size',
};

const join = (...parts: string[]) => parts.join('.');

export const StorePath = {
  paths: BasePath,

  selected: (id: string) => join(BasePath.SELECTED, id),
};
