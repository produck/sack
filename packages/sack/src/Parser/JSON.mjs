export const ToReceiver = receiver => receiver;
export const ToResponse = receiver => receiver.response;
export const ToJSON = receiver => receiver.response.json();
export const ToText = receiver => receiver.response.text();
export const ToBlob = receiver => receiver.response.blob();
export const ToArrayBuffer = receiver => receiver.response.arrayBuffer();
export const ToFormData = receiver => receiver.response.formData();
