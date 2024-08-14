import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').notNullable()
      table.json('content').notNullable()
      table.json('layout').notNullable()
      table.json('seo_config').nullable()
      table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      table.integer('status_id').unsigned().references('id').inTable('options').onDelete('SET NULL')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}