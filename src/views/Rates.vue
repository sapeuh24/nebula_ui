<template>
  <div class="container mx-auto" style="width: 50%">
    <div class="table-wrapper">
      <div class="table-title">
        <div v-html="alert"></div>
        <h2>Tarifas</h2>
      </div>
    </div>
    <table class="table mx-auto" style="width: 50%">
      <thead>
        <tr>
          <th scope="col">Tipo de vehiculo</th>
          <th scope="col">Tarifa</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rates" :key="index">
          <td>{{ item.type }}</td>
          <td>{{ item.fee }}</td>
          <td>
            <div class="btn-group me-2" role="group">
              <button
                class="btn btn-outline-warning"
                data-bs-toggle="modal"
                data-bs-target="#editRatesModel"
                @click="data_item = item"
              >
                Editar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="editRatesModel" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar tarifas</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form v-on:submit.prevent="submitEditForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="type" class="form-label">Vehicles</label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  id="type"
                  v-model="data_item.type"
                />
              </div>
              <div class="mb-3">
                <label for="rate" class="form-label">Tarifas</label>
                <input
                  type="number"
                  class="form-control"
                  id="rate"
                  v-model="data_item.fee"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      rates: [],
      alert: "",
      data_item: { type: "", fee: "" },
    };
  },
  mounted() {
    this.UpdateList();
  },
  methods: {
    UpdateList() {
      axios
        .get("http://api.nebula.eclipseweb.co/api/get_vehicle_type")
        .then((response) => {
          this.rates = response.data.vehiclesTypes;
        });
    },
    UpdateAlert(message) {
      this.alert =
        '<div class="alert alert-success" role="alert">' + message + "</div>";
      this.UpdateList();
    },
    submitEditForm() {
      axios
        .post(
          "http://api.nebula.eclipseweb.co/api/edit_vehicle_type",
          this.data_item
        )
        .then((response) => {
          this.UpdateAlert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
