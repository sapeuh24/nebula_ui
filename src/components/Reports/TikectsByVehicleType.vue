<template>
  <div class="w-50 container-fluid text-center">
    <h1>Informe de parqueadero por tipo de vehiculo</h1>
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
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(parking, index) in parkings" :key="index">
            <td>{{ parking.vehicle_plate }}</td>
            <td>{{ parking.vehicle_brand }}</td>
            <td>{{ parking.vehicle_model }}</td>
            <td>{{ parking.type }}</td>
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
      .post("http://api.nebula.eclipseweb.co/api/get_tickets_by_vehicle_type", {
        today: "yes",
      })
      .then((response) => {
        this.parkings = response.data.tickets;
      });
  },
  methods: {
    getParkingMoreUsed() {
      axios
        .post(
          "http://api.nebula.eclipseweb.co/api/get_tickets_by_vehicle_type",
          {
            from: this.fechaInicio,
            to: this.fechaFin,
          }
        )
        .then((response) => {
          this.parking = response.data.tickets;
          console.log(this.parking);
        });
    },
  },
};
</script>
