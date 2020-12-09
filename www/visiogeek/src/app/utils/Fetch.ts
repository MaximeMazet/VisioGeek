

async function fetchApi(path: string, method: string, header: boolean = true, body?: {}, body_stringify: boolean = true, jsonify: boolean = true, responseType: string = 'json'){
  let opts

  if (method !== "GET") {
    opts = {
      method,
      body: body_stringify ? JSON.stringify(body) : body,
      responseType
    }
  } else {
    opts = {
      method,
      responseType
    }
  }


  let response = await fetch('http://localhost:8888/api/' + path, opts)


  if (response.ok){
    if (jsonify)
      return await response.json()
    else
      return response;
  } else {
    console.log(response.status, response.statusText)
    return false
  }

}

export {
  fetchApi
}
