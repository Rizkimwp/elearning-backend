import { PartialType } from '@nestjs/swagger';
import { CreateDiscussionreplyDto } from './create-discussionreply.dto';

export class UpdateDiscussionreplyDto extends PartialType(CreateDiscussionreplyDto) {}
