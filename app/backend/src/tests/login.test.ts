import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelUser from '../database/models/ModelUser';
import { userMock, userLoginMock } from './mock/mock-login'

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
  });
});
