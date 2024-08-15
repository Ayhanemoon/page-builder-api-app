
import PageStatuses from '#enums/page_statuses'
import UserStatuses from '#enums/user_statuses'
import Option from '#models/option'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Option.createMany([
      // States
      { label: 'California', value: 'CA', type: 'state' },
      { label: 'New York', value: 'NY', type: 'state'},
      // Cities
      { label: 'Los Angeles', value: 'LA', type: 'city' },
      { label: 'New York City', value: 'NYC', type: 'city' },
      // Page Status
      { label: 'Draft', value: PageStatuses.Draft, type: 'page_status' },
      { label: 'Published', value: PageStatuses.Published, type: 'page_status' },
      { label: 'Archived', value: PageStatuses.Archived, type: 'page_status' },
      // User Status
      { label: 'Active', value: UserStatuses.Active, type: 'user_status' },
      { label: 'Inactive', value: UserStatuses.Inactive, type: 'user_status' },
    ])
  }
}