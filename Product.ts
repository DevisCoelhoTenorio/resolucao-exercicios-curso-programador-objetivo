import { userProducts } from './dataBase';
import IProduct from './interfaces/IProduct';

const PRODUCT_NOT_FOUND = 'Product not found';
class Product {
  private _productList: IProduct[];

  constructor(){
    this._productList = userProducts
  };
  private findProductsByName(productName: string): IProduct[] {
   return this._productList.filter((product) => product.name === productName);
  };
  // 10. Verificar se um dado produto foi consumido
  // mais de uma vez.
  public consumedProduct(productName: string): boolean {
    const findListProduct = this.findProductsByName(productName)
    if(findListProduct.length > 1) return true;
    return false;
  };
  // 11. Verificar se um dado produto foi consumido
  // mais de um usuário.
  public consumedByDifferentUser(productName: string): boolean {
    const findListProduct = this.findProductsByName(productName)
    if(findListProduct.length <= 1) return false;
    return findListProduct.some((product) => product.userId !== findListProduct[0].userId);
  };
};

const service = new Product();

// Req 10
console.log('Req 10', service.consumedProduct('Uber'))
// Req 11
console.log('Req 11', service.consumedByDifferentUser('Uber'))
