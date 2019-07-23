import validate from 'validate.js'

const Model = {
    username: {
        presence: {
            message: '^Login is required',
        },
        length: {
            maximum: 12,
            minimum: 4,
            message: '^Username must be from 6 to 12 symbols',
        },
    },
    email: {
        email: true
    },
    password: {
        presence: {
            message: '^Password is required',
        },
        length: {
            minimum: 6,
            message: '^Minimum 6 symbols',
        },
    },
    password2: {
        equality: typeof window !== 'undefined' ? "password" : undefined,
    },
    agree: {
        presence: {
            message: '^Before signing up you have to agree with our terms an conditions',
        },
    },
}

export default (data) => validate(data, Model);