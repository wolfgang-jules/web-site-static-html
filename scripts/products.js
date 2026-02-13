const DATA_URL = './data/verifone.json';
const CLIENT_LOGOS = [
  { src: 'images/clients/bac.png', alt: 'BAC' },
  { src: 'images/clients/banpro.png', alt: 'BANPRO' },
  { src: 'images/clients/ficohsa.jpg', alt: 'FICOSHA' },
  { src: 'images/clients/lafise.png', alt: 'LAFISE' },
  { src: 'images/clients/farmacias-saba.jpg', alt: 'FARMACIAS SABA' },
  { src: 'images/clients/bac.png', alt: 'BAC' },
  { src: 'images/clients/banpro.png', alt: 'BANPRO' },
  { src: 'images/clients/ficohsa.jpg', alt: 'FICOSHA' },
  { src: 'images/clients/lafise.png', alt: 'LAFISE' },
  { src: 'images/clients/farmacias-saba.jpg', alt: 'FARMACIAS SABA' },
];
const BRANDS = [
  { id: 'verifone', name: 'Verifone', logoSrc: 'images/brands/verifone.png' },
  { id: 'sunmi', name: 'Sunmi', logoSrc: 'images/brands/sunmi.png' },
  { id: 'newpos', name: 'Newpos', logoSrc: 'images/brands/newpos.png' },
  { id: 'landi', name: 'Landi', logoSrc: 'images/brands/landi.png' },
  { id: 'dspread', name: 'Dspread', logoSrc: 'images/brands/dspread.png' },
  { id: 'telpo', name: 'Telpo', logoSrc: 'images/brands/telpo.png' },
  { id: 'urovo', name: 'Urovo', logoSrc: 'images/brands/urovo.png' },
];

const productsGrid = document.querySelector('#productsGrid');
const productsCounter = document.querySelector('#productsCounter');
const productTemplate = document.querySelector('#productTemplate');
const brandName = document.querySelector('#brandName');
const clientsTrack = document.querySelector('#clientsTrack');
const brandSelectorTrack = document.querySelector('#brandSelectorTrack');

const productDialog = document.querySelector('#productDialog');
const closeDialog = document.querySelector('#closeDialog');
const dialogImage = document.querySelector('#dialogImage');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogSpecs = document.querySelector('#dialogSpecs');
const themeToggle = document.querySelector('#themeToggle');
let selectedBrand = null;
let brandSelectorOnChange = null;

function normalizeImagePath(path) {
  if (!path) return 'https://placehold.co/560x360?text=Sin+imagen';
  return path.replace(/^output\/images\/verifone\//, 'images/products/verifone/').replace(/^output\/images\//, 'images/');
}

function createClientsCarousel() {
  if (!clientsTrack) return;
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  clientsTrack.innerHTML = doubled
    .map(
      (client) => `
      <div class="client-logo">
        <img src="${client.src}" alt="${client.alt}" loading="lazy" />
      </div>
    `
    )
    .join('');
}

function updateBrandNamePanel() {
  if (!brandName) return;
  const activeBrand = BRANDS.find((brand) => brand.id === selectedBrand);
  brandName.textContent = activeBrand ? activeBrand.name : 'Todas las marcas';
}

function setSelectedBrand(nextBrandId) {
  selectedBrand = selectedBrand === nextBrandId ? null : nextBrandId;

  if (!brandSelectorTrack) return;
  brandSelectorTrack.querySelectorAll('.brand-card').forEach((button) => {
    const isSelected = button.dataset.brandId === selectedBrand;
    button.setAttribute('aria-pressed', String(isSelected));
  });

  updateBrandNamePanel();
  if (typeof brandSelectorOnChange === 'function') {
    brandSelectorOnChange(selectedBrand);
  }
  if (typeof window.onBrandSelect === 'function') {
    window.onBrandSelect(selectedBrand);
  }
}

function renderBrandSelector() {
  if (!brandSelectorTrack) return;
  const fragment = document.createDocumentFragment();

  BRANDS.forEach((brand) => {
    const button = document.createElement('button');
    const image = document.createElement('img');
    const isSelected = brand.id === selectedBrand;

    button.type = 'button';
    button.className = 'brand-card';
    button.dataset.brandId = brand.id;
    button.setAttribute('aria-label', `Filtrar por ${brand.name}`);
    button.setAttribute('aria-pressed', String(isSelected));
    button.addEventListener('click', () => setSelectedBrand(brand.id));

    image.className = 'brand-card__logo';
    image.src = brand.logoSrc;
    image.alt = `Logo ${brand.name}`;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      button.classList.add('brand-card--fallback');
      button.textContent = brand.name;
    });

    button.appendChild(image);
    fragment.appendChild(button);
  });

  brandSelectorTrack.innerHTML = '';
  brandSelectorTrack.appendChild(fragment);
}

function initBrandSelector({ value = null, onChange } = {}) {
  if (!brandSelectorTrack) return;
  selectedBrand = value;
  brandSelectorOnChange = onChange;
  renderBrandSelector();
  updateBrandNamePanel();

  if (brandSelectorTrack.dataset.ready === 'true') return;
  brandSelectorTrack.dataset.ready = 'true';
}

function renderProducts(products) {
  if (!productsGrid || !productTemplate) return;
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const node = productTemplate.content.cloneNode(true);
    const image = node.querySelector('.product-card__img');
    const title = node.querySelector('.product-card__title');
    const description = node.querySelector('.product-card__description');
    const button = node.querySelector('button');

    const primaryImage = normalizeImagePath(product.images?.primary_image?.[0]);

    image.src = primaryImage;
    image.alt = product.product_name || product.name;
    title.textContent = product.product_name || product.name;
    description.textContent = product.description || 'Sin descripción disponible.';

    button.addEventListener('click', () => openDetails(product, primaryImage));
    fragment.appendChild(node);
  });

  productsGrid.innerHTML = '';
  productsGrid.appendChild(fragment);
}

function openDetails(product, image) {
  if (!productDialog) return;
  dialogImage.src = image;
  dialogImage.alt = product.product_name || product.name;
  dialogTitle.textContent = product.product_name || product.name;
  dialogDescription.textContent = product.description || 'Sin descripción disponible.';

  const specs = product.specifications?.length
    ? product.specifications
    : [{ title: 'Especificaciones', values: ['No hay datos disponibles.'] }];

  if (dialogSpecs) {
    dialogSpecs.innerHTML = specs
      .map(
        (item) => `
      <article class="spec-card">
        <h4>${item.title}</h4>
        <ul>
          ${item.values.map((value) => `<li>${value}</li>`).join('')}
        </ul>
      </article>
    `
      )
      .join('');
  }

  productDialog.showModal();
}

const JSON_FILES = ['./data/verifone.json'];

async function fetchFirstAvailable(files) {
  for (const file of files) {
    try {
      console.log('Attempting to fetch', file);
      const res = await fetch(file);
      if (res.ok) return { data: await res.json(), file };
      console.warn('Fetch failed', file, res.status);
    } catch (err) {
      console.warn('Fetch error for', file, err && err.message);
    }
  }
  throw new Error('No catalog JSON file found in data folder.');
}

async function initCatalog() {
  try {
    // Only initialize catalog if products or clients containers exist
    if (clientsTrack || productsGrid) {
      console.log('initCatalog: containers present', { clientsTrack: !!clientsTrack, productsGrid: !!productsGrid });
      createClientsCarousel();
      const onBrandSelect = (brandId) => {
        // TODO: Usar `selectedBrand` para filtrar `products` en la siguiente iteracion.
        console.log('Brand selected:', brandId);
      };

      initBrandSelector({
        value: null,
        onChange: onBrandSelect,
      });

      console.log('Fetching catalog from fallback list');
      const result = await fetchFirstAvailable(JSON_FILES);
      const data = result.data;
      console.log('Catalog JSON loaded from', result.file, data && (data.pages ? data.pages.length : 'no pages'));
      const products = data.pages?.[0]?.products || [];

      if (productsCounter) productsCounter.textContent = `${products.length} productos cargados desde JSON.`;

      renderProducts(products);
    } else {
      console.log('initCatalog: no products or clients containers found on this page.');
    }
  } catch (error) {
    console.error('initCatalog error', error);
    if (productsCounter) productsCounter.textContent = 'Error al cargar los productos.';
    if (productsGrid) productsGrid.innerHTML = `<p class="section__sub">${error.message}</p>`;
  }
}

if (closeDialog && productDialog) {
  closeDialog.addEventListener('click', () => productDialog.close());
  productDialog.addEventListener('click', (event) => {
    const card = productDialog.querySelector('.dialog-card');
    const clickedOutside = !card.contains(event.target);
    if (clickedOutside) productDialog.close();
  });
}

if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeToggle.checked);
  });
}

initCatalog();
