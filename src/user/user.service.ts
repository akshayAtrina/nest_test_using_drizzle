import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/database_module/schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    @Inject('DRIZZLE') private conn: NodePgDatabase<typeof schema>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async findAll() {
    try {
      const data = await this.conn.select().from(schema.user);
      return data;
    } catch (e) {
      throw new BadRequestException('No Data Found');
    }
  }

  async remove(id: number) {
    try {
      const data = await this.conn
        .delete(schema.user)
        .where(eq(schema.user.id, id));
      return { statusCode: 200, message: 'User Deleted Successfully' };
    } catch (e) {
      throw new BadRequestException('No Data Found');
    }
  }
}
