type ClassType = string | null | undefined | false | number | Array<ClassType>;

export function cn(...classesProp: Array<ClassType>): string {
  const classes = Array.isArray(classesProp) ? classesProp : [classesProp];
  return classes.flat().filter(Boolean).join(' ');
}
