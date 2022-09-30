import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelTeam from '../database/models/ModelTeam';

import { Response } from 'superagent';
import { oneTeamMock, teamsMock } from './mock/mock-teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint /teams', () => {
  describe('Listar todos os times', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(ModelTeam, "findAll")
        .resolves(teamsMock as Array<ModelTeam>);
    });

    after(() => {
      (ModelTeam.findAll as sinon.SinonStub).restore();
    });

    it('deveria receber um array de objetos', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body[0]).to.include({ id: 1, teamName: 'Avaí/Kindermann' });
      expect(chaiHttpResponse.body[1]).to.include({ id: 2, teamName: 'Bahia' });
    });
  });

  describe('Listar apenas um time', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(ModelTeam, "findByPk")
        .resolves(oneTeamMock as ModelTeam);
    });

    after(() => {
      (ModelTeam.findByPk as sinon.SinonStub).restore();
    });

    it('deveria receber apenas um objeto', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/:id');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.include({ id: 2, teamName: 'Bahia' });
    });
  });
});
