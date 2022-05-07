import Vue from "vue";
import VueRouter from "vue-router";
import Parking from "./views/Parking.vue";
import Discounts from "./views/Discounts.vue";
import Rates from "./views/Rates.vue";
import Reports from "./views/Reports.vue";

import ParkingMoreUsed from "./components/Reports/ParkingMoreUsed.vue";
import TransactionTicketsByVehicle from "./components/Reports/TransactionTicketsByVehicle.vue";
import TikectsByVehicleType from "./components/Reports/TikectsByVehicleType.vue";
import TotalValueTickets from "./components/Reports/TotalValueTickets.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "parking",
    component: Parking,
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
    children: [
      {
        path: "ParkingMoreUsed",
        name: "ParkingMoreUsed",
        component: ParkingMoreUsed,
      },
      {
        path: "TransactionTicketsByVehicle",
        name: "TransactionTicketsByVehicle",
        component: TransactionTicketsByVehicle,
      },
      {
        path: "TikectsByVehicleType",
        name: "TikectsByVehicleType",
        component: TikectsByVehicleType,
      },
      {
        path: "TotalValueTickets",
        name: "TotalValueTickets",
        component: TotalValueTickets,
      },
    ],
  },
  {
    path: "/discounts",
    name: "discounts",
    component: Discounts,
  },
  {
    path: "/rates",
    name: "rates",
    component: Rates,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
