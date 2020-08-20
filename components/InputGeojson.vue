<template>
  <div>
    <template v-if="!isEdit">
      <input
        id="filePerimetro"
        @change="setFile"
        type="file"
        name="file"
        class="inputfile inputfile--perimetro"
        accept=".geojson"
      >
      <label for="filePerimetro">
        Incluir geojson
      </label>
    </template>
    <template v-else>
      <input
        id="filePerimetro"
        @change="setFile"
        type="file"
        name="file"
        class="inputfile inputfile--perimetro"
        accept=".geojson"
      >
      <label for="filePerimetro">
        Atualizar geojson
      </label>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Filekml',
  props: {
    isEdit: {
      type: Boolean,
      required: false
    }
  },
  data: () => {
    return {
      geojson: {}
    }
  },
  watch: {
    geojson (value) {
      this.$emit('geojson', value)
    }
  },
  methods: {
    setFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', function (e) {
        const geojson = JSON.parse(e.target.result)
        window.convertedGeojson = geojson
      })

      reader.readAsBinaryString(file)

      setTimeout(() => {
        this.geojson = window.convertedGeojson
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &--perimetro {
    & + label {
      border: 1px solid rgba(255, 255, 255, .48);
      border-radius: 20rem;
      padding: 0.5rem 0.75rem;
      color: #FFF;
      font-family: inherit;
      font-size: inherit;
      background-color: #BDBDBD;
      cursor: pointer;
      transition: all ease-out .2s;
      margin-bottom: 1rem;

      &:hover {
        background-color: #777;
      }
      display: inline-block;
    }
  }
}
</style>
