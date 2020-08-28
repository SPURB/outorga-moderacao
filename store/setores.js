import { formApi } from '~/plugins/axios'

export const state = () => ({ // Não repetir states que aparecem no store/index (fetching, error etc)
  setores: [],
  error: false
})

export const getters = {
  oucs: (state, getters) => {
    if (!state.setores.length) { return [] }

    const oucsObjs = state.setores.map(({ OperacaoUrbana }) => OperacaoUrbana)

    const result = []
    const map = new Map()
    for (const item of oucsObjs) {
      if (!map.has(item.IdOperacaoUrbana)) {
        map.set(item.IdOperacaoUrbana, true)
        result.push({
          IdOperacaoUrbana: item.IdOperacaoUrbana,
          Nome: item.Nome
        })
      }
    }
    return result
  }
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  }
}

export const actions = {
  getSetores: async ({ commit }) => {
    try {
      const { data } = await formApi.get('/setores')
      commit('SET', { data, key: 'setores' })
    }
    catch {
      commit('SET', { data: true, key: 'error' })
    }
  }
}
