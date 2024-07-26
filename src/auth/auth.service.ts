import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/database_module/schema';
import { eq } from 'drizzle-orm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserWebsocketGateWay } from 'src/gateway/user_websocket.gateway';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DRIZZLE') private conn: NodePgDatabase<typeof schema>,
    private jwt: JwtService,
    private userGatewaySocket: UserWebsocketGateWay,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.conn
        .insert(schema.user)
        .values({ username: dto.username, password: hash })
        .returning();

      this.userGatewaySocket.userData(user);

      return this.signToken(user[0].username, user[0].id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('Username already taken');
      }
      console.log(error);
      throw new BadRequestException('Bad Request');
    }
  }

  async signToken(
    username: string,
    userId: number,
  ): Promise<{ access_token: string; username: string; userId: number }> {
    const payload = {
      sub: userId,
      username,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
      username: username,
      userId: userId,
    };
  }

  async signin(dto: AuthDto) {
    try {
      const result = await this.conn
        .select()
        .from(schema.user)
        .where(eq(schema.user.username, dto.username));

      if (result.length === 0) {
        throw new BadRequestException('Invalid credentials');
      }

      const user = result[0];

      const isPasswordValid = await argon.verify(user.password, dto.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }
      const userDetails = await this.signToken(user.username, user.id);
      return {
        userDetails,
        createAt: user.createdAt,
        updateAt: user.updatedAt,
      };
    } catch (error) {
      throw new BadRequestException(error['response']);
    }
  }
}
