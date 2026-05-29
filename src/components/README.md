# Components - Future New Versions

This folder is reserved for components used in new portfolio versions (experienced, advanced, etc.).

## Current Structure

- **src/components/** ← New version components go here
- **src/versions/starter/components/** ← Current portfolio (v1) components

## When Creating a New Version

1. Create new components here in `src/components/` folder
2. Create new layout file in `src/versions/{versionName}/`
3. Update `src/versions/config.js` to add your version
4. Update `src/App.jsx` to import and map your new layout
5. Change `activeVersion` in config.js when ready to deploy

## Example Structure (Future)

```
src/
├── components/
│   ├── home/
│   ├── projects/
│   ├── contact/
│   └── ... (new version components)
├── versions/
│   ├── starter/
│   │   ├── components/  ← v1 (current portfolio)
│   │   ├── StarterLayout.jsx
│   │   └── ...
│   ├── experienced/
│   │   ├── ExperiencedLayout.jsx
│   │   ├── components/  ← custom components (optional)
│   │   └── ...
│   └── config.js
└── App.jsx
```
