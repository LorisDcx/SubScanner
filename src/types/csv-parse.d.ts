declare module "csv-parse/sync" {
  export interface CsvParseOptions {
    columns?: boolean | string[];
    skip_empty_lines?: boolean;
    delimiter?: string;
    relax_column_count?: boolean;
    trim?: boolean;
    [key: string]: unknown;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function parse(input: string, options?: CsvParseOptions): any[];
}
