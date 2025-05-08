import {
  s as setContext$1,
  h as hasContext,
  g as getContext$1,
  p as push,
  c as pop,
  o as once,
  d as spread_attributes,
  f as bind_props,
  j as getAllContexts,
  k as spread_props,
  l as copy_payload,
  m as assign_payload,
  e as escape_html,
  n as ensure_array_like,
  q as attr,
} from "../../chunks/index.js";
import { clsx } from "clsx";
import "@meshsdk/core";
import parse from "style-to-object";
import { Option } from "effect";
async function tick() {}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    },
  };
}
function boxWith(getter, setter) {
  const derived = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived;
      },
      set current(v) {
        setter(v);
      },
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    },
  };
}
function boxFrom(value) {
  if (box.isBox(value)) return value;
  if (isFunction(value)) return box.with(value);
  return box(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce((acc, [key, b]) => {
    if (!box.isBox(b)) {
      return Object.assign(acc, { [key]: b });
    }
    if (box.isWritableBox(b)) {
      Object.defineProperty(acc, key, {
        get() {
          return b.current;
        },
        set(v) {
          b.current = v;
        },
      });
    } else {
      Object.defineProperty(acc, key, {
        get() {
          return b.current;
        },
      });
    }
    return acc;
  }, {});
}
function toReadonlyBox(b) {
  if (!box.isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    },
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function composeHandlers(...handlers) {
  return function (e) {
    for (const handler of handlers) {
      if (!handler) continue;
      if (e.defaultPrevented) return;
      if (typeof handler === "function") {
        handler.call(this, e);
      } else {
        handler.current?.call(this, e);
      }
    }
  };
}
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) return void 0;
  return char !== char.toLowerCase();
}
function splitByCase(str) {
  const parts = [];
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = STR_SPLITTERS.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function pascalCase(str) {
  if (!str) return "";
  return splitByCase(str)
    .map((p) => upperFirst(p))
    .join("");
}
function camelCase(str) {
  return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function cssToStyleObj(css) {
  if (!css) return {};
  const styleObj = {};
  function iterator(name, value) {
    if (
      name.startsWith("-moz-") ||
      name.startsWith("-webkit-") ||
      name.startsWith("-ms-") ||
      name.startsWith("-o-")
    ) {
      styleObj[pascalCase(name)] = value;
      return;
    }
    if (name.startsWith("--")) {
      styleObj[name] = value;
      return;
    }
    styleObj[camelCase(name)] = value;
  }
  parse(css, iterator);
  return styleObj;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(
        `expected an argument of type string, but got ${typeof str}`,
      );
    }
    if (!str.match(regex)) return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(
  /[A-Z]/,
  (match) => `-${match.toLowerCase()}`,
);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(
      `expected an argument of type object, but got ${typeof styleObj}`,
    );
  }
  return Object.keys(styleObj)
    .map((property) => `${camelToKebab(property)}: ${styleObj[property]};`)
    .join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
}
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)",
};
styleToString(srOnlyStyles);
function isEventHandler(key) {
  return (
    key.length > 2 && key.startsWith("on") && key[2] === key[2]?.toLowerCase()
  );
}
function mergeProps(...args) {
  const result = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];
      const aIsFunction = typeof a === "function";
      const bIsFunction = typeof b === "function";
      if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
        const aHandler = a;
        const bHandler = b;
        result[key] = composeHandlers(aHandler, bHandler);
      } else if (aIsFunction && bIsFunction) {
        result[key] = executeCallbacks(a, b);
      } else if (
        key === "class" &&
        typeof a === "string" &&
        typeof b === "string"
      ) {
        result[key] = clsx(a, b);
      } else if (key === "style") {
        const aIsObject = typeof a === "object";
        const bIsObject = typeof b === "object";
        const aIsString = typeof a === "string";
        const bIsString = typeof b === "string";
        if (aIsObject && bIsObject) {
          result[key] = { ...a, ...b };
        } else if (aIsObject && bIsString) {
          const parsedStyle = cssToStyleObj(b);
          result[key] = { ...a, ...parsedStyle };
        } else if (aIsString && bIsObject) {
          const parsedStyle = cssToStyleObj(a);
          result[key] = { ...parsedStyle, ...b };
        } else if (aIsString && bIsString) {
          const parsedStyleA = cssToStyleObj(a);
          const parsedStyleB = cssToStyleObj(b);
          result[key] = { ...parsedStyleA, ...parsedStyleB };
        } else if (aIsObject) {
          result[key] = a;
        } else if (bIsObject) {
          result[key] = b;
        }
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
  }
  if (typeof result.style === "object") {
    result.style = styleToString(result.style).replaceAll("\n", " ");
  }
  if (result.hidden !== true) {
    result.hidden = void 0;
  }
  if (result.disabled !== true) {
    result.disabled = void 0;
  }
  return result;
}
function useRefById({
  id,
  ref,
  deps = () => true,
  onRefChange = () => {},
  getRootNode = () => (typeof document !== "undefined" ? document : void 0),
}) {
  (() => deps())();
  (() => getRootNode())();
}
function afterTick(fn) {
  tick().then(fn);
}
function getDataOpenClosed(condition) {
  return condition ? "open" : "closed";
}
function getAriaExpanded(condition) {
  return condition ? "true" : "false";
}
function getAriaOrientation(orientation) {
  return orientation;
}
function getAriaHidden(condition) {
  return condition ? "true" : void 0;
}
function getDataOrientation(orientation) {
  return orientation;
}
const ENTER = "Enter";
const ESCAPE = "Escape";
const SPACE = " ";
const TAB = "Tab";
const isBrowser = typeof document !== "undefined";
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isElement(element) {
  return element instanceof Element;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function isElementHidden(node, stopAt) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (stopAt !== void 0 && node === stopAt) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function setContext(key, value) {
  return setContext$1(key, value);
}
function getContext(key, fallback) {
  const trueKey = typeof key === "symbol" ? key : key;
  const description = typeof key === "symbol" ? key.description : key;
  if (!hasContext(trueKey)) {
    if (fallback === void 0) {
      throw new Error(
        `Missing context dependency: ${description} and no fallback was provided.`,
      );
    }
    return fallback;
  }
  return getContext$1(key);
}
function getSymbolDescription(providerComponentName, contextName) {
  {
    return `${providerComponentName}Context`;
  }
}
function createContext(providerComponentName, contextName, useSymbol = true) {
  const symbolDescription = getSymbolDescription(providerComponentName);
  const symbol = Symbol.for(`bits-ui.${symbolDescription}`);
  const key = symbolDescription;
  function getCtx(fallback) {
    const context = getContext(useSymbol ? symbol : key, fallback);
    if (context === void 0) {
      throw new Error(
        `Context \`${symbolDescription}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`,
      );
    }
    if (context === null) return context;
    return context;
  }
  function setCtx(value) {
    if (useSymbol) {
      return setContext(symbol, value);
    } else {
      return setContext(key, value);
    }
  }
  return [setCtx, getCtx];
}
let count = 0;
function useId(prefix = "bits") {
  count++;
  return `${prefix}-${count}`;
}
function noop() {}
function useStateMachine(initialState, machine) {
  const state = box(initialState);
  function reducer(event) {
    const nextState = machine[state.current][event];
    return nextState ?? state.current;
  }
  const dispatch = (event) => {
    state.current = reducer(event);
  };
  return { state, dispatch };
}
function usePresence(present, id) {
  const initialState = present.current ? "mounted" : "unmounted";
  const { state } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended",
    },
    unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
    unmounted: { MOUNT: "mounted" },
  });
  const isPresentDerived = ["mounted", "unmountSuspended"].includes(
    state.current,
  );
  return {
    get current() {
      return isPresentDerived;
    },
  };
}
function Presence_layer($$payload, $$props) {
  push();
  let { present, forceMount, presence, id } = $$props;
  const isPresent = usePresence(
    box.with(() => present),
    box.with(() => id),
  );
  if (forceMount || present || isPresent.current) {
    $$payload.out += "<!--[-->";
    presence?.($$payload, { present: isPresent });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function createAttrs(variant) {
  return {
    content: `data-${variant}-content`,
    trigger: `data-${variant}-trigger`,
    overlay: `data-${variant}-overlay`,
    title: `data-${variant}-title`,
    description: `data-${variant}-description`,
    close: `data-${variant}-close`,
    cancel: `data-${variant}-cancel`,
    action: `data-${variant}-action`,
  };
}
class DialogRootState {
  open;
  variant;
  triggerNode = null;
  titleNode = null;
  contentNode = null;
  descriptionNode = null;
  contentId = void 0;
  titleId = void 0;
  triggerId = void 0;
  descriptionId = void 0;
  cancelNode = null;
  #attrs = once(() => createAttrs(this.variant.current));
  get attrs() {
    return this.#attrs();
  }
  constructor(props) {
    this.open = props.open;
    this.variant = props.variant;
  }
  handleOpen = () => {
    if (this.open.current) return;
    this.open.current = true;
  };
  handleClose = () => {
    if (!this.open.current) return;
    this.open.current = false;
  };
  #sharedProps = once(() => ({
    "data-state": getDataOpenClosed(this.open.current),
  }));
  get sharedProps() {
    return this.#sharedProps();
  }
}
class DialogTriggerState {
  #id;
  #ref;
  #root;
  #disabled;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    this.#disabled = props.disabled;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.triggerNode = node;
        this.#root.triggerId = node?.id;
      },
    });
  }
  #onclick = (e) => {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    this.#root.handleOpen();
  };
  #onpointerdown = (e) => {
    if (this.#disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    if (e.button > 0) return;
    e.preventDefault();
    this.#root.handleOpen();
  };
  #onkeydown = (e) => {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.handleOpen();
    }
  };
  #props = once(() => ({
    id: this.#id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.#root.open.current),
    "aria-controls": this.#root.contentId,
    [this.#root.attrs.trigger]: "",
    onpointerdown: this.#onpointerdown,
    onkeydown: this.#onkeydown,
    onclick: this.#onclick,
    ...this.#root.sharedProps,
  }));
  get props() {
    return this.#props();
  }
}
class DialogCloseState {
  #id;
  #ref;
  #root;
  #variant;
  #disabled;
  #attr = once(() => this.#root.attrs[this.#variant.current]);
  constructor(props, root) {
    this.#root = root;
    this.#ref = props.ref;
    this.#id = props.id;
    this.#variant = props.variant;
    this.#disabled = props.disabled;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#root.open.current,
    });
  }
  #onclick = (e) => {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    this.#root.handleClose();
  };
  #onpointerdown = (e) => {
    if (this.#disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    if (e.button > 0) return;
    e.preventDefault();
    this.#root.handleClose();
  };
  #onkeydown = (e) => {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.handleClose();
    }
  };
  #props = once(() => ({
    id: this.#id.current,
    [this.#attr()]: "",
    onpointerdown: this.#onpointerdown,
    onclick: this.#onclick,
    onkeydown: this.#onkeydown,
    ...this.#root.sharedProps,
  }));
  get props() {
    return this.#props();
  }
}
class DialogTitleState {
  #id;
  #ref;
  #root;
  #level;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    this.#level = props.level;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.titleNode = node;
        this.#root.titleId = node?.id;
      },
      deps: () => this.#root.open.current,
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "heading",
    "aria-level": this.#level.current,
    [this.#root.attrs.title]: "",
    ...this.#root.sharedProps,
  }));
  get props() {
    return this.#props();
  }
}
class DialogDescriptionState {
  #id;
  #ref;
  #root;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#root.open.current,
      onRefChange: (node) => {
        this.#root.descriptionNode = node;
        this.#root.descriptionId = node?.id;
      },
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.#root.attrs.description]: "",
    ...this.#root.sharedProps,
  }));
  get props() {
    return this.#props();
  }
}
class DialogContentState {
  #id;
  #ref;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.root = root;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.root.open.current,
      onRefChange: (node) => {
        this.root.contentNode = node;
        this.root.contentId = node?.id;
      },
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    role:
      this.root.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
    "aria-describedby": this.root.descriptionId,
    "aria-labelledby": this.root.titleId,
    [this.root.attrs.content]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps,
  }));
  get props() {
    return this.#props();
  }
}
class DialogOverlayState {
  #id;
  #ref;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.root.open.current,
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.root.attrs.overlay]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps,
  }));
  get props() {
    return this.#props();
  }
}
const [setDialogRootContext, getDialogRootContext] =
  createContext("Dialog.Root");
function useDialogRoot(props) {
  return setDialogRootContext(new DialogRootState(props));
}
function useDialogTrigger(props) {
  const root = getDialogRootContext();
  return new DialogTriggerState(props, root);
}
function useDialogTitle(props) {
  return new DialogTitleState(props, getDialogRootContext());
}
function useDialogContent(props) {
  return new DialogContentState(props, getDialogRootContext());
}
function useDialogOverlay(props) {
  return new DialogOverlayState(props, getDialogRootContext());
}
function useDialogDescription(props) {
  return new DialogDescriptionState(props, getDialogRootContext());
}
function useDialogClose(props) {
  return new DialogCloseState(props, getDialogRootContext());
}
function Dialog_title($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    level = 2,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const titleState = useDialogTitle({
    id: box.with(() => id),
    level: box.with(() => level),
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
  });
  const mergedProps = mergeProps(restProps, titleState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Portal($$payload, $$props) {
  push();
  let { to = "body", children, disabled } = $$props;
  getAllContexts();
  getTarget();
  function getTarget() {
    if (!isBrowser || disabled) return null;
    let localTarget = null;
    if (typeof to === "string") {
      localTarget = document.querySelector(to);
    } else if (to instanceof HTMLElement || to instanceof DocumentFragment) {
      localTarget = to;
    } else;
    return localTarget;
  }
  if (disabled) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) =>
      target.removeEventListener(_event, handler, options),
    );
  };
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
  #interactOutsideProp;
  #behaviorType;
  #interceptedEvents = { pointerdown: false };
  #isResponsibleLayer = false;
  node = box(null);
  #documentObj = void 0;
  #enabled;
  #isFocusInsideDOMTree = false;
  #onFocusOutside;
  currNode = null;
  #isValidEventProp;
  #unsubClickListener = noop;
  constructor(props) {
    this.#enabled = props.enabled;
    this.#isValidEventProp = props.isValidEvent;
    useRefById({
      id: props.id,
      ref: this.node,
      deps: () => this.#enabled.current,
      onRefChange: (node) => {
        this.currNode = node;
      },
    });
    this.#behaviorType = props.interactOutsideBehavior;
    this.#interactOutsideProp = props.onInteractOutside;
    this.#onFocusOutside = props.onFocusOutside;
  }
  #handleFocus = (event) => {
    if (event.defaultPrevented) return;
    if (!this.currNode) return;
    afterTick(() => {
      if (!this.currNode || this.#isTargetWithinLayer(event.target)) return;
      if (event.target && !this.#isFocusInsideDOMTree) {
        this.#onFocusOutside.current?.(event);
      }
    });
  };
  #addEventListeners() {
    return executeCallbacks(
      /**
       * CAPTURE INTERACTION START
       * mark interaction-start event as intercepted.
       * mark responsible layer during interaction start
       * to avoid checking if is responsible layer during interaction end
       * when a new floating element may have been opened.
       */
      addEventListener(
        this.#documentObj,
        "pointerdown",
        executeCallbacks(
          this.#markInterceptedEvent,
          this.#markResponsibleLayer,
        ),
        true,
      ),
      /**
       * BUBBLE INTERACTION START
       * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
       * to avoid prematurely checking if other events were intercepted.
       */
      addEventListener(
        this.#documentObj,
        "pointerdown",
        executeCallbacks(
          this.#markNonInterceptedEvent,
          this.#handleInteractOutside,
        ),
      ),
      /**
       * HANDLE FOCUS OUTSIDE
       */
      addEventListener(this.#documentObj, "focusin", this.#handleFocus),
    );
  }
  #handleDismiss = (e) => {
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(e);
    }
    this.#interactOutsideProp.current(e);
  };
  #handleInteractOutside = debounce((e) => {
    if (!this.currNode) {
      this.#unsubClickListener();
      return;
    }
    const isEventValid =
      this.#isValidEventProp.current(e, this.currNode) ||
      isValidEvent(e, this.currNode);
    if (
      !this.#isResponsibleLayer ||
      this.#isAnyEventIntercepted() ||
      !isEventValid
    ) {
      this.#unsubClickListener();
      return;
    }
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(event);
    }
    if (
      this.#behaviorType.current !== "close" &&
      this.#behaviorType.current !== "defer-otherwise-close"
    ) {
      this.#unsubClickListener();
      return;
    }
    if (e.pointerType === "touch") {
      this.#unsubClickListener();
      this.#unsubClickListener = addEventListener(
        this.#documentObj,
        "click",
        this.#handleDismiss,
        { once: true },
      );
    } else {
      this.#interactOutsideProp.current(event);
    }
  }, 10);
  #markInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = true;
  };
  #markNonInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = false;
  };
  #markResponsibleLayer = () => {
    if (!this.node.current) return;
    this.#isResponsibleLayer = isResponsibleLayer(this.node.current);
  };
  #isTargetWithinLayer = (target) => {
    if (!this.node.current) return false;
    return isOrContainsTarget(this.node.current, target);
  };
  #resetState = debounce(() => {
    for (const eventType in this.#interceptedEvents) {
      this.#interceptedEvents[eventType] = false;
    }
    this.#isResponsibleLayer = false;
  }, 20);
  #isAnyEventIntercepted() {
    const i = Object.values(this.#interceptedEvents).some(Boolean);
    return i;
  }
  #onfocuscapture = () => {
    this.#isFocusInsideDOMTree = true;
  };
  #onblurcapture = () => {
    this.#isFocusInsideDOMTree = false;
  };
  props = {
    onfocuscapture: this.#onfocuscapture,
    onblurcapture: this.#onblurcapture,
  };
}
function useDismissibleLayer(props) {
  return new DismissibleLayerState(props);
}
function getTopMostLayer(layersArr) {
  return layersArr.findLast(
    ([_, { current: behaviorType }]) =>
      behaviorType === "close" || behaviorType === "ignore",
  );
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].node.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.node.current === node;
}
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0) return false;
  const target = e.target;
  if (!isElement(target)) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid =
    ownerDocument.documentElement.contains(target) &&
    !isOrContainsTarget(node, target);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    },
  });
  return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
  push();
  let {
    interactOutsideBehavior = "close",
    onInteractOutside = noop,
    onFocusOutside = noop,
    id,
    children,
    enabled,
    isValidEvent: isValidEvent2 = () => false,
  } = $$props;
  const dismissibleLayerState = useDismissibleLayer({
    id: box.with(() => id),
    interactOutsideBehavior: box.with(() => interactOutsideBehavior),
    onInteractOutside: box.with(() => onInteractOutside),
    enabled: box.with(() => enabled),
    onFocusOutside: box.with(() => onFocusOutside),
    isValidEvent: box.with(() => isValidEvent2),
  });
  children?.($$payload, { props: dismissibleLayerState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
  #onEscapeProp;
  #behaviorType;
  #enabled;
  constructor(props) {
    this.#behaviorType = props.escapeKeydownBehavior;
    this.#onEscapeProp = props.onEscapeKeydown;
    this.#enabled = props.enabled;
  }
  #addEventListener = () => {
    return addEventListener(document, "keydown", this.#onkeydown, {
      passive: false,
    });
  };
  #onkeydown = (e) => {
    if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
    const clonedEvent = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const behaviorType = this.#behaviorType.current;
    if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close")
      return;
    this.#onEscapeProp.current(clonedEvent);
  };
}
function useEscapeLayer(props) {
  return new EscapeLayerState(props);
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(
    ([_, { current: behaviorType }]) =>
      behaviorType === "close" || behaviorType === "ignore",
  );
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
  push();
  let {
    escapeKeydownBehavior = "close",
    onEscapeKeydown = noop,
    children,
    enabled,
  } = $$props;
  useEscapeLayer({
    escapeKeydownBehavior: box.with(() => escapeKeydownBehavior),
    onEscapeKeydown: box.with(() => onEscapeKeydown),
    enabled: box.with(() => enabled),
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createFocusScopeAPI() {
  let paused = false;
  return {
    id: useId(),
    get paused() {
      return paused;
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    },
  };
}
function focus(element, { select = false } = {}) {
  if (!(element && element.focus)) return;
  const previouslyFocusedElement = document.activeElement;
  element.focus({ preventScroll: true });
  if (
    element !== previouslyFocusedElement &&
    isSelectableInput(element) &&
    select
  ) {
    element.select();
  }
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isElementHidden(element, container)) return element;
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line ts/no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function useFocusScope({
  id,
  loop,
  enabled,
  onOpenAutoFocus,
  onCloseAutoFocus,
  forceMount,
}) {
  const focusScope = createFocusScopeAPI();
  const ref = box(null);
  useRefById({ id, ref, deps: () => enabled.current });
  function handleKeydown(e) {
    if (!enabled.current) return;
    if (!loop.current && !enabled.current) return;
    if (focusScope.paused) return;
    const isTabKey = e.key === TAB && !e.ctrlKey && !e.altKey && !e.metaKey;
    const focusedElement = document.activeElement;
    if (!(isTabKey && focusedElement)) return;
    const container = ref.current;
    if (!container) return;
    const [first, last] = getTabbableEdges(container);
    const hasTabbableElementsInside = first && last;
    if (!hasTabbableElementsInside) {
      if (focusedElement === container) {
        e.preventDefault();
      }
    } else {
      if (!e.shiftKey && focusedElement === last) {
        e.preventDefault();
        if (loop.current) focus(first, { select: true });
      } else if (e.shiftKey && focusedElement === first) {
        e.preventDefault();
        if (loop.current) focus(last, { select: true });
      }
    }
  }
  const props = (() => ({
    id: id.current,
    tabindex: -1,
    onkeydown: handleKeydown,
  }))();
  return {
    get props() {
      return props;
    },
  };
}
function Focus_scope($$payload, $$props) {
  push();
  let {
    id,
    trapFocus = false,
    loop = false,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    focusScope,
    forceMount = false,
  } = $$props;
  const focusScopeState = useFocusScope({
    enabled: box.with(() => trapFocus),
    loop: box.with(() => loop),
    onCloseAutoFocus: box.with(() => onCloseAutoFocus),
    onOpenAutoFocus: box.with(() => onOpenAutoFocus),
    id: box.with(() => id),
    forceMount: box.with(() => forceMount),
  });
  focusScope?.($$payload, { props: focusScopeState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
  #id;
  #onPointerDownProp;
  #onPointerUpProp;
  #enabled;
  #unsubSelectionLock = noop;
  #ref = box(null);
  constructor(props) {
    this.#id = props.id;
    this.#enabled = props.preventOverflowTextSelection;
    this.#onPointerDownProp = props.onPointerDown;
    this.#onPointerUpProp = props.onPointerUp;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#enabled.current,
    });
  }
  #addEventListeners() {
    return executeCallbacks(
      addEventListener(document, "pointerdown", this.#pointerdown),
      addEventListener(
        document,
        "pointerup",
        composeHandlers(this.#resetSelectionLock, this.#onPointerUpProp),
      ),
    );
  }
  #pointerdown = (e) => {
    const node = this.#ref.current;
    const target = e.target;
    if (
      !isHTMLElement(node) ||
      !isHTMLElement(target) ||
      !this.#enabled.current
    )
      return;
    if (!isHighestLayer(this) || !isOrContainsTarget(node, target)) return;
    this.#onPointerDownProp.current(e);
    if (e.defaultPrevented) return;
    this.#unsubSelectionLock = preventTextSelectionOverflow(node);
  };
  #resetSelectionLock = () => {
    this.#unsubSelectionLock();
    this.#unsubSelectionLock = noop;
  };
}
function useTextSelectionLayer(props) {
  return new TextSelectionLayerState(props);
}
const getUserSelect = (node) =>
  node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node) {
  const body = document.body;
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
  push();
  let {
    preventOverflowTextSelection = true,
    onPointerDown = noop,
    onPointerUp = noop,
    id,
    children,
    enabled,
  } = $$props;
  useTextSelectionLayer({
    id: box.with(() => id),
    preventOverflowTextSelection: box.with(() => preventOverflowTextSelection),
    onPointerDown: box.with(() => onPointerDown),
    onPointerUp: box.with(() => onPointerUp),
    enabled: box.with(() => enabled),
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createSharedHook(factory) {
  let state = void 0;
  return (...args) => {
    return state;
  };
}
const useBodyLockStackCount = createSharedHook();
function useBodyScrollLock(initialState, restoreScrollDelay = () => null) {
  const id = useId();
  const countState = useBodyLockStackCount();
  restoreScrollDelay();
  countState.map.set(id, initialState ?? false);
  const locked = box.with(
    () => countState.map.get(id) ?? false,
    (v) => countState.map.set(id, v),
  );
  return locked;
}
function Scroll_lock($$payload, $$props) {
  push();
  let { preventScroll = true, restoreScrollDelay = null } = $$props;
  useBodyScrollLock(preventScroll, () => restoreScrollDelay);
  pop();
}
function shouldTrapFocus({ forceMount, present, trapFocus, open }) {
  if (forceMount) {
    return open && trapFocus;
  }
  return present && trapFocus && open;
}
function Dialog_overlay($$payload, $$props) {
  push();
  let {
    id = useId(),
    forceMount = false,
    child,
    children,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const overlayState = useDialogOverlay({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
  });
  const mergedProps = mergeProps(restProps, overlayState.props);
  {
    let presence = function ($$payload2) {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          props: mergeProps(mergedProps),
          ...overlayState.snippetProps,
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergeProps(mergedProps) })}>`;
        children?.($$payload2, overlayState.snippetProps);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      id,
      present: overlayState.root.open.current || forceMount,
      presence,
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useDialogTrigger({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
    disabled: box.with(() => Boolean(disabled)),
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_description($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const descriptionState = useDialogDescription({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
  });
  const mergedProps = mergeProps(restProps, descriptionState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const ROOT_ATTR = "data-separator-root";
class SeparatorRootState {
  #id;
  #ref;
  #orientation;
  #decorative;
  constructor(props) {
    this.#orientation = props.orientation;
    this.#decorative = props.decorative;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: this.#decorative.current ? "none" : "separator",
    "aria-orientation": getAriaOrientation(this.#orientation.current),
    "aria-hidden": getAriaHidden(this.#decorative.current),
    "data-orientation": getDataOrientation(this.#orientation.current),
    [ROOT_ATTR]: "",
  }));
  get props() {
    return this.#props();
  }
}
function useSeparatorRoot(props) {
  return new SeparatorRootState(props);
}
function Separator($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    decorative = false,
    orientation = "horizontal",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useSeparatorRoot({
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
    id: box.with(() => id),
    decorative: box.with(() => decorative),
    orientation: box.with(() => orientation),
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children,
  } = $$props;
  useDialogRoot({
    variant: box.with(() => "dialog"),
    open: box.with(
      () => open,
      (v) => {
        if (controlledOpen) {
          onOpenChange(v);
        } else {
          open = v;
          onOpenChange(v);
        }
      },
    ),
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function Dialog_close($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const closeState = useDialogClose({
    variant: box.with(() => "close"),
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
    disabled: box.with(() => Boolean(disabled)),
  });
  const mergedProps = mergeProps(restProps, closeState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_content($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    forceMount = false,
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onInteractOutside = noop,
    trapFocus = true,
    preventScroll = true,
    restoreScrollDelay = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useDialogContent({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v),
    ),
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  {
    let presence = function ($$payload2, { present }) {
      {
        let focusScope = function ($$payload3, { props: focusScopeProps }) {
          Escape_layer(
            $$payload3,
            spread_props([
              mergedProps,
              {
                enabled: present.current,
                onEscapeKeydown: (e) => {
                  onEscapeKeydown(e);
                  if (e.defaultPrevented) return;
                  contentState.root.handleClose();
                },
                children: ($$payload4) => {
                  Dismissible_layer(
                    $$payload4,
                    spread_props([
                      mergedProps,
                      {
                        enabled: present.current,
                        onInteractOutside: (e) => {
                          onInteractOutside(e);
                          if (e.defaultPrevented) return;
                          contentState.root.handleClose();
                        },
                        children: ($$payload5) => {
                          Text_selection_layer(
                            $$payload5,
                            spread_props([
                              mergedProps,
                              {
                                enabled: present.current,
                                children: ($$payload6) => {
                                  if (child) {
                                    $$payload6.out += "<!--[-->";
                                    if (contentState.root.open.current) {
                                      $$payload6.out += "<!--[-->";
                                      Scroll_lock($$payload6, {
                                        preventScroll,
                                        restoreScrollDelay,
                                      });
                                    } else {
                                      $$payload6.out += "<!--[!-->";
                                    }
                                    $$payload6.out += `<!--]--> `;
                                    child($$payload6, {
                                      props: mergeProps(
                                        mergedProps,
                                        focusScopeProps,
                                      ),
                                      ...contentState.snippetProps,
                                    });
                                    $$payload6.out += `<!---->`;
                                  } else {
                                    $$payload6.out += "<!--[!-->";
                                    Scroll_lock($$payload6, { preventScroll });
                                    $$payload6.out += `<!----> <div${spread_attributes(
                                      {
                                        ...mergeProps(
                                          mergedProps,
                                          focusScopeProps,
                                        ),
                                      },
                                    )}>`;
                                    children?.($$payload6);
                                    $$payload6.out += `<!----></div>`;
                                  }
                                  $$payload6.out += `<!--]-->`;
                                },
                                $$slots: { default: true },
                              },
                            ]),
                          );
                        },
                        $$slots: { default: true },
                      },
                    ]),
                  );
                },
                $$slots: { default: true },
              },
            ]),
          );
        };
        Focus_scope(
          $$payload2,
          spread_props([
            {
              loop: true,
              trapFocus: shouldTrapFocus({
                forceMount,
                present: present.current,
                trapFocus,
                open: contentState.root.open.current,
              }),
            },
            mergedProps,
            {
              onCloseAutoFocus: (e) => {
                onCloseAutoFocus(e);
                if (e.defaultPrevented) return;
                contentState.root.triggerNode?.focus();
              },
              focusScope,
              $$slots: { focusScope: true },
            },
          ]),
        );
      }
    };
    Presence_layer(
      $$payload,
      spread_props([
        mergedProps,
        {
          forceMount,
          present: contentState.root.open.current || forceMount,
          presence,
          $$slots: { presence: true },
        },
      ]),
    );
  }
  bind_props($$props, { ref });
  pop();
}
function Cardano_wallet($$payload, $$props) {
  push();
  const { label = "Connect Wallet", isDark = true } = $$props;
  let availableWallets = [];
  let dialogOpen = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog($$payload2, {
      get open() {
        return dialogOpen;
      },
      set open($$value) {
        dialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        {
          $$payload3.out += "<!--[1-->";
          $$payload3.out += `<!---->`;
          Dialog_trigger($$payload3, {
            class: `mesh-inline-flex mesh-items-center mesh-justify-center mesh-whitespace-nowrap mesh-rounded-md mesh-text-sm mesh-font-medium mesh-transition-colors focus-visible:mesh-outline-none focus-visible:mesh-ring-1 focus-visible:mesh-ring-zinc-950 disabled:mesh-pointer-events-none disabled:mesh-opacity-50 mesh-h-9 mesh-px-4 mesh-py-2 hover:mesh-bg-zinc-300 ${isDark === true ? "mesh-bg-neutral-950 mesh-text-neutral-50" : "mesh-bg-neutral-50 mesh-text-neutral-950 "}`,
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(label)}`;
            },
            $$slots: { default: true },
          });
          $$payload3.out += `<!---->`;
        }
        $$payload3.out += `<!--]--> <!---->`;
        Portal($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_overlay($$payload4, {
              class: "mesh-fixed mesh-inset-0 mesh-z-50 mesh-bg-black/80",
            });
            $$payload4.out += `<!----> <!---->`;
            Dialog_content($$payload4, {
              class: `mesh-fixed mesh-left-[50%] mesh-top-[50%] mesh-z-50 mesh-w-full mesh-max-w-[94%] mesh-translate-x-[-50%] mesh-translate-y-[-50%] mesh-rounded-card-lg mesh-border mesh-rounded-xl ${isDark === true ? "mesh-bg-neutral-950 mesh-text-neutral-50" : "mesh-bg-neutral-50 mesh-text-neutral-950"} mesh-p-5 mesh-shadow-popover mesh-outline-none sm:mesh-max-w-[490px] md:mesh-w-full`,
              children: ($$payload5) => {
                const each_array = ensure_array_like(availableWallets);
                $$payload5.out += `<!---->`;
                Dialog_title($$payload5, {
                  class:
                    "mesh-flex mesh-w-full mesh-items-center mesh-justify-center mesh-text-lg mesh-font-semibold mesh-tracking-tight",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Create API key`;
                  },
                  $$slots: { default: true },
                });
                $$payload5.out += `<!----> <!---->`;
                Separator($$payload5, {
                  class: `mesh-mx-10 mesh-mb-6 mesh-mt-5 mesh-block mesh-h-px ${isDark === true ? "mesh-bg-neutral-50" : "mesh-bg-neutral-950"}`,
                });
                $$payload5.out += `<!----> <!---->`;
                Dialog_description($$payload5, {
                  class:
                    "mesh-text-sm mesh-text-center mesh-text-foreground-alt",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Securely Connect your Cardano Wallet.`;
                  },
                  $$slots: { default: true },
                });
                $$payload5.out += `<!----> <div class="mesh-grid mesh-gap-4 mesh-grid-cols-2 mesh-mt-5 mesh-mb-5 mesh-place-items-center"><!--[-->`;
                for (
                  let $$index = 0, $$length = each_array.length;
                  $$index < $$length;
                  $$index++
                ) {
                  let wallet = each_array[$$index];
                  $$payload5.out += `<img class="mesh-w-32 mesh-h-32 hover:mesh-cursor-pointer"${attr("alt", wallet.name + " icon")}${attr("src", wallet.icon)}>`;
                }
                $$payload5.out += `<!--]--></div> <!---->`;
                Dialog_close($$payload5, {
                  class:
                    "mesh-absolute mesh-right-5 mesh-top-5 mesh-rounded-md focus-visible:mesh-outline-none focus-visible:mesh-ring-2 focus-visible:mesh-ring-foreground focus-visible:mesh-ring-offset-2 focus-visible:mesh-ring-offset-background active:mesh-scale-98",
                  children: ($$payload6) => {
                    $$payload6.out += `<div><span>Close</span></div>`;
                  },
                  $$slots: { default: true },
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true },
            });
            $$payload4.out += `<!---->`;
          },
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true },
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function LearnMore($$payload) {
  const links = [
    {
      title: "TypeScript + Effect",
      url: "https://effect.website/",
      description:
        "Official Effect guide for functional TypeScript programming.",
    },
    {
      title: "Learn Svelte",
      url: "https://learn.svelte.dev",
      description: "Interactive Svelte tutorial by the core team.",
    },
    {
      title: "Learn Mesh SDK",
      url: "https://meshjs.dev/",
      description: "Guides for building dApps on Cardano with Mesh.",
    },
    {
      title: "Learn Nix Flakes",
      url: "https://zero-to-nix.com/",
      description: "NixOS Wiki: everything you need to know about flakes.",
    },
  ];
  const each_array = ensure_array_like(links);
  $$payload.out += `<div class="mesh-text-white mesh-bg-gray-900 mesh-p-10 mesh-min-h-screen"><h1 class="mesh-text-4xl mesh-font-bold mesh-mb-8">\u{1F4DA} Learn More</h1> <div class="mesh-grid mesh-gap-6 mesh-grid-cols-1 md:mesh-grid-cols-2"><!--[-->`;
  for (
    let $$index = 0, $$length = each_array.length;
    $$index < $$length;
    $$index++
  ) {
    let { title, url, description } = each_array[$$index];
    $$payload.out += `<a class="mesh-block mesh-bg-gray-800 mesh-rounded-lg mesh-p-5 mesh-border mesh-border-gray-600 hover:mesh-border-sky-500 hover:mesh-scale-105 mesh-transition"${attr("href", url)} target="_blank" rel="noopener noreferrer"><h2 class="mesh-text-xl mesh-font-semibold mesh-mb-2">${escape_html(title)}</h2> <p class="mesh-text-gray-400">${escape_html(description)}</p></a>`;
  }
  $$payload.out += `<!--]--></div></div>`;
}
function _page($$payload, $$props) {
  push();
  ({ txHash: Option.none });
  $$payload.out += `<div class="bg-red-200 min-h-screen bg-gray-100 text-gray-900 p-6"><main class="max-w-4xl mx-auto space-y-8"><h1 class="text-3xl font-bold text-center text-blue-600">\u{1F389} Congratulations</h1> <div class="space-y-4">`;
  Cardano_wallet($$payload, { isDark: true });
  $$payload.out += `<!----> <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Send 1 ADA</button> `;
  LearnMore($$payload);
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="grid md:grid-cols-3 gap-4"><a href="https://meshjs.dev/apis" class="bg-white rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"><h2 class="text-xl font-semibold mb-2">Documentation</h2> <p>Our documentation provides live demos and code samples \u2014 a great tool for learning how Cardano works.</p></a> <a href="https://meshjs.dev/guides" class="bg-white rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"><h2 class="text-xl font-semibold mb-2">Guides</h2> <p>Launching a new NFT project or store? These guides will help you get started quickly.</p></a> <a href="https://meshjs.dev/svelte" class="bg-white rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"><h2 class="text-xl font-semibold mb-2">Svelte Components</h2> <p>Integrate Mesh's Svelte UI components to enhance your Cardano dApp experience.</p></a></div></main> <footer class="text-center text-sm text-gray-500 mt-12">\xA9 ${escape_html(/* @__PURE__ */ new Date().getFullYear())} Zoofpay</footer></div>`;
  pop();
}
export { _page as default };
