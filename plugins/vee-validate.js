/* eslint-disable */
import { extend, localize } from 'vee-validate'
import { required, email, alpha, alpha_spaces, alpha_num, numeric, between, min, min_value, max, regex, digits } from 'vee-validate/dist/rules'
import ptbr from 'vee-validate/dist/locale/pt_BR.json'

extend('required', {
  ...required,
  message: 'Este campo é obrigatório'
})

extend('between', {
  ...between,
  message: 'Número de caracteres incorreto'
})

extend('min', {
  ...min,
  message: 'Valor mínimo de caracteres não contemplado'
})
extend('max', {
  ...max,
  message: 'Valor máximo de caracteres ultrapassado'
})

extend('min_value', {
  ...min_value,
  message: 'Valor inválido'
})

extend('email', {
  ...email,
  message: 'Email inválido'
})

extend('alpha', {
  ...alpha,
  message: 'Apenas letras do alfabeto (aA-zZ)'
})

extend('alpha_num', {
  ...alpha_num,
  message: 'Apenas números (0-9) letras do alfabeto (aA-zZ)'
})

extend('alpha_spaces', {
  ...alpha_spaces,
  message: 'Apenas letras do alfabeto (aA-zZ) e espaços'
})

extend('numeric', {
  ...numeric,
  message: 'Inclua um valor numérico'
})

extend('regex', {
  ...regex,
  message: 'Padrão inválido'
})

extend('digits', {
  ...digits,
  message: 'Quantidade de caracteres inválida'
})

localize({ ptbr })

/* eslint-enable */
