/**
 * Type definitions for DataTable component
 */

import type { ReactNode } from "react";

export type DataTableOrder = "asc" | "desc";
export type DataTableSortValue = string | number | boolean | null | undefined;

type DataTableBaseColumn<T, ColumnId extends string> = {
  id: ColumnId;
  label: string;
  align?: "left" | "center" | "right";
  /**
   * Render a cell for a row.
   * `rowIndex` is a 0-based global index for the currently displayed page.
   */
  render: (row: T, rowIndex?: number) => ReactNode;
  renderSkeleton?: () => ReactNode;
};

export type DataTableSortableColumn<
  T,
  SortableColumnId extends string
> = DataTableBaseColumn<T, SortableColumnId> & {
  sortable: true;
  getSortValue: (row: T) => DataTableSortValue;
};

export type DataTableNonSortableColumn<
  T,
  NonSortableColumnId extends string
> = DataTableBaseColumn<T, NonSortableColumnId> & {
  sortable?: false;
  getSortValue?: never;
};

export type DataTableColumn<
  T,
  ColumnId extends string,
  SortableColumnId extends ColumnId
> =
  | DataTableSortableColumn<T, SortableColumnId>
  | DataTableNonSortableColumn<T, Exclude<ColumnId, SortableColumnId>>;

export interface DataTableEmptyState {
  title: string;
  description?: string;
}

export interface DataTableProps<
  T,
  ColumnId extends string,
  SortableColumnId extends ColumnId
> {
  rows: readonly T[];
  columns: readonly DataTableColumn<T, ColumnId, SortableColumnId>[];
  isLoading?: boolean;

  getRowId?: (row: T) => string | number;

  emptyState?: DataTableEmptyState;

  /**
   * Controlled pagination (useful for server-side pagination).
   * If provided, DataTable will not manage page/rowsPerPage internally.
   */
  pagination?: {
    page: number;
    rowsPerPage: number;
    count: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
  };

  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
  initialOrderBy?: SortableColumnId;
  initialOrder?: DataTableOrder;
}
