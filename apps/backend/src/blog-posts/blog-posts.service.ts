import { Injectable, NotFoundException } from '@nestjs/common';
import { createBlogPostSchema, updateBlogPostSchema, CreateBlogPostDto, UpdateBlogPostDto } from '@odonto/core';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class BlogPostsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) { }


  async create(createBlogPostDto: CreateBlogPostDto) {
    this.commonService.validateDto(createBlogPostSchema, createBlogPostDto);

    try {
      return await this.prismaService.blogPost.create({
        data: {
          title: createBlogPostDto.title,
          content: createBlogPostDto.content,
          imgUrl: createBlogPostDto.imgUrl,
          employee: { connect: { id: createBlogPostDto.employeeId } }
        }
      });
    } catch (error) {
      this.commonService.handleError(error, 'Failed create new blog post')
    }
  }

  async findAll() {
    try {
      return await this.prismaService.blogPost.findMany({
        include: { employee: true, likedBy: true },
      });
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all blog posts')
    }
  }

  async findOne(id: number) {
    try {
      const blogpost = this.prismaService.blogPost.findUnique({
        where: { id },
        include: { employee: true, likedBy: true },
      });

      if (!blogpost) {
        throw new NotFoundException(`Not found blog post of ID #${id}`)
      }

      await this.prismaService.blogPost.update({
        where: { id },
        data: { views: { increment: 1 } },
      });

      return blogpost
  } catch(error) {
    this.commonService.handleError(error, `An error occurred while fetching blog post of ID #${id}`)
  }
}

  async update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
  this.commonService.validateDto(updateBlogPostSchema, updateBlogPostDto);

  try {
    return await this.prismaService.blogPost.update({
      where: { id },
      data: updateBlogPostDto,
    })
  } catch (error) {
    this.commonService.handleError(error, `Failed to update blog post of ID #${id}`)
  }
}

  async remove(id: number) {
  try {
    const blogpost = this.prismaService.blogPost.findUnique({
      where: { id }
    });

    if (!blogpost) {
      throw new NotFoundException(`Not found blog post of ID #${id}`)
    }

    return await this.prismaService.blogPost.delete({
      where: { id }
    })
  } catch (error) {
    this.commonService.handleError(error, `Failed to delete blog post of ID #${id}`)
  }
}

  async incrementView(id: number) {

}

  async likePost(id: number, userId: number) {
  try {
    const post = await this.prismaService.blogPost.findUnique({
      where: { id },
      include: { likedBy: { where: { id: userId } } },
    });

    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    const alreadyLiked = post.likedBy.some(user => user.id === userId);

    return this.prismaService.blogPost.update({
      where: { id },
      data: {
        likes: { increment: alreadyLiked ? -1 : 1 },
        likedBy: alreadyLiked
          ? { disconnect: { id: userId } }
          : { connect: { id: userId } },
      },
    });
  } catch (error) {
    this.commonService.handleError(error, `Failed to like or unlike blogpost of ID`)
  }
}
}
