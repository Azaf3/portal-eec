// Netlify Function: registra inscrições em arquivo local (apenas para desenvolvimento)
const fs = require('fs');
const path = require('path');

const SUBS_FILE = path.join(__dirname, '..', 'data', 'subscriptions.json');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { nome, email, telefone, eventoId } = payload;
    if (!nome || !email || !eventoId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'nome, email e eventoId são obrigatórios' }) };
    }

    let subs = [];
    if (fs.existsSync(SUBS_FILE)) {
      try {
        subs = JSON.parse(fs.readFileSync(SUBS_FILE, 'utf8'));
      } catch {
        subs = [];
      }
    }

    const newSub = { id: Date.now(), nome, email, telefone: telefone || null, eventoId, createdAt: new Date().toISOString() };
    subs.push(newSub);

    fs.mkdirSync(path.dirname(SUBS_FILE), { recursive: true });
    fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2), 'utf8');

    return { statusCode: 201, body: JSON.stringify({ success: true, subscription: newSub }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
}
