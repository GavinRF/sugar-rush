// Exploding candy button effect
        function addExplosion(button, event) {
            if (event) event.preventDefault();
            
            button.classList.add('explode');
            
            // Create sparkles
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('iconify-icon');
                sparkle.setAttribute('icon', ['mdi:star', 'mdi:star-four-points', 'mdi:sparkles', 'mdi:star-circle'][Math.floor(Math.random() * 4)]);
                sparkle.style.position = 'absolute';
                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.transform = 'translate(-50%, -50%)';
                sparkle.style.fontSize = '1.5rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                
                button.appendChild(sparkle);
                
                const angle = (360 / 8) * i;
                const distance = 60;
                const x = Math.cos(angle * Math.PI / 180) * distance;
                const y = Math.sin(angle * Math.PI / 180) * distance;
                
                sparkle.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                });
                
                setTimeout(() => sparkle.remove(), 600);
            }
            
            setTimeout(() => button.classList.remove('explode'), 600);
        }

        // Form submission handler
        function handleSubmit(event) {
            event.preventDefault();
            alert('Thank you for reaching out! We\'ll get back to you soon! 🍭');
            event.target.reset();
        }

        // Scroll to contact form
        function scrollToContact() {
            const contactSection = document.querySelector('.contact-section');
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.info-card, .gallery-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Magic Dust Sparkles around H1
        (() => {
            const head = document.getElementsByTagName('head')[0];
            let animationId = 1;

            function CreateMagicDust(x1, x2, y1, y2, sizeRatio, fallingTime, animationDelay, node = 'hero-content') {
                let dust = document.createElement('span');
                let animation = document.createElement('style');
                animation.innerHTML = `
                @keyframes blink${animationId} {
                    0% {
                        top: ${y1}px;
                        left: ${x1}px;
                        width: ${2*sizeRatio}px;
                        height: ${2*sizeRatio}px;
                        opacity: .4
                    }
                    20% {
                        width: ${4*sizeRatio}px;
                        height: ${4*sizeRatio}px;
                        opacity: .8
                    }
                    35% {
                        width: ${2*sizeRatio}px;
                        height: ${2*sizeRatio}px;
                        opacity: .5
                    }
                    55% {
                        width: ${3*sizeRatio}px;
                        height: ${3*sizeRatio}px;
                        opacity: .7
                    }
                    80% {
                        width: ${sizeRatio}px;
                        height: ${sizeRatio}px;
                        opacity: .3
                    }
                    100% {
                        top: ${y2}px;
                        left: ${x2}px;
                        width: 0px;
                        height: 0px;
                        opacity: .1
                    }
                }`;
                head.appendChild(animation);
                dust.classList.add('dustDef');
                dust.setAttribute('style', `animation: blink${animationId++} ${fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${animationDelay}s`);
                const container = document.querySelector('.hero-content');
                if (container) {
                    container.appendChild(dust);
                }
            }

            // Generate random falling sparkles from the H1 text
            // Get the H1 position to spawn sparkles from it
            const h1 = document.querySelector('h1');
            if (h1) {
                const h1Rect = h1.getBoundingClientRect();
                const heroContent = document.querySelector('.hero-content');
                const heroRect = heroContent.getBoundingClientRect();

                // Calculate relative position within hero-content
                const h1Top = h1Rect.top - heroRect.top + 40;
                const h1Left = h1Rect.left - heroRect.left;
                const h1Width = h1Rect.width;
                const h1Height = h1Rect.height;

                // Create 30+ sparkles with randomized positions
                const sparkles = [];
                for (let i = 0; i < 33; i++) {
                    // Random horizontal position across the title width
                    const startX = h1Left + Math.random() * h1Width;
                    // Slight horizontal drift as it falls
                    const endX = startX + (Math.random() * 60 - 30);

                    // Start from within the H1 text area
                    const startY = h1Top + Math.random() * h1Height;
                    // Fall down to various distances
                    const endY = startY + 150 + Math.random() * 250;

                    // Random size
                    const size = 0.42 + Math.random() * 0.62;

                    // Random duration (how fast it falls)
                    const duration = 2 + Math.random() * 3;

                    // Random delay for staggered effect
                    const delay = Math.random() * 4;

                    sparkles.push([startX, endX, startY, endY, size, duration, delay]);
                }

                sparkles.forEach((o) => CreateMagicDust(...o));
            }
        })();

        // Initialize Splitting.js for H1 character animation
        document.addEventListener('DOMContentLoaded', () => {
            Splitting();
        });