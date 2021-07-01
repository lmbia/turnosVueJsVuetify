<template>
  <v-container>
    <div class="mb-5 pb-5">
      <div class="mb-5 pb-5">
        <h2 id="mis-turnos">Editar Turno</h2>
        <ul class="mis-turnos">
          <li>
            <label for="nombre">Nombre</label>
            <input type="text" v-model="arrDatos.nombre" />
          </li>
          <li>Fecha: {{ arrDatos.fecha }}</li>
          <li>
            <label for="horario">Horario</label>
            <select name="horario" id="horario" v-model="arrDatos.horario">
              <option v-for="(hora, index) in horarios" :key="index">
                {{ hora }}
              </option>
            </select>
          </li>

          <v-btn @click="guardar()"
            class="my-4"><v-icon>mdi-content-save-outline</v-icon></v-btn
          >
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Editar",

  data: () => ({
    horaApertura: 9,
    horaCierre: 20,
    intervalo: 15,
    horarios: [],
    datosOk: false,
    errores: [],
    mostrar_local: "",
    arrDatos: [],
    arrDatosCom: [],
  }),

  mounted() {
    for (let i = this.horaApertura; i <= this.horaCierre; i++) {
      this.horarios.push(i + ":" + "00");
      if (!(i == this.horaCierre)) {
        for (let x = 1; x < 60 / this.intervalo; x++) {
          this.horarios.push(i + ":" + this.intervalo * x);
        }
      }
    }
    this.traerLocal();
  },

  methods: {
    traerLocal: function () {
      if (localStorage.local) {
        console.log("hay algo");
        let dato = JSON.parse(localStorage.getItem("local"));
        console.log(dato[this.$route.params.id]);
        this.arrDatosCom = dato;
        this.arrDatos = dato[this.$route.params.id];
      } else {
        console.log("error");
      }
    },
    guardar: function () {
      localStorage.setItem("local", JSON.stringify(this.arrDatosCom));
      this.$router.push("/mis-turnos");
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

.v-application ul, .v-application ol {
 padding-left: 0px;
}
</style>