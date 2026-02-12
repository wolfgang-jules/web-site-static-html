class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="topbar">
        <div class="container topbar__content">
          <a class="brand" href="index.html">
            <img class="brand__logo" src="images/logo-postek.png" alt="Logo de Postek" />
            <span>
              <strong>POSTEK</strong>
              <small>Payment Solutions</small>
            </span>
          </a>

          <nav class="topbar__nav" aria-label="Navegación principal">
            <a href="index.html">Inicio</a>
            <a href="about.html">Empresa</a>
            <a href="products.html">Productos</a>
            <a href="services.html">Servicios</a>
            <a href="platform.html">Plataforma</a>
            <a href="contact.html">Contacto</a>
          </nav>

          <label class="theme-switch" for="themeToggle" aria-label="Cambiar entre modo claro y oscuro">
            <input id="themeToggle" type="checkbox" />
            <span class="material-symbols-rounded theme-switch__icon theme-switch__icon--light" aria-hidden="true">light_mode</span>
            <span class="material-symbols-rounded theme-switch__icon theme-switch__icon--dark" aria-hidden="true">dark_mode</span>
          </label>
        </div>
      </header>
    `;
  }
}

customElements.define('site-header', SiteHeader);
