import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { UserEntity } from '../interfaces/user.entity';

export class ReturnUserDto {
  id: number;

  name: string;

  email: string;

  phone: string;

  cpf: string;

  addresses?: ReturnAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.addresses = userEntity.adresses
      ? userEntity.adresses.map((addresses) => new ReturnAddressDto(addresses))
      : undefined;
  }
}
