import type { CSSProperties } from "react";
import type { Radius, Spacing, TextStyle } from "../types/campaign";

export const radiusCss = (r: Radius): CSSProperties => ({
  borderTopLeftRadius: r.topLeft,
  borderTopRightRadius: r.topRight,
  borderBottomLeftRadius: r.bottomLeft,
  borderBottomRightRadius: r.bottomRight,
});

export const spacingCss = (m: Spacing): CSSProperties => ({
  marginTop: m.top,
  marginRight: m.right,
  marginBottom: m.bottom,
  marginLeft: m.left,
});

export const textCss = (s: TextStyle): CSSProperties => ({
  color: s.color,
  fontFamily: s.fontFamily,
  fontSize: s.fontSize,
  fontWeight: s.bold ? 700 : s.fontWeight,
  fontStyle: s.italic ? "italic" : "normal",
  textDecoration: s.underline ? "underline" : "none",
  textAlign: s.alignment,
  ...spacingCss(s.margin),
});