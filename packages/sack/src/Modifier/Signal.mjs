const SignalModifier = signal => ctx => ctx.signal = signal;

export { SignalModifier as Set };
export const Timeout = ms => SignalModifier(AbortSignal.timeout(ms));
