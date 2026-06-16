// BASE DE DATOS DE PRODUCTOS (Para las consultas de stock en tiempo real)
const productos = [
    { brand: 'Apple', name: 'iPhone 15 Pro Max', precio: 1150 },
    { brand: 'Apple', name: 'iPhone 14 Pro Max', precio: 890 },
    { brand: 'Apple', name: 'iPhone 13 Pro 128GB', precio: 550 },
    { brand: 'Samsung', name: 'Galaxy S24 Ultra', precio: 980 },
    { brand: 'Samsung', name: 'Galaxy S23 Plus', precio: 720 },
    { brand: 'Xiaomi', name: 'Redmi Note 13 Pro', precio: 290 }
];

// ARQUITECTURA DEL CHATBOT INTELIGENTE POR PALABRAS CLAVE
const chatRespuestas = {
    saludos: {
        keywords: ['hola', 'buenas', 'buen dia', 'buenas tardes', 'buenas noches', 'que tal', 'alo'],
        respuesta: '¡Hola! 👋 Bienvenido a nuestra tienda virtual. Estoy listo para ayudarte a encontrar tu próximo teléfono. ¿Buscas alguna marca en específico o tienes alguna duda sobre nuestros servicios?'
    },
    despedidas: {
        keywords: ['adios', 'chao', 'nos vemos', 'hasta luego', 'bye'],
        respuesta: '¡Gracias por visitarnos! 😊 Si necesitas algo más, aquí estaré. ¡Que tengas un excelente día!'
    },
    agradecimientos: {
        keywords: ['gracias', 'ty', 'excelente', 'buenisimo', 'ok', 'perfecto'],
        respuesta: '¡A la orden! 👍 ¿Hay algo más en lo que te pueda colaborar hoy?'
    },
    cambios: {
        keywords: ['cambio', 'reciben', 'recibes', 'tomar', 'como parte de pago', 'usado como pago', 'permuta'],
        respuesta: '¡Claro que sí! 🔄 Evaluamos tu teléfono actual para que lo uses como parte de pago de tu nuevo equipo. Nos traes el móvil o nos mandas fotos, evaluamos pantalla/batería en 15 minutos y te damos el saldo a favor.'
    },
    delivery: {
        keywords: ['delivery', 'envio', 'mandar', 'domicilio', 'interior', 'pueblo', 'enviar', 'motoconcho', 'transporte'],
        respuesta: '🚀 <b>¡Hacemos envíos a todas partes!</b><br>• <b>Santo Domingo:</b> Delivery express en menos de 2 horas (costo varía según la zona).<br>• <b>Provincias/Interior:</b> Envío asegurado por la agencia de tu preferencia (Metro Pac, Caribe Pack, Aptra, etc.) directo a tu localidad.'
    },
    ubicacion: {
        keywords: ['donde', 'ubicacion', 'direccion', 'tienda', 'local', 'sucursal', 'estan', 'ubicados', 'waze', 'maps'],
        respuesta: '📍 <b>Nuestra Tienda Física:</b><br>Estamos ubicados en la <b>Av. 27 de Febrero</b>, casi esquina Lincoln, Santo Domingo.<br><br>🕒 <b>Horario:</b> Lunes a Sábado de 9:00 AM a 7:30 PM.<br>🛒 ¡También puedes comprar online con envío rápido!'
    },
    garantia: {
        keywords: ['garantia', 'aseguran', 'descompone', 'fallo', 'reparacion', 'daño', 'descompuesto'],
        respuesta: '🛡️ <b>Tu compra está protegida:</b><br>• 📱 <b>Equipos Nuevos:</b> 1 año de garantía total de fábrica.<br>• ♻️ <b>Equipos Usados:</b> 3 meses de garantía en nuestra tienda para tu total tranquilidad. Nota: No cubre daños por agua o golpes.'
    },
    pagos: {
        keywords: ['pago', 'pagar', 'tarjeta', 'efectivo', 'transferencia', 'dolares', 'pesos', 'banco', 'bhd', 'popular', 'reservas'],
        respuesta: '💳 <b>Métodos de pago aceptados:</b><br>• Efectivo (Pesos o Dólares al cambio del día).<br>• Transferencia bancaria (Popular, BHD, Banreservas).<br>• Tarjetas de crédito/débito (aplican comisiones de la red).<br>• Financiamiento disponible.'
    },
    financiamiento: {
        keywords: ['financiamiento', 'financian', 'cuotas', 'fiado', 'prestamo', 'credito', 'inicial'],
        respuesta: '💰 <b>¡Llévatelo a cuotas!</b><br>Trabajamos con las principales financieras del país. Requisitos básicos:<br>1️⃣ Cédula de identidad física (dominicana).<br>2️⃣ Ingresos comprobables o estados de cuenta.<br>3️⃣ Buen historial de crédito.<br><br>Escríbenos detallando qué equipo quieres y si cumples los requisitos para pre-evaluarte.'
    },
    
    // --- NUEVAS CATEGORÍAS AGREGADAS ---
    
    condicion_bateria: {
        keywords: ['bateria', 'condicion', 'porcentaje', 'vida de la bateria', 'estado', 'usados', 'grado'],
        respuesta: '🔋 <b>Estado de nuestros equipos usados:</b><br>Todos nuestros dispositivos de exhibición y usados están categorizados como <b>Grado A</b> (condición estética impecable 9/10 o superior). La vida útil de la batería en iPhones usados se encuentra siempre entre el <b>85% y el 100%</b>. ¡Están como nuevos!'
    },
    accesorios: {
        keywords: ['accesorio', 'cargador', 'cable', 'cover', 'estuche', 'mica', 'pantalla', 'audifonos', 'airpods'],
        respuesta: '🔌 <b>Accesorios y Complementos:</b><br>¡Contamos con todo lo necesario para proteger tu inversión! Ofrecemos:<br>• Cargadores de carga rápida originales (Apple de 20W/35W y Samsung Super Fast Charging).<br>• Micas de cristal templado y fundas de alta resistencia.<br>• AirPods y audífonos inalámbricos. Si compras un teléfono hoy, ¡te llevas un 20% de descuento en accesorios!'
    },
    apartados: {
        keywords: ['apartar', 'apartado', 'reservar', 'reserva', 'guardar', 'abono'],
        respuesta: '📌 <b>Políticas de Apartado:</b><br>¿Te enamoraste de un equipo pero necesitas unos días? Puedes apartar cualquier teléfono con solo un <b>20% de su valor</b>. Te lo guardamos por un máximo de <b>15 días</b> para que pases a liquidarlo. ¡Asegura el tuyo antes de que se agote!'
    },
    compra_directa: {
        keywords: ['compran', 'compras', 'vender', 'vendo', 'comprame', 'compran celulares'],
        respuesta: '💵 <b>¿Quieres vender tu teléfono?</b><br>¡Compramos tu equipo de forma directa! Compramos iPhones (del 12 en adelante) y Samsung de gama alta. El equipo debe estar libre de bloqueos de iCloud/Google y contar con su cédula para fines de contrato de compraventas. Escríbenos qué modelo tienes y su estado para cotizar.'
    },
    servicio_tecnico: {
        keywords: ['reparan', 'reparacion', 'arreglo', 'arreglar', 'pantalla rota', 'cambiar bateria', 'tecnico'],
        respuesta: '🛠️ <b>Laboratorio Técnico CellMax:</b><br>¿Tu teléfono actual falló o se le rompió la pantalla? Contamos con servicio técnico express:<br>• Cambios de pantalla y baterías en menos de 45 minutos.<br>• Reparaciones de puerto de carga y software.<br>• Diagnóstico inicial sin costo. ¡Trae tu equipo hoy mismo!'
    },
    humano: {
        keywords: ['humano', 'persona', 'asesor', 'agente', 'representante', 'vendedor', 'hablar con alguien', 'atencion al cliente'],
        respuesta: '👤 <b>Transfiriendo a un asesor humano...</b><br>Entendido. He pausado mis respuestas automáticas. Uno de nuestros vendedores de la tienda física tomará este chat en un momento para darte una atención personalizada. ¡Por favor, no cierres la ventana!'
    }
};

