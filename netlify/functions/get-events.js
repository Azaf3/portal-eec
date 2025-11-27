// Netlify Function: retorna os eventos do arquivo local do front-end
const events = require('../../src/data/eventsData');

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(events)
  };
}
