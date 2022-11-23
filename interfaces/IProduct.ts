export default interface IProduct {
  [key: string]: number | string;
  id: number,
  userId: number,
  name: string,
  category: string,
  price: number, 
};