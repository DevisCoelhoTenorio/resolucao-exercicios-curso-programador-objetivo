import { userProducts, users} from './dataBase';
import IUser from './interfaces/IUser';

class User {
  private _userList: IUser[];

  constructor() {
    this._userList = users;
  }

  // 1. Encontrar um usuário pelo nome;
  public findByName(name: string) {
    return this._userList.find((user) => user.name === name) || 'User not found';
  }

  // 2. Encontrar um usuário pelo valor de uma propriedade qualquer;
  // Dica: a assinatura do método é findUserByPropValue(users, prop, value)
}