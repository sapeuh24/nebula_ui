<template>
  <div class="container mx-auto" style="width: 50%">
    <div class="table-wrapper">
      <div class="table-title">
        <div v-html="alert"></div>
        <div class="row">
          <div class="col-sm-6">
            <h2>Descuentos</h2>
          </div>
          <div class="col-sm-6">
            <button
              class="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#addDecountModel"
            >
              Agregar descuento
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table mx-auto" style="width: 50%">
      <thead>
        <tr>
          <th scope="col">Descuento</th>
          <th scope="col">Minutos</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in discounts" :key="index">
          <td>{{ item.discount }} %</td>
          <td>{{ item.minutes }}</td>
          <td>
            <div class="btn-group me-2" role="group">
              <button
                class="btn btn-outline-warning"
                data-bs-toggle="modal"
                data-bs-target="#editDecountModel"
                @click="data_item = item"
              >
                Editar
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="detele(item.id)"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="addDecountModel" class="modal fade" tabindex="-1">
      <CreateDicounts v-on:close="UpdateAlert" />
    </div>
    <div id="editDecountModel" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar descuento</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form v-on:submit.prevent="submitEditForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="name" class="form-label">Descuento</label>
                <input
                  type="number"
                  class="form-control"
                  id="name"
                  v-model="data_item.discount"
                />
              </div>
              <div class="mb-3">
                <label for="minute" class="form-label">Minutos</label>
                <input
                  type="number"
                  class="form-control"
                  id="minute"
                  v-model="data_item.minutes"
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
import CreateDicounts from "@/components/Discounts/CreateDicounts.vue";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      discounts: [],
      alert: "",
      data_item: { discount: "", minutes: "" },
    };
  },
  components: {
    CreateDicounts,
  },
  mounted() {
    this.UpdateList();
  },
  methods: {
    UpdateList() {
      axios.get("http://127.0.0.1:8000/api/get_discount/").then((response) => {
        this.discounts = response.data.discounts;
      });
    },
    UpdateAlert(message) {
      this.alert =
        '<div class="alert alert-success" role="alert">' + message + "</div>";
      this.UpdateList();
    },
    submitEditForm() {
      axios
        .post("http://127.0.0.1:8000/api/edit_discount", this.data_item)
        .then((response) => {
          this.UpdateAlert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detele(id) {
      axios
        .post("http://127.0.0.1:8000/api/delete_discount", { id: id })
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
