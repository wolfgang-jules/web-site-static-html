class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__content">
          <div>
            <strong>POSTEK</strong>
            <p class="footer__contact">
              Soluciones integrales de pago e infraestructura tecnológica.<br />
              Dirección: 14500 SW 32 ST, Miami, FL 33175<br />
              Email: <a href="mailto:info@postek-usa.com">info@postek-usa.com</a>
            </p>
            <p class="footer__countries">Países de operación: USA, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá</p>
          </div>
          <div class="footer__links">
            <a href="index.html">Inicio</a>
            <a href="about.html">Quiénes somos</a>
            <a href="products.html">Productos</a>
            <a href="services.html">Servicios</a>
            <a href="platform.html">Plataforma</a>
            <a href="support.html">Soporte</a>
            <a href="integrations.html">Integraciones</a>
            <a href="use-cases.html">Casos de uso</a>
            <a href="contact.html">Contacto</a>
          </div>
        </div>
        <div style="text-align:center; padding:12px 0; color:var(--muted); font-size:0.95rem;">
          Copyright © 1999–${year} POSTEK-USA.<br />
          Todos los derechos reservados.
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
