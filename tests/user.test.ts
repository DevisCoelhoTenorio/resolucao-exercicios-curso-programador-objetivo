import { expect } from 'chai';
import User from '../resolucao-modulo-4/class/User';
import ProductService from '../resolucao-modulo-4/class/Product';
import { newUsers } from '../resolucao-modulo-4/data/dataBase';
import { expectedReq01, expectedReq02, expectedReq03 } from './mocks/userMock';

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
      const expected = [
        {
          id: 6,
          city: "São Paulo",
          name: "zé rico programador",
          age: 62,
          weight: 90,
          sex: "m",
          height: 1.82,
          salary: 30000, // 30 mil
          married: false,
          active: true,
        },
      ];
      const result = service.findByMaxWeightAndCity(75, 'São Paulo');
      expect(result).to.be.deep.equal(expected);
    });
    it ('05- Verifica se é possível encontre os usuários de um dado estado ou que são casados', () => {
      const expected = [
        {
          id: 1,
          city: 'São Paulo',
          name: 'josé da silva',
          age: 21,
          weight: 70,
          sex: 'm',
          height: 1.7,
          salary: 1000,
          married: false,
          active: true
        },
        {
          id: 3,
          city: 'Rio de Janeiro',
          name: 'antonieta francesa rainha',
          age: 28,
          weight: 70,
          sex: 'f',
          height: 1.65,
          salary: 3000,
          married: true,
          active: true
        },
        {
          id: 4,
          city: 'Rio de Janeiro',
          name: 'silva melo de aguiar',
          age: 38,
          weight: 70,
          sex: 'm',
          height: 1.85,
          salary: 5000,
          married: true,
          active: true
        },
        {
          id: 5,
          city: 'São Paulo',
          name: 'joão carvalho da conceição',
          age: 48,
          weight: 70,
          sex: 'm',
          height: 1.9,
          salary: 9000,
          married: false,
          active: true
        },
        {
          id: 6,
          city: 'São Paulo',
          name: 'zé rico programador',
          age: 62,
          weight: 90,
          sex: 'm',
          height: 1.82,
          salary: 30000,
          married: false,
          active: true
        }
      ];

      const result = service.findByStateOrMarried('São Paulo');
      expect(result).to.be.deep.equal(expected);
    });

    it ('06- Verifica se é possível obter uma lista de usuários com os IMC', () => {
      const expected =  [
        { 'josé da silva': '24.22' },
        { 'maria clementina correia': '27.34' },
        { 'antonieta francesa rainha': '25.71' },
        { 'silva melo de aguiar': '20.45' },
        { 'joão carvalho da conceição': '19.39' },
        { 'zé rico programador': '27.17' }
      ];
      const result = service.listUserByImc();
      expect(result).to.be.deep.equal(expected);
    });

    it ('07- Verifica se é possível obter uma lista dos nomes completos capitalizados', () => {
      const expected = [
        'José Da Silva',
        'Maria Clementina Correia',
        'Antonieta Francesa Rainha',
        'Silva Melo De Aguiar',
        'João Carvalho Da Conceição',
        'Zé Rico Programador'
      ];
      const result = service.listName();
      expect(result).to.be.deep.equal(expected);
    });

    it ('08- Verifica se é possível calcular a média de altura de todos os usuários', () => {
      const expected = '1.75';
      const result = service.averageHeight();
      expect(result).to.be.equal(expected);
    });

    it ('09- Verifica se é possível obter os usuários com altura abaixo da média', () => {
      const expected = [
        {
          id: 1,
          city: 'São Paulo',
          name: 'josé da silva',
          age: 21,
          weight: 70,
          sex: 'm',
          height: 1.7,
          salary: 1000,
          married: false,
          active: true
        },
        {
          id: 2,
          city: 'Rio de Janeiro',
          name: 'maria clementina correia',
          age: 17,
          weight: 70,
          sex: 'f',
          height: 1.6,
          salary: 2000,
          married: false,
          active: true
        },
        {
          id: 3,
          city: 'Rio de Janeiro',
          name: 'antonieta francesa rainha',
          age: 28,
          weight: 70,
          sex: 'f',
          height: 1.65,
          salary: 3000,
          married: true,
          active: true
        },
      ];
      const result = service.listBelowAverageHeight();
      expect(result).to.be.deep.equal(expected);
    });

    it ('13- Verificar se possível obter uma lista de usuários sem o usuário mais novo', () => {
      const expected = [
        {
          id: 6,
          city: 'São Paulo',
          name: 'zé rico programador',
          age: 62,
          weight: 90,
          sex: 'm',
          height: 1.82,
          salary: 30000,
          married: false,
          active: true
        },
        {
          id: 5,
          city: 'São Paulo',
          name: 'joão carvalho da conceição',
          age: 48,
          weight: 70,
          sex: 'm',
          height: 1.9,
          salary: 9000,
          married: false,
          active: true
        },
        {
          id: 4,
          city: 'Rio de Janeiro',
          name: 'silva melo de aguiar',
          age: 38,
          weight: 70,
          sex: 'm',
          height: 1.85,
          salary: 5000,
          married: true,
          active: true
        },
        {
          id: 3,
          city: 'Rio de Janeiro',
          name: 'antonieta francesa rainha',
          age: 28,
          weight: 70,
          sex: 'f',
          height: 1.65,
          salary: 3000,
          married: true,
          active: true
        },
        {
          id: 1,
          city: 'São Paulo',
          name: 'josé da silva',
          age: 21,
          weight: 70,
          sex: 'm',
          height: 1.7,
          salary: 1000,
          married: false,
          active: true
        },
      ];
      const result = service.excludeYoungestFromList();
      expect(result).to.be.deep.equal(expected);
    });

    it ('14- Verifica se retornar um objeto que mapeia usuários pelo própri id do usuário.', () => {
      const expected = {
        '1': {
          id: 1,
          city: 'São Paulo',
          name: 'josé da silva',
          age: 21,
          weight: 70,
          sex: 'm',
          height: 1.7,
          salary: 1000,
          married: false,
          active: true
        },
        '2': {
          id: 2,
          city: 'Rio de Janeiro',
          name: 'maria clementina correia',
          age: 17,
          weight: 70,
          sex: 'f',
          height: 1.6,
          salary: 2000,
          married: false,
          active: true
        },
        '3': {
          id: 3,
          city: 'Rio de Janeiro',
          name: 'antonieta francesa rainha',
          age: 28,
          weight: 70,
          sex: 'f',
          height: 1.65,
          salary: 3000,
          married: true,
          active: true
        },
        '4': {
          id: 4,
          city: 'Rio de Janeiro',
          name: 'silva melo de aguiar',
          age: 38,
          weight: 70,
          sex: 'm',
          height: 1.85,
          salary: 5000,
          married: true,
          active: true
        },
        '5': {
          id: 5,
          city: 'São Paulo',
          name: 'joão carvalho da conceição',
          age: 48,
          weight: 70,
          sex: 'm',
          height: 1.9,
          salary: 9000,
          married: false,
          active: true
        },
        '6': {
          id: 6,
          city: 'São Paulo',
          name: 'zé rico programador',
          age: 62,
          weight: 90,
          sex: 'm',
          height: 1.82,
          salary: 30000,
          married: false,
          active: true
        }
      };
      const result = service.listUserMapForId();
      expect(result).to.be.deep.equal(expected);
    });

    it ('15- Verifica se retorna a quantidade de usuários de uma dada cidade', () => {
      const expected = 3;

      const result = service.countUserBySpecificCity('Rio de Janeiro');
      expect(result).to.be.equal(expected);
    });

    it ('16- Verifica se é possível agrupar usuários pela cidade', () => {
      const expected = {
        'São Paulo': [
          {
            id: 1,
            city: 'São Paulo',
            name: 'josé da silva',
            age: 21,
            weight: 70,
            sex: 'm',
            height: 1.7,
            salary: 1000,
            married: false,
            active: true
          },
          {
            id: 5,
            city: 'São Paulo',
            name: 'joão carvalho da conceição',
            age: 48,
            weight: 70,
            sex: 'm',
            height: 1.9,
            salary: 9000,
            married: false,
            active: true
          },
          {
            id: 6,
            city: 'São Paulo',
            name: 'zé rico programador',
            age: 62,
            weight: 90,
            sex: 'm',
            height: 1.82,
            salary: 30000,
            married: false,
            active: true
          }
        ],
        'Rio de Janeiro': [
          {
            id: 2,
            city: 'Rio de Janeiro',
            name: 'maria clementina correia',
            age: 17,
            weight: 70,
            sex: 'f',
            height: 1.6,
            salary: 2000,
            married: false,
            active: true
          },
          {
            id: 3,
            city: 'Rio de Janeiro',
            name: 'antonieta francesa rainha',
            age: 28,
            weight: 70,
            sex: 'f',
            height: 1.65,
            salary: 3000,
            married: true,
            active: true
          },
          {
            id: 4,
            city: 'Rio de Janeiro',
            name: 'silva melo de aguiar',
            age: 38,
            weight: 70,
            sex: 'm',
            height: 1.85,
            salary: 5000,
            married: true,
            active: true
          }
        ]
      };
      const result = service.groupByCity();
      expect(result).to.be.deep.equal(expected);
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
      const expected = [
        {
          id: 6,
          city: 'São Paulo',
          name: 'zé rico programador',
          age: 62,
          weight: 90,
          sex: 'm',
          height: 1.82,
          salary: 30000,
          married: false,
          active: true
        },
      ];
      const result = service.listUserByAboveAverage();
      expect(result).to.be.deep.equal(expected);
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
      const expected = [
        {
          id: 1,
          city: 'São Paulo',
          name: 'josé da silva',
          age: 21,
          weight: 70,
          sex: 'm',
          height: 1.7,
          salary: 1000,
          married: false,
          active: true
        },
        {
          id: 2,
          city: 'Rio de Janeiro',
          name: 'maria clementina correia',
          age: 17,
          weight: 70,
          sex: 'f',
          height: 1.6,
          salary: 2000,
          married: false,
          active: true
        },
        {
          id: 3,
          city: 'Rio de Janeiro',
          name: 'antonieta francesa rainha',
          age: 28,
          weight: 70,
          sex: 'f',
          height: 1.65,
          salary: 3000,
          married: true,
          active: true
        },
        {
          id: 6,
          city: 'São Paulo',
          name: 'zé rico programador',
          age: 62,
          weight: 90,
          sex: 'm',
          height: 1.82,
          salary: 30000,
          married: false,
          active: true
        }
      ];

      const result = service.getUsersByBought();
      expect(result).to.be.deep.equal(expected);
    });

    it ('24- Verifica se é possível encontrar os usuários comuns com outra listas de usuários', () => {
      const expected = [
        {
          id: 1,
          city: 'São Paulo',
          name: 'josé da silva',
          age: 21,
          weight: 70,
          sex: 'm',
          height: 1.7,
          salary: 1000,
          married: false,
          active: true
        },
        {
          id: 2,
          city: 'Rio de Janeiro',
          name: 'maria clementina correia',
          age: 17,
          weight: 70,
          sex: 'f',
          height: 1.6,
          salary: 2000,
          married: false,
          active: true
        },
        {
          id: 3,
          city: 'Rio de Janeiro',
          name: 'antonieta francesa rainha',
          age: 28,
          weight: 70,
          sex: 'f',
          height: 1.65,
          salary: 3000,
          married: true,
          active: true
        },
        {
          id: 4,
          city: 'Rio de Janeiro',
          name: 'silva melo de aguiar',
          age: 38,
          weight: 70,
          sex: 'm',
          height: 1.85,
          salary: 5000,
          married: true,
          active: true
        }
      ];
      const result = service.findSimilarUsers(newUsers);
      expect(result).to.be.deep.equal(expected);
    });

    it ('25- Verifica se é possível encontre os usuários não-comuns com outra listas de usuários', () => {
      const expected = [
        {
          id: 5,
          city: 'São Paulo',
          name: 'joão carvalho da conceição',
          age: 48,
          weight: 70,
          sex: 'm',
          height: 1.9,
          salary: 9000,
          married: false,
          active: true
        },
        {
          id: 6,
          city: 'São Paulo',
          name: 'zé rico programador',
          age: 62,
          weight: 90,
          sex: 'm',
          height: 1.82,
          salary: 30000,
          married: false,
          active: true
        }
      ];

      const result = service.findNoSimilarUsers(newUsers);
      expect(result).to.be.deep.equal(expected);
    });
});