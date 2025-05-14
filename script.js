// Helper functions
const getElement = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initCursorEffect();
    initCountdown();
    initScrollAnimations();
    initStickyHeader();
    initFaqAccordion();
    initFeatureCards();
});

// Cursor effect
function initCursorEffect() {
    const cursorFollower = getElement('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Show cursor follower after a slight delay
    setTimeout(() => {
        cursorFollower.style.opacity = '1';
    }, 500);

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation effect
    const animateCursor = () => {
        // Smooth follow with easing
        const easeFactor = 0.1;
        cursorX += (mouseX - cursorX) * easeFactor;
        cursorY += (mouseY - cursorY) * easeFactor;
        
        // Apply position
        cursorFollower.style.left = `${cursorX}px`;
        cursorFollower.style.top = `${cursorY}px`;
        
        // Continue animation
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
}

// Countdown timer
function initCountdown() {
    // Set target date - December 31, 2025
    const targetDate = new Date('December 31, 2025 00:00:00').getTime();
    
    // Elements
    const daysEl = getElement('#days');
    const hoursEl = getElement('#hours');
    const minutesEl = getElement('#minutes');
    const secondsEl = getElement('#seconds');
    
    // Update countdown
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update UI with padding for single digits
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    };
    
    // Initial call and set interval
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Sticky header on scroll
function initStickyHeader() {
    const header = getElement('header');
    const heroSection = getElement('.hero');
    let scrolled = false;
    
    window.addEventListener('scroll', () => {
        // Check if user has scrolled beyond the top of the header
        const currentScroll = window.scrollY;
        const heroHeight = heroSection.offsetHeight / 3;
        
        if (currentScroll > heroHeight && !scrolled) {
            header.classList.add('scrolled');
            scrolled = true;
        } else if (currentScroll <= heroHeight && scrolled) {
            header.classList.remove('scrolled');
            scrolled = false;
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    // Observe elements to animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    const videoSection = getElement('.video-section');
    observer.observe(videoSection);
    
    // Add animation to sections
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        animateFeatureCards(scrollPosition);
    });
}

// Feature card animations
function initFeatureCards() {
    const featureCards = getElements('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animate feature cards on scroll
function animateFeatureCards(scrollPosition) {
    const featureCards = getElements('.feature-card');
    
    featureCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > cardTop + 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = getElements('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Video player functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = getElement('.video-container');
    
    videoContainer.addEventListener('click', () => {
        // Here you would typically create and insert an actual video element
        // For this demo we just change the play button appearance
        const playButton = videoContainer.querySelector('.play-button');
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Add a "playing" class to the container
        videoContainer.classList.add('playing');
        
        // In a real implementation, you would:
        // 1. Create a video element
        // 2. Set the source
        // 3. Replace the placeholder image
        // 4. Start playing the video
    });
});

// Waitlist form submission
document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = getElement('.waitlist-form');
    const emailInput = waitlistForm.querySelector('input[type="email"]');
    const submitButton = waitlistForm.querySelector('.btn');
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Simple validation
        if (email && email.includes('@') && email.includes('.')) {
            // Here you would typically submit the form to your backend
            
            // Success feedback
            emailInput.value = '';
            
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! You\'ve been added to our waitlist.';
            successMessage.style.color = 'var(--primary-color)';
            successMessage.style.marginTop = '1rem';
            successMessage.style.fontWeight = '500';
            
            // Add it after the form
            waitlistForm.appendChild(successMessage);
            
            // Remove it after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            // Error feedback - shake the input
            emailInput.style.animation = 'none';
            setTimeout(() => {
                emailInput.style.animation = 'shake 0.5s';
            }, 10);
        }
    });
});

// Add shake animation for form validation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);