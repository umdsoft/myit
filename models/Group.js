const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class Group extends Model {
	static get tableName() {
		return "groups"
	}

	static get jsonSchema() {

	}
}

module.exports = Group