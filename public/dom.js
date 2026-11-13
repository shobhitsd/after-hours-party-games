// Keep existing elements, focus, scroll, and running animations when only state changes.
// A data-key change intentionally replaces a screen at a genuine phase transition.
const key = node => node.nodeType === 1 ? node.getAttribute('data-key') || node.id || null : null;
const compatible = (a,b) => a.nodeType === b.nodeType && a.nodeName === b.nodeName && key(a) === key(b);
function patchNode(current, next) {
  if (current.nodeType === 3 || current.nodeType === 8) {
    if (current.nodeValue !== next.nodeValue) current.nodeValue = next.nodeValue;
    return;
  }
  for (const attribute of [...current.attributes]) if (!next.hasAttribute(attribute.name) && !(current.tagName==='DETAILS'&&attribute.name==='open')) current.removeAttribute(attribute.name);
  for (const attribute of next.attributes) if (current.getAttribute(attribute.name) !== attribute.value) current.setAttribute(attribute.name, attribute.value);
  if (current instanceof HTMLInputElement && next.hasAttribute('value') && current.value !== next.value) current.value = next.value;
  patchChildren(current, next);
  if(current instanceof HTMLSelectElement && current.value!==next.value)current.value=next.value;
}
function patchChildren(current, next) {
  let cursor = current.firstChild;
  for (const incoming of [...next.childNodes]) {
    let match = cursor;
    if (!match || !compatible(match, incoming)) {
      match = key(incoming) ? [...current.childNodes].find(node => compatible(node,incoming)) : null;
      if (match) current.insertBefore(match, cursor);
      else { match = incoming.cloneNode(true); current.insertBefore(match, cursor); }
    }
    patchNode(match, incoming);
    cursor = match.nextSibling;
  }
  while (cursor) { const nextSibling = cursor.nextSibling; cursor.remove(); cursor = nextSibling; }
}
export function patchHTML(root, html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  patchChildren(root, template.content);
}
