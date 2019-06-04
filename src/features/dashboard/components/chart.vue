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
        v-model="latitude"
        :error-messages="latitudeErrors"
        label="Latitude"
        required
        @input="$v.latitude.$touch()"
        @blur="$v.latitude.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="longitude"
        :error-messages="longitudeErrors"
        label="Longitude"
        required
        @input="$v.longitude.$touch()"
        @blur="$v.longitude.$touch()"
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
      latitude: { required },
      longitude: { required },
      select: { required }
    },

    data: () => ({
      title: '',
      description: '',
      select: null,
      categories: [
        'Cafeteria',
        'Libreria',
        'Plaza'
      ],
      longitude: '',
      latitude: '',
      image: ''
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
      latitudeErrors () {
        return this.fieldErrors('latitude', this.$v.latitude)
      },
      longitudeErrors () {
        return this.fieldErrors('longitude', this.$v.longitude)
      }
    },

    methods: {
      submit () {
        alert(this.$v.title)
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
        console.log('selected', selectedIcon)
      },
    }
  }
</script>