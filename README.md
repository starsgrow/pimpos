# Pimpos Gym - Landing Page con Chat Webhook

Una landing page moderna para Pimpos Gym, gimnasio tradicional ubicado en el centro de la ciudad, con colores rojos y sistema de chat integrado con webhooks para n8n.

## 🏋️ Características

- **Diseño Responsivo**: Se adapta a todos los dispositivos
- **Paleta de Colores Roja**: Tema deportivo y energético
- **Chat en Tiempo Real**: Widget de chat integrado
- **Webhooks para n8n**: Integración completa con n8n
- **Formulario de Contacto**: Con envío automático a webhook
- **Animaciones Suaves**: Efectos visuales modernos

## 📁 Estructura del Proyecto

```
pimpos cursor/
├── index.html                    # Página principal
├── styles.css                    # Estilos CSS
├── script.js                     # JavaScript y funcionalidad
├── n8n-webhook-example.json      # Ejemplo workflow chat
├── n8n-contact-webhook.json      # Ejemplo workflow contacto
├── package.json                  # Configuración desarrollo
└── README.md                     # Este archivo
```

## 🚀 Instalación

1. **Clona o descarga** los archivos en tu servidor web
2. **Configura los webhooks** en n8n (ver sección de configuración)
3. **Abre index.html** en tu navegador

## ⚙️ Configuración de n8n

### 1. Webhook para Chat

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
   - Devuelve JSON con formato: `{"reply": "Respuesta del bot"}`

### 2. Webhook para Contacto

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

## 🎨 Personalización

### Colores
Los colores principales están definidos en `styles.css`:
- **Rojo Principal**: `#dc2626`
- **Rojo Oscuro**: `#b91c1c`
- **Rojo Claro**: `#fecaca`

### Contenido
La landing page ya incluye la información específica de Pimpos Gym:
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

## 🔒 Seguridad

- **HTTPS**: Usa siempre HTTPS en producción
- **Validación**: Valida los datos en n8n antes de procesarlos
- **Rate Limiting**: Implementa límites de velocidad en n8n
- **Autenticación**: Considera añadir autenticación a los webhooks

## 📊 Monitoreo

En n8n puedes:
- Ver logs de todos los mensajes recibidos
- Monitorear el rendimiento de los webhooks
- Configurar alertas para errores
- Analizar patrones de uso del chat

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

## 📞 Soporte

Para problemas específicos de n8n:
- [Documentación oficial de n8n](https://docs.n8n.io/)
- [Comunidad de n8n](https://community.n8n.io/)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

¡Disfruta de tu nueva landing page de Pimpos Gym! 💪 