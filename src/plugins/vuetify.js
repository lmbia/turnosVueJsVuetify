import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light:   {
            primary: '#03a9f4',
            secondary: '#00bcd4',
            accent: '#e91e63',
            error: '#f44336',
            warning: '#ffc107',
            info: '#607d8b',
            success: '#9c27b0'
            },
        },
      },
});
