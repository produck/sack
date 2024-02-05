import * as Common from './Common.mjs';

export const finalize = Common.Finalize('body');
export const cancel = ctx => ctx.body = null;
export const Set = body => ctx => ctx.body = body;
