import { expect } from 'chai';
import User from '../resolucao-modulo-4/class/User';
import ProductService from '../resolucao-modulo-4/class/Product';
import { newUsers } from '../resolucao-modulo-4/data/dataBase';
import {
  expectedReq01,
  expectedReq02,
  expectedReq03,
  expectedReq04,
  expectedReq05,
  expectedReq06,
  expectedReq07,
  expectedReq09,
  expectedReq13,
  expectedReq14,
  expectedReq16,
  expectedReq20,
  expectedReq23,
  expectedReq24,
  expectedReq25
} from './mocks/userMock';

describe('Testa a class User', function () {
    const productService = new ProductService();
    const service = new User(productService);

    it ('01- Verifica se é possível encontrar um usuário pelo nome', () => {
      
      const result = service.findByName('antonieta francesa rainha');
      expect(result).to.be.deep.equal(expectedReq01);
    });

    it ('02- Verifica se é possível encontrar um usuário pelo valor de uma propriedade qualquer', () => {
    
      const result = service.findUserByPropValue<number>('age', 17);
      expect(result).to.be.deep.equal(expectedReq02);
    });

    it ('03- Verifica se é possível encontrar a usuária do sexo escolhido com o salário maior', () => {
      const resultOne = service.findUserByMaxSalary('f');
      const resultTwo = service.findUserByMaxSalary('m');
      expect(resultOne).to.be.deep.equal(expectedReq03.caseOne);
      expect(resultTwo).to.be.deep.equal(expectedReq03.caseTwo);
    });

    it ('04- Verifica se é possível encontre os usuários de um dado estado e com peso maior que um dado peso', () => {
      const result = service.findByMaxWeightAndCity(75, 'São Paulo');
      expect(result).to.be.deep.equal(expectedReq04);
    });
    it ('05- Verifica se é possível encontre os usuários de um dado estado ou que são casados', () => {
      const result = service.findByStateOrMarried('São Paulo');
      expect(result).to.be.deep.equal(expectedReq05);
    });

    it ('06- Verifica se é possível obter uma lista de usuários com os IMC', () => { 
      const result = service.listUserByImc();
      expect(result).to.be.deep.equal(expectedReq06);
    });

    it ('07- Verifica se é possível obter uma lista dos nomes completos capitalizados', () => {
      const result = service.listName();
      expect(result).to.be.deep.equal(expectedReq07);
    });

    it ('08- Verifica se é possível calcular a média de altura de todos os usuários', () => {
      const expected = '1.75';
      const result = service.averageHeight();
      expect(result).to.be.equal(expected);
    });

    it ('09- Verifica se é possível obter os usuários com altura abaixo da média', () => {
      const result = service.listBelowAverageHeight();
      expect(result).to.be.deep.equal(expectedReq09);
    });

    it ('13- Verificar se possível obter uma lista de usuários sem o usuário mais novo', () => {
      const result = service.excludeYoungestFromList();
      expect(result).to.be.deep.equal(expectedReq13);
    });

    it ('14- Verifica se retornar um objeto que mapeia usuários pelo própri id do usuário.', () => {
      const result = service.listUserMapForId();
      expect(result).to.be.deep.equal(expectedReq14);
    });

    it ('15- Verifica se retorna a quantidade de usuários de uma dada cidade', () => {
      const expected = 3;

      const result = service.countUserBySpecificCity('Rio de Janeiro');
      expect(result).to.be.equal(expected);
    });

    it ('16- Verifica se é possível agrupar usuários pela cidade', () => {
      const result = service.groupByCity();
      expect(result).to.be.deep.equal(expectedReq16);
    });

    it ('17- Verifica se é possível obter a quantidade de usuários por cidade', () => {
      const expected = { 'São Paulo': 3, 'Rio de Janeiro': 3 };
      const result = service.countUserByCity();
      expect(result).to.be.deep.equal(expected);
    });

    it ('18- Verifica se é possível obter a média salarial dos usuários por cidade', () => {
      const expected = { 'São Paulo': '13333.33', 'Rio de Janeiro': '3333.33' };
      const result = service.averageSalaryByCity();
      expect(result).to.be.deep.equal(expected);
    });

    it ('20- Verifica se é possível obter os usuários que gastaram mais que preço médio dos produtos vendidos', () => {
      const result = service.listUserByAboveAverage();
      expect(result).to.be.deep.equal(expectedReq20);
    });

    it ('21- Verifica se é possível obter o userId que menos gastou', () => {
      const expected = '1';

      const result = service.findLeastSpentUser();
      expect(result).to.be.equal(expected);
    });

    it ('22- Verifica se é possível obter o userId que comprou menos produtos, mas que comprou sim algum produto', () => {
      const expected = '6';

      const result = service.findUserIdByBoughtLess();
      expect(result).to.be.equal(expected);
    }); 

    it ('23- Verifica se é possível obter os usuários que compraram algum produto', () => {
      const result = service.getUsersByBought();
      expect(result).to.be.deep.equal(expectedReq23);
    });

    it ('24- Verifica se é possível encontrar os usuários comuns com outra listas de usuários', () => {
      const result = service.findSimilarUsers(newUsers);
      expect(result).to.be.deep.equal(expectedReq24);
    });

    it ('25- Verifica se é possível encontre os usuários não-comuns com outra listas de usuários', () => {
      const result = service.findNoSimilarUsers(newUsers);
      expect(result).to.be.deep.equal(expectedReq25);
    });
});