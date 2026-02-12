class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__content">
          <div>
            <strong>Postek</strong>
            <p class="footer__contact">
              Dirección: 14500 SW 32 ST, Miami, FL 33175<br />
              Email: <a href="mailto:info@postek-usa.com">info@postek-usa.com</a>
            </p>
          </div>
          <div class="footer__links">
            <a href="index.html">Home</a>
            <a href="about.html">Quiénes somos</a>
            <a href="products.html">Productos</a>
            <a href="services.html">Servicios</a>
            <a href="contact.html">Contacto</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
