<template>
  <div class="mapa">
    <vl-map
      v-if="!loading"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 400px"
    >
      <vl-view
        :zoom.sync="zoom"
        :min-zoom.sync="minZoom"
        :max-zoom.sync="maxZoom"
        :rotation.sync="rotation"
        :center.sync="center"
        ident="view"
      />

      <vl-layer-tile>
        <vl-source-stamen layer="toner" />
      </vl-layer-tile>

      <vl-layer-vector>
        <vl-source-vector :features.sync="features" />
        <vl-style-box>
          <vl-style-stroke :width="1" color="#319FD3" />
          <vl-style-fill color="#EAF5FA" />
        </vl-style-box>
      </vl-layer-vector>
    </vl-map>

    <div class="mapa__form">
      <p>Está correto?</p>

      <div class="mapa__btn-group">
        <button type="button" class="salvar">
          Sim
        </button>
        <button type="button">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mapa',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      features: [],
      center: [],
      zoom: 13,
      minZoom: 13,
      maxZoom: 19,
      rotation: 0,
      loading: false
    }
  },
  watch: {
    data () {
      this.features = this.data.features
      this.getCenter()
    }
  },
  created () {
    this.features = this.data.features
  },
  mounted () {
    this.getCenter()
  },
  methods: {
    loadExternalLib (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onload = () => {
          resolve(`${url} está pronta`)
        }
        script.async = true
        script.src = url
        document.head.appendChild(script)
      })
    },
    async getCenter () {
      this.loading = true
      await this.loadExternalLib('https://unpkg.com/@turf/turf/turf.min.js')
      this.center = window.turf.center(this.data).geometry.coordinates
      this.loading = false
    },
    salvar () {
      console.log('salvar')
    },
    cancelar () {
      console.log('cancelar')
    }
  }
}
</script>

<style lang="scss" scoped>
.mapa {
  display: flex;
  flex-direction: column;

  &__form {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    padding-left: 3rem;

    p {
      margin-bottom: 1rem;
      font-weight: 600;
    }
  }

  &__btn-group {
    display: flex;

    button {
      border: 0;
      padding: 1rem;
      margin-right: 2rem;
      border-radius: 30px;
      padding: 10px 35px;
      color: #fff;
      background-color: #EB5757;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
      border: 2px solid rgba(255, 255, 255, 0.24);
      transition: ease-in-out 0.25s all;

      &.salvar {
        background-color: #038375;
        &:disabled {
          cursor: not-allowed;
          background-color: #ddd;
          opacity: 0.45;
        }
      }
      &:hover {
        cursor: pointer;
        box-shadow: 1px 5px 9px rgba(0, 0, 0, 0.36);
      }
    }
  }
}
</style>
