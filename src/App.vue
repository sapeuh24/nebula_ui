<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand pt-0" href="/">
            <img src="./assets/logo.png" width="100" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Parquadero</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/reports"
                  >Informes</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/discounts"
                  >Descuentos</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/rates">Tarifas</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
