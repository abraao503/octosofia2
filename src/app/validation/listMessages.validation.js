const Joi = require('joi');

exports.listMessagesValidation = async (request, response, next) => {
  const querySchema = Joi.object({
    limit: Joi.number().min(1),
    olderThan: Joi.date().iso(),
  });

  const query = request.query;

  try{
    await querySchema.validateAsync(query);
  }catch(err){
    return response.status(400).json({ error: 'Validation fails.'});
  }

  next();
};