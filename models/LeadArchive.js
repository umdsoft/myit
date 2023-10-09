const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class LeadArchive extends Model {
	static get tableName() {
		return "lead_archive"
	}
	//type
	// 1-yaratildi
	static get jsonSchema() {

	}
}

module.exports = LeadArchive