import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string

  @column()
  declare value: string

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}