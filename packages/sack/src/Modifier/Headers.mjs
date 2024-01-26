export const Set = (key, value) => ctx => ctx.headers.set(key, value);
export const Append = (key, value) => ctx => ctx.headers.append(key, value);
