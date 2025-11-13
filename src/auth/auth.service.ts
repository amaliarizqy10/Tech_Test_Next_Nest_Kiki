import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { uuid } from 'uuidv4';
import { AES, enc } from 'crypto-js';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'supersecretkey'; // Replace with .env for security

  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async generateToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, this.jwtSecret, { expiresIn: '1h' });
  }

  async register(body: any) {
        try {
            const { username, email, password ,confirmPassword, fullName, jabatanId, nomorTelp, address, kotaId, provinsiId, negaraId, companyId} = body;
            let idKaryawan = ''
            const existingUserEmail = await this.prisma.users.findUnique({ where: { email } })
            if (existingUserEmail) {
                throw new BadRequestException('Email already exist')
            }
            const existingUserName = await this.prisma.users.findUnique({ where: { username } })
            if (existingUserName) {
                throw new BadRequestException('Username already exist')
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            if(password == confirmPassword){

                let checkKaryawan = await this.prisma.karyawan.findFirst({
                    where: { nama_karyawan: fullName },
                    select: {
                        id: true
                    }
                })

                    if (checkKaryawan) {
                        idKaryawan = checkKaryawan.id
                    } else {
                        let createKaryawan = await this.prisma.karyawan.create({
                            data: {
                                nama_karyawan: fullName,
                                created_date: new Date()
                            }, select: { id: true }
                        })
                        idKaryawan = createKaryawan.id
                    }

                    const result = await this.prisma.users.create({
                        data: {
                            nama : fullName,
                            username: username,
                            password: hashedPassword,
                            email: email,
                            no_telp : nomorTelp,
                            alamat : address,
                            kota_id : kotaId,
                            provinsi_id : provinsiId, 
                            negara_id : negaraId,
                            created_by: username,
                            created_date: new Date(),
                            karyawan_id : idKaryawan
                        },
                        select:{id : true}
                    });
                    
                    let dataCompanies = companyId

                    let dataJabatans = jabatanId
                    for (let a= 0 ; a < dataCompanies.length ; a ++){
                        
                        await this.prisma.user_company.create({
                            data: {
                                user_id: result.id,
                                company_id: dataCompanies[a],
                                jabatan_id: dataJabatans[a]
                            },
                        });
                    }
                    
                    return {
                        status: HttpStatus.OK,
                        message: 'Successfully Register User',
                        data: {
                            result: result,
                        }
                    }
                
            }else{
                throw new BadRequestException('Confirm Password is wrong');
            }
        } catch (error) {
            console.error('Register error:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Failed to register user');
        }
    }

    async decryptPwd(pwd: string) {
        if (_.isEmpty(pwd)) return pwd;

        const aes = AES.decrypt(pwd, process.env.SHARED_KEY_AES).toString(enc.Utf8);

        return aes;
    }

    async encryptPwd(data: string) {
        if (_.isEmpty(data)) return data;
        const aes = AES.encrypt(data, process.env.SHARED_KEY_AES).toString();
        return aes.toString();
    }

    async login(body: any) {
        try {
            const { username, password } = body
            const user = await this.prisma.users.findUnique({ where: { username } });
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(await this.decryptPwd(password), user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const expiresIn = process.env.EXPIRED_IN ?? '3h';
            const keyToken = uuid();
            const accessToken = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    key_token: keyToken,
                },
                this.jwtSecret,
                {
                    expiresIn: process.env.EXPIRED_IN ?? '3h' as any,
                },
            );
            const duration = parseInt(expiresIn);
            const unit = expiresIn.replace(duration.toString(), '') || 's';
            const expiresAt = moment()
                .add(duration, unit as moment.unitOfTime.DurationConstructor)
                .format('YYYY-MM-DD HH:mm:ss');


            return {
                access_token: accessToken,
                token_type: 'Bearer',
                expires_at: expiresAt,
                id: user.id,
                roles: '',
                companies: '',
                
            };
        } catch (error) {
            console.log('Login Error : ', error)
            if (error instanceof UnauthorizedException) {
                throw error
            }
            throw new InternalServerErrorException('Failed to login user');
        }
    }

  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}