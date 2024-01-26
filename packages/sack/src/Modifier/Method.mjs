const MethodModifier = name => ctx => ctx.method = name;

export { MethodModifier as Set };
export const GET = MethodModifier('GET');
export const POST = MethodModifier('POST');
export const PUT = MethodModifier('PUT');
export const DELETE = MethodModifier('DELETE');
