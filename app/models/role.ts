import { DateTime } from 'luxon'
import User from '#models/user'
import Permission from '#models/permission'
import type { ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany, hasMany } from '@adonisjs/lucid/orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id'
  })
  declare permissions: ManyToMany<typeof Permission>

  @hasMany(() => User)
  declare users: HasMany<typeof User>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}