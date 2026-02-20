class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer>
        <div class="section">
          <div class="bg-footer">
            <div class="d-flex flex-md-row flex-column justify-content-between gap-3 align-items-md-center">
              <img src="images/logo-postek.png" alt="POSTEK-USA" class="site-logo" />
              <div class="wrapper-btn-footer">
                <a href="index.html" class="btn-footer"><p>Inicio</p></a>
                <a href="products.html" class="btn-footer"><p>Productos</p></a>
                <a href="services.html" class="btn-footer"><p>Servicios</p></a>
                <a href="about.html" class="btn-footer"><p>Empresa</p></a>
                <a href="contact.html" class="btn-footer"><p>Contacto</p></a>
              </div>
            </div>

            <div class="d-flex flex-column gap-2 site-footer-meta">
              <p class="m-0">Soluciones integrales de pago e infraestructura tecnológica.</p>
              <p class="m-0">Dirección: 14500 SW 32 ST, Miami, FL 33175</p>
              <p class="m-0">Email: <a href="mailto:info@postek-usa.com">info@postek-usa.com</a></p>
              <div class="site-flag-list" aria-label="Países de operación">
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

            <div class="d-flex flex-lg-row flex-column gap-3 align-items-center justify-content-between site-footer-bottom">
              <div class="wrapper-btn-footer">
                <a href="https://www.facebook.com" class="btn-footer-2">
                  <i aria-hidden="true" class="fa-brands fa-xs fa-facebook-f"></i>
                  <p>Facebook</p>
                </a>
                <a href="https://www.linkedin.com" class="btn-footer-2">
                  <i aria-hidden="true" class="fa-brands fa-xs fa-linkedin-in"></i>
                  <p>LinkedIn</p>
                </a>
                <a href="https://www.instagram.com" class="btn-footer-2">
                  <i aria-hidden="true" class="fa-brands fa-xs fa-instagram"></i>
                  <p>Instagram</p>
                </a>
                <a href="https://www.youtube.com" class="btn-footer-2">
                  <i aria-hidden="true" class="fa-brands fa-xs fa-youtube"></i>
                  <p>YouTube</p>
                </a>
              </div>
              <p class="accent-color-primary m-0">Copyright © 1999-${year} POSTEK-USA. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);
