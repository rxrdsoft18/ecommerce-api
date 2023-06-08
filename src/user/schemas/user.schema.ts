import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../auth/enums/role.enum';
import { AbstractIdDocumentSchema } from '../../common/repositories/abstract-id.document.schema';

@Schema()
export class User extends AbstractIdDocumentSchema {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop({ selected: false })
  password: string;

  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
