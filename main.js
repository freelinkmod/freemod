document.addEventListener("DOMContentLoaded", () => {
  // App Preview Rotation
  const previewImages = document.querySelectorAll('.preview-img');
  let currentIndex = 0;

  function rotatePreview() {
    // Remove active class from all images
    previewImages.forEach(img => img.classList.remove('active'));
    
    // Add active class to current image
    if (previewImages[currentIndex]) {
      previewImages[currentIndex].classList.add('active');
    }
    
    // Move to next image
    currentIndex = (currentIndex + 1) % previewImages.length;
  }

  // Start rotation if images exist
  if (previewImages.length > 0) {
    rotatePreview(); // Show first image immediately
    setInterval(rotatePreview, 3000); // Rotate every 3 seconds
  }

  // Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      
      // Animate hamburger menu
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar, index) => {
        if (navToggle.classList.contains("active")) {
          if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (index === 1) bar.style.opacity = "0";
          if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        }
      });
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach(bar => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach(bar => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      }
    });
  }

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // App Showcase Rotation in Hero Section
  const showcaseItems = document.querySelectorAll('.showcase-item');
  let currentShowcaseIndex = 0;

  function rotateShowcase() {
    if (showcaseItems.length === 0) return;
    
    // Remove active class from all items
    showcaseItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current item
    showcaseItems[currentShowcaseIndex].classList.add('active');
    
    // Move to next item
    currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseItems.length;
  }

  // Start showcase rotation
  if (showcaseItems.length > 0) {
    setInterval(rotateShowcase, 3000); // Rotate every 3 seconds
  }

  // Enhanced Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTop");
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Advanced Intersection Observer for animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Add staggered animation for grid items
        if (entry.target.parentElement.classList.contains('apps-grid') ||
            entry.target.parentElement.classList.contains('games-grid') ||
            entry.target.parentElement.classList.contains('features-grid')) {
          
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.app-card, .game-card, .feature-item, .generator-card, .section-header');
  animateElements.forEach(el => observer.observe(el));

  // Enhanced Button Ripple Effect
  function createAdvancedRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);

    // Add pulse effect to primary buttons
    if (button.classList.contains('btn-primary')) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }
  }

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn, .download-btn, .generate-btn');
  buttons.forEach(button => {
    button.addEventListener('click', createAdvancedRipple);
  });

  // Enhanced CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .btn, .download-btn, .generate-btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 600ms linear;
      background-color: rgba(255, 255, 255, 0.7);
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for hero background shapes
  const bgShapes = document.querySelectorAll('.bg-shape');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    bgShapes.forEach((shape, index) => {
      const speed = 0.2 + (index * 0.1);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
    });
  });

  // Dynamic particle system enhancement
  function createEnhancedParticle() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#8b5cf6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const endY = -10;
    const duration = Math.random() * 4000 + 3000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    particles.appendChild(particle);
    
    particle.animate([
      { 
        transform: 'translateY(0px) scale(0)', 
        opacity: 0 
      },
      { 
        transform: 'translateY(-50px) scale(1)', 
        opacity: 0.6 
      },
      { 
        transform: `translateY(${endY - startY}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: duration,
      easing: 'ease-out'
    }).onfinish = () => {
      particle.remove();
    };
  }

  // Create enhanced particles periodically
  setInterval(createEnhancedParticle, 200);

  // Advanced stats counter animation
  function animateAdvancedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = counter.textContent;
      const isDecimal = target.includes('.');
      let numericValue, suffix;
      
      if (isDecimal) {
        numericValue = parseFloat(target);
        suffix = target.replace(/[0-9.]/g, '');
      } else {
        numericValue = parseInt(target.replace(/\D/g, ''));
        suffix = target.replace(/[0-9]/g, '');
      }
      
      if (numericValue) {
        let current = 0;
        const increment = numericValue / 60;
        let hasAnimated = false;
        
        const timer = setInterval(() => {
          current += increment;
          
          if (current >= numericValue) {
            counter.textContent = target;
            clearInterval(timer);
            
            // Add completion animation
            if (!hasAnimated) {
              counter.style.transform = 'scale(1.1)';
              setTimeout(() => {
                counter.style.transform = 'scale(1)';
              }, 200);
              hasAnimated = true;
            }
          } else {
            if (isDecimal) {
              counter.textContent = current.toFixed(1) + suffix;
            } else {
              counter.textContent = Math.floor(current) + suffix;
            }
          }
        }, 30);
      }
    });
  }

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => animateAdvancedCounters(), 500);
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Enhanced card hover effects with 3D transform
  const cards = document.querySelectorAll('.app-card, .game-card, .feature-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) rotateX(5deg) scale(1.02)';
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
      card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.zIndex = '';
    });
  });

  // Add smooth reveal animation for sections
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
  });

  // Hero section should be visible immediately
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
  }

  console.log("🚀 FreeModz Enhanced UI loaded successfully!");
  console.log("✨ Features: Advanced animations, dynamic showcases, enhanced interactions");
});
