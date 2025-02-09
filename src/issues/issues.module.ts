import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [CommentsModule],
})
export class IssuesModule {}
