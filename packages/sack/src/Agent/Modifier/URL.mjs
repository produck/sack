export const Set = (url) => ctx => {
	ctx.url.href = url;
};

export const SetOrigin = (protocol, host, port) => {};
export const SetAuthentication = (username, password = '') => {};
export const SetPathname = () => {};
export const AppendPathname = () => {};

export const SetSearchParams = () => {};
export const AppendSearchParams = () => {};
export const DeleteSearchParams = () => {};
export const DeleteAllSearchParams = () => {};

export {
	Set as SetHref,
	SetSearchParams as SetQuery,
	AppendSearchParams as AppendQuery,
	DeleteSearchParams as DeleteQuery,
	DeleteAllSearchParams as DeleteAllQuery,
};
