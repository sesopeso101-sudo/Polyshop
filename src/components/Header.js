import React, { useEffect } from 'react';

// This Header component intentionally clears the entire page when mounted,
// leaving a blank white page as requested.
export default function Header() {
  useEffect(() => {
    try {
      // Remove all children from <body>
      document.body.innerHTML = '';
      // Ensure background is white
      document.body.style.backgroundColor = '#ffffff';
      // Remove margins
      document.body.style.margin = '0';
      // Ensure height
      document.documentElement.style.height = '100%';
      document.body.style.minHeight = '100vh';
    } catch (e) {
      // swallow errors silently
      console.error('Failed to clear page:', e);
    }

    // No cleanup required (we leave the page blank)
    return () => {};
  }, []);

  return null;
}
