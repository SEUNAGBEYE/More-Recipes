import { recipe } from '../src/recipes';
import { recipeRoute } from '../routes/recipes'
import chai, { assert, should, expect} from 'chai';
import chaiHtpp from 'chai-http';
import { app } from '../src/index';
 
chai.use(chaiHtpp);
describe('Test For Recipes Routes', () => {
	describe('Test Getting all recipes', () => {
		it('it should have a statusCode of 200 when trying to get all recipes', () => {
			chai.request(recipeRoute)
				.get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body, 'respone return array of object');
          
			  });
		});
	});


  // describe('Test Getting all recipes', (done) => {
  //   it('it should have a statusCode of 200 when trying to get all recipes', (done) => {
  //     chai.request(recipeRoute)
  //       .get('/')
  //       .end((error, res) => {
  //         expect(res).to.have.status(200);
  //         assert.isArray(res.body, 'respone return array of object')
  //         done();
  //       });
  //   });
  // });
});
