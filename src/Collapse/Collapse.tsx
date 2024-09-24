import React from "react";
import { useSpring, animated } from "react-spring";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";
import { CollapseProps } from "./interface";
import "./Collapse.css";

const HorizontalCollapse = (collapseProps: CollapseProps) => {
  const {
    index,
    isCollapsed = false,
    title = "",
    panelContent,
    hideHeader = false,
    onToggleCollapse,
    getCollapseWidth,
    style,
  } = collapseProps;

  const collapseWidth = getCollapseWidth();

  const panelContentAnimatedStyle = useSpring({
    width: isCollapsed ? 0 : getCollapseWidth(),
  });

  const toggleWrapperAnimatedStyle = useSpring({
    transform: isCollapsed ? "rotate(0deg)" : "rotate(-90deg)",
  });

  const togglePanel = () => {
    onToggleCollapse && onToggleCollapse(index);
  };

  return (
    <div className="sitegeo-collapse">
      {!hideHeader ? (
        <div className="sitegeo-collapse-header" onClick={togglePanel}>
          <animated.div
            style={toggleWrapperAnimatedStyle}
            className="sitegeo-collapse-arrow"
          >
            <ArrowIcon />
          </animated.div>

          <div className="sitegeo-collapse-title">{title}</div>
        </div>
      ) : null}
      <animated.div
        className="sitegeo-collapse-content"
        style={{ ...style, ...panelContentAnimatedStyle }}
      >
        <div
          className="sitegeo-collapse-content-inner"
          style={{ width: collapseWidth }}
        >
          {panelContent}
        </div>
      </animated.div>
    </div>
  );
};

export default HorizontalCollapse;
