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
import { BlogPostsService } from "./blog-posts.service";
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
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@ApiTags("blog-posts")
@Controller("blog-posts")
export class BlogPostsController {
    constructor(private readonly blogPostsService: BlogPostsService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("DOCTOR", "MANAGER", "ADMIN")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Create a new article",
        description:
            "This endpoint requires a valid access token. Only users with ADMIN, DOCTOR or MANAGER roles are authorized to perform this operation."
    })
    @ApiResponse({
        status: 201,
        description: "Article created successfully.",
        type: CreateBlogPostZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: CreateBlogPostZodDto })
    create(@Body() createBlogPostDto: CreateBlogPostDto) {
        return this.blogPostsService.create(createBlogPostDto);
    }

    @Get()
    @ApiOperation({
        summary: "Retrieve a list of articles",
        description: "Fetches a list of all articles."
    })
    @ApiResponse({
        status: 200,
        description: "Articles retrieved successfully.",
        type: [ResponseBlogPostZodDto]
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findAll() {
        return this.blogPostsService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Retrieve a post by ID",
        description: "Fetch details of a specific article using its ID."
    })
    @ApiParam({
        name: "id",
        description: "ID of the post to retrieve",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Article found successfully.",
        type: ResponseBlogPostZodDto
    })
    @ApiResponse({ status: 404, description: "Article not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findOne(@Param("id") id: string) {
        return this.blogPostsService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("DOCTOR", "MANAGER", "ADMIN")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Update a article by ID",
        description:
            "This endpoint requires a valid access token. Only users with ADMIN, DOCTOR or MANAGER roles are authorized to perform this operation."
    })
    @ApiParam({
        name: "id",
        description: "ID of the article to update",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Article updated successfully.",
        type: ResponseBlogPostZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Article not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: UpdateBlogPostZodDto })
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
    @ApiOperation({
        summary: "Delete a article by ID",
        description:
            "This endpoint requires a valid access token. Only users with ADMIN, DOCTOR or MANAGER roles are authorized to perform this operation."
    })
    @ApiParam({
        name: "id",
        description: "ID of the article to delete",
        type: String,
        required: true
    })
    @ApiResponse({ status: 200, description: "Article deleted successfully." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Article not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    remove(@Param("id") id: string) {
        return this.blogPostsService.remove(+id);
    }

    @Patch(":id/like")
    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Give a like or unlike to article by ID" })
    @ApiParam({
        name: "id",
        description: "ID of the article to like",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Post liked or unliked successfully."
    })
     @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Post not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: LikePostZodDto })
    likePost(@Param("id") id: string, @Body("userId") userId: number) {
        return this.blogPostsService.likePost(+id, userId);
    }
}
