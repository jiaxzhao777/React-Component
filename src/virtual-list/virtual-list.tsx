import React, { useState, useRef } from "react";
import { DIRECTION, IProps, ItemStyle } from "./virtual-list-interface";

const STYLE_WRAPPER: React.CSSProperties = {
  overflow: "auto",
  willChange: "transform",
  WebkitOverflowScrolling: "touch",
};

const STYLE_INNER: React.CSSProperties = {
  position: "relative",
  minWidth: "100%",
  minHeight: "100%",
};

const sizeProp = {
  [DIRECTION.VERTICAL]: "height",
  [DIRECTION.HORIZONTAL]: "width",
};

const positionProp = {
  [DIRECTION.VERTICAL]: "top",
  [DIRECTION.HORIZONTAL]: "left",
};

const VirtualList = (props: IProps) => {
  const rootNode = useRef<HTMLDivElement | null>(null);
  // const [isMount, setMount] = useState<boolean>(false);
  const [styleCache] = useState<{ [id: number]: ItemStyle }>({});
  const {
    width,
    height,
    itemCount,
    itemSize,
    renderItem,
    style = {},
    onScroll,
    scrollOffset,
    overscanCount = 3,
    scrollDirection = DIRECTION.VERTICAL,
    ...otherProps
  } = props;
  const wrapperStyle = { ...STYLE_WRAPPER, ...style, height, width };
  const innerStyle = {
    ...STYLE_INNER,
    [sizeProp[scrollDirection]]: itemCount * itemSize, // 计算列表整体高度/宽度（取决于垂直或水平）
  };
  const getStyle = (index: number) => {
    const style = styleCache[index];
    if (style) return style;

    return (styleCache[index] = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      [sizeProp[scrollDirection]]: props.itemSize, // height / width
      [positionProp[scrollDirection]]: props.itemSize * index, // top / left
    });
  };

  const items: React.ReactNode[] = [];
  return (
    <div ref={rootNode} {...otherProps} style={wrapperStyle}>
      <div style={innerStyle}>{items}</div>
    </div>
  );
};

export default VirtualList;
