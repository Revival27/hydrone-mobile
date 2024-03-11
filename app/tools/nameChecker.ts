export const nameChecker = (name: string | undefined) => (name && name.length > 10 ? `${name.substring(0, 15)}...` : name);
