export function objToFormData(obj) {
  let formData = new FormData();
  Object.keys(obj).map( k => {
    return formData.set(k, obj[k]);
  });

  return formData;
}

export function objToURLSearchParams(obj) {
  let urlSearchParams = new URLSearchParams();
  Object.keys(obj).map( k => {
    return urlSearchParams.append(k, obj[k]);
  });
  return urlSearchParams;
}

export function handleResponse(response) {
  console.log('response', response);
  if (response.status !== 200) {
    return {ret: "-1", status: response.status, messsage:"status not 200", data: null};
  }
  const data = response.data;

  if(data.hasOwnProperty('error')){
    return {ret: data.error.status, status: 200, message:data.error.message, data: null};
  }

  return {ret: "0", status: 200, message:"", data: data};
}