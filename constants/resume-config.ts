// Resume configuration
export const RESUME_CONFIG = {
  // Google Drive resume link
  // Replace YOUR_RESUME_FILE_ID with your actual Google Drive file ID
  googleDriveLink:
    "https://drive.google.com/file/d/1BasmszrWW8mRhxv97pFWWlxExR9yXGumZLWzL_yYYrU/preview",

  // Alternative: Direct download link (if you prefer)
  directDownloadLink: "/resume.pdf",

  // Resume file name for download
  fileName: "Miliyon_Ayalew_Resume.pdf",

  // Resume button text
  buttonText: "Download Resume",

  // Resume button icon
  icon: "Download", // or "ExternalLink" for viewing

  // Action type: "download" or "view"
  action: "view" as "download" | "view",
};

// Helper function to get the appropriate resume link
export function getResumeLink(): string {
  return RESUME_CONFIG.action === "download"
    ? RESUME_CONFIG.directDownloadLink
    : RESUME_CONFIG.googleDriveLink;
}

// Helper function to handle resume action
export function handleResumeAction(): void {
  if (RESUME_CONFIG.action === "download") {
    // Create a temporary link for download
    const link = document.createElement("a");
    link.href = RESUME_CONFIG.directDownloadLink;
    link.download = RESUME_CONFIG.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Open Google Drive link in new tab
    window.open(RESUME_CONFIG.googleDriveLink, "_blank", "noopener,noreferrer");
  }
}
