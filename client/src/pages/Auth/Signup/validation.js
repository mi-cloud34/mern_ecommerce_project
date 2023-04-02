import*as  yup from 'yup'
const validations=yup.object().shape({
    email:yup.string().email("Geçerli bir email giriniz").required(),
    password:yup.string().min(5,"Min 5 karakter olmalı").required(),
    passwordConfirm:yup.string().oneOf([yup.ref("password")],"parolalar eşleşmiyor").required()
})
export default validations;