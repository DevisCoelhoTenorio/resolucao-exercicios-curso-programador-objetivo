import { users, newUsers } from '../data/dataBase';
import IUser from '../interfaces/IUser';
import ProductService from './Product';

// Obs: Para rodar os Logs de teste basta digitar o comando
// ts-node ./resolucao-modulo-4/class/User.ts na raiz do projeto.

const USER_NOT_FOUND = 'User not found';
export default class User {
  private _userList: IUser[];
  private _productService: ProductService;

  constructor(productService: ProductService) {
    this._userList = users;
    this._productService = productService;
  };

  // 1. Encontrar um usuário pelo nome;
  public findByName(name: string): IUser | string {
    return this._userList.find((user) => user.name === name) || USER_NOT_FOUND;
  };

  // 2. Encontrar um usuário pelo valor de uma propriedade qualquer;
  // Dica: a assinatura do método é findUserByPropValue(users, prop, value)
  public findUserByPropValue<T>(prop: string, value: T): IUser | string {
    return this._userList.find((user) => user[prop] === value) || USER_NOT_FOUND;
  };

  // 3. Encontrar a usuária do sexo escolhido com o salário maior.
  public findUserByMaxSalary(sex: string): IUser {
    const list: IUser[] = [...this._userList.filter((user) => user.sex === sex)];
    list.sort((a, b) => {
      if(b.salary >= a.salary) return 1;
      else return -1;
    })
    return list[0];
  };

  // 4. Encontre os usuários de um dado estado e com peso maior
  // que um dado peso;
  public findByMaxWeightAndCity(weight: number, city: string): IUser[] {
    const userMap = this._userList.filter((user)=> user.city === city && user.weight > weight);
    return userMap;
  };

  // 5. Encontre os usuários de um dado estado ou que são casados
  public findByStateOrMarried(city: string): IUser[] {
    const userMap = this._userList.filter((user) => user.city === city || user.married);
    return userMap;
  };

  // 6. Cria uma função que recebe a lista de usuários e retorna
  // uma lista com o IMC dos respectivos usuários;
  // OBS: imc = peso/(altura x altura)
  public listUserByImc(): Record<string, string>[] {
    // const userMap: string[] = this._userList.map((user) => (
    //    (user.weight/(user.height * user.height)).toFixed(2)
    // ));
    const userMap: Record<string, string>[] = this._userList.map((user) => (
      {
      [user.name]: (user.weight/(user.height * user.height)).toFixed(2),
      }
    ));
    return userMap;
  };

  // 7. Cria uma função que recebe a lista de usuários e retorna
  // a lista dos nomes completos capitalizados;
  // OBS: o nome 'joao da silva' capitalizado, seria: Joao Da Silva
  // Dica1: Criar uma função auxiliar somente para capitalizar
  // uma única palavra.
  // Dica2: Criar outra função auxiliar para capitalizar
  // um nome completo, com mais de uma palavra.
  // Usar: split e join e a função da dica1
  private capitalizeWord(word: string): string {
    const text = word[0].toUpperCase() + word.slice(1);
    return text;
  };

  private capitalizeText(text: string): string {
    const arrayWord = text.split(' ');
    const arrayMap = arrayWord.map((word) => this.capitalizeWord(word));
    return arrayMap.join(' ');
  };

  public listName(): string[] {
    return this._userList.map((user) => this.capitalizeText(user.name));
  };

  // 8. Calcular a média de altura de todos os usuários;
  public averageHeight(): string {
    return ((this._userList.reduce((acc, crr) => acc += crr.height ,0)) / this._userList.length).toFixed(2);
  };

  // 9. Retornar os usuários com altura abaixo da média;
  public listBelowAverageHeight(): IUser[] {
    const avarageHeight = Number(this.averageHeight());
    return this._userList.filter((user) => user.height < avarageHeight);
  }; 

  // 13. Retornar a lista de usuários sem o usuário mais novo da lista.
  public excludeYoungestFromList(): IUser[] {
    const list = [...this._userList];
    list.sort((a, b) => b.age - a.age).pop();
    return list;
  };

  // 14. Retornar um objeto que mapeia usuários pelo próprio
  // id do usuário.
  public listUserMapForId(): Record<string, IUser> {
    const userMap: Record<string, IUser> = {};
    this._userList.forEach((user) => userMap[user.id] = user);
    return userMap;
  };

  // 15. Contar a quantidade de usuários de uma dada cidade;
  public countUserBySpecificCity(city: string): number {
    let count: number = 0;
    this._userList.forEach((user) => user.city === city ? count += 1 : null);
    return count;
  };

  // 16. Agrupar usuários pela cidade;
  public groupByCity(): Record<string, IUser[]> {
    const cityMap: Record<string, IUser[]> = {};
    this._userList.forEach((user) => {
      if(cityMap[user.city]) cityMap[user.city].push(user);
      else {
        cityMap[user.city] = [];
        cityMap[user.city].push(user);
      };
    });
    return cityMap;
  };

  // 17. Contar a quantidade de usuários por cidade;
  public countUserByCity(): Record<string, number> {
    const cityCountMap: Record<string, number> = {};
    this._userList.forEach((user) => {
      if (cityCountMap[user.city]) cityCountMap[user.city] += 1;
      else cityCountMap[user.city] = 1;
    });
    return cityCountMap;
  };

