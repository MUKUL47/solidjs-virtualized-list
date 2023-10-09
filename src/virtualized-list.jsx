import { createSignal, onMount } from "solid-js";
/**
 * VirtualizedList component renders a virtualized list of items for optimized performance.
 * @param {{
 *  children: ({ index: number }) => JSX.Element;
 *  options: {
 *    containerSize: number;
 *    overscan?: number;
 *    dataLength: number;
 *    cellHeightWidth: number;
 *    direction?: "x" | "y";
 *    scrollTo?: (index: number) => void;
 *    debounce?: number;
 *    onScroll?: (event: Event) => void;
 *  };
 *  parentContainerProps?: React.DetailedHTMLProps;
 *  scrollContainerProps?: React.DetailedHTMLProps;
 * }} props
 * @returns {JSX.Element}
 */
export function VirtualizedList({
  children,
  options,
  parentContainerProps = {},
  scrollContainerProps = {},
} = {}) {
  const [list, setList] = createSignal();
  let debouncer = -1;
  let parentRef, scrollerRef;
  const {
    containerSize,
    overscan,
    dataLength,
    cellHeightWidth,
    direction = "y",
    scrollTo,
    debounce,
    onScroll,
  } = options || {};
  const untilIndex = Math.round(containerSize / cellHeightWidth);
  const heightWidth = direction === "y" ? "height" : "width";
  const styleCoordiateProperty = direction === "y" ? "top" : "left";
  onMount(() => {
    if (
      !options ||
      !options.containerSize ||
      !options.dataLength ||
      !options.cellHeightWidth
    ) {
      throw new Error("VirtualizedList: Required options are missing.");
    }

    initialize();
    update(true);
    scrollTo?.((index) => scrollToScroller(index));
  });

  function scrollToScroller(index) {
    index = +index;
    if (index < 0 || index > dataLength || isNaN(index)) return;
    parentRef.scrollTo({
      [styleCoordiateProperty]: index * cellHeightWidth,
    });
    update(false, index);
  }

  function getDataFromChild(index) {
    try {
      return children?.({
        index,
      });
    } catch (e) {
      return null;
    }
  }

  function update(isInit, scrollTo) {
    const lists = [];
    const [from, until] = getIterable(!!isInit, scrollTo);
    for (let i = from; i < until; i++) {
      const node = getDataFromChild(i);
      if (!node) continue;
      lists.push(
        getNode({
          height: px(cellHeightWidth),
          styleCoordiate: px(cellHeightWidth * i),
          node,
        })
      );
    }
    setList(lists);
  }

  function getNode({ height, styleCoordiate, node }) {
    const dirCoords = { [styleCoordiateProperty]: styleCoordiate };
    return (
      <div
        style={{
          height,
          ...dirCoords,
          position: "absolute",
        }}
      >
        {node}
      </div>
    );
  }

  function getIterable(isInit, scrollTo) {
    if (isInit) return [0, untilIndex + (overscan || 0)];
    const startIndex =
      scrollTo === undefined
        ? Math.round(
            Math.abs(
              scrollerRef.getBoundingClientRect()[styleCoordiateProperty]
            ) / cellHeightWidth
          )
        : scrollTo;
    return [
      startIndex - (overscan || 0),
      startIndex + untilIndex + (overscan || 0),
    ];
  }

  function onScrollRef(e) {
    if (debounce) {
      clearTimeout(debouncer);
      debouncer = setTimeout(() => update(), debounce);
      onScroll?.(e);
      return;
    }
    onScroll?.(e);
    update();
  }

  function initialize() {
    parentRef.style[heightWidth] = px(containerSize);
    scrollerRef.style[heightWidth] = px(cellHeightWidth * dataLength);
  }

  return (
    <div
      {...parentContainerProps}
      ref={parentRef}
      onScroll={onScrollRef}
      style={{
        overflow: "auto",
        willChange: "transform",
        position: "relative",
        boxSizing: "border-box",
        ...(parentContainerProps.style || {}),
      }}
    >
      <div ref={scrollerRef} {...scrollContainerProps}>
        {list()}
      </div>
    </div>
  );
}
function px(v) {
  return `${v}px`;
}
