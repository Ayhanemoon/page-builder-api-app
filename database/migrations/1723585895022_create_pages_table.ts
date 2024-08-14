import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').notNullable()
      table.text('content').notNullable()
      table.text('layout').notNullable()
      table.text('seo_config').nullable()
      table.specificType('creator_id', 'integer[]').references('id').inTable('users')
      table.integer('status_id').unsigned().references('id').inTable('options')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}