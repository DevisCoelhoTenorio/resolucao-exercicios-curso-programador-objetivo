import { expect } from 'chai';
import Product from '../resolucao-modulo-4/class/Product';
import { expectedReq19 } from './mocks/productMock';

describe('Testa a class Product', function () {
  const service = new Product();

  it ('10- Verificar se um dado produto foi consumido mais de uma vez.', () => {
    const result01 = service.consumedProduct('Uber');
    const result02 = service.consumedProduct('Computador');
    expect(result01).to.be.equal(true);
    expect(result02).to.be.equal(false);
  });

  it ('11- Verificar se um dado produto foi consumido mais de um usuário.', () => {
    const result01 = service.consumedByDifferentUser('Computador');
    expect(result01).to.be.equal(false);
  });

  it ('12- Verificar se existe algum produto que foi comprado por mais de um usuário', () => {
    const result01 = service.boughtByDifferentUser()
    expect(result01).to.be.equal(false);
  });

  it ('19- Verifica se é possível obter os nomes distintos de produtos', () => {
    const result = service.getDifferentNameProduct();
    expect(result).to.be.deep.equal(expectedReq19);
  });
});