# Simplified Survey Campaign Builder

A configurable survey campaign builder built with React, TypeScript, and Vite. It provides content and styling controls alongside a live mobile preview, allowing survey changes to be visualized instantly.

## Live Demo

**Deployment:** https://survey-campaign-builder-eight.vercel.app/

**GitHub Repository:** https://github.com/SintuMishra/survey-campaign-builder

## Features

### Survey Content

- Dynamic survey question count
- Add and remove options with a minimum of two options per question
- Additional comments toggle
- Conditional question redirect logic
- Configurable submit button text
- Optional Thank You page
- PNG, JPG, JPEG, and GIF media preview
- Lottie JSON rendering using `lottie-web/light`
- Configurable URL redirect

### Styling

Live styling controls for:

- Background and backdrop
- Popup corner radius
- Question title and subtitle
- Option layout
- Selected and unselected option states
- Additional comments
- CTA button
- Cross button
- Thank You title, subtitle, media, and button

### Live Preview

- Real-time mobile preview
- Question navigation
- Radio and checkbox selection
- Conditional question flow
- Thank You flow
- Preview restart with configured delay

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- `lottie-web`

## Setup

Clone the repository and install the dependencies:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Folder Structure

```text
src/
  components/
    content/
    layout/
    preview/
    styling/
    ui/
  context/
  data/
  types/
  utils/
```

## Architecture

Campaign configuration is managed through `CampaignContext` using React Context and `useReducer`.

The Content and Styling editors update the same campaign state. The mobile preview reads directly from this state, allowing configuration and styling changes to appear immediately without requiring a separate save action.
