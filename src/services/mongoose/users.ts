import bcrypt from "bcrypt";
import { Types } from "mongoose";
import Users from "../../app/api/v1/users/model";
import { UserGetAllRequest, UserResponse, UserResponseSignin, UserSigninRequest, UserSignUpRequest, UserUpdateCondition, UserUpdateRequest } from "../../app/api/v1/users/types";
import { BadRequestError, NotfoundError } from "../../app/errors";
import { toUserResponse, toUserResponses } from "../../app/utils/users";
import { UserValidations } from "../../app/validated/users";
import { Validation } from "../../app/validated/validation";
import { ConditionKeyword } from "../../types/condition";
import { userToken } from "../../types/token-user";
import createJwt from "../../utils/create-jwt";
import { createToken } from "../../utils/create-token";

export class UserServices {
  static async signUp(req: UserSignUpRequest): Promise<UserResponse> {
    const request = Validation.validate(UserValidations.SIGINUP, req);

    if (request.password !== request.confirmPassword)
      throw new BadRequestError("Password is not mathcing confirmPassword!");

    const checkUser = await Users.findOne({ email: request.email });

    if (checkUser) throw new BadRequestError("Your email has been registered");

    const result = (await Users.create({
      name: request.name,
      email: request.email,
      password: request.password,
    })) as UserResponse;

    return toUserResponse(result);
  }

  static async signIn(req: UserSigninRequest): Promise<UserResponseSignin> {
    const request = Validation.validate(UserValidations.SIGNIN, req)

    const check = await Users.findOne({email: request.email})
    if(!check) throw new BadRequestError("Invalid credentials!")

    const isPasswordCorrect = await check.comparePassword(request.password)
    if(!isPasswordCorrect) throw new BadRequestError("Invalid credentials!")

    const result = check as UserResponse

    const token = createJwt.createJwt({payload: createToken(result)})
    
    return {
      _id: result._id,
      name: result.name,
      role: result.role,
      token
    }
  }

  static async getAll(req: UserGetAllRequest): Promise<UserResponse[]> {
    const request = Validation.validate(UserValidations.GETALL, req)

    let condition: Partial<ConditionKeyword> = {}

    if(request.keyword) {
      condition = {
        ...condition,
        keyword: {$regex: request.keyword, $option: "i"}
      }
    }

    const result = await Users.find(condition) as UserResponse[]

    return toUserResponses(result)
  }

  static async getOne(id: Types.ObjectId): Promise<UserResponse> {
    const checkUser = await Users.findById({_id: id}) as UserResponse
    if(!checkUser) throw new NotfoundError("User not found!")

    return toUserResponse(checkUser)
  }

  static async update(user: userToken,req: UserUpdateRequest): Promise<UserResponse> {
    const request = Validation.validate(UserValidations.UPDATE, req)

    const checkUser = await Users.findById({_id: user._id})
    if(!checkUser) throw new NotfoundError("User not found!")

    let condition: Partial<UserUpdateCondition> = {}

    if(request.name) {
      condition = {
        ...condition,
        name: request.name
      }
    }

    if(request.password && request.confirmPassword) {
      if(request.password !== request.confirmPassword) throw new BadRequestError("Password is not mathcing confirmPassword!")

      condition = {
        ...condition, 
        password: await bcrypt.hash(request.password, 10)
      }
    }

    const result = await Users.findByIdAndUpdate({_id: checkUser._id}, {$set: condition}, {new: true, runValidators: true}) as UserResponse
    if(!result) throw new BadRequestError("An error occurred while changing data")

    return toUserResponse(result)
  }

  static async checkingUser(id: Types.ObjectId): Promise<UserResponse> {
    const result = await Users.findById({_id: id}) as UserResponse
    if(!result) throw new NotfoundError("User not found")

    return toUserResponse(result)
  }
}
