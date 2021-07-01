<template>
  <v-container>
    <div v-if="arrLocal.length > 0" class="mb-5 pb-5">
      <div class="mb-5 pb-5">
        <h2 id="mis-turnos" class="animate__animated animate__fadeIn">Historial de Turnos</h2>
        <ul v-for="(turno, index) in arrLocal" :key="index" class="mis-turnos">
          <li>Nombre: {{ turno.nombre | capitalize }}</li>
          <li>Fecha: {{ turno.fecha }}</li>
          <li>Horario: {{ turno.horario }}</li>
          <v-btn :to="'/editar/' + index"
            class="my-2"><v-icon>mdi-file-document-edit-outline</v-icon></v-btn
          >
          <v-btn @click="eliminar(index)" color="error"
            class="my-2 mx-2"><v-icon>mdi-trash-can-outline</v-icon></v-btn
          >
        </ul>
      </div>
    </div>
    <div v-else>{{ msj }}</div>
  </v-container>
</template>

<script>
export default {
  name: "MisTurnos",

  data: () => ({
    arrLocal: [],
    msj: "",

    rutas: [
      {
        titulo: "Editar",
        icono: "home",
        path: "/editar",
      },
    ],
  }),

  mounted: function () {
    this.traerLocal();
  },

  methods: {
    traerLocal: function () {
      if (localStorage.local) {
        console.log("hay algo");
        let dato = JSON.parse(localStorage.getItem("local"));
        this.arrLocal = dato;
      } else {
        this.msj = "No tienes turnos";
      }
    },
    eliminar: function (index) {
      let local = JSON.parse(localStorage.getItem("local"));
      for (let item in local) {
        console.log(item, index);
        if (item == index) {
          let pregunta = confirm("¿Quieres eliminar el turno?");
          if (pregunta) {
            local.splice(item, 1);
            localStorage.setItem("local", JSON.stringify(local));
            this.$router.push("/");
          }
        }
      }
    },    
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scope>
.mis-turnos {
  padding-top: 1em;
  padding-bottom: 0.4em;
  color: gray;
  border: 1px;
  border-bottom: 1px solid gray;
  list-style: none;
}
</style>