module.exports = {
	development: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST || 'localhost',
			database: process.env.DB_DBNAME || 'admin_it_academy',
			user: process.env.DB_USERNAME || 'admin_it_academy',//admin_it_academy
			password: process.env.DB_PASSWORD || '#ITacademy123',//#ITacademy123
		},
		pool: {
			min: 0,
			max: 7,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
}