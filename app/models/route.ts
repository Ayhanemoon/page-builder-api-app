import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany, belongsTo } from '@adonisjs/lucid/orm'
import Page from '#models/page'
import User from '#models/user'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare path: string

  @column()
  declare slug: string

  @column()
  declare pageId: number

  @belongsTo(() => Page)
  declare page: BelongsTo<typeof Page>

  @column()
  declare parentId: number

  @hasMany(() => Route, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Route>

  @manyToMany(() => Route, {
    pivotTable: 'route_children',
    localKey: 'id',
    pivotForeignKey: 'route_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'child_id'
  })
  declare childRoutes: ManyToMany<typeof Route>

  @column()
  declare creatorId: number

  @belongsTo(() => User)
  declare creator: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}