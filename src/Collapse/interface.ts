export interface CollapseProps {
  index: number;
  isCollapsed?: boolean;
  title?: string;
  panelContent?: React.ReactNode;
  hideHeader?: boolean;
  style?: React.CSSProperties;
  onToggleCollapse: (index: number) => void;
  getCollapseWidth: () => number;
}