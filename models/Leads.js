const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class Leads extends Model {
	static get tableName() {
		return "leads"
	}

	static get jsonSchema() {

	}
}

module.exports = Leads