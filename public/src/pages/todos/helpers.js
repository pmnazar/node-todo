export function createBtn(name, classNames, eventName, event) {
  const btn = document.createElement("button");

  btn.textContent = name;
  btn.type = "button";
  btn.className = classNames;

  if (typeof eventName !== "string") {
    throw new Error(
      `❌ Invalid argument: "eventName" must be a string, but got ${typeof eventName}`
    );
  }

  if (typeof event !== "function") {
    throw new Error(
      `❌ Invalid argument: "event" must be a function, but got ${typeof event}`
    );
  }
  btn.addEventListener(eventName, event);

  return btn;
}
