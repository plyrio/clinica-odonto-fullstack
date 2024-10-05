import { Module } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsController } from './blog-posts.controller';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
})
export class BlogPostsModule {}
