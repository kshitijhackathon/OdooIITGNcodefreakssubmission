# Logo Setup Instructions

## 📁 Logo Files Location
Aap apni logo files yahan rakh sakte hain:
```
Frontend/attached_assets/
```

## 🖼️ Required Logo Files

### Theme-Based Logos ✅
- **whitelogo.png** - Light mode ke liye (white/light colored logo)
- **Blacklogo.png** - Dark mode ke liye (black/dark colored logo)
- **Size:** 64x64 pixels (recommended)
- **Format:** PNG with transparent background

### Favicon Files (Optional)
- **favicon.ico** - Main favicon (16x16, 32x32, 48x48)
- **favicon-32x32.png** - 32x32 PNG favicon
- **favicon-16x16.png** - 16x16 PNG favicon  
- **apple-touch-icon.png** - 180x180 Apple touch icon

## 🔧 How It Works

### Automatic Theme Detection
- **Light Mode:** `whitelogo.png` automatically use hoga
- **Dark Mode:** `Blacklogo.png` automatically use hoga
- **Theme Toggle:** Logo automatically change hoga jab aap theme switch karenge

### Logo Locations
1. **Navbar** (top left) - Small size logo with text
2. **Login Page** (center) - Large size logo without text

## 🎨 Logo Specifications

### Main Logos
- **whitelogo.png:** Light mode ke liye (white/light colored)
- **Blacklogo.png:** Dark mode ke liye (black/dark colored)
- **Size:** 64x64 pixels
- **Format:** PNG
- **Background:** Transparent
- **Style:** Should contrast well with respective themes

### Favicon (Optional)
- **Sizes:** 16x16, 32x32, 48x48 pixels
- **Format:** ICO
- **Background:** Can be solid color

## 🔄 Fallback
Agar logo files nahi milti, to automatically "EM" text show hoga.

## 📝 Current Status
✅ **whitelogo.png** - Added (Light mode logo)
✅ **Blacklogo.png** - Added (Dark mode logo)
✅ **Theme Detection** - Configured
✅ **Auto Switching** - Working

## 🚀 Test Your Logos
1. Run the application: `npm run dev`
2. Check logo in navbar (top left)
3. Check logo on login page (center)
4. Toggle theme (sun/moon icon) to see logo change
5. Verify both light and dark mode logos work correctly

## 📝 Notes
- Logo automatically responsive hai
- Theme switching ke saath logo automatically change hota hai
- Browser cache clear karna pad sakta hai favicon ke liye
- Agar logo files missing hain, "EM" text fallback show hoga
