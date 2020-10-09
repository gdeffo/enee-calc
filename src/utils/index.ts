
export const cursedAddition = (exp: string): string => {
    const numberRegex = "-?\\d+(?:\\.\\d+)?";
    const inParen = "\\([^\\(]*\\)";
    const variable = "-?[a-zA-Z]+";
    const operand = `(?:${numberRegex}|${variable}|${inParen})(?:\\^(?:${numberRegex}|${variable}|${inParen}))?`;
    const cursedAddOperator = new RegExp(`(${operand})\\/\\/(${operand})`, "g");

    const result = exp.replace(cursedAddOperator, "($1) * ($2) /(($1) + ($2))")
    return result;
}