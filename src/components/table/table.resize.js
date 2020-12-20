import { $ } from "@core/dom";
export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;

  const sidesProp = type === "col" ? "bottom" : "right";
  $resizer.css({ opacity: 1, [sidesProp]: "-1000px" });

  const $d = $resizer.closest('[data-type="resizeable"]');
  const cells = $root.finder(`[data-col="${$d.data.col}"]`);
  let value;

  const coords = $d.getCords();
  document.onmousemove = (e) => {
    if (type === "col") {
      const delta = e.pageX - coords.right;
      
      value = coords.width + delta;

      $resizer.css({ right: -delta + "px" });
    
    
    } else if (type === "row") {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({ bottom: -delta + "px" });
    }

    document.onmouseup = () => {
      $resizer.$el.style.sidesProp = null;
      if (type === "col") {
        $d.css({ width: value + "px" });

        cells.forEach((el) => (el.style.width = value + "px"));
        $resizer.css({ opacity: 0, bottom: 0, right: 0 });
      } else {
        $d.css({ height: value + "px" });
        cells.forEach((el) => (el.style.height = value + "px"));

        $resizer.css({ opacity: 0, bottom: 0 });
      }

      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  
}
