import Role from '#models/role'
import Roles from '#enums/roles'
import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const permissions = await Permission.all()
    const permissionsMap = new Map(permissions.map(permission => [`${permission.name}_${permission.action}`, permission.id]))

    const adminPermissions = permissions.map(permission => permission.id)
    const creatorPermissions = [
      permissionsMap.get('user_read'),
      permissionsMap.get('page_create'),
      permissionsMap.get('page_read'),
      permissionsMap.get('page_update'),
      permissionsMap.get('page_delete'),
    ].filter((id): id is number => id !== undefined)
    const userPermissions = [
      permissionsMap.get('user_read'),
      permissionsMap.get('page_read'),
    ].filter((id): id is number => id !== undefined)

    const adminRole = await Role.create({ id: Roles.Admin, name: 'Admin' })
    await adminRole.related('permissions').attach(adminPermissions)

    const creatorRole = await Role.create({ id: Roles.Creator, name: 'Creator' })
    await creatorRole.related('permissions').attach(creatorPermissions)

    const userRole = await Role.create({ id: Roles.User, name: 'User' })
    await userRole.related('permissions').attach(userPermissions)
  }
}