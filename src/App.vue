<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand pt-0" href="#">Nebula</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Informes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Descuentos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid text-center" width="100">
      <h1>PARQUEADERO NEBULA</h1>
    </div>

    <!-- MODAL DE AGREGAR -->

    <div class="modal" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Asignar parqueadero</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- FORMULARIO PARA ASIGNAR PARQUEADERO -->
            <div class="form-group">
              <label for="exampleFormControlSelect1">
                Número de documento
              </label>
              <input type="input" class="form-control" id="document_number" />
              <button
                @click="validateUser()"
                class="btn btn-sm btn-success mt-2"
              >
                Buscar
              </button>

              <!-- FORMULARIO PARA NUEVO USUARIO -->

              <form v-if="form_new" v-on:submit.prevent="submitForm">
                <div class="form-group">
                  <label for="name">Nombre</label>
                  <input
                    type="input"
                    class="form-control"
                    id="name"
                    v-model="form.name"
                  />
                </div>
                <div class="form-group">
                  <label for="plate">Placa del vehiculo</label>
                  <input
                    type="input"
                    class="form-control"
                    id="plate"
                    v-model="form.plate"
                  />
                </div>
                <div class="form-group">
                  <label for="brand">Marca del vehiculo</label>
                  <input
                    type="input"
                    class="form-control"
                    id="brand"
                    v-model="form.brand"
                  />
                </div>
                <div class="form-group">
                  <label for="model">Modelo del vehiculo</label>
                  <input
                    type="input"
                    class="form-control"
                    id="model"
                    v-model="form.model"
                  />
                </div>
                <div class="form-group">
                  <label for="type">Tipo del vehiculo</label>
                  <select
                    class="form-control"
                    name="type"
                    id="type"
                    v-model="form.type"
                  >
                    <template v-for="(item, index) in types">
                      <option :key="index" v-bind:value="item.id">
                        {{ item.type }}
                      </option>
                    </template>
                  </select>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <template v-for="(item, index) in newVehicles">
          <div
            class="col-2 border text-center parking-item"
            :key="index"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="setParking(item.parking_number)"
          >
            {{ item.id }} - {{ item.parking_type }}
          </div>
        </template>
      </div>
    </div>
    <!-- <template v-for="(item, index) in bicicletas">
        <div :key="index">
          {{ item.id }}
        </div>
      </template>
      <template v-for="(item, index) in mototicletas">
        <div :key="index">
          {{ item.id }}
        </div>
      </template> -->
    <!-- DIBUJO DEL PARQUEADERO -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      automoviles: null,
      bicicletas: null,
      mototicletas: null,
      document_number: null,
      form_new: false,
      vehicles_user: null,
      types: null,
      form: {
        document_number: "",
        name: "",
        plate: "",
        brand: "",
        model: "",
        type: "",
        parking_number_selected: "",
      },
    };
  },

  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/get_parking")
      .then(
        (response) => (
          (this.automoviles = response.data.parkings_a),
          (this.bicicletas = response.data.parkings_b),
          (this.mototicletas = response.data.parkings_m)
        )
      );
  },
  watch: {
    newVehicles() {
      console.log(this.newVehicles);
    },
  },
  computed: {
    newVehicles() {
      let test = [];
      if (this.automoviles != null) {
        for (let i = 0; i < this.automoviles.length; i++) {
          //test.push(this.automoviles[i]);
          var type = (i + 1) % 2;
          if (type) {
            test.push(this.automoviles[i]);
          }
        }
        for (let i = 0; i < this.automoviles.length; i++) {
          //test.push(this.automoviles[i]);
          var type2 = (i + 1) % 2;
          if (!type2) {
            test.push(this.automoviles[i]);
          }
        }
      }
      return test;
    },
  },

  methods: {
    validateUser() {
      this.document_number = document.getElementById("document_number").value;
      this.form.document_number =
        document.getElementById("document_number").value;
      axios
        .get("http://127.0.0.1:8000/api/validate_user/" + this.document_number)
        .then((response) => {
          this.vehicles_user = response.data.vehicles;
          if (response.data.code == 404) {
            this.form_new = true;
            this.form.document_number =
              document.getElementById("document_number").value;
            axios
              .get("http://127.0.0.1:8000/api/get_vehicle_type")
              .then((response) => {
                this.types = response.data.vehiclesTypes;
              });
          }
        });
    },
    submitForm() {
      axios
        .post("http://127.0.0.1:8000/api/create_user", this.form)
        .then((response) => {
          console.log(response.data);
        });
    },
    setParking(parking_number) {
      this.form.parking_number_selected = parking_number;
    },
  },
};
</script>

<style scoped>
.parking-item {
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  margin: 5px;
}
.parking-item:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}
</style>
