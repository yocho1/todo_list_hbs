import Joi from 'joi'

//List validation
const listValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  })
  return schema.validate(data)
}

export { listValidation }