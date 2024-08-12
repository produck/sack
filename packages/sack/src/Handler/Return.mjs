const Returner = accessor => {
	return /*@__NO_SIDE_EFFECTS__*/ async (receiver, next) => {
		receiver.returnValue = await accessor(receiver);

		return next();
	};
};

const getResponse = receiver => receiver.response;

export const ToReceiver = Returner(r => r);
export const ToResponse = Returner(r => getResponse(r));
export const ToJSON = Returner(r => getResponse(r).json());
export const ToText = Returner(r => getResponse(r).text());
export const ToBlob = Returner(r => getResponse(r).blob());
export const ToArrayBuffer = Returner(r => getResponse(r).arrayBuffer());
export const ToFormData = Returner(r => getResponse(r).formData());
