/**
 * Portfolio Versions Configuration
 * 
 * STRUCTURE:
 * - src/versions/starter/components/ → Current portfolio (v1) - all original components moved here
 * - src/versions/starter/StarterLayout.jsx → Layout for starter version
 * - src/versions/experienced/ExperiencedLayout.jsx → Layout for new version (will use new components)
 * - src/components/ → Future: put new version components here
 * 
 * HOW IT WORKS:
 * 1. activeVersion determines which version shows on homepage (/)
 * 2. Old versions accessible at /portfolio/{versionName}
 * 3. Version switcher link (📼) visible on all pages to access archived versions
 * 
 * CHANGE ACTIVE VERSION:
 * Just edit `activeVersion` below, no other changes needed!
 */

export const versions = {
  starter: {
    name: "Starter Portfolio",
    description: "Current portfolio - original version",
    path: "/portfolio/starter",
    year: 2024,
  },
  experienced: {
    name: "Experienced Portfolio",
    description: "Enhanced version (in development)",
    path: "/portfolio/experienced",
    year: 2026,
  },
};

// ✨ CHANGE THIS to switch which version shows on homepage
// Currently showing: starter (your current portfolio)
// When ready with new version, change to: "experienced"
export const activeVersion = "experienced";

// Get active version details
export const getActiveVersionInfo = () => versions[activeVersion];

// Get all versions for navigation
export const getAllVersions = () => Object.entries(versions).map(([key, value]) => ({ key, ...value }));

