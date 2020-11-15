import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
    public results: PaginationEntity[];
    public pageTotalDocuments: number;
    public totalDocuments: number;
    public page: number;
    public totalPages: number;
    public next: number | boolean;
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
