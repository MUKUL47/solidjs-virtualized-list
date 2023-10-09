import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { VirtualizedList } from "./virtualized-list";

const root = document.getElementById("root");
let data = Array.from({ length: 1e6 }).map((v, i) => i + 1);
let x = Array.from({ length: 1e5 }).map((v, i) => i + 1);
let scrollTo;
const [scrollToKey, setScrollToKey] = createSignal(0);
render(
  () => (
    <div>
      <VirtualizedList
        options={{
          containerSize: 500,
          dataLength: data.length,
          cellHeightWidth: 20,
          overscan: 10,
          direction: "y",
          scrollTo: (cb) => (scrollTo = cb),
          onScroll: (e) => {
            console.log(e);
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
            <p style={{ height: "100%" }}>Y:{data[index]}</p>
          ) : null;
        }}
      </VirtualizedList>
      <input
        type="number"
        placeholder="Index"
        onChange={(e) => setScrollToKey(() => e.target.value)}
      />
      <button onClick={() => scrollTo(+scrollToKey())}>Scroll</button>
      <VirtualizedList
        options={{
          containerSize: 1000,
          dataLength: x.length,
          cellHeightWidth: 100,
          overscan: 10,
          direction: "x",
        }}
        parentContainerStyle={{
          width: "250px",
          height: "100px",
        }}
      >
        {({ index }) => {
          return x[index] ? (
            <p style={{ height: "100%" }}>X:{x[index]}</p>
          ) : null;
        }}
      </VirtualizedList>
    </div>
  ),
  root
);
