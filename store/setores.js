import { formApi } from '~/plugins/axios'

export const state = () => ({
  setores: [],
  error: false,
  fetching: false,
  ouc: {}
})

export const getters = {
  oucs: (state) => {
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
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await formApi.get('/setores')
      commit('SET', { data, key: 'setores' })
    }
    catch {
      commit('SET', { data: true, key: 'error' })
    }
    finally {
      commit('SET', { data: false, key: 'fetching' })
    }
  },
  setOuc: ({ commit, state }, oucId) => {
    const setor = state.setores.find(({ IdOperacaoUrbana }) => oucId === IdOperacaoUrbana)

    if (!setor) { throw new Error('Ouc não encontrado') }

    commit('SET', { data: setor.OperacaoUrbana, key: 'ouc' })
  },
  resetOuc: ({ commit }) => {
    commit('SET', { data: {}, key: 'ouc' })
  }
}
