<template>
  <div>
    <Banner/>
    <Formulario/>
  </div>
</template>

<script>
  import Banner from '../components/Banner'
  import Formulario from '../components/Formulario'

  export default {
    name: 'Home',

    components: {
      Banner,
      Formulario,
    },

  }
</script>
