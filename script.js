// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Select all links with hash
  const links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
  
  for (const link of links) {
    link.addEventListener('click', function(e) {
      // Only prevent default if the link is to the same page
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
        location.hostname === this.hostname
      ) {
        e.preventDefault();
        
        // Get the target element
        const targetId = this.hash.slice(1);
        const targetElement = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
        
        if (targetElement) {
          // Smooth scroll to the target
          smoothScroll(targetElement);
        }
      }
    });
  }
  
  function smoothScroll(target) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // milliseconds
    let startTimestamp = null;
    
    function animation(currentTime) {
      if (startTimestamp === null) startTimestamp = currentTime;
      const timeElapsed = currentTime - startTimestamp;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOutCubic = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
});