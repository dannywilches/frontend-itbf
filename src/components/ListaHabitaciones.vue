<template>
  <div>
    <div class="card shadow-card  mt-3 mb-3">
      <div class="card-header">
          <h5>Lista de Habitaciones</h5>
      </div>
      <div class="card-body">
          <div class="row">
              <div class="col-sm-12 table-responsive">
                <table class="table table-responsive table-striped table-hover">
                    <thead>
                      <tr class="text-center">
                        <th>Hotel</th>
                        <th>Cantidad</th>
                        <th>Tipo Habitación</th>
                        <th>Acomodación</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody v-if="numHabitaciones > 0">
                      <tr class="text-center" v-for="habitacion of listaHabitaciones">
                          <td class="text-left">{{habitacion.get_hotel.nombre}}</td>
                          <td>{{habitacion.num_habs}}</td>
                          <td>{{habitacion.tipo_hab}}</td>
                          <td v-if="habitacion.acomodacion == 1">Sencilla</td>
                          <td v-else-if="habitacion.acomodacion == 2">Doble</td>
                          <td v-else-if="habitacion.acomodacion == 3">Triple</td>
                          <td v-else-if="habitacion.acomodacion == 4">Cuadruple</td>
                          <td><router-link class="btn btn-sm btn-outline-secondary" tag="button" :to="`/set-habitaciones/${habitacion.id}`"><b-icon icon="pencil-square" variant="dark"></b-icon></router-link></td>
                          <td><button class="btn btn-sm btn-outline-danger mx-auto" v-on:click="eliminarAsignacion(habitacion.id)"><b-icon icon="trash-fill" variant="dark"></b-icon></button></td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" class="nonRegister">No hay habitaciones registradas</td>
                      </tr>
                    </tbody>
                </table>
              </div>
          </div>
      </div>
      <div class="card-footer">
        <div class="row text-center">
          <div class="col-sm-12">
            <router-link class="btn btn-sm btn-primary" tag="button" to="/set-habitaciones">Asignar Habitaciones</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListaHabitaciones',
  data() {
    return {
      listaHabitaciones:[],
    }
  },
  methods:{
    getListaHoteles(){
      this.axios.get('http://127.0.0.1:8000/api/habitaciones/all').then((response) => {
        this.listaHabitaciones = response.data.habitaciones;
      })
    },
    eliminarAsignacion(id_asignacion){
      this.$swal.fire({
        title: 'Desea eliminar esta asignación?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('http://127.0.0.1:8000/api/habitaciones/delete/' + id_asignacion).then((response) => {
            this.getListaHoteles();
            this.$swal.fire(
              'Deleted!',
              'Asignación Eliminada',
              'success'
            )
          }).catch((error) => {

          });
        }
      })
    }
  },
  created() {
    this.getListaHoteles();
  },
  computed: {
    numHabitaciones() {
      const quantity = (this.listaHabitaciones) ? this.listaHabitaciones.length : 0;
      return quantity;
    }
  },
}
</script>
<style scoped>
  .nonRegister {
    opacity: 0.5;
    font-style: italic;
  }
</style>
