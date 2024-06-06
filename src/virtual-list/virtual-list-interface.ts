export interface IProps {
  width: number | string;
  height: number | string;
  itemCount: number;
  itemSize: number;
  renderItem(itemInfo: { index: number; style: ItemStyle }): React.ReactNode;
  className: string;
  style?: React.CSSProperties;
  scrollDirection?: DIRECTION; // 列表应该垂直还是水平滚动。“垂直”（默认）或“水平”之一
  overscanCount?: number; // 上方/下方渲染的额外缓冲区项数
  scrollOffset?: number; // 可用于设置初始化滚动偏移量
  onScroll?(offset: number, event: Event): void;
}

export enum DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface ItemStyle {
  position: "absolute";
  top?: number;
  left: number;
  width: string | number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  zIndex?: number;
}
