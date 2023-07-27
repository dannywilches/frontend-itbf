<template>
  <div>
    <div class="card shadow-card  mt-3 mb-3">
      <div class="card-header">
        <b v-if="update">Actualización de Habitaciones</b>
        <b v-else>Asignación de Habitaciones</b>
      </div>
      <div class="card-body">
          <div class="row">
              <div class="col-sm-12">
                <form>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Hotel: </label>
                    <select v-model="v$.form.id_hotel.$model" class="form-select form-select-sm">
                      <option value="">--</option>
                      <option v-for="hotel of listaHoteles" :value="hotel.id">{{ hotel.nombre }}</option>
                    </select>
                    <span v-if="v$.form.id_hotel.$invalid && v$.form.id_hotel.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Cantidad: </label>
                    <input type="number" v-model="form.num_habs" @input="v$.form.num_habs.$touch()" class="form-control form-control-sm">
                    <span v-if="v$.form.num_habs.$invalid && v$.form.num_habs.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido y debe ser mayor a 0
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Tipo Habitación: </label>
                    <select v-model="v$.form.tipo_hab.$model" v-on:change="selectAcomodacion()" class="form-select form-select-sm">
                      <option value="">--</option>
                      <option value="Estandar">Estandar</option>
                      <option value="Junior">Junior</option>
                      <option value="Suite">Suite</option>
                    </select>
                    <span v-if="v$.form.tipo_hab.$invalid && v$.form.tipo_hab.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Acomodación: </label>
                    <select v-model="v$.form.acomodacion.$model" class="form-select form-select-sm" :disabled="enable_acom">
                      <option value="">--</option>
                      <option v-if="form.tipo_hab == 'Estandar' || form.tipo_hab == 'Suite'" value="1">Sencilla</option>
                      <option v-if="form.tipo_hab == 'Estandar' || form.tipo_hab == 'Suite'" value="2">Doble</option>
                      <option v-if="form.tipo_hab == 'Junior' || form.tipo_hab == 'Suite'" value="3">Triple</option>
                      <option v-if="form.tipo_hab == 'Junior'" value="4">Cuádruple</option>
                    </select>
                    <span v-if="v$.form.acomodacion.$invalid && v$.form.acomodacion.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                </form>
              </div>
          </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-sm-12 text-center">
            <button class="btn btn-sm btn-success mx-auto" v-on:click="guardarHabitacion()">
              <span v-if="update">Actualizar Habitación</span>
              <span v-else>Registrar Habitación</span>
              <b-icon icon="save" variant="light"></b-icon>
            </button>
            <router-link class="btn btn-sm btn-danger" tag="button" to="/habitaciones">Cancelar <b-icon icon="x-circle-fill" variant="light"></b-icon></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'

export default {
  name: 'AsignarHabitaciones',
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data(){
    /**
     * Data modelo para los inputs del formulario
     */
    return {
      listaHoteles: [],
      enable_acom: true,
      update: false,
      form: {
        id_hotel: '',
        num_habs: '',
        tipo_hab: '',
        acomodacion: '',
      }
    }
  },
  methods:{
    /**
     * Función que recolecta la información de la acomodación de la Habitación para crearla
     */
    guardarHabitacion(){
      let habitacion = {
        id_hotel: this.v$.form.id_hotel.$model,
        num_habs: this.v$.form.num_habs.$model,
        tipo_hab: this.v$.form.tipo_hab.$model,
        acomodacion: this.v$.form.acomodacion.$model,
      }
      this.v$.form.$touch();
      if (!this.v$.form.$error) {
        let actionSave = this.requestHabitaciones(habitacion);
        actionSave.then((response) => {
          if (response.data.status == 201) {
            this.$swal.fire(
              'Notificación',
              response.data.mensaje,
              'success'
            ).then((result) => {
              this.$router.push('/habitaciones');
            });
          }
        }).catch((error) => {
          this.$swal.fire(
            'Notificación',
            error.response.data.message,
            'error'
          ).then((result) => {
            // this.$router.go(0);
          });
        })
      }
      else {
      }
    },
    getListaHoteles(){
      this.axios.get('http://127.0.0.1:8000/api/hoteles/all').then((response) => {
        this.listaHoteles = response.data.hoteles;
      })
    },
    infoHabitacion(id_asignacion){
      this.axios.get('http://127.0.0.1:8000/api/habitaciones/detail/' + id_asignacion).then((response) => {
        let infoHabitacion = response.data.habitaciones;
        this.form.id_hotel = infoHabitacion.id_hotel;
        this.form.num_habs = infoHabitacion.num_habs;
        this.form.tipo_hab = infoHabitacion.tipo_hab;
        this.form.acomodacion = infoHabitacion.acomodacion;
      })
    },
    requestHabitaciones(habitacion){
      if (this.update) {
        habitacion.id_asignacion = this.$route.params.id;
        return this.axios.put('http://127.0.0.1:8000/api/habitaciones/update/' + this.$route.params.id, habitacion);
      }
      else {
        return this.axios.post('http://127.0.0.1:8000/api/habitaciones/new', habitacion, {validateStatus: function (status) { return status < 400}});
      }
    },
    selectAcomodacion(){
      this.form.acomodacion = '';
      if (this.form.tipo_hab != "") {
        this.enable_acom = false;
      }
      else {
        this.enable_acom = true;
      }
    }
  },
  created() {
    this.getListaHoteles();
    if (this.$route.params.id) {
      this.infoHabitacion(this.$route.params.id);
      this.update = true;
      this.enable_acom = false;
    }
  },
  /**
   * Validaciones del formulario
   */
  validations() {
    return {
      form: {

        id_hotel: {
          required
        },
        num_habs: {
          required,
          minValue: minValue(1)
        },
        tipo_hab: {
          required
        },
        acomodacion: {
          required
        },
      }
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
