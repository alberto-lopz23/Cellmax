// INVENTARIO DE PRODUCTOS (BASE DE DATOS)
const productos = [
  { id: 1, brand: 'Apple', name: 'iPhone 15 Pro', emoji: '📱', precio: 1199, capacidad: '256', estado: 'Nuevo', cam: '48MP', chip: 'A17 Pro', usbc: true, bateria: '3274mAh' },
  { id: 2, brand: 'Apple', name: 'iPhone 14 Pro Max', emoji: '📱', precio: 999, capacidad: '256', estado: 'Nuevo', cam: '48MP', chip: 'A16', usbc: false, bateria: '4323mAh' },
  { id: 3, brand: 'Apple', name: 'iPhone 13', emoji: '📱', precio: 579, capacidad: '128', estado: 'Usado', cam: '12MP', chip: 'A15', usbc: false, bateria: '3095mAh' },
  { id: 4, brand: 'Samsung', name: 'Galaxy S24 Ultra', emoji: '📱', precio: 1299, capacidad: '512', estado: 'Nuevo', cam: '200MP', chip: 'Snapdragon 8 Gen 3', usbc: true, bateria: '5000mAh' },
  { id: 5, brand: 'Samsung', name: 'Galaxy S23', emoji: '📱', precio: 649, capacidad: '128', estado: 'Usado', cam: '50MP', chip: 'Snapdragon 8 Gen 2', usbc: true, bateria: '3900mAh' },
  { id: 6, brand: 'Xiaomi', name: 'Xiaomi 14', emoji: '📱', precio: 799, capacidad: '256', estado: 'Nuevo', cam: '50MP', chip: 'Snapdragon 8 Gen 3', usbc: true, bateria: '4610mAh' },
  { id: 7, brand: 'Apple', name: 'iPhone 15', emoji: '📱', precio: 849, capacidad: '128', estado: 'Nuevo', cam: '48MP', chip: 'A16', usbc: true, bateria: '3349mAh' },
  { id: 8, brand: 'Samsung', name: 'Galaxy A55', emoji: '📱', precio: 419, capacidad: '128', estado: 'Nuevo', cam: '50MP', chip: 'Exynos 1480', usbc: true, bateria: '5000mAh' },
];

// ESTADOS GLOBALES DE FILTROS Y COMPARADOR
let filtroMarca = 'todos', filtroPrecio = 'todos', filtroCapacidad = 'todos';
let seleccionados = [];

// FUNCIONES DE CONTROL DE FILTROS
function aplicarFiltros() {
  return productos.filter(p => {
    const marca = filtroMarca === 'todos' || p.brand.toLowerCase() === filtroMarca;
    const cap = filtroCapacidad === 'todos' || p.capacidad === filtroCapacidad;
    let prec = true;
    if (filtroPrecio === 'bajo') prec = p.precio < 700;
    else if (filtroPrecio === 'medio') prec = p.precio >= 700 && p.precio <= 1000;
    else if (filtroPrecio === 'alto') prec = p.precio > 1000;
    return marca && cap && prec;
  });
}

function filtrar(btn, marca) {
  filtroMarca = marca;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalog();
}
function filtrarPrecio(v) { filtroPrecio = v; renderCatalog(); }
function filtrarCapacidad(v) { filtroCapacidad = v; renderCatalog(); }

// MANEJO DEL COMPARADOR MULTI-SELECCIÓN
function toggleSelect(id) {
  const idx = seleccionados.indexOf(id);
  if (idx > -1) {
    seleccionados.splice(idx, 1);
  } else {
    if (seleccionados.length >= 2) { seleccionados.shift(); }
    seleccionados.push(id);
  }
  renderCatalog();
  updateCompBanner();
  renderComparador();
}

function updateCompBanner() {
  const b = document.getElementById('comp-banner');
  const t = document.getElementById('comp-txt');
  if (seleccionados.length === 0) {
    b.style.display = 'none';
  } else if (seleccionados.length === 1) {
    const p = productos.find(x => x.id === seleccionados[0]);
    b.style.display = 'flex';
    t.textContent = 'Seleccionaste: ' + p.name + '. Elige otro para comparar.';
  } else {
    const p1 = productos.find(x => x.id === seleccionados[0]);
    const p2 = productos.find(x => x.id === seleccionados[1]);
    b.style.display = 'flex';
    t.textContent = p1.name + ' vs ' + p2.name + ' listos.';
  }
}

// RENDERIZADO COMPONENTES DINÁMICOS
function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  const filtered = aplicarFiltros();
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:rgba(240,240,245,0.35);font-size:14px;grid-column:1/-1;padding:20px 0;">No hay equipos con esos filtros.</p>';
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="product-card${seleccionados.includes(p.id) ? ' selected' : ''}" onclick="toggleSelect(${p.id})">
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-specs">
          <span class="spec-tag">${p.capacidad}GB</span>
          <span class="spec-tag">${p.cam}</span>
          <span class="spec-tag">USB-C ${p.usbc ? '✓' : '✗'}</span>
        </div>
        <div class="product-footer">
          <span class="product-price">$${p.precio.toLocaleString()}</span>
          <span class="${p.estado === 'Nuevo' ? 'badge-nuevo' : 'badge-usado'}">${p.estado.toUpperCase()}</span>
        </div>
        
        <a href="/webWhats/index.html" target="_blank" class="product-wa-btn" onclick="event.stopPropagation()">
            <i class="ti ti-brand-whatsapp"></i> Solicitar por WhatsApp
        </a>

        <div class="compare-check" onclick="event.stopPropagation()">
          <input type="checkbox" ${seleccionados.includes(p.id) ? 'checked' : ''} onclick="toggleSelect(${p.id})" />
          Agregar al comparador
        </div>
      </div>
    </div>
  `).join('');
}

function verComparador() {
  document.getElementById('comparador').scrollIntoView({ behavior: 'smooth' });
}

function verCatalogo() {
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

function renderComparador() {
  const tbody = document.getElementById('comp-tbody');
  const h1 = document.getElementById('comp-h1');
  const h2 = document.getElementById('comp-h2');
  if (seleccionados.length < 2) {
    h1.textContent = "📱 Selecciona equipo 1"; h2.textContent = "📱 Selecciona equipo 2";
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:rgba(240,240,245,0.4);">Selecciona dos equipos en el catálogo para ver la comparación.</td></tr>`;
    return;
  }
  const p1 = productos.find(x => x.id === seleccionados[0]);
  const p2 = productos.find(x => x.id === seleccionados[1]);
  h1.textContent = p1.emoji + ' ' + p1.name;
  h2.textContent = p2.emoji + ' ' + p2.name;
  const filas = [
    ['Precio', '$' + p1.precio.toLocaleString(), '$' + p2.precio.toLocaleString()],
    ['Capacidad', p1.capacidad + 'GB', p2.capacidad + 'GB'],
    ['Estado', p1.estado, p2.estado],
    ['Cámara', p1.cam, p2.cam],
    ['Chip', p1.chip, p2.chip],
    ['USB-C', p1.usbc ? '<span class="comp-check">✓</span>' : '<span class="comp-x">✗</span>', p2.usbc ? '<span class="comp-check">✓</span>' : '<span class="comp-x">✗</span>'],
    ['Batería', p1.bateria, p2.bateria],
  ];
  tbody.innerHTML = filas.map(f => `<tr><td>${f[0]}</td><td>${f[1]}</td><td>${f[2]}</td></tr>`).join('');
}

// INICIALIZACIÓN DE APLICACIÓN
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderComparador();
});

window.toggleSelect = toggleSelect;
window.verComparador = verComparador;
window.verCatalogo = verCatalogo;
window.filtrar = filtrar;
window.filtrarPrecio = filtrarPrecio;
window.filtrarCapacidad = filtrarCapacidad;

