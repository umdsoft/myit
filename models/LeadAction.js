const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class LeadAction extends Model {
	static get tableName() {
		return "lead_action"
	}
	// Lead Status
	// 1-yangi
	// 2-yakunlangan
	static get jsonSchema() {

	}
}

module.exports = LeadAction