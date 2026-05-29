# Portfolio Versions System

This system lets you maintain multiple portfolio versions and easily switch between them.

## 📁 Folder Structure

```
src/
├── components/                     ← NEW: Future versions use components from here
│   └── README.md
├── versions/
│   ├── config.js                  ← MAIN: Change activeVersion here to switch
│   ├── starter/
│   │   ├── components/            ← ALL original components moved here (v1)
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── contact/
│   │   │   ├── header/
│   │   │   ├── loader/
│   │   │   ├── AnimatedButton.jsx
│   │   │   ├── MouseFollower.jsx
│   │   │   ├── Title.jsx
│   │   │   └── VersionSwitcher.jsx
│   │   ├── StarterLayout.jsx      ← Current portfolio layout (v1)
│   │   └── StarterLayout.css
│   ├── experienced/
│   │   ├── ExperiencedLayout.jsx  ← New version layout (under development)
│   │   ├── ExperiencedLayout.css
│   │   └── components/             ← Custom components for v2 (optional)
│   └── README.md                   ← This file
└── App.jsx                          ← Routing only (clean and simple)
```

## 🚀 Quick Start

### View Current Portfolio
- Homepage: `http://localhost:5173/` → Shows **Starter** (your current portfolio)
- Old Version: Click the **📼** icon (top right) → Archives/old versions

### Switch Active Version
Edit `src/versions/config.js`:

```javascript
// Change this line:
export const activeVersion = "starter";  // ← Currently showing starter
// To: export const activeVersion = "experienced";  ← When ready with new version
```

That's it! Homepage will now show the new version.

## 📌 URL Routes

| URL | Shows | Notes |
|-----|-------|-------|
| `/` | Active version | Currently: Starter |
| `/portfolio/starter` | Starter (v1) | Current portfolio |
| `/portfolio/experienced` | Experienced (v2) | New version (in dev) |
| `/resume` | Resume viewer | Always available |

## 🔄 Version Switcher

- **Location**: Top right corner (📼 icon)
- **Function**: Link to view archived/old versions
- **Auto**: Shows on all portfolio pages
- **Hidden**: On resume and unknown routes

## 📝 Workflow: Creating New Version

### Step 1: Create Components
```bash
# Create new components in src/components/
# Example: src/components/NewHome.jsx, src/components/NewAbout.jsx, etc.
```

### Step 2: Create Layout
```bash
# Create new layout file
src/versions/experienced/ExperiencedLayout.jsx
```

Import your new components:
```jsx
import NewHome from "../../components/NewHome";
import NewAbout from "../../components/NewAbout";
// ... etc
```

### Step 3: Update App.jsx
Add your new layout to the `versionLayouts` object in `src/App.jsx`:

```javascript
const versionLayouts = {
  starter: StarterLayout,
  experienced: ExperiencedLayout,  // Already added!
  // myNewVersion: MyNewVersionLayout,  // Add like this
};
```

### Step 4: Update Config
Add version to `src/versions/config.js`:

```javascript
export const versions = {
  starter: { /* ... */ },
  experienced: { /* ... */ },
  // myNewVersion: {
  //   name: "My New Version",
  //   description: "Description",
  //   path: "/portfolio/mynewversion",
  //   year: 2026,
  // },
};
```

### Step 5: Go Live
Change `activeVersion` in config.js:

```javascript
export const activeVersion = "experienced";  // Or your new version
```

✅ Done! New version now shows on homepage, old version available at `/portfolio/starter`

## 🎨 Customization Tips

### Using Shared Components
Both versions can use components from `src/versions/starter/components/`:
```jsx
import Header from "../../versions/starter/components/header/Header";
```

### Version-Specific Components
New versions can have unique components in `src/components/`:
```jsx
import NewHome from "../../components/NewHome";
```

### Mixing Components
Use shared components + new components in same version:
```jsx
// StarterLayout.jsx
import Header from "./components/header/Header";        // Shared v1
import NewHero from "../../components/NewHero";         // New version exclusive
```

## 📋 Example: Adding "Advanced" Version

1. **Create in config.js:**
```javascript
advanced: {
  name: "Advanced Portfolio",
  description: "AI-powered features",
  path: "/portfolio/advanced",
  year: 2026,
}
```

2. **Create layout:**
```bash
src/versions/advanced/AdvancedLayout.jsx
src/versions/advanced/AdvancedLayout.css
```

3. **Update App.jsx:**
```javascript
import AdvancedLayout from "./versions/advanced/AdvancedLayout";

const versionLayouts = {
  starter: StarterLayout,
  experienced: ExperiencedLayout,
  advanced: AdvancedLayout,
};
```

4. **Go live:**
```javascript
export const activeVersion = "advanced";
```

✅ New version available at `/portfolio/advanced` and becomes default at `/`

## 🔗 Files to Edit When Adding Version

| File | Edit | Why |
|------|------|-----|
| `src/versions/config.js` | Add version object | Register new version |
| `src/versions/{name}/{name}Layout.jsx` | Create new | New layout file |
| `src/App.jsx` | Import + add to versionLayouts | Register in router |
| `src/components/` | Create new components | New version UI |

---

**Note:** Starter version is fully contained in `src/versions/starter/`. All components moved there. New versions should use components from `src/components/`.

