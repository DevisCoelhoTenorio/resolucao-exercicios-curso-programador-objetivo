import { users } from './dataBase';
import IUser from './interfaces/IUser';
import IImc from './interfaces/IImc';


const USER_NOT_FOUND = 'User not found';
export default class User {
  private _userList: IUser[];

  constructor() {
    this._userList = users;
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

  // 3. Encontrar a usuária do sexo feminino com o salário maior.
  public findUserByMaxSalary(): IUser {
    const list: IUser[] = [...this._userList];
    list.sort((a, b) => {
      if(b.salary <= a.salary ) return -1;
      else return 1;
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
  public listUserByImc(): IImc[] {
    const userMap = this._userList.map((user) => ({[user.name]: (user.weight/(user.height * user.height)).toFixed(2)}));
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
    return this._userList.map((user) => this.capitalizeText(user.name))
  };
  // 8. Calcular a média de altura de todos os usuários;
  public averageHeight(): string {
    return ((this._userList.reduce((acc, crr) => acc += crr.height ,0)) / this._userList.length).toFixed(2)
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
    this._userList.forEach((user) => userMap[user.id] = user)
    return userMap;
  };
  // 15. Contar a quantidade de usuários de uma dada cidade;
  public countUserByCity(city: string): number {
    let count: number = 0;
    this._userList.forEach((user) => user.city === city ? count += 1 : null)
    return count;
  }
};

const service = new User();
// Req 01
console.log('Req 01', service.findByName('josé da silva')) 
// Req 02
console.log('Req 02', service.findUserByPropValue<string>('city', 'Rio de Janeiro')) 
// Req 03
console.log('Req 03', service.findUserByMaxSalary())
// Req 04
console.log('Req 04', service.findByMaxWeightAndCity(70, 'São Paulo'))
// Req 05
console.log('Req 05', service.findByStateOrMarried('São Paulo'))
// Req 06
console.log('Req 06', service.listUserByImc());
// Req 07
console.log('Req 07', service.listName());
// Req 08
console.log('Req 08', service.averageHeight());
// Req 09
console.log('Req 09', service.listBelowAverageHeight());
// Req 13
console.log('Req 13', service.excludeYoungestFromList());
// Req 14
console.log('Req 14', service.listUserMapForId());
// Req 15
console.log('Req 15', service.countUserByCity('São Paulo'));


