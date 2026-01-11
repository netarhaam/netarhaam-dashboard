// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.classList.add('active');
            } else {
                answer.classList.remove('active');
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.querySelector('i').classList.add('fa-bars');
                    navToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
    
    // Download Counter (simulated)
    const downloadCount = document.getElementById('downloadCount');
    if (downloadCount) {
        // Simulate increasing download count
        let count = parseInt(downloadCount.textContent.replace(/,/g, ''));
        setInterval(() => {
            count += Math.floor(Math.random() * 3);
            downloadCount.textContent = count.toLocaleString();
        }, 30000);
    }
    
    // Form Validation for Donation Amount
    const amountInputs = document.querySelectorAll('.amount-input');
    amountInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    });
});

// Copy to Clipboard Function
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Address copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

// Track Downloads
window.trackDownload = function(filename) {
    // Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'engagement',
            'event_label': filename
        });
    }
    
    // Increment local counter
    const downloadCount = document.getElementById('downloadCount');
    if (downloadCount) {
        let count = parseInt(downloadCount.textContent.replace(/,/g, ''));
        count++;
        downloadCount.textContent = count.toLocaleString();
    }
};