import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/index';

chai.use(chatHttp);

const { expect } = chai;

describe('Smoke Testing Endpoints', () => {

    it('should create a poll', (done) => {
        const poll = {
            title: 'The first cool poll',
            fancy_id: 'the-first-cool-poll',
            polltaker_account: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
            description: 'This could be a very, very long amount of text if we wanted it to be I guess',
            start_date: (new Date()),
            end_date: (new Date()),
            valid_event_ids: [1, 3, 5,],
            poll_options: [
                {
                    contents: 'The first cool option',
                },
                {
                    contents: 'The second cool option',
                },
            ]
        };

        chai.request(app)
            .post('/api/polls')
            .set('Accept', 'application/json')
            .send(poll)
            .end( (_error, result) => {
                expect(result.status).to.equal(201);
                expect(result.body).to.include({
                    id: 1,
                    title: 'The first cool poll',
                    fancy_id: 'the-first-cool-poll',
                    polltaker_account: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
                    description: 'This could be a very, very long amount of text if we wanted it to be I guess',
                });
                expect(result.body.poll_options.length).to.equal(2);

                done();
            });
    });

    it('should fetch the poll in the list of polls', (done) => {
        chai.request(app)
            .get('/api/polls')
            .set('Accept', 'application/json')
            .end( (_error, result) => {
                expect(result.status).to.equal(200);
                expect(result.body.length).to.equal(1);
                expect(result.body[0].title).to.equal('The first cool poll');
                expect(result.body[0].poll_options.length).to.equal(2);

                done();
            });
    });

    it('should create a vote', (done) => {
        const vote = {
            voter_account: "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
            token_ids: [10, 2, 27],
            date_cast: 1585773069000,
            poll_option_id: 1,
        };

        chai.request(app)
            .post('/api/votes/the-first-cool-poll')
            .set('Accept', 'application/json')
            .send(vote)
            .end( (_error, result) => {
                expect(result.status).to.equal(201);
                expect(result.body).to.include({
                    id: 1,
                    poll_option_id: 1,
                });

                done();
            });
    });

    it('should return votes', (done) => {
        chai.request(app)
            .get('/api/votes/the-first-cool-poll')
            .set('Accept', 'application/json')
            .end( (_error, result) => {
                expect(result.status).to.equal(200);
                expect(result.body.length).to.equal(1);
                expect(result.body[0].poll_option_id).to.equal(1);

                done();
            });
    });
});