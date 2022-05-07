<template>
  <div class="w-50 container-fluid text-center">
    <h1>Informe de tickets por vehiculo</h1>
    <form v-on:submit.prevent="getTransactionTicketsByVehicle">
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
            <th>Placa</th>
            <th>Descuento</th>
            <th>Hora inicial</th>
            <th>Hora final</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(parking, index) in parkings" :key="index">
            <td>{{ parking.vehicle_plate }}</td>
            <td v-if="parking.discount_value">{{ parking.discount_value }}</td>
            <td v-else>N/A</td>
            <td>{{ parking.initial_time }}</td>
            <td v-if="parking.final_time">{{ parking.final_time }}</td>
            <td v-else>N/A</td>
            <td v-if="parking.total_value">{{ parking.total_value }}</td>
            <td v-else>N/A</td>
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
      .post(
        "http://api.nebula.eclipseweb.co/api/get_transaction_tickets_by_vehicle",
        {
          today: "yes",
        }
      )
      .then((response) => {
        this.parkings = response.data.tickets;
      });
  },
  methods: {
    getTransactionTicketsByVehicle() {
      axios
        .post(
          "http://api.nebula.eclipseweb.co/api/get_transaction_tickets_by_vehicle",
          {
            from: this.fechaInicio,
            to: this.fechaFin,
          }
        )
        .then((response) => {
          this.parking = response.data.tickets;
        });
    },
  },
};
</script>
