export const ToReceiver = receiver => receiver;

const getResponse = receiver => receiver.response;

export const ToResponse = receiver => getResponse(receiver);
export const ToJSON = receiver => getResponse(receiver).json();
export const ToText = receiver => getResponse(receiver).text();
export const ToBlob = receiver => getResponse(receiver).blob();
export const ToArrayBuffer = receiver => getResponse(receiver).arrayBuffer();
export const ToFormData = receiver => getResponse(receiver).formData();
