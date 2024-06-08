import React, { useRef, useState, useEffect } from 'react';
import { DIRECTION, IProps, ItemStyle } from './virtual-list-interface';

const STYLE_WRAPPER: React.CSSProperties = {
    overflow: 'auto',
    willChange: 'transform',
    WebkitOverflowScrolling: 'touch',
};

const STYLE_INNER: React.CSSProperties = {
    position: 'relative',
    minWidth: '100%',
    minHeight: '100%',
};

const sizeProp = {
    [DIRECTION.VERTICAL]: 'height',
    [DIRECTION.HORIZONTAL]: 'width',
};

const positionProp = {
    [DIRECTION.VERTICAL]: 'top',
    [DIRECTION.HORIZONTAL]: 'left',
};

const VirtualList: React.FC<IProps> = (props) => {
    const { 
        width, height, itemCount, itemSize, renderItem, style = {}, onScroll, scrollOffset,
        overscanCount = 3, 
        scrollDirection = DIRECTION.VERTICAL, 
        ...otherProps 
    } = props;

    const rootNode = useRef<HTMLDivElement | null>(null);
    const [offset, setOffset] = useState<number>(scrollOffset || 0);
    const [styleCache] = useState<{ [id: number]: ItemStyle }>({});
    const [isMount, setMount] = useState<boolean>(false);

    useEffect(() => {
        if (!isMount) setMount(true); // 强制更新一次，供 getVisibleRange 方法获取 DOM 挂载后 containerSize
        if (scrollOffset) scrollTo(scrollOffset);

        rootNode.current?.addEventListener('scroll', handleScroll);
        return () => {
            rootNode.current?.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScroll = (event: Event) => {
        const { scrollTop = 0, scrollLeft = 0 } = rootNode.current as HTMLDivElement;
        const newOffset = scrollDirection === DIRECTION.VERTICAL ? scrollTop : scrollLeft;
        if (newOffset < 0 || newOffset === offset || event.target !== rootNode.current) {
            return;
        }
        setOffset(newOffset);
        if (typeof onScroll === 'function') {
            onScroll(offset, event);
        }
    };

    const scrollTo = (value: number) => {
        if (scrollDirection === DIRECTION.VERTICAL) {
            rootNode.current!.scrollTop = value;
        } else {
            rootNode.current!.scrollLeft = value;
        }
    }

    const getVisibleRange = () => { // 获取可视范围
        const { clientHeight = 0, clientWidth = 0 } = rootNode.current as HTMLDivElement || {};
        const containerSize: number = scrollDirection === DIRECTION.VERTICAL ? clientHeight : clientWidth;
        let start = Math.floor(offset / itemSize - 1); // start --> 向下取整 （索引是从0开始，所以 - 1）
        let stop = Math.ceil((offset + containerSize) / itemSize - 1); // stop --> 向上取整
        return {
            start: Math.max(0, start - overscanCount),
            stop: Math.min(stop + overscanCount, itemCount - 1),
        }
    }

    const getStyle = (index: number) => {
        const style = styleCache[index];
        if (style) return style;

        return (styleCache[index] = {
            position: 'absolute', top: 0, left: 0, width: '100%',
            [sizeProp[scrollDirection]]: props.itemSize, // height / width
            [positionProp[scrollDirection]]: props.itemSize * index, // top / left
        });
    }

    const wrapperStyle = { ...STYLE_WRAPPER, ...style, height, width };
    const innerStyle = {
        ...STYLE_INNER,
        [sizeProp[scrollDirection]]: itemCount * itemSize, // 计算列表整体高度/宽度（取决于垂直或水平）
    };
    const items: React.ReactNode[] = [];
    const { start, stop } = getVisibleRange();
    
    for (let index = start; index <= stop; index ++) {
        items.push(
            renderItem({ index, style: getStyle(index) })
        );
    }
    
    return (
        <div ref={rootNode} {...otherProps} style={wrapperStyle}>
            <div style={innerStyle}>{items}</div>
        </div>
    )
}

export default VirtualList;
