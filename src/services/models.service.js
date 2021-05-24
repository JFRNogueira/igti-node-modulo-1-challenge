const {
  getNextOrderId,
  saveNextOrderId,
  createPedido,
  updatePedido,
  getPedido,
  getAllPedidos,
  deletePedido
} = require('../repositories/models.repository');



async function incrementOrderId() {
  const orderId = await getNextOrderId()
  const nextOrderId = orderId + 1
  await saveNextOrderId(nextOrderId)
  return { saved: true }
}

async function getOrderIndexById(orders, id) {
  for (let index = 0; index < orders.length; index++) {
    if (orders[index].id == id) {
      return index;
    }
  }
  return 'not found'
}

async function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
}



exports.createOneOrder = async function createOneOrder(req, res) {
  const client = req.body.cliente
  const product = req.body.produto
  const value = req.body.valor
  const orderId = await getNextOrderId()

  const order = {
    id: orderId,
    cliente: client,
    produto: product,
    valor: value,
    entregue: false,
    timestamp: new Date()
  }
  await createPedido(order)

  res.send(order)
}


exports.updateOneOrder = async function updateOneOrder(req, res) {
  var id = req.body.id
  const updatedOrder = req.body
  await updatePedido(id, updatedOrder)

  res.send(updatedOrder)
}


exports.deleteOneOrder = async function deleteOneOrder(req, res) {
  var id = req.body.id
  await deletePedido(id)
  res.send({ deletedId: id })
}


exports.getOneOrder = async function getOneOrder(req, res) {
  var id = req.body.id
  const order = await getPedido(id)
  res.send(order)
}


exports.getTotalAmount = async function getTotalAmount(req, res) {
  const orders = await getAllPedidos()
  var totalAmount = 0

  console.log(req.body)

  if ("cliente" in req.body) {
    const client = req.body.cliente
    for (let index = 0; index < orders.length; index++) {
      if (orders[index].cliente == client) {
        console.log('oi')
        totalAmount += orders[index].valor
      }
    }
  }

  if ("produto" in req.body) {
    const product = req.body.produto
    for (let index = 0; index < orders.length; index++) {
      if (orders[index].produto == product) {
        totalAmount += orders[index].valor
      }
    }
  }
  res.send({ valorTotal: totalAmount })
}


exports.countProducts = async function countProducts(req, res) {
  const orders = await getAllPedidos()
  var totalAmount = 0

  console.log(req.body)

  if ("cliente" in req.body) {
    const client = req.body.cliente
    for (let index = 0; index < orders.length; index++) {
      if (orders[index].cliente == client) {
        console.log('oi')
        totalAmount += orders[index].valor
      }
    }
  }

  if ("produto" in req.body) {
    const product = req.body.produto
    for (let index = 0; index < orders.length; index++) {
      if (orders[index].produto == product) {
        totalAmount += orders[index].valor
      }
    }
  }
  res.send({ valorTotal: totalAmount })
}











exports.listModels = async function listModels(req, res) {
  const brandName = await req.body.nomeMarca
  const allBrands = await getAllBrandsNames()
  var targetBrandName = ''

  for (let index = 0; index < allBrands.length; index++) {
    currentBrandname = allBrands[index]
    if (brandName.toLowerCase() == currentBrandname.toLowerCase()) {
      targetBrandName = currentBrandname
    }
  }

  if (targetBrandName == '') {
    res.send([])
  }

  const brandDoc = await getOneBrandDoc(targetBrandName)
  const brandModels = brandDoc.models
  res.send(brandModels)
}
