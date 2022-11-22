import { userProducts, users} from './dataBase';
import IUser from './interfaces/IUser';


const USER_NOT_FOUND = 'User not found'
class User {
  private _userList: IUser[];

  constructor() {
    this._userList = users;
  }

  // 1. Encontrar um usuário pelo nome;
  public findByName(name: string) {
    return this._userList.find((user) => user.name === name) || USER_NOT_FOUND;
  }

  // 2. Encontrar um usuário pelo valor de uma propriedade qualquer;
  // Dica: a assinatura do método é findUserByPropValue(users, prop, value)
  public findUserByPropValue<T>(prop: string, value: T) {
    return this._userList.find((user) => user[prop] === value) || USER_NOT_FOUND;
  }

  // 3. Encontrar a usuária do sexo feminino com o salário maior.
  
}

const service = new User();
console.log(service.findByName('josé da silva')) // Req 01
console.log(service.findUserByPropValue<string>('city', 'Rio de Janeiro'))
