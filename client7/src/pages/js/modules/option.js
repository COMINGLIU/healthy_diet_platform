module.exports = (str) => {
  let arr = str.split('&');
  let resObj = {};
  for(let i=0,len=arr.length;i<len;i++){
    let key = arr[i].split('=')[0];
    let value = arr[i].split('=')[1];
    resObj[key]=value;
  }
  return resObj;
}