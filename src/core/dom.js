class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector; // #app
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html("");
    return this;
  }
  on(eventType, callBack) {
    this.$el.addEventListener(eventType, callBack, true);
  }
  off(eventType, callBack) {
    this.$el.removeEventListener(eventType, callBack, true);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCords() {
    return this.$el.getBoundingClientRect();
  }
  get data() {
    return this.$el.dataset;
  }
  finder(selector) {
    return this.$el.querySelectorAll(selector);
  }
  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  attribute(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }
  focus() {
    this.$el.focus();
    return this;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return { row: +parsed[0], col: +parsed[1] };
    }
    return this.data.id;
  }
  findOneEl(selector) {
    return $(this.$el.querySelector(selector));
  }

  getStyles(styles = {}) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  addClass(className) {
    return this.$el.classList.add(className);
  }

  removeClass(className) {
    return this.$el.classList.remove(className);
  }
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
