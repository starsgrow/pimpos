# 🏋️ Pimpos Gym - Landing Page Mejorada

Una landing page moderna y completamente optimizada para Pimpos Gym, gimnasio tradicional ubicado en el centro de la ciudad. Diseño responsive con paleta de colores roja, sistema de chat integrado con webhooks para n8n, y funcionalidades avanzadas.

## ✨ Características Principales

### 🎨 **Diseño y UX**
- **Diseño Responsivo**: Se adapta perfectamente a todos los dispositivos
- **Paleta de Colores Roja**: Tema deportivo y energético
- **Animaciones Suaves**: Efectos visuales modernos con AOS (Animate On Scroll)
- **Loading Screen**: Pantalla de carga elegante
- **Scroll Effects**: Efectos de scroll interactivos
- **Contador Animado**: Estadísticas animadas en el hero

### 💬 **Chat Inteligente**
- **Widget de Chat en Tiempo Real**: Integrado con n8n
- **Indicador de Escritura**: Muestra cuando el bot está procesando
- **Historial de Mensajes**: Persistencia de conversación
- **Avatares**: Iconos distintivos para usuario y bot
- **Notificaciones**: Indicador de mensajes nuevos

### 📱 **Funcionalidades Avanzadas**
- **PWA (Progressive Web App)**: Instalable como app nativa
- **Service Worker**: Funcionalidad offline y cache
- **Modales Interactivos**: Para clases, precios y galería
- **Formulario Mejorado**: Con validación y campos adicionales
- **Navegación Suave**: Scroll automático a secciones
- **Menú Mobile**: Navegación optimizada para móviles

### 🎯 **SEO Optimizado**
- **Meta Tags Completos**: Open Graph, Twitter Cards
- **Sitemap XML**: Para indexación de buscadores
- **Robots.txt**: Configuración para crawlers
- **Estructura Semántica**: HTML5 semántico
- **Schema Markup**: Datos estructurados

## 🚀 Nuevas Secciones

### 📊 **Estadísticas Animadas**
- Miembros activos: 500+
- Años de experiencia: 15+
- Clases diarias: 3+

### 📅 **Horarios Detallados**
- Vista semanal completa
- Información de clases por día
- Horarios de gimnasio libre

### 💬 **Testimonios**
- Historias reales de miembros
- Avatares y fechas de membresía
- Diseño de tarjetas elegante

### 🖼️ **Galería de Instalaciones**
- Área de pesas
- Sala de clases
- Estacionamiento
- Vestidores

### 📋 **Servicios Expandidos**
- 6 servicios principales
- Iconos animados
- Descripciones detalladas
- Características específicas

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Clases, Async/Await, Fetch API
- **AOS Library**: Animaciones de scroll
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Roboto
- **n8n**: Automatización de webhooks

## 📁 Estructura del Proyecto

```
pimpos-gym/
├── index.html                    # Página principal mejorada
├── styles.css                    # Estilos CSS modernos
├── script.js                     # JavaScript mejorado
├── manifest.json                 # PWA manifest
├── sw.js                         # Service Worker
├── robots.txt                    # Configuración SEO
├── sitemap.xml                   # Sitemap para SEO
├── n8n-webhook-example.json      # Ejemplo workflow chat
├── n8n-contact-webhook.json      # Ejemplo workflow contacto
├── package.json                  # Configuración desarrollo
└── README.md                     # Este archivo
```

## 🚀 Instalación y Uso

### 1. **Clona o descarga** los archivos en tu servidor web

### 2. **Configura los webhooks** en n8n (ver sección de configuración)

### 3. **Abre index.html** en tu navegador

### 4. **Para desarrollo local**:
```bash
npm install
npm run dev
```

## ⚙️ Configuración de n8n

### 1. **Webhook para Chat**

Crea un nuevo workflow en n8n con:

1. **Webhook Node**:
   - Método: POST
   - Path: `/webhook/chat`
   - URL: `https://tu-dominio.com/webhook/chat`

2. **Procesamiento del Mensaje**:
   - Añade un **Code Node** para procesar el mensaje
   - Implementa lógica de respuesta automática
   - Conecta con servicios como ChatGPT, base de datos, etc.

3. **Respuesta**:
   - Añade un **Respond to Webhook Node**
   - Devuelve JSON con formato: `{"myField": "Respuesta del bot"}`

### 2. **Webhook para Contacto**

Crea otro workflow para el formulario de contacto:

1. **Webhook Node**:
   - Método: POST
   - Path: `/webhook/contact`
   - URL: `https://tu-dominio.com/webhook/contact`

2. **Procesamiento**:
   - **Email Node**: Enviar email de notificación
   - **Database Node**: Guardar en base de datos
   - **CRM Integration**: Conectar con tu CRM

## 🔧 Configuración de URLs

En `script.js`, actualiza las URLs de los webhooks:

