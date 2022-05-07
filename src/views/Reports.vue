<template>
  <div>
    <h1>Reportes</h1>
    <div class="text-center">
      <ul class="mx-2 list-unstyled">
        <li class="btn btn-info mx-3">
          <router-link class="link" to="/reports/ParkingMoreUsed"
            >Parqueadero mas usado</router-link
          >
        </li>
        <li class="btn btn-info mx-3">
          <router-link class="link" to="/reports/TransactionTicketsByVehicle"
            >Transacciones de tickets por vehiculo</router-link
          >
        </li>
        <li class="btn btn-info mx-3">
          <router-link class="link" to="/reports/TikectsByVehicleType"
            >Tickets por tipo de vehiculo</router-link
          >
        </li>
        <li class="btn btn-info mx-3">
          <router-link class="link" to="/reports/TotalValueTickets"
            >Valor total de tickets</router-link
          >
        </li>
      </ul>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
};
</script>
<style scoped>
.link {
  color: #fff;
  text-decoration: none;
}
</style>
