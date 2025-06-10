export interface Relationship {
    sourceTable: string;
    sourceField: string;
    targetTable: string;
    targetField: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }