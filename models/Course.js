const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class Course extends Model {
	static get tableName() {
		return "course"
	}

	static get jsonSchema() {

	}
}

module.exports = Course