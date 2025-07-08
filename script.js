// Chat Widget Functionality
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.webhookUrl = 'https://olympo-n8n.bsnk1a.easypanel.host/webhook/4c451ddb-53d6-4a7f-bf22-84af702a4b11'; // Production URL
        this.isProcessing = false; // Flag to prevent multiple simultaneous requests
        
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
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
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
        // Prevent multiple simultaneous requests
        if (this.isProcessing) {
            console.log('Ya hay un mensaje siendo procesado');
            return;
        }
        
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        console.log('Enviando mensaje:', message);
        
        // Set processing flag
        this.isProcessing = true;
        
        // Disable input and send button
        this.chatInput.disabled = true;
        this.chatSend.disabled = true;
        
        try {
            // Add user message to chat
            this.addMessage(message, 'user');
            this.chatInput.value = '';
            
            // Ensure chat stays open
            if (!this.isOpen) {
                this.chatWidget.classList.add('active');
                this.isOpen = true;
            }
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Send message to n8n webhook
            console.log('Enviando a webhook:', this.webhookUrl);
            const response = await this.sendToWebhook(message);
            
            console.log('Respuesta recibida:', response);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add bot response from n8n
            if (response && response.myField) {
                console.log('Respuesta original de n8n:', response.myField);
                console.log('Tipo de respuesta:', typeof response.myField);
                console.log('Longitud de respuesta:', response.myField.length);
                
                // Clean and format the response
                let cleanResponse = response.myField;
                
                // Ensure it's a string
                if (typeof cleanResponse !== 'string') {
                    cleanResponse = String(cleanResponse);
                }
                
                // Normalize line breaks and clean up
                cleanResponse = cleanResponse
                    .replace(/\r\n/g, '\n')  // Normalize Windows line breaks
                    .replace(/\r/g, '\n')    // Convert \r to \n
                    .replace(/\n\n+/g, '\n') // Remove multiple consecutive line breaks
                    .trim();                 // Remove extra spaces
                
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
            // Reset processing flag and re-enable input
            this.isProcessing = false;
            this.chatInput.disabled = false;
            this.chatSend.disabled = false;
            
            // Ensure chat stays open and input is focused
            if (this.isOpen) {
                setTimeout(() => {
                    this.chatInput.focus();
                    this.scrollToBottom();
                }, 100);
            }
        }
    }
    
    async sendToWebhook(message) {
        const payload = {
            message: message,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            page: window.location.href
        };
        
        console.log('Payload enviado:', payload);
        
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        console.log('Status de respuesta:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('Datos de respuesta:', responseData);
        
        return responseData;
    }
    
    addMessage(content, sender) {
        console.log('Añadiendo mensaje:', { content, sender, contentLength: content.length });
        
        // Ensure chat is open when adding messages
        if (!this.isOpen) {
            this.chatWidget.classList.add('active');
            this.isOpen = true;
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Handle line breaks and formatting
        if (sender === 'bot') {
            // For bot messages, preserve line breaks and format properly
            let formattedContent = content;
            
            // Ensure content is a string
            if (typeof formattedContent !== 'string') {
                formattedContent = String(formattedContent);
            }
            
            // Clean and format the content
            formattedContent = formattedContent
                .replace(/&/g, '&amp;')     // Escape HTML entities
                .replace(/</g, '&lt;')      // Escape <
                .replace(/>/g, '&gt;')      // Escape >
                .replace(/"/g, '&quot;')    // Escape "
                .replace(/'/g, '&#39;')     // Escape '
                .replace(/\n/g, '<br>')     // Convert \n to <br>
                .replace(/\r/g, '')         // Remove \r
                .trim();                    // Remove extra spaces
            
            console.log('Contenido formateado:', formattedContent);
            messageContent.innerHTML = formattedContent;
        } else {
            // For user messages, just use text content
            messageContent.textContent = content;
        }
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.chatMessages.appendChild(messageDiv);
        
        // Store message
        this.messages.push({
            content,
            sender,
            timestamp: new Date().toISOString()
        });
        
        // Scroll to bottom after a short delay
        setTimeout(() => this.scrollToBottom(), 50);
        
        console.log('Mensaje añadido exitosamente');
    }
    
    showTypingIndicator() {
        this.removeTypingIndicator(); // Remove any existing indicator
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        typingContent.innerHTML = '<i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i>';
        
        typingDiv.appendChild(typingContent);
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    loadInitialMessages() {
        console.log('Chat inicializado - esperando mensajes de n8n');
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name') || this.form.querySelector('input[type="text"]').value,
            email: formData.get('email') || this.form.querySelector('input[type="email"]').value,
            message: formData.get('message') || this.form.querySelector('textarea').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            // Send to n8n webhook
            await this.sendContactToWebhook(data);
            
            // Show success message
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            console.error('Error sending contact form:', error);
            this.showErrorMessage();
        }
    }
    
    async sendContactToWebhook(data) {
        const webhookUrl = 'https://your-n8n-webhook-url.com/webhook/contact'; // Cambiar por tu URL de n8n
        
        const response = await fetch(webhookUrl, {
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
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = '¡Mensaje Enviado!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }
    
    showErrorMessage() {
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Error - Intenta de Nuevo';
        button.style.background = '#ef4444';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }
}

// Smooth scrolling and animations
class Animations {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeElements();
        this.addScrollEffects();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe service cards, class cards, and price cards
        document.querySelectorAll('.service-card, .class-card, .price-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    addScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
    new ContactForm();
    new Animations();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .class-card, .price-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in, .class-card.animate-in, .price-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .typing-indicator .message-content {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    
    .typing-indicator i {
        width: 8px;
        height: 8px;
        background: #999;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-indicator i:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator i:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style); 