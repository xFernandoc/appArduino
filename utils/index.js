export const getData = async function(axios,url,method,data=undefined){
  return await axios({
    url,
    method,
    data
  })
}