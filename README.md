# SolidJs Virtualized List

## A lightweight, highly efficient virtualized list component for SolidJs that supports both horizontal and vertical rows, allowing you to efficiently render large datasets with ease.

#### Features

1. Supports both horizontal and vertical rows.
2. Efficiently handles large datasets by rendering only the visible elements.
3. Provides a scrollTo function to programmatically scroll to a specific item.

```
npm i solidjs-virtualizedlist
```

##### Usage Example

```jsx
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { VirtualizedList } from "./virtualized-list.jsx";

const root = document.getElementById("root");

// Generate data for the list
let data = Array.from({ length: 1000000 }).map((v, i) => i + 1);

let scrollTo; // Declare a variable to hold the scrollTo function

const [scrollToKey, setScrollToKey] = createSignal(0); // Create a signal for the scroll target index

render(
  () => (
    <div>
      <VirtualizedList
        options={{
          containerSize: 500, // Height of the visible container
          dataLength: data.length, // Total length of the dataset
          cellHeightWidth: 20, // Height of each item in the list
          overscan: 10, // Number of extra items to render above and below the visible area
          direction: "y", // Direction of the list (vertical in this case)
          scrollTo: (cb) => (scrollTo = cb), // Callback to set the scrollTo function
          onScroll: (e) => {
            console.log(e); // Event handler for scroll events
          },
        }}
        parentContainerProps={{
          style: {
            width: "250px",
          },
        }}
        scrollContainerProps={{}}
      >
        {({ index }) => {
          return data[index] ? (
            <p style={{ height: "100%" }}>!{data[index]}</p> // Rendered item in the list
          ) : null;
        }}
      </VirtualizedList>
      <input
        type="number"
        placeholder="Index"
        onChange={(e) => setScrollToKey(() => e.target.value)}
      />
      <button onClick={() => scrollTo(+scrollToKey())}>Scroll</button> // Button
      to trigger scroll
    </div>
  ),
  root
);
```

| Property               | Type                                                                                     | Description                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `children`             | `({ index }: { index: number }) => JSX.Element`                                          | Function that takes an index and returns a React element to be rendered. |
| `options`              | [`VirtualizedListOptions`](#virtualizedlistoptions)                                      | Configuration options for the virtualized list.                          |
| `parentContainerProps` | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> (optional) | HTML attributes for the parent container element.                        |
| `scrollContainerProps` | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> (optional) | HTML attributes for the scroll container element.                        |

### `VirtualizedListOptions`

| Property          | Type                                               | Description                                                       |
| ----------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `containerSize`   | `number`                                           | Height of the visible container.                                  |
| `overscan`        | `number` (optional)                                | Number of extra items to render above and below the visible area. |
| `dataLength`      | `number`                                           | Total length of the dataset.                                      |
| `cellHeightWidth` | `number`                                           | Height or Width of each item in the list.                         |
| `direction`       | `"x"` \| `"y"` (optional, default: `"y"`)          | Direction of the list (horizontal or vertical).                   |
| `scrollTo`        | `(cb: (index: number) => void) => void` (optional) | Callback to set the scrollTo function.                            |
| `debounce`        | `number` (optional)                                | Debounce value for scroll events (milliseconds).                  |
| `onScroll`        | `(event: Event) => void` (optional)                | Event handler for scroll events.                                  |
