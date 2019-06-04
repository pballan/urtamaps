<template>
  <div>
    <font-awesome-picker v-on:selectIcon="iconLogger"></font-awesome-picker>
    <form>
      <v-text-field
        v-model="title"
        :error-messages="titleErrors"
        label="Title"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="description"
        :error-messages="descriptionErrors"
        label="Description"
        required
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="image"
        label="Image path"
        @input="$v.image.$touch()"
        @blur="$v.image.$touch()"
      ></v-text-field>
      <v-select
        v-model="select"
        :items="categories"
        :error-messages="selectErrors"
        label="Category"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-btn @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </div>
</template>

<script>
// CommitChart.js
  import { fontAwesomePicker } from 'font-awesome-picker';
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: {
        'font-awesome-picker': fontAwesomePicker,
    },
    
    mixins: [validationMixin],

    validations: {
      title: { required },
      description: { required },
      select: { required }
    },

    data: () => ({
      title: '',
      description: '',
      select: null,
      // esto dsp deberia ser un get a la base y actualizarlo con los cambios
      categories: [
        'Cafeteria',
        'Libreria',
        'Plaza'
      ],
      longitude: null,
      latitude: null,
      image: '',
      icon: null
    }),

    computed: {
      selectErrors () {
        return this.fieldErrors('Item', this.$v.select)
      },
      titleErrors () {
        return this.fieldErrors('title', this.$v.title)
      },
      descriptionErrors () {
        return this.fieldErrors('description', this.$v.description)
      },

    },

    methods: {
      submit () {
        let submitedMarker = {
          position: { 
            lat: parseFloat(this.latitude),
            lng: parseFloat(this.longitude)
          },
          title: this.title,
          description: this.description,
          category: this.select,
          icon: this.icon,
          img_provided: (this.image != '' || this.image != undefined),
          image: this.image,
        };
        this.$emit('newMarker', submitedMarker);
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.title = ''
        this.description = ''
      },
      fieldErrors (aName, aProperty) {
        const errors = []
        if (!aProperty.$dirty) return errors
        !aProperty.required && errors.push(aName + ' is required')
        return errors
      },
      iconLogger(selectedIcon) {
        this.icon = 'fa ' + selectedIcon.className;
        console.log('selected', selectedIcon);
      },
      setCoordinates(coords){
        this.latitude = coords.lat();
        this.longitude = coords.lng();
      },
    }
  }
</script>