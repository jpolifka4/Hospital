<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/admin">Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/RegAdmin">Register Administrator</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/RegStaff">Register Staff</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Log out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>