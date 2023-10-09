const { Model } = require("objection")
const knex = require("../settings/mDb")

Model.knex(knex)

class Person extends Model {
    static get tableName() {
        return "person"
    }

    static get jsonSchema() {

    }
}

module.exports = Person