import React from "react";
import { Link, useParams } from "react-router-dom";
import { getAllVersions, activeVersion } from "../../config";

const VersionFooter = () => {
  const { version } = useParams();
  const allVersions = getAllVersions();
  const currentVersion = version || activeVersion;
  const currentVersionInfo = allVersions.find((v) => v.key === currentVersion);
  
  // Get next version (cycle through versions)
  const currentIndex = allVersions.findIndex((v) => v.key === currentVersion);
  const nextVersion = allVersions[(currentIndex + 1) % allVersions.length];

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem 1rem",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        marginTop: "3rem",
        fontSize: "0.9rem",
        color: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <p>
        <strong>Current:</strong> {currentVersionInfo?.name} •{" "}
        <strong>
          <Link
            to={
              nextVersion.key === activeVersion
                ? "/"
                : `/portfolio/${nextVersion.key}`
            }
            style={{
              color: "rgba(0, 0, 0, 0.8)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "rgba(0, 0, 0, 0.8)";
            }}
          >
            Next: {nextVersion.name}
          </Link>
        </strong>
      </p>
    </footer>
  );
};

export default VersionFooter;
