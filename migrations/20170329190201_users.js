exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments()
        table.string('first_name').notNullable().defaultTo('')
        table.string('last_name').notNullable().defaultTo('')
        table.string('email').notNullable().unique()
        table.specificType('hashed_password', 'character(60)').notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
