import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelUser from '../database/models/ModelUser';
import { userMock, userLoginMock, userLoginNotEmailMock, userLoginPassInvalidMock, userLoginNotPassMock, userTokenMock, userTokenInvalidMock } from './mock/mock-login'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint /login', () => {
  describe('Login correto', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(ModelUser, "findOne")
        .resolves(userMock as ModelUser);
    });

    after(() => {
      (ModelUser.findOne as sinon.SinonStub).restore();
    });

    it('deveria fazer login com sucesso', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(userLoginMock);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })

  describe('Login incorreto', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(ModelUser, "findOne")
        .resolves(userMock as ModelUser);
    });

    after(() => {
      (ModelUser.findOne as sinon.SinonStub).restore();
    });

    it('deveria falhar sem o campo email', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(userLoginNotEmailMock);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('All fields must be filled')
    });

    it('deveria falhar sem o campo password', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(userLoginNotPassMock);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('All fields must be filled')
    });

    it('deveria falhar com password inválido', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(userLoginPassInvalidMock);

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password')
    });
  });
});

describe('Teste endpoint /login/validate', () => {
  describe('Login com Token Válido', () => {
    let chaiHttpResponse: Response;

    it('deveria fazer requisição com sucesso', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set(userTokenMock);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('role');
      expect(chaiHttpResponse.body.role).to.equal('admin');
    });
  });

  describe('Login com Token Inválido', () => {
    let chaiHttpResponse: Response;

    it('deveria bloquear o acesso sem o token', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set({});

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Token not found');
    });

    it('deveria bloquear o acesso com token inválido', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set(userTokenInvalidMock);

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Token Expired or Invalid');
    });
  });
});
