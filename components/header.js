class SiteHeader extends HTMLElement {
  connectedCallback() {
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const navItems = [
      { href: "index.html", label: "Inicio" },
      { href: "products.html", label: "Productos" },
      { href: "services.html", label: "Servicios" },
      { href: "about.html", label: "Empresa" },
      { href: "contact.html", label: "Contacto" },
    ];

    const navLinks = navItems
      .map((item) => {
        const active = currentPage === item.href;
        return `
          <li class="nav-item">
            <a class="nav-link${active ? " active" : ""}" ${active ? 'aria-current="page"' : ""} href="${item.href}">${item.label}</a>
          </li>
        `;
      })
      .join("");

    this.innerHTML = `
      <a class="site-skip-link" href="#main-content">Saltar al contenido principal</a>
      <div id="header" class="fixed-top mx-auto site-shell">
        <div class="mx-auto align-items-center bg-header site-shell">
          <nav class="navbar navbar-expand-xl" aria-label="Navegación principal">
            <div class="container-fluid ps-3">
              <div class="logo-container">
                <a class="navbar-brand" href="index.html">
                  <img src="images/logo-postek.png" alt="POSTEK-USA" class="img-fluid site-logo" />
                </a>
              </div>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMain"
                aria-controls="navbarMain"
                aria-expanded="false"
                aria-label="Abrir menú de navegación"
              >
                <i aria-hidden="true" class="fa-solid fa-bars-staggered accent-color-2"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarMain">
                <ul class="navbar-nav mx-auto mb-2 mb-xl-0 gap-xl-4 gap-1">
                  ${navLinks}
                </ul>
                <div class="w-max-content mx-xl-0 mx-auto">
                  <a href="contact.html" class="btn btn-accent site-nav-cta">
                    <span>Solicitar asesoría</span>
                    <div class="icon-box">
                      <i aria-hidden="true" class="rtmicon rtmicon-arrow-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    `;
  }
}

customElements.define("site-header", SiteHeader);
