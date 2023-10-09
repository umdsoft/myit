const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class Tasks extends Model {
	static get tableName() {
		return "lead_tasks"
	}

	static get jsonSchema() {

	}
}

module.exports = Tasks