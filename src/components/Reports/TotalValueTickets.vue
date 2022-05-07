<template>
  <div class="w-50 container-fluid text-center">
    <h1>Informe de total de los tickets</h1>
    <form v-on:submit.prevent="getTotalValueTickets">
      <div class="col-4 container-fluid form-group">
        <label for="">Fecha inicio</label>
        <input
          id="init_date"
          type="date"
          class="form-control"
          value=""
          name="fechaInicio"
          v-model="fechaInicio"
        />
      </div>
      <div class="col-4 container-fluid form-group">
        <label for="">Fecha fin</label>
        <input
          type="date"
          class="form-control"
          name="fechaFin"
          v-model="fechaFin"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Generar</button>
    </form>
    <div class="w-50 container-fluid">
      <table class="table">
        <thead>
          <tr>
            <th>Cantidad de tickets</th>
            <th>Valor total acumulado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(parking, index) in parkings" :key="index">
            <td>{{ parking.total_tickets }}</td>
            <td>{{ parking.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      parkings: null,
      fechaInicio: "",
      fechaFin: "",
    };
  },
  mounted() {
    axios
      .post("http://api.nebula.eclipseweb.co/api/get_total_value_tickets", {
        today: "yes",
      })
      .then((response) => {
        this.parkings = response.data.tickets;
      });
  },
  methods: {
    getTotalValueTickets() {
      axios
        .post("http://api.nebula.eclipseweb.co/api/get_total_value_tickets", {
          from: this.fechaInicio,
          to: this.fechaFin,
        })
        .then((response) => {
          this.parking = response.data.tickets;
        });
    },
  },
};
</script>
