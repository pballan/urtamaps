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
      categories: [
        'Cafeteria',
        'Libreria',
        'Plaza'
      ],
      longitude: null,
      latitude: null,
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

    },

    methods: {
      submit () {
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
      setCoordinates(coords){
        console.log(coords.y) // VIVA PERON
      },
    }
  }
</script>