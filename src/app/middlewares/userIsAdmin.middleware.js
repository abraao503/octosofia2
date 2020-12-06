module.exports = (request, response, next) => {
  if(request.isAdmin || request.userId === 8){
    return next();
  }

  return response.status(401).json({ error: 'You are not allowed to access this route.'});
};