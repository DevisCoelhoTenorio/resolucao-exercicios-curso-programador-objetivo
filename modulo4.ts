import { userProducts, users} from './dataBase';
import IUser from './interfaces/IUser';


const USER_NOT_FOUND = 'User not found'
class User {
  private _userList: IUser[];

  constructor() {
    this._userList = users;
  }

  // 1. Encontrar um usuário pelo nome;
  public findByName(name: string): IUser | string {
    return this._userList.find((user) => user.name === name) || USER_NOT_FOUND;
  }

  // 2. Encontrar um usuário pelo valor de uma propriedade qualquer;
  // Dica: a assinatura do método é findUserByPropValue(users, prop, value)
  public findUserByPropValue<T>(prop: string, value: T): IUser | string {
    return this._userList.find((user) => user[prop] === value) || USER_NOT_FOUND;
  }

  // 3. Encontrar a usuária do sexo feminino com o salário maior.
  public findUserByMaxSalary(): IUser {
    const list: IUser[] = [...this._userList];
    list.sort((a, b) => {
      if(b.salary <= a.salary ) return -1
      else return 1
    })
    return list[0]
  }
  // 4. Encontre os usuários de um dado estado e com peso maior
  // que um dado peso;
  public findByMaxWeightAndCity(weight: number, city: string): IUser[] {
    const userMap = this._userList.filter((user)=> user.city === city && user.weight > weight)
    return userMap;
  }
}

const service = new User();
// Req 01
console.log('Req 01',service.findByName('josé da silva')) 
// Req 02
console.log('Req 02',service.findUserByPropValue<string>('city', 'Rio de Janeiro')) 
// Req 03
console.log('Req 03', service.findUserByMaxSalary())
// Req 04
console.log('Req 04', service.findByMaxWeightAndCity(70, 'São Paulo'))
// Req 05
