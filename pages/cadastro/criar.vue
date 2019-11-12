<template>
  <ValidationObserver v-slot="{ valid, errors }" tag="div" :class="'criar'">
    <!-- <div :class="{ faded: !isFetching }" class="preloader">
      <h2>Carregando</h2>
    </div>
    <div v-if="displayError" class="error">
      <h2>Erro</h2>
      <p>{{ errorMessage }}</p>
      <button @click="reloadApp">
        <span>&#8635;</span>
        Tentar novamente
      </button>
    </div> -->
    <header>
      <h2>Criar novo registro</h2>
      <button @click="$router.push('/')">
        &#8624; Voltar
      </button>
    </header>
    <form>
      <table>
        <tbody>
          <tr>
            <td>
              <label for="inputInteressado">Interessado</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min:1|max:1500" tag="td">
              <input
                id="inputInteressado"
                v-model="Interessado"
                name="Interessado"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Situação</td>
            <ValidationProvider v-slot="{ errors }" :rules="{ required: { allowFalse: false } }" tag="td">
              <input
                id="Checklist"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="1"
              >
              <label for="Checklist">Checklist</label>
              <input
                id="EmAnalise"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="2"
              >
              <label for="EmAnalise">Em análise</label>
              <input
                id="Indeferido"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="3"
              >
              <label for="Indeferido">Indeferido</label>
              <input
                id="Aprovado"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="4"
              >
              <label for="Aprovado">Aprovado</label>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputEmail">E-mail</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|email" tag="td">
              <input
                id="inputEmail"
                v-model="Email"
                name="Email"
                type="email"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputTelefone">Telefone</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="numeric|min:8|max:15" tag="td">
              <input
                id="inputTelefone"
                v-model="Telefone"
                name="Telefone"
                type="text"
                placeholder="11987654321"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputProcurador">Procurador</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:120" tag="td">
              <input
                id="inputProcurador"
                v-model="Procurador"
                name="Procurador"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputSei">SEI</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:1200" tag="td">
              <textarea
                id="inputSei"
                v-model="Sei"
                name="Sei"
                rows="1"
                placeholder="2020-0.000.000-0"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCertidao">Certidão</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:300" tag="td">
              <textarea
                id="inputCertidao"
                v-model="Certidao"
                name="Certidao"
                rows="1"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputLicenciamento">Licenciamento</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:300" tag="td">
              <textarea
                id="inputLicenciamento"
                v-model="Licenciamento"
                name="Licenciamento"
                rows="1"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <ValidationProvider v-slot="{ errors }" :rules="{ required: { allowFalse: false } }" tag="td">
              <input
                id="AguaBranca"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucab"
              >
              <label for="AguaBranca">Água Branca</label>
              <input
                id="FariaLima"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucfl"
              >
              <label for="FariaLima">Faria Lima</label>
              <input
                id="AguaEspraiada"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucae"
              >
              <label for="AguaEspraiada">Água Espraiada</label>
              <input
                id="Centro"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucc"
              >
              <label for="Centro">Centro</label>
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr v-if="ouc!==''">
            <td>
              Setor
            </td>
            <td>
              <template v-for="(setor, index) in Setores">
                <input
                  :id="`setor_${setor.id}`"
                  :key="index + 1000"
                  v-model="IdSetor"
                  :value="setor.id"
                  :name="setor.nome"
                  type="radio"
                >
                <label :key="index + 100" :for="`setor_${setor.id}`">{{ setor.nome }}</label>
              </template>
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </td>
          </tr>
          <tr>
            <td>SubSetor</td>
            <ValidationProvider v-slot="{ errors }" rules="min:1|max:100" tag="td">
              <input
                id="inputSubSetor"
                v-model="SubSetor"
                name="SubSetor"
                type="text"
                placeholder="99Z"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Endereço</td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:300" tag="td">
              <textarea
                id="inputEndereco"
                v-model="Endereco"
                name="Endereco"
                rows="1"
              />
            </ValidationProvider>
          </tr>
          <tr>
            <td>Área do Terreno (m²)</td>
            <ValidationProvider v-slot="{ errors }" rules="min_value:0.01" tag="td">
              <input
                id="inputAreaTerreno"
                v-model="AreaTerreno"
                name="AreaTerreno"
                type="number"
                step="0.01"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Zona</td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:100" tag="td">
              <input
                id="inputZona"
                v-model="Zona"
                name="Zona"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Uso</td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:50" tag="td">
              <input
                id="inputUso"
                v-model="Uso"
                name="Uso"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>C.A. do Projeto</td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputCAProjeto"
                v-model="CAProjeto"
                name="CAProjeto"
                type="number"
              >
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdResidencial">Área Adicional (residencial)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputAreaAdResidencial"
                v-model="AreaAdResidencial"
                name="AreaAdResidencial"
                type="number"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdNaoResidencial">Área Adicional (não residencial)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min_value:0" tag="td">
              <input
                id="inputAreaAdNaoResidencial"
                v-model="AreaAdNaoResidencial"
                name="AreaAdNaoResidencial"
                type="number"
                step="0.01"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>CEPAC - Objeto</td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputCepacObjeto"
                v-model="CepacObjeto"
                name="CepacObjeto"
                type="number"
                step="1"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCepacAreaAdicional">CEPAC - Área Adicional</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min_value:0" tag="td">
              <input
                id="inputCepacAreaAdicional"
                v-model="CepacAreaAdicional"
                name="CepacAreaAdicional"
                type="number"
                step="0.01"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCepacModUso">CEPAC - Modo de uso</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputCepacModUso"
                v-model="CepacModUso"
                name="CepacModUso"
                type="number"
                step="1"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Código da Proposta</td>
            <ValidationProvider v-slot="{ errors }" rules="min:1|max:100" tag="td">
              <input
                id="inputCodigoProposta"
                v-model="CodigoProposta"
                name="CodigoProposta"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Observações</td>
            <ValidationProvider v-slot="{ errors }" rules="min:3|max:2000" tag="td">
              <textarea
                id="inputObs"
                v-model="Obs"
                name="Obs"
                type="text"
                rows="5"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
        </tbody>
      </table>
    </form>
    <footer>
      <button @click.prevent="$router.push('/')">
        Cancelar
      </button>
      <button id="salvar" :disabled="!valid" @click.prevent="novaFila">
        Salvar
      </button>
    </footer>
  </ValidationObserver>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from '~/plugins/axios'
import { fila as filaNiceName } from '~/utils/glossario'

export default {
  name: 'Criar',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      SubSetor: '',
      Certidao: '',
      Interessado: '',
      Licenciamento: '',
      Sei: '',
      AreaAdResidencial: 0,
      AreaAdNaoResidencial: 0,
      CepacAreaAdicional: 0,
      CepacModUso: 0,
      Email: '',
      Telefone: '',
      Procurador: '',
      CepacObjeto: 0,
      Endereco: '',
      AreaTerreno: '',
      Zona: '',
      Uso: '',
      CAProjeto: '',
      Obs: '',
      CodigoProposta: '',
      UsuarioAlteracao: '',
      IdStatus: 0,
      IdSetor: 0,
      mapSetores: {
        '1': 'HÉLIO PELLEGRINO',
        '2': 'FARIA LIMA',
        '3': 'PINHEIROS',
        '4': 'OLIMPÍADAS',
        '5': 'JABAQUARA',
        '6': 'CHUCRI ZAIDAN',
        '7': 'MARGINAL PINHEIROS',
        '8': 'BERRINI',
        '9': 'BROOKLIN',
        '10': 'CENTRO',
        '11': 'A',
        '12': 'B',
        '13': 'C',
        '14': 'D',
        '15': 'E'
      },
      mapOucSetores: {
        oucfl: [ '1', '2', '3', '4' ],
        oucae: [ '5', '6', '7', '8', '9' ],
        oucc: [ '10' ],
        oucab: [ '11', '12', '13', '14', '15' ]
      },
      filaNiceName,
      ouc: '',
      Setores: [],
      displayError: false,
      fetchError: false,
      isFetching: false,
      errorMessage: ''
    }
  },
  watch: {
    ouc (key) {
      this.Setores = this.mapOucSetores[key].map((id) => {
        return {
          id,
          nome: this.mapSetores[id]
        }
      })
    }
  },
  methods: {
    reloadApp () { window.location.reload(true) },
    novaFila () {
      axios.post('fila', {
        Certidao: this.Certidao,
        Interessado: this.Interessado,
        Licenciamento: this.Licenciamento,
        Sei: this.Sei,
        AreaAdResidencial: parseInt(this.AreaAdResidencial),
        AreaAdNaoResidencial: parseInt(this.AreaAdNaoResidencial),
        CepacAreaAdicional: parseInt(this.CepacAreaAdicional),
        CepacModUso: parseInt(this.CepacModUso),
        Email: this.Email,
        Telefone: this.Telefone,
        Procurador: this.Procurador,
        CepacObjeto: parseInt(this.CepacObjeto),
        Endereco: this.Endereco,
        AreaTerreno: parseInt(this.AreaTerreno),
        Zona: this.Zona,
        Uso: this.Uso,
        CAProjeto: parseInt(this.CAProjeto),
        Obs: this.Obs,
        CodigoProposta: this.CodigoProposta,
        IdStatus: parseInt(this.IdStatus),
        IdSetor: parseInt(this.IdSetor)
      })
        .then((res) => {
          const id = res.data.Id
          const url = window.location.href.replace('criar', id)
          alert(`
            Cadastro realizado com sucesso! o Identifador do cadastro é: ${id}
            A url deste registro para edição é:
            ${url}
        `)
        })
        .catch(err => console.error(err))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/formCadastro.scss';

</style>