```javascript
// Línea 6 - Chat webhook
this.webhookUrl = 'https://tu-n8n-instancia.com/webhook/chat';

// Línea 108 - Contact webhook  
const webhookUrl = 'https://tu-n8n-instancia.com/webhook/contact';
```

## 📱 Funcionalidades del Chat

- **Mensajes en tiempo real** entre usuario y bot
- **Indicador de escritura** mientras procesa
- **Historial de mensajes** en la sesión
- **Integración con n8n** para respuestas automáticas
- **Datos de contexto** (user agent, página, timestamp)
- **Avatares personalizados** para usuario y bot
- **Notificaciones** de mensajes nuevos

## 🎨 Personalización

### Colores
Los colores principales están definidos en `styles.css` usando variables CSS:
```css
:root {
    --primary-color: #dc2626;
    --primary-dark: #b91c1c;
    --primary-light: #fecaca;
    --accent-color: #f59e0b;
}
```

### Contenido
La landing page incluye información específica de Pimpos Gym:
- **Horarios**: Lunes a viernes 5:00 AM - 9:20 PM, Sábados 8:00 AM - 12:30 PM
- **Precios**: Mensual $68,000, Estudiante $60,000, Pases desde $55,000
- **Clases**: Rumba, Functional, Ritmos Latinos de lunes a jueves 7:30 PM
- **Servicios**: Estacionamiento gratis, duchas, suplementos
- **Ubicación**: Centro de la ciudad, cerca de la plaza del carnaval

## 🌐 Despliegue

### Opción 1: Servidor Web Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

### Opción 2: Hosting Web
- Sube los archivos a tu servidor web
- Configura HTTPS para los webhooks
- Asegúrate de que n8n esté accesible públicamente

### Opción 3: CDN/Static Hosting
- Netlify, Vercel, GitHub Pages
- Configura el dominio personalizado
- Activa HTTPS automático

## 🔒 Seguridad

- **HTTPS**: Usa siempre HTTPS en producción
- **Validación**: Valida los datos en n8n antes de procesarlos
- **Rate Limiting**: Implementa límites de velocidad en n8n
- **Autenticación**: Considera añadir autenticación a los webhooks
- **CSP**: Content Security Policy para protección adicional

## 📊 Monitoreo

En n8n puedes:
- Ver logs de todos los mensajes recibidos
- Monitorear el rendimiento de los webhooks
- Configurar alertas para errores
- Analizar patrones de uso del chat
- Generar reportes de contacto

## 🛠️ Solución de Problemas

### Chat no funciona
1. Verifica que las URLs de webhook sean correctas
2. Asegúrate de que n8n esté ejecutándose
3. Revisa la consola del navegador para errores
4. Verifica que los webhooks estén activos en n8n

### Formulario no envía
1. Verifica la URL del webhook de contacto
2. Asegúrate de que todos los campos estén completos
3. Revisa los logs de n8n para errores

### Estilos no se cargan
1. Verifica que `styles.css` esté en la misma carpeta
2. Asegúrate de que el servidor web sirva archivos CSS
3. Revisa la consola del navegador para errores 404

### PWA no funciona
1. Verifica que el manifest.json esté accesible
2. Asegúrate de que el service worker esté registrado
3. Revisa que estés usando HTTPS en producción

## 📱 PWA Features

- **Instalable**: Se puede instalar como app nativa
- **Offline**: Funciona sin conexión a internet
- **Push Notifications**: Notificaciones push (configurable)
- **App-like Experience**: Experiencia similar a app nativa

## 🎯 Mejoras de Rendimiento

- **Lazy Loading**: Carga diferida de imágenes
- **Minificación**: CSS y JS optimizados
- **Caching**: Service worker para cache inteligente
- **Compresión**: Gzip/Brotli para archivos estáticos
- **CDN**: Uso de CDN para recursos externos

## 📞 Soporte

Para problemas específicos de n8n:
- [Documentación oficial de n8n](https://docs.n8n.io/)
- [Comunidad de n8n](https://community.n8n.io/)

Para problemas de la web:
- Revisa la consola del navegador
- Verifica la configuración de webhooks
- Comprueba la conectividad de red

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🔄 Changelog

### v2.0.0 (2024-01-01)
- ✨ Diseño completamente renovado
- 🎨 Nueva paleta de colores y animaciones
- 📱 Funcionalidad PWA completa
- 💬 Chat mejorado con avatares
- 📊 Nuevas secciones: testimonios, galería, horarios
- 🔧 SEO optimizado
- ⚡ Mejoras de rendimiento
- 📱 Mejor experiencia mobile

### v1.0.0 (2023-12-01)
- 🎉 Lanzamiento inicial
- 📄 Landing page básica
- 💬 Chat con n8n
- 📝 Formulario de contacto

---

¡Disfruta de tu nueva landing page de Pimpos Gym! 💪

**Desarrollado con ❤️ para Pimpos Gym** 