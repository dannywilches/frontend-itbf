<template>
  <div>
    <div class="card shadow-card  mt-3 mb-3">
      <div class="card-header">
        <b v-if="update">Actualizar Hotel</b>
        <b v-else>Nuevo Hotel</b>
      </div>
      <div class="card-body">
          <div class="row">
              <div class="col-sm-12">
                <form>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Nombre del Hotel: </label>
                    <input type="text" v-model="v$.form.nombre.$model" @input="v$.form.nombre.$touch()" class="form-control form-control-sm">
                    <span v-if="v$.form.nombre.$invalid && v$.form.nombre.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Dirección: </label>
                    <input type="text" v-model="v$.form.direccion.$model" @input="v$.form.direccion.$touch()" class="form-control form-control-sm">
                    <span v-if="v$.form.direccion.$invalid && v$.form.direccion.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Ciudad: </label>
                    <input type="text" v-model="v$.form.ciudad.$model" @input="v$.form.ciudad.$touch()" class="form-control form-control-sm">
                    <span v-if="v$.form.ciudad.$invalid && v$.form.ciudad.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Nit: </label>
                    <input type="text" v-model="v$.form.nit.$model" @input="v$.form.nit.$touch()" class="form-control form-control-sm">
                    <span v-if="v$.form.nit.$invalid && v$.form.nit.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido
                    </span>
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="title">Número de habitaciones: </label>
                    <input type="number" v-model="v$.form.num_habs.$model" @input="v$.form.num_habs.$touch()" class="form-control form-control-sm">
                    <span v-if="v$.form.num_habs.$invalid && v$.form.num_habs.$dirty" class="" style="font-size: 12px; color:red;">
                      Este campo es requerido y debe ser mayor a cero
                    </span>
                  </div>
                </form>
              </div>
          </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-sm-12 text-center">
            <button class="btn btn-sm btn-success mx-auto"  v-on:click="guardarHotel()">
              <span v-if="update">Actualizar Hotel</span>
              <span v-else>Registrar Hotel</span>
              <b-icon icon="save" variant="light"></b-icon>
            </button>
            <router-link class="btn btn-sm btn-danger" tag="button" to="/hoteles">Cancelar <b-icon icon="x-circle-fill" variant="light"></b-icon></router-link>
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
  name: 'GestorHoteles',
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
      update: false,
      form:{
        nombre: '',
        direccion: '',
        ciudad: '',
        nit: '',
        num_habs: '',
      }
    }
  },
  methods:{
    /**
     * Función que recolecta la información del Hotel para crear el Hotel
     */
    guardarHotel(){
      let hotel = {
        nombre: this.v$.form.nombre.$model,
        direccion: this.v$.form.direccion.$model,
        ciudad: this.v$.form.ciudad.$model,
        nit: this.v$.form.nit.$model,
        num_habs: this.v$.form.num_habs.$model,
      }
      this.v$.form.$touch();
      if (!this.v$.form.$error) {
        let actionSave = this.requestHotel(hotel);
        actionSave.then((response) => {
          if (response.data.status == 201) {
            this.$swal.fire(
              'Notificación',
              response.data.mensaje,
              'success'
            ).then((result) => {
              this.$router.push('/hoteles');
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
    },
    infoHotel(id_hotel){
      this.axios.get('http://127.0.0.1:8000/api/hoteles/detail/' + id_hotel).then((response) => {
        let infoHotel = response.data.hoteles;
        this.form.nombre = infoHotel.nombre;
        this.form.direccion = infoHotel.direccion;
        this.form.ciudad = infoHotel.ciudad;
        this.form.nit = infoHotel.nit;
        this.form.num_habs = infoHotel.num_habs;
      })
    },
    requestHotel(hotel){
      if (this.update) {
        hotel.id_hotel = this.$route.params.id;
        return this.axios.put('http://127.0.0.1:8000/api/hoteles/update/' + this.$route.params.id, hotel);
      }
      else {
        return this.axios.post('http://127.0.0.1:8000/api/hoteles/new', hotel);
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.infoHotel(this.$route.params.id);
      this.update = true;
    }
  },
  /**
   * Validaciones del formulario
   */
  validations() {
    return {
      form:{
        nombre: {
          required
        },
        direccion: {
          required
        },
        ciudad: {
          required
        },
        nit: {
          required
        },
        num_habs: {
          minValue: minValue(1),
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
