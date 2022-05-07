<template>
  <div class="container">
    <div class="container-fluid text-center" width="100">
      <h1>PARQUEADERO NEBULA</h1>
    </div>
    <div class="row d-flex justify-content-center mt-3">
      <template v-for="(item, index) in newVehicles">
        <div
          :class="
            item.parking_ocupation != 1
              ? 'col-2 border text-center parking-item'
              : 'col-2 border text-center parking-item parking-item-ocupado'
          "
          :key="index"
          data-bs-toggle="modal"
          :data-bs-target="
            item.parking_ocupation != 1 ? '#assignParking' : '#finishParking'
          "
          @click="setParking(item.parking_number)"
        >
          {{ item.id }} - {{ item.parking_type }}
        </div>
      </template>
    </div>
    <div class="row d-flex justify-content-center mt-3">
      <template v-for="(item, index) in bicicletas">
        <div
          :class="
            item.parking_ocupation != 1
              ? 'col-1 border text-center parking-item'
              : 'col-1 border text-center parking-item parking-item-ocupado'
          "
          data-bs-toggle="modal"
          :data-bs-target="
            item.parking_ocupation != 1 ? '#assignParking' : '#finishParking'
          "
          @click="setParking(item.parking_number)"
          :key="index"
        >
          {{ item.id }}
        </div>
      </template>
    </div>
    <div class="row d-flex justify-content-center mt-3">
      <template v-for="(item, index) in mototicletas">
        <div
          :class="
            item.parking_ocupation != 1
              ? 'col-2 border text-center parking-item'
              : 'col-2 border text-center parking-item parking-item-ocupado'
          "
          data-bs-toggle="modal"
          :data-bs-target="
            item.parking_ocupation != 1 ? '#assignParking' : '#finishParking'
          "
          @click="setParking(item.parking_number)"
          :key="index"
        >
          {{ item.id }}
        </div>
      </template>
    </div>
    <div class="modal" id="assignParking" tabindex="-1">
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
            <div v-html="alert"></div>
            <!-- FORMULARIO PARA ASIGNAR PARQUEADERO -->
            <div class="mb-3">
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
                <div class="mb-3">
                  <label for="name">Nombre</label>
                  <input
                    type="input"
                    class="form-control"
                    id="name"
                    v-model="form.name"
                  />
                </div>
                <div class="mb-3">
                  <label for="vehicle_plate">Placa del vehiculo</label>
                  <input
                    type="input"
                    class="form-control"
                    id="vehicle_plate"
                    v-model="form.vehicle_plate"
                  />
                </div>
                <div class="mb-3">
                  <label for="brand">Marca del vehiculo</label>
                  <input
                    type="input"
                    class="form-control"
                    id="brand"
                    v-model="form.brand"
                  />
                </div>
                <div class="mb-3">
                  <label for="model">Modelo del vehiculo</label>
                  <input
                    type="input"
                    class="form-control"
                    id="model"
                    v-model="form.model"
                  />
                </div>
                <div class="mb-3">
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
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="random"
                      v-model="form.random"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Parqueadero aleatorio
                    </label>
                  </div>
                </div>
                <div class="mb-3">
                  <button type="submit" class="btn btn-primary">Enviar</button>
                </div>
              </form>
              <form v-if="vehicles_user" v-on:submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="plate_exist">Placas</label>
                  <select
                    class="form-control"
                    name="plate_exist"
                    id="plate_exist"
                    v-model="plate_exist"
                  >
                    <option value="" disabled>Seleccione un valor</option>
                    <template v-for="(item, index) in vehicles_user">
                      <option :key="index" v-bind:value="item.vehicle_plate">
                        {{ item.vehicle_plate }}
                      </option>
                    </template>
                  </select>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="random"
                    v-model="form.random"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Parqueadero aleatorio
                  </label>
                </div>
                <div class="mb-3">
                  <button class="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="finishParking" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Finalizar parqueadero</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="reload()"
            ></button>
          </div>
          <div v-if="finish_info" class="modal-body">
            <div class="row">
              <p>Placa: {{ finish_info.ticket.vehicle_plate }}</p>
              <p>Hora inicial: {{ finish_info.ticket.initial_time }}</p>
              <p>Hora final: {{ finish_info.ticket.final_time }}</p>
              <p>Valor total: {{ finish_info.ticket.total_value }}</p>
              <p>Valor descuento: {{ finish_info.ticket.discount_value }}</p>
            </div>
            <hr />
            <div class="row">
              <p>Nombre: {{ finish_info.data.name }}</p>
              <p>Tipo de vehiculo: {{ finish_info.data.type }}</p>
              <p>Marca: {{ finish_info.data.vehicle_brand }}</p>
              <p>Modelo: {{ finish_info.data.vehicle_model }}</p>
            </div>
          </div>
          <div v-if="!finish_info" class="modal-footer">
            <button class="btn-success" @click="finishParking()">
              Finalizar
            </button>
          </div>
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
      automoviles: null,
      plate_exist: null,
      id_parking: null,
      bicicletas: null,
      mototicletas: null,
      alert: "",
      document_number: null,
      form_new: false,
      vehicles_user: null,
      types: null,
      form: {
        document_number: "",
        name: "",
        vehicle_plate: "",
        brand: "",
        model: "",
        type: "",
        random: false,
        parking_number_selected: "",
      },
      finish_info: null,
    };
  },
  mounted() {
    axios
      .get("http://api.nebula.eclipseweb.co/api/get_parking")
      .then(
        (response) => (
          (this.automoviles = response.data.parkings_a),
          (this.bicicletas = response.data.parkings_b),
          (this.mototicletas = response.data.parkings_m)
        )
      );
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
        .get(
          "http://api.nebula.eclipseweb.co/api/validate_user/" +
            this.document_number
        )
        .then((response) => {
          if (response.data.code == 404) {
            this.form_new = true;
            this.form.document_number =
              document.getElementById("document_number").value;
            axios
              .get("http://api.nebula.eclipseweb.co/api/get_vehicle_type")
              .then((response) => {
                this.types = response.data.vehiclesTypes;
              });
          } else {
            this.vehicles_user = response.data.vehicles.original;
            this.form_new = false;
          }
        });
    },
    submitForm() {
      if (this.plate_exist != null) {
        axios.post(
          "http://api.nebula.eclipseweb.co/api/store_parking_with_plate",
          {
            vehicle_plate: this.plate_exist,
            random: this.form.random,
          }
        );
      } else {
        axios
          .post("http://api.nebula.eclipseweb.co/api/create_user", this.form)
          .then((response) => {
            location.reload();
            if (response.data.code == 422) {
              var errors = [];
              Object.keys(response.data.message).forEach(function (key) {
                errors.push(response.data.message[key]);
              });
              console.log(errors);
              for (let i = 0; i < errors.length; i++) {
                this.alert =
                  '<div class="alert alert-danger" role="alert">' +
                  errors[i] +
                  "</div>";
              }
              /* this.alert =
                  '<div class="alert alert-dangerous" role="alert">' +
                  errors +
                  "</div>"; */
            } else {
              this.alert =
                '<div class="alert alert-success" role="alert">' +
                response.data.message +
                "</div>";
            }
            /* console.log(response.data); */
          });
      }
    },
    setParking(parking_number) {
      this.form.parking_number_selected = parking_number;
    },

    finishParking() {
      axios
        .post("http://api.nebula.eclipseweb.co/api/finish_ticket", {
          id_parking: this.form.parking_number_selected,
        })
        .then((response) => {
          console.log(response.data);
          this.finish_info = response.data;
        });
    },
    reload() {
      location.reload();
    },
  },
};
</script>
<style scoped>
.parking-item {
  height: 30px;
  background-color: #32e344;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  margin: 5px;
}
.parking-item:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}
.parking-item-ocupado {
  background-color: #eb2d2d;
  color: white;
}
</style>
