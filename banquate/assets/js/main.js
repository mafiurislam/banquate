document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 500);
    });
    // Fallback if load event doesn't fire
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 2500);
  }

  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // Sticky Header Navigation
  const headerNav = document.querySelector('.header-nav');
  const stickyThreshold = 100;
  if (headerNav) {
    const toggleSticky = () => {
      if (window.scrollY > stickyThreshold) {
        headerNav.classList.add('sticky');
      } else {
        headerNav.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', toggleSticky);
    toggleSticky(); // Run once at load
  }

  // Active Navigation Highlight
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (currentPath.endsWith(linkHref) || (currentPath === '/' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Menu Auto-close on link click
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarCollapse && navbarToggler) {
    const navItems = navbarCollapse.querySelectorAll('.nav-link, .btn');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Button Ripple Effect
  const rippleButtons = document.querySelectorAll('.ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const rippleSpan = document.createElement('span');
      rippleSpan.classList.add('ripple-effect');
      rippleSpan.style.left = `${x}px`;
      rippleSpan.style.top = `${y}px`;
      
      this.appendChild(rippleSpan);
      
      setTimeout(() => {
        rippleSpan.remove();
      }, 600);
    });
  });

  // CountUp Stat Counters Animation
  const countElements = document.querySelectorAll('.counter-number');
  if (countElements.length > 0) {
    const startCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      
      // If CountUp.js is loaded from CDN
      if (typeof countUp !== 'undefined' && typeof countUp.CountUp === 'function') {
        const demo = new countUp.CountUp(el, target, {
          suffix: suffix,
          duration: 2.5,
          useEasing: true,
          useGrouping: true,
        });
        if (!demo.error) {
          demo.start();
        } else {
          console.error(demo.error);
        }
      } else {
        // Fallback custom vanilla animation
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        const increment = target > duration ? Math.ceil(target / (duration / 16)) : 1;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = current + suffix;
          }
        }, 16);
      }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => counterObserver.observe(el));
  }

  // Gallery Filter Action
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          // If the item matches filter or if filter is "all"
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Booking Form & Contact Form validations
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const name = document.getElementById('bookName').value.trim();
      const phone = document.getElementById('bookPhone').value.trim();
      const email = document.getElementById('bookEmail').value.trim();
      const eventType = document.getElementById('bookEvent').value;
      const guests = document.getElementById('bookGuests').value;
      const date = document.getElementById('bookDate').value;
      const message = document.getElementById('bookMessage').value.trim();

      // Simple validations
      if (!name || !phone || !date || !eventType) {
        alert('Please fill out all mandatory fields (Name, Phone, Date, Event Type).');
        return;
      }

      if (phone.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      // Check date is in future
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        alert('Please select a booking date in the future.');
        return;
      }

      // If validation succeeds, format message for WhatsApp
      const text = `Hello Bou Thakurani Banquet,

I would like to make an event booking inquiry:
*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email || 'N/A'}
*Event Type:* ${eventType}
*Guests Count:* ${guests}
*Date:* ${date}
*Details:* ${message || 'None'}`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918100132378&text=${encodeURIComponent(text)}`;
      
      // Show elegant success and redirect
      alert('Thank you! Redirecting you to WhatsApp to complete your booking request.');
      window.open(whatsappUrl, '_blank');
      
      // Close Bootstrap Modal if open
      const bookingModalEl = document.getElementById('bookingModal');
      if (bookingModalEl) {
        const modal = bootstrap.Modal.getInstance(bookingModalEl);
        if (modal) {
          modal.hide();
        }
      }
      bookingForm.reset();
    });
  }

  // Contact Page Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !phone || !subject || !message) {
        alert('Please fill out all fields in the contact form.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Message for WhatsApp
      const text = `Hello Bou Thakurani Banquet,

I have a general inquiry:
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Subject:* ${subject}
*Message:* ${message}`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918100132378&text=${encodeURIComponent(text)}`;
      
      alert('Thank you for contacting us! Redirecting you to WhatsApp to send your inquiry.');
      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }

  // Newsletter Submit Validation
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        alert('Thank you for subscribing to the Bou Thakurani Banquet newsletter! We will keep you updated on special packages.');
        emailInput.value = '';
      }
    });
  }

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Initialize GLightbox
  if (typeof GLightbox !== 'undefined') {
    window.lightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  // Initialize Swipers if elements exist
  if (document.querySelector('.hero-swiper') && typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.hero-pagination',
        clickable: true,
      },
    });
  }

  if (document.querySelector('.testimonial-swiper') && typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    });
  }
});
