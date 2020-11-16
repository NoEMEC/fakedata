import { PaginationResultInterface } from './pagination.results.interface';
import { ApiProperty } from '@nestjs/swagger';

export class Pagination<PaginationEntity> {
    @ApiProperty()
    public results: PaginationEntity[];
    @ApiProperty()
    public pageTotalDocuments: number;
    @ApiProperty()
    public totalDocuments: number;
    @ApiProperty()
    public page: number;
    @ApiProperty()
    public totalPages: number;
    @ApiProperty({ type: Number })
    public next: number | boolean;
    @ApiProperty({ type: Number })
    public previous: number | boolean;

    constructor(
        paginationResults: PaginationResultInterface<PaginationEntity>,
    ) {
        this.results = paginationResults.results;
        this.pageTotalDocuments = paginationResults.results.length;
        this.totalDocuments = paginationResults.total;
        this.page = paginationResults.page;
        this.totalPages = Math.ceil(
            this.totalDocuments / paginationResults.limit,
        );
        this.previous = this.page === 1 ? false : this.page - 1;
        this.next = this.page === this.totalPages ? false : this.page + 1;
    }
}
