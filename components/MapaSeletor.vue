<template>
  <div class="mapa">
    <vl-map
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 400px"
    >
      <vl-view
        :zoom.sync="zoom"
        :min-zoom.sync="zoom"
        :max-zoom.sync="maxZoom"
        :rotation.sync="rotation"
        :center.sync="center"
        projection="EPSG:4326"
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

        <!-- interactions -->
        <vl-interaction-select :features.sync="selectedFeatures" />
      </vl-layer-vector>
    </vl-map>
    <div v-if="selectedFeatures.length" class="mapa__actions">
      <p>Associar esta feição ao cadastro {{ $route.params.id }}?</p>
      <button
        @click.prevent="update(selectedFeatures[0])"
        class="mapa__btn button-color salvar"
      >
        Sim
      </button>
      <button @click.prevent="close" class="mapa__btn button-color cancelar">
        Cancelar
      </button>
    </div>
  </div>
</template>
<script>
import { axiosGeojson } from '~/plugins/axios'

export default {
  name: 'MapaSeletor',
  props: {
    idMapa: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      selectedFeatures: [],
      features: [],
      zoom: 12.9,
      maxZoom: 19,
      rotation: 0,
      center: [-46.685461, -23.585462]
    }
  },
  async created () {
    const { get } = axiosGeojson
    const { idopurbanasrc } = this.$route.query

    try {
      const { data } = await get(`/mapas/${this.idMapa}`)
      this.features = data.features
    } catch (e) {
      throw new Error(e)
    }
  },
  methods: {
    close () {
      this.$emit('closeMapSelect')
    },
    update (feature) {
      this.$emit('changeSelected', feature)
      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.mapa {
  max-width: 80vw;
  &__btn {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
