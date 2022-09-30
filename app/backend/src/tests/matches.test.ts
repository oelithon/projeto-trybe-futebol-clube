import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelMatch from '../database/models/ModelMatch';

import { Response } from 'superagent';

import { allMatches, allMatchesInprogessTrue } from '../tests/mock/mock-matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test: Matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(ModelMatch, "findAll")
      .resolves(allMatches as ModelMatch[]);
  });

  after(() => {
    (ModelMatch.findAll as sinon.SinonStub).restore();
  });

  it('checks if it is possible to list all matches successfully', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  })
})
