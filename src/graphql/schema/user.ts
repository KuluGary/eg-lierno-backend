import { ID, ObjectType, Field, InputType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
class UserMetadata {
  @Field()
  first_name: String;

  @Field()
  last_name: String;

  @Field()
  email: String;

  @Field({ nullable: true })
  avatar?: String;

  @Field({ nullable: true })
  location?: String;

  @Field({ nullable: true })
  discordName?: String;

  @Field({ nullable: true })
  discordId?: String;

  @Field((_) => [String], { nullable: true })
  friendList?: [String];
}

@InputType()
class UserMetadataInput {
  @Field()
  first_name: String;

  @Field()
  last_name: String;

  @Field()
  email: String;

  @Field({ nullable: true })
  avatar?: String;

  @Field({ nullable: true })
  location?: String;

  @Field({ nullable: true })
  discordName?: String;

  @Field({ nullable: true })
  discordId?: String;

  @Field((_) => [String], { nullable: true })
  friendList?: [String];
}

@ObjectType()
export class User {
  @Field((_) => ID, { nullable: true })
  _id?: ObjectId;

  @Field()
  isActive: Boolean;

  @Field()
  username: String;

  password: String;

  @Field((_) => [String])
  campaigns: [String];

  @Field((_) => UserMetadata)
  metadata: UserMetadata;

  @Field((_) => [String])
  roles: [String];

  @Field()
  role: String;

  @Field(() => Date)
  updatedAt = new Date();

  @Field(() => Date)
  createdAt = Date;
}

@ObjectType()
export class UserError {
  @Field()
  field: string;
  @Field()
  error: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [UserError], { nullable: true })
  errors?: UserError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UserLoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class UserRegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field((_) => UserMetadataInput, { nullable: true })
  metadata: UserMetadataInput;
}