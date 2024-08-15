import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeSave, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'

import Page from '#models/page'
import Role from '#models/role'
import Route from '#models/route'
import Option from '#models/option'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare mobile: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare roleId: number

  @column()
  declare stateId: number

  @column()
  declare cityId: number
  
  @column()
  declare statusId: number

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Option, {
    foreignKey: 'stateId',
    localKey: 'id',
  })
  declare status: BelongsTo<typeof Option>

  @belongsTo(() => Option, {
    foreignKey: 'stateId',
    localKey: 'id',
  })
  declare state: BelongsTo<typeof Option>

  @belongsTo(() => Option, {
    foreignKey: 'cityId',
    localKey: 'id',
  })
  declare city: BelongsTo<typeof Option>
  
  @hasMany(() => Page)
  declare pages: HasMany<typeof Page>

  @hasMany(() => Route)
  declare routes: HasMany<typeof Route>

  @manyToMany(() => User, {
    pivotTable: 'user_invitations',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'invitation_id'
  })
  declare invitations: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}