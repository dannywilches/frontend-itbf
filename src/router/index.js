import Vue from 'vue'
import Router from 'vue-router'
import ListaHoteles from '@/components/ListaHoteles'
import ListaHabitaciones from '@/components/ListaHabitaciones'
import GestorHoteles from '@/components/GestorHoteles'
import AsignarHabitaciones from '@/components/AsignarHabitaciones'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hoteles'
    },
    {
      path: '/hoteles',
      name: 'ListaHoteles',
      component: ListaHoteles
    },
    {
      path: '/habitaciones',
      name: 'ListaHabitaciones',
      component: ListaHabitaciones
    },
    {
      path: '/gestionar-hoteles',
      name: 'GestorHoteles',
      component: GestorHoteles
    },
    {
      path: '/gestionar-hoteles/:id',
      name: 'GestorHoteles',
      component: GestorHoteles
    },
    {
      path: '/set-habitaciones',
      name: 'AsignarHabitaciones',
      component: AsignarHabitaciones
    },
    {
      path: '/set-habitaciones/:id',
      name: 'AsignarHabitaciones',
      component: AsignarHabitaciones
    },
  ]
})
