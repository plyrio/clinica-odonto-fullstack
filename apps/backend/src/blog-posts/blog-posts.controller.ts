import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto, CreateBlogPostZodDto, UpdateBlogPostDto, UpdateBlogPostZodDto, LikePostDto, LikePostZodDto } from '@odonto/core';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @ApiBody({ type: CreateBlogPostZodDto})
  @Post()
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Get()
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostsService.findOne(+id);
  }

  @ApiBody({ type: UpdateBlogPostZodDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogPostDto: UpdateBlogPostDto) {
    return this.blogPostsService.update(+id, updateBlogPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostsService.remove(+id);
  }

  @ApiBody({ type: LikePostZodDto })
  @Patch(':id/like')
  likePost(@Param('id') id: string, @Body() likePostDto: LikePostDto) {
    const {userId} = likePostDto;
    console.log(userId)
    console.log(likePostDto)
    return this.blogPostsService.likePost(+id, userId, likePostDto);
  }
  
}
