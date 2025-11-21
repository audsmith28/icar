# ICAR Logo Setup Instructions

## Overview
The platform is now set up to use the ICAR logo. You need to add the logo image files to complete the setup.

## Logo Files Needed

Place the following logo files in the `public/` directory:

1. **`public/icar-logo-light.png`** (or `.svg`, `.jpg`)
   - White/light version of the logo
   - Used on dark backgrounds (navbar, dark sections)
   - Should have white text/icons

2. **`public/icar-logo-dark.png`** (or `.svg`, `.jpg`)
   - Dark version of the logo  
   - Used on light backgrounds
   - Should have dark teal text/icons

## Supported Formats
- PNG (recommended for photos)
- SVG (recommended for vector graphics - best quality)
- JPG (acceptable, but PNG/SVG preferred)

## File Naming
The component looks for:
- `icar-logo-light.png` (or `.svg`, `.jpg`)
- `icar-logo-dark.png` (or `.svg`, `.jpg`)

If you have different filenames, you can update the `Logo.tsx` component.

## Current Setup

The logo component:
- ✅ Automatically falls back to text-based logo if image files are missing
- ✅ Supports both light and dark variants
- ✅ Responsive sizing
- ✅ Properly linked to homepage

## Where Logo Appears

1. **Navbar** (top of every page)
   - Uses `light` variant (white logo on dark teal background)
   - Height: 40px

2. **Future locations** (can be added):
   - Footer
   - Email templates
   - PDF exports
   - Social media previews

## Adding Your Logo Files

1. Convert your screenshots to PNG or SVG format
2. Create two versions:
   - **Light version**: White/light logo for dark backgrounds
   - **Dark version**: Dark logo for light backgrounds
3. Save them as:
   - `public/icar-logo-light.png`
   - `public/icar-logo-dark.png`
4. The logo will automatically appear in the navbar!

## Image Optimization Tips

- **SVG is best** if you have vector artwork (scalable, small file size)
- **PNG is good** for raster images (use PNG-24 for transparency)
- Recommended dimensions:
  - Width: 200-300px
  - Height: 40-60px (for navbar)
  - Maintain aspect ratio

## Testing

After adding logo files:
1. Restart the dev server (`npm run dev`)
2. Check the navbar - logo should appear
3. If logo doesn't appear, check browser console for image loading errors
4. Text fallback will show if images can't be loaded

## Customization

To adjust logo size or styling, edit:
- `src/components/ui/Logo.tsx` - Component logic
- `src/components/layout/Navbar.tsx` - Usage in navbar

## Need Help?

If you need to:
- Change logo filenames: Update `logoSrc` in `Logo.tsx`
- Adjust logo size: Change `height` prop (default: 40px)
- Change logo position: Modify CSS in `Navbar.module.css`
- Add logo to other locations: Import and use `<Logo />` component

