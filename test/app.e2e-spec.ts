import * as request from 'supertest';
import { App } from 'supertest/types';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let appService: AppService;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = app.get<AppService>(AppService);
    server = app.getHttpServer();
    await app.init();
  });

  describe(`/ (GET)`, () => {
    it(`should return 403 Forbidden when an invalid x-api-key is passed in`, () => {
      return request(server).get('/').set(`x-api-key`, `WRONG`).expect(403);
    });

    it(`should return 403 Forbidden when no x-api-key is passed in`, () => {
      return request(server).get('/').expect(403);
    });

    it(`should return a random emoji`, () => {
      const emojis = appService.getEmojis();
      return request(app.getHttpServer())
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .set(`user-agent`, `Chrome`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Chrome`);
          expect(emojis).toContain(response.emoji);
        });
    });
    it(`should return an Unknown browser when no user-agent is used`, () => {
      const emojis = appService.getEmojis();
      return request(app.getHttpServer())
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Unknown`);
          expect(emojis).toContain(response.emoji);
        });
    });
  });
  describe(`/?index=X (GET)`, () => {
    it(`should return the indexed emoji`, () => {
      const index = 0;
      const emojis = appService.getEmojis();
      const emoji = emojis[index];
      return request(app.getHttpServer())
        .get(`/?index=${index}`)
        .set(`x-api-key`, `SECRET`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response.emoji).toBe(emoji);
        });
    });
    it(`should return a 400 if an non-number index is passed in`, () => {
      return request(app.getHttpServer())
        .get(`/?index=not-a-number`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });
    it(`should return a 400 if an negative index is passed in`, () => {
      return request(app.getHttpServer())
        .get(`/?index=-1`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });
    it(`should return a 400 if an index out of range is passed in`, () => {
      const emojis = appService.getEmojis();
      const emojisLength = emojis.length;
      const index = emojisLength + 1;

      return request(app.getHttpServer())
        .get(`/?index=${index}`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });
  });
});
