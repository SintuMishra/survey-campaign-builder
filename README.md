# Simplified Survey Campaign Builder


## Live Demo

**Deployment:** https://survey-campaign-builder-eight.vercel.app/

**GitHub Repository:** https://github.com/SintuMishra/survey-campaign-builder


A React + TypeScript + Vite frontend technical assessment implementing configurable survey content, styling controls, and a live mobile preview.

## Features

- Dynamic survey question count
- Dynamic add/delete options with minimum 2 options
- Additional comments toggle
- Mock conditional redirect logic
- Configurable per-question button text
- Optional Thank You page
- Media upload preview for PNG/JPG/JPEG/GIF
- Lottie JSON rendering using lottie-web/light
- URL redirect
- Live styling controls for:
  - background/backdrop
  - popup corner radius
  - question title
  - subtitle
  - option layout
  - selected/unselected option styles
  - comments
  - CTA button
  - cross button
  - Thank You title/subtitle/image/button
- Functional mobile preview
- Question navigation
- Checkbox/radio style selection
- Thank You flow
- Restart preview with configured delay

## Setup

```bash
npm install
npm run dev
```

Production build:

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

Campaign configuration is stored in `CampaignContext` using `useReducer`.

Both Content and Styling editors update the same campaign state. The mobile preview reads directly from that state, so changes are reflected immediately without a Save button.
