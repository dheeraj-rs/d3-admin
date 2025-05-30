export const FilterMatchMode = {
    STARTS_WITH: 'startsWith',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'notContains',
    ENDS_WITH: 'endsWith',
    EQUALS: 'equals',
    NOT_EQUALS: 'notEquals',
    IN: 'in',
    LESS_THAN: 'lt',
    LESS_THAN_OR_EQUAL_TO: 'lte',
    GREATER_THAN: 'gt',
    GREATER_THAN_OR_EQUAL_TO: 'gte',
    BETWEEN: 'between',
    DATE_IS: 'dateIs',
    DATE_IS_NOT: 'dateIsNot',
    DATE_BEFORE: 'dateBefore',
    DATE_AFTER: 'dateAfter',
    CUSTOM: 'custom',
} as const;

export const FilterOperator = {
    AND: 'and',
    OR: 'or',
} as const;

export type FilterMatchModeType = (typeof FilterMatchMode)[keyof typeof FilterMatchMode];
export type FilterOperatorType = (typeof FilterOperator)[keyof typeof FilterOperator];
