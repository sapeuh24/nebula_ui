<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear descuento</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <form v-on:submit.prevent="submitForm">
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label">Descuento</label>
            <input
              type="number"
              class="form-control"
              id="name"
              v-model="discount"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Minutos</label>
            <input
              type="number"
              class="form-control"
              id="name"
              v-model="minutes"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      discount: "",
      minutes: "",
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://127.0.0.1:8000/api/create_discount", {
          discount: this.discount,
          minutes: this.minutes,
        })
        .then((response) => {
          this.$emit("close", response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
