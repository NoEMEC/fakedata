import { IsNotEmpty } from 'class-validator';

export class PostDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    user_id: string;
}
