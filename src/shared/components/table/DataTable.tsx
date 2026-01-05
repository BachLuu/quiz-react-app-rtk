import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type {
  DataTableOrder,
  DataTableProps,
  DataTableSortableColumn,
  DataTableSortValue,
} from "@/shared/types";

export type {
  DataTableColumn,
  DataTableEmptyState,
  DataTableNonSortableColumn,
  DataTableOrder,
  DataTableProps,
  DataTableSortableColumn,
  DataTableSortValue,
} from "@/shared/types";

const defaultRenderSkeleton = () => <Skeleton variant="text" width="80%" />;

const compareSortValues = (a: DataTableSortValue, b: DataTableSortValue) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  if (typeof a === "boolean" && typeof b === "boolean") {
    return a === b ? 0 : a ? 1 : -1;
  }

  return String(a).localeCompare(String(b), undefined, {
    sensitivity: "base",
    numeric: true,
  });
};

export const DataTable = <
  T,
  ColumnId extends string,
  SortableColumnId extends ColumnId
>({
  rows,
  columns,
  isLoading = false,
  getRowId,
  emptyState,
  pagination,
  rowsPerPageOptions = [5, 10, 25],
  initialRowsPerPage = 10,
  initialOrderBy,
  initialOrder = "asc",
}: DataTableProps<T, ColumnId, SortableColumnId>) => {
  const isControlledPagination = Boolean(pagination);
  const [uncontrolledPage, setUncontrolledPage] = useState(0);
  const [uncontrolledRowsPerPage, setUncontrolledRowsPerPage] =
    useState(initialRowsPerPage);

  const page = pagination?.page ?? uncontrolledPage;
  const rowsPerPage = pagination?.rowsPerPage ?? uncontrolledRowsPerPage;
  const totalCount = pagination?.count ?? rows.length;
  const totalPages =
    pagination?.totalPages ??
    (totalCount > 0 ? Math.ceil(totalCount / rowsPerPage) : 0);

  const sortableColumns = useMemo(() => {
    return columns.filter(
      (c): c is DataTableSortableColumn<T, SortableColumnId> =>
        c.sortable === true
    );
  }, [columns]);

  const defaultOrderBy = useMemo<SortableColumnId | null>(() => {
    return initialOrderBy ?? sortableColumns[0]?.id ?? null;
  }, [initialOrderBy, sortableColumns]);

  const [order, setOrder] = useState<DataTableOrder>(initialOrder);
  const [orderBy, setOrderBy] = useState<SortableColumnId | null>(
    defaultOrderBy
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    if (pagination) {
      pagination.onPageChange(newPage);
      return;
    }
    setUncontrolledPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextRowsPerPage = parseInt(event.target.value, 10);
    if (pagination) {
      pagination.onRowsPerPageChange(nextRowsPerPage);
      pagination.onPageChange(0);
      return;
    }
    setUncontrolledRowsPerPage(nextRowsPerPage);
    setUncontrolledPage(0);
  };

  const sortableColumnMap = useMemo(() => {
    return new Map(sortableColumns.map((c) => [c.id, c] as const));
  }, [sortableColumns]);

  const handleRequestSort = (property: SortableColumnId) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    if (pagination) {
      pagination.onPageChange(0);
    } else {
      setUncontrolledPage(0);
    }
  };

  const sortedRows = useMemo(() => {
    if (!orderBy) return rows;

    const sortColumn = sortableColumnMap.get(orderBy);
    if (!sortColumn) return rows;

    const comparator = (left: T, right: T) => {
      const valueA = sortColumn.getSortValue(left);
      const valueB = sortColumn.getSortValue(right);
      const result = compareSortValues(valueA, valueB);
      return order === "asc" ? result : -result;
    };

    // Stable sort
    return [...rows]
      .map((row, index) => ({ row, index }))
      .sort((a, b) => {
        const result = comparator(a.row, b.row);
        return result !== 0 ? result : a.index - b.index;
      })
      .map(({ row }) => row);
  }, [order, orderBy, rows, sortableColumnMap]);

  const visibleRows = useMemo(() => {
    if (isControlledPagination) {
      // Server-side pagination: rows are already for the current page.
      return sortedRows;
    }

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [isControlledPagination, page, rowsPerPage, sortedRows]);

  const resolveRowId = (row: T, fallbackIndex: number) => {
    if (getRowId) return getRowId(row);

    const maybeId = (row as { id?: string | number }).id;
    if (typeof maybeId === "string" || typeof maybeId === "number") {
      return maybeId;
    }

    return fallbackIndex;
  };

  if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align ?? "left"}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align ?? "left"}>
                    {(column.renderSkeleton ?? defaultRenderSkeleton)()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (rows.length === 0) {
    if (!emptyState) return null;

    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {emptyState.title}
        </Typography>
        {emptyState.description && (
          <Typography variant="body2" color="text.secondary">
            {emptyState.description}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? "left"}
                  sortDirection={
                    column.sortable && orderBy === column.id ? order : false
                  }
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow
                key={resolveRowId(row, index)}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align ?? "left"}>
                    {column.render(row, page * rowsPerPage + index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ page: currentPage }) =>
          totalPages > 0 ? `Page ${currentPage + 1} of ${totalPages}` : ""
        }
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
