import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ChatService } from './chats.service';
import sendChatDto from './dtos/send-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatService) {}
  @Post('message/:thread')
  chatWithAgent(
    @Param('thread') threadId: string,
    @Body() { query }: sendChatDto,
  ) {
    if (!threadId) throw new BadRequestException();
    return this.chatService.chatWithAgent({ query, thread_id: threadId });
  }
}
