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
  parentContainerStyle?: Record<string, string>;
  scrollContainerStyle?: Record<string, string>;
}

export function VirtualizedList(props: VirtualizedListProps): JSX.Element;
