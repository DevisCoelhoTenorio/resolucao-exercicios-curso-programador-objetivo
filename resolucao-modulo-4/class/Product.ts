import { userProducts } from '../data/dataBase';
import IProduct from '../interfaces/IProduct';

// Obs: Para rodar os Logs de teste basta digitar o comando
// ts-node ./resolucao-modulo-4/class/Product.ts na raiz do projeto.

export default class Product {
  private _productList: IProduct[];

  constructor(){
    this._productList = userProducts;
  };

  private findUserProducts(prop: string): IProduct[] {
    return this._productList.filter((product) => product[prop] === prop);
  };

  // 10. Verificar se um dado produto foi consumido
  // mais de uma vez.
  public consumedProduct(productName: string): boolean {
    const findListProduct = this.findUserProducts(productName);
    return findListProduct.length > 1;
  };

  // 11. Verificar se um dado produto foi consumido
  // mais de um usuário.
  public consumedByDifferentUser(productName: string): boolean {
    const findListProduct = this.findUserProducts(productName);
    const productMap: Record<string, number> = {};
    let check = false;
    findListProduct.forEach((product) => {
      if (productMap[product.userId]) check = true;
      else productMap[product.userId] = product.id;
    });
    return check;
  };

  // 12. Verificar se existe algum produto
  // que foi comprado por mais de um usuário
  public boughtByDifferentUser(): boolean {
    const productMap: Record<string, number> = {};
    let check = false;
    this._productList.forEach((product) => {
      if (productMap[product.name] && productMap[product.name] ===  product.userId) check = true;
      else productMap[product.name] = product.userId;
    });
    return check;
  };

  // Método auxiliar para Req 19 e 20
  public getDifferentProduct(): Record<string, IProduct> {
    const differentProductMap: Record<string, IProduct> = {};
    this._productList.forEach((product) => {
      if (!differentProductMap[product.name]) differentProductMap[product.name] = product;
    });
    return differentProductMap;
  };

  // 19. Obter os nomes distintos de produtos;
  public getDifferentNameProduct(): Array<string> {
    const differentNames = Object.keys(this.getDifferentProduct());
    return differentNames;
  };

  // Método auxiliar do Req 20;
  public averagePriceProducts(): number {
    const differentProducts = Object.values(this.getDifferentProduct());
    const averagePrice = (differentProducts
      .reduce((acc, crr) => acc += crr.price ,0)) / differentProducts.length;
    return averagePrice;
  };

  public listUserMapBySpending(): Record<string, number> {
    const userMapBySpending: Record<string, number>= {};
    this._productList.forEach((product) => {
      if (userMapBySpending[product.userId]) userMapBySpending[product.userId] += product.price;
      else userMapBySpending[product.userId] = product.price;
    });
    return userMapBySpending;
  };
  
  // Método auxiliar do Req 22;
  public listUserMapByAmountPurchases() {
    const userMapByAmountPurchases: Record<string, number>= {};
    this._productList.forEach((product) => {
      if (userMapByAmountPurchases[product.userId]) userMapByAmountPurchases[product.userId] += 1;
      else userMapByAmountPurchases[product.userId] = 1;
    });
    return userMapByAmountPurchases;
  };
};

const service = new Product();

// // Req 10
// console.log('Req 10', service.consumedProduct('Uber'));
// // Req 11
// console.log('Req 11', service.consumedByDifferentUser('Uber'));
// // Req 12
// console.log('Req 12', service.boughtByDifferentUser());
// //Req 19
// console.log('Req 19', service.getDifferentNameProduct());
