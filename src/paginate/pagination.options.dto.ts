import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationOptionsDTO {
    @ApiProperty({
        required: false,
        default: 10,
        description: 'Quantity of elements per page',
    })
    @IsOptional()
    limit: number;

    @ApiProperty({
        required: false,
        default: 1,
        description: 'The page number',
    })
    @IsOptional()
    page: number;
}
