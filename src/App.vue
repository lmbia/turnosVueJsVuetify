<template>
  <v-app>
    <v-app-bar flat app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Neurotic Logo"
          class="shrink mr-2"
          contain
          src="../src/assets/logo-neurotic-peluqueria.png"
          transition="scale-transition"
          width="120"
        />
      </div>
    </v-app-bar>

    <v-bottom-navigation fixed color="primary" grow>
      <v-btn :to="rutas[1].path">
        <span>Mis turnos</span>
        <v-icon>mdi-{{ rutas[1].icono }}</v-icon>
      </v-btn>

      <v-btn :to="rutas[0].path">
        <span>Inicio</span>
        <v-icon>mdi-{{ rutas[0].icono }}</v-icon>
      </v-btn>

      <v-btn :to="rutas[2].path">
        <span>Contacto</span>
        <v-icon>mdi-{{ rutas[2].icono }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-main class="mb-5 pb-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    rutas: [
      {
        titulo: "Inicio",
        icono: "home",
        path: "/",
      },
      {
        titulo: "Mis turnos",
        icono: "history",
        path: "/mis-turnos",
      },
      {
        titulo: "Contacto",
        icono: "email-outline",
        path: "/contacto",
      },
    ],
    diaPromo: "",
  }),

  mounted() {
    fetch("https://lucasbiagiotti.com/datosbarbapp.php")
      .then((response) => response.json())
      .then((response) => {
        this.guardarLocal(response);
      });
  },

  methods: {
    guardarLocal: function (response) {
      localStorage.setItem("promo", JSON.stringify(response));
    },
  },
};
</script>

<style scope>
</style>
