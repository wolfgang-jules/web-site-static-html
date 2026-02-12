const DATA_URL = './data/verifone.json';
const CLIENT_LOGOS = [
  { src: 'images/clients/bac.png', alt: 'BAC' },
  { src: 'images/clients/banpro.png', alt: 'BANPRO' },
  { src: 'images/clients/ficohsa.jpg', alt: 'FICOSHA' },
  { src: 'images/clients/lafise.png', alt: 'LAFISE' },
  { src: 'images/clients/framacias-saba.jpg', alt: 'FARMACIAS SABA' },
];

const productsGrid = document.querySelector('#productsGrid');
const productsCounter = document.querySelector('#productsCounter');
const productTemplate = document.querySelector('#productTemplate');
const brandName = document.querySelector('#brandName');
const clientsTrack = document.querySelector('#clientsTrack');

const productDialog = document.querySelector('#productDialog');
const closeDialog = document.querySelector('#closeDialog');
const dialogImage = document.querySelector('#dialogImage');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogSpecs = document.querySelector('#dialogSpecs');
const themeToggle = document.querySelector('#themeToggle');

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

async function initCatalog() {
  try {
    // Only initialize catalog if products or clients containers exist
    if (clientsTrack || productsGrid) {
      console.log('initCatalog: containers present', { clientsTrack: !!clientsTrack, productsGrid: !!productsGrid });
      createClientsCarousel();

      console.log('Fetching catalog from', DATA_URL);
      const response = await fetch(DATA_URL);
      console.log('Fetch response', response);
      if (!response.ok) throw new Error(`No se pudo cargar el catálogo (status ${response.status}).`);

      const data = await response.json();
      console.log('Catalog JSON loaded', data && (data.pages ? data.pages.length : 'no pages'));
      const brand = data.brand || 'verifone';
      const products = data.pages?.[0]?.products || [];

      if (brandName) brandName.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
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
