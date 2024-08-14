import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL')
      table.integer('reference_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('invite_code').nullable()
      table.string('full_name', 255).notNullable()
      table.string('avatar_url', 255).nullable()
      table.string('email', 254).notNullable().unique()
      table.string('mobile', 16).nullable()
      table.integer('state_id').unsigned().nullable().references('id').inTable('options').onDelete('SET NULL')
      table.integer('city_id').unsigned().nullable().references('id').inTable('options').onDelete('SET NULL')
      table.string('password', 255).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}