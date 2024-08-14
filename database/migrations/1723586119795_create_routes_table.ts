import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'routes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('slug').nullable()
      table.string('path').notNullable()
      table.integer('page_id').unsigned().references('id').inTable('pages')
      table.integer('parent_id').unsigned().nullable().references('id').inTable('routes')
      table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}