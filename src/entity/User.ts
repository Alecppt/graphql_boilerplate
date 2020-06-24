import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
// @Unique(['email'])
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('text')
  password: string;

  @Field()
  @Column('boolean', { default: false })
  isConfirmed: boolean;
}