  // 18. Obter a média salarial dos usuários por cidade;**
  public  averageSalaryByCity(): Record<string, string> {
    const averageSalaryMap: Record<string, {averageSalary: number, countUser: number}> = {};
    this._userList.forEach((user) => {
      if (averageSalaryMap[user.city]) {
        averageSalaryMap[user.city].averageSalary += user.salary;
        averageSalaryMap[user.city].countUser += 1;
      }
      else averageSalaryMap[user.city] = {
       averageSalary: user.salary,
       countUser: 1,
      };
    });
    const responseObj: Record<string, string> = {}
    Object.keys(averageSalaryMap).forEach((city) => {
      responseObj[city] = (
        averageSalaryMap[city].averageSalary / averageSalaryMap[city].countUser)
        .toFixed(2);
    });
    return responseObj;
  };

  // 20. Retornar os usuários que gastaram mais que preço
  // médio dos produtos vendidos;
  public listUserByAboveAverage(): IUser[] {
    const averagePrice = this._productService.averagePriceProducts();
    const listUserBySpending = this._productService.listUserMapBySpending();
    
    const selectedUSers: IUser[] = [];
    this._userList.forEach((user) => {
      if (listUserBySpending[user.id] && listUserBySpending[user.id] > averagePrice) {
        selectedUSers.push(user);
      }
    });
    return selectedUSers;
  };

  // 21. Encontre o userId que menos gastou;
  public findLeastSpentUser(): string {
    const listUserBySpending = Object.entries(this._productService.listUserMapBySpending());
    listUserBySpending.sort((a, b) => a[1] - b[1]);
    return listUserBySpending[0][0];
  };

  // 22. Encontre o userId que comprou menos produtos, mas
  // que comprou sim algum produto;
  public findUserIdByBoughtLess(): string {
    const listUserByBoughtLess = Object.entries(this._productService.listUserMapByAmountPurchases());
    listUserByBoughtLess.sort((a, b) => a[1] - b[1]);
    return listUserByBoughtLess[0][0];
  };

  // 23. Encontre os usuários (objetos completos)
  // que compraram algum produto;
  public getUsersByBought(): IUser[] {
    const listUserByBought = this._productService.listUserMapByAmountPurchases();
    const userBoughtMap: IUser[] = [];
    this._userList.forEach((user) => {
      if (listUserByBought[user.id]) userBoughtMap.push(user);
    });
    return userBoughtMap;
  };

  // 24. Encontre os usuários comuns a duas listas de usuários.
  // Dois usuários são idênticos, se tiverem o mesmo id;
  // ex: lista1=[{id:2}, {id:3}] e lista2=[{id:3},{id:4}]
  // usuariosComuns => [{id:3}]
  public findSimilarUsers(newUserList: IUser[]): IUser[] {
    const comparisonList: Record<number, IUser> = {};
    const filterList: Record<number, IUser> = {};
    const fullList = [...this._userList, ...newUserList];
    fullList.forEach((user) => {
      if (comparisonList[user.id]) filterList[user.id] = user;
      else comparisonList[user.id] = user;
    });
    return Object.values(filterList);
  };

  // 25. Encontre os usuários não-comuns a duas listas de usuários.
  // ex: lista1=[{id:2}, {id:3}] e lista2=[{id:3},{id:4}]
  // usuariosNaoComuns => [{id:2}, {id:4}]
  public findNoSimilarUsers(newUserList: IUser[]): IUser[] {
    const filterList: Record<number, IUser> = {};
    const fullList = [...this._userList, ...newUserList];
    fullList.forEach((user) => {
      if (filterList[user.id]) delete filterList[user.id];
      else filterList[user.id] = user;
    });
    return Object.values(filterList);
  };
};

const productService = new ProductService();
const service = new User(productService);

// // Req 01
// console.log('Req 01', service.findByName('maria clementina correia'));
// // // Req 02
// console.log('Req 02', service.findUserByPropValue<number>('age', 17));
// // // Req 03
// console.log('Req 03', service.findUserByMaxSalary('f'));
// // // Req 04
// console.log('Req 04', service.findByMaxWeightAndCity(70, 'São Paulo'));
// // // Req 05
// console.log('Req 05', service.findByStateOrMarried('São Paulo'));
// // // Req 06
// console.log('Req 06', service.listUserByImc());
// // // Req 07
// console.log('Req 07', service.listName());
// // // Req 08
// console.log('Req 08', service.averageHeight());
// // // Req 09
// console.log('Req 09', service.listBelowAverageHeight());
// // // Req 13
// console.log('Req 13', service.excludeYoungestFromList());
// // // Req 14
// console.log('Req 14', service.listUserMapForId());
// // // Req 15
// console.log('Req 15', service.countUserBySpecificCity('Rio de Janeiro'));
// // // Req 16
// console.log('Req 16', service.groupByCity());
// // // Req 17
// console.log('Req 17', service.countUserByCity());
// // // Req 18
// console.log('Req 18', service.averageSalaryByCity());
// // // Req 20
// console.log('Req 20', service.listUserByAboveAverage());
// // // Req 21
// console.log('Req 21', service.findLeastSpentUser());
// // // Req 22
// console.log('Req 22', service.findUserIdByBoughtLess());
// // // Req 23
// console.log('Req 23', service.getUsersByBought());
// // // Req 24
// console.log('Req 24', service.findSimilarUsers(newUsers));
// // // Req 25
// console.log('Req 25', service.findNoSimilarUsers(newUsers));
