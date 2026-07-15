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
        if (!headerNav.classList.contains('always-sticky')) {
          headerNav.classList.remove('sticky');
        }
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

  // Floating Glass Alerts Notification System (Replaces browser alert)
  const showGlassAlert = (message, type = 'success') => {
    // Remove existing alerts first
    const existingAlerts = document.querySelectorAll('.glass-alert-container');
    existingAlerts.forEach(alert => alert.remove());

    const container = document.createElement('div');
    container.className = `glass-alert-container ${type}`;
    
    const iconMap = {
      'success': 'bi-check-circle-fill',
      'warning': 'bi-exclamation-triangle-fill',
      'error': 'bi-x-circle-fill',
      'info': 'bi-info-circle-fill'
    };
    
    container.innerHTML = `
      <div class="glass-alert-content">
        <i class="bi ${iconMap[type] || 'bi-info-circle-fill'} glass-alert-icon"></i>
        <span class="glass-alert-message">${message}</span>
      </div>
    `;
    
    document.body.appendChild(container);
    
    // Animate In
    setTimeout(() => {
      container.classList.add('show');
    }, 10);
    
    // Auto-destruct
    setTimeout(() => {
      container.classList.remove('show');
      setTimeout(() => container.remove(), 400);
    }, 4000);
  };

  // Custom Gold Cursor follow physics (Desktop only)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'custom-cursor-outer';
    const cursorInner = document.createElement('div');
    cursorInner.className = 'custom-cursor-inner';
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update inner cursor instantly
      cursorInner.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
    
    // Animation Loop for smooth lagging outer circle (Lerp physics)
    const updateCursorPhysics = () => {
      const lerpFactor = 0.15;
      outerX += (mouseX - outerX) * lerpFactor;
      outerY += (mouseY - outerY) * lerpFactor;
      
      cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
      requestAnimationFrame(updateCursorPhysics);
    };
    
    requestAnimationFrame(updateCursorPhysics);
    
    // Hover interactions
    const interactiveElements = document.querySelectorAll('a, button, .filter-tab-btn, .addon-checkbox, .menu-item-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOuter.classList.add('cursor-hover');
        cursorInner.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOuter.classList.remove('cursor-hover');
        cursorInner.classList.remove('cursor-hover');
      });
    });
  }

  // CountUp Stat Counters Animation helper
  const countElements = document.querySelectorAll('.counter-number');
  const animateValue = (el, target, duration, suffix = '') => {
    let start = 0;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = Math.round(target).toLocaleString('en-IN') + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.round(start).toLocaleString('en-IN') + suffix;
      }
    }, stepTime);
  };

  if (countElements.length > 0) {
    const startCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      
      // Custom vanilla animated numbers
      animateValue(el, target, 2000, suffix);
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
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
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

  // Interactive Menu Planner Selection Logic
  const menuItemCheckboxes = document.querySelectorAll('.menu-item-checkbox');
  const chosenListEl = document.getElementById('chosenMenuList');
  const emptyMsgEl = document.getElementById('menuEmptyMsg');
  const copyMenuBtn = document.getElementById('copyMenuBtn');
  const attachMenuBtn = document.getElementById('attachMenuBtn');

  if (menuItemCheckboxes.length > 0 && chosenListEl) {
    const updateChosenMenu = () => {
      chosenListEl.innerHTML = '';
      let selectedItems = [];

      menuItemCheckboxes.forEach(cb => {
        if (cb.checked) {
          selectedItems.push(cb.value);
        }
      });

      if (selectedItems.length === 0) {
        if (emptyMsgEl) emptyMsgEl.style.display = 'block';
        if (copyMenuBtn) copyMenuBtn.disabled = true;
        if (attachMenuBtn) attachMenuBtn.disabled = true;
      } else {
        if (emptyMsgEl) emptyMsgEl.style.display = 'none';
        if (copyMenuBtn) copyMenuBtn.disabled = false;
        if (attachMenuBtn) attachMenuBtn.disabled = false;

        selectedItems.forEach(item => {
          const li = document.createElement('li');
          li.className = 'chosen-menu-item-badge';
          li.innerHTML = `<span>${item}</span><i class="bi bi-x-circle-fill remove-item-btn" data-value="${item}"></i>`;
          chosenListEl.appendChild(li);
        });

        // Add listeners to badge cancel buttons
        const removes = chosenListEl.querySelectorAll('.remove-item-btn');
        removes.forEach(btn => {
          btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-value');
            const matchingCb = Array.from(menuItemCheckboxes).find(c => c.value === val);
            if (matchingCb) {
              matchingCb.checked = false;
              updateChosenMenu();
            }
          });
        });
      }
    };

    menuItemCheckboxes.forEach(cb => cb.addEventListener('change', updateChosenMenu));

    // Copy Custom Menu to clipboard
    if (copyMenuBtn) {
      copyMenuBtn.addEventListener('click', () => {
        let selectedItems = [];
        menuItemCheckboxes.forEach(cb => {
          if (cb.checked) selectedItems.push(cb.value);
        });

        const textToCopy = "My Custom Menu Selections for Bou Thakurani Banquet:\n" + selectedItems.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          showGlassAlert("Custom Menu copied to clipboard! Paste it anywhere.", "success");
        }).catch(err => {
          console.error("Copy failed: ", err);
          showGlassAlert("Unable to copy. Please manually select the list.", "error");
        });
      });
    }

    // Attach Custom Menu to Booking form
    if (attachMenuBtn) {
      attachMenuBtn.addEventListener('click', () => {
        let selectedItems = [];
        menuItemCheckboxes.forEach(cb => {
          if (cb.checked) selectedItems.push(cb.value);
        });

        const modalMessage = document.getElementById('bookMessage');
        if (modalMessage) {
          const currentText = modalMessage.value ? modalMessage.value + "\n\n" : "";
          modalMessage.value = currentText + "Custom Menu Selections:\n" + selectedItems.map(item => `- ${item}`).join('\n');
        }

        const bookingModalEl = document.getElementById('bookingModal');
        if (bookingModalEl) {
          const modal = new bootstrap.Modal(bookingModalEl);
          modal.show();
          showGlassAlert("Selected Menu attached to your booking form!", "info");
        }
      });
    }
  }

  // Booking Form & Contact Form validations (WhatsApp compile redirection)
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

      if (!name || !phone || !date || !eventType) {
        showGlassAlert('Please fill out all mandatory fields.', 'error');
        return;
      }

      if (phone.length < 10) {
        showGlassAlert('Please enter a valid 10-digit mobile number.', 'warning');
        return;
      }

      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        showGlassAlert('Please select a booking date in the future.', 'warning');
        return;
      }

      // Format WhatsApp query text
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
      
      showGlassAlert('Thank you! Redirecting you to WhatsApp to complete your booking.', 'success');
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
      
      // Close Modal
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
        showGlassAlert('Please fill out all fields in the contact form.', 'warning');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showGlassAlert('Please enter a valid email address.', 'error');
        return;
      }

      if (phone.length < 10) {
        showGlassAlert('Please enter a valid 10-digit phone number.', 'warning');
        return;
      }

      // Format WhatsApp query text
      const text = `Hello Bou Thakurani Banquet,

I have a general inquiry:
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Subject:* ${subject}
*Message:* ${message}`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918100132378&text=${encodeURIComponent(text)}`;
      
      showGlassAlert('Thank you! Redirecting you to WhatsApp to send your inquiry.', 'success');
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
      
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
        showGlassAlert('Successfully subscribed to our luxury event newsletters!', 'success');
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

  // Initialize Swiper Hero Slider
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

  // Initialize Swiper Testimonial Slider
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
