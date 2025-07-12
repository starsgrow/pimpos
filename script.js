// Pimpos Gym - Enhanced JavaScript
class PimposGym {
    constructor() {
        this.init();
    }

    init() {
        this.initLoadingScreen();
        this.initAnimations();
        this.initNavigation();
        this.initScrollEffects();
        this.initCounters();
        this.initModals();
        this.initChat();
        this.initContactForm();
        this.initSmoothScrolling();
        this.initMobileMenu();
        this.initHeaderScroll();
    }

    // Loading Screen
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            // Ocultar inmediatamente si hay problemas
            loadingScreen.style.display = 'none';
        }
    }

    // AOS Animations
    initAnimations() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    }

    // Navigation
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Header Scroll Effect
    initHeaderScroll() {
        const header = document.getElementById('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Scroll Effects
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter Animation
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Modals
    initModals() {
        // Class Modal
        window.openClassModal = (classType) => {
            const modal = document.getElementById('classModal');
            const title = document.getElementById('modalClassTitle');
            const body = document.getElementById('modalClassBody');

            const classData = {
                rumba: {
                    title: 'Clase de Rumba',
                    content: `
                        <div class="modal-class-info">
                            <div class="class-detail">
                                <h4><i class="fas fa-clock"></i> Horario</h4>
                                <p>Lunes y Miércoles - 7:30 PM</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-stopwatch"></i> Duración</h4>
                                <p>60 minutos</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-users"></i> Nivel</h4>
                                <p>Todos los niveles</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-music"></i> Descripción</h4>
                                <p>Baila y diviértete con ritmos latinos mientras quemas calorías. Esta clase combina movimientos de baile con ejercicios cardiovasculares para un entrenamiento completo y divertido.</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-dumbbell"></i> Beneficios</h4>
                                <ul>
                                    <li>Mejora la coordinación</li>
                                    <li>Quema calorías</li>
                                    <li>Reduce el estrés</li>
                                    <li>Fortalece el sistema cardiovascular</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                functional: {
                    title: 'Clase de Functional',
                    content: `
                        <div class="modal-class-info">
                            <div class="class-detail">
                                <h4><i class="fas fa-clock"></i> Horario</h4>
                                <p>Martes - 7:30 PM</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-stopwatch"></i> Duración</h4>
                                <p>45 minutos</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-users"></i> Nivel</h4>
                                <p>Intermedio - Avanzado</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-fire"></i> Descripción</h4>
                                <p>Entrenamiento funcional que mejora la fuerza, resistencia y movilidad usando movimientos naturales del cuerpo y equipos especializados.</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-dumbbell"></i> Beneficios</h4>
                                <ul>
                                    <li>Aumenta la fuerza funcional</li>
                                    <li>Mejora la movilidad</li>
                                    <li>Previene lesiones</li>
                                    <li>Desarrolla estabilidad</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                ritmos: {
                    title: 'Clase de Ritmos Latinos',
                    content: `
                        <div class="modal-class-info">
                            <div class="class-detail">
                                <h4><i class="fas fa-clock"></i> Horario</h4>
                                <p>Jueves - 7:30 PM</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-stopwatch"></i> Duración</h4>
                                <p>60 minutos</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-users"></i> Nivel</h4>
                                <p>Todos los niveles</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-dancing"></i> Descripción</h4>
                                <p>Mueve tu cuerpo con ritmos caribeños y mejora tu coordinación. Aprende pasos de salsa, merengue, bachata y más.</p>
                            </div>
                            <div class="class-detail">
                                <h4><i class="fas fa-dumbbell"></i> Beneficios</h4>
                                <ul>
                                    <li>Mejora la coordinación</li>
                                    <li>Desarrolla ritmo</li>
                                    <li>Quema calorías</li>
                                    <li>Mejora la postura</li>
                                </ul>
                            </div>
                        </div>
                    `
                }
            };

            if (classData[classType]) {
                title.textContent = classData[classType].title;
                body.innerHTML = classData[classType].content;
                modal.classList.add('active');
            }
        };

        // Pricing Modal
        window.openPricingModal = (planType) => {
            const modal = document.getElementById('pricingModal');
            const title = document.getElementById('modalPricingTitle');
            const body = document.getElementById('modalPricingBody');

            const planData = {
                mensual: {
                    title: 'Plan Mensual',
                    content: `
                        <div class="modal-pricing-info">
                            <div class="pricing-highlight">
                                <h3>$68,000 / mes</h3>
                                <p>Acceso completo a todas las instalaciones</p>
                            </div>
                            <div class="pricing-features">
                                <h4>Incluye:</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Acceso completo en horarios</li>
                                    <li><i class="fas fa-check"></i> Instructores disponibles</li>
                                    <li><i class="fas fa-check"></i> Estacionamiento gratis</li>
                                    <li><i class="fas fa-check"></i> Duchas disponibles</li>
                                    <li><i class="fas fa-check"></i> Acceso a todas las clases</li>
                                    <li><i class="fas fa-check"></i> Equipos modernos</li>
                                </ul>
                            </div>
                            <div class="pricing-cta">
                                <button class="btn btn-primary" onclick="contactUs('Plan Mensual')">
                                    <i class="fas fa-phone"></i> Contactar
                                </button>
                            </div>
                        </div>
                    `
                },
                estudiante: {
                    title: 'Plan Mensual Estudiante',
                    content: `
                        <div class="modal-pricing-info">
                            <div class="pricing-highlight">
                                <h3>$60,000 / mes</h3>
                                <p>Descuento especial para estudiantes</p>
                            </div>
                            <div class="pricing-features">
                                <h4>Incluye todo del plan Mensual +:</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Descuento con carnet</li>
                                    <li><i class="fas fa-check"></i> Clases grupales incluidas</li>
                                    <li><i class="fas fa-check"></i> Acceso a suplementos</li>
                                    <li><i class="fas fa-check"></i> Asesoría nutricional</li>
                                    <li><i class="fas fa-check"></i> Horarios flexibles</li>
                                </ul>
                            </div>
                            <div class="pricing-cta">
                                <button class="btn btn-primary" onclick="contactUs('Plan Estudiante')">
                                    <i class="fas fa-phone"></i> Contactar
                                </button>
                            </div>
                        </div>
                    `
                },
                pases: {
                    title: 'Sistema de Pases',
                    content: `
                        <div class="modal-pricing-info">
                            <div class="pricing-highlight">
                                <h3>Sin compromiso mensual</h3>
                                <p>Paga solo cuando vengas</p>
                            </div>
                            <div class="pricing-features">
                                <h4>Opciones disponibles:</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> 10 entradas: $55,000 (30 días)</li>
                                    <li><i class="fas fa-check"></i> 20 entradas: $75,000 (60 días)</li>
                                    <li><i class="fas fa-check"></i> 30 entradas: $95,000 (90 días)</li>
                                    <li><i class="fas fa-check"></i> Sesión única: $8,000</li>
                                </ul>
                            </div>
                            <div class="pricing-cta">
                                <button class="btn btn-primary" onclick="contactUs('Sistema de Pases')">
                                    <i class="fas fa-phone"></i> Contactar
                                </button>
                            </div>
                        </div>
                    `
                }
            };

            if (planData[planType]) {
                title.textContent = planData[planType].title;
                body.innerHTML = planData[planType].content;
                modal.classList.add('active');
            }
        };

        // Gallery Modal
        window.openGalleryModal = (index) => {
            const modal = document.getElementById('galleryModal');
            const title = document.getElementById('modalGalleryTitle');
            const body = document.getElementById('modalGalleryBody');

            const galleryData = [
                {
                    title: 'Área de Pesas',
                    description: 'Equipos modernos para entrenamiento de fuerza',
                    features: ['Pesas libres', 'Máquinas selectorizadas', 'Área de cardio', 'Instructores disponibles']
                },
                {
                    title: 'Sala de Clases',
                    description: 'Espacio dedicado para clases grupales',
                    features: ['Piso de madera', 'Sistema de sonido', 'Espejos', 'Aire acondicionado']
                },
                {
                    title: 'Estacionamiento',
                    description: 'Estacionamiento gratuito para motos y bicicletas',
                    features: ['Seguridad 24/7', 'Acceso directo', 'Cobertura', 'Bien iluminado']
                },
                {
                    title: 'Vestidores',
                    description: 'Vestidores limpios y seguros',
                    features: ['Duchas con agua fría', 'Casilleros seguros', 'Limpieza diaria', 'Ventilación']
                }
            ];

            if (galleryData[index]) {
                const item = galleryData[index];
                title.textContent = item.title;
                body.innerHTML = `
                    <div class="modal-gallery-info">
                        <div class="gallery-description">
                            <p>${item.description}</p>
                        </div>
                        <div class="gallery-features">
                            <h4>Características:</h4>
                            <ul>
                                ${item.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                modal.classList.add('active');
            }
        };

        // Close Modal
        window.closeModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
        };

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }

    }
}

// Global Functions
window.contactUs = (plan) => {
    if (typeof closeModal === 'function') {
        closeModal('pricingModal');
        closeModal('classModal');
    }
    
    // Scroll to contact form
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Pre-fill the form
        setTimeout(() => {
            const subjectSelect = document.getElementById('contactSubject');
            const messageTextarea = document.getElementById('contactMessage');
            
            if (subjectSelect) {
                subjectSelect.value = 'precios';
            }
            
            if (messageTextarea) {
                messageTextarea.value = `Hola, me interesa el ${plan}. ¿Podrían darme más información?`;
            }
        }, 1000);
    }
};

window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Chat Widget Class
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.webhookUrl = 'https://olympo-n8n.bsnk1a.easypanel.host/webhook/4c451ddb-53d6-4a7f-bf22-84af702a4b11';
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatWidget = document.getElementById('chatWidget');
        this.chatHeader = document.getElementById('chatHeader');
        this.chatClose = document.getElementById('chatClose');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        
        if (!this.chatWidget || !this.chatToggle) {
            console.error('Chat elements not found');
            return;
        }
        
        this.bindEvents();
        this.loadInitialMessages();
    }
    
    bindEvents() {
        // Chat toggle
        this.chatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleChat();
        });
        
        // Chat close
        this.chatClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeChat();
        });
        
        // Send message button
        this.chatSend.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.sendMessage();
        });
        
        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Prevent chat from closing when clicking inside
        this.chatWidget.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Prevent input from losing focus
        this.chatInput.addEventListener('blur', () => {
            if (this.isOpen) {
                setTimeout(() => this.chatInput.focus(), 100);
            }
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWidget.classList.add('active');
            setTimeout(() => {
                this.chatInput.focus();
                this.scrollToBottom();
            }, 100);
        } else {
            this.chatWidget.classList.remove('active');
        }
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatWidget.classList.remove('active');
    }
    
    async sendMessage() {
        if (this.isProcessing) {
            console.log('Ya hay un mensaje siendo procesado');
            return;
        }
        
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        console.log('Enviando mensaje:', message);
        
        this.isProcessing = true;
        this.chatInput.disabled = true;
        this.chatSend.disabled = true;
        
        try {
            this.addMessage(message, 'user');
            this.chatInput.value = '';
            
            if (!this.isOpen) {
                this.chatWidget.classList.add('active');
                this.isOpen = true;
            }
            
            this.showTypingIndicator();
            
            console.log('Enviando a webhook:', this.webhookUrl);
            const response = await this.sendToWebhook(message);
            
            console.log('Respuesta recibida:', response);
            
            this.removeTypingIndicator();
            
            if (response && response.myField) {
                console.log('Respuesta original de n8n:', response.myField);
                console.log('Tipo de respuesta:', typeof response.myField);
                console.log('Longitud de respuesta:', response.myField.length);
                
                let cleanResponse = response.myField;
                
                if (typeof cleanResponse !== 'string') {
                    cleanResponse = String(cleanResponse);
                }
                
                cleanResponse = cleanResponse
                    .replace(/\r\n/g, '\n')
                    .replace(/\r/g, '\n')
                    .replace(/\n\n+/g, '\n')
                    .trim();
                
                console.log('Respuesta limpia:', cleanResponse);
                console.log('Longitud de respuesta limpia:', cleanResponse.length);
                
                if (cleanResponse.length > 0) {
                    this.addMessage(cleanResponse, 'bot');
                } else {
                    console.log('Respuesta vacía después de limpieza');
                    this.addMessage('No se recibió una respuesta válida.', 'bot');
                }
            } else {
                console.log('No hay respuesta válida de n8n');
                console.log('Respuesta completa:', response);
                this.addMessage('Esperando respuesta del servidor...', 'bot');
            }
        } catch (error) {
            console.error('Error completo:', error);
            this.removeTypingIndicator();
            this.addMessage('Error de conexión. Por favor, intenta de nuevo.', 'bot');
        } finally {
            this.isProcessing = false;
            this.chatInput.disabled = false;
            this.chatSend.disabled = false;
                    this.chatInput.focus();
        }
    }
    
    async sendToWebhook(message) {
        const payload = {
            message: message,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            page: window.location.href,
            sessionId: this.getSessionId()
        };
        
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-dumbbell"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messages.push({
            content: content,
            sender: sender,
            timestamp: new Date()
        });
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-dumbbell"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('es-CO', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    getSessionId() {
        let sessionId = localStorage.getItem('chatSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatSessionId', sessionId);
        }
        return sessionId;
    }
    
    loadInitialMessages() {
        // Initial message is already in HTML
    }
}

// Contact Form Class
class ContactForm {
    constructor() {
        this.webhookUrl = 'https://olympo-n8n.bsnk1a.easypanel.host/webhook/contact';
        this.init();
    }
    
    init() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name') || document.getElementById('contactName')?.value,
            email: formData.get('email') || document.getElementById('contactEmail')?.value,
            phone: formData.get('phone') || document.getElementById('contactPhone')?.value,
            subject: formData.get('subject') || document.getElementById('contactSubject')?.value,
            message: formData.get('message') || document.getElementById('contactMessage')?.value,
            timestamp: new Date().toISOString(),
            page: window.location.href
        };
        
        if (!data.name || !data.email || !data.message) {
            this.showErrorMessage('Por favor, completa todos los campos requeridos.');
            return;
        }
        
        try {
            await this.sendContactToWebhook(data);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            console.error('Error sending contact form:', error);
            this.showErrorMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.');
        }
    }
    
    async sendContactToWebhook(data) {
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
        `;
        
        this.form.parentNode.insertBefore(successDiv, this.form);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        this.form.parentNode.insertBefore(errorDiv, this.form);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PimposGym();
    new ChatWidget();
    new ContactForm();
});

// Add CSS for new elements
const additionalStyles = `
    .alert {
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .alert-success {
        background: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
    }
    
    .alert-error {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fca5a5;
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: var(--text-light);
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
    }
    
    .modal-class-info,
    .modal-pricing-info,
    .modal-gallery-info {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .class-detail,
    .pricing-highlight,
    .gallery-description {
        padding: 1rem;
        background: var(--gray-50);
        border-radius: var(--border-radius);
    }
    
    .class-detail h4,
    .pricing-highlight h3,
    .gallery-description h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .pricing-features,
    .gallery-features {
        padding: 1rem;
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--border-radius);
    }
    
    .pricing-features h4,
    .gallery-features h4 {
        color: var(--text-dark);
        margin-bottom: 1rem;
    }
    
    .pricing-features ul,
    .gallery-features ul {
        list-style: none;
        padding: 0;
    }
    
    .pricing-features li,
    .gallery-features li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--gray-100);
    }
    
    .pricing-features li:last-child,
    .gallery-features li:last-child {
        border-bottom: none;
    }
    
    .pricing-features i,
    .gallery-features i {
        color: var(--primary-color);
    }
    
    .pricing-cta {
        text-align: center;
        padding: 1rem;
    }
    
    .pricing-highlight h3 {
        font-size: 2rem;
        font-weight: 900;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .pricing-highlight p {
        color: var(--text-light);
        font-size: 1.1rem;
    }
    
    body.menu-open {
        overflow: hidden;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 