type XmlNode = {
  name: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  text: string;
};

const MAX_NODES = 30_000;
const MAX_DEPTH = 40;
const localName = (name: string) => name.split(":").at(-1)?.toLowerCase() ?? name.toLowerCase();

function decodeEntities(value: string): string {
  return value
    .replace(/&(#x[\da-f]{1,6}|#\d{1,7}|amp|lt|gt|quot|apos);/gi, (entity, code: string) => {
      const lower = code.toLowerCase();
      if (lower === "amp") return "&";
      if (lower === "lt") return "<";
      if (lower === "gt") return ">";
      if (lower === "quot") return '"';
      if (lower === "apos") return "'";
      const point = lower.startsWith("#x")
        ? Number.parseInt(lower.slice(2), 16)
        : Number.parseInt(lower.slice(1), 10);
      if (
        !Number.isInteger(point) ||
        point < 1 ||
        point > 0x10ffff ||
        (point >= 0xd800 && point <= 0xdfff)
      )
        return "";
      return String.fromCodePoint(point);
    })
    .replace(/&[^;\s]{1,40};/g, "");
}

/** Bounded, non-validating XML reader for untrusted RSS/Atom; DTDs/entities are rejected. */
export function parseSafeXml(xml: string): XmlNode {
  if (xml.length > 1_200_000) throw new Error("feed_xml_too_large");
  if (/<!\s*(?:DOCTYPE|ENTITY)/i.test(xml)) throw new Error("feed_xml_dtd_forbidden");
  const root: XmlNode = { name: "#document", attributes: {}, children: [], text: "" };
  const stack = [root];
  let cursor = 0;
  let nodes = 0;
  while (cursor < xml.length) {
    const open = xml.indexOf("<", cursor);
    const textEnd = open < 0 ? xml.length : open;
    if (textEnd > cursor) stack.at(-1)!.text += decodeEntities(xml.slice(cursor, textEnd));
    if (open < 0) break;
    if (xml.startsWith("<!--", open)) {
      const end = xml.indexOf("-->", open + 4);
      if (end < 0) throw new Error("feed_xml_malformed");
      cursor = end + 3;
      continue;
    }
    if (xml.startsWith("<![CDATA[", open)) {
      const end = xml.indexOf("]]>", open + 9);
      if (end < 0) throw new Error("feed_xml_malformed");
      stack.at(-1)!.text += xml.slice(open + 9, end);
      cursor = end + 3;
      continue;
    }
    if (xml.startsWith("<?", open)) {
      const end = xml.indexOf("?>", open + 2);
      if (end < 0) throw new Error("feed_xml_malformed");
      cursor = end + 2;
      continue;
    }
    const end = xml.indexOf(">", open + 1);
    if (end < 0) throw new Error("feed_xml_malformed");
    const token = xml.slice(open + 1, end).trim();
    cursor = end + 1;
    if (!token || token.startsWith("!")) throw new Error("feed_xml_malformed");
    if (token.startsWith("/")) {
      const closing = token.slice(1).trim();
      const current = stack.pop();
      if (!current || localName(current.name) !== localName(closing))
        throw new Error("feed_xml_malformed");
      continue;
    }
    const selfClosing = token.endsWith("/");
    const body = selfClosing ? token.slice(0, -1).trim() : token;
    const name = /^([^\s/>]+)/.exec(body)?.[1];
    if (!name) throw new Error("feed_xml_malformed");
    const attributes: Record<string, string> = {};
    const attributeText = body.slice(name.length);
    const attributePattern = /([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let attributeMatch: RegExpExecArray | null;
    while ((attributeMatch = attributePattern.exec(attributeText)))
      attributes[localName(attributeMatch[1]!)] = decodeEntities(
        attributeMatch[2] ?? attributeMatch[3] ?? "",
      );
    const node: XmlNode = { name, attributes, children: [], text: "" };
    stack.at(-1)!.children.push(node);
    nodes++;
    if (nodes > MAX_NODES) throw new Error("feed_xml_too_complex");
    if (!selfClosing) {
      stack.push(node);
      if (stack.length > MAX_DEPTH) throw new Error("feed_xml_too_deep");
    }
  }
  if (stack.length !== 1 || !root.children.length) throw new Error("feed_xml_malformed");
  return root;
}

export function xmlChildren(node: XmlNode, name: string): XmlNode[] {
  return node.children.filter((child) => localName(child.name) === name.toLowerCase());
}

export function xmlFirst(node: XmlNode, name: string): XmlNode | undefined {
  return xmlChildren(node, name)[0];
}

export function xmlText(node: XmlNode | undefined): string {
  if (!node) return "";
  return [node.text, ...node.children.map(xmlText)].join(" ").replace(/\s+/g, " ").trim();
}

export function xmlLocalName(name: string): string {
  return localName(name);
}
