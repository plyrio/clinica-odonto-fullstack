import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from "@nestjs/common";
import {BlogPostsService} from "./blog-posts.service";
import {
  CreateBlogPostDto,
  CreateBlogPostZodDto,
  UpdateBlogPostDto,
  UpdateBlogPostZodDto,
  LikePostZodDto,
  ResponseBlogPostZodDto
} from "@odonto/core";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth
} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@ApiTags("blog-posts")
@Controller("blog-posts")
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR", "MANAGER")
  @ApiBearerAuth("access-token")
  @ApiOperation({summary: "Create a new post"})
  @ApiResponse({
    status: 201,
    description: "Post created successfully.",
    type: CreateBlogPostZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: CreateBlogPostZodDto})
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Get()
  @ApiOperation({summary: "Retrieve a list of posts"})
  @ApiResponse({
    status: 200,
    description: "Posts retrieved successfully.",
    type: [ResponseBlogPostZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Retrieve a post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the post to retrieve",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Post found successfully.",
    type: ResponseBlogPostZodDto
  })
  @ApiResponse({status: 404, description: "Post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  findOne(@Param("id") id: string) {
    return this.blogPostsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR", "MANAGER", "RECEPTIONIST")
  @ApiBearerAuth("access-token")
  @ApiOperation({summary: "Update a post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the post to update",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Post updated successfully.",
    type: ResponseBlogPostZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 404, description: "Post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: UpdateBlogPostZodDto})
  update(
    @Param("id") id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto
  ) {
    return this.blogPostsService.update(+id, updateBlogPostDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR", "MANAGER", "ADMIN")
  @ApiBearerAuth("access-token")
  @ApiOperation({summary: "Delete a post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the post to delete",
    type: String
  })
  @ApiResponse({status: 200, description: "Post deleted successfully."})
  @ApiResponse({status: 404, description: "Post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.blogPostsService.remove(+id);
  }

  @Patch(":id/like")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({summary: "Give a like or unlike to post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the post to like",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Post liked or unliked successfully."
  })
  @ApiResponse({status: 404, description: "Post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  @ApiBody({type: LikePostZodDto})
  likePost(@Param("id") id: string, @Body("userId") userId: number) {
    return this.blogPostsService.likePost(+id, userId);
  }
}
