import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentUsersService } from "src/User/fetch-recent-users.service";

@Controller('/users')
export class FetchRecentUsersController {
  constructor(private fetchRecentUsersService: FetchRecentUsersService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.fetchRecentUsersService.execute();

    return { users };
  }
}
