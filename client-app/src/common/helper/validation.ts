import { createValidator, isRequired } from "revalidate"

const isValidEmail = createValidator(
    message => value => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return message
        }
    },
    'Invalid email address'
)

const isGreaterThan = (n: any) => createValidator(
    message => value => {
        if (value && Number(value) <= n) {
            return message
        }
    },
    field => `${field} must be greater than ${n}`
)

export default { isValidEmail, isGreaterThan }
