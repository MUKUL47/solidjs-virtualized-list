import { JSX } from "solid-js";

interface VirtualizedListOptions {
  containerSize: number;
  overscan?: number;
  dataLength: number;
  cellHeightWidth: number;
  direction?: "x" | "y";
  scrollTo?: (cb: (index: number) => void) => void;
  debounce?: number;
  onScroll?: (event: Event) => void;
}

interface VirtualizedListProps {
  children: ({ index }: { index: number }) => JSX.Element;
  options: VirtualizedListOptions;
  parentContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  scrollContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export function VirtualizedList(props: VirtualizedListProps): JSX.Element;
