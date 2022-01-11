import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfModule } from '../src/cpf/cpf.module';
import { LoggerModule } from '../src/logger/logger.module';
import { Repository } from 'typeorm';
import { Blacklist } from 'src/cpf/entities/blacklist.entity';

describe('CpfController (e2e)', () => {
  let app: INestApplication;
  let blacklistRepository: Repository<Blacklist>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CpfModule,
        LoggerModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db_test.sqlite3',
          autoLoadEntities: true,
          synchronize: true,
          keepConnectionAlive: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    blacklistRepository = moduleFixture.get('BlacklistRepository');
    await app.init();
  });

  afterEach(async () => {
    await blacklistRepository.delete({});
  });

  describe('POST', () => {
    it('should return status 400 if cpf is registred', async () => {
      await request(app.getHttpServer())
        .post(`/cpf`)
        .send({ cpf: '68185095094' });

      const response = await request(app.getHttpServer())
        .post(`/cpf`)
        .send({ cpf: '68185095094' });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        statusCode: 400,
        message: 'CPF já cadastrado.',
        error: 'Bad Request',
      });
    });

    it('should return status 201 if cpf is on blacklist', async () => {
      const response = await request(app.getHttpServer())
        .post(`/cpf`)
        .send({ cpf: '63743324075' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('cpf', '63743324075');
    });
  });

  describe('DELETE', () => {
    it('should return status 404 if not found cpf', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/cpf/68185095094`,
      );
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        statusCode: 404,
        message: 'CPF não encontrado.',
        error: 'Not Found',
      });
    });

    it('should return status 200 if cpf removed from blacklist', async () => {
      await request(app.getHttpServer())
        .post(`/cpf`)
        .send({ cpf: '63743324075' });

      const response = await request(app.getHttpServer()).delete(
        `/cpf/63743324075`,
      );

      expect(response.status).toBe(200);
    });
  });

  describe('GET', () => {
    it('should return FREE if cpf is not on the blacklist', async () => {
      const response = await request(app.getHttpServer()).get(
        '/cpf/60336598050',
      );

      expect(response.body).toHaveProperty('message', 'FREE');
    });

    it('should return BLOCK if cpf is on the blacklist', async () => {
      const cpf = '60336598050';

      await request(app.getHttpServer()).post(`/cpf`).send({ cpf });

      const response = await request(app.getHttpServer()).get(`/cpf/${cpf}`);

      expect(response.body).toHaveProperty('message', 'BLOCK');
    });

    it('should return current status', async () => {
      await request(app.getHttpServer()).get('/cpf/60336598050');
      await request(app.getHttpServer()).get('/cpf/60336598050');
      await request(app.getHttpServer()).get('/cpf/60336598050');

      const response = await request(app.getHttpServer()).get('/status');

      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('count', 0);
      expect(response.body).toHaveProperty('requestCount', 3);
    });
  });
});
