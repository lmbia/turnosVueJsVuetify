<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <v-card class="animate__animated animate__fadeIn">
          <v-img height="150px" src="../assets/banner-neurotic-peluqueria.jpg">
            <v-card-title class="accent--text mt-2">
              <span class="ml-3 banner-text overflow">{{ diaPromo }}</span>
            </v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Banner",

  data: () => ({
    diaPromo: "",
  }),

  mounted() {
    this.traerLocal();
  },

  methods: {
    traerLocal: function () {
      let dato = JSON.parse(localStorage.getItem("promo"));
      let dia = new Date();
      let diaActual = dia.getDay();
      for (let rta of dato) {
        if (diaActual == rta.diaPromo) {
          this.diaPromo = rta.title;
          break;
        } else {
          this.diaPromo = "¡Sacá tu turno online!";
        }
      }
    },
  },
  
};
</script>

<style scope>
.banner-text {
  font-size: 1.6em;
}
.overflow {
  word-break: keep-all;
}
</style>