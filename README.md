# Perspective Funnel Preview

A standalone React application that allows users to preview their funnels in a mobile viewport format. Users can upload JSON files containing funnel data and preview and navigate between funnel pages.

## Features

- JSON file upload and validation
- Direct JSON editing in the browser
- Mobile viewport preview (375x600px)
- Page navigation
- Support for multiple block types:
  - Text blocks
  - Image blocks
  - Button blocks
  - List blocks
- Responsive design (desktop and mobile-friendly)

## Technical Details

The application is built with:
- React
- TypeScript
- Tailwind CSS

## Testing

The application includes:
- Unit tests for BlockRenderer component (rendering different block types)
- Unit tests for FunnelPreview component (name rendering, pagination, navigation)
- Unit tests for JSON validation utilities

Future testing enhancements:
- Integration tests for the upload logic
- Integration tests for the preview logic
- End-to-end tests with Playwright to validate the complete user flow

## How to Use

1. Upload a funnel JSON file using the uploader
2. Alternatively, paste JSON directly into the editor
3. Click "Load JSON" to preview your funnel
4. Use the navigation arrows to move between funnel pages

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```


## Deployment
The application is deployed on Vercel and can be found on url https://funnel-preview-fawn.vercel.app/
