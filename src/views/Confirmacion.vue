<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <div class="vista-confirmacion">
          <div><span class="icono-confirm">Icono confirmación</span></div>
          <div>
            <ul>
              <li>
                <p>
                  <span>Hola {{ ultimaReserva.nombre | capitalize }}</span
                  >, {{ mensaje }}
                </p>
              </li>
              <li>Día: {{ ultimaReserva.fecha }}</li>
              <li>Hora: {{ ultimaReserva.horario }}</li>
              <li>Dirección: {{ direccion }}</li>
              <li class="saludo">{{ mensajeB }}</li>
            </ul>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Confirmacion",

  data: () => ({
    mensaje: "tu reserva ha sido confirmada.",
    mensajeB: "¡Te esperamos!",
    direccion: "Av. Pedro Goyeno 274",
    ultimaReserva: {},
  }),

  mounted: function () {
    this.traerLocal();
  },

  methods: {
    traerLocal: function () {
      if (localStorage.local) {
        console.log("hay algo");
        let dato = JSON.parse(localStorage.getItem("local"));
        let i = dato.length - 1;

        this.ultimaReserva = dato[i];
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
.icono-confirm {
  display: block;
  text-indent: -999px;
  overflow: hidden;
  width: 150px;
  height: 150px;
  background-image: url(../assets/icono-confirmacion.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 2em 0;
  margin: 3em auto;
}

.vista-confirmacion ul {
  list-style: none;
  text-align: center;
}

p span {
  font-weight: bold;
  font-size: 1.6em;
}
</style>