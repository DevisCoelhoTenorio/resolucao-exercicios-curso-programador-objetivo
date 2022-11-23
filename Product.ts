import { userProducts } from './dataBase';
import IProduct from './interfaces/IProduct';
import IUser from './interfaces/IUser';

const PRODUCT_NOT_FOUND = 'Product not found';
class Product {
  private _productList: IProduct[];

  constructor(){
    this._productList = userProducts
  };
  private findUserProducts(prop: string): IProduct[] {
    return this._productList.filter((product) => product[prop] === prop);
  };
  // 10. Verificar se um dado produto foi consumido
  // mais de uma vez.
  public consumedProduct(productName: string): boolean {
    const findListProduct = this.findUserProducts(productName)
    return findListProduct.length > 1
  };
  // 11. Verificar se um dado produto foi consumido
  // mais de um usuário.
  public consumedByDifferentUser(productName: string): boolean {
    const findListProduct = this.findUserProducts(productName)
    const productMap: Record<string, number> = {}
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
};

const service = new Product();

// Req 10
console.log('Req 10', service.consumedProduct('Uber'));
// Req 11
console.log('Req 11', service.consumedByDifferentUser('Uber'));
// Req 12
console.log('Req 12', service.boughtByDifferentUser());