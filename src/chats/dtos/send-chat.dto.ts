import { IsNotEmpty } from "class-validator";

class sendChatDto {
    @IsNotEmpty()
    query: string
}

export default sendChatDto;