import React from "react";
import { Link, useParams } from "react-router-dom";
import { getAllVersions, activeVersion } from "../versions/config";
import "./VersionSwitcher.css";

const VersionSwitcher = () => {
  const { version } = useParams();
  const allVersions = getAllVersions();
  const currentVersion = version || activeVersion;

  return (
    <div className="version-switcher">
      <div className="version-switcher-content">
        <p className="version-label">Portfolio Versions:</p>
        <div className="version-buttons">
          {allVersions.map((v) => (
            <Link
              key={v.key}
              to={v.key === activeVersion ? "/" : `/portfolio/${v.key}`}
              className={`version-btn ${
                currentVersion === v.key || (v.key === activeVersion && !version)
                  ? "active"
                  : ""
              }`}
              title={v.description}
            >
              {v.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionSwitcher;
