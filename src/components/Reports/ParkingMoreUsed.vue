<template>
  <div class="w-50 container-fluid text-center">
    <h1>Informe de parqueadero mas usado</h1>
    <form v-on:submit.prevent="getParkingMoreUsed">
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
            <th>Número de parqueadero</th>
            <th>Cantidad de veces usado</th>
            <th>Tipo de parqueadero</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(parking, index) in parkings" :key="index">
            <td>{{ parking.id_parking }}</td>
            <td>{{ parking.total }}</td>
            <td>{{ parking.parking_type }}</td>
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
      .post("http://api.nebula.eclipseweb.co/api/get_parking_more_used", {
        today: "yes",
      })
      .then((response) => {
        this.parkings = response.data;
      });
  },
  methods: {
    getParkingMoreUsed() {
      axios
        .post("http://api.nebula.eclipseweb.co/api/get_parking_more_used", {
          from: this.fechaInicio,
          to: this.fechaFin,
        })
        .then((response) => {
          this.parking = response.data;
        });
    },
  },
};
</script>
