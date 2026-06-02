/* ==========================================================================
   Vercel Web Analytics
   Loads and initializes the Vercel Analytics tracking script.
   This follows the vanilla/static site pattern from Vercel docs.
   ========================================================================== */

(function() {
  // Initialize the analytics queue
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Set mode to production (analytics only tracks in production)
  window.vam = window.vam || 'production';
  
  // Load the analytics script
  // The script source will be automatically determined by Vercel when deployed
  // Format: /_vercel/insights/script.js
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  script.onerror = function() {
    console.log('[Vercel Web Analytics] Failed to load. Make sure Web Analytics is enabled in your Vercel project settings.');
  };
  
  document.head.appendChild(script);
})();
