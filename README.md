# 🎯 trailing-cursor

A lightweight and customizable cursor trail effect that follows your mouse inside a specific container. Perfect for adding that extra flair to your UI.

## ✨ Features

- 🌀 Smooth trailing animation
- 🎨 Customizable color, size, and speed
- 🚀 Enlarges on interactive elements (like buttons, links)
- 🔒 Only activates inside a specific component or area
- 👻 Auto hides outside the target
- 🛠️ Zero dependencies, works in any framework (React, Svelte, Vanilla JS, etc.)

---

## 📦 Installation

```bash
npm install trailing-cursor
```
---
## 🚀 Quick Usage (React)
Wrap any component with a scoped <CursorTrail> to enable a custom cursor trail only within that area.

1. Create a CursorTrail.jsx component:
```jsx
// CursorTrail.jsx
import { useEffect, useRef } from "react";
import { initCursor } from "trailing-cursor";

export default function CursorTrail({ children, options = {} }) {
  const wrapperRef = useRef();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Ensure relative positioning for cursor placement
    const computed = getComputedStyle(wrapper);
    if (computed.position === "static") {
      wrapper.style.position = "relative";
    }

    const destroy = initCursor({
      ...options,
      target: wrapper,
    });

    return () => destroy();
  }, [options]);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden", minHeight: "200px" }}>
      {children}
    </div>
  );
}
```
2. Use it in your App:
```jsx
import CursorTrail from "./CursorTrail";
import YourComponent from "./YourComponent";

function App() {
  return (
    <>
      <CursorTrail options={{ color: "#00f0ff", size: "25px", speed: 0.15 }}>
        <YourComponent />
      </CursorTrail>

      {/* Other components not affected by the trail */}
      <main>Content without the trail</main>
    </>
  );
}
```
## Svelte Usage
```svelte
<script>
    import { onMount, onDestroy } from 'svelte';
    import { initCursor } from 'trailing-cursor';
  
    let wrapper;
    let destroy;
  
    onMount(() => {
      const computed = getComputedStyle(wrapper);
      if (computed.position === 'static') {
        wrapper.style.position = 'relative'; // Ensure relative positioning
      }
  
      destroy = initCursor({
        target: wrapper,
        color: '#00f0ff',
        size: '20px',
        speed: 0.2,
        hoverSize: '55px',
      });
    });
  
    onDestroy(() => {
      destroy?.();
    });
  </script>
  
  <style>
    .cursor-area {
      min-height: 300px;
      overflow: hidden;
      border: 2px dashed #ccc;
      padding: 2rem;
      position: relative; /* ensure this exists if not handled in JS */
    }
  </style>
  
  <div bind:this={wrapper} class="cursor-area">
    <h2>Move your cursor around me!</h2>
    <button>Hover Me</button>
  </div>
  
```
---
## 🧩 Options
| Option      |   Type   |    Default    |                             Description                              |
|:------------|:--------:|--------------:|:---------------------------------------------------------------------|
| `color`     | `string` |     "#fff"    | The color of the trail circles. Accepts any valid CSS color.        |
| `size`      | `string` |    "20px"     | The base size of each trail circle. Use CSS units like `px`, etc.   |
| `speed`     | `number` |      0.2      | Speed of the trail movement.|
| `hoverSize` | `string` |   "50px"      | Size of the trail when hovering over interactive elements.          |
---
## ✨ Features

- ✅ Scoped to any container
- 🎨 Custom color and size
- 🐢 Adjustable smoothness/speed
- 🧲 Grows on interactive elements
- 🖱️ Cursor-aware (disappears when outside)
- 💻 Zero dependencies
- 🪄 Easy to integrate into any framework

---

## 📦 For Other Frameworks
Use the initCursor({ target, ...options }) directly by importing it:
```js
import { initCursor } from "trailing-cursor";

const destroy = initCursor({
  target: document.getElementById("my-area"),
  color: "hotpink",
  size: "24px",
});

```
Don't forget to call destroy() to clean it up if you're mounting/unmounting dynamically.
---
## 🧹 Cleanup
The function returned by initCursor() should be called when you no longer need the trail (e.g., on component unmount):
```js
const destroy = initCursor({ ... });
destroy(); // Clean removal
```
