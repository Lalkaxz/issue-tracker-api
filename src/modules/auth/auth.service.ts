import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { validatePasswords } from 'src/common/utils/compare-passwords.util'
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto'
import { UserDbDto } from 'src/modules/users/dto/user-db.dto'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UsersService } from 'src/modules/users/users.service'

import { RefreshTokenDto } from './dto/refresh-token.dto'
import { TokenResponseDto } from './dto/token-response.dto'

const SALT_LENGTH = 5

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) {}

	// Create user. Create user in database and return token.
	async create(userDto: CreateUserDto): Promise<TokenResponseDto> {
		// Check if user already registered.
		const exists = await this.usersService.findUserByName(userDto.name)
		if (exists) {
			throw new BadRequestException('User already registered')
		}

		const hashedPassword = await this.hashPassword(userDto.password)
		const token = await this.generateToken(userDto.name)

		// Dto for create user in database.
		const userDbDto: UserDbDto = {
			name: userDto.name,
			displayName: userDto.name,
			password: hashedPassword,
			token: token
		}

		const user = await this.usersService.create(userDbDto)
		if (!user) {
			throw new InternalServerErrorException()
		}

		return { token: token }
	}

	async login(userDto: CreateUserDto): Promise<TokenResponseDto> {
		const user = await this.validateUser(userDto)
		return { token: user.token }
	}

	// Update user token.
	async refresh(
		passwordDto: RefreshTokenDto,
		user: UserEntity
	): Promise<TokenResponseDto> {
		const match = await validatePasswords(
			passwordDto.password,
			user.password
		)
		if (!match) {
			throw new BadRequestException('Incorrect password')
		}

		const newToken = await this.generateToken(user.name)

		const userData = await this.usersService.updateUserToken({
			name: user.name,
			token: newToken
		})
		if (!userData) {
			throw new InternalServerErrorException()
		}

		return { token: userData.token }
	}

	// Generate token from request body.
	private async generateToken(userName: string): Promise<string> {
		const payload = { sub: userName, iat: Date.now() }
		try {
			return await this.jwtService.signAsync(payload)
		} catch {
			throw new InternalServerErrorException()
		}
	}

	// Return hashed password.
	private async hashPassword(password: string): Promise<string> {
		const hash = await bcrypt.hash(password, SALT_LENGTH)
		return hash
	}

	// Validate user. Find user by name and compare passwords.
	private async validateUser(userDto: CreateUserDto): Promise<UserEntity> {
		const user = await this.usersService.findUserByName(userDto.name)
		// If user with this name not found.
		if (!user) {
			throw new UnauthorizedException('Incorrect name or password')
		}

		const passwordsEquals = await bcrypt.compare(
			userDto.password,
			user.password
		)
		// If the database password and the request body do not match
		if (!passwordsEquals) {
			throw new UnauthorizedException('Incorrect name or password')
		}

		return user
	}
}
