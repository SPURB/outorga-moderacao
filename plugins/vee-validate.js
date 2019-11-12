/* eslint-disable */
import { extend, localize } from 'vee-validate'
import { required, email, alpha, numeric, between, min, min_value, max, regex } from 'vee-validate/dist/rules'
import ptbr from 'vee-validate/dist/locale/pt_BR.json'

extend('required', {
  ...required,
  message: 'Este campo é obrigatório'
})

extend('between', {
  ...between,
  message: 'O número de caracteres está incorreto'
})

extend('min', {
  ...min,
  message: 'Inclua o valor mínimo de caracteres'
})
extend('max', {
  ...max,
  message: 'Não ultrapasse o valor máximo de caracteres'
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

extend('numeric', {
  ...numeric,
  message: 'Inclua um valor numérico'
})

extend('regex', {
  ...regex,
  message: 'Inclua um padrão válido'
})

localize({ ptbr })

/* eslint-enable */
