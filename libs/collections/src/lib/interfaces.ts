/**
 * Defines a generalized method that a value type or class implements
 * to create a type-specific method for determining equality of instances.
 */
export interface Equatable<T> {
  /**
   * Indicates whether the current object is equal to another object of the same type.
   * @param obj
   */
  equals(obj: T): boolean;
}

/**
 * Compares the current instance with another object of the same type and
 * returns an integer that indicates whether the current instance precedes,
 * follows, or occurs in the same position in the sort order as the other object.
 */
export interface Comparable<T> {
  /**
   * Returns value that indicates the relative order of the objects
   * being compared.
   *
   * The return value has these meanings:
   *
   * Less than zero	- This instance precedes other in the sort order.
   * Zero -	This instance occurs in the same position in the sort order as other.
   * Greater than zero - This instance follows other in the sort order.
   *
   * @param obj
   */
  compareTo(obj: T): number;
}

/**
 * Represents a type that a Component or other object is instances of.
 */
export interface Type<T> extends Function {
  new (...args: unknown[]): T;
}
