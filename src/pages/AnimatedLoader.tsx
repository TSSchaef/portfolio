import React, { useState, useEffect } from "react";

export default function AnimatedLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(true);
      setTimeout(() => {
        setShowContent(true);
        setTimeout(() => setLoading(false), 500); // Remove loader overlay
      }, 450);
    }, 800); // Simulate site loading, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <div className="loader-bg" />}
      <div
        className={`site-header animated-header${showHeader ? " show" : ""}${loading ? "" : " loaded"}`}
      >
        <h1>Your Name</h1>
        <p>Web Developer | Designer | Creator</p>
      </div>
      <main
        className={`site-main animated-main${showContent ? " show" : ""}${loading ? "" : " loaded"}`}
      >
        {children}
      </main>
    </>
  );
}
