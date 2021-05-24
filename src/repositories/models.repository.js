var fs = require('fs');

const DB_PATH = './src/data/pedidos.json'


async function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
}

async function isBoolean(input) {
  return typeof (input) == 'boolean'
}

async function saveDB(pedidos) {
  var pedidosJSON = JSON.stringify(pedidos);
  fs.writeFile(DB_PATH, pedidosJSON, 'utf8', () => {
    return { saved: true }
  });
  return 'Conferir saveDB';
}

async function getOrderIndexById(orders, id) {
  for (let index = 0; index < orders.length; index++) {
    if (orders[index].id == id) {
      return index;
    }
  }
  return 'not found'
}

exports.getNextOrderId = async function getNextOrderId() {
  const db = await readDB();
  const result = db['nextId'];
  return result;
}

exports.saveNextOrderId = async function saveNextOrderId(NextOrderId) {
  var db = await readDB();
  db['nextId'] = NextOrderId;
  await saveDB(db)
  return { saved: true }
}

exports.getAllPedidos = async function getAllPedidos() {
  const pedidos = await readDB()
  return pedidos['pedidos']
}

exports.createPedido = async function createPedido(pedido) {
  var db = await readDB()
  var current_orders = await db.pedidos
  current_orders.push(pedido)
  db['pedidos'] = current_orders
  db['nextId'] = db['nextId'] + 1
  await saveDB(db)
}

exports.updatePedido = async function updatePedido(id, updatedDoc) {
  var db = await readDB()
  var orders = db.pedidos
  const index = await getOrderIndexById(orders, id)
  db.pedidos[index].cliente = updatedDoc.cliente || db.pedidos[index].cliente
  db.pedidos[index].produto = updatedDoc.produto || db.pedidos[index].produto
  db.pedidos[index].valor = updatedDoc.valor || db.pedidos[index].valor
  if ("entregue" in updatedDoc && isBoolean(updatedDoc.entregue)) {
    db.pedidos[index].entregue = updatedDoc.entregue
  }
  await saveDB(db)
}

exports.deletePedido = async function deletePedido(id) {
  var db = await readDB()
  var orders = db.pedidos
  const index = await getOrderIndexById(orders, id)
  orders.splice(index)
  await saveDB(db)
}

exports.getPedido = async function getPedido(id) {
  var db = await readDB();
  var orders = db.pedidos;
  const index = await getOrderIndexById(orders, id);
  result = orders[index];
  return result;
}










exports.saveAllPedidos = async function saveAllPedidos(pedidos) {
  var db = readDB();
  db['pedidos'] = pedidos;
  saveDB(db)
  return { saved: true }
}
