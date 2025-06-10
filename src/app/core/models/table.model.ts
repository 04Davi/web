export interface Table {
    name: string;
    fields: Field[];
    primaryKey?: string;
    foreignKeys?: { field: string, references: { table: string, field: string } }[];
  }
  
  export interface Field {
    name: string;
    type: string;
    isNullable: boolean;
    constraints?: string[];
  }