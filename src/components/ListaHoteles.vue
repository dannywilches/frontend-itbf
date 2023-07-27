<template>
  <div>
    <div class="card shadow-card  mt-3 mb-3">
      <div class="card-header">
          <h5>Lista de Hoteles</h5>
      </div>
      <div class="card-body">
          <div class="row">
              <div class="col-sm-12 table-responsive">
                <table class="table table-responsive table-striped table-hover">
                    <thead>
                      <tr class="text-center">
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Nit</th>
                        <th>N° de Hab.</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody v-if="numHoteles > 0">
                      <tr class="text-center" v-for="hotel of listaHoteles">
                          <td class="text-left">{{hotel.nombre}}</td>
                          <td>{{hotel.direccion}}</td>
                          <td>{{hotel.ciudad}}</td>
                          <td>{{hotel.nit}}</td>
                          <td>{{hotel.num_habs}}</td>
                          <td><router-link class="btn btn-sm btn-outline-info" tag="button" :to="`/gestionar-hoteles/${hotel.id}`"><b-icon icon="pencil-square" variant="dark"></b-icon></router-link></td>
                          <td><button class="btn btn-sm btn-outline-danger mx-auto" v-on:click="eliminarHotel(hotel.id)"><b-icon icon="trash-fill" variant="dark"></b-icon></button></td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" class="nonRegister">No hay hoteles registrados</td>
                      </tr>
                    </tbody>
                </table>
              </div>
          </div>
      </div>
      <div class="card-footer">
        <div class="row text-center">
          <div class="col-sm-12">
            <router-link class="btn btn-sm btn-primary" tag="button" to="/gestionar-hoteles">Crear Hoteles</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListaHoteles',
  data(){
    return {
      listaHoteles: [],
    }
  },
  methods:{
    getListaHoteles(){
      this.axios.get('http://127.0.0.1:8000/api/hoteles/all').then((response) => {
        this.listaHoteles = response.data.hoteles;
      })
    },
    eliminarHotel(id_hotel){
      this.$swal.fire({
        title: 'Desea eliminar este Hotel?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('http://127.0.0.1:8000/api/hoteles/delete/' + id_hotel).then((response) => {
            this.getListaHoteles();
            this.$swal.fire(
              'Deleted!',
              'Hotel Eliminado',
              'success'
            )
          }).catch((error) => {
            this.$swal.fire(
              'Notificación',
              error.response.data.mensaje,
              'error'
            ).then((result) => {
              // this.$router.go(0);
            });
          })
        }
      })
    }
  },
  created() {
    this.getListaHoteles();
  },
  computed: {
    numHoteles() {
      const quantity = (this.listaHoteles) ? this.listaHoteles.length : 0;
      return quantity;
    }
  }
}
</script>
<style scoped>
  .nonRegister {
    opacity: 0.5;
    font-style: italic;
  }
</style>
