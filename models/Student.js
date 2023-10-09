const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class Student extends Model {
	static get tableName() {
		return "student"
	}

	static get jsonSchema() {

	}
}

module.exports = Student