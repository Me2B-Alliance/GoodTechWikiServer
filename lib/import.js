const wiki = require('./wiki')
const docs = require('../data/docs.json')

async function execute() {
  await wiki.import(docs)
}

execute()
