import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { VirtualizedList } from "./virtualized-list";

const root = document.getElementById("root");
let data = Array.from({ length: 1000000 }).map((v, i) => i + 1);
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
        parentContainerStyle={{
          width: "250px",
        }}
      >
        {({ index }) => {
          return data[index] ? (
            <p style={{ height: "100%" }}>!{data[index]}</p>
          ) : null;
        }}
      </VirtualizedList>
      <input
        type="number"
        placeholder="Index"
        onChange={(e) => setScrollToKey(() => e.target.value)}
      />
      <button onClick={() => scrollTo(+scrollToKey())}>Scroll</button>
    </div>
  ),
  root
);
