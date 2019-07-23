import local from '@feathersjs/authentication-local'
import auth from '@feathersjs/authentication'
import validate from 'validators/register.validate'
const {MONGO_DATABASE} = process.env


export default (app, mongo) => {
  
  const Model =  mongo.db(MONGO_DATABASE).collection('users')

  app.use('users/check-email', {
    async find() {
      return []
    },
    // check if email exists
    async get(email) {
      const user = await Model.findOne({email,})
      return {
        exists: !!user
      }
    },
  });

  app.use('users', {

    async find() {
      return []
    },
    
    // check if user exists
    async get(username) {
      const user = await Model.findOne({username,})
      return {
        exists: !!user
      }
    },

    async create(form) {
      console.log(form)
      const errors = validate(form)
      if (errors) {
        return app.setState('signup-form', {
          errors,
        })
      }
      const {exists} = await this.get(form.username)
      const email = await Model.findOne({email: form.email,})
      if (!exists && !email) {
        return Model.insert(form)
      } else {
        return app.setState('signup-form', {
          errors: {
            username: ["User already exists"],
          }
        });
      }
    },

    async update() {
      return []
    },

    async remove() {
      return []
    },

  })

  app.service('users').hooks({
    before: {
      create: [
        local.hooks.hashPassword(),
      ]
    },
    after: local.hooks.protect('password')
  })

  app.service('authentication').hooks({
    error: async (ctx) => {
      ctx.error.stack = null;
      return ctx;
    },
    before: {
     create: [
      // You can chain multiple strategies
      auth.hooks.authenticate(['local']),
     ],
     remove: [
      auth.hooks.authenticate('jwt')
     ]
    },
   });

}