// LISTADO DE CHATS PARA LA BARRA LATERAL
const contactos = [
    {
        id: 1,
        nombre: "Soporte CellMax 🛠️",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
        hora: "Ahora",
        ultimoMensaje: "¡Hola! Bienvenido a nuestra tienda virtual...",
        esChatbot: true,
        mostrarOpciones: true, // <--- CONTROLADOR DEL MENÚ INICIAL
        conversacion: [
            { texto: "¡Hola! 👋 Bienvenido a nuestra tienda virtual. Estoy listo para ayudarte a encontrar tu próximo teléfono. ¿Buscas alguna marca en específico (iPhone, Samsung, Xiaomi) o tienes dudas de ubicación, delivery o financiamiento?", emisor: "received", tiempo: "Ahora" }
        ],
        opciones: [
            { texto: "📱 Ver Inventario Apple", consulta: "iphone" },
            { texto: "🔹 Ver Inventario Samsung", consulta: "samsung" },
            { texto: "📍 Dirección y Horarios", consulta: "ubicacion" },
            { texto: "💰 Requisitos Financiamiento", consulta: "financiamiento" }
        ]
    },
    {
        id: 2,
        nombre: "Juan Pérez (Ventas)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        hora: "14:32",
        ultimoMensaje: "Bro, te envié los precios del iPhone 15 por correo.",
        esChatbot: false,
        conversacion: [
            { texto: "Hola Juan, ¿tienen stock del Galaxy S24?", emisor: "received", tiempo: "14:28" },
            { texto: "¡Qué tal! Sí, nos quedan un par en color gris titanio.", emisor: "sent", tiempo: "14:30" },
            { texto: "Bro, te envié los precios del iPhone 15 por correo.", emisor: "received", tiempo: "14:32" }
        ],
        respuestasBot: ["¡De acuerdo!", "Quedo atento.", "Excelente."]
    }
];

let chatActivoId = 1;

// ELEMENTOS DEL DOM
const chatsListContainer = document.getElementById('chats-list');
const conversationContainer = document.getElementById('conversation-body');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const micIcon = document.getElementById('mic-icon');

const activeAvatar = document.getElementById('active-avatar');
const activeName = document.getElementById('active-name');
const activeState = document.getElementById('active-state');

function renderSidebar() {
    chatsListContainer.innerHTML = contactos.map(c => `
        <div class="contact-row ${c.id === chatActivoId ? 'active' : ''}" onclick="seleccionarChat(${c.id})">
            <div class="avatar">
                <img src="${c.avatar}" alt="${c.nombre}">
            </div>
            <div class="contact-info">
                <div class="contact-header-meta">
                    <h4>${c.nombre}</h4>
                    <span class="chat-time">${c.hora}</span>
                </div>
                <div class="contact-sub-meta">
                    <p class="last-msg">${c.ultimoMensaje}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function seleccionarChat(id) {
    chatActivoId = id;
    const contacto = contactos.find(c => c.id === id);
    
    activeAvatar.src = contacto.avatar;
    activeName.textContent = contacto.nombre;
    activeState.textContent = "En línea";

    renderSidebar();
    renderMensajes();
}

function obtenerHoraActual() {
    const ahora = new Date();
    return ahora.getHours().toString().padStart(2, '0') + ':' + ahora.getMinutes().toString().padStart(2, '0');
}

function renderMensajes() {
    const contacto = contactos.find(c => c.id === chatActivoId);
    
    let htmlMensajes = contacto.conversacion.map(m => {
        const esEnviado = m.emisor === 'sent';
        return `
            <div class="message-bubble ${m.emisor}">
                <span>${m.texto}</span>
                <div class="msg-meta">
                    <span>${m.tiempo}</span>
                    ${esEnviado ? '<i class="ti ti-checks read-check"></i>' : ''}
                </div>
            </div>
        `;
    }).join('');

    // Evaluamos si el chatbot tiene permitido mostrar las opciones actualmente
    if (contacto.esChatbot && contacto.mostrarOpciones && contacto.opciones && contacto.opciones.length > 0) {
        htmlMensajes += `
            <div class="message-bubble received" style="background: none; padding: 0; box-shadow: none; max-width: 80%; gap: 6px; display: flex; flex-direction: column; margin-top: 4px;">
                <p style="color: #8696a0; font-size: 11px; margin-bottom: 2px; padding-left: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Respuestas sugeridas:</p>
                ${contacto.opciones.map(opc => `
                    <button class="chatbot-option-btn" onclick="procesarOpcionBot('${opc.texto}')" style="background-color: #202c33; border: 1px solid rgba(255,255,255,0.08); color: #53bdeb; padding: 10px 16px; border-radius: 8px; text-align: left; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background 0.2s; width: 100%;">
                        ${opc.texto}
                    </button>
                `).join('')}
            </div>
        `;
    }

    conversationContainer.innerHTML = htmlMensajes;
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}

function procesarOpcionBot(textoMenu) {
    messageInput.value = textoMenu;
    enviarMensaje();
}

function obtenerRespuestaBot(textoUsuario) {
    const cleanText = textoUsuario.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (cleanText.includes('iphone') || cleanText.includes('apple')) {
        const list = productos.filter(p => p.brand === 'Apple').map(p => `${p.name} ($${p.precio})`);
        return `🍏 <b>Modelos de iPhone en stock:</b><br>• ${list.join('<br>• ')}.<br><br>💡 Recuerda que puedes usar el <b>comparador</b> en nuestro sitio para evaluar detalles técnicos.`;
    } 
    if (cleanText.includes('samsung') || cleanText.includes('galaxy')) {
        const list = productos.filter(p => p.brand === 'Samsung').map(p => `${p.name} ($${p.precio})`);
        return `🔹 <b>Modelos Samsung en stock:</b><br>• ${list.join('<br>• ')}.<br><br>¿Te interesa financiamiento o pago en efectivo para alguno?`;
    } 
    if (cleanText.includes('xiaomi') || cleanText.includes('redmi')) {
        const list = productos.filter(p => p.brand === 'Xiaomi').map(p => `${p.name} ($${p.precio})`);
        return `🔸 <b>Modelos Xiaomi en stock:</b><br>• ${list.join('<br>• ')}.<br><br>Excelente balance de rendimiento y batería de larga duración.`;
    } 

    for (const categoria in chatRespuestas) {
        if (chatRespuestas[categoria].keywords.some(kw => cleanText.includes(kw))) {
            return chatRespuestas[categoria].respuesta;
        }
    }

    return '🤔 No logré entenderte del todo. Puedes consultarme directamente sobre <b>ubicación, envíos, métodos de pago, financiamiento, garantías o inventario de teléfonos</b>.';
}

function enviarMensaje() {
    const texto = messageInput.value.trim();
    if (!texto) return;

    const contacto = contactos.find(c => c.id === chatActivoId);
    const tiempo = obtenerHoraActual();

    // Si interactúa con el chatbot, desactivamos las opciones iniciales permanentemente
    if (contacto.esChatbot) {
        contacto.mostrarOpciones = false;
    }

    contacto.conversacion.push({ texto: texto, emisor: 'sent', tiempo: tiempo });
    contacto.ultimoMensaje = texto;
    contacto.hora = tiempo;

    messageInput.value = '';
    micIcon.className = "ti ti-microphone";

    // Re-renderizamos para que se limpie el bloque de botones inmediatamente
    renderMensajes();
    renderSidebar();

    setTimeout(() => {
        activeState.textContent = "Escribiendo...";
        
        setTimeout(() => {
            let respuestaFinal = "";

            if (contacto.esChatbot) {
                respuestaFinal = obtenerRespuestaBot(texto);
            } else {
                const alternativas = contacto.respuestasBot || ["¡Ok!", "Copiado."];
                respuestaFinal = alternativas[Math.floor(Math.random() * alternativas.length)];
            }

            contacto.conversacion.push({ texto: respuestaFinal, emisor: 'received', tiempo: obtenerHoraActual() });
            contacto.ultimoMensaje = respuestaFinal.replace(/<[^>]*>/g, '');
            
            activeState.textContent = "En línea";
            renderMensajes();
            renderSidebar();
        }, 1000);
    }, 500);
}

// LISTENERS DE TECLADO Y CONTROLES
messageInput.addEventListener('input', () => {
    micIcon.className = messageInput.value.trim().length > 0 ? "ti ti-send" : "ti ti-microphone";
});

sendBtn.addEventListener('click', enviarMensaje);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') enviarMensaje();
});

// ARRANQUE AUTOMÁTICO
document.addEventListener("DOMContentLoaded", () => {
    seleccionarChat(chatActivoId);
});

// EXPORTACIÓN DE FUNCIONES AL ENTORNO GLOBAL
window.seleccionarChat = seleccionarChat;
window.procesarOpcionBot = procesarOpcionBot;