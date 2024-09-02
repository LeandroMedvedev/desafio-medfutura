const registrador = (request, _, next) => {
  console.log(`${request.method} ${request.url} - ${new Date().toISOString()}`);
  next();
};

module.exports = registrador;
