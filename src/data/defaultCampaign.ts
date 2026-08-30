import type { Campaign, Spacing, Radius, TextStyle, BoxTextStyle, ButtonStyle } from "../types/campaign";

export const spacing = (v = 0): Spacing => ({ top: v, right: v, bottom: v, left: v });
export const radius = (v = 10): Radius => ({ topLeft: v, topRight: v, bottomLeft: v, bottomRight: v });

export const textStyle = (size = 16, weight = 400, color = "#111827"): TextStyle => ({
  color,
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: size,
  fontWeight: weight,
  bold: false,
  italic: false,
  underline: false,
  alignment: "left",
  margin: spacing(0),
});

export const boxTextStyle = (): BoxTextStyle => ({
  ...textStyle(15, 400, "#111827"),
  borderColor: "#d1d5db",
  backgroundColor: "#ffffff",
  borderWidth: 1,
});

export const buttonStyle = (): ButtonStyle => ({
  ...boxTextStyle(),
  fullWidth: true,
  height: 46,
  width: 240,
  radius: radius(10),
  backgroundColor: "#111827",
});

const button = buttonStyle();
button.color = "#ffffff";

export const defaultCampaign: Campaign = {
  content: {
    questions: [
      {
        id: "q1",
        title: "How satisfied are you with our service?",
        subtitle: "Choose the option that best matches your experience.",
        options: [
          { id: "q1-o1", label: "Very satisfied" },
          { id: "q1-o2", label: "Satisfied" },
          { id: "q1-o3", label: "Neutral" },
        ],
        additionalComments: true,
        conditions: [],
        submitButtonText: "Next",
      },
    ],
    thankYou: {
      enabled: true,
      title: "Thank you!",
      subtitle: "Your feedback has been recorded.",
      buttonText: "Visit website",
      redirectType: "url",
      redirectValue: "https://example.com",
      mediaName: "",
      mediaType: "",
      mediaUrl: "",
    },
  },
  styling: {
    appearance: {
      backgroundColor: "#ffffff",
      radius: radius(22),
      delaySeconds: 0,
      backdropColor: "#111827",
      backdropOpacity: 0.45,
    },
    questionTitle: {
      ...textStyle(24, 700, "#111827"),
      margin: { top: 0, right: 0, bottom: 10, left: 0 },
    },
    subtitle: {
      ...textStyle(14, 400, "#6b7280"),
      margin: { top: 0, right: 0, bottom: 18, left: 0 },
    },
    options: {
      layout: "radio",
      optionHeight: 48,
      bulletSpacing: 10,
      optionSpacing: 10,
      radius: radius(10),
      selected: {
        ...boxTextStyle(),
        borderColor: "#4f46e5",
        backgroundColor: "#eef2ff",
        color: "#312e81",
        borderWidth: 2,
        height: 48,
        radius: radius(10),
      },
      unselected: {
        ...boxTextStyle(),
        height: 48,
        radius: radius(10),
      },
    },
    comments: {
      ...boxTextStyle(),
      margin: { top: 14, right: 0, bottom: 14, left: 0 },
    },
    ctaButton: button,
    crossButton: {
      enabled: true,
      style: "circle",
      crossColor: "#111827",
      fillColor: "#ffffff",
      strokeColor: "#d1d5db",
      size: 34,
      margin: { top: 12, right: 12, bottom: 0, left: 0 },
      customIconUrl: "",
    },
    thankYou: {
      title: {
        ...textStyle(26, 700, "#111827"),
        alignment: "center",
        margin: { top: 10, right: 0, bottom: 10, left: 0 },
      },
      subtitle: {
        ...textStyle(14, 400, "#6b7280"),
        alignment: "center",
        margin: { top: 0, right: 0, bottom: 20, left: 0 },
      },
      imageWidth: 180,
      imageHeight: 140,
      imageMargin: { top: 0, right: 0, bottom: 18, left: 0 },
      button: {
        ...button,
        fullWidth: true,
      },
    },
  },
};