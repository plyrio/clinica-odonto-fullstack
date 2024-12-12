import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import {BlogPostsService} from "./blog-posts.service";
import {
  CreateBlogPostDto,
  CreateBlogPostZodDto,
  UpdateBlogPostDto,
  UpdateBlogPostZodDto,
  LikePostZodDto,
  BlogPostResponseZodDto
} from "@odonto/core";
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam
} from "@nestjs/swagger";

@ApiTags("blog-posts")
@Controller("blog-posts")
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @ApiOperation({summary: "Create a new blog-post"})
  @ApiResponse({
    status: 201,
    description: "Blog-post created successfully.",
    type: CreateBlogPostZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: CreateBlogPostZodDto})
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Get()
  @ApiOperation({summary: "Retrieve a list of blog-posts"})
  @ApiResponse({
    status: 200,
    description: "Blog-posts retrieved successfully.",
    type: [BlogPostResponseZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Retrieve a blog-post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the blog-post to retrieve",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Blog-post found successfully.",
    type: BlogPostResponseZodDto
  })
  @ApiResponse({status: 404, description: "Blog-post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  findOne(@Param("id") id: string) {
    return this.blogPostsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({summary: "Update a blog-post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the blog-post to update",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Blog-post updated successfully.",
    type: BlogPostResponseZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 404, description: "Blog-post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: UpdateBlogPostZodDto})
  update(
    @Param("id") id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto
  ) {
    return this.blogPostsService.update(+id, updateBlogPostDto);
  }

  @Delete(":id")
  @ApiOperation({summary: "Delete a blog-post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the blog-post to delete",
    type: String
  })
  @ApiResponse({status: 200, description: "Blog-post deleted successfully."})
  @ApiResponse({status: 404, description: "Blog-post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.blogPostsService.remove(+id);
  }

  @Patch(":id/like")
  @ApiOperation({summary: "Give a like to blog-post by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the blog-post to like",
    type: String
  })
  @ApiResponse({status: 200, description: "Blog-post liked successfully."})
  @ApiResponse({status: 404, description: "Blog-post not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  @ApiBody({type: LikePostZodDto})
  likePost(@Param("id") id: string, @Body("userId") userId: number) {
    return this.blogPostsService.likePost(+id, userId);
  }
}
