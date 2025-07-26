// YouTube Shorts data array - Add your YouTube Shorts links here
const youtubeShorts = [
    {
        id: 1,
        title: "Amazing Creative Short #1",
        description: "This is an amazing creative short that showcases incredible content and storytelling.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", // Auto-generated thumbnail
        views: "10K",
        likes: "250",
        duration: "0:30",
        category: "trending",
        uploadDate: "2025-01-15"
    },
    {
        id: 2,
        title: "Epic Moment Compilation",
        description: "A compilation of the most epic moments captured in this incredible short video.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "25K",
        likes: "500",
        duration: "0:45",
        category: "featured",
        uploadDate: "2025-01-10"
    },
    {
        id: 3,
        title: "Quick Tutorial Tips",
        description: "Learn something new in under a minute with these quick and easy tips.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "15K",
        likes: "320",
        duration: "0:55",
        category: "latest",
        uploadDate: "2025-01-20"
    },
    {
        id: 4,
        title: "Behind the Scenes",
        description: "Get an exclusive look behind the scenes of content creation process.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "8K",
        likes: "180",
        duration: "1:00",
        category: "featured",
        uploadDate: "2025-01-18"
    },
    {
        id: 5,
        title: "Trending Challenge",
        description: "Participating in the latest trending challenge with a unique twist.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "30K",
        likes: "750",
        duration: "0:35",
        category: "trending",
        uploadDate: "2025-01-12"
    },
    {
        id: 6,
        title: "Creative Experiment",
        description: "Trying out a new creative technique and sharing the results with you.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "12K",
        likes: "290",
        duration: "0:50",
        category: "latest",
        uploadDate: "2025-01-22"
    }
];

// Global variables
let currentFilter = 'all';
let currentlyDisplayed = 6;
const shortsPerLoad = 6;

// DOM elements
const shortsGrid = document.getElementById('shortsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const videoModal = document.getElementById('videoModal');
const modalClose = document.getElementById('modalClose');
const modalIframe = document.getElementById('modalIframe');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalViews = document.getElementById('modalViews');
const modalLikes = document.getElementById('modalLikes');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderShorts();
    setupEventListeners();
    setupScrollAnimations();
    setupNavigation();
    animateCounters();
}

// Render shorts based on current filter
function renderShorts() {
    const filteredShorts = getFilteredShorts();
    const shortsToShow = filteredShorts.slice(0, currentlyDisplayed);
    
    shortsGrid.innerHTML = '';
    
    shortsToShow.forEach((short, index) => {
        const shortCard = createShortCard(short);
        shortCard.style.animationDelay = `${index * 0.1}s`;
        shortsGrid.appendChild(shortCard);
    });
    
    // Show/hide load more button
    if (currentlyDisplayed >= filteredShorts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
    
    // Add reveal animation to new cards
    setTimeout(() => {
        document.querySelectorAll('.short-card').forEach(card => {
            card.classList.add('fade-in');
        });
    }, 100);
}

// Create individual short card
function createShortCard(short) {
    const card = document.createElement('div');
    card.className = 'short-card reveal';
    card.innerHTML = `
        <div class="short-thumbnail">
            <img src="${short.thumbnail}" alt="${short.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"280\" height=\"350\" viewBox=\"0 0 280 350\"><rect width=\"280\" height=\"350\" fill=\"%23ff0000\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"white\" font-size=\"24\">YouTube</text></svg>'">
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="short-info">
            <h3 class="short-title">${short.title}</h3>
            <p class="short-description">${short.description}</p>
            <div class="short-stats">
                <span class="short-views">
                    <i class="fas fa-eye"></i>
                    ${short.views} views
                </span>
                <span class="short-duration">${short.duration}</span>
            </div>
        </div>
    `;
    
    // Add click event to open video modal
    card.addEventListener('click', () => openVideoModal(short));
    
    return card;
}

// Get filtered shorts based on current filter
function getFilteredShorts() {
    if (currentFilter === 'all') {
        return youtubeShorts;
    }
    return youtubeShorts.filter(short => short.category === currentFilter);
}

// Open video modal
function openVideoModal(short) {
    const embedUrl = `https://www.youtube.com/embed/${short.videoId}?autoplay=1&rel=0`;
    
    modalIframe.src = embedUrl;
    modalTitle.textContent = short.title;
    modalDescription.textContent = short.description;
    modalViews.innerHTML = `<i class="fas fa-eye"></i> ${short.views} views`;
    modalLikes.innerHTML = `<i class="fas fa-heart"></i> ${short.likes} likes`;
    
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    videoModal.style.animation = 'fadeIn 0.3s ease';
}

// Close video modal
function closeVideoModal() {
    videoModal.style.display = 'none';
    modalIframe.src = '';
    document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update current filter
            currentFilter = e.target.dataset.filter;
            currentlyDisplayed = shortsPerLoad;
            
            // Re-render shorts with animation
            shortsGrid.style.opacity = '0';
            setTimeout(() => {
                renderShorts();
                shortsGrid.style.opacity = '1';
            }, 200);
        });
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        currentlyDisplayed += shortsPerLoad;
        renderShorts();
    });
    
    // Modal close events
    modalClose.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Setup smooth navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    scrollToSection(targetId.substring(1));
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility functions
function formatViews(views) {
    if (views >= 1000000) {
        return Math.floor(views / 1000000) + 'M';
    } else if (views >= 1000) {
        return Math.floor(views / 1000) + 'K';
    }
    return views.toString();
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            // Create fallback YouTube thumbnail
            const canvas = document.createElement('canvas');
            canvas.width = 280;
            canvas.height = 350;
            const ctx = canvas.getContext('2d');
            
            // Draw red background
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, 280, 350);
            
            // Draw YouTube text
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('YouTube', 140, 175);
            
            img.src = canvas.toDataURL();
        });
    });
}

// Initialize image loading animations
document.addEventListener('DOMContentLoaded', addImageLoadingAnimation);

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimization: Lazy loading for shorts grid
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
