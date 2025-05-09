
export const filterProduct =(params)=>{
  const queryString = new URLSearchParams(params).toString();
  return ("?"+queryString)
}