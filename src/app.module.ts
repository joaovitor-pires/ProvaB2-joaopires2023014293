import { Module } from '@nestjs/common';
import { CreateProductController } from './Product/create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './Product/create-product.service';
import { ProductsRepository } from './Product/products.repository';
import { CreateModelController } from './Model/create-model.controller';
import { DeleteModelController } from './Model/delete-model.controller';
import { DeleteProductController } from './Product/delete-product.controller';
import { EditModelController } from './Model/edit-model.controller';
import { EditProductController } from './Product/edit-product.controller';
import { FetchRecentModelsController } from './Model/fetch-recent-models.controller';
import { FetchRecentProductsController } from './Product/fetch-recent-products.controller';
import { GetProductByIdController } from './Product/get-product-by-id.controller';
import { GetModelByIdController } from './Model/get-model-by-id.controller';
import { UpdateAvailableProductController } from './Product/update-available-product.controller';
import { CreateModelService } from './Model/create-model.service';
import { DeleteModelService } from './Model/delete-model.service';
import { DeleteProductService } from './Product/delete-product.service';
import { EditModelService } from './Model/edit-model.service';
import { EditProductService } from './Product/edit-product.service';
import { FetchRecentModelsService } from './Model/fetch-recent-models.service';
import { FetchRecentProductsService } from './Product/fetch-recent-products.service';
import { GetProductByIdService } from './Product/get-product-by-id.service';
import { GetModelByIdService } from './Model/get-model-by-id.service';
import { UpdateAvailableProductService } from './Product/update-available-product.service';
import { ModelsRepository } from './Model/models.repository';
import { CreateUserController } from './User/create-user.controller';
import { GetUserByIdController } from './User/get-user-by-id.controller';
import { CreateUserService } from './User/create-user.service';
import { GetUserByIdService } from './User/get-user-by-id.service';
import { UsersRepository } from './User/users.repository';
import { FetchRecentUsersController } from './User/fetch-recent-users.controller';
import { FetchRecentUsersService } from './User/fetch-recent-users.service';
import { EditUserController } from './User/edit-user.controller';
import { EditUserService } from './User/edit-user.service';
import { DeleteUserController } from './User/delete-user.controller';
import { DeleteUserService } from './User/delete-user.service';
import { ProfilesRepository } from './Profile/profiles.repository';
import { CreateProfileController } from './Profile/create-profile.controller';
import { CreateProfileService } from './Profile/create-profile.service';
import { GetProfileByIdController } from './Profile/get-profile-by-id.controller';
import { GetProfileByIdService } from './Profile/get-profile-by-id.service';
import { EditProfileController } from './Profile/edit-profile.controller';
import { EditProfileService } from './Profile/edit-profile.service';
import { OrdersRepository } from './Order/orders.repository';
import { CreateOrderController } from './Order/create-order.controller';
import { CreateOrderService } from './Order/create-order.service';
import { GetOrderByIdController } from './Order/get-order-by-id.controller';
import { GetOrderByIdService } from './Order/get-order-by-id.service';
import { GetOrdersByUserController } from './Order/get-orders-by-user.controller';
import { GetOrdersByUserService } from './Order/get-orders-by-user.service';

@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController, DeleteModelController, DeleteProductController, EditModelController, EditProductController, FetchRecentModelsController, FetchRecentProductsController, GetProductByIdController, GetModelByIdController, UpdateAvailableProductController, CreateUserController, GetUserByIdController, FetchRecentUsersController, EditUserController, DeleteUserController, CreateProfileController,GetProfileByIdController, EditProfileController, CreateOrderController, GetOrderByIdController, GetOrdersByUserController],
  providers: [PrismaService, CreateProductService, CreateModelService, DeleteModelService, DeleteProductService, EditModelService, EditProductService, FetchRecentModelsService, FetchRecentProductsService, GetProductByIdService, GetModelByIdService, UpdateAvailableProductService, ProductsRepository, ModelsRepository, UsersRepository, ProfilesRepository, CreateUserService, GetUserByIdService, FetchRecentUsersService, EditUserService, DeleteUserService, CreateProfileService, GetProfileByIdService, EditProfileService, OrdersRepository, CreateOrderService, GetOrderByIdService, GetOrdersByUserService],
})
export class AppModule {}
