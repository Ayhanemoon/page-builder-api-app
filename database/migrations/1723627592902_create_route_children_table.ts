import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'route_children'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('route_id').unsigned().references('id').inTable('routes').onDelete('CASCADE')
      table.integer('child_id').unsigned().references('id').inTable('routes').onDelete('CASCADE')
      table.primary(['route_id', 'child_id'])
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}