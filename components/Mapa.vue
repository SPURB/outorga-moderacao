<template>
  <div class="mapa">
    <vl-map
      ref="map"
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
        <vl-source-vector
          :features.sync="features"
          @created="onSourceCreated"
        />
        <vl-style-box>
          <vl-style-stroke :width="1" color="#319FD3" />
          <vl-style-fill color="#EAF5FA" />
        </vl-style-box>
      </vl-layer-vector>
    </vl-map>

    <div v-if="create" class="mapa__form">
      <p>Está correto?</p>

      <div class="mapa__btn-group">
        <button
          @click.prevent="salvar"
          type="button"
          class="button-color salvar"
        >
          Sim
        </button>
        <button type="button" class="button-color cancelar">
          Cancelar
        </button>
      </div>
    </div>

    <div v-if="response.pending" class="mapa__form">
      <h3>Enviando arquivo GEOJSON...</h3>
    </div>
    <div v-if="response.success" class="mapa__form">
      <h3>Arquivo GEOJSON enviado com sucesso.</h3>
    </div>
    <div v-if="response.error" class="mapa__form">
      <h3>Ocorreu algum erro.</h3>
      <h4>Erro: {{ response.erro }}</h4>
      <h4>Entre em contato com a equipe de desenvolvimento.</h4>
    </div>
  </div>
</template>

<script>
import turfCenter from '@turf/center'
import { axiosGeojson } from '~/plugins/axios'
export default {
  name: 'Mapa',
  props: {
    id: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      required: true
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      features: undefined,
      center: [],
      create: false,
      zoom: 10.9,
      minZoom: 10.9,
      maxZoom: 19,
      rotation: 0,
      loading: false,
      showModal: false,
      response: {
        pending: false,
        success: false,
        error: false,
        erro: '',
        reset () {
          // para zerar a request
          this.pending = false
          this.success = false
          this.error = false
          this.erro = ''
        }
      }
    }
  },
  watch: {
    data () {
      this.isCreate ? (this.create = this.isCreate) : (this.create = false)
      this.data.features
        ? (this.features = this.data.features)
        : (this.features = [this.data])

      if (this.id > 0) {
        this.create = true
      }
      this.getCenter()
    }
  },
  created () {
    this.isCreate ? (this.create = this.isCreate) : (this.create = false)
    this.data.features
      ? (this.features = this.data.features)
      : (this.features = [this.data])
    this.create = this.isCreate
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
    getCenter () {
      this.center = turfCenter(this.data).geometry.coordinates
      this.loading = false
    },
    onSourceCreated (sourceVm) {
      const map = this.$refs.map
      setTimeout(() => {
        map.$view.fit(sourceVm.$source.getExtent(), {
          size: map.$map.getSize(),
          duration: 1000
        })
      }, 500)
    },
    salvar () {
      this.response.pending = true
      if (this.create && this.id === 0) {
        axiosGeojson
          .post('/geo', this.data)
          .then(res => {
            this.response.pending = false
            this.response.success = true
            this.$emit('IdGeo', res.data)
          })
          .catch(err => {
            this.response.pending = false
            this.response.error = true
            this.response.erro = err
          })
          .finally(() => {
            this.response.reset()
          })
        this.create = false
      } else {
        axiosGeojson
          .put(`/geo/${this.id}`, this.data)
          .then(res => {
            this.response.pending = false
            this.response.success = true
          })
          .catch(err => {
            this.response.pending = false
            this.response.error = true
            this.response.erro = err
          })
          .finally(() => {
            this.response.reset()
          })
        this.create = false
      }
    },
    cancelar () {
      this.$emit('cancel', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.mapa {
  display: flex;
  flex-direction: column;
  max-width: 80vw;
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
  }
}
</style>
