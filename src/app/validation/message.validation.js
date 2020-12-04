const Joi = require('joi');

exports.messageToUserValidation = async (request, response, next) => {
  const messageSchema = Joi.object({
    recipientId: Joi.number().integer().min(1).required(),
    content: Joi.string().required(),
  });

  const message = request.body;

  try{
    await messageSchema.validateAsync(message);
  }catch(err){
    return response.status(400).json({ error: 'Validation fails.'});
  }

  next();
};

exports.messageToAdminValidation = async (request, response, next) => {
  const messageSchema = Joi.object({
    content: Joi.string().required(),
  });

  const message = request.body;

  try{
    await messageSchema.validateAsync(message);
  }catch(err){
    return response.status(400).json({ error: 'Validation fails.'});
  }

  next();
};