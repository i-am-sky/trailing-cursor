export function initCursor({
  target,
  color = "aqua",
  size = "20px",
  speed = 0.1,
  hoverSize = "35px",
  maxSpeedSize = "40px",
}) {
  if (!target || !(target instanceof HTMLElement)) {
    throw new Error("You must provide a valid `target` HTMLElement");
  }

  const cursor = document.createElement("div");
  const baseSize = parseInt(size);
  const maxSize = parseInt(maxSpeedSize);
  const hoverSizePx = parseInt(hoverSize);

  cursor.style.position = "absolute";
  cursor.style.width = size;
  cursor.style.height = size;
  cursor.style.borderRadius = "50%";
  cursor.style.backgroundColor = color;
  cursor.style.pointerEvents = "none";
  cursor.style.transition =
    "width 0.1s ease, height 0.1s ease, opacity 0.3s ease";
  cursor.style.zIndex = "1000";
  cursor.style.left = "0";
  cursor.style.top = "0";
  cursor.style.mixBlendMode = "difference";
  cursor.style.opacity = "0";

  target.appendChild(cursor);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let lastX = 0;
  let lastY = 0;
  let lastTime = performance.now();
  let isHovering = false;
  let animationFrameId;

  const updatePosition = () => {
    const now = performance.now();
    const deltaTime = now - lastTime;

    const dx = targetX - lastX;
    const dy = targetY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const velocity = distance / deltaTime;

    if (!isHovering) {
      const scaledSize = Math.min(baseSize + velocity * 50, maxSize); // tune multiplier
      cursor.style.width = `${scaledSize}px`;
      cursor.style.height = `${scaledSize}px`;
    }

    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

    lastX = targetX;
    lastY = targetY;
    lastTime = now;

    animationFrameId = requestAnimationFrame(updatePosition);
  };

  const handleMouseMove = (e) => {
    const rect = target.getBoundingClientRect();
    targetX = e.clientX - rect.left - baseSize / 2;
    targetY = e.clientY - rect.top - baseSize / 2;
  };

  const showCursor = () => (cursor.style.opacity = "1");
  const hideCursor = () => (cursor.style.opacity = "0");

  const isInteractive = (el) => {
    const tag = el.tagName?.toLowerCase();
    const pointer = window.getComputedStyle(el).cursor;
    return (
      ["a", "button", "input", "textarea", "select", "label"].includes(tag) ||
      pointer === "pointer"
    );
  };

  const handleMouseOver = (e) => {
    if (isInteractive(e.target)) {
      isHovering = true;
      cursor.style.width = hoverSize;
      cursor.style.height = hoverSize;
    }
  };

  const handleMouseOut = (e) => {
    if (isInteractive(e.target)) {
      isHovering = false;
    }
  };

  target.addEventListener("mousemove", handleMouseMove);
  target.addEventListener("mouseenter", showCursor);
  target.addEventListener("mouseleave", hideCursor);
  target.addEventListener("mouseover", handleMouseOver);
  target.addEventListener("mouseout", handleMouseOut);

  updatePosition();

  return () => {
    cancelAnimationFrame(animationFrameId);
    target.removeEventListener("mousemove", handleMouseMove);
    target.removeEventListener("mouseenter", showCursor);
    target.removeEventListener("mouseleave", hideCursor);
    target.removeEventListener("mouseover", handleMouseOver);
    target.removeEventListener("mouseout", handleMouseOut);
    if (target.contains(cursor)) {
      target.removeChild(cursor);
    }
  };
}
