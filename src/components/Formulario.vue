<template>
  <v-container class="mb-5 pb-5">
    <v-row justify="space-around">
      <v-col>
        <div>
          <h2 id="cuando-venir" class="animate__animated animate__fadeIn">¿Cuando querés venir?</h2>
          <form
            action="#"
            @submit.prevent
            class="pedir-turno"
            novalidate
            id="formulario"
          >
            <Calendario />

            <div class="form">
              <div>
                <label for="horario" class="titulos-form">Horario</label>
                <select name="horario" id="horario" v-model="turno.horario">
                  <option v-for="(hora, index) in horarios" :key="index">
                    {{ hora }}
                  </option>
                </select>
              </div>
              <div>
                <label for="nombre" class="titulos-form">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  v-model.trim="turno.nombre"
                />
              </div>
              <div>
                <label for="email" class="titulos-form">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="turno.email"
                />
              </div>
              <div>
                <label for="tel" class="titulos-form">Teléfono</label>
                <input
                  type="number"
                  name="tel"
                  id="tel"
                  v-model.number="turno.tel"
                />
              </div>
              <div>
                <label for="comentario" class="titulos-form">Comentario</label>
                <textarea
                  name="comentario"
                  id="comentario"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <button
                @click="reservar()"
                class="btn btn-reservar mb-5"
              >
                Reservar
              </button>
            </div>
          </form>
          <div v-if="datosOk == true" class="estilo" >
           
            <div v-if="cantidadErrores != 0" :class="hayError ? errorColor : ''">
              <div v-for="(error, index) in errores" :key="index"  class="ms-2">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Calendario from "./Calendario";
export default {
  name: "Formulario",
  components: {
    Calendario,
  },

  data: () => ({
    arrTurno: [],
    vistaTurno: {},
    turno: {
      fecha: 0,
      horario: 0,
      nombre: "",
      email: "",
      tel: "",
      comentario: "",
    },
    horaApertura: 9,
    horaCierre: 20,
    intervalo: 15,
    horarios: [],
    datosOk: false,
    errores: [],
    mostrar_local: "",
    hayError: true,
    errorColor: 'red'
  }),
  computed: {
    cantidadErrores: function () {
      return this.errores.length;
    },
  },
  mounted: function () {
    for (let i = this.horaApertura; i <= this.horaCierre; i++) {
      this.horarios.push(i + ":" + "00");
      if (!(i == this.horaCierre)) {
        for (let x = 1; x < 60 / this.intervalo; x++) {
          this.horarios.push(i + ":" + this.intervalo * x);
        }
      }
    }

    if (!localStorage.local) {
      this.arrTurno = [];
    } else {
      this.arrTurno = JSON.parse(localStorage.getItem("local"));
    }
  },
  methods: {
    reservar: function () {
      /* Validación mostrar datos */
      this.datosOk = true;
      this.errores = [];

      /* Validación Fecha Calendario */
      let val = document.querySelector(".day-active");
      if (val != null) {
        let fecha = document.querySelector(".day-active");
        let mes = parseInt(fecha.getAttribute("data-month"));
        let anio = parseInt(fecha.getAttribute("data-year"));
        this.turno.fecha = fecha;

        if (!fecha.classList.contains("day-last")) {
          mes = mes + 1;
        } else if (mes == 0) {
          mes = 12;
          anio = anio - 1;
        } else {
          mes;
        }

        this.turno.fecha = fecha.textContent + "." + mes + "." + anio;
      } else {
        console.log("Debe seleccionar una fecha");
        this.errores.push("Debe seleccionar una fecha");
      }
      /* Validación Horario */
      if (this.turno.horario == "") {
        this.errores.push("Debe seleccionar una hora");
      }
      /* Validación Nombre */
      if (this.turno.nombre.length < 3) {
        this.errores.push("El nombre debe tener al menos 3 letras");
      }
      /* Validación Email */
      let posicion = this.turno.email.indexOf("@") + 2;
      if (this.turno.email == "") {
        this.errores.push("Debe ingresar un email");
      } else if (
        !(
          this.turno.email.indexOf("@") > 0 &&
          this.turno.email.indexOf(".", posicion) != -1
        )
      ) {
        this.errores.push("Debe ingresar un email válido");
      }
      /* Validación Teléfono */
      if (this.turno.tel < 11111110) {
        this.errores.push("Debe ingresar un teléfono válido");
      }

      /* LocaStorage*/

      console.log(this.cantidadErrores);

      if (this.cantidadErrores == 0) {
        document.getElementById("formulario").reset();
        this.arrTurno.push(this.turno);
        localStorage.setItem("local", JSON.stringify(this.arrTurno));
        this.vistaTurno = this.turno;
        this.turno = {};
        this.$router.push("/confirmacion");
      }
    },
  },
};
</script>


<style scope>
:root {
  --color-ppal: #ec1e6d;
  --color-secu: #3dcfec;

  --color-texto-ppal: #2c2c2c;
  --color-texto-secu: #5c4d7d;
  --color-texto-terc: #4e4e4e;

  --color-fondo: #ffffff;
  --color-texto-btn: #fafafa;

  --border-radius: 0.4em;

  --shadow: 0px 10px 30px rgba(27, 27, 27, 0.068);

  color: var(--color-texto-ppal);
}

/* FORMULARIO */

label {
  display: block;
}

form div {
  margin-bottom: 0.8em;
}

textarea {
  resize: none;
  width: 100%;
  border: 1px solid rgb(214, 214, 214);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input,
select {
  border-radius: 0.2em;
  border: 1px solid rgb(214, 214, 214);
  padding: 0.6em;
  font-size: 1em;
  width: 100%;
}

.btn {
  display: block;
  width: 7em;
  text-align: center;
  text-decoration: none;
  border-radius: var(--border-radius);
  background-color: var(--color-secu);
  color: var(--color-texto-btn);
  padding: 0.8em;
}

.btn:hover {
  transition: ease 0.1s;
  background-color: var(--color-ppal);
}

.btn-reservar {
  border: none;
  padding: 1em;
  font-size: 1.2em;
  width: 100%;
  margin: 1em 0;
  float: right;
}

.estilo{
 padding-top: 6em;
}
</style>