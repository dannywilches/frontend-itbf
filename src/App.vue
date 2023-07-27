<template>
  <div id="app">
    <div class="h-100 w-100" style="overflow-y: scroll; opacity: 50;">
      <div class="pos-f-t">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand px-3" href="#">Prueba Desarrollo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <router-link class="nav-link" to="/">Hoteles</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/habitaciones">Habitaciones</router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="content-wrapper">
        <div class="container">
          <div class="row mt-3 mb-3 p-3 d-flex justify-content-center abs-center">
            <div class="col-sm-12 mt-3">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
@media screen and (max-width: 376px){
  /* #app {
    height: initial;
  } */
}
@media (min-width: 992px) {
  body.sidenav-toggled footer.sticky-footer {
    width: calc(100% - 55px); } }
</style>
