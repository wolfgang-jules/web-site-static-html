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
            <div class="footer__flags" aria-label="Países de operación">
              <img src="images/flags/us.svg" alt="Estados Unidos" loading="lazy" />
              <img src="images/flags/mx.svg" alt="México" loading="lazy" />
              <img src="images/flags/do.svg" alt="República Dominicana" loading="lazy" />
              <img src="images/flags/pr.svg" alt="Puerto Rico" loading="lazy" />
              <img src="images/flags/es.svg" alt="España" loading="lazy" />
              <img src="images/flags/ec.svg" alt="Ecuador" loading="lazy" />
              <img src="images/flags/bo.svg" alt="Bolivia" loading="lazy" />
              <img src="images/flags/gt.svg" alt="Guatemala" loading="lazy" />
              <img src="images/flags/sv.svg" alt="El Salvador" loading="lazy" />
              <img src="images/flags/bz.svg" alt="Belice" loading="lazy" />
              <img src="images/flags/hn.svg" alt="Honduras" loading="lazy" />
              <img src="images/flags/ni.svg" alt="Nicaragua" loading="lazy" />
              <img src="images/flags/cr.svg" alt="Costa Rica" loading="lazy" />
              <img src="images/flags/pa.svg" alt="Panamá" loading="lazy" />
            </div>
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
