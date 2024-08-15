import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Permission.createMany([
      { name: 'user', action: 'create' },
      { name: 'user', action: 'read' },
      { name: 'user', action: 'update' },
      { name: 'user', action: 'delete' },
      { name: 'page', action: 'create' },
      { name: 'page', action: 'read' },
      { name: 'page', action: 'update' },
      { name: 'page', action: 'delete' },
    ])
  }
}