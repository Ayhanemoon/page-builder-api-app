import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Option from '#models/option'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Page extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare content: string

  @column()
  declare layout: string

  @column()
  declare seo_config: string

  @manyToMany(() => User, {
    pivotTable: 'page_creators',
    localKey: 'id',
    pivotForeignKey: 'page_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id'
  })
  declare creators: ManyToMany<typeof User>

  @column()
  declare statusId: number

  @belongsTo(() => Option, {
    foreignKey: 'statusId',
    localKey: 'id',
  })
  declare status: BelongsTo<typeof Option>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}