export type Alignment = "left" | "center" | "right";
export type OptionLayout = "radio" | "checkbox" | "filled" | "alternative";

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Radius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

export interface TextStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: Alignment;
  margin: Spacing;
}

export interface BoxTextStyle extends TextStyle {
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
}

export interface ButtonStyle extends BoxTextStyle {
  fullWidth: boolean;
  height: number;
  width: number;
  radius: Radius;
}

export interface OptionStyle extends BoxTextStyle {
  height: number;
  radius: Radius;
}

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Condition {
  id: string;
  optionId: string;
  redirectTo: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
  additionalComments: boolean;
  conditions: Condition[];
  submitButtonText: string;
}

export interface ThankYouConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  redirectType: "url" | "none";
  redirectValue: string;
  mediaName: string;
  mediaType: string;
  mediaUrl: string;
}

export interface AppearanceStyle {
  backgroundColor: string;
  radius: Radius;
  delaySeconds: number;
  backdropColor: string;
  backdropOpacity: number;
}

export interface OptionsConfig {
  layout: OptionLayout;
  optionHeight: number;
  bulletSpacing: number;
  optionSpacing: number;
  radius: Radius;
  selected: OptionStyle;
  unselected: OptionStyle;
}

export interface CrossButtonStyle {
  enabled: boolean;
  style: "simple" | "circle" | "square";
  crossColor: string;
  fillColor: string;
  strokeColor: string;
  size: number;
  margin: Spacing;
  customIconUrl: string;
}

export interface ThankYouStyle {
  title: TextStyle;
  subtitle: TextStyle;
  imageWidth: number;
  imageHeight: number;
  imageMargin: Spacing;
  button: ButtonStyle;
}

export interface Campaign {
  content: {
    questions: Question[];
    thankYou: ThankYouConfig;
  };
  styling: {
    appearance: AppearanceStyle;
    questionTitle: TextStyle;
    subtitle: TextStyle;
    options: OptionsConfig;
    comments: BoxTextStyle;
    ctaButton: ButtonStyle;
    crossButton: CrossButtonStyle;
    thankYou: ThankYouStyle;
  };
}