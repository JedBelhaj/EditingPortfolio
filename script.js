// YouTube Shorts data array - Jed B.'s actual YouTube Shorts
const youtubeShorts = [
    {
        id: 1,
        title: "Epic Gaming Montage",
        description: "An epic gaming montage showcasing the best moments and incredible gameplay highlights.",
        videoId: "99dSedqep6U",
        thumbnail: "https://img.youtube.com/vi/99dSedqep6U/maxresdefault.jpg",
        views: "12.5K",
        likes: "340",
        duration: "0:58",
        category: "trending",
        uploadDate: "2025-01-15"
    },
    {
        id: 2,
        title: "Creative Editing Showcase",
        description: "Demonstrating advanced video editing techniques and creative transitions in this short.",
        videoId: "n-mz8Bmad7I",
        thumbnail: "https://img.youtube.com/vi/n-mz8Bmad7I/maxresdefault.jpg",
        views: "8.2K",
        likes: "195",
        duration: "0:42",
        category: "featured",
        uploadDate: "2025-01-10"
    },
    {
        id: 3,
        title: "Behind the Scenes",
        description: "Take a look behind the scenes of my video production process and editing workflow.",
        videoId: "bo45r6zF8uw",
        thumbnail: "https://img.youtube.com/vi/bo45r6zF8uw/maxresdefault.jpg",
        views: "15.7K",
        likes: "420",
        duration: "1:15",
        category: "latest",
        uploadDate: "2025-01-20"
    },
    {
        id: 4,
        title: "Quick Edit Tutorial",
        description: "Learn essential video editing tips and tricks in under a minute with this quick tutorial.",
        videoId: "xttaEDt5CIo",
        thumbnail: "https://img.youtube.com/vi/xttaEDt5CIo/maxresdefault.jpg",
        views: "22.1K",
        likes: "680",
        duration: "0:55",
        category: "featured",
        uploadDate: "2025-01-18"
    },
    {
        id: 5,
        title: "Trending Effects Demo",
        description: "Showcasing the latest trending video effects and how to achieve them in your edits.",
        videoId: "L3y4SqHlD9o",
        thumbnail: "https://img.youtube.com/vi/L3y4SqHlD9o/maxresdefault.jpg",
        views: "18.9K",
        likes: "525",
        duration: "0:48",
        category: "trending",
        uploadDate: "2025-01-12"
    },
    {
        id: 6,
        title: "Color Grading Magic",
        description: "Transform your videos with professional color grading techniques demonstrated step by step.",
        videoId: "ajG13T64tmM",
        thumbnail: "https://img.youtube.com/vi/ajG13T64tmM/maxresdefault.jpg",
        views: "14.3K",
        likes: "380",
        duration: "1:02",
        category: "latest",
        uploadDate: "2025-01-22"
    },
    {
        id: 7,
        title: "Motion Graphics Breakdown",
        description: "Breaking down complex motion graphics and explaining the creative process behind them.",
        videoId: "b_GNmfdGqzM",
        thumbnail: "https://img.youtube.com/vi/b_GNmfdGqzM/maxresdefault.jpg",
        views: "11.8K",
        likes: "295",
        duration: "0:52",
        category: "featured",
        uploadDate: "2025-01-14"
    },
    {
        id: 8,
        title: "Latest Project Showcase",
        description: "Showcasing my latest video editing project with advanced techniques and creative storytelling.",
        videoId: "0sifoBolr7E",
        thumbnail: "https://img.youtube.com/vi/0sifoBolr7E/maxresdefault.jpg",
        views: "9.6K",
        likes: "245",
        duration: "1:08",
        category: "latest",
        uploadDate: "2025-01-25"
    }
];

// Global variables
let currentFilter = 'all';
let currentlyDisplayed = 6;
const shortsPerLoad = 6;

// DOM elements - will be set after DOM loads
let shortsGrid;
let loadMoreBtn;
let filterBtns;
let videoModal;
let modalClose;
let modalIframe;
let modalTitle;
let modalDescription;
let modalViews;
let modalLikes;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize DOM elements after DOM is loaded
    shortsGrid = document.getElementById('shortsGrid');
    loadMoreBtn = document.getElementById('loadMoreBtn');
    filterBtns = document.querySelectorAll('.filter-btn');
    videoModal = document.getElementById('videoModal');
    modalClose = document.getElementById('modalClose');
    modalIframe = document.getElementById('modalIframe');
    modalTitle = document.getElementById('modalTitle');
    modalDescription = document.getElementById('modalDescription');
    modalViews = document.getElementById('modalViews');
    modalLikes = document.getElementById('modalLikes');
    
    // Debug: Check if elements exist
    console.log('DOM Elements:', {
        shortsGrid: !!shortsGrid,
        loadMoreBtn: !!loadMoreBtn,
        filterBtns: filterBtns.length,
        videoModal: !!videoModal
    });
    
    if (!shortsGrid) {
        console.error('shortsGrid element not found!');
        return;
    }
    
    renderShorts();
    setupEventListeners();
    setupScrollAnimations();
    setupNavigation();
    animateCounters();
}

// Render shorts based on current filter
function renderShorts() {
    if (!shortsGrid) {
        console.error('shortsGrid not available for rendering');
        return;
    }
    
    const filteredShorts = getFilteredShorts();
    
    // Ensure we don't try to show more shorts than available
    const maxToShow = Math.min(currentlyDisplayed, filteredShorts.length);
    const shortsToShow = filteredShorts.slice(0, maxToShow);
    
    // Clear existing content
    shortsGrid.innerHTML = '';
    
    // Always show at least the available shorts, even if less than expected
    if (shortsToShow.length === 0) {
        shortsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                <p>No shorts found in this category.</p>
            </div>
        `;
    } else {
        shortsToShow.forEach((short, index) => {
            const shortCard = createShortCard(short);
            shortsGrid.appendChild(shortCard);
        });
    }
    
    // Show/hide load more button based on available shorts
    if (loadMoreBtn) {
        if (maxToShow >= filteredShorts.length || filteredShorts.length === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

// Create individual short card
function createShortCard(short) {
    const card = document.createElement('div');
    card.className = 'short-card';
    card.innerHTML = `
        <div class="short-thumbnail">
            <img src="${short.thumbnail}" alt="${short.title}" onerror="this.style.display='none'; this.nextElementSibling.nextElementSibling.style.display='flex';">
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
            <div class="thumbnail-fallback" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--primary-color); color: white; justify-content: center; align-items: center; flex-direction: column; border-radius: 12px;">
                <i class="fab fa-youtube" style="font-size: 3rem; margin-bottom: 0.5rem;"></i>
                <span style="font-size: 1rem; font-weight: 600;">YouTube Short</span>
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
        return [...youtubeShorts]; // Return a copy to avoid mutations
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
    if (!filterBtns || filterBtns.length === 0) {
        console.error('Filter buttons not found');
        return;
    }
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update current filter
            currentFilter = e.target.dataset.filter;
            
            // Reset to show initial amount for new filter
            const filteredShorts = getFilteredShorts();
            currentlyDisplayed = Math.max(shortsPerLoad, filteredShorts.length > 0 ? shortsPerLoad : 0);
            
            // Re-render shorts without animation
            renderShorts();
        });
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const filteredShorts = getFilteredShorts();
            const newDisplayed = Math.min(currentlyDisplayed + shortsPerLoad, filteredShorts.length);
            currentlyDisplayed = newDisplayed;
            renderShorts();
        });
    }
    
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
