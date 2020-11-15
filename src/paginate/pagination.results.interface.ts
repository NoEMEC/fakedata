export interface PaginationResultInterface<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    next?: number;
    previous?: number;
    page?: number;
    totalPages?: number;
    limit?: number;
}
