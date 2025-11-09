document.addEventListener("DOMContentLoaded", () => {
  // Navbar
  const menuIcon = document.querySelector(".menu-icon");
  const mobileNavMenu = document.querySelector(".mobile-nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (menuIcon && mobileNavMenu) {
    menuIcon.addEventListener("click", () => {
      mobileNavMenu.classList.toggle("active");
    });

    mobileNavMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavMenu.classList.remove("active");
      });
    });

    // Close menu if clicking outside
    document.addEventListener("click", (e) => {
      if (
        !mobileNavMenu.contains(e.target) &&
        !menuIcon.contains(e.target) &&
        mobileNavMenu.classList.contains("active")
      ) {
        mobileNavMenu.classList.remove("active");
      }
    });
  }

  // Smooth scroll for all nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = targetEl.offsetTop - 60;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // Features Display
  const featuresContent = document.querySelector("#features .content");
  featuresList.forEach((f) => {
    const html = `
      <div class="feature-card">
        <div class="icon">
          <img src="${f.icon}" alt="" />
        </div>
        <h3>${f.title}</h3>
        <p>${f.description}</p>
      </div>
    `;
    featuresContent.insertAdjacentHTML("beforeend", html);
  });

  // Testimonials
  const testimonialCard = document.querySelector("#testimonials .testimonial-card");
  let currentTestimonialIndex = 0;

  const displayTestimonial = () => {
    const t = testimonialsList[currentTestimonialIndex];
    testimonialCard.innerHTML = `
      <span class="quote-icon"><img src="images/quote-icon.svg" alt="" /></span>
      <p class="review">${t.review}</p>
      <div class="reviewer-info">
        <div class="image"><img src="${t.image}" alt="" /></div>
        <div class="details">
          <div class="name">${t.name}</div>
          <div class="designation">${t.designation}</div>
        </div>
      </div>
    `;
  };
  displayTestimonial();

  const nextBtn = document.querySelector("#testimonials .next-btn");
  const prevBtn = document.querySelector("#testimonials .prev-btn");

  nextBtn.addEventListener("click", () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsList.length;
    displayTestimonial();
  });
  prevBtn.addEventListener("click", () => {
    currentTestimonialIndex =
      (currentTestimonialIndex - 1 + testimonialsList.length) % testimonialsList.length;
    displayTestimonial();
  });

  // Pricing
  const pricingContent = document.querySelector("#pricing .content");
  plans.forEach((p) => {
    const featuresHTML = p.features
      .map((f) => `<li><span class='icon'><img src='images/check-icon.svg'/></span>${f}</li>`)
      .join("");
    pricingContent.insertAdjacentHTML(
      "beforeend",
      `<div class="plan">
        <h4 class="plan-name">${p.name}</h4>
        <ul class="plan-features">${featuresHTML}</ul>
        <div class="plan-price">${p.price}</div>
        <a href="${p.link}" class="btn">Choose</a>
      </div>`
    );
  });

  // Featured Slider
  const slides = document.querySelectorAll("#featured .slide");
  const slideTrack = document.querySelector("#featured .slide-track");
  let slideIndex = 0;

  if (slides.length > 0) {
    const showSlide = (i) => {
      slideIndex = (i + slides.length) % slides.length;
      slideTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    };

    const nextSlideBtn = document.querySelector("#featured .next");
    const prevSlideBtn = document.querySelector("#featured .prev");

    nextSlideBtn.addEventListener("click", () => showSlide(slideIndex + 1));
    prevSlideBtn.addEventListener("click", () => showSlide(slideIndex - 1));

    setInterval(() => showSlide(slideIndex + 1), 4000);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const slideTrack = document.querySelector("#featured .slide-track");
  const slides = document.querySelectorAll("#featured .slide");
  const nextBtn = document.querySelector("#featured .next");
  const prevBtn = document.querySelector("#featured .prev");
  let currentSlide = 0;
  const totalSlides = slides.length;

  const showSlide = (index) => {
    currentSlide = (index + totalSlides) % totalSlides;
    slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  // Next / Prev buttons
  nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

  // Auto slide every 4s
  setInterval(() => showSlide(currentSlide + 1), 4000);

  // Initialize
  showSlide(0);
});
