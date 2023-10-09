const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class CourseModule extends Model {
	static get tableName() {
		return "course_module"
	}

	static get jsonSchema() {

	}
}

module.exports = CourseModule